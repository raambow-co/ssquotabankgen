import React from 'react';
import { 
  ShieldCheck, 
  CalendarCheck, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Coins, 
  Sparkles,
  FileCheck2,
  FileText,
  AlertCircle,
  Award
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageHeader from './CustomerPageHeader';
import CustomerPageFooter from './CustomerPageFooter';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function CustomerPage4Portfolio({ quotation, settings }) {
  const company = settings?.company || {};
  const auth = settings?.authorization || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};
  const customer = quotation?.customer || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const totalCost = commercials?.totalGrossCost || 0;
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : 78000;
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalCost - subsidy);

  return (
    <div className="a4-preview-sheet p-6 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2.5">
        {/* ============================================================== */}
        {/* 1. MASTER EXECUTIVE BRAND HEADER                               */}
        {/* ============================================================== */}
        <CustomerPageHeader 
          quotation={quotation}
          settings={settings}
          title="Payment, Delivery and Warranty"
          subtitle="Milestone Disbursement Schedule, Site Logistics & Statutory Warranties"
          badgeText="20 : 70 : 10 SLA"
          badgeColor="emerald"
          capacityKw={dcKw}
        />

        {/* ============================================================== */}
        {/* 2. PAYMENT MILESTONES (Exact 20% / 70% / 10% from Official PDF) */}
        {/* ============================================================== */}
        <div>
          <h3 className="text-[10px] font-black text-slate-900 tracking-wide uppercase mb-1.5 flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-blue-600" />
            Payment Terms &amp; Milestones
          </h3>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            {/* 20% Advance */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-blue-900 font-mono block">20%</span>
                <span className="text-[8.5px] font-extrabold text-slate-900 uppercase tracking-wide block mt-1">
                  Advance with purchase order
                </span>
                <p className="text-[7px] text-slate-500 mt-1 leading-snug">
                  Along with work order sign-off to initiate engineering survey &amp; DISCOM net-meter filing.
                </p>
              </div>
              <div className="mt-2 pt-1 border-t border-slate-100 font-mono font-black text-blue-950 text-[9px]">
                {formatCurrency(netPayable * 0.20)}
              </div>
            </div>

            {/* 70% Before Dispatch */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-300 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900 font-mono block">70%</span>
                <span className="text-[8.5px] font-extrabold text-slate-900 uppercase tracking-wide block mt-1">
                  Before dispatch of materials
                </span>
                <p className="text-[7px] text-slate-500 mt-1 leading-snug">
                  Upon readiness of Tier-1 solar modules, inverter, structure and balance of materials.
                </p>
              </div>
              <div className="mt-2 pt-1 border-t border-slate-200 font-mono font-black text-slate-950 text-[9px]">
                {formatCurrency(netPayable * 0.70)}
              </div>
            </div>

            {/* 10% At Installation */}
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-emerald-800 font-mono block">10%</span>
                <span className="text-[8.5px] font-extrabold text-emerald-950 uppercase tracking-wide block mt-1">
                  At installation
                </span>
                <p className="text-[7px] text-emerald-900 mt-1 leading-snug">
                  Upon completion of mechanical &amp; electrical rooftop installation at site.
                </p>
              </div>
              <div className="mt-2 pt-1 border-t border-emerald-200 font-mono font-black text-emerald-950 text-[9px]">
                {formatCurrency(netPayable * 0.10)}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. DELIVERY AND COMMISSIONING (From Official PDF)               */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-amber-600" />
            Delivery and Commissioning
          </h4>

          <div className="grid grid-cols-2 gap-2 text-[7.5px]">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="font-extrabold text-slate-900 block text-[8px] mb-0.5">Delivery Timeline</span>
              <p className="text-slate-600 leading-relaxed">
                Materials will be delivered to the site after receipt of <strong>90% of the total project cost</strong>.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="font-extrabold text-slate-900 block text-[8px] mb-0.5">Plant Commissioning</span>
              <p className="text-slate-600 leading-relaxed">
                The system will be commissioned after net metering is completed. The estimated timeline is <strong>30 days from installation</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. WARRANTY AND SITE TERMS (From Official PDF)                  */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Warranty and Site Terms
          </h4>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-[7.5px]">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="w-1/4 p-1.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                    PV modules
                  </td>
                  <td className="p-1.5 text-slate-700 font-semibold">
                    25-year output power warranty (Linear degradation &le;0.55%/yr)
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="w-1/4 p-1.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                    Inverter
                  </td>
                  <td className="p-1.5 text-slate-700 font-semibold">
                    7-year manufacturer's warranty
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="w-1/4 p-1.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                    Site terms
                  </td>
                  <td className="p-1.5 text-slate-700">
                    The customer handles local installation issues, including those involving labour unions or local groups. Surplus materials remain the vendor's property.
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 p-1.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                    Order terms
                  </td>
                  <td className="p-1.5 text-slate-700">
                    Advance payment constitutes acceptance. Orders cannot be cancelled once placed.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. OFFICIAL STATE BANK OF INDIA PAYMENT CARD                    */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-amber-50/20 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200 mb-1">
            <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              Official Bank Account for Payments
            </span>
            <span className="text-[7px] font-black text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded">
              SBI Corporate Account
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-[7.5px]">
            <div className="p-1 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-400 block text-[6px] uppercase font-bold">Account Name</span>
              <strong className="text-slate-950 text-[7.5px] block truncate">M/s. SRIMAAN SOLAR SOLUTIONS</strong>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-400 block text-[6px] uppercase font-bold">Bank &amp; Branch</span>
              <strong className="text-slate-800 text-[7.5px] block truncate">State Bank of India &bull; Khammam</strong>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-400 block text-[6px] uppercase font-bold">Account Number</span>
              <strong className="text-slate-950 font-mono text-[7.5px] block">40892716382</strong>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-400 block text-[6px] uppercase font-bold">IFSC Code</span>
              <strong className="text-slate-950 font-mono text-[7.5px] block">SBIN0020154</strong>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. ACCEPTANCE & BILATERAL AUTHORIZATION (From Official PDF)    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          {/* Customer Acceptance */}
          <div className="p-2.5 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between shadow-2xs">
            <div>
              <p className="font-black text-slate-900 text-[8.5px] mb-0.5">Acceptance</p>
              <p className="text-[7px] text-slate-600 leading-snug mb-2">
                I hereby accept the technical scope, payment terms, and delivery conditions of this quotation and confirm formal placement of the turnkey order.
              </p>
            </div>
            <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[7px] text-slate-600">
              <span>Customer signature: __________________________</span>
              <span>Date: ______________</span>
            </div>
          </div>

          {/* Srimaan Solar Official Signatory & Stamp */}
          <div className="p-2.5 bg-white border border-slate-200/90 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-2xs">
            {/* Rubber Stamp Overlay */}
            <div className="absolute right-3 top-1 pointer-events-none select-none opacity-85">
              <div className="w-12 h-12 rounded-full border-2 border-[#060e24] p-0.5 flex items-center justify-center transform rotate-[-6deg]">
                <div className="w-full h-full rounded-full border border-dashed border-amber-600 flex flex-col items-center justify-center p-0.5 text-center bg-amber-50/40">
                  <span className="text-[3px] font-black uppercase text-slate-950 tracking-wider">
                    ★ SRIMAAN SOLAR SOLUTIONS ★
                  </span>
                  <span className="text-[4.5px] font-extrabold text-blue-900 my-0.2">
                    AUTHORIZED
                  </span>
                  <span className="text-[3px] font-bold uppercase text-emerald-800 tracking-wider">
                    TECHNICAL EPC
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-0.5">
                <p className="font-black text-slate-900 text-[8.5px]">For Srimaan Solar Solutions</p>
                <span className="text-[6px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded font-extrabold border border-emerald-200">
                  &#10003; Empanelled Partner
                </span>
              </div>
              <p className="text-[7px] text-slate-600 leading-snug mb-2">
                Technical Engineering &amp; Commercial EPC Projects Division. Registered Channel Partner.
              </p>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[7px] text-slate-600">
              <span className="font-bold text-slate-900">{auth.signatoryName || 'K. Murali Krishna'} (Managing Director)</span>
              <span>Date: {formatDate(quotation?.date || new Date())}</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 7. PAGE 4 FOOTER                                               */}
        {/* ============================================================== */}
        <CustomerPageFooter pageNumber={4} totalPages={5} />
      </div>
    </div>
  );
}
