import React, { useState } from 'react';
import { 
  ArrowLeft, Eye, Save, User, Zap, DollarSign, Clock, 
  CheckCircle2, Plus, Trash2, RotateCcw, Sparkles, Building2, Receipt
} from 'lucide-react';
import { 
  TELANGANA_DISTRICTS, ANDHRA_DISTRICTS, STATES_LIST, 
  CAPACITY_PRESETS, MODULE_BRANDS, MODULE_WATTAGE_PRESETS, INVERTER_BRANDS, STRUCTURE_OPTIONS 
} from '../data/defaultData';
import { 
  formatINR, formatINRDecimal, calculateSubsidy, calculateEnergyMetrics, 
  calculateArea, calculatePayback, calculateGSTBreakdown, generateRefNo, formatDateToPDFStyle 
} from '../utils/calculations';

export const QuotationFormView = ({ 
  quotation, 
  onSave, 
  onBack, 
  onLivePreview 
}) => {
  const [formData, setFormData] = useState(() => ({
    ...quotation,
    bank: quotation.bank || {
      bankName: "HDFC BANK",
      accountName: "SRIMAAN SOLAR SOLUTIONS",
      accountNo: "50200095253784",
      ifscCode: "HDFC0001631"
    },
    bank2: quotation.bank2 || {
      bankName: "STATE BANK OF INDIA",
      accountName: "SRIMAAN SOLAR SOLUTIONS",
      accountNo: "44813579950",
      ifscCode: "SBIN0065049"
    }
  }));
  const [activeTab, setActiveTab] = useState('client'); // 'client', 'system', 'pricing', 'milestones'
  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false);

  // Field updater (Enforces quotation number = Electricity Consumer Number UNC/USC)
  const updateField = (section, field, value) => {
    if ((section === 'customer' && field === 'consumerNo') || (!section && field === 'refNo')) {
      setFormData(prev => ({
        ...prev,
        refNo: value,
        customer: {
          ...prev.customer,
          consumerNo: value
        }
      }));
      return;
    }

    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Receipt field updater
  const updateReceiptField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      receipt: {
        ...(prev.receipt || {}),
        [field]: value
      }
    }));
  };

  // Quick capacity preset handler
  const handleApplyPreset = (preset) => {
    const kw = preset.kw;
    const energy = calculateEnergyMetrics(kw);
    const area = calculateArea(kw);
    const subsidy = preset.subsidy;
    const customerCost = preset.cost;
    const bankCost = preset.bankCost || Math.round(preset.cost * 1.12);
    const totalCost = customerCost;
    const netCost = customerCost - subsidy;
    const bankNet = bankCost - subsidy;
    const payback = calculatePayback(netCost, energy.energyPerYear, formData.pricing.electricityTariff);
    const panelWattage = parseFloat(formData.system.panelWattage) || 540;
    const panelsCount = preset.panels || Math.max(1, Math.round((kw * 1000) / panelWattage));
    const moduleBrand = formData.system.moduleBrand || 'Adani Solar';

    // Update BOM descriptions with new capacity and Item 1 quantity
    const updatedBom = formData.bom.map((item, idx) => {
      let desc = item.description;
      desc = desc.replace(/\b\d+(\.\d+)?\s*KW\b/gi, `${kw}KW`);
      desc = desc.replace(/\b\d+(\.\d+)?\s*kWp\b/gi, `${kw}kWp`);
      let qty = item.qty;
      if (idx === 0) {
        qty = `${panelsCount} Nos`;
        desc = `Solar PV module: ${panelWattage}Wp TOPCon / Mono PERC DCR (${moduleBrand})`;
      }
      return { ...item, description: desc, qty };
    });

    setFormData(prev => ({
      ...prev,
      system: {
        ...prev.system,
        capacityKw: kw,
        panelsCount: panelsCount,
        panelWattage: panelWattage,
        moduleBrand: moduleBrand,
        phase: preset.phase,
        energyPerDay: energy.energyPerDay,
        energyPerMonth: energy.energyPerMonth,
        energyPerYear: energy.energyPerYear,
        areaRequired: area,
        areaSystemKw: `${kw}kW`
      },
      pricing: {
        ...prev.pricing,
        totalCost,
        customerCost,
        bankCost,
        subsidyAmount: subsidy,
        afterSubsidyCost: netCost,
        bankNetCost: bankNet,
        annualSavings: payback.annualSavings,
        paybackYears: payback.paybackYears
      },
      proposalTitle: `DETAILED TECHNO OFFER FOR THE SUPPLY OF ${kw}KW SOLAR ROOFTOP ONGRID POWER GENERATING SYSTEM`,
      bom: updatedBom
    }));
  };

  // Handle Capacity change with smooth typing support
  const handleCapacityChange = (valStr) => {
    if (valStr === '') {
      setFormData(prev => ({
        ...prev,
        system: {
          ...prev.system,
          capacityKw: ''
        }
      }));
      return;
    }

    const val = parseFloat(valStr);
    if (isNaN(val)) return;

    const energy = calculateEnergyMetrics(val);
    const area = calculateArea(val);
    const subsidy = calculateSubsidy(val);
    const panelWattage = parseFloat(formData.system.panelWattage) || 540;
    const recommendedPanels = Math.max(1, Math.round((val * 1000) / panelWattage));
    const moduleBrand = formData.system.moduleBrand || 'Adani Solar';

    // Update BOM descriptions with new capacity
    const updatedBom = formData.bom.map((item, idx) => {
      let desc = item.description;
      desc = desc.replace(/\b\d+(\.\d+)?\s*KW\b/gi, `${val}KW`);
      desc = desc.replace(/\b\d+(\.\d+)?\s*kWp\b/gi, `${val}kWp`);
      let qty = item.qty;
      if (idx === 0) {
        qty = `${recommendedPanels} Nos`;
        desc = `Solar PV module: ${panelWattage}Wp TOPCon / Mono PERC DCR (${moduleBrand})`;
      }
      return { ...item, description: desc, qty };
    });

    setFormData(prev => ({
      ...prev,
      system: {
        ...prev.system,
        capacityKw: valStr,
        panelsCount: recommendedPanels,
        energyPerDay: energy.energyPerDay,
        energyPerMonth: energy.energyPerMonth,
        energyPerYear: energy.energyPerYear,
        areaRequired: area,
        areaSystemKw: `${val}kW`
      },
      pricing: {
        ...prev.pricing,
        subsidyAmount: subsidy,
        afterSubsidyCost: Math.max(0, (prev.pricing.customerCost ?? prev.pricing.totalCost) - subsidy),
        bankNetCost: Math.max(0, (prev.pricing.bankCost ?? prev.pricing.totalCost) - subsidy)
      },
      proposalTitle: `DETAILED TECHNO OFFER FOR THE SUPPLY OF ${val}KW SOLAR ROOFTOP ONGRID POWER GENERATING SYSTEM`,
      bom: updatedBom
    }));
  };

  const handleCapacityBlur = () => {
    const val = parseFloat(formData.system.capacityKw);
    if (!val || val <= 0) {
      handleCapacityChange('1');
    } else {
      setFormData(prev => ({
        ...prev,
        system: {
          ...prev.system,
          capacityKw: val
        }
      }));
    }
  };

  // Handle Solar PV Module Brand selection
  const handleModuleBrandChange = (brand) => {
    const wattage = formData.system.panelWattage || 540;
    const desc = `Solar PV module: ${wattage}Wp TOPCon / Mono PERC DCR (${brand})`;
    const updatedBom = [...formData.bom];
    if (updatedBom[0]) {
      updatedBom[0] = { ...updatedBom[0], description: desc };
    }
    setFormData(prev => ({
      ...prev,
      system: {
        ...prev.system,
        moduleBrand: brand
      },
      bom: updatedBom
    }));
  };

  // Handle Single Panel Wattage (Wp) change with free typing, backspace & 0 support
  const handlePanelWattageChange = (valStr) => {
    if (valStr === '') {
      setFormData(prev => ({
        ...prev,
        system: {
          ...prev.system,
          panelWattage: ''
        }
      }));
      return;
    }

    const wattage = parseFloat(valStr);
    if (isNaN(wattage)) return;

    const brand = formData.system.moduleBrand || 'Waaree Energies';
    const desc = `Solar PV module: ${valStr}Wp TOPCon / Mono PERC DCR (${brand})`;
    const updatedBom = [...formData.bom];
    if (updatedBom[0]) {
      updatedBom[0] = { ...updatedBom[0], description: desc };
    }

    setFormData(prev => ({
      ...prev,
      system: {
        ...prev.system,
        panelWattage: valStr
      },
      bom: updatedBom
    }));
  };

  const handlePanelWattageBlur = () => {
    const valStr = String(formData.system.panelWattage ?? '').trim();
    if (valStr === '' || isNaN(Number(valStr)) || Number(valStr) <= 0) {
      handlePanelWattageChange('540');
    }
  };

  // Handle Panels Count change with smooth typing support
  const handlePanelsCountChange = (valStr) => {
    if (valStr === '') {
      setFormData(prev => ({
        ...prev,
        system: {
          ...prev.system,
          panelsCount: ''
        }
      }));
      return;
    }

    const count = parseInt(valStr, 10);
    if (isNaN(count)) return;

    // Update BOM Item 1 quantity with exact panel count
    const updatedBom = [...formData.bom];
    if (updatedBom[0]) {
      updatedBom[0] = {
        ...updatedBom[0],
        qty: `${count} Nos`
      };
    }

    setFormData(prev => ({
      ...prev,
      system: {
        ...prev.system,
        panelsCount: valStr
      },
      bom: updatedBom
    }));
  };

  const handlePanelsCountBlur = () => {
    const count = parseInt(formData.system.panelsCount, 10);
    const wattage = parseFloat(formData.system.panelWattage) || 540;
    if (!count || count <= 0) {
      const fallbackCount = Math.max(1, Math.round((Number(formData.system.capacityKw || 1) * 1000) / wattage));
      handlePanelsCountChange(String(fallbackCount));
    } else {
      setFormData(prev => ({
        ...prev,
        system: {
          ...prev.system,
          panelsCount: count
        }
      }));
    }
  };

  // Dual Price change with recalculations (Bank Cost vs Customer Cost)
  const handlePriceChange = (field, val) => {
    if (val === '') {
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [field]: ''
        }
      }));
      return;
    }

    const num = Number(val);
    if (isNaN(num)) return;
    
    const newPricing = { ...formData.pricing, [field]: num };
    
    if (field === 'bankCost') {
      newPricing.bankNetCost = Math.max(0, num - (Number(newPricing.subsidyAmount) || 0));
    } else if (field === 'customerCost') {
      newPricing.totalCost = num;
      newPricing.afterSubsidyCost = Math.max(0, num - (Number(newPricing.subsidyAmount) || 0));
    } else if (field === 'totalCost') {
      newPricing.afterSubsidyCost = Math.max(0, num - (Number(newPricing.subsidyAmount) || 0));
    } else if (field === 'subsidyAmount') {
      newPricing.afterSubsidyCost = Math.max(0, (Number(newPricing.customerCost) || Number(newPricing.totalCost) || 0) - num);
      newPricing.bankNetCost = Math.max(0, (Number(newPricing.bankCost) || Number(newPricing.totalCost) || 0) - num);
    }
    
    const customerNet = newPricing.customerCost !== undefined && newPricing.customerCost !== ''
      ? Math.max(0, Number(newPricing.customerCost) - (Number(newPricing.subsidyAmount) || 0))
      : (Number(newPricing.afterSubsidyCost) || 0);
    const annualUnits = Number(formData.system.energyPerYear) || (Number(formData.system.capacityKw || 5) * 1200);
    const payback = calculatePayback(customerNet, annualUnits, Number(newPricing.electricityTariff) || 8);
    newPricing.annualSavings = payback.annualSavings;
    newPricing.paybackYears = payback.paybackYears;

    setFormData(prev => ({
      ...prev,
      pricing: newPricing
    }));
  };

  // BOM handlers
  const handleAddBomItem = () => {
    const newItem = {
      id: Date.now(),
      sr: formData.bom.length + 1,
      description: "Balance of System Equipment / Cable / Accessories",
      qty: "1"
    };
    setFormData(prev => ({
      ...prev,
      bom: [...prev.bom, newItem]
    }));
  };

  const handleDeleteBomItem = (index) => {
    setFormData(prev => ({
      ...prev,
      bom: prev.bom.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateBomItem = (index, field, val) => {
    const updated = [...formData.bom];
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({
      ...prev,
      bom: updated
    }));
  };

  // Save handler
  const handleSaveAndGenerate = () => {
    onSave(formData);
    setSavedSuccessMsg(true);
    setTimeout(() => {
      setSavedSuccessMsg(false);
      onLivePreview(formData);
    }, 400);
  };

  const capacity = formData.system.capacityKw;
  const panels = formData.system.panelsCount || (capacity * 2);
  const bankCost = formData.pricing.bankCost !== undefined ? formData.pricing.bankCost : (formData.pricing.totalCost || 0);
  const customerCost = formData.pricing.customerCost !== undefined ? formData.pricing.customerCost : (formData.pricing.totalCost || 0);
  const subsidy = formData.pricing.subsidyAmount || 0;
  const customerNet = Math.max(0, customerCost - subsidy);
  const bankNet = Math.max(0, bankCost - subsidy);
  const gst = formData.pricing.gstBreakdown || calculateGSTBreakdown(bankCost);
  const customerGst = calculateGSTBreakdown(customerCost);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                {formData.id ? 'Edit Solar Quotation' : 'Create New Solar Quotation'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300">
                {formData.refNo}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in client requirements and technical specifications to generate the 7-page proposal.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onLivePreview(formData, 'bank')}
            className="flex items-center space-x-1.5 px-3 py-2 border border-slate-800 bg-[#0b132b] text-amber-400 font-bold text-xs rounded-lg shadow-xs hover:bg-slate-800 transition cursor-pointer"
            title="Preview 7-Page Techno-Commercial Bank Proposal"
          >
            <Eye size={14} className="text-amber-400" />
            <span>Bank (7P)</span>
          </button>

          <button
            type="button"
            onClick={() => onLivePreview(formData, 'customer')}
            className="flex items-center space-x-1.5 px-3 py-2 border border-emerald-800 bg-[#064e3b] text-emerald-300 font-bold text-xs rounded-lg shadow-xs hover:bg-[#047857] transition cursor-pointer"
            title="Preview 5-Page Visual Customer Proposal"
          >
            <Eye size={14} className="text-emerald-300" />
            <span>Customer (5P)</span>
          </button>

          <button
            type="button"
            onClick={() => onLivePreview(formData, 'receipt')}
            className="flex items-center space-x-1.5 px-3 py-2 border border-amber-600 bg-amber-600 text-white font-bold text-xs rounded-lg shadow-xs hover:bg-amber-700 transition cursor-pointer"
            title="Preview Official 1-Page Advance Payment Receipt"
          >
            <Receipt size={14} className="text-amber-100" />
            <span>Receipt (1P)</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAndGenerate}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg shadow transition active:scale-95 cursor-pointer"
          >
            <Save size={15} />
            <span>{savedSuccessMsg ? 'Saved! Opening...' : 'Save & View'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Multi-Step Form (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step Pill Navigation */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('client')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'client'
                  ? 'bg-[#0b132b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <User size={14} />
              <span>1. Client &amp; Site Details</span>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'system'
                  ? 'bg-[#0b132b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Zap size={14} />
              <span>2. Solar System Specs (P2/P4)</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'pricing'
                  ? 'bg-[#0b132b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <DollarSign size={14} />
              <span>3. Pricing, Subsidy &amp; Receipt</span>
            </button>

            <button
              onClick={() => setActiveTab('milestones')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'milestones'
                  ? 'bg-[#0b132b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Clock size={14} />
              <span>4. Milestones &amp; Notes (P7)</span>
            </button>
          </div>

          {/* TAB 1: CLIENT & SITE DETAILS */}
          {activeTab === 'client' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <User size={18} className="text-slate-600" />
                  <h2 className="text-sm font-bold text-slate-900">Customer &amp; Installation Site Details</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  This information appears on Page 1 (Cover) and official DISCOM documentation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Customer Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.customer.salutation || "Mr."}
                      onChange={(e) => updateField('customer', 'salutation', e.target.value)}
                      className="w-24 px-2 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="M/s.">M/s.</option>
                    </select>
                    <input
                      type="text"
                      value={formData.customer.name}
                      onChange={(e) => updateField('customer', 'name', e.target.value)}
                      placeholder="e.g. Rajesh Varma"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Company / Organization Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.customer.company}
                    onChange={(e) => updateField('customer', 'company', e.target.value)}
                    placeholder="e.g. Varma Agro Industries / Residential"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mobile / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.customer.phone}
                    onChange={(e) => updateField('customer', 'phone', e.target.value)}
                    placeholder="e.g. +91 98490 12345"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.customer.email}
                    onChange={(e) => updateField('customer', 'email', e.target.value)}
                    placeholder="e.g. client@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Installation Site Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.customer.addressLine1}
                    onChange={(e) => updateField('customer', 'addressLine1', e.target.value)}
                    placeholder="e.g. Plot #112, Road #4, Gachibowli Hills, Hyderabad, Telangana - 500032"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Include Plot/Door No., Street, Area, City, and PIN code for DISCOM net-metering feasibility.
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">
                      Electricity Consumer Service No. (UNC / USC) <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ★ Official Quotation No.
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.customer.consumerNo || ''}
                    onChange={(e) => updateField('customer', 'consumerNo', e.target.value)}
                    placeholder="e.g. TSNPDCL-04829104 or 1004829104"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Unique Consumer Number (UNC / USC) is automatically used as the Official Quotation Number across Bank &amp; Customer proposals.
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Sanctioned Connected Load
                  </label>
                  <input
                    type="text"
                    value={formData.customer.connectedLoad}
                    onChange={(e) => updateField('customer', 'connectedLoad', e.target.value)}
                    placeholder="e.g. 5 kW"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Grid Connection Phase
                  </label>
                  <select
                    value={formData.customer.phase}
                    onChange={(e) => {
                      updateField('customer', 'phase', e.target.value);
                      updateField('system', 'phase', e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="Single Phase (1-Phase 230V)">Single Phase (1-Phase 230V)</option>
                    <option value="Three Phase (3-Phase 415V)">Three Phase (3-Phase 415V)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Terrace / Rooftop Type
                  </label>
                  <select
                    value={formData.customer.rooftopType}
                    onChange={(e) => {
                      updateField('customer', 'rooftopType', e.target.value);
                      updateField('system', 'rooftopType', e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="RCC Flat Concrete Terrace">RCC Flat Concrete Terrace</option>
                    <option value="Tin / Metal Sheet Roof">Tin / Metal Sheet Roof</option>
                    <option value="Elevated GI Super Structure">Elevated GI Super Structure</option>
                    <option value="Tile / Slanted Rooftop">Tile / Slanted Rooftop</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    District
                  </label>
                  <select
                    value={formData.customer.district}
                    onChange={(e) => updateField('customer', 'district', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
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

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    State
                  </label>
                  <select
                    value={formData.customer.state}
                    onChange={(e) => updateField('customer', 'state', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    {STATES_LIST.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={formData.customer.pinCode}
                    onChange={(e) => updateField('customer', 'pinCode', e.target.value)}
                    placeholder="e.g. 503185"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tariff Category
                  </label>
                  <select
                    value={formData.customer.category}
                    onChange={(e) => updateField('customer', 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="Domestic Category">Domestic Category (Eligible for Govt Subsidy)</option>
                    <option value="Commercial Category">Commercial Category (Non-Subsidized)</option>
                    <option value="Industrial Category">Industrial Category</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SOLAR SYSTEM SPECS */}
          {activeTab === 'system' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Zap size={18} className="text-amber-500" />
                  <h2 className="text-sm font-bold text-slate-900">Solar System Specifications &amp; Engineering</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Configures the capacity, module technology, inverter, and mounting structure for Pages 2 &amp; 4.
                </p>
              </div>

              {/* Quick Capacity Preset Chips */}
              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-2">
                  Select Standard Capacity Presets:
                </label>
                <div className="flex flex-wrap gap-2">
                  {CAPACITY_PRESETS.map((preset) => (
                    <button
                      key={preset.kw}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        formData.system.capacityKw === preset.kw
                          ? 'bg-[#0b132b] text-white shadow'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {preset.kw} kWp
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* System Capacity (kWp) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">
                      System Capacity (kWp)
                    </label>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Inverter Rating / Grid Tie
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={formData.system.capacityKw ?? ''}
                    onChange={(e) => handleCapacityChange(e.target.value)}
                    onBlur={handleCapacityBlur}
                    placeholder="Enter kWp (e.g. 3, 5, 10)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Standard rooftop scale: 1 to 20 kWp
                  </span>
                </div>

                {/* Number of Solar Modules */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">
                      Number of Solar Modules
                    </label>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      {formData.system.panelsCount ? `${formData.system.panelsCount} × ${formData.system.panelWattage || 540}Wp = ${((Number(formData.system.panelsCount) * (formData.system.panelWattage || 540)) / 1000).toFixed(2)} kWp DC` : ''}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.system.panelsCount ?? ''}
                    onChange={(e) => handlePanelsCountChange(e.target.value)}
                    onBlur={handlePanelsCountBlur}
                    placeholder="Enter module count (e.g. 5, 6, 10)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span>{formData.system.panelWattage || 540}W TOPCon / Mono PERC</span>
                    {formData.system.panelsCount && (
                      <button
                        type="button"
                        onClick={() => handleCapacityChange(((Number(formData.system.panelsCount) * (formData.system.panelWattage || 540)) / 1000).toFixed(1))}
                        className="text-blue-600 hover:text-blue-800 underline font-semibold cursor-pointer"
                        title="Sync System Capacity to match this module count"
                      >
                        Sync Capacity ({((Number(formData.system.panelsCount) * (formData.system.panelWattage || 540)) / 1000).toFixed(1)} kWp)
                      </button>
                    )}
                  </div>
                </div>

                {/* TWO INDIVIDUAL SECTIONS: 1) Module Brand & 2) Single Panel Wattage (Side-by-Side) */}
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200">
                  {/* Section 1: Solar PV Module Brand */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-semibold text-slate-900 text-xs">
                        Solar PV Module Brand <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">Select Brand</span>
                    </div>
                    <select
                      value={formData.system.moduleBrand || 'Adani Solar'}
                      onChange={(e) => handleModuleBrandChange(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white font-bold text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                    >
                      {MODULE_BRANDS.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Tier-1 DCR / ALMM Approved Solar Manufacturer
                    </span>
                  </div>

                  {/* Section 2: Single Panel Wattage (Wp) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-semibold text-slate-900 text-xs">
                        Single Solar Panel Wattage (Wp) <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        e.g. 540 / 620 Wp
                      </span>
                    </div>
                    <input
                      type="number"
                      step="5"
                      min="0"
                      value={formData.system.panelWattage ?? ''}
                      onChange={(e) => handlePanelWattageChange(e.target.value)}
                      onBlur={handlePanelWattageBlur}
                      placeholder="Enter single panel watt (e.g. 540, 620)"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    />
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      {(MODULE_WATTAGE_PRESETS || [540, 545, 550, 580, 620, 650]).map(watt => (
                        <button
                          key={watt}
                          type="button"
                          onClick={() => handlePanelWattageChange(watt)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition cursor-pointer ${
                            Number(formData.system.panelWattage) === watt
                              ? 'bg-[#0b132b] text-white border-slate-900 shadow-2xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {watt}W
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Solar Inverter Brand / Make
                  </label>
                  <select
                    value={formData.system.inverterBrand}
                    onChange={(e) => {
                      const val = e.target.value.replace('{capacity}', formData.system.capacityKw);
                      updateField('system', 'inverterBrand', val);
                      // Update BOM Item 5
                      const updatedBom = [...formData.bom];
                      if (updatedBom[4]) {
                        updatedBom[4].description = val;
                        setFormData(prev => ({ ...prev, bom: updatedBom, system: { ...prev.system, inverterBrand: val } }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    {INVERTER_BRANDS.map(b => {
                      const formatted = b.replace('{capacity}', formData.system.capacityKw);
                      return <option key={b} value={formatted}>{formatted}</option>;
                    })}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mounting Structure Type (Basic vs Height)
                  </label>
                  <select
                    value={formData.system.structureType}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField('system', 'structureType', val);
                      // Update BOM Item 2
                      const updatedBom = [...formData.bom];
                      if (updatedBom[1]) {
                        updatedBom[1].description = val;
                        setFormData(prev => ({ ...prev, bom: updatedBom, system: { ...prev.system, structureType: val } }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    {STRUCTURE_OPTIONS.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Shade-Free Roof Area Required (Page 4)
                  </label>
                  <input
                    type="text"
                    value={formData.system.areaRequired}
                    onChange={(e) => updateField('system', 'areaRequired', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Energy Calculation Preview Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-3 gap-3 text-center">
                <div>
                  <span className="text-[11px] text-slate-500 block">Daily Generation</span>
                  <span className="text-sm font-bold text-slate-900">~{formData.system.energyPerDay} Units</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Monthly Generation</span>
                  <span className="text-sm font-bold text-slate-900">~{formData.system.energyPerMonth} Units</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Annual Generation</span>
                  <span className="text-sm font-bold text-slate-900">~{formData.system.energyPerYear} Units</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRICING & SUBSIDY */}
          {activeTab === 'pricing' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <DollarSign size={18} className="text-emerald-600" />
                  <h2 className="text-sm font-bold text-slate-900">Commercials, PM Surya Ghar Subsidy &amp; BOM</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust project pricing, government subsidy, and manage the 12-item Bill of Materials for Page 5.
                </p>
              </div>

              {/* Dual Pricing: Bank PO Cost vs Customer Quotation Cost */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Dual Commercial Pricing Configuration</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      Bank PO Price is higher than Customer Quote
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Box 1: Price for Bank PO */}
                  <div className="p-4 bg-slate-50/80 border-2 border-slate-300 rounded-xl space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-[#0b132b] text-white flex items-center justify-center">
                          <Building2 size={15} />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-900 text-xs">
                            Cost / Price for Bank PO (₹) <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[10px] text-slate-500">
                            For Bank 7-Page Proposal &amp; Loan Sanction
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white shadow-2xs">
                        Bank PO (Higher)
                      </span>
                    </div>

                    <div>
                      <input
                        type="number"
                        step="1000"
                        min="0"
                        value={formData.pricing.bankCost !== undefined ? formData.pricing.bankCost : (formData.pricing.totalCost ?? '')}
                        onChange={(e) => handlePriceChange('bankCost', e.target.value)}
                        placeholder="Enter Bank Project Cost (e.g. 475000)"
                        className="w-full px-3 py-2.5 border-2 border-slate-300 focus:border-slate-900 rounded-lg text-slate-900 font-mono font-black text-base bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Gross Bank PO:</span>
                        <span className="font-mono font-bold text-slate-900">
                          ₹{formatINR(bankCost)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[10px]">Net Loan Value:</span>
                        <span className="font-mono font-bold text-slate-800">
                          ₹{formatINR(bankNet)}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      • Displayed on <strong>Page 5 (BOM Cost)</strong> and <strong>Page 6 (Statutory GST Table)</strong> of the Bank Proposal.
                    </p>
                  </div>

                  {/* Box 2: Price for Solar Customer */}
                  <div className="p-4 bg-emerald-50/50 border-2 border-emerald-300 rounded-xl space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                          <User size={15} />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-900 text-xs">
                            Cost / Price for Solar Customer (₹) <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[10px] text-emerald-800 font-medium">
                            For Customer 5-Page Commercial Quotation
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white shadow-2xs">
                        Customer Quote
                      </span>
                    </div>

                    <div>
                      <input
                        type="number"
                        step="1000"
                        min="0"
                        value={formData.pricing.customerCost !== undefined ? formData.pricing.customerCost : (formData.pricing.totalCost ?? '')}
                        onChange={(e) => handlePriceChange('customerCost', e.target.value)}
                        placeholder="Enter Customer Project Cost (e.g. 420000)"
                        className="w-full px-3 py-2.5 border-2 border-emerald-300 focus:border-emerald-600 rounded-lg text-slate-900 font-mono font-black text-base bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-emerald-200">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Agreed Gross Price:</span>
                        <span className="font-mono font-bold text-emerald-800">
                          ₹{formatINR(customerCost)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[10px]">Client Net Payable:</span>
                        <span className="font-mono font-bold text-emerald-800">
                          ₹{formatINR(customerNet)}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-emerald-800 leading-tight font-medium">
                      • Displayed on <strong>Customer 5-Page Visual Proposal</strong> and client financial agreements.
                    </p>
                  </div>
                </div>

                {/* Pricing Difference Callout */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-600 shrink-0" />
                    <span>
                      <strong>PO Margin Differential:</strong> Bank PO Price is <strong>₹{formatINR(Math.max(0, bankCost - customerCost))}</strong> higher than Customer Quotation.
                    </span>
                  </div>
                  <span className="font-mono font-bold text-amber-800">
                    +{bankCost > 0 ? (((bankCost - customerCost) / customerCost) * 100).toFixed(1) : 0}% Loan Markup
                  </span>
                </div>
              </div>

              {/* Subsidy, Tariff and Payback Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">
                      Government Subsidy (₹)
                    </label>
                    <button
                      type="button"
                      onClick={() => handlePriceChange('subsidyAmount', calculateSubsidy(formData.system.capacityKw))}
                      className="text-[10px] text-amber-600 font-semibold hover:underline"
                    >
                      Apply PM Surya Ghar Rate
                    </button>
                  </div>
                  <input
                    type="number"
                    step="1000"
                    min="0"
                    value={formData.pricing.subsidyAmount ?? ''}
                    onChange={(e) => handlePriceChange('subsidyAmount', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-emerald-700 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Directly credited to customer bank account
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    DISCOM Tariff (₹ / Unit)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.pricing.electricityTariff}
                    onChange={(e) => handlePriceChange('electricityTariff', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Avg DISCOM unit rate (TSSPDCL / TSNPDCL)
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Capital Payback Period (Years)
                  </label>
                  <input
                    type="text"
                    value={formData.pricing.paybackYears}
                    onChange={(e) => updateField('pricing', 'paybackYears', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Based on annual solar generation
                  </span>
                </div>
              </div>

              {/* GST Statutory Calculation Breakdown (Page 6 Table) */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-xs font-bold text-[#c2410c] uppercase tracking-wider flex items-center gap-1.5 underline underline-offset-2">
                      <span>PRICE OFFER (Bank PO GST Bifurcation)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Price quote for total Design, Engineering, Supply, Installation, Testing &amp; Commissioning of Solar Power Plant (Appears on Page 6).
                    </p>
                  </div>
                </div>

                <div className="border border-slate-300 rounded-lg overflow-hidden shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold text-[11px]">
                        <th className="py-2 px-2.5 text-center border-r border-slate-300 w-12">SL. No.</th>
                        <th className="py-2 px-3 border-r border-slate-300">Product Description</th>
                        <th className="py-2 px-2.5 text-center border-r border-slate-300 w-28">Price (INR)</th>
                        <th className="py-2 px-2 text-center border-r border-slate-300 w-20">CGST</th>
                        <th className="py-2 px-2 text-center border-r border-slate-300 w-20">SGST</th>
                        <th className="py-2 px-3 text-center w-28">TOTAL Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-800">
                      <tr>
                        <td className="py-2 px-2.5 text-center font-bold border-r border-slate-200">1</td>
                        <td className="py-2 px-3 border-r border-slate-200 font-semibold">
                          Supply of {capacity}kW Grid Connected Roof Top Solar PV System
                        </td>
                        <td className="py-2 px-2.5 text-center font-mono font-bold border-r border-slate-200">
                          {formatINR(gst.goodsBase)}
                        </td>
                        <td className="py-2 px-2 text-center font-mono border-r border-slate-200">
                          <div className="font-bold">{formatINR(gst.goodsCgst)}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">2.5%</div>
                        </td>
                        <td className="py-2 px-2 text-center font-mono border-r border-slate-200">
                          <div className="font-bold">{formatINR(gst.goodsSgst)}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">2.5%</div>
                        </td>
                        <td className="py-2 px-3 text-center font-mono font-bold text-slate-900">
                          {formatINR(gst.goodsTotal)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2.5 text-center font-bold border-r border-slate-200">2</td>
                        <td className="py-2 px-3 border-r border-slate-200 font-semibold text-[11px] leading-snug">
                          Design, Engineering, I&amp;C with Testing of {capacity}kw Solar PV System
                        </td>
                        <td className="py-2 px-2.5 text-center font-mono font-bold border-r border-slate-200">
                          {formatINR(gst.servicesBase)}
                        </td>
                        <td className="py-2 px-2 text-center font-mono border-r border-slate-200">
                          <div className="font-bold">{formatINR(gst.servicesCgst)}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">9%</div>
                        </td>
                        <td className="py-2 px-2 text-center font-mono border-r border-slate-200">
                          <div className="font-bold">{formatINR(gst.servicesSgst)}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">9%</div>
                        </td>
                        <td className="py-2 px-3 text-center font-mono font-bold text-slate-900">
                          {formatINR(gst.servicesTotal)}
                        </td>
                      </tr>
                      <tr className="bg-slate-50 font-bold">
                        <td className="border-r border-slate-200"></td>
                        <td className="py-2 px-3 text-left border-r border-slate-200 font-bold">Total amount</td>
                        <td className="py-2 px-2.5 text-center font-mono border-r border-slate-200">{formatINR(gst.totalBase)}</td>
                        <td className="border-r border-slate-200"></td>
                        <td className="border-r border-slate-200"></td>
                        <td className="py-2 px-3 text-center font-mono font-extrabold text-slate-900">{formatINR(gst.totalProjectCost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bill of Materials (BOM) Editor */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Bill of Materials / BOQ (Page 5 Table)</h3>
                    <p className="text-[11px] text-slate-400">Total {formData.bom.length} items configured</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddBomItem}
                    className="flex items-center space-x-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition"
                  >
                    <Plus size={13} />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {formData.bom.map((item, idx) => (
                    <div key={item.id || idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 text-xs">
                      <span className="w-5 text-center font-bold text-slate-400">{idx + 1}.</span>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateBomItem(idx, 'description', e.target.value)}
                        className="flex-1 px-2.5 py-1 border border-slate-300 rounded text-slate-800 focus:outline-none focus:bg-white"
                      />
                      <input
                        type="text"
                        value={item.qty}
                        onChange={(e) => handleUpdateBomItem(idx, 'qty', e.target.value)}
                        className="w-20 px-2 py-1 text-center font-bold border border-slate-300 rounded text-slate-900 focus:outline-none focus:bg-white"
                        placeholder="Qty"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteBomItem(idx)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded"
                        title="Delete item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advance Payment Receipt Voucher Section */}
              <div className="pt-5 border-t border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                      <Receipt size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Official Advance Payment Voucher (Receipt Generator)
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Matches official Srimaan receipt voucher format with round seal &amp; logo.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onLivePreview(formData, 'receipt')}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg shadow-xs transition cursor-pointer"
                  >
                    <Receipt size={13} />
                    <span>Preview Receipt (1P)</span>
                  </button>
                </div>

                <div className="p-4 bg-amber-50/40 border border-amber-200/80 rounded-xl space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    {/* Advance Amount */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block font-bold text-slate-900">
                          Advance Amount Received (₹) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => updateReceiptField('advanceAmount', Math.round(customerCost * 0.1))}
                            className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded"
                            title="10% Advance Token"
                          >
                            10%
                          </button>
                          <button
                            type="button"
                            onClick={() => updateReceiptField('advanceAmount', Math.round(customerCost * 0.2))}
                            className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded"
                            title="20% Advance Token"
                          >
                            20%
                          </button>
                        </div>
                      </div>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.receipt?.advanceAmount !== undefined ? formData.receipt.advanceAmount : Math.round(customerCost * 0.1)}
                        onChange={(e) => {
                          const valStr = e.target.value;
                          updateReceiptField('advanceAmount', valStr === '' ? '' : parseFloat(valStr));
                        }}
                        placeholder="e.g. 22000"
                        className="w-full px-3 py-2 border-2 border-amber-300 focus:border-amber-600 rounded-lg text-slate-900 font-mono font-bold text-sm bg-white focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        Balance due: <strong className="font-mono text-slate-800">₹{formatINR(Math.max(0, customerCost - Number(formData.receipt?.advanceAmount !== undefined ? formData.receipt.advanceAmount : Math.round(customerCost * 0.1))))}</strong> (on/before material dispatch)
                      </span>
                    </div>

                    {/* Receipt Number */}
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">
                        Receipt Number
                      </label>
                      <input
                        type="text"
                        value={formData.receipt?.receiptNo || formData.customer?.consumerNo || formData.refNo || '32'}
                        onChange={(e) => updateReceiptField('receiptNo', e.target.value)}
                        placeholder="Receipt #"
                        className="w-full px-3 py-2 border border-slate-300 focus:border-slate-900 rounded-lg text-slate-900 font-mono font-bold text-xs bg-white focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Voucher / Receipt serial number
                      </span>
                    </div>

                    {/* Receipt Date */}
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">
                        Receipt Date
                      </label>
                      <input
                        type="text"
                        value={formData.receipt?.receiptDate || formData.date || ''}
                        onChange={(e) => updateReceiptField('receiptDate', e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-slate-300 focus:border-slate-900 rounded-lg text-slate-900 text-xs bg-white focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Date payment was acknowledged
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Payment Mode */}
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">
                        Payment Mode
                      </label>
                      <select
                        value={formData.receipt?.paymentMode || 'Bank Transfer / RTGS / NEFT / UPI'}
                        onChange={(e) => updateReceiptField('paymentMode', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs bg-white focus:outline-none"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Check / Cheque">Check / Cheque</option>
                        <option value="Debit / Credit Card">Debit / Credit Card</option>
                        <option value="Bank Transfer / RTGS / NEFT / UPI">Bank Transfer / RTGS / NEFT / UPI</option>
                      </select>
                    </div>

                    {/* Transaction / UTR Ref */}
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">
                        Bank / UPI / Cheque Reference No.
                      </label>
                      <input
                        type="text"
                        value={formData.receipt?.txnReference || ''}
                        onChange={(e) => updateReceiptField('txnReference', e.target.value)}
                        placeholder="e.g. UPI / UTR 432910482910 or Cheque # 001928"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-xs bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    {/* Reason For Payment */}
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-900 mb-1">
                        Reason For Payment (Scope Note)
                      </label>
                      <input
                        type="text"
                        value={formData.receipt?.reasonForPayment || 'Start the work of Enhancement of contract load and Feasibility permission.'}
                        onChange={(e) => updateReceiptField('reasonForPayment', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs bg-white focus:outline-none"
                      />
                    </div>

                    {/* Receiver Info */}
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">
                        Receiver Name &amp; Phone
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.receipt?.receiverName || 'T.RAVINDRA CHARY'}
                          onChange={(e) => updateReceiptField('receiverName', e.target.value)}
                          placeholder="Receiver Name"
                          className="w-1/2 px-2 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs bg-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={formData.receipt?.receiverPhone || '9347416140'}
                          onChange={(e) => updateReceiptField('receiverPhone', e.target.value)}
                          placeholder="Mobile"
                          className="w-1/2 px-2 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-xs bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MILESTONES, BANK & NOTES */}
          {activeTab === 'milestones' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-slate-600" />
                  <h2 className="text-sm font-bold text-slate-900">Quotation Metadata, Company &amp; Bank Info</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Information appears on Page 1, Page 6 (NEFT bank details), and Page 7 (Terms).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">
                      Quotation Reference No. (Electricity Consumer UNC)
                    </label>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ★ Electricity UNC
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.customer?.consumerNo || formData.refNo}
                      onChange={(e) => updateField(null, 'refNo', e.target.value)}
                      placeholder="e.g. TSNPDCL-04829104 or 1004829104"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => updateField(null, 'refNo', `TSNPDCL-${Math.floor(Math.random() * 8999999) + 1000000}`)}
                      className="p-2 border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-600"
                      title="Generate new Ref No"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Always linked 1:1 to Customer Electricity Consumer Number (UNC / USC).
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Proposal Date
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => updateField(null, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => updateField(null, 'date', formatDateToPDFStyle(new Date()))}
                      className="px-3 py-2 border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-600 font-medium text-[11px]"
                    >
                      Today
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Proposal Title
                  </label>
                  <input
                    type="text"
                    value={formData.proposalTitle}
                    onChange={(e) => updateField(null, 'proposalTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* Bank Account 1 */}
                <div className="col-span-1 sm:col-span-2 pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>Primary Bank Account (HDFC Bank)</span>
                  </h3>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={formData.bank?.bankName || ''}
                    onChange={(e) => updateField('bank', 'bankName', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={formData.bank?.accountName || ''}
                    onChange={(e) => updateField('bank', 'accountName', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.bank?.accountNo || ''}
                    onChange={(e) => updateField('bank', 'accountNo', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={formData.bank?.ifscCode || ''}
                    onChange={(e) => updateField('bank', 'ifscCode', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* Second Bank Account */}
                <div className="col-span-1 sm:col-span-2 pt-3 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>Second Bank Account (State Bank of India)</span>
                  </h3>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Bank 2 Name
                  </label>
                  <input
                    type="text"
                    value={formData.bank2?.bankName || ''}
                    onChange={(e) => updateField('bank2', 'bankName', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Bank 2 Account Name
                  </label>
                  <input
                    type="text"
                    value={formData.bank2?.accountName || ''}
                    onChange={(e) => updateField('bank2', 'accountName', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Bank 2 Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.bank2?.accountNo || ''}
                    onChange={(e) => updateField('bank2', 'accountNo', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Bank 2 IFSC Code
                  </label>
                  <input
                    type="text"
                    value={formData.bank2?.ifscCode || ''}
                    onChange={(e) => updateField('bank2', 'ifscCode', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Proposal Metrics Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                LIVE PROPOSAL METRICS
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Auto-Calculated
              </span>
            </div>

            {/* System Size Box */}
            <div className="text-center py-2 border-b border-slate-100">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                SYSTEM SIZE
              </div>
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                {capacity} <span className="text-2xl font-bold text-slate-600">kWp</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {panels} Solar Modules • {formData.system.moduleBrand?.split('(')[0]?.trim() || "Mono PERC"}
              </div>
            </div>

            {/* Dual Commercial Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700 font-medium">
                <span className="flex items-center gap-1">
                  <Building2 size={13} className="text-slate-500" />
                  <span>Bank PO Cost:</span>
                </span>
                <span className="font-mono font-bold text-slate-900">₹{formatINR(bankCost)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pl-4">
                <span>• Bank PO Net Loan:</span>
                <span className="font-mono font-medium text-slate-600">₹{formatINR(bankNet)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-700 font-medium pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <User size={13} className="text-emerald-600" />
                  <span>Customer Quote Cost:</span>
                </span>
                <span className="font-mono font-bold text-emerald-800">₹{formatINR(customerCost)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pl-4">
                <span>• Customer Base Value:</span>
                <span className="font-mono">₹{formatINR(customerGst.subTotalBase)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pl-4">
                <span>• Total GST (5% + 18%):</span>
                <span className="font-mono font-semibold text-slate-600">₹{formatINR(customerGst.totalGst)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-100">
                <span>Government Subsidy:</span>
                <span className="font-mono font-bold text-emerald-600">- ₹{formatINR(subsidy)}</span>
              </div>
            </div>

            {/* Net Investment Dark Box */}
            <div className="bg-[#0b132b] rounded-xl p-4 text-white text-center shadow-md">
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                CUSTOMER NET INVESTMENT
              </div>
              <div className="text-3xl font-extrabold text-white mt-1">
                ₹{formatINR(customerNet)}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">
                Client's actual out-of-pocket
              </div>
              <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
                <span>Bank PO: <strong className="text-white">₹{formatINR(bankCost)}</strong></span>
                <span>Bank Net: <strong className="text-white">₹{formatINR(bankNet)}</strong></span>
              </div>
            </div>

            {/* Payback & Savings Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Est. Annual Savings:</span>
                <span className="font-bold text-emerald-600 text-sm">
                  ₹{formatINR(formData.pricing.annualSavings)} <span className="text-[10px] font-normal text-slate-400">/yr</span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Capital Payback Period:</span>
                <span className="font-bold text-amber-600 text-sm">
                  {formData.pricing.paybackYears} Years
                </span>
              </div>
            </div>

            {/* Dual Proposal Document Structure Checklist */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                ⚡ Linked Dual Quotation Outputs:
              </div>

              {/* Bank Quotation (7 Pages) */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                  <span>🏛️ Bank Quotation</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-mono">7 Pages</span>
                </div>
                <ul className="text-[10.5px] space-y-1 text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                    <span>P1: Cover &amp; Detailed Techno Offer</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                    <span>P2: On-Grid System Architecture</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                    <span>P3: 9 Techno-Commercial Benefits</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                    <span>P4: System Specs &amp; Structure Comparison</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                    <span>P5: 12-Item BOM Cost Estimations</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                    <span>P6: GST 70:30, Payback &amp; Bank Terms</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                    <span>P7: Commercial Terms &amp; Conditions</span>
                  </li>
                </ul>
              </div>

              {/* Customer Quotation (5 Pages) */}
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950 mb-1">
                  <span>👤 Customer Quotation</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 font-mono">5 Pages</span>
                </div>
                <ul className="text-[10.5px] space-y-1 text-emerald-900">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    <span>P1: Executive Cover, 30% Spine &amp; ROI</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    <span>P2: Itemized Hardware BOM &amp; Simulation</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    <span>P3: Commercials &amp; 25-Yr Cashflow Table</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    <span>P4: Completed Projects Portfolio Showcase</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    <span>P5: Company Profile, Scopes &amp; QR Codes</span>
                  </li>
                </ul>
              </div>

              {/* Advance Payment Receipt (1 Page) */}
              <div 
                onClick={() => onLivePreview(formData, 'receipt')}
                className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/90 cursor-pointer hover:bg-amber-100/70 transition"
                title="Click to preview 1-Page Advance Payment Receipt"
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Receipt size={13} className="text-amber-700" />
                    <span>🧾 Official Advance Receipt</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-mono font-bold">1 Page</span>
                </div>
                <ul className="text-[10.5px] space-y-1 text-amber-950">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-amber-700 shrink-0" />
                    <span>Official Round Seal &amp; Company Letterhead</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-amber-700 shrink-0" />
                    <span>Advance vs Balance, Mode &amp; Words</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
