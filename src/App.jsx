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

  // Quotations list in database
  const [quotations, setQuotations] = useState(() => {
    try {
      const saved = localStorage.getItem('srimaan_solar_proposals_db');
      return saved ? JSON.parse(saved) : INITIAL_SAVED_QUOTATIONS;
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
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY;
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
    const randomSeq = Math.floor(Math.random() * 8999) + 1000;
    const newRef = `SRI-SOL-2026-${randomSeq}`;
    const initialKw = 5;
    const energy = calculateEnergyMetrics(initialKw);
    const area = calculateArea(initialKw);
    const subsidy = calculateSubsidy(initialKw);
    const cost = 425000;

    const newQuote = {
      id: `quote-${Date.now()}`,
      refNo: newRef,
      date: formatDateToPDFStyle(new Date()),
      status: "Draft",
      proposalTitle: `DETAILEDTECHNO OFFER FOR THE SUPPLY OF ${initialKw}KW SOLAR ROOFTOP ONGRID POWER GENERATING SYSTEM`,
      customer: {
        name: "",
        company: "",
        addressLine1: "",
        district: "Nizamabad",
        state: "TELANGANA",
        pinCode: "",
        phone: "",
        email: "",
        consumerNo: "",
        connectedLoad: `${initialKw} kW`,
        phase: "Single Phase (1-Phase 230V)",
        rooftopType: "RCC Flat Concrete Terrace",
        category: "Domestic Category"
      },
      company: companySettings,
      bank: bankSettings,
      system: {
        capacityKw: initialKw,
        panelsCount: 10,
        phase: "Single Phase (1-Phase 230V)",
        rooftopType: "RCC Flat Concrete Terrace",
        moduleBrand: "Solar PV module: Monoperc halfcut (Adhani,RenewSys, DCR Module)",
        inverterBrand: `${initialKw} KW inverter (Polycab Solar inverter)`,
        structureType: "GI Module 7FT/6FT Mounting structure Designed Wind Load Resistance: 180Kmph, Hotdip Legs And G.I Rafter/Periling (AS PER SITE REQUIRMENT…BASIC AND HEIGHT )",
        energyPerDay: energy.energyPerDay,
        energyPerMonth: energy.energyPerMonth,
        energyPerYear: energy.energyPerYear,
        areaRequired: area,
        areaSystemKw: `${initialKw}kW`
      },
      pricing: {
        totalCost: cost,
        subsidyAmount: subsidy,
        afterSubsidyCost: cost - subsidy,
        electricityTariff: 8,
        annualSavings: 48000,
        paybackYears: "4.0"
      },
      bom: DEFAULT_BOM(initialKw),
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

  // Handler: Preview Quotation
  const handlePreviewQuotation = (quote) => {
    setActiveQuotation(quote);
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
    const randomSeq = Math.floor(Math.random() * 8999) + 1000;
    const duplicated = {
      ...JSON.parse(JSON.stringify(quote)),
      id: `quote-${Date.now()}`,
      refNo: `SRI-SOL-2026-${randomSeq}`,
      date: formatDateToPDFStyle(new Date()),
      status: "Draft",
      customer: {
        ...quote.customer,
        name: `${quote.customer.name} (Copy)`
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
  const handleSaveSettings = ({ company, bank }) => {
    setCompanySettings(company);
    setBankSettings(bank);
    localStorage.setItem('srimaan_company_settings', JSON.stringify(company));
    localStorage.setItem('srimaan_bank_settings', JSON.stringify(bank));

    // Update active quotation company & bank if present
    setActiveQuotation(prev => ({
      ...prev,
      company,
      bank
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
            onLivePreview={(updatedQuote) => {
              setActiveQuotation(updatedQuote);
              setCurrentView('preview');
            }}
          />
        )}

        {currentView === 'preview' && (
          <ProposalPreviewModal
            quotation={activeQuotation}
            onBack={() => setCurrentView('form')}
            onEdit={() => setCurrentView('form')}
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
