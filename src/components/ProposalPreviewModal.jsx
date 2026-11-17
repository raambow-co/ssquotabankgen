import React, { useState } from 'react';
import { 
  ArrowLeft, Printer, ZoomIn, ZoomOut, Copy, Check, 
  FileText, Share2, Download, Eye 
} from 'lucide-react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';
import { Page4 } from './Page4';
import { Page5 } from './Page5';
import { Page6 } from './Page6';
import { Page7 } from './Page7';
import { formatINR } from '../utils/calculations';

export const ProposalPreviewModal = ({ quotation, onBack, onEdit }) => {
  const [selectedPage, setSelectedPage] = useState('all'); // 'all', 1, 2, 3, 4, 5, 6, 7
  const [zoomLevel, setZoomLevel] = useState(85);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const pages = [
    { id: 1, title: 'P1: Cover & Details', fullTitle: 'Page 1 of 7: Cover & Techno Offer', component: Page1 },
    { id: 2, title: 'P2: Grid System', fullTitle: 'Page 2 of 7: On-Grid System Architecture', component: Page2 },
    { id: 3, title: 'P3: Benefits', fullTitle: 'Page 3 of 7: Techno-Commercial Benefits', component: Page3 },
    { id: 4, title: 'P4: Specs & Mounting', fullTitle: 'Page 4 of 7: Specifications & Structure Comparison', component: Page4 },
    { id: 5, title: 'P5: Cost & BOM', fullTitle: 'Page 5 of 7: Bill of Materials & Cost Estimation', component: Page5 },
    { id: 6, title: 'P6: Payback & Bank', fullTitle: 'Page 6 of 7: Subsidy, Payback & Payment Terms', component: Page6 },
    { id: 7, title: 'P7: Terms & Conditions', fullTitle: 'Page 7 of 7: Commercial Terms & Conditions', component: Page7 },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyWhatsApp = () => {
    const summary = `☀️ *SRIMAAN SOLAR SOLUTIONS - QUOTATION SUMMARY*
----------------------------------------
👤 *Customer:* ${quotation.customer.name}
📍 *Location:* ${quotation.customer.district}, ${quotation.customer.state}
⚡ *System Capacity:* ${quotation.system.capacityKw} kW (${quotation.system.phase})
📑 *Reference No:* ${quotation.refNo}
📅 *Date:* ${quotation.date}

💰 *COMMERCIAL SUMMARY:*
• Total System Cost: ₹${formatINR(quotation.pricing.totalCost)}
• PM Surya Ghar Subsidy: ₹${formatINR(quotation.pricing.subsidyAmount)}
👉 *Net Investment:* ₹${formatINR(quotation.pricing.afterSubsidyCost)}

📊 *GENERATION & ROI:*
• Daily Generation: ~${quotation.system.energyPerDay} Units
• Annual Savings: ~₹${formatINR(quotation.pricing.annualSavings)}/year
• Estimated Payback: ${quotation.pricing.paybackYears} Years

🏦 *Bank Account for Advance / PO:*
• Bank: ${quotation.bank.bankName}
• A/C Name: ${quotation.bank.accountName}
• A/C No: ${quotation.bank.accountNo}
• IFSC: ${quotation.bank.ifscCode}

📞 Contact: ${quotation.company.phone1} / ${quotation.company.phone2}
📧 Email: ${quotation.company.email}`;

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
              <span>{quotation.customer.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                {quotation.refNo}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              {quotation.system.capacityKw} kWp Rooftop System • Net: ₹{formatINR(quotation.pricing.afterSubsidyCost)}
            </div>
          </div>
        </div>

        {/* Center: Page Jump Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setSelectedPage('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              selectedPage === 'all'
                ? 'bg-[#0b132b] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            All 7 Pages
          </button>
          <span className="text-slate-300">|</span>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPage(p.id)}
              className={`px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all cursor-pointer ${
                selectedPage === p.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Page {p.id}
            </button>
          ))}
        </div>

        {/* Right: Zoom & Export Controls */}
        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-0.5 text-xs text-slate-700">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
              className="p-1 hover:bg-white rounded transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={13} />
            </button>
            <span className="px-2 font-mono font-medium text-[11px] min-w-10 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
              className="p-1 hover:bg-white rounded transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={13} />
            </button>
            <button
              onClick={() => setZoomLevel(85)}
              className="px-1.5 py-0.5 hover:bg-white rounded text-[10px] font-semibold text-slate-500 transition border-l border-slate-200 cursor-pointer"
              title="Fit to Screen"
            >
              Fit
            </button>
          </div>

          {/* Copy WhatsApp */}
          <button
            onClick={handleCopyWhatsApp}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition cursor-pointer"
            title="Copy WhatsApp Summary"
          >
            {copiedNotification ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copiedNotification ? 'Copied' : 'WhatsApp'}</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-lg shadow-sm transition active:scale-95 cursor-pointer"
            title="Print or Save All 7 Pages as Clean PDF"
          >
            <Printer size={15} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Document View Canvas */}
      <div className="viewer-scroll-canvas flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div 
          className="preview-document-container transition-transform duration-150 origin-top flex flex-col items-center space-y-10"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {selectedPage === 'all' ? (
            pages.map((p) => {
              const Component = p.component;
              return (
                <div key={p.id} className="document-page-wrapper relative">
                  <div className="no-print absolute -top-6 left-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded shadow-xs border border-slate-300">
                    {p.fullTitle}
                  </div>
                  <Component data={quotation} />
                </div>
              );
            })
          ) : (
            (() => {
              const currentPage = pages.find((p) => p.id === selectedPage);
              if (!currentPage) return null;
              const Component = currentPage.component;
              return (
                <div className="document-page-wrapper relative">
                  <div className="no-print absolute -top-6 left-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded shadow-xs border border-slate-300">
                    {currentPage.fullTitle}
                  </div>
                  <Component data={quotation} />
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
};
