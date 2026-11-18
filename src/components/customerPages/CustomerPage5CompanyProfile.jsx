import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  MapPin, 
  Globe, 
  Cpu, 
  Wrench, 
  Headphones, 
  CheckCircle2, 
  FileCheck2, 
  Sparkles, 
  QrCode,
  ExternalLink,
  Phone,
  Mail,
  Zap,
  CheckCheck
} from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage5CompanyProfile({ quotation, settings }) {
  const company = settings?.company || {};
  const qr = settings?.qrPortals || {};
  
  const scopeMatrix = settings?.scopeOfWorkMatrix || [
    { item: "Supply of Tier-1 Bifacial Solar PV Modules & Smart Grid Inverter", epc: true, client: false },
    { item: "Custom Hot-Dip GI Structure (80µ Zinc), Civil Pedestals & Structural Rigging", epc: true, client: false },
    { item: "ACDB, DCDB, 3 Chemical Earthing Pits (IS 3043) & Lightning Arrester", epc: true, client: false },
    { item: "State DISCOM Bi-Directional Net-Metering Documentation, Testing & Sync", epc: true, client: false },
    { item: "PM Surya Ghar National Portal Subsidy Processing & DBT Coordination", epc: true, client: false },
    { item: "5-Year Comprehensive Workmanship, Structural & Yield AMC Guarantee", epc: true, client: false },
    { item: "Shadow-Free Terrace Space & Water Point with Hose for Panel Cleaning", epc: false, client: true }
  ];

  const omFeatures = [
    { title: "Biannual Health Check", description: "I-V curve tracer tests & thermal imaging" },
    { title: "24/7 Cloud Telemetry", description: "Automated inverter fault detection & alerts" },
    { title: "Annual Torque Audit", description: "SS-304 fastener torque checks & re-tightening" },
    { title: "Regional Response SLA", description: "Rapid 48-hr engineer dispatch across TS & AP" }
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
        {/* 1. COMMANDING EXECUTIVE BRAND HEADER                           */}
        {/* ============================================================== */}
        <div className="rounded-2xl p-2.5 bg-gradient-to-r from-[#060e24] via-[#0b1736] to-[#040816] text-white border border-slate-800 shadow-md flex items-center justify-between relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-14 h-10 rounded-xl bg-white p-1 shadow-md flex items-center justify-center shrink-0 border-2 border-amber-400/50 ring-2 ring-white/10 overflow-hidden">
              <img src="/assets/srimaan_logo.jpeg" alt="Srimaan Solar Solutions" className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black text-white uppercase tracking-tight font-sans">
                  COMPANY PROFILE, SCOPE MATRIX &amp; ACCREDITATIONS
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[7.5px] font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs">
                  EMPANELLED EPC
                </span>
              </div>
              <p className="text-[8px] text-slate-300 font-medium">
                Corporate Credentials, Turnkey Scope Responsibility Matrix &amp; Multi-Year O&amp;M Commitment
              </p>
            </div>
          </div>

          <div className="relative z-10 text-right text-[8px]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
              <span className="text-slate-300 uppercase font-semibold text-[7px]">GSTIN:</span>
              <span className="font-mono font-black text-amber-300 text-[8px]">
                {company?.gstin || '36AAKFS7291F1Z2'}
              </span>
            </div>
            <p className="font-semibold text-slate-300 text-[7.5px] mt-0.5">HQ: <span className="font-black text-white">Khammam, TS</span></p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. CORPORATE DOSSIER & 4 ACCREDITATIONS                        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* Left: About Srimaan Solar (7 Cols) */}
          <div className="col-span-7 p-3 rounded-2xl bg-gradient-to-br from-[#060e24] via-[#0b1736] to-[#040816] text-white shadow-md border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-1.5 border-b border-white/10 pb-1">
                <span className="text-[9px] font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  About {company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}
                </span>
                <span className="text-[7.5px] text-emerald-300 italic font-semibold">
                  &ldquo;{company.tagline || 'Clean Green Renewable Energy EPC Partner'}&rdquo;
                </span>
              </div>
              <p className="text-[8px] text-slate-200 leading-relaxed">
                {company.about || `${company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'} is an established renewable engineering and turnkey solar EPC enterprise headquartered in Khammam, Telangana. We deliver high-yield rooftop solar power plants with Tier-1 TOPCon bifacial modules, smart grid-tie inverters, 80µ hot-dip galvanized mounting structures, and rapid DISCOM net-metering approvals across Telangana and Andhra Pradesh.`}
              </p>
            </div>

            <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[7.5px] text-slate-300 font-mono">
              <span className="text-amber-300 font-bold">&#10003; 920+ Rooftops</span>
              <span className="text-emerald-300 font-bold">&#10003; 14.5+ MW Deployed</span>
              <span className="text-sky-300 font-bold">&#10003; 100% Net-Metered</span>
            </div>
          </div>

          {/* Right: 4 Accreditation Badges (5 Cols) */}
          <div className="col-span-5 grid grid-cols-2 gap-1.5">
            {/* MNRE */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2">
              <img src={EMBLEMS.mnre} alt="MNRE" className="h-6 object-contain shrink-0" />
              <div className="min-w-0">
                <span className="font-extrabold text-slate-900 text-[8px] block truncate">MNRE Empanelled</span>
                <span className="text-[6.5px] text-slate-500 block truncate">Govt. of India</span>
              </div>
            </div>

            {/* ISO 9001 */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2">
              <img src={EMBLEMS.iso} alt="ISO" className="h-6 object-contain shrink-0" />
              <div className="min-w-0">
                <span className="font-extrabold text-slate-900 text-[8px] block truncate">ISO 9001:2015</span>
                <span className="text-[6.5px] text-slate-500 block truncate">Quality Certified EPC</span>
              </div>
            </div>

            {/* Make in India */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2">
              <img src={EMBLEMS.makeInIndia} alt="Make in India" className="h-6 object-contain shrink-0" />
              <div className="min-w-0">
                <span className="font-extrabold text-slate-900 text-[8px] block truncate">Make in India</span>
                <span className="text-[6.5px] text-slate-500 block truncate">DCR Domestic Cells</span>
              </div>
            </div>

            {/* PM Surya Ghar */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2">
              <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="h-6 object-contain shrink-0" />
              <div className="min-w-0">
                <span className="font-extrabold text-slate-900 text-[8px] block truncate">PM Surya Ghar</span>
                <span className="text-[6.5px] text-slate-500 block truncate">Direct DBT Portal</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. SCOPE OF WORK RESPONSIBILITY MATRIX                         */}
        {/* ============================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-200 flex items-center justify-between">
            <span className="text-[9px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
              Scope of Work Responsibility Matrix
            </span>
            <span className="text-[7.5px] font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
              100% Turnkey Delivery
            </span>
          </div>

          <div className="overflow-x-auto text-[8px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200 text-[7px] uppercase tracking-wide">
                  <th className="py-1 px-3 w-7/12">Project Deliverable / Engineering Scope</th>
                  <th className="py-1 px-3 w-3/12 text-center">Srimaan Solar Turnkey Scope</th>
                  <th className="py-1 px-3 w-2/12 text-center">Customer Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {scopeMatrix.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"}>
                    <td className="py-1 px-3 font-semibold text-slate-800 leading-tight text-[7.5px]">{row.item}</td>
                    <td className="py-1 px-3 text-center">
                      {row.epc ? (
                        <span className="text-emerald-800 font-black inline-flex items-center gap-1 text-[7.5px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          &#10003; Full EPC Scope
                        </span>
                      ) : (
                        <span className="text-slate-300">&mdash;</span>
                      )}
                    </td>
                    <td className="py-1 px-3 text-center">
                      {row.client ? (
                        <span className="text-blue-900 font-black inline-flex items-center gap-1 text-[7.5px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                          &#10003; Client Scope
                        </span>
                      ) : (
                        <span className="text-slate-300">&mdash;</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. 4 CORE ENGINEERING PILLARS                                  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2 text-[7.5px]">
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="font-black text-slate-900 block text-[8px] flex items-center gap-1">
              <Cpu className="w-3 h-3 text-blue-600" />
              In-House Engineering
            </span>
            <p className="text-slate-600 mt-0.5 leading-snug">
              Zero third-party subcontracting. Dedicated solar structural CAD designers &amp; electrical engineers.
            </p>
          </div>

          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="font-black text-slate-900 block text-[8px] flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-600" />
              DISCOM Circle Officers
            </span>
            <p className="text-slate-600 mt-0.5 leading-snug">
              Stationed circle liaison officers ensure bi-directional meter testing &amp; sync within 5 days.
            </p>
          </div>

          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="font-black text-slate-900 block text-[8px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Cyclone-Resistant MMS
            </span>
            <p className="text-slate-600 mt-0.5 leading-snug">
              Elevated 80µ hot-dip galvanized iron structures rated for 180 km/h wind speeds with SS-304 hardware.
            </p>
          </div>

          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="font-black text-slate-900 block text-[8px] flex items-center gap-1">
              <Headphones className="w-3 h-3 text-purple-600" />
              Rapid 48-Hr SLA Hubs
            </span>
            <p className="text-slate-600 mt-0.5 leading-snug">
              Regional service centers across Khammam HQ, Hyderabad, Vijayawada, Visakhapatnam &amp; Warangal.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. 5-YEAR COMPREHENSIVE O&M ASSURANCE STRIP                    */}
        {/* ============================================================== */}
        <div className="p-2.5 bg-gradient-to-r from-emerald-50/60 via-white to-emerald-50/60 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              5-Year Comprehensive Operation &amp; Maintenance (O&amp;M) Assurance
            </span>
            <span className="text-[7.5px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
              Pan-South India Service Hubs: Khammam • Hyderabad • Vijayawada • Visakhapatnam
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-[8px]">
            {omFeatures.map((feat, idx) => (
              <div key={idx} className="bg-white p-1.5 rounded-xl border border-emerald-100 shadow-2xs">
                <span className="font-bold text-slate-900 block text-[8px] truncate">{feat.title}</span>
                <span className="text-slate-500 text-[6.5px] block mt-0.5 truncate">{feat.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. MODERN HORIZONTAL DIGITAL CONNECT & QR PORTALS              */}
        {/* ============================================================== */}
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-amber-600" />
              <span>Official Digital Connect &amp; Verification Portals</span>
            </h4>
            <span className="text-[7px] text-slate-500 font-medium">Scan QR code or click handles to connect directly</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* 1. Website */}
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex flex-col items-center justify-between">
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[7.5px] font-bold text-blue-700 flex items-center gap-1">
                  <Globe className="w-2.5 h-2.5" />
                  Website
                </span>
                <span className="text-[6.5px] font-bold text-blue-800 bg-blue-100 px-1 py-0.2 rounded">Portal</span>
              </div>
              <div className="p-1 bg-white rounded-lg border border-slate-200 w-full flex items-center justify-center">
                <img 
                  src={qr?.website?.image || "/assets/qr/web-qr.jpeg"} 
                  alt="Website QR" 
                  className="w-12 h-12 object-contain rounded"
                />
              </div>
              <div className="mt-1 w-full">
                <span className="text-[7px] font-bold text-slate-800 block truncate">srimaansolar.com</span>
                <span className="text-[6px] text-blue-600 font-bold block">Visit Official Portal</span>
              </div>
            </div>

            {/* 2. Instagram */}
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex flex-col items-center justify-between">
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[7.5px] font-bold text-pink-700 flex items-center gap-1">
                  <ExternalLink className="w-2.5 h-2.5" />
                  Instagram
                </span>
                <span className="text-[6.5px] font-bold text-pink-800 bg-pink-100 px-1 py-0.2 rounded">Reels</span>
              </div>
              <div className="p-1 bg-white rounded-lg border border-slate-200 w-full flex items-center justify-center">
                <img 
                  src={qr?.instagram?.image || "/assets/qr/insta-qr.jpeg"} 
                  alt="Instagram QR" 
                  className="w-12 h-12 object-contain rounded"
                />
              </div>
              <div className="mt-1 w-full">
                <span className="text-[7px] font-bold text-slate-800 block truncate">@srimaansolar</span>
                <span className="text-[6px] text-pink-600 font-bold block">View Project Reels</span>
              </div>
            </div>

            {/* 3. Facebook */}
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex flex-col items-center justify-between">
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[7.5px] font-bold text-sky-700 flex items-center gap-1">
                  <ExternalLink className="w-2.5 h-2.5" />
                  Facebook
                </span>
                <span className="text-[6.5px] font-bold text-sky-800 bg-sky-100 px-1 py-0.2 rounded">Community</span>
              </div>
              <div className="p-1 bg-white rounded-lg border border-slate-200 w-full flex items-center justify-center">
                <img 
                  src={qr?.facebook?.image || "/assets/qr/fb-qr.jpeg"} 
                  alt="Facebook QR" 
                  className="w-12 h-12 object-contain rounded"
                />
              </div>
              <div className="mt-1 w-full">
                <span className="text-[7px] font-bold text-slate-800 block truncate">@srimaansolar</span>
                <span className="text-[6px] text-sky-600 font-bold block">Follow Updates</span>
              </div>
            </div>

            {/* 4. Google Maps */}
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex flex-col items-center justify-between">
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[7.5px] font-bold text-emerald-700 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  Google Maps
                </span>
                <span className="text-[6.5px] font-bold text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded">HQ Route</span>
              </div>
              <div className="p-1 bg-white rounded-lg border border-slate-200 w-full flex items-center justify-center">
                <img 
                  src={qr?.googleMaps?.image || "/assets/qr/loc-qr.jpeg"} 
                  alt="Google Maps QR" 
                  className="w-12 h-12 object-contain rounded"
                />
              </div>
              <div className="mt-1 w-full">
                <span className="text-[7px] font-bold text-slate-800 block truncate">Khammam HQ</span>
                <span className="text-[6px] text-emerald-600 font-bold block">Navigate to Office</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 7. STATUTORY REGISTRATIONS BANNER                              */}
        {/* ============================================================== */}
        <div className="py-1.5 px-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-[7px] text-slate-600 font-mono">
          <span>CIN: <strong className="text-slate-800">{company?.cin || 'U40106TG2020PTC142380'}</strong></span>
          <span>&bull;</span>
          <span>GSTIN: <strong className="text-slate-800">{company?.gstin || '36AAKFS7291F1Z2'}</strong></span>
          <span>&bull;</span>
          <span>MNRE Empanelment: <strong className="text-slate-800">{company?.mnreEmpanelment || 'SRI-DISCOM-TG-8421'}</strong></span>
          <span>&bull;</span>
          <span>MSME: <strong className="text-slate-800">{company?.msme || 'UDYAM-TS-14-0028194'}</strong></span>
        </div>

        {/* ============================================================== */}
        {/* 8. PAGE 5 FOOTER                                               */}
        {/* ============================================================== */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
          <div>
            <span className="font-bold text-slate-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.address || 'H.No. 11-10-624/A, Burhanpuram, Khammam, Telangana - 507001'}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-semibold">{company?.tagline || 'Clean Green Renewable Energy EPC Partner'}</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Page 5 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
