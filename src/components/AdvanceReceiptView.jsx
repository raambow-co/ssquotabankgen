import React, { useState, useEffect } from 'react';
import { formatINR, numberToWordsINR } from '../utils/calculations';
import { 
  Edit3, 
  Check, 
  RotateCcw, 
  X, 
  Sliders, 
  Receipt, 
  Save, 
  Pencil 
} from 'lucide-react';

export const AdvanceReceiptView = ({ quotation, onUpdateReceipt }) => {
  const customer = quotation?.customer || {};
  const system = quotation?.system || {};
  const pricing = quotation?.pricing || {};
  const initialReceipt = quotation?.receipt || {};

  // Bank Project Cost is the primary financial amount on the Advance Receipt
  const defaultBankCost = Number(pricing.bankCost !== undefined ? pricing.bankCost : (pricing.totalCost || 375000));

  // Initialize receipt data with Bank Amount and customer values
  const getInitialState = () => {
    const cost = Number(
      initialReceipt.projectCost !== undefined && initialReceipt.projectCost !== null && initialReceipt.projectCost !== ''
        ? initialReceipt.projectCost
        : defaultBankCost
    );
    const adv = Number(
      initialReceipt.advanceAmount !== undefined && initialReceipt.advanceAmount !== null && initialReceipt.advanceAmount !== ''
        ? initialReceipt.advanceAmount
        : Math.round(cost * 0.1)
    );
    const bal = Number(
      initialReceipt.balanceAmount !== undefined && initialReceipt.balanceAmount !== null && initialReceipt.balanceAmount !== ''
        ? initialReceipt.balanceAmount
        : Math.max(0, cost - adv)
    );

    return {
      receiptNo: initialReceipt.receiptNo || customer.consumerNo || '32',
      receiptDate: initialReceipt.receiptDate || quotation?.date || '20/11/2026',
      customerName: initialReceipt.customerName || customer.name || 'GURRAM ANITHA',
      addressLine1: initialReceipt.addressLine1 || customer.addressLine1 || customer.address || 'HNO 5-1-4, BALAPETA',
      district: initialReceipt.district || customer.district || 'Khammam',
      state: initialReceipt.state || customer.state || 'TELANGANA',
      pinCode: initialReceipt.pinCode || customer.pinCode || customer.pincode || '507003',
      mobile: initialReceipt.mobile || customer.phone || customer.mobile || '9848163232',
      email: initialReceipt.email || customer.email || 'Ramanareddy1632@gmail.com',
      consumerNo: initialReceipt.consumerNo || customer.consumerNo || '36040182649',
      capacityKw: initialReceipt.capacityKw || system.capacityKw || system.capacity || 5,
      projectCost: cost,
      advanceAmount: adv,
      balanceAmount: bal,
      amountInWords: initialReceipt.amountInWords || numberToWordsINR(adv),
      paymentMode: initialReceipt.paymentMode || 'Bank Transfer / RTGS / NEFT / UPI',
      txnReference: initialReceipt.txnReference || '',
      reasonForPayment: initialReceipt.reasonForPayment || 'Start the work of Enhancement of contract load and Feasibility permission.',
      receiverName: initialReceipt.receiverName || 'T.RAVINDRA CHARY',
      receiverPhone: initialReceipt.receiverPhone || '9347416140',
      receivedOnBehalfOf: initialReceipt.receivedOnBehalfOf || 'Srimaan Solar Solutions'
    };
  };

  const [receiptData, setReceiptData] = useState(getInitialState);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [isInlineEditing, setIsInlineEditing] = useState(false);

  // Sync state if quotation prop changes
  useEffect(() => {
    setReceiptData(getInitialState());
  }, [quotation?.id, quotation?.date, pricing.bankCost, pricing.totalCost]);

  // Handle generic field change
  const handleChange = (field, value) => {
    setReceiptData(prev => {
      const updated = { ...prev, [field]: value };

      // Auto recalculate balance and words when financial amounts change
      if (field === 'projectCost' || field === 'advanceAmount') {
        const cost = field === 'projectCost' ? (Number(value) || 0) : prev.projectCost;
        const adv = field === 'advanceAmount' ? (Number(value) || 0) : prev.advanceAmount;
        updated.balanceAmount = Math.max(0, cost - adv);
        updated.amountInWords = numberToWordsINR(adv);
      }

      if (onUpdateReceipt) {
        onUpdateReceipt(updated);
      }
      return updated;
    });
  };

  // Reset to default quotation bank values
  const handleReset = () => {
    const defaultState = {
      receiptNo: customer.consumerNo || '32',
      receiptDate: quotation?.date || '20/11/2026',
      customerName: customer.name || 'GURRAM ANITHA',
      addressLine1: customer.addressLine1 || customer.address || 'HNO 5-1-4, BALAPETA',
      district: customer.district || 'Khammam',
      state: customer.state || 'TELANGANA',
      pinCode: customer.pinCode || customer.pincode || '507003',
      mobile: customer.phone || customer.mobile || '9848163232',
      email: customer.email || 'Ramanareddy1632@gmail.com',
      consumerNo: customer.consumerNo || '36040182649',
      capacityKw: system.capacityKw || system.capacity || 5,
      projectCost: defaultBankCost,
      advanceAmount: Math.round(defaultBankCost * 0.1),
      balanceAmount: Math.max(0, defaultBankCost - Math.round(defaultBankCost * 0.1)),
      amountInWords: numberToWordsINR(Math.round(defaultBankCost * 0.1)),
      paymentMode: 'Bank Transfer / RTGS / NEFT / UPI',
      txnReference: '',
      reasonForPayment: 'Start the work of Enhancement of contract load and Feasibility permission.',
      receiverName: 'T.RAVINDRA CHARY',
      receiverPhone: '9347416140',
      receivedOnBehalfOf: 'Srimaan Solar Solutions'
    };
    setReceiptData(defaultState);
    if (onUpdateReceipt) {
      onUpdateReceipt(defaultState);
    }
  };

  const {
    receiptNo,
    receiptDate,
    customerName,
    addressLine1,
    district,
    state,
    pinCode,
    mobile,
    email,
    consumerNo,
    capacityKw,
    projectCost,
    advanceAmount,
    balanceAmount,
    amountInWords,
    paymentMode,
    txnReference,
    reasonForPayment,
    receiverName,
    receiverPhone,
    receivedOnBehalfOf
  } = receiptData;

  return (
    <div className="w-full flex flex-col items-center">
      {/* ============================================================== */}
      {/* INTERACTIVE EDIT CONTROLS TOOLBAR (Hidden when printing)       */}
      {/* ============================================================== */}
      <div className="no-print w-full max-w-[210mm] mb-3 flex flex-wrap items-center justify-between gap-2 p-2.5 bg-white border border-amber-300 rounded-xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold">
            <Receipt size={16} />
          </span>
          <div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <span>Advance Receipt Generator</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                Bank Cost: ₹{formatINR(projectCost)}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Click &ldquo;Quick Inline Edit&rdquo; to type directly on the page or &ldquo;Edit in Form&rdquo; for full controls.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsInlineEditing(!isInlineEditing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              isInlineEditing 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
            }`}
          >
            <Pencil size={13} />
            <span>{isInlineEditing ? '✓ Inline Edit: ON' : 'Quick Inline Edit'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsEditingModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#07132c] hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Sliders size={13} className="text-amber-400" />
            <span>Edit in Form</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
            title="Reset to default quotation bank cost and values"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MASTER A4 ADVANCE RECEIPT SHEET (Prints 100% Authentically)   */}
      {/* ============================================================== */}
      <div className="a4-preview-sheet p-6 sm:p-8 bg-white text-black font-sans relative overflow-hidden w-[210mm] min-h-[297mm] mx-auto shadow-lg flex flex-col justify-between">
        {/* Heavy Master Outer Border */}
        <div className="border-[2.5px] border-black h-full flex flex-col p-0 overflow-hidden">
          
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
              </div>
            </div>

            {/* Customer Metadata & Receipt Info Grid */}
            <div className="grid grid-cols-12 border-b-2 border-black text-[9pt]">
              {/* Left: Received From & Customer Info (7 Cols) */}
              <div className="col-span-7 p-2.5 border-r-2 border-black space-y-1">
                <div className="font-black text-[#c2410c] uppercase tracking-wide text-[9.5pt]">
                  Received From
                </div>

                {/* Customer Name */}
                <div className="font-bold text-black text-[10pt] uppercase flex items-center gap-1">
                  <span>Mr./Ms :</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => handleChange('customerName', e.target.value)}
                      className="font-black border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none flex-1 print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <span className="font-black">{customerName}</span>
                  )}
                </div>

                {/* Address Line 1 */}
                <div className="text-gray-800 font-medium">
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => handleChange('addressLine1', e.target.value)}
                      className="w-full border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    addressLine1
                  )}
                </div>

                {/* District, State, PIN */}
                <div className="text-gray-800 font-medium flex items-center gap-1 flex-wrap">
                  <span>District:</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => handleChange('district', e.target.value)}
                      className="w-24 font-bold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <strong>{district}</strong>
                  )}
                  <span>, State:</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className="w-24 font-bold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <strong>{state}</strong>
                  )}
                  <span>, PIN Code:</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => handleChange('pinCode', e.target.value)}
                      className="w-20 font-bold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <strong>{pinCode}</strong>
                  )}
                </div>

                {/* Mobile No */}
                <div className="text-gray-900 font-semibold flex items-center gap-1">
                  <span>Mobile no :</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={mobile}
                      onChange={(e) => handleChange('mobile', e.target.value)}
                      className="w-36 font-mono font-bold text-black border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <strong className="font-mono text-black">{mobile}</strong>
                  )}
                </div>

                {/* Email Address */}
                <div className="text-gray-900 font-semibold flex items-center gap-1">
                  <span>Email Address :</span>
                  {isInlineEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="flex-1 text-gray-800 border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <span className="text-gray-800">{email}</span>
                  )}
                </div>

                {/* Consumer No (UNC) */}
                <div className="text-gray-900 font-semibold flex items-center gap-1">
                  <span>Consumer No (UNC) :</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={consumerNo}
                      onChange={(e) => handleChange('consumerNo', e.target.value)}
                      className="w-36 font-mono font-bold text-black border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <span className="font-mono font-bold text-black">{consumerNo}</span>
                  )}
                </div>
              </div>

              {/* Right: Date, Receipt No, System Capacity (5 Cols) */}
              <div className="col-span-5 divide-y-2 divide-black flex flex-col justify-between">
                {/* Date */}
                <div className="grid grid-cols-2 divide-x-2 divide-black h-full">
                  <div className="p-2 font-bold text-gray-900 bg-slate-50/50 flex items-center">
                    Date
                  </div>
                  <div className="p-2 font-mono font-bold text-black text-center flex items-center justify-center">
                    {isInlineEditing ? (
                      <input
                        type="text"
                        value={receiptDate}
                        onChange={(e) => handleChange('receiptDate', e.target.value)}
                        className="w-full text-center font-mono font-bold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                      />
                    ) : (
                      receiptDate
                    )}
                  </div>
                </div>

                {/* Receipt No */}
                <div className="grid grid-cols-2 divide-x-2 divide-black h-full">
                  <div className="p-2 font-bold text-gray-900 bg-slate-50/50 flex items-center">
                    Receipt No
                  </div>
                  <div className="p-2 font-mono font-black text-black text-center flex items-center justify-center text-[10.5pt]">
                    {isInlineEditing ? (
                      <input
                        type="text"
                        value={receiptNo}
                        onChange={(e) => handleChange('receiptNo', e.target.value)}
                        className="w-full text-center font-mono font-black border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                      />
                    ) : (
                      receiptNo
                    )}
                  </div>
                </div>

                {/* System Capacity */}
                <div className="grid grid-cols-2 divide-x-2 divide-black h-full">
                  <div className="p-2 font-bold text-gray-900 bg-slate-50/50 flex items-center">
                    System Capacity
                  </div>
                  <div className="p-2 font-mono font-bold text-black text-center flex items-center justify-center">
                    {isInlineEditing ? (
                      <div className="flex items-center justify-center gap-1 w-full">
                        <input
                          type="number"
                          step="0.5"
                          value={capacityKw}
                          onChange={(e) => handleChange('capacityKw', e.target.value)}
                          className="w-16 text-center font-mono font-bold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                        />
                        <span>KW</span>
                      </div>
                    ) : (
                      `${capacityKw} KW`
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Financial Commercials Table (BANK PO AMOUNT) */}
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
                  {/* Total Project Cost */}
                  <tr>
                    <td className="p-2 border-r-2 border-black font-bold">
                      Total Project Cost
                    </td>
                    <td className="p-2 text-center border-r-2 border-black font-bold font-mono">
                      {capacityKw} KW
                    </td>
                    <td className="p-2 text-right pr-4 font-mono font-bold text-black">
                      {isInlineEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <span>₹</span>
                          <input
                            type="number"
                            value={projectCost}
                            onChange={(e) => handleChange('projectCost', Number(e.target.value) || 0)}
                            className="w-28 text-right font-mono font-bold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                          />
                        </div>
                      ) : (
                        `₹ ${formatINR(projectCost)}`
                      )}
                    </td>
                  </tr>

                  {/* Advance Payment */}
                  <tr>
                    <td className="p-2 border-r-2 border-black font-semibold text-gray-800">
                      Advance Payment
                    </td>
                    <td className="p-2 border-r-2 border-black text-center font-mono"></td>
                    <td className="p-2 text-right pr-4 font-mono font-bold text-emerald-800">
                      {isInlineEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <span>₹</span>
                          <input
                            type="number"
                            value={advanceAmount}
                            onChange={(e) => handleChange('advanceAmount', Number(e.target.value) || 0)}
                            className="w-28 text-right font-mono font-bold text-emerald-800 border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                          />
                        </div>
                      ) : (
                        `₹ ${formatINR(advanceAmount)}`
                      )}
                    </td>
                  </tr>

                  {/* Balance Amount */}
                  <tr>
                    <td className="p-2 border-r-2 border-black text-gray-800">
                      Balance Amount to be pay On or before dispatch of Material
                    </td>
                    <td className="p-2 border-r-2 border-black text-center font-mono"></td>
                    <td className="p-2 text-right pr-4 font-mono font-bold text-slate-900">
                      {isInlineEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <span>₹</span>
                          <input
                            type="number"
                            value={balanceAmount}
                            onChange={(e) => handleChange('balanceAmount', Number(e.target.value) || 0)}
                            className="w-28 text-right font-mono font-bold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                          />
                        </div>
                      ) : (
                        `₹ ${formatINR(balanceAmount)}`
                      )}
                    </td>
                  </tr>

                  {/* Amount Received in Rupees */}
                  <tr className="bg-slate-50 font-black text-black text-[9.5pt] border-t-2 border-black">
                    <td className="p-2 border-r-2 border-black uppercase tracking-wider">
                      Amount Received in Rupees
                    </td>
                    <td className="p-2 text-center border-r-2 border-black font-mono font-bold"></td>
                    <td className="p-2 text-right pr-4 font-mono font-black text-emerald-900">
                      ₹ {formatINR(advanceAmount)}
                    </td>
                  </tr>

                  {/* Amount in Words */}
                  <tr className="bg-white border-t-2 border-black">
                    <td colSpan={3} className="p-2.5 font-bold text-black text-[9pt] leading-normal">
                      <span>Amount In Words &nbsp;:&nbsp; </span>
                      {isInlineEditing ? (
                        <input
                          type="text"
                          value={amountInWords}
                          onChange={(e) => handleChange('amountInWords', e.target.value)}
                          className="font-extrabold uppercase font-mono text-[#0b1b3d] border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none w-3/4 print:border-none print:bg-transparent print:p-0"
                        />
                      ) : (
                        <span className="font-extrabold uppercase font-mono text-[#0b1b3d]">
                          {amountInWords}
                        </span>
                      )}
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
                    {isInlineEditing ? (
                      <textarea
                        rows={3}
                        value={reasonForPayment}
                        onChange={(e) => handleChange('reasonForPayment', e.target.value)}
                        className="w-full text-gray-800 font-medium leading-relaxed border border-dashed border-amber-600 bg-amber-50/50 p-1 outline-none print:border-none print:bg-transparent print:p-0"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium leading-relaxed">
                        {reasonForPayment}
                      </p>
                    )}
                  </div>
                  <div className="text-[7.5pt] text-slate-500 italic space-y-0.5">
                    <p>* Official acknowledgment of advance token amount for solar rooftop EPC engineering.</p>
                    <p>* Total Project Cost is inclusive of statutory GST (70:30 norms). Central DBT subsidy is directly credited to client account.</p>
                  </div>
                </div>

                {/* Checkboxes for Payment Modes (6 Cols) */}
                <div className="col-span-6 divide-y divide-black text-[8.5pt]">
                  {/* Cash */}
                  <div 
                    onClick={() => isInlineEditing && handleChange('paymentMode', 'Cash')}
                    className={`p-1.5 flex items-center justify-between ${isInlineEditing ? 'cursor-pointer hover:bg-amber-50/50' : ''}`}
                  >
                    <span className="font-semibold text-gray-900">Cash :</span>
                    <span className="font-mono text-xs font-bold w-6 h-5 border border-black rounded-xs flex items-center justify-center mr-2">
                      {paymentMode.toLowerCase().includes('cash') ? '✓' : ''}
                    </span>
                  </div>

                  {/* Cheque */}
                  <div 
                    onClick={() => isInlineEditing && handleChange('paymentMode', 'Cheque / Demand Draft')}
                    className={`p-1.5 flex items-center justify-between ${isInlineEditing ? 'cursor-pointer hover:bg-amber-50/50' : ''}`}
                  >
                    <span className="font-semibold text-gray-900">Check / Cheque :</span>
                    <span className="font-mono text-xs font-bold w-6 h-5 border border-black rounded-xs flex items-center justify-center mr-2">
                      {paymentMode.toLowerCase().includes('check') || paymentMode.toLowerCase().includes('cheque') ? '✓' : ''}
                    </span>
                  </div>

                  {/* Card */}
                  <div 
                    onClick={() => isInlineEditing && handleChange('paymentMode', 'Debit / Credit Card')}
                    className={`p-1.5 flex items-center justify-between ${isInlineEditing ? 'cursor-pointer hover:bg-amber-50/50' : ''}`}
                  >
                    <span className="font-semibold text-gray-900">Debit / Credit Card :</span>
                    <span className="font-mono text-xs font-bold w-6 h-5 border border-black rounded-xs flex items-center justify-center mr-2">
                      {paymentMode.toLowerCase().includes('card') ? '✓' : ''}
                    </span>
                  </div>

                  {/* Bank Transfer / UPI Ref */}
                  <div 
                    onClick={() => isInlineEditing && handleChange('paymentMode', 'Bank Transfer / RTGS / NEFT / UPI')}
                    className={`p-2 space-y-1 bg-slate-50/50 ${isInlineEditing ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-black text-[8pt]">
                        Bank Transfer / RTGS / NEFT / UPI reference number:
                      </span>
                      <span className="font-mono text-xs font-bold w-6 h-5 border border-black rounded-xs flex items-center justify-center shrink-0">
                        {paymentMode.toLowerCase().includes('bank') || paymentMode.toLowerCase().includes('upi') || paymentMode.toLowerCase().includes('neft') || paymentMode.toLowerCase().includes('rtgs') ? '✓' : ''}
                      </span>
                    </div>
                    <div>
                      {isInlineEditing ? (
                        <input
                          type="text"
                          value={txnReference}
                          placeholder="Enter UTR / UPI / Cheque reference number..."
                          onChange={(e) => handleChange('txnReference', e.target.value)}
                          className="w-full font-mono font-bold text-slate-900 text-[8pt] border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none print:border-none print:bg-transparent print:p-0"
                        />
                      ) : (
                        <div className="font-mono font-bold text-slate-900 text-[8pt] pl-1 break-all">
                          {txnReference || 'UPI / NEFT Verified Ref'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Signatures & Seal Section */}
          <div className="grid grid-cols-12 text-[9pt] flex-1">
            {/* Left: Receiver Name & Stamp (6 Cols) */}
            <div className="col-span-6 p-3 border-r-2 border-black flex flex-col justify-between relative min-h-[140px]">
              <div className="space-y-1">
                <div className="font-bold text-black flex items-center gap-1">
                  <span>Receiver Name :</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={receiverName}
                      onChange={(e) => handleChange('receiverName', e.target.value)}
                      className="font-extrabold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none flex-1 print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <span className="font-extrabold">{receiverName}</span>
                  )}
                </div>
                <div className="font-bold text-black flex items-center gap-1">
                  <span>Mobile No :</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={receiverPhone}
                      onChange={(e) => handleChange('receiverPhone', e.target.value)}
                      className="font-mono font-extrabold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none w-36 print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <span className="font-mono font-extrabold">{receiverPhone}</span>
                  )}
                </div>
              </div>

              {/* Official Blue Round Seal */}
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
                <div className="font-bold text-black flex items-center gap-1">
                  <span>Received Date :</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={receiptDate}
                      onChange={(e) => handleChange('receiptDate', e.target.value)}
                      className="font-mono font-bold border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none w-32 print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <span className="font-mono font-bold">{receiptDate}</span>
                  )}
                </div>
                <div className="font-bold text-gray-900 flex items-center gap-1">
                  <span>Received on Behalf of :</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={receivedOnBehalfOf}
                      onChange={(e) => handleChange('receivedOnBehalfOf', e.target.value)}
                      className="font-extrabold text-black border-b border-dashed border-amber-600 bg-amber-50/50 px-1 py-0.5 outline-none flex-1 print:border-none print:bg-transparent print:p-0"
                    />
                  ) : (
                    <span className="font-extrabold text-black">{receivedOnBehalfOf}</span>
                  )}
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

      {/* ============================================================== */}
      {/* COMPREHENSIVE RECEIPT EDIT MODAL DIALOG (no-print)             */}
      {/* ============================================================== */}
      {isEditingModalOpen && (
        <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0b1b3d] to-[#1e3a8a] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-amber-400 text-slate-950 rounded-lg">
                  <Edit3 size={16} />
                </span>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wide">
                    Edit Advance Payment Receipt Details
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Modifications will immediately update the live receipt and print preview.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingModalOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-800">
              {/* Category 1: Receipt & Customer Details */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="font-black text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                  <Receipt size={14} className="text-amber-600" />
                  <span>1. Receipt Header &amp; Customer Information</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Receipt No</label>
                    <input
                      type="text"
                      value={receiptNo}
                      onChange={(e) => handleChange('receiptNo', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Receipt Date</label>
                    <input
                      type="text"
                      value={receiptDate}
                      onChange={(e) => handleChange('receiptDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">System Size (kW)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={capacityKw}
                      onChange={(e) => handleChange('capacityKw', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Customer Name (Mr./Ms.)</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => handleChange('customerName', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold uppercase focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Mobile Number</label>
                    <input
                      type="text"
                      value={mobile}
                      onChange={(e) => handleChange('mobile', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Address Line</label>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => handleChange('addressLine1', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">District</label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => handleChange('district', e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg focus:border-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">State</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg focus:border-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">PIN Code</label>
                      <input
                        type="text"
                        value={pinCode}
                        onChange={(e) => handleChange('pinCode', e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-mono focus:border-blue-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Electricity Consumer No (UNC)</label>
                    <input
                      type="text"
                      value={consumerNo}
                      onChange={(e) => handleChange('consumerNo', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Category 2: Financial Commercials (Bank Amount) */}
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
                <div className="font-black text-amber-950 text-xs uppercase tracking-wide flex items-center justify-between border-b border-amber-200 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-amber-700" />
                    <span>2. Financial Commercials</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Bank Amount Enabled
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">
                      Total Project Cost (₹)
                    </label>
                    <input
                      type="number"
                      value={projectCost}
                      onChange={(e) => handleChange('projectCost', Number(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-black text-slate-900 focus:border-blue-600 outline-none text-sm"
                    />
                    <span className="text-[9px] text-slate-500 mt-0.5 block">Bank PO Quotation Amount</span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">
                      Advance Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={advanceAmount}
                      onChange={(e) => handleChange('advanceAmount', Number(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-white border border-emerald-400 rounded-lg font-mono font-black text-emerald-800 focus:border-blue-600 outline-none text-sm"
                    />
                    <span className="text-[9px] text-slate-500 mt-0.5 block">Token Advance Received</span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">
                      Balance Due (₹)
                    </label>
                    <input
                      type="number"
                      value={balanceAmount}
                      onChange={(e) => handleChange('balanceAmount', Number(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900 focus:border-blue-600 outline-none text-sm"
                    />
                    <span className="text-[9px] text-slate-500 mt-0.5 block">Auto calculated: Cost - Advance</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">
                    Amount In Words
                  </label>
                  <input
                    type="text"
                    value={amountInWords}
                    onChange={(e) => handleChange('amountInWords', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-black text-blue-950 uppercase focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              {/* Category 3: Payment Mode & Purpose */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="font-black text-slate-900 text-xs uppercase tracking-wide border-b border-slate-200 pb-1.5">
                  3. Payment Mode &amp; Transaction Details
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Payment Method</label>
                    <select
                      value={paymentMode}
                      onChange={(e) => handleChange('paymentMode', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold focus:border-blue-600 outline-none"
                    >
                      <option value="Bank Transfer / RTGS / NEFT / UPI">Bank Transfer / RTGS / NEFT / UPI</option>
                      <option value="Cash">Cash</option>
                      <option value="Check / Cheque">Check / Cheque</option>
                      <option value="Debit / Credit Card">Debit / Credit Card</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Transaction / Cheque / UTR Ref</label>
                    <input
                      type="text"
                      placeholder="e.g. UTR123456789 or UPI-4829104"
                      value={txnReference}
                      onChange={(e) => handleChange('txnReference', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Reason For Payment</label>
                  <textarea
                    rows={2}
                    value={reasonForPayment}
                    onChange={(e) => handleChange('reasonForPayment', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              {/* Category 4: Receiver & Signatures */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="font-black text-slate-900 text-xs uppercase tracking-wide border-b border-slate-200 pb-1.5">
                  4. Receiver &amp; Authorization Details
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Receiver Name</label>
                    <input
                      type="text"
                      value={receiverName}
                      onChange={(e) => handleChange('receiverName', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Receiver Mobile</label>
                    <input
                      type="text"
                      value={receiverPhone}
                      onChange={(e) => handleChange('receiverPhone', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Received on Behalf of</label>
                    <input
                      type="text"
                      value={receivedOnBehalfOf}
                      onChange={(e) => handleChange('receivedOnBehalfOf', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg font-semibold transition cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset to Bank Defaults</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEditingModalOpen(false)}
                className="flex items-center gap-1.5 px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs transition cursor-pointer"
              >
                <Check size={14} />
                <span>Save &amp; View Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvanceReceiptView;
