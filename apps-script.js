/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GOOGLE APPS SCRIPT - SCRIPT DE SINCRONIZACIÓN
 * 
 * Este script se debe pegar en el editor de extensiones de Google Sheets (Extensiones > Apps Script).
 * Permite leer el banco de preguntas desde Google Docs y escribir los resultados del examen en Google Sheets.
 * 
 * REQUISITOS:
 * 1. Crear un documento de Google Docs con las preguntas.
 * 2. Configurar los IDs de Documento y Hoja de Cálculo en este script.
 * 3. Desplegar como "Aplicación web" con acceso para "Cualquiera" (Anyone).
 */

// CONFIGURACIÓN - REEMPLAZA CON TUS PROPIOS IDS SI ES NECESARIO
const GOOGLE_DOC_URL = "https://docs.google.com/document/d/14-Joj8-p_t9DkgKRb7Og23Xh_XrXDSqd3RZIEwhCOD4/edit";
const GOOGLE_DOC_ID = "14-Joj8-p_t9DkgKRb7Og23Xh_XrXDSqd3RZIEwhCOD4";

/**
 * Función principal para responder a peticiones HTTP GET (Lectura de Preguntas)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === "getQuestions") {
      const questions = fetchQuestionsFromDoc();
      return ContentService.createTextOutput(JSON.stringify(questions))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Si no se especifica acción, retornar estado del servicio
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "online", 
      message: "Servidor de Evaluación Teórica Activo",
      docId: GOOGLE_DOC_ID 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función principal para responder a peticiones HTTP POST (Guardado de Resultados)
 */
function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      throw new Error("No se recibieron datos de formulario.");
    }
    
    const data = JSON.parse(e.postData.contents);
    const result = saveResultsToSheets(data);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: "Resultados guardados con éxito",
      result: result 
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Obtiene e interpreta las preguntas desde un documento de Google Docs
 */
function fetchQuestionsFromDoc() {
  const questions = [];
  
  try {
    const doc = DocumentApp.openById(GOOGLE_DOC_ID);
    const body = doc.getBody();
    const text = body.getText();
    
    // Método 1: Intentar leer de tablas primero si el documento está estructurado como tabla
    const tables = body.getTables();
    if (tables.length > 0) {
      const table = tables[0];
      const numRows = table.getNumberOfRows();
      
      // Asumiendo que la fila 0 es cabecera (Pregunta, Opción A, Opción B, Opción C, Opción D, Correcta)
      for (let i = 1; i < numRows; i++) {
        const row = table.getRow(i);
        if (row.getNumberOfCells() >= 6) {
          const qText = row.getCell(0).getText().trim();
          const opA = row.getCell(1).getText().trim();
          const opB = row.getCell(2).getText().trim();
          const opC = row.getCell(3).getText().trim();
          const opD = row.getCell(4).getText().trim();
          let correctStr = row.getCell(5).getText().trim().toLowerCase();
          
          let correctAnswer = 0;
          if (correctStr.includes("b") || correctStr === "1") correctAnswer = 1;
          else if (correctStr.includes("c") || correctStr === "2") correctAnswer = 2;
          else if (correctStr.includes("d") || correctStr === "3") correctAnswer = 3;
          
          if (qText) {
            questions.push({
              id: i,
              question: qText,
              options: [opA, opB, opC, opD],
              correctAnswer: correctAnswer,
              category: "General"
            });
          }
        }
      }
    }
    
    // Método 2: Si no hay tablas o están vacías, procesar texto plano estructurado
    if (questions.length === 0) {
      const paragraphs = body.getParagraphs();
      let currentQuestion = null;
      let qId = 1;
      
      for (let i = 0; i < paragraphs.length; i++) {
        const pText = paragraphs[i].getText().trim();
        if (!pText) continue;
        
        // Detecta pregunta: comienza con número, ej: "1. ¿Qué..." o "¿Qué..."
        const isQuestionMatch = pText.match(/^(\d+)[\.\s]+(.*)/) || pText.startsWith("¿") || pText.endsWith("?");
        
        if (isQuestionMatch && !pText.match(/^[a-d\)]/i)) {
          // Guardar pregunta anterior
          if (currentQuestion && currentQuestion.options.length >= 2) {
            questions.push(currentQuestion);
          }
          
          let cleanQText = pText;
          const match = pText.match(/^(\d+)[\.\s]+(.*)/);
          if (match) cleanQText = match[2];
          
          currentQuestion = {
            id: qId++,
            question: cleanQText,
            options: [],
            correctAnswer: 0,
            category: "General"
          };
        } else if (currentQuestion) {
          // Detectar opciones: ej. "a) Opción", "b) Opción", "A. Opción" o "*c) Opción"
          const isOptionMatch = pText.match(/^[\*\s]*([a-dA-D])[\.\)\s]+(.*)/);
          if (isOptionMatch) {
            let optionText = isOptionMatch[2].trim();
            const optionLetter = isOptionMatch[1].toLowerCase();
            
            // Si tiene un asterisco al inicio o al final, es la respuesta correcta
            const isCorrect = pText.includes("*") || pText.toLowerCase().includes("(correcta)");
            optionText = optionText.replace(/\*/g, "").replace(/\(correcta\)/gi, "").trim();
            
            currentQuestion.options.push(optionText);
            
            if (isCorrect) {
              currentQuestion.correctAnswer = currentQuestion.options.length - 1;
            }
          }
        }
      }
      
      // Añadir la última pregunta
      if (currentQuestion && currentQuestion.options.length >= 2) {
        questions.push(currentQuestion);
      }
    }
    
  } catch (error) {
    Logger.log("Error al leer Google Doc: " + error);
  }
  
  // Si por alguna razón el documento no se pudo leer o no tiene formato compatible,
  // devolvemos un banco estático predeterminado para que nunca falle la app
  if (questions.length === 0) {
    return getFallbackQuestions();
  }
  
  return questions;
}

/**
 * Guarda los resultados del examen en Google Sheets
 */
function saveResultsToSheets(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Obtener o crear hoja "Resultados"
  let resSheet = ss.getSheetByName("Resultados");
  if (!resSheet) {
    resSheet = ss.insertSheet("Resultados");
    // Crear cabecera para la hoja de resultados
    resSheet.appendRow([
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
    ]);
    resSheet.getRange("A1:N1").setFontWeight("bold").setBackground("#1e3a8a").setFontColor("white");
  }
  
  // 2. Obtener o crear hoja "Detalles_Respuestas" para almacenar el detalle de las 30 preguntas
  let detailSheet = ss.getSheetByName("Detalles_Respuestas");
  if (!detailSheet) {
    detailSheet = ss.insertSheet("Detalles_Respuestas");
    detailSheet.appendRow([
      "Fecha", 
      "Hora", 
      "Número Identificación", 
      "Nombre Completo", 
      "Pregunta Número", 
      "Pregunta Texto", 
      "Respuesta Elegida", 
      "¿Es Correcta?"
    ]);
    detailSheet.getRange("A1:H1").setFontWeight("bold").setBackground("#0f766e").setFontColor("white");
  }
  
  // Escribir fila en "Resultados"
  const fecha = data.fecha || new Date().toLocaleDateString();
  const hora = data.hora || new Date().toLocaleTimeString();
  
  resSheet.appendRow([
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
  ]);
  
  // Escribir el detalle de las preguntas respondidas si están incluidas en el payload
  if (data.detalles && Array.isArray(data.detalles)) {
    data.detalles.forEach((det, index) => {
      detailSheet.appendRow([
        fecha,
        hora,
        data.numeroIdentificacion,
        data.nombreCompleto,
        index + 1,
        det.pregunta,
        det.elegida,
        det.esCorrecta ? "SÍ" : "NO"
      ]);
    });
  }
  
  return {
    rowsAdded: 1,
    detailsAdded: data.detalles ? data.detalles.length : 0
  };
}

/**
 * Preguntas de contingencia en caso de que falle la lectura del documento
 */
function getFallbackQuestions() {
  return [
    {
      id: 1,
      question: "¿Cuál es el límite de velocidad máximo permitido en zonas escolares?",
      options: ["50 km/h", "30 km/h", "40 km/h", "20 km/h"],
      correctAnswer: 1,
      category: "Límites de velocidad"
    },
    {
      id: 2,
      question: "¿Qué indica una doble línea continua amarilla en el centro de la vía?",
      options: [
        "Adelantamiento permitido en ambas direcciones", 
        "Prohibido adelantar en ambos sentidos", 
        "Carril exclusivo para emergencias", 
        "Estacionamiento permitido"
      ],
      correctAnswer: 1,
      category: "Señalización"
    },
    {
      id: 3,
      question: "¿Cuál es el nivel de alcohol en sangre permitido para conductores de servicio público?",
      options: ["0.3 g/l", "0.5 g/l", "0.0 g/l (Tolerancia Cero)", "0.1 g/l"],
      correctAnswer: 2,
      category: "Leyes y sanciones"
    }
  ];
}
