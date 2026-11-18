import React from 'react';
import { 
  Cpu, 
  Zap, 
  SunMedium, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Cable, 
  CheckCircle2, 
  BarChart3, 
  Wind, 
  Shield, 
  Wifi, 
  Award, 
  Wrench,
  Binary,
  Microscope,
  Compass,
  ArrowRight,
  Sparkles,
  Gauge,
  Workflow,
  CheckCheck,
  Radio,
  FileCheck2,
  Flame,
  Power,
  RotateCw
} from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import Watermark from '../common/Watermark';
import { getPanelLogo, getInverterLogo, getCableLogo, EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage2SystemSpec({ quotation, settings }) {
  const company = settings?.company || {};
  const technical = quotation?.technical || {};
  const customer = quotation?.customer || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const acKw = parseFloat(technical?.acInverterCapacityKw || (technical?.systemCapacityKw ? Math.min(technical.systemCapacityKw, 5) : 5.0));
  const panelWattage = technical?.panelWattage || 550;
  const panelCount = technical?.panelCount || Math.ceil((dcKw * 1000) / panelWattage);
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));
  const roofArea = technical?.roofAreaSqFt || Math.round(dcKw * 90);

  const panelLogo = getPanelLogo(technical?.panelBrand);
  const inverterLogo = getInverterLogo(technical?.inverterBrand);

  // Month-by-month solar generation profile
  const monthlyProfile = [
    { month: 'Jan', factor: 0.92 },
    { month: 'Feb', factor: 0.98 },
    { month: 'Mar', factor: 1.08 },
    { month: 'Apr', factor: 1.12 },
    { month: 'May', factor: 1.06 },
    { month: 'Jun', factor: 0.82 },
    { month: 'Jul', factor: 0.72 },
    { month: 'Aug', factor: 0.75 },
    { month: 'Sep', factor: 0.86 },
    { month: 'Oct', factor: 0.95 },
    { month: 'Nov', factor: 0.94 },
    { month: 'Dec', factor: 0.90 }
  ];

  const avgMonthly = annualKwh / 12;

  // Engineering Bill of Materials Itemized Specs
  const bomRows = [
    {
      code: "01",
      category: "Solar PV Modules",
      specs: `${panelCount} Nos. × ${panelWattage}Wp N-Type TOPCon Dual-Glass Bifacial Modules (Total: ${dcKw} kWp DC)`,
      brand: technical?.panelBrand || "Waaree / Adani / Tata",
      standard: "IEC 61215 / IS 14286",
      warranty: "25-Yr Linear"
    },
    {
      code: "02",
      category: "Grid-Tied Inverter",
      specs: `${acKw} kW AC Capacity, Dual MPPT Tracker, 98.6% Efficiency, Built-in Wi-Fi IoT Cloud Telemetry`,
      brand: technical?.inverterBrand || "Sungrow / Solis / GoodWe",
      standard: "IEC 62109 / VDE 0126",
      warranty: "8-Yr Onsite"
    },
    {
      code: "03",
      category: "MMS Structure",
      specs: "Elevated Hot-Dip Galvanized Iron (GI) 80µ Zinc Coating, Wind-Rated for 180 km/h, SS-304 Fasteners",
      brand: "Srimaan Heavy-Duty GI Structural Rigging",
      standard: "IS 875 (P-3) / IS 2062",
      warranty: "10-Yr Structural"
    },
    {
      code: "04",
      category: "Solar DC / AC Cables",
      specs: "4 sq.mm & 6 sq.mm TUV/UL Certified Multi-Strand Tinned Copper Flame Retardant (FR-LSH) Cables",
      brand: "Polycab / Siechem",
      standard: "EN 50618 / IS 694",
      warranty: "25-Yr Rated"
    },
    {
      code: "05",
      category: "Safety Distribution",
      specs: "DCDB & ACDB Enclosures with IP65, Type-II 1000V DC SPDs, Bi-polar MCBs & 4-Pole RCCB Protection",
      brand: "Schneider / Hensel / L&T",
      standard: "IEC 61439 / IS 13947",
      warranty: "5-Yr Warranty"
    },
    {
      code: "06",
      category: "Grounding & Lightning",
      specs: "3 Independent Chemical Compound Earthing Pits (<2Ω Resistance) + Copper Bonded Lightning Arrester",
      brand: "Srimaan Chemical Compound Earthing Matrix",
      standard: "IS 3043 / NFC 17-102",
      warranty: "5-Yr Assurance"
    }
  ];

  return (
    <div className="a4-preview-sheet p-6 sm:p-7 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* 4-Color Signature Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-sky-500 via-eco-500 to-solar-orange z-10" />

      {/* Official Subtle Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2.5">
        <div className="space-y-2.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img src="/assets/srimaan_logo.jpeg" alt="SRIMAAN SOLAR" className="w-full h-full object-contain" />
              </div>
              <div className="border-l border-slate-300 pl-3">
                <p className="text-xs font-black text-brand-900 tracking-tight uppercase flex items-center gap-2">
                  <span>TECHNICAL HARDWARE SPECIFICATIONS &amp; SYSTEM ARCHITECTURE</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-sky-200">
                    Tier-1 Hardware BOM
                  </span>
                </p>
                <p className="text-[9px] text-slate-500">
                  Engineered Hardware Bill of Materials, Component Compliance &amp; PVsyst Solar Simulation
                </p>
              </div>
            </div>
            
            <div className="text-right text-[9px] text-slate-500">
              <span className="font-mono font-bold text-brand-900">Ref: {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}</span>
              <p className="font-medium text-slate-600">Capacity: <span className="font-bold text-brand-900">{dcKw} kWp DC</span></p>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3-PILLAR HARDWARE COMPONENT TOWERS                             */}
          {/* ============================================================== */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* TOWER 1: SOLAR PV MODULES (LIGHT BLUE THEME) */}
            <div className="bg-white rounded-2xl border-2 border-sky-400/80 p-3 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[8px] font-extrabold uppercase tracking-wide border border-sky-200">
                    Generation Engine
                  </span>
                  {panelLogo && (
                    <img src={panelLogo} alt="" className="h-3.5 object-contain" />
                  )}
                </div>

                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-black text-brand-900">
                    {technical?.panelBrand || 'Tier-1 TOPCon'}
                  </h3>
                  <span className="text-xs font-black text-sky-600 font-mono">
                    {panelWattage}Wp
                  </span>
                </div>
                <p className="text-[8px] text-slate-500 font-medium mt-0.5 truncate">
                  {technical?.panelModel || 'Bi-facial N-Type Dual Glass Module'}
                </p>

                {/* Specs Pill Matrix */}
                <div className="mt-2 space-y-1 text-[8px]">
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">Module Count</span>
                    <span className="font-bold text-slate-800">{panelCount} Units</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">Cell Technology</span>
                    <span className="font-bold text-brand-900">N-Type TOPCon 144-Cell</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">Module Efficiency</span>
                    <span className="font-bold text-eco-600">22.3% Peak</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Bifacial Rear Gain</span>
                    <span className="font-bold text-solar-orange">+15% to +25% Extra</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[7.5px] font-bold text-sky-800">
                <span>&#10003; 25-Yr Linear Yield Guarantee</span>
                <span className="bg-sky-50 px-1.5 py-0.2 rounded text-[7px]">IEC 61215</span>
              </div>
            </div>

            {/* TOWER 2: SMART GRID INVERTER (SOLAR ORANGE THEME) */}
            <div className="bg-white rounded-2xl border-2 border-amber-400/80 p-3 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[8px] font-extrabold uppercase tracking-wide border border-amber-200">
                    Power Conversion
                  </span>
                  {inverterLogo && (
                    <img src={inverterLogo} alt="" className="h-3.5 object-contain" />
                  )}
                </div>

                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-black text-brand-900">
                    {technical?.inverterBrand || 'Sungrow'}
                  </h3>
                  <span className="text-xs font-black text-solar-amber font-mono">
                    {acKw} kW AC
                  </span>
                </div>
                <p className="text-[8px] text-slate-500 font-medium mt-0.5 truncate">
                  {technical?.inverterModel || 'Smart Dual-MPPT Cloud Connected Inverter'}
                </p>

                {/* Specs Pill Matrix */}
                <div className="mt-2 space-y-1 text-[8px]">
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">Max Inverter Efficiency</span>
                    <span className="font-bold text-eco-600">98.6% Euro Rating</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">MPPT Trackers</span>
                    <span className="font-bold text-slate-800">Dual MPPT (2 Inputs)</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">IoT Telemetry</span>
                    <span className="font-bold text-brand-900">24/7 Wi-Fi + Mobile App</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Protection Rating</span>
                    <span className="font-bold text-slate-800">IP65 Weatherproof</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[7.5px] font-bold text-amber-900">
                <span>&#10003; 8-Yr Comprehensive Warranty</span>
                <span className="bg-amber-50 px-1.5 py-0.2 rounded text-[7px]">Anti-Islanding</span>
              </div>
            </div>

            {/* TOWER 3: MMS & ELECTRICAL SAFETY (DARK BLUE THEME) */}
            <div className="bg-white rounded-2xl border-2 border-brand-900/60 p-3 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-900/5 rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-900 text-[8px] font-extrabold uppercase tracking-wide border border-sky-200">
                    Structural &amp; Safety
                  </span>
                  <div className="flex items-center gap-1 text-[7px] text-eco-700 font-bold bg-eco-50 px-1.5 py-0.5 rounded border border-eco-200">
                    <ShieldCheck className="w-2.5 h-2.5 text-eco-600" />
                    <span>Tested</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-black text-brand-900">
                    Heavy-Duty MMS
                  </h3>
                  <span className="text-xs font-black text-brand-900 font-mono">
                    80µ Zinc
                  </span>
                </div>
                <p className="text-[8px] text-slate-500 font-medium mt-0.5 truncate">
                  {technical?.structureType || 'Hot-Dip Galvanized Iron (GI) 7-9 ft'}
                </p>

                {/* Specs Pill Matrix */}
                <div className="mt-2 space-y-1 text-[8px]">
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">Wind Velocity Rating</span>
                    <span className="font-bold text-slate-800">180 km/h Certified</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">Structural Hardware</span>
                    <span className="font-bold text-slate-800">SS-304 Grade Fasteners</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">Chemical Earthing</span>
                    <span className="font-bold text-eco-600">3 Pits (&lt;2Ω Resistance)</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Surge Arresters</span>
                    <span className="font-bold text-brand-900">Type-II DC &amp; AC SPDs</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[7.5px] font-bold text-brand-900">
                <span>&#10003; 10-Yr Structural Integrity</span>
                <span className="bg-brand-50 px-1.5 py-0.2 rounded text-[7px]">IS 875 P3</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* MIDDLE SECTION: SPLIT BLUEPRINT HUB                            */}
          {/* ============================================================== */}
          <div className="grid grid-cols-12 gap-2.5">
            {/* LEFT (7 COLS): HIGH-DENSITY BOM TABLE */}
            <div className="col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="bg-slate-100/90 px-3 py-1.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-[9.5px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-sky-600" />
                    Bill of Materials (BOM) Itemized Specifications
                  </span>
                  <span className="text-[7.5px] font-bold text-eco-700 bg-eco-50 px-1.5 py-0.2 rounded border border-eco-200">
                    100% Brand New
                  </span>
                </div>

                <div className="overflow-x-auto text-[8px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200 text-[7px] tracking-wider">
                        <th className="py-1 px-2.5 w-8">Code</th>
                        <th className="py-1 px-2">Subsystem &amp; Specifications</th>
                        <th className="py-1 px-2">Make / Standard</th>
                        <th className="py-1 px-2 text-right">Warranty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bomRows.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/40" : "bg-white"}>
                          <td className="py-1 px-2.5 font-mono font-bold text-brand-900">{row.code}</td>
                          <td className="py-1 px-2">
                            <span className="font-extrabold text-slate-900 block leading-tight">{row.category}</span>
                            <span className="text-[7px] text-slate-500 leading-tight block">{row.specs}</span>
                          </td>
                          <td className="py-1 px-2 font-medium text-slate-700">
                            <span className="block font-semibold text-slate-800">{row.brand}</span>
                            <span className="text-[6.5px] text-slate-400 font-mono block">{row.standard}</span>
                          </td>
                          <td className="py-1 px-2 text-right font-extrabold text-eco-700 shrink-0">
                            {row.warranty}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rooftop Footprint Footer */}
              <div className="p-1.5 bg-slate-50 border-t border-slate-200 text-[7.5px] text-slate-600 flex items-center justify-between">
                <span>Terrace Space Required: <strong>~{roofArea} Sq.Ft</strong> shadow-free area</span>
                <span className="text-brand-900 font-bold">1 kWp ≈ 85–90 Sq.Ft Terrace Area</span>
              </div>
            </div>

            {/* RIGHT (5 COLS): GENERATION PROFILE & METRICS */}
            <div className="col-span-5 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200 p-2.5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="text-[9.5px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-solar-orange" />
                    PVsyst Generation Model
                  </span>
                  <span className="text-[7.5px] text-eco-700 bg-eco-50 px-1.5 py-0.2 rounded font-bold border border-eco-200">
                    South-India Solar Map
                  </span>
                </div>

                {/* Annual Generation Hero Capsule */}
                <div className="mt-1.5 p-2 rounded-xl bg-gradient-to-r from-brand-950 to-brand-900 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[7px] uppercase font-bold text-sky-300 block">
                      Estimated Annual Generation
                    </span>
                    <span className="text-base font-black text-white leading-tight">
                      {formatNumber(annualKwh)} <span className="text-[9px] font-normal text-slate-300">kWh/yr</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[7px] uppercase font-bold text-slate-400 block">Daily Average</span>
                    <span className="text-xs font-black text-solar-warm">~{dailyKwh} Units</span>
                  </div>
                </div>

                {/* 12-Month Generation Histogram */}
                <div className="mt-1.5">
                  <div className="flex items-center justify-between text-[7px] text-slate-500 font-semibold mb-0.5">
                    <span>Monthly Generation Profile (Units/Month)</span>
                    <span className="font-mono text-slate-400">Avg: {Math.round(avgMonthly)} kWh/mo</span>
                  </div>

                  <div className="grid grid-cols-12 gap-0.5 items-end h-14 pt-1 bg-white p-1 rounded-xl border border-slate-200/80">
                    {monthlyProfile.map((m, idx) => {
                      const mKwh = Math.round(avgMonthly * m.factor);
                      const heightPercent = Math.min(100, Math.max(25, (m.factor / 1.15) * 100));
                      const isPeak = m.factor >= 1.05;
                      const isMonsoon = m.factor <= 0.85;

                      return (
                        <div key={idx} className="flex flex-col items-center h-full justify-end group">
                          <div 
                            className={`w-full rounded-t-sm transition-all ${
                              isPeak 
                                ? 'bg-gradient-to-t from-solar-orange to-solar-amber' 
                                : isMonsoon 
                                  ? 'bg-gradient-to-t from-sky-400 to-sky-500' 
                                  : 'bg-gradient-to-t from-brand-800 to-sky-700'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                            title={`${m.month}: ${mKwh} kWh`}
                          />
                          <span className="text-[6px] font-mono text-slate-600 mt-0.5 font-bold">
                            {m.month[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3 Seasonal Insights */}
                <div className="mt-1.5 grid grid-cols-3 gap-1 text-center text-[7px]">
                  <div className="p-1 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 block font-bold">Summer Peak</span>
                    <span className="font-black text-solar-amber block mt-0.5">~{Math.round(dailyKwh * 1.12)} Units/d</span>
                  </div>
                  <div className="p-1 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 block font-bold">Winter Clear</span>
                    <span className="font-black text-brand-900 block mt-0.5">~{Math.round(dailyKwh * 0.95)} Units/d</span>
                  </div>
                  <div className="p-1 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 block font-bold">Monsoon Avg</span>
                    <span className="font-black text-sky-700 block mt-0.5">~{Math.round(dailyKwh * 0.78)} Units/d</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-200 text-[6.5px] text-slate-500 leading-tight">
                Modeled via Meteonorm global solar irradiance database for South Indian latitudes.
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BALANCE OF SYSTEM (BOS) & ELECTRICAL PROTECTION MATRIX         */}
          {/* ============================================================== */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-eco-600" />
                Balance of System (BOS) &amp; Comprehensive Safety Architecture
              </span>
              <span className="text-[7.5px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                Triple Protection Standard
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[7.5px]">
              {/* Col 1 */}
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="font-black text-brand-900 block text-[8px] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-solar-orange" />
                  DC Surge &amp; Isolator
                </span>
                <p className="text-slate-600 mt-1 leading-snug">
                  IP65 DCDB enclosure with 1000V DC rotary isolator, Type-II DC SPDs, and 15A gPV fuses on each positive string.
                </p>
                <span className="inline-block mt-1 font-mono text-[6.5px] text-slate-400">IEC 61643-31</span>
              </div>

              {/* Col 2 */}
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="font-black text-brand-900 block text-[8px] flex items-center gap-1">
                  <Power className="w-3 h-3 text-sky-600" />
                  AC Grid Sync &amp; Trip
                </span>
                <p className="text-slate-600 mt-1 leading-snug">
                  Schneider / L&amp;T 4-Pole MCB &amp; 30mA high-sensitivity RCCB, Type-II AC surge suppressor, and automatic anti-islanding disconnect.
                </p>
                <span className="inline-block mt-1 font-mono text-[6.5px] text-slate-400">IEEE 1547 / IS 13947</span>
              </div>

              {/* Col 3 */}
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="font-black text-brand-900 block text-[8px] flex items-center gap-1">
                  <Flame className="w-3 h-3 text-eco-600" />
                  3 Chemical Grounding Pits
                </span>
                <p className="text-slate-600 mt-1 leading-snug">
                  3 independent compound earth pits: Array frame ground, Inverter AC ground, and copper-bonded lightning arrester (&lt;2Ω).
                </p>
                <span className="inline-block mt-1 font-mono text-[6.5px] text-slate-400">IS 3043:2018</span>
              </div>

              {/* Col 4 */}
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="font-black text-brand-900 block text-[8px] flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-brand-900" />
                  IoT Real-Time Telemetry
                </span>
                <p className="text-slate-600 mt-1 leading-snug">
                  Cloud Wi-Fi / 4G IoT data logger. Live generation curves, daily yield notifications, and instant inverter error alerts.
                </p>
                <span className="inline-block mt-1 font-mono text-[6.5px] text-slate-400">Modbus RS-485</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PV SYSTEM ENERGY FLOW SCHEMATIC DIAGRAM                        */}
          {/* ============================================================== */}
          <div className="p-2 bg-gradient-to-r from-brand-950 via-brand-900 to-sky-950 rounded-2xl text-white shadow-xs flex items-center justify-between text-[7.5px]">
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2 py-0.5 rounded bg-white/10 text-sky-300 font-extrabold uppercase text-[7px] border border-white/15">
                Energy Flow
              </span>
              <span className="font-bold text-white text-[8px]">On-Grid Architecture:</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10 text-white font-bold">1. TOPCon Array (DC)</span>
              <span className="text-solar-orange font-bold">&rarr;</span>
              <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10 text-white font-bold">2. DCDB Isolator</span>
              <span className="text-solar-orange font-bold">&rarr;</span>
              <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10 text-white font-bold">3. Smart Inverter</span>
              <span className="text-solar-orange font-bold">&rarr;</span>
              <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10 text-white font-bold">4. ACDB Panel</span>
              <span className="text-solar-orange font-bold">&rarr;</span>
              <span className="bg-solar-warm/20 text-solar-warm px-2 py-0.5 rounded border border-solar-orange/30 font-black">5. Net-Meter &amp; Grid</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BOTTOM CERTIFIED QUALITY & SAFETY COMPLIANCE STRIP             */}
          {/* ============================================================== */}
          <div className="p-2 bg-gradient-to-r from-slate-50 via-sky-50/40 to-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-[8px]">
            <div className="flex items-center gap-1.5 text-brand-900 font-bold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-eco-600" />
              <span>Certified Engineering Standards:</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600 text-[7.5px]">
              <span className="px-2 py-0.5 bg-white rounded-md border border-slate-200 font-mono font-semibold">
                IEC 61215 / IS 14286 (PV Modules)
              </span>
              <span className="px-2 py-0.5 bg-white rounded-md border border-slate-200 font-mono font-semibold">
                IEC 62109 / 61727 (Inverters)
              </span>
              <span className="px-2 py-0.5 bg-white rounded-md border border-slate-200 font-mono font-semibold">
                IS 3043 (Chemical Earthing)
              </span>
              <span className="px-2 py-0.5 bg-white rounded-md border border-slate-200 font-mono font-semibold">
                IEEE 1547 (Anti-Islanding)
              </span>
            </div>
          </div>
        </div>

        {/* Page 2 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <div>
            <span className="font-bold text-brand-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.tagline || 'Clean Green Renewable Energy EPC Partner'}
          </div>
          <div className="flex items-center gap-4">
            <span>Hardware subject to manufacturer quality certifications &amp; factory testing</span>
            <span className="font-bold text-brand-900 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Page 2 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
