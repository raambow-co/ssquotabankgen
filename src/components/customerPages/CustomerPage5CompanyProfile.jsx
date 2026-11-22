import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  FileText, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  QrCode, 
  ArrowRight 
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageHeader from './CustomerPageHeader';
import CustomerPageFooter from './CustomerPageFooter';
import { EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage5CompanyProfile({ quotation, settings }) {
  const company = settings?.company || {};
  const technical = quotation?.technical || {};
  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);

  return (
    <div className="a4-preview-sheet p-6 flex flex-col text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex-1 flex flex-col justify-between min-h-0 space-y-1.5">
        {/* ============================================================== */}
        {/* 1. MASTER EXECUTIVE BRAND HEADER                               */}
        {/* ============================================================== */}
        <CustomerPageHeader 
          quotation={quotation}
          settings={settings}
          title="COMPANY PROFILE, ACCREDITATIONS & DIGITAL CONNECTIVITY"
          subtitle="Corporate Credentials, Standard Scope Matrix & Official Digital Portals"
          badgeText="EPC PROFILE"
          badgeColor="emerald"
          capacityKw={dcKw}
        />

        {/* ============================================================== */}
        {/* 2. ABOUT SRIMAAN SOLAR SOLUTIONS                               */}
        {/* ============================================================== */}
        <div className="border border-slate-200/90 rounded-xl p-2.5 bg-white shadow-2xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <h3 className="text-[8pt] font-black uppercase tracking-wide text-slate-900 font-sans">
                ABOUT {company.tradeName || company.name || "SRIMAAN SOLAR SOLUTIONS"}
              </h3>
            </div>
            <span className="text-[6.8pt] text-slate-500 italic font-serif">
              &ldquo;{company.tagline || "Built on Trust. Driven by Excellence."}&rdquo;
            </span>
          </div>
          <p className="text-[6.8pt] text-slate-700 leading-relaxed font-sans">
            {company.aboutNarrative || company.about || "M/s. SRIMAAN SOLAR SOLUTIONS is a premier clean energy EPC company specializing in high-performance rooftop solar installations across residential, commercial, institutional, and industrial facilities. Backed by certified civil and electrical engineers, we combine Tier-1 BloombergNEF hardware with precision structural design, seamless DISCOM net-metering facilitation, and lifetime IoT monitoring."}
          </p>
        </div>

        {/* ============================================================== */}
        {/* 3. ACCREDITATIONS & EMPANELMENTS (5 Badges)                     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-5 gap-2">
          {/* Badge 1: MNRE DISCOM Empanelled */}
          <div className="border border-slate-200 rounded-xl p-1.5 text-center bg-white shadow-2xs flex flex-col items-center justify-between">
            <img src={EMBLEMS.mnre} alt="MNRE" className="h-6 w-auto object-contain mb-1" />
            <div>
              <span className="font-bold text-[6.8pt] text-slate-900 block leading-tight">
                DISCOM Empanelled
              </span>
              <span className="text-[5.8pt] text-slate-500 block leading-tight mt-0.5">
                TSSPDCL &bull; TSNPDCL &bull; APEPDCL
              </span>
            </div>
          </div>

          {/* Badge 2: ISO 9001:2015 */}
          <div className="border border-slate-200 rounded-xl p-1.5 text-center bg-white shadow-2xs flex flex-col items-center justify-between">
            <img src={EMBLEMS.iso} alt="ISO 9001" className="h-6 w-auto object-contain mb-1" />
            <div>
              <span className="font-bold text-[6.8pt] text-slate-900 block leading-tight">
                ISO 9001:2015
              </span>
              <span className="text-[5.8pt] text-slate-500 block leading-tight mt-0.5">
                Quality EPC Certified
              </span>
            </div>
          </div>

          {/* Badge 3: Make in India */}
          <div className="border border-slate-200 rounded-xl p-1.5 text-center bg-white shadow-2xs flex flex-col items-center justify-between">
            <img src={EMBLEMS.makeInIndia} alt="Make in India" className="h-6 w-auto object-contain mb-1" />
            <div>
              <span className="font-bold text-[6.8pt] text-slate-900 block leading-tight">
                Make in India
              </span>
              <span className="text-[5.8pt] text-slate-500 block leading-tight mt-0.5">
                DCR Compliant
              </span>
            </div>
          </div>

          {/* Badge 4: BIS Certified */}
          <div className="border border-slate-200 rounded-xl p-1.5 text-center bg-white shadow-2xs flex flex-col items-center justify-between">
            <img src={EMBLEMS.bis} alt="BIS" className="h-6 w-auto object-contain mb-1" />
            <div>
              <span className="font-bold text-[6.8pt] text-slate-900 block leading-tight">
                BIS Certified
              </span>
              <span className="text-[5.8pt] text-slate-500 block leading-tight mt-0.5">
                IS 14286 Standards
              </span>
            </div>
          </div>

          {/* Badge 5: PM Surya Ghar */}
          <div className="border border-slate-200 rounded-xl p-1.5 text-center bg-white shadow-2xs flex flex-col items-center justify-between">
            <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="h-6 w-auto object-contain mb-1" />
            <div>
              <span className="font-bold text-[6.8pt] text-slate-900 block leading-tight">
                PM Surya Ghar
              </span>
              <span className="text-[5.8pt] text-slate-500 block leading-tight mt-0.5">
                National Portal Partner
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. OUR 6-STEP PRECISION EXECUTION ROADMAP                      */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <h3 className="text-[7.8pt] font-black uppercase tracking-wide text-slate-900 font-sans">
              OUR 6-STEP PRECISION EXECUTION ROADMAP
            </h3>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {/* Step 1 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <span className="w-4 h-4 rounded-full bg-[#07132c] text-white font-black text-[6.5pt] flex items-center justify-center mb-1">
                  1
                </span>
                <span className="font-extrabold text-[7pt] text-slate-900 block leading-tight">
                  3D CAD Survey
                </span>
                <span className="text-[5.8pt] text-slate-500 block leading-snug mt-0.5">
                  Shadow trajectory &amp; roof load analysis.
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <span className="w-4 h-4 rounded-full bg-[#07132c] text-white font-black text-[6.5pt] flex items-center justify-center mb-1">
                  2
                </span>
                <span className="font-extrabold text-[7pt] text-slate-900 block leading-tight">
                  Engineering
                </span>
                <span className="text-[5.8pt] text-slate-500 block leading-snug mt-0.5">
                  SLD design &amp; structural calculations.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <span className="w-4 h-4 rounded-full bg-[#07132c] text-white font-black text-[6.5pt] flex items-center justify-center mb-1">
                  3
                </span>
                <span className="font-extrabold text-[7pt] text-slate-900 block leading-tight">
                  DISCOM Approvals
                </span>
                <span className="text-[5.8pt] text-slate-500 block leading-snug mt-0.5">
                  Net-metering feasibility liaison.
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <span className="w-4 h-4 rounded-full bg-[#07132c] text-white font-black text-[6.5pt] flex items-center justify-center mb-1">
                  4
                </span>
                <span className="font-extrabold text-[7pt] text-slate-900 block leading-tight">
                  Installation
                </span>
                <span className="text-[5.8pt] text-slate-500 block leading-snug mt-0.5">
                  Elevated GI MMS &amp; TOPCon rigging.
                </span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <span className="w-4 h-4 rounded-full bg-[#07132c] text-white font-black text-[6.5pt] flex items-center justify-center mb-1">
                  5
                </span>
                <span className="font-extrabold text-[7pt] text-slate-900 block leading-tight">
                  Commissioning
                </span>
                <span className="text-[5.8pt] text-slate-500 block leading-snug mt-0.5">
                  3-pit earthing test &amp; grid sync.
                </span>
              </div>
            </div>

            {/* Step 6 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <span className="w-4 h-4 rounded-full bg-[#07132c] text-white font-black text-[6.5pt] flex items-center justify-center mb-1">
                  6
                </span>
                <span className="font-extrabold text-[7pt] text-slate-900 block leading-tight">
                  Telemetry &amp; AMC
                </span>
                <span className="text-[5.8pt] text-slate-500 block leading-snug mt-0.5">
                  24/7 Cloud app monitoring.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. SCOPE OF WORK RESPONSIBILITY MATRIX                         */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <h3 className="text-[7.8pt] font-black uppercase tracking-wide text-slate-900 font-sans">
              SCOPE OF WORK RESPONSIBILITY MATRIX
            </h3>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white text-[6.8pt]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-900 font-black text-[7pt] uppercase tracking-wider">
                  <th className="py-1 px-3 text-left w-7/12">DELIVERABLE / RESPONSIBILITY SCOPE</th>
                  <th className="py-1 px-2 text-center w-3/12 text-blue-950 font-bold border-l border-slate-200">
                    SRIMAAN SCOPE
                  </th>
                  <th className="py-1 px-2 text-center w-2/12 text-slate-700 font-bold border-l border-slate-200">
                    CLIENT SCOPE
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-1 px-3 text-slate-800 font-medium">
                    Supply of Tier-1 Bifacial Solar PV Modules &amp; Smart Grid Inverter
                  </td>
                  <td className="py-1 px-2 text-center font-bold text-emerald-700 border-l border-slate-100 bg-emerald-50/20">
                    &check; Full Scope
                  </td>
                  <td className="py-1 px-2 text-center text-slate-400 border-l border-slate-100">
                    &mdash;
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="py-1 px-3 text-slate-800 font-medium">
                    Custom Hot-Dip GI Structure (80&mu; Zinc), Civil Pedestals &amp; Rigging
                  </td>
                  <td className="py-1 px-2 text-center font-bold text-emerald-700 border-l border-slate-100 bg-emerald-50/20">
                    &check; Full Scope
                  </td>
                  <td className="py-1 px-2 text-center text-slate-400 border-l border-slate-100">
                    &mdash;
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="py-1 px-3 text-slate-800 font-medium">
                    ACDB, DCDB, 3 Chemical Earthing Pits (IS 3043) &amp; Lightning Arrester
                  </td>
                  <td className="py-1 px-2 text-center font-bold text-emerald-700 border-l border-slate-100 bg-emerald-50/20">
                    &check; Full Scope
                  </td>
                  <td className="py-1 px-2 text-center text-slate-400 border-l border-slate-100">
                    &mdash;
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="py-1 px-3 text-slate-800 font-medium">
                    State DISCOM Bi-Directional Net-Metering Documentation &amp; Approvals
                  </td>
                  <td className="py-1 px-2 text-center font-bold text-emerald-700 border-l border-slate-100 bg-emerald-50/20">
                    &check; Full Scope
                  </td>
                  <td className="py-1 px-2 text-center text-slate-400 border-l border-slate-100">
                    &mdash;
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="py-1 px-3 text-slate-800 font-medium">
                    5-Year Comprehensive Workmanship, Structural &amp; Yield AMC Guarantee
                  </td>
                  <td className="py-1 px-2 text-center font-bold text-emerald-700 border-l border-slate-100 bg-emerald-50/20">
                    &check; Full Scope
                  </td>
                  <td className="py-1 px-2 text-center text-slate-400 border-l border-slate-100">
                    &mdash;
                  </td>
                </tr>

                <tr>
                  <td className="py-1 px-3 text-slate-800 font-medium">
                    Shadow-Free Terrace Space &amp; Water Point with Hose for Panel Cleaning
                  </td>
                  <td className="py-1 px-2 text-center text-slate-400 border-l border-slate-100">
                    &mdash;
                  </td>
                  <td className="py-1 px-2 text-center font-bold text-slate-900 border-l border-slate-100 bg-slate-50/50">
                    &check; Client Scope
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. 5-YEAR COMPREHENSIVE O&M ASSURANCE                          */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <h3 className="text-[7.8pt] font-black uppercase text-slate-900 tracking-wide font-sans">
                5-YEAR COMPREHENSIVE OPERATION &amp; MAINTENANCE (O&amp;M) ASSURANCE
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[5.8pt] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              Pan-South India Service Network
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs">
              <span className="font-bold text-slate-900 text-[7pt] block">
                Biannual Health Check
              </span>
              <span className="text-slate-500 text-[5.8pt] block mt-0.5 leading-tight">
                I-V curve tracer tests &amp; thermography
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs">
              <span className="font-bold text-slate-900 text-[7pt] block">
                24/7 Telemetry Desk
              </span>
              <span className="text-slate-500 text-[5.8pt] block mt-0.5 leading-tight">
                Automated inverter fault alert system
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs">
              <span className="font-bold text-slate-900 text-[7pt] block">
                Torque Audit
              </span>
              <span className="text-slate-500 text-[5.8pt] block mt-0.5 leading-tight">
                Annual SS-304 fastener torque checks
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs">
              <span className="font-bold text-slate-900 text-[7pt] block">
                Regional Hubs
              </span>
              <span className="text-slate-500 text-[5.8pt] block mt-0.5 leading-tight">
                Hyd &bull; Vzg &bull; Vja &bull; Blr &bull; Chn
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 7. CORPORATE CONTACT & HEADQUARTERS BAR                        */}
        {/* ============================================================== */}
        <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-2xs flex items-center justify-between text-[6.8pt]">
          {/* Col 1: Headquarters */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#07132c] text-white flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="font-black text-slate-900 text-[7pt] uppercase tracking-wide block">
                Corporate Headquarters
              </span>
              <span className="text-[6.2pt] text-slate-600 block leading-tight max-w-[170px]">
                {company.address || "#6-210, Sriramnagar, Behind Auto Nagar, Warangal X Road, Khammam, Telangana - 507003"}
              </span>
            </div>
          </div>

          {/* Col 2: Phones */}
          <div className="flex items-center gap-1.5 px-2 border-l border-slate-200">
            <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <div className="text-[6.5pt] font-bold text-slate-900 leading-tight">
              <div>{company.phone1 || company.phone || "+91 93474 16140"}</div>
              <div>{company.phone2 || "+91 99124 16140"}</div>
            </div>
          </div>

          {/* Col 3: Email & Web */}
          <div className="space-y-0.5 px-2 border-l border-slate-200 text-[6.5pt]">
            <div className="flex items-center gap-1 text-slate-700">
              <Mail className="w-3 h-3 text-slate-500 shrink-0" />
              <span>{company.email || "srimaansolarsolutions@gmail.com"}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-700">
              <Globe className="w-3 h-3 text-slate-500 shrink-0" />
              <span>{company.website || "www.srimaansolarsolutions.com"}</span>
            </div>
          </div>

          {/* Col 4: Regional Hubs */}
          <div className="text-right pl-2 border-l border-slate-200 shrink-0">
            <span className="text-[5.5pt] font-black uppercase tracking-wider text-slate-400 block">
              REGIONAL NETWORK HUBS
            </span>
            <span className="font-bold text-slate-800 text-[6.5pt] block mt-0.5">
              {company.branches || "Hyderabad • Visakhapatnam • Bangalore • Vijayawada"}
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 8. OFFICIAL DIGITAL CONNECT & LOCATION PORTALS (4 QR Cards)    */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-amber-500" />
              <h3 className="text-[7.8pt] font-black uppercase text-slate-900 tracking-wide font-sans">
                OFFICIAL DIGITAL CONNECT &amp; LOCATION PORTALS
              </h3>
            </div>
            <span className="text-[6pt] text-slate-400 font-medium">
              Scan with camera to connect instantly
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {/* Card 1: Facebook */}
            <div className="border border-slate-200 rounded-xl p-1.5 bg-white shadow-2xs flex flex-col items-center justify-between text-center">
              <div className="flex items-center justify-between w-full pb-0.5 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[6pt]">
                    f
                  </span>
                  <span className="font-extrabold text-[6.8pt] text-slate-900">{settings?.qrPortals?.facebook?.title || "Facebook"}</span>
                </div>
                <span className="text-[5.2pt] font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded">
                  {settings?.qrPortals?.facebook?.badge || "Social"}
                </span>
              </div>
              <img src={settings?.qrPortals?.facebook?.image || "/assets/qr/fb-qr.jpeg"} alt="Facebook QR" className="w-14 h-14 object-contain my-1" />
              <div>
                <span className="font-bold text-[6.2pt] text-slate-800 block">{settings?.qrPortals?.facebook?.handle || "@srimaansolar"}</span>
                <span className="text-[5.5pt] text-blue-600 font-medium block">{settings?.qrPortals?.facebook?.actionText || "Scan to Follow"}</span>
              </div>
            </div>

            {/* Card 2: Instagram */}
            <div className="border border-slate-200 rounded-xl p-1.5 bg-white shadow-2xs flex flex-col items-center justify-between text-center">
              <div className="flex items-center justify-between w-full pb-0.5 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center font-bold text-[5.5pt]">
                    &bull;
                  </span>
                  <span className="font-extrabold text-[6.8pt] text-slate-900">{settings?.qrPortals?.instagram?.title || "Instagram"}</span>
                </div>
                <span className="text-[5.2pt] font-bold text-pink-700 bg-pink-50 px-1 py-0.2 rounded">
                  {settings?.qrPortals?.instagram?.badge || "Reels"}
                </span>
              </div>
              <img src={settings?.qrPortals?.instagram?.image || "/assets/qr/insta-qr.jpeg"} alt="Instagram QR" className="w-14 h-14 object-contain my-1" />
              <div>
                <span className="font-bold text-[6.2pt] text-slate-800 block">{settings?.qrPortals?.instagram?.handle || "@srimaansolar"}</span>
                <span className="text-[5.5pt] text-pink-600 font-medium block">{settings?.qrPortals?.instagram?.actionText || "Scan to View"}</span>
              </div>
            </div>

            {/* Card 3: Official Website */}
            <div className="border border-slate-200 rounded-xl p-1.5 bg-white shadow-2xs flex flex-col items-center justify-between text-center">
              <div className="flex items-center justify-between w-full pb-0.5 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-extrabold text-[6.8pt] text-slate-900">{settings?.qrPortals?.website?.title || "Official Website"}</span>
                </div>
                <span className="text-[5.2pt] font-bold text-amber-700 bg-amber-50 px-1 py-0.2 rounded">
                  {settings?.qrPortals?.website?.badge || "Portal"}
                </span>
              </div>
              <img src={settings?.qrPortals?.website?.image || "/assets/qr/web-qr.jpeg"} alt="Website QR" className="w-14 h-14 object-contain my-1" />
              <div>
                <span className="font-bold text-[6.2pt] text-slate-800 block truncate max-w-full">
                  {settings?.qrPortals?.website?.handle || "srimaansolarsolutions.com"}
                </span>
                <span className="text-[5.5pt] text-amber-600 font-medium block">{settings?.qrPortals?.website?.actionText || "Scan to Visit"}</span>
              </div>
            </div>

            {/* Card 4: Google Maps */}
            <div className="border border-slate-200 rounded-xl p-1.5 bg-white shadow-2xs flex flex-col items-center justify-between text-center">
              <div className="flex items-center justify-between w-full pb-0.5 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-extrabold text-[6.8pt] text-slate-900">{settings?.qrPortals?.googleMaps?.title || "Google Maps"}</span>
                </div>
                <span className="text-[5.2pt] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                  {settings?.qrPortals?.googleMaps?.badge || "Location"}
                </span>
              </div>
              <img src={settings?.qrPortals?.googleMaps?.image || "/assets/qr/loc-qr.jpeg"} alt="Location QR" className="w-14 h-14 object-contain my-1" />
              <div>
                <span className="font-bold text-[6.2pt] text-slate-800 block">{settings?.qrPortals?.googleMaps?.handle || "Khammam HQ"}</span>
                <span className="text-[5.5pt] text-emerald-600 font-medium block">{settings?.qrPortals?.googleMaps?.actionText || "Scan for Route"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 9. PAGE 5 FOOTER                                               */}
        {/* ============================================================== */}
        <CustomerPageFooter pageNumber={5} totalPages={5} />
      </div>
    </div>
  );
}
