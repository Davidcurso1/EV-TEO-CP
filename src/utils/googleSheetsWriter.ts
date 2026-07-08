/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface ExamResultPayload {
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombreCompleto: string;
  edad: number | string;
  empresa: string;
  antiguedad: number | string;
  tipoLicencia: string;
  correctas: number;
  incorrectas: number;
  puntaje: number;
  resultado: string;
  tiempoEmpleado: string;
  detalles?: Array<{
    pregunta: string;
    elegida: string;
    esCorrecta: boolean;
  }>;
}

/**
 * Parses spreadsheet ID from a Google Sheet URL or returns the input if it's already an ID.
 */
export function extractSpreadsheetId(urlOrId: string): string {
  if (!urlOrId) return "";
  const match = urlOrId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : urlOrId.trim();
}

/**
 * Writes exam results directly to Google Sheets using the Sheets API.
 * Ensures sheets "Resultados" and "Detalles_Respuestas" exist, creating them if necessary.
 */
export async function writeResultsToSheets(
  spreadsheetId: string,
  accessToken: string,
  data: ExamResultPayload
): Promise<{ success: boolean; message: string; details?: any }> {
  const parsedSpreadsheetId = extractSpreadsheetId(spreadsheetId);
  if (!parsedSpreadsheetId) {
    throw new Error("ID de Google Sheet inválido.");
  }

  const now = new Date();
  // Format current date and time
  const fecha = now.toLocaleDateString("es-CO", { timeZone: "America/Bogota" });
  const hora = now.toLocaleTimeString("es-CO", { timeZone: "America/Bogota" });

  const headers = {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    // Step 1: Ensure sheets exist. We can do a request to fetch spreadsheet metadata.
    const metaRes = await fetch(
      `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}`,
      { headers }
    );

    if (!metaRes.ok) {
      const errText = await metaRes.text();
      throw new Error(`No se pudo acceder a la hoja de cálculo: ${errText}`);
    }

    const meta = await metaRes.json();
    const sheetNames = (meta.sheets || []).map((s: any) => s.properties.title);

    const hasResultados = sheetNames.includes("Resultados");
    const hasDetalles = sheetNames.includes("Detalles_Respuestas");

    // Step 2: Create sheets and add headers if they don't exist
    const requests: any[] = [];
    if (!hasResultados) {
      requests.push({
        addSheet: {
          properties: { title: "Resultados" }
        }
      });
    }
    if (!hasDetalles) {
      requests.push({
        addSheet: {
          properties: { title: "Detalles_Respuestas" }
        }
      });
    }

    if (requests.length > 0) {
      console.log("[Sheets] Creando hojas necesarias en el documento...");
      const createRes = await fetch(
        `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}:batchUpdate`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ requests })
        }
      );

      if (!createRes.ok) {
        console.warn("[Sheets] Advertencia al crear pestañas:", await createRes.text());
      }
    }

    // Step 3: Write headers to "Resultados" if it was just created
    if (!hasResultados) {
      await fetch(
        `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Resultados!A1:N1?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            values: [[
              "Fecha", 
              "Hora", 
              "Tipo Identificación", 
              "Número Identificación", 
              "Nombre Completo", 
              "Edad", 
              "Empresa", 
              "Años Antigüedad", 
              "Tipo Licencia", 
              "Respuestas Correctas", 
              "Respuestas Incorrectas", 
              "Puntaje (Sobre 100)", 
              "Resultado", 
              "Tiempo Empleado"
            ]]
          })
        }
      );
    }

    // Step 4: Write headers to "Detalles_Respuestas" if it was just created
    if (!hasDetalles) {
      await fetch(
        `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Detalles_Respuestas!A1:H1?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            values: [[
              "Fecha", 
              "Hora", 
              "Número Identificación", 
              "Nombre Completo", 
              "Pregunta Número", 
              "Pregunta Texto", 
              "Respuesta Elegida", 
              "¿Es Correcta?"
            ]]
          })
        }
      );
    }

    // Step 5: Append result row to "Resultados"
    const resultadosRow = [
      fecha,
      hora,
      data.tipoIdentificacion,
      data.numeroIdentificacion,
      data.nombreCompleto,
      data.edad,
      data.empresa,
      data.antiguedad,
      data.tipoLicencia,
      data.correctas,
      data.incorrectas,
      data.puntaje,
      data.resultado,
      data.tiempoEmpleado
    ];

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Resultados!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          values: [resultadosRow]
        })
      }
    );

    if (!appendRes.ok) {
      const errText = await appendRes.text();
      throw new Error(`Error al agregar fila a Resultados: ${errText}`);
    }

    // Step 6: Append detail rows to "Detalles_Respuestas" if present
    let detailsCount = 0;
    if (data.detalles && Array.isArray(data.detalles) && data.detalles.length > 0) {
      const detallesRows = data.detalles.map((det, index) => [
        fecha,
        hora,
        data.numeroIdentificacion,
        data.nombreCompleto,
        index + 1,
        det.pregunta,
        det.elegida,
        det.esCorrecta ? "SÍ" : "NO"
      ]);

      const appendDetailsRes = await fetch(
        `https://sheets.googleapis.com/v1/spreadsheets/${parsedSpreadsheetId}/values/Detalles_Respuestas!A1:append?valueInputOption=USER_ENTERED`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            values: detallesRows
          })
        }
      );

      if (!appendDetailsRes.ok) {
        console.warn("[Sheets] No se pudo agregar el detalle de las respuestas:", await appendDetailsRes.text());
      } else {
        detailsCount = detallesRows.length;
      }
    }

    return {
      success: true,
      message: "Resultados sincronizados con Google Sheets con éxito.",
      details: {
        spreadsheetId: parsedSpreadsheetId,
        resultadosAgregados: 1,
        detallesAgregados: detailsCount
      }
    };

  } catch (error) {
    console.error("[Sheets] Error escribiendo resultados a Google Sheets:", error);
    throw error;
  }
}
