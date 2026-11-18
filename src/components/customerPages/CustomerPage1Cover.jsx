import React from 'react';
import { formatDate, formatCurrency, formatNumber } from '../../utils/formatters';
import { 
  ShieldCheck, 
  Award, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  SunMedium, 
  Leaf, 
  Trees, 
  Clock, 
  Compass, 
  Sparkles,
  Cpu,
  Layers3,
  Activity,
  BadgeCheck,
  CheckCheck,
  ArrowRight,
  TrendingUp,
  Building2,
  Flame,
  Radio,
  FileCheck2,
  Coins,
  Shield,
  Gauge,
  Lock
} from 'lucide-react';
import { EMBLEMS } from '../../utils/brandLogos';
import Watermark from '../common/Watermark';

export default function CustomerPage1Cover({ quotation, settings }) {
  const company = settings?.company || {};
  const customer = quotation?.customer || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const acKw = parseFloat(technical?.acInverterCapacityKw || (technical?.systemCapacityKw ? Math.min(technical.systemCapacityKw, 5) : 5.0));
  const panelWattage = technical?.panelWattage || 550;
  const panelCount = technical?.panelCount || Math.ceil((dcKw * 1000) / panelWattage);
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));
  const monthlyKwh = Math.round(annualKwh / 12);

  const totalCost = commercials?.totalGrossCost || 0;
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : 78000;
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalCost - subsidy);
  const annualSavings = technical?.estimatedAnnualSavings || Math.round(annualKwh * 8.0);
  const paybackYears = commercials?.paybackYears || '3.3';

  const co2Factor = settings?.pricing?.co2FactorPerKwh || 0.82;
  const treeFactor = settings?.pricing?.treeFactorPerTonne || 16.5;

  // 25-Year Lifecycle Calculations
  const lifetimeKwh = Math.round(annualKwh * 25);
  const co2OffsetTonnes = Math.round((lifetimeKwh * co2Factor) / 1000);
  const treesEquivalent = Math.round(co2OffsetTonnes * treeFactor);
  const coalSavedTonnes = Math.round(lifetimeKwh * 0.44 / 1000);
  const gross25YrSavings = commercials?.gross25YrSavings || (annualSavings * 25);

  return (
    <div className="a4-preview-sheet p-5 sm:p-6 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Gold & Navy Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
        {/* ============================================================== */}
        {/* 1. COMMANDING EXECUTIVE BRAND HEADER (NO FLAT MINIMALISM)       */}
        {/* ============================================================== */}
        <div className="rounded-2xl p-3 bg-gradient-to-r from-[#060e24] via-[#0b1736] to-[#040816] text-white border border-slate-800 shadow-md flex items-center justify-between relative overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 w-28 h-28 bg-emerald-500/15 rounded-full blur-xl pointer-events-none" />

          {/* Left Brand Lockup */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-16 h-12 rounded-xl bg-white p-1 shadow-md flex items-center justify-center shrink-0 border-2 border-amber-400/50 ring-2 ring-white/10 overflow-hidden">
              <img 
                src="/assets/srimaan_logo.jpeg" 
                alt="Srimaan Solar Solutions" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black text-white tracking-wide uppercase font-sans">
                  SRIMAAN SOLAR SOLUTIONS
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[7.5px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  DISCOM EMPANELLED EPC
                </span>
              </div>
              <p className="text-[8px] text-slate-300 font-medium mt-0.5">
                Turnkey Solar EPC &bull; TSSPDCL &bull; TSNPDCL &bull; APEPDCL Registered Partner &bull; Khammam HQ
              </p>
            </div>
          </div>

          {/* Right Reference & Validity Capsule */}
          <div className="relative z-10 text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <span className="text-[7.5px] text-slate-300 uppercase font-semibold">Ref:</span>
              <span className="font-mono font-black text-amber-300 text-[8.5px]">
                {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}
              </span>
            </div>
            <div className="flex items-center justify-end gap-2 text-[7px] text-slate-300 mt-1">
              <span>Date: <strong className="text-white">{formatDate(quotation?.date || new Date())}</strong></span>
              <span>&bull;</span>
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                30-Day Guaranteed Price Lock
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. DYNAMIC SOLAR PROPOSAL HERO MASTHEAD                         */}
        {/* ============================================================== */}
        <div className="rounded-2xl p-3.5 bg-gradient-to-br from-[#060e24] via-[#0b1736] to-[#040816] text-white shadow-lg border border-slate-800 relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-2.5">
            {/* Header Ribbon */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[8px] font-black text-amber-300">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>OFFICIAL TECHNO-COMMERCIAL SOLAR ROOFTOP PROPOSAL</span>
                </div>
                <h2 className="text-sm font-black text-white tracking-wide uppercase mt-1">
                  High-Efficiency On-Grid Rooftop Solar PV Power System
                </h2>
              </div>

              {/* Master Capacity Plaque */}
              <div className="text-right shrink-0 bg-gradient-to-br from-amber-500 via-amber-400 to-amber-500 px-3.5 py-1.5 rounded-xl shadow-md border border-amber-300/40 text-slate-950">
                <span className="text-[7.5px] font-black uppercase tracking-wider block text-slate-900">System DC Capacity</span>
                <span className="text-lg font-black font-mono leading-none block">{dcKw} kWp DC</span>
                <span className="text-[7px] font-bold block text-slate-900/90">{acKw} kW AC Grid Inverter</span>
              </div>
            </div>

            {/* 4 Generation Dials */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {/* Dial 1 */}
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center justify-center gap-1 text-[7.5px] font-extrabold text-amber-300 uppercase">
                  <SunMedium className="w-3 h-3 text-amber-400" />
                  Daily Yield
                </div>
                <div className="text-sm font-black text-white font-mono mt-0.5">
                  ~{dailyKwh} <span className="text-[8px] font-normal text-slate-300">Units/Day</span>
                </div>
                <span className="text-[6.5px] text-slate-400 block mt-0.5">4.5 Peak Sun Hours</span>
              </div>

              {/* Dial 2 */}
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center justify-center gap-1 text-[7.5px] font-extrabold text-sky-300 uppercase">
                  <Calendar className="w-3 h-3 text-sky-400" />
                  Monthly Harvest
                </div>
                <div className="text-sm font-black text-white font-mono mt-0.5">
                  ~{monthlyKwh} <span className="text-[8px] font-normal text-slate-300">kWh/Mo</span>
                </div>
                <span className="text-[6.5px] text-slate-400 block mt-0.5">Meteonorm Calibrated</span>
              </div>

              {/* Dial 3 */}
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center justify-center gap-1 text-[7.5px] font-extrabold text-emerald-300 uppercase">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  Annual Yield
                </div>
                <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">
                  ~{formatNumber(annualKwh)} <span className="text-[8px] font-normal text-slate-300">kWh/Yr</span>
                </div>
                <span className="text-[6.5px] text-slate-400 block mt-0.5">Bill Savings: ~₹{formatNumber(annualSavings)}/yr</span>
              </div>

              {/* Dial 4 */}
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center justify-center gap-1 text-[7.5px] font-extrabold text-purple-300 uppercase">
                  <ShieldCheck className="w-3 h-3 text-purple-400" />
                  25-Yr Lifetime
                </div>
                <div className="text-sm font-black text-white font-mono mt-0.5">
                  ~{formatNumber(lifetimeKwh)} <span className="text-[8px] font-normal text-slate-300">kWh</span>
                </div>
                <span className="text-[6.5px] text-slate-400 block mt-0.5">25-Yr Value: ~₹{formatNumber(gross25YrSavings)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. DUAL COMMAND ARCHITECTURE: CLIENT DOSSIER & ROI WEALTH ENGINE*/}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* LEFT: CLIENT & SITE ENGINEERING DOSSIER (6 COLS) */}
          <div className="col-span-6 bg-slate-50/90 rounded-2xl border border-slate-200 p-3 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 mb-2">
                <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Client &amp; Site Technical Dossier
                </span>
                <span className="text-[7px] font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">
                  Feasibility Approved
                </span>
              </div>

              <div className="space-y-1.5 text-[8px]">
                <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Proposal Recipient / Customer</span>
                  <span className="font-black text-slate-950 text-[9.5px] block mt-0.5">
                    {customer?.name || 'Valued Customer'}
                  </span>
                  {customer?.company && (
                    <span className="text-[7.5px] font-bold text-slate-700 block">{customer.company}</span>
                  )}
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Installation Site Address</span>
                  <span className="font-semibold text-slate-800 text-[8px] block mt-0.5 leading-snug">
                    {customer?.addressLine1 || 'Rooftop Site Location'}, {customer?.district || 'Khammam'}, {customer?.state || 'Telangana'} - {customer?.pinCode || '507001'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-slate-400 block text-[6.5px] uppercase font-bold">DISCOM Service No</span>
                    <span className="font-mono font-black text-slate-900 text-[8px] block mt-0.5">
                      {customer?.consumerNumber || 'TG-DISCOM-94812'}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Direct Phone</span>
                    <span className="font-mono font-black text-slate-900 text-[8px] block mt-0.5">
                      {customer?.phone || '+91 94900 85555'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[7px] text-slate-600">
              <span>Required Shadow-Free Roof: <strong>~{Math.round(dcKw * 90)} Sq.Ft.</strong></span>
              <span className="text-emerald-700 font-extrabold">&#10003; 100% Net-Metering Ready</span>
            </div>
          </div>

          {/* RIGHT: FINANCIAL ROI & CARBON OFFSET COMMAND HUB (6 COLS) */}
          <div className="col-span-6 bg-gradient-to-br from-white via-slate-50 to-amber-50/30 rounded-2xl border border-slate-200 p-3 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 mb-2">
                <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-600" />
                  Financial Economics &amp; Carbon Wealth
                </span>
                <span className="text-[7px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  PM Surya Ghar DBT
                </span>
              </div>

              {/* 3 Key Commercial Cards */}
              <div className="grid grid-cols-3 gap-1.5 mb-2 text-center">
                <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[6.5px] font-bold uppercase text-slate-400 block">Total EPC Cost</span>
                  <span className="text-[9.5px] font-black font-mono text-slate-900 block mt-0.5">{formatCurrency(totalCost)}</span>
                  <span className="text-[6px] text-slate-400 block">Inc. GST</span>
                </div>
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 shadow-2xs">
                  <span className="text-[6.5px] font-bold uppercase text-amber-900 block">Govt. CFA Subsidy</span>
                  <span className="text-[9.5px] font-black font-mono text-amber-950 block mt-0.5">- {formatCurrency(subsidy)}</span>
                  <span className="text-[6px] text-amber-700 font-bold block">Direct DBT</span>
                </div>
                <div className="p-2 rounded-xl bg-[#060e24] text-white shadow-2xs">
                  <span className="text-[6.5px] font-bold uppercase text-amber-300 block">Net Outlay</span>
                  <span className="text-[10px] font-black font-mono text-white block mt-0.5">{formatCurrency(netPayable)}</span>
                  <span className="text-[6px] text-emerald-300 font-bold block">~{paybackYears} Yrs Payback</span>
                </div>
              </div>

              {/* Environmental Carbon Metric Capsules */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[8px] font-black text-emerald-950 block">{co2OffsetTonnes} Tonnes CO₂</span>
                    <span className="text-[6.5px] text-emerald-700 block">Lifetime emissions avoided</span>
                  </div>
                </div>
                <div className="p-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-2">
                  <Trees className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[8px] font-black text-emerald-950 block">{treesEquivalent} Mature Trees</span>
                    <span className="text-[6.5px] text-emerald-700 block">Clean air equivalent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[7px] text-slate-500 font-mono">
              <span>Coal Prevented: <strong>{coalSavedTonnes} Tonnes</strong></span>
              <span className="text-emerald-700 font-extrabold">&#10003; 28.4% Net Annual ROI (IRR)</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. 4-PILLAR TURNKEY HARDWARE MASTER HIGHLIGHTS                  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2 text-[7.5px]">
          {/* Card 1 */}
          <div className="p-2 rounded-xl bg-slate-50/90 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-slate-900 text-[8px] flex items-center gap-1">
                <SunMedium className="w-3 h-3 text-amber-500" />
                Tier-1 PV Modules
              </span>
              <span className="text-[6.5px] font-bold text-amber-800 bg-amber-100 px-1 py-0.2 rounded">TOPCon</span>
            </div>
            <p className="text-slate-600 leading-snug">
              {panelCount} Nos. × {panelWattage}Wp Dual-Glass N-Type Bifacial modules with 30-Yr linear performance warranty.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-2 rounded-xl bg-slate-50/90 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-slate-900 text-[8px] flex items-center gap-1">
                <Cpu className="w-3 h-3 text-blue-600" />
                Smart Inverter
              </span>
              <span className="text-[6.5px] font-bold text-blue-800 bg-blue-100 px-1 py-0.2 rounded">98.6%</span>
            </div>
            <p className="text-slate-600 leading-snug">
              {acKw} kW Dual-MPPT grid-tied inverter with built-in Wi-Fi IoT cloud data-logger &amp; remote mobile app monitoring.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-2 rounded-xl bg-slate-50/90 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-slate-900 text-[8px] flex items-center gap-1">
                <Layers3 className="w-3 h-3 text-purple-600" />
                Hot-Dip GI MMS
              </span>
              <span className="text-[6.5px] font-bold text-purple-800 bg-purple-100 px-1 py-0.2 rounded">80µ Zinc</span>
            </div>
            <p className="text-slate-600 leading-snug">
              Heavy-duty elevated structural iron rated for 180 km/h wind speeds with SS-304 anti-corrosive fasteners.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-2 rounded-xl bg-slate-50/90 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-slate-900 text-[8px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Electrical Safety
              </span>
              <span className="text-[6.5px] font-bold text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded">IS 3043</span>
            </div>
            <p className="text-slate-600 leading-snug">
              3 Chemical Gel Earthing Pits, Class-1 Lightning Arrester, Polycab solar DC cables &amp; IP65 ACDB/DCDB protection.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. 15-DAY COMMISSIONING SLA ROADMAP STEPPER                     */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-500" />
              15-Day Guaranteed Turnkey Commissioning SLA Roadmap
            </span>
            <span className="text-[7px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
              DISCOM Net-Meter Synchronization SLA
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-center text-[7.5px]">
            {/* Step 1 */}
            <div className="p-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="w-4 h-4 rounded-full bg-slate-900 text-amber-400 font-black text-[7px] inline-flex items-center justify-center mx-auto mb-0.5">
                01
              </span>
              <span className="font-black text-slate-900 block text-[7.5px]">3D CAD Survey</span>
              <span className="text-slate-500 text-[6.5px] block mt-0.5">Day 1: Roof drone survey &amp; shadow trajectory analysis</span>
            </div>

            {/* Step 2 */}
            <div className="p-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="w-4 h-4 rounded-full bg-slate-900 text-amber-400 font-black text-[7px] inline-flex items-center justify-center mx-auto mb-0.5">
                02
              </span>
              <span className="font-black text-slate-900 block text-[7.5px]">DISCOM Liaison</span>
              <span className="text-slate-500 text-[6.5px] block mt-0.5">Day 3: Net-metering approval &amp; CEIG filing</span>
            </div>

            {/* Step 3 */}
            <div className="p-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="w-4 h-4 rounded-full bg-slate-900 text-amber-400 font-black text-[7px] inline-flex items-center justify-center mx-auto mb-0.5">
                03
              </span>
              <span className="font-black text-slate-900 block text-[7.5px]">MMS Rigging</span>
              <span className="text-slate-500 text-[6.5px] block mt-0.5">Day 7: Hot-dip GI elevated structure assembly</span>
            </div>

            {/* Step 4 */}
            <div className="p-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="w-4 h-4 rounded-full bg-slate-900 text-amber-400 font-black text-[7px] inline-flex items-center justify-center mx-auto mb-0.5">
                04
              </span>
              <span className="font-black text-slate-900 block text-[7.5px]">Array &amp; Earthing</span>
              <span className="text-slate-500 text-[6.5px] block mt-0.5">Day 11: TOPCon panels &amp; 3 chemical earthing pits</span>
            </div>

            {/* Step 5 */}
            <div className="p-1.5 rounded-xl bg-emerald-50/80 border border-emerald-300 shadow-2xs">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-black text-[7px] inline-flex items-center justify-center mx-auto mb-0.5">
                05
              </span>
              <span className="font-black text-emerald-950 block text-[7.5px]">Grid Sync &amp; DBT</span>
              <span className="text-emerald-700 text-[6.5px] block mt-0.5">Day 15: Bi-directional meter install &amp; subsidy DBT</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. PAGE 1 EXECUTIVE FOOTER                                     */}
        {/* ============================================================== */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
          <div>
            <span className="font-bold text-slate-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.address || 'H.No. 11-10-624/A, Burhanpuram, Khammam, Telangana - 507001'}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-semibold">{company?.tagline || 'Clean Green Renewable Energy EPC Partner'}</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Page 1 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
