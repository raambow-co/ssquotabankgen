import React, { useState } from 'react';
import { 
  Plus, Eye, Edit3, Copy, Trash2, Search, Filter, 
  FileText, Zap, TrendingUp, Sun, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { formatINR } from '../utils/calculations';

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

  // Compute live pipeline metrics
  const totalProposals = quotations.length;
  const totalCapacity = quotations.reduce((acc, q) => acc + (Number(q.system?.capacityKw) || 0), 0);
  const totalNetValue = quotations.reduce((acc, q) => acc + (Number(q.pricing?.afterSubsidyCost) || 0), 0);
  const totalAnnualSavings = quotations.reduce((acc, q) => acc + (Number(q.pricing?.annualSavings) || 0), 0);

  // Filtered quotations
  const filteredQuotations = quotations.filter(q => {
    const matchesSearch = 
      q.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.refNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customer?.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customer?.addressLine1?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

      {/* Recent Solar Quotations Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Solar Quotations</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage, preview, print or edit your 7-page customer proposals</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search client, quote #, location..."
                className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white w-64"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Sent">Sent</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3 px-5">QUOTATION REF &amp; DATE</th>
                <th className="py-3 px-5">CUSTOMER &amp; LOCATION</th>
                <th className="py-3 px-5">SYSTEM SPEC</th>
                <th className="py-3 px-5">COMMERCIALS &amp; SUBSIDY</th>
                <th className="py-3 px-5">STATUS</th>
                <th className="py-3 px-5 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotations.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Ref & Date */}
                  <td className="py-4 px-5 align-middle">
                    <div className="font-bold text-slate-900 font-mono text-[11px]">{quote.refNo}</div>
                    <div className="text-slate-400 text-[10px] mt-0.5">{quote.date}</div>
                  </td>

                  {/* Customer & Location */}
                  <td className="py-4 px-5 align-middle max-w-xs">
                    <div className="font-bold text-slate-900 text-xs">{quote.customer.name}</div>
                    <div className="text-slate-500 text-[11px] truncate">
                      {quote.customer.company || quote.customer.addressLine1}
                    </div>
                    <div className="text-slate-400 text-[10px] truncate">
                      {quote.customer.district}, {quote.customer.state}
                    </div>
                  </td>

                  {/* System Spec */}
                  <td className="py-4 px-5 align-middle">
                    <div className="font-bold text-slate-900">
                      {quote.system.capacityKw} kWp DC <span className="text-[10px] text-slate-400 font-normal">({quote.system.panelsCount || (quote.system.capacityKw * 2)} panels)</span>
                    </div>
                    <div className="text-slate-500 text-[10px] truncate max-w-[220px]">
                      {quote.system.moduleBrand?.split('(')[0]?.trim() || "Mono PERC"} • {quote.system.inverterBrand?.split('(')[0]?.trim() || "Grid-Tied"}
                    </div>
                  </td>

                  {/* Commercials & Subsidy */}
                  <td className="py-4 px-5 align-middle">
                    <div className="font-bold text-slate-900 text-sm">
                      ₹{formatINR(quote.pricing.afterSubsidyCost)}
                    </div>
                    <div className="mt-0.5">
                      <span className="inline-block px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-semibold">
                        Subsidy: ₹{formatINR(quote.pricing.subsidyAmount)}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5 align-middle">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      quote.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : quote.status === 'Sent'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        quote.status === 'Approved'
                          ? 'bg-emerald-500'
                          : quote.status === 'Sent'
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`} />
                      {quote.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 align-middle text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        onClick={() => onPreviewQuotation(quote)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition cursor-pointer"
                        title="View 7-Page Proposal & Print"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => onEditQuotation(quote)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition cursor-pointer"
                        title="Edit Proposal Details"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => onDuplicateQuotation(quote)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition cursor-pointer"
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
              ))}
            </tbody>
          </table>

          {filteredQuotations.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              No quotations found matching your search or filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
