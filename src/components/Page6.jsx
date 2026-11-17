import React from 'react';
import { PageHeader, PageFooter } from './PageHeader';
import { formatINR, formatINRDecimal, calculateGSTBreakdown } from '../utils/calculations';

export const Page6 = ({ data }) => {
  const { company, bank, system, pricing, customer } = data;
  const capacity = system?.capacityKw || 5;

  const subsidyDisplay = pricing.subsidyAmount;
  const subsidyFormatted = formatINR(pricing.subsidyAmount);
  const afterSubsidyDisplay = formatINR(pricing.afterSubsidyCost);
  const savingsDisplay = pricing.annualSavings ? formatINR(pricing.annualSavings) : "";

  // GST Calculation Breakdown based on statutory Solar EPC rules:
  // 70% Goods (Modules & Inverter) @ 5% GST
  // 30% Services & BOS @ 18% GST
  const gst = pricing.gstBreakdown || calculateGSTBreakdown(pricing.totalCost);

  return (
    <div className="a4-page page-6 flex flex-col justify-start">
      <PageHeader />

      <div className="page-content px-8 pt-2 pb-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Subsidy Amount Header */}
          <div className="my-1.5 p-1.5 bg-emerald-50/80 border border-emerald-300 rounded-xs">
            <h3 className="font-extrabold text-gray-900 text-[10.5pt] tracking-wide text-center">
              SUBSIDY AMOUNT &nbsp;&nbsp;&nbsp;&nbsp; ₹{subsidyDisplay}/- directly credited to customer account
            </h3>
          </div>

          {/* GST CALCULATION TABLE (Statutory EPC Bifurcation) */}
          <div className="gst-calculation-section my-2">
            <h4 className="font-extrabold text-gray-900 text-xs tracking-wider uppercase mb-1">
              GST CALCULATION:
            </h4>

            <div className="border border-black overflow-hidden shadow-xs">
              <table className="w-full text-[8pt] border-collapse">
                <thead>
                  <tr className="bg-[#B7D7A8] border-b border-black text-gray-900 font-bold">
                    <th className="py-1 px-1.5 text-center border-r border-black w-8 font-bold">S.No</th>
                    <th className="py-1 px-2 text-left border-r border-black font-bold">Item Description</th>
                    <th className="py-1 px-2 text-center border-r border-black w-24 font-bold">Amount (INR)</th>
                    <th className="py-1 px-1.5 text-center border-r border-black w-14 font-bold">GST Rate</th>
                    <th className="py-1 px-2 text-center border-r border-black w-20 font-bold">GST (INR)</th>
                    <th className="py-1 px-2 text-center w-28 font-bold">Total Incl. GST (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: Solar Modules & Inverter (70% system cost @ 5% GST) */}
                  <tr className="border-b border-black text-gray-900">
                    <td className="py-1 px-1.5 text-center font-bold border-r border-black align-middle">1</td>
                    <td className="py-1 px-2 text-left font-semibold border-r border-black align-middle leading-tight">
                      Solar Modules (5%) &amp; solar inverter (1)
                    </td>
                    <td className="py-1 px-2 text-center font-semibold border-r border-black align-middle">
                      {formatINRDecimal(gst.goodsBase)}
                    </td>
                    <td className="py-1 px-1.5 text-center font-bold border-r border-black align-middle">
                      {gst.goodsRate || "5%"}
                    </td>
                    <td className="py-1 px-2 text-center font-semibold border-r border-black align-middle">
                      {formatINRDecimal(gst.goodsGst)}
                    </td>
                    <td className="py-1 px-2 text-center font-bold align-middle">
                      {formatINRDecimal(gst.goodsTotal)}
                    </td>
                  </tr>

                  {/* Row 2: Structure, Cables, BOS & Services (30% system cost @ 18% GST) */}
                  <tr className="border-b border-black text-gray-900">
                    <td className="py-1 px-1.5 text-center font-bold border-r border-black align-middle">2</td>
                    <td className="py-1 px-2 text-left font-medium border-r border-black align-middle leading-tight text-[7.5pt]">
                      Galvanized structure, Polycab cables, ACDB/DCDB, junction boxes, earthing, plumbing, civil work, transport, installation &amp; commissioning
                    </td>
                    <td className="py-1 px-2 text-center font-semibold border-r border-black align-middle">
                      {formatINRDecimal(gst.servicesBase)}
                    </td>
                    <td className="py-1 px-1.5 text-center font-bold border-r border-black align-middle">
                      {gst.servicesRate || "18%"}
                    </td>
                    <td className="py-1 px-2 text-center font-semibold border-r border-black align-middle">
                      {formatINRDecimal(gst.servicesGst)}
                    </td>
                    <td className="py-1 px-2 text-center font-bold align-middle">
                      {formatINRDecimal(gst.servicesTotal)}
                    </td>
                  </tr>

                  {/* Row 3: Sub Total */}
                  <tr className="border-b border-black text-gray-900 font-bold bg-slate-50/50">
                    <td colSpan={2} className="py-1 px-2 text-left font-bold border-r border-black pl-3">
                      Sub Total
                    </td>
                    <td className="py-1 px-2 text-center font-bold border-r border-black">
                      {formatINRDecimal(gst.subTotalBase)}
                    </td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="py-1 px-2 text-center font-bold">
                      {formatINRDecimal(gst.totalProjectCost)}
                    </td>
                  </tr>

                  {/* Row 4: Total GST (SGST + CGST) */}
                  <tr className="border-b border-black text-gray-900 font-bold bg-slate-50/30">
                    <td colSpan={4} className="py-1 px-2 text-left font-bold border-r border-black pl-3">
                      Total GST (SGST + CGST)
                    </td>
                    <td className="py-1 px-2 text-center font-bold border-r border-black text-slate-900">
                      {formatINRDecimal(gst.totalGst)}
                    </td>
                    <td></td>
                  </tr>

                  {/* Row 5: Total Project Cost */}
                  <tr className="text-gray-900 font-extrabold bg-[#f4fbf0]">
                    <td colSpan={5} className="py-1 px-2 text-left font-extrabold border-r border-black pl-3 text-[8.5pt]">
                      TOTAL PROJECT COST
                    </td>
                    <td className="py-1 px-2 text-center font-extrabold text-[8.5pt] text-black">
                      Rs. {formatINRDecimal(gst.totalProjectCost)}
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
            <p className="font-bold leading-tight">
              Purchase Order (PO) is to be issued in the favor of:
              <br />
              <span className="text-[#006699] font-extrabold text-sm">{company.name}.</span>
            </p>
          </div>

          {/* Bank Payment Terms */}
          <div className="bank-details-box mt-2 p-2.5 border-2 border-red-500 rounded-xs bg-red-50/20 text-xs max-w-lg">
            <p className="font-extrabold text-gray-900 mb-0.5 tracking-wide">
              Payment Terms: Account details for NEFT / RTGS / IMPS
            </p>
            <div className="font-bold text-[#c0392b] space-y-0.5 tracking-wide text-[9.5pt]">
              <p>Account Name: {bank.accountName}</p>
              <p>Account No.: {bank.accountNo}</p>
              <p>IFSC Code: {bank.ifscCode}</p>
              <p>Bank Name: {bank.bankName}</p>
            </div>
          </div>
        </div>

        <div className="h-1"></div>
      </div>

      <PageFooter address={company?.officeAddress} />
    </div>
  );
};
