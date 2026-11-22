import React, { useState } from 'react';
import { 
  Zap, User, DollarSign, Layers, FileText, Building, 
  RotateCcw, Save, Printer, Share2, Copy, Check, Plus, Trash2,
  ChevronDown, ChevronUp, Sparkles, Sliders, Shield
} from 'lucide-react';
import { 
  TELANGANA_DISTRICTS, ANDHRA_DISTRICTS, STATES_LIST, 
  CAPACITY_PRESETS, MODULE_BRANDS, INVERTER_BRANDS, STRUCTURE_OPTIONS 
} from '../data/defaultData';
import { 
  formatINR, calculateSubsidy, calculateEnergyMetrics, 
  calculateArea, calculatePayback, generateRefNo, formatDateToPDFStyle 
} from '../utils/calculations';

export const Dashboard = ({ 
  data, 
  onChange, 
  onReset, 
  onPrint, 
  onSaveQuote, 
  savedQuotes = [], 
  onLoadQuote, 
  onDeleteSavedQuote 
}) => {
  const [activeTab, setActiveTab] = useState('system');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [saveTitleInput, setSaveTitleInput] = useState('');
  const [showSavedModal, setShowSavedModal] = useState(false);

  // Helper updater
  const updateField = (section, field, value) => {
    if (section) {
      onChange({
        ...data,
        [section]: {
          ...data[section],
          [field]: value
        }
      });
    } else {
      onChange({
        ...data,
        [field]: value
      });
    }
  };

  // Preset capacity handler
  const handleApplyPreset = (preset) => {
    const kw = preset.kw;
    const energy = calculateEnergyMetrics(kw);
    const area = calculateArea(kw);
    const subsidy = preset.subsidy;
    const totalCost = preset.cost;
    const netCost = totalCost - subsidy;
    const payback = calculatePayback(netCost, energy.energyPerYear, data.pricing.electricityTariff);

    // Update BOM descriptions with new capacity
    const updatedBom = data.bom.map(item => {
      let desc = item.description;
      // Replace old capacity kW references with new
      desc = desc.replace(/\b\d+\s*KW\b/gi, `${kw}KW`);
      desc = desc.replace(/\b\d+\s*kWp\b/gi, `${kw}kWp`);
      return { ...item, description: desc };
    });

    onChange({
      ...data,
      system: {
        ...data.system,
        capacityKw: kw,
        phase: preset.phase,
        energyPerDay: energy.energyPerDay,
        energyPerMonth: energy.energyPerMonth,
        energyPerYear: energy.energyPerYear,
        areaRequired: area,
        areaSystemKw: `${kw}kW`
      },
      pricing: {
        ...data.pricing,
        totalCost,
        subsidyAmount: subsidy,
        afterSubsidyCost: netCost,
        annualSavings: payback.annualSavings,
        paybackYears: payback.paybackYears
      },
      proposalTitle: `DETAILEDTECHNO OFFER FOR THE SUPPLY OF ${kw}KW SOLAR ROOFTOP ONGRID POWER GENERATING SYSTEM`,
      bom: updatedBom
    });
  };

  // Re-calculate pricing and payback when cost, subsidy or tariff changes
  const handlePriceChange = (field, val) => {
    const num = Number(val) || 0;
    const newPricing = { ...data.pricing, [field]: num };
    
    if (field === 'totalCost' || field === 'subsidyAmount') {
      newPricing.afterSubsidyCost = Math.max(0, (newPricing.totalCost || 0) - (newPricing.subsidyAmount || 0));
    }
    
    const annualUnits = Number(data.system.energyPerYear) || (data.system.capacityKw * 1200);
    const payback = calculatePayback(newPricing.afterSubsidyCost, annualUnits, newPricing.electricityTariff);
    newPricing.annualSavings = payback.annualSavings;
    newPricing.paybackYears = payback.paybackYears;

    onChange({
      ...data,
      pricing: newPricing
    });
  };

  // Add BOM row
  const handleAddBomItem = () => {
    const newItem = {
      id: Date.now(),
      sr: data.bom.length + 1,
      description: "Custom Component / Cable / Hardware",
      qty: "1"
    };
    onChange({
      ...data,
      bom: [...data.bom, newItem]
    });
  };

  // Delete BOM row
  const handleDeleteBomItem = (index) => {
    const updated = data.bom.filter((_, i) => i !== index);
    onChange({
      ...data,
      bom: updated
    });
  };

  // Update BOM item field
  const handleUpdateBomItem = (index, field, val) => {
    const updated = [...data.bom];
    updated[index] = { ...updated[index], [field]: val };
    onChange({
      ...data,
      bom: updated
    });
  };

  // Copy WhatsApp summary
  const handleCopyWhatsAppSummary = () => {
    const summary = `☀️ *SRIMAAN SOLAR SOLUTIONS - QUOTATION SUMMARY*
----------------------------------------
👤 *Customer:* ${data.customer.name}
📍 *Location:* ${data.customer.district}, ${data.customer.state}
⚡ *System Capacity:* ${data.system.capacityKw} kW (${data.system.phase})
📑 *Reference No:* ${data.refNo}
📅 *Date:* ${data.date}

💰 *COMMERCIAL SUMMARY:*
• Total System Cost: ₹${formatINR(data.pricing.totalCost)}
• PM Surya Ghar Subsidy: ₹${formatINR(data.pricing.subsidyAmount)}
👉 *Net Investment:* ₹${formatINR(data.pricing.afterSubsidyCost)}

📊 *GENERATION & ROI:*
• Daily Generation: ~${data.system.energyPerDay} Units
• Annual Savings: ~₹${formatINR(data.pricing.annualSavings)}/year
• Estimated Payback: ${data.pricing.paybackYears} Years

🏦 *Bank Account for Advance / PO:*
• Bank: ${data.bank.bankName}
• A/C Name: ${data.bank.accountName}
• A/C No: ${data.bank.accountNo}
• IFSC: ${data.bank.ifscCode}

📞 Contact: ${data.company.phone1} / ${data.company.phone2}
📧 Email: ${data.company.email}`;

    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const tabs = [
    { id: 'system', label: 'Capacity & Preset', icon: Zap },
    { id: 'customer', label: 'Customer Info', icon: User },
    { id: 'pricing', label: 'Pricing & Subsidy', icon: DollarSign },
    { id: 'bom', label: 'Bill of Materials', icon: Layers },
    { id: 'tech', label: 'Equip Brands', icon: Sliders },
    { id: 'company', label: 'Company & Bank', icon: Building }
  ];

  return (
    <div className="dashboard-container bg-slate-900 text-slate-100 flex flex-col h-full shadow-2xl border-r border-slate-800">
      {/* Top Header */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-extrabold text-xl">
            ☀️
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-wide flex items-center gap-1.5">
              Srimaan Solar Generator
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Live React
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              PO &amp; Quotation Engine (PO_N VENUGOPAL.pdf)
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs rounded-md shadow-md shadow-emerald-900/30 transition-all active:scale-95"
            title="Print or Save All 7 Pages as Clean PDF"
          >
            <Printer size={15} />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleCopyWhatsAppSummary}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium text-xs rounded-md border border-slate-700 transition-all active:scale-95"
            title="Copy WhatsApp Summary"
          >
            {copiedNotification ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copiedNotification ? 'Copied!' : 'WhatsApp'}</span>
          </button>
        </div>
      </div>

      {/* Quick Action Sub-bar */}
      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span>Preset Capacity:</span>
          <div className="flex flex-wrap gap-1">
            {[1, 2, 3, 5, 8, 10].map(kw => (
              <button
                key={kw}
                onClick={() => {
                  const preset = CAPACITY_PRESETS.find(p => p.kw === kw);
                  if (preset) handleApplyPreset(preset);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  data.system.capacityKw === kw
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {kw} kW
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-slate-400 hover:text-amber-400 transition"
          title="Reset to original Venugopal PDF data"
        >
          <RotateCcw size={12} />
          <span>Reset Sample</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-slate-800 bg-slate-950/40 px-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? 'border-amber-500 text-amber-400 bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
        
        {/* TAB 1: SYSTEM CAPACITY & PRESET */}
        {activeTab === 'system' && (
          <div className="space-y-4">
            {/* Quick Presets Grid */}
            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
              <h3 className="font-semibold text-white mb-2 flex items-center justify-between">
                <span>Select Standard System Capacity</span>
                <span className="text-[11px] text-amber-400 font-normal">Auto-fills Subsidy &amp; BOM</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {CAPACITY_PRESETS.map(preset => {
                  const isSelected = data.system.capacityKw === preset.kw;
                  return (
                    <button
                      key={preset.kw}
                      onClick={() => handleApplyPreset(preset)}
                      className={`p-2 rounded-md border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500'
                          : 'border-slate-700 bg-slate-900/60 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-bold text-slate-100 flex items-center justify-between">
                        <span>{preset.kw} kW</span>
                        <span className="text-[10px] text-slate-400">{preset.phase.split(' ')[0]}</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                        ₹{formatINR(preset.cost)}
                      </div>
                      <div className="text-[9px] text-slate-400">
                        Sub: ₹{formatINR(preset.subsidy)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Capacity & Meta */}
            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 space-y-3">
              <h3 className="font-semibold text-white">Quotation Reference &amp; Meta</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Quotation Reference No</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={data.refNo}
                      onChange={(e) => updateField(null, 'refNo', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
                    />
                    <button
                      onClick={() => updateField(null, 'refNo', generateRefNo(Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 10) + 1))}
                      className="px-2 bg-slate-700 hover:bg-slate-600 rounded text-slate-200"
                      title="Generate new Ref No"
                    >
                      <RotateCcw size={12} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Date</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={data.date}
                      onChange={(e) => updateField(null, 'date', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                    />
                    <button
                      onClick={() => updateField(null, 'date', formatDateToPDFStyle(new Date()))}
                      className="px-2 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 text-[10px]"
                      title="Set today"
                    >
                      Today
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">System Capacity (kW)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={data.system.capacityKw ?? ''}
                    onChange={(e) => {
                      const valStr = e.target.value;
                      if (valStr === '') {
                        onChange({
                          ...data,
                          system: { ...data.system, capacityKw: '' }
                        });
                        return;
                      }
                      const val = parseFloat(valStr);
                      if (isNaN(val)) return;
                      const energy = calculateEnergyMetrics(val);
                      const area = calculateArea(val);
                      const subsidy = calculateSubsidy(val);
                      onChange({
                        ...data,
                        system: {
                          ...data.system,
                          capacityKw: valStr,
                          energyPerDay: energy.energyPerDay,
                          energyPerMonth: energy.energyPerMonth,
                          energyPerYear: energy.energyPerYear,
                          areaRequired: area,
                          areaSystemKw: `${val}kW`
                        },
                        pricing: {
                          ...data.pricing,
                          subsidyAmount: subsidy,
                          afterSubsidyCost: Math.max(0, data.pricing.totalCost - subsidy)
                        },
                        proposalTitle: `DETAILEDTECHNO OFFER FOR THE SUPPLY OF ${val}KW SOLAR ROOFTOP ONGRID POWER GENERATING SYSTEM`
                      });
                    }}
                    onBlur={() => {
                      const val = parseFloat(data.system.capacityKw);
                      if (!val || val <= 0) {
                        onChange({ ...data, system: { ...data.system, capacityKw: 1 } });
                      } else {
                        onChange({ ...data, system: { ...data.system, capacityKw: val } });
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-bold text-xs focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Electrical Phase</label>
                  <select
                    value={data.system.phase}
                    onChange={(e) => updateField('system', 'phase', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                  >
                    <option value="Single Phase">Single Phase (1-Phase)</option>
                    <option value="Three Phase">Three Phase (3-Phase)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Detailed Techno Offer Proposal Title</label>
                <input
                  type="text"
                  value={data.proposalTitle}
                  onChange={(e) => updateField(null, 'proposalTitle', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>

              {/* Energy Calculations Review */}
              <div className="grid grid-cols-3 gap-2 p-2 bg-slate-900/60 rounded border border-slate-700/50 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Daily Generation:</span>
                  <span className="font-bold text-amber-400">{data.system.energyPerDay} kWh / day</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Monthly Units:</span>
                  <span className="font-bold text-amber-400">{data.system.energyPerMonth} kWh / mo</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Annual Units:</span>
                  <span className="font-bold text-amber-400">{data.system.energyPerYear} kWh / yr</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Roof Shade-Free Area Required</label>
                <input
                  type="text"
                  value={data.system.areaRequired}
                  onChange={(e) => updateField('system', 'areaRequired', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER INFO */}
        {activeTab === 'customer' && (
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 space-y-3">
            <h3 className="font-semibold text-white flex items-center justify-between">
              <span>Customer Information (Page 1)</span>
              <span className="text-[11px] text-slate-400">Printed on Header Box</span>
            </h3>

            <div>
              <label className="text-slate-400 block mb-1">Customer Full Name</label>
              <input
                type="text"
                value={data.customer.name}
                onChange={(e) => updateField('customer', 'name', e.target.value)}
                placeholder="e.g. N Venugopal"
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-semibold text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Address / Landmark / Street</label>
              <textarea
                rows={2}
                value={data.customer.addressLine1}
                onChange={(e) => updateField('customer', 'addressLine1', e.target.value)}
                placeholder="e.g. 2-13,NEW BUS STAND,NEW BUS STAND,NIZAMABAD,"
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">District</label>
                <div className="relative">
                  <select
                    value={data.customer.district}
                    onChange={(e) => updateField('customer', 'district', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                  >
                    <optgroup label="Telangana Districts">
                      {TELANGANA_DISTRICTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Andhra Pradesh Districts">
                      {ANDHRA_DISTRICTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">State</label>
                <select
                  value={data.customer.state}
                  onChange={(e) => updateField('customer', 'state', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                >
                  {STATES_LIST.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">PIN Code</label>
                <input
                  type="text"
                  value={data.customer.pinCode}
                  onChange={(e) => updateField('customer', 'pinCode', e.target.value)}
                  placeholder="e.g. 503185"
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Mobile / Phone Number</label>
                <input
                  type="text"
                  value={data.customer.phone}
                  onChange={(e) => updateField('customer', 'phone', e.target.value)}
                  placeholder="e.g. 9440328917"
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Electricity Connection Category</label>
              <select
                value={data.customer.category}
                onChange={(e) => updateField('customer', 'category', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
              >
                <option value="Domestic Category">Domestic Category (Eligible for Govt Subsidy)</option>
                <option value="Commercial Category">Commercial Category (Non-Subsidized / Net Metering)</option>
                <option value="Industrial Category">Industrial Category</option>
                <option value="Institutional Category">Institutional Category</option>
              </select>
            </div>
          </div>
        )}

        {/* TAB 3: PRICING & SUBSIDY */}
        {activeTab === 'pricing' && (
          <div className="space-y-4">
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 space-y-3">
              <h3 className="font-semibold text-white flex items-center justify-between">
                <span>Commercial Estimations &amp; Subsidy</span>
                <span className="text-[11px] text-emerald-400">Pages 5 &amp; 6</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Total System Cost (₹)</label>
                  <input
                    type="number"
                    step="1000"
                    value={data.pricing.totalCost}
                    onChange={(e) => handlePriceChange('totalCost', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-bold text-sm focus:border-amber-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Formatted: ₹{formatINR(data.pricing.totalCost)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-400">Govt. Subsidy (₹)</label>
                    <button
                      onClick={() => handlePriceChange('subsidyAmount', calculateSubsidy(data.system.capacityKw))}
                      className="text-[10px] text-amber-400 hover:underline"
                    >
                      PM Surya Ghar
                    </button>
                  </div>
                  <input
                    type="number"
                    step="1000"
                    value={data.pricing.subsidyAmount}
                    onChange={(e) => handlePriceChange('subsidyAmount', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-emerald-400 font-bold text-sm focus:border-amber-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Directly to customer account
                  </span>
                </div>
              </div>

              {/* Net Payable Highlight */}
              <div className="p-3 bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs block">Net After Subsidy Cost:</span>
                  <span className="text-xl font-extrabold text-emerald-400">
                    ₹{formatINR(data.pricing.afterSubsidyCost)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-xs block">Payback ROI:</span>
                  <span className="text-base font-bold text-amber-400">
                    {data.pricing.paybackYears} Years
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700/60">
                <div>
                  <label className="text-slate-400 block mb-1">Grid Tariff Rate (₹ / Unit)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={data.pricing.electricityTariff}
                    onChange={(e) => handlePriceChange('electricityTariff', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Avg Discom rate in Telangana / AP
                  </span>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Annual Energy Savings (₹ / yr)</label>
                  <input
                    type="number"
                    value={data.pricing.annualSavings}
                    onChange={(e) => updateField('pricing', 'annualSavings', Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {data.system.energyPerYear} units × ₹{data.pricing.electricityTariff}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <label className="text-slate-400 block mb-1">Payback Period Text (Years)</label>
                <input
                  type="text"
                  value={data.pricing.paybackYears}
                  onChange={(e) => updateField('pricing', 'paybackYears', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BILL OF MATERIALS (BOM) */}
        {activeTab === 'bom' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Bill of Materials (Page 5 Table)</h3>
                <p className="text-[11px] text-slate-400">Total {data.bom.length} items configured</p>
              </div>
              <button
                onClick={handleAddBomItem}
                className="flex items-center space-x-1 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded text-xs transition"
              >
                <Plus size={13} />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-2">
              {data.bom.map((item, idx) => (
                <div key={item.id || idx} className="bg-slate-800/80 p-2.5 rounded border border-slate-700 flex gap-2 items-start">
                  <span className="w-6 h-6 rounded bg-slate-900 text-slate-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleUpdateBomItem(idx, 'description', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:border-amber-500 outline-none"
                    />
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400">Qty:</span>
                        <input
                          type="text"
                          value={item.qty}
                          onChange={(e) => handleUpdateBomItem(idx, 'qty', e.target.value)}
                          className="w-20 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-center text-amber-300 font-bold focus:border-amber-500 outline-none"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteBomItem(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete this row"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EQUIPMENT BRANDS & STRUCTURE */}
        {activeTab === 'tech' && (
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 space-y-3">
            <h3 className="font-semibold text-white">Solar Equipment &amp; Structure Brands</h3>

            <div>
              <label className="text-slate-400 block mb-1">Solar PV Module Brand / Type</label>
              <select
                value={data.system.moduleBrand}
                onChange={(e) => {
                  const val = e.target.value;
                  updateField('system', 'moduleBrand', val);
                  // Update Item 1 in BOM
                  const updatedBom = [...data.bom];
                  if (updatedBom[0]) {
                    updatedBom[0].description = val;
                    onChange({ ...data, bom: updatedBom, system: { ...data.system, moduleBrand: val } });
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
              >
                {MODULE_BRANDS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Solar Inverter Brand / Make</label>
              <select
                value={data.system.inverterBrand}
                onChange={(e) => {
                  const val = e.target.value.replace('{capacity}', data.system.capacityKw);
                  updateField('system', 'inverterBrand', val);
                  // Update Item 5 in BOM
                  const updatedBom = [...data.bom];
                  if (updatedBom[4]) {
                    updatedBom[4].description = val;
                    onChange({ ...data, bom: updatedBom, system: { ...data.system, inverterBrand: val } });
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
              >
                {INVERTER_BRANDS.map(b => {
                  const formatted = b.replace('{capacity}', data.system.capacityKw);
                  return <option key={b} value={formatted}>{formatted}</option>;
                })}
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Mounting Structure Option</label>
              <select
                value={data.system.structureType}
                onChange={(e) => {
                  const val = e.target.value;
                  updateField('system', 'structureType', val);
                  // Update Item 2 in BOM
                  const updatedBom = [...data.bom];
                  if (updatedBom[1]) {
                    updatedBom[1].description = val;
                    onChange({ ...data, bom: updatedBom, system: { ...data.system, structureType: val } });
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
              >
                {STRUCTURE_OPTIONS.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* TAB 6: COMPANY & BANK */}
        {activeTab === 'company' && (
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 space-y-3">
            <h3 className="font-semibold text-white flex items-center justify-between">
              <span>Company &amp; Bank Details</span>
              <span className="text-[11px] text-emerald-400">Pre-configured (Srimaan)</span>
            </h3>

            <div>
              <label className="text-slate-400 block mb-1">Company Registered Name</label>
              <input
                type="text"
                value={data.company.name}
                onChange={(e) => updateField('company', 'name', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={data.company.gstNo}
                  onChange={(e) => updateField('company', 'gstNo', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">PAN Number</label>
                <input
                  type="text"
                  value={data.company.panNo}
                  onChange={(e) => updateField('company', 'panNo', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Primary Phone</label>
                <input
                  type="text"
                  value={data.company.phone1}
                  onChange={(e) => updateField('company', 'phone1', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Secondary Phone</label>
                <input
                  type="text"
                  value={data.company.phone2}
                  onChange={(e) => updateField('company', 'phone2', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Company Email</label>
              <input
                type="email"
                value={data.company.email}
                onChange={(e) => updateField('company', 'email', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Vendor Reg. No</label>
              <input
                type="text"
                value={data.company.vendorRegNo}
                onChange={(e) => updateField('company', 'vendorRegNo', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-700/60">
              <h4 className="font-semibold text-amber-400 mb-2">Primary Bank Details - HDFC (Page 6)</h4>
              
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="text-slate-400 block mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={data.bank?.bankName || ''}
                    onChange={(e) => updateField('bank', 'bankName', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Account Name</label>
                  <input
                    type="text"
                    value={data.bank?.accountName || ''}
                    onChange={(e) => updateField('bank', 'accountName', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-slate-400 block mb-1">Account Number</label>
                  <input
                    type="text"
                    value={data.bank?.accountNo || ''}
                    onChange={(e) => updateField('bank', 'accountNo', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={data.bank?.ifscCode || ''}
                    onChange={(e) => updateField('bank', 'ifscCode', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <h4 className="font-semibold text-amber-400 mb-2 pt-2 border-t border-slate-800">Second Bank Details - State Bank of India (Page 6)</h4>
              
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="text-slate-400 block mb-1">Bank 2 Name</label>
                  <input
                    type="text"
                    value={data.bank2?.bankName || ''}
                    onChange={(e) => updateField('bank2', 'bankName', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Bank 2 Account Name</label>
                  <input
                    type="text"
                    value={data.bank2?.accountName || ''}
                    onChange={(e) => updateField('bank2', 'accountName', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Bank 2 Account Number</label>
                  <input
                    type="text"
                    value={data.bank2?.accountNo || ''}
                    onChange={(e) => updateField('bank2', 'accountNo', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Bank 2 IFSC Code</label>
                  <input
                    type="text"
                    value={data.bank2?.ifscCode || ''}
                    onChange={(e) => updateField('bank2', 'ifscCode', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Status Bar with Save to Storage */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Quote Title (e.g. Venugopal 5kW)"
            value={saveTitleInput}
            onChange={(e) => setSaveTitleInput(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs w-48 focus:border-amber-500 outline-none"
          />
          <button
            onClick={() => {
              const title = saveTitleInput.trim() || `${data.customer.name || 'Quote'} - ${data.system.capacityKw}kW`;
              onSaveQuote(title);
              setSaveTitleInput('');
            }}
            className="flex items-center space-x-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded transition font-medium"
            title="Save this quote to browser history"
          >
            <Save size={13} />
            <span>Save</span>
          </button>
        </div>

        {savedQuotes.length > 0 && (
          <button
            onClick={() => setShowSavedModal(true)}
            className="text-slate-300 hover:text-white underline text-[11px]"
          >
            Saved Quotes ({savedQuotes.length})
          </button>
        )}
      </div>

      {/* Saved Quotes Modal */}
      {showSavedModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-md w-full p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm">Saved Quotation Records</h3>
              <button
                onClick={() => setShowSavedModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="max-h-64 overflow-y-auto space-y-2">
              {savedQuotes.map((sq, idx) => (
                <div key={sq.id || idx} className="p-2.5 bg-slate-800 rounded border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-100">{sq.title}</p>
                    <p className="text-[10px] text-slate-400">
                      {sq.data.customer?.name} • {sq.data.system?.capacityKw}kW • ₹{formatINR(sq.data.pricing?.totalCost)} • {new Date(sq.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        onLoadQuote(sq.data);
                        setShowSavedModal(false);
                      }}
                      className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[11px]"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => onDeleteSavedQuote(sq.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
