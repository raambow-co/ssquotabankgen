import React from 'react';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';
import { calculateGSTBreakdown, formatINRDecimal } from '../../utils/calculations';
import { 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Building2, 
  CheckCheck,
  CheckCircle2,
  Wrench,
  AlertCircle,
  Package,
  Layers
} from 'lucide-react';
import Watermark from '../common/Watermark';
import CustomerPageHeader from './CustomerPageHeader';
import CustomerPageFooter from './CustomerPageFooter';
import { getPanelLogo, getInverterLogo, EMBLEMS } from '../../utils/brandLogos';

export default function CustomerPage3Financials({ quotation, settings }) {
  const company = settings?.company || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};

  const dcKw = parseFloat(technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.0);
  const acKw = parseFloat(technical?.acInverterCapacityKw || (dcKw <= 3 ? 3.6 : (dcKw * 1.2).toFixed(1)));
  const panelWattage = technical?.panelWattage || 540;
  const panelCount = technical?.panelCount || Math.ceil((dcKw * 1000) / panelWattage);

  const totalCost = commercials?.totalGrossCost || 0;
  const gstBreakdown = calculateGSTBreakdown(totalCost);

  const panelLogo = getPanelLogo(technical?.panelBrand);
  const inverterLogo = getInverterLogo(technical?.inverterBrand);

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
          title="Equipment and Installation Scope"
          subtitle="Itemized Technical Bill of Materials, Statutory GST & Installation Responsibility Matrix"
          badgeText="OFFICIAL SCOPE"
          badgeColor="emerald"
          capacityKw={dcKw}
        />

        {/* ============================================================== */}
        {/* 2. EQUIPMENT AND INSTALLATION SCOPE TABLE (From Official PDF)   */}
        {/* ============================================================== */}
        <div className="border border-slate-300 rounded-xl overflow-hidden shadow-2xs bg-white text-[7.5pt]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold text-[8pt]">
                <th className="py-1 px-1.5 text-center border-r border-slate-200 w-8">No.</th>
                <th className="py-1 px-2 text-left border-r border-slate-200">Equipment and Specifications</th>
                <th className="py-1 px-2 text-center border-r border-slate-200 w-28">Make / Brand</th>
                <th className="py-1 px-2 text-center w-20">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {/* Category 1: Solar Modules and Mounting */}
              <tr className="bg-blue-50/60 border-b border-slate-200 text-blue-950 font-bold text-[7pt]">
                <td colSpan={4} className="py-0.5 px-2 tracking-wide uppercase">
                  &#9654; Solar Modules and Mounting
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">1</td>
                <td className="py-1 px-2 text-left font-semibold border-r border-slate-200">
                  Solar PV modules: TOPCon / Mono PERC DCR modules ({panelWattage}Wp)
                </td>
                <td className="py-1 px-2 text-center border-r border-slate-200">
                  <div className="flex items-center justify-center gap-1.5">
                    {panelLogo ? (
                      <img src={panelLogo} alt="Waaree / Adani" className="h-3.5 object-contain" />
                    ) : (
                      <span className="font-bold text-slate-900 text-[7pt]">Waaree or Adani</span>
                    )}
                  </div>
                </td>
                <td className="py-1 px-2 text-center font-mono font-bold">{panelCount} Nos (1 set)</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">2</td>
                <td className="py-1 px-2 text-left border-r border-slate-200 text-slate-700">
                  GI mounting structure: Basic height 5–6 ft, subject to site requirements. Hot-dip legs, GI rafters and purlins. Design wind speed: 180 km/h.
                </td>
                <td className="py-1 px-2 text-center font-semibold text-slate-700 border-r border-slate-200">Srimaan GI Rigging</td>
                <td className="py-1 px-2 text-center font-mono font-bold">1</td>
              </tr>

              {/* Category 2: Inverter and Electrical Protection */}
              <tr className="bg-amber-50/60 border-b border-slate-200 text-amber-950 font-bold text-[7pt]">
                <td colSpan={4} className="py-0.5 px-2 tracking-wide uppercase">
                  &#9654; Inverter and Electrical Protection
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">3</td>
                <td className="py-1 px-2 text-left font-semibold border-r border-slate-200">
                  ACDB and DCDB boxes (1–6 kW with IP65 Enclosure &amp; SPDs)
                </td>
                <td className="py-1 px-2 text-center font-bold text-red-700 border-r border-slate-200">POLYCAB</td>
                <td className="py-1 px-2 text-center font-mono font-bold">1</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">4</td>
                <td className="py-1 px-2 text-left border-r border-slate-200 text-slate-700">
                  MC4 connectors (UV &amp; Weatherproof IP68 Rated)
                </td>
                <td className="py-1 px-2 text-center text-slate-500 border-r border-slate-200">Standard / OEM</td>
                <td className="py-1 px-2 text-center font-mono font-bold">2</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">5</td>
                <td className="py-1 px-2 text-left font-semibold border-r border-slate-200">
                  On-grid solar inverter ({acKw} kW AC with Wi-Fi Cloud Monitoring)
                </td>
                <td className="py-1 px-2 text-center font-bold text-red-700 border-r border-slate-200">
                  {technical?.inverterBrand?.includes('Polycab') ? 'POLYCAB' : technical?.inverterBrand?.split('(')[0]?.trim() || 'POLYCAB'}
                </td>
                <td className="py-1 px-2 text-center font-mono font-bold">1</td>
              </tr>

              {/* Category 3: Cabling, Earthing and Accessories */}
              <tr className="bg-emerald-50/60 border-b border-slate-200 text-emerald-950 font-bold text-[7pt]">
                <td colSpan={4} className="py-0.5 px-2 tracking-wide uppercase">
                  &#9654; Cabling, Earthing and Accessories
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">6</td>
                <td className="py-1 px-2 text-left border-r border-slate-200 text-slate-700">
                  AC cable: Copper cable, 2-core × 4 mm²
                </td>
                <td className="py-1 px-2 text-center font-bold text-red-700 border-r border-slate-200">POLYCAB</td>
                <td className="py-1 px-2 text-center font-mono text-slate-600">As required</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">7</td>
                <td className="py-1 px-2 text-left border-r border-slate-200 text-slate-700">
                  DC cable: Copper cable, 1-core × 4 mm², red and black (Solar Grade)
                </td>
                <td className="py-1 px-2 text-center font-bold text-red-700 border-r border-slate-200">POLYCAB</td>
                <td className="py-1 px-2 text-center font-mono text-slate-600">As required</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">8</td>
                <td className="py-1 px-2 text-left border-r border-slate-200 text-slate-700">
                  Earthing cable: 4 mm². Colours listed: green, red and black
                </td>
                <td className="py-1 px-2 text-center font-bold text-red-700 border-r border-slate-200">POLYCAB</td>
                <td className="py-1 px-2 text-center font-mono text-slate-600">As required</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">9</td>
                <td className="py-1 px-2 text-left font-semibold border-r border-slate-200 text-slate-900">
                  Earthing and lightning protection kit: 3 earthing rods, 1 lightning arrester and 1 bag of earthing powder (25 kg)
                </td>
                <td className="py-1 px-2 text-center text-slate-700 font-semibold border-r border-slate-200">IS 3043 Compliant</td>
                <td className="py-1 px-2 text-center font-mono font-bold">1 set</td>
              </tr>
              <tr>
                <td className="py-1 px-1.5 text-center font-bold border-r border-slate-200">10</td>
                <td className="py-1 px-2 text-left border-r border-slate-200 text-slate-700">
                  Installation accessories: PVC wiring pipes, ties, 25 mm clamps and PVC bends
                </td>
                <td className="py-1 px-2 text-center text-slate-500 border-r border-slate-200">Standard</td>
                <td className="py-1 px-2 text-center font-mono text-slate-600">As required</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================== */}
        {/* 3. STATUTORY 70:30 GST CALCULATION TABLE (Statutory Mandate)   */}
        {/* ============================================================== */}
        <div className="border border-black overflow-hidden shadow-2xs rounded-xs bg-white">
          <div className="bg-[#B7D7A8] px-2.5 py-1 border-b border-black flex items-center justify-between">
            <h4 className="font-extrabold text-slate-950 text-[8pt] tracking-wider uppercase flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              GST CALCULATION:
            </h4>
            <span className="text-[6.5pt] font-extrabold text-slate-900 bg-white/70 px-1.5 py-0.2 rounded">
              Statutory 70:30 Bifurcation (5% Goods / 18% Services)
            </span>
          </div>
          <table className="w-full text-[7.5pt] border-collapse bg-white">
            <thead>
              <tr className="border-b border-black text-slate-950 font-bold bg-slate-50">
                <th className="py-1 px-1 text-center border-r border-black w-7">S.No</th>
                <th className="py-1 px-1.5 text-left border-r border-black">Item Description</th>
                <th className="py-1 px-1 text-center border-r border-black w-20">Amount (INR)</th>
                <th className="py-1 px-1 text-center border-r border-black w-12">GST Rate</th>
                <th className="py-1 px-1 text-center border-r border-black w-16">GST (INR)</th>
                <th className="py-1 px-1.5 text-center w-24">Total Incl. GST (INR)</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Solar Modules & Inverter */}
              <tr className="border-b border-black text-slate-900">
                <td className="py-1 px-1 text-center font-bold border-r border-black align-middle">1</td>
                <td className="py-1 px-1.5 text-left font-semibold border-r border-black align-middle leading-tight text-[7pt]">
                  Solar Modules (5%) &amp; solar inverter (1)
                </td>
                <td className="py-1 px-1 text-right font-mono font-medium border-r border-black align-middle pr-1.5">
                  {formatINRDecimal(gstBreakdown.goodsBase)}
                </td>
                <td className="py-1 px-1 text-center font-bold border-r border-black align-middle">
                  {gstBreakdown.goodsRate || "5%"}
                </td>
                <td className="py-1 px-1 text-right font-mono font-medium border-r border-black align-middle pr-1.5">
                  {formatINRDecimal(gstBreakdown.goodsGst)}
                </td>
                <td className="py-1 px-1.5 text-right font-mono font-bold align-middle pr-1.5 bg-slate-50/50">
                  {formatINRDecimal(gstBreakdown.goodsTotal)}
                </td>
              </tr>

              {/* Row 2: Structure, Cables, BOS & Services */}
              <tr className="border-b border-black text-slate-900">
                <td className="py-1 px-1 text-center font-bold border-r border-black align-middle">2</td>
                <td className="py-1 px-1.5 text-left font-medium border-r border-black align-middle leading-tight text-[6.5pt]">
                  Galvanized structure, Polycab cables, ACDB/DCDB, junction boxes, earthing, plumbing, civil work, transport, installation &amp; commissioning
                </td>
                <td className="py-1 px-1 text-right font-mono font-medium border-r border-black align-middle pr-1.5">
                  {formatINRDecimal(gstBreakdown.servicesBase)}
                </td>
                <td className="py-1 px-1 text-center font-bold border-r border-black align-middle">
                  {gstBreakdown.servicesRate || "18%"}
                </td>
                <td className="py-1 px-1 text-right font-mono font-medium border-r border-black align-middle pr-1.5">
                  {formatINRDecimal(gstBreakdown.servicesGst)}
                </td>
                <td className="py-1 px-1.5 text-right font-mono font-bold align-middle pr-1.5 bg-slate-50/50">
                  {formatINRDecimal(gstBreakdown.servicesTotal)}
                </td>
              </tr>

              {/* Row 3: Sub Total */}
              <tr className="border-b border-black text-slate-950 font-bold bg-slate-100/70">
                <td colSpan={2} className="py-1 px-1.5 text-left font-bold border-r border-black pl-2.5">
                  Sub Total
                </td>
                <td className="py-1 px-1 text-right font-mono font-bold border-r border-black pr-1.5">
                  {formatINRDecimal(gstBreakdown.subTotalBase)}
                </td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="py-1 px-1.5 text-right font-mono font-bold pr-1.5">
                  {formatINRDecimal(gstBreakdown.totalProjectCost)}
                </td>
              </tr>

              {/* Row 4: Total GST */}
              <tr className="border-b border-black text-slate-950 font-bold">
                <td colSpan={2} className="py-1 px-1.5 text-left font-bold border-r border-black pl-2.5">
                  Total GST (SGST + CGST)
                </td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="py-1 px-1 text-right font-mono font-bold border-r border-black pr-1.5 text-blue-900">
                  {formatINRDecimal(gstBreakdown.totalGst)}
                </td>
                <td></td>
              </tr>

              {/* Row 5: Total Project Cost */}
              <tr className="text-slate-950 font-black bg-emerald-50/80">
                <td colSpan={2} className="py-1 px-1.5 text-left font-extrabold border-r border-black pl-2.5 text-[7.5pt] uppercase tracking-wide">
                  TOTAL PROJECT COST
                </td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="py-1 px-1.5 text-right font-mono font-black pr-1.5 text-[8pt] text-slate-950">
                  Rs. {formatINRDecimal(gstBreakdown.totalProjectCost)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================== */}
        {/* 4. SUPPLY AND CUSTOMER RESPONSIBILITIES (From Official PDF)    */}
        {/* ============================================================== */}
        <div>
          <h4 className="text-[8.5px] font-extrabold text-slate-900 uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-blue-600" />
            Supply and Customer Responsibilities
          </h4>

          <div className="grid grid-cols-12 gap-2 text-[7.5px] items-stretch">
            {/* Left: Quoted Supply (5 Cols) */}
            <div className="col-span-5 p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-slate-900 block text-[8px] pb-0.5 border-b border-slate-200 mb-1">
                  Quoted Supply (Company Scope)
                </span>
                <p className="text-[7.5px] text-slate-700 leading-relaxed">
                  Equipment and materials listed above, including solar modules, grid inverter, mounting structure, cabling, safety switchgear, and earthing materials.
                </p>
              </div>
              <div className="mt-1 pt-1 border-t border-slate-200 text-[6.5px] text-emerald-800 font-extrabold">
                &#10003; 100% Turnkey Procurement &amp; Delivery
              </div>
            </div>

            {/* Right: Customer Scope (7 Cols - The 5 points from official PDF!) */}
            <div className="col-span-7 p-2 rounded-xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-amber-950 block text-[8px] pb-0.5 border-b border-amber-200 mb-1 flex items-center justify-between">
                  <span>Customer Scope &amp; Site Provisions</span>
                  <span className="text-[6.5px] text-amber-800 font-bold bg-amber-100 px-1 py-0.2 rounded">Client Obligation</span>
                </span>
                <ul className="space-y-0.5 text-[7px] text-slate-700 list-disc list-inside">
                  <li><strong>Civil work and earth-pit digging</strong> at designated terrace/ground location</li>
                  <li><strong>Ladder or staircase access</strong> to the roof for workers and materials movement</li>
                  <li><strong>Water and electricity</strong> during installation, at the customer's expense</li>
                  <li><strong>Lockable storage</strong> for safe custody of materials at site</li>
                  <li><strong>Applicable load extension charges</strong> (if service load sanction is required)</li>
                </ul>
              </div>
              <div className="mt-1 pt-0.5 border-t border-amber-200 text-[6.5px] text-amber-900 font-medium">
                * Note: Cleaning of solar panels advised every 10–15 days by client for maximum solar yield.
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. PAGE 3 FOOTER                                               */}
        {/* ============================================================== */}
        <CustomerPageFooter pageNumber={3} totalPages={5} />
      </div>
    </div>
  );
}
