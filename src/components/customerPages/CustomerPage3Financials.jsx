import React from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  Percent, 
  ShieldCheck, 
  FileText, 
  Package, 
  CheckCircle2, 
  Coins 
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageHeader from './CustomerPageHeader';
import CustomerPageFooter from './CustomerPageFooter';
import { EMBLEMS } from '../../utils/brandLogos';
import { formatNumber, formatCurrency, formatDate } from '../../utils/formatters';
import { calculateGSTBreakdown, formatINR } from '../../utils/calculations';

export default function CustomerPage3Financials({ quotation, settings }) {
  const company = settings?.company || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};

  // System capacities & financial metrics
  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.5);
  const totalGrossCost = commercials?.totalGrossCost || 318640;
  
  // Statutory 70:30 GST Breakdown for official quotation table (70% Goods @ 5% + 30% Services @ 18%)
  const gstBreakdown = calculateGSTBreakdown(totalGrossCost);
  const compositeGst = gstBreakdown.totalGst;
  const taxableSubTotal = gstBreakdown.totalBase;
  const discount = commercials?.discount || 0;
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
          title="Commercial Investment & Statutory Price Offer"
          subtitle="Turnkey EPC Schedule, Statutory 70:30 GST Bifurcation & Installation Scope"
          badgeText="OFFICIAL COMMERCIALS"
          badgeColor="emerald"
          capacityKw={dcKw}
        />

        {/* ============================================================== */}
        {/* 2. TOP SECTION: COMMERCIAL SCHEDULE & RETURN ON INVESTMENT     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* Left Card (7 Cols): COMMERCIAL INVESTMENT SCHEDULE */}
          <div className="col-span-7 border border-slate-200 rounded-xl bg-white shadow-2xs flex flex-col justify-between overflow-hidden">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                  <h3 className="text-[8pt] font-black uppercase tracking-wide text-slate-900 font-sans">
                    Commercial Investment Schedule
                  </h3>
                </div>
                <span className="text-[6.5pt] font-medium text-slate-500">
                  All figures in INR (₹)
                </span>
              </div>

              {/* Rows */}
              <div className="p-2.5 space-y-1">
                <div className="flex items-center justify-between text-[7.2pt]">
                  <span className="text-slate-700 font-medium">
                    Base Turnkey EPC Cost ({dcKw} kWp DC @ ₹{formatNumber(ratePerKw)}/kWp)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{formatNumber(baseCost)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[7.2pt]">
                  <span className="text-emerald-700 font-semibold">
                    Special Commercial Discount
                  </span>
                  <span className="font-mono font-bold text-emerald-700">
                    - ₹{formatNumber(discount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[7.2pt]">
                  <span className="text-slate-700 font-medium">
                    Taxable EPC Sub-Total
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{formatNumber(taxableSubTotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[7.2pt]">
                  <span className="text-slate-700 font-medium">
                    Statutory GST (as per MNRE 70:30 EPC norms)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{formatNumber(compositeGst)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[7.5pt] py-0.5 border-t border-slate-200">
                  <span className="font-black text-slate-900">
                    Total Gross Project Cost (Inc. Taxes)
                  </span>
                  <span className="font-mono font-black text-slate-900 text-[8.5pt]">
                    ₹{formatNumber(totalGrossCost)}
                  </span>
                </div>

                {/* PM Surya Ghar Subsidy Callout Box */}
                <div className="bg-[#fffbeb] border border-amber-200 rounded-lg p-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img 
                      src={EMBLEMS.pmSuryaGhar} 
                      alt="PM Surya Ghar" 
                      className="h-6 w-auto object-contain shrink-0" 
                    />
                    <div className="min-w-0">
                      <div className="font-black text-amber-950 text-[7pt] leading-tight">
                        PM Surya Ghar: Central Govt. Subsidy (CFA)
                      </div>
                      <div className="text-amber-800/90 text-[6pt] leading-tight">
                        Direct Benefit Transfer (DBT) credited to bank account
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-black text-amber-950 text-[10pt] shrink-0">
                    - ₹{formatNumber(subsidy)}
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Navy Bottom Banner */}
            <div className="bg-[#07132c] text-white px-3 py-1.5 flex items-center justify-between">
              <div>
                <div className="text-[7pt] font-black uppercase tracking-wider text-slate-100">
                  Net Effective Customer Investment
                </div>
                <div className="text-[6pt] text-slate-300 font-normal">
                  Actual net out-of-pocket outlay post central DBT subsidy credit
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-black text-[13pt] text-white tracking-tight leading-none">
                  ₹{formatNumber(netPayable)}
                </div>
                <div className="flex items-center justify-end gap-1 text-[6.5pt] text-teal-300 font-bold mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  Turnkey Inclusive
                </div>
              </div>
            </div>
          </div>

          {/* Right Card (5 Cols): RETURN ON INVESTMENT (ROI) */}
          <div className="col-span-5 border border-slate-200 rounded-xl bg-white p-2.5 shadow-2xs flex flex-col justify-between space-y-1.5">
            {/* Header */}
            <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <h3 className="text-[8pt] font-black uppercase tracking-wide text-slate-900 font-sans">
                Return on Investment (ROI)
              </h3>
            </div>

            {/* Metric 1: Est. Annual Savings */}
            <div className="border border-slate-200/90 rounded-lg p-1.5 bg-slate-50/40">
              <div className="text-[6.5pt] font-extrabold text-slate-500 uppercase tracking-wider">
                Est. Annual Electricity Savings
              </div>
              <div className="font-mono font-black text-emerald-600 text-[11.5pt] leading-tight my-0.5">
                ₹{formatNumber(annualSavings)} / yr
              </div>
              <div className="text-[6pt] text-slate-400 font-mono">
                ({formatNumber(annualUnits)} kWh &times; ₹{tariffRate.toFixed(1)}/kWh baseline)
              </div>
            </div>

            {/* Metric 2: Payback Period */}
            <div className="border border-slate-200/90 rounded-lg p-1.5 bg-slate-50/40">
              <div className="text-[6.5pt] font-extrabold text-slate-500 uppercase tracking-wider">
                Capital Payback Period
              </div>
              <div className="font-mono font-black text-slate-900 text-[11.5pt] leading-tight my-0.5">
                {paybackYears} Years
              </div>
              <div className="text-[6pt] text-slate-500 font-medium">
                100% Free solar energy generated post payback
              </div>
            </div>

            {/* Metric 3: 25-Yr Net Financial Profit */}
            <div className="border border-slate-200/90 rounded-lg p-1.5 bg-slate-50/40">
              <div className="flex items-center justify-between">
                <span className="text-[6.5pt] font-extrabold text-slate-500 uppercase tracking-wider">
                  25-Yr Net Financial Profit
                </span>
                <span className="text-[6pt] font-mono text-slate-400">
                  Gross: ₹{formatNumber(gross25Yr)}
                </span>
              </div>
              <div className="font-mono font-black text-amber-600 text-[11.5pt] leading-tight my-0.5">
                ₹{formatNumber(net25Yr)}
              </div>
              <div className="text-[6pt] text-slate-500 font-medium">
                Net lifetime gain post capital recovery
              </div>
            </div>

            {/* Bottom Alert/Note */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-1 text-[6pt] text-slate-600 leading-snug">
              <strong>Tax-Free Returns:</strong> Solar delivers 28% to 32% equity IRR, outperforming bank FDs and mutual funds.
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. COMPARATIVE INVESTMENT YIELD (4 Asset Classes)              */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-blue-600" />
              <h3 className="text-[8pt] font-black uppercase text-slate-900 tracking-wide font-sans">
                % Comparative Investment Yield: Rooftop Solar vs Traditional Asset Classes
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[6pt] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              Highest Risk-Adjusted ROI
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {/* Card 1: Srimaan Solar PV */}
            <div className="border-2 border-amber-300 bg-amber-50/30 rounded-xl p-2 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900 text-[7.5pt]">
                  Srimaan Solar PV
                </span>
                <span className="bg-amber-500 text-white font-black text-[5.5pt] px-1 py-0.2 rounded uppercase">
                  TOP YIELD
                </span>
              </div>
              <div className="font-black text-slate-950 text-[11pt] leading-tight my-0.5">
                {settings?.pricing?.solarIrr || "28% – 32% IRR"}
              </div>
              <div className="text-slate-600 text-[6pt] leading-tight">
                Tax-free avoided power cost &bull; Payback ~{paybackYears} Yrs
              </div>
            </div>

            {/* Card 2: Bank Fixed Deposit */}
            <div className="border border-slate-200 bg-white rounded-xl p-2 flex flex-col justify-between">
              <div className="font-extrabold text-slate-800 text-[7.5pt]">
                Bank Fixed Deposit
              </div>
              <div className="font-black text-slate-700 text-[11pt] leading-tight my-0.5">
                {settings?.pricing?.bankFdYield || "6.8% – 7.2%"}
              </div>
              <div className="text-slate-500 text-[6pt] leading-tight">
                Pre-tax interest &bull; Taxed at slab &bull; Payback 10+ Yrs
              </div>
            </div>

            {/* Card 3: Equity Mutual Funds */}
            <div className="border border-slate-200 bg-white rounded-xl p-2 flex flex-col justify-between">
              <div className="font-extrabold text-slate-800 text-[7.5pt]">
                Equity Mutual Funds
              </div>
              <div className="font-black text-slate-700 text-[11pt] leading-tight my-0.5">
                {settings?.pricing?.equityMfYield || "12% – 14%"}
              </div>
              <div className="text-slate-500 text-[6pt] leading-tight">
                Subject to market risk &bull; 12.5% LTCG &bull; Volatile
              </div>
            </div>

            {/* Card 4: Residential Property */}
            <div className="border border-slate-200 bg-white rounded-xl p-2 flex flex-col justify-between">
              <div className="font-extrabold text-slate-800 text-[7.5pt]">
                Residential Property
              </div>
              <div className="font-black text-slate-700 text-[11pt] leading-tight my-0.5">
                {settings?.pricing?.propertyYield || "2.5% – 3.2%"}
              </div>
              <div className="text-slate-500 text-[6pt] leading-tight">
                Gross rental yield &bull; Illiquid asset &bull; High upkeep
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. PRICE OFFER: STATUTORY 70:30 GST BIFURCATION TABLE         */}
        {/* ============================================================== */}
        <div className="border border-black overflow-hidden shadow-2xs rounded-xs bg-white">
          <div className="bg-[#B7D7A8] px-2.5 py-1 border-b border-black flex items-center justify-between">
            <h4 className="font-black text-slate-950 text-[7.8pt] tracking-wider uppercase flex items-center gap-1.5 underline underline-offset-2 font-sans">
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              PRICE OFFER
            </h4>
            <span className="text-[6.5pt] font-extrabold text-slate-900 bg-white/70 px-1.5 py-0.2 rounded">
              Statutory 70:30 Bifurcation (5% Goods / 18% Services)
            </span>
          </div>
          <p className="text-[6.8pt] text-gray-800 font-medium px-2 py-0.5 bg-slate-50 border-b border-black">
            Price quote for total &nbsp;Design, Engineering, Supply, Installation, Testing &amp; Commissioning of Solar Power Plant is as follows:
          </p>
          <table className="w-full text-[7.2pt] border-collapse bg-white">
            <thead>
              <tr className="border-b border-black text-slate-950 font-bold bg-slate-100">
                <th className="py-0.5 px-1 text-center border-r border-black w-8 font-bold">SL.<br />No.</th>
                <th className="py-0.5 px-2 text-left border-r border-black font-bold">Product Description</th>
                <th className="py-0.5 px-1 text-center border-r border-black w-20 font-bold">Price<br />(INR)</th>
                <th className="py-0.5 px-1 text-center border-r border-black w-14 font-bold">CGST</th>
                <th className="py-0.5 px-1 text-center border-r border-black w-14 font-bold">SGST</th>
                <th className="py-0.5 px-1.5 text-center w-24 font-bold">TOTAL<br />Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Supply of System (70% Goods @ 5% GST -> 2.5% CGST + 2.5% SGST) */}
              <tr className="border-b border-black text-slate-900">
                <td className="py-0.5 px-1 text-center font-bold border-r border-black align-middle">1</td>
                <td className="py-0.5 px-2 text-left font-semibold border-r border-black align-middle leading-tight text-[7.2pt]">
                  Supply of {dcKw}kW Grid Connected Roof Top Solar PV System
                </td>
                <td className="py-0.5 px-1 text-center font-mono font-bold border-r border-black align-middle">
                  {formatINR(gstBreakdown.goodsBase)}
                </td>
                <td className="p-0 text-center border-r border-black align-middle font-mono text-[7pt]">
                  <div className="w-full py-0.5 px-0.5 font-bold leading-tight">{formatINR(gstBreakdown.goodsCgst)}</div>
                  <div className="w-full py-0.5 px-0.5 text-[6pt] text-gray-700 font-bold border-t border-black leading-tight">2.5%</div>
                </td>
                <td className="p-0 text-center border-r border-black align-middle font-mono text-[7pt]">
                  <div className="w-full py-0.5 px-0.5 font-bold leading-tight">{formatINR(gstBreakdown.goodsSgst)}</div>
                  <div className="w-full py-0.5 px-0.5 text-[6pt] text-gray-700 font-bold border-t border-black leading-tight">2.5%</div>
                </td>
                <td className="py-0.5 px-1.5 text-center font-mono font-bold align-middle bg-slate-50/50">
                  {formatINR(gstBreakdown.goodsTotal)}
                </td>
              </tr>

              {/* Row 2: Design, Engineering, I&C (30% Services @ 18% GST -> 9% CGST + 9% SGST) */}
              <tr className="border-b border-black text-slate-900">
                <td className="py-0.5 px-1 text-center font-bold border-r border-black align-middle">2</td>
                <td className="py-0.5 px-2 text-left font-semibold border-r border-black align-middle leading-tight text-[7.2pt]">
                  Design, Engineering, I&amp;C with Testing of {dcKw}kW Solar PV System
                </td>
                <td className="py-0.5 px-1 text-center font-mono font-bold border-r border-black align-middle">
                  {formatINR(gstBreakdown.servicesBase)}
                </td>
                <td className="p-0 text-center border-r border-black align-middle font-mono text-[7pt]">
                  <div className="w-full py-0.5 px-0.5 font-bold leading-tight">{formatINR(gstBreakdown.servicesCgst)}</div>
                  <div className="w-full py-0.5 px-0.5 text-[6pt] text-gray-700 font-bold border-t border-black leading-tight">9%</div>
                </td>
                <td className="p-0 text-center border-r border-black align-middle font-mono text-[7pt]">
                  <div className="w-full py-0.5 px-0.5 font-bold leading-tight">{formatINR(gstBreakdown.servicesSgst)}</div>
                  <div className="w-full py-0.5 px-0.5 text-[6pt] text-gray-700 font-bold border-t border-black leading-tight">9%</div>
                </td>
                <td className="py-0.5 px-1.5 text-center font-mono font-bold align-middle bg-slate-50/50">
                  {formatINR(gstBreakdown.servicesTotal)}
                </td>
              </tr>

              {/* Row 3: Total amount */}
              <tr className="text-slate-950 font-bold bg-slate-50">
                <td className="py-0.5 px-1 border-r border-black"></td>
                <td className="py-0.5 px-2 text-left font-bold border-r border-black">
                  Total amount
                </td>
                <td className="py-0.5 px-1 text-center font-bold border-r border-black font-mono">
                  {formatINR(gstBreakdown.totalBase)}
                </td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="py-0.5 px-1.5 text-center font-extrabold text-black font-mono">
                  {formatINR(gstBreakdown.totalProjectCost)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================== */}
        {/* 5. SUPPLY AND CUSTOMER RESPONSIBILITIES (From Official PDF)    */}
        {/* ============================================================== */}
        <div>
          <h4 className="text-[8pt] font-extrabold text-slate-900 uppercase tracking-wide mb-1 flex items-center gap-1.5 font-sans">
            <Package className="w-3.5 h-3.5 text-blue-600" />
            Supply and Customer Responsibilities
          </h4>

          <div className="grid grid-cols-12 gap-2 text-[7pt] items-stretch">
            {/* Left: Quoted Supply (5 Cols) */}
            <div className="col-span-5 p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-slate-900 block text-[7.5pt] pb-0.5 border-b border-slate-200 mb-1">
                  Quoted Supply (Company Scope)
                </span>
                <p className="text-[7pt] text-slate-700 leading-relaxed">
                  Equipment and materials listed above, including solar modules, grid inverter, mounting structure, cabling, safety switchgear, and earthing materials.
                </p>
              </div>
              <div className="mt-1 pt-0.5 border-t border-slate-200 text-[6.5pt] text-emerald-800 font-extrabold">
                &#10003; 100% Turnkey Procurement &amp; Delivery
              </div>
            </div>

            {/* Right: Customer Scope (7 Cols - The 5 points from official PDF!) */}
            <div className="col-span-7 p-2 rounded-xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-amber-950 block text-[7.5pt] pb-0.5 border-b border-amber-200 mb-1 flex items-center justify-between">
                  <span>Customer Scope &amp; Site Provisions</span>
                  <span className="text-[6pt] text-amber-800 font-bold bg-amber-100 px-1 py-0.2 rounded">Client Obligation</span>
                </span>
                <ul className="space-y-0.5 text-[6.8pt] text-slate-700 list-disc list-inside">
                  <li><strong>Civil work and earth-pit digging</strong> at designated terrace/ground location</li>
                  <li><strong>Ladder or staircase access</strong> to the roof for workers and materials movement</li>
                  <li><strong>Water and electricity</strong> during installation, at the customer's expense</li>
                  <li><strong>Lockable storage</strong> for safe custody of materials at site</li>
                  <li><strong>Applicable load extension charges</strong> (if service load sanction is required)</li>
                </ul>
              </div>
              <div className="mt-1 pt-0.5 border-t border-amber-200 text-[6pt] text-amber-900 font-medium">
                * Note: Cleaning of solar panels advised every 10–15 days by client for maximum solar yield.
              </div>
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
