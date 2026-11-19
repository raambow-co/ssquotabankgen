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
  Workflow
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageFooter from './CustomerPageFooter';
import { formatDate, formatCurrency } from '../../utils/formatters';

export default function CustomerPage1Cover({ quotation, settings }) {
  const company = settings?.company || {};
  const customer = quotation?.customer || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const acKw = parseFloat(technical?.inverterCapacityKw || (dcKw * 1.2).toFixed(1));
  const panelWattage = technical?.panelWattage || 540;
  const panelCount = technical?.panelCount || Math.ceil((dcKw * 1000) / panelWattage);
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));

  const totalCost = commercials?.totalGrossCost || 0;
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : 78000;
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalCost - subsidy);
  const annualSavings = Math.round(technical?.estimatedAnnualSavings || (annualKwh * 8.0));
  const paybackYears = commercials?.paybackYears || (annualSavings > 0 ? (netPayable / annualSavings).toFixed(1) : '3.3');

  return (
    <div className="a4-preview-sheet p-6 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Gold & Navy Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
        {/* ============================================================== */}
        {/* 1. TOP GOVERNMENT EMPANELMENT & ACCREDITATION STRIP            */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200 text-[7.5px] text-slate-600 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            MNRE Empanelled Channel Partner &bull; Govt. of India Certified
          </span>
          <span className="flex items-center gap-2 text-slate-600">
            <span>TSSPDCL &bull; TSNPDCL &bull; APEPDCL Registered</span>
            <span>&bull;</span>
            <span className="text-emerald-700 font-extrabold">PM Surya Ghar DBT National Portal</span>
          </span>
        </div>

        {/* ============================================================== */}
        {/* 2. MASTER BRAND HEADER WITH PROMINENT LOGO & OFFICIAL GSTIN    */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between gap-4 py-0.5">
          {/* Logo + Company Identity */}
          <div className="flex items-center gap-3.5">
            <div className="h-16 w-44 rounded-xl bg-white p-1 shadow-2xs border border-slate-200 flex items-center justify-center shrink-0">
              <img 
                src="/assets/srimaan_logo.jpeg" 
                alt="Srimaan Solar Solutions" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-950 tracking-tight uppercase font-sans">
                  SRIMAAN SOLAR SOLUTIONS
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[7.5px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-2xs">
                  DISCOM EMPANELLED EPC
                </span>
              </div>
              <p className="text-[9px] font-bold text-emerald-800 mt-0.5">
                &ldquo;Clean Green Renewable Energy EPC Partner&rdquo;
              </p>
              <p className="text-[7.5px] text-slate-500 font-medium">
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
                Ref: {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}
              </span>
              <span>Date: <strong className="text-slate-900">{formatDate(quotation?.date || new Date())}</strong></span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                Validity: 30 Days
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. HERO SHOWCASE BANNER                                         */}
        {/* ============================================================== */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 h-40 bg-slate-900 shrink-0">
          <img 
            src="/assets/portfolio/project-1.jpg" 
            alt="Rooftop Solar Installation" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060e24] via-[#060e24]/40 to-transparent" />

          <div className="absolute top-2.5 left-3 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[7.5px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-slate-950" />
              TURNKEY SOLAR EPC PROPOSAL
            </span>
            <span className="px-2 py-0.5 rounded-full text-[7px] font-bold bg-white/20 backdrop-blur-xs text-white border border-white/20">
              On-Grid Net-Metered
            </span>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-end justify-between">
            <div>
              <h2 className="text-sm font-black tracking-wide uppercase drop-shadow-xs font-sans">
                {dcKw} kW Rooftop Solar Photovoltaic Power Plant
              </h2>
              <p className="text-[7.5px] text-slate-200 font-medium mt-0.5">
                Engineered with Tier-1 TOPCon Bifacial Modules &bull; Smart Grid Inverter &bull; 80&mu; Hot-Dip Galvanized Structure
              </p>
            </div>
            <div className="text-right bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-white/15">
              <span className="text-[6.5px] text-amber-300 font-bold uppercase block">Capacity</span>
              <span className="text-base font-black text-white font-mono">{dcKw} kWp DC</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. ABOUT US SECTION (From Srimaan Solar Official Document)      */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-100">
            <h3 className="text-[10px] font-black text-slate-900 tracking-wide uppercase flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              ABOUT US
            </h3>
            <span className="text-[7px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Telangana &amp; Andhra Pradesh
            </span>
          </div>
          <p className="text-[8px] text-slate-600 leading-relaxed">
            <strong>Srimaan Solar Solutions</strong> provides solar power systems for homes, businesses, and industrial facilities across Telangana and Andhra Pradesh. We help customers choose a system based on their electricity usage, available roof space, and backup power needs.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 5. SOLAR SYSTEMS WE OFFER (3 Pillar Cards from Official PDF)    */}
        {/* ============================================================== */}
        <div>
          <h4 className="text-[8.5px] font-extrabold text-slate-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <SunMedium className="w-3 h-3 text-amber-500" />
            Solar Systems We Offer
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {/* On-grid */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-1">
                  <Zap className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-slate-900 text-[8.5px]">On-grid solar</h5>
                <p className="text-[7px] text-slate-600 mt-1 leading-snug">
                  Connects to the electricity grid. Surplus power can be exported through net metering.
                </p>
              </div>
              <span className="mt-1.5 inline-block text-[6.5px] font-extrabold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                Recommended for Subsidies
              </span>
            </div>

            {/* Off-grid */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1">
                  <BatteryCharging className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-slate-900 text-[8.5px]">Off-grid solar</h5>
                <p className="text-[7px] text-slate-600 mt-1 leading-snug">
                  Uses battery storage to power properties independently of the electricity grid.
                </p>
              </div>
              <span className="mt-1.5 inline-block text-[6.5px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                100% Independent Power
              </span>
            </div>

            {/* Hybrid */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-1">
                  <Workflow className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-slate-900 text-[8.5px]">Hybrid solar</h5>
                <p className="text-[7px] text-slate-600 mt-1 leading-snug">
                  Combines a grid connection with battery storage for reliable backup power.
                </p>
              </div>
              <span className="mt-1.5 inline-block text-[6.5px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                Best of Both Worlds
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. CLIENT DOSSIER & INSTALLATION SUPPORT                       */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* Client Details (6 Cols) */}
          <div className="col-span-6 p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 mb-1">
                <span className="text-[8px] font-black text-slate-900 uppercase tracking-wide">
                  Prepared For
                </span>
                <span className="text-[6.5px] font-bold text-slate-500 font-mono">
                  Site Technical Dossier
                </span>
              </div>
              <div className="space-y-0.5 text-[7.5px]">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Customer:</span>
                  <strong className="text-slate-900">{customer?.name || 'Respected Customer'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Phone:</span>
                  <strong className="text-slate-900">{customer?.phone || '9347416140'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Installation Site:</span>
                  <strong className="text-slate-900 truncate max-w-[170px]">{customer?.address || 'Khammam, Telangana'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Consumer No:</span>
                  <strong className="text-slate-900">{customer?.consumerServiceNumber || 'TS-DISCOM-RES'}</strong>
                </div>
              </div>
            </div>
            <div className="mt-1 pt-1 border-t border-slate-200 text-[6.5px] text-slate-500 flex justify-between">
              <span>Category: <strong>{customer?.tariffCategory || 'Domestic Rooftop'}</strong></span>
              <span>Load: <strong>{customer?.sanctionedLoadKw || `${dcKw} kW`}</strong></span>
            </div>
          </div>

          {/* Installation and Support (6 Cols) */}
          <div className="col-span-6 p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 mb-1">
                <span className="text-[8px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Installation and Support
                </span>
                <span className="text-[6.5px] text-emerald-800 font-bold bg-emerald-100 px-1 py-0.2 rounded">
                  Turnkey EPC
                </span>
              </div>
              <p className="text-[7.5px] text-slate-600 leading-relaxed">
                We help customers with system selection, equipment supply, installation, and commissioning. For eligible residential rooftop projects, we assist with subsidy documentation and coordinate net-metering applications with the electricity distribution company.
              </p>
            </div>
            <p className="mt-1 pt-1 border-t border-slate-200 text-[7px] text-slate-700 font-bold">
              &#10003; We also offer regular system checks and inverter diagnostics.
            </p>
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
