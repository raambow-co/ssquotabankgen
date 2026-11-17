export const TELANGANA_DISTRICTS = [
  "Nizamabad", "Khammam", "Hyderabad", "Medchal-Malkajgiri", "Rangareddy",
  "Warangal Urban", "Warangal Rural", "Karimnagar", "Nalgonda", "Suryapet",
  "Mahabubnagar", "Bhadradri Kothagudem", "Sangareddy", "Siddipet", "Mancherial",
  "Adilabad", "Jagtial", "Peddapalli", "Kamareddy", "Yadadri Bhuvanagiri",
  "Wanaparthy", "Nagarkurnool", "Jogulamba Gadwal", "Narayanpet", "Vikarabad",
  "Medak", "Jangaon", "Jayashankar Bhupalpally", "Mulugu", "Mahabubabad",
  "Rajanna Sircilla", "Komaram Bheem Asifabad", "Nirmal"
];

export const ANDHRA_DISTRICTS = [
  "Visakhapatnam", "Vijayawada (NTR)", "Guntur", "Tirupati", "Nellore",
  "Kurnool", "Anantapur", "Kakinada", "Eluru", "Kadapa", "Rajahmundry",
  "Srikakulam", "Vizianagaram", "Prakasam", "Chittoor"
];

export const STATES_LIST = [
  "TELANGANA", "ANDHRA PRADESH", "KARNATAKA", "TAMIL NADU", "MAHARASHTRA", "ODISHA", "MADHYA PRADESH"
];

export const CAPACITY_PRESETS = [
  { kw: 1, panels: 2, phase: "Single Phase (1-Phase 230V)", cost: 95000, subsidy: 30000, daily: 4, monthly: 120, annual: 1200, area: "80 TO 100" },
  { kw: 2, panels: 4, phase: "Single Phase (1-Phase 230V)", cost: 180000, subsidy: 60000, daily: 8, monthly: 240, annual: 2400, area: "160 TO 200" },
  { kw: 3, panels: 6, phase: "Single Phase (1-Phase 230V)", cost: 265000, subsidy: 78000, daily: 12, monthly: 360, annual: 3600, area: "240 TO 300" },
  { kw: 4, panels: 8, phase: "Single Phase (1-Phase 230V)", cost: 345000, subsidy: 78000, daily: 16, monthly: 480, annual: 4800, area: "320 TO 400" },
  { kw: 5, panels: 10, phase: "Single Phase (1-Phase 230V)", cost: 425000, subsidy: 78000, daily: 20, monthly: 600, annual: 6000, area: "400 TO 500" },
  { kw: 6, panels: 12, phase: "Three Phase (3-Phase 415V)", cost: 500000, subsidy: 78000, daily: 24, monthly: 720, annual: 7200, area: "480 TO 600" },
  { kw: 8, panels: 16, phase: "Three Phase (3-Phase 415V)", cost: 650000, subsidy: 78000, daily: 32, monthly: 960, annual: 9600, area: "640 TO 800" },
  { kw: 10, panels: 20, phase: "Three Phase (3-Phase 415V)", cost: 790000, subsidy: 78000, daily: 40, monthly: 1200, annual: 12000, area: "800 TO 1000" },
  { kw: 15, panels: 30, phase: "Three Phase (3-Phase 415V)", cost: 1150000, subsidy: 78000, daily: 60, monthly: 1800, annual: 18000, area: "1200 TO 1500" },
  { kw: 20, panels: 40, phase: "Three Phase (3-Phase 415V)", cost: 1480000, subsidy: 78000, daily: 80, monthly: 2400, annual: 24000, area: "1600 TO 2000" }
];

export const MODULE_BRANDS = [
  "Solar PV module: Monoperc halfcut (Adhani,RenewSys, DCR Module)",
  "Solar PV module: TOPCon / Mono PERC 550W (Tata Power Solar, DCR Module)",
  "Solar PV module: Bifacial Dual Glass 545W (Waaree Energies, DCR Module)",
  "Solar PV module: High Efficiency Monoperc 540W (Vikram Solar, DCR Module)",
  "Solar PV module: Monoperc Halfcut 540W (Goldi Solar, DCR Module)",
  "Solar PV module: Premium DCR Solar PV Module (Premier Energies)"
];

export const INVERTER_BRANDS = [
  "{capacity} KW inverter (Polycab Solar inverter)",
  "{capacity} KW On-Grid Inverter (Growatt Solar Inverter with WiFi)",
  "{capacity} KW On-Grid Inverter (Havells Enviro Solar Inverter)",
  "{capacity} KW Grid-Tied Inverter (Sungrow String Inverter)",
  "{capacity} KW Solar Grid Inverter (Solis 5G Inverter)",
  "{capacity} KW High Efficiency Inverter (Deye Grid-Tied Inverter)",
  "{capacity} KW Inverter (Luminous Solar Grid-Tied Inverter)"
];

export const STRUCTURE_OPTIONS = [
  "GI Module 7FT/6FT Mounting structure Designed Wind Load Resistance: 180Kmph, Hotdip Legs And G.I Rafter/Periling (AS PER SITE REQUIRMENT…BASIC AND HEIGHT )",
  "Standard HDG Basic Rooftop Mounting Structure (180 Kmph Wind Load Resistance)",
  "Elevated GI Super Structure (Height 6FT to 8FT Walkable Rooftop)",
  "Custom Elevated Heavy-Duty Hot Dip Galvanized Structure"
];

export const DEFAULT_BOM = (capacity = 5, inverterBrand = null, moduleBrand = null, structureType = null) => [
  {
    id: 1,
    sr: 1,
    description: moduleBrand || "Solar PV module: Monoperc halfcut (Adhani,RenewSys, DCR Module)",
    qty: "1SET"
  },
  {
    id: 2,
    sr: 2,
    description: structureType || "GI Module 7FT/6FT Mounting structure Designed Wind Load Resistance: 180Kmph, Hotdip Legs And G.I Rafter/Periling (AS PER SITE REQUIRMENT…BASIC AND HEIGHT )",
    qty: "1"
  },
  {
    id: 3,
    sr: 3,
    description: `${capacity}KW ACDB`,
    qty: "1"
  },
  {
    id: 4,
    sr: 4,
    description: "MC4 Connectors",
    qty: "2"
  },
  {
    id: 5,
    sr: 5,
    description: inverterBrand || `${capacity} KW inverter (Polycab Solar inverter)`,
    qty: "1"
  },
  {
    id: 6,
    sr: 6,
    description: `${capacity}KW DCDB`,
    qty: "1"
  },
  {
    id: 7,
    sr: 7,
    description: "AC2Cx4SqmmCu.POLYCAB",
    qty: "ASREQ"
  },
  {
    id: 8,
    sr: 8,
    description: "DC1C 4Sq Mm Cu.cable",
    qty: "ASREQ"
  },
  {
    id: 9,
    sr: 9,
    description: "Earthing Cable",
    qty: "ASREQ"
  },
  {
    id: 10,
    sr: 10,
    description: "PVC Pipes forwiring",
    qty: "LS"
  },
  {
    id: 11,
    sr: 11,
    description: "Earthing Rod(3)/LIGHTING ARRESTER(1),Earthing powder",
    qty: "1Set"
  },
  {
    id: 12,
    sr: 12,
    description: "Installation Kit(Comm. Cable etc)",
    qty: "1"
  }
];

export const DEFAULT_TERMS = [
  { term: "Validity of Offer", detail: "Proposal is valid for10 days from the date of quotation." },
  { term: "Payment Terms", detail: "1) 80% Martial Dispatch Before\n2) 20% At the Time of Installation" },
  { term: "Delivery", detail: "Delivery of Material at site will be done after the receipt of 80% amount." },
  { term: "Plant Commissioning", detail: "Plant will be commissioned after Net Metering which usually takes 30 days after Installation." },
  { term: "CIVIL WORK AND\nEARTH PIT DIGGING", detail: "IT IS COMPANY (OUR) SCOPE." },
  { term: "Installation\nrequirement", detail: "During installation, the client needs to provide water and electricity required for installation work and a locked store for storage of material. Cost of the used water and electricity will not be paid by us." },
  { term: "Approach and Access", detail: "Approach of discussed roof for installation is to be arranged by Ladder/staircase by client for movement of man and material." },
  { term: "Extra Material", detail: "After Completion of installation work all rest material (eg-wire,nut bolts, etc.) is our property." },
  { term: "Cleaning of\nSolar Panels", detail: "Cleaning of Solar Panelsisadvisedtobedoneevery10-15daysby clients to get maximum generation." },
  { term: "Warranty", detail: "1).25yearsSPVoutputpowerwarranty\n2)7 years Manufacturer's warranty for Inverter" },
  { term: "Acceptance", detail: "Release of advance payment is considered as formal acceptance of all the terms and conditions mentioned in the Quotation." },
  { term: "Exclusions", detail: "Local issues during installation(Labourunions /local groups etc.) if any shall be taken care of by the client" },
  { term: "Placement of order", detail: "Orders once placed with us cannot be cancelled by purchaser on any account what so ever" }
];

export const DEFAULT_COMPANY = {
  name: "M/s. SRIMAAN SOLAR SOLUTIONS",
  tagline: "GET YOUR OWN POWER STATION ON YOUR ROOFTOP",
  addressLine1: "KHAMMAM , Telangana , India.",
  phone1: "9347416140",
  phone2: "9912416140",
  email: "srimaansolarsolutions@gmail.com",
  gstNo: "36ADPPT2441N1ZW",
  panNo: "ADPPT2441N",
  vendorRegNo: "TSRE250511",
  officeAddress: "#6-210,Sriramnagar,BehindAutonagar,Warangalxroad,khammamrural,KHAMMAMDIST-507003"
};

export const DEFAULT_BANK = {
  accountName: "SRIMAAN SOLAR SOLUTIONS",
  accountNo: "50200095253784",
  ifscCode: "HDFC0001631",
  bankName: "HDFC BANK"
};

export const INITIAL_QUOTATION_DATA = {
  id: "quote-1",
  refNo: "SRIMAAN SOLAR SOLUTIONS-10/07-2025-2026",
  date: "09-OCT-2025",
  status: "Approved",
  proposalTitle: "DETAILED TECHNO OFFER FOR THE SUPPLY OF 5KW SOLAR ROOFTOP ONGRID POWER GENERATING SYSTEM",

  customer: {
    name: "N Venugopal",
    company: "Residential Project",
    addressLine1: "2-13,NEW BUS STAND,NEW BUS STAND,NIZAMABAD,",
    district: "Nizamabad",
    state: "TELANGANA",
    pinCode: "503185",
    phone: "9440328917",
    email: "venugopal.n@example.com",
    consumerNo: "TSNPDCL-04829104",
    connectedLoad: "5 kW",
    phase: "Single Phase (1-Phase 230V)",
    rooftopType: "RCC Flat Concrete Terrace",
    category: "Domestic Category"
  },

  company: DEFAULT_COMPANY,
  bank: DEFAULT_BANK,

  system: {
    capacityKw: 5,
    panelsCount: 10,
    phase: "Single Phase (1-Phase 230V)",
    rooftopType: "RCC Flat Concrete Terrace",
    moduleBrand: "Solar PV module: Monoperc halfcut (Adhani,RenewSys, DCR Module)",
    inverterBrand: "5 KW inverter (Polycab Solar inverter)",
    structureType: "GI Module 7FT/6FT Mounting structure Designed Wind Load Resistance: 180Kmph, Hotdip Legs And G.I Rafter/Periling (AS PER SITE REQUIRMENT…BASIC AND HEIGHT )",
    energyPerDay: "20",
    energyPerMonth: "600",
    energyPerYear: "6000",
    areaRequired: "400 TO 500 sq ft area free of shade",
    areaSystemKw: "4kW"
  },

  pricing: {
    totalCost: 425000,
    subsidyAmount: 78000,
    afterSubsidyCost: 347000,
    electricityTariff: 8,
    annualSavings: 48000,
    paybackYears: "4.0"
  },

  bom: DEFAULT_BOM(5),
  terms: DEFAULT_TERMS
};

export const INITIAL_SAVED_QUOTATIONS = [
  INITIAL_QUOTATION_DATA,
  {
    id: "quote-2",
    refNo: "SRI-SOL-2026-1048",
    date: "05 Nov 2026",
    status: "Approved",
    proposalTitle: "DETAILED TECHNO OFFER FOR THE SUPPLY OF 5.5KW SOLAR ROOFTOP ONGRID POWER GENERATING SYSTEM",
    customer: {
      name: "Srikanth Reddy",
      company: "Reddy Residencies",
      addressLine1: "Plot #112, Road #4, Gachibowli Hills, Hyderabad, Telangana - 500032",
      district: "Hyderabad",
      state: "TELANGANA",
      pinCode: "500032",
      phone: "+91 98490 12345",
      email: "srikanth.reddy@example.com",
      consumerNo: "TSSPDCL-09182371",
      connectedLoad: "6 kW",
      phase: "Single Phase (1-Phase 230V)",
      rooftopType: "RCC Flat Concrete Terrace",
      category: "Domestic Category"
    },
    company: DEFAULT_COMPANY,
    bank: DEFAULT_BANK,
    system: {
      capacityKw: 5.5,
      panelsCount: 10,
      phase: "Single Phase (1-Phase 230V)",
      rooftopType: "RCC Flat Concrete Terrace",
      moduleBrand: "Solar PV module: Bifacial Dual Glass 545W (Waaree Energies, DCR Module)",
      inverterBrand: "5.5 KW Grid-Tied Inverter (Sungrow String Inverter)",
      structureType: "GI Module 7FT/6FT Mounting structure Designed Wind Load Resistance: 180Kmph, Hotdip Legs And G.I Rafter/Periling (AS PER SITE REQUIRMENT…BASIC AND HEIGHT )",
      energyPerDay: "22",
      energyPerMonth: "660",
      energyPerYear: "6600",
      areaRequired: "440 TO 550 sq ft area free of shade",
      areaSystemKw: "5.5kW"
    },
    pricing: {
      totalCost: 318640,
      subsidyAmount: 78000,
      afterSubsidyCost: 240640,
      electricityTariff: 8,
      annualSavings: 52800,
      paybackYears: "4.5"
    },
    bom: DEFAULT_BOM(5.5, "5.5 KW Grid-Tied Inverter (Sungrow String Inverter)", "Solar PV module: Bifacial Dual Glass 545W (Waaree Energies, DCR Module)"),
    terms: DEFAULT_TERMS
  },
  {
    id: "quote-3",
    refNo: "SRI-SOL-2026-1052",
    date: "06 Nov 2026",
    status: "Sent",
    proposalTitle: "DETAILED TECHNO OFFER FOR THE SUPPLY OF 10KW SOLAR ROOFTOP ONGRID POWER GENERATING SYSTEM",
    customer: {
      name: "Dr. Ananya Rao",
      company: "Rao Orthopedic Centre",
      addressLine1: "Plot #42, MVP Colony Sector 4, Visakhapatnam, Andhra Pradesh - 530017",
      district: "Visakhapatnam",
      state: "ANDHRA PRADESH",
      pinCode: "530017",
      phone: "+91 94901 88231",
      email: "dr.ananya@raoclinic.org",
      consumerNo: "APEPDCL-4410293",
      connectedLoad: "12 kW",
      phase: "Three Phase (3-Phase 415V)",
      rooftopType: "Elevated GI Super Structure",
      category: "Commercial Category"
    },
    company: DEFAULT_COMPANY,
    bank: DEFAULT_BANK,
    system: {
      capacityKw: 10,
      panelsCount: 20,
      phase: "Three Phase (3-Phase 415V)",
      rooftopType: "Elevated GI Super Structure",
      moduleBrand: "Solar PV module: TOPCon / Mono PERC 550W (Tata Power Solar, DCR Module)",
      inverterBrand: "10 KW On-Grid Inverter (Growatt Solar Inverter with WiFi)",
      structureType: "Elevated GI Super Structure (Height 6FT to 8FT Walkable Rooftop)",
      energyPerDay: "40",
      energyPerMonth: "1200",
      energyPerYear: "12000",
      areaRequired: "800 TO 1000 sq ft area free of shade",
      areaSystemKw: "10kW"
    },
    pricing: {
      totalCost: 546240,
      subsidyAmount: 78000,
      afterSubsidyCost: 468240,
      electricityTariff: 9,
      annualSavings: 108000,
      paybackYears: "4.3"
    },
    bom: DEFAULT_BOM(10, "10 KW On-Grid Inverter (Growatt Solar Inverter with WiFi)", "Solar PV module: TOPCon / Mono PERC 550W (Tata Power Solar, DCR Module)", "Elevated GI Super Structure (Height 6FT to 8FT Walkable Rooftop)"),
    terms: DEFAULT_TERMS
  }
];
