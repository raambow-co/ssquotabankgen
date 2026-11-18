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
  Building,
  QrCode,
  Flame,
  Radio,
  FileCheck2,
  Headphones
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

  const co2Factor = settings?.pricing?.co2FactorPerKwh || 0.82;
  const treeFactor = settings?.pricing?.treeFactorPerTonne || 16.5;

  // Lifetime environmental metrics
  const lifetimeKwh = Math.round(annualKwh * 25);
  const co2OffsetTonnes = Math.round((lifetimeKwh * co2Factor) / 1000);
  const treesEquivalent = Math.round(co2OffsetTonnes * treeFactor);
  const coalSavedTonnes = Math.round(lifetimeKwh * 0.44 / 1000);

  return (
    <div className="a4-preview-sheet p-0 flex flex-row text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* 4-Color Ultra-Thin Accent Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-sky-500 via-eco-500 to-solar-orange z-30" />

      {/* ============================================================== */}
      {/* LEFT COLUMN: THE SRIMAAN SOLAR BRAND SPINE (30% Width)        */}
      {/* ============================================================== */}
      <div className="w-[30%] bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white p-5 flex flex-col justify-between relative z-10 border-r border-brand-800/80">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Top: Brand Monogram & Mission */}
          <div>
            <div className="w-28 h-28 max-w-[112px] max-h-[112px] rounded-3xl bg-white p-2.5 shadow-xl flex items-center justify-center border-2 border-white/30 mx-auto overflow-hidden">
              <img 
                src="/assets/srimaan_logo.jpeg" 
                alt="SRIMAAN SOLAR" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center mt-3">
              <h1 className="text-lg font-black tracking-wider text-white uppercase font-display leading-tight">
                SRIMAAN
              </h1>
              <p className="text-[9px] font-extrabold uppercase tracking-widest text-sky-300 mt-0.5">
                Solar Solutions &amp; EPC
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[7.5px] text-eco-300 font-bold uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-eco-400 animate-pulse" />
                <span>Empanelled Solar EPC Vendor</span>
              </div>
            </div>
          </div>

          {/* Vertical Technical Capacity Capsule */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
            <span className="text-[7.5px] uppercase font-bold tracking-widest text-slate-300 block">
              System DC Sizing
            </span>
            <p className="text-2xl font-black text-white tracking-tight mt-0.5 font-display">
              {dcKw} <span className="text-xs font-semibold text-sky-300">kWp</span>
            </p>
            <p className="text-[8px] text-slate-300 mt-0.5 font-medium">
              {panelCount} &times; {panelWattage}Wp TOPCon Modules
            </p>
            
            <div className="mt-2.5 pt-2 border-t border-white/10 grid grid-cols-2 gap-1 text-[7.5px]">
              <div className="bg-white/5 p-1 rounded-lg">
                <span className="text-slate-400 block text-[6.5px] uppercase">Daily Yield</span>
                <span className="font-bold text-solar-warm">~{dailyKwh} kWh</span>
              </div>
              <div className="bg-white/5 p-1 rounded-lg">
                <span className="text-slate-400 block text-[6.5px] uppercase">Annual Yield</span>
                <span className="font-bold text-eco-400">{formatNumber(annualKwh)} kWh</span>
              </div>
            </div>
          </div>

          {/* 25-Yr Ecological Offsets */}
          <div className="space-y-1.5">
            <span className="text-[7.5px] uppercase font-black tracking-widest text-sky-300 block px-0.5">
              25-Yr Ecological Offsets
            </span>

            {/* CO2 Offset */}
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-eco-500/20 text-eco-400 flex items-center justify-center shrink-0 border border-eco-500/30">
                <Leaf className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-black text-white block leading-tight">
                  {formatNumber(co2OffsetTonnes)} Tonnes
                </span>
                <span className="text-[6.5px] text-slate-300 block truncate">CO₂ Emissions Abated</span>
              </div>
            </div>

            {/* Trees Equiv */}
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                <Trees className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-black text-white block leading-tight">
                  {formatNumber(treesEquivalent)} Trees
                </span>
                <span className="text-[6.5px] text-slate-300 block truncate">Forest Equiv. Planted</span>
              </div>
            </div>

            {/* Solar Insolation */}
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-solar-orange/20 text-solar-warm flex items-center justify-center shrink-0 border border-solar-orange/30">
                <SunMedium className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-black text-white block leading-tight">
                  4.85 Peak Hrs
                </span>
                <span className="text-[6.5px] text-slate-300 block truncate">Daily Solar Insolation</span>
              </div>
            </div>

            {/* Coal Displaced */}
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-brand-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-brand-500/30">
                <Flame className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-black text-white block leading-tight">
                  {formatNumber(coalSavedTonnes)} Tonnes
                </span>
                <span className="text-[6.5px] text-slate-300 block truncate">Coal Burning Displaced</span>
              </div>
            </div>
          </div>

          {/* Standards & Engineering Compliance Capsule */}
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[7.5px] uppercase font-black tracking-widest text-slate-300 block mb-1.5">
              Engineering Accreditations
            </span>
            <div className="grid grid-cols-2 gap-1 text-[7px]">
              <span className="p-1 rounded bg-white/5 text-slate-200 border border-white/10 text-center font-mono font-semibold">
                IEC 61215/61730
              </span>
              <span className="p-1 rounded bg-white/5 text-slate-200 border border-white/10 text-center font-mono font-semibold">
                MNRE ALMM Tier-1
              </span>
              <span className="p-1 rounded bg-white/5 text-slate-200 border border-white/10 text-center font-mono font-semibold">
                ISO 9001:2015 EPC
              </span>
              <span className="p-1 rounded bg-white/5 text-slate-200 border border-white/10 text-center font-mono font-semibold">
                IS 3043 Grounding
              </span>
            </div>
          </div>

          {/* Srimaan SLA & Support Telemetry */}
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-solar-warm mb-1">
              <Radio className="w-3 h-3 text-solar-orange animate-pulse" />
              <span className="text-[7.5px] font-black uppercase tracking-wider text-slate-200">
                24/7 Cloud IoT Telemetry
              </span>
            </div>
            <p className="text-[7px] text-slate-300 leading-tight">
              Real-time daily yield tracking, automated string inverter fault alerts, and rapid on-site service resolution.
            </p>
          </div>
        </div>

        {/* Bottom Left: Statutory & Verification Badge */}
        <div className="relative z-10 pt-3 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="h-6 object-contain brightness-125" />
            <img src={EMBLEMS.mnre} alt="MNRE" className="h-5 object-contain brightness-125" />
          </div>
          <p className="text-[7px] text-slate-400 font-mono">
            GSTIN: {company?.gstin || '36AAKFS7291F1Z2'}
          </p>
          <span className="inline-block mt-1 text-[7px] text-eco-300 font-bold bg-eco-950/60 border border-eco-500/30 px-2 py-0.5 rounded-full">
            &#10003; DISCOM Verified EPC Partner
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT COLUMN: MAIN ENGINEERING PROPOSAL DOSSIER (70% Width)    */}
      {/* ============================================================== */}
      <div className="w-[70%] p-6 sm:p-7 flex flex-col justify-between relative z-10 overflow-hidden">
        <Watermark />
        <div className="space-y-3.5 relative z-10">
          {/* Top Metadata Strip */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div>
              <span className="text-[8px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                DOCUMENT IDENTIFIER
              </span>
              <p className="text-xs font-black text-brand-900 font-mono mt-0.5">
                {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[8.5px] font-semibold text-slate-500">
                Date: <strong>{formatDate(quotation?.date || new Date())}</strong>
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-[8.5px] font-bold text-eco-700 bg-eco-50 border border-eco-200 px-2 py-0.5 rounded-full">
                Validity: 30 Days
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-[8.5px] font-bold text-brand-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                DISCOM Empanelled
              </span>
            </div>
          </div>

          {/* Proposal Headline Hero Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-sky-50/40 to-slate-50 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-sky-700 text-[8.5px] font-black uppercase tracking-wider mb-1">
              <Atom className="w-3.5 h-3.5 text-solar-orange animate-spin-slow" />
              <span>Clean-Tech Turnkey Solar EPC Proposal</span>
            </div>
            
            <h2 className="text-xl font-black text-brand-900 tracking-tight leading-snug font-display">
              HIGH-YIELD ON-GRID ROOFTOP SOLAR PV SYSTEM
            </h2>
            <p className="text-[9.5px] text-slate-600 mt-1 leading-relaxed">
              Engineered for maximum kilowatt-hour generation, zero statutory friction, and optimal capital payback under State DISCOM Net-Metering &amp; PM Surya Ghar Muft Bijli Yojana.
            </p>

            {/* 4 Key Badges */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[8px]">
              <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-bold text-brand-900 shadow-2xs flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5 text-sky-600" />
                <span>Tier-1 Bi-facial TOPCon Modules</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-bold text-brand-900 shadow-2xs flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-solar-orange" />
                <span>Smart Dual-MPPT IoT Inverter</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-bold text-brand-900 shadow-2xs flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-eco-600" />
                <span>25-Yr Performance Guarantee</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-bold text-brand-900 shadow-2xs flex items-center gap-1">
                <CheckCheck className="w-2.5 h-2.5 text-sky-700" />
                <span>Turnkey DISCOM Metering</span>
              </span>
            </div>
          </div>

          {/* Client Engineering Dossier Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
              <span className="text-[9px] font-black text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-600" />
                Client &amp; Installation Site Dossier
              </span>
              <span className="text-[8px] font-bold text-brand-900 bg-brand-50 px-2 py-0.5 rounded-full border border-sky-200">
                Site Survey Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[7.5px] uppercase font-bold text-slate-400 block">Customer Name</span>
                <p className="font-extrabold text-brand-900 text-[11px] truncate mt-0.5">
                  {customer.name || 'Valued Solar Customer'}
                </p>
                {customer.companyName && (
                  <p className="text-[8.5px] text-slate-600 truncate mt-0.5">{customer.companyName}</p>
                )}
                <div className="mt-1.5 flex items-center gap-3 text-[8px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Phone className="w-2.5 h-2.5 text-sky-600" /> {customer.phone || '+91 94948 22356'}
                  </span>
                  {customer.email && (
                    <span className="flex items-center gap-1 truncate">
                      <Mail className="w-2.5 h-2.5 text-solar-orange" /> {customer.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[7.5px] uppercase font-bold text-slate-400 block">Site Location</span>
                <p className="font-semibold text-slate-800 text-[9.5px] leading-snug line-clamp-2 mt-0.5">
                  {customer.location || 'Site Location Address, Telangana / Andhra Pradesh'}
                </p>
                <div className="mt-1.5 flex items-center gap-1 text-[7.5px] text-eco-700 font-bold">
                  <MapPin className="w-2.5 h-2.5" /> <span>Rooftop Clear Space Verified &bull; Shadow-Free</span>
                </div>
              </div>
            </div>

            {/* 6 Technical Parameters Chips */}
            <div className="mt-2.5 grid grid-cols-6 gap-1.5 text-center text-[8px]">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Consumer No.</span>
                <span className="font-mono font-bold text-slate-800 truncate block text-[7.5px]">
                  {customer.consumerNumber || 'TSSPDCL-PENDING'}
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Sanctioned Load</span>
                <span className="font-bold text-slate-800 truncate block text-[7.5px]">
                  {customer.sanctionedLoad || `${dcKw} kW`}
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Grid Phase</span>
                <span className="font-bold text-slate-800 truncate block text-[7.5px]">
                  {customer.gridPhase || (dcKw > 5 ? '3-Phase (415V)' : '1-Phase (230V)')}
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Rooftop Type</span>
                <span className="font-bold text-slate-800 truncate block text-[7.5px]">
                  {customer.roofType || 'RCC Concrete'}
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Tilt Angle</span>
                <span className="font-bold text-slate-800 truncate block text-[7.5px]">
                  12° South
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-slate-400 block text-[6.5px] uppercase font-bold">DISCOM Feed</span>
                <span className="font-bold text-eco-700 truncate block text-[7.5px]">
                  11kV Feeder
                </span>
              </div>
            </div>
          </div>

          {/* Turnkey Scope Highlights: 3 Distinct Interactive Blocks */}
          <div>
            <span className="text-[8.5px] font-black text-brand-900 uppercase tracking-wide block mb-1.5">
              Turnkey Clean-Tech Engineering Scope
            </span>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-900 flex items-center justify-center mb-1.5 border border-sky-200">
                  <Layers3 className="w-3 h-3 text-sky-600" />
                </div>
                <h4 className="text-[9.5px] font-black text-brand-900">Custom Engineering</h4>
                <p className="text-[7.5px] text-slate-500 mt-0.5 leading-tight">
                  3D CAD shadow trajectory modeling, structural wind load analysis, and SLD blueprint.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-eco-50 text-eco-700 flex items-center justify-center mb-1.5 border border-eco-200">
                  <Activity className="w-3 h-3 text-eco-600" />
                </div>
                <h4 className="text-[9.5px] font-black text-brand-900">DISCOM Net-Metering</h4>
                <p className="text-[7.5px] text-slate-500 mt-0.5 leading-tight">
                  End-to-end liaison with TSSPDCL / TSNPDCL / APEPDCL, bi-directional meter sanction, and CEIG approvals.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-1.5 border border-amber-200">
                  <Sparkles className="w-3 h-3 text-solar-orange" />
                </div>
                <h4 className="text-[9.5px] font-black text-brand-900">PM Surya Ghar Subsidy</h4>
                <p className="text-[7.5px] text-slate-500 mt-0.5 leading-tight">
                  Full National Portal facilitation ensuring direct bank credit (DBT) of ₹78,000 CFA.
                </p>
              </div>
            </div>
          </div>

          {/* Rapid 15-Day Commissioning SLA Stepper */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8.5px] font-black text-brand-900 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-solar-orange" />
                Guaranteed 15-Day Turnkey Commissioning Roadmap
              </span>
              <span className="text-[7.5px] font-extrabold text-eco-700 bg-eco-50 px-2 py-0.5 rounded-full border border-eco-200">
                On-Time Delivery SLA
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 text-center text-[7.5px]">
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="font-black text-brand-900 block text-[8.5px]">Day 1 - 2</span>
                <span className="text-slate-700 block font-bold mt-0.5">3D CAD Survey</span>
                <span className="text-[6.5px] text-slate-400 block">Structure Sizing</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="font-black text-sky-700 block text-[8.5px]">Day 3 - 5</span>
                <span className="text-slate-700 block font-bold mt-0.5">DISCOM Filing</span>
                <span className="text-[6.5px] text-slate-400 block">Portal Registration</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="font-black text-solar-orange block text-[8.5px]">Day 6 - 9</span>
                <span className="text-slate-700 block font-bold mt-0.5">Material Rigging</span>
                <span className="text-[6.5px] text-slate-400 block">MMS &amp; Modules</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="font-black text-eco-600 block text-[8.5px]">Day 10 - 12</span>
                <span className="text-slate-700 block font-bold mt-0.5">Electrical Wiring</span>
                <span className="text-[6.5px] text-slate-400 block">Inverter &amp; 3 Earthing</span>
              </div>
              <div className="p-2 rounded-xl bg-gradient-to-r from-brand-900 to-sky-900 text-white shadow-2xs">
                <span className="font-black text-solar-warm block text-[8.5px]">Day 13 - 15</span>
                <span className="text-white block font-bold mt-0.5">Grid Sync</span>
                <span className="text-[6.5px] text-sky-200 block">Net-Meter Live</span>
              </div>
            </div>
          </div>

          {/* Included Engineering Deliverables Package Index */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between text-[7.5px]">
            <div className="flex items-center gap-1.5 text-brand-900 font-extrabold uppercase">
              <FileCheck2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Project Deliverables Package:</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">&#10003; 3D Shadow Analysis</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">&#10003; Electrical SLD Drawing</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">&#10003; DISCOM Sanction Letter</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">&#10003; 5-Yr AMC Warranty Card</span>
            </div>
          </div>
        </div>

        {/* Page 1 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <div>
            <span className="font-bold text-brand-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-eco-600 font-semibold">{company?.tagline || 'Clean Green Renewable Energy EPC Partner'}</span>
            <span className="font-bold text-brand-900 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Page 1 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
