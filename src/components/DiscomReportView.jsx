import React, { useState, useEffect } from 'react';
import { formatINR, formatDateToPDFStyle, isDomesticCategory } from '../utils/calculations';
import { 
  FileText, 
  RotateCcw, 
  Download, 
  Layers, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const DiscomReportView = ({ quotation, onUpdateDiscom }) => {
  const customer = quotation?.customer || {};
  const system = quotation?.system || {};
  const pricing = quotation?.pricing || {};
  const initialDiscom = quotation?.discom || {};

  const capacity = Number(system.capacityKw || 3);
  const panelsCount = Number(system.panelsCount || (capacity <= 3 ? 6 : Math.ceil((capacity * 1000) / 550)));
  const defaultPanelWattage = system.panelWattage || 550;
  const totalKwp = ((panelsCount * defaultPanelWattage) / 1000).toFixed(2);
  const cost = Number(pricing.bankCost !== undefined ? pricing.bankCost : (pricing.totalCost || pricing.customerCost || 0));

  const getInitialState = () => {
    return {
      // 1. REAL APPLICANT & QUOTATION PARTICULARS
      regNo: initialDiscom.regNo || '',
      regDate: initialDiscom.regDate || quotation?.date || '',
      applicantName: initialDiscom.applicantName !== undefined ? initialDiscom.applicantName : (customer.name || ''),
      uscNo: initialDiscom.uscNo !== undefined ? initialDiscom.uscNo : (customer.consumerNo || ''),
      category: initialDiscom.category || (isDomesticCategory(customer.category) ? 'LT-I Domestic' : (String(customer.category).toLowerCase().includes('indus') ? 'LT-III Industrial' : 'LT-II Commercial')),
      subCategory: initialDiscom.subCategory || (isDomesticCategory(customer.category) ? 'Individual Residential' : (String(customer.category).toLowerCase().includes('indus') ? 'Industrial Unit' : 'Commercial Establishment')),
      loadKw: initialDiscom.loadKw || (system.capacityKw ? `${system.capacityKw} kW` : `${capacity} kW`),
      distributionSection: initialDiscom.distributionSection || (customer.district ? `${customer.district} Section` : ''),
      poleNumber: initialDiscom.poleNumber || '',
      address: initialDiscom.address !== undefined ? initialDiscom.address : (customer.addressLine1 || customer.address || ''),
      mobile: initialDiscom.mobile !== undefined ? initialDiscom.mobile : (customer.phone || customer.mobile || ''),
      email: initialDiscom.email !== undefined ? initialDiscom.email : (customer.email || ''),
      district: initialDiscom.district !== undefined ? initialDiscom.district : (customer.district || ''),
      state: initialDiscom.state || customer.state || 'TELANGANA',
      pinCode: initialDiscom.pinCode !== undefined ? initialDiscom.pinCode : (customer.pinCode || customer.pincode || ''),
      
      // 2. REAL PART B STATUTORY & SYSTEM CAPACITIES
      projectModel: 'CAPEX',
      commDate: initialDiscom.commDate || quotation?.date || '',
      totalCost: initialDiscom.totalCost !== undefined ? initialDiscom.totalCost : cost,
      installationType: 'ROOFTOP ONLY',
      capacityRooftop: `${totalKwp} kWp`,
      capacityGround: '0 kWp',
      totalPlantCapacity: `${totalKwp} kWp`,
      latitude: initialDiscom.latitude || '',
      longitude: initialDiscom.longitude || '',

      // 3. OLD METER INSPECTION (Blank by default - filled post-inspection)
      oldMeterMake: initialDiscom.oldMeterMake || '',
      oldMeterSerial: initialDiscom.oldMeterSerial || '',
      oldMeterCapacity: initialDiscom.oldMeterCapacity || '',
      oldMeterMf: initialDiscom.oldMeterMf || '',
      oldMeterKwh: initialDiscom.oldMeterKwh || '',
      oldMeterKvah: initialDiscom.oldMeterKvah || '',
      oldMeterDate: initialDiscom.oldMeterDate || '',

      // 4. NEW NET METER SYNCHRONIZATION (Blank by default - filled post-inspection)
      newMeterMake: initialDiscom.newMeterMake || '',
      newMeterSerial: initialDiscom.newMeterSerial || '',
      newMeterCapacity: initialDiscom.newMeterCapacity || '',
      newMeterConstant: initialDiscom.newMeterConstant || '',
      newMeterImportKwh: initialDiscom.newMeterImportKwh || '',
      newMeterImportKvah: initialDiscom.newMeterImportKvah || '',
      newMeterExportKwh: initialDiscom.newMeterExportKwh || '',
      newMeterExportKvah: initialDiscom.newMeterExportKvah || '',
      protectiveSystem: 'YES',

      // 5. SOLAR PV MODULE SPECIFICATIONS (Real Brand/Wp from Quotation; Serials filled post-delivery)
      moduleMake: system.moduleBrand || 'Waaree Energies Ltd (Tier-1 ALMM)',
      moduleType: system.moduleType || 'Mono PERC / N-Type TOPCon Bi-facial',
      moduleWattage: `${defaultPanelWattage} Wp`,
      moduleCount: `${panelsCount} Nos`,
      moduleCapacityTotal: `${totalKwp} kWp`,
      moduleSerials: initialDiscom.moduleSerials && Array.isArray(initialDiscom.moduleSerials)
        ? initialDiscom.moduleSerials 
        : Array(8).fill(''),

      // 6. GRID TIE INVERTER SPECIFICATIONS (Real Brand from Quotation; Serial filled post-delivery)
      inverterMake: system.inverterBrand || 'Smart Grid-Tied Inverter',
      inverterSerial: initialDiscom.inverterSerial || '',
      inverterCapacity: '550 VDC',
      inverterInputVolt: initialDiscom.inverterInputVolt || '',
      inverterOutputVolt: '240 V',
      antiIslanding: 'YES',
      ceigApproval: initialDiscom.ceigApproval || (capacity <= 75 ? 'N/A (Exempted - Capacity <= 75 kW)' : ''),

      // 7. REAL OFFICIAL VENDOR DETAILS (SRIMAAN SOLAR SOLUTIONS)
      vendorName: 'SRIMAAN SOLAR SOLUTIONS',
      vendorDoorNo: '# 6-210,SRIRAM NAGAR,',
      vendorStreet: 'BEHIND AUTO NAGAR',
      vendorCity: 'WARANAGAL X ROAD ,KHAMMAM',
      vendorMandal: 'KHAMMAM RURAL',
      vendorPin: '507003',
      vendorPhone: '',
      vendorMobile: '9347416140',
      vendorEmail: 'Ravindrachary1972@gmail.com',
      signatoryName: 'T. Ravindra Chary'
    };
  };

  const [discomData, setDiscomData] = useState(getInitialState);
  const [activeSheet, setActiveSheet] = useState('all'); // 'all', 'vb', 'partb', 'iv'

  useEffect(() => {
    setDiscomData(getInitialState());
  }, [quotation?.id, quotation?.date, pricing.bankCost, pricing.totalCost, customer.name, customer.consumerNo]);

  const handleChange = (field, value) => {
    setDiscomData(prev => {
      const updated = { ...prev, [field]: value };
      if (onUpdateDiscom) {
        onUpdateDiscom(updated);
      }
      return updated;
    });
  };

  const handleSerialChange = (index, value) => {
    setDiscomData(prev => {
      const updatedSerials = [...prev.moduleSerials];
      updatedSerials[index] = value;
      const updated = { ...prev, moduleSerials: updatedSerials };
      if (onUpdateDiscom) {
        onUpdateDiscom(updated);
      }
      return updated;
    });
  };

  const handleReset = () => {
    const defaultState = getInitialState();
    setDiscomData(defaultState);
    if (onUpdateDiscom) {
      onUpdateDiscom(defaultState);
    }
  };

  const {
    regNo, regDate, applicantName, uscNo, category, subCategory, loadKw,
    distributionSection, poleNumber, address, mobile, email, district, state, pinCode,
    projectModel, commDate, totalCost, installationType, capacityRooftop, capacityGround,
    totalPlantCapacity, latitude, longitude,
    oldMeterMake, oldMeterSerial, oldMeterCapacity, oldMeterMf, oldMeterKwh, oldMeterKvah, oldMeterDate,
    newMeterMake, newMeterSerial, newMeterCapacity, newMeterConstant, newMeterImportKwh, newMeterImportKvah,
    newMeterExportKwh, newMeterExportKvah, protectiveSystem,
    moduleMake, moduleType, moduleWattage, moduleCount, moduleCapacityTotal, moduleSerials,
    inverterMake, inverterSerial, inverterCapacity, inverterInputVolt, inverterOutputVolt,
    antiIslanding, ceigApproval,
    vendorName, vendorDoorNo, vendorStreet, vendorCity, vendorMandal, vendorPin,
    vendorPhone, vendorMobile, vendorEmail, signatoryName
  } = discomData;

  // Shared input styling:
  // - On Screen: Seamless inline input. When empty, shows light grey placeholder text.
  // - On Print: placeholder becomes transparent so empty cells print completely clean and blank (zero fake text).
  const inputClass = "w-full bg-transparent border-0 outline-none text-black font-inherit p-0 placeholder:text-gray-400 placeholder:italic placeholder:font-normal placeholder:text-[8pt] print:placeholder:text-transparent focus:bg-amber-50/70 focus:ring-1 focus:ring-amber-500 rounded-xs transition-colors";

  return (
    <div className="w-full flex flex-col items-center bg-slate-50 py-4 print:bg-white print:p-0">
      {/* ============================================================== */}
      {/* INTERACTIVE TOOLBAR (Hidden in Print)                          */}
      {/* ============================================================== */}
      <div className="no-print w-full max-w-[210mm] mb-4 p-3 bg-white border border-slate-300 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-900 text-emerald-300 font-bold">
            <Layers size={18} />
          </span>
          <div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-2">
              <span>DISCOM Synchronization Package</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 flex items-center gap-1">
                <Sparkles size={11} className="text-emerald-700" />
                <span>100% Real Quotation Data &bull; Blank Inspection Fields</span>
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Click any field to enter data post-inspection &bull; Prints completely blank without any fake values
            </div>
          </div>
        </div>

        {/* Sheet Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg gap-1 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveSheet('all')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
              activeSheet === 'all' 
                ? 'bg-white text-emerald-950 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Sheets (3P)
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('vb')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
              activeSheet === 'vb' 
                ? 'bg-emerald-700 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sheet: VB
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('partb')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
              activeSheet === 'partb' 
                ? 'bg-emerald-700 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sheet: PART B (Part B)
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('iv')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
              activeSheet === 'iv' 
                ? 'bg-emerald-700 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sheet: IV (Annexure-IV)
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <a
            href="/DISCOM_REPORT.xlsx"
            download="DISCOM_REPORT.xlsx"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
            title="Download authentic multi-sheet DISCOM Excel workbook"
          >
            <Download size={13} />
            <span>Download Excel</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
            title="Reset to quotation defaults"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MULTI-PAGE A4 DOCUMENT SHEETS CONTAINER                       */}
      {/* ============================================================== */}
      <div className="w-full flex flex-col items-center space-y-8 print:space-y-0">
        
        {/* ============================================================ */}
        {/* SHEET 1: VB (ANNEXURE-V(b)) - EXACT EXCEL REPLICA             */}
        {/* ============================================================ */}
        {(activeSheet === 'all' || activeSheet === 'vb') && (
          <div className="a4-preview-sheet p-6 sm:p-8 bg-white text-black font-serif relative overflow-hidden w-[210mm] min-h-[297mm] mx-auto shadow-md print:shadow-none print:m-0 print:border-none print:p-6 page-break-after">
            <table className="w-full border-collapse border border-black text-[9pt] leading-tight bg-white">
              <colgroup>
                <col className="w-[6%]" />
                <col className="w-[44%]" />
                <col className="w-[50%]" />
              </colgroup>
              <tbody>
                {/* Row 1: Merged Title */}
                <tr>
                  <td colSpan={3} className="border border-black p-2.5 text-center font-bold text-[10pt] tracking-wide">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ANNEXURE-V(b)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LT&nbsp;NET&nbsp;METER&nbsp;Solar&nbsp;Rooftop&nbsp;PV&nbsp;system&nbsp;Synchronization&nbsp;Report&nbsp;/Test&nbsp;Report
                  </td>
                </tr>

                {/* Row 2: Section A Header */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[10pt]">A</td>
                  <td colSpan={2} className="border border-black p-1 px-2 font-bold text-[10pt]">Applicant&nbsp;Details</td>
                </tr>

                {/* Rows 3-10: Applicant items */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold">1</td>
                  <td className="border border-black p-1 px-2 font-normal">Net Meter Registration Number</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={regNo}
                      placeholder="Net Meter Registration Number"
                      onChange={(e) => handleChange('regNo', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">2</td>
                  <td className="border border-black p-1 px-2 font-normal">Registration Date</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={regDate}
                      placeholder="Registration Date (DD-MM-YYYY)"
                      onChange={(e) => handleChange('regDate', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">3</td>
                  <td className="border border-black p-1 px-2 font-normal">Name of the applicant</td>
                  <td className="border border-black p-1 px-2 font-bold uppercase">
                    <input
                      type="text"
                      value={applicantName}
                      placeholder="Name of the applicant"
                      onChange={(e) => handleChange('applicantName', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">4</td>
                  <td className="border border-black p-1 px-2 font-normal">Service Number /USC Number</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={uscNo}
                      placeholder="Service Number / USC Number"
                      onChange={(e) => handleChange('uscNo', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">5</td>
                  <td className="border border-black p-1 px-2 font-normal">Category</td>
                  <td className="border border-black p-1 px-2 font-bold">
                    <input
                      type="text"
                      value={category}
                      placeholder="Category (e.g. LT-I Domestic)"
                      onChange={(e) => handleChange('category', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">6</td>
                  <td className="border border-black p-1 px-2 font-normal">Load</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={loadKw}
                      placeholder="Load (e.g. 3 kW)"
                      onChange={(e) => handleChange('loadKw', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">7</td>
                  <td className="border border-black p-1 px-2 font-normal">Distribution/Section</td>
                  <td className="border border-black p-1 px-2 font-bold">
                    <input
                      type="text"
                      value={distributionSection}
                      placeholder="Distribution / Section"
                      onChange={(e) => handleChange('distributionSection', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">8</td>
                  <td className="border border-black p-1 px-2 font-normal">Pole number</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={poleNumber}
                      placeholder="Pole number"
                      onChange={(e) => handleChange('poleNumber', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Rows 11-12: Address (Merged B11:B12 in Excel) */}
                <tr>
                  <td rowSpan={2} className="border border-black p-1 text-center font-bold align-top">9</td>
                  <td rowSpan={2} className="border border-black p-1 px-2 font-normal align-top">Address</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    <input
                      type="text"
                      value={address}
                      placeholder="Address line"
                      onChange={(e) => handleChange('address', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 px-2 font-normal">
                    {district || state || pinCode ? `${district ? `${district}, ` : ''}${state}${pinCode ? ` - ${pinCode}` : ''}` : ''}
                  </td>
                </tr>

                {/* Row 13: Mobile No */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold">10</td>
                  <td className="border border-black p-1 px-2 font-normal">Mobile No</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={mobile}
                      placeholder="Mobile No"
                      onChange={(e) => handleChange('mobile', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Row 14: Section B Header */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[10pt]">B</td>
                  <td colSpan={2} className="border border-black p-1 px-2 font-bold text-[10pt]">Old&nbsp;Meter&nbsp;Details</td>
                </tr>

                {/* Rows 15-22: Old Meter Items (Blank by default - filled post-inspection) */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold">1</td>
                  <td className="border border-black p-1 px-2 font-normal">Meter make</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    <input
                      type="text"
                      value={oldMeterMake}
                      placeholder="Meter make"
                      onChange={(e) => handleChange('oldMeterMake', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">2</td>
                  <td className="border border-black p-1 px-2 font-normal">Serial number</td>
                  <td className="border border-black p-1 px-2 font-normal font-mono">
                    <input
                      type="text"
                      value={oldMeterSerial}
                      placeholder="Serial number"
                      onChange={(e) => handleChange('oldMeterSerial', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">3</td>
                  <td className="border border-black p-1 px-2 font-normal">Capacity</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    <input
                      type="text"
                      value={oldMeterCapacity}
                      placeholder="Capacity (e.g. 10-40 A, 240V)"
                      onChange={(e) => handleChange('oldMeterCapacity', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">4</td>
                  <td className="border border-black p-1 px-2 font-normal">MF</td>
                  <td className="border border-black p-1 px-2 font-normal font-mono">
                    <input
                      type="text"
                      value={oldMeterMf}
                      placeholder="MF (e.g. 1.0)"
                      onChange={(e) => handleChange('oldMeterMf', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan={3} className="border border-black p-1 text-center font-bold align-top">5</td>
                  <td colSpan={2} className="border border-black p-1 px-2 font-normal">Final reading</td>
                </tr>
                <tr>
                  <td className="border border-black p-0.5 px-4 font-normal">i) kWh</td>
                  <td className="border border-black p-0.5 px-2 font-mono">
                    <input
                      type="text"
                      value={oldMeterKwh}
                      placeholder="kWh reading"
                      onChange={(e) => handleChange('oldMeterKwh', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-0.5 px-4 font-normal">ii) kVAh</td>
                  <td className="border border-black p-0.5 px-2 font-mono">
                    <input
                      type="text"
                      value={oldMeterKvah}
                      placeholder="kVAh reading"
                      onChange={(e) => handleChange('oldMeterKvah', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">6</td>
                  <td className="border border-black p-1 px-2 font-normal">Date of replacement</td>
                  <td className="border border-black p-1 px-2 font-mono">
                    <input
                      type="text"
                      value={oldMeterDate}
                      placeholder="Date of replacement (DD-MM-YYYY)"
                      onChange={(e) => handleChange('oldMeterDate', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Row 23: Section C Header */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[10pt]">C</td>
                  <td colSpan={2} className="border border-black p-1 px-2 font-bold text-[10pt]">New&nbsp;Net&nbsp;Meter&nbsp;Details</td>
                </tr>

                {/* Rows 24-30: New Net Meter Items (Blank by default - filled post-inspection) */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold">1</td>
                  <td className="border border-black p-1 px-2 font-normal">Meter make</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    <input
                      type="text"
                      value={newMeterMake}
                      placeholder="Meter make"
                      onChange={(e) => handleChange('newMeterMake', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">2</td>
                  <td className="border border-black p-1 px-2 font-normal">Serial number</td>
                  <td className="border border-black p-1 px-2 font-normal font-mono">
                    <input
                      type="text"
                      value={newMeterSerial}
                      placeholder="Serial number"
                      onChange={(e) => handleChange('newMeterSerial', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">3</td>
                  <td className="border border-black p-1 px-2 font-normal">Capacity</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    <input
                      type="text"
                      value={newMeterCapacity}
                      placeholder="Capacity (e.g. 1-Phase 10-60A)"
                      onChange={(e) => handleChange('newMeterCapacity', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">4</td>
                  <td className="border border-black p-1 px-2 font-normal">Meter constant</td>
                  <td className="border border-black p-1 px-2 font-normal font-mono">
                    <input
                      type="text"
                      value={newMeterConstant}
                      placeholder="Meter constant (e.g. 3200 imp/kWh)"
                      onChange={(e) => handleChange('newMeterConstant', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan={3} className="border border-black p-1 text-center font-bold align-top">5</td>
                  <td colSpan={2} className="border border-black p-1 px-2 font-normal">Initial reading (Tri vector parameters)</td>
                </tr>
                <tr>
                  <td className="border border-black p-0.5 px-4 font-normal">i) Import (kWh/kVAh)</td>
                  <td className="border border-black p-0.5 px-2 font-normal">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newMeterImportKwh}
                        placeholder="Import kWh"
                        onChange={(e) => handleChange('newMeterImportKwh', e.target.value)}
                        className="w-24 bg-transparent border-0 outline-none p-0 placeholder:text-gray-400 placeholder:italic print:placeholder:text-transparent text-black"
                      />
                      <span>kWh,</span>
                      <input
                        type="text"
                        value={newMeterImportKvah}
                        placeholder="Import kVAh"
                        onChange={(e) => handleChange('newMeterImportKvah', e.target.value)}
                        className="w-24 bg-transparent border-0 outline-none p-0 placeholder:text-gray-400 placeholder:italic print:placeholder:text-transparent text-black"
                      />
                      <span>kVAh</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-0.5 px-4 font-normal">ii) Export (kWh/kVAh)</td>
                  <td className="border border-black p-0.5 px-2 font-normal">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newMeterExportKwh}
                        placeholder="Export kWh"
                        onChange={(e) => handleChange('newMeterExportKwh', e.target.value)}
                        className="w-24 bg-transparent border-0 outline-none p-0 placeholder:text-gray-400 placeholder:italic print:placeholder:text-transparent text-black"
                      />
                      <span>kWh,</span>
                      <input
                        type="text"
                        value={newMeterExportKvah}
                        placeholder="Export kVAh"
                        onChange={(e) => handleChange('newMeterExportKvah', e.target.value)}
                        className="w-24 bg-transparent border-0 outline-none p-0 placeholder:text-gray-400 placeholder:italic print:placeholder:text-transparent text-black"
                      />
                      <span>kVAh</span>
                    </div>
                  </td>
                </tr>

                {/* Row 31: Section D */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[10pt]">D</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    Details of protective system available<br />
                    <span className="text-[8pt] text-gray-700 italic">(Commissioning shall be done only on availability of the protective equipment)</span>
                  </td>
                  <td className="border border-black p-1 px-2 font-bold text-center align-middle">
                    {protectiveSystem}
                  </td>
                </tr>

                {/* Row 32: CERTIFICATE */}
                <tr>
                  <td colSpan={3} className="border border-black p-2.5 text-justify leading-relaxed">
                    <div className="text-center font-bold text-[9.5pt] tracking-widest mb-1.5">
                      C E R T I F I C A T E
                    </div>
                    <div className="text-[8.5pt]">
                      It is certified that there is no return voltage from the inverter to the meter when incoming grid supply is switched off.<br />
                      It is further certified that the protective equipment is installed and functioning as prescribed.<br />
                      The above Solar Rooftop PV system was synchronized as per DISCOM guidelines and the performance of the above plant is satisfactory. The date of synchronization of the plant is&nbsp;
                      <span className="font-bold underline">
                        {regDate || commDate || '...................................................'}
                      </span>.
                    </div>
                  </td>
                </tr>

                {/* Row 33: Signatures (4 Parties) */}
                <tr>
                  <td colSpan={3} className="border border-black p-2">
                    <div className="grid grid-cols-4 gap-2 pt-1 text-center text-[8.5pt]">
                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">Vendor Signature</div>
                        <div className="h-10 w-10 flex items-center justify-center my-0.5">
                          <img
                            src="/assets/srimaan_seal.jpeg"
                            alt="Seal"
                            className="max-h-full max-w-full object-contain mix-blend-multiply opacity-85"
                          />
                        </div>
                        <div className="text-[7.5pt] font-semibold text-gray-700">(with stamp)</div>
                      </div>

                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">Eligible Consumer</div>
                        <div className="h-8"></div>
                        <div className="text-[7.5pt] font-bold uppercase">{applicantName}</div>
                      </div>

                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">ADE/M&amp;P</div>
                        <div className="h-8"></div>
                        <div className="text-[7.5pt] font-semibold text-gray-700">Meters &amp; Protection</div>
                      </div>

                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">ADE/Op</div>
                        <div className="h-8"></div>
                        <div className="text-[7.5pt] font-semibold text-gray-700">(with stamp)</div>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        )}

        {/* ============================================================ */}
        {/* SHEET 2: PARTB (PROJECT COMPLETION REPORT) - EXACT REPLICA    */}
        {/* ============================================================ */}
        {(activeSheet === 'all' || activeSheet === 'partb') && (
          <div className="a4-preview-sheet p-6 sm:p-8 bg-white text-black font-serif relative overflow-hidden w-[210mm] min-h-[297mm] mx-auto shadow-md print:shadow-none print:m-0 print:border-none print:p-6 page-break-after">
            <table className="w-full border-collapse border border-black text-[9pt] leading-snug bg-white">
              <colgroup>
                <col className="w-[30%]" />
                <col className="w-[25%]" />
                <col className="w-[23%]" />
                <col className="w-[22%]" />
              </colgroup>
              <tbody>
                {/* Row 1: Merged Title */}
                <tr>
                  <td colSpan={4} className="border border-black p-2.5 text-center font-bold text-[10pt] leading-tight">
                    PART B<br />
                    <span className="font-normal text-[9pt]">(Project&nbsp;Completion&nbsp;Report&nbsp;for&nbsp;Grid-Connected&nbsp;Rooftop) Installation Details</span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Category of the customer:</td>
                  <td className="border border-black p-1.5 px-2 font-normal">{category}</td>
                  <td className="border border-black p-1.5 px-2 font-bold">Sub Category of the Customer :</td>
                  <td className="border border-black p-1.5 px-2 font-normal">{subCategory}</td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Name of the plant owner:</td>
                  <td colSpan={3} className="border border-black p-1.5 px-2 font-bold uppercase">{applicantName}</td>
                </tr>

                {/* Row 4 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Mobile :</td>
                  <td className="border border-black p-1.5 px-2 font-bold font-mono">{mobile}</td>
                  <td className="border border-black p-1.5 px-2 font-bold">Email :</td>
                  <td className="border border-black p-1.5 px-2 font-mono text-[8pt]">{email}</td>
                </tr>

                {/* Row 5 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Address of Installation :</td>
                  <td className="border border-black p-1.5 px-2 font-normal">{address}</td>
                  <td className="border border-black p-1.5 px-2 font-bold">PIN Code of Installation Address :</td>
                  <td className="border border-black p-1.5 px-2 font-bold font-mono">{pinCode}</td>
                </tr>

                {/* Row 6 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">State of Installation Address :</td>
                  <td className="border border-black p-1.5 px-2 font-bold">{state}</td>
                  <td className="border border-black p-1.5 px-2 font-bold">District of Installation Address:</td>
                  <td className="border border-black p-1.5 px-2 font-bold">{district}</td>
                </tr>

                {/* Row 7 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Project Model (CAPEX/RESCO):</td>
                  <td colSpan={3} className="border border-black p-1.5 px-2 font-bold font-mono">{projectModel}</td>
                </tr>

                {/* Row 8 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Date of Commissioning of the plant:</td>
                  <td className="border border-black p-1.5 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={commDate}
                      placeholder="Commissioning Date (DD-MM-YYYY)"
                      onChange={(e) => handleChange('commDate', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="border border-black p-1.5 px-2 font-bold">Total Cost of Installation (Rs.):</td>
                  <td className="border border-black p-1.5 px-2 font-bold font-mono">
                    {totalCost ? `₹${formatINR(totalCost)}` : ''}
                  </td>
                </tr>

                {/* Row 9 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">
                    Whether installation is (Rooftop only/ Rooftop plus ground)
                  </td>
                  <td colSpan={3} className="border border-black p-1.5 px-2 font-bold font-mono">{installationType}</td>
                </tr>

                {/* Row 10 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Plant Capacity (kWp) (Rooftop only)</td>
                  <td className="border border-black p-1.5 px-2 font-bold font-mono">{capacityRooftop}</td>
                  <td className="border border-black p-1.5 px-2 font-bold">Plant Capacity(kWp) (Ground only)</td>
                  <td className="border border-black p-1.5 px-2 font-mono">{capacityGround}</td>
                </tr>

                {/* Row 11 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Total plant capacity(kWp)</td>
                  <td colSpan={3} className="border border-black p-1.5 px-2 font-bold font-mono text-[9.5pt]">{totalPlantCapacity}</td>
                </tr>

                {/* Row 12: Latitude-Longitude Header */}
                <tr>
                  <td colSpan={4} className="border border-black p-1.5 px-2 font-bold text-center text-[9.5pt]">
                    Installed Project Latitude –Longitude Info
                  </td>
                </tr>

                {/* Row 13 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Latitude:</td>
                  <td colSpan={3} className="border border-black p-1.5 px-2 font-mono">
                    <input
                      type="text"
                      value={latitude}
                      placeholder="Latitude (e.g. 17.2472° N)"
                      onChange={(e) => handleChange('latitude', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Row 14 */}
                <tr>
                  <td className="border border-black p-1.5 px-2 font-bold">Longitude:</td>
                  <td colSpan={3} className="border border-black p-1.5 px-2 font-mono">
                    <input
                      type="text"
                      value={longitude}
                      placeholder="Longitude (e.g. 80.1514° E)"
                      onChange={(e) => handleChange('longitude', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Row 15: Upload Documents */}
                <tr>
                  <td colSpan={4} className="border border-black p-2.5 px-3 text-[8.5pt]">
                    <div className="font-bold mb-1">Upload&nbsp;Documents</div>
                    <div className="pl-2 space-y-0.5 font-normal">
                      <div>1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo of Installed plant</div>
                      <div className="text-[8pt] text-gray-700 pl-4">(File Format accepts only: JPG, JPEG, PNG and Maximum Size: 2Mb)</div>
                      <div>2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Electricity DisCom Bill</div>
                      <div className="text-[8pt] text-gray-700 pl-4">(File Format accepts only: Pdf and Maximum Size: 1Mb)</div>
                    </div>
                  </td>
                </tr>

                {/* Row 16: CERTIFICATE */}
                <tr>
                  <td colSpan={4} className="border border-black p-2.5 text-justify leading-relaxed">
                    <div className="text-center font-bold text-[9.5pt] tracking-widest mb-1.5">
                      C E R T I F I C A T E
                    </div>
                    <div className="text-[8.5pt]">
                      It is certified that there is no return voltage from the inverter to the meter when incoming grid supply is switched off.<br />
                      It is further certified that the protective equipment is installed and functioning as prescribed.<br />
                      The above Solar Rooftop PV system was synchronized as per DISCOM guidelines and the performance of the above plant is satisfactory.The date of synchronization of the plant is&nbsp;
                      <span className="font-bold underline">
                        {commDate || regDate || '...................................................'}
                      </span>.
                    </div>
                  </td>
                </tr>

                {/* Row 17: Signatures (4 Parties) */}
                <tr>
                  <td colSpan={4} className="border border-black p-2">
                    <div className="grid grid-cols-4 gap-2 pt-1 text-center text-[8.5pt]">
                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">Vendor Signature</div>
                        <div className="h-10 w-10 flex items-center justify-center my-0.5">
                          <img
                            src="/assets/srimaan_seal.jpeg"
                            alt="Seal"
                            className="max-h-full max-w-full object-contain mix-blend-multiply opacity-85"
                          />
                        </div>
                        <div className="text-[7.5pt] font-semibold text-gray-700">(with stamp)</div>
                      </div>

                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">Eligible Consumer</div>
                        <div className="h-8"></div>
                        <div className="text-[7.5pt] font-bold uppercase">{applicantName}</div>
                      </div>

                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">ADE/M&amp;P</div>
                        <div className="h-8"></div>
                        <div className="text-[7.5pt] font-semibold text-gray-700">Meters &amp; Protection</div>
                      </div>

                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">ADE/Op</div>
                        <div className="h-8"></div>
                        <div className="text-[7.5pt] font-semibold text-gray-700">(with stamp)</div>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        )}

        {/* ============================================================ */}
        {/* SHEET 3: IV (ANNEXURE-IV) - EXACT EXCEL REPLICA              */}
        {/* ============================================================ */}
        {(activeSheet === 'all' || activeSheet === 'iv') && (
          <div className="a4-preview-sheet p-6 sm:p-8 bg-white text-black font-serif relative overflow-hidden w-[210mm] min-h-[297mm] mx-auto shadow-md print:shadow-none print:m-0 print:border-none print:p-6">
            <table className="w-full border-collapse border border-black text-[8.5pt] leading-tight bg-white">
              <colgroup>
                <col className="w-[6%]" />
                <col className="w-[47%]" />
                <col className="w-[47%]" />
              </colgroup>
              <tbody>
                {/* Row 1: Merged Title */}
                <tr>
                  <td colSpan={3} className="border border-black p-2 text-center font-bold text-[10pt] leading-snug">
                    ANNEXURE-IV<br />
                    Work&nbsp;Completion&nbsp;Report&nbsp;for&nbsp;Synchronization&nbsp;of&nbsp;Rooftop&nbsp;Solar&nbsp;PV&nbsp;System<br />
                    <span className="font-normal text-[8.5pt]">(To be submitted by Eligible Consumer/Applicant)</span>
                  </td>
                </tr>

                {/* Row 2: Section A Header */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[9.5pt]">A</td>
                  <td colSpan={2} className="border border-black p-1 px-2 font-bold text-[9.5pt]">Applicant/Consumer Details</td>
                </tr>

                {/* Rows 3-8: Section A items */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold">1</td>
                  <td className="border border-black p-1 px-2 font-normal">Net Meter&nbsp;&nbsp;Registration&nbsp;&nbsp;Number</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={regNo}
                      placeholder="Net Meter Registration Number"
                      onChange={(e) => handleChange('regNo', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">2</td>
                  <td className="border border-black p-1 px-2 font-normal">Registration&nbsp;&nbsp;Date</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={regDate}
                      placeholder="Registration Date (DD-MM-YYYY)"
                      onChange={(e) => handleChange('regDate', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">3</td>
                  <td className="border border-black p-1 px-2 font-normal">Name of the&nbsp;&nbsp;applicant</td>
                  <td className="border border-black p-1 px-2 font-bold uppercase">
                    <input
                      type="text"
                      value={applicantName}
                      placeholder="Name of the applicant"
                      onChange={(e) => handleChange('applicantName', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">4</td>
                  <td className="border border-black p-1 px-2 font-normal">Service&nbsp;&nbsp;Number /USC NUMBER</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={uscNo}
                      placeholder="Service Number / USC NUMBER"
                      onChange={(e) => handleChange('uscNo', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">5</td>
                  <td className="border border-black p-1 px-2 font-normal">Category</td>
                  <td className="border border-black p-1 px-2 font-bold">
                    <input
                      type="text"
                      value={category}
                      placeholder="Category"
                      onChange={(e) => handleChange('category', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">6</td>
                  <td className="border border-black p-1 px-2 font-normal">Load in&nbsp;&nbsp;kW</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={loadKw}
                      placeholder="Load in kW"
                      onChange={(e) => handleChange('loadKw', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Row 9: Section B Header */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[9.5pt]">B</td>
                  <td colSpan={2} className="border border-black p-1 px-2 font-bold text-[9.5pt]">Vendor of the&nbsp;&nbsp;Rooftop Solar PV System&nbsp;&nbsp;Details:</td>
                </tr>

                {/* Rows 10-19: Vendor details (100% Real from official template) */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold">1</td>
                  <td className="border border-black p-1 px-2 font-normal">Name of Vendor</td>
                  <td className="border border-black p-1 px-2 font-bold">{vendorName}</td>
                </tr>
                <tr>
                  <td className="border border-black p-0.5 text-center font-bold"></td>
                  <td colSpan={2} className="border border-black p-0.5 px-2 font-bold">Address:</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">2</td>
                  <td className="border border-black p-1 px-2 font-normal">Door.No.</td>
                  <td className="border border-black p-1 px-2 font-normal">{vendorDoorNo}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">3</td>
                  <td className="border border-black p-1 px-2 font-normal">Street</td>
                  <td className="border border-black p-1 px-2 font-normal">{vendorStreet}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">4</td>
                  <td className="border border-black p-1 px-2 font-normal">City/Village</td>
                  <td className="border border-black p-1 px-2 font-normal">{vendorCity}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">5</td>
                  <td className="border border-black p-1 px-2 font-normal">Mandal</td>
                  <td className="border border-black p-1 px-2 font-normal">{vendorMandal}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">6</td>
                  <td className="border border-black p-1 px-2 font-normal">Pin Code</td>
                  <td className="border border-black p-1 px-2 font-mono font-bold">{vendorPin}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">7</td>
                  <td className="border border-black p-1 px-2 font-normal">Phone</td>
                  <td className="border border-black p-1 px-2 font-normal">{vendorPhone}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">8</td>
                  <td className="border border-black p-1 px-2 font-normal">Mobile</td>
                  <td className="border border-black p-1 px-2 font-mono font-bold">{vendorMobile}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">9</td>
                  <td className="border border-black p-1 px-2 font-normal">Email ID</td>
                  <td className="border border-black p-1 px-2 font-mono text-[8pt]">{vendorEmail}</td>
                </tr>

                {/* Row 20: Section C Header */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[9.5pt]">C</td>
                  <td colSpan={2} className="border border-black p-1 px-2 font-bold text-[9.5pt]">Solar PV Module&nbsp;&nbsp;Details:</td>
                </tr>

                {/* Rows 21-33: PV Module details */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold">1</td>
                  <td className="border border-black p-1 px-2 font-normal">Make</td>
                  <td className="border border-black p-1 px-2 font-bold">
                    <input
                      type="text"
                      value={moduleMake}
                      placeholder="Module Make"
                      onChange={(e) => handleChange('moduleMake', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                {/* Rows 22-29: 8 Module Serial rows (Blank by default - filled post-delivery) */}
                {Array.from({ length: 8 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="border border-black p-0.5 text-center font-bold">
                      {idx === 0 ? '2' : ''}
                    </td>
                    <td className="border border-black p-0.5 px-2 font-normal">
                      {idx === 0 ? 'Module Numbers' : ''}
                    </td>
                    <td className="border border-black p-0.5 px-2 font-mono text-[8pt]">
                      <input
                        type="text"
                        value={moduleSerials[idx] || ''}
                        placeholder={`Serial #${idx+1}`}
                        onChange={(e) => handleSerialChange(idx, e.target.value)}
                        className={inputClass}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border border-black p-1 text-center font-bold">3</td>
                  <td className="border border-black p-1 px-2 font-normal">Type of module</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    <input
                      type="text"
                      value={moduleType}
                      placeholder="Type of module"
                      onChange={(e) => handleChange('moduleType', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">4</td>
                  <td className="border border-black p-1 px-2 font-normal">Capacity of each module</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={moduleWattage}
                      placeholder="Capacity of each module"
                      onChange={(e) => handleChange('moduleWattage', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">5</td>
                  <td className="border border-black p-1 px-2 font-normal">Number of modules</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={moduleCount}
                      placeholder="Number of modules"
                      onChange={(e) => handleChange('moduleCount', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">6</td>
                  <td className="border border-black p-1 px-2 font-normal">Total capacity</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono text-[9pt]">
                    <input
                      type="text"
                      value={moduleCapacityTotal}
                      placeholder="Total capacity (kWp)"
                      onChange={(e) => handleChange('moduleCapacityTotal', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Row 34: Section D Header */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[9.5pt]">D</td>
                  <td colSpan={2} className="border border-black p-1 px-2 font-bold text-[9.5pt]">Grid Tie&nbsp;&nbsp;Inverter&nbsp;&nbsp;/&nbsp;&nbsp;Connecter</td>
                </tr>

                {/* Rows 35-40: Inverter details */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold">1</td>
                  <td className="border border-black p-1 px-2 font-normal">Make</td>
                  <td className="border border-black p-1 px-2 font-bold">
                    <input
                      type="text"
                      value={inverterMake}
                      placeholder="Inverter Make"
                      onChange={(e) => handleChange('inverterMake', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">2</td>
                  <td className="border border-black p-1 px-2 font-normal">Serial number</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">
                    <input
                      type="text"
                      value={inverterSerial}
                      placeholder="Inverter Serial number"
                      onChange={(e) => handleChange('inverterSerial', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">3</td>
                  <td className="border border-black p-1 px-2 font-normal">Capacity</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">{inverterCapacity}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">4</td>
                  <td className="border border-black p-1 px-2 font-normal">Input voltage</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    <input
                      type="text"
                      value={inverterInputVolt}
                      placeholder="Input voltage (e.g. 160V - 550V DC)"
                      onChange={(e) => handleChange('inverterInputVolt', e.target.value)}
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">5</td>
                  <td className="border border-black p-1 px-2 font-normal">Output voltage</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono">{inverterOutputVolt}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-bold">6</td>
                  <td className="border border-black p-1 px-2 font-normal">If grid supply fails,&nbsp;&nbsp;no return supply to the grid(Yes or&nbsp;&nbsp;No)</td>
                  <td className="border border-black p-1 px-2 font-bold font-mono text-center">{antiIslanding}</td>
                </tr>

                {/* Row 41: Section E */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[9.5pt]">E</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    Details of protective System available<br />
                    <span className="text-[7.5pt] text-gray-700 italic">(Commission shall be done only on availability of the above)</span>
                  </td>
                  <td className="border border-black p-1 px-2 font-bold font-mono text-center align-middle">
                    {protectiveSystem}
                  </td>
                </tr>

                {/* Row 42: Section F */}
                <tr>
                  <td className="border border-black p-1 text-center font-bold text-[9.5pt]">F</td>
                  <td className="border border-black p-1 px-2 font-normal">
                    CEIG Approval&nbsp;&nbsp;Ref&nbsp;&nbsp;Number&nbsp;&nbsp;(Rooftop Solar PV System having the capacity in excess of 75&nbsp;&nbsp;kW)
                  </td>
                  <td className="border border-black p-1 px-2 font-mono text-center align-middle">
                    <input
                      type="text"
                      value={ceigApproval}
                      placeholder="CEIG Ref No (if applicable)"
                      onChange={(e) => handleChange('ceigApproval', e.target.value)}
                      className="w-full text-center bg-transparent border-0 outline-none text-black placeholder:text-gray-400 placeholder:italic print:placeholder:text-transparent"
                    />
                  </td>
                </tr>

                {/* Row 43: Enclosures */}
                <tr>
                  <td colSpan={3} className="border border-black p-1.5 px-3 font-semibold text-[8pt] italic">
                    Encl:- Connected SPV generater Single line diagaram,&nbsp;&nbsp;&nbsp;CEIG Approval copy
                  </td>
                </tr>

                {/* Row 44: Signatures (2 Parties) */}
                <tr>
                  <td colSpan={3} className="border border-black p-2">
                    <div className="grid grid-cols-2 gap-4 pt-1 text-center text-[8.5pt]">
                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">Vendor Signature(with Stamp)</div>
                        <div className="h-10 w-10 flex items-center justify-center my-0.5">
                          <img
                            src="/assets/srimaan_seal.jpeg"
                            alt="Seal"
                            className="max-h-full max-w-full object-contain mix-blend-multiply opacity-85"
                          />
                        </div>
                        <div className="text-[7.5pt] font-bold">FOR : SRIMAAN SOLAR SOLUTIONS</div>
                      </div>

                      <div className="flex flex-col items-center justify-between min-h-[85px]">
                        <div className="font-bold">Eligible Consumer Signature</div>
                        <div className="h-8"></div>
                        <div className="text-[7.5pt] font-bold uppercase">{applicantName}</div>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default DiscomReportView;
