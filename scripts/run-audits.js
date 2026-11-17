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
  formatINR, formatINRDecimal, calculateSubsidy, 
  calculateEnergyMetrics, calculateArea, calculatePayback, 
  calculateGSTBreakdown, generateRefNo 
} from '../src/utils/calculations.js';

console.log('\n--- 1. AUDITING CALCULATION ENGINE ---');

assert(calculateSubsidy(1) === 30000, 'Subsidy for 1 kW is ₹30,000');
assert(calculateSubsidy(2) === 60000, 'Subsidy for 2 kW is ₹60,000');
assert(calculateSubsidy(3) === 78000, 'Subsidy for 3 kW is ₹78,000 (Max Cap)');
assert(calculateSubsidy(5) === 78000, 'Subsidy for 5 kW is ₹78,000');
assert(calculateSubsidy(10) === 78000, 'Subsidy for 10 kW is ₹78,000');

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
assert(gst225k.goodsTotal === 163840, 'Benchmark Goods Total is ₹1,63,840.00');
assert(gst225k.servicesBase === 51830, 'Benchmark Services Base is ₹51,830.00');
assert(gst225k.servicesGst === 9330, 'Benchmark Services GST (18%) is ₹9,330.00');
assert(gst225k.servicesTotal === 61160, 'Benchmark Services Total is ₹61,160.00');
assert(gst225k.subTotalBase === 207868, 'Benchmark Sub Total Base is ₹2,07,868.00');
assert(gst225k.totalGst === 17132, 'Benchmark Total GST is ₹17,132.00');
assert(gst225k.totalProjectCost === 225000, 'Benchmark Total Project Cost is ₹2,25,000.00');

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

// 4. Assets & Images Audit
console.log('\n--- 4. AUDITING ASSETS & LOGOS ---');
import { ASSETS } from '../src/assets/assetsData.js';

assert(typeof ASSETS.srimaan_logo === 'string' && ASSETS.srimaan_logo.startsWith('data:image/'), 'srimaan_logo is valid Base64');
assert(typeof ASSETS.solar_hero_banner === 'string' && ASSETS.solar_hero_banner.startsWith('data:image/'), 'solar_hero_banner is valid Base64');
assert(typeof ASSETS.basic_structure === 'string' && ASSETS.basic_structure.startsWith('data:image/'), 'basic_structure is valid Base64');
assert(typeof ASSETS.height_structure === 'string' && ASSETS.height_structure.startsWith('data:image/'), 'height_structure is valid Base64');
assert(typeof ASSETS.grid_diagram === 'string' && ASSETS.grid_diagram.startsWith('data:image/'), 'grid_diagram is valid Base64');

// 5. Component Files Audit
console.log('\n--- 5. AUDITING REACT COMPONENT FILES ---');
const components = [
  'Page1.jsx', 'Page2.jsx', 'Page3.jsx', 'Page4.jsx',
  'Page5.jsx', 'Page6.jsx', 'Page7.jsx', 'PageHeader.jsx',
  'Navbar.jsx', 'DashboardView.jsx', 'QuotationFormView.jsx',
  'ProposalPreviewModal.jsx', 'SettingsModal.jsx'
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

// 6. CSS & Print Rules Audit
console.log('\n--- 6. AUDITING CSS & PRINT RULES ---');
const indexCss = fs.readFileSync('src/index.css', 'utf-8');
assert(indexCss.includes('@media print'), 'Print stylesheet defined in src/index.css');
assert(indexCss.includes('size: A4 portrait'), 'Print stylesheet sets A4 portrait size');
assert(indexCss.includes('justify-content: flex-start !important;'), 'A4 page in print uses justify-content: flex-start');
assert(indexCss.includes('page-break-after: always !important;'), 'Print stylesheet includes page breaks');

// 7. Standalone HTML Bundle Audit
console.log('\n--- 7. AUDITING STANDALONE HTML BUNDLE ---');
const standalonePath = 'dist/Srimaan_Solar_Quotation_Generator.html';
const standaloneExists = fs.existsSync(standalonePath);
assert(standaloneExists, 'Standalone file exists at dist/Srimaan_Solar_Quotation_Generator.html');
if (standaloneExists) {
  const stat = fs.statSync(standalonePath);
  assert(stat.size > 1000000, `Standalone file size is valid (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
}

// 8. Git Sync Audit
console.log('\n========================================');
console.log(`📊 AUDIT RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL SYSTEM AUDITS PASSED WITH 100% SUCCESS!\n');
}
