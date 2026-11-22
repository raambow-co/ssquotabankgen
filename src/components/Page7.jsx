import React from 'react';
import { PageHeader, PageFooter } from './PageHeader';

export const Page7 = ({ data }) => {
  const { company, terms = [] } = data;

  return (
    <div className="a4-page page-7 flex flex-col justify-start">
      <PageHeader />

      <div className="page-content px-8 pt-3 pb-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Terms & Conditions Heading */}
          <div className="text-center my-2">
            <h2 className="text-xl font-bold text-gray-900 underline tracking-wide font-sans">
              Terms &amp; Conditions
            </h2>
          </div>

          {/* Terms Table */}
          <div className="terms-table-wrapper border-2 border-black my-2 shadow-xs">
            <table className="terms-table w-full text-xs border-collapse">
              <tbody>
                {terms.map((item, index) => {
                  const isPaymentTerms = item.term.toLowerCase().includes('payment');
                  const isWarranty = item.term.toLowerCase().includes('warranty');
                  const isCleaning = item.term.toLowerCase().includes('cleaning');

                  // Clean up detail text if necessary
                  let detailContent = item.detail;
                  if (isCleaning && detailContent) {
                    detailContent = detailContent.replace(
                      /Panelsisadvisedtobedoneevery10-15daysby/g,
                      'Panels is advised to be done every 10-15 days by'
                    );
                  }

                  return (
                    <tr
                      key={index}
                      className={`border-b border-black last:border-b-0 ${
                        isPaymentTerms ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <td
                        className={`p-1.5 font-bold border-r border-black w-2/5 align-top whitespace-pre-line leading-tight ${
                          isPaymentTerms
                            ? 'bg-blue-100/90 text-blue-950 font-black'
                            : 'bg-slate-50/50 text-gray-900'
                        }`}
                      >
                        {item.term}
                      </td>
                      <td
                        className={`p-1.5 w-3/5 align-top leading-tight ${
                          isPaymentTerms
                            ? 'bg-blue-50/50 text-gray-900'
                            : 'text-gray-900 font-medium text-justify'
                        }`}
                      >
                        {isPaymentTerms ? (
                          <div className="space-y-1.5 py-0.5">
                            <div className="flex items-center gap-2.5">
                              <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded font-mono font-bold text-[7.5pt] bg-blue-600 text-white shadow-2xs">
                                20%
                              </span>
                              <span className="font-extrabold text-blue-950 text-[8pt]">: Booking</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded font-mono font-bold text-[7.5pt] bg-amber-600 text-white shadow-2xs">
                                70%
                              </span>
                              <span className="font-extrabold text-amber-950 text-[8pt]">: Material Dispatch</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded font-mono font-bold text-[7.5pt] bg-emerald-600 text-white shadow-2xs">
                                10%
                              </span>
                              <span className="font-extrabold text-emerald-950 text-[8pt]">: At Completion</span>
                            </div>
                          </div>
                        ) : isWarranty ? (
                          <div className="space-y-1.5 py-0.5">
                            <div className="flex items-start gap-3">
                              <span className="font-bold text-gray-900 min-w-[20px]">1)</span>
                              <span className="font-semibold text-gray-900">25 Years SPV Output Power Warranty</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="font-bold text-gray-900 min-w-[20px]">2)</span>
                              <span className="font-semibold text-gray-900">7 Years Manufacturer's Warranty for Inverter</span>
                            </div>
                          </div>
                        ) : (
                          <div className="whitespace-pre-line">{detailContent}</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="h-2"></div>
      </div>

      <PageFooter address={company?.officeAddress} />
    </div>
  );
};
