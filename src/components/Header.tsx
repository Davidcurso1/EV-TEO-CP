/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Car } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-10 py-4 flex items-center justify-between w-full print:hidden">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl font-sans">
          V
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase">VialPro</h1>
          <p className="text-[10px] text-blue-600 font-semibold tracking-widest uppercase">Seguridad Vial</p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-slate-500">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 
          <span className="hidden sm:inline">Sistema en Línea</span>
          <span className="inline sm:hidden">En Línea</span>
        </span>
        <span className="px-2.5 py-1 bg-slate-100 rounded-full text-[10px] sm:text-xs">v1.0.4</span>
      </div>
    </header>
  );
}
