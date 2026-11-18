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
  Headphones
} from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage4Portfolio({ quotation, settings }) {
  const company = settings?.company || {};
  const portfolio = settings?.portfolioWorks || {};
  const metrics = portfolio?.metrics || {};
  
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
      {/* Top Brand Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0b132b] via-amber-500 to-emerald-600 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
        {/* ============================================================== */}
        {/* 1. TOP HEADER                                                  */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-10 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
              <img src="/assets/srimaan_logo.jpeg" alt="Srimaan Solar Solutions" className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight font-sans">
                  PROVEN FIELD TRACK RECORD &amp; COMPLETED WORKS
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                  Live Telemetry
                </span>
              </div>
              <p className="text-[8.5px] text-slate-500">
                Showcase of High-Yield Residential, Commercial &amp; Industrial Clean-Tech EPC Installations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="h-6 object-contain" />
            <img src={EMBLEMS.mnre} alt="MNRE" className="h-6 object-contain" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. 4 HORIZONTAL STAT CAPSULES                                  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2.5">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <span className="text-base font-black text-slate-900 block leading-tight">{metrics.plantsCount || '920+'}</span>
              <span className="text-[7.5px] font-bold text-slate-600 block uppercase">Rooftop Plants</span>
              <span className="text-[6.5px] text-slate-400 block">Across Telangana &amp; AP</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <span className="text-base font-black text-slate-900 block leading-tight">{metrics.capacity || '14.5+ MW'}</span>
              <span className="text-[7.5px] font-bold text-slate-600 block uppercase">Installed Capacity</span>
              <span className="text-[6.5px] text-slate-400 block">Grid Synchronized</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <span className="text-base font-black text-slate-900 block leading-tight">{metrics.savings || '₹5.4+ Cr'}</span>
              <span className="text-[7.5px] font-bold text-slate-600 block uppercase">Annual Client Savings</span>
              <span className="text-[6.5px] text-slate-400 block">Utility Bill Reduction</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-4 h-4 text-slate-800" />
            </div>
            <div>
              <span className="text-base font-black text-slate-900 block leading-tight">{metrics.netMetering || '100%'}</span>
              <span className="text-[7.5px] font-bold text-slate-600 block uppercase">Net-Metering Sync</span>
              <span className="text-[6.5px] text-slate-400 block">Zero Regulatory Delays</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. 2x2 LUXURY BALANCED PROJECT SHOWCASE GALLERY                 */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              Multi-Sector Project Gallery &bull; Live Telemetry Monitored Installations
            </span>
            <span className="text-[7.5px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              &#10003; 100% Commissioned Works
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {showcaseProjects.map((proj) => (
              <div key={proj.id} className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  {/* Photo with Overlay Badges */}
                  <div className="h-32 rounded-xl relative overflow-hidden bg-slate-100 border border-slate-200 mb-2">
                    <img 
                      src={proj.imageUrl} 
                      alt={proj.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 left-2 bg-[#0b132b]/90 text-white text-[7.5px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <span>{proj.category}</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 font-mono font-black text-[8px] px-2 py-0.5 rounded">
                      {proj.capacity}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/95 text-slate-900 text-[7px] font-bold px-1.5 py-0.2 rounded border border-slate-200 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-blue-600" />
                      <span>{proj.location}</span>
                    </div>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-[10.5px] leading-tight">{proj.title}</h4>
                  <p className="text-[7.5px] text-slate-500 mt-1 line-clamp-1 leading-snug">
                    {proj.hardware}
                  </p>
                </div>

                {/* Generation & Savings Highlight */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[8px]">
                  <div className="p-1 rounded bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Annual Energy</span>
                    <span className="font-bold text-slate-900 block mt-0.2">{proj.annualGeneration}</span>
                  </div>
                  <div className="p-1 rounded bg-emerald-50/60 border border-emerald-200/80 text-right">
                    <span className="text-emerald-700 block text-[6.5px] uppercase font-bold">Annual Savings</span>
                    <span className="font-black text-emerald-800 block mt-0.2">{proj.annualSavings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. REGIONAL SERVICE HUBS & ON-SITE SLA NETWORK                 */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-blue-50/30 border border-slate-200 flex items-center justify-between text-[8px]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
              <Headphones className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block leading-tight text-[8.5px]">
                Dedicated Regional Technical &amp; Maintenance Response Centers
              </span>
              <span className="text-[7px] text-slate-500 block">
                Khammam HQ &bull; Hyderabad &bull; Vijayawada &bull; Visakhapatnam &bull; Warangal &bull; 48-Hour SLA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-900 font-extrabold bg-white px-2 py-1 rounded-lg border border-slate-200 text-[7.5px]">
              TSSPDCL &bull; TSNPDCL &bull; APEPDCL Empanelled
            </span>
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
