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
  Power
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
      {/* Top Brand Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0b132b] via-amber-500 to-emerald-600 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
        {/* ============================================================== */}
        {/* 1. TOP HEADER & BREADCRUMB STRIP                               */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-10 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
              <img src="/assets/srimaan_logo.jpeg" alt="Srimaan Solar Solutions" className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight font-sans">
                  SYSTEM ENGINEERING &amp; HARDWARE BILL OF MATERIALS
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                  Tier-1 Standards
                </span>
              </div>
              <p className="text-[8.5px] text-slate-500">
                Detailed Engineering BOM, Hardware Compliance Standards &amp; PVsyst Harvest Analytics
              </p>
            </div>
          </div>

          <div className="text-right text-[8.5px] text-slate-500">
            <span className="font-mono font-bold text-slate-900">Ref: {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}</span>
            <p className="font-semibold text-slate-700">Capacity: <span className="font-bold text-slate-900">{dcKw} kWp DC</span></p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. 4-PILLAR HARDWARE SPECIFICATION CARDS                        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* Card 1: Solar Modules */}
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 text-[7px] font-extrabold uppercase">
                  Generation Engine
                </span>
                {panelLogo && <img src={panelLogo} alt="" className="h-3 object-contain" />}
              </div>
              <h4 className="font-black text-slate-900 text-xs">{technical?.panelBrand || 'Tier-1 TOPCon'}</h4>
              <p className="text-[7.5px] text-slate-500 font-medium mt-0.5 truncate">{technical?.panelModel || 'Bi-facial Dual Glass 550Wp'}</p>
              
              <div className="mt-2 space-y-0.5 text-[7.5px]">
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-500">Module Count</span>
                  <span className="font-bold text-slate-800">{panelCount} Units</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-500">Peak Efficiency</span>
                  <span className="font-bold text-emerald-600">22.3% Peak</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-500">Rear Bifacial Gain</span>
                  <span className="font-bold text-amber-600">+15% to +25%</span>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-1 border-t border-slate-100 text-[7px] text-blue-700 font-bold">
              &#10003; 25-Yr Linear Yield SLA
            </div>
          </div>

          {/* Card 2: Smart Inverter */}
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[7px] font-extrabold uppercase">
                  Power Conversion
                </span>
                {inverterLogo && <img src={inverterLogo} alt="" className="h-3 object-contain" />}
              </div>
              <h4 className="font-black text-slate-900 text-xs">{technical?.inverterBrand || 'Sungrow'}</h4>
              <p className="text-[7.5px] text-slate-500 font-medium mt-0.5 truncate">{technical?.inverterModel || 'Smart Dual-MPPT Inverter'}</p>

              <div className="mt-2 space-y-0.5 text-[7.5px]">
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-500">Efficiency</span>
                  <span className="font-bold text-emerald-600">98.6% Euro</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-500">MPPT Channels</span>
                  <span className="font-bold text-slate-800">Dual MPPT</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-500">Telemetry</span>
                  <span className="font-bold text-slate-900">24/7 Cloud Wi-Fi</span>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-1 border-t border-slate-100 text-[7px] text-amber-700 font-bold">
              &#10003; 8-Yr Onsite Warranty
            </div>
          </div>

          {/* Card 3: MMS Structure */}
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[7px] font-extrabold uppercase">
                  Structural Rigging
                </span>
                <span className="text-[7px] text-emerald-700 font-bold">80µ Zinc</span>
              </div>
              <h4 className="font-black text-slate-900 text-xs">Hot-Dip GI MMS</h4>
              <p className="text-[7.5px] text-slate-500 font-medium mt-0.5 truncate">{technical?.structureType || 'Elevated 7-9 ft Rigging'}</p>

              <div className="mt-2 space-y-0.5 text-[7.5px]">
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-500">Wind Resistance</span>
                  <span className="font-bold text-slate-800">180 km/h Rated</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-500">Hardware Fasteners</span>
                  <span className="font-bold text-slate-800">SS-304 Grade</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-500">Rooftop Dead Load</span>
                  <span className="font-bold text-emerald-600">&lt; 18 kg/m²</span>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-1 border-t border-slate-100 text-[7px] text-slate-700 font-bold">
              &#10003; 10-Yr Structural SLA
            </div>
          </div>

          {/* Card 4: Electrical Protection */}
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[7px] font-extrabold uppercase">
                  Electrical Safety
                </span>
                <span className="text-[7px] text-blue-700 font-bold">IP65 Enclosure</span>
              </div>
              <h4 className="font-black text-slate-900 text-xs">Tri-Safe Protection</h4>
              <p className="text-[7.5px] text-slate-500 font-medium mt-0.5 truncate">DCDB &bull; ACDB &bull; 3 Earth Pits</p>

              <div className="mt-2 space-y-0.5 text-[7.5px]">
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-500">Surge Arresters</span>
                  <span className="font-bold text-slate-800">Type-II DC/AC SPD</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-500">Earth Resistance</span>
                  <span className="font-bold text-emerald-600">&lt; 2.0 Ohms</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-500">Grid Disconnect</span>
                  <span className="font-bold text-slate-800">Anti-Islanding</span>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-1 border-t border-slate-100 text-[7px] text-emerald-700 font-bold">
              &#10003; IS 3043 Grounding Code
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. ITEMIZED BILL OF MATERIALS (BOM) SPECIFICATIONS TABLE        */}
        {/* ============================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between">
            <span className="text-[9px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5 text-blue-600" />
              Itemized Engineering Bill of Materials (BOM) Specifications
            </span>
            <span className="text-[7.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              100% Brand New DCR Compliant Hardware
            </span>
          </div>

          <div className="overflow-x-auto text-[8px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-slate-600 font-bold uppercase border-b border-slate-200 text-[7px] tracking-wider">
                  <th className="py-1.5 px-3 w-8">#</th>
                  <th className="py-1.5 px-3">Subsystem Category &amp; Engineering Specifications</th>
                  <th className="py-1.5 px-3">Approved Tier-1 OEM Make</th>
                  <th className="py-1.5 px-3">Compliance Standard</th>
                  <th className="py-1.5 px-3 text-right">Warranty Term</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bomRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/40" : "bg-white"}>
                    <td className="py-1.5 px-3 font-mono font-bold text-slate-900">{row.code}</td>
                    <td className="py-1.5 px-3">
                      <span className="font-extrabold text-slate-900 block leading-tight text-[8px]">{row.category}</span>
                      <span className="text-[7px] text-slate-500 leading-tight block mt-0.5">{row.specs}</span>
                    </td>
                    <td className="py-1.5 px-3 font-semibold text-slate-800 text-[7.5px]">{row.brand}</td>
                    <td className="py-1.5 px-3 font-mono text-slate-500 text-[7px]">{row.standard}</td>
                    <td className="py-1.5 px-3 text-right font-extrabold text-emerald-700 text-[8px]">{row.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-2 bg-slate-50 border-t border-slate-200 text-[7.5px] text-slate-600 flex items-center justify-between">
            <span>Rooftop Shadow-Free Footprint: <strong>~{roofArea} Sq.Ft</strong> clear terrace area</span>
            <span className="text-slate-900 font-bold">1 kWp DC ≈ 85–90 Sq.Ft Terrace Area</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. SOLAR GENERATION HARVEST PROFILE & PVsyst ANALYTICS          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-3 items-stretch">
          {/* Left: 12-Month Generation Bar Chart (7 Cols) */}
          <div className="col-span-7 bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                  Meteonorm South India Solar Irradiance Profile
                </span>
                <span className="text-[7px] font-bold text-slate-500 font-mono">Avg: {Math.round(avgMonthly)} Units/Mo</span>
              </div>

              {/* 12-Month Bar Visualizer */}
              <div className="grid grid-cols-12 gap-1 items-end h-16 pt-2 bg-slate-50/60 p-2 rounded-xl border border-slate-100">
                {monthlyProfile.map((m, idx) => {
                  const mKwh = Math.round(avgMonthly * m.factor);
                  const heightPercent = Math.min(100, Math.max(25, (m.factor / 1.15) * 100));
                  const isPeak = m.factor >= 1.05;
                  const isMonsoon = m.factor <= 0.85;

                  return (
                    <div key={idx} className="flex flex-col items-center h-full justify-end">
                      <div 
                        className={`w-full rounded-t-sm transition-all ${
                          isPeak 
                            ? 'bg-gradient-to-t from-amber-500 to-amber-400' 
                            : isMonsoon 
                              ? 'bg-gradient-to-t from-blue-400 to-blue-300' 
                              : 'bg-gradient-to-t from-slate-700 to-slate-500'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                        title={`${m.month}: ${mKwh} Units`}
                      />
                      <span className="text-[6.5px] font-mono text-slate-500 mt-1 font-bold">
                        {m.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[7px]">
                <div className="p-1 rounded-lg bg-amber-50/60 border border-amber-200">
                  <span className="text-amber-800 font-bold block">Summer Peak</span>
                  <span className="font-extrabold text-amber-950 mt-0.5 block">~{Math.round(dailyKwh * 1.12)} Units/d</span>
                </div>
                <div className="p-1 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-600 font-bold block">Winter Clear</span>
                  <span className="font-extrabold text-slate-900 mt-0.5 block">~{Math.round(dailyKwh * 0.95)} Units/d</span>
                </div>
                <div className="p-1 rounded-lg bg-blue-50/60 border border-blue-200">
                  <span className="text-blue-800 font-bold block">Monsoon Average</span>
                  <span className="font-extrabold text-blue-950 mt-0.5 block">~{Math.round(dailyKwh * 0.78)} Units/d</span>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-100 text-[6.5px] text-slate-400 leading-tight">
              Solar insolation modeling benchmarked at 4.85 peak sun hours per day across South-Central India latitudes.
            </div>
          </div>

          {/* Right: Functional Electrical Architecture Flow (5 Cols) */}
          <div className="col-span-5 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 rounded-2xl border border-slate-200 p-3 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  On-Grid Electrical Flow
                </span>
                <span className="text-[7px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200">
                  Bi-Directional
                </span>
              </div>

              {/* Step-by-step connection pill chain */}
              <div className="space-y-1.5 text-[7.5px]">
                <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-blue-50 text-blue-700 font-black flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="text-slate-900 block leading-tight">TOPCon Bifacial Solar Array</strong>
                    <span className="text-slate-500 text-[6.5px]">Generates clean DC electricity from sunlight</span>
                  </div>
                </div>

                <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-amber-50 text-amber-700 font-black flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="text-slate-900 block leading-tight">DCDB Isolator &amp; Type-II SPDs</strong>
                    <span className="text-slate-500 text-[6.5px]">Rotary disconnect + 1000V surge suppression</span>
                  </div>
                </div>

                <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-700 font-black flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="text-slate-900 block leading-tight">Smart Grid-Tied Inverter</strong>
                    <span className="text-slate-500 text-[6.5px]">Converts DC to pure sine AC power with IoT sync</span>
                  </div>
                </div>

                <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-slate-100 text-slate-800 font-black flex items-center justify-center shrink-0">4</span>
                  <div>
                    <strong className="text-slate-900 block leading-tight">ACDB Panel &amp; Protection</strong>
                    <span className="text-slate-500 text-[6.5px]">MCB + RCCB protection for premises appliances</span>
                  </div>
                </div>

                <div className="p-1.5 rounded-xl bg-[#0b132b] text-white shadow-2xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0">5</span>
                  <div>
                    <strong className="text-white block leading-tight">DISCOM Bi-Directional Net-Meter</strong>
                    <span className="text-slate-300 text-[6.5px]">Surplus units export to grid &amp; reduce billing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-100 text-[6.5px] text-slate-400 leading-tight">
              Anti-islanding compliant per IEEE 1547 with automatic cut-off during grid outages.
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
