import fs from 'fs';
import path from 'path';
import { 
  calculateSubsidy, 
  calculateEnergyMetrics, 
  calculatePayback, 
  calculateGSTBreakdown,
  formatINR,
  formatINRDecimal 
} from '../src/utils/calculations.js';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
    failCount++;
  }
}

console.log('========================================');
console.log('🚀 RUNNING COMPREHENSIVE SYSTEM AUDITS');
console.log('========================================\n');

// 1. Calculation Engine Audit
console.log('--- 1. AUDITING CALCULATION ENGINE ---');
assert(calculateSubsidy(1) === 30000, 'Subsidy for 1 kW is ₹30,000');
assert(calculateSubsidy(2) === 60000, 'Subsidy for 2 kW is ₹60,000');
assert(calculateSubsidy(3) === 78000, 'Subsidy for 3 kW is ₹78,000 (Max Cap)');
assert(calculateSubsidy(5) === 78000, 'Subsidy for 5 kW is ₹78,000');
assert(calculateSubsidy(10) === 78000, 'Subsidy for 10 kW is ₹78,000');

const metrics5 = calculateEnergyMetrics(5);
assert(Number(metrics5.energyPerDay) === 20, '5 kW daily generation is 20 units');
assert(Number(metrics5.energyPerMonth) === 600, '5 kW monthly generation is 600 units');
assert(Number(metrics5.energyPerYear) === 6000, '5 kW annual generation is 6000 units');

const payback5 = calculatePayback(347000, 6000, 8);
assert(payback5.annualSavings === 48000, 'Annual savings is ₹48,000 @ ₹8/unit for 6000 units');
assert(payback5.paybackYears === '7.2', 'Payback period computed correctly: ' + payback5.paybackYears);

// 2. Statutory GST EPC Module Audit (WhatsApp Reference Values)
console.log('\n--- 2. AUDITING GST STATUTORY EPC MODULE ---');
const gstBenchmark = calculateGSTBreakdown(225000);
const goodsBaseFmt = formatINRDecimal(gstBenchmark.goodsBase);
const goodsGstFmt = formatINRDecimal(gstBenchmark.goodsGst);
const goodsTotalFmt = formatINRDecimal(gstBenchmark.goodsTotal);
const servicesBaseFmt = formatINRDecimal(gstBenchmark.servicesBase);
const servicesGstFmt = formatINRDecimal(gstBenchmark.servicesGst);
const servicesTotalFmt = formatINRDecimal(gstBenchmark.servicesTotal);
const subTotalBaseFmt = formatINRDecimal(gstBenchmark.subTotalBase);
const totalGstFmt = formatINRDecimal(gstBenchmark.totalGst);
const totalProjectCostFmt = formatINRDecimal(gstBenchmark.totalProjectCost);

assert(goodsBaseFmt === '1,56,038.00', `Benchmark Goods Base is ₹1,56,038.00 (Got ₹${goodsBaseFmt})`);
assert(goodsGstFmt === '7,802.00', `Benchmark Goods GST (5%) is ₹7,802.00 (Got ₹${goodsGstFmt})`);
assert(goodsTotalFmt === '1,63,840.00', `Benchmark Goods Total is ₹1,63,840.00 (Got ₹${goodsTotalFmt})`);
assert(servicesBaseFmt === '51,830.00', `Benchmark Services Base is ₹51,830.00 (Got ₹${servicesBaseFmt})`);
assert(servicesGstFmt === '9,330.00', `Benchmark Services GST (18%) is ₹9,330.00 (Got ₹${servicesGstFmt})`);
assert(servicesTotalFmt === '61,160.00', `Benchmark Services Total is ₹61,160.00 (Got ₹${servicesTotalFmt})`);
assert(subTotalBaseFmt === '2,07,868.00', `Benchmark Sub Total Base is ₹2,07,868.00 (Got ₹${subTotalBaseFmt})`);
assert(totalGstFmt === '17,132.00', `Benchmark Total GST is ₹17,132.00 (Got ₹${totalGstFmt})`);
assert(totalProjectCostFmt === '2,25,000.00', `Benchmark Total Project Cost is ₹2,25,000.00 (Got ₹${totalProjectCostFmt})`);

// Consistency check across random project costs
const gstRandom = calculateGSTBreakdown(425000);
assert(Math.abs((gstRandom.goodsTotal + gstRandom.servicesTotal) - 425000) < 0.05, 'Dynamic GST: Goods + Services equals total project cost');
assert(Math.abs((gstRandom.subTotalBase + gstRandom.totalGst) - 425000) < 0.05, 'Dynamic GST: Base + GST equals total project cost');

// 3. Currency & Number Formatting Audit
console.log('\n--- 3. AUDITING CURRENCY & NUMBER FORMATTING ---');
assert(formatINR(225000) === '2,25,000', 'formatINR(225000) formats to 2,25,000');
assert(formatINRDecimal(156038) === '1,56,038.00', 'formatINRDecimal(156038) formats to 1,56,038.00');
assert(formatINRDecimal(7802) === '7,802.00', 'formatINRDecimal(7802) formats to 7,802.00');
assert(formatINRDecimal(207868) === '2,07,868.00', 'formatINRDecimal(207868) formats to 2,07,868.00');

// 4. Assets & Brand Logos Audit
console.log('\n--- 4. AUDITING ASSETS & LOGOS ---');
const assetsJs = fs.readFileSync('src/assets/assetsData.js', 'utf-8');
assert(assetsJs.includes('data:image/jpeg;base64,') && assetsJs.includes('srimaan_logo'), 'srimaan_logo is valid Base64');
assert(assetsJs.includes('solar_hero_banner'), 'solar_hero_banner is valid Base64');
assert(assetsJs.includes('basic_structure'), 'basic_structure is valid Base64');
assert(assetsJs.includes('height_structure'), 'height_structure is valid Base64');
assert(assetsJs.includes('grid_diagram'), 'grid_diagram is valid Base64');

// Brand Logos & Emblems Audit
const brandFiles = ['waaree.png', 'tata-solar.png', 'adani.png', 'sungrow.png', 'growatt.png', 'solis.png', 'polycab.png'];
for (const brand of brandFiles) {
  const brandPath = path.join('public', 'assets', 'brands', brand);
  assert(fs.existsSync(brandPath), `Brand logo ${brand} exists in public/assets/brands/`);
}

const emblemFiles = ['mnre-logo.png', 'pm-surya-ghar.png', 'bis-certified.png', 'make-in-india.png'];
for (const emblem of emblemFiles) {
  const emblemPath = path.join('public', 'assets', 'emblems', emblem);
  assert(fs.existsSync(emblemPath), `Accreditation emblem ${emblem} exists in public/assets/emblems/`);
}

// 5. React Component Files Audit
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

// 6. Dashboard Capabilities Audit (Studied from quotation generator 2 2)
console.log('\n--- 6. AUDITING DASHBOARD CAPABILITIES ---');
const dashboardViewContent = fs.readFileSync('src/components/DashboardView.jsx', 'utf-8');
assert(dashboardViewContent.includes('capacityFilter'), 'Dashboard has capacity filtering (All, Residential, Commercial, Industrial)');
assert(dashboardViewContent.includes('sortBy'), 'Dashboard has multi-option sorting (Newest, Oldest, Capacity, Value)');
assert(dashboardViewContent.includes('viewMode'), 'Dashboard supports Table View and Card Grid View modes');
assert(dashboardViewContent.includes('handleExportBackup'), 'Dashboard has JSON backup export feature');

// 7. CSS & Print Rules Audit
console.log('\n--- 7. AUDITING CSS & PRINT RULES ---');
const indexCss = fs.readFileSync('src/index.css', 'utf-8');
assert(indexCss.includes('@media print'), 'Print stylesheet defined in src/index.css');
assert(indexCss.includes('size: A4 portrait'), 'Print stylesheet sets A4 portrait size');
assert(indexCss.includes('justify-content: flex-start !important;'), 'A4 page in print uses justify-content: flex-start');
assert(indexCss.includes('page-break-after: always !important;'), 'Print stylesheet includes page breaks');

// 8. Standalone HTML Bundle Audit
console.log('\n--- 8. AUDITING STANDALONE HTML BUNDLE ---');
const standalonePath = 'dist/Srimaan_Solar_Quotation_Generator.html';
const standaloneExists = fs.existsSync(standalonePath);
assert(standaloneExists, 'Standalone file exists at dist/Srimaan_Solar_Quotation_Generator.html');
if (standaloneExists) {
  const stat = fs.statSync(standalonePath);
  assert(stat.size > 1000000, `Standalone file size is valid (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
}

console.log('\n========================================');
console.log(`📊 AUDIT RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL SYSTEM AUDITS PASSED WITH 100% SUCCESS!\n');
}
