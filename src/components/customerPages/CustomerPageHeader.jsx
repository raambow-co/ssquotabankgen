import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function CustomerPageHeader({ 
  quotation, 
  settings, 
  title = "TURNKEY SOLAR EPC PROPOSAL",
  subtitle = "Direct On-Grid Rooftop Solar Photovoltaic Power Plant",
  badgeText = "MNRE & DISCOM COMPLIANT",
  badgeColor = "amber",
  capacityKw
}) {
  const company = settings?.company || {};
  const dcKw = capacityKw || quotation?.technical?.systemCapacityKw || quotation?.technical?.actualDcCapacityKw || 5.0;

  // Format clean reference number without redundant company prefix
  const rawRef = quotation?.quotationNumber || 'SSS-SOL-2026-0001';
  const cleanRef = rawRef.replace(/^SRIMAAN\s+SOLAR\s+SOLUTIONS-?/i, 'SSS-');

  return (
    <div className="w-full space-y-1.5 pb-2 border-b border-slate-200">
      {/* Top Government Accreditation & DISCOM Strip */}
      <div className="flex items-center justify-between text-[7.5px] text-slate-600 font-semibold uppercase tracking-wider pb-1 border-b border-slate-100">
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

      {/* Main Executive Brand Header */}
      <div className="flex items-center justify-between gap-3 pt-0.5">
        {/* Left: Prominent Logo + Divider + Titles */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Prominent High-Resolution Logo (Clean, borderless framing) */}
          <div className="h-14 sm:h-16 w-44 sm:w-48 flex items-center shrink-0">
            <img 
              src="/assets/srimaan_logo.jpeg" 
              alt={company.legalName || "Srimaan Solar Solutions"} 
              className="h-full w-auto max-w-full object-contain"
            />
          </div>

          {/* Vertical Elegant Gold Divider */}
          <div className="h-10 w-[1.5px] bg-gradient-to-b from-amber-400 via-slate-300 to-transparent shrink-0 hidden sm:block" />

          {/* Page Title & Subtitle */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[12.5px] font-black text-slate-950 uppercase tracking-tight font-sans truncate">
                {title}
              </h2>
              {badgeText && (
                <span className={`px-2 py-0.5 rounded-full text-[7.5px] font-black uppercase shadow-2xs flex items-center gap-1 shrink-0 ${
                  badgeColor === 'emerald'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950'
                }`}>
                  <ShieldCheck className="w-2.5 h-2.5" />
                  {badgeText}
                </span>
              )}
            </div>
            <p className="text-[8.5px] text-slate-600 font-medium mt-0.5 truncate">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Official GSTIN, Contact & Proposal Ref as per Official Document */}
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
    </div>
  );
}
