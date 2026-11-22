import React, { useState, useEffect, Component } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { QuotationFormView } from './components/QuotationFormView';
import { ProposalPreviewModal } from './components/ProposalPreviewModal';
import { SettingsModal } from './components/SettingsModal';
import { 
  INITIAL_QUOTATION_DATA, 
  INITIAL_SAVED_QUOTATIONS, 
  DEFAULT_COMPANY, 
  DEFAULT_BANK,
  DEFAULT_BANK2,
  DEFAULT_BOM,
  DEFAULT_TERMS
} from './data/defaultData';
import { generateRefNo, formatDateToPDFStyle, calculateSubsidy, calculateEnergyMetrics, calculateArea } from './utils/calculations';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <AlertTriangle size={48} className="text-amber-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Something went wrong while rendering the view</h2>
          <p className="text-slate-400 text-sm max-w-md mb-4">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('srimaan_solar_proposals_db');
              window.location.reload();
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-md shadow"
          >
            Reset Database &amp; Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function AppContent() {
  // Navigation view: 'dashboard' | 'form' | 'preview'
  const [currentView, setCurrentView] = useState('dashboard');
  const [previewFormat, setPreviewFormat] = useState('bank'); // 'bank' | 'customer'

  // Quotations list in database (auto-migrating existing records to include latest bank2 & registered office)
  const [quotations, setQuotations] = useState(() => {
    try {
      const saved = localStorage.getItem('srimaan_solar_proposals_db');
      const list = saved ? JSON.parse(saved) : INITIAL_SAVED_QUOTATIONS;
      if (Array.isArray(list) && list.length > 0) {
        return list.map(q => ({
          ...q,
          company: {
            ...DEFAULT_COMPANY,
            ...(q.company || {}),
            registeredOffice: "6-210 SRIRAMNAGAR BEHIND AUTONAGAR WARANGAL X ROAD, Edulapuram Muncipalty, Khammam district, Telangana State 507003",
            addressLine1: (q.company?.addressLine1 && q.company.addressLine1.includes('SRIRAMNAGAR')) 
              ? q.company.addressLine1 
              : "6-210 SRIRAMNAGAR BEHIND AUTONAGAR WARANGAL X ROAD, Edulapuram Muncipalty, Khammam district, Telangana State 507003"
          },
          bank: q.bank || DEFAULT_BANK,
          bank2: q.bank2 || DEFAULT_BANK2
        }));
      }
      return INITIAL_SAVED_QUOTATIONS;
    } catch {
      return INITIAL_SAVED_QUOTATIONS;
    }
  });

  // Current active quotation for edit or preview
  const [activeQuotation, setActiveQuotation] = useState(() => quotations[0] || INITIAL_QUOTATION_DATA);

  // Settings modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [companySettings, setCompanySettings] = useState(() => {
    try {
      const saved = localStorage.getItem('srimaan_company_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.registeredOffice && parsed.registeredOffice.includes('SRIRAMNAGAR')) {
          return parsed;
        }
      }
      return DEFAULT_COMPANY;
    } catch {
      return DEFAULT_COMPANY;
    }
  });
  const [bankSettings, setBankSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('srimaan_bank_settings');
      return saved ? JSON.parse(saved) : DEFAULT_BANK;
    } catch {
      return DEFAULT_BANK;
    }
  });
  const [bank2Settings, setBank2Settings] = useState(() => {
    try {
      const saved = localStorage.getItem('srimaan_bank2_settings');
      return saved ? JSON.parse(saved) : DEFAULT_BANK2;
    } catch {
      return DEFAULT_BANK2;
    }
  });

  // Sync quotations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('srimaan_solar_proposals_db', JSON.stringify(quotations));
    } catch (e) {
      console.error(e);
    }
  }, [quotations]);

  // Handler: Start New Quotation
  const handleStartNewQuotation = () => {
    const randomSeq = Math.floor(Math.random() * 8999999) + 1000000;
    const initialConsumerNo = `TSNPDCL-${randomSeq}`;
    const initialKw = 5;
    const energy = calculateEnergyMetrics(initialKw);
    const area = calculateArea(initialKw);
    const subsidy = calculateSubsidy(initialKw);
    const customerCost = 420000;
    const bankCost = 475000;
    const panelWattage = 540;
    const panels = Math.ceil((initialKw * 1000) / panelWattage);
    const moduleBrand = "Waaree Energies";

    const newQuote = {
      id: `quote-${Date.now()}`,
      refNo: initialConsumerNo,
      date: formatDateToPDFStyle(new Date()),
      status: "Draft",
      proposalTitle: `DETAILED TECHNO OFFER FOR THE SUPPLY OF ${initialKw}KW SOLAR ROOFTOP ONGRID POWER GENERATING SYSTEM`,
      customer: {
        name: "",
        company: "",
        addressLine1: "",
        district: "Nizamabad",
        state: "TELANGANA",
        pinCode: "",
        phone: "",
        email: "",
        consumerNo: initialConsumerNo,
        connectedLoad: `${initialKw} kW`,
        phase: "Single Phase (1-Phase 230V)",
        rooftopType: "RCC Flat Concrete Terrace",
        category: "Domestic Category"
      },
      company: companySettings,
      bank: bankSettings,
      system: {
        capacityKw: initialKw,
        panelsCount: panels,
        panelWattage: panelWattage,
        moduleBrand: moduleBrand,
        phase: "Single Phase (1-Phase 230V)",
        rooftopType: "RCC Flat Concrete Terrace",
        inverterBrand: `${initialKw} KW inverter (Polycab Solar inverter)`,
        structureType: "GI Module 7FT/6FT Mounting structure Designed Wind Load Resistance: 180Kmph, Hotdip Legs And G.I Rafter/Periling (AS PER SITE REQUIRMENT…BASIC AND HEIGHT )",
        energyPerDay: energy.energyPerDay,
        energyPerMonth: energy.energyPerMonth,
        energyPerYear: energy.energyPerYear,
        areaRequired: area,
        areaSystemKw: `${initialKw}kW`
      },
      pricing: {
        totalCost: customerCost,
        customerCost: customerCost,
        bankCost: bankCost,
        subsidyAmount: subsidy,
        afterSubsidyCost: customerCost - subsidy,
        bankNetCost: bankCost - subsidy,
        electricityTariff: 8,
        annualSavings: 48000,
        paybackYears: "4.0"
      },
      receipt: {
        receiptNo: String(Math.floor(Math.random() * 899) + 100),
        receiptDate: formatDateToPDFStyle(new Date()),
        advanceAmount: Math.round(customerCost * 0.1),
        paymentMode: "Bank Transfer / RTGS / NEFT / UPI",
        txnReference: "",
        reasonForPayment: "Start the work of Enhancement of contract load and Feasibility permission.",
        receiverName: "T.RAVINDRA CHARY",
        receiverPhone: "9347416140",
        receivedOnBehalfOf: "Srimaan Solar Solutions"
      },
      bom: DEFAULT_BOM(initialKw, `${initialKw} KW inverter (Polycab Solar inverter)`, moduleBrand, null, panelWattage),
      terms: DEFAULT_TERMS
    };

    setActiveQuotation(newQuote);
    setCurrentView('form');
  };

  // Handler: Edit Quotation
  const handleEditQuotation = (quote) => {
    setActiveQuotation(quote);
    setCurrentView('form');
  };

  // Handler: Preview Quotation (with format support: 'bank' | 'customer')
  const handlePreviewQuotation = (quote, format = 'bank') => {
    setActiveQuotation(quote);
    setPreviewFormat(format);
    setCurrentView('preview');
  };

  // Handler: Save Quotation
  const handleSaveQuotation = (savedQuote) => {
    const existingIndex = quotations.findIndex(q => q.id === savedQuote.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...quotations];
      updated[existingIndex] = savedQuote;
    } else {
      updated = [savedQuote, ...quotations];
    }
    setQuotations(updated);
    setActiveQuotation(savedQuote);
  };

  // Handler: Duplicate Quotation
  const handleDuplicateQuotation = (quote) => {
    const randomSeq = Math.floor(Math.random() * 8999999) + 1000000;
    const newConsumerNo = `TSNPDCL-${randomSeq}`;
    const duplicated = {
      ...JSON.parse(JSON.stringify(quote)),
      id: `quote-${Date.now()}`,
      refNo: newConsumerNo,
      date: formatDateToPDFStyle(new Date()),
      status: "Draft",
      customer: {
        ...quote.customer,
        name: `${quote.customer?.name || 'Customer'} (Copy)`,
        consumerNo: newConsumerNo
      }
    };
    setQuotations([duplicated, ...quotations]);
  };

  // Handler: Delete Quotation
  const handleDeleteQuotation = (id) => {
    if (window.confirm("Are you sure you want to delete this quotation?")) {
      const updated = quotations.filter(q => q.id !== id);
      setQuotations(updated);
    }
  };

  // Handler: Save Settings
  const handleSaveSettings = ({ company, bank, bank2 }) => {
    setCompanySettings(company);
    setBankSettings(bank);
    if (bank2) setBank2Settings(bank2);
    localStorage.setItem('srimaan_company_settings', JSON.stringify(company));
    localStorage.setItem('srimaan_bank_settings', JSON.stringify(bank));
    if (bank2) localStorage.setItem('srimaan_bank2_settings', JSON.stringify(bank2));

    // Update active quotation company & bank if present
    setActiveQuotation(prev => ({
      ...prev,
      company,
      bank,
      bank2: bank2 || prev.bank2 || DEFAULT_BANK2
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col antialiased">
      {/* Top Navigation Bar */}
      {currentView !== 'preview' && (
        <Navbar 
          currentView={currentView}
          onNavigate={(view) => {
            if (view === 'create') {
              handleStartNewQuotation();
            } else {
              setCurrentView(view);
            }
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'dashboard' && (
          <DashboardView
            quotations={quotations}
            onNewQuotation={handleStartNewQuotation}
            onEditQuotation={handleEditQuotation}
            onPreviewQuotation={handlePreviewQuotation}
            onDuplicateQuotation={handleDuplicateQuotation}
            onDeleteQuotation={handleDeleteQuotation}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {currentView === 'form' && (
          <QuotationFormView
            quotation={activeQuotation}
            onSave={handleSaveQuotation}
            onBack={() => setCurrentView('dashboard')}
            onLivePreview={(updatedQuote, format = 'bank') => {
              setActiveQuotation(updatedQuote);
              setPreviewFormat(format);
              setCurrentView('preview');
            }}
          />
        )}

        {currentView === 'preview' && (
          <ProposalPreviewModal
            quotation={activeQuotation}
            initialFormat={previewFormat}
            onBack={() => setCurrentView('form')}
            onEdit={() => setCurrentView('form')}
            onUpdateQuotation={(updated) => setActiveQuotation(updated)}
          />
        )}
      </main>

      {/* Global Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveSettings={handleSaveSettings}
        currentCompany={companySettings}
        currentBank={bankSettings}
        currentBank2={bank2Settings}
      />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
