import React from 'react';
import { 
  SunMedium, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Zap, 
  Sparkles,
  Cpu,
  Layers3,
  BadgeCheck,
  CheckCheck,
  Building2,
  Coins,
  Shield,
  Gauge,
  Lock,
  BatteryCharging,
  Radio,
  Workflow,
  CheckCircle2
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageFooter from './CustomerPageFooter';
import { formatDate, formatCurrency, formatNumber } from '../../utils/formatters';

export default function CustomerPage1Cover({ quotation, settings }) {
  const company = settings?.company || {};
  const customer = quotation?.customer || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const acKw = parseFloat(technical?.acInverterCapacityKw || technical?.inverterCapacityKw || (dcKw <= 3 ? 3.6 : (dcKw * 1.2).toFixed(1)));
  const panelWattage = technical?.panelWattage || 540;
  const panelCount = technical?.panelCount || Math.ceil((dcKw * 1000) / panelWattage);
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));

  const totalCost = commercials?.totalGrossCost || 0;
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : 78000;
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalCost - subsidy);

  // Format clean reference number
  const rawRef = quotation?.quotationNumber || 'SSS-SOL-2026-0001';
  const cleanRef = rawRef.replace(/^SRIMAAN\s+SOLAR\s+SOLUTIONS-?/i, 'SSS-');

  return (
    <div className="a4-preview-sheet p-6 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Gold & Navy Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2.5">
        {/* ============================================================== */}
        {/* 1. TOP GOVERNMENT EMPANELMENT & ACCREDITATION STRIP            */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200 text-[7.5px] text-slate-600 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            MNRE Empanelled Channel Partner &bull; Govt. of India Certified
          </span>
          <span className="flex items-center gap-2 text-slate-600">
            <span>TSSPDCL &bull; TSNPDCL &bull; APEPDCL Registered Partner</span>
            <span>&bull;</span>
            <span className="text-emerald-700 font-extrabold">PM Surya Ghar DBT National Portal</span>
          </span>
        </div>

        {/* ============================================================== */}
        {/* 2. MASTER BRAND HEADER WITH CLEAN LOGO & OFFICIAL GSTIN        */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between gap-3 py-0.5">
          {/* Logo + Company Identity */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Prominent Logo without ugly grey box */}
            <div className="h-14 sm:h-16 w-48 sm:w-52 flex items-center shrink-0">
              <img 
                src="/assets/srimaan_logo.jpeg" 
                alt="Srimaan Solar Solutions" 
                className="h-full w-auto max-w-full object-contain"
              />
            </div>

            {/* Vertical Gold Divider */}
            <div className="h-10 w-[1.5px] bg-gradient-to-b from-amber-400 via-slate-300 to-transparent shrink-0 hidden sm:block" />

            {/* Company Tagline & HQ */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-slate-950 tracking-tight uppercase font-sans whitespace-nowrap">
                  SRIMAAN SOLAR SOLUTIONS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[7.5px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-2xs whitespace-nowrap">
                  DISCOM EMPANELLED EPC
                </span>
              </div>
              <p className="text-[8.5px] font-bold text-emerald-800 mt-0.5 truncate">
                &ldquo;Clean Green Renewable Energy EPC Partner&rdquo;
              </p>
              <p className="text-[7.5px] text-slate-500 font-medium truncate">
                HQ: #6-210, Sriramnagar, Behind Auto Nagar, Warangal X Road, Khammam 507003
              </p>
            </div>
          </div>

          {/* Official GSTIN, Contact & Proposal Ref as per Benchmark */}
          <div className="text-right shrink-0">
            <div className="text-[10px] font-black text-slate-900 tracking-wider">
              GSTIN <span className="font-mono text-emerald-800 font-extrabold">{company.gstin || "36ADPPT2441N1ZW"}</span>
            </div>
            <div className="text-[8px] font-semibold text-slate-600 mt-0.5">
              <span>{company.phone || "9347416140"}</span> &bull; <span>{company.email || "srimaansolarsolutions@gmail.com"}</span>
            </div>
            <div className="mt-1 flex items-center justify-end gap-1.5 text-[7px] text-slate-500">
              <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                Ref: {cleanRef}
              </span>
              <span>Date: <strong className="text-slate-900">{formatDate(quotation?.date || new Date())}</strong></span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                Validity: 30 Days
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. EXECUTIVE PROPOSAL HERO SHOWCASE BANNER                      */}
        {/* ============================================================== */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-amber-400/30 bg-gradient-to-r from-[#060e24] via-[#0c1c3f] to-[#08152e] text-white p-3.5 shrink-0">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Engineering Scope & Title */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[7.5px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-slate-950" />
                  TURNKEY SOLAR EPC PROPOSAL
                </span>
                <span className="px-2 py-0.5 rounded-full text-[7px] font-bold bg-white/15 backdrop-blur-xs text-white border border-white/20">
                  On-Grid Net-Metered
                </span>
                <span className="px-2 py-0.5 rounded-full text-[7px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PM Surya Ghar Subsidy Eligible
                </span>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-black tracking-tight uppercase font-sans text-white drop-shadow-xs">
                  {dcKw} kW Rooftop Solar Photovoltaic Power Plant
                </h2>
                <p className="text-[8px] text-slate-200 font-medium mt-0.5">
                  Engineered with Tier-1 TOPCon Bifacial Solar Modules &bull; High-Yield Smart Grid Inverter &bull; 80&mu; Hot-Dip Galvanized Rigging
                </p>
              </div>

              <div className="flex items-center gap-3 pt-0.5 text-[7px] text-amber-300 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  25-Year Linear Module Warranty
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  7-Year Inverter Warranty
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  100% DISCOM Net-Metering SLA
                </span>
              </div>
            </div>

            {/* Right: Sizing & Generation Golden Box */}
            <div className="text-right bg-black/40 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/15 shrink-0 min-w-[130px]">
              <span className="text-[7px] text-amber-300 font-bold uppercase tracking-wider block">
                System Sizing
              </span>
              <span className="text-xl font-black text-white font-mono block mt-0.5">
                {dcKw} kWp DC
              </span>
              <div className="mt-1 pt-1 border-t border-white/10 text-[7px] text-slate-300 font-medium">
                <div>Yield: <strong className="text-white font-mono">~{dailyKwh} kWh/day</strong></div>
                <div>Annual: <strong className="text-emerald-300 font-mono">{formatNumber(annualKwh)} kWh/yr</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. CLIENT DOSSIER & INSTALLATION SUPPORT (Executive Grid)      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* Client Details (6 Cols) */}
          <div className="col-span-6 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1.5">
                <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-blue-600" />
                  Prepared For (Client Dossier)
                </span>
                <span className="text-[7px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                  Site Technical Record
                </span>
              </div>
              <div className="space-y-1 text-[8px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Customer Name:</span>
                  <strong className="text-slate-900 font-bold">{customer?.name || 'Respected Customer'}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Contact Phone:</span>
                  <strong className="text-slate-900 font-mono font-bold">{customer?.phone || '9347416140'}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Installation Site:</span>
                  <strong className="text-slate-900 truncate max-w-[190px]">{customer?.address || 'Khammam, Telangana'}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Consumer Service No:</span>
                  <strong className="text-slate-900 font-mono font-bold">{customer?.consumerServiceNumber || 'TS-DISCOM-RES'}</strong>
                </div>
              </div>
            </div>
            <div className="mt-1.5 pt-1 border-t border-slate-100 text-[7px] text-slate-500 flex justify-between">
              <span>Category: <strong className="text-slate-900">{customer?.tariffCategory || 'Domestic Rooftop'}</strong></span>
              <span>Sanctioned Load: <strong className="text-slate-900">{customer?.sanctionedLoadKw || `${dcKw} kW`}</strong></span>
            </div>
          </div>

          {/* Installation and Support (6 Cols) */}
          <div className="col-span-6 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1.5">
                <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Installation &amp; Support Scope
                </span>
                <span className="text-[7px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  Turnkey EPC Scope
                </span>
              </div>
              <p className="text-[8px] text-slate-600 leading-relaxed">
                We assist customers with system selection, equipment supply, rooftop installation, and commissioning. For eligible residential projects, we coordinate subsidy documentation and manage DISCOM net-metering synchronization end-to-end.
              </p>
            </div>
            <div className="mt-1.5 pt-1 border-t border-slate-100 text-[7.5px] text-emerald-800 font-bold flex items-center gap-1">
              <CheckCheck className="w-3 h-3 text-emerald-600" />
              <span>Includes scheduled system checkups &amp; smart inverter diagnostics.</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. ABOUT US SECTION (From Srimaan Solar Official Document)      */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-100">
            <h3 className="text-[9.5px] font-black text-slate-900 tracking-wide uppercase flex items-center gap-1.5">
              <SunMedium className="w-3.5 h-3.5 text-amber-500" />
              ABOUT SRIMAAN SOLAR SOLUTIONS
            </h3>
            <span className="text-[7px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Telangana &amp; Andhra Pradesh Premier EPC
            </span>
          </div>
          <p className="text-[8px] text-slate-600 leading-relaxed">
            <strong>Srimaan Solar Solutions</strong> delivers turnkey rooftop solar power systems for homes, commercial establishments, and industrial facilities across Telangana and Andhra Pradesh. We design bespoke systems optimized for your roof geometry, energy consumption profile, and maximum return on investment.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 6. SOLAR SYSTEMS WE OFFER (3 Pillar Cards from Official PDF)    */}
        {/* ============================================================== */}
        <div>
          <h4 className="text-[9px] font-extrabold text-slate-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <Workflow className="w-3 h-3 text-blue-600" />
            Solar Systems We Offer
          </h4>
          <div className="grid grid-cols-3 gap-2.5">
            {/* On-grid */}
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-1">
                  <Zap className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-slate-900 text-[9px]">On-Grid Solar</h5>
                <p className="text-[7.5px] text-slate-600 mt-1 leading-snug">
                  Connects to the electricity grid. Surplus power exported through bi-directional net metering.
                </p>
              </div>
              <span className="mt-2 inline-block text-[7px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Recommended for Subsidies
              </span>
            </div>

            {/* Off-grid */}
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1">
                  <BatteryCharging className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-slate-900 text-[9px]">Off-Grid Solar</h5>
                <p className="text-[7.5px] text-slate-600 mt-1 leading-snug">
                  Uses deep-cycle battery storage to power properties independently of the electricity grid.
                </p>
              </div>
              <span className="mt-2 inline-block text-[7px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% Independent Power
              </span>
            </div>

            {/* Hybrid */}
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-1">
                  <Workflow className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-slate-900 text-[9px]">Hybrid Solar</h5>
                <p className="text-[7.5px] text-slate-600 mt-1 leading-snug">
                  Combines grid connection with battery storage for reliable emergency backup &amp; peak shaving.
                </p>
              </div>
              <span className="mt-2 inline-block text-[7px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Best of Both Worlds
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 7. PAGE 1 FOOTER                                               */}
        {/* ============================================================== */}
        <CustomerPageFooter pageNumber={1} totalPages={5} />
      </div>
    </div>
  );
}
