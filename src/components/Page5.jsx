import React from 'react';
import { PageHeader, PageFooter } from './PageHeader';
import { formatINR, isDomesticCategory } from '../utils/calculations';

export const Page5 = ({ data }) => {
  const { company, system, pricing, bom, customer } = data;
  const capacity = system?.capacityKw || 5;

  const isDomestic = isDomesticCategory(customer?.category);
  const bankCost = pricing.bankCost || pricing.totalCost;
  const totalCostDisplay = formatINR(bankCost);
  const subsidyVal = isDomestic
    ? (pricing.subsidyAmount !== undefined ? pricing.subsidyAmount : (pricing.subsidy !== undefined ? pricing.subsidy : 78000))
    : 0;
  const subsidyDisplay = formatINR(subsidyVal);
  const afterSubsidyDisplay = formatINR(Math.max(0, bankCost - subsidyVal));

  return (
    <div className="a4-page page-5 flex flex-col justify-start">
      <PageHeader />

      <div className="page-content px-8 pt-3 pb-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Salutation */}
          <div className="mt-1 mb-1 text-left">
            <h3 className="font-bold text-gray-900 text-sm tracking-wide">
              RESPECTED SIR / MADAM,
            </h3>
          </div>

          {/* Proposal Introduction */}
          <div className="mb-2 text-left">
            <p className="text-gray-900 text-sm leading-relaxed">
              With reference to your requirements and discussion with us, our techno-commercial proposal for the supply and installation of a <span className="font-bold text-black">{capacity} kWp</span> Grid-Connected Solar Power Generating System is with below-stated prices:
            </p>
          </div>

          {/* Bill of Materials Table */}
          <div className="bom-table-wrapper border-2 border-black shadow-xs">
            <div className="bom-table-heading bg-white text-center py-1.5 px-2 border-b-2 border-black">
              <h4 className="font-extrabold text-gray-900 text-sm tracking-wide">
                Cost Estimations &amp; Bill of Material of {capacity} KW On-Grid Photovoltaic System
              </h4>
            </div>

            <table className="bom-table w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#B7D7A8] border-b-2 border-black text-gray-900 font-bold">
                  <th className="py-1 px-2 text-center border-r border-black w-12 font-bold">Sr.</th>
                  <th className="py-1 px-3 text-left border-r border-black font-bold">Description of Supply Items</th>
                  <th className="py-1 px-2 text-center w-20 font-bold">Qty</th>
                </tr>
              </thead>
              <tbody>
                {bom.map((item, index) => (
                  <tr key={item.id || index} className="border-b border-black text-gray-900">
                    <td className="py-1 px-2 text-center font-bold border-r border-black align-middle">
                      {index + 1}
                    </td>
                    <td className="py-1 px-3 text-left font-semibold border-r border-black align-middle leading-tight">
                      {item.description}
                    </td>
                    <td className="py-1 px-2 text-center font-bold align-middle">
                      {item.qty}
                    </td>
                  </tr>
                ))}

                {/* Amount to be paid row */}
                <tr className="border-b border-black text-gray-900 bg-slate-50/50">
                  <td colSpan={2} className="py-1.5 px-3 text-center font-bold border-r border-black text-xs">
                    Amount to be paid towards the Cost of the {capacity} KW Solar System
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-xs">
                    {totalCostDisplay}
                  </td>
                </tr>

                {/* Subsidy row */}
                <tr className="border-b border-black bg-slate-50/30">
                  <td colSpan={2} className="py-1.5 px-4 text-center font-extrabold text-gray-900 text-sm border-r border-black tracking-wide">
                    {isDomestic ? 'Subsidy' : 'Central Govt Subsidy'}
                  </td>
                  <td className="py-1.5 px-2 text-center font-extrabold text-gray-900 text-sm tracking-wide font-mono">
                    {isDomestic ? subsidyDisplay : 'NIL (Non-Subsidized)'}
                  </td>
                </tr>

                {/* After Subsidy Cost row */}
                <tr className={isDomestic ? "bg-emerald-50/30" : "bg-slate-50/50"}>
                  <td colSpan={2} className="py-1.5 px-4 text-center font-extrabold text-gray-900 text-sm border-r border-black tracking-wide">
                    {isDomestic ? 'After Subsidy Cost:' : 'Net Turnkey Cost:'}
                  </td>
                  <td className="py-1.5 px-2 text-center font-extrabold text-gray-900 text-sm tracking-wide font-mono">
                    {isDomestic ? afterSubsidyDisplay : totalCostDisplay}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Statutory Subsidy Directly Credited Banner transferred from Page 6 */}
          {isDomestic && subsidyVal > 0 ? (
            <div className="mt-2.5 mb-1.5 p-1.5 bg-emerald-50/80 border border-emerald-300 rounded-xs">
              <h4 className="font-extrabold text-gray-900 text-[10pt] tracking-wide text-center">
                SUBSIDY AMOUNT &nbsp;&nbsp;&nbsp;&nbsp; ₹{subsidyDisplay}/- directly credited to customer account
              </h4>
            </div>
          ) : (
            <div className="mt-2.5 mb-1.5 p-1.5 bg-amber-50/80 border border-amber-300 rounded-xs">
              <h4 className="font-extrabold text-gray-900 text-[9pt] tracking-wide text-center uppercase">
                COMMERCIAL / INDUSTRIAL CONNECTION &bull; ELIGIBLE FOR 40% ACCELERATED DEPRECIATION (SEC 32 IT ACT)
              </h4>
            </div>
          )}

          {/* Statutory GST Note */}
          <div className="mt-1 text-[7.5pt] text-gray-700 italic text-left">
            <p>
              * Prices quoted are inclusive of all taxes. Statutory GST is bifurcated as 70% of system cost deemed goods (Solar PV Modules &amp; Inverter) taxable @ 5% and 30% deemed balance of system &amp; services taxable @ 18% as per MNRE/GST Council guidelines (Detailed GST Calculation table on Page 6).
            </p>
          </div>
        </div>

        <div className="h-2"></div>
      </div>

      <PageFooter address={company?.officeAddress} />
    </div>
  );
};
