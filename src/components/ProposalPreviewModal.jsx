import React, { useState } from 'react';
import { 
  ArrowLeft, Printer, ZoomIn, ZoomOut, Copy, Check, 
  FileText, Share2, Download, Eye, Building2, UserCheck, Layers, Receipt
} from 'lucide-react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';
import { Page4 } from './Page4';
import { Page5 } from './Page5';
import { Page6 } from './Page6';
import { Page7 } from './Page7';
import CustomerPage1Cover from './customerPages/CustomerPage1Cover';
import CustomerPage2SystemSpec from './customerPages/CustomerPage2SystemSpec';
import CustomerPage3Financials from './customerPages/CustomerPage3Financials';
import CustomerPage4Portfolio from './customerPages/CustomerPage4Portfolio';
import CustomerPage5CompanyProfile from './customerPages/CustomerPage5CompanyProfile';
import { AdvanceReceiptView } from './AdvanceReceiptView';
import { GstInvoiceView } from './GstInvoiceView';
import { DiscomReportView } from './DiscomReportView';
import { convertToCustomerFormat } from '../utils/quotationAdapter';
import { formatINR, numberToWordsINR, calculateGSTBreakdown } from '../utils/calculations';

export const ProposalPreviewModal = ({ 
  quotation, 
  initialFormat = 'bank', // 'bank' | 'customer' | 'receipt'
  onBack, 
  onEdit,
  onUpdateQuotation
}) => {
  const [currentQuotation, setCurrentQuotation] = useState(quotation);
  const [formatMode, setFormatMode] = useState(initialFormat); // 'bank' | 'customer' | 'receipt'
  const [selectedPage, setSelectedPage] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(85);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Synchronize state if incoming quotation prop changes
  React.useEffect(() => {
    setCurrentQuotation(quotation);
  }, [quotation]);

  const handleUpdateReceipt = (updatedReceipt) => {
    const updated = {
      ...currentQuotation,
      receipt: updatedReceipt
    };
    setCurrentQuotation(updated);
    if (onUpdateQuotation) {
      onUpdateQuotation(updated);
    }
  };

  const handleUpdateInvoice = (updatedInvoice) => {
    const updated = {
      ...currentQuotation,
      invoice: updatedInvoice
    };
    setCurrentQuotation(updated);
    if (onUpdateQuotation) {
      onUpdateQuotation(updated);
    }
  };

  const handleUpdateDiscom = (updatedDiscom) => {
    const updated = {
      ...currentQuotation,
      discom: updatedDiscom
    };
    setCurrentQuotation(updated);
    if (onUpdateQuotation) {
      onUpdateQuotation(updated);
    }
  };

  // Bank Proposal Pages (7 Pages)
  const bankPages = [
    { id: 1, title: 'P1: Cover', fullTitle: 'Page 1 of 7: Cover & Techno Offer', component: Page1 },
    { id: 2, title: 'P2: Grid System', fullTitle: 'Page 2 of 7: On-Grid System Architecture', component: Page2 },
    { id: 3, title: 'P3: Benefits', fullTitle: 'Page 3 of 7: Techno-Commercial Benefits', component: Page3 },
    { id: 4, title: 'P4: Specs & Mounting', fullTitle: 'Page 4 of 7: Specifications & Structure Comparison', component: Page4 },
    { id: 5, title: 'P5: Cost & BOM', fullTitle: 'Page 5 of 7: Bill of Materials & Cost Estimation', component: Page5 },
    { id: 6, title: 'P6: Payback & Bank', fullTitle: 'Page 6 of 7: Subsidy, Payback & Payment Terms', component: Page6 },
    { id: 7, title: 'P7: Terms & Conditions', fullTitle: 'Page 7 of 7: Commercial Terms & Conditions', component: Page7 },
  ];

  // Customer Proposal Pages (5 Pages)
  const customerPages = [
    { id: 1, title: 'P1: Cover & ROI', fullTitle: 'Page 1 of 5: Executive Cover & ROI Snapshot', component: CustomerPage1Cover },
    { id: 2, title: 'P2: Hardware & BOM', fullTitle: 'Page 2 of 5: Technical Specifications & BOM', component: CustomerPage2SystemSpec },
    { id: 3, title: 'P3: Financials & Cashflow', fullTitle: 'Page 3 of 5: Commercials & 25-Yr Cashflow', component: CustomerPage3Financials },
    { id: 4, title: 'P4: Payment & Annexure', fullTitle: 'Page 4 of 5: Payment Terms, Technical Annexure & Acceptance', component: CustomerPage4Portfolio },
    { id: 5, title: 'P5: Profile & Connect', fullTitle: 'Page 5 of 5: Corporate Profile, Credentials & Digital Connect', component: CustomerPage5CompanyProfile },
  ];

  const currentPagesList = formatMode === 'bank' ? bankPages : customerPages;

  // Convert quotation for customer format components
  const { quotation: customerQuotation, settings: customerSettings } = convertToCustomerFormat(quotation);

  // STRICT GUARANTEE: Bank Proposal strictly uses Bank PO Pricing only (never customer quotation price)
  const bankCostVal = Number(quotation.pricing?.bankCost || (quotation.pricing?.customerCost ? Math.round(quotation.pricing.customerCost * 1.12) : quotation.pricing?.totalCost) || 0);
  const bankSubsidyVal = Number(quotation.pricing?.subsidyAmount !== undefined ? quotation.pricing.subsidyAmount : 78000);
  const bankNetVal = Math.max(0, bankCostVal - bankSubsidyVal);

  const bankQuotation = {
    ...quotation,
    bank: quotation.bank || {
      accountName: "SRIMAAN SOLAR SOLUTIONS",
      accountNo: "50200095253784",
      ifscCode: "HDFC0001631",
      bankName: "HDFC BANK"
    },
    bank2: quotation.bank2 || {
      accountName: "SRIMAAN SOLAR SOLUTIONS",
      accountNo: "44813579950",
      ifscCode: "SBIN0065049",
      bankName: "STATE BANK OF INDIA"
    },
    pricing: {
      ...quotation.pricing,
      bankCost: bankCostVal,
      totalCost: bankCostVal, // Enforce Bank PO Cost as totalCost for all 7 Bank pages
      subsidyAmount: bankSubsidyVal,
      afterSubsidyCost: bankNetVal, // Enforce Bank Net Cost as afterSubsidyCost for Bank pages
      bankNetCost: bankNetVal
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyWhatsApp = () => {
    if (formatMode === 'receipt') {
      const rec = currentQuotation.receipt || {};
      const totalCost = Number(rec.projectCost !== undefined ? rec.projectCost : (currentQuotation.pricing?.bankCost || currentQuotation.pricing?.totalCost || 375000));
      const adv = Number(rec.advanceAmount !== undefined ? rec.advanceAmount : Math.round(totalCost * 0.1));
      const bal = Number(rec.balanceAmount !== undefined ? rec.balanceAmount : Math.max(0, totalCost - adv));
      const summary = `🧾 *SRIMAAN SOLAR SOLUTIONS - ADVANCE PAYMENT RECEIPT*
----------------------------------------
👤 *Customer:* ${rec.customerName || currentQuotation.customer?.name || 'Valued Customer'}
📍 *Address:* ${rec.addressLine1 || currentQuotation.customer?.addressLine1 || currentQuotation.customer?.address || ''}, ${rec.district || currentQuotation.customer?.district || ''}, ${rec.state || currentQuotation.customer?.state || 'TELANGANA'}
📱 *Mobile:* ${rec.mobile || currentQuotation.customer?.phone || currentQuotation.customer?.mobile || ''}
📑 *Receipt No:* ${rec.receiptNo || currentQuotation.customer?.consumerNo || currentQuotation.refNo || '32'}
📅 *Date:* ${rec.receiptDate || currentQuotation.date || ''}
⚡ *System Capacity:* ${rec.capacityKw || currentQuotation.system?.capacityKw || 5} kWp

💰 *PAYMENT BREAKUP (BANK PO PRICING):*
• Total Project Cost: ₹${formatINR(totalCost)}
• Advance Payment Received: ₹${formatINR(adv)}
• Balance Payable: ₹${formatINR(bal)}
• Amount in Words: ${rec.amountInWords || numberToWordsINR(adv)}
• Payment Mode: ${rec.paymentMode || 'Bank Transfer / RTGS / NEFT / UPI'}
${rec.txnReference ? `• Ref/Txn No: ${rec.txnReference}\n` : ''}• Purpose: ${rec.reasonForPayment || 'Start work of contract load & feasibility permission'}

🏢 *Srimaan Solar Solutions*
📍 #6-210, Sriramnagar, Auto nagar, Khammam-507003
📞 Contact: ${rec.receiverPhone || '9347416140 / 9912416140'}`;

      navigator.clipboard.writeText(summary);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
      return;
    }

    if (formatMode === 'invoice') {
      const inv = currentQuotation.invoice || {};
      const totalCost = Number(inv.totalCost !== undefined ? inv.totalCost : (currentQuotation.pricing?.bankCost || currentQuotation.pricing?.totalCost || 220000));
      const gst = calculateGSTBreakdown(totalCost);
      const summary = `🧾 *SRIMAAN SOLAR SOLUTIONS - OFFICIAL GST TAX INVOICE*
----------------------------------------
👤 *Customer:* ${inv.customerName || currentQuotation.customer?.name || 'Valued Customer'}
📍 *Address:* ${inv.addressLine1 || currentQuotation.customer?.addressLine1 || currentQuotation.customer?.address || ''}, ${inv.district || currentQuotation.customer?.district || ''}, ${inv.state || currentQuotation.customer?.state || 'TELANGANA'}
📱 *Mobile:* ${inv.mobile || currentQuotation.customer?.phone || currentQuotation.customer?.mobile || ''}
📑 *Invoice No:* ${inv.invoiceNo || currentQuotation.customer?.consumerNo || currentQuotation.refNo || '32'}
📅 *Date:* ${inv.invoiceDate || currentQuotation.date || ''}
⚡ *System Capacity:* ${currentQuotation.system?.capacityKw || 5} kWp

💰 *TAX INVOICE DETAILS (70:30 STATUTORY EPC):*
• Goods (HSN 8504): ₹${formatINR(gst.goodsBase)}
• CGST (2.5%): ₹${formatINR(gst.goodsCgst)} | SGST (2.5%): ₹${formatINR(gst.goodsSgst)}
• Services (SAC 9954): ₹${formatINR(gst.servicesBase)}
• CGST (9%): ₹${formatINR(gst.servicesCgst)} | SGST (9%): ₹${formatINR(gst.servicesSgst)}
👉 *Total Invoice Amount:* ₹${formatINR(gst.totalProjectCost)}
• Amount in Words: Inr ${numberToWordsINR(gst.totalProjectCost)}

🏢 *Srimaan Solar Solutions*
📍 #6-210, Sriramnagar, Auto nagar, Khammam-507003
📞 Contact: 9347416140 / 9912416140`;

      navigator.clipboard.writeText(summary);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
      return;
    }

    if (formatMode === 'discom') {
      const disc = currentQuotation.discom || {};
      const summary = `⚡ *SRIMAAN SOLAR SOLUTIONS - DISCOM SYNCHRONIZATION REPORT*
----------------------------------------
👤 *Applicant:* ${disc.applicantName || currentQuotation.customer?.name || 'Valued Customer'}
📑 *USC/Service No:* ${disc.uscNo || currentQuotation.customer?.consumerNo || currentQuotation.refNo || ''}
🔢 *Net Meter Reg No:* ${disc.regNo || 'TS-NPDCL-NM-2026-8491'}
⚡ *Capacity:* ${disc.totalPlantCapacity || `${currentQuotation.system?.capacityKw || 3} kWp`}
📅 *Synchronization Date:* ${disc.regDate || currentQuotation.date || ''}
📍 *Section / Pole:* ${disc.distributionSection || ''} | ${disc.poleNumber || ''}

📋 *INCLUDED DISCOM REPORTS (3 DOCUMENTS):*
1. Annexure-V(b): LT Net Meter Synchronization & Test Report
2. Part B: Project Completion Report for Grid-Connected Rooftop
3. Annexure-IV: Work Completion Report for Synchronization

🏢 *Empanelled Solar EPC Vendor:*
M/s. SRIMAAN SOLAR SOLUTIONS
📍 #6-210, Sriramnagar Auto Nagar, Warangal X Road, Khammam-507003
📞 9347416140 / 9912416140`;

      navigator.clipboard.writeText(summary);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
      return;
    }

    const isBank = formatMode === 'bank';
    const totalCostToDisplay = isBank ? bankCostVal : Number(quotation.pricing?.customerCost || quotation.pricing?.totalCost || 0);
    const netCostToDisplay = isBank ? bankNetVal : Number(quotation.pricing?.customerCost ? quotation.pricing.customerCost - bankSubsidyVal : quotation.pricing?.afterSubsidyCost || 0);

    const summary = `☀️ *SRIMAAN SOLAR SOLUTIONS - ${isBank ? 'BANK EPC QUOTATION' : 'CUSTOMER SOLAR PROPOSAL'}*
----------------------------------------
👤 *Customer:* ${quotation.customer.name}
📍 *Location:* ${quotation.customer.district || ''}, ${quotation.customer.state || ''}
⚡ *System Capacity:* ${quotation.system.capacityKw} kW (${quotation.system.phase})
📑 *Reference No:* ${quotation.refNo}
📅 *Date:* ${quotation.date}
📑 *Format:* ${isBank ? '7-Page Bank Proposal' : '5-Page Customer Proposal'}

💰 *COMMERCIAL SUMMARY:*
• Total System Cost: ₹${formatINR(totalCostToDisplay)}
• PM Surya Ghar Subsidy: ₹${formatINR(bankSubsidyVal)}
👉 *Net Investment:* ₹${formatINR(netCostToDisplay)}

📊 *GENERATION & ROI:*
• Daily Generation: ~${quotation.system.energyPerDay || (quotation.system.capacityKw * 4)} Units
• Annual Savings: ~₹${formatINR(quotation.pricing.annualSavings)}/year
• Estimated Payback: ${quotation.pricing.paybackYears} Years

🏦 *Bank Accounts for NEFT / RTGS / IMPS:*
• Primary (HDFC): A/C 50200095253784 | IFSC: HDFC0001631
• Secondary (SBI): A/C 44813579950 | IFSC: SBIN0065049
• A/C Name: SRIMAAN SOLAR SOLUTIONS

📞 Contact: ${quotation.company?.phone1 || quotation.company?.phone || '9347416140 / 9912416140'}
📧 Email: ${quotation.company?.email || 'srimaansolarsolutions@gmail.com'}`;

    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="quotation-viewer-wrapper flex flex-col h-full bg-slate-200/90 select-none animate-fadeIn">
      {/* Top Preview Toolbar (Hidden when printing) */}
      <div className="no-print bg-white px-4 py-3 border-b border-slate-300 shadow-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
        
        {/* Left: Back button & Document info */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>
          
          <div>
            <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
              <span>{quotation.customer.name || 'Valued Customer'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                {quotation.refNo}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              {quotation.system.capacityKw} kWp Rooftop System • Net: ₹{formatINR(
                formatMode === 'bank' 
                  ? (quotation.pricing?.bankNetCost || ((quotation.pricing?.bankCost || quotation.pricing?.totalCost || 0) - (quotation.pricing?.subsidyAmount || 0)))
                  : (quotation.pricing?.afterSubsidyCost || 0)
              )}
            </div>
          </div>
        </div>

        {/* Center: DUAL GENERATOR + RECEIPT FORMAT SWITCHER TABS */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
          <button
            onClick={() => {
              setFormatMode('bank');
              setSelectedPage('all');
            }}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              formatMode === 'bank'
                ? 'bg-[#0b132b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Building2 size={14} className={formatMode === 'bank' ? 'text-amber-400' : 'text-slate-500'} />
            <span>Bank Quotation</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              formatMode === 'bank' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
            }`}>
              7 Pages
            </span>
          </button>

          <button
            onClick={() => {
              setFormatMode('customer');
              setSelectedPage('all');
            }}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              formatMode === 'customer'
                ? 'bg-[#064e3b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <UserCheck size={14} className={formatMode === 'customer' ? 'text-emerald-300' : 'text-slate-500'} />
            <span>Customer Quotation</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              formatMode === 'customer' ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
            }`}>
              5 Pages
            </span>
          </button>

          <button
            onClick={() => {
              setFormatMode('receipt');
              setSelectedPage('all');
            }}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              formatMode === 'receipt'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Receipt size={14} className={formatMode === 'receipt' ? 'text-amber-100' : 'text-slate-500'} />
            <span>Advance Receipt</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              formatMode === 'receipt' ? 'bg-amber-300 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
            }`}>
              1 Page
            </span>
          </button>

          {/* GST Invoice Button */}
          <button
            onClick={() => {
              setFormatMode('invoice');
              setSelectedPage('all');
            }}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              formatMode === 'invoice'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <FileText size={14} className={formatMode === 'invoice' ? 'text-indigo-200' : 'text-slate-500'} />
            <span>GST Invoice</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              formatMode === 'invoice' ? 'bg-indigo-300 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
            }`}>
              1 Page
            </span>
          </button>

          {/* DISCOM Synchronization Reports Button */}
          <button
            onClick={() => {
              setFormatMode('discom');
              setSelectedPage('all');
            }}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              formatMode === 'discom'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers size={14} className={formatMode === 'discom' ? 'text-teal-200' : 'text-slate-500'} />
            <span>DISCOM Report</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              formatMode === 'discom' ? 'bg-teal-300 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
            }`}>
              3 Pages
            </span>
          </button>
        </div>

        {/* Center-Right: Page Jump Pills or Receipt/Invoice/DISCOM Label */}
        {formatMode === 'receipt' ? (
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold">
            <Receipt size={13} className="text-amber-600" />
            <span>Official Advance Payment Voucher (1 Page A4)</span>
          </div>
        ) : formatMode === 'invoice' ? (
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-lg text-xs font-bold">
            <FileText size={13} className="text-indigo-600" />
            <span>Official GST Tax Invoice (1 Page A4)</span>
          </div>
        ) : formatMode === 'discom' ? (
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-teal-50 text-teal-900 border border-teal-200 rounded-lg text-xs font-bold">
            <Layers size={13} className="text-teal-600" />
            <span>Official DISCOM Synchronization Package (3 Pages A4 - Annexure IV, V(b) &amp; Part B)</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setSelectedPage('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedPage === 'all'
                  ? (formatMode === 'bank' ? 'bg-[#0b132b] text-white' : 'bg-[#064e3b] text-white')
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All {currentPagesList.length} Pages
            </button>
            
            {currentPagesList.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  selectedPage === page.id
                    ? (formatMode === 'bank' ? 'bg-[#0b132b] text-white' : 'bg-[#064e3b] text-white')
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={page.fullTitle}
              >
                {page.title}
              </button>
            ))}
          </div>
        )}

        {/* Right Actions: Zoom, Copy Summary, Print */}
        <div className="flex items-center space-x-2">
          {/* Zoom controls */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
            <button
              onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
              className="p-1.5 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="px-2 font-mono text-[11px] font-semibold text-slate-700">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
              className="p-1.5 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Copy WhatsApp text */}
          <button
            onClick={handleCopyWhatsApp}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition cursor-pointer"
            title="Copy quotation or receipt summary to WhatsApp"
          >
            {copiedNotification ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
            <span>{copiedNotification ? 'Copied!' : 'WhatsApp'}</span>
          </button>

          {/* Edit Proposal */}
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              Edit
            </button>
          )}

          {/* Print / Save as PDF Button */}
          <button
            onClick={handlePrint}
            className={`flex items-center space-x-1.5 px-4 py-1.5 text-white rounded-lg text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer ${
              formatMode === 'bank' 
                ? 'bg-[#0b132b] hover:bg-slate-800' 
                : formatMode === 'customer' 
                  ? 'bg-[#064e3b] hover:bg-[#047857]' 
                  : formatMode === 'receipt'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : formatMode === 'invoice'
                      ? 'bg-indigo-700 hover:bg-indigo-800'
                      : 'bg-teal-700 hover:bg-teal-800'
            }`}
          >
            <Printer size={15} />
            <span>Print / PDF ({formatMode === 'bank' ? '7P' : formatMode === 'customer' ? '5P' : formatMode === 'receipt' ? '1P Receipt' : formatMode === 'invoice' ? '1P Invoice' : '3P DISCOM'})</span>
          </button>
        </div>
      </div>

      {/* Main Document Canvas Scroll Area */}
      <div className="viewer-scroll-canvas flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center custom-scrollbar">
        <div 
          className="preview-document-container flex flex-col items-center space-y-8 print:space-y-0 transition-transform duration-200 origin-top"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* BANK QUOTATION GENERATOR (7 PAGES) */}
          {formatMode === 'bank' && (
            <>
              {selectedPage === 'all' ? (
                bankPages.map((page) => {
                  const PageComp = page.component;
                  return (
                    <div key={page.id} className="document-page-wrapper shadow-2xl print:shadow-none">
                      <PageComp data={bankQuotation} />
                    </div>
                  );
                })
              ) : (
                <div className="document-page-wrapper shadow-2xl print:shadow-none">
                  {React.createElement(
                    bankPages.find(p => p.id === selectedPage)?.component || Page1,
                    { data: bankQuotation }
                  )}
                </div>
              )}
            </>
          )}

          {/* CUSTOMER QUOTATION GENERATOR (5 PAGES) */}
          {formatMode === 'customer' && (
            <>
              {selectedPage === 'all' ? (
                customerPages.map((page) => {
                  const PageComp = page.component;
                  return (
                    <div key={page.id} className="document-page-wrapper shadow-2xl print:shadow-none">
                      <PageComp 
                        quotation={customerQuotation} 
                        settings={customerSettings} 
                      />
                    </div>
                  );
                })
              ) : (
                <div className="document-page-wrapper shadow-2xl print:shadow-none">
                  {React.createElement(
                    customerPages.find(p => p.id === selectedPage)?.component || CustomerPage1Cover,
                    { quotation: customerQuotation, settings: customerSettings }
                  )}
                </div>
              )}
            </>
          )}

          {/* ADVANCE PAYMENT RECEIPT (1 PAGE A4) */}
          {formatMode === 'receipt' && (
            <div className="document-page-wrapper shadow-2xl print:shadow-none">
              <AdvanceReceiptView 
                quotation={currentQuotation} 
                onUpdateReceipt={handleUpdateReceipt} 
              />
            </div>
          )}

          {/* GST TAX INVOICE (1 PAGE A4) */}
          {formatMode === 'invoice' && (
            <div className="document-page-wrapper shadow-2xl print:shadow-none">
              <GstInvoiceView 
                quotation={currentQuotation} 
                onUpdateInvoice={handleUpdateInvoice} 
              />
            </div>
          )}

          {/* DISCOM SYNCHRONIZATION REPORTS (3 PAGES A4: ANNEXURE-V(b), PART B, ANNEXURE-IV) */}
          {formatMode === 'discom' && (
            <div className="document-page-wrapper shadow-2xl print:shadow-none">
              <DiscomReportView 
                quotation={currentQuotation} 
                onUpdateDiscom={handleUpdateDiscom} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalPreviewModal;
