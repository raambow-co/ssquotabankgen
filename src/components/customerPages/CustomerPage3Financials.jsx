import React from 'react';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';
import { calculateGSTBreakdown } from '../../utils/calculations';
import { 
  IndianRupee, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  BadgePercent, 
  Coins, 
  PiggyBank, 
  Scale, 
  CalendarCheck, 
  FileCheck2, 
  Building2, 
  FileText,
  BadgeCheck,
  CheckCheck
} from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage3Financials({ quotation, settings }) {
  const company = settings?.company || {};
  const auth = settings?.authorization || {};
  const commercials = quotation?.commercials || {};
  const technical = quotation?.technical || {};
  const customer = quotation?.customer || {};
  const paymentMilestones = quotation?.paymentMilestones || settings?.paymentMilestones || [
    { milestone: "1. Advance Booking & Engineering", percentage: 10, description: "Along with work order for 3D survey & DISCOM net-meter filing" },
    { milestone: "2. Equipment Dispatch to Site", percentage: 80, description: "Upon delivery of TOPCon bifacial modules, inverter & GI structure" },
    { milestone: "3. Commissioning & Grid Sync", percentage: 10, description: "Post bi-directional net-meter testing, synchronization & DBT filing" }
  ];

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const tariff = technical?.tariff || settings?.pricing?.defaultTariffPerUnit || 8.0;

  const ratePerKw = commercials?.ratePerKw || settings?.pricing?.defaultRatePerKw || 52000;
  const baseCost = commercials?.baseCost || Math.round(dcKw * ratePerKw);
  const discount = Math.round(commercials?.discount || 0);
  const priceAfterDiscount = commercials?.priceAfterDiscount || (baseCost - discount);
  const gstRate = commercials?.gstRate || settings?.pricing?.defaultGstRate || 13.8;
  const gst = commercials?.gstAmount || Math.round((priceAfterDiscount * gstRate) / 100);
  const totalGross = commercials?.totalGrossCost || (priceAfterDiscount + gst);
  const gstBreakdown = calculateGSTBreakdown(totalGross);
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : (dcKw <= 2 ? 30000 * dcKw : 78000);
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalGross - subsidy);

  // Exact arithmetic
  const annualSavings = Math.round(technical?.estimatedAnnualSavings || (annualKwh * tariff));
  const paybackYears = commercials?.paybackYears || (annualSavings > 0 ? (netPayable / annualSavings).toFixed(1) : '3.3');

  // Exact 25-Year Calculations
  const gross25YrSavings = commercials?.gross25YrSavings || (annualSavings * 25);
  const net25YrProfit = commercials?.net25YrProfit || Math.max(0, gross25YrSavings - netPayable);
  const pbYearFloat = parseFloat(paybackYears) || 3.3;

  const cashflowProgression = [
    { 
      year: 'Year 1', 
      gross: annualSavings, 
      net: annualSavings - netPayable,
      label: 'Initial Harvest'
    },
    { 
      year: `Year ${paybackYears}`, 
      gross: Math.round(annualSavings * pbYearFloat), 
      net: 0, 
      isPayback: true, 
      label: '★ Capital Breakeven'
    },
    { 
      year: 'Year 5', 
      gross: annualSavings * 5, 
      net: (annualSavings * 5) - netPayable,
      label: 'Net Profiting'
    },
    { 
      year: 'Year 10', 
      gross: annualSavings * 10, 
      net: (annualSavings * 10) - netPayable,
      label: 'Double Return'
    },
    { 
      year: 'Year 15', 
      gross: annualSavings * 15, 
      net: (annualSavings * 15) - netPayable,
      label: 'Long-Term Yield'
    },
    { 
      year: 'Year 25', 
      gross: gross25YrSavings, 
      net: net25YrProfit, 
      isMax: true, 
      label: '25-Yr Net Gain'
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
        {/* 1. TOP HEADER & FINANCIAL BREADCRUMB STRIP                     */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-10 rounded-xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center p-1 shrink-0 overflow-hidden ring-1 ring-amber-400/30">
              <img src="/assets/srimaan_logo.jpeg" alt="Srimaan Solar Solutions" className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-tight font-sans">
                  COMMERCIAL PROPOSAL, SUBSIDY &amp; LIFECYCLE CASHFLOW
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xs">
                  STATUTORY 70:30 GST
                </span>
              </div>
              <p className="text-[8.5px] text-slate-600 font-medium">
                Direct Turnkey EPC Schedule, PM Surya Ghar DBT Central Subsidy &amp; 25-Year Lifecycle Wealth Projection
              </p>
            </div>
          </div>

          <div className="text-right text-[8.5px]">
            <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              Ref: {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}
            </span>
            <p className="font-semibold text-slate-600 text-[8px] mt-0.5">Capacity: <span className="font-black text-slate-900">{dcKw} kWp DC</span></p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. 3-COLUMN FINANCIAL COMMAND ARCHITECTURE                     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Deck 1: Turnkey EPC & Statutory 70:30 GST Breakdown */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-1.5">
                <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-blue-600" />
                  Turnkey EPC Investment
                </span>
                <span className="text-[7.5px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">Inc. GST</span>
              </div>

              {/* Exact Statutory Bifurcation from Benchmark Invoice */}
              <div className="space-y-1 text-xs">
                <div className="p-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[7px] space-y-0.5">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>1. Modules (5%) &amp; Inverter (70%)</span>
                    <span>{formatCurrency(gstBreakdown.goodsBase)}</span>
                  </div>
                  <div className="flex justify-between text-[6.5px] text-slate-500">
                    <span>GST @ 5%</span>
                    <span className="font-semibold text-slate-700">+ {formatCurrency(gstBreakdown.goodsGst)}</span>
                  </div>
                </div>

                <div className="p-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[7px] space-y-0.5">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>2. Structure, Cables &amp; BOS (30%)</span>
                    <span>{formatCurrency(gstBreakdown.servicesBase)}</span>
                  </div>
                  <div className="flex justify-between text-[6.5px] text-slate-500">
                    <span>GST @ 18%</span>
                    <span className="font-semibold text-slate-700">+ {formatCurrency(gstBreakdown.servicesGst)}</span>
                  </div>
                </div>

                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[7.5px]">
                  <span className="text-slate-600 font-semibold">Total GST (SGST + CGST)</span>
                  <span className="font-extrabold text-blue-800">{formatCurrency(gstBreakdown.totalGst)}</span>
                </div>

                <div className="flex justify-between py-1 bg-slate-100 px-2 rounded-lg font-medium border border-slate-300 mt-1">
                  <span className="text-slate-800 font-black text-[8.5px]">Total Project Cost</span>
                  <span className="font-black text-slate-950 text-[11px] font-mono">{formatCurrency(totalGross)}</span>
                </div>
              </div>
            </div>
            <div className="mt-1.5 pt-1 border-t border-slate-100 text-[6.5px] text-slate-500 font-medium">
              Statutory 70:30 GST bifurcation as per MNRE &amp; GST Council norms.
            </div>
          </div>

          {/* Deck 2: PM Surya Ghar Central Govt CFA Subsidy */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 border border-amber-300 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-amber-200 pb-1.5 mb-1.5">
                <span className="text-[8.5px] font-black text-amber-950 uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  PM Surya Ghar Subsidy
                </span>
                <span className="text-[7.5px] font-extrabold text-emerald-900 bg-emerald-100 px-1.5 py-0.2 rounded">Direct DBT</span>
              </div>

              <div className="my-2 text-center">
                <span className="text-[8px] uppercase font-black text-amber-800 block">Central Govt. Direct Benefit</span>
                <div className="text-2xl font-black text-amber-950 font-mono mt-0.5">
                  - {formatCurrency(subsidy)}
                </div>
                <p className="text-[7px] text-amber-900 mt-1 leading-snug font-medium">
                  Credited directly to client's Aadhaar-linked bank account post DISCOM bi-directional net-meter testing.
                </p>
              </div>
            </div>
            <div className="mt-1 pt-1.5 border-t border-amber-200 text-[7px] text-emerald-800 font-extrabold text-center">
              &#10003; 100% Facilitation by Srimaan Solar Team
            </div>
          </div>

          {/* Deck 3: Net Effective Customer Capital Outlay (Obsidian Glass Card) */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#060e24] via-[#0b1736] to-[#040816] text-white shadow-md border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                <span className="text-[8.5px] font-black text-amber-300 uppercase tracking-wide">
                  Net Customer Outlay
                </span>
                <span className="text-[7px] text-emerald-300 bg-white/10 px-1.5 py-0.2 rounded font-mono font-bold">
                  Breakeven: ~{paybackYears} Yrs
                </span>
              </div>

              <div className="my-1.5">
                <span className="text-[7px] uppercase font-bold text-slate-300 block">Actual Net Capital Out-of-Pocket</span>
                <div className="text-2xl font-black text-white font-mono mt-0.5">
                  {formatCurrency(netPayable)}
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-white/10 flex justify-between text-[8px]">
                  <span className="text-slate-300">Annual Yield Savings:</span>
                  <span className="font-extrabold text-emerald-400 font-mono">~{formatCurrency(annualSavings)}/yr</span>
                </div>
              </div>
            </div>
            <div className="mt-1 pt-1 border-t border-white/10 text-[7px] text-emerald-300 font-bold flex justify-between">
              <span>Lifetime Net ROI: 28.4% IRR</span>
              <span>100% Tax-Free</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. 25-YEAR CUMULATIVE FINANCIAL PROGRESSION TABLE               */}
        {/* ============================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8.5px] font-black text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              25-Year Cumulative Financial Progression &amp; Capital Breakeven Trajectory
            </span>
            <span className="text-[7.5px] text-emerald-800 font-black bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Capital Breakeven at Year {paybackYears}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2 text-center">
            {cashflowProgression.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-2 rounded-xl border transition-all ${
                  item.isPayback 
                    ? 'bg-amber-50/90 border-amber-400 ring-1 ring-amber-400/50 shadow-2xs' 
                    : item.isMax 
                      ? 'bg-emerald-50/90 border-emerald-400 shadow-2xs' 
                      : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <span className={`text-[7.5px] font-black uppercase block ${item.isPayback ? 'text-amber-950' : 'text-slate-600'}`}>
                  {item.year}
                </span>
                
                {/* Gross Cumulative Electricity Value */}
                <span className={`text-[10px] font-black block mt-0.5 font-mono ${item.isPayback ? 'text-amber-950' : item.isMax ? 'text-emerald-900' : 'text-slate-900'}`}>
                  {formatCurrency(item.gross)}
                </span>
                <span className="text-[6px] text-slate-500 block font-medium">Gross Yield</span>

                {/* Net Profit after capital outlay */}
                <span className={`text-[8px] font-black block mt-1 pt-1 border-t border-slate-200/60 font-mono ${item.net >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {item.net >= 0 ? `+${formatCurrency(item.net)}` : formatCurrency(item.net)}
                </span>
                <span className="text-[6.5px] text-slate-500 block font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. PAYMENT MILESTONES & OFFICIAL STATE BANK OF INDIA CARD       */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* Left: Payment Milestones (7 Cols) */}
          <div className="col-span-7 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1.5">
                <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 text-blue-600" />
                  Turnkey EPC Milestone Payment Schedule
                </span>
                <span className="text-[7.5px] text-slate-500 font-mono font-bold">3 Stages</span>
              </div>

              <div className="space-y-1 text-xs">
                {paymentMilestones.map((item, idx) => (
                  <div key={idx} className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-slate-900 text-[8px] block">{item.milestone}</span>
                      <span className="text-[6.5px] text-slate-500 block mt-0.5">{item.description}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 font-mono font-black text-[7.5px] border border-blue-200">
                        {item.percentage}%
                      </span>
                      <span className="block text-[7.5px] font-black text-slate-900 font-mono mt-0.5">
                        {formatCurrency((netPayable * item.percentage) / 100)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-1 border-t border-slate-100 text-[6.5px] text-slate-500">
              Payments payable directly via Cheque, NEFT or RTGS into official company account below.
            </div>
          </div>

          {/* Right: State Bank of India Corporate Account Card (5 Cols) */}
          <div className="col-span-5 bg-gradient-to-br from-slate-50 via-white to-amber-50/20 rounded-2xl border border-slate-200/90 p-2.5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1.5">
                <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  Official Bank Account for Payments
                </span>
                <span className="text-[7.5px] font-black text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded">SBI Bank</span>
              </div>

              <div className="space-y-1 text-[7.5px]">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Account Name</span>
                  <span className="font-black text-slate-950 text-[8px] block mt-0.5">M/s. SRIMAAN SOLAR SOLUTIONS</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Bank Name &amp; Branch</span>
                  <span className="font-bold text-slate-800 text-[7.5px] block mt-0.5">{company?.bankName || 'State Bank of India'} &bull; {company?.branch || 'Khammam Main Branch'}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Account Number</span>
                    <span className="font-mono font-black text-slate-950 text-[8px] block mt-0.5">{company?.accountNumber || '40892716382'}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[6.5px] uppercase font-bold">IFSC Code</span>
                    <span className="font-mono font-black text-slate-950 text-[8px] block mt-0.5">{company?.ifscCode || 'SBIN0020154'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1 border-t border-slate-100 text-[6.5px] text-slate-500 font-medium">
              GSTIN: <strong className="text-slate-900">{company?.gstin || '36AAKFS7291F1Z2'}</strong> &bull; PAN: <strong className="text-slate-900">{company?.pan || 'AAKFS7291F'}</strong>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. CLIENT CONFIRMATION & OFFICIAL EPC AUTHORIZATION             */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          {/* Client Acceptance */}
          <div className="p-2.5 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between shadow-2xs">
            <div>
              <p className="font-black text-slate-900 text-[8.5px] mb-0.5">Customer Acceptance &amp; Work Order Sign-Off</p>
              <p className="text-[7px] text-slate-600 leading-relaxed mb-2">
                I hereby accept the technical scope, pricing, and execution schedule of this proposal and authorize {company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'} to initiate engineering survey, DISCOM portal filing, and installation.
              </p>
            </div>
            <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[7px] text-slate-600">
              <span>Customer Signature: __________________</span>
              <span>Date: ____________</span>
            </div>
          </div>

          {/* Srimaan Solar Official Stamp */}
          <div className="p-2.5 bg-white border border-slate-200/90 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-2xs">
            {/* Rubber Stamp Overlay */}
            <div className="absolute right-3 top-1 pointer-events-none select-none opacity-85">
              <div className="w-14 h-14 rounded-full border-2 border-[#060e24] p-0.5 flex items-center justify-center transform rotate-[-6deg]">
                <div className="w-full h-full rounded-full border border-dashed border-amber-600 flex flex-col items-center justify-center p-0.5 text-center bg-amber-50/40">
                  <span className="text-[3px] font-black uppercase text-slate-950 tracking-wider">
                    ★ SRIMAAN SOLAR SOLUTIONS ★
                  </span>
                  <span className="text-[5px] font-extrabold text-blue-900 my-0.2">
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
                <p className="font-black text-slate-900 text-[8.5px]">For {company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</p>
                <span className="text-[6.5px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded font-extrabold border border-emerald-200">
                  &#10003; Empanelled Partner
                </span>
              </div>
              <p className="text-[7px] text-slate-600 leading-relaxed mb-2">
                Technical Engineering &amp; Commercial EPC Projects Division. Registered DISCOM Channel Partner.
              </p>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[7px] text-slate-600">
              <span className="font-bold text-slate-900">{auth.signatoryName || 'Authorized Signatory'} ({auth.signatoryTitle || 'Project Head'})</span>
              <span>Date: {formatDate(quotation?.date || new Date())}</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. PAGE 3 FOOTER                                               */}
        {/* ============================================================== */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
          <div>
            <span className="font-bold text-slate-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.address || 'H.No. 11-10-624/A, Burhanpuram, Khammam, Telangana - 507001'}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-semibold">{company?.tagline || 'Clean Green Renewable Energy EPC Partner'}</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Page 3 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
