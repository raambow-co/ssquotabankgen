import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Building2, 
  CreditCard, 
  IndianRupee, 
  Settings, 
  QrCode, 
  FileText, 
  Cpu, 
  ShieldCheck, 
  Image, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  Layers 
} from 'lucide-react';
import { DEFAULT_COMPANY, DEFAULT_BANK, DEFAULT_BANK2 } from '../data/defaultData';
import { srimaanCustomerSettings } from '../utils/quotationAdapter';

export const SettingsModal = ({ 
  isOpen, 
  onClose, 
  onSaveSettings, 
  currentCompany, 
  currentBank, 
  currentBank2 
}) => {
  const [activeTab, setActiveTab] = useState('company'); // 'company' | 'qr' | 'cover' | 'technical' | 'pricing' | 'warranties' | 'portfolio'
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Load master settings with fallback to Srimaan Solar benchmark defaults
  const getInitialSettings = () => {
    try {
      const saved = localStorage.getItem('srimaan_master_settings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to parse saved master settings", e);
    }
    return {
      company: {
        tradeName: "SRIMAAN SOLAR SOLUTIONS",
        legalName: "M/s. SRIMAAN SOLAR SOLUTIONS",
        shortName: "SRIMAAN",
        tagline: "Built on Trust. Driven by Excellence.",
        empanelmentSubheading: "State DISCOM Empanelled Solar EPC Vendor • Registered Channel Partner",
        aboutNarrative: "M/s. SRIMAAN SOLAR SOLUTIONS is a premier clean energy EPC company specializing in high-performance rooftop solar installations across residential, commercial, institutional, and industrial facilities. Backed by certified civil and electrical engineers, we combine Tier-1 BloombergNEF hardware with precision structural design, seamless DISCOM net-metering facilitation, and lifetime IoT monitoring.",
        address: "#6-210, Sriramnagar, Behind Autonagar, Warangal X Road, Edulapuram Muncipalty, Khammam District, Telangana State 507003",
        branches: "Hyderabad HQ | Khammam | Suryapet | Warangal",
        phone1: "+91 93474 16140",
        phone2: "+91 99124 16140",
        email: "srimaansolarsolutions@gmail.com",
        website: "www.srimaansolarsolutions.com",
        gstin: "36ADPPT2441N1ZW",
        pan: "ADPPT2441N",
        cin: "TSRE250511",
        mnreEmpanelment: "TS-DISCOM-8492",
        msme: "UDYAM-TS-02-0048192"
      },
      bank: currentBank || DEFAULT_BANK,
      bank2: currentBank2 || DEFAULT_BANK2,
      qrPortals: {
        facebook: {
          title: "Facebook",
          handle: "@srimaansolar",
          badge: "Social",
          actionText: "Scan to Follow",
          image: "/assets/qr/fb-qr.jpeg"
        },
        instagram: {
          title: "Instagram",
          handle: "@srimaansolar",
          badge: "Reels",
          actionText: "Scan to View",
          image: "/assets/qr/insta-qr.jpeg"
        },
        website: {
          title: "Official Website",
          handle: "srimaansolarsolutions.com",
          badge: "Portal",
          actionText: "Scan to Visit",
          image: "/assets/qr/web-qr.jpeg"
        },
        googleMaps: {
          title: "Google Maps",
          handle: "Khammam HQ",
          badge: "Location",
          actionText: "Scan for Route",
          image: "/assets/qr/loc-qr.jpeg"
        }
      },
      coverPage: {
        heroTitle: "Techno-Commercial Solar Proposal",
        badge1: "Grid-Interactive Solar PV System",
        badge2: "DISCOM Empanelled EPC",
        heroSubtitle: "Tailored high-efficiency solar photovoltaic power generation system engineered for maximum energy yield, structural durability, and substantial utility bill savings.",
        features: [
          "Tier-1 BloombergNEF Rated High-Efficiency PV Modules",
          "Smart Grid-Tie Inverter with Real-Time Wi-Fi IoT Cloud Telemetry",
          "Hot-Dip Galvanized Structure (Wind Resistance up to 150 km/h)",
          "Turnkey DISCOM Net-Metering Documentation & Portal Liaison",
          "5-Year Comprehensive Workmanship & Generation SLA Support",
          "Zero Roof Puncture Ballasted / Anti-Leak Fastening Engineering"
        ]
      },
      technical: {
        moduleBrand: "Waaree Energies",
        cellTechnology: "TOPCon Bi-facial Dual Glass 16BB",
        defaultWattage: 540,
        moduleEfficiency: "21.5%",
        degradationRate: 0.55,
        moduleImage: "/assets/hardware/waaree-topcon-module.jpg",
        inverterBrand: "Sungrow Power",
        inverterEfficiency: ">98.4% Dual MPPT",
        inverterImage: "/assets/hardware/smart-grid-inverter.jpg",
        structureType: "Elevated Hot-Dip GI Structure (7 to 9 ft Roof Clearance)",
        zincCoating: "80µ Zinc Coating (IS 4759)",
        windSpeed: "158 km/h (IS 875 Part 3: 2015)",
        structureImage: "/assets/hardware/elevated-structure.jpg",
        cablesSpec: "Polycab 4 / 6 sq.mm Electron Cross-Linked UV Cable (EN 50618)",
        earthingSpec: "3 Chemical Earthing Pits (IS 3043:2018) + Class A Lightning Arrester",
        bosImage: "/assets/hardware/solar-dcdb-acdb-bos.jpg"
      },
      pricing: {
        defaultRatePerKw: 52000,
        statutoryGstBifurcation: "70% Goods (5%) + 30% Services (18%)",
        defaultDiscount: 6000,
        subsidy1kW: 30000,
        subsidy2kW: 60000,
        subsidy3kW: 78000,
        baselineTariff: 8.5,
        yieldFactor: 4.25,
        gridInflationRate: 3.0,
        solarIrr: "28% - 32% IRR",
        bankFdYield: "6.8% - 7.2%",
        equityMfYield: "12% - 14%",
        propertyYield: "2.5% - 3.2%"
      },
      warranties: {
        modulePerformance: "25-Year Linear Performance Warranty (≥84.8% at Yr 25)",
        moduleProduct: "12-Year Workmanship Defect Warranty",
        inverter: "7-Year Comprehensive Replacement Warranty",
        structure: "15-Year Hot-Dip GI Structural Durability Guarantee",
        workmanshipAmc: "5-Year Free Annual Maintenance & Quarterly Health Inspections",
        milestoneAdvance: 20,
        milestoneDispatch: 70,
        milestoneInstallation: 10
      },
      portfolio: [
        { id: 1, title: "Residential Rooftop 10 kWp", location: "Khammam, Telangana", image: "/assets/portfolio/project-1.jpg", type: "Residential" },
        { id: 2, title: "Commercial Net-Metered 25 kWp", location: "Warangal, Telangana", image: "/assets/portfolio/project-2.jpg", type: "Commercial" },
        { id: 3, title: "Industrial Elevated 50 kWp", location: "Hyderabad, Telangana", image: "/assets/portfolio/project-3.jpg", type: "Industrial" },
        { id: 4, title: "Institutional Rooftop 15 kWp", location: "Vijayawada, Andhra Pradesh", image: "/assets/portfolio/project-4.jpg", type: "Institutional" }
      ]
    };
  };

  const [settings, setSettings] = useState(getInitialSettings);

  if (!isOpen) return null;

  // Generic updater
  const updateSection = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // Bullets management for Cover Page
  const handleFeatureChange = (index, value) => {
    const updated = [...settings.coverPage.features];
    updated[index] = value;
    setSettings(prev => ({
      ...prev,
      coverPage: { ...prev.coverPage, features: updated }
    }));
  };

  const handleAddFeature = () => {
    setSettings(prev => ({
      ...prev,
      coverPage: {
        ...prev.coverPage,
        features: [...prev.coverPage.features, "New Engineering Standard / Capability Feature"]
      }
    }));
  };

  const handleDeleteFeature = (index) => {
    const updated = settings.coverPage.features.filter((_, i) => i !== index);
    setSettings(prev => ({
      ...prev,
      coverPage: { ...prev.coverPage, features: updated }
    }));
  };

  // QR Portals management
  const updateQrPortal = (portalKey, field, value) => {
    setSettings(prev => ({
      ...prev,
      qrPortals: {
        ...prev.qrPortals,
        [portalKey]: {
          ...prev.qrPortals[portalKey],
          [field]: value
        }
      }
    }));
  };

  // Save all settings to localStorage and trigger callback
  const handleSaveAll = () => {
    try {
      localStorage.setItem('srimaan_master_settings', JSON.stringify(settings));
      if (settings.company) {
        localStorage.setItem('srimaan_company_settings', JSON.stringify(settings.company));
      }
      if (settings.bank) {
        localStorage.setItem('srimaan_bank_settings', JSON.stringify(settings.bank));
      }
      if (settings.bank2) {
        localStorage.setItem('srimaan_bank2_settings', JSON.stringify(settings.bank2));
      }
    } catch (e) {
      console.warn("Storage error", e);
    }

    if (onSaveSettings) {
      onSaveSettings({
        company: settings.company,
        bank: settings.bank,
        bank2: settings.bank2,
        masterSettings: settings
      });
    }

    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 1000);
  };

  // Reset to Srimaan benchmark configuration defaults
  const handleResetDefaults = () => {
    if (window.confirm("Reset all 7 Admin Configuration tabs to Srimaan Solar Solutions benchmark defaults?")) {
      localStorage.removeItem('srimaan_master_settings');
      setSettings(getInitialSettings());
    }
  };

  const tabs = [
    { id: 'company', label: 'Company & Statutory', icon: Building2 },
    { id: 'qr', label: 'QR Portals & Connect', icon: QrCode },
    { id: 'cover', label: 'Cover Page & Hero', icon: FileText },
    { id: 'technical', label: 'Technical & Hardware', icon: Cpu },
    { id: 'pricing', label: 'Pricing, Subsidy & ROI', icon: IndianRupee },
    { id: 'warranties', label: 'Warranties, Scope & O&M', icon: ShieldCheck },
    { id: 'portfolio', label: 'Portfolio & Showcase', icon: Image }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-100 rounded-2xl w-full max-w-5xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* ============================================================== */}
        {/* 1. MASTER HEADER & TOP ACTIONS                                 */}
        {/* ============================================================== */}
        <div className="bg-white px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Back"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <Settings size={18} className="text-amber-500" />
                <span>Admin Panel &bull; Master Quotation Configuration</span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Customize 100% of the quotation system &mdash; company credentials, hardware catalogs, pricing formulas, QR portals, portfolio works, and statutory guarantees.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#07132c] hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
            >
              {showSavedToast ? <Check size={14} className="text-emerald-400" /> : <Save size={13} className="text-amber-400" />}
              <span>{showSavedToast ? 'Settings Saved!' : 'Save All Settings'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. 7-TAB HORIZONTAL NAVIGATION BAR                             */}
        {/* ============================================================== */}
        <div className="bg-white px-5 py-2 border-b border-slate-200 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center space-x-1.5 min-w-max">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0b1a3d] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <TabIcon size={14} className={isActive ? 'text-amber-400' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. SCROLLABLE TAB CONTENT BODY                                 */}
        {/* ============================================================== */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs text-slate-800">

          {/* ------------------------------------------------------------ */}
          {/* TAB 1: COMPANY & STATUTORY                                   */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'company' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Card 1: Corporate Identity & Branding Details */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Building2 size={16} className="text-amber-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Corporate Identity &amp; Branding Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Company Trade / Display Name</label>
                    <input
                      type="text"
                      value={settings.company.tradeName}
                      onChange={(e) => updateSection('company', 'tradeName', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-bold focus:border-blue-600 outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Printed on quotation titles and covers</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Company Full Legal Registered Name</label>
                    <input
                      type="text"
                      value={settings.company.legalName}
                      onChange={(e) => updateSection('company', 'legalName', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-bold focus:border-blue-600 outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Used for official contracts &amp; seals</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Short Brand Name</label>
                    <input
                      type="text"
                      value={settings.company.shortName}
                      onChange={(e) => updateSection('company', 'shortName', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-bold focus:border-blue-600 outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">e.g. SRIMAAN</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Corporate Tagline</label>
                    <input
                      type="text"
                      value={settings.company.tagline}
                      onChange={(e) => updateSection('company', 'tagline', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Appears in footers and cover statements</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Empanelment Subheading</label>
                    <input
                      type="text"
                      value={settings.company.empanelmentSubheading}
                      onChange={(e) => updateSection('company', 'empanelmentSubheading', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Header credentials line</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 text-[11px] mb-0.5">About Company Narrative (Page 5)</label>
                  <textarea
                    rows={3}
                    value={settings.company.aboutNarrative}
                    onChange={(e) => updateSection('company', 'aboutNarrative', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 leading-relaxed focus:border-blue-600 outline-none text-[11px]"
                  />
                </div>
              </div>

              {/* Card 2: Headquarters, Regional Hubs & Contact Coordinates */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <MapPin size={16} className="text-emerald-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Headquarters, Regional Hubs &amp; Contact Coordinates
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Registered Head Office Address</label>
                    <input
                      type="text"
                      value={settings.company.address}
                      onChange={(e) => updateSection('company', 'address', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Regional Branch Network</label>
                    <input
                      type="text"
                      value={settings.company.branches}
                      onChange={(e) => updateSection('company', 'branches', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Support Phone Numbers</label>
                    <input
                      type="text"
                      value={settings.company.phone1}
                      onChange={(e) => updateSection('company', 'phone1', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Official Email Address</label>
                    <input
                      type="email"
                      value={settings.company.email}
                      onChange={(e) => updateSection('company', 'email', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Official Website URL</label>
                    <input
                      type="text"
                      value={settings.company.website}
                      onChange={(e) => updateSection('company', 'website', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Statutory Registrations & DISCOM Credentials */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <ShieldCheck size={16} className="text-blue-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Statutory Registrations &amp; DISCOM Credentials
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">GSTIN Number</label>
                    <input
                      type="text"
                      value={settings.company.gstin}
                      onChange={(e) => updateSection('company', 'gstin', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">PAN Registration</label>
                    <input
                      type="text"
                      value={settings.company.pan}
                      onChange={(e) => updateSection('company', 'pan', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">MNRE Empanelment ID</label>
                    <input
                      type="text"
                      value={settings.company.mnreEmpanelment}
                      onChange={(e) => updateSection('company', 'mnreEmpanelment', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">MSME Registration Number</label>
                    <input
                      type="text"
                      value={settings.company.msme}
                      onChange={(e) => updateSection('company', 'msme', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Card 4: Official Bank Accounts */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <CreditCard size={16} className="text-amber-600" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Official Bank Accounts (Used for Bank PO &amp; Client Payments)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* HDFC Primary Bank */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-blue-900 text-[11px] block border-b border-slate-200 pb-1">
                      Primary Bank Account (HDFC Bank)
                    </span>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase">Account Name</label>
                      <input
                        type="text"
                        value={settings.bank.accountName}
                        onChange={(e) => setSettings(prev => ({ ...prev, bank: { ...prev.bank, accountName: e.target.value } }))}
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-900 font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold uppercase">Account No</label>
                        <input
                          type="text"
                          value={settings.bank.accountNo}
                          onChange={(e) => setSettings(prev => ({ ...prev, bank: { ...prev.bank, accountNo: e.target.value } }))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold uppercase">IFSC Code</label>
                        <input
                          type="text"
                          value={settings.bank.ifscCode}
                          onChange={(e) => setSettings(prev => ({ ...prev, bank: { ...prev.bank, ifscCode: e.target.value } }))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SBI Secondary Bank */}
                  <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200 space-y-2">
                    <span className="font-bold text-amber-950 text-[11px] block border-b border-amber-200 pb-1">
                      Secondary Bank Account (SBI &bull; Page 4 &amp; Receipt)
                    </span>
                    <div>
                      <label className="block text-[10px] text-amber-800 font-bold uppercase">Account Name</label>
                      <input
                        type="text"
                        value={settings.bank2.accountName}
                        onChange={(e) => setSettings(prev => ({ ...prev, bank2: { ...prev.bank2, accountName: e.target.value } }))}
                        className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-slate-900 font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-amber-800 font-bold uppercase">Account No</label>
                        <input
                          type="text"
                          value={settings.bank2.accountNo}
                          onChange={(e) => setSettings(prev => ({ ...prev, bank2: { ...prev.bank2, accountNo: e.target.value } }))}
                          className="w-full px-2 py-1 bg-white border border-amber-300 rounded font-mono font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-amber-800 font-bold uppercase">IFSC Code</label>
                        <input
                          type="text"
                          value={settings.bank2.ifscCode}
                          onChange={(e) => setSettings(prev => ({ ...prev, bank2: { ...prev.bank2, ifscCode: e.target.value } }))}
                          className="w-full px-2 py-1 bg-white border border-amber-300 rounded font-mono font-bold text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 2: QR PORTALS & CONNECT (Exact Match to Image 2)          */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'qr' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <QrCode size={16} className="text-amber-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    FOUR OFFICIAL DIGITAL CONNECT &amp; LOCATION QR CODES (PAGE 5)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  Rendered side-by-side in exact 4-column layout
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Facebook */}
                <div className="p-3.5 rounded-xl border border-blue-200 bg-white space-y-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-bold text-blue-900 text-xs">1. Facebook Portal</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Social</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Card Title</label>
                      <input
                        type="text"
                        value={settings.qrPortals.facebook.title}
                        onChange={(e) => updateQrPortal('facebook', 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Handle / Subtitle</label>
                      <input
                        type="text"
                        value={settings.qrPortals.facebook.handle}
                        onChange={(e) => updateQrPortal('facebook', 'handle', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Scan Action Text</label>
                      <input
                        type="text"
                        value={settings.qrPortals.facebook.actionText}
                        onChange={(e) => updateQrPortal('facebook', 'actionText', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Image Asset Path</label>
                      <input
                        type="text"
                        value={settings.qrPortals.facebook.image}
                        onChange={(e) => updateQrPortal('facebook', 'image', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono text-[10px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Instagram */}
                <div className="p-3.5 rounded-xl border border-pink-200 bg-white space-y-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-bold text-pink-900 text-xs">2. Instagram Portal</span>
                    <span className="text-[10px] font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded">Reels</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Card Title</label>
                      <input
                        type="text"
                        value={settings.qrPortals.instagram.title}
                        onChange={(e) => updateQrPortal('instagram', 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Handle / Subtitle</label>
                      <input
                        type="text"
                        value={settings.qrPortals.instagram.handle}
                        onChange={(e) => updateQrPortal('instagram', 'handle', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Scan Action Text</label>
                      <input
                        type="text"
                        value={settings.qrPortals.instagram.actionText}
                        onChange={(e) => updateQrPortal('instagram', 'actionText', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Image Asset Path</label>
                      <input
                        type="text"
                        value={settings.qrPortals.instagram.image}
                        onChange={(e) => updateQrPortal('instagram', 'image', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono text-[10px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Official Website */}
                <div className="p-3.5 rounded-xl border border-amber-200 bg-white space-y-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-bold text-amber-900 text-xs">3. Official Website Portal</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Portal</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Card Title</label>
                      <input
                        type="text"
                        value={settings.qrPortals.website.title}
                        onChange={(e) => updateQrPortal('website', 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Domain / Subtitle</label>
                      <input
                        type="text"
                        value={settings.qrPortals.website.handle}
                        onChange={(e) => updateQrPortal('website', 'handle', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Scan Action Text</label>
                      <input
                        type="text"
                        value={settings.qrPortals.website.actionText}
                        onChange={(e) => updateQrPortal('website', 'actionText', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Image Asset Path</label>
                      <input
                        type="text"
                        value={settings.qrPortals.website.image}
                        onChange={(e) => updateQrPortal('website', 'image', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono text-[10px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Google Maps */}
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-white space-y-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-bold text-emerald-900 text-xs">4. Google Maps Office &amp; Directions</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Location</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Card Title</label>
                      <input
                        type="text"
                        value={settings.qrPortals.googleMaps.title}
                        onChange={(e) => updateQrPortal('googleMaps', 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Location / Subtitle</label>
                      <input
                        type="text"
                        value={settings.qrPortals.googleMaps.handle}
                        onChange={(e) => updateQrPortal('googleMaps', 'handle', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Scan Action Text</label>
                      <input
                        type="text"
                        value={settings.qrPortals.googleMaps.actionText}
                        onChange={(e) => updateQrPortal('googleMaps', 'actionText', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Image Asset Path</label>
                      <input
                        type="text"
                        value={settings.qrPortals.googleMaps.image}
                        onChange={(e) => updateQrPortal('googleMaps', 'image', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono text-[10px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 3: COVER PAGE & HERO (Exact Match to Image 3)             */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'cover' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText size={16} className="text-amber-500" />
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                  COVER PAGE HERO SECTION &amp; VALUE PROPOSITIONS (PAGE 1)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Hero Title</label>
                  <input
                    type="text"
                    value={settings.coverPage.heroTitle}
                    onChange={(e) => updateSection('coverPage', 'heroTitle', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-bold text-slate-900 focus:border-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Top Badge 1</label>
                  <input
                    type="text"
                    value={settings.coverPage.badge1}
                    onChange={(e) => updateSection('coverPage', 'badge1', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Hero Subtitle / Value Pitch</label>
                <textarea
                  rows={2}
                  value={settings.coverPage.heroSubtitle}
                  onChange={(e) => updateSection('coverPage', 'heroSubtitle', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 leading-relaxed focus:border-blue-600 outline-none text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Top Badge 2</label>
                <input
                  type="text"
                  value={settings.coverPage.badge2}
                  onChange={(e) => updateSection('coverPage', 'badge2', e.target.value)}
                  className="w-full sm:w-1/2 px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">
                    Featured System Capabilities (Bullets on Page 1):
                  </span>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>+ Add Feature Bullet</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  {settings.coverPage.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-medium focus:border-blue-600 outline-none text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteFeature(idx)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Delete feature"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 4: TECHNICAL & HARDWARE                                  */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'technical' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Cpu size={16} className="text-amber-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Solar PV Modules &amp; Inverter Specifications
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Default Module Brand</label>
                    <input
                      type="text"
                      value={settings.technical.moduleBrand}
                      onChange={(e) => updateSection('technical', 'moduleBrand', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Cell Technology</label>
                    <input
                      type="text"
                      value={settings.technical.cellTechnology}
                      onChange={(e) => updateSection('technical', 'cellTechnology', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Default Module Wattage (Wp)</label>
                    <input
                      type="number"
                      value={settings.technical.defaultWattage}
                      onChange={(e) => updateSection('technical', 'defaultWattage', parseInt(e.target.value, 10) || 540)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Inverter Brand</label>
                    <input
                      type="text"
                      value={settings.technical.inverterBrand}
                      onChange={(e) => updateSection('technical', 'inverterBrand', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Inverter Peak Efficiency</label>
                    <input
                      type="text"
                      value={settings.technical.inverterEfficiency}
                      onChange={(e) => updateSection('technical', 'inverterEfficiency', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Layers size={16} className="text-blue-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Mounting Structure &amp; Balance of System (BOS)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Mounting Structure Standard</label>
                    <input
                      type="text"
                      value={settings.technical.structureType}
                      onChange={(e) => updateSection('technical', 'structureType', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Design Wind Speed</label>
                    <input
                      type="text"
                      value={settings.technical.windSpeed}
                      onChange={(e) => updateSection('technical', 'windSpeed', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">DC / AC Solar Cables</label>
                    <input
                      type="text"
                      value={settings.technical.cablesSpec}
                      onChange={(e) => updateSection('technical', 'cablesSpec', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Earthing &amp; Protection</label>
                    <input
                      type="text"
                      value={settings.technical.earthingSpec}
                      onChange={(e) => updateSection('technical', 'earthingSpec', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 5: PRICING, SUBSIDY & ROI                                */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 animate-fadeIn">
              {/* EPC Rate & GST */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <IndianRupee size={16} className="text-emerald-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    EPC Turnkey Pricing &amp; Statutory GST
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Default Rate per kW (₹)</label>
                    <input
                      type="number"
                      value={settings.pricing.defaultRatePerKw}
                      onChange={(e) => updateSection('pricing', 'defaultRatePerKw', Number(e.target.value) || 52000)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Base benchmark EPC turnkey rate</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Statutory GST Bifurcation</label>
                    <input
                      type="text"
                      value={settings.pricing.statutoryGstBifurcation || "70% Goods (5%) + 30% Services (18%)"}
                      onChange={(e) => updateSection('pricing', 'statutoryGstBifurcation', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold text-slate-800"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">MNRE 70:30 Goods 5% / Services 18%</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Default Commercial Discount (₹)</label>
                    <input
                      type="number"
                      value={settings.pricing.defaultDiscount}
                      onChange={(e) => updateSection('pricing', 'defaultDiscount', Number(e.target.value) || 6000)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold text-emerald-700"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Turnkey customer discount</span>
                  </div>
                </div>
              </div>

              {/* PM Surya Ghar DBT CFA Subsidy Caps */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Check size={16} className="text-amber-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    PM Surya Ghar DBT CFA Subsidy Tiers
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">1 kW Subsidy Amount (₹)</label>
                    <input
                      type="number"
                      value={settings.pricing.subsidy1kW}
                      onChange={(e) => updateSection('pricing', 'subsidy1kW', Number(e.target.value) || 30000)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">2 kW Subsidy Amount (₹)</label>
                    <input
                      type="number"
                      value={settings.pricing.subsidy2kW}
                      onChange={(e) => updateSection('pricing', 'subsidy2kW', Number(e.target.value) || 60000)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">&ge; 3 kW Maximum Cap (₹)</label>
                    <input
                      type="number"
                      value={settings.pricing.subsidy3kW}
                      onChange={(e) => updateSection('pricing', 'subsidy3kW', Number(e.target.value) || 78000)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold text-emerald-800"
                    />
                  </div>
                </div>
              </div>

              {/* Modeling Constants & Comparative Asset Yields */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Sparkles size={16} className="text-blue-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Generation Metrics &amp; Comparative Asset Yields (Page 3)
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Baseline Tariff (₹/unit)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={settings.pricing.baselineTariff}
                      onChange={(e) => updateSection('pricing', 'baselineTariff', parseFloat(e.target.value) || 8.5)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Solar PV IRR</label>
                    <input
                      type="text"
                      value={settings.pricing.solarIrr}
                      onChange={(e) => updateSection('pricing', 'solarIrr', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Bank FD Return</label>
                    <input
                      type="text"
                      value={settings.pricing.bankFdYield}
                      onChange={(e) => updateSection('pricing', 'bankFdYield', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Equity Mutual Funds</label>
                    <input
                      type="text"
                      value={settings.pricing.equityMfYield}
                      onChange={(e) => updateSection('pricing', 'equityMfYield', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 6: WARRANTIES, SCOPE & O&M                               */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'warranties' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Statutory Equipment Warranties &amp; Guarantees
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">PV Modules Performance Warranty</label>
                    <input
                      type="text"
                      value={settings.warranties.modulePerformance}
                      onChange={(e) => updateSection('warranties', 'modulePerformance', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">PV Modules Product Workmanship</label>
                    <input
                      type="text"
                      value={settings.warranties.moduleProduct}
                      onChange={(e) => updateSection('warranties', 'moduleProduct', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Solar Grid Inverter Warranty</label>
                    <input
                      type="text"
                      value={settings.warranties.inverter}
                      onChange={(e) => updateSection('warranties', 'inverter', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Mounting Structure Guarantee</label>
                    <input
                      type="text"
                      value={settings.warranties.structure}
                      onChange={(e) => updateSection('warranties', 'structure', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Free Comprehensive Workmanship AMC</label>
                  <input
                    type="text"
                    value={settings.warranties.workmanshipAmc}
                    onChange={(e) => updateSection('warranties', 'workmanshipAmc', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
              </div>

              {/* Payment Terms Milestones */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <CreditCard size={16} className="text-blue-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Disbursement Milestones SLA (20 : 70 : 10)
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Advance Milestone (%)</label>
                    <input
                      type="number"
                      value={settings.warranties.milestoneAdvance}
                      onChange={(e) => updateSection('warranties', 'milestoneAdvance', parseInt(e.target.value, 10) || 20)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">With Purchase Order</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Dispatch Milestone (%)</label>
                    <input
                      type="number"
                      value={settings.warranties.milestoneDispatch}
                      onChange={(e) => updateSection('warranties', 'milestoneDispatch', parseInt(e.target.value, 10) || 70)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Before Dispatch of Material</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Installation Milestone (%)</label>
                    <input
                      type="number"
                      value={settings.warranties.milestoneInstallation}
                      onChange={(e) => updateSection('warranties', 'milestoneInstallation', parseInt(e.target.value, 10) || 10)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">At Installation &amp; Sync</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 7: PORTFOLIO & SHOWCASE                                  */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'portfolio' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Image size={16} className="text-amber-500" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Completed Project Showcase Cards
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  Featured commercial and residential installations
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {settings.portfolio.map((proj, idx) => (
                  <div key={proj.id} className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex items-center gap-3">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-16 h-16 rounded-lg object-cover border border-slate-300 shrink-0" 
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                          {proj.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">#{idx + 1}</span>
                      </div>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...settings.portfolio];
                          updated[idx].title = e.target.value;
                          setSettings(prev => ({ ...prev, portfolio: updated }));
                        }}
                        className="w-full px-2 py-0.5 bg-white border border-slate-300 rounded font-bold text-xs"
                      />
                      <input
                        type="text"
                        value={proj.location}
                        onChange={(e) => {
                          const updated = [...settings.portfolio];
                          updated[idx].location = e.target.value;
                          setSettings(prev => ({ ...prev, portfolio: updated }));
                        }}
                        className="w-full px-2 py-0.5 bg-white border border-slate-300 rounded text-[11px] text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ============================================================== */}
        {/* 4. BOTTOM ACTION FOOTER (Exact Match to Image 2)               */}
        {/* ============================================================== */}
        <div className="bg-white px-5 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            Back to Dashboard
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#07132c] hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-md transition cursor-pointer"
          >
            {showSavedToast ? <Check size={14} className="text-emerald-400" /> : <Save size={14} className="text-amber-400" />}
            <span>{showSavedToast ? 'Settings Saved Successfully!' : 'Save All Configuration Settings'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
