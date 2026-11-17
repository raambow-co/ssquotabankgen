import React from 'react';
import { LayoutDashboard, PlusCircle, Settings } from 'lucide-react';
import ASSETS from '../assets/assetsData';

export const Navbar = ({ currentView, onNavigate, onOpenSettings }) => {
  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Company Brand Logo & Title */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onNavigate('dashboard')}
          title="Return to Dashboard"
        >
          <div className="h-11 w-20 rounded-md bg-white border border-slate-200 p-0.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
            <img 
              src={ASSETS.srimaan_logo} 
              alt="Srimaan Solar Solutions Logo" 
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div>
            <div className="text-[10px] tracking-widest font-extrabold uppercase text-slate-400">
              TURNKEY SOLAR EPC SOLUTIONS
            </div>
            <div className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Srimaan Solar</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                Quotation Generator
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentView === 'dashboard'
                ? 'bg-slate-100 text-slate-900 border border-slate-300 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('create')}
            className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition-all active:scale-95 ${
              currentView === 'form' || currentView === 'create'
                ? 'bg-[#0f172a] text-white ring-2 ring-slate-800'
                : 'bg-[#0f172a] hover:bg-slate-800 text-white'
            }`}
          >
            <PlusCircle size={15} />
            <span>+ New Quotation</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            title="Company & Tariff Settings"
          >
            <Settings size={15} />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};
