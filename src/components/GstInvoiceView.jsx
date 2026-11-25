import React, { useState, useEffect } from 'react';
import { formatINR, numberToWordsINR, calculateGSTBreakdown } from '../utils/calculations';
import { 
  FileText, 
  RotateCcw, 
  Pencil, 
  Printer, 
  Building2,
  Check
} from 'lucide-react';

export const GstInvoiceView = ({ quotation, onUpdateInvoice }) => {
  const customer = quotation?.customer || {};
  const system = quotation?.system || {};
  const pricing = quotation?.pricing || {};
  const initialInvoice = quotation?.invoice || {};

  // Total project cost for statutory GST invoice (Bank PO / Project Cost)
  const defaultCost = Number(
    pricing.bankCost !== undefined 
      ? pricing.bankCost 
      : (pricing.totalCost || pricing.customerCost || 220000)
  );

  const getInitialState = () => {
    const cost = Number(
      initialInvoice.totalCost !== undefined && initialInvoice.totalCost !== null && initialInvoice.totalCost !== ''
        ? initialInvoice.totalCost
        : defaultCost
    );

    const capacity = Number(system.capacityKw || 5);
    const panelsCount = Number(system.panelsCount || (capacity * 2));
    const moduleBrand = system.moduleBrand || "Waaree Energies 550Wp TOPCon";
    const inverterBrand = system.inverterBrand || `${capacity} KW On-Grid Inverter`;

    return {
      invoiceNo: initialInvoice.invoiceNo || customer.consumerNo || '',
      invoiceDate: initialInvoice.invoiceDate || quotation?.date || '',
      customerName: initialInvoice.customerName !== undefined ? initialInvoice.customerName : (customer.name || ''),
      addressLine1: initialInvoice.addressLine1 !== undefined ? initialInvoice.addressLine1 : (customer.addressLine1 || customer.address || ''),
      district: initialInvoice.district !== undefined ? initialInvoice.district : (customer.district || ''),
      state: initialInvoice.state || customer.state || 'TELANGANA',
      pinCode: initialInvoice.pinCode !== undefined ? initialInvoice.pinCode : (customer.pinCode || customer.pincode || ''),
      mobile: initialInvoice.mobile !== undefined ? initialInvoice.mobile : (customer.phone || customer.mobile || ''),
      consumerNo: initialInvoice.consumerNo !== undefined ? initialInvoice.consumerNo : (customer.consumerNo || quotation?.refNo || ''),
      capacityKw: capacity,
      panelsCount: panelsCount,
      moduleBrand: moduleBrand,
      inverterBrand: inverterBrand,
      totalCost: cost,
      hsnGoods: initialInvoice.hsnGoods || '8504',
      sacServices: initialInvoice.sacServices || '9954',
      signatoryName: initialInvoice.signatoryName || 'T.RAVINDRA CHARY'
    };
  };

  const [invoiceData, setInvoiceData] = useState(getInitialState);
  const [isInlineEditing, setIsInlineEditing] = useState(false);

  // Synchronize state if quotation prop changes
  useEffect(() => {
    setInvoiceData(getInitialState());
  }, [quotation?.id, quotation?.date, pricing.bankCost, pricing.totalCost, pricing.customerCost]);

  const handleChange = (field, value) => {
    setInvoiceData(prev => {
      const updated = { ...prev, [field]: value };
      if (onUpdateInvoice) {
        onUpdateInvoice(updated);
      }
      return updated;
    });
  };

  const handleReset = () => {
    const defaultState = {
      invoiceNo: customer.consumerNo || '',
      invoiceDate: quotation?.date || '',
      customerName: customer.name || '',
      addressLine1: customer.addressLine1 || customer.address || '',
      district: customer.district || '',
      state: customer.state || 'TELANGANA',
      pinCode: customer.pinCode || customer.pincode || '',
      mobile: customer.phone || customer.mobile || '',
      consumerNo: customer.consumerNo || quotation?.refNo || '',
      capacityKw: Number(system.capacityKw || 5),
      panelsCount: Number(system.panelsCount || ((system.capacityKw || 5) * 2)),
      moduleBrand: system.moduleBrand || "Waaree Energies 550Wp TOPCon",
      inverterBrand: system.inverterBrand || `${system.capacityKw || 5} KW On-Grid Inverter`,
      totalCost: defaultCost,
      hsnGoods: '8504',
      sacServices: '9954',
      signatoryName: 'T.RAVINDRA CHARY'
    };
    setInvoiceData(defaultState);
    if (onUpdateInvoice) {
      onUpdateInvoice(defaultState);
    }
  };

  const {
    invoiceNo,
    invoiceDate,
    customerName,
    addressLine1,
    district,
    state,
    pinCode,
    mobile,
    consumerNo,
    capacityKw,
    panelsCount,
    moduleBrand,
    inverterBrand,
    totalCost,
    hsnGoods,
    sacServices,
    signatoryName
  } = invoiceData;

  // Compute statutory 70:30 GST breakdown strictly on 100% full invoice amount
  const gst = calculateGSTBreakdown(Number(totalCost) || 0);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ============================================================== */}
      {/* INTERACTIVE CONTROLS TOOLBAR (Hidden when printing)           */}
      {/* ============================================================== */}
      <div className="no-print w-full max-w-[210mm] mb-3 flex flex-wrap items-center justify-between gap-2 p-2.5 bg-white border border-slate-300 rounded-xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#0b1b3d] text-amber-400 font-bold">
            <FileText size={16} />
          </span>
          <div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <span>Official GST Tax Invoice Generator</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                Invoice Total: ₹{formatINR(totalCost)}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Statutory 70:30 Solar EPC Tax Invoice matching official government format.
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
      {/* MASTER A4 GST INVOICE SHEET (Prints 100% Authentically)        */}
      {/* ============================================================== */}
      <div className="a4-preview-sheet p-6 sm:p-8 bg-white text-black font-sans relative overflow-hidden w-[210mm] min-h-[297mm] mx-auto shadow-lg flex flex-col justify-between">
        {/* Outer Solid Master Border */}
        <div className="border-[2px] border-black h-full flex flex-col p-0 overflow-hidden text-[9pt]">
          
          {/* Top Header: GST INVOICE */}
          <div className="py-1 px-3 border-b-2 border-black text-center bg-white">
            <h1 className="text-base sm:text-lg font-black tracking-widest uppercase font-serif text-black">
              GST INVOICE
            </h1>
          </div>

          {/* Company Details & Right Logo/Meta Grid */}
          <div className="grid grid-cols-12 border-b-2 border-black">
            {/* Left Box: Company Info (7 Cols) */}
            <div className="col-span-8 p-3 border-r-2 border-black flex flex-col justify-center space-y-1">
              <h2 className="text-base sm:text-lg font-black tracking-wide text-[#c2410c] uppercase font-serif">
                SRIMAAN SOLAR SOLUTIONS
              </h2>
              <div className="text-[9pt] leading-tight text-black font-bold space-y-0.5">
                <p># 6-210,Sriramnagar Auto nagar,Warangal x road</p>
                <p>Khammam-507003,Telangana,India</p>
                <p>Mob. No 9347416140,9912416140</p>
                <p className="pt-0.5 font-bold">
                  GSTIN : <strong className="font-mono text-black font-extrabold">36ADPPT2441N1ZW</strong> &nbsp;
                  <span>VENDOR REG.NO :TSRE250511</span>
                </p>
                <p>Email id :Ravindrachary1972@gmail.com</p>
                <p className="font-black text-black pt-0.5 tracking-wider">
                  STATE NAME : &nbsp;&nbsp; TELANGANA &nbsp;&nbsp;&nbsp;&nbsp; CODE : 36
                </p>
              </div>
            </div>

            {/* Right Box: Invoice No, Dated, Logo & Meta Lines (4 Cols) */}
            <div className="col-span-4 flex flex-col justify-between bg-white">
              {/* Invoice No & Dated Row */}
              <div className="grid grid-cols-2 divide-x-2 divide-black border-b border-black text-[8.5pt]">
                <div className="p-1.5 flex flex-col justify-center">
                  <span className="font-bold text-gray-700 text-[8pt]">Invoice No</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={invoiceNo}
                      onChange={(e) => handleChange('invoiceNo', e.target.value)}
                      className="font-mono font-bold text-black border-b border-dashed border-amber-600 bg-amber-50/50 outline-none w-full px-0.5"
                    />
                  ) : (
                    <span className="font-mono font-bold text-black text-[9.5pt]">{invoiceNo}</span>
                  )}
                </div>
                <div className="p-1.5 flex flex-col justify-center text-center">
                  <span className="font-bold text-gray-700 text-[8pt]">Dated</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={invoiceDate}
                      onChange={(e) => handleChange('invoiceDate', e.target.value)}
                      className="font-mono font-bold text-black border-b border-dashed border-amber-600 bg-amber-50/50 outline-none w-full text-center px-0.5"
                    />
                  ) : (
                    <span className="font-mono font-bold text-black text-[9.5pt]">{invoiceDate}</span>
                  )}
                </div>
              </div>

              {/* Logo Box */}
              <div className="p-2 flex flex-col items-center justify-center text-center flex-1">
                <div className="h-16 w-36 flex items-center justify-center">
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

              {/* Blank Transporter / Delivery Lines Grid */}
              <div className="border-t border-black divide-y divide-black text-[7.5pt]">
                <div className="h-4 px-1.5 flex items-center text-gray-400"></div>
                <div className="h-4 px-1.5 flex items-center text-gray-400"></div>
                <div className="h-4 px-1.5 flex items-center text-gray-400"></div>
              </div>
            </div>
          </div>

          {/* Customer / Consignee & Bill To Section */}
          <div className="border-b-2 border-black">
            <div className="grid grid-cols-12">
              {/* Customer Particulars (Left 8 Cols) */}
              <div className="col-span-8 p-2.5 border-r-2 border-black space-y-1">
                <div className="font-bold text-black text-[9pt]">
                  Customer Name Consignee (ship to)
                </div>
                <div className="font-bold text-black text-[9.5pt] uppercase">
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => handleChange('customerName', e.target.value)}
                      className="w-full font-black border-b border-dashed border-amber-600 bg-amber-50/50 px-1 outline-none"
                    />
                  ) : (
                    customerName
                  )}
                </div>
                <div className="text-gray-900 font-semibold text-[8.5pt]">
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => handleChange('addressLine1', e.target.value)}
                      className="w-full border-b border-dashed border-amber-600 bg-amber-50/50 px-1 outline-none"
                    />
                  ) : (
                    `${addressLine1}, ${district}, ${state} - ${pinCode}`
                  )}
                </div>
                <div className="text-gray-900 font-bold text-[8.5pt] flex items-center gap-1 pt-1">
                  <span>Mobile:</span>
                  {isInlineEditing ? (
                    <input
                      type="text"
                      value={mobile}
                      onChange={(e) => handleChange('mobile', e.target.value)}
                      className="w-36 font-mono border-b border-dashed border-amber-600 bg-amber-50/50 px-1 outline-none font-bold"
                    />
                  ) : (
                    <span className="font-mono">{mobile}</span>
                  )}
                </div>
                <div className="pt-1 text-[8.5pt] font-black text-black">
                  BILL TO : <span className="font-bold">{customerName}, {district}</span>
                </div>
              </div>

              {/* Right Side Blank / Delivery Column (4 Cols) */}
              <div className="col-span-4 divide-y divide-black text-[8pt]">
                <div className="h-6 px-2 flex items-center text-gray-500 font-medium"></div>
                <div className="h-6 px-2 flex items-center text-gray-500 font-medium"></div>
                <div className="h-6 px-2 flex items-center text-gray-500 font-medium"></div>
                <div className="h-6 px-2 flex items-center text-gray-500 font-medium"></div>
              </div>
            </div>

            {/* Consumer UNC Identifier Strip */}
            <div className="border-t-2 border-black px-2.5 py-1 bg-slate-50 font-mono font-bold text-black text-[9pt] flex items-center justify-between">
              <span>
                {isInlineEditing ? (
                  <input
                    type="text"
                    value={consumerNo}
                    onChange={(e) => handleChange('consumerNo', e.target.value)}
                    className="border-b border-dashed border-amber-600 bg-amber-50 px-1 outline-none font-mono"
                  />
                ) : (
                  consumerNo
                )}
              </span>
              <span className="text-[7.5pt] font-sans text-gray-600 font-bold uppercase">
                TSNPDCL / TSSPDCL Net-Metering Consumer Service Connection
              </span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* INVOICE ITEMS & STATUTORY GST TABLE                           */}
          {/* ============================================================== */}
          <div className="flex-1 flex flex-col justify-start border-b-2 border-black">
            <table className="w-full border-collapse text-[8.5pt]">
              <thead>
                <tr className="border-b-2 border-black bg-white text-black font-black uppercase text-[8.5pt]">
                  <th className="py-1 px-1.5 text-center border-r-2 border-black w-12">S.NO</th>
                  <th className="py-1 px-2.5 text-left border-r-2 border-black">Items Names</th>
                  <th className="py-1 px-2 text-center border-r-2 border-black w-24">Quantity</th>
                  <th className="py-1 px-2 text-center border-r-2 border-black w-20">HSN/SAC</th>
                  <th className="py-1 px-2.5 text-right w-28 pr-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black font-semibold text-black">
                {/* Item 1: Solar Modules & Inverter (70% Goods @ 5% GST) */}
                <tr>
                  <td className="py-2 px-1.5 text-center font-bold border-r-2 border-black align-top">
                    1
                  </td>
                  <td className="py-2 px-2.5 text-left border-r-2 border-black align-top space-y-3">
                    <div>
                      <div className="font-bold text-black">
                        Modules : <span className="font-semibold text-gray-900">{moduleBrand}</span>
                      </div>
                      <div className="text-[7.5pt] text-gray-600 font-medium">
                        Tier-1 High Efficiency DCR Solar Photovoltaic Modules
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="font-bold text-black">
                        Inverter : <span className="font-semibold text-gray-900">{inverterBrand}</span>
                      </div>
                      <div className="text-[7.5pt] text-gray-600 font-medium">
                        Smart Grid-Tied Multi-MPPT Inverter with IoT Remote Monitoring
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-center border-r-2 border-black align-top space-y-3 font-mono">
                    <div className="font-bold">{panelsCount} Nos</div>
                    <div className="pt-5 font-bold">1 Unit</div>
                  </td>
                  <td className="py-2 px-2 text-center border-r-2 border-black align-top font-mono font-bold">
                    {hsnGoods}
                  </td>
                  <td className="py-2 px-2.5 text-right pr-3 font-mono font-bold align-top text-black">
                    {formatINR(gst.goodsBase)}
                  </td>
                </tr>

                {/* Item 2: Structure, BOS, Transport, Erection, I&C (30% Services @ 18% GST) */}
                <tr>
                  <td className="py-2 px-1.5 text-center font-bold border-r-2 border-black align-top">
                    2
                  </td>
                  <td className="py-2 px-2.5 text-left border-r-2 border-black align-top leading-tight text-[8pt]">
                    Galvanized Structure ,Polycab Cables,ACDB,DCDB Boxes,Junction Boxes, Earthing Kit,&amp; Other accessories as required,Erection,Plumbing,Civil work,Transportation ,Installation and Commissioning Services
                  </td>
                  <td className="py-2 px-2 text-center border-r-2 border-black align-top font-mono font-bold">
                    1 Job
                  </td>
                  <td className="py-2 px-2 text-center border-r-2 border-black align-top font-mono font-bold">
                    {sacServices}
                  </td>
                  <td className="py-2 px-2.5 text-right pr-3 font-mono font-bold align-top text-black">
                    {formatINR(gst.servicesBase)}
                  </td>
                </tr>

                {/* CGST @ 2.5% on Goods */}
                <tr>
                  <td className="py-1 px-1.5 border-r-2 border-black"></td>
                  <td className="py-1 px-2.5 text-right font-black border-r-2 border-black pr-4">
                    CGST @ 2.5%
                  </td>
                  <td className="py-1 px-2 border-r-2 border-black"></td>
                  <td className="py-1 px-2 text-center border-r-2 border-black font-mono font-bold">
                    {hsnGoods}
                  </td>
                  <td className="py-1 px-2.5 text-right pr-3 font-mono font-bold text-black">
                    {formatINR(gst.goodsCgst)}
                  </td>
                </tr>

                {/* SGST @ 2.5% on Goods */}
                <tr>
                  <td className="py-1 px-1.5 border-r-2 border-black"></td>
                  <td className="py-1 px-2.5 text-right font-black border-r-2 border-black pr-4">
                    SGST @2.5%
                  </td>
                  <td className="py-1 px-2 border-r-2 border-black"></td>
                  <td className="py-1 px-2 text-center border-r-2 border-black font-mono font-bold">
                    {hsnGoods}
                  </td>
                  <td className="py-1 px-2.5 text-right pr-3 font-mono font-bold text-black">
                    {formatINR(gst.goodsSgst)}
                  </td>
                </tr>

                {/* CGST @ 9% on Services */}
                <tr>
                  <td className="py-1 px-1.5 border-r-2 border-black"></td>
                  <td className="py-1 px-2.5 text-right font-black border-r-2 border-black pr-4">
                    CGST @ 9%
                  </td>
                  <td className="py-1 px-2 border-r-2 border-black"></td>
                  <td className="py-1 px-2 text-center border-r-2 border-black font-mono font-bold">
                    {sacServices}
                  </td>
                  <td className="py-1 px-2.5 text-right pr-3 font-mono font-bold text-black">
                    {formatINR(gst.servicesCgst)}
                  </td>
                </tr>

                {/* SGST @ 9% on Services */}
                <tr>
                  <td className="py-1 px-1.5 border-r-2 border-black"></td>
                  <td className="py-1 px-2.5 text-right font-black border-r-2 border-black pr-4">
                    SGST @9%
                  </td>
                  <td className="py-1 px-2 border-r-2 border-black"></td>
                  <td className="py-1 px-2 text-center border-r-2 border-black font-mono font-bold">
                    {sacServices}
                  </td>
                  <td className="py-1 px-2.5 text-right pr-3 font-mono font-bold text-black">
                    {formatINR(gst.servicesSgst)}
                  </td>
                </tr>

                {/* Round off */}
                <tr>
                  <td className="py-1 px-1.5 border-r-2 border-black"></td>
                  <td className="py-1 px-2.5 text-right font-black border-r-2 border-black pr-4">
                    Round off
                  </td>
                  <td className="py-1 px-2 border-r-2 border-black"></td>
                  <td className="py-1 px-2 border-r-2 border-black"></td>
                  <td className="py-1 px-2.5 text-right pr-3 font-mono font-bold text-black">
                    0
                  </td>
                </tr>

                {/* Total */}
                <tr className="border-t-2 border-black bg-slate-50 font-black text-black text-[9.5pt]">
                  <td className="py-1.5 px-1.5 text-center font-black border-r-2 border-black">
                    Total
                  </td>
                  <td className="py-1.5 px-2.5 border-r-2 border-black"></td>
                  <td className="py-1.5 px-2 border-r-2 border-black"></td>
                  <td className="py-1.5 px-2 border-r-2 border-black"></td>
                  <td className="py-1.5 px-2.5 text-right pr-3 font-mono font-black text-[10pt] text-black">
                    {formatINR(gst.totalProjectCost)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount Chargeable in Words */}
          <div className="py-1.5 px-3 border-b-2 border-black bg-white font-bold text-black text-[8.5pt]">
            <span>Amount Charageble (in words) : </span>
            <span className="font-extrabold uppercase font-mono text-[#0b1b3d]">
              Inr {numberToWordsINR(gst.totalProjectCost)}
            </span>
          </div>

          {/* Footer & Signatory Section */}
          <div className="grid grid-cols-12 text-[8pt]">
            {/* Left Box: Terms & Bank Accounts (6 Cols) */}
            <div className="col-span-6 divide-y-2 divide-black border-r-2 border-black">
              <div className="p-1.5 font-semibold text-gray-800 leading-tight">
                Bank: <strong className="text-black">HDFC Bank</strong> | A/c: <strong className="font-mono text-black">50200095253784</strong> | IFSC: <strong className="font-mono text-black">HDFC0001631</strong>
              </div>
              <div className="p-1.5 font-semibold text-gray-800 leading-tight">
                Bank: <strong className="text-black">State Bank of India</strong> | A/c: <strong className="font-mono text-black">44813579950</strong> | IFSC: <strong className="font-mono text-black">SBIN0065049</strong>
              </div>
              <div className="p-1.5 text-gray-700 leading-tight">
                1. Central Government DBT subsidy is directly credited to customer bank account.
              </div>
              <div className="p-1.5 text-gray-700 leading-tight">
                2. Warranty &amp; Performance terms as per official manufacturer EPC contract.
              </div>
            </div>

            {/* Right Box: Company Signatory & Seal (6 Cols) */}
            <div className="col-span-6 p-2 flex flex-col justify-between items-center text-center">
              <div className="font-extrabold text-black text-[8.5pt] tracking-wider uppercase">
                FOR : SRIMAAN SOLAR SOLUTIONS
              </div>

              {/* Rubber Stamp Image */}
              <div className="h-16 w-16 my-1 flex items-center justify-center">
                <img
                  src="/assets/srimaan_seal.jpeg"
                  alt="Srimaan Solar Seal"
                  className="max-h-full max-w-full object-contain mix-blend-multiply opacity-90 rotate-[-5deg]"
                />
              </div>

              <div className="border-t border-black w-3/4 pt-0.5 text-center">
                <div className="font-bold text-black text-[8.5pt] uppercase">
                  {signatoryName}
                </div>
                <div className="text-[7.5pt] text-gray-600 font-bold uppercase">
                  Authorised Signatory
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
