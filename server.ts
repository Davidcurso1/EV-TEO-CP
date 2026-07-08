/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { QUESTION_BANK } from "./src/data/questions";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;
const GOOGLE_APPS_SCRIPT_URL = 
  process.env.GOOGLE_APPS_SCRIPT_URL || 
  "https://script.google.com/macros/s/AKfycbxThzjqUAGWEJYBSqkF7PWI1Rnvm7Rc_Zrpzyc3-0v8PuAYTnBFFHcalmkaZq8xhfX7/exec";

// Parse JSON request bodies
app.use(express.json());

// Helper to shuffle and pick N items
function getRandomQuestions(count = 30) {
  const shuffled = [...QUESTION_BANK].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// API Routes

/**
 * GET /api/questions
 * Attempts to retrieve questions dynamically from the Google Apps Script Web App.
 * If that fails or is not configured, it returns a randomized set of 30 high-quality
 * questions from our local QUESTION_BANK fallback.
 */
app.get("/api/questions", async (req, res) => {
  try {
    // If the URL is set, we try to fetch questions
    if (GOOGLE_APPS_SCRIPT_URL) {
      console.log(`[API] Intentando obtener preguntas desde Google Apps Script: ${GOOGLE_APPS_SCRIPT_URL}`);
      
      // We set a short timeout (e.g., 5 seconds) to prevent stalling the user experience
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=getQuestions`, {
          signal: controller.signal,
          headers: {
            "Accept": "application/json"
          }
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              console.log(`[API] Se obtuvieron ${data.length} preguntas desde Google Apps Script.`);
              // Return up to 30 random questions from the fetched list
              const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 30);
              return res.json({
                source: "google_docs",
                questions: shuffled
              });
            }
          }
        }
      } catch (fetchErr) {
        console.warn("[API] Error al conectar con Google Apps Script:", fetchErr);
      }
    }
    
    // Fallback: local questions
    console.log("[API] Usando banco de preguntas local como fallback.");
    const questions = getRandomQuestions(30);
    return res.json({
      source: "local_fallback",
      questions: questions
    });
  } catch (error) {
    console.error("[API] Error crítico en GET /api/questions:", error);
    // Bulletproof fallback
    const questions = getRandomQuestions(30);
    return res.json({
      source: "local_fallback_error",
      questions: questions,
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

/**
 * POST /api/results
 * Forwards exam results to Google Sheets via Google Apps Script Web App.
 */
app.post("/api/results", async (req, res) => {
  try {
    const payload = req.body;
    console.log("[API] Recibiendo resultados de examen:", payload.nombreCompleto);

    if (!GOOGLE_APPS_SCRIPT_URL) {
      return res.status(501).json({
        success: false,
        message: "Google Apps Script URL no configurada en el servidor.",
        savedLocal: true
      });
    }

    console.log("[API] Enviando resultados a Google Sheets...");
    
    // We send a POST request with the results
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      redirect: "follow" // Essential for Apps Script redirects
    });

    const responseText = await response.text();
    console.log(`[API] Respuesta de Google Apps Script (status ${response.status}):`, responseText);

    // Google Apps Script redirects with 302, and standard node-fetch handles redirect.
    // If successful, it typically returns 200 after redirect with a response text like "Success" or JSON.
    if (response.ok) {
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { message: responseText };
      }

      return res.json({
        success: true,
        message: "Resultados sincronizados con Google Sheets correctamente.",
        details: responseData
      });
    } else {
      return res.status(response.status).json({
        success: false,
        message: `Error de respuesta del servidor Google Sheets (status: ${response.status})`,
        error: responseText,
        savedLocal: true
      });
    }
  } catch (error) {
    console.error("[API] Error al enviar resultados a Google Sheets:", error);
    return res.status(500).json({
      success: false,
      message: "No se pudo conectar con el servidor de Google Sheets. Los datos se guardarán localmente.",
      error: error instanceof Error ? error.message : String(error),
      savedLocal: true
    });
  }
});

// Setup Frontend Integration

async function start() {
  if (process.env.NODE_ENV !== "production") {
    // Integrate Vite development server middleware
    console.log("[SERVER] Iniciando servidor en modo DESARROLLO (Vite middleware)");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    console.log("[SERVER] Iniciando servidor en modo PRODUCCIÓN");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Servidor corriendo en http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("[SERVER] Error al iniciar el servidor:", err);
});
