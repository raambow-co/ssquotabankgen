import React, { useState } from 'react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';
import { Page4 } from './Page4';
import { Page5 } from './Page5';
import { Page6 } from './Page6';
import { Page7 } from './Page7';
import { 
  Printer, ZoomIn, ZoomOut, Maximize2, FileText, CheckCircle2, ChevronRight, Eye
} from 'lucide-react';

export const QuotationViewer = ({ data, onPrint }) => {
  const [selectedPage, setSelectedPage] = useState('all'); // 'all', 1, 2, 3, 4, 5, 6, 7
  const [zoomLevel, setZoomLevel] = useState(85); // percentage zoom for preview

  const pages = [
    { id: 1, title: 'P1: Cover & Details', component: Page1 },
    { id: 2, title: 'P2: Grid System', component: Page2 },
    { id: 3, title: 'P3: Benefits', component: Page3 },
    { id: 4, title: 'P4: Specs & Mounting', component: Page4 },
    { id: 5, title: 'P5: Cost & BOM', component: Page5 },
    { id: 6, title: 'P6: Payback & Bank', component: Page6 },
    { id: 7, title: 'P7: Terms & Conditions', component: Page7 },
  ];

  return (
    <div className="quotation-viewer-wrapper flex flex-col h-full bg-slate-200/90 select-none">
      {/* Top Preview Toolbar (Hidden in print) */}
      <div className="no-print bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-slate-300 shadow-xs flex flex-wrap items-center justify-between gap-2 z-20">
        
        {/* Page Jump Selector */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setSelectedPage('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              selectedPage === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
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
              className={`px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                selectedPage === p.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Page {p.id}
            </button>
          ))}
        </div>

        {/* Zoom & Print Toolbar Controls */}
        <div className="flex items-center space-x-3 ml-auto">
          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-100 border border-slate-300 rounded-md p-0.5 text-xs text-slate-700">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
              className="p-1 hover:bg-white rounded transition"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="px-2 font-mono font-medium text-[11px] min-w-11 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
              className="p-1 hover:bg-white rounded transition"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(85)}
              className="p-1 hover:bg-white rounded text-[10px] font-semibold text-slate-500 transition border-l border-slate-200"
              title="Fit to Screen"
            >
              Fit
            </button>
          </div>

          {/* Big Print Button */}
          <button
            onClick={onPrint}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs rounded-md shadow transition-all active:scale-95"
            title="Open Clean Print Dialog or Save as High-Res PDF"
          >
            <Printer size={15} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Document View Canvas */}
      <div className="viewer-scroll-canvas flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div 
          className="preview-document-container transition-transform duration-150 origin-top flex flex-col items-center space-y-8"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {selectedPage === 'all' ? (
            pages.map((p) => {
              const Component = p.component;
              return (
                <div key={p.id} className="document-page-wrapper relative">
                  <div className="no-print absolute -top-5 left-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {p.title}
                  </div>
                  <Component data={data} />
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
                  <div className="no-print absolute -top-5 left-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {currentPage.title}
                  </div>
                  <Component data={data} />
                </div>
              );
            })()
          )}
        </div>
      </div>

      {/* Hidden Print Container: When printing, ALL 7 pages always render cleanly in order */}
      <div className="print-only-container hidden">
        {pages.map((p) => {
          const Component = p.component;
          return <Component key={p.id} data={data} />;
        })}
      </div>
    </div>
  );
};
