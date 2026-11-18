import React from 'react';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';
import { 
  IndianRupee, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  DollarSign, 
  Percent, 
  Award, 
  BadgePercent, 
  ArrowUpRight,
  Coins,
  PiggyBank,
  CheckCheck,
  Scale,
  CalendarCheck,
  FileCheck2,
  Zap,
  Building,
  FileText
} from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage3Financials({ quotation, settings }) {
  const company = settings?.company || {};
  const auth = settings?.authorization || {};
  const commercials = quotation?.commercials || {};
  const technical = quotation?.technical || {};
  const customer = quotation?.customer || {};
  const paymentMilestones = quotation?.paymentMilestones || settings?.paymentMilestones || [];

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
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : (dcKw <= 2 ? 30000 * dcKw : 78000);
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalGross - subsidy);

  // Exact arithmetic: annualKwh * tariff
  const annualSavings = Math.round(technical?.estimatedAnnualSavings || (annualKwh * tariff));
  const paybackYears = commercials?.paybackYears || (annualSavings > 0 ? (netPayable / annualSavings).toFixed(1) : '3.3');

  // Exact 25-Year Calculations:
  const gross25YrSavings = commercials?.gross25YrSavings || (annualSavings * 25);
  const net25YrProfit = commercials?.net25YrProfit || Math.max(0, gross25YrSavings - netPayable);

  const pbYearFloat = parseFloat(paybackYears) || 3.3;
  const cashflowProgression = [
    { 
      year: 'Yr 1', 
      gross: annualSavings, 
      net: annualSavings - netPayable,
      label: 'Initial Yield'
    },
    { 
      year: `Yr ${paybackYears}`, 
      gross: Math.round(annualSavings * pbYearFloat), 
      net: 0, 
      isPayback: true, 
      label: '★ Capital Recovered'
    },
    { 
      year: 'Yr 5', 
      gross: annualSavings * 5, 
      net: (annualSavings * 5) - netPayable,
      label: 'Net Profiting'
    },
    { 
      year: 'Yr 10', 
      gross: annualSavings * 10, 
      net: (annualSavings * 10) - netPayable,
      label: 'Double Return'
    },
    { 
      year: 'Yr 15', 
      gross: annualSavings * 15, 
      net: (annualSavings * 15) - netPayable,
      label: '15-Yr Wealth'
    },
    { 
      year: 'Yr 25', 
      gross: gross25YrSavings, 
      net: net25YrProfit, 
      isMax: true, 
      label: '25-Yr Net Gain'
    }
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
              <div className="w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img src="/assets/srimaan_logo.jpeg" alt="SRIMAAN SOLAR" className="w-full h-full object-contain" />
              </div>
              <div className="border-l border-slate-300 pl-3">
                <p className="text-xs font-black text-brand-900 tracking-tight uppercase flex items-center gap-2">
                  <span>COMMERCIAL PROPOSAL &amp; FINANCIAL ECONOMICS</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-sky-200">
                    Transparent EPC Pricing
                  </span>
                </p>
                <p className="text-[9px] text-slate-500">
                  Direct EPC Turnkey Schedule, PM Surya Ghar DBT Central Subsidy &amp; 25-Year Lifecycle ROI
                </p>
              </div>
            </div>
            
            <div className="text-right text-[9px] text-slate-500">
              <span className="font-mono font-bold text-brand-900">Ref: {quotation?.quotationNumber || 'SSS-SOL-2026-0001'}</span>
              <p className="font-medium text-slate-600">Capacity: <span className="font-bold text-brand-900">{dcKw} kWp DC</span></p>
            </div>
          </div>

          {/* ============================================================== */}
          {/* DUAL INVESTMENT ARCHITECTURE                                    */}
          {/* ============================================================== */}
          <div className="grid grid-cols-12 gap-3">
            {/* PILLAR 1: GROSS TURNKEY EPC CAPITAL SCHEDULE (6 COLS) */}
            <div className="col-span-6 bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-1.5">
                  <span className="text-[9.5px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-sky-600" />
                    Turnkey EPC Investment Schedule
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 font-semibold">INR (₹)</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                    <span className="text-slate-600 text-[10px]">Base Turnkey EPC Cost ({dcKw} kWp @ {formatCurrency(ratePerKw)}/kWp)</span>
                    <span className="font-bold text-slate-800 text-[10px]">{formatCurrency(baseCost)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center py-0.5 border-b border-slate-100 text-eco-700 bg-eco-50/60 px-2 rounded-lg">
                      <span className="font-semibold text-[10px] flex items-center gap-1">
                        <BadgePercent className="w-3 h-3 text-eco-600" />
                        Special Commercial Discount
                      </span>
                      <span className="font-extrabold text-[10px]">- {formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                    <span className="text-slate-600 text-[10px]">Taxable EPC Sub-Total</span>
                    <span className="font-bold text-slate-800 text-[10px]">{formatCurrency(priceAfterDiscount)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                    <span className="text-slate-600 text-[10px]">Composite GST ({gstRate}% per MNRE 70:30 norms)</span>
                    <span className="font-bold text-slate-800 text-[10px]">{formatCurrency(gst)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 bg-slate-50 px-2.5 rounded-xl font-medium border border-slate-200/80 mt-1">
                    <span className="text-slate-700 font-bold text-[10.5px]">Total Gross Project Cost (Inc. Taxes)</span>
                    <span className="font-black text-brand-900 text-xs">{formatCurrency(totalGross)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-1.5 text-[7px] text-slate-400 border-t border-slate-100 mt-1 flex items-center justify-between">
                <span>Inclusive of freight, insurance, 3-pit earthing &amp; DISCOM inspection.</span>
                <span className="text-eco-600 font-bold">&#10003; Turnkey EPC</span>
              </div>
            </div>

            {/* PILLAR 2: PM SURYA GHAR SUBSIDY & NET INVESTMENT (6 COLS) */}
            <div className="col-span-6 flex flex-col justify-between gap-2">
              {/* Central CFA Subsidy Card */}
              {subsidy > 0 && (
                <div className="p-2.5 rounded-2xl bg-gradient-to-r from-solar-subtle via-amber-50 to-solar-subtle border-2 border-solar-border shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={EMBLEMS.pmSuryaGhar} 
                      alt="PM Surya Ghar" 
                      className="h-9 object-contain shrink-0" 
                    />
                    <div>
                      <span className="text-[9.5px] font-black text-amber-950 uppercase block">
                        PM Surya Ghar: Central Govt. CFA
                      </span>
                      <span className="text-[7.5px] text-amber-800 font-medium block">
                        Direct Benefit Transfer (DBT) directly to client bank
                      </span>
                      <span className="text-[7px] text-eco-700 font-bold mt-0.5 block">
                        &#10003; 100% Facilitation by Srimaan Solar Team
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-solar-amber block">
                      - {formatCurrency(subsidy)}
                    </span>
                    <span className="text-[6.5px] text-amber-700 font-bold uppercase block">
                      Central Subsidy
                    </span>
                  </div>
                </div>
              )}

              {/* Net Customer Outlay Card */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-brand-950 via-brand-900 to-sky-950 text-white shadow-card flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />

                <div>
                  <span className="text-[8.5px] uppercase font-black tracking-wider text-sky-300 block">
                    Net Effective Customer Outlay
                  </span>
                  <span className="text-[7.5px] text-slate-300 block mt-0.5">
                    Actual net out-of-pocket investment post central subsidy credit
                  </span>
                  <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[7px] text-eco-300 font-bold">
                    <span>Payback Period: ~{paybackYears} Years</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xl font-black text-white tracking-tight block">
                    {formatCurrency(netPayable)}
                  </span>
                  <span className="text-[7.5px] text-eco-400 font-bold block">
                    &#10003; Turnkey Inclusive
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* COMPARATIVE FINANCIAL YIELD BENCHMARK                          */}
          {/* ============================================================== */}
          <div className="p-2 bg-gradient-to-r from-slate-50 via-sky-50/30 to-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-sky-600" />
                Asset Class Benchmark: Rooftop Solar vs Traditional Financial Instruments
              </span>
              <span className="text-[7.5px] text-eco-700 bg-eco-50 px-2 py-0.5 rounded-full font-bold border border-eco-200">
                Highest Risk-Adjusted ROI
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[7.5px]">
              {/* Asset 1: Solar */}
              <div className="bg-white p-2 rounded-xl border-2 border-sky-400 shadow-xs relative overflow-hidden">
                <span className="absolute top-1 right-1 bg-gradient-to-r from-solar-orange to-solar-amber text-white text-[6px] font-black px-1.5 py-0.2 rounded uppercase">
                  Top Yield
                </span>
                <p className="font-black text-brand-900 text-[9px]">Srimaan Solar PV</p>
                <p className="text-eco-600 font-black text-xs mt-0.5">28% – 32% IRR</p>
                <p className="text-slate-500 text-[6.5px] mt-0.5 leading-tight">100% Tax-free avoided bill &bull; Payback ~{paybackYears} Yrs</p>
              </div>

              {/* Asset 2: FD */}
              <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                <p className="font-bold text-slate-800 text-[8.5px]">Bank Fixed Deposit</p>
                <p className="text-slate-700 font-bold text-xs mt-0.5">6.8% – 7.2%</p>
                <p className="text-slate-500 text-[6.5px] mt-0.5 leading-tight">Taxed at slab &bull; Payback 10+ Yrs &bull; Inflation loss</p>
              </div>

              {/* Asset 3: Mutual Funds */}
              <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                <p className="font-bold text-slate-800 text-[8.5px]">Equity Mutual Funds</p>
                <p className="text-slate-700 font-bold text-xs mt-0.5">12% – 14%</p>
                <p className="text-slate-500 text-[6.5px] mt-0.5 leading-tight">Subject to market risk &bull; 12.5% LTCG tax &bull; Volatile</p>
              </div>

              {/* Asset 4: Real Estate */}
              <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                <p className="font-bold text-slate-800 text-[8.5px]">Residential Property</p>
                <p className="text-slate-700 font-bold text-xs mt-0.5">2.5% – 3.2%</p>
                <p className="text-slate-500 text-[6.5px] mt-0.5 leading-tight">Low rental yield &bull; Highly illiquid &bull; High upkeep</p>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 25-YEAR CUMULATIVE FINANCIAL PROGRESSION                       */}
          {/* ============================================================== */}
          <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-black text-brand-900 flex items-center gap-1.5 uppercase tracking-wide">
                <TrendingUp className="w-3.5 h-3.5 text-eco-600" />
                25-Year Cumulative Financial Progression (Gross Yield vs. Net Lifetime Profit)
              </span>
              <span className="text-[7.5px] text-eco-700 font-bold bg-eco-50 px-2 py-0.5 rounded-full border border-eco-200">
                Breakeven at Year {paybackYears}
              </span>
            </div>

            <div className="grid grid-cols-6 gap-1.5 text-center">
              {cashflowProgression.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-1.5 rounded-xl border transition-all ${
                    item.isPayback 
                      ? 'bg-solar-subtle border-solar-border ring-1 ring-solar-border shadow-2xs' 
                      : item.isMax 
                        ? 'bg-eco-50/80 border-eco-200 shadow-2xs' 
                        : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <span className={`text-[7.5px] font-black uppercase block ${item.isPayback ? 'text-amber-900' : 'text-slate-500'}`}>
                    {item.year}
                  </span>
                  
                  {/* Gross Cumulative Electricity Value */}
                  <span className={`text-[9px] font-black block mt-0.5 ${item.isPayback ? 'text-amber-950' : item.isMax ? 'text-eco-800' : 'text-slate-800'}`}>
                    {formatCurrency(item.gross)}
                  </span>
                  <span className="text-[6px] text-slate-500 block font-medium">Gross Yield</span>

                  {/* Net Profit after capital outlay */}
                  <span className={`text-[7.5px] font-extrabold block mt-0.5 pt-0.5 border-t border-slate-200/60 ${item.net >= 0 ? 'text-eco-600' : 'text-rose-600'}`}>
                    {item.net >= 0 ? `+${formatCurrency(item.net)}` : formatCurrency(item.net)}
                  </span>
                  <span className="text-[6px] text-slate-400 block font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* MILESTONE PAYMENT SCHEDULE PIPELINE                            */}
          {/* ============================================================== */}
          <div>
            <h4 className="text-[9px] font-black text-brand-900 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <CalendarCheck className="w-3.5 h-3.5 text-sky-600" />
              Standard Milestone Payment Schedule
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {paymentMilestones.map((item, idx) => (
                <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800 mb-0.5">
                    <span className="text-[8.5px] font-extrabold truncate text-brand-900">{item.milestone}</span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-900 text-[7.5px] font-black border border-sky-200 shrink-0">
                      {item.percentage}%
                    </span>
                  </div>
                  <p className="text-[7px] text-slate-500 leading-tight">{item.description}</p>
                  <p className="text-[8px] font-black text-slate-900 mt-1 pt-1 border-t border-slate-100 flex justify-between">
                    <span>Payable:</span>
                    <span className="text-brand-900">{formatCurrency((netPayable * item.percentage) / 100)}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* STATUTORY COMMERCIAL TERMS & EXECUTION CONDITIONS              */}
          {/* ============================================================== */}
          <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-black text-brand-900 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                Commercial Terms &amp; Execution Conditions
              </span>
              <span className="text-[7px] text-slate-400 font-mono">Srimaan EPC Standard Terms</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[7px] text-slate-600 leading-tight">
              <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                <strong className="text-slate-800 block text-[7.5px] mb-0.5">1. Proposal Validity</strong>
                This commercial proposal is valid for 30 calendar days from date of issuance. Rates subject to revision thereafter.
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                <strong className="text-slate-800 block text-[7.5px] mb-0.5">2. Central Subsidy DBT</strong>
                PM Surya Ghar CFA subsidy is credited directly to the client's Aadhaar-linked bank account post meter inspection.
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                <strong className="text-slate-800 block text-[7.5px] mb-0.5">3. DISCOM Liaison</strong>
                All application filing, feasibility inspection, bi-directional meter testing, and CEIG approvals are executed by Srimaan Solar Solutions.
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                <strong className="text-slate-800 block text-[7.5px] mb-0.5">4. Delivery Timeline</strong>
                Hardware dispatch within 7 days of advance; complete civil mounting and electrical commissioning within 15 working days.
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                <strong className="text-slate-800 block text-[7.5px] mb-0.5">5. Site Readiness</strong>
                Client provides shadow-free terrace access, water supply point for cleaning, and single/3-phase power for rigging tools.
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                <strong className="text-slate-800 block text-[7.5px] mb-0.5">6. Statutory Compliance</strong>
                All installations strictly follow CEIG, MNRE ALMM guidelines, IS 3043 grounding, and state net-metering regulations.
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* AUTHORIZATION & CORPORATE RUBBER STAMP                         */}
          {/* ============================================================== */}
          <div className="pt-1 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Client Acceptance */}
              <div className="p-2.5 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-xs">
                <div>
                  <p className="font-bold text-slate-800 text-[9.5px] mb-0.5">Customer Confirmation &amp; Acceptance</p>
                  <p className="text-[7.5px] text-slate-500 leading-relaxed mb-2.5">
                    I hereby accept the technical and commercial terms of this proposal and authorize {company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'} to initiate engineering survey, DISCOM portal filing, and installation.
                  </p>
                </div>
                <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[7.5px] text-slate-600">
                  <span>Customer Signature: __________________</span>
                  <span>Date: ____________</span>
                </div>
              </div>

              {/* Srimaan Official Authorization with Dual-Ring Stamp */}
              <div className="p-2.5 bg-white border border-slate-200 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-xs">
                {/* Official Rubber Stamp Vector Overlay */}
                <div className="absolute right-3 top-1 pointer-events-none select-none opacity-85">
                  <div className="w-16 h-16 rounded-full border-2 border-brand-900/80 p-0.5 flex items-center justify-center transform rotate-[-8deg]">
                    <div className="w-full h-full rounded-full border border-dashed border-sky-600/80 flex flex-col items-center justify-center p-1 text-center bg-brand-50/50">
                      <span className="text-[3.5px] font-black uppercase text-brand-900 tracking-wider">
                        {auth.stampTop || '★ SRIMAAN SOLAR SOLUTIONS ★'}
                      </span>
                      <span className="text-[5.5px] font-extrabold text-sky-700 my-0.2">
                        {auth.stampCenter || 'AUTHORIZED'}
                      </span>
                      <span className="text-[3.5px] font-bold uppercase text-eco-700 tracking-wider">
                        {auth.stampBottom || 'TECHNICAL EPC DIVISION'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-bold text-slate-800 text-[9.5px]">For {company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</p>
                    <span className="text-[7px] text-eco-700 bg-eco-50 px-1.5 py-0.2 rounded font-bold border border-eco-200">
                      &#10003; {auth.approvedBadge || 'Approved & Verified'}
                    </span>
                  </div>
                  <p className="text-[7.5px] text-slate-500 leading-relaxed mb-2.5">
                    {auth.division || 'Technical Engineering & Commercial Projects Division'}. Registered DISCOM Partner.
                  </p>
                </div>

                <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[7.5px] text-slate-600">
                  <span className="font-bold text-brand-900">{auth.signatoryName || 'Authorized Signatory'} ({auth.signatoryTitle || 'Project Head'})</span>
                  <span>Date: {formatDate(quotation?.date || new Date())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <div>
            <span className="font-bold text-brand-900">{company.legalName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}</span> &bull; {company?.tagline || 'Clean Green Renewable Energy EPC Partner'}
          </div>
          <div className="flex items-center gap-4">
            <span>Prices inclusive of standard delivery, testing &amp; DISCOM liaison</span>
            <span className="font-bold text-brand-900 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Page 3 of 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
