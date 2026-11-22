import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  MapPin, 
  Globe, 
  Cpu, 
  Wrench, 
  Headphones, 
  CheckCircle2, 
  FileCheck2, 
  Sparkles, 
  QrCode,
  ExternalLink,
  Phone,
  Mail,
  Zap,
  CheckCheck,
  SunMedium,
  Layers,
  ArrowRight
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageHeader from './CustomerPageHeader';
import CustomerPageFooter from './CustomerPageFooter';
import { EMBLEMS } from '../../utils/brandLogos';
import ASSETS from '../../assets/assetsData';
import { formatNumber } from '../../utils/formatters';

export default function CustomerPage5CompanyProfile({ quotation, settings }) {
  const company = settings?.company || {};
  const qr = settings?.qrPortals || {};
  const technical = quotation?.technical || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const acKw = parseFloat(technical?.acInverterCapacityKw || (dcKw <= 3 ? 3.6 : (dcKw * 1.2).toFixed(1)));
  const panelWattage = technical?.panelWattage || 540;
  const panelCount = technical?.panelCount || Math.ceil((dcKw * 1000) / panelWattage);
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));
  const monthlyKwh = Math.round(annualKwh / 12);
  const minArea = Math.round(dcKw * 70);
  const maxArea = Math.round(dcKw * 100);

  return (
    <div className="a4-preview-sheet p-6 flex flex-col text-slate-800 bg-white relative overflow-hidden h-[297mm]">
      {/* Signature Multi-Tier Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#060e24] via-amber-500 via-emerald-500 to-[#0b1736] z-30" />
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-amber-400/40 z-30" />

      {/* Subtle Background Watermark */}
      <Watermark />

      <div className="relative z-10 flex-1 flex flex-col justify-between min-h-0 space-y-2">
        {/* ============================================================== */}
        {/* 1. MASTER EXECUTIVE BRAND HEADER                               */}
        {/* ============================================================== */}
        <CustomerPageHeader 
          quotation={quotation}
          settings={settings}
          title="Technical Annexure & Credentials"
          subtitle="System Configuration, Estimated Generation & Corporate Accreditations"
          badgeText="ANNEXURE"
          badgeColor="amber"
          capacityKw={dcKw}
        />

        {/* ============================================================== */}
        {/* 2. TECHNICAL ANNEXURE INTRO & SCHEMATIC FLOW (From PDF Page 5) */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Technical Annexure &bull; Grid-Interactive Flow
            </h3>
            <span className="text-[7px] text-slate-500 font-medium">
              Bi-Directional Net-Metering Architecture
            </span>
          </div>

          <p className="text-[8px] text-slate-600 leading-relaxed mb-2">
            Solar modules produce DC electricity. The on-grid inverter converts it to AC for use at the property, and surplus electricity can be exported through the net meter.
          </p>

          {/* Clean Schematic Diagram Representation */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-center text-[7.5px]">
            {/* 1. Solar Panels */}
            <div className="flex-1 p-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold inline-flex items-center justify-center mb-0.5">
                <SunMedium className="w-3.5 h-3.5" />
              </span>
              <strong className="block text-slate-900 text-[8px]">Solar Panels</strong>
              <span className="text-[6.5px] text-slate-500">Generates DC Power</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 mx-1 shrink-0" />

            {/* 2. Inverter */}
            <div className="flex-1 p-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold inline-flex items-center justify-center mb-0.5">
                <Cpu className="w-3.5 h-3.5" />
              </span>
              <strong className="block text-slate-900 text-[8px]">Solar Inverter</strong>
              <span className="text-[6.5px] text-slate-500">Converts to AC</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 mx-1 shrink-0" />

            {/* 3. Net Meter */}
            <div className="flex-1 p-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold inline-flex items-center justify-center mb-0.5">
                <Layers className="w-3.5 h-3.5" />
              </span>
              <strong className="block text-slate-900 text-[8px]">Bi-Directional Meter</strong>
              <span className="text-[6.5px] text-slate-500">Imports / Exports</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 mx-1 shrink-0" />

            {/* 4. Home & Grid */}
            <div className="flex-1 p-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold inline-flex items-center justify-center mb-0.5">
                <Building2 className="w-3.5 h-3.5" />
              </span>
              <strong className="block text-slate-900 text-[8px]">Property &amp; Grid</strong>
              <span className="text-[6.5px] text-slate-500">Zero Bill Power</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. SYSTEM CONFIGURATION & ESTIMATED GENERATION (From PDF Page 5)*/}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* System Configuration (6 Cols) */}
          <div className="col-span-6 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <h4 className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide pb-1 border-b border-slate-100 mb-1.5 flex items-center justify-between">
                <span>System Configuration</span>
                <span className="text-[7px] text-blue-700 font-bold bg-blue-50 px-1.5 py-0.2 rounded">Summary</span>
              </h4>

              <div className="space-y-1 text-[7.5px]">
                <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Panel Configuration</span>
                  <strong className="text-slate-900 block mt-0.2">{dcKw} kW rooftop array</strong>
                  <span className="text-slate-500 text-[6.5px] block">Waaree / Adani module options, as listed on page 3.</span>
                </div>

                <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">On-Grid Inverter</span>
                  <strong className="text-slate-900 block mt-0.2">{technical?.inverterBrand?.split('(')[0]?.trim() || 'Polycab'} {acKw} kW</strong>
                  <span className="text-slate-500 text-[6.5px] block">High efficiency string inverter with cloud telemetry.</span>
                </div>

                <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Roof Area</span>
                  <strong className="text-slate-900 block mt-0.2">Approx. {minArea}–{maxArea} sq ft</strong>
                  <span className="text-slate-500 text-[6.5px] block">Shade-free area required.</span>
                </div>
              </div>
            </div>

            <div className="mt-1 pt-1 border-t border-slate-100 text-[6.5px] text-slate-500 font-medium">
              * Compliant with DISCOM bi-directional net-metering norms.
            </div>
          </div>

          {/* Estimated Generation (6 Cols) */}
          <div className="col-span-6 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <h4 className="text-[8.5px] font-black text-slate-900 uppercase tracking-wide pb-1 border-b border-slate-100 mb-1.5 flex items-center justify-between">
                <span>Estimated Generation</span>
                <span className="text-[7px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">Annual Yield</span>
              </h4>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-[7.5px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-900 font-bold">
                      <th className="py-1 px-2 text-left border-r border-slate-200">Parameter</th>
                      <th className="py-1 px-2 text-right">Estimate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-1.5 px-2 text-slate-700 border-r border-slate-200">Average daily generation</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-slate-900">Approx. {dailyKwh} kWh</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1.5 px-2 text-slate-700 border-r border-slate-200">Average monthly generation</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-slate-900">Approx. {monthlyKwh} kWh</td>
                    </tr>
                    <tr className="bg-emerald-50/50">
                      <td className="py-1.5 px-2 font-bold text-emerald-950 border-r border-slate-200">Annual generation</td>
                      <td className="py-1.5 px-2 text-right font-mono font-black text-emerald-900">Approx. {formatNumber(annualKwh)} kWh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-1 pt-1 border-t border-slate-100 text-[6.5px] text-slate-500 italic">
              Actual generation varies with site conditions and shading.
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. CORPORATE ACCREDITATIONS & EMPANELMENTS                      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-4 gap-2">
          {/* MNRE */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2">
            <img src={EMBLEMS.mnre} alt="MNRE" className="h-6 object-contain shrink-0" />
            <div className="min-w-0">
              <span className="font-extrabold text-slate-900 text-[7.5px] block truncate">MNRE Empanelled</span>
              <span className="text-[6.5px] text-slate-500 block truncate">Channel Partner</span>
            </div>
          </div>

          {/* DISCOM */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[8px] shrink-0">
              TS
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-slate-900 text-[7.5px] block truncate">TSSPDCL / TSNPDCL</span>
              <span className="text-[6.5px] text-slate-500 block truncate">Registered Partner</span>
            </div>
          </div>

          {/* ISO 9001 */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2">
            <img src={EMBLEMS.iso} alt="ISO" className="h-6 object-contain shrink-0" />
            <div className="min-w-0">
              <span className="font-extrabold text-slate-900 text-[7.5px] block truncate">ISO 9001:2015</span>
              <span className="text-[6.5px] text-slate-500 block truncate">Quality Certified EPC</span>
            </div>
          </div>

          {/* PM Surya Ghar */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-2">
            <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="h-6 object-contain shrink-0" />
            <div className="min-w-0">
              <span className="font-extrabold text-slate-900 text-[7.5px] block truncate">PM Surya Ghar</span>
              <span className="text-[6.5px] text-slate-500 block truncate">National Portal DBT</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. DIRECT CONTACT & VERIFIED QR TOUCHPOINTS                     */}
        {/* ============================================================== */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#060e24] via-[#0b1736] to-[#040816] text-white shadow-md border border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className="text-[9px] font-black text-amber-300 uppercase tracking-wide">
                Srimaan Solar Solutions &bull; Contact &amp; Verification
              </h4>
              <span className="text-[6.5px] text-emerald-300 bg-white/10 px-1.5 py-0.2 rounded">
                Khammam HQ
              </span>
            </div>
            <p className="text-[7.5px] text-slate-300 font-medium">
              #6-210, Sriramnagar, Behind Auto Nagar, Warangal X Road, Khammam 507003
            </p>
            <p className="text-[7px] text-slate-400 mt-0.5 font-mono">
              Phone: 9347416140 &bull; Email: srimaansolarsolutions@gmail.com &bull; Web: www.srimaansolarsolutions.com
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[6.5px] text-slate-400 uppercase font-bold block">Tax Identification</span>
            <span className="text-[8px] font-mono font-black text-emerald-400">GSTIN: {company.gstin || "36ADPPT2441N1ZW"}</span>
            <span className="text-[7px] font-mono text-slate-300 block">PAN: {company.pan || "ADPPT2441N"}</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. PAGE 5 FOOTER                                               */}
        {/* ============================================================== */}
        <CustomerPageFooter pageNumber={5} totalPages={5} />
      </div>
    </div>
  );
}
