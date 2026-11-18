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
  Atom, 
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
  Coins
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
  const paybackYears = commercials?.paybackYears || '3.5';

  const co2Factor = settings?.pricing?.co2FactorPerKwh || 0.82;
  const treeFactor = settings?.pricing?.treeFactorPerTonne || 16.5;

  // 25-Year Lifecycle Metrics
  const lifetimeKwh = Math.round(annualKwh * 25);
  const co2OffsetTonnes = Math.round((lifetimeKwh * co2Factor) / 1000);
  const treesEquivalent = Math.round(co2OffsetTonnes * treeFactor);
  const coalSavedTonnes = Math.round(lifetimeKwh * 0.44 / 1000);

  return (
    <div className="a4-preview-sheet p-6 sm:p-7 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Sleek Solar Amber & Navy Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0b132b] via-amber-500 to-emerald-600 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
        {/* ============================================================== */}
        {/* 1. TOP HEADER & CORPORATE IDENTITY STRIP                       */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-12 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
              <img 
                src="/assets/srimaan_logo.jpeg" 
                alt="Srimaan Solar Solutions" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-slate-900 tracking-tight uppercase font-sans">
                  SRIMAAN SOLAR SOLUTIONS
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[8.5px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                  DISCOM Empanelled EPC
                </span>
              </div>
              <p className="text-[9px] text-slate-500 font-medium">
                Turnkey Solar EPC &bull; TSSPDCL &bull; TSNPDCL &bull; APEPDCL Empanelled Partner
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-[8.5px] text-slate-500">
              <span className="font-semibold">Quotation Ref:</span>
              <span className="font-mono font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}
              </span>
            </div>
            <div className="flex items-center justify-end gap-2 text-[8px] text-slate-500 mt-1">
              <span>Date: <strong>{formatDate(quotation?.date || new Date())}</strong></span>
              <span>&bull;</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                Validity: 30 Days
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. DYNAMIC SOLAR PROPOSAL HERO BANNER                           */}
        {/* ============================================================== */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b132b] via-[#111f44] to-[#0b132b] text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-full bg-radial-gradient from-amber-500/15 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/10 text-[8px] font-bold uppercase tracking-wider">
                <SunMedium className="w-3 h-3 text-amber-400" />
                <span>Executive Techno-Commercial Solar Proposal</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                HIGH-EFFICIENCY ON-GRID ROOFTOP SOLAR PV SYSTEM
              </h2>
              <p className="text-[9.5px] text-slate-300 leading-relaxed">
                Engineered with Tier-1 bifacial solar technology, smart dual-MPPT grid synchronization, and PM Surya Ghar central subsidy facilitation.
              </p>
            </div>

            {/* Capacity Mega-Badge */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-center shrink-0 min-w-[140px]">
              <span className="text-[7.5px] uppercase font-bold text-amber-300 block tracking-widest">
                SYSTEM CAPACITY
              </span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">
                {dcKw} <span className="text-xs font-semibold text-amber-300">kWp</span>
              </div>
              <span className="text-[8px] text-slate-300 block font-medium mt-0.5">
                {panelCount} &times; {panelWattage}Wp Modules
              </span>
              <div className="mt-1.5 pt-1.5 border-t border-white/10 flex justify-between text-[7.5px] text-slate-300">
                <span>Daily: <strong className="text-amber-300">~{dailyKwh} U</strong></span>
                <span>Annual: <strong className="text-emerald-300">{formatNumber(annualKwh)} U</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. DUAL DOSSIER: CLIENT & SITE VS FINANCIAL & ROI SNAPSHOT      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-3 items-stretch">
          {/* LEFT: CLIENT & INSTALLATION SITE DOSSIER (6 COLS) */}
          <div className="col-span-6 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Client &amp; Site Installation Dossier
                </span>
                <span className="text-[7.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Site Verified
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[7px] uppercase font-bold text-slate-400 block">Customer Name</span>
                  <p className="font-extrabold text-slate-900 text-[11px] truncate mt-0.5">
                    {customer.name || 'Valued Solar Client'}
                  </p>
                  {customer.companyName && (
                    <p className="text-[8px] text-slate-500 truncate mt-0.5">{customer.companyName}</p>
                  )}
                  <div className="mt-1 flex items-center gap-3 text-[8px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-2.5 h-2.5 text-blue-600" /> {customer.phone || '+91 94948 22356'}
                    </span>
                    {customer.email && (
                      <span className="flex items-center gap-1 truncate">
                        <Mail className="w-2.5 h-2.5 text-amber-600" /> {customer.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[7px] uppercase font-bold text-slate-400 block">Installation Address</span>
                  <p className="font-semibold text-slate-800 text-[9px] leading-tight line-clamp-2 mt-0.5">
                    {customer.location || 'Site Location Address, Telangana / Andhra Pradesh'}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-[7.5px] text-emerald-700 font-bold">
                    <MapPin className="w-2.5 h-2.5" /> <span>Shadow-Free Rooftop &bull; South Orientation</span>
                  </div>
                </div>

                {/* 4 Technical Site Metrics Chips */}
                <div className="grid grid-cols-4 gap-1 text-center text-[7.5px]">
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block font-bold text-[6.5px]">Consumer No</span>
                    <span className="font-mono font-bold text-slate-900 truncate block mt-0.5">
                      {customer.consumerNumber || 'TSSPDCL-PENDING'}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block font-bold text-[6.5px]">Grid Phase</span>
                    <span className="font-bold text-slate-900 truncate block mt-0.5">
                      {customer.gridPhase || (dcKw > 5 ? '3-Phase' : '1-Phase')}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block font-bold text-[6.5px]">Roof Type</span>
                    <span className="font-bold text-slate-900 truncate block mt-0.5">
                      {customer.roofType || 'RCC Concrete'}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block font-bold text-[6.5px]">Clear Space</span>
                    <span className="font-bold text-emerald-700 truncate block mt-0.5">
                      ~{Math.round(dcKw * 90)} Sq.Ft
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[7.5px] text-slate-500">
              <span>DISCOM Category: Domestic / Commercial</span>
              <span className="text-blue-700 font-bold">11kV Feeder Sync</span>
            </div>
          </div>

          {/* RIGHT: FINANCIAL & ENVIRONMENTAL ROI SNAPSHOT (6 COLS) */}
          <div className="col-span-6 p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-amber-50/20 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-600" />
                  Financial Investment &amp; ROI Snapshot
                </span>
                <span className="text-[7.5px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Payback: ~{paybackYears} Yrs
                </span>
              </div>

              {/* Pricing & Subsidy Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[7px] uppercase font-bold text-slate-400 block">Gross Turnkey Cost</span>
                  <span className="text-sm font-extrabold text-slate-900 font-mono block mt-0.5">
                    {formatCurrency(totalCost)}
                  </span>
                  <span className="text-[6.5px] text-slate-400 block mt-0.5">Inclusive of 70:30 GST</span>
                </div>

                <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200 shadow-2xs">
                  <span className="text-[7px] uppercase font-bold text-amber-800 block">PM Surya Ghar Subsidy</span>
                  <span className="text-sm font-black text-amber-700 font-mono block mt-0.5">
                    - {formatCurrency(subsidy)}
                  </span>
                  <span className="text-[6.5px] text-emerald-700 font-bold block mt-0.5">&#10003; Direct Bank DBT</span>
                </div>
              </div>

              {/* Net Investment Hero Capsule */}
              <div className="p-2.5 rounded-xl bg-[#0b132b] text-white flex items-center justify-between shadow-xs mb-2">
                <div>
                  <span className="text-[7.5px] uppercase font-bold text-amber-300 block">Net Effective Investment</span>
                  <span className="text-base font-black text-white font-mono leading-tight">
                    {formatCurrency(netPayable)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[7.5px] uppercase font-bold text-slate-300 block">Annual Bill Savings</span>
                  <span className="text-xs font-black text-emerald-400 font-mono">
                    ~{formatCurrency(annualSavings)}/yr
                  </span>
                </div>
              </div>

              {/* Environmental Carbon Offsets Banner */}
              <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[7.5px] grid grid-cols-3 gap-1 text-center">
                <div>
                  <span className="text-slate-500 block text-[6.5px] uppercase font-bold">25-Yr CO₂ Saved</span>
                  <span className="font-extrabold text-emerald-800 text-[9px]">{formatNumber(co2OffsetTonnes)} Tonnes</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[6.5px] uppercase font-bold">Trees Equivalent</span>
                  <span className="font-extrabold text-emerald-800 text-[9px]">{formatNumber(treesEquivalent)} Trees</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[6.5px] uppercase font-bold">Coal Displaced</span>
                  <span className="font-extrabold text-emerald-800 text-[9px]">{formatNumber(coalSavedTonnes)} Tonnes</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[7.5px] text-slate-500">
              <span>Lifetime Net ROI: <strong>28% - 32% IRR</strong></span>
              <span className="text-emerald-700 font-bold">&#10003; 100% Tax-Free Avoided Bill</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. TURNKEY EPC HARDWARE & SCOPE HIGHLIGHTS (4 BOXES)           */}
        {/* ============================================================== */}
        <div>
          <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide block mb-1.5">
            Turnkey Clean-Tech Engineering Scope &amp; Hardware Tier-1 Standards
          </span>

          <div className="grid grid-cols-4 gap-2 text-[7.5px]">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-1.5 border border-blue-200">
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-[8.5px]">Tier-1 TOPCon Modules</h4>
              <p className="text-slate-500 mt-0.5 leading-tight">
                High-efficiency 550Wp bifacial dual-glass modules with 25-yr linear yield warranty.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5 border border-amber-200">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-[8.5px]">Smart IoT Inverter</h4>
              <p className="text-slate-500 mt-0.5 leading-tight">
                Dual-MPPT grid-tie inverter with 98.6% efficiency and 24/7 cloud Wi-Fi mobile telemetry.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-[8.5px]">Heavy-Duty GI MMS</h4>
              <p className="text-slate-500 mt-0.5 leading-tight">
                Hot-dip galvanized structure with 80µ zinc coating, wind load certified up to 180 km/h.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-1.5 border border-slate-200">
                <CheckCheck className="w-3.5 h-3.5 text-slate-800" />
              </div>
              <h4 className="font-bold text-slate-900 text-[8.5px]">DISCOM Net-Metering</h4>
              <p className="text-slate-500 mt-0.5 leading-tight">
                Complete documentation, CEIG approval liaison, and bi-directional meter synchronization.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. 15-DAY COMMISSIONING ROADMAP                                */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" />
              Guaranteed 15-Day Turnkey Commissioning SLA Roadmap
            </span>
            <span className="text-[7px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              On-Time Delivery SLA
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-center text-[7px]">
            <div className="p-1.5 rounded-lg bg-white border border-slate-200">
              <span className="font-black text-slate-900 block text-[7.5px]">Day 1 - 2</span>
              <span className="text-slate-700 block font-semibold mt-0.5">3D CAD Survey</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white border border-slate-200">
              <span className="font-black text-blue-700 block text-[7.5px]">Day 3 - 5</span>
              <span className="text-slate-700 block font-semibold mt-0.5">DISCOM Filing</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white border border-slate-200">
              <span className="font-black text-amber-600 block text-[7.5px]">Day 6 - 9</span>
              <span className="text-slate-700 block font-semibold mt-0.5">Material Rigging</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white border border-slate-200">
              <span className="font-black text-emerald-600 block text-[7.5px]">Day 10 - 12</span>
              <span className="text-slate-700 block font-semibold mt-0.5">Wiring &amp; Earthing</span>
            </div>
            <div className="p-1.5 rounded-lg bg-[#0b132b] text-white">
              <span className="font-black text-amber-300 block text-[7.5px]">Day 13 - 15</span>
              <span className="text-white block font-semibold mt-0.5">Grid Sync Live</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. PAGE 1 FOOTER                                               */}
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
