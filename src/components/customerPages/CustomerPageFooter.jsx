import React from 'react';

export default function CustomerPageFooter({ pageNumber = 1, totalPages = 5 }) {
  return (
    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[7.5px] text-slate-500">
      <div>
        <span className="font-semibold text-slate-800">
          Srimaan Solar Solutions &bull; Built on Trust. Driven by Excellence.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-slate-600 font-medium">Proposal Validity: 30 Days</span>
        <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
          Page {pageNumber} of {totalPages}
        </span>
      </div>
    </div>
  );
}
