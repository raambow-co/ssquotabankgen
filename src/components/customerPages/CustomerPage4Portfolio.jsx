import React from 'react';
import { 
  ShieldCheck, 
  Coins, 
  Truck, 
  Building2, 
  Zap, 
  SunMedium, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  CalendarCheck, 
  Clock, 
  Award, 
  FileText 
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageHeader from './CustomerPageHeader';
import CustomerPageFooter from './CustomerPageFooter';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';

export default function CustomerPage4Portfolio({ quotation, settings }) {
  const company = settings?.company || {};
  const auth = settings?.authorization || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const acKw = parseFloat(technical?.acInverterCapacityKw || (dcKw <= 3 ? 3.6 : (dcKw * 1.2).toFixed(1)));
  const totalCost = commercials?.totalGrossCost || 318640;
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : (dcKw >= 3 ? 78000 : (dcKw >= 2 ? 60000 : 30000));
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalCost - subsidy);

  // Technical Annexure Metrics (Transferred from previous Page 5)
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365) || 8541;
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));
  const monthlyKwh = Math.round(annualKwh / 12);
  const minArea = Math.round(dcKw * 70);
  const maxArea = Math.round(dcKw * 100);

  const mAdvance = Number(settings?.warranties?.milestoneAdvance || 20);
  const mDispatch = Number(settings?.warranties?.milestoneDispatch || 70);
  const mInstall = Number(settings?.warranties?.milestoneInstallation || 10);
  const bank2 = settings?.bank2 || {};

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
          title="Payment Terms, Technical Annexure & Acceptance"
          subtitle="Milestone Disbursement Schedule, System Configuration & Bilateral Agreement"
          badgeText="20 : 70 : 10 SLA"
          badgeColor="emerald"
          capacityKw={dcKw}
        />

        {/* ============================================================== */}
        {/* 2. TECHNICAL ANNEXURE & ESTIMATED GENERATION (From Page 5)     */}
        {/* ============================================================== */}
        <div className="border border-slate-200/90 rounded-xl p-2 bg-white shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between pb-0.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <h3 className="text-[7.8pt] font-black text-slate-900 uppercase tracking-wide font-sans">
                Technical Annexure &bull; Grid-Interactive Flow &amp; Sizing
              </h3>
            </div>
            <span className="text-[6pt] text-slate-500 font-medium">
              Bi-Directional Net-Metering Architecture
            </span>
          </div>

          {/* Clean 4-Node Flow Schematic */}
          <div className="p-1 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-center text-[6.5pt]">
            <div className="flex-1 p-0.5 bg-white rounded border border-slate-200 shadow-2xs">
              <SunMedium className="w-3 h-3 text-blue-600 mx-auto" />
              <strong className="block text-slate-900 text-[6.8pt]">Solar Panels</strong>
              <span className="text-[5.5pt] text-slate-500">DC Generation</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-400 mx-1 shrink-0" />
            <div className="flex-1 p-0.5 bg-white rounded border border-slate-200 shadow-2xs">
              <Cpu className="w-3 h-3 text-amber-600 mx-auto" />
              <strong className="block text-slate-900 text-[6.8pt]">Grid Inverter</strong>
              <span className="text-[5.5pt] text-slate-500">AC Conversion</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-400 mx-1 shrink-0" />
            <div className="flex-1 p-0.5 bg-white rounded border border-slate-200 shadow-2xs">
              <Layers className="w-3 h-3 text-emerald-600 mx-auto" />
              <strong className="block text-slate-900 text-[6.8pt]">Bi-Directional Meter</strong>
              <span className="text-[5.5pt] text-slate-500">Net Import/Export</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-400 mx-1 shrink-0" />
            <div className="flex-1 p-0.5 bg-white rounded border border-slate-200 shadow-2xs">
              <Building2 className="w-3 h-3 text-purple-600 mx-auto" />
              <strong className="block text-slate-900 text-[6.8pt]">Property &amp; Grid</strong>
              <span className="text-[5.5pt] text-slate-500">Zero Bill Power</span>
            </div>
          </div>

          {/* System Configuration & Estimated Generation Split (Two Columns) */}
          <div className="grid grid-cols-12 gap-2 text-[6.5pt]">
            {/* System Configuration (6 Cols) */}
            <div className="col-span-6 p-1.5 rounded-lg bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[7pt] font-black text-slate-900 uppercase tracking-wide block pb-0.5 border-b border-slate-200 mb-1">
                  System Configuration
                </span>
                <div className="space-y-0.5 text-[6.5pt]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Solar Array:</span>
                    <strong className="text-slate-900">{dcKw} kWp Tier-1 TOPCon Bifacial</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">On-Grid Inverter:</span>
                    <strong className="text-slate-900">{acKw} kW AC Multi-MPPT Smart Wi-Fi</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shade-Free Roof Area:</span>
                    <strong className="text-slate-900">Approx. {minArea}&ndash;{maxArea} Sq.Ft</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Generation Table (6 Cols) */}
            <div className="col-span-6 p-1.5 rounded-lg bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[7pt] font-black text-slate-900 uppercase tracking-wide block pb-0.5 border-b border-slate-200 mb-1">
                  Estimated Generation
                </span>
                <div className="space-y-0.5 text-[6.5pt]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Average Daily:</span>
                    <strong className="font-mono font-bold text-slate-900">~{dailyKwh} kWh / day</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Average Monthly:</span>
                    <strong className="font-mono font-bold text-slate-900">~{monthlyKwh} kWh / month</strong>
                  </div>
                  <div className="flex justify-between text-emerald-800 font-bold bg-emerald-50/80 px-1 py-0.2 rounded">
                    <span>Annual Generation:</span>
                    <span className="font-mono font-black">~{formatNumber(annualKwh)} kWh / year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. PAYMENT MILESTONES (Exact 20% / 70% / 10% from Official PDF) */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Coins className="w-3.5 h-3.5 text-blue-600" />
            <h3 className="text-[7.8pt] font-black text-slate-900 tracking-wide uppercase font-sans">
              Payment Terms &amp; Milestones ({mAdvance} : {mDispatch} : {mInstall})
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Advance */}
            <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-blue-900 font-mono block">{mAdvance}%</span>
                <span className="text-[7.5pt] font-extrabold text-slate-900 uppercase tracking-wide block mt-0.5">
                  Advance with purchase order
                </span>
                <p className="text-[6pt] text-slate-500 mt-0.5 leading-tight">
                  Along with work order sign-off to initiate engineering survey &amp; DISCOM net-meter filing.
                </p>
              </div>
              <div className="mt-1 pt-1 border-t border-slate-100 font-mono font-black text-blue-950 text-[8pt]">
                {formatCurrency(netPayable * (mAdvance / 100))}
              </div>
            </div>

            {/* Before Dispatch */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-300 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-slate-900 font-mono block">{mDispatch}%</span>
                <span className="text-[7.5pt] font-extrabold text-slate-900 uppercase tracking-wide block mt-0.5">
                  Before dispatch of materials
                </span>
                <p className="text-[6pt] text-slate-500 mt-0.5 leading-tight">
                  Upon readiness of Tier-1 solar modules, inverter, structure and balance of materials.
                </p>
              </div>
              <div className="mt-1 pt-1 border-t border-slate-200 font-mono font-black text-slate-950 text-[8pt]">
                {formatCurrency(netPayable * (mDispatch / 100))}
              </div>
            </div>

            {/* At Installation */}
            <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-300 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-emerald-800 font-mono block">{mInstall}%</span>
                <span className="text-[7.5pt] font-extrabold text-emerald-950 uppercase tracking-wide block mt-0.5">
                  At installation
                </span>
                <p className="text-[6pt] text-emerald-900 mt-0.5 leading-tight">
                  Upon completion of mechanical &amp; electrical rooftop installation at site.
                </p>
              </div>
              <div className="mt-1 pt-1 border-t border-emerald-200 font-mono font-black text-emerald-950 text-[8pt]">
                {formatCurrency(netPayable * (mInstall / 100))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. DELIVERY & COMMISSIONING + WARRANTIES (Two Columns)         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 gap-2 text-[6.8pt]">
          {/* Delivery & Commissioning */}
          <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[7.5pt] font-black text-slate-900 uppercase tracking-wide pb-1 border-b border-slate-100 mb-1">
                <Truck className="w-3 h-3 text-amber-600" />
                <span>Delivery and Commissioning</span>
              </div>
              <div className="space-y-1 text-slate-600 leading-snug">
                <div>
                  <strong className="text-slate-900 block text-[7pt]">Delivery Timeline:</strong>
                  Materials will be delivered to site after receipt of <strong>{mAdvance + mDispatch}% of total project cost</strong>.
                </div>
                <div>
                  <strong className="text-slate-900 block text-[7pt]">Plant Commissioning:</strong>
                  Commissioned after DISCOM net-metering synchronization within <strong>30 days of installation</strong>.
                </div>
              </div>
            </div>
          </div>

          {/* Warranties & Site Terms */}
          <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[7.5pt] font-black text-slate-900 uppercase tracking-wide pb-1 border-b border-slate-100 mb-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Warranty &amp; Site Terms</span>
              </div>
              <div className="space-y-0.5 text-slate-600 leading-tight text-[6.5pt]">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800">PV Modules:</span>
                  <span className="text-slate-700">{settings?.warranties?.modulePerformance || "25-Yr Linear Power Output (≤0.55%/yr)"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800">Inverter:</span>
                  <span className="text-slate-700">{settings?.warranties?.inverter || "7-Year Comprehensive Warranty"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800">Workmanship:</span>
                  <span className="text-slate-700">{settings?.warranties?.workmanshipAmc || "5-Year Turnkey EPC & Yield Assurance"}</span>
                </div>
                <div className="text-[6pt] text-slate-500 pt-0.5 border-t border-slate-100 mt-0.5">
                  Advance payment constitutes official acceptance. Orders are non-cancellable once executed.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. OFFICIAL STATE BANK OF INDIA PAYMENT CARD                    */}
        {/* ============================================================== */}
        <div className="p-2 rounded-xl bg-gradient-to-br from-slate-50 via-white to-amber-50/20 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-0.5 border-b border-slate-200 mb-1">
            <span className="text-[7.5pt] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5 font-sans">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              Official Bank Account for Payments
            </span>
            <span className="text-[6.5pt] font-black text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded">
              {bank2.bankName || "SBI Corporate Account"}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-[7pt]">
            <div className="p-1 rounded bg-white border border-slate-200">
              <span className="text-slate-400 block text-[5.8pt] uppercase font-bold">Account Name</span>
              <strong className="text-slate-950 text-[7pt] block truncate">
                {bank2.accountName || company.legalName || "M/s. SRIMAAN SOLAR SOLUTIONS"}
              </strong>
            </div>
            <div className="p-1 rounded bg-white border border-slate-200">
              <span className="text-slate-400 block text-[5.8pt] uppercase font-bold">Bank &amp; Branch</span>
              <strong className="text-slate-800 text-[7pt] block truncate">
                {bank2.bankName || "State Bank of India"} &bull; {bank2.branch || "Khammam"}
              </strong>
            </div>
            <div className="p-1 rounded bg-white border border-slate-200">
              <span className="text-slate-400 block text-[5.8pt] uppercase font-bold">Account Number</span>
              <strong className="text-slate-950 font-mono text-[7pt] block">
                {bank2.accountNumber || "44813579950"}
              </strong>
            </div>
            <div className="p-1 rounded bg-white border border-slate-200">
              <span className="text-slate-400 block text-[5.8pt] uppercase font-bold">IFSC Code</span>
              <strong className="text-slate-950 font-mono text-[7pt] block">
                {bank2.ifscCode || "SBIN0065049"}
              </strong>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. ACCEPTANCE & BILATERAL AUTHORIZATION                        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 gap-2 text-[6.8pt]">
          {/* Customer Acceptance */}
          <div className="p-2 bg-white border border-slate-200/90 rounded-xl flex flex-col justify-between shadow-2xs">
            <div>
              <p className="font-black text-slate-900 text-[7.5pt] mb-0.5">Acceptance</p>
              <p className="text-[6.2pt] text-slate-600 leading-snug mb-2">
                I hereby accept the technical scope, payment terms, and delivery conditions of this quotation and confirm formal placement of the turnkey order.
              </p>
            </div>
            <div className="border-t border-dashed border-slate-300 pt-1 flex justify-between text-[6.5pt] text-slate-600">
              <span>Customer signature: ______________________</span>
              <span>Date: __________</span>
            </div>
          </div>

          {/* Srimaan Solar Official Signatory & Stamp */}
          <div className="p-2 bg-white border border-slate-200/90 rounded-xl relative overflow-hidden flex flex-col justify-between shadow-2xs">
            {/* Rubber Stamp Overlay */}
            <div className="absolute right-2 top-0.5 pointer-events-none select-none opacity-85">
              <div className="w-11 h-11 rounded-full border-2 border-[#060e24] p-0.5 flex items-center justify-center transform rotate-[-6deg]">
                <div className="w-full h-full rounded-full border border-dashed border-amber-600 flex flex-col items-center justify-center p-0.5 text-center bg-amber-50/40">
                  <span className="text-[2.8pt] font-black uppercase text-slate-950 tracking-wider">
                    ★ SRIMAAN SOLAR SOLUTIONS ★
                  </span>
                  <span className="text-[4pt] font-extrabold text-blue-900 my-0.2">
                    AUTHORIZED
                  </span>
                  <span className="text-[2.8pt] font-bold uppercase text-emerald-800 tracking-wider">
                    TECHNICAL EPC
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-0.5">
                <p className="font-black text-slate-900 text-[7.5pt]">For Srimaan Solar Solutions</p>
                <span className="text-[5.5pt] text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded font-extrabold border border-emerald-200">
                  &#10003; Empanelled Partner
                </span>
              </div>
              <p className="text-[6.2pt] text-slate-600 leading-snug mb-1.5">
                Technical Engineering &amp; Commercial EPC Projects Division. Registered Channel Partner.
              </p>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-1 flex justify-between text-[6.5pt] text-slate-600">
              <span className="font-bold text-slate-900">{auth.signatoryName || 'T. Ravindra Chary'} (Managing Director)</span>
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
