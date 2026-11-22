import { calculateSubsidy, calculateEnergyMetrics, calculatePayback, calculateGSTBreakdown } from './calculations.js';

export const srimaanCustomerSettings = {
  company: {
    name: "SRIMAAN SOLAR SOLUTIONS",
    legalName: "M/s. SRIMAAN SOLAR SOLUTIONS",
    shortName: "SRIMAAN SOLAR",
    tagline: "Clean Green Renewable Energy EPC Partner",
    subheading: "State DISCOM Empanelled Solar EPC Vendor • Registered PM Surya Ghar Channel Partner",
    about: "M/s. SRIMAAN SOLAR SOLUTIONS is a premier clean-tech engineering and EPC enterprise delivering high-efficiency rooftop and ground-mount solar power systems across Telangana and Andhra Pradesh. Committed to engineering excellence, we deploy Tier-1 DCR solar modules, smart grid-tie inverters, heavy-duty hot-dip galvanized mounting structures, and seamless DISCOM net-metering synchronization.",
    address: "6-210, Sriramnagar, Behind Autonagar, Warangal X Road, Edulapuram Muncipalty, Khammam District, Telangana State 507003",
    officeAddress: "#6-210, Sriramnagar, Behind Autonagar, Warangal X Road, Edulapuram Muncipalty, Khammam District, Telangana State 507003",
    branches: "Hyderabad HQ | Khammam | Suryapet | Warangal",
    phone: "9347416140 | 9912416140",
    email: "srimaansolarsolutions@gmail.com",
    website: "www.srimaansolarsolutions.com",
    gstin: "36ADPPT2441N1ZW",
    pan: "ADPPT2441N",
    cin: "U40106TG2020PTC142380",
    mnreEmpanelment: "SRI-DISCOM-TG-8421",
    msme: "UDYAM-TS-14-0028194",
    bankName: "STATE BANK OF INDIA",
    accountNumber: "44813579950",
    ifscCode: "SBIN0065049",
    branch: "Khammam Branch"
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
    defaultGstRate: "70:30 (5% / 18%)",
    defaultTariffPerUnit: 8.0,
    tariffEscalationRate: 3.5,
    panelDegradationRate: 0.55,
    defaultSubsidyScheme: 'PM Surya Ghar: Muft Bijli Yojana',
    defaultSubsidyAmount: 78000,
    co2FactorPerKwh: 0.82,
    treeFactorPerTonne: 16.5
  },

  authorization: {
    signatoryName: "T. Ravindra Chary",
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
  const panelWattage = parseFloat(data.system?.panelWattage) || 540;
  const panelCount = parseInt(data.system?.panelsCount) || Math.ceil((dcKw * 1000) / panelWattage);

  // Compute energy generation
  const energyMetrics = calculateEnergyMetrics(dcKw);
  const dailyUnits = parseFloat(data.system?.dailyGenUnits) || parseFloat(energyMetrics.energyPerDay) || (dcKw * 4.0);
  const annualUnits = parseFloat(data.system?.annualGenUnits) || parseFloat(energyMetrics.energyPerYear) || Math.round(dailyUnits * 365);
  const monthlyUnits = parseFloat(data.system?.monthlyGenUnits) || parseFloat(energyMetrics.energyPerMonth) || Math.round(annualUnits / 12);

  const tariff = parseFloat(data.pricing?.tariffPerUnit) || 8.0;
  // Dual Pricing: Customer quotation uses customerCost, Bank quotation uses bankCost
  const customerCost = parseFloat(data.pricing?.customerCost !== undefined ? data.pricing.customerCost : (data.pricing?.totalCost || 0));
  const bankCost = parseFloat(data.pricing?.bankCost !== undefined ? data.pricing.bankCost : (data.pricing?.totalCost || customerCost));
  const totalCost = customerCost;
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
  let panelBrand = data.system?.moduleBrand || "Adani Solar (Mundra)";
  if (panelBrand.toLowerCase().includes('waaree')) panelBrand = 'Waaree Energies';
  else if (panelBrand.toLowerCase().includes('adani') || panelBrand.toLowerCase().includes('adhani')) panelBrand = 'Adani Solar (Mundra)';
  else if (panelBrand.toLowerCase().includes('tata')) panelBrand = 'Tata Power Solar / TP Solar';
  else if (panelBrand.toLowerCase().includes('vikram')) panelBrand = 'Vikram Solar';
  else if (panelBrand.toLowerCase().includes('premier')) panelBrand = 'Premier Energies';
  else if (panelBrand.toLowerCase().includes('goldi')) panelBrand = 'Goldi Solar';
  else if (panelBrand.toLowerCase().includes('emmvee')) panelBrand = 'Emmvee Photovoltaic';
  else if (panelBrand.toLowerCase().includes('rayzon')) panelBrand = 'Rayzon Solar';
  else if (panelBrand.toLowerCase().includes('renewsys')) panelBrand = 'RenewSys India';
  else if (panelBrand.toLowerCase().includes('saatvik')) panelBrand = 'Saatvik Green Energy';
  else panelBrand = data.system?.moduleBrand || "Adani Solar (Mundra)";

  let inverterBrand = data.system?.inverterBrand || "Sungrow Power";
  if (inverterBrand.toLowerCase().includes('sungrow')) inverterBrand = 'Sungrow Power';
  else if (inverterBrand.toLowerCase().includes('growatt')) inverterBrand = 'Growatt New Energy';
  else if (inverterBrand.toLowerCase().includes('solis')) inverterBrand = 'Solis Ginlong';
  else if (inverterBrand.toLowerCase().includes('polycab')) inverterBrand = 'Polycab Solar';
  else if (inverterBrand.toLowerCase().includes('havells')) inverterBrand = 'Havells Enviro';
  else if (inverterBrand.toLowerCase().includes('deye')) inverterBrand = 'Deye Solar';

  const ratePerKw = parseFloat(data.pricing?.ratePerKw) || (dcKw > 0 ? Math.round(totalCost / dcKw) : 52000);

  // Quotation number is ALWAYS the electricity consumer number (UNC / USC)
  const consumerNo = data.customer?.consumerNo || data.refNo || "TSNPDCL-04829104";

  const quotation = {
    id: data.id || `quote-${consumerNo}`,
    quotationNumber: consumerNo,
    date: data.date || new Date().toISOString().split('T')[0],
    validityDays: data.validityDays || 30,
    status: data.status || "Approved",
    customer: {
      name: data.customer?.name || "Respected Client",
      companyName: data.customer?.fatherName ? `S/o ${data.customer.fatherName}` : "Residential / Commercial Rooftop",
      phone: data.customer?.mobile || data.customer?.phone || "+91 94948 22356",
      email: data.customer?.email || "customer@example.com",
      location: location,
      consumerNumber: consumerNo,
      consumerServiceNumber: consumerNo,
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
      panelModel: data.system?.moduleBrand || "Mono PERC / TOPCon 540Wp High Efficiency DCR Module",
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
      gstRate: "70:30 (5% / 18%)",
      gstAmount: Math.round(totalCost * 0.0825),
      totalGrossCost: totalCost,
      subsidyScheme: "PM Surya Ghar: Muft Bijli Yojana (CFA)",
      subsidyAmount: subsidy,
      netPayable: netPayable,
      bankGrossCost: bankCost,
      bankNetCost: Math.max(0, bankCost - subsidy),
      paybackYears: paybackYears,
      gross25YrSavings: annualSavings * 25,
      net25YrProfit: Math.max(0, (annualSavings * 25) - netPayable),
      cumulativeSavings25Years: Math.max(0, (annualSavings * 25) - netPayable)
    },
    warranties: {
      panelPerformance: "25-Year Linear Performance Warranty (Min 98% in Yr 1, ≤0.55%/yr linear degradation, ≥84.8% at Yr 25)",
      panelProduct: "12-Year Comprehensive Manufacturer Workmanship Defect Warranty",
      inverterWarranty: "7-Year Manufacturer's Warranty for Inverter",
      workmanshipAmc: "5-Year Free Comprehensive Maintenance & Quarterly Health Inspections by Srimaan Solar Solutions"
    },
    paymentMilestones: (data.paymentTerms && data.paymentTerms.length > 0)
      ? data.paymentTerms.map(pt => ({
          milestone: pt.stage || pt.milestone,
          percentage: parseInt(pt.percentage) || 20,
          description: pt.condition || pt.description || "As per agreed milestone"
        }))
      : [
          { milestone: "Advance with purchase order", percentage: 20, description: "Upon work order placement & design sign-off" },
          { milestone: "Before dispatch of materials", percentage: 70, description: "Materials delivered to site after receipt of 90% total cost" },
          { milestone: "At installation", percentage: 10, description: "Upon installation completion & DISCOM net-meter filing" }
        ],
    customerScope: [
      "Civil work and earth-pit digging",
      "Ladder or staircase access to the roof for workers and materials",
      "Water and electricity during installation, at the customer's expense",
      "Lockable storage for materials",
      "Applicable load extension charges"
    ],
    deliveryTerms: {
      delivery: "Materials will be delivered to the site after receipt of 90% of the total project cost.",
      commissioning: "The system will be commissioned after net metering is completed. The estimated timeline is 30 days from installation."
    },
    siteTerms: "The customer handles local installation issues, including those involving labour unions or local groups. Surplus materials remain the vendor's property.",
    orderTerms: "Advance payment constitutes acceptance. Orders cannot be cancelled once placed.",
    notes: data.terms && data.terms[0] ? data.terms[0] : "Proposal includes complete turnkey Discom net-metering facilitation.",
    preparedBy: "Srimaan Solar Solutions Engineering Team"
  };

  let masterSettings = {};
  try {
    const raw = localStorage.getItem('srimaan_master_settings');
    if (raw) masterSettings = JSON.parse(raw);
  } catch (e) {
    // ignore
  }

  const settings = {
    ...srimaanCustomerSettings,
    ...masterSettings,
    company: {
      ...srimaanCustomerSettings.company,
      ...(masterSettings.company || {}),
      officeAddress: data.company?.officeAddress || masterSettings.company?.address || srimaanCustomerSettings.company.address,
      phone: data.company?.phone || masterSettings.company?.phone1 || srimaanCustomerSettings.company.phone,
      email: data.company?.email || masterSettings.company?.email || srimaanCustomerSettings.company.email,
      gstin: data.company?.gstin || masterSettings.company?.gstin || srimaanCustomerSettings.company.gstin,
      pan: data.company?.pan || masterSettings.company?.pan || srimaanCustomerSettings.company.pan,
      bankName: data.company?.bankName || srimaanCustomerSettings.company.bankName,
      accountNumber: data.company?.accountNumber || srimaanCustomerSettings.company.accountNumber,
      ifscCode: data.company?.ifscCode || srimaanCustomerSettings.company.ifscCode,
      branch: data.company?.branch || srimaanCustomerSettings.company.branch
    },
    qrPortals: masterSettings.qrPortals || srimaanCustomerSettings.qrPortals,
    coverPage: masterSettings.coverPage || srimaanCustomerSettings.coverPage,
    technical: masterSettings.technical || srimaanCustomerSettings.technical,
    pricing: masterSettings.pricing || srimaanCustomerSettings.pricing,
    warranties: masterSettings.warranties || srimaanCustomerSettings.warranties,
    authorization: masterSettings.authorization || srimaanCustomerSettings.authorization,
    portfolio: masterSettings.portfolio || srimaanCustomerSettings.portfolio
  };

  return { quotation, settings };
}
