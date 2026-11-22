import React from 'react';
import { 
  SunMedium, 
  MapPin, 
  Building2,
  FileText,
  Shield, 
  Award, 
  Zap, 
  CheckCircle2,
  Clock,
  Leaf,
  Trees,
  Home
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageFooter from './CustomerPageFooter';
import { formatDate, formatNumber } from '../../utils/formatters';
import { EMBLEMS } from '../../utils/brandLogos';
import { ASSETS } from '../../assets/assetsData';

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
  const minArea = Math.round(dcKw * 70);
  const maxArea = Math.round(dcKw * 100);

  // Format clean reference number
  const rawRef = quotation?.quotationNumber || customer?.consumerServiceNumber || 'SSS-SOL-2026-1048';
  const cleanRef = rawRef.replace(/^SRIMAAN\s+SOLAR\s+SOLUTIONS-?/i, 'SSS-');

  return (
    <div className="a4-preview-sheet p-6 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Gold & Navy Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
        {/* ============================================================== */}
        {/* 1. MASTER HEADER WITH LOGO, GOVT EMBLEMS & PROPOSAL BADGE     */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between pb-1 pt-0.5 border-b border-slate-100 shrink-0">
          {/* Left: Company Logo */}
          <div className="h-11 sm:h-12 w-44 sm:w-48 flex items-center shrink-0">
            <img 
              src="/assets/srimaan_logo.jpeg" 
              alt="Srimaan Solar Solutions" 
              className="h-full w-auto max-w-full object-contain"
            />
          </div>

          {/* Center: PM Surya Ghar & MNRE Emblems */}
          <div className="flex items-center justify-center gap-3 shrink-0">
            {EMBLEMS.pmSuryaGhar && (
              <img 
                src={EMBLEMS.pmSuryaGhar} 
                alt="PM Surya Ghar Muft Bijli Yojana" 
                className="h-7 sm:h-8 object-contain"
              />
            )}
            {EMBLEMS.mnre && (
              <img 
                src={EMBLEMS.mnre} 
                alt="MNRE - Ministry of New and Renewable Energy" 
                className="h-7 sm:h-8 object-contain"
              />
            )}
          </div>

          {/* Right: Proposal Document Badge, Ref & Date */}
          <div className="text-right shrink-0">
            <div className="inline-flex items-center gap-1 text-[7.5px] font-bold text-amber-800 bg-amber-50/90 px-2 py-0.5 rounded border border-amber-200 shadow-2xs">
              <FileText className="w-2.5 h-2.5 text-amber-600" />
              <span className="uppercase tracking-wider">Techno-Commercial Proposal</span>
            </div>
            <div className="mt-1 text-[7px] text-slate-600 font-mono">
              Ref: <strong className="text-slate-900">{cleanRef}</strong>
            </div>
            <div className="text-[7px] text-slate-500">
              Date: <strong className="text-slate-800">{formatDate(quotation?.date || new Date())}</strong>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. EXECUTIVE HERO SHOWCASE BANNER                              */}
        {/* ============================================================== */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-800 bg-gradient-to-r from-[#060e24] via-[#0c1c3f] to-[#08152e] text-white p-3.5 sm:p-4 shrink-0">
          {/* Subtle Solar Panels Background Texture */}
          {ASSETS.solar_hero_banner && (
            <div 
              className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${ASSETS.solar_hero_banner})` }}
            />
          )}

          <div className="relative z-10 space-y-2">
            {/* Top Badges */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[7px] font-black bg-white/10 text-slate-200 border border-white/20 uppercase tracking-wide flex items-center gap-1">
                <SunMedium className="w-2.5 h-2.5 text-amber-400" />
                Grid-Interactive Solar PV System
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[7px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                DISCOM Empanelled EPC
              </span>
            </div>

            {/* Title & Engineering Scope */}
            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white font-sans drop-shadow-xs">
                Techno-Commercial Solar Proposal
              </h1>
              <p className="text-[7.5px] sm:text-[8px] text-slate-200 font-medium mt-0.5 max-w-2xl leading-snug">
                Tailored high-efficiency solar photovoltaic power generation system engineered for maximum energy yield, structural durability, and substantial utility bill savings.
              </p>
            </div>

            {/* 3 Metric Columns Row */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/15">
              <div>
                <span className="text-[6.5px] uppercase font-bold text-slate-400 tracking-wider block">
                  Proposed DC Capacity
                </span>
                <span className="text-lg font-black text-amber-400 font-mono block mt-0.2">
                  {dcKw} kWp DC
                </span>
                <span className="text-[7px] text-slate-300 font-medium block mt-0.2">
                  {panelCount} &times; {panelWattage}Wp Modules
                </span>
              </div>

              <div>
                <span className="text-[6.5px] uppercase font-bold text-slate-400 tracking-wider block">
                  Inverter AC Rating
                </span>
                <span className="text-lg font-black text-white font-mono block mt-0.2">
                  {acKw} kW AC Grid-Tied
                </span>
                <span className="text-[7px] text-slate-300 font-medium block mt-0.2">
                  Dual MPPT &bull; 1.1&times; DC:AC
                </span>
              </div>

              <div>
                <span className="text-[6.5px] uppercase font-bold text-slate-400 tracking-wider block">
                  Est. Annual Generation
                </span>
                <span className="text-lg font-black text-white font-mono block mt-0.2">
                  ~{formatNumber(annualKwh)} kWh/yr
                </span>
                <span className="text-[7px] text-slate-300 font-medium block mt-0.2">
                  ~{dailyKwh} kWh/day avg.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. CLIENT & SITE SPECIFICATIONS                                */}
        {/* ============================================================== */}
        <div className="shrink-0">
          <div className="text-[7.5px] font-black uppercase tracking-wider text-slate-500 mb-1">
            Client &amp; Site Specifications
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="grid grid-cols-12 gap-3 items-start text-[7.5px]">
              {/* Client Name & Address (5 cols) */}
              <div className="col-span-5 space-y-1.5">
                <div>
                  <span className="text-[6.5px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Building2 className="w-2.5 h-2.5 text-blue-600" />
                    Client Name
                  </span>
                  <strong className="text-[9.5px] font-black text-slate-900 block mt-0.2">
                    {customer?.name || 'Valued Customer'}
                  </strong>
                  <span className="text-[7px] text-slate-500 block truncate">
                    {customer?.facilityName || customer?.district || 'Telangana'}
                  </span>
                </div>
                <div>
                  <span className="text-[6.5px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                    Installation Site Address
                  </span>
                  <p className="text-[7.5px] font-medium text-slate-700 leading-snug mt-0.2">
                    {customer?.address || 'Khammam, Telangana - 507003'}
                  </p>
                </div>
              </div>

              {/* Contact & Sanctioned Load (4 cols) */}
              <div className="col-span-4 space-y-2">
                <div>
                  <span className="text-[6.5px] uppercase font-bold text-slate-400 block">
                    Contact Mobile
                  </span>
                  <strong className="text-[8px] font-black text-slate-900 font-mono block mt-0.2">
                    +91 {customer?.phone || '9347416140'}
                  </strong>
                </div>
                <div>
                  <span className="text-[6.5px] uppercase font-bold text-slate-400 block">
                    Sanctioned Load
                  </span>
                  <strong className="text-[8px] font-black text-slate-900 font-mono block mt-0.2">
                    {customer?.sanctionedLoadKw || `${dcKw} kW`}
                  </strong>
                </div>
              </div>

              {/* Phase & Roof Type (3 cols) */}
              <div className="col-span-3 space-y-2">
                <div>
                  <span className="text-[6.5px] uppercase font-bold text-slate-400 block">
                    Grid Phase
                  </span>
                  <strong className="text-[8px] font-bold text-slate-900 block mt-0.2">
                    {customer?.phase || '3-Phase'}
                  </strong>
                </div>
                <div>
                  <span className="text-[6.5px] uppercase font-bold text-slate-400 block">
                    Roof Type &amp; Area
                  </span>
                  <strong className="text-[7.5px] font-bold text-slate-900 block mt-0.2 leading-snug">
                    {customer?.roofType || 'RCC Flat Concrete Terrace'} (~{minArea}&ndash;{maxArea} Sq.Ft)
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. COVER LETTER & ENGINEERING PHOTO                           */}
        {/* ============================================================== */}
        <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs shrink-0">
          <div className="grid grid-cols-12 gap-3 items-center">
            {/* Left side: Letter (8 cols) */}
            <div className="col-span-8 space-y-1">
              <h4 className="text-[8.5px] font-black text-slate-900">
                Dear {customer?.name || 'Customer'},
              </h4>
              <p className="text-[7.5px] text-slate-600 leading-relaxed">
                Thank you for considering <strong>SRIMAAN SOLAR SOLUTIONS</strong> for your rooftop solar installation. We are dedicated to delivering top-tier engineering standards, uncompromising quality, and long-term performance assurance.
              </p>
              <p className="text-[7.5px] text-slate-600 leading-relaxed">
                This proposal details the technical engineering design, Tier-1 equipment specifications, transparent investment economics, and our turnkey roadmap from statutory DISCOM net-metering facilitation to lifetime remote monitoring.
              </p>
              <p className="text-[7px] italic text-slate-500 font-medium pt-0.5">
                For SRIMAAN SOLAR SOLUTIONS &mdash; Technical EPC Projects Division
              </p>
            </div>

            {/* Right side: Installation Image with Caption (4 cols) */}
            <div className="col-span-4">
              <div className="rounded-lg overflow-hidden border border-slate-200 shadow-xs relative">
                <img 
                  src={ASSETS.basic_structure || ASSETS.solar_hero_banner} 
                  alt="Srimaan Engineering Rooftop Solar" 
                  className="w-full h-18 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 text-white text-[6.5px] font-bold text-center py-0.5">
                  Srimaan Solar Engineering
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. 4 VALUE PROPOSITION / GUARANTEE BADGES                      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2.5 shrink-0 text-center">
          {/* Badge 1: 25-Yr Performance */}
          <div className="p-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-blue-600 mx-auto mb-0.5" />
            <strong className="text-[8px] font-black text-slate-900 block">
              25-Yr Performance
            </strong>
            <span className="text-[6.5px] text-slate-500 block mt-0.2">
              &ge;84.8% output; 12-yr product
            </span>
          </div>

          {/* Badge 2: DISCOM Empanelled */}
          <div className="p-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-amber-500 mx-auto mb-0.5" />
            <strong className="text-[8px] font-black text-slate-900 block">
              DISCOM Empanelled
            </strong>
            <span className="text-[6.5px] text-slate-500 block mt-0.2">
              Eligible for PM Surya Ghar CFA
            </span>
          </div>

          {/* Badge 3: Up to 80-90% Offset */}
          <div className="p-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-purple-600 mx-auto mb-0.5" />
            <strong className="text-[8px] font-black text-slate-900 block">
              Up to 80&ndash;90% Offset*
            </strong>
            <span className="text-[6.5px] text-slate-500 block mt-0.2">
              *Subject to load &amp; banking
            </span>
          </div>

          {/* Badge 4: Turnkey EPC & Liaison */}
          <div className="p-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-0.5" />
            <strong className="text-[8px] font-black text-slate-900 block">
              Turnkey EPC &amp; Liaison
            </strong>
            <span className="text-[6.5px] text-slate-500 block mt-0.2">
              Full DISCOM facilitation
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. FAST-TRACK PROJECT DELIVERY SCHEDULE (15-DAY TURNKEY SLA)   */}
        {/* ============================================================== */}
        <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs shrink-0">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-[7.5px] font-black text-slate-900 uppercase tracking-wide">
              <Clock className="w-3 h-3 text-blue-600" />
              Fast-Track Project Delivery Schedule (15-Day Turnkey SLA)
            </div>
            <span className="text-[6.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Guaranteed On-Time Commissioning
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-1.5">
            {/* Step 1 */}
            <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="px-2 py-0.2 rounded-full text-[6px] font-black bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wider inline-block">
                Days 1&ndash;3
              </span>
              <strong className="text-[7.5px] font-black text-slate-900 block mt-0.5">
                3D Site Survey &amp; CAD
              </strong>
              <span className="text-[6.5px] text-slate-500 block mt-0.2 leading-tight">
                LiDAR shading &amp; DISCOM portal filing
              </span>
            </div>

            {/* Step 2 */}
            <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="px-2 py-0.2 rounded-full text-[6px] font-black bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wider inline-block">
                Days 4&ndash;7
              </span>
              <strong className="text-[7.5px] font-black text-slate-900 block mt-0.5">
                Statutory Feasibility
              </strong>
              <span className="text-[6.5px] text-slate-500 block mt-0.2 leading-tight">
                DISCOM DTR load sanction &amp; clearance
              </span>
            </div>

            {/* Step 3 */}
            <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="px-2 py-0.2 rounded-full text-[6px] font-black bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wider inline-block">
                Days 8&ndash;12
              </span>
              <strong className="text-[7.5px] font-black text-slate-900 block mt-0.5">
                Hardware &amp; Rigging
              </strong>
              <span className="text-[6.5px] text-slate-500 block mt-0.2 leading-tight">
                Elevated GI structure, TOPCon &amp; 3 pits
              </span>
            </div>

            {/* Step 4 */}
            <div className="p-1.5 bg-emerald-50/60 rounded-lg border border-emerald-300 text-center">
              <span className="px-2 py-0.2 rounded-full text-[6px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider inline-block">
                Days 13&ndash;15
              </span>
              <strong className="text-[7.5px] font-black text-emerald-950 block mt-0.5">
                Net-Meter &amp; Sync
              </strong>
              <span className="text-[6.5px] text-emerald-700 block mt-0.2 leading-tight">
                Bi-directional sync &amp; IoT app live
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 7. ENVIRONMENTAL & ROOF INTEGRITY METRICS STRIP               */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2 shrink-0">
          {/* Stat 1: CO2 */}
          <div className="p-1.5 bg-white rounded-lg border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[6px] uppercase font-bold text-slate-400 block truncate">
                CO&sub2; Eliminated
              </span>
              <strong className="text-[8px] font-black text-slate-900 font-mono block truncate">
                ~{Math.round(annualKwh * 25 * 0.82 / 1000)} Tonnes
              </strong>
            </div>
          </div>

          {/* Stat 2: Trees */}
          <div className="p-1.5 bg-white rounded-lg border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
            <Trees className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[6px] uppercase font-bold text-slate-400 block truncate">
                Trees Planted Eqv.
              </span>
              <strong className="text-[8px] font-black text-slate-900 font-mono block truncate">
                ~{formatNumber(Math.round(annualKwh * 25 * 0.82 / 1000 * 16.5))} Trees
              </strong>
            </div>
          </div>

          {/* Stat 3: 25-Yr Green Yield */}
          <div className="p-1.5 bg-white rounded-lg border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
            <SunMedium className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[6px] uppercase font-bold text-slate-400 block truncate">
                25-Yr Green Yield
              </span>
              <strong className="text-[8px] font-black text-slate-900 font-mono block truncate">
                ~{formatNumber(annualKwh * 25)} kWh
              </strong>
            </div>
          </div>

          {/* Stat 4: Roof Integrity */}
          <div className="p-1.5 bg-white rounded-lg border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[6px] uppercase font-bold text-slate-400 block truncate">
                Roof Integrity
              </span>
              <strong className="text-[8px] font-black text-slate-900 block truncate">
                Zero Puncture
              </strong>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 8. PAGE 1 FOOTER                                               */}
        {/* ============================================================== */}
        <div className="pt-1 shrink-0">
          <CustomerPageFooter pageNumber={1} totalPages={5} />
        </div>
      </div>
    </div>
  );
}
