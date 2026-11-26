import React from 'react';
import { 
  Cpu, 
  Zap, 
  SunMedium, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  BarChart3, 
  Wind, 
  Radio, 
  Award, 
  Sparkles,
  Wifi,
  FileCheck2,
  Building2
} from 'lucide-react';
import { formatNumber, formatDate } from '../../utils/formatters';
import Watermark from '../common/Watermark';
import CustomerPageFooter from './CustomerPageFooter';
import { ASSETS } from '../../assets/assetsData';

export default function CustomerPage2SystemSpec({ quotation, settings }) {
  const company = settings?.company || {};
  const technical = quotation?.technical || {};
  const customer = quotation?.customer || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const acKw = parseFloat(technical?.acInverterCapacityKw || technical?.inverterCapacityKw || (dcKw <= 3 ? 3.6 : (dcKw * 1.2).toFixed(1)));
  const panelWattage = technical?.panelWattage || 540;
  const panelCount = technical?.panelCount || Math.ceil((dcKw * 1000) / panelWattage);
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));
  const minArea = Math.round(dcKw * 70);
  const maxArea = Math.round(dcKw * 100);

  const rawRef = quotation?.masterRefNo || quotation?.quotationNumber || customer?.consumerServiceNumber || 'SSS-2026-27-001';
  const cleanRef = rawRef.replace(/^SRIMAAN\s+SOLAR\s+SOLUTIONS-?/i, 'SSS-');

  const formatCustomerName = (cust) => {
    const rawName = cust?.name || '';
    if (!rawName.trim()) return 'Valued Customer';
    const trimmed = rawName.trim();
    if (cust?.salutation) {
      if (trimmed.toLowerCase().startsWith(cust.salutation.toLowerCase())) {
        return trimmed;
      }
      return `${cust.salutation} ${trimmed}`;
    }
    if (/^(mr\.?|ms\.?|mrs\.?|dr\.?|shri\.?|smt\.?|prof\.?|m\/s\.?)/i.test(trimmed)) {
      return trimmed;
    }
    return `Mr./Ms. ${trimmed}`;
  };

  // Month-by-month solar generation profile for Telangana / AP irradiance
  const monthlyFactors = [
    { month: 'JAN', factor: 0.92 },
    { month: 'FEB', factor: 0.98 },
    { month: 'MAR', factor: 1.08 },
    { month: 'APR', factor: 1.12 },
    { month: 'MAY', factor: 1.06 },
    { month: 'JUN', factor: 0.82 },
    { month: 'JUL', factor: 0.72 },
    { month: 'AUG', factor: 0.75 },
    { month: 'SEP', factor: 0.86 },
    { month: 'OCT', factor: 0.95 },
    { month: 'NOV', factor: 0.94 },
    { month: 'DEC', factor: 0.90 }
  ];

  const avgMonthly = annualKwh / 12;

  // Exact Brand strings based on quotation or standard tier-1 EPC specs
  const moduleBrandName = technical?.panelBrand || "Waaree Energies";
  const inverterBrandName = technical?.inverterBrand?.split('(')[0]?.trim() || "Polycab Solar";

  return (
    <div className="a4-preview-sheet p-6 flex flex-col text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Gold & Navy Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex-1 flex flex-col justify-between min-h-0">
        {/* ============================================================== */}
        {/* 1. MASTER HEADER WITH LOGO, TITLE, REF & CLIENT NAME           */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between pb-1.5 pt-0.5 border-b border-slate-200 shrink-0">
          {/* Left: Company Logo + Title & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="h-11 sm:h-12 w-44 sm:w-48 flex items-center shrink-0">
              <img 
                src="/assets/srimaan_logo.jpeg" 
                alt="Srimaan Solar Solutions" 
                className="h-full w-auto max-w-full object-contain"
              />
            </div>
            <div className="h-9 w-[1.5px] bg-slate-200 shrink-0" />
            <div>
              <h2 className="text-[10px] sm:text-[11px] font-black text-slate-900 tracking-tight uppercase font-sans">
                TECHNICAL SPECIFICATIONS &amp; BILL OF MATERIALS
              </h2>
              <p className="text-[7.5px] text-slate-500 font-medium mt-0.2">
                System Sizing, Engineering Design &amp; Equipment Standards
              </p>
            </div>
          </div>

          {/* Right: Ref Number & Client Name */}
          <div className="text-right shrink-0 text-[8px]">
            <div>
              <span className="text-slate-500">Ref: </span>
              <strong className="font-mono text-slate-900 font-bold">{cleanRef}</strong>
            </div>
            <div className="mt-0.5 text-slate-600">
              <span>Client: </span>
              <strong className="text-slate-900">{formatCustomerName(customer)}</strong>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. 4 HARDWARE COMPONENT SHOWCASE CARDS (Visual Displays)       */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-3 shrink-0">
          {/* Card 1: Solar Modules */}
          <div className="p-2.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              {/* Visual Graphic Container (Taller, Executive Proportion) */}
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative h-32 shadow-xs group">
                <img 
                  src="/assets/hardware/waaree-topcon-module.jpg" 
                  alt={moduleBrandName} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                  <SunMedium className="w-3 h-3 text-amber-400" />
                  <span className="text-[6.5px] font-bold text-amber-300">Waaree DCR</span>
                </div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                  <span className="text-[6.5px] font-bold text-sky-300 font-mono">16BB TOPCon</span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[6.5px] font-black bg-black/75 text-white backdrop-blur-xs border border-white/15">
                    Bifacial TOPCon
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-0.5 rounded text-[6.5px] font-black bg-emerald-600 text-white shadow-2xs">
                    21.5% Eff.
                  </span>
                </div>
              </div>

              {/* Title & Specs */}
              <div className="mt-2">
                <strong className="text-[9.5px] font-black text-slate-900 block truncate">
                  {moduleBrandName}
                </strong>
                <span className="text-[7.5px] text-slate-500 font-medium block mt-0.5">
                  {panelCount} Nos &times; {panelWattage}Wp = {dcKw} kWp
                </span>
              </div>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[7px] font-bold text-emerald-700">
              25-Yr Performance &bull; 12-Yr Product
            </div>
          </div>

          {/* Card 2: Solar Inverter */}
          <div className="p-2.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              {/* Visual Graphic Container (Taller, Executive Proportion) */}
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative h-32 shadow-xs group">
                <img 
                  src="/assets/hardware/smart-grid-inverter.jpg" 
                  alt={inverterBrandName} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[6.5px] font-bold text-emerald-400 font-mono">ONLINE</span>
                </div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                  <span className="text-[6.5px] font-bold text-sky-300 font-mono">{dcKw.toFixed(2)} kW &bull; 415V</span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[6.5px] font-black bg-black/75 text-white backdrop-blur-xs border border-white/15">
                    &gt;98.4% Eff. &bull; Dual MPPT
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-0.5 rounded text-[6.5px] font-black bg-blue-600 text-white shadow-2xs">
                    IoT Cloud
                  </span>
                </div>
              </div>

              {/* Title & Specs */}
              <div className="mt-2">
                <strong className="text-[9.5px] font-black text-slate-900 block truncate">
                  {inverterBrandName}
                </strong>
                <span className="text-[7.5px] text-slate-500 font-medium block mt-0.5">
                  {acKw} kW AC &bull; Wi-Fi Smart Telemetry
                </span>
              </div>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[7px] font-bold text-amber-700">
              10-Yr Replacement Warranty
            </div>
          </div>

          {/* Card 3: Mounting Structure */}
          <div className="p-2.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              {/* Visual Graphic Container (Taller, Executive Proportion) */}
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative h-32 shadow-xs group">
                <img 
                  src="/assets/hardware/elevated-structure.jpg" 
                  alt="Elevated GI Structure" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[6.5px] font-black bg-black/75 text-white backdrop-blur-xs border border-white/20">
                    80&mu; Zinc GI
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-0.5 rounded text-[6.5px] font-black bg-amber-600 text-white shadow-2xs">
                    IS 875 158 km/h
                  </span>
                </div>
              </div>

              {/* Title & Specs */}
              <div className="mt-2">
                <strong className="text-[9.5px] font-black text-slate-900 block truncate">
                  Elevated GI Structure
                </strong>
                <span className="text-[7.5px] text-slate-500 font-medium block mt-0.5">
                  7 to 9 ft Clearance (IS 875 Vb=44m/s)
                </span>
              </div>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[7px] font-bold text-blue-700">
              15-Yr Structural Guarantee
            </div>
          </div>

          {/* Card 4: BOS & Cabling */}
          <div className="p-2.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              {/* Visual Graphic Container (Taller, Executive Proportion) */}
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative h-32 shadow-xs group">
                <img 
                  src="/assets/hardware/solar-dcdb-acdb-bos.jpg" 
                  alt="Polycab Cables & BOS" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                  <Cpu className="w-3 h-3 text-emerald-400" />
                  <span className="text-[6.5px] font-bold text-emerald-300">CEIG Compliant</span>
                </div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                  <span className="text-[6.5px] font-bold text-amber-400 font-mono">1.5kV DC &bull; EN 50618</span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[6.5px] font-black bg-black/75 text-white backdrop-blur-xs border border-white/15">
                    Dual SPD &bull; IP65
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-0.5 rounded text-[6.5px] font-black bg-emerald-600 text-white shadow-2xs">
                    3 Pits IS 3043
                  </span>
                </div>
              </div>

              {/* Title & Specs */}
              <div className="mt-2">
                <strong className="text-[9.5px] font-black text-slate-900 block truncate">
                  Polycab Cables &amp; BOS
                </strong>
                <span className="text-[7.5px] text-slate-500 font-medium block mt-0.5">
                  3 Chemical Pits (IS 3043) + LA
                </span>
              </div>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[7px] font-bold text-emerald-700">
              CEIG &amp; DISCOM Compliant
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. 4-COLUMN SYSTEM SIZING STRIP                                */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2.5 p-2.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-center shrink-0">
          <div>
            <span className="text-[7px] uppercase font-bold text-slate-400 block tracking-wider">
              Proposed DC Capacity
            </span>
            <span className="text-base sm:text-lg font-black text-slate-900 font-mono block mt-0.5">
              {dcKw} kWp DC
            </span>
            <span className="text-[7px] text-slate-500 block mt-0.2">
              ({acKw} kW AC Inverter)
            </span>
          </div>

          <div>
            <span className="text-[7px] uppercase font-bold text-slate-400 block tracking-wider">
              Daily Generation
            </span>
            <span className="text-base sm:text-lg font-black text-amber-600 font-mono block mt-0.5">
              ~{dailyKwh} kWh / day
            </span>
            <span className="text-[7px] text-slate-500 block mt-0.2">
              (Avg. 4.25 kWh/kWp)
            </span>
          </div>

          <div>
            <span className="text-[7px] uppercase font-bold text-slate-400 block tracking-wider">
              Annual Yield
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-700 font-mono block mt-0.5">
              ~{formatNumber(annualKwh)} kWh / yr
            </span>
            <span className="text-[7px] text-slate-500 block mt-0.2">
              (= {dailyKwh} &times; 365)
            </span>
          </div>

          <div>
            <span className="text-[7px] uppercase font-bold text-slate-400 block tracking-wider">
              Roof Required
            </span>
            <span className="text-base sm:text-lg font-black text-slate-900 font-mono block mt-0.5">
              ~{minArea}&ndash;{maxArea} Sq.Ft
            </span>
            <span className="text-[7px] text-slate-500 block mt-0.2">
              (Shadow-Free RCC)
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. BILL OF MATERIALS & TECHNICAL COMPONENT STANDARDS (Table)   */}
        {/* ============================================================== */}
        <div className="shrink-0">
          <div className="flex items-center justify-between pb-1 mb-1">
            <span className="text-[8px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Bill of Materials &amp; Technical Component Standards
            </span>
            <span className="text-[7px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
              ALMM Listed &bull; BNEF Tier-1
            </span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white text-[7.5px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-900 font-extrabold text-[7px] uppercase">
                  <th className="py-1.5 px-2 text-center border-r border-slate-200 w-8">#</th>
                  <th className="py-1.5 px-2.5 text-left border-r border-slate-200 w-36">Component</th>
                  <th className="py-1.5 px-2.5 text-left border-r border-slate-200">Brand, Exact Model &amp; Applicable Standards</th>
                  <th className="py-1.5 px-2 text-center border-r border-slate-200 w-28">Quantity</th>
                  <th className="py-1.5 px-2 text-center w-24">Warranty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Row 01: Solar PV Modules */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-500 border-r border-slate-100">01</td>
                  <td className="py-1.5 px-2.5 font-bold text-slate-900 border-r border-slate-100">Solar PV Modules</td>
                  <td className="py-1.5 px-2.5 border-r border-slate-100">
                    <strong className="text-slate-900 block leading-tight">{moduleBrandName} &mdash; Arka Series {panelWattage}Wp Bi-facial Dual Glass TOPCon</strong>
                    <span className="text-slate-500 block text-[7px] leading-tight mt-0.5">
                      144 Half-cut N-Type TOPCon cells, 16BB, Multi-busbar, 21.5% efficiency. Certified per IEC 61215:2021, IEC 61730-1/2, IS 14286:2010, ALMM Listed.
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-900 border-r border-slate-100">
                    {panelCount} Nos. ({dcKw} kWp DC)
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-emerald-700 leading-tight">
                    25-Yr Performance<br />
                    <span className="text-[6.5px] text-slate-500 font-normal">12-Yr Product</span>
                  </td>
                </tr>

                {/* Row 02: Solar Grid Inverter */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-500 border-r border-slate-100">02</td>
                  <td className="py-1.5 px-2.5 font-bold text-slate-900 border-r border-slate-100">Solar Grid Inverter</td>
                  <td className="py-1.5 px-2.5 border-r border-slate-100">
                    <strong className="text-slate-900 block leading-tight">{inverterBrandName} &mdash; Multi-MPPT Smart On-Grid Inverter with Wi-Fi IoT</strong>
                    <span className="text-slate-500 block text-[7px] leading-tight mt-0.5">
                      Peak efficiency &gt;98.4%, built-in Wi-Fi IoT telemetry, IP65 enclosure. Complies with IEC 62109-1/2, IEC 61727, and IEC 62116 anti-islanding.
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-900 border-r border-slate-100">
                    1 Unit ({acKw} kW AC)
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-slate-800">
                    10 Years
                  </td>
                </tr>

                {/* Row 03: Mounting Structure */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-500 border-r border-slate-100">03</td>
                  <td className="py-1.5 px-2.5 font-bold text-slate-900 border-r border-slate-100">Mounting Structure</td>
                  <td className="py-1.5 px-2.5 border-r border-slate-100">
                    <strong className="text-slate-900 block leading-tight">Hot-Dip Galvanized Iron (GI) &mdash; Elevated 7 to 9 ft Roof Clearance (IS 875 Compliant)</strong>
                    <span className="text-slate-500 block text-[7px] leading-tight mt-0.5">
                      Min 80-micron zinc coating per IS 4759, engineered per IS 875 (Part 3): 2015 for design wind velocity Vb = 44 m/s (158 km/h), SS-304 fasteners.
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-900 border-r border-slate-100">
                    1 Full Set
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-slate-800">
                    15 Years
                  </td>
                </tr>

                {/* Row 04: Solar Cables & Wiring */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-500 border-r border-slate-100">04</td>
                  <td className="py-1.5 px-2.5 font-bold text-slate-900 border-r border-slate-100">Solar Cables &amp; Wiring</td>
                  <td className="py-1.5 px-2.5 border-r border-slate-100">
                    <strong className="text-slate-900 block leading-tight">Polycab / Siechem 1.5kV DC Solar PV Cable (4 / 6 sq.mm) &amp; Finolex AC Cable</strong>
                    <span className="text-slate-500 block text-[7px] leading-tight mt-0.5">
                      TUV certified per EN 50618 / 2PfG 1169, electron-beam cross-linked, UV &amp; ozone resistant, low-smoke zero halogen (~40m DC + 25m AC run).
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-900 border-r border-slate-100">
                    As per site
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-slate-800">
                    5 Years
                  </td>
                </tr>

                {/* Row 05: DCDB & ACDB Boxes */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-500 border-r border-slate-100">05</td>
                  <td className="py-1.5 px-2.5 font-bold text-slate-900 border-r border-slate-100">DCDB &amp; ACDB Boxes</td>
                  <td className="py-1.5 px-2.5 border-r border-slate-100">
                    <strong className="text-slate-900 block leading-tight">IP65 Weatherproof Polycarbonate Enclosures with Dual Type-II SPDs</strong>
                    <span className="text-slate-500 block text-[7px] leading-tight mt-0.5">
                      1000V DC 16A gPV fuses, Type-II 1000V DC SPD per IEC 61643-11, Schneider / L&amp;T 415V/240V AC MCB/MCCB with RCD protection.
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-900 border-r border-slate-100">
                    1 Set
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-slate-800">
                    5 Years
                  </td>
                </tr>

                {/* Row 06: Earthing & Lightning */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-500 border-r border-slate-100">06</td>
                  <td className="py-1.5 px-2.5 font-bold text-slate-900 border-r border-slate-100">Earthing &amp; Lightning</td>
                  <td className="py-1.5 px-2.5 border-r border-slate-100">
                    <strong className="text-slate-900 block leading-tight">Copper Bonded Chemical Earthing (3 Dedicated Pits) + Class-A LA</strong>
                    <span className="text-slate-500 block text-[7px] leading-tight mt-0.5">
                      3 Independent earthing pits (Solar Array DC, Inverter AC, LA) with 17.2mm dia &times; 3.0m rods and carbon compound (&lt; 5 &Omega; loop per IS 3043:2018).
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-900 border-r border-slate-100">
                    3 Pits
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-slate-800">
                    5 Years
                  </td>
                </tr>

                {/* Row 07: DISCOM Net-Metering */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-500 border-r border-slate-100">07</td>
                  <td className="py-1.5 px-2.5 font-bold text-slate-900 border-r border-slate-100">DISCOM Net-Metering</td>
                  <td className="py-1.5 px-2.5 border-r border-slate-100">
                    <strong className="text-slate-900 block leading-tight">Complete Bi-Directional Net-Meter Application &amp; Regulatory Liaison</strong>
                    <span className="text-slate-500 block text-[7px] leading-tight mt-0.5">
                      Preparation of SLD, online portal filing, DTR feasibility check, CEIG/DISCOM inspection coordination &amp; meter sync assistance. (Subject to utility statutory norms).
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-900 border-r border-slate-100">
                    Full Scope
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-emerald-700">
                    Facilitation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. PROJECTED MONTHLY SOLAR POWER GENERATION STRIP              */}
        {/* ============================================================== */}
        <div className="p-2.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs shrink-0">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1">
            <span className="text-[8px] font-black text-slate-900 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              Projected Monthly Solar Power Generation Curve (kWh / Month)
            </span>
            <span className="text-[7.5px] text-slate-500 font-semibold">
              Telangana / AP Solar Irradiance Profile
            </span>
          </div>

          <div className="grid grid-cols-12 gap-1.5 text-center">
            {monthlyFactors.map((m) => {
              const monthUnits = Math.round(avgMonthly * m.factor);
              const isPeak = m.factor >= 1.05;
              return (
                <div key={m.month} className="p-1 rounded-lg bg-slate-50/80 border border-slate-200">
                  <span className="text-[7.5px] font-mono font-black text-slate-900 block">{monthUnits}</span>
                  <div className="h-4 flex items-end justify-center my-0.5">
                    <div 
                      className={`w-2.5 rounded-xs ${isPeak ? 'bg-amber-500' : 'bg-blue-600'}`}
                      style={{ height: `${Math.round(m.factor * 14)}px` }}
                    />
                  </div>
                  <span className="text-[6.5px] font-bold text-slate-500 block">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. 5 QUALITY & COMPLIANCE PILLARS STRIP                        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-5 gap-2.5 shrink-0 text-center">
          {/* Pillar 1: Tier-1 & ALMM */}
          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <Award className="w-4 h-4 text-amber-500 mx-auto mb-0.5" />
            <strong className="text-[8px] font-black text-slate-900 block">Tier-1 &amp; ALMM</strong>
            <span className="text-[7px] text-slate-500 block mt-0.2">100% genuine DCR listed</span>
          </div>

          {/* Pillar 2: 158 km/h Wind */}
          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <Wind className="w-4 h-4 text-blue-600 mx-auto mb-0.5" />
            <strong className="text-[8px] font-black text-slate-900 block">158 km/h Wind</strong>
            <span className="text-[7px] text-slate-500 block mt-0.2">IS 875 Part-3 compliant</span>
          </div>

          {/* Pillar 3: 3 Chemical Pits */}
          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <Zap className="w-4 h-4 text-amber-600 mx-auto mb-0.5" />
            <strong className="text-[8px] font-black text-slate-900 block">3 Chemical Pits</strong>
            <span className="text-[7px] text-slate-500 block mt-0.2">&lt;5&Omega; earth loop per IS 3043</span>
          </div>

          {/* Pillar 4: Dual Type-II SPD */}
          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
            <strong className="text-[8px] font-black text-slate-900 block">Dual Type-II SPD</strong>
            <span className="text-[7px] text-slate-500 block mt-0.2">Complete surge protection</span>
          </div>

          {/* Pillar 5: 24/7 IoT App */}
          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <Radio className="w-4 h-4 text-blue-600 mx-auto mb-0.5" />
            <strong className="text-[8px] font-black text-slate-900 block">24/7 IoT App</strong>
            <span className="text-[7px] text-slate-500 block mt-0.2">Live yield &amp; fault alerts</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 7. PAGE 2 FOOTER                                               */}
        {/* ============================================================== */}
        <div className="pt-1 shrink-0">
          <CustomerPageFooter pageNumber={2} totalPages={5} />
        </div>
      </div>
    </div>
  );
}
