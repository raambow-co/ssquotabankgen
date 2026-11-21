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
import { convertToCustomerFormat } from '../utils/quotationAdapter';
import { formatINR, numberToWordsINR } from '../utils/calculations';

export const ProposalPreviewModal = ({ 
  quotation, 
  initialFormat = 'bank', // 'bank' | 'customer'
  onBack, 
  onEdit 
}) => {
  const [formatMode, setFormatMode] = useState(initialFormat); // 'bank' | 'customer'
  const [selectedPage, setSelectedPage] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(85);
  const [copiedNotification, setCopiedNotification] = useState(false);

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
    { id: 4, title: 'P4: Projects Portfolio', fullTitle: 'Page 4 of 5: Completed Works Showcase', component: CustomerPage4Portfolio },
    { id: 5, title: 'P5: Company Profile', fullTitle: 'Page 5 of 5: Corporate Profile & Warranties', component: CustomerPage5CompanyProfile },
  ];

  const currentPagesList = formatMode === 'bank' ? bankPages : customerPages;

  // Convert quotation for customer format components
  const { quotation: customerQuotation, settings: customerSettings } = convertToCustomerFormat(quotation);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyWhatsApp = () => {
    if (formatMode === 'receipt') {
      const rec = quotation.receipt || {};
      const totalCost = Number(quotation.pricing?.customerCost || quotation.pricing?.totalCost || 220000);
      const adv = Number(rec.advanceAmount !== undefined ? rec.advanceAmount : Math.round(totalCost * 0.1));
      const bal = Math.max(0, totalCost - adv);
      const summary = `🧾 *SRIMAAN SOLAR SOLUTIONS - ADVANCE PAYMENT RECEIPT*
----------------------------------------
👤 *Customer:* ${quotation.customer?.name || 'Valued Customer'}
📍 *Address:* ${quotation.customer?.addressLine1 || quotation.customer?.address || ''}, ${quotation.customer?.district || ''}, ${quotation.customer?.state || 'TELANGANA'}
📱 *Mobile:* ${quotation.customer?.phone || quotation.customer?.mobile || ''}
📑 *Receipt No:* ${rec.receiptNo || quotation.customer?.consumerNo || quotation.refNo || '32'}
📅 *Date:* ${rec.receiptDate || quotation.date || ''}
⚡ *System Capacity:* ${quotation.system?.capacityKw || 3} kWp

💰 *PAYMENT BREAKUP:*
• Total Project Cost: ₹${formatINR(totalCost)}
• Advance Payment Received: ₹${formatINR(adv)}
• Balance Payable: ₹${formatINR(bal)}
• Amount in Words: ${numberToWordsINR(adv)}
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

    const summary = `☀️ *SRIMAAN SOLAR SOLUTIONS - ${formatMode === 'bank' ? 'BANK EPC QUOTATION' : 'CUSTOMER SOLAR PROPOSAL'}*
----------------------------------------
👤 *Customer:* ${quotation.customer.name}
📍 *Location:* ${quotation.customer.district || ''}, ${quotation.customer.state || ''}
⚡ *System Capacity:* ${quotation.system.capacityKw} kW (${quotation.system.phase})
📑 *Reference No:* ${quotation.refNo}
📅 *Date:* ${quotation.date}
📑 *Format:* ${formatMode === 'bank' ? '7-Page Bank Proposal' : '5-Page Customer Proposal'}

💰 *COMMERCIAL SUMMARY:*
• Total System Cost: ₹${formatINR(quotation.pricing.totalCost)}
• PM Surya Ghar Subsidy: ₹${formatINR(quotation.pricing.subsidyAmount)}
👉 *Net Investment:* ₹${formatINR(quotation.pricing.afterSubsidyCost)}

📊 *GENERATION & ROI:*
• Daily Generation: ~${quotation.system.energyPerDay || (quotation.system.capacityKw * 4)} Units
• Annual Savings: ~₹${formatINR(quotation.pricing.annualSavings)}/year
• Estimated Payback: ${quotation.pricing.paybackYears} Years

🏦 *Bank Account for Advance / PO:*
• Bank: ${quotation.bank?.bankName || quotation.company?.bankName || 'State Bank of India'}
• A/C Name: ${quotation.bank?.accountName || quotation.company?.accountName || 'M/s. SRIMAAN SOLAR SOLUTIONS'}
• A/C No: ${quotation.bank?.accountNo || quotation.company?.accountNumber || '40892716382'}
• IFSC: ${quotation.bank?.ifscCode || quotation.company?.ifscCode || 'SBIN0020154'}

📞 Contact: ${quotation.company?.phone || '+91 94948 22356'}
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
              {quotation.system.capacityKw} kWp Rooftop System • Net: ₹{formatINR(quotation.pricing.afterSubsidyCost)}
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
        </div>

        {/* Center-Right: Page Jump Pills or Receipt Label */}
        {formatMode === 'receipt' ? (
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold">
            <Receipt size={13} className="text-amber-600" />
            <span>Official Advance Payment Voucher (1 Page A4)</span>
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
                  : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            <Printer size={15} />
            <span>Print / PDF ({formatMode === 'bank' ? '7P' : formatMode === 'customer' ? '5P' : '1P Receipt'})</span>
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
                      <PageComp data={quotation} />
                    </div>
                  );
                })
              ) : (
                <div className="document-page-wrapper shadow-2xl print:shadow-none">
                  {React.createElement(
                    bankPages.find(p => p.id === selectedPage)?.component || Page1,
                    { data: quotation }
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
              <AdvanceReceiptView quotation={quotation} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalPreviewModal;
