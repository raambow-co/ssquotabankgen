import React from 'react';

export default function CustomerPageFooter({ pageNumber = 1, totalPages = 5 }) {
  return (
    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
      <div>
        <p className="font-semibold text-slate-800">
          #6-210, Sriramnagar, Behind Auto Nagar, Warangal X Road, Khammam 507003
        </p>
        <p className="text-emerald-700 font-bold mt-0.2">
          www.srimaansolarsolutions.com &bull; 9347416140 &bull; srimaansolarsolutions@gmail.com
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
          Page {pageNumber} of {totalPages}
        </span>
      </div>
    </div>
  );
}
