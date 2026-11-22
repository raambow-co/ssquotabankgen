import React from 'react';
import { PageHeader, PageFooter } from './PageHeader';
import { formatINR, formatINRDecimal, calculateGSTBreakdown } from '../utils/calculations';

export const Page6 = ({ data }) => {
  const { company, bank, bank2, system, pricing, customer } = data;
  const capacity = system?.capacityKw || 5;

  const bankAccount1 = bank || {
    accountName: "SRIMAAN SOLAR SOLUTIONS",
    accountNo: "50200095253784",
    ifscCode: "HDFC0001631",
    bankName: "HDFC BANK"
  };
  const bankAccount2 = bank2 || {
    accountName: "SRIMAAN SOLAR SOLUTIONS",
    accountNo: "44813579950",
    ifscCode: "SBIN0065049",
    bankName: "STATE BANK OF INDIA"
  };

  const bankCost = pricing.bankCost || pricing.totalCost;
  const subsidyDisplay = pricing.subsidyAmount;
  const subsidyFormatted = formatINR(pricing.subsidyAmount);
  const afterSubsidyDisplay = formatINR(Math.max(0, bankCost - (pricing.subsidyAmount || 0)));
  const savingsDisplay = pricing.annualSavings ? formatINR(pricing.annualSavings) : "";

  // GST Calculation Breakdown based on statutory Solar EPC rules for Bank PO:
  // 70% Goods (Modules & Inverter) @ 5% GST
  // 30% Services & BOS @ 18% GST
  const gst = calculateGSTBreakdown(bankCost);

  return (
    <div className="a4-page page-6 flex flex-col justify-start">
      <PageHeader />

      <div className="page-content px-8 pt-2 pb-3 flex-1 flex flex-col justify-between">
        <div>
          {/* PRICE OFFER TABLE (Statutory EPC GST Bifurcation) */}
          <div className="price-offer-section my-1 text-left">
            <h4 className="font-black text-[#c2410c] text-sm tracking-wide uppercase underline underline-offset-4 mb-1">
              PRICE OFFER
            </h4>
            <p className="text-[8.5pt] text-gray-800 font-medium mb-1.5 leading-snug">
              Price quote for total &nbsp;Design, Engineering, Supply, Installation, Testing&amp; Commissioning of Solar Power Plant is as follows:
            </p>

            <div className="border border-black overflow-hidden shadow-xs">
              <table className="w-full text-[8pt] border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-black text-gray-900 font-bold">
                    <th className="py-1 px-1.5 text-center border-r border-black w-10 font-bold">SL.<br />No.</th>
                    <th className="py-1 px-2.5 text-left border-r border-black font-bold">Product Description</th>
                    <th className="py-1 px-2 text-center border-r border-black w-24 font-bold">Price<br />(INR)</th>
                    <th className="py-1 px-2 text-center border-r border-black w-16 font-bold">CGST</th>
                    <th className="py-1 px-2 text-center border-r border-black w-16 font-bold">SGST</th>
                    <th className="py-1 px-2 text-center w-24 font-bold">TOTAL<br />Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: Supply of System (70% Goods @ 5% GST -> 2.5% CGST + 2.5% SGST) */}
                  <tr className="border-b border-black text-gray-900">
                    <td className="py-1.5 px-1.5 text-center font-bold border-r border-black align-middle">1</td>
                    <td className="py-1.5 px-2.5 text-left font-semibold border-r border-black align-middle leading-tight">
                      Supply of {capacity}kW Grid Connected Roof Top Solar PV System
                    </td>
                    <td className="py-1.5 px-2 text-center font-bold border-r border-black align-middle font-mono">
                      {gst.goodsBase}
                    </td>
                    <td className="p-0 text-center border-r border-black align-middle font-mono text-[8pt]">
                      <div className="w-full py-1 px-1 font-bold leading-tight">{gst.goodsCgst}</div>
                      <div className="w-full py-0.5 px-1 text-[7pt] text-gray-700 font-bold border-t border-black leading-tight">2.5%</div>
                    </td>
                    <td className="p-0 text-center border-r border-black align-middle font-mono text-[8pt]">
                      <div className="w-full py-1 px-1 font-bold leading-tight">{gst.goodsSgst}</div>
                      <div className="w-full py-0.5 px-1 text-[7pt] text-gray-700 font-bold border-t border-black leading-tight">2.5%</div>
                    </td>
                    <td className="py-1.5 px-2 text-center font-bold align-middle font-mono">
                      {gst.goodsTotal}
                    </td>
                  </tr>

                  {/* Row 2: Design, Engineering, I&C (30% Services @ 18% GST -> 9% CGST + 9% SGST) */}
                  <tr className="border-b border-black text-gray-900">
                    <td className="py-1.5 px-1.5 text-center font-bold border-r border-black align-middle">2</td>
                    <td className="py-1.5 px-2.5 text-left font-semibold border-r border-black align-middle leading-tight">
                      Design, Engineering, I&amp;C with Testing of {capacity}kw Solar PV System
                    </td>
                    <td className="py-1.5 px-2 text-center font-bold border-r border-black align-middle font-mono">
                      {gst.servicesBase}
                    </td>
                    <td className="p-0 text-center border-r border-black align-middle font-mono text-[8pt]">
                      <div className="w-full py-1 px-1 font-bold leading-tight">{gst.servicesCgst}</div>
                      <div className="w-full py-0.5 px-1 text-[7pt] text-gray-700 font-bold border-t border-black leading-tight">9%</div>
                    </td>
                    <td className="p-0 text-center border-r border-black align-middle font-mono text-[8pt]">
                      <div className="w-full py-1 px-1 font-bold leading-tight">{gst.servicesSgst}</div>
                      <div className="w-full py-0.5 px-1 text-[7pt] text-gray-700 font-bold border-t border-black leading-tight">9%</div>
                    </td>
                    <td className="py-1.5 px-2 text-center font-bold align-middle font-mono">
                      {gst.servicesTotal}
                    </td>
                  </tr>

                  {/* Row 3: Total amount */}
                  <tr className="text-gray-900 font-bold bg-slate-50/60">
                    <td className="py-1.5 px-1.5 border-r border-black"></td>
                    <td className="py-1.5 px-2.5 text-left font-bold border-r border-black">
                      Total amount
                    </td>
                    <td className="py-1.5 px-2 text-center font-bold border-r border-black font-mono">
                      {gst.totalBase}
                    </td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="py-1.5 px-2 text-center font-extrabold text-black font-mono">
                      {gst.totalProjectCost}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payback Analysis Table */}
          <div className="payback-table-wrapper border border-black my-2 max-w-xl mx-auto shadow-xs">
            <div className="payback-heading text-center py-1 border-b border-black bg-slate-50">
              <h4 className="font-extrabold text-gray-900 text-sm tracking-wide">
                Payback Analysis
              </h4>
            </div>

            <table className="w-full text-xs border-collapse">
              <tbody>
                <tr className="border-b border-black">
                  <td className="p-1.5 font-bold text-gray-900 border-r border-black w-2/3">Proposed Capacity</td>
                  <td className="p-1.5 font-bold text-center border-r border-black w-20">{capacity}</td>
                  <td className="p-1.5 font-bold text-center w-28">Kw</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 font-bold text-gray-900 border-r border-black">Average Per Day Production</td>
                  <td className="p-1.5 font-bold text-center border-r border-black">{system.energyPerDay || (capacity * 4)}</td>
                  <td className="p-1.5 font-bold text-center">Unit</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 font-bold text-gray-900 border-r border-black">Energy Generation per Annum</td>
                  <td className="p-1.5 font-bold text-center border-r border-black">{system.energyPerYear || (capacity * 1200)}</td>
                  <td className="p-1.5 font-bold text-center">KWh/Annum</td>
                </tr>

                {/* Empty separator row */}
                <tr className="border-b border-black h-3 bg-slate-50/30">
                  <td className="border-r border-black"></td>
                  <td className="border-r border-black"></td>
                  <td></td>
                </tr>

                <tr className="border-b border-black">
                  <td className="p-1.5 font-bold text-gray-900 border-r border-black">Energy Savings/Year</td>
                  <td className="p-1.5 font-bold text-center border-r border-black">{savingsDisplay}</td>
                  <td className="p-1.5 font-bold text-center">INR</td>
                </tr>
                <tr className="border-b border-black bg-emerald-50/20">
                  <td className="p-1.5 font-bold text-gray-900 border-r border-black">Project Cost After Subsidy</td>
                  <td className="p-1.5 font-bold text-center border-r border-black">{afterSubsidyDisplay}</td>
                  <td className="p-1.5 font-bold text-center">INR</td>
                </tr>
                <tr className="bg-amber-50/20">
                  <td className="p-1.5 font-bold text-gray-900 border-r border-black">Pay-Back = Project cost / Annual Saving</td>
                  <td className="p-1.5 font-extrabold text-center border-r border-black text-amber-800">{pricing.paybackYears}</td>
                  <td className="p-1.5 font-bold text-center">Years</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Notes and Government Portal Guideline */}
          <div className="mt-2 mb-2 text-[8pt] text-gray-900 leading-relaxed text-justify p-2 bg-slate-50/60 rounded border border-slate-200">
            <p className="font-medium">
              <span className="font-extrabold text-black">Note : </span>
              The Customer needs to register through the PM Surya Ghar National Portal to claim the central financial assistance. The indicated Subsidy (<span className="font-bold text-black">Rs. {subsidyFormatted}/-</span>) amount is tentative and can be modified by the Government of India / MNRE at any time. The concerned documents along with a scanned copy of a cancelled bank cheque are to be uploaded after installation of the Solar System. Then the eligible Subsidy will directly be credited via DBT to the customer’s bank account from the Government of India. (Electricity consumer service connection must be under <span className="font-bold">{customer?.category || "Domestic Category"}</span>).
            </p>
          </div>

          {/* GST Clause & PO Terms */}
          <div className="space-y-1 text-xs text-gray-900 my-1.5">
            <p className="font-bold text-slate-900">• GST is Included in the Total Project Cost as per the statutory calculation table above.</p>
            <p className="font-bold leading-tight text-slate-900 text-xs">
              Purchase Order (PO) is to be issued in the favor of:&nbsp;
              <span className="text-[#006699] font-extrabold text-[10.5pt]">M/s. SRIMAAN SOLAR SOLUTIONS</span>
            </p>
          </div>

          {/* Bank Payment Terms (Green Box) */}
          <div className="bank-details-box mt-2 p-2.5 border-2 border-emerald-600 rounded-xs bg-emerald-50/30 text-xs shadow-2xs">
            <p className="font-extrabold text-gray-900 mb-1.5 tracking-wide text-xs">
              Payment Terms: Account details for NEFT / RTGS / IMPS
            </p>
            <div className="grid grid-cols-2 gap-3 text-left">
              {/* Bank Account 1 */}
              <div className="border-r border-emerald-300 pr-3 font-bold text-emerald-900 space-y-0.5 text-[8.5pt]">
                <p className="font-extrabold text-gray-900 text-[8.5pt] uppercase tracking-wider mb-0.5 underline">HDFC Bank</p>
                <p>Account Name: <span className="font-semibold text-black">{bankAccount1.accountName}</span></p>
                <p>Account No.: <span className="font-mono font-bold text-black">{bankAccount1.accountNo}</span></p>
                <p>IFSC Code: <span className="font-mono font-bold text-black">{bankAccount1.ifscCode}</span></p>
                <p>Bank Name: <span className="font-semibold text-black">{bankAccount1.bankName}</span></p>
              </div>

              {/* Bank Account 2 (Second Bank Account) */}
              <div className="font-bold text-emerald-900 space-y-0.5 text-[8.5pt]">
                <p className="font-extrabold text-gray-900 text-[8.5pt] uppercase tracking-wider mb-0.5 underline">State Bank of India</p>
                <p>Account Name: <span className="font-semibold text-black">{bankAccount2.accountName}</span></p>
                <p>Account No.: <span className="font-mono font-bold text-black">{bankAccount2.accountNo}</span></p>
                <p>IFSC Code: <span className="font-mono font-bold text-black">{bankAccount2.ifscCode}</span></p>
                <p>Bank Name: <span className="font-semibold text-black">{bankAccount2.bankName}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-1"></div>
      </div>

      <PageFooter address={company?.officeAddress} />
    </div>
  );
};
