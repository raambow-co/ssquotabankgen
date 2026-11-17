import React from 'react';
import { PageHeader, PageFooter } from './PageHeader';

export const Page7 = ({ data }) => {
  const { company, terms } = data;

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
                {terms.map((item, index) => (
                  <tr key={index} className="border-b border-black last:border-b-0">
                    <td className="p-1.5 font-bold text-gray-900 border-r border-black w-2/5 align-top whitespace-pre-line leading-tight bg-slate-50/50">
                      {item.term}
                    </td>
                    <td className="p-1.5 text-gray-900 w-3/5 align-top whitespace-pre-line leading-tight font-medium text-justify">
                      {item.detail}
                    </td>
                  </tr>
                ))}
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
