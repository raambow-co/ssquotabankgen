import { calculateSubsidy, calculateEnergyMetrics, calculatePayback, calculateGSTBreakdown } from './calculations.js';

export const srimaanCustomerSettings = {
  company: {
    name: "SRIMAAN SOLAR SOLUTIONS",
    legalName: "M/s. SRIMAAN SOLAR SOLUTIONS",
    shortName: "SRIMAAN SOLAR",
    tagline: "Clean Green Renewable Energy EPC Partner",
    subheading: "State DISCOM Empanelled Solar EPC Vendor • Registered PM Surya Ghar Channel Partner",
    about: "M/s. SRIMAAN SOLAR SOLUTIONS is a premier clean-tech engineering and EPC enterprise delivering high-efficiency rooftop and ground-mount solar power systems across Telangana and Andhra Pradesh. Committed to engineering excellence, we deploy Tier-1 DCR solar modules, smart grid-tie inverters, heavy-duty hot-dip galvanized mounting structures, and seamless DISCOM net-metering synchronization.",
    address: "H.No. 11-10-624/A, Burhanpuram, Khammam, Telangana - 507001",
    officeAddress: "H.No. 11-10-624/A, Burhanpuram, Khammam, Telangana - 507001",
    branches: "Khammam HQ | Hyderabad | Vijayawada | Visakhapatnam | Warangal",
    phone: "+91 94948 22356 / +91 99897 45356",
    email: "srimaansolarsolutions@gmail.com",
    website: "www.srimaansolar.com",
    gstin: "36AAKFS7291F1Z2",
    pan: "AAKFS7291F",
    cin: "U40106TG2020PTC142380",
    mnreEmpanelment: "SRI-DISCOM-TG-8421",
    msme: "UDYAM-TS-14-0028194",
    bankName: "State Bank of India",
    accountNumber: "40892716382",
    ifscCode: "SBIN0020154",
    branch: "Khammam Main Branch"
  },
  
  qrPortals: {
    facebook: {
      title: "Facebook",
      handle: "@srimaansolar",
      badge: "Community",
      actionText: "Scan to Follow",
      url: "https://facebook.com/srimaansolar",
      image: "/assets/qr/fb-qr.jpeg"
    },
    instagram: {
      title: "Instagram",
      handle: "@srimaansolar",
      badge: "Live Projects",
      actionText: "Scan to View",
      url: "https://instagram.com/srimaansolar",
      image: "/assets/qr/insta-qr.jpeg"
    },
    website: {
      title: "Official Portal",
      handle: "srimaansolar.com",
      badge: "Web Portal",
      actionText: "Scan to Visit",
      url: "https://www.srimaansolar.com",
      image: "/assets/qr/web-qr.jpeg"
    },
    googleMaps: {
      title: "Google Maps",
      handle: "Srimaan Solar HQ",
      badge: "HQ Navigation",
      actionText: "Scan for Route",
      url: "https://maps.google.com/?q=Srimaan+Solar+Solutions+Khammam",
      image: "/assets/qr/loc-qr.jpeg"
    }
  },

  coverPage: {
    heroTitle: "Techno-Commercial Solar Proposal",
    heroSubtitle: "Engineered with precision for maximum energy harvest, structural durability, and lifetime utility bill savings.",
    badge1: "Grid-Interactive Solar PV System",
    badge2: "DISCOM Empanelled EPC",
    features: [
      "Tier-1 BloombergNEF Rated High-Efficiency PV Modules",
      "Smart Grid-Tie Inverter with Real-Time Wi-Fi IoT Cloud Telemetry",
      "Hot-Dip Galvanized Structure (Wind Resistance up to 180 km/h)",
      "Turnkey DISCOM Net-Metering Documentation & Portal Liaison",
      "5-Year Comprehensive Workmanship & Generation SLA Support",
      "Zero Roof Puncture Ballasted / Anti-Leak Fastening Engineering"
    ]
  },

  pricing: {
    defaultRatePerKw: 52000,
    commercialRatePerKw: 45000,
    defaultGstRate: 13.8,
    defaultTariffPerUnit: 8.0,
    tariffEscalationRate: 3.5,
    panelDegradationRate: 0.55,
    defaultSubsidyScheme: 'PM Surya Ghar: Muft Bijli Yojana',
    defaultSubsidyAmount: 78000,
    co2FactorPerKwh: 0.82,
    treeFactorPerTonne: 16.5
  },

  authorization: {
    signatoryName: "K. Murali Krishna",
    signatoryTitle: "Managing Director & Project Head",
    division: "Technical Engineering & Commercial EPC Division",
    stampTop: "★ SRIMAAN SOLAR SOLUTIONS ★",
    stampCenter: "AUTHORIZED",
    stampBottom: "TECHNICAL EPC DIVISION",
    approvedBadge: "Approved & Verified"
  },

  portfolioWorks: {
    metrics: {
      plantsCount: "920+",
      plantsLabel: "Rooftop Plants",
      plantsSubtitle: "Across Telangana & AP",
      capacity: "14.5+ MW",
      capacityLabel: "Total Installed",
      capacitySubtitle: "Grid Synchronized",
      savings: "₹5.4+ Cr",
      savingsLabel: "Annual Savings",
      savingsSubtitle: "For Clients",
      netMetering: "100%",
      netMeteringLabel: "Net-Metering",
      netMeteringSubtitle: "Zero Delays"
    }
  }
};

/**
 * Converts unified proposal state (Bank Quotation structure) to Customer Quotation structure ({ quotation, settings })
 */
export function convertToCustomerFormat(data) {
  if (!data) return { quotation: null, settings: srimaanCustomerSettings };

  const dcKw = parseFloat(data.system?.capacityKw) || 5.0;
  const panelWattage = parseFloat(data.system?.panelWattage) || 550;
  const panelCount = parseInt(data.system?.panelsCount) || Math.ceil((dcKw * 1000) / panelWattage);

  // Compute energy generation
  const energyMetrics = calculateEnergyMetrics(dcKw);
  const dailyUnits = parseFloat(data.system?.dailyGenUnits) || parseFloat(energyMetrics.energyPerDay) || (dcKw * 4.0);
  const annualUnits = parseFloat(data.system?.annualGenUnits) || parseFloat(energyMetrics.energyPerYear) || Math.round(dailyUnits * 365);
  const monthlyUnits = parseFloat(data.system?.monthlyGenUnits) || parseFloat(energyMetrics.energyPerMonth) || Math.round(annualUnits / 12);

  const tariff = parseFloat(data.pricing?.tariffPerUnit) || 8.0;
  const totalCost = parseFloat(data.pricing?.totalCost) || 0;
  const subsidy = data.pricing?.subsidyAmount !== undefined ? parseFloat(data.pricing.subsidyAmount) : calculateSubsidy(dcKw);
  const netPayable = data.pricing?.afterSubsidyCost !== undefined ? parseFloat(data.pricing.afterSubsidyCost) : Math.max(0, totalCost - subsidy);

  // Calculate Payback
  const paybackCalc = calculatePayback(netPayable, annualUnits, tariff);
  const annualSavings = Math.round(data.pricing?.annualSavings || paybackCalc.annualSavings || (annualUnits * tariff));
  const paybackYears = data.pricing?.paybackYears || paybackCalc.paybackYears || (annualSavings > 0 ? (netPayable / annualSavings).toFixed(1) : '3.3');

  // Customer Location Formatting
  const locParts = [
    data.customer?.address,
    data.customer?.district,
    data.customer?.state,
    data.customer?.pincode ? `- ${data.customer.pincode}` : ''
  ].filter(Boolean);
  const location = locParts.length > 0 ? locParts.join(', ') : 'Plot #112, Khammam, Telangana - 507001';

  // Extract clean Brand Names for Tier-1 Hardware rendering
  let panelBrand = data.system?.moduleBrand || "Waaree Solar";
  if (panelBrand.toLowerCase().includes('waaree')) panelBrand = 'Waaree Solar';
  else if (panelBrand.toLowerCase().includes('adani') || panelBrand.toLowerCase().includes('adhani')) panelBrand = 'Adani Solar';
  else if (panelBrand.toLowerCase().includes('tata')) panelBrand = 'Tata Power Solar';
  else if (panelBrand.toLowerCase().includes('renewsys')) panelBrand = 'RenewSys Solar';
  else if (panelBrand.toLowerCase().includes('vikram')) panelBrand = 'Vikram Solar';
  else if (panelBrand.toLowerCase().includes('goldi')) panelBrand = 'Goldi Solar';

  let inverterBrand = data.system?.inverterBrand || "Sungrow Power";
  if (inverterBrand.toLowerCase().includes('sungrow')) inverterBrand = 'Sungrow Power';
  else if (inverterBrand.toLowerCase().includes('growatt')) inverterBrand = 'Growatt New Energy';
  else if (inverterBrand.toLowerCase().includes('solis')) inverterBrand = 'Solis Ginlong';
  else if (inverterBrand.toLowerCase().includes('polycab')) inverterBrand = 'Polycab Solar';
  else if (inverterBrand.toLowerCase().includes('havells')) inverterBrand = 'Havells Enviro';
  else if (inverterBrand.toLowerCase().includes('deye')) inverterBrand = 'Deye Solar';

  const ratePerKw = parseFloat(data.pricing?.ratePerKw) || (dcKw > 0 ? Math.round(totalCost / dcKw) : 52000);

  const quotation = {
    id: data.id || `quote-${data.refNo || Date.now()}`,
    quotationNumber: data.refNo || "SSS-SOL-2026-1048",
    date: data.date || new Date().toISOString().split('T')[0],
    validityDays: data.validityDays || 30,
    status: data.status || "Approved",
    customer: {
      name: data.customer?.name || "Respected Client",
      companyName: data.customer?.fatherName ? `S/o ${data.customer.fatherName}` : "Residential / Commercial Rooftop",
      phone: data.customer?.mobile || "+91 94948 22356",
      email: data.customer?.email || "customer@example.com",
      location: location,
      consumerNumber: data.customer?.consumerNo || "TSSPDCL-04829104",
      sanctionedLoad: `${dcKw} kW`,
      gridPhase: data.system?.phase || (dcKw > 5 ? "3-Phase (415V)" : "1-Phase (230V)"),
      roofType: data.customer?.roofType || "RCC Flat Concrete Terrace",
      roofAreaAvailable: `${data.system?.shadowFreeAreaSqFt || (dcKw * 90)} Sq.Ft (Verified Shadow-Free)`,
      structuralSuitability: "Load-bearing tested suitable for < 18 kg/m² solar dead load"
    },
    technical: {
      systemCapacityKw: dcKw,
      actualDcCapacityKw: dcKw,
      acInverterCapacityKw: parseFloat(data.system?.inverterCapacityKw) || (dcKw > 5 ? dcKw : Math.min(dcKw, 5)),
      panelBrand: panelBrand,
      panelModel: data.system?.moduleBrand || "Mono PERC / TOPCon 550Wp High Efficiency DCR Module",
      panelWattage: panelWattage,
      panelCount: panelCount,
      inverterBrand: inverterBrand,
      inverterModel: data.system?.inverterBrand || `${dcKw} kW Multi-MPPT Smart On-Grid Inverter with Wi-Fi IoT`,
      structureType: data.system?.structureType || "Hot-Dip Galvanized Iron (GI) — Elevated 7 to 9 ft Roof Clearance (IS 875 Compliant)",
      cablesAndBOS: "Polycab 4 sq.mm TUV DC Cables (EN 50618), Type II DC/AC SPD, 3 Copper Chemical Earthing Pits (IS 3043:2018), Class A Lightning Arrester",
      monitoring: "Smart Wi-Fi Cloud Real-time Mobile Application",
      estimatedDailyUnits: dailyUnits,
      estimatedAnnualUnits: annualUnits,
      estimatedMonthlySavings: Math.round(monthlyUnits * tariff),
      estimatedAnnualSavings: annualSavings,
      roofAreaSqFt: data.system?.shadowFreeAreaSqFt || Math.round(dcKw * 90),
      co2SavedTonnes: Number(((annualUnits * 25 * 0.82) / 1000).toFixed(1)),
      tariff: tariff
    },
    commercials: {
      ratePerKw: ratePerKw,
      baseCost: totalCost,
      discount: 0,
      priceAfterDiscount: totalCost,
      gstRate: 13.8,
      gstAmount: Math.round(totalCost * 0.0825),
      totalGrossCost: totalCost,
      subsidyScheme: "PM Surya Ghar: Muft Bijli Yojana (CFA)",
      subsidyAmount: subsidy,
      netPayable: netPayable,
      paybackYears: paybackYears,
      gross25YrSavings: annualSavings * 25,
      net25YrProfit: Math.max(0, (annualSavings * 25) - netPayable),
      cumulativeSavings25Years: Math.max(0, (annualSavings * 25) - netPayable)
    },
    warranties: {
      panelPerformance: "25-Year Linear Performance Warranty (Min 98% in Yr 1, ≤0.55%/yr linear degradation, ≥84.8% at Yr 25)",
      panelProduct: "12-Year Comprehensive Manufacturer Workmanship Defect Warranty",
      inverterWarranty: "10-Year Standard Manufacturer Repair / Replacement Warranty",
      workmanshipAmc: "5-Year Free Comprehensive Maintenance & Quarterly Health Inspections by Srimaan Solar Solutions"
    },
    paymentMilestones: (data.paymentTerms && data.paymentTerms.length > 0)
      ? data.paymentTerms.map(pt => ({
          milestone: pt.stage || pt.milestone,
          percentage: parseInt(pt.percentage) || 20,
          description: pt.condition || pt.description || "As per agreed milestone"
        }))
      : [
          { milestone: "Booking & Engineering Advance", percentage: 20, description: "Upon acceptance & structural CAD design sign-off" },
          { milestone: "Material Dispatch & Delivery", percentage: 70, description: "Upon physical delivery of panels, inverter & structures at site" },
          { milestone: "Commissioning & Net Metering", percentage: 10, description: "Upon physical completion & DISCOM net-meter synchronization" }
        ],
    notes: data.terms && data.terms[0] ? data.terms[0] : "Proposal includes complete turnkey Discom net-metering facilitation.",
    preparedBy: "Srimaan Solar Solutions Engineering Team"
  };

  const settings = {
    ...srimaanCustomerSettings,
    company: {
      ...srimaanCustomerSettings.company,
      officeAddress: data.company?.officeAddress || srimaanCustomerSettings.company.address,
      phone: data.company?.phone || srimaanCustomerSettings.company.phone,
      email: data.company?.email || srimaanCustomerSettings.company.email,
      gstin: data.company?.gstin || srimaanCustomerSettings.company.gstin,
      pan: data.company?.pan || srimaanCustomerSettings.company.pan,
      bankName: data.company?.bankName || srimaanCustomerSettings.company.bankName,
      accountNumber: data.company?.accountNumber || srimaanCustomerSettings.company.accountNumber,
      ifscCode: data.company?.ifscCode || srimaanCustomerSettings.company.ifscCode,
      branch: data.company?.branch || srimaanCustomerSettings.company.branch
    }
  };

  return { quotation, settings };
}
