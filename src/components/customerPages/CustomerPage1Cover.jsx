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
  Sparkles,
  Cpu,
  Layers3,
  BadgeCheck,
  CheckCheck,
  ArrowRight,
  TrendingUp,
  Building2,
  Coins,
  Shield,
  Gauge,
  Lock,
  Compass
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

  return (
    <div className="a4-preview-sheet p-6 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Gold & Navy Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
        {/* ============================================================== */}
        {/* 1. TOP GOVERNMENT EMPANELMENT & ACCREDITATION STRIP            */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 text-[7.5px] text-slate-600 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            MNRE Empanelled Channel Partner &bull; Govt. of India Certified
          </span>
          <span className="flex items-center gap-2 text-slate-600">
            <span>TSSPDCL &bull; TSNPDCL &bull; APEPDCL Registered</span>
            <span>&bull;</span>
            <span className="text-emerald-700 font-extrabold">PM Surya Ghar DBT National Portal</span>
          </span>
        </div>

        {/* ============================================================== */}
        {/* 2. MASTER BRAND HEADER WITH PROMINENT, LARGE LOGO              */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between gap-4 py-1">
          {/* Large, Crisp Srimaan Solar Brand Logo - High Resolution Display */}
          <div className="flex items-center gap-4">
            <div className="h-20 w-44 rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200/90 flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-amber-400/20">
              <img 
                src="/assets/srimaan_logo.jpeg" 
                alt="Srimaan Solar Solutions" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-950 tracking-tight uppercase font-sans">
                  SRIMAAN SOLAR SOLUTIONS
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[8px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-2xs">
                  EMPANELLED EPC
                </span>
              </div>
              <p className="text-[9.5px] font-bold text-emerald-800 mt-0.5">
                &ldquo;Clean Green Renewable Energy EPC Partner&rdquo;
              </p>
              <p className="text-[8px] text-slate-500 font-medium mt-0.5">
                Engineering Headquarters: Burhanpuram, Khammam, Telangana - 507001 &bull; Pan-India Service Network
              </p>
            </div>
          </div>

          {/* Proposal Reference Plaque */}
          <div className="text-right shrink-0">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs text-right">
              <span className="text-[7px] text-slate-400 uppercase font-black tracking-wider block">Proposal Identifier</span>
              <span className="font-mono font-black text-slate-900 text-[9px] block mt-0.5">
                {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}
              </span>
              <div className="mt-1 pt-1 border-t border-slate-200 flex items-center justify-end gap-1.5 text-[7px] text-slate-500">
                <span>Date: <strong>{formatDate(quotation?.date || new Date())}</strong></span>
                <span>&bull;</span>
                <span className="text-emerald-700 font-extrabold">30-Day Price Lock</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. CINEMATIC HERO SHOWCASE BANNER                              */}
        {/* ============================================================== */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 h-52 bg-slate-900">
          <img 
            src="/assets/portfolio/project-1.jpg" 
            alt="Rooftop Solar Installation" 
            className="w-full h-full object-cover opacity-90"
          />
          {/* Deep Contrast Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060e24] via-[#060e24]/40 to-transparent" />

          {/* Top Left Floating Tag */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[8px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-slate-950" />
              TURNKEY ROOFTOP SOLAR EPC BLUEPRINT
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[7.5px] font-bold bg-white/20 backdrop-blur-xs text-white border border-white/20">
              On-Grid Net-Metered
            </span>
          </div>

          {/* Bottom Overlay Title & Subtitle */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h2 className="text-base font-black tracking-wide uppercase drop-shadow-sm font-sans">
              Techno-Commercial Rooftop Solar Photovoltaic Proposal
            </h2>
            <p className="text-[8.5px] text-slate-200 mt-0.5 leading-snug drop-shadow-xs max-w-2xl">
              Custom-Engineered for High-Yield Net-Metering, Central DBT Subsidy Facilitation &amp; 25-Year Levelized Electricity Cost Savings.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. MASTER CAPACITY & GENERATION COMMAND PLAQUE                  */}
        {/* ============================================================== */}
        <div className="rounded-2xl p-3 bg-gradient-to-br from-[#060e24] via-[#0b1736] to-[#040816] text-white shadow-md border border-slate-800 flex items-center justify-between">
          {/* Left Capacity Block */}
          <div className="flex items-center gap-3 border-r border-white/10 pr-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <SunMedium className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-[7.5px] uppercase font-bold text-amber-300 tracking-wider block">Proposed Solar Capacity</span>
              <span className="text-2xl font-black font-mono leading-none block mt-0.5 text-white">{dcKw} kWp DC</span>
              <span className="text-[7px] text-slate-300 font-medium block mt-0.5">{acKw} kW AC Grid Inverter &bull; {panelCount} Nos. &times; {panelWattage}Wp</span>
            </div>
          </div>

          {/* 3 Yield Metrics */}
          <div className="grid grid-cols-3 gap-3 flex-1 pl-4 text-center">
            <div className="p-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[6.5px] uppercase font-bold text-slate-300 block">Daily Generation</span>
              <strong className="text-sm font-black text-amber-400 font-mono block mt-0.5">~{dailyKwh} Units</strong>
              <span className="text-[6px] text-slate-400 block">4.5 Peak Sun Hours</span>
            </div>
            <div className="p-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[6.5px] uppercase font-bold text-slate-300 block">Annual Yield</span>
              <strong className="text-sm font-black text-emerald-400 font-mono block mt-0.5">~{formatNumber(annualKwh)} kWh</strong>
              <span className="text-[6px] text-slate-400 block">DISCOM Metered</span>
            </div>
            <div className="p-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[6.5px] uppercase font-bold text-slate-300 block">Annual Bill Savings</span>
              <strong className="text-sm font-black text-white font-mono block mt-0.5">~₹{formatNumber(annualSavings)}/yr</strong>
              <span className="text-[6px] text-emerald-300 font-bold block">100% Tax-Free</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. PREPARED EXCLUSIVELY FOR: CLIENT & SITE DOSSIER             */}
        {/* ============================================================== */}
        <div className="rounded-2xl p-3 bg-slate-50 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 mb-2">
            <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              Proposal Prepared Exclusively For (Client &amp; Site Dossier)
            </span>
            <span className="text-[7.5px] font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">
              Verified Installation Site
            </span>
          </div>

          <div className="grid grid-cols-12 gap-2 text-[8px]">
            {/* Customer Name & Entity */}
            <div className="col-span-5 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[6.5px] font-bold text-slate-400 uppercase block">Client Name / Entity</span>
              <span className="text-[10px] font-black text-slate-950 block mt-0.5">
                {customer?.name || 'Valued Customer'}
              </span>
              {customer?.company && (
                <span className="text-[7.5px] font-bold text-slate-700 block mt-0.5">{customer.company}</span>
              )}
            </div>

            {/* Address */}
            <div className="col-span-7 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[6.5px] font-bold text-slate-400 uppercase block">Rooftop Installation Site Address</span>
              <span className="text-[8.5px] font-semibold text-slate-800 block mt-0.5 leading-snug">
                {customer?.addressLine1 || 'Rooftop Site Location'}, {customer?.district || 'Khammam'}, {customer?.state || 'Telangana'} - {customer?.pinCode || '507001'}
              </span>
            </div>

            {/* Site Tech Specs */}
            <div className="col-span-4 p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[6.5px] font-bold text-slate-400 uppercase block">DISCOM Service Connection</span>
              <span className="font-mono font-black text-slate-900 text-[8px] block mt-0.5">
                {customer?.consumerNumber || 'TG-DISCOM-94812'}
              </span>
            </div>

            <div className="col-span-4 p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[6.5px] font-bold text-slate-400 uppercase block">Sanctioned Load &amp; Phase</span>
              <span className="font-bold text-slate-800 text-[8px] block mt-0.5">
                {dcKw} kW &bull; 3-Phase Grid Sync
              </span>
            </div>

            <div className="col-span-4 p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[6.5px] font-bold text-slate-400 uppercase block">Terrace Shadow-Free Roof</span>
              <span className="font-bold text-emerald-800 text-[8px] block mt-0.5">
                ~{Math.round(dcKw * 90)} Sq.Ft. Area Sized
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. 4 CORE TURNKEY ENGINEERING GUARANTEES                        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2 text-[7.5px]">
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <span className="font-black text-slate-900 block text-[8px]">30-Yr Linear Warranty</span>
              <span className="text-slate-500 text-[6.5px] block">N-Type TOPCon Dual-Glass</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="font-black text-slate-900 block text-[8px]">98.6% Dual MPPT</span>
              <span className="text-slate-500 text-[6.5px] block">Smart IoT Cloud Wi-Fi App</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
            <Layers3 className="w-5 h-5 text-purple-600 shrink-0" />
            <div>
              <span className="font-black text-slate-900 block text-[8px]">80µ Hot-Dip GI MMS</span>
              <span className="text-slate-500 text-[6.5px] block">180 km/h Cyclone Certified</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
            <Coins className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-black text-slate-900 block text-[8px]">PM Surya Ghar DBT</span>
              <span className="text-slate-500 text-[6.5px] block">₹78,000 Direct Bank Credit</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 7. COVER PAGE FOOTER WITH STATUTORY METADATA                   */}
        {/* ============================================================== */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
          <div>
            <span className="font-bold text-slate-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.address || 'H.No. 11-10-624/A, Burhanpuram, Khammam, Telangana - 507001'}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-bold">{company?.tagline || 'Clean Green Renewable Energy EPC Partner'}</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              Page 1 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
