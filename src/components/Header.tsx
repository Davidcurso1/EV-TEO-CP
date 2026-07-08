/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Car } from "lucide-react";
import InscolsstLogo from "./InscolsstLogo";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-10 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3.5 w-full print:hidden">
      <div className="flex items-center gap-4">
        {/* VialPro Branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg font-sans">
            V
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase leading-none pb-0.5">VialPro</h1>
            <p className="text-[9px] text-blue-600 font-bold tracking-widest uppercase leading-none">Seguridad Vial</p>
          </div>
        </div>

        {/* Divider line */}
        <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>

        {/* Co-Branding INSCOLSST */}
        <InscolsstLogo size="sm" className="hidden md:flex" />
      </div>

      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 text-xs sm:text-sm font-medium text-slate-500 border-t border-slate-100 pt-2.5 md:pt-0 md:border-t-0">
        <InscolsstLogo size="sm" className="md:hidden" />
        
        <div className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 
            <span className="text-[11px] font-semibold text-slate-500">Sistema en Línea</span>
          </span>
          <span className="px-2 py-0.5 bg-slate-100 rounded-full text-[9px] font-semibold text-slate-600">v1.0.4</span>
        </div>
      </div>
    </header>
  );
}
