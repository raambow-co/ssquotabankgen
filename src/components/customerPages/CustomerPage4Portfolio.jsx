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
  Activity, 
  Sparkles, 
  Coins, 
  BadgeCheck, 
  CheckCheck, 
  Maximize2, 
  TrendingUp, 
  Cpu, 
  Layers3, 
  HeartHandshake, 
  Star, 
  Quote 
} from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage4Portfolio({ quotation, settings }) {
  const company = settings?.company || {};
  const portfolio = settings?.portfolioWorks || {};
  const metrics = portfolio?.metrics || {};
  
  // 3 Large, Prominent Multi-Sector Showcase Projects
  const showcaseProjects = [
    {
      id: "proj-1",
      title: "Luxury Residential Villa",
      location: "Banjara Hills, Hyderabad",
      category: "Residential Rooftop",
      capacity: "15.0 kWp DC",
      annualGeneration: "23,250 kWh / yr",
      annualSavings: "₹ 1,97,600 / yr",
      imageUrl: "/assets/portfolio/project-1.jpg",
      iconType: "home",
      inverter: "Sungrow 15kW Dual-MPPT",
      discom: "TSSPDCL Empanelled",
      hardware: "Waaree 550Wp TOPCon Bifacial • 80µ GI Structure"
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
      iconType: "home",
      inverter: "Solis 10kW On-Grid",
      discom: "APEPDCL Empanelled",
      hardware: "Adani 550Wp TOPCon Dual-Glass • Elevated MMS"
    },
    {
      id: "proj-3",
      title: "Educational Campus Complex",
      location: "Guntur, Andhra Pradesh",
      category: "Institutional Solar",
      capacity: "50.0 kWp DC",
      annualGeneration: "78,800 kWh / yr",
      annualSavings: "₹ 7,10,000 / yr",
      imageUrl: "/assets/portfolio/project-3.jpg",
      iconType: "graduation",
      inverter: "Sungrow 50kW Multi-MPPT",
      discom: "APCPDCL Empanelled",
      hardware: "Tata Power Solar Modules • Cloud IoT Telemetry"
    }
  ];

  const heroProject = {
    title: "Apex Precision Engineering Works",
    location: "Cherlapally Industrial Estate, Hyderabad",
    category: "Industrial Manufacturing",
    capacity: "100.0 kWp DC",
    annualGeneration: "158,000 kWh / yr",
    annualSavings: "₹ 13,43,000 / yr",
    imageUrl: "/assets/portfolio/project-4.jpg",
    verifiedBadge: "GPS Geotagged • TSSPDCL HT Net-Meter",
    description: "Heavy-duty industrial rooftop installation delivering high-yield clean power to precision CNC machining units with 40% accelerated depreciation tax benefits."
  };

  const getCategoryIcon = (iconType) => {
    switch (iconType) {
      case 'building': return <Building2 className="w-3.5 h-3.5 text-sky-400" />;
      case 'graduation': return <GraduationCap className="w-3.5 h-3.5 text-solar-warm" />;
      case 'factory': return <Factory className="w-3.5 h-3.5 text-solar-warm" />;
      case 'home':
      default:
        return <Home className="w-3.5 h-3.5 text-eco-400" />;
    }
  };

  return (
    <div className="a4-preview-sheet p-6 sm:p-7 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* 4-Color Signature Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-sky-500 via-eco-500 to-solar-orange z-10" />

      {/* Official Subtle Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img src="/assets/srimaan_logo.jpeg" alt="SRIMAAN SOLAR" className="w-full h-full object-contain" />
              </div>
              <div className="border-l border-slate-300 pl-3">
                <p className="text-xs font-black text-brand-900 tracking-tight uppercase flex items-center gap-2">
                  <span>PREVIOUS WORKS &amp; PROVEN FIELD PORTFOLIO</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-sky-200">
                    Live Telemetry Verified
                  </span>
                </p>
                <p className="text-[9px] text-slate-500">
                  Track Record of High-Yield Residential, Commercial &amp; Industrial Clean Tech EPC Installations
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="h-7 object-contain hidden sm:block" />
              <img src={EMBLEMS.mnre} alt="MNRE" className="h-7 object-contain" />
            </div>
          </div>

          {/* ============================================================== */}
          {/* 4 MODERN STAT CAPSULES WITH FRESH ICONS                        */}
          {/* ============================================================== */}
          <div className="grid grid-cols-4 gap-2.5">
            {/* Stat 1: Plants (Dark Green) */}
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-brand-950 to-brand-900 text-white shadow-xs border border-brand-800 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10">
                <Building2 className="w-4 h-4 text-sky-300" />
              </div>
              <div className="min-w-0">
                <span className="text-base font-black text-white leading-tight block">
                  {metrics.plantsCount || '920+'}
                </span>
                <span className="text-[8px] uppercase font-bold text-sky-200 block truncate">
                  {metrics.plantsLabel || 'Rooftop Plants'}
                </span>
                <span className="text-[7px] text-slate-300 block truncate">{metrics.plantsSubtitle || 'Across South India'}</span>
              </div>
            </div>

            {/* Stat 2: MW Capacity (Light Blue) */}
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-sky-950 to-sky-900 text-white shadow-xs border border-sky-800 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10">
                <Zap className="w-4 h-4 text-sky-300" />
              </div>
              <div className="min-w-0">
                <span className="text-base font-black text-sky-200 leading-tight block">
                  {metrics.capacity || '14.5+ MW'}
                </span>
                <span className="text-[8px] uppercase font-bold text-sky-100 block truncate">
                  {metrics.capacityLabel || 'Total Installed'}
                </span>
                <span className="text-[7px] text-slate-300 block truncate">{metrics.capacitySubtitle || 'Grid Synchronized'}</span>
              </div>
            </div>

            {/* Stat 3: Savings (Green) */}
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-950 to-emerald-900 text-white shadow-xs border border-emerald-800 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10">
                <Coins className="w-4 h-4 text-eco-300" />
              </div>
              <div className="min-w-0">
                <span className="text-base font-black text-eco-300 leading-tight block">
                  {metrics.savings || '₹5.4+ Cr'}
                </span>
                <span className="text-[8px] uppercase font-bold text-emerald-200 block truncate">
                  {metrics.savingsLabel || 'Annual Savings'}
                </span>
                <span className="text-[7px] text-emerald-300/80 block truncate">{metrics.savingsSubtitle || 'For Clients'}</span>
              </div>
            </div>

            {/* Stat 4: Net-Metering (Yellowish-Orange) */}
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-950 to-amber-900 text-white shadow-xs border border-amber-800 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10">
                <BadgeCheck className="w-4 h-4 text-solar-warm" />
              </div>
              <div className="min-w-0">
                <span className="text-base font-black text-solar-warm leading-tight block">
                  {metrics.netMetering || '100%'}
                </span>
                <span className="text-[8px] uppercase font-bold text-amber-200 block truncate">
                  {metrics.netMeteringLabel || 'Net-Metering'}
                </span>
                <span className="text-[7px] text-amber-300/80 block truncate">{metrics.netMeteringSubtitle || 'Zero Delays'}</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* FEATURED FLAGSHIP INDUSTRIAL CASE STUDY (LARGE PROMINENT HERO) */}
          {/* ============================================================== */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-solar-orange" />
                Featured Flagship Industrial Installation
              </h3>
              <span className="text-[8px] text-eco-700 bg-eco-50 px-2.5 py-0.5 rounded-full font-bold border border-eco-200">
                &#10003; Active DISCOM HT Net-Meter Synchronized
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs grid grid-cols-12 gap-4 items-center">
              {/* Photo Display (5 Cols - Large & Full Width) */}
              <div className="col-span-5 h-40 rounded-xl relative overflow-hidden border border-slate-200 shadow-2xs group">
                <img 
                  src={heroProject.imageUrl} 
                  alt={heroProject.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                
                {/* Floating Category Pill */}
                <div className="absolute top-2.5 left-2.5 z-20 bg-brand-950/90 text-white text-[8px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1.5 border border-white/15">
                  <Factory className="w-3 h-3 text-solar-warm" />
                  <span>{heroProject.category}</span>
                </div>

                {/* Geotagged Pin */}
                <div className="absolute bottom-2.5 left-2.5 z-20 bg-emerald-950/90 text-eco-300 text-[7.5px] font-bold px-2 py-0.5 rounded border border-eco-500/30 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{heroProject.verifiedBadge}</span>
                </div>
              </div>

              {/* Details (7 Cols) */}
              <div className="col-span-7 flex flex-col justify-between h-full py-0.5">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-brand-900">{heroProject.title}</h4>
                      <p className="text-[8.5px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-sky-600" /> {heroProject.location}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-black text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200 shrink-0">
                      {heroProject.capacity}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-600 mt-1.5 leading-relaxed">
                    {heroProject.description}
                  </p>

                  {/* Hardware Pills */}
                  <div className="mt-2 flex items-center gap-2 text-[8px]">
                    <span className="px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200 font-semibold text-slate-700">
                      Tier-1 550Wp TOPCon
                    </span>
                    <span className="px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200 font-semibold text-slate-700">
                      Dual-MPPT Industrial Inverter
                    </span>
                    <span className="px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200 font-semibold text-slate-700">
                      80µ Elevated MMS
                    </span>
                  </div>
                </div>

                {/* Generation & Savings Highlight Box */}
                <div className="mt-2.5 p-2 bg-gradient-to-r from-slate-50 via-sky-50/40 to-slate-50 rounded-xl border border-slate-200/90 grid grid-cols-2 gap-3 text-center">
                  <div>
                    <span className="text-slate-400 block text-[7px] uppercase font-bold">Annual Energy Generated</span>
                    <span className="font-extrabold text-brand-900 text-xs mt-0.5 block">{heroProject.annualGeneration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[7px] uppercase font-bold">Annual Financial Savings</span>
                    <span className="font-black text-eco-600 text-xs mt-0.5 block">{heroProject.annualSavings}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3 LARGE, PROMINENT MULTI-SECTOR PROJECT CARDS (3 COLS)         */}
          {/* ============================================================== */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-[10px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-sky-600" />
                <span>Multi-Sector Installation Showcase (Residential &amp; Institutional)</span>
              </h4>
              <span className="text-[8px] text-slate-400 font-mono">100% Commissioned &amp; Grid-Tied</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {showcaseProjects.map((proj, idx) => (
                <div key={proj.id || idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-sky-300 transition-all group">
                  {/* Large Full-Width Photo Display (h-32) */}
                  <div className="h-32 relative overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img 
                      src={proj.imageUrl} 
                      alt={proj.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />

                    {/* Floating Category Pill */}
                    <div className="absolute top-2 left-2 z-20 bg-brand-950/90 text-white text-[7.5px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1 border border-white/15">
                      {getCategoryIcon(proj.iconType)}
                      <span className="truncate">{proj.category}</span>
                    </div>

                    {/* Capacity Badge */}
                    <div className="absolute top-2 right-2 z-20 bg-sky-950/90 text-sky-300 text-[8px] font-bold px-2 py-0.5 rounded font-mono border border-sky-400/30">
                      {proj.capacity}
                    </div>

                    {/* DISCOM Tag */}
                    <div className="absolute bottom-2 left-2 z-20 bg-white/95 text-slate-800 text-[7px] font-bold px-1.5 py-0.2 rounded border border-slate-200">
                      {proj.discom}
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="p-3 bg-white flex flex-col justify-between flex-1">
                    <div>
                      <h5 className="font-extrabold text-brand-900 text-xs truncate leading-tight">{proj.title}</h5>
                      <p className="text-[8px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-sky-600" /> {proj.location}
                      </p>
                      <p className="text-[7.5px] text-slate-500 mt-1 line-clamp-1">
                        {proj.hardware}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[8px]">
                      <div>
                        <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Annual Yield</span>
                        <span className="font-bold text-slate-800 truncate block text-[9.5px]">{proj.annualGeneration}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Annual Savings</span>
                        <span className="font-black text-eco-600 truncate block text-[9.5px]">{proj.annualSavings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* CLIENT SATISFACTION & REGIONAL DISPATCH STRIP                  */}
          {/* ============================================================== */}
          <div className="p-2.5 rounded-2xl bg-gradient-to-r from-slate-50 via-sky-50/30 to-slate-50 border border-slate-200 flex items-center justify-between text-[8px]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-eco-50 text-eco-600 flex items-center justify-center border border-eco-200 shrink-0">
                <CheckCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block leading-tight text-[8.5px]">
                  100% Active On-Grid Operation &bull; 920+ Verified Installations Across South India
                </span>
                <span className="text-[7.5px] text-slate-500 block">
                  All displayed projects operate with real-time IoT cloud monitoring &amp; zero DISCOM regulatory delays.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-brand-900 font-extrabold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[7.5px]">
                TSSPDCL &bull; TSNPDCL &bull; APCPDCL &bull; APEPDCL Empanelled
              </span>
            </div>
          </div>
        </div>

        {/* Page 4 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <div>
            <span className="font-bold text-brand-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.tagline || 'Clean Green Renewable Energy EPC Partner'}
          </div>
          <div className="flex items-center gap-4">
            <span>Portfolio photographs represent actual commissioned installations</span>
            <span className="font-bold text-brand-900 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Page 4 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
