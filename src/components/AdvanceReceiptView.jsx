import React from 'react';
import { formatINR, numberToWordsINR } from '../utils/calculations';

export const AdvanceReceiptView = ({ quotation }) => {
  const customer = quotation?.customer || {};
  const system = quotation?.system || {};
  const pricing = quotation?.pricing || {};
  const receipt = quotation?.receipt || {};
  const company = quotation?.company || {};

  const capacity = system.capacityKw || 3;
  // Commercial project cost (defaults to customer quotation cost)
  const projectCost = Number(pricing.customerCost || pricing.totalCost || 220000);
  const advanceAmount = Number(receipt.advanceAmount !== undefined ? receipt.advanceAmount : Math.round(projectCost * 0.1));
  const balanceAmount = Math.max(0, projectCost - advanceAmount);

  const receiptNo = receipt.receiptNo || customer.consumerNo || '32';
  const receiptDate = receipt.receiptDate || quotation.date || '20/11/2026';
  const paymentMode = receipt.paymentMode || 'Bank Transfer / RTGS / NEFT / UPI';
  const txnReference = receipt.txnReference || '';
  const reasonForPayment = receipt.reasonForPayment || 'Start the work of Enhancement of contract load and Feasibility permission.';
  const receiverName = receipt.receiverName || 'T.RAVINDRA CHARY';
  const receiverPhone = receipt.receiverPhone || '9347416140';
  const receivedOnBehalfOf = receipt.receivedOnBehalfOf || 'Srimaan Solar Solutions';

  const amountInWords = numberToWordsINR(advanceAmount);

  return (
    <div className="a4-preview-sheet p-6 sm:p-8 bg-white text-black font-sans relative overflow-hidden max-w-[210mm] min-h-[297mm] mx-auto shadow-lg flex flex-col justify-between">
      {/* Heavy Master Outer Border */}
      <div className="border-[2.5px] border-black h-full flex flex-col justify-between p-0 overflow-hidden">
        
        {/* Top Header Section */}
        <div>
          {/* Top Banner: ADVANCE PAYMENT */}
          <div className="bg-[#0b1b3d] text-white py-1.5 px-3 border-b-2 border-black text-center">
            <h1 className="text-base sm:text-lg font-black tracking-widest uppercase font-serif">
              ADVANCE PAYMENT
            </h1>
          </div>

          {/* Company Details & Logo Grid */}
          <div className="grid grid-cols-12 border-b-2 border-black">
            {/* Left Column: Company Info (7 Cols) */}
            <div className="col-span-7 p-3 border-r-2 border-black flex flex-col justify-center space-y-1">
              <h2 className="text-base sm:text-lg font-black tracking-wide text-[#c2410c] uppercase font-serif">
                SRIMAAN SOLAR SOLUTIONS
              </h2>
              <div className="text-[9pt] leading-tight text-gray-900 font-semibold space-y-0.5">
                <p># 6-210, Sriramnagar Auto nagar, Warangal x road</p>
                <p>Khammam-507003, Telangana, India</p>
                <p>Mob. No: <strong className="text-black">9347416140, 9912416140</strong></p>
                <p className="pt-0.5">
                  GSTIN : <strong className="font-mono text-black">36ADPPT2441N1ZW</strong> &nbsp;&nbsp;
                  <span className="text-[#c2410c] font-bold">VENDOR REG.NO : TSRE250511</span>
                </p>
                <p className="italic text-[8.5pt] text-gray-800">
                  Email id : srimaansolarsolutions@gmail.com
                </p>
              </div>
            </div>

            {/* Right Column: Logo (5 Cols) */}
            <div className="col-span-5 p-3 flex flex-col items-center justify-center bg-white text-center">
              <div className="h-20 w-44 flex items-center justify-center">
                <img
                  src="/assets/srimaan_receipt_logo.jpeg"
                  alt="Srimaan Solar Solutions"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/assets/srimaan_logo.jpeg";
                  }}
                />
              </div>
              <p className="text-[8.5pt] font-black text-[#0b1b3d] tracking-wide mt-1 font-serif">
                Think Smart, Think Solar
              </p>
            </div>
          </div>

          {/* Customer Metadata & Receipt Info Grid */}
          <div className="grid grid-cols-12 border-b-2 border-black text-[9pt]">
            {/* Left: Received From & Customer Info (7 Cols) */}
            <div className="col-span-7 p-2.5 border-r-2 border-black space-y-1">
              <div className="font-black text-[#c2410c] uppercase tracking-wide text-[9.5pt]">
                Received From
              </div>
              <div className="font-bold text-black text-[10pt] uppercase">
                Mr./Ms : <span className="font-black">{customer.name || 'GURRAM ANITHA'}</span>
              </div>
              <div className="text-gray-800 font-medium">
                {customer.addressLine1 || 'HNO 5-1-4, BALAPETA'}
              </div>
              <div className="text-gray-800 font-medium">
                District: <strong>{customer.district || 'Khammam'}</strong>, State: <strong>{customer.state || 'TELANGANA'}</strong>, PIN Code: <strong>{customer.pinCode || '507003'}</strong>
              </div>
              <div className="text-gray-900 font-semibold">
                Mobile no : <strong className="font-mono text-black">{customer.phone || customer.mobile || '9848163232'}</strong>
              </div>
              <div className="text-gray-900 font-semibold">
                Email Address : <span className="text-gray-800">{customer.email || 'Ramanareddy1632@gmail.com'}</span>
              </div>
              {customer.consumerNo && (
                <div className="text-gray-900 font-semibold">
                  Consumer No (UNC) : <span className="font-mono font-bold text-black">{customer.consumerNo}</span>
                </div>
              )}
            </div>

            {/* Right: Date, Receipt No (5 Cols) */}
            <div className="col-span-5 divide-y-2 divide-black flex flex-col justify-between">
              <div className="grid grid-cols-2 divide-x-2 divide-black h-full">
                <div className="p-2 font-bold text-gray-900 bg-slate-50/50 flex items-center">
                  Date
                </div>
                <div className="p-2 font-mono font-bold text-black text-center flex items-center justify-center">
                  {receiptDate}
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x-2 divide-black h-full">
                <div className="p-2 font-bold text-gray-900 bg-slate-50/50 flex items-center">
                  Receipt No
                </div>
                <div className="p-2 font-mono font-black text-black text-center flex items-center justify-center text-[10.5pt]">
                  {receiptNo}
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x-2 divide-black h-full">
                <div className="p-2 font-bold text-gray-900 bg-slate-50/50 flex items-center">
                  System Capacity
                </div>
                <div className="p-2 font-mono font-bold text-black text-center flex items-center justify-center">
                  {capacity} KW
                </div>
              </div>
            </div>
          </div>

          {/* Description & Financial Commercials Table */}
          <div className="border-b-2 border-black text-[9pt]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-black text-black font-black uppercase text-[9.5pt]">
                  <th className="p-2 text-left border-r-2 border-black w-7/12">DESCRIPTION</th>
                  <th className="p-2 text-center border-r-2 border-black w-2/12">System Size</th>
                  <th className="p-2 text-right w-3/12 pr-4">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black font-medium text-gray-900">
                <tr>
                  <td className="p-2 border-r-2 border-black font-bold">Total Project Cost</td>
                  <td className="p-2 text-center border-r-2 border-black font-bold font-mono">{capacity} KW</td>
                  <td className="p-2 text-right pr-4 font-mono font-bold text-black">₹ {formatINR(projectCost)}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r-2 border-black font-semibold text-gray-800">Advance Payment</td>
                  <td className="p-2 border-r-2 border-black text-center font-mono"></td>
                  <td className="p-2 text-right pr-4 font-mono font-bold text-emerald-800">₹ {formatINR(advanceAmount)}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r-2 border-black text-gray-800">
                    Balance Amount to be pay On or before dispatch of Material
                  </td>
                  <td className="p-2 border-r-2 border-black text-center font-mono"></td>
                  <td className="p-2 text-right pr-4 font-mono font-bold text-slate-900">₹ {formatINR(balanceAmount)}</td>
                </tr>
                <tr className="bg-slate-50 font-black text-black text-[9.5pt] border-t-2 border-black">
                  <td className="p-2 border-r-2 border-black uppercase tracking-wider">Amount Received</td>
                  <td className="p-2 text-center border-r-2 border-black font-mono font-bold text-emerald-800">₹ {formatINR(advanceAmount)}</td>
                  <td className="p-2 text-right pr-4 font-mono font-black text-emerald-900">₹ {formatINR(advanceAmount)}</td>
                </tr>
                <tr className="bg-white border-t-2 border-black">
                  <td colSpan={3} className="p-2.5 font-bold text-black text-[9pt] leading-normal">
                    Amount In Words &nbsp;:&nbsp; <span className="font-extrabold uppercase font-mono text-[#0b1b3d]">{amountInWords}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Banner: THANK YOU FOR YOUR BUSINESS */}
          <div className="py-1.5 px-3 border-b-2 border-black text-center bg-slate-50/70">
            <h3 className="font-black text-black text-[10pt] tracking-widest uppercase font-serif">
              THANK YOU FOR YOUR BUSINESS
            </h3>
          </div>

          {/* Payment Mode Section */}
          <div className="border-b-2 border-black">
            <div className="bg-slate-100 py-1 px-3 border-b-2 border-black text-center">
              <h4 className="font-bold text-[#c2410c] text-[9.5pt] tracking-wide uppercase">
                Payment Mode to SRIMAAN SOLAR SOLUTIONS
              </h4>
            </div>

            <div className="grid grid-cols-12 text-[8.5pt]">
              {/* Reason For Payment (6 Cols) */}
              <div className="col-span-6 p-2.5 border-r-2 border-black flex flex-col justify-between space-y-2">
                <div>
                  <span className="font-bold text-black block mb-1">Reason For Payment:</span>
                  <p className="text-gray-800 font-medium leading-relaxed">
                    {reasonForPayment}
                  </p>
                </div>
                <div className="text-[7.5pt] text-slate-500 italic">
                  * Official acknowledgment of advance token amount for solar rooftop EPC engineering.
                </div>
              </div>

              {/* Checkboxes for Payment Modes (6 Cols) */}
              <div className="col-span-6 divide-y divide-black text-[8.5pt]">
                <div className="p-1.5 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Cash :</span>
                  <span className="font-mono text-xs font-bold w-6 h-5 border border-black rounded-xs flex items-center justify-center mr-2">
                    {paymentMode.toLowerCase().includes('cash') ? '✓' : ''}
                  </span>
                </div>
                <div className="p-1.5 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Check / Cheque :</span>
                  <span className="font-mono text-xs font-bold w-6 h-5 border border-black rounded-xs flex items-center justify-center mr-2">
                    {paymentMode.toLowerCase().includes('check') || paymentMode.toLowerCase().includes('cheque') ? '✓' : ''}
                  </span>
                </div>
                <div className="p-1.5 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Debit / Credit Card :</span>
                  <span className="font-mono text-xs font-bold w-6 h-5 border border-black rounded-xs flex items-center justify-center mr-2">
                    {paymentMode.toLowerCase().includes('card') ? '✓' : ''}
                  </span>
                </div>
                <div className="p-2 space-y-1 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black text-[8pt]">
                      Bank Transfer / RTGS / NEFT / UPI reference number:
                    </span>
                    <span className="font-mono text-xs font-bold w-6 h-5 border border-black rounded-xs flex items-center justify-center shrink-0">
                      {paymentMode.toLowerCase().includes('bank') || paymentMode.toLowerCase().includes('upi') || paymentMode.toLowerCase().includes('neft') ? '✓' : ''}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-slate-900 text-[8pt] pl-1 break-all">
                    {txnReference ? txnReference : 'UPI / NEFT Verified Ref'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Signatures & Seal Section */}
        <div className="grid grid-cols-12 text-[9pt]">
          {/* Left: Receiver Name & Stamp (6 Cols) */}
          <div className="col-span-6 p-3 border-r-2 border-black flex flex-col justify-between relative min-h-[140px]">
            <div className="space-y-1">
              <div className="font-bold text-black">
                Receiver Name : <span className="font-extrabold">{receiverName}</span>
              </div>
              <div className="font-bold text-black">
                Mobile No : <span className="font-mono font-extrabold">{receiverPhone}</span>
              </div>
            </div>

            {/* Official Blue Round Seal - Positioned Authentically Over Receiver Area */}
            <div className="absolute right-6 top-6 pointer-events-none">
              <img
                src="/assets/srimaan_seal.jpeg"
                alt="Srimaan Solar Official Seal"
                className="h-20 w-20 object-contain mix-blend-multiply opacity-90 drop-shadow-xs rotate-[-6deg]"
              />
            </div>

            <div className="pt-8 border-t border-dotted border-black/40 text-left">
              <span className="font-bold text-black uppercase tracking-wide text-[8.5pt]">
                Receiver Signature
              </span>
            </div>
          </div>

          {/* Right: Received Date & Client Signature (6 Cols) */}
          <div className="col-span-6 p-3 flex flex-col justify-between min-h-[140px]">
            <div className="space-y-1">
              <div className="font-bold text-black">
                Received Date : <span className="font-mono font-bold">{receiptDate}</span>
              </div>
              <div className="font-bold text-gray-900">
                Received on Behalf of : <span className="font-extrabold text-black">{receivedOnBehalfOf}</span>
              </div>
            </div>

            <div className="pt-8 border-t border-dotted border-black/40 text-right">
              <span className="font-bold text-black uppercase tracking-wide text-[8.5pt]">
                Name &amp; Signature :
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdvanceReceiptView;
