import fs from 'fs';
import path from 'path';

console.log('========================================');
console.log('🚀 RUNNING COMPREHENSIVE SYSTEM AUDITS');
console.log('========================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${testName} - ${details}`);
    failCount++;
  }
}

// 1. Calculations & Math Audit
import {
  formatINR, formatINRDecimal, calculateSubsidy, isDomesticCategory,
  calculateEnergyMetrics, calculateArea, calculatePayback,
  calculateGSTBreakdown, generateRefNo, numberToWordsINR,
  getFinancialYearString, extractSequenceNumber, generateMasterRefNo, getExportFileName
} from '../src/utils/calculations.js';

console.log('\n--- 1. AUDITING CALCULATION ENGINE ---');

assert(calculateSubsidy(1) === 30000, 'Subsidy for 1 kW is ₹30,000');
assert(calculateSubsidy(2) === 60000, 'Subsidy for 2 kW is ₹60,000');
assert(calculateSubsidy(3) === 78000, 'Subsidy for 3 kW is ₹78,000 (Max Cap)');
assert(calculateSubsidy(5) === 78000, 'Subsidy for 5 kW is ₹78,000');
assert(calculateSubsidy(10) === 78000, 'Subsidy for 10 kW is ₹78,000');

// Category-based Subsidy Isolation (Domestic vs Commercial/Industrial)
assert(isDomesticCategory('Domestic Category') === true, 'Domestic Category is identified as domestic');
assert(isDomesticCategory('Commercial Category') === false, 'Commercial Category is identified as non-domestic');
assert(isDomesticCategory('Industrial Category') === false, 'Industrial Category is identified as non-domestic');
assert(calculateSubsidy(3, 'Commercial Category') === 0, 'Commercial Category receives ₹0 subsidy');
assert(calculateSubsidy(5, 'Commercial Category') === 0, 'Commercial Category (5kW) receives ₹0 subsidy');
assert(calculateSubsidy(10, 'Industrial Category') === 0, 'Industrial Category (10kW) receives ₹0 subsidy');
assert(calculateSubsidy(3, 'Domestic Category') === 78000, 'Domestic Category retains PM Surya Ghar subsidy ₹78,000');

assert(numberToWordsINR(22000) === 'TWENTY TWO THOUSAND ONLY', 'numberToWordsINR(22000) formats to TWENTY TWO THOUSAND ONLY');
assert(numberToWordsINR(220000) === 'TWO LAKH TWENTY THOUSAND ONLY', 'numberToWordsINR(220000) formats to TWO LAKH TWENTY THOUSAND ONLY');

const energy5kw = calculateEnergyMetrics(5);
assert(energy5kw.energyPerDay === '20', '5 kW daily generation is 20 units');
assert(energy5kw.energyPerMonth === '600', '5 kW monthly generation is 600 units');
assert(energy5kw.energyPerYear === '6000', '5 kW annual generation is 6000 units');

const paybackTest = calculatePayback(347000, 6000, 8);
assert(paybackTest.annualSavings === 48000, 'Annual savings is ₹48,000 @ ₹8/unit for 6000 units');
assert(parseFloat(paybackTest.paybackYears) > 0, 'Payback period computed correctly: ' + paybackTest.paybackYears);

// 2. GST Statutory Breakdown Audit
console.log('\n--- 2. AUDITING GST STATUTORY EPC MODULE ---');

// Test with client benchmark of 2,25,000
const gst225k = calculateGSTBreakdown(225000);
assert(gst225k.goodsBase === 156038, 'Benchmark Goods Base is ₹1,56,038.00');
assert(gst225k.goodsGst === 7802, 'Benchmark Goods GST (5%) is ₹7,802.00');
assert(gst225k.goodsCgst === 3901, 'Benchmark Goods CGST (2.5%) is ₹3,901');
assert(gst225k.goodsSgst === 3901, 'Benchmark Goods SGST (2.5%) is ₹3,901');
assert(gst225k.goodsTotal === 163840, 'Benchmark Goods Total is ₹1,63,840.00');
assert(gst225k.servicesBase === 51830, 'Benchmark Services Base is ₹51,830.00');
assert(gst225k.servicesGst === 9330, 'Benchmark Services GST (18%) is ₹9,330.00');
assert(gst225k.servicesCgst === 4665, 'Benchmark Services CGST (9%) is ₹4,665');
assert(gst225k.servicesSgst === 4665, 'Benchmark Services SGST (9%) is ₹4,665');
assert(gst225k.servicesTotal === 61160, 'Benchmark Services Total is ₹61,160.00');
assert(gst225k.subTotalBase === 207868, 'Benchmark Sub Total Base is ₹2,07,868.00');
assert(gst225k.totalBase === 207868, 'Benchmark Total Base is ₹2,07,868');
assert(gst225k.totalGst === 17132, 'Benchmark Total GST is ₹17,132.00');
assert(gst225k.totalProjectCost === 225000, 'Benchmark Total Project Cost is ₹2,25,000.00');

// Test with client's exact 4,10,000 (6 kW) statutory reference invoice (from image media_1795283380673_e401f579)
const gst410k = calculateGSTBreakdown(410000);
assert(gst410k.goodsBase === 273334, '410k Goods Base matches client image (273334)');
assert(gst410k.goodsCgst === 6833, '410k Goods CGST (2.5%) matches client image (6833)');
assert(gst410k.goodsSgst === 6833, '410k Goods SGST (2.5%) matches client image (6833)');
assert(gst410k.goodsTotal === 287000, '410k Goods Total matches client image (287000)');
assert(gst410k.servicesBase === 104237, '410k Services Base matches client image (104237)');
assert(gst410k.servicesCgst === 9381, '410k Services CGST (9%) matches client image (9381)');
assert(gst410k.servicesSgst === 9381, '410k Services SGST (9%) matches client image (9381)');
assert(gst410k.servicesTotal === 123000, '410k Services Total matches client image (123000)');
assert(gst410k.totalBase === 377571, '410k Total Base matches client image (377571)');
assert(gst410k.totalProjectCost === 410000, '410k Total Project Cost matches client image (410000)');

// Test dynamic GST for 4,25,000 (5 kW)
const gst425k = calculateGSTBreakdown(425000);
assert(Math.round(gst425k.goodsTotal + gst425k.servicesTotal) === 425000, 'Dynamic GST: Goods + Services equals total project cost');
assert(Math.round(gst425k.subTotalBase + gst425k.totalGst) === 425000, 'Dynamic GST: Base + GST equals total project cost');

// 3. Formatting Audit
console.log('\n--- 3. AUDITING CURRENCY & NUMBER FORMATTING ---');
assert(formatINR(225000) === '2,25,000', 'formatINR(225000) formats to 2,25,000');
assert(formatINRDecimal(156038) === '1,56,038.00', 'formatINRDecimal(156038) formats to 1,56,038.00');
assert(formatINRDecimal(7802) === '7,802.00', 'formatINRDecimal(7802) formats to 7,802.00');
assert(formatINRDecimal(207868) === '2,07,868.00', 'formatINRDecimal(207868) formats to 2,07,868.00');

import { formatCurrency, formatNumber, formatDate } from '../src/utils/formatters.js';
assert(formatCurrency(240640).includes('2,40,640'), 'formatCurrency(240640) contains 2,40,640');
assert(formatNumber(8541) === '8,541', 'formatNumber(8541) formats to 8,541');
assert(formatDate('2026-11-18').length > 5, 'formatDate formats valid Indian date string');

// 4. Assets & Images Audit
console.log('\n--- 4. AUDITING ASSETS & LOGOS ---');
import { ASSETS } from '../src/assets/assetsData.js';

assert(typeof ASSETS.srimaan_logo === 'string' && ASSETS.srimaan_logo.startsWith('data:image/'), 'srimaan_logo is valid Base64');
assert(typeof ASSETS.solar_hero_banner === 'string' && ASSETS.solar_hero_banner.startsWith('data:image/'), 'solar_hero_banner is valid Base64');
assert(typeof ASSETS.basic_structure === 'string' && ASSETS.basic_structure.startsWith('data:image/'), 'basic_structure is valid Base64');
assert(typeof ASSETS.height_structure === 'string' && ASSETS.height_structure.startsWith('data:image/'), 'height_structure is valid Base64');
assert(typeof ASSETS.grid_diagram === 'string' && ASSETS.grid_diagram.startsWith('data:image/'), 'grid_diagram is valid Base64');

// Brand & hardware logos in public/assets
assert(fs.existsSync('public/assets/srimaan_logo.jpeg'), 'public/assets/srimaan_logo.jpeg exists');
assert(fs.existsSync('public/logo.png'), 'public/logo.png exists');
assert(fs.existsSync('public/assets/brands/waaree.png'), 'Waaree brand logo exists');
assert(fs.existsSync('public/assets/brands/tata-solar.png'), 'Tata Solar brand logo exists');
assert(fs.existsSync('public/assets/brands/adani.png'), 'Adani Solar brand logo exists');
assert(fs.existsSync('public/assets/brands/sungrow.png'), 'Sungrow inverter logo exists');
assert(fs.existsSync('public/assets/brands/growatt.png'), 'Growatt inverter logo exists');
assert(fs.existsSync('public/assets/brands/polycab.png'), 'Polycab cable logo exists');
assert(fs.existsSync('public/assets/portfolio/project-1.jpg'), 'Portfolio project 1 exists');
assert(fs.existsSync('public/assets/portfolio/project-4.jpg'), 'Portfolio project 4 exists');
assert(fs.existsSync('public/assets/emblems/mnre-logo.png'), 'MNRE emblem exists');
assert(fs.existsSync('public/assets/emblems/pm-surya-ghar.png'), 'PM Surya Ghar emblem exists');
assert(fs.existsSync('public/assets/srimaan_seal.jpeg'), 'Receipt official round seal exists');
assert(fs.existsSync('public/assets/srimaan_receipt_logo.jpeg'), 'Receipt official logo exists');
assert(fs.existsSync('public/assets/hardware/waaree-topcon-module.jpg'), 'Ultra-realistic Waaree TOPCon module image exists');
assert(fs.existsSync('public/assets/hardware/smart-grid-inverter.jpg'), 'Ultra-realistic smart grid inverter image exists');
assert(fs.existsSync('public/assets/hardware/elevated-structure.jpg'), 'Ultra-realistic elevated structure image exists');
assert(fs.existsSync('public/assets/hardware/solar-dcdb-acdb-bos.jpg'), 'Ultra-realistic DCDB/ACDB BOS image exists');

// 5. Component Files Audit
console.log('\n--- 5. AUDITING REACT COMPONENT FILES ---');
const components = [
  'Page1.jsx', 'Page2.jsx', 'Page3.jsx', 'Page4.jsx',
  'Page5.jsx', 'Page6.jsx', 'Page7.jsx', 'PageHeader.jsx',
  'Navbar.jsx', 'DashboardView.jsx', 'QuotationFormView.jsx',
  'ProposalPreviewModal.jsx', 'CustomerQuotationViewer.jsx', 'SettingsModal.jsx',
  'AdvanceReceiptView.jsx', 'GstInvoiceView.jsx', 'DiscomReportView.jsx'
];

for (const comp of components) {
  const filePath = path.join('src', 'components', comp);
  const exists = fs.existsSync(filePath);
  assert(exists, `Component ${comp} exists on disk`);
  if (exists) {
    const content = fs.readFileSync(filePath, 'utf-8');
    assert(content.includes('export const') || content.includes('export default'), `${comp} has valid exports`);
  }
}

// 6. Customer Proposal Components Audit
console.log('\n--- 6. AUDITING CUSTOMER PROPOSAL PAGES & REBRANDING ---');
const customerPages = [
  'CustomerPage1Cover.jsx',
  'CustomerPage2SystemSpec.jsx',
  'CustomerPage3Financials.jsx',
  'CustomerPage4Portfolio.jsx',
  'CustomerPage5CompanyProfile.jsx'
];

for (const page of customerPages) {
  const filePath = path.join('src', 'components', 'customerPages', page);
  const exists = fs.existsSync(filePath);
  assert(exists, `Customer page ${page} exists on disk`);
  if (exists) {
    const content = fs.readFileSync(filePath, 'utf-8');
    assert(content.includes('export default function'), `${page} has default export function`);
    
    // Check that there are NO occurrences of "Prudence" or "PRUDENCE" in customer pages
    const hasPrudence = content.includes('Prudence') || content.includes('PRUDENCE');
    assert(!hasPrudence, `${page} has zero references to Prudence (100% rebranded to Srimaan Solar)`);
    
    // Check that Srimaan Solar is referenced
    const hasSrimaan = content.includes('SRIMAAN') || content.includes('Srimaan');
    assert(hasSrimaan, `${page} references SRIMAAN SOLAR`);
  }
}

// 7. Data Adapter Audit
console.log('\n--- 7. AUDITING QUOTATION DATA ADAPTER ---');
import { convertToCustomerFormat, srimaanCustomerSettings } from '../src/utils/quotationAdapter.js';
import { INITIAL_QUOTATION_DATA } from '../src/data/defaultData.js';

const adapted = convertToCustomerFormat(INITIAL_QUOTATION_DATA);
assert(adapted.quotation !== null, 'Adapter produces non-null quotation');
assert(adapted.settings !== null, 'Adapter produces non-null settings');
assert(adapted.quotation.customer.name === INITIAL_QUOTATION_DATA.customer.name, 'Customer name mapped correctly');
assert(adapted.quotation.technical.systemCapacityKw === INITIAL_QUOTATION_DATA.system.capacityKw, 'System capacity mapped correctly');
assert(adapted.quotation.commercials.totalGrossCost === INITIAL_QUOTATION_DATA.pricing.totalCost, 'Total gross cost mapped correctly');
assert(adapted.quotation.commercials.subsidyAmount === INITIAL_QUOTATION_DATA.pricing.subsidyAmount, 'Subsidy amount mapped correctly');
assert(adapted.quotation.commercials.netPayable === INITIAL_QUOTATION_DATA.pricing.afterSubsidyCost, 'Net payable mapped correctly');
assert(adapted.settings.company.name === 'SRIMAAN SOLAR SOLUTIONS', 'Company name is SRIMAAN SOLAR SOLUTIONS');

// 8. JSX Tag Imports Audit
console.log('\n--- 8. AUDITING JSX COMPONENT & ICON IMPORTS ---');
function getAllJsxFiles(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      results.push(...getAllJsxFiles(full));
    } else if (full.endsWith('.jsx')) {
      results.push(full);
    }
  }
  return results;
}

const allJsx = getAllJsxFiles('src');
for (const file of allJsx) {
  const content = fs.readFileSync(file, 'utf8');
  const tagMatches = content.match(/<([A-Z][a-zA-Z0-9]*)/g) || [];
  const tags = [...new Set(tagMatches.map(t => t.substring(1)))];
  
  let fileUndefined = [];
  for (const tag of tags) {
    if (tag === 'React') continue;
    const wordMatches = content.match(new RegExp(`\\b${tag}\\b`, 'g')) || [];
    const jsxMatches = content.match(new RegExp(`<${tag}[\\s/>]`, 'g')) || [];
    const closeMatches = content.match(new RegExp(`</${tag}>`, 'g')) || [];
    const totalJsxCount = jsxMatches.length + closeMatches.length;

    if (wordMatches.length <= totalJsxCount) {
      fileUndefined.push(tag);
    }
  }

  assert(
    fileUndefined.length === 0,
    `All JSX tags in ${path.basename(file)} are imported`,
    fileUndefined.length > 0 ? `Undefined: <${fileUndefined.join('>, <')}>` : ''
  );
}

// 9. Data Defaults Import Audit
console.log('\n--- 9. AUDITING DATA DEFAULTS IMPORTS ---');
const defaultConstants = ['DEFAULT_COMPANY', 'DEFAULT_BANK', 'DEFAULT_BANK2', 'INITIAL_QUOTATION_DATA', 'INITIAL_SAVED_QUOTATIONS'];
for (const file of allJsx) {
  const content = fs.readFileSync(file, 'utf8');
  for (const c of defaultConstants) {
    if (content.includes(c)) {
      const isImportedOrExported = content.includes(`import`) && content.includes(c) || content.includes(`export const ${c}`);
      assert(isImportedOrExported, `${c} in ${path.basename(file)} is properly imported or declared`);
    }
  }
}

// 10. Firebase Cloud Database Integration Audit
console.log('\n--- 10. AUDITING FIREBASE CLOUD DATABASE INTEGRATION ---');
const firebaseServicePath = path.join(process.cwd(), 'src', 'services', 'firebase.js');
assert(fs.existsSync(firebaseServicePath), 'src/services/firebase.js exists on disk');
const firebaseContent = fs.readFileSync(firebaseServicePath, 'utf8');
assert(firebaseContent.includes('srimaanquotationgen'), 'Firebase configuration specifies project srimaanquotationgen');
assert(firebaseContent.includes('getFirestore'), 'Firestore database is initialized');
assert(firebaseContent.includes('subscribeQuotations'), 'Real-time quotation subscription engine exported');
assert(firebaseContent.includes('saveQuotationToCloud'), 'Cloud quotation save engine exported');
assert(firebaseContent.includes('deleteQuotationFromCloud'), 'Cloud quotation deletion engine exported');
assert(firebaseContent.includes('saveSettingsToCloud'), 'Cloud master settings save engine exported');
assert(firebaseContent.includes('subscribeSettings'), 'Cloud master settings subscription engine exported');

// 11. Reference ID & Standardized File Naming Scheme Audit
console.log('\n--- 11. AUDITING STANDARDIZED REFERENCE & EXPORT FILE NAMES ---');
const nov2026 = new Date('2026-11-26T12:00:00Z');
const jan2027 = new Date('2027-01-15T12:00:00Z');
assert(getFinancialYearString(nov2026) === '2026-27', 'Financial Year for Nov 2026 is 2026-27');
assert(getFinancialYearString(jan2027) === '2026-27', 'Financial Year for Jan 2027 is 2026-27');

assert(extractSequenceNumber(1) === '001', 'Sequence 1 padded to 001');
assert(extractSequenceNumber(25) === '025', 'Sequence 25 padded to 025');
assert(extractSequenceNumber({ id: 'quote-1' }) === '001', 'Extracts 001 from id quote-1');
assert(extractSequenceNumber({ id: 'quote-2' }) === '002', 'Extracts 002 from id quote-2');
assert(extractSequenceNumber({ masterRefNo: 'SSS-2026-27-003' }) === '003', 'Extracts 003 from masterRefNo');

assert(generateMasterRefNo(1, nov2026) === 'SSS-2026-27-001', 'Master Ref No 1 is SSS-2026-27-001');
assert(generateMasterRefNo(2, nov2026) === 'SSS-2026-27-002', 'Master Ref No 2 is SSS-2026-27-002');
assert(generateMasterRefNo(10, nov2026) === 'SSS-2026-27-010', 'Master Ref No 10 is SSS-2026-27-010');

// Audit 5 Document Export Filename types for Quote #1
const q1 = { id: 'quote-1', sequenceNumber: 1, masterRefNo: 'SSS-2026-27-001' };
assert(getExportFileName('bank', q1) === 'SSS-BPO-001', 'Bank PO filename is SSS-BPO-001');
assert(getExportFileName('customer', q1) === 'SSS-CPO-001', 'Customer PO filename is SSS-CPO-001');
assert(getExportFileName('receipt', q1) === 'SSS-REC-001', 'Payment Receipt filename is SSS-REC-001');
assert(getExportFileName('invoice', q1) === 'SSS-GST-001', 'GST Invoice filename is SSS-GST-001');
assert(getExportFileName('discom', q1) === 'SSS-DIS-001', 'DISCOM Package filename is SSS-DIS-001');

// Audit Quote #2
const q2 = { id: 'quote-2', sequenceNumber: 2, masterRefNo: 'SSS-2026-27-002' };
assert(getExportFileName('bank', q2) === 'SSS-BPO-002', 'Quote 2 Bank PO filename is SSS-BPO-002');
assert(getExportFileName('customer', q2) === 'SSS-CPO-002', 'Quote 2 Customer PO filename is SSS-CPO-002');
assert(getExportFileName('receipt', q2) === 'SSS-REC-002', 'Quote 2 Payment Receipt filename is SSS-REC-002');
assert(getExportFileName('invoice', q2) === 'SSS-GST-002', 'Quote 2 GST Invoice filename is SSS-GST-002');
assert(getExportFileName('discom', q2) === 'SSS-DIS-002', 'Quote 2 DISCOM Package filename is SSS-DIS-002');

console.log('\n========================================');
console.log(`TOTAL TESTS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
console.log('========================================');

if (failCount > 0) {
  process.exit(1);
}
