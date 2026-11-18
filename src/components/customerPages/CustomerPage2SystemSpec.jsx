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
  Compass,
  ArrowRight,
  Sparkles,
  Workflow,
  CheckCheck,
  Radio,
  FileCheck2,
  Flame,
  Power,
  Building2
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
    { month: 'Jan', factor: 0.92, label: 'J' },
    { month: 'Feb', factor: 0.98, label: 'F' },
    { month: 'Mar', factor: 1.08, label: 'M' },
    { month: 'Apr', factor: 1.12, label: 'A' },
    { month: 'May', factor: 1.06, label: 'M' },
    { month: 'Jun', factor: 0.82, label: 'J' },
    { month: 'Jul', factor: 0.72, label: 'J' },
    { month: 'Aug', factor: 0.75, label: 'A' },
    { month: 'Sep', factor: 0.86, label: 'S' },
    { month: 'Oct', factor: 0.95, label: 'O' },
    { month: 'Nov', factor: 0.94, label: 'N' },
    { month: 'Dec', factor: 0.90, label: 'D' }
  ];

  const avgMonthly = annualKwh / 12;

  // Itemized Engineering Bill of Materials
  const bomRows = [
    {
      code: "01",
      category: "Solar PV Modules",
      specs: `${panelCount} Nos. × ${panelWattage}Wp N-Type TOPCon Dual-Glass Bifacial Modules (Total: ${dcKw} kWp DC)`,
      brand: technical?.panelBrand || "Waaree / Adani / Tata Power",
      standard: "IEC 61215 / IS 14286",
      warranty: "30-Yr Linear Performance"
    },
    {
      code: "02",
      category: "Grid-Tied Inverter",
      specs: `${acKw} kW AC Capacity, Dual MPPT Tracker, 98.6% Efficiency, Built-in Wi-Fi IoT Cloud Telemetry`,
      brand: technical?.inverterBrand || "Sungrow / Solis / GoodWe",
      standard: "IEC 62109 / VDE 0126",
      warranty: "8-Yr Onsite Replacement"
    },
    {
      code: "03",
      category: "MMS Structure",
      specs: "Elevated Hot-Dip Galvanized Iron (GI) 80µ Zinc Coating, Wind-Rated for 180 km/h, SS-304 Fasteners",
      brand: "Srimaan Heavy-Duty Structural Rigging",
      standard: "IS 875 (P-3) / IS 2062",
      warranty: "10-Yr Structural Integrity"
    },
    {
      code: "04",
      category: "Solar DC / AC Cables",
      specs: "4 sq.mm & 6 sq.mm TUV/UL Certified Multi-Strand Tinned Copper Flame Retardant (FR-LSH) Cables",
      brand: "Polycab / Siechem / Havells",
      standard: "EN 50618 / IS 694",
      warranty: "25-Yr Rated Lifespan"
    },
    {
      code: "05",
      category: "Safety Distribution",
      specs: "DCDB & ACDB Enclosures with IP65, Type-II 1000V DC SPDs, Bi-polar MCBs & 4-Pole RCCB Protection",
      brand: "Schneider / Hensel / L&T",
      standard: "IEC 61439 / IS 13947",
      warranty: "5-Yr Manufacturer Warranty"
    },
    {
      code: "06",
      category: "Grounding & Lightning",
      specs: "3 Independent Chemical Compound Earthing Pits (<2Ω Resistance) + Copper Bonded Lightning Arrester",
      brand: "Srimaan Chemical Compound Earthing Matrix",
      standard: "IS 3043 / NFC 17-102",
      warranty: "5-Yr Comprehensive Warranty"
    }
  ];

  return (
    <div className="a4-preview-sheet p-6 sm:p-7 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Maximalist Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2.5">
        {/* ============================================================== */}
        {/* 1. TOP HEADER & BREADCRUMB STRIP                               */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-10 rounded-xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center p-1 shrink-0 overflow-hidden ring-1 ring-amber-400/30">
              <img src="/assets/srimaan_logo.jpeg" alt="Srimaan Solar Solutions" className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-tight font-sans">
                  SYSTEM ENGINEERING &amp; HARDWARE BILL OF MATERIALS
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xs">
                  TIER-1 ARCHITECTURE
                </span>
              </div>
              <p className="text-[8.5px] text-slate-600 font-medium">
                Comprehensive Technical Specifications, OEM Certifications &amp; Functional Electrical Flow
              </p>
            </div>
          </div>

          <div className="text-right text-[8.5px]">
            <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              Ref: {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}
            </span>
            <p className="font-semibold text-slate-600 text-[8px] mt-0.5">Capacity: <span className="font-black text-slate-900">{dcKw} kWp DC / {acKw} kW AC</span></p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. 4 HIGH-IMPACT HARDWARE MASTER CARDS                          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2 text-[7.5px]">
          {/* 1. Modules Card */}
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-amber-50/20 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5">
                <span className="font-black text-slate-900 uppercase text-[8px] flex items-center gap-1">
                  <SunMedium className="w-3.5 h-3.5 text-amber-500" />
                  Solar PV Modules
                </span>
                <span className="text-[6.5px] font-extrabold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">Tier-1</span>
              </div>
              <div className="h-6 flex items-center my-1">
                {panelLogo ? (
                  <img src={panelLogo} alt="Module Brand" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-black text-slate-900 text-[9px]">{technical?.panelBrand || "Waaree / Adani"}</span>
                )}
              </div>
              <div className="space-y-0.5 text-slate-600 text-[7px] mt-1">
                <div className="flex justify-between"><span>Type:</span><strong className="text-slate-900">TOPCon Bifacial</strong></div>
                <div className="flex justify-between"><span>Module Count:</span><strong className="text-slate-900">{panelCount} × {panelWattage}Wp</strong></div>
                <div className="flex justify-between"><span>Cell Efficiency:</span><strong className="text-slate-900">22.8% Peak</strong></div>
              </div>
            </div>
            <div className="mt-1.5 pt-1 border-t border-slate-200 text-[6.5px] text-emerald-700 font-bold flex justify-between">
              <span>&#10003; 30-Yr Linear Warranty</span>
              <span>IEC 61215</span>
            </div>
          </div>

          {/* 2. Inverter Card */}
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/20 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5">
                <span className="font-black text-slate-900 uppercase text-[8px] flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  Grid Inverter
                </span>
                <span className="text-[6.5px] font-extrabold text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded">Smart IoT</span>
              </div>
              <div className="h-6 flex items-center my-1">
                {inverterLogo ? (
                  <img src={inverterLogo} alt="Inverter Brand" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-black text-slate-900 text-[9px]">{technical?.inverterBrand || "Sungrow / Solis"}</span>
                )}
              </div>
              <div className="space-y-0.5 text-slate-600 text-[7px] mt-1">
                <div className="flex justify-between"><span>Capacity:</span><strong className="text-slate-900">{acKw} kW AC</strong></div>
                <div className="flex justify-between"><span>MPPT Channels:</span><strong className="text-slate-900">Dual Trackers</strong></div>
                <div className="flex justify-between"><span>Peak Efficiency:</span><strong className="text-slate-900">98.6% Euro</strong></div>
              </div>
            </div>
            <div className="mt-1.5 pt-1 border-t border-slate-200 text-[6.5px] text-blue-700 font-bold flex justify-between">
              <span>&#10003; 8-Yr Onsite Warranty</span>
              <span>Wi-Fi Cloud App</span>
            </div>
          </div>

          {/* 3. Structure Card */}
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-purple-50/20 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5">
                <span className="font-black text-slate-900 uppercase text-[8px] flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-purple-600" />
                  Elevated MMS
                </span>
                <span className="text-[6.5px] font-extrabold text-purple-800 bg-purple-100 px-1.5 py-0.2 rounded">80µ Zinc</span>
              </div>
              <div className="h-6 flex items-center my-1">
                <span className="font-black text-slate-900 text-[8.5px] leading-tight">Srimaan Heavy-Duty Structural Iron</span>
              </div>
              <div className="space-y-0.5 text-slate-600 text-[7px] mt-1">
                <div className="flex justify-between"><span>Galvanization:</span><strong className="text-slate-900">80 Micron Hot-Dip</strong></div>
                <div className="flex justify-between"><span>Wind Resistance:</span><strong className="text-slate-900">180 km/h Tested</strong></div>
                <div className="flex justify-between"><span>Fasteners:</span><strong className="text-slate-900">SS-304 Marine Grade</strong></div>
              </div>
            </div>
            <div className="mt-1.5 pt-1 border-t border-slate-200 text-[6.5px] text-purple-700 font-bold flex justify-between">
              <span>&#10003; 10-Yr Structural Warranty</span>
              <span>IS 875 Compliant</span>
            </div>
          </div>

          {/* 4. Safety & Protection Card */}
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5">
                <span className="font-black text-slate-900 uppercase text-[8px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Electrical Safety
                </span>
                <span className="text-[6.5px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">IS 3043</span>
              </div>
              <div className="h-6 flex items-center my-1">
                <span className="font-black text-slate-900 text-[8.5px] leading-tight">3 Chemical Pits + Type-II SPDs</span>
              </div>
              <div className="space-y-0.5 text-slate-600 text-[7px] mt-1">
                <div className="flex justify-between"><span>Earthing Resistance:</span><strong className="text-slate-900">&lt; 2.0 Ohms</strong></div>
                <div className="flex justify-between"><span>DC Cables:</span><strong className="text-slate-900">Polycab TUV FR-LSH</strong></div>
                <div className="flex justify-between"><span>Enclosures:</span><strong className="text-slate-900">IP65 Weatherproof</strong></div>
              </div>
            </div>
            <div className="mt-1.5 pt-1 border-t border-slate-200 text-[6.5px] text-emerald-700 font-bold flex justify-between">
              <span>&#10003; Lightning Arrester ESE</span>
              <span>CEIG Approved</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. ITEMIZED MASTER BILL OF MATERIALS (BOM) TABLE                */}
        {/* ============================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="bg-gradient-to-r from-[#060e24] via-[#0b1736] to-[#060e24] px-3.5 py-1.5 text-white flex items-center justify-between">
            <span className="text-[8.5px] font-black uppercase tracking-wide flex items-center gap-1.5 text-amber-300">
              <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
              Itemized Engineering Bill of Materials (BOM) &amp; Standards
            </span>
            <span className="text-[7px] text-emerald-300 font-bold bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
              100% Genuine Tier-1 OEM Supply
            </span>
          </div>

          <div className="overflow-x-auto text-[7.5px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200 text-[7px] uppercase tracking-wide">
                  <th className="py-1 px-2 text-center w-8">Item</th>
                  <th className="py-1 px-2.5 w-32">Subsystem Component</th>
                  <th className="py-1 px-3">Technical Engineering Specification</th>
                  <th className="py-1 px-2.5 w-32">Approved OEM Make</th>
                  <th className="py-1 px-2.5 w-24 text-center">Standard</th>
                  <th className="py-1 px-2.5 w-28 text-right">Warranty SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {bomRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"}>
                    <td className="py-1 px-2 text-center font-mono font-bold text-slate-900">{row.code}</td>
                    <td className="py-1 px-2.5 font-bold text-slate-900">{row.category}</td>
                    <td className="py-1 px-3 text-slate-700 leading-snug">{row.specs}</td>
                    <td className="py-1 px-2.5 font-bold text-slate-900">{row.brand}</td>
                    <td className="py-1 px-2.5 text-center font-mono text-[6.5px] font-semibold text-slate-600">{row.standard}</td>
                    <td className="py-1 px-2.5 text-right font-extrabold text-emerald-700 font-mono">{row.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. DUAL VISUAL STUDIO: METEONORM CURVE & ELECTRICAL SCHEMATIC   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* LEFT: 12-MONTH METEONORM GENERATION CURVE (6 COLS) */}
          <div className="col-span-6 bg-slate-50/90 rounded-2xl border border-slate-200 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 mb-1.5">
                <span className="text-[8px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-amber-500" />
                  12-Month Meteonorm Solar Yield Forecast
                </span>
                <span className="text-[6.5px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  Annual Yield: ~{formatNumber(annualKwh)} kWh
                </span>
              </div>

              {/* Bar Graph */}
              <div className="pt-2 pb-1 px-1">
                <div className="flex items-end justify-between gap-1 h-20 border-b border-slate-300 pb-1">
                  {monthlyProfile.map((m, idx) => {
                    const heightPercent = Math.round(m.factor * 75);
                    const isPeak = m.factor >= 1.05;
                    const isMonsoon = m.factor <= 0.85;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-0.5 group">
                        <span className="text-[5.5px] text-slate-400 font-mono">
                          {Math.round(avgMonthly * m.factor)}
                        </span>
                        <div 
                          className={`w-full rounded-t-sm transition-all ${
                            isPeak 
                              ? 'bg-gradient-to-t from-amber-500 to-amber-400 shadow-xs' 
                              : isMonsoon
                                ? 'bg-gradient-to-t from-sky-400 to-sky-300'
                                : 'bg-gradient-to-t from-emerald-600 to-emerald-500'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className={`text-[6.5px] font-bold ${isPeak ? 'text-amber-800' : 'text-slate-600'}`}>
                          {m.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-1 pt-1 border-t border-slate-200 flex items-center justify-between text-[6.5px] text-slate-500">
              <span>★ Summer Peak: Mar-May (~1.12x)</span>
              <span>Monsoon Season: Jun-Aug (~0.75x)</span>
              <span>Daily Average: <strong>~{dailyKwh} Units/Day</strong></span>
            </div>
          </div>

          {/* RIGHT: ELECTRICAL FLOW ARCHITECTURE SCHEMATIC (6 COLS) */}
          <div className="col-span-6 bg-gradient-to-br from-[#060e24] via-[#0b1736] to-[#040816] text-white rounded-2xl border border-slate-800 p-2.5 flex flex-col justify-between shadow-2xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-1 border-b border-white/10 mb-1.5">
                <span className="text-[8px] font-black text-amber-300 uppercase tracking-wide flex items-center gap-1">
                  <Workflow className="w-3 h-3 text-amber-400" />
                  On-Grid Electrical Flow Architecture
                </span>
                <span className="text-[6.5px] font-bold text-emerald-300 bg-white/10 px-1.5 py-0.2 rounded border border-white/15">
                  Synchronized
                </span>
              </div>

              {/* Visual Flow Nodes */}
              <div className="grid grid-cols-4 gap-1 text-center py-1">
                {/* Node 1: PV Array */}
                <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                  <SunMedium className="w-4 h-4 text-amber-400 mb-0.5" />
                  <span className="text-[7px] font-black text-white block">PV Array</span>
                  <span className="text-[5.5px] text-slate-300 block">{dcKw} kWp DC</span>
                </div>

                {/* Node 2: MPPT Inverter */}
                <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                  <Cpu className="w-4 h-4 text-sky-400 mb-0.5" />
                  <span className="text-[7px] font-black text-white block">Inverter</span>
                  <span className="text-[5.5px] text-slate-300 block">{acKw} kW AC Sync</span>
                </div>

                {/* Node 3: Net-Meter */}
                <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                  <Activity className="w-4 h-4 text-emerald-400 mb-0.5" />
                  <span className="text-[7px] font-black text-white block">Net-Meter</span>
                  <span className="text-[5.5px] text-slate-300 block">Bi-Directional</span>
                </div>

                {/* Node 4: Grid & Load */}
                <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                  <Building2 className="w-4 h-4 text-purple-400 mb-0.5" />
                  <span className="text-[7px] font-black text-white block">Home / Grid</span>
                  <span className="text-[5.5px] text-slate-300 block">Export Credits</span>
                </div>
              </div>

              {/* Explanatory flow note */}
              <div className="mt-1 text-[6.5px] text-slate-300 leading-snug bg-white/5 p-1 rounded-lg border border-white/10">
                Solar power prioritizes powering live daytime home loads. Excess units export automatically through the bi-directional meter to receive DISCOM bill credits.
              </div>
            </div>

            <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between text-[6.5px] text-slate-400 font-mono">
              <span className="text-amber-300">Voc: ~450V DC</span>
              <span className="text-emerald-300">Vac: 230V/415V 50Hz</span>
              <span className="text-sky-300">Earthing: &lt;2Ω IS 3043</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. PAGE 2 FOOTER                                               */}
        {/* ============================================================== */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
          <div>
            <span className="font-bold text-slate-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.address || 'H.No. 11-10-624/A, Burhanpuram, Khammam, Telangana - 507001'}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-semibold">{company?.tagline || 'Clean Green Renewable Energy EPC Partner'}</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Page 2 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
