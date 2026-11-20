import React from 'react';
import { 
  Cpu, 
  Zap, 
  SunMedium, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Cable, 
  CheckCircle2, 
  BarChart3, 
  Wind, 
  Shield, 
  Wifi, 
  Award, 
  Wrench,
  Compass,
  ArrowRight,
  Sparkles,
  Workflow,
  CheckCheck,
  Radio,
  FileCheck2,
  Flame,
  Power,
  Building2,
  Calendar,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';
import { formatNumber, formatCurrency, formatDate } from '../../utils/formatters';
import Watermark from '../common/Watermark';
import CustomerPageHeader from './CustomerPageHeader';
import CustomerPageFooter from './CustomerPageFooter';
import { getPanelLogo, getInverterLogo, getCableLogo, EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage2SystemSpec({ quotation, settings }) {
  const company = settings?.company || {};
  const technical = quotation?.technical || {};
  const customer = quotation?.customer || {};
  const commercials = quotation?.commercials || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const acKw = parseFloat(technical?.acInverterCapacityKw || (dcKw <= 3 ? 3.6 : (dcKw * 1.2).toFixed(1)));
  const panelWattage = technical?.panelWattage || 540;
  const panelCount = technical?.panelCount || Math.ceil((dcKw * 1000) / panelWattage);
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));
  const minArea = Math.round(dcKw * 70);
  const maxArea = Math.round(dcKw * 100);

  const totalCost = commercials?.totalGrossCost || 0;
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : 78000;
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalCost - subsidy);

  const rawRef = quotation?.quotationNumber || 'SSS-SOL-2026-1048';
  const cleanRef = rawRef.replace(/^SRIMAAN\s+SOLAR\s+SOLUTIONS-?/i, 'SSS-');

  const panelLogo = getPanelLogo(technical?.panelBrand);
  const inverterLogo = getInverterLogo(technical?.inverterBrand);

  // Month-by-month solar generation profile
  const monthlyProfile = [
    { month: 'Jan', factor: 0.92, label: 'J' },
    { month: 'Feb', factor: 0.98, label: 'F' },
    { month: 'Mar', factor: 1.08, label: 'M' },
    { month: 'Apr', factor: 1.12, label: 'A' },
    { month: 'May', factor: 1.06, label: 'M' },
    { month: 'Jun', factor: 0.82, label: 'J' },
    { month: 'Jul', factor: 0.72, label: 'J' },
    { month: 'Aug', factor: 0.75, label: 'A' },
    { month: 'Sep', factor: 0.86, label: 'S' },
    { month: 'Oct', factor: 0.95, label: 'O' },
    { month: 'Nov', factor: 0.94, label: 'N' },
    { month: 'Dec', factor: 0.90, label: 'D' }
  ];

  const avgMonthly = annualKwh / 12;

  return (
    <div className="a4-preview-sheet p-6 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
        {/* ============================================================== */}
        {/* 1. MASTER EXECUTIVE BRAND HEADER                               */}
        {/* ============================================================== */}
        <CustomerPageHeader 
          quotation={quotation}
          settings={settings}
          title={`${dcKw} kW Rooftop Solar Quotation`}
          subtitle={`Srimaan Solar Solutions • On-grid solar photovoltaic power generating system`}
          badgeText="SYSTEM AT A GLANCE"
          badgeColor="amber"
          capacityKw={dcKw}
        />

        {/* ============================================================== */}
        {/* 2. TOP 3 COMMERCIAL HIGHLIGHT CARDS (From Official PDF Page 2) */}
        {/* ============================================================== */}
        <div>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Card 1: Project cost */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Project cost</span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                {formatCurrency(totalCost)}
              </div>
              <span className="text-[7px] font-semibold text-slate-500 block mt-0.5">
                Inclusive of GST
              </span>
            </div>

            {/* Card 2: Expected subsidy */}
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-2xs">
              <span className="text-[7.5px] uppercase font-bold text-emerald-800 block">Expected subsidy</span>
              <div className="text-xl font-black text-emerald-900 font-mono mt-0.5">
                ₹{formatNumber(subsidy)}
              </div>
              <span className="text-[7px] font-semibold text-emerald-700 block mt-0.5">
                Subject to approval (Direct DBT)
              </span>
            </div>

            {/* Card 3: Estimated net cost */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#060e24] via-[#0b1736] to-[#040816] text-white shadow-md border border-slate-800">
              <span className="text-[7.5px] uppercase font-bold text-amber-300 block">Estimated net cost</span>
              <div className="text-xl font-black text-white font-mono mt-0.5">
                {formatCurrency(netPayable)}
              </div>
              <span className="text-[7px] font-semibold text-slate-300 block mt-0.5">
                After expected subsidy
              </span>
            </div>
          </div>

          {/* Official Loan Adjustment Note from PDF */}
          <div className="mt-1.5 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 text-[7px] text-slate-600 font-medium flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              For financed installations, the approved subsidy is adjusted against the customer's loan account.
            </span>
            <span className="font-bold text-emerald-700">PM Surya Ghar DBT National Scheme</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. CUSTOMER DETAILS & SYSTEM AT A GLANCE (From Official PDF)   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* Left: Customer and Quotation Details (7 Cols) */}
          <div className="col-span-7 p-2.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1.5">
                <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide">
                  Customer and Quotation Details
                </span>
                <span className="text-[7px] font-mono text-slate-500 font-semibold">Official Record</span>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[7.5px]">
                <div className="p-1 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Prepared for</span>
                  <span className="font-extrabold text-slate-900 truncate block mt-0.2">{customer?.name || '[Customer name]'}</span>
                </div>
                <div className="p-1 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Quotation no.</span>
                  <span className="font-mono font-black text-slate-900 truncate block mt-0.2">{cleanRef}</span>
                </div>
                <div className="p-1 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Phone</span>
                  <span className="font-mono font-bold text-slate-900 truncate block mt-0.2">{customer?.phone || '9347416140'}</span>
                </div>
                <div className="p-1 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Quotation date</span>
                  <span className="font-bold text-slate-900 truncate block mt-0.2">{formatDate(quotation?.date || new Date())}</span>
                </div>
                <div className="col-span-2 p-1 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Installation site</span>
                  <span className="font-medium text-slate-800 truncate block mt-0.2">{customer?.address || '[Site address]'}</span>
                </div>
              </div>
            </div>
            <div className="mt-1 pt-1 border-t border-slate-100 flex items-center justify-between text-[7px] text-slate-500 font-medium">
              <span>Consumer No: <strong className="text-slate-800">{customer?.consumerServiceNumber || 'TS-DISCOM-RES'}</strong></span>
              <span>Validity: <strong className="text-emerald-700">30 days from quotation date</strong></span>
            </div>
          </div>

          {/* Right: System at a Glance (5 Cols) */}
          <div className="col-span-5 p-2.5 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1.5">
                <span className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide">
                  System at a Glance
                </span>
                <span className="text-[7px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">On-Grid PV</span>
              </div>

              <div className="space-y-1 text-[7.5px]">
                <div className="p-1.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[6.5px] uppercase font-bold text-slate-400 block">Array capacity</span>
                    <span className="text-[7px] text-slate-500">Rooftop solar PV</span>
                  </div>
                  <strong className="text-xs font-black text-slate-900 font-mono">{dcKw} kW</strong>
                </div>

                <div className="p-1.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[6.5px] uppercase font-bold text-slate-400 block">On-grid inverter</span>
                    <span className="text-[7px] text-slate-500">{technical?.inverterBrand?.split('(')[0]?.trim() || 'Polycab'}</span>
                  </div>
                  <strong className="text-xs font-black text-slate-900 font-mono">{acKw} kW</strong>
                </div>

                <div className="p-1.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[6.5px] uppercase font-bold text-slate-400 block">Shade-free roof area</span>
                    <span className="text-[7px] text-slate-500">Approximate</span>
                  </div>
                  <strong className="text-xs font-black text-slate-900 font-mono">{minArea}–{maxArea} sq ft</strong>
                </div>
              </div>
            </div>

            <div className="mt-1 pt-1 border-t border-slate-100 text-[6.5px] text-slate-500 font-medium flex justify-between">
              <span>Phase: <strong>{customer?.phase || 'Single Phase (230V)'}</strong></span>
              <span>Modules: <strong>{panelCount} Nos. × {panelWattage}Wp</strong></span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. 4 HIGH-IMPACT HARDWARE SPECIFICATIONS                        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2 text-[7.5px]">
          {/* 1. Modules Card */}
          <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1">
                <span className="font-extrabold text-slate-900 text-[8px] flex items-center gap-1">
                  <SunMedium className="w-3 h-3 text-amber-500" />
                  PV Modules
                </span>
                <span className="text-[6px] font-black text-amber-800 bg-amber-100 px-1 py-0.2 rounded">Tier-1</span>
              </div>
              <div className="h-5 flex items-center my-0.5">
                {panelLogo ? (
                  <img src={panelLogo} alt="Module Brand" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-bold text-slate-900 text-[8px]">Waaree / Adani</span>
                )}
              </div>
              <div className="space-y-0.2 text-[6.5px] text-slate-600">
                <div className="flex justify-between"><span>Type:</span><strong className="text-slate-900">TOPCon / Mono PERC</strong></div>
                <div className="flex justify-between"><span>Count:</span><strong className="text-slate-900">{panelCount} × {panelWattage}W</strong></div>
              </div>
            </div>
            <div className="mt-1 pt-0.5 border-t border-slate-100 text-[6px] text-emerald-700 font-bold">
              &#10003; 25-Yr Linear Warranty
            </div>
          </div>

          {/* 2. Inverter Card */}
          <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1">
                <span className="font-extrabold text-slate-900 text-[8px] flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-blue-600" />
                  Grid Inverter
                </span>
                <span className="text-[6px] font-black text-blue-800 bg-blue-100 px-1 py-0.2 rounded">98.6%</span>
              </div>
              <div className="h-5 flex items-center my-0.5">
                {inverterLogo ? (
                  <img src={inverterLogo} alt="Inverter Brand" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-bold text-slate-900 text-[8px]">Polycab Solar</span>
                )}
              </div>
              <div className="space-y-0.2 text-[6.5px] text-slate-600">
                <div className="flex justify-between"><span>Rating:</span><strong className="text-slate-900">{acKw} kW AC</strong></div>
                <div className="flex justify-between"><span>Telemetry:</span><strong className="text-slate-900">Built-in Wi-Fi</strong></div>
              </div>
            </div>
            <div className="mt-1 pt-0.5 border-t border-slate-100 text-[6px] text-blue-700 font-bold">
              &#10003; 7-Year Warranty
            </div>
          </div>

          {/* 3. MMS Structure Card */}
          <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1">
                <span className="font-extrabold text-slate-900 text-[8px] flex items-center gap-1">
                  <Wind className="w-3 h-3 text-indigo-600" />
                  MMS Structure
                </span>
                <span className="text-[6px] font-black text-indigo-800 bg-indigo-100 px-1 py-0.2 rounded">180 km/h</span>
              </div>
              <div className="h-5 flex items-center my-0.5">
                <span className="font-bold text-slate-900 text-[8px]">Hot-Dip Galvanized</span>
              </div>
              <div className="space-y-0.2 text-[6.5px] text-slate-600">
                <div className="flex justify-between"><span>Height:</span><strong className="text-slate-900">Basic 5–6 ft</strong></div>
                <div className="flex justify-between"><span>Fasteners:</span><strong className="text-slate-900">SS-304 Hardware</strong></div>
              </div>
            </div>
            <div className="mt-1 pt-0.5 border-t border-slate-100 text-[6px] text-indigo-700 font-bold">
              &#10003; Hot-Dip GI Legs &amp; Purlins
            </div>
          </div>

          {/* 4. Cabling & Earthing Card */}
          <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1">
                <span className="font-extrabold text-slate-900 text-[8px] flex items-center gap-1">
                  <Cable className="w-3 h-3 text-emerald-600" />
                  Cabling &amp; Earthing
                </span>
                <span className="text-[6px] font-black text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded">IS 3043</span>
              </div>
              <div className="h-5 flex items-center my-0.5">
                <span className="font-bold text-slate-900 text-[8px]">Polycab Copper Cables</span>
              </div>
              <div className="space-y-0.2 text-[6.5px] text-slate-600">
                <div className="flex justify-between"><span>AC/DC:</span><strong className="text-slate-900">4 mm² Copper</strong></div>
                <div className="flex justify-between"><span>Rods:</span><strong className="text-slate-900">3 Chemical Rods</strong></div>
              </div>
            </div>
            <div className="mt-1 pt-0.5 border-t border-slate-100 text-[6px] text-emerald-700 font-bold">
              &#10003; 1 Lightning Arrester + 25kg Powder
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. 12-MONTH GENERATION PROFILE                                  */}
        {/* ============================================================== */}
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[8px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3 text-emerald-600" />
              Month-by-Month Solar Generation Profile
            </span>
            <span className="text-[7px] text-emerald-700 font-mono font-bold">
              Avg: {Math.round(avgMonthly)} kWh/mo &bull; Total: {formatNumber(annualKwh)} kWh/yr
            </span>
          </div>

          <div className="grid grid-cols-12 gap-1 text-center">
            {monthlyProfile.map((m) => {
              const monthUnits = Math.round(avgMonthly * m.factor);
              const isPeak = m.factor >= 1.08;
              return (
                <div key={m.month} className="p-1 rounded bg-white border border-slate-200">
                  <span className="text-[6.5px] font-bold text-slate-500 block">{m.month}</span>
                  <div className="h-8 flex items-end justify-center my-0.5">
                    <div 
                      className={`w-3 rounded-xs ${isPeak ? 'bg-amber-500' : 'bg-blue-600'}`} 
                      style={{ height: `${Math.round(m.factor * 26)}px` }}
                    />
                  </div>
                  <span className="text-[6.5px] font-mono font-black text-slate-900 block">{monthUnits}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. PAGE 2 FOOTER                                               */}
        {/* ============================================================== */}
        <CustomerPageFooter pageNumber={2} totalPages={5} />
      </div>
    </div>
  );
}
