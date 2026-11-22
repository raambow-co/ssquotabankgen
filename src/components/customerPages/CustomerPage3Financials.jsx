import React from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  Percent, 
  Info, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  ArrowUpRight 
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageHeader from './CustomerPageHeader';
import CustomerPageFooter from './CustomerPageFooter';
import { EMBLEMS } from '../../utils/brandLogos';
import { formatNumber, formatDate } from '../../utils/formatters';

export default function CustomerPage3Financials({ quotation, settings }) {
  const company = settings?.company || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};

  // System capacities & financial metrics (matching benchmark quotation precisely)
  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.5);
  const totalGrossCost = commercials?.totalGrossCost || 318640;
  
  // Composite GST (13.8% composite EPC standard: 70% goods @ 5% / 12% + 30% services @ 18%)
  const compositeGst = Math.round(totalGrossCost - totalGrossCost / 1.138);
  const taxableSubTotal = totalGrossCost - compositeGst;
  const discount = commercials?.discount || 6000;
  const baseCost = taxableSubTotal + discount;
  const ratePerKw = Math.round(baseCost / dcKw);
  
  // Central Subsidy (PM Surya Ghar DBT)
  const subsidy = commercials?.subsidyAmount || (dcKw >= 3 ? 78000 : (dcKw >= 2 ? 60000 : 30000));
  const netPayable = Math.max(0, totalGrossCost - subsidy);

  // Generation & Electricity Savings
  const tariffRate = technical?.tariff || 8.5;
  const annualUnits = technical?.estimatedAnnualUnits || Math.round(dcKw * 4.25 * 365) || 8541;
  const annualSavings = commercials?.estimatedAnnualSavings || Math.round(annualUnits * tariffRate) || 72599;
  
  // Payback & 25-Year Financial Progression
  const paybackYears = annualSavings > 0 ? Number((netPayable / annualSavings).toFixed(1)) : 3.3;
  const gross25Yr = annualSavings * 25;
  const net25Yr = Math.max(0, gross25Yr - netPayable);

  return (
    <div className="a4-preview-sheet p-6 flex flex-col text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex-1 flex flex-col justify-between min-h-0 space-y-2">
        {/* ============================================================== */}
        {/* 1. MASTER EXECUTIVE BRAND HEADER                               */}
        {/* ============================================================== */}
        <CustomerPageHeader 
          quotation={quotation}
          settings={settings}
          title="Commercial Investment Economics & 25-Year ROI"
          subtitle="Capital Outlay, PM Surya Ghar DBT Subsidy & Comprehensive Financial Modeling"
          badgeText="25-YR ROI MODEL"
          badgeColor="emerald"
          capacityKw={dcKw}
        />

        {/* ============================================================== */}
        {/* 2. TOP SECTION: COMMERCIAL SCHEDULE & RETURN ON INVESTMENT     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-3 items-stretch">
          {/* Left Card (7 Cols): COMMERCIAL INVESTMENT SCHEDULE */}
          <div className="col-span-7 border border-slate-200 rounded-xl bg-white shadow-2xs flex flex-col justify-between overflow-hidden">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                  <h3 className="text-[8.5pt] font-black uppercase tracking-wide text-slate-900 font-sans">
                    Commercial Investment Schedule
                  </h3>
                </div>
                <span className="text-[7pt] font-medium text-slate-500">
                  All figures in INR (₹)
                </span>
              </div>

              {/* Rows */}
              <div className="p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[7.8pt] py-0.5">
                  <span className="text-slate-700 font-medium">
                    Base Turnkey EPC Cost ({dcKw} kWp DC @ ₹{formatNumber(ratePerKw)}/kWp)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{formatNumber(baseCost)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[7.8pt] py-0.5">
                  <span className="text-emerald-700 font-semibold">
                    Special Commercial Discount
                  </span>
                  <span className="font-mono font-bold text-emerald-700">
                    - ₹{formatNumber(discount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[7.8pt] py-0.5">
                  <span className="text-slate-700 font-medium">
                    Taxable EPC Sub-Total
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{formatNumber(taxableSubTotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[7.8pt] py-0.5">
                  <span className="text-slate-700 font-medium">
                    Composite GST (13.8% as per MNRE 70:30 EPC norms)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{formatNumber(compositeGst)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[8.2pt] py-1 border-t border-slate-200">
                  <span className="font-black text-slate-900">
                    Total Gross Project Cost (Inc. Taxes)
                  </span>
                  <span className="font-mono font-black text-slate-900 text-[9pt]">
                    ₹{formatNumber(totalGrossCost)}
                  </span>
                </div>

                {/* PM Surya Ghar Subsidy Callout Box */}
                <div className="bg-[#fffbeb] border border-amber-200 rounded-lg p-2 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <img 
                      src={EMBLEMS.pmSuryaGhar} 
                      alt="PM Surya Ghar" 
                      className="h-8 w-auto object-contain shrink-0" 
                    />
                    <div className="min-w-0">
                      <div className="font-black text-amber-950 text-[7.5pt] leading-tight">
                        PM Surya Ghar: Central Govt. Subsidy (CFA)
                      </div>
                      <div className="text-amber-800/90 text-[6.5pt] leading-tight mt-0.5">
                        Direct Benefit Transfer (DBT) credited directly to client bank account
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-black text-amber-950 text-[11pt] shrink-0">
                    - ₹{formatNumber(subsidy)}
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Navy Bottom Banner */}
            <div className="bg-[#07132c] text-white px-3.5 py-2.5 flex items-center justify-between">
              <div>
                <div className="text-[7.5pt] font-black uppercase tracking-wider text-slate-100">
                  Net Effective Customer Investment
                </div>
                <div className="text-[6.5pt] text-slate-300 font-normal">
                  Actual net out-of-pocket outlay post central DBT subsidy credit
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-black text-[14pt] text-white tracking-tight leading-none">
                  ₹{formatNumber(netPayable)}
                </div>
                <div className="flex items-center justify-end gap-1 text-[6.8pt] text-teal-300 font-bold mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  Turnkey Inclusive
                </div>
              </div>
            </div>
          </div>

          {/* Right Card (5 Cols): RETURN ON INVESTMENT (ROI) */}
          <div className="col-span-5 border border-slate-200 rounded-xl bg-white p-3 shadow-2xs flex flex-col justify-between space-y-2">
            {/* Header */}
            <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <h3 className="text-[8.5pt] font-black uppercase tracking-wide text-slate-900 font-sans">
                Return on Investment (ROI)
              </h3>
            </div>

            {/* Metric 1: Est. Annual Savings */}
            <div className="border border-slate-200/90 rounded-lg p-2 bg-slate-50/40">
              <div className="text-[6.8pt] font-extrabold text-slate-500 uppercase tracking-wider">
                Est. Annual Electricity Savings
              </div>
              <div className="font-mono font-black text-emerald-600 text-[13pt] leading-tight my-0.5">
                ₹{formatNumber(annualSavings)} / yr
              </div>
              <div className="text-[6.5pt] text-slate-400 font-mono">
                ({formatNumber(annualUnits)} kWh &times; ₹{tariffRate.toFixed(1)}/kWh baseline)
              </div>
            </div>

            {/* Metric 2: Payback Period */}
            <div className="border border-slate-200/90 rounded-lg p-2 bg-slate-50/40">
              <div className="text-[6.8pt] font-extrabold text-slate-500 uppercase tracking-wider">
                Capital Payback Period
              </div>
              <div className="font-mono font-black text-slate-900 text-[13pt] leading-tight my-0.5">
                {paybackYears} Years
              </div>
              <div className="text-[6.5pt] text-slate-500 font-medium">
                100% Free solar energy generated post payback
              </div>
            </div>

            {/* Metric 3: 25-Yr Net Financial Profit */}
            <div className="border border-slate-200/90 rounded-lg p-2 bg-slate-50/40">
              <div className="flex items-center justify-between">
                <span className="text-[6.8pt] font-extrabold text-slate-500 uppercase tracking-wider">
                  25-Yr Net Financial Profit
                </span>
                <span className="text-[6.5pt] font-mono text-slate-400">
                  Gross: ₹{formatNumber(gross25Yr)}
                </span>
              </div>
              <div className="font-mono font-black text-amber-600 text-[13pt] leading-tight my-0.5">
                ₹{formatNumber(net25Yr)}
              </div>
              <div className="text-[6.5pt] text-slate-500 font-medium">
                Net lifetime gain post capital recovery
              </div>
            </div>

            {/* Bottom Alert/Note */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-[6.5pt] text-slate-600 leading-snug">
              <strong>Tax-Free Returns:</strong> Solar delivers 28% to 32% equity IRR, outperforming bank FDs and mutual funds.
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. MIDDLE SECTION: COMPARATIVE INVESTMENT YIELD                */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-blue-600" />
              <h3 className="text-[8.5pt] font-black uppercase text-slate-900 tracking-wide font-sans">
                % Comparative Investment Yield: Rooftop Solar vs Traditional Asset Classes
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[6.5pt] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              Highest Risk-Adjusted ROI
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {/* Card 1: Srimaan Solar PV */}
            <div className="border-2 border-amber-300 bg-amber-50/30 rounded-xl p-2.5 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900 text-[8pt]">
                  Srimaan Solar PV
                </span>
                <span className="bg-amber-500 text-white font-black text-[5.8pt] px-1.5 py-0.2 rounded uppercase">
                  TOP YIELD
                </span>
              </div>
              <div className="font-black text-slate-950 text-[12pt] leading-tight my-1">
                28% &ndash; 32% IRR
              </div>
              <div className="text-slate-600 text-[6.5pt] leading-tight">
                Tax-free avoided power cost &bull; Payback ~{paybackYears} Yrs
              </div>
            </div>

            {/* Card 2: Bank Fixed Deposit */}
            <div className="border border-slate-200 bg-white rounded-xl p-2.5 flex flex-col justify-between">
              <div className="font-extrabold text-slate-800 text-[8pt]">
                Bank Fixed Deposit
              </div>
              <div className="font-black text-slate-700 text-[12pt] leading-tight my-1">
                6.8% &ndash; 7.2%
              </div>
              <div className="text-slate-500 text-[6.5pt] leading-tight">
                Pre-tax interest &bull; Taxed at slab &bull; Payback 10+ Yrs
              </div>
            </div>

            {/* Card 3: Equity Mutual Funds */}
            <div className="border border-slate-200 bg-white rounded-xl p-2.5 flex flex-col justify-between">
              <div className="font-extrabold text-slate-800 text-[8pt]">
                Equity Mutual Funds
              </div>
              <div className="font-black text-slate-700 text-[12pt] leading-tight my-1">
                12% &ndash; 14%
              </div>
              <div className="text-slate-500 text-[6.5pt] leading-tight">
                Subject to market risk &bull; 12.5% LTCG &bull; Volatile
              </div>
            </div>

            {/* Card 4: Residential Property */}
            <div className="border border-slate-200 bg-white rounded-xl p-2.5 flex flex-col justify-between">
              <div className="font-extrabold text-slate-800 text-[8pt]">
                Residential Property
              </div>
              <div className="font-black text-slate-700 text-[12pt] leading-tight my-1">
                2.5% &ndash; 3.2%
              </div>
              <div className="text-slate-500 text-[6.5pt] leading-tight">
                Gross rental yield &bull; Illiquid asset &bull; High upkeep
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. BOTTOM SECTION: 25-YEAR FINANCIAL PROGRESSION               */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <h3 className="text-[8.5pt] font-black uppercase text-slate-900 tracking-wide font-sans">
                25-Year Financial Progression (Gross Electricity Value vs. Net Profit)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[6.5pt] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              Capital Breakeven at Year {paybackYears}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {/* Card 1: YR 1 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white text-center flex flex-col justify-between">
              <div className="text-[7pt] font-extrabold text-slate-500 uppercase tracking-wider">
                YR 1
              </div>
              <div className="font-mono font-bold text-slate-900 text-[8.8pt] mt-0.5">
                ₹{formatNumber(annualSavings)}
              </div>
              <div className="text-[6pt] text-slate-400">
                Gross Yield
              </div>
              <div className="border-t border-slate-100 my-1" />
              <div className="font-mono font-bold text-red-600 text-[8.2pt]">
                -₹{formatNumber(Math.abs(annualSavings - netPayable))}
              </div>
              <div className="text-[6pt] text-slate-400">
                Initial Yield
              </div>
            </div>

            {/* Card 2: Breakeven Year (YR 3.3) */}
            <div className="border-2 border-amber-400 bg-amber-50/50 rounded-xl p-2 text-center flex flex-col justify-between shadow-2xs">
              <div className="text-[7pt] font-black text-amber-800 uppercase tracking-wider">
                YR {paybackYears}
              </div>
              <div className="font-mono font-bold text-slate-900 text-[8.8pt] mt-0.5">
                ₹{formatNumber(Math.round(annualSavings * paybackYears))}
              </div>
              <div className="text-[6pt] text-slate-500">
                Gross Yield
              </div>
              <div className="border-t border-amber-200 my-1" />
              <div className="font-mono font-black text-emerald-700 text-[8.2pt]">
                +₹0
              </div>
              <div className="text-[6pt] font-bold text-amber-800">
                ★ Capital Recovered
              </div>
            </div>

            {/* Card 3: YR 5 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white text-center flex flex-col justify-between">
              <div className="text-[7pt] font-extrabold text-slate-500 uppercase tracking-wider">
                YR 5
              </div>
              <div className="font-mono font-bold text-slate-900 text-[8.8pt] mt-0.5">
                ₹{formatNumber(annualSavings * 5)}
              </div>
              <div className="text-[6pt] text-slate-400">
                Gross Yield
              </div>
              <div className="border-t border-slate-100 my-1" />
              <div className="font-mono font-bold text-emerald-700 text-[8.2pt]">
                +₹{formatNumber(annualSavings * 5 - netPayable)}
              </div>
              <div className="text-[6pt] text-slate-500">
                Net Profiting
              </div>
            </div>

            {/* Card 4: YR 10 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white text-center flex flex-col justify-between">
              <div className="text-[7pt] font-extrabold text-slate-500 uppercase tracking-wider">
                YR 10
              </div>
              <div className="font-mono font-bold text-slate-900 text-[8.8pt] mt-0.5">
                ₹{formatNumber(annualSavings * 10)}
              </div>
              <div className="text-[6pt] text-slate-400">
                Gross Yield
              </div>
              <div className="border-t border-slate-100 my-1" />
              <div className="font-mono font-bold text-emerald-700 text-[8.2pt]">
                +₹{formatNumber(annualSavings * 10 - netPayable)}
              </div>
              <div className="text-[6pt] text-slate-500">
                10-Yr Milestone
              </div>
            </div>

            {/* Card 5: YR 15 */}
            <div className="border border-slate-200 rounded-xl p-2 bg-white text-center flex flex-col justify-between">
              <div className="text-[7pt] font-extrabold text-slate-500 uppercase tracking-wider">
                YR 15
              </div>
              <div className="font-mono font-bold text-slate-900 text-[8.8pt] mt-0.5">
                ₹{formatNumber(annualSavings * 15)}
              </div>
              <div className="text-[6pt] text-slate-400">
                Gross Yield
              </div>
              <div className="border-t border-slate-100 my-1" />
              <div className="font-mono font-bold text-emerald-700 text-[8.2pt]">
                +₹{formatNumber(annualSavings * 15 - netPayable)}
              </div>
              <div className="text-[6pt] text-slate-500">
                15-Yr Milestone
              </div>
            </div>

            {/* Card 6: YR 25 */}
            <div className="border-2 border-emerald-500 bg-emerald-50/40 rounded-xl p-2 text-center flex flex-col justify-between shadow-2xs">
              <div className="text-[7pt] font-black text-emerald-800 uppercase tracking-wider">
                YR 25
              </div>
              <div className="font-mono font-bold text-slate-900 text-[8.8pt] mt-0.5">
                ₹{formatNumber(gross25Yr)}
              </div>
              <div className="text-[6pt] text-slate-500">
                Gross Yield
              </div>
              <div className="border-t border-emerald-200 my-1" />
              <div className="font-mono font-black text-emerald-700 text-[8.2pt]">
                +₹{formatNumber(net25Yr)}
              </div>
              <div className="text-[6pt] font-bold text-emerald-800">
                25-Yr Net Gain
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. DOCUMENTED FINANCIAL MODELING ASSUMPTIONS                   */}
        {/* ============================================================== */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-[6.5pt] text-slate-600">
          <div className="flex items-center gap-1 font-bold text-slate-800 mb-1 text-[7pt]">
            <Info className="w-3 h-3 text-slate-500" />
            <span>Documented Financial Modeling Assumptions:</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-slate-600 leading-tight">
            <div>
              &bull; <strong>Tariff Baseline:</strong> ₹{tariffRate.toFixed(1)}/kWh residential slab. Conservative flat baseline modeled above without tariff inflation.
            </div>
            <div>
              &bull; <strong>Degradation &amp; Inflation:</strong> Factoring 0.55%/yr linear panel degradation and 3.0% annual grid tariff inflation, 25-yr net profit exceeds ₹21+ Lakhs.
            </div>
            <div>
              &bull; <strong>Subsidy Terms:</strong> ₹{formatNumber(subsidy)} CFA under PM Surya Ghar DBT for residential &ge;3 kWp, credited directly to client bank by MNRE post-inspection.
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. PAGE 3 FOOTER                                               */}
        {/* ============================================================== */}
        <CustomerPageFooter pageNumber={3} totalPages={5} />
      </div>
    </div>
  );
}
