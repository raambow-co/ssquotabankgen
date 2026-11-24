import React, { useState } from 'react';
import {
  Plus, Eye, Edit3, Copy, Trash2, Search, Filter,
  FileText, Zap, TrendingUp, Sun, ChevronRight, CheckCircle2,
  Building2, UserCheck, Layers, Receipt
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
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-amber-400 font-medium">
              <span>☀️</span>
              <span>Dual Solar Proposal Engine: Bank (7P) &amp; Customer (5P)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-sans">
              Solar Quotation Generator
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Enter details once to generate both official <strong>7-Page Techno-Commercial Bank Proposals</strong> (for loan approvals &amp; DISCOM CEIG sanctions) and visual <strong>5-Page Customer Proposals</strong> (with 25-yr financial cashflows &amp; completed works portfolio).
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
            <div className="text-[11px] text-slate-400 mt-0.5">Dual-Format Ready</div>
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
            <div className="text-[11px] text-slate-400 mt-0.5">Net payable by clients</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
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
          <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
            <Sun size={20} />
          </div>
        </div>
      </div>

      {/* Quotations List Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Header with Search & Filter Controls */}
        <div className="p-5 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Solar Quotations</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage, preview in Bank or Customer format, print, or edit your techno-commercial proposals
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search client, quote #, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:border-slate-400"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <Filter size={13} className="text-slate-400 ml-1.5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs text-slate-700 font-semibold pr-2 py-1 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Sent">Sent</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Proposals Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-5">Quotation Ref &amp; Date</th>
                <th className="py-3 px-5">Customer &amp; Location</th>
                <th className="py-3 px-5">System Spec</th>
                <th className="py-3 px-5">Commercials &amp; Subsidy</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-center">Dual Format Preview &amp; Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotations.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Ref & Date */}
                  <td className="py-4 px-5 align-middle">
                    <div className="font-bold text-slate-900 font-mono text-xs">{quote.refNo}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{quote.date}</div>
                  </td>

                  {/* Customer & Location */}
                  <td className="py-4 px-5 align-middle">
                    <div className="font-bold text-slate-900">{quote.customer.name || 'Valued Client'}</div>
                    <div className="text-slate-500 text-[11px] truncate max-w-[200px]">
                      {quote.customer.district || quote.customer.addressLine1 || "Telangana"}, {quote.customer.state || "India"}
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
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${quote.status === 'Approved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : quote.status === 'Sent'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${quote.status === 'Approved'
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
                    <div className="flex items-center justify-center space-x-1.5">
                      {/* Bank Format Button (7-Page) */}
                      <button
                        onClick={() => onPreviewQuotation(quote, 'bank')}
                        className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-md text-[10px] font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                        title="View Official 7-Page Bank Proposal"
                      >
                        <Building2 size={12} />
                        <span>Bank (7P)</span>
                      </button>

                      {/* Customer Format Button (5-Page) */}
                      <button
                        onClick={() => onPreviewQuotation(quote, 'customer')}
                        className="px-2 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded-md text-[10px] font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                        title="View Modern 5-Page Customer Proposal"
                      >
                        <UserCheck size={12} />
                        <span>Customer (5P)</span>
                      </button>

                      {/* Advance Receipt Button (1-Page) */}
                      <button
                        onClick={() => onPreviewQuotation(quote, 'receipt')}
                        className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-[10px] font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                        title="View & Print Official 1-Page Advance Payment Receipt"
                      >
                        <Receipt size={12} />
                        <span>Receipt</span>
                      </button>

                      {/* GST Invoice Button (1-Page) */}
                      <button
                        onClick={() => onPreviewQuotation(quote, 'invoice')}
                        className="px-2 py-1 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md text-[10px] font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                        title="View & Print Official 1-Page GST Tax Invoice"
                      >
                        <FileText size={12} />
                        <span>GST Invoice</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => onEditQuotation(quote)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition cursor-pointer"
                        title="Edit Proposal Details"
                      >
                        <Edit3 size={15} />
                      </button>

                      {/* Duplicate Button */}
                      <button
                        onClick={() => onDuplicateQuotation(quote)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition cursor-pointer"
                        title="Duplicate this Quotation"
                      >
                        <Copy size={15} />
                      </button>

                      {/* Delete Button */}
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
