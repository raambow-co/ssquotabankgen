import React from 'react';
import { 
  Shield, 
  CheckCircle2, 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Award, 
  Zap, 
  QrCode, 
  Wrench, 
  ShieldCheck, 
  HeartHandshake, 
  FileCheck, 
  ExternalLink, 
  Navigation, 
  Sparkles,
  Workflow,
  Atom,
  BadgeCheck,
  CheckCheck,
  FileSignature,
  Headphones,
  Compass,
  Cpu,
  Layers3
} from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage5CompanyProfile({ quotation, settings }) {
  const company = settings?.company || {};
  const qr = settings?.qrPortals || {};
  const roadmap = settings?.executionRoadmap || [
    { step: 1, title: "3D CAD Survey", description: "Shadow trajectory & roof load analysis." },
    { step: 2, title: "Scientific Sizing", description: "SLD design & structural calculations." },
    { step: 3, title: "DISCOM Liaison", description: "Net-metering feasibility liaison." },
    { step: 4, title: "Precision Rigging", description: "Elevated GI MMS & TOPCon installation." },
    { step: 5, title: "Commissioning", description: "3-pit earthing test & grid sync." },
    { step: 6, title: "Telemetry & AMC", description: "24/7 Cloud app monitoring." }
  ];
  const scopeMatrix = settings?.scopeOfWorkMatrix || [
    { item: "Supply of Tier-1 Bifacial Solar PV Modules & Smart Grid Inverter", epc: true, client: false },
    { item: "Custom Hot-Dip GI Structure (80µ Zinc), Civil Pedestals & Rigging", epc: true, client: false },
    { item: "ACDB, DCDB, 3 Chemical Earthing Pits (IS 3043) & Lightning Arrester", epc: true, client: false },
    { item: "State DISCOM Bi-Directional Net-Metering Documentation & Approvals", epc: true, client: false },
    { item: "PM Surya Ghar National Portal Subsidy Processing & DBT Coordination", epc: true, client: false },
    { item: "5-Year Comprehensive Workmanship, Structural & Yield AMC Guarantee", epc: true, client: false },
    { item: "Shadow-Free Terrace Space & Water Point with Hose for Panel Cleaning", epc: false, client: true }
  ];
  const om = settings?.omAssurance || {};
  const omFeatures = om?.features || [
    { title: "Biannual Health Check", description: "I-V curve tracer tests & thermography" },
    { title: "24/7 Telemetry Desk", description: "Automated inverter fault alert system" },
    { title: "Torque Audit", description: "Annual SS-304 fastener torque checks" },
    { title: "Regional Service Hubs", description: "Khammam • Hyderabad • Vijayawada • Vizag" }
  ];

  return (
    <div className="a4-preview-sheet p-6 sm:p-7 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* 4-Color Signature Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-sky-500 via-eco-500 to-solar-orange z-10" />

      {/* Official Subtle Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2.5">
        <div className="space-y-2.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img src="/assets/srimaan_logo.jpeg" alt="SRIMAAN SOLAR" className="w-full h-full object-contain" />
              </div>
              <div className="border-l border-slate-300 pl-3">
                <p className="text-xs font-black text-brand-900 tracking-tight uppercase flex items-center gap-2">
                  <span>COMPANY PROFILE, ACCREDITATIONS &amp; DIGITAL CONNECTIVITY</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-sky-200">
                    Empanelled EPC
                  </span>
                </p>
                <p className="text-[9px] text-slate-500">
                  Corporate Credentials, Turnkey Scope Matrix &amp; Official Digital Portals
                </p>
              </div>
            </div>
            <div className="text-right text-[9px] text-slate-500">
              <span className="font-mono font-bold text-brand-900">GSTIN: {company?.gstin || '36AAKFS7291F1Z2'}</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* TOP SECTION: CORPORATE PROFILE & ACCREDITATION STRIP           */}
          {/* ============================================================== */}
          <div className="grid grid-cols-12 gap-3 items-stretch">
            {/* Left: About Srimaan Solar (7 Cols) */}
            <div className="col-span-7 p-3 rounded-2xl bg-gradient-to-r from-slate-50 via-sky-50/20 to-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Atom className="w-3.5 h-3.5 text-solar-orange" />
                    About {company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}
                  </h3>
                  <span className="text-[8.5px] text-eco-700 italic font-bold">
                    &ldquo;{company.tagline || 'Clean Green Renewable Energy EPC Partner'}&rdquo;
                  </span>
                </div>
                <p className="text-[8.5px] text-slate-600 leading-relaxed">
                  {company.about || `${company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'} is a premier clean-tech engineering and EPC enterprise delivering high-efficiency rooftop and ground-mount solar power systems across Telangana and Andhra Pradesh. Committed to engineering excellence, we deploy Tier-1 DCR solar modules, smart grid-tie inverters, heavy-duty hot-dip galvanized mounting structures, and seamless DISCOM net-metering synchronization.`}
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex items-center justify-between text-[7.5px] text-slate-500">
                <span>&bull; Registered DISCOM EPC Channel Partner</span>
                <span>&bull; National Portal DBT Facilitator</span>
                <span>&bull; MNRE Empanelled</span>
              </div>
            </div>

            {/* Right: 4 Accreditation Badges (5 Cols) */}
            <div className="col-span-5 grid grid-cols-2 gap-1.5">
              {/* DISCOM */}
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                <img src={EMBLEMS.mnre} alt="MNRE" className="h-6 object-contain shrink-0" />
                <div className="min-w-0">
                  <span className="font-extrabold text-brand-900 text-[8px] block truncate">DISCOM Partner</span>
                  <span className="text-[6.5px] text-slate-400 block truncate">TSSPDCL / TSNPDCL</span>
                </div>
              </div>

              {/* ISO 9001 */}
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                <img src={EMBLEMS.iso} alt="ISO" className="h-6 object-contain shrink-0" />
                <div className="min-w-0">
                  <span className="font-extrabold text-brand-900 text-[8px] block truncate">ISO 9001:2015</span>
                  <span className="text-[6.5px] text-slate-400 block truncate">Certified Quality EPC</span>
                </div>
              </div>

              {/* Make in India */}
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                <img src={EMBLEMS.makeInIndia} alt="Make in India" className="h-6 object-contain shrink-0" />
                <div className="min-w-0">
                  <span className="font-extrabold text-brand-900 text-[8px] block truncate">Make in India</span>
                  <span className="text-[6.5px] text-slate-400 block truncate">DCR Compliant</span>
                </div>
              </div>

              {/* PM Surya Ghar */}
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="h-6 object-contain shrink-0" />
                <div className="min-w-0">
                  <span className="font-extrabold text-brand-900 text-[8px] block truncate">PM Surya Ghar</span>
                  <span className="text-[6.5px] text-slate-400 block truncate">Direct DBT Portal</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* MIDDLE SECTION: SPLIT SCOPE MATRIX & 6-STEP EXECUTION ROADMAP  */}
          {/* ============================================================== */}
          <div className="grid grid-cols-12 gap-2.5">
            {/* LEFT (7 COLS): SCOPE OF WORK RESPONSIBILITY MATRIX */}
            <div className="col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="bg-slate-100/90 px-3 py-1.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-[9.5px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-sky-600" />
                    Scope of Work Responsibility Matrix
                  </span>
                  <span className="text-[7.5px] font-bold text-slate-500">
                    Transparent Turnkey
                  </span>
                </div>

                <div className="overflow-x-auto text-[8px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[7.5px] uppercase tracking-wide">
                        <th className="py-1 px-3 w-1/2">Project Deliverable / Engineering Scope</th>
                        <th className="py-1 px-3 w-1/4 text-center">Srimaan Scope</th>
                        <th className="py-1 px-3 w-1/4 text-center">Customer Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {scopeMatrix.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : ""}>
                          <td className="py-1 px-3 font-semibold text-slate-800 leading-tight text-[7.5px]">{row.item}</td>
                          <td className="py-1 px-3 text-center">
                            {row.epc ? (
                              <span className="text-eco-600 font-black inline-flex items-center gap-0.5 text-[7.5px]">
                                &#10003; Full EPC
                              </span>
                            ) : (
                              <span className="text-slate-400">&mdash;</span>
                            )}
                          </td>
                          <td className="py-1 px-3 text-center">
                            {row.client ? (
                              <span className="text-brand-900 font-black inline-flex items-center gap-0.5 text-[7.5px]">
                                &#10003; Client
                              </span>
                            ) : (
                              <span className="text-slate-400">&mdash;</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-1.5 bg-slate-50 border-t border-slate-200 text-[7px] text-slate-500 flex items-center justify-between">
                <span>All civil pedestals, electrical cabling, and earthing handled by Srimaan Solar team.</span>
                <span className="text-eco-600 font-bold">&#10003; 100% Turnkey Scope</span>
              </div>
            </div>

            {/* RIGHT (5 COLS): 6-STEP SCIENTIFIC EXECUTION ROADMAP */}
            <div className="col-span-5 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200 p-2 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-200 mb-1">
                  <span className="text-[9.5px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-solar-orange" />
                    6-Step Execution Roadmap
                  </span>
                  <span className="text-[7.5px] text-eco-700 bg-eco-50 px-1.5 py-0.2 rounded font-bold border border-eco-200">
                    SLA Compliant
                  </span>
                </div>

                <div className="space-y-1 text-[7.5px]">
                  {roadmap.map((step, idx) => (
                    <div key={idx} className="p-1 rounded-xl bg-white border border-slate-200/80 flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-brand-900 text-white font-black text-[7px] inline-flex items-center justify-center shrink-0">
                        {step.step || (idx + 1)}
                      </span>
                      <div className="min-w-0">
                        <span className="font-extrabold text-brand-900 block leading-tight truncate text-[8px]">{step.title}</span>
                        <span className="text-[6.5px] text-slate-500 block truncate">{step.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1 border-t border-slate-200 text-[6.5px] text-slate-400">
                End-to-end execution guaranteed within standard 15-day SLA timeline.
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SRIMAAN ADVANTAGE: 4 CORE ENGINEERING PILLARS                  */}
          {/* ============================================================== */}
          <div className="grid grid-cols-4 gap-2 text-[7.5px]">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-black text-brand-900 block text-[8px] flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-sky-600" />
                In-House Engineering
              </span>
              <p className="text-slate-600 mt-0.5 leading-snug">
                Zero third-party subcontracting. Dedicated solar structural CAD designers &amp; electrical engineers.
              </p>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-black text-brand-900 block text-[8px] flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-solar-orange" />
                DISCOM Circle Officers
              </span>
              <p className="text-slate-600 mt-0.5 leading-snug">
                Dedicated liaison personnel stationed at circle offices ensure bi-directional meter testing within 5 days.
              </p>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-black text-brand-900 block text-[8px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-eco-600" />
                Cyclone Resistant MMS
              </span>
              <p className="text-slate-600 mt-0.5 leading-snug">
                Elevated 80µ hot-dip galvanized iron structures rated for 180 km/h wind speeds with SS-304 hardware.
              </p>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-black text-brand-900 block text-[8px] flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5 text-brand-900" />
                Rapid 48-Hr SLA Hubs
              </span>
              <p className="text-slate-600 mt-0.5 leading-snug">
                Regional service response centers across Khammam HQ, Hyderabad, Vijayawada, and Visakhapatnam.
              </p>
            </div>
          </div>

          {/* 5-YEAR O&M ASSURANCE STRIP */}
          <div className="p-2 bg-gradient-to-r from-slate-50 via-sky-50/30 to-slate-50 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-eco-600" />
                5-Year Comprehensive Operation &amp; Maintenance (O&amp;M) Assurance
              </span>
              <span className="text-[7.5px] text-eco-700 bg-eco-50 px-1.5 py-0.2 rounded-full font-bold border border-eco-200">
                Pan-South India Hubs: Khammam • Hyd • Vzg • Vja • Wgl
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-[8px]">
              {omFeatures.map((feat, idx) => (
                <div key={idx} className="bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="font-bold text-brand-900 block text-[8px] truncate">{feat.title}</span>
                  <span className="text-slate-500 text-[6.5px] block mt-0.5 truncate">{feat.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 OFFICIAL DIGITAL & HEADQUARTERS QR PORTALS */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-[9px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-solar-orange" />
                <span>Official Digital Connect &amp; Location Portals</span>
              </h4>
              <span className="text-[7px] text-slate-500 font-medium">Scan with camera to connect instantly</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {/* 1. Facebook */}
              <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-between hover:border-sky-400 transition-colors">
                <div className="flex items-center justify-between w-full mb-0.5">
                  <span className="text-[8px] font-bold text-sky-600 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    {qr?.facebook?.title || 'Facebook'}
                  </span>
                  <span className="text-[6.5px] font-bold text-sky-700 bg-sky-50 px-1 py-0.2 rounded border border-sky-200">{qr?.facebook?.badge || 'Social'}</span>
                </div>
                <div className="p-1 bg-white rounded-xl border border-slate-200 shadow-2xs w-full flex items-center justify-center">
                  <img 
                    src={qr?.facebook?.image || "/assets/qr/fb-qr.jpeg"} 
                    alt="Facebook QR Code" 
                    className="w-14 h-14 object-contain rounded"
                  />
                </div>
                <div className="mt-0.5 w-full">
                  <span className="text-[7px] font-bold text-slate-800 block truncate">{qr?.facebook?.handle || '@srimaansolar'}</span>
                  <span className="text-[6px] text-sky-600 font-bold block">{qr?.facebook?.actionText || 'Scan to Follow'}</span>
                </div>
              </div>

              {/* 2. Instagram */}
              <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-between hover:border-pink-400 transition-colors">
                <div className="flex items-center justify-between w-full mb-0.5">
                  <span className="text-[8px] font-bold text-pink-600 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    {qr?.instagram?.title || 'Instagram'}
                  </span>
                  <span className="text-[6.5px] font-bold text-pink-700 bg-pink-50 px-1 py-0.2 rounded border border-pink-200">{qr?.instagram?.badge || 'Reels'}</span>
                </div>
                <div className="p-1 bg-white rounded-xl border border-slate-200 shadow-2xs w-full flex items-center justify-center">
                  <img 
                    src={qr?.instagram?.image || "/assets/qr/insta-qr.jpeg"} 
                    alt="Instagram QR Code" 
                    className="w-14 h-14 object-contain rounded"
                  />
                </div>
                <div className="mt-0.5 w-full">
                  <span className="text-[7px] font-bold text-slate-800 block truncate">{qr?.instagram?.handle || '@srimaansolar'}</span>
                  <span className="text-[6px] text-pink-600 font-bold block">{qr?.instagram?.actionText || 'Scan to View'}</span>
                </div>
              </div>

              {/* 3. Official Website */}
              <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-between hover:border-sky-500 transition-colors">
                <div className="flex items-center justify-between w-full mb-0.5">
                  <span className="text-[8px] font-bold text-brand-900 flex items-center gap-1">
                    <Globe className="w-2.5 h-2.5 text-solar-orange" />
                    {qr?.website?.title || 'Website'}
                  </span>
                  <span className="text-[6.5px] font-bold text-brand-900 bg-brand-50 px-1 py-0.2 rounded border border-brand-200">{qr?.website?.badge || 'Portal'}</span>
                </div>
                <div className="p-1 bg-white rounded-xl border border-slate-200 shadow-2xs w-full flex items-center justify-center">
                  <img 
                    src={qr?.website?.image || "/assets/qr/web-qr.jpeg"} 
                    alt="Official Website QR Code" 
                    className="w-14 h-14 object-contain rounded"
                  />
                </div>
                <div className="mt-0.5 w-full">
                  <span className="text-[7px] font-bold text-slate-800 block truncate">{qr?.website?.handle || 'srimaansolar.com'}</span>
                  <span className="text-[6px] text-brand-700 font-bold block">{qr?.website?.actionText || 'Scan to Visit'}</span>
                </div>
              </div>

              {/* 4. Google Maps Location */}
              <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-between hover:border-eco-500 transition-colors">
                <div className="flex items-center justify-between w-full mb-0.5">
                  <span className="text-[8px] font-bold text-eco-700 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-eco-600" />
                    {qr?.googleMaps?.title || 'Google Maps'}
                  </span>
                  <span className="text-[6.5px] font-bold text-eco-800 bg-eco-50 px-1 py-0.2 rounded border border-eco-200">{qr?.googleMaps?.badge || 'Location'}</span>
                </div>
                <div className="p-1 bg-white rounded-xl border border-slate-200 shadow-2xs w-full flex items-center justify-center">
                  <img 
                    src={qr?.googleMaps?.image || "/assets/qr/loc-qr.jpeg"} 
                    alt="Google Maps Location QR Code" 
                    className="w-14 h-14 object-contain rounded"
                  />
                </div>
                <div className="mt-0.5 w-full">
                  <span className="text-[7px] font-bold text-slate-800 block truncate">{qr?.googleMaps?.handle || 'Srimaan Solar HQ'}</span>
                  <span className="text-[6px] text-eco-600 font-bold block">{qr?.googleMaps?.actionText || 'Scan for Route'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Statutory Registrations Banner */}
        <div className="py-2 px-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between text-[7px] text-slate-600 font-mono">
          <span>CIN: <strong className="text-slate-800">{company?.cin || 'U40106TG2020PTC142380'}</strong></span>
          <span>&bull;</span>
          <span>GSTIN: <strong className="text-slate-800">{company?.gstin || '36AAKFS7291F1Z2'}</strong></span>
          <span>&bull;</span>
          <span>MNRE Empanelment: <strong className="text-slate-800">{company?.mnreEmpanelment || 'SRI-DISCOM-TG-8421'}</strong></span>
          <span>&bull;</span>
          <span>MSME: <strong className="text-slate-800">{company?.msme || 'UDYAM-TS-14-0028194'}</strong></span>
        </div>

        {/* Page 5 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <div>
            <span className="font-bold text-brand-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.tagline || 'Clean Green Renewable Energy EPC Partner'}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-eco-600 font-bold">{company?.tagline || 'Clean Green Renewable Energy EPC Partner'}</span>
            <span className="font-bold text-brand-900 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Page 5 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
