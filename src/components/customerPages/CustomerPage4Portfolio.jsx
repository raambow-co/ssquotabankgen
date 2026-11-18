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
  SunMedium
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
      imageUrl: "/assets/portfolio/project-1.jpg",
      discom: "TSSPDCL Net-Meter",
      hardware: "Waaree 550Wp TOPCon Bifacial • Sungrow 15kW Inverter • 80µ GI Structure"
    },
    {
      id: "proj-2",
      title: "Coastal Independent Residence",
      location: "MVP Colony, Visakhapatnam",
      category: "Residential Rooftop",
      capacity: "10.0 kWp DC",
      annualGeneration: "15,800 kWh / yr",
      annualSavings: "₹ 1,34,300 / yr",
      imageUrl: "/assets/portfolio/project-2.jpg",
      discom: "APEPDCL Net-Meter",
      hardware: "Adani 550Wp TOPCon Dual-Glass • Solis 10kW Multi-MPPT Inverter"
    },
    {
      id: "proj-3",
      title: "Educational Campus Solar",
      location: "Guntur, Andhra Pradesh",
      category: "Institutional",
      capacity: "50.0 kWp DC",
      annualGeneration: "78,800 kWh / yr",
      annualSavings: "₹ 7,10,000 / yr",
      imageUrl: "/assets/portfolio/project-3.jpg",
      discom: "APCPDCL Net-Meter",
      hardware: "Tata Power Solar Modules • Sungrow 50kW Commercial Multi-MPPT"
    },
    {
      id: "proj-4",
      title: "Industrial Manufacturing Facility",
      location: "Cherlapally Industrial, Hyderabad",
      category: "Industrial Solar",
      capacity: "100.0 kWp DC",
      annualGeneration: "158,000 kWh / yr",
      annualSavings: "₹ 13,43,000 / yr",
      imageUrl: "/assets/portfolio/project-4.jpg",
      discom: "TSSPDCL HT Net-Meter",
      hardware: "Tier-1 550Wp TOPCon • Heavy-Duty HT Inverter & Transformer Sync"
    }
  ];

  return (
    <div className="a4-preview-sheet p-6 sm:p-7 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Maximalist Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2.5">
        {/* ============================================================== */}
        {/* 1. TOP HEADER                                                  */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-2.5">
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
            <p className="font-semibold text-slate-600 text-[8px] mt-0.5">Capacity: <span className="font-black text-slate-900">14.5+ MW Commissioned</span></p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. 4 EXECUTIVE STAT CAPSULES                                    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {/* Stat 1 */}
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#060e24] via-[#0b1736] to-[#040816] text-white border border-slate-800 shadow-2xs">
            <span className="text-amber-400 font-black text-base font-mono block leading-none">920+</span>
            <span className="text-[7.5px] font-bold text-slate-200 uppercase tracking-wide block mt-1">Rooftop Plants</span>
            <span className="text-[6.5px] text-slate-400 block mt-0.5">Residential &amp; Commercial</span>
          </div>

          {/* Stat 2 */}
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-amber-50/20 border border-slate-200 shadow-2xs">
            <span className="text-slate-900 font-black text-base font-mono block leading-none">14.5+ MW</span>
            <span className="text-[7.5px] font-bold text-slate-700 uppercase tracking-wide block mt-1">Installed Capacity</span>
            <span className="text-[6.5px] text-slate-400 block mt-0.5">Across Telangana &amp; AP</span>
          </div>

          {/* Stat 3 */}
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200 shadow-2xs">
            <span className="text-emerald-700 font-black text-base font-mono block leading-none">₹ 5.4+ Cr</span>
            <span className="text-[7.5px] font-bold text-slate-700 uppercase tracking-wide block mt-1">Annual Savings</span>
            <span className="text-[6.5px] text-slate-400 block mt-0.5">Direct Utility Bill Reductions</span>
          </div>

          {/* Stat 4 */}
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/20 border border-slate-200 shadow-2xs">
            <span className="text-blue-700 font-black text-base font-mono block leading-none">100%</span>
            <span className="text-[7.5px] font-bold text-slate-700 uppercase tracking-wide block mt-1">Net-Metering Sync</span>
            <span className="text-[6.5px] text-slate-400 block mt-0.5">CEIG &amp; DISCOM Approved</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. 2x2 LUXURY BALANCED PHOTO SHOWCASE GRID                     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 gap-2.5 flex-1">
          {showcaseProjects.map((proj) => (
            <div 
              key={proj.id} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              {/* Image with Dark Gradient & Badges */}
              <div className="relative h-28 w-full bg-slate-900 overflow-hidden">
                <img 
                  src={proj.imageUrl} 
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[7px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-2xs">
                    {proj.capacity}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[6.5px] font-bold bg-white/20 backdrop-blur-xs text-white border border-white/20">
                    {proj.category}
                  </span>
                </div>

                {/* Bottom Overlay Title & Location */}
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="text-[9px] font-black tracking-tight leading-snug drop-shadow-xs">
                    {proj.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[7px] text-slate-300 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                    <span>{proj.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Meta & Hardware Specs */}
              <div className="p-2 space-y-1 bg-slate-50/50">
                <div className="grid grid-cols-2 gap-1 text-[7.5px] border-b border-slate-200/80 pb-1">
                  <div>
                    <span className="text-[6.5px] text-slate-400 block font-semibold">Annual Generation:</span>
                    <strong className="text-slate-900 font-mono text-[8px]">{proj.annualGeneration}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[6.5px] text-slate-400 block font-semibold">Client Bill Savings:</span>
                    <strong className="text-emerald-700 font-mono text-[8px]">{proj.annualSavings}</strong>
                  </div>
                </div>

                <div className="text-[6.5px] text-slate-600 flex items-center justify-between pt-0.5">
                  <span className="truncate max-w-[190px]">{proj.hardware}</span>
                  <span className="text-blue-700 font-extrabold shrink-0 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
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
