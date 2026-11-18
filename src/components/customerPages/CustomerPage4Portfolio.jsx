import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Building2, 
  Home, 
  Factory, 
  GraduationCap, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Coins, 
  BadgeCheck, 
  CheckCheck, 
  Sparkles,
  Headphones,
  TrendingUp,
  SunMedium,
  Leaf,
  Layers3,
  Cpu
} from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage4Portfolio({ quotation, settings }) {
  const company = settings?.company || {};
  const portfolio = settings?.portfolioWorks || {};
  
  // 4 Balanced Showcases for a 2x2 Grid
  const showcaseProjects = [
    {
      id: "proj-1",
      title: "Luxury Residential Rooftop",
      location: "Banjara Hills, Hyderabad",
      category: "Residential Villa",
      capacity: "15.0 kWp DC",
      annualGeneration: "23,250 kWh / yr",
      annualSavings: "₹ 1,97,600 / yr",
      co2Offset: "476 Tonnes CO₂",
      imageUrl: "/assets/portfolio/project-1.jpg",
      discom: "TSSPDCL Net-Meter",
      modules: "Waaree 550Wp TOPCon Bifacial (28 Nos)",
      inverter: "Sungrow 15kW Multi-MPPT IoT Wi-Fi",
      structure: "80µ Hot-Dip GI Elevated MMS",
      timeline: "14-Day SLA Handover"
    },
    {
      id: "proj-2",
      title: "Coastal Independent Residence",
      location: "MVP Colony, Visakhapatnam",
      category: "Residential Rooftop",
      capacity: "10.0 kWp DC",
      annualGeneration: "15,800 kWh / yr",
      annualSavings: "₹ 1,34,300 / yr",
      co2Offset: "324 Tonnes CO₂",
      imageUrl: "/assets/portfolio/project-2.jpg",
      discom: "APEPDCL Net-Meter",
      modules: "Adani 550Wp TOPCon Dual-Glass (18 Nos)",
      inverter: "Solis 10kW Multi-MPPT Inverter",
      structure: "Cyclone-Rated Elevated Structure",
      timeline: "12-Day SLA Handover"
    },
    {
      id: "proj-3",
      title: "Educational Campus Solar",
      location: "Guntur, Andhra Pradesh",
      category: "Institutional",
      capacity: "50.0 kWp DC",
      annualGeneration: "78,800 kWh / yr",
      annualSavings: "₹ 7,10,000 / yr",
      co2Offset: "1,615 Tonnes CO₂",
      imageUrl: "/assets/portfolio/project-3.jpg",
      discom: "APCPDCL Net-Meter",
      modules: "Tata Power Solar Modules (90 Nos)",
      inverter: "Sungrow 50kW Commercial Multi-MPPT",
      structure: "Custom Heavy-Duty Rooftop Array",
      timeline: "21-Day SLA Handover"
    },
    {
      id: "proj-4",
      title: "Industrial Manufacturing Facility",
      location: "Cherlapally Industrial, Hyderabad",
      category: "Industrial Solar",
      capacity: "100.0 kWp DC",
      annualGeneration: "158,000 kWh / yr",
      annualSavings: "₹ 13,43,000 / yr",
      co2Offset: "3,240 Tonnes CO₂",
      imageUrl: "/assets/portfolio/project-4.jpg",
      discom: "TSSPDCL HT Net-Meter",
      modules: "Tier-1 550Wp TOPCon High-Yield (182 Nos)",
      inverter: "Heavy-Duty HT Inverter & Transformer Sync",
      structure: "Purlin-Mounted Industrial Rigging",
      timeline: "28-Day SLA Handover"
    }
  ];

  return (
    <div className="a4-preview-sheet p-6 sm:p-7 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Maximalist Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
        {/* ============================================================== */}
        {/* 1. TOP HEADER                                                  */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-14 h-10 rounded-xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center p-1 shrink-0 overflow-hidden ring-1 ring-amber-400/30">
              <img src="/assets/srimaan_logo.jpeg" alt="Srimaan Solar Solutions" className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-tight font-sans">
                  PROVEN FIELD TRACK RECORD &amp; COMPLETED WORKS
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-2xs">
                  920+ ROOFTOPS
                </span>
              </div>
              <p className="text-[8.5px] text-slate-600 font-medium">
                Benchmark Rooftop &amp; Industrial Solar PV Systems Delivered Across Telangana &amp; Andhra Pradesh
              </p>
            </div>
          </div>

          <div className="text-right text-[8.5px]">
            <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              Ref: {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}
            </span>
            <p className="font-semibold text-slate-600 text-[8px] mt-0.5">Track Record: <span className="font-black text-slate-900">14.5+ MW Commissioned</span></p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. 4 EXECUTIVE STAT CAPSULES                                    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {/* Stat 1 */}
          <div className="p-2 rounded-2xl bg-gradient-to-br from-[#060e24] via-[#0b1736] to-[#040816] text-white border border-slate-800 shadow-2xs">
            <span className="text-amber-400 font-black text-base font-mono block leading-none">920+</span>
            <span className="text-[7.5px] font-bold text-slate-200 uppercase tracking-wide block mt-1">Rooftop Plants</span>
            <span className="text-[6.5px] text-slate-400 block mt-0.5">Residential &amp; Commercial</span>
          </div>

          {/* Stat 2 */}
          <div className="p-2 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-amber-50/20 border border-slate-200 shadow-2xs">
            <span className="text-slate-900 font-black text-base font-mono block leading-none">14.5+ MW</span>
            <span className="text-[7.5px] font-bold text-slate-700 uppercase tracking-wide block mt-1">Installed Capacity</span>
            <span className="text-[6.5px] text-slate-400 block mt-0.5">Across Telangana &amp; AP</span>
          </div>

          {/* Stat 3 */}
          <div className="p-2 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200 shadow-2xs">
            <span className="text-emerald-700 font-black text-base font-mono block leading-none">₹ 5.4+ Cr</span>
            <span className="text-[7.5px] font-bold text-slate-700 uppercase tracking-wide block mt-1">Annual Savings</span>
            <span className="text-[6.5px] text-slate-400 block mt-0.5">Direct Utility Bill Reductions</span>
          </div>

          {/* Stat 4 */}
          <div className="p-2 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/20 border border-slate-200 shadow-2xs">
            <span className="text-blue-700 font-black text-base font-mono block leading-none">100%</span>
            <span className="text-[7.5px] font-bold text-slate-700 uppercase tracking-wide block mt-1">Net-Metering Sync</span>
            <span className="text-[6.5px] text-slate-400 block mt-0.5">CEIG &amp; DISCOM Approved</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. 2x2 LUXURY BALANCED PHOTO SHOWCASE GRID (NO EMPTY GAPS)     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 gap-2.5 flex-1 items-stretch">
          {showcaseProjects.map((proj) => (
            <div 
              key={proj.id} 
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              {/* Image with Dark Gradient & Badges - Expanded to h-44 (176px) */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden shrink-0">
                <img 
                  src={proj.imageUrl} 
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[7.5px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-2xs">
                    {proj.capacity}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[7px] font-bold bg-white/25 backdrop-blur-xs text-white border border-white/20">
                    {proj.category}
                  </span>
                </div>

                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 rounded-full text-[6.5px] font-black bg-emerald-600/90 text-white backdrop-blur-xs shadow-2xs">
                    &#10003; Active &amp; Generating
                  </span>
                </div>

                {/* Bottom Overlay Title & Location */}
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="text-[10px] font-black tracking-tight leading-snug drop-shadow-xs">
                    {proj.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[7.5px] text-slate-200 mt-0.5 font-medium">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{proj.location}</span>
                  </div>
                </div>
              </div>

              {/* Dense Technical Specification & Energy Metrics Area */}
              <div className="p-2 space-y-1.5 bg-slate-50/70 flex-1 flex flex-col justify-between">
                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div className="p-1 rounded-lg bg-white border border-slate-200/80">
                    <span className="text-[6px] text-slate-400 block font-semibold uppercase">Annual Harvest</span>
                    <strong className="text-slate-900 font-mono text-[7.5px] block mt-0.2">{proj.annualGeneration}</strong>
                  </div>
                  <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
                    <span className="text-[6px] text-emerald-800 block font-semibold uppercase">Client Bill Savings</span>
                    <strong className="text-emerald-700 font-mono text-[7.5px] block mt-0.2">{proj.annualSavings}</strong>
                  </div>
                  <div className="p-1 rounded-lg bg-white border border-slate-200/80">
                    <span className="text-[6px] text-slate-400 block font-semibold uppercase">CO₂ Offset</span>
                    <strong className="text-slate-800 font-mono text-[7.5px] block mt-0.2">{proj.co2Offset}</strong>
                  </div>
                </div>

                {/* Hardware Spec Badges */}
                <div className="space-y-0.5 text-[7px] text-slate-600 bg-white p-1.5 rounded-lg border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <SunMedium className="w-2.5 h-2.5 text-amber-500" />
                      Modules:
                    </span>
                    <strong className="text-slate-800 truncate max-w-[170px]">{proj.modules}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Cpu className="w-2.5 h-2.5 text-blue-600" />
                      Inverter:
                    </span>
                    <strong className="text-slate-800 truncate max-w-[170px]">{proj.inverter}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Layers3 className="w-2.5 h-2.5 text-purple-600" />
                      MMS:
                    </span>
                    <strong className="text-slate-800 truncate max-w-[170px]">{proj.structure}</strong>
                  </div>
                </div>

                {/* Bottom Timeline & DISCOM Badge */}
                <div className="text-[6.5px] text-slate-600 flex items-center justify-between pt-0.5 border-t border-slate-200/80">
                  <span className="font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-emerald-600" />
                    {proj.timeline}
                  </span>
                  <span className="text-blue-800 font-black shrink-0 bg-blue-100 px-1.5 py-0.2 rounded border border-blue-200">
                    {proj.discom}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* 4. REGIONAL SERVICE RESPONSE NETWORK BANNER                     */}
        {/* ============================================================== */}
        <div className="p-2 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200 flex items-center justify-between text-[7.5px] shadow-2xs">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <span className="font-black text-slate-900 text-[8px] block">
                Regional Technical &amp; Maintenance Response Network
              </span>
              <span className="text-[6.5px] text-slate-500 block">
                Dedicated rapid maintenance teams across Telangana &amp; Andhra Pradesh
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[7px] font-bold text-slate-700">
            <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200">Khammam HQ</span>
            <span>&bull;</span>
            <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200">Hyderabad</span>
            <span>&bull;</span>
            <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200">Vijayawada</span>
            <span>&bull;</span>
            <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200">Visakhapatnam</span>
            <span>&bull;</span>
            <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200">Warangal</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. PAGE 4 FOOTER                                               */}
        {/* ============================================================== */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
          <div>
            <span className="font-bold text-slate-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.address || 'H.No. 11-10-624/A, Burhanpuram, Khammam, Telangana - 507001'}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-semibold">{company?.tagline || 'Clean Green Renewable Energy EPC Partner'}</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Page 4 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
