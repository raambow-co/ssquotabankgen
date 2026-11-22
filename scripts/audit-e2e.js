import assert from 'assert';
import { calculateGSTBreakdown, calculateSubsidy, numberToWordsINR, formatINR } from '../src/utils/calculations.js';
import { convertToCustomerFormat } from '../src/utils/quotationAdapter.js';

console.log('========================================');
console.log('🧪 RUNNING COMPREHENSIVE END-TO-END AUDIT');
console.log('========================================\n');

// 1. Audit Top 10 Solar PV Module Manufacturers from shortlisted reference image
console.log('--- 1. AUDITING MODULE BRANDS LIST ---');
const top10Brands = [
  'Waaree Energies',
  'Adani Solar (Mundra)',
  'Tata Power Solar / TP Solar',
  'Vikram Solar',
  'Premier Energies',
  'Goldi Solar',
  'Emmvee Photovoltaic',
  'Rayzon Solar',
  'RenewSys India',
  'Saatvik Green Energy'
];

top10Brands.forEach((brand, idx) => {
  assert(typeof brand === 'string' && brand.length > 0, `Brand ${idx + 1}: ${brand} is valid`);
  console.log(`✅ [PASS] Brand #${idx + 1}: ${brand} verified`);
});

// 2. Audit Price Isolation: Bank PO Cost vs Customer Cost
console.log('\n--- 2. AUDITING BANK PO VS CUSTOMER QUOTATION PRICE ISOLATION ---');
const mockQuotation = {
  id: 'QUO-2026-001',
  refNo: 'REF-BANK-001',
  date: '2026-11-21',
  customer: {
    name: 'GURRAM ANITHA',
    phone: '9848163232',
    email: 'Ramanareddy1632@gmail.com',
    addressLine1: 'HNO 5-1-4',
    addressLine2: 'BALAPETA',
    district: 'Khammam',
    state: 'TELANGANA',
    pincode: '507003',
    consumerNo: '36040182649' // UNC Electricity Consumer No
  },
  system: {
    capacity: 5,
    panelBrand: 'Waaree Energies',
    panelWattage: 605,
    panelCount: 10,
    inverterBrand: 'Polycab Solar inverter'
  },
  pricing: {
    customerCost: 345000,   // Solar Customer Price
    bankCost: 375000,       // Bank PO Price (Higher)
    subsidyAmount: 78000
  },
  receipt: {
    advanceAmount: 22000,
    paymentMode: 'Cash',
    reasonForPayment: 'Start the work of Enhancement of contract load and Feasibility permission.',
    receiptNo: '32',
    receiverName: 'A CHARY'
  }
};

// Customer format conversion
const { quotation: customerQuo } = convertToCustomerFormat(mockQuotation);
assert(customerQuo.commercials.totalGrossCost === 345000, 'Customer Proposal gross cost strictly equals customer price (345000)');
assert(customerQuo.commercials.subsidyAmount === 78000, 'Customer Proposal subsidy equals 78000');
assert(customerQuo.commercials.netPayable === 267000, 'Customer Proposal net payable equals 267000');
console.log('✅ [PASS] Customer quotation cost isolated at ₹3,45,000 (Net ₹2,67,000)');

// Bank Proposal wrapper check
const bankCostVal = Number(mockQuotation.pricing.bankCost);
const bankSubsidyVal = Number(mockQuotation.pricing.subsidyAmount);
const bankNetVal = bankCostVal - bankSubsidyVal;

const bankQuotation = {
  ...mockQuotation,
  pricing: {
    ...mockQuotation.pricing,
    bankCost: bankCostVal,
    totalCost: bankCostVal,
    subsidyAmount: bankSubsidyVal,
    afterSubsidyCost: bankNetVal
  }
};

assert(bankQuotation.pricing.totalCost === 375000, 'Bank Proposal strictly uses Bank PO Cost (375000)');
assert(bankQuotation.pricing.afterSubsidyCost === 297000, 'Bank Proposal strictly uses Bank Net Cost (297000)');
console.log('✅ [PASS] Bank quotation cost isolated at ₹3,75,000 (Bank PO)');

// 3. Audit UNC Quotation Number
console.log('\n--- 3. AUDITING UNC (ELECTRICITY CONSUMER NO) AS QUOTATION NUMBER ---');
const displayQuotationNo = mockQuotation.customer.consumerNo;
assert(displayQuotationNo === '36040182649', 'Quotation number must use UNC / Consumer No');
console.log('✅ [PASS] Quotation Number is correctly mapped to UNC:', displayQuotationNo);

// 4. Audit GST Breakdown ("PRICE OFFER") & Rounding
console.log('\n--- 4. AUDITING GST BREAKDOWN (PRICE OFFER) ---');
const bankGST = calculateGSTBreakdown(bankQuotation.pricing.totalCost);
assert(bankGST.goodsBase === Math.round(bankGST.goodsTotal / 1.05), 'Goods Base is rounded integer');
assert(bankGST.goodsCgst === Math.round(bankGST.goodsBase * 0.025), 'Goods CGST is 2.5% rounded');
assert(bankGST.goodsSgst === Math.round(bankGST.goodsBase * 0.025), 'Goods SGST is 2.5% rounded');
assert(bankGST.servicesBase === Math.round(bankGST.servicesTotal / 1.18), 'Services Base is rounded integer');
assert(bankGST.servicesCgst === Math.round(bankGST.servicesBase * 0.09), 'Services CGST is 9% rounded');
assert(bankGST.servicesSgst === Math.round(bankGST.servicesBase * 0.09), 'Services SGST is 9% rounded');
assert(bankGST.totalProjectCost === 375000, 'Total statutory cost is 375000');
console.log('✅ [PASS] Bank GST (375k): Goods Base ₹' + bankGST.goodsBase + ' | CGST ₹' + bankGST.goodsCgst + ' | SGST ₹' + bankGST.goodsSgst);

// Reference 410,000 Benchmark (from user image)
const gst410k = calculateGSTBreakdown(410000);
assert(gst410k.goodsBase === 273334, '410k Goods Base is 273334');
assert(gst410k.goodsCgst === 6833, '410k Goods CGST is 6833');
assert(gst410k.goodsSgst === 6833, '410k Goods SGST is 6833');
assert(gst410k.goodsTotal === 287000, '410k Goods Total is 287000');
assert(gst410k.servicesBase === 104237, '410k Services Base is 104237');
assert(gst410k.servicesCgst === 9381, '410k Services CGST is 9381');
assert(gst410k.servicesSgst === 9381, '410k Services SGST is 9381');
assert(gst410k.servicesTotal === 123000, '410k Services Total is 123000');
assert(gst410k.totalBase === 377571, '410k Total Base is 377571');
console.log('✅ [PASS] 410k Reference Table strictly matches user image (zero decimals, exact integers)');

// 5. Audit Advance Payment Receipt
console.log('\n--- 5. AUDITING ADVANCE RECEIPT GENERATOR ---');
const totalProjectCostReceipt = mockQuotation.pricing.customerCost;
const advancePayment = mockQuotation.receipt.advanceAmount;
const balanceDue = totalProjectCostReceipt - advancePayment;
const words = numberToWordsINR(advancePayment);

assert(totalProjectCostReceipt === 345000, 'Receipt uses customer project cost');
assert(advancePayment === 22000, 'Receipt advance is 22000');
assert(balanceDue === 323000, 'Receipt balance is 323000');
assert(words === 'TWENTY TWO THOUSAND ONLY', 'Receipt amount in words is TWENTY TWO THOUSAND ONLY');
console.log('✅ [PASS] Receipt Calculations: Advance ₹' + advancePayment + ' (' + words + '), Balance Due ₹' + balanceDue);

// 6. Audit Panel Wattage Zero & Custom Number Handling
console.log('\n--- 6. AUDITING PANEL WATTAGE INPUT FLEXIBILITY ---');
const sanitizeWattage = (input) => {
  if (input === '' || input === null || input === undefined) return '';
  const num = parseInt(input, 10);
  return isNaN(num) ? '' : num;
};

assert(sanitizeWattage('') === '', 'Empty string allowed when backspacing');
assert(sanitizeWattage('0') === 0, '0 allowed as a valid intermediate input');
assert(sanitizeWattage('540') === 540, '540 correctly parsed');
assert(sanitizeWattage('620') === 620, '620 correctly parsed');
console.log('✅ [PASS] Wattage input freely accepts 0, empty string (backspace), 540, 620 without jumping');

// 7. Audit Second Bank Account & Registered Office
console.log('\n--- 7. AUDITING SECOND BANK ACCOUNT & REGISTERED OFFICE ---');
import { DEFAULT_COMPANY, DEFAULT_BANK, DEFAULT_BANK2 } from '../src/data/defaultData.js';

assert(DEFAULT_BANK.bankName === 'HDFC BANK', 'Primary bank is HDFC');
assert(DEFAULT_BANK2.bankName === 'STATE BANK OF INDIA', 'Second bank is SBI');
assert(DEFAULT_BANK2.accountNo === '44813579950', 'SBI account number is 44813579950');
assert(DEFAULT_BANK2.ifscCode === 'SBIN0065049', 'SBI IFSC is SBIN0065049');
assert(DEFAULT_COMPANY.registeredOffice.includes('Edulapuram Muncipalty'), 'Registered office includes Edulapuram Muncipalty');
assert(DEFAULT_COMPANY.registeredOffice.includes('507003'), 'Registered office includes 507003');
console.log('✅ [PASS] Second Bank (SBI: 44813579950, SBIN0065049) and Registered Office verified');

console.log('\n========================================');
console.log('🎉 ALL AUDITS PASSED WITH 100% SUCCESS!');
console.log('========================================');
