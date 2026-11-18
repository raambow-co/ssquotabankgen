import React, { useState, useMemo } from 'react';
import { 
  Plus, Eye, Edit3, Copy, Trash2, Search, Filter, 
  FileText, Zap, TrendingUp, Sun, ChevronRight, CheckCircle2,
  LayoutGrid, List, Download, Calendar, MapPin, SlidersHorizontal,
  Layers, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import { formatINR } from '../utils/calculations';
import { getPanelLogo, getInverterLogo } from '../utils/brandLogos';

export const DashboardView = ({ 
  quotations, 
  onNewQuotation, 
  onEditQuotation, 
  onPreviewQuotation, 
  onDuplicateQuotation, 
  onDeleteQuotation,
  onOpenSettings 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [capacityFilter, setCapacityFilter] = useState('all'); // 'all', 'res' (<6kW), 'comm' (6-20kW), 'ind' (>20kW)
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc', 'date-asc', 'capacity-desc', 'value-desc'
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Compute live pipeline metrics
  const totalProposals = quotations.length;
  const totalCapacity = quotations.reduce((acc, q) => acc + (Number(q.system?.capacityKw) || 0), 0);
  const totalNetValue = quotations.reduce((acc, q) => acc + (Number(q.pricing?.afterSubsidyCost) || 0), 0);
  const totalAnnualSavings = quotations.reduce((acc, q) => acc + (Number(q.pricing?.annualSavings) || 0), 0);

  // Filtered and Sorted quotations
  const filteredQuotations = useMemo(() => {
    return quotations
      .filter(q => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          q.customer?.name?.toLowerCase().includes(query) ||
          q.refNo?.toLowerCase().includes(query) ||
          q.customer?.district?.toLowerCase().includes(query) ||
          q.customer?.addressLine1?.toLowerCase().includes(query) ||
          q.system?.moduleBrand?.toLowerCase().includes(query) ||
          q.system?.inverterBrand?.toLowerCase().includes(query);
        
        const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;

        const kw = Number(q.system?.capacityKw) || 0;
        let matchesCapacity = true;
        if (capacityFilter === 'res') matchesCapacity = kw < 6;
        else if (capacityFilter === 'comm') matchesCapacity = kw >= 6 && kw <= 20;
        else if (capacityFilter === 'ind') matchesCapacity = kw > 20;

        return matchesSearch && matchesStatus && matchesCapacity;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date || 0) - new Date(a.date || 0);
        if (sortBy === 'date-asc') return new Date(a.date || 0) - new Date(b.date || 0);
        if (sortBy === 'capacity-desc') {
          return (Number(b.system?.capacityKw) || 0) - (Number(a.system?.capacityKw) || 0);
        }
        if (sortBy === 'value-desc') {
          return (Number(b.pricing?.afterSubsidyCost) || 0) - (Number(a.pricing?.afterSubsidyCost) || 0);
        }
        return 0;
      });
  }, [quotations, searchQuery, statusFilter, capacityFilter, sortBy]);

  // Export all proposals backup
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quotations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `srimaan_solar_proposals_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Sent':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500';
      case 'Sent': return 'bg-blue-500';
      default: return 'bg-amber-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Hero Banner Section */}
      <div className="bg-[#0b132b] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-amber-400 font-medium">
              <span>☀️</span>
              <span>Turnkey Solar EPC Proposal Management System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-sans">
              Solar Quotation Generator
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Create standardized 7-page techno-commercial solar proposals with automated system engineering, Bill of Quantities, PM Surya Ghar subsidy calculations, and completed works portfolio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onNewQuotation}
              className="flex items-center space-x-2 px-4 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              <span>+ Generate New Quotation</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-xs rounded-xl border border-slate-700 transition cursor-pointer"
            >
              <span>Manage Pricing &amp; Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Proposals */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Total Proposals</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalProposals}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Active in database</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <FileText size={20} />
          </div>
        </div>

        {/* Card 2: Proposed Capacity */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Proposed Capacity</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalCapacity.toFixed(1)} kWp</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Clean rooftop solar</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Zap size={20} />
          </div>
        </div>

        {/* Card 3: Pipeline Net Value */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Pipeline Net Value</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">₹{formatINR(totalNetValue)}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Net payable by customers</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <TrendingUp size={20} />
          </div>
        </div>

        {/* Card 4: Client Bill Savings */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Client Bill Savings</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">₹{formatINR(totalAnnualSavings)} <span className="text-xs font-normal text-slate-400">/yr</span></div>
            <div className="text-[11px] text-slate-400 mt-0.5">Projected annual reduction</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
            <Sun size={20} />
          </div>
        </div>
      </div>

      {/* Recent Solar Quotations Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Solar Quotations</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage, preview, print or edit your 7-page customer proposals</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search client, quote #, location..."
                className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white w-full sm:w-56"
              />
            </div>

            {/* Capacity Filter */}
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="all">All Sizes</option>
              <option value="res">Residential (&lt;6 kW)</option>
              <option value="comm">Commercial (6–20 kW)</option>
              <option value="ind">Industrial (&gt;20 kW)</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Sent">Sent</option>
              <option value="Draft">Draft</option>
            </select>

            {/* Sorting Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="capacity-desc">Highest Capacity</option>
              <option value="value-desc">Highest Value</option>
            </select>

            {/* View Mode Switcher (Table vs Grid) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-slate-950 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Table View"
              >
                <List size={14} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-slate-950 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Card Grid View"
              >
                <LayoutGrid size={14} />
              </button>
            </div>

            {/* Export JSON Button */}
            <button
              onClick={handleExportBackup}
              className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 transition-colors shadow-2xs cursor-pointer"
              title="Export All Proposals Backup (JSON)"
            >
              <Download size={14} />
            </button>
          </div>
        </div>

        {/* Content View: Table or Grid */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <th className="py-3 px-5">QUOTATION REF &amp; DATE</th>
                  <th className="py-3 px-5">CUSTOMER &amp; LOCATION</th>
                  <th className="py-3 px-5">SYSTEM SPEC</th>
                  <th className="py-3 px-5">COMMERCIALS &amp; SUBSIDY</th>
                  <th className="py-3 px-5 text-center">STATUS</th>
                  <th className="py-3 px-5 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuotations.map((quote) => {
                  const initials = quote.customer?.name
                    ? quote.customer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                    : 'CL';

                  return (
                    <tr key={quote.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Ref & Date */}
                      <td className="py-4 px-5 align-middle">
                        <div className="font-bold text-slate-900 font-mono text-[11px]">{quote.refNo}</div>
                        <div className="text-slate-400 text-[10px] mt-0.5 flex items-center gap-1">
                          <Calendar size={11} className="text-slate-400" />
                          <span>{quote.date}</span>
                        </div>
                      </td>

                      {/* Customer & Location */}
                      <td className="py-4 px-5 align-middle max-w-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-extrabold text-[11px] flex items-center justify-center border border-slate-200 shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 text-xs truncate">{quote.customer?.name}</div>
                            <div className="text-slate-500 text-[11px] truncate">
                              {quote.customer?.company || quote.customer?.addressLine1}
                            </div>
                            <div className="text-slate-400 text-[10px] truncate flex items-center gap-1">
                              <MapPin size={10} className="text-slate-400 shrink-0" />
                              <span>{quote.customer?.district}, {quote.customer?.state}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* System Spec */}
                      <td className="py-4 px-5 align-middle">
                        <div className="font-bold text-slate-900">
                          {quote.system?.capacityKw} kWp DC <span className="text-[10px] text-slate-400 font-normal">({quote.system?.panelsCount || (quote.system?.capacityKw * 2)} panels)</span>
                        </div>
                        <div className="text-slate-500 text-[10px] truncate max-w-[220px]">
                          {quote.system?.moduleBrand?.split('(')[0]?.trim() || "Mono PERC"} • {quote.system?.inverterBrand?.split('(')[0]?.trim() || "Grid-Tied"}
                        </div>
                      </td>

                      {/* Commercials & Subsidy */}
                      <td className="py-4 px-5 align-middle">
                        <div className="font-bold text-slate-900 text-sm">
                          ₹{formatINR(quote.pricing?.afterSubsidyCost)}
                        </div>
                        <div className="mt-0.5">
                          <span className="inline-block px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-semibold">
                            Subsidy: ₹{formatINR(quote.pricing?.subsidyAmount)}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5 align-middle text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(quote.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(quote.status)}`} />
                          {quote.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 align-middle text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => onPreviewQuotation(quote)}
                            className="p-1.5 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-md transition cursor-pointer"
                            title="View 7-Page Proposal & Print"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => onEditQuotation(quote)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition cursor-pointer"
                            title="Edit Proposal Details"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => onDuplicateQuotation(quote)}
                            className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition cursor-pointer"
                            title="Duplicate this Quotation"
                          >
                            <Copy size={15} />
                          </button>
                          <button
                            onClick={() => onDeleteQuotation(quote.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition cursor-pointer"
                            title="Delete Quotation"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Content View: CARD GRID */
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredQuotations.map((quote) => {
              const initials = quote.customer?.name
                ? quote.customer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                : 'CL';

              return (
                <div 
                  key={quote.id} 
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Ref & Status */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="font-mono font-extrabold text-slate-900 text-xs">
                        {quote.refNo}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9.5px] font-bold border ${getStatusBadge(quote.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(quote.status)}`} />
                        <span>{quote.status}</span>
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-black text-xs flex items-center justify-center border border-slate-200 shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{quote.customer?.name || 'Customer'}</h4>
                        <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                          <MapPin size={11} className="text-slate-400 shrink-0" />
                          <span className="truncate">{quote.customer?.district}, {quote.customer?.state}</span>
                        </p>
                      </div>
                    </div>

                    {/* System Specs Bento */}
                    <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 uppercase text-[9px] font-bold block">Capacity</span>
                        <span className="font-black text-slate-900 text-xs">
                          {quote.system?.capacityKw} kWp DC
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase text-[9px] font-bold block">Modules</span>
                        <span className="font-bold text-slate-700 truncate block text-[11px]">
                          {quote.system?.panelsCount || (quote.system?.capacityKw * 2)} panels
                        </span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-slate-200/60">
                        <span className="text-slate-400 uppercase text-[9px] font-bold block">Hardware Brands</span>
                        <span className="text-[10.5px] text-slate-700 font-medium truncate block">
                          {quote.system?.moduleBrand?.split('(')[0]?.trim()} • {quote.system?.inverterBrand?.split('(')[0]?.trim()}
                        </span>
                      </div>
                    </div>

                    {/* Commercial Pricing */}
                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-[9.5px] text-slate-400 uppercase font-bold block">Net Outlay</span>
                        <span className="text-base font-black text-slate-900">
                          ₹{formatINR(quote.pricing?.afterSubsidyCost)}
                        </span>
                      </div>
                      {quote.pricing?.subsidyAmount > 0 && (
                        <span className="text-[9.5px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Subsidy: ₹{formatINR(quote.pricing.subsidyAmount)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onPreviewQuotation(quote)}
                      className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Eye size={13} className="text-amber-400" />
                      <span>7-Page Proposal</span>
                    </button>
                    <button
                      onClick={() => onEditQuotation(quote)}
                      className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => onDuplicateQuotation(quote)}
                      className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                      title="Duplicate"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteQuotation(quote.id)}
                      className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredQuotations.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No quotations found matching your search or filters.
          </div>
        )}
      </div>
    </div>
  );
};
