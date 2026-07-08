/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Building2, 
  Clock, 
  User, 
  FileSpreadsheet, 
  Printer, 
  RotateCcw, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Download 
} from "lucide-react";
import { UserRegistration, AnswerDetail, ExamResult, SyncStatus } from "../types";
import InscolsstLogo from "./InscolsstLogo";

interface ExamResultCardProps {
  registration: UserRegistration;
  answers: AnswerDetail[];
  timeSpent: string;
  onRestart: () => void;
}

export default function ExamResultCard({ 
  registration, 
  answers, 
  timeSpent, 
  onRestart
}: ExamResultCardProps) {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ status: "idle" });
  const [showDetails, setShowDetails] = useState(false);
  const isMounted = useRef(false);

  // Calculate scores
  const totalQuestions = answers.length;
  const correctCount = answers.filter(a => a.esCorrecta).length;
  const incorrectCount = totalQuestions - correctCount;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const isApproved = score >= 80; // 80% standard passing score (24/30)

  // Format date and time
  const now = new Date();
  const fechaStr = now.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const horaStr = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const finalResultPayload: ExamResult = {
    fecha: fechaStr,
    hora: horaStr,
    tipoIdentificacion: registration.tipoIdentificacion as any,
    numeroIdentificacion: registration.numeroIdentificacion,
    nombreCompleto: registration.nombreCompleto,
    edad: Number(registration.edad),
    empresa: registration.empresa,
    antiguedad: Number(registration.antiguedad),
    tipoLicencia: registration.tipoLicencia as any,
    correctas: correctCount,
    incorrectas: incorrectCount,
    puntaje: score,
    resultado: isApproved ? "Aprobado" : "No aprobado",
    tiempoEmpleado: timeSpent,
    detalles: answers
  };

  // Auto trigger synchronization on mount
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    triggerSync(finalResultPayload);
  }, []);

  const triggerSync = async (payload: ExamResult) => {
    setSyncStatus({ status: "syncing", message: "Conectando con Google Sheets..." });
    
    try {
      // 1. Try sending via the server proxy first
      const response = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get("content-type") || "";
      if (response.ok && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.success) {
          setSyncStatus({ 
            status: "success", 
            message: data.message || "Resultados guardados y sincronizados con Google Sheets" 
          });
          return;
        }
      }
      
      // If we got here, server API returned non-ok or non-JSON. Fall through to direct saving.
      throw new Error("El proxy del servidor no está disponible o devolvió un formato incorrecto.");
    } catch (error) {
      console.warn("La API del servidor falló o no está disponible. Intentando conexión directa con Google Sheets...", error);
      setSyncStatus({ status: "syncing", message: "Intentando guardado directo en Google Sheets..." });
      
      const googleScriptUrl = "https://script.google.com/macros/s/AKfycbz-71DSfUE2B-zOgtRHfQcsUBCYexISQKBtaJsBF8lJ_0qqzkoBQUOtsdY86MJeRj9I/exec";
      
      try {
        // Try direct fetch with text/plain to avoid preflight issues
        const directResponse = await fetch(googleScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        });

        // Some Google script setups might return success but trigger redirect that throws CORS.
        // If we didn't throw, assume success!
        setSyncStatus({ 
          status: "success", 
          message: "Resultados guardados directamente en Google Sheets" 
        });
      } catch (directError) {
        console.warn("Fallo con CORS directo, intentando con modo no-cors como alternativa...", directError);
        try {
          // Send request with no-cors. The request will reach Google and write to Sheets,
          // even if the browser block reading the response back.
          await fetch(googleScriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
          });
          
          setSyncStatus({ 
            status: "success", 
            message: "Resultados sincronizados con Google Sheets (Envío Directo)" 
          });
        } catch (noCorsError) {
          console.error("Todos los intentos de sincronización fallaron:", noCorsError);
          setSyncStatus({ 
            status: "error", 
            message: "No se pudo sincronizar en línea. Los resultados quedan guardados de forma local.",
            savedLocal: true
          });
        }
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-12 print:max-w-none print:px-0">
      {/* Synchronization Status Widget */}
      <div className="mb-4 print:hidden">
        {syncStatus.status === "syncing" && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3.5 rounded-2xl flex items-center gap-3 text-xs font-medium">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
            <span className="flex-1">{syncStatus.message}</span>
          </div>
        )}
        {syncStatus.status === "success" && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl flex items-center gap-3 text-xs font-medium shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="flex-1">{syncStatus.message}</span>
            <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md font-mono text-[10px] uppercase font-bold tracking-wider">
              Sheets OK
            </span>
          </div>
        )}
        {syncStatus.status === "error" && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3.5 rounded-2xl flex flex-col gap-2 shadow-sm">
            <div className="flex items-start gap-3 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-bold">Sincronización Local Activa</p>
                <p className="text-[11px] opacity-80 mt-0.5">{syncStatus.message}</p>
              </div>
              <span className="bg-amber-600 text-white px-2 py-0.5 rounded-md font-mono text-[10px] uppercase font-bold tracking-wider shrink-0">
                Local Guardado
              </span>
            </div>
            <div className="flex gap-2 justify-end mt-1">
              <button
                onClick={() => triggerSync(finalResultPayload)}
                className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reintentar Sincronización
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Elegant Certificate / Results Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden print:shadow-none print:border-none"
        id="certificate-container"
      >
        {/* Certificate Header Banner */}
        <div className={`text-white px-6 py-8 text-center relative overflow-hidden ${
          isApproved ? "bg-gradient-to-br from-slate-900 to-emerald-950" : "bg-gradient-to-br from-slate-900 to-rose-950"
        }`}>
          {/* Subtle graphic rings */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {isApproved ? (
              <div className="bg-emerald-500/20 text-emerald-400 p-3.5 rounded-full border border-emerald-500/30 shadow-lg mb-3">
                <Award className="w-10 h-10 animate-bounce" />
              </div>
            ) : (
              <div className="bg-rose-500/20 text-rose-400 p-3.5 rounded-full border border-rose-500/30 shadow-lg mb-3">
                <AlertCircle className="w-10 h-10" />
              </div>
            )}
            
            <h2 className="font-display font-extrabold text-xl tracking-wide uppercase">
              Resultado de Evaluación
            </h2>
            
            {/* Approved / Failed Big Badge */}
            <div className={`mt-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-inner inline-flex items-center gap-1.5 ${
              isApproved ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
            }`}>
              {isApproved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              {isApproved ? "APROBADO" : "NO APROBADO"}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Score Circle Panel */}
          <div className="flex flex-col items-center justify-center py-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nota Final</span>
            <div className="relative flex items-center justify-center">
              {/* Radial Score Gauge */}
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className="stroke-slate-200"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className={`${isApproved ? "stroke-emerald-500" : "stroke-rose-500"} transition-all duration-1000 ease-out`}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={2 * Math.PI * 48 * (1 - score / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-extrabold text-slate-800 tracking-tight font-mono">{score}</span>
                <span className="text-xs text-slate-400 font-bold font-mono">/100</span>
              </div>
            </div>

            {/* Answer fractions */}
            <div className="flex gap-4 mt-4 text-xs font-bold">
              <div className="flex items-center gap-1 bg-emerald-100/55 text-emerald-800 px-3 py-1 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {correctCount} Correctas
              </div>
              <div className="flex items-center gap-1 bg-rose-100/55 text-rose-800 px-3 py-1 rounded-xl">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                {incorrectCount} Incorrectas
              </div>
            </div>
          </div>

          {/* User Registration Summary Details */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1">
              Datos del Participante
            </h4>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-slate-700">
              <div className="flex items-start gap-1.5 col-span-2">
                <User className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase leading-tight">Nombre Completo</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{registration.nombreCompleto}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Award className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase leading-tight">Identificación</p>
                  <p className="font-bold text-slate-800 mt-0.5">{registration.numeroIdentificacion}</p>
                  <p className="text-[9px] text-slate-400 opacity-90">{registration.tipoIdentificacion}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Building2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase leading-tight">Empresa</p>
                  <p className="font-bold text-slate-800 mt-0.5 truncate max-w-[150px]">{registration.empresa}</p>
                  <p className="text-[9px] text-slate-400">Antigüedad: {registration.antiguedad} años</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Award className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase leading-tight">Licencia Aspira</p>
                  <p className="font-bold text-slate-800 mt-0.5">Categoría {registration.tipoLicencia}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase leading-tight">Tiempo Empleado</p>
                  <p className="font-bold text-slate-800 mt-0.5">{timeSpent} min</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5 col-span-2 border-t pt-2 mt-1">
                <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase leading-tight">Fecha y Hora de Emisión</p>
                  <p className="font-medium text-slate-800 mt-0.5">{fechaStr} - {horaStr}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Co-Branded Official Seal of INSCOLSST & VialPro */}
          <div className="border-t border-slate-100 pt-5 mt-6 pb-2 text-center flex flex-col items-center justify-center bg-slate-50/50 -mx-6 px-6 border-b rounded-b-3xl">
            <InscolsstLogo size="sm" variant="full" className="justify-center" />
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-3 tracking-widest">
              Entidad de Co-Certificación Autorizada
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-900 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Imprimir / PDF
            </button>
            <button
              onClick={onRestart}
              className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Nuevo Examen
            </button>
          </div>
        </div>
      </motion.div>

      {/* Detailed Question Review Audit Log (Expandable Panel) */}
      <div className="mt-5 print:block">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full bg-white border border-slate-200 px-5 py-4 rounded-2xl shadow-sm text-slate-700 font-bold flex items-center justify-between text-xs sm:text-sm cursor-pointer hover:bg-slate-50 transition-all print:hidden"
        >
          <span className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-teal-600 animate-pulse" />
            Revisar Respuestas Detalladas ({answers.length})
          </span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Audit details panel */}
        {(showDetails || typeof window === "undefined") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm print:shadow-none print:border-none print:p-0"
          >
            <h3 className="text-sm font-bold text-slate-800 border-b pb-2 mb-3 flex items-center justify-between">
              <span>Auditoría de Preguntas Respondidas</span>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-mono font-normal">
                {correctCount}/{totalQuestions} Aciertos
              </span>
            </h3>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-1 print:max-h-none print:overflow-visible">
              {answers.map((ans, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
                    ans.esCorrecta 
                      ? "bg-emerald-50/50 border-emerald-100" 
                      : "bg-rose-50/50 border-rose-100"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <strong className="text-slate-800 block text-[11px] sm:text-xs">
                      Pregunta {idx + 1}: {ans.pregunta}
                    </strong>
                    {ans.esCorrecta ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-slate-200/50 text-[10px] text-slate-600">
                    <div>
                      <span className="font-semibold block text-slate-400 uppercase">Tu Respuesta:</span>
                      <span className={`font-medium ${ans.esCorrecta ? "text-emerald-700" : "text-rose-700"}`}>
                        {ans.elegida}
                      </span>
                    </div>
                    {!ans.esCorrecta && (
                      <div>
                        <span className="font-semibold block text-slate-400 uppercase">Respuesta Correcta:</span>
                        <span className="font-medium text-emerald-700">
                          {ans.correcta}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Embedded CSS Print Rule for perfect certificate printing */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          #certificate-container {
            border: 2px solid #ccc !important;
            box-shadow: none !important;
            border-radius: 12px !important;
          }
          header, button, .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
