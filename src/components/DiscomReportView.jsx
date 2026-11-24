import React, { useState, useEffect } from 'react';
import { formatINR, formatDateToPDFStyle } from '../utils/calculations';
import { 
  FileText, 
  RotateCcw, 
  Pencil, 
  Printer, 
  Building2, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  FileCheck
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
  const cost = Number(pricing.bankCost !== undefined ? pricing.bankCost : (pricing.totalCost || pricing.customerCost || 220000));

  const getInitialState = () => {
    return {
      // General & Applicant
      regNo: initialDiscom.regNo || customer.consumerNo ? `TS-NPDCL-NM-${customer.consumerNo || '2026-8491'}` : 'TS-NPDCL-NM-2026-8491',
      regDate: initialDiscom.regDate || quotation?.date || '22-NOV-2026',
      applicantName: initialDiscom.applicantName || customer.name || 'GURRAM ANITHA',
      uscNo: initialDiscom.uscNo || customer.consumerNo || 'NP-TSNPD26-10416694',
      category: initialDiscom.category || 'LT-I Domestic',
      subCategory: initialDiscom.subCategory || 'Individual Residential',
      loadKw: initialDiscom.loadKw || `${capacity} kW`,
      distributionSection: initialDiscom.distributionSection || `${customer.district || 'Khammam'} Rural / Auto Nagar`,
      poleNumber: initialDiscom.poleNumber || 'KHM-TR-42/08',
      address: initialDiscom.address || `${customer.addressLine1 || customer.address || 'HNO 5-1-4, BALAPETA'}, ${customer.district || 'Khammam'} - ${customer.pinCode || customer.pincode || '507003'}`,
      mobile: initialDiscom.mobile || customer.phone || customer.mobile || '9848163232',
      email: initialDiscom.email || customer.email || 'Ramanareddy1632@gmail.com',
      district: initialDiscom.district || customer.district || 'Khammam',
      state: initialDiscom.state || customer.state || 'TELANGANA',
      pinCode: initialDiscom.pinCode || customer.pinCode || customer.pincode || '507003',
      
      // Part B Installation
      projectModel: initialDiscom.projectModel || 'CAPEX',
      commDate: initialDiscom.commDate || quotation?.date || '22-NOV-2026',
      totalCost: initialDiscom.totalCost !== undefined ? initialDiscom.totalCost : cost,
      installationType: initialDiscom.installationType || 'ROOFTOP ONLY',
      capacityRooftop: initialDiscom.capacityRooftop || `${totalKwp} kWp`,
      capacityGround: initialDiscom.capacityGround || '0 kWp',
      totalPlantCapacity: initialDiscom.totalPlantCapacity || `${totalKwp} kWp`,
      latitude: initialDiscom.latitude || '17.2472° N',
      longitude: initialDiscom.longitude || '80.1514° E',

      // Old Meter
      oldMeterMake: initialDiscom.oldMeterMake || 'L&T / Secure',
      oldMeterSerial: initialDiscom.oldMeterSerial || 'LT-8941204',
      oldMeterCapacity: initialDiscom.oldMeterCapacity || '10-40 A, 240V',
      oldMeterMf: initialDiscom.oldMeterMf || '1.0',
      oldMeterKwh: initialDiscom.oldMeterKwh || '14820',
      oldMeterKvah: initialDiscom.oldMeterKvah || '15110',
      oldMeterDate: initialDiscom.oldMeterDate || quotation?.date || '22-NOV-2026',

      // New Net Meter
      newMeterMake: initialDiscom.newMeterMake || 'Schneider / Secure Bi-Directional',
      newMeterSerial: initialDiscom.newMeterSerial || 'SNM-2026-99214',
      newMeterCapacity: initialDiscom.newMeterCapacity || '1-Phase 10-60A (Bi-Directional)',
      newMeterConstant: initialDiscom.newMeterConstant || '3200 imp/kWh',
      newMeterImportKwh: initialDiscom.newMeterImportKwh || '00000.0',
      newMeterImportKvah: initialDiscom.newMeterImportKvah || '00000.0',
      newMeterExportKwh: initialDiscom.newMeterExportKwh || '00000.0',
      newMeterExportKvah: initialDiscom.newMeterExportKvah || '00000.0',
      protectiveSystem: initialDiscom.protectiveSystem || 'YES',

      // Modules
      moduleMake: initialDiscom.moduleMake || system.moduleBrand || 'Waaree Energies Ltd (Tier-1 ALMM)',
      moduleType: initialDiscom.moduleType || 'Mono PERC / N-Type TOPCon Bi-facial',
      moduleWattage: initialDiscom.moduleWattage || `${defaultPanelWattage} Wp`,
      moduleCount: initialDiscom.moduleCount || `${panelsCount} Nos`,
      moduleCapacityTotal: initialDiscom.moduleCapacityTotal || `${totalKwp} kWp`,
      moduleSerials: initialDiscom.moduleSerials || [
        'WAA-550-26-8801', 'WAA-550-26-8802', 'WAA-550-26-8803',
        'WAA-550-26-8804', 'WAA-550-26-8805', 'WAA-550-26-8806'
      ],

      // Inverter
      inverterMake: initialDiscom.inverterMake || system.inverterBrand || 'Sungrow / Growatt Smart Grid-Tied Inverter',
      inverterSerial: initialDiscom.inverterSerial || 'SG-2026-INV-94021',
      inverterCapacity: initialDiscom.inverterCapacity || '550 VDC',
      inverterInputVolt: initialDiscom.inverterInputVolt || '160V - 550V DC',
      inverterOutputVolt: initialDiscom.inverterOutputVolt || '240 V (Single Phase AC)',
      antiIslanding: initialDiscom.antiIslanding || 'YES',
      ceigApproval: initialDiscom.ceigApproval || 'N/A (Exempted - Capacity <= 75 kW)',

      // Vendor Credentials
      vendorName: 'SRIMAAN SOLAR SOLUTIONS',
      vendorDoorNo: '# 6-210,SRIRAM NAGAR,',
      vendorStreet: 'BEHIND AUTO NAGAR',
      vendorCity: 'WARANGAL X ROAD ,KHAMMAM',
      vendorMandal: 'KHAMMAM RURAL',
      vendorPin: '507003',
      vendorPhone: '08742-295140',
      vendorMobile: '9347416140',
      vendorEmail: 'Ravindrachary1972@gmail.com',
      signatoryName: 'T. Ravindra Chary'
    };
  };

  const [discomData, setDiscomData] = useState(getInitialState);
  const [activeSheet, setActiveSheet] = useState('all'); // 'all', 'annexure-v', 'part-b', 'annexure-iv'
  const [isInlineEditing, setIsInlineEditing] = useState(false);

  useEffect(() => {
    setDiscomData(getInitialState());
  }, [quotation?.id, quotation?.date, pricing.bankCost, pricing.totalCost]);

  const handleChange = (field, value) => {
    setDiscomData(prev => {
      const updated = { ...prev, [field]: value };
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
    vendorMobile, vendorEmail, signatoryName
  } = discomData;

  return (
    <div className="w-full flex flex-col items-center">
      {/* ============================================================== */}
      {/* INTERACTIVE TOOLBAR (Hidden in Print)                          */}
      {/* ============================================================== */}
      <div className="no-print w-full max-w-[210mm] mb-4 p-3 bg-white border border-slate-300 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-teal-900 text-teal-300 font-bold">
            <Layers size={18} />
          </span>
          <div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-2">
              <span>DISCOM Net-Metering Synchronization Package</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold border border-teal-300">
                TSNPDCL / TSSPDCL Approved
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              3 Statutory Synchronization &amp; Work Completion Reports
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
                ? 'bg-white text-teal-950 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 3 Reports (3P)
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('annexure-v')}
            className={`px-2 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
              activeSheet === 'annexure-v' 
                ? 'bg-teal-700 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            VB (Annexure-V(b))
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('part-b')}
            className={`px-2 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
              activeSheet === 'part-b' 
                ? 'bg-teal-700 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            PARTB (Part B)
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('annexure-iv')}
            className={`px-2 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
              activeSheet === 'annexure-iv' 
                ? 'bg-teal-700 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            IV (Annexure-IV)
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsInlineEditing(!isInlineEditing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              isInlineEditing 
                ? 'bg-teal-600 text-white shadow-xs' 
                : 'bg-teal-50 text-teal-900 border border-teal-300 hover:bg-teal-100'
            }`}
          >
            <Pencil size={13} />
            <span>{isInlineEditing ? '✓ Inline Edit: ON' : 'Quick Inline Edit'}</span>
          </button>

          <a
            href="/DISCOM_REPORT.xlsx"
            download="DISCOM_REPORT.xlsx"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
            title="Download authentic multi-sheet DISCOM Excel workbook"
          >
            <Download size={13} />
            <span>Export Excel</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
            title="Reset to default quotation parameters"
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
        {/* SHEET 1: ANNEXURE-V(b)                                       */}
        {/* ============================================================ */}
        {(activeSheet === 'all' || activeSheet === 'annexure-v') && (
          <div className="a4-preview-sheet p-6 sm:p-8 bg-white text-black font-sans relative overflow-hidden w-[210mm] min-h-[297mm] mx-auto shadow-lg flex flex-col justify-between print:shadow-none print:m-0 print:border-none page-break-after">
            <div className="border-[2px] border-black h-full flex flex-col p-0 overflow-hidden text-[9pt]">
              
              {/* Header Banner */}
              <div className="py-2 px-3 border-b-2 border-black text-center bg-[#0b1b3d] text-white">
                <div className="text-[10pt] font-mono font-bold tracking-widest text-amber-400">ANNEXURE-V(b)</div>
                <h1 className="text-xs sm:text-sm font-black tracking-wide uppercase font-serif text-white">
                  LT NET METER Solar Rooftop PV system Synchronization Report / Test Report
                </h1>
              </div>

              {/* SECTION A: APPLICANT DETAILS */}
              <div className="border-b-2 border-black">
                <div className="bg-slate-100 px-3 py-1 font-black text-[9pt] border-b border-black text-black uppercase flex items-center justify-between">
                  <span>A. Applicant Details</span>
                  <span className="font-mono text-[8pt] text-gray-600">Form Ref: TSNPDCL / TSSPDCL LT-NM</span>
                </div>
                <table className="w-full border-collapse text-[8.5pt]">
                  <tbody className="divide-y divide-black">
                    <tr>
                      <td className="w-8 py-1 px-2 text-center font-bold border-r border-black">1</td>
                      <td className="w-64 py-1 px-2 font-bold text-gray-800 border-r border-black">Net Meter Registration Number</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={regNo}
                            onChange={(e) => handleChange('regNo', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                          />
                        ) : regNo}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">2</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Registration Date</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={regDate}
                            onChange={(e) => handleChange('regDate', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                          />
                        ) : regDate}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">3</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Name of the applicant</td>
                      <td className="py-1 px-2 font-black text-black uppercase" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={applicantName}
                            onChange={(e) => handleChange('applicantName', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-black px-1 outline-none"
                          />
                        ) : applicantName}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">4</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Service Number / USC Number</td>
                      <td className="py-1 px-2 font-mono font-extrabold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={uscNo}
                            onChange={(e) => handleChange('uscNo', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                          />
                        ) : uscNo}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">5</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Category</td>
                      <td className="py-1 px-2 font-bold text-black" colSpan={2}>{category}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">6</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Load</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>{loadKw}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">7</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Distribution / Section</td>
                      <td className="py-1 px-2 font-semibold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={distributionSection}
                            onChange={(e) => handleChange('distributionSection', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-semibold px-1 outline-none"
                          />
                        ) : distributionSection}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">8</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Pole number</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={poleNumber}
                            onChange={(e) => handleChange('poleNumber', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                          />
                        ) : poleNumber}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">9</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Address</td>
                      <td className="py-1 px-2 text-gray-900 font-medium" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 px-1 outline-none"
                          />
                        ) : address}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">10</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Mobile No</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>{mobile}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SECTION B: OLD METER DETAILS */}
              <div className="border-b-2 border-black">
                <div className="bg-slate-100 px-3 py-1 font-black text-[9pt] border-b border-black text-black uppercase">
                  B. Old Meter Details
                </div>
                <table className="w-full border-collapse text-[8.5pt]">
                  <tbody className="divide-y divide-black">
                    <tr>
                      <td className="w-8 py-1 px-2 text-center font-bold border-r border-black">1</td>
                      <td className="w-64 py-1 px-2 font-bold text-gray-800 border-r border-black">Meter make</td>
                      <td className="py-1 px-2 font-semibold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={oldMeterMake}
                            onChange={(e) => handleChange('oldMeterMake', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-semibold px-1 outline-none"
                          />
                        ) : oldMeterMake}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">2</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Serial number</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={oldMeterSerial}
                            onChange={(e) => handleChange('oldMeterSerial', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                          />
                        ) : oldMeterSerial}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">3</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Capacity</td>
                      <td className="py-1 px-2 font-mono font-semibold text-black" colSpan={2}>{oldMeterCapacity}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">4</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">MF (Multiplying Factor)</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>{oldMeterMf}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black align-top" rowSpan={3}>5</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black" colSpan={3}>Final reading</td>
                    </tr>
                    <tr>
                      <td className="py-0.5 px-3 font-semibold text-gray-700 border-r border-black">i) kWh</td>
                      <td className="py-0.5 px-2 font-mono font-bold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={oldMeterKwh}
                            onChange={(e) => handleChange('oldMeterKwh', e.target.value)}
                            className="w-32 bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                          />
                        ) : oldMeterKwh}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-0.5 px-3 font-semibold text-gray-700 border-r border-black">ii) kVAh</td>
                      <td className="py-0.5 px-2 font-mono font-bold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={oldMeterKvah}
                            onChange={(e) => handleChange('oldMeterKvah', e.target.value)}
                            className="w-32 bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                          />
                        ) : oldMeterKvah}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">6</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Date of replacement</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>{oldMeterDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SECTION C: NEW NET METER DETAILS */}
              <div className="border-b-2 border-black">
                <div className="bg-slate-100 px-3 py-1 font-black text-[9pt] border-b border-black text-black uppercase">
                  C. New Net Meter Details
                </div>
                <table className="w-full border-collapse text-[8.5pt]">
                  <tbody className="divide-y divide-black">
                    <tr>
                      <td className="w-8 py-1 px-2 text-center font-bold border-r border-black">1</td>
                      <td className="w-64 py-1 px-2 font-bold text-gray-800 border-r border-black">Meter make</td>
                      <td className="py-1 px-2 font-semibold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={newMeterMake}
                            onChange={(e) => handleChange('newMeterMake', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-semibold px-1 outline-none"
                          />
                        ) : newMeterMake}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">2</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Serial number</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={newMeterSerial}
                            onChange={(e) => handleChange('newMeterSerial', e.target.value)}
                            className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                          />
                        ) : newMeterSerial}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">3</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Capacity</td>
                      <td className="py-1 px-2 font-mono font-semibold text-black" colSpan={2}>{newMeterCapacity}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">4</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Meter constant</td>
                      <td className="py-1 px-2 font-mono font-bold text-black" colSpan={2}>{newMeterConstant}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black align-top" rowSpan={3}>5</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black" colSpan={3}>
                        Initial reading (Tri vector parameters)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-0.5 px-3 font-semibold text-gray-700 border-r border-black">i) Import (kWh/kVAh)</td>
                      <td className="py-0.5 px-2 font-mono font-bold text-black" colSpan={2}>
                        {newMeterImportKwh} kWh, &nbsp;&nbsp; {newMeterImportKvah} kVAh
                      </td>
                    </tr>
                    <tr>
                      <td className="py-0.5 px-3 font-semibold text-gray-700 border-r border-black">ii) Export (kWh/kVAh)</td>
                      <td className="py-0.5 px-2 font-mono font-bold text-black" colSpan={2}>
                        {newMeterExportKwh} kWh, &nbsp;&nbsp; {newMeterExportKvah} kVAh
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SECTION D: PROTECTIVE SYSTEM */}
              <div className="border-b-2 border-black p-2.5 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-black text-black">D. Details of protective system available :</span>
                  <p className="text-[7.5pt] text-gray-600 font-semibold italic">
                    (Commissioning shall be done only on availability of the protective equipment)
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-emerald-400 rounded text-emerald-900 font-black font-mono">
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  <span>YES</span>
                </div>
              </div>

              {/* CERTIFICATE STATEMENT */}
              <div className="p-3 border-b-2 border-black bg-amber-50/40 text-center space-y-1">
                <div className="font-serif font-black tracking-widest text-[9.5pt] uppercase underline">
                  C E R T I F I C A T E
                </div>
                <p className="text-[8pt] text-gray-800 leading-relaxed font-semibold italic text-justify px-2">
                  It is certified that there is no return voltage from the inverter to the meter when incoming grid supply is switched off.
                  It is further certified that the protective equipment is installed and functioning as prescribed.
                  The above Solar Rooftop PV system was synchronized as per DISCOM guidelines and the performance of the above plant is satisfactory.
                  The date of synchronization of the plant is <strong className="font-mono text-black underline font-bold">{regDate}</strong>.
                </p>
              </div>

              {/* SIGNATURES BLOCK (4 PARTIES) */}
              <div className="grid grid-cols-4 divide-x-2 divide-black text-[8pt] text-center min-h-[95px]">
                {/* Vendor Signature & Stamp */}
                <div className="p-2 flex flex-col justify-between items-center relative">
                  <div className="font-bold text-gray-900 uppercase">Vendor Signature</div>
                  <div className="h-10 w-10 flex items-center justify-center relative">
                    <img
                      src="/assets/srimaan_seal.jpeg"
                      alt="Official Seal"
                      className="max-h-full max-w-full object-contain mix-blend-multiply opacity-80 rotate-[-5deg]"
                    />
                  </div>
                  <div>
                    <div className="font-extrabold text-black uppercase text-[7.5pt]">SRIMAAN SOLAR SOLUTIONS</div>
                    <div className="text-[7pt] text-gray-500 font-medium">(with stamp)</div>
                  </div>
                </div>

                {/* Eligible Consumer */}
                <div className="p-2 flex flex-col justify-between items-center">
                  <div className="font-bold text-gray-900 uppercase">Eligible Consumer</div>
                  <div className="h-8"></div>
                  <div>
                    <div className="font-extrabold text-black uppercase text-[7.5pt]">{applicantName}</div>
                    <div className="text-[7pt] text-gray-500 font-medium">(Applicant Signature)</div>
                  </div>
                </div>

                {/* ADE / M&P */}
                <div className="p-2 flex flex-col justify-between items-center">
                  <div className="font-bold text-gray-900 uppercase">ADE / M&amp;P</div>
                  <div className="h-8"></div>
                  <div>
                    <div className="font-extrabold text-black uppercase text-[7.5pt]">Meters &amp; Protection</div>
                    <div className="text-[7pt] text-gray-500 font-medium">TSNPDCL Division</div>
                  </div>
                </div>

                {/* ADE / Op */}
                <div className="p-2 flex flex-col justify-between items-center">
                  <div className="font-bold text-gray-900 uppercase">ADE / Op</div>
                  <div className="h-8"></div>
                  <div>
                    <div className="font-extrabold text-black uppercase text-[7.5pt]">Operations &amp; Maintenance</div>
                    <div className="text-[7pt] text-gray-500 font-medium">(with stamp)</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SHEET 2: PART B (PROJECT COMPLETION REPORT)                  */}
        {/* ============================================================ */}
        {(activeSheet === 'all' || activeSheet === 'part-b') && (
          <div className="a4-preview-sheet p-6 sm:p-8 bg-white text-black font-sans relative overflow-hidden w-[210mm] min-h-[297mm] mx-auto shadow-lg flex flex-col justify-between print:shadow-none print:m-0 print:border-none page-break-after">
            <div className="border-[2px] border-black h-full flex flex-col p-0 overflow-hidden text-[9pt]">
              
              {/* Header Banner */}
              <div className="py-2.5 px-3 border-b-2 border-black text-center bg-[#0b1b3d] text-white">
                <div className="text-[10pt] font-mono font-bold tracking-widest text-amber-400">PART B</div>
                <h1 className="text-xs sm:text-sm font-black tracking-wide uppercase font-serif text-white">
                  Project Completion Report for Grid-Connected Rooftop (Installation Details)
                </h1>
              </div>

              {/* Form Grid */}
              <div className="divide-y divide-black text-[8.5pt]">
                
                {/* Row 1 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Category of the customer :</div>
                  <div className="col-span-3 p-1.5 font-semibold text-black">{category}</div>
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Sub Category of Customer :</div>
                  <div className="col-span-3 p-1.5 font-semibold text-black">{subCategory}</div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Name of the plant owner :</div>
                  <div className="col-span-9 p-1.5 font-black text-black uppercase">{applicantName}</div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Mobile :</div>
                  <div className="col-span-3 p-1.5 font-mono font-bold text-black">{mobile}</div>
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Email :</div>
                  <div className="col-span-3 p-1.5 font-mono text-black">{email}</div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Address of Installation :</div>
                  <div className="col-span-3 p-1.5 font-medium text-black">{address}</div>
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">PIN Code of Installation :</div>
                  <div className="col-span-3 p-1.5 font-mono font-bold text-black">{pinCode}</div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">State of Installation :</div>
                  <div className="col-span-3 p-1.5 font-bold text-black">{state}</div>
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">District of Installation :</div>
                  <div className="col-span-3 p-1.5 font-bold text-black">{district}</div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Project Model (CAPEX/RESCO) :</div>
                  <div className="col-span-3 p-1.5 font-black text-emerald-800 font-mono">{projectModel}</div>
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Total Cost of Installation :</div>
                  <div className="col-span-3 p-1.5 font-mono font-extrabold text-black">₹{formatINR(totalCost)}</div>
                </div>

                {/* Row 7 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Date of Commissioning :</div>
                  <div className="col-span-3 p-1.5 font-mono font-bold text-black">{commDate}</div>
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Installation Type :</div>
                  <div className="col-span-3 p-1.5 font-black text-black font-mono">{installationType}</div>
                </div>

                {/* Row 8 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Plant Capacity (Rooftop only) :</div>
                  <div className="col-span-3 p-1.5 font-mono font-bold text-black">{capacityRooftop}</div>
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Plant Capacity (Ground only) :</div>
                  <div className="col-span-3 p-1.5 font-mono text-gray-600">{capacityGround}</div>
                </div>

                {/* Row 9 */}
                <div className="grid grid-cols-12 divide-x divide-black bg-slate-50">
                  <div className="col-span-3 p-2 font-black text-black">Total Plant Capacity (kWp) :</div>
                  <div className="col-span-9 p-2 font-mono font-extrabold text-[10pt] text-teal-900">
                    {totalPlantCapacity}
                  </div>
                </div>

                {/* Coordinates */}
                <div className="p-2 bg-slate-100 font-black text-[9pt] border-t border-black uppercase text-black">
                  Installed Project Latitude – Longitude Info
                </div>
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Latitude :</div>
                  <div className="col-span-3 p-1.5 font-mono font-bold text-black">
                    {isInlineEditing ? (
                      <input
                        type="text"
                        value={latitude}
                        onChange={(e) => handleChange('latitude', e.target.value)}
                        className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                      />
                    ) : latitude}
                  </div>
                  <div className="col-span-3 p-1.5 font-bold text-gray-800 bg-slate-50">Longitude :</div>
                  <div className="col-span-3 p-1.5 font-mono font-bold text-black">
                    {isInlineEditing ? (
                      <input
                        type="text"
                        value={longitude}
                        onChange={(e) => handleChange('longitude', e.target.value)}
                        className="w-full bg-teal-50 border-b border-dashed border-teal-600 font-mono font-bold px-1 outline-none"
                      />
                    ) : longitude}
                  </div>
                </div>

                {/* Upload Documents Checklist */}
                <div className="p-2.5 bg-slate-50 space-y-1">
                  <div className="font-bold text-black text-[8.5pt]">Upload Documents Mandate:</div>
                  <div className="text-[8pt] text-gray-700 pl-3 space-y-0.5">
                    <div>1) Photo of Installed plant (JPG, JPEG, PNG format, Max size: 2Mb) &bull; <strong className="text-emerald-700">ATTACHED</strong></div>
                    <div>2) Electricity DisCom Bill (PDF format, Max size: 1Mb) &bull; <strong className="text-emerald-700">ATTACHED</strong></div>
                  </div>
                </div>

              </div>

              {/* CERTIFICATE STATEMENT */}
              <div className="p-3 border-y-2 border-black bg-amber-50/40 text-center space-y-1 my-auto">
                <div className="font-serif font-black tracking-widest text-[9.5pt] uppercase underline">
                  C E R T I F I C A T E
                </div>
                <p className="text-[8pt] text-gray-800 leading-relaxed font-semibold italic text-justify px-2">
                  It is certified that there is no return voltage from the inverter to the meter when incoming grid supply is switched off.
                  It is further certified that the protective equipment is installed and functioning as prescribed.
                  The above Solar Rooftop PV system was synchronized as per DISCOM guidelines and the performance of the above plant is satisfactory.
                  The date of synchronization of the plant is <strong className="font-mono text-black underline font-bold">{commDate}</strong>.
                </p>
              </div>

              {/* SIGNATURES BLOCK */}
              <div className="grid grid-cols-4 divide-x-2 divide-black text-[8pt] text-center min-h-[95px] border-t-2 border-black">
                <div className="p-2 flex flex-col justify-between items-center relative">
                  <div className="font-bold text-gray-900 uppercase">Vendor Signature</div>
                  <div className="h-10 w-10 flex items-center justify-center relative">
                    <img
                      src="/assets/srimaan_seal.jpeg"
                      alt="Official Seal"
                      className="max-h-full max-w-full object-contain mix-blend-multiply opacity-80 rotate-[-5deg]"
                    />
                  </div>
                  <div>
                    <div className="font-extrabold text-black uppercase text-[7.5pt]">SRIMAAN SOLAR SOLUTIONS</div>
                    <div className="text-[7pt] text-gray-500 font-medium">(with stamp)</div>
                  </div>
                </div>

                <div className="p-2 flex flex-col justify-between items-center">
                  <div className="font-bold text-gray-900 uppercase">Eligible Consumer</div>
                  <div className="h-8"></div>
                  <div>
                    <div className="font-extrabold text-black uppercase text-[7.5pt]">{applicantName}</div>
                    <div className="text-[7pt] text-gray-500 font-medium">(Applicant Signature)</div>
                  </div>
                </div>

                <div className="p-2 flex flex-col justify-between items-center">
                  <div className="font-bold text-gray-900 uppercase">ADE / M&amp;P</div>
                  <div className="h-8"></div>
                  <div>
                    <div className="font-extrabold text-black uppercase text-[7.5pt]">Meters &amp; Protection</div>
                    <div className="text-[7pt] text-gray-500 font-medium">TSNPDCL Division</div>
                  </div>
                </div>

                <div className="p-2 flex flex-col justify-between items-center">
                  <div className="font-bold text-gray-900 uppercase">ADE / Op</div>
                  <div className="h-8"></div>
                  <div>
                    <div className="font-extrabold text-black uppercase text-[7.5pt]">Operations &amp; Maintenance</div>
                    <div className="text-[7pt] text-gray-500 font-medium">(with stamp)</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SHEET 3: ANNEXURE-IV                                         */}
        {/* ============================================================ */}
        {(activeSheet === 'all' || activeSheet === 'annexure-iv') && (
          <div className="a4-preview-sheet p-6 sm:p-8 bg-white text-black font-sans relative overflow-hidden w-[210mm] min-h-[297mm] mx-auto shadow-lg flex flex-col justify-between print:shadow-none print:m-0 print:border-none">
            <div className="border-[2px] border-black h-full flex flex-col p-0 overflow-hidden text-[9pt]">
              
              {/* Header Banner */}
              <div className="py-2.5 px-3 border-b-2 border-black text-center bg-[#0b1b3d] text-white">
                <div className="text-[10pt] font-mono font-bold tracking-widest text-amber-400">ANNEXURE-IV</div>
                <h1 className="text-xs sm:text-sm font-black tracking-wide uppercase font-serif text-white">
                  Work Completion Report for Synchronization of Rooftop Solar PV System
                </h1>
                <p className="text-[7.5pt] font-sans text-gray-300 italic">
                  (To be submitted by Eligible Consumer / Applicant to DISCOM)
                </p>
              </div>

              {/* SECTION A: APPLICANT/CONSUMER DETAILS */}
              <div className="border-b-2 border-black">
                <div className="bg-slate-100 px-3 py-1 font-black text-[9pt] border-b border-black text-black uppercase">
                  A. Applicant / Consumer Details
                </div>
                <table className="w-full border-collapse text-[8.5pt]">
                  <tbody className="divide-y divide-black">
                    <tr>
                      <td className="w-8 py-1 px-2 text-center font-bold border-r border-black">1</td>
                      <td className="w-64 py-1 px-2 font-bold text-gray-800 border-r border-black">Net Meter Registration Number</td>
                      <td className="py-1 px-2 font-mono font-bold text-black">{regNo}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">2</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Registration Date</td>
                      <td className="py-1 px-2 font-mono font-bold text-black">{regDate}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">3</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Name of the applicant</td>
                      <td className="py-1 px-2 font-black text-black uppercase">{applicantName}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">4</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Service Number / USC NUMBER</td>
                      <td className="py-1 px-2 font-mono font-extrabold text-black">{uscNo}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">5</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Category</td>
                      <td className="py-1 px-2 font-bold text-black">{category}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">6</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Load in kW</td>
                      <td className="py-1 px-2 font-mono font-bold text-black">{loadKw}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SECTION B: VENDOR DETAILS */}
              <div className="border-b-2 border-black">
                <div className="bg-slate-100 px-3 py-1 font-black text-[9pt] border-b border-black text-black uppercase">
                  B. Vendor of the Rooftop Solar PV System Details:
                </div>
                <table className="w-full border-collapse text-[8.5pt]">
                  <tbody className="divide-y divide-black">
                    <tr>
                      <td className="w-8 py-1 px-2 text-center font-bold border-r border-black">1</td>
                      <td className="w-64 py-1 px-2 font-bold text-gray-800 border-r border-black">Name of Vendor</td>
                      <td className="py-1 px-2 font-extrabold text-[#c2410c] uppercase">{vendorName}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">2</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Door No.</td>
                      <td className="py-1 px-2 font-semibold text-black">{vendorDoorNo}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">3</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Street</td>
                      <td className="py-1 px-2 font-semibold text-black">{vendorStreet}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">4</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">City / Village</td>
                      <td className="py-1 px-2 font-semibold text-black">{vendorCity}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">5</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Mandal</td>
                      <td className="py-1 px-2 font-semibold text-black">{vendorMandal}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">6</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Pin Code</td>
                      <td className="py-1 px-2 font-mono font-bold text-black">{vendorPin}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">7</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Mobile</td>
                      <td className="py-1 px-2 font-mono font-bold text-black">{vendorMobile}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">8</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Email ID</td>
                      <td className="py-1 px-2 font-mono text-black">{vendorEmail}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SECTION C: SOLAR PV MODULE DETAILS */}
              <div className="border-b-2 border-black">
                <div className="bg-slate-100 px-3 py-1 font-black text-[9pt] border-b border-black text-black uppercase">
                  C. Solar PV Module Details:
                </div>
                <table className="w-full border-collapse text-[8.5pt]">
                  <tbody className="divide-y divide-black">
                    <tr>
                      <td className="w-8 py-1 px-2 text-center font-bold border-r border-black">1</td>
                      <td className="w-64 py-1 px-2 font-bold text-gray-800 border-r border-black">Make</td>
                      <td className="py-1 px-2 font-bold text-black">{moduleMake}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black align-top">2</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black align-top">
                        Module Numbers (Serial Nos)
                      </td>
                      <td className="py-1 px-2 font-mono text-[8pt] text-black">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                          {moduleSerials.map((sn, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <span className="text-gray-400 font-sans">#{idx+1}:</span>
                              <span className="font-bold">{sn}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">3</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Type of module</td>
                      <td className="py-1 px-2 font-semibold text-black">{moduleType}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">4</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Capacity of each module</td>
                      <td className="py-1 px-2 font-mono font-bold text-black">{moduleWattage}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">5</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Number of modules</td>
                      <td className="py-1 px-2 font-mono font-bold text-black">{moduleCount}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">6</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Total capacity</td>
                      <td className="py-1 px-2 font-mono font-extrabold text-black">{moduleCapacityTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SECTION D: GRID TIE INVERTER / CONNECTOR */}
              <div className="border-b-2 border-black">
                <div className="bg-slate-100 px-3 py-1 font-black text-[9pt] border-b border-black text-black uppercase">
                  D. Grid Tie Inverter / Connector
                </div>
                <table className="w-full border-collapse text-[8.5pt]">
                  <tbody className="divide-y divide-black">
                    <tr>
                      <td className="w-8 py-1 px-2 text-center font-bold border-r border-black">1</td>
                      <td className="w-64 py-1 px-2 font-bold text-gray-800 border-r border-black">Make</td>
                      <td className="py-1 px-2 font-bold text-black">{inverterMake}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">2</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Serial number</td>
                      <td className="py-1 px-2 font-mono font-bold text-black">{inverterSerial}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">3</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Capacity</td>
                      <td className="py-1 px-2 font-mono font-bold text-black">{inverterCapacity}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">4</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Input voltage</td>
                      <td className="py-1 px-2 font-mono font-semibold text-black">{inverterInputVolt}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">5</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">Output voltage</td>
                      <td className="py-1 px-2 font-mono font-semibold text-black">{inverterOutputVolt}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-center font-bold border-r border-black">6</td>
                      <td className="py-1 px-2 font-bold text-gray-800 border-r border-black">
                        If grid supply fails, no return supply to the grid
                      </td>
                      <td className="py-1 px-2 font-black text-emerald-800 font-mono flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-emerald-700" />
                        <span>YES (Anti-Islanding Protection Verified)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SECTIONS E & F */}
              <div className="divide-y divide-black border-b-2 border-black text-[8.5pt]">
                <div className="p-2 flex items-center justify-between bg-slate-50">
                  <span className="font-black text-black">
                    E. Details of protective System available (Commissioning shall be done only on availability of the above) :
                  </span>
                  <span className="font-mono font-black text-emerald-900 bg-emerald-100 border border-emerald-400 px-2 py-0.5 rounded text-[8pt]">
                    YES
                  </span>
                </div>
                <div className="p-2 flex items-center justify-between">
                  <span className="font-bold text-gray-900">
                    F. CEIG Approval Ref Number (Rooftop Solar PV System having capacity in excess of 75 kW) :
                  </span>
                  <span className="font-mono font-bold text-gray-700 text-[8pt]">
                    {ceigApproval}
                  </span>
                </div>
                <div className="p-2 bg-slate-100 text-[8pt] font-semibold text-gray-800 italic">
                  Encl:- Connected SPV generator Single line diagram, CEIG Approval copy (if applicable).
                </div>
              </div>

              {/* 2-COLUMN SIGNATURE BLOCK */}
              <div className="grid grid-cols-2 divide-x-2 divide-black text-[8.5pt] text-center min-h-[90px] mt-auto">
                {/* Vendor Signature */}
                <div className="p-2 flex flex-col justify-between items-center relative">
                  <div className="font-bold text-gray-900 uppercase">Vendor Signature (with Stamp)</div>
                  <div className="h-10 w-10 flex items-center justify-center relative">
                    <img
                      src="/assets/srimaan_seal.jpeg"
                      alt="Official Seal"
                      className="max-h-full max-w-full object-contain mix-blend-multiply opacity-80 rotate-[-5deg]"
                    />
                  </div>
                  <div>
                    <div className="font-black text-black uppercase text-[8pt]">FOR : SRIMAAN SOLAR SOLUTIONS</div>
                    <div className="text-[7.5pt] text-gray-700 font-bold">({signatoryName} - Managing Director)</div>
                  </div>
                </div>

                {/* Eligible Consumer Signature */}
                <div className="p-2 flex flex-col justify-between items-center">
                  <div className="font-bold text-gray-900 uppercase">Eligible Consumer Signature</div>
                  <div className="h-8"></div>
                  <div>
                    <div className="font-black text-black uppercase text-[8pt]">{applicantName}</div>
                    <div className="text-[7.5pt] text-gray-500 font-medium">(Applicant / Consumer)</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default DiscomReportView;
