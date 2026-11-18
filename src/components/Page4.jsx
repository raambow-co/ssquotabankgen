import React from 'react';
import ASSETS from '../assets/assetsData';
import { PageHeader, PageFooter } from './PageHeader';

export const Page4 = ({ data }) => {
  const { company, system } = data;
  const capacity = system?.capacityKw || 5;

  return (
    <div className="a4-page page-4 flex flex-col justify-start">
      <PageHeader />

      <div className="page-content px-10 pt-4 pb-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Section Heading */}
          <div className="text-center my-3">
            <h2 className="text-xl font-bold text-[#0c4a6e] underline tracking-wide font-sans">
              Key specifications of a {capacity} kW solar panel system:
            </h2>
          </div>

          {/* Specifications Table */}
          <table className="specs-table w-full border-collapse border-2 border-slate-700 text-sm mt-3 shadow-xs">
            <tbody>
              {/* Row 1: Key components */}
              <tr className="border-b border-slate-700">
                <td className="w-1/3 p-3 font-bold align-top text-gray-900 border-r border-slate-700 bg-slate-50/70">
                  Key components
                </td>
                <td className="w-2/3 p-3 text-gray-900 leading-relaxed text-justify">
                  <p className="font-medium">
                    Solar panels (at least 75% performance efficiency), solar mounting structure, solar inverter, solar batteries (optional), and the balance of system (cables, fuses, MCBs, and Distribution boxes).
                  </p>
                  <p className="italic text-[8.5pt] text-slate-600 font-semibold mt-1">
                    * All components strictly comply with MNRE technical guidelines and ALMM standards to be eligible under the PM Surya Ghar national subsidy scheme.
                  </p>
                </td>
              </tr>

              {/* Row 2: Energy output */}
              <tr className="border-b border-slate-700">
                <td className="w-1/3 p-3 font-bold align-top text-gray-900 border-r border-slate-700 bg-slate-50/70">
                  Energy output
                </td>
                <td className="w-2/3 p-3 text-gray-900 leading-relaxed font-semibold">
                  <p>– {system.energyPerDay || (capacity * 4)} kWh (Units) of electricity per day.</p>
                  <p>– {system.energyPerMonth || (capacity * 4 * 30)} kWh (Units) of electricity per month.</p>
                  <p>– {system.energyPerYear || (capacity * 1200)} kWh (Units) of electricity per year.</p>
                </td>
              </tr>

              {/* Row 3: Area required */}
              <tr>
                <td className="w-1/3 p-3 font-bold align-top text-gray-900 border-r border-slate-700 bg-slate-50/70">
                  Area required for {system.areaSystemKw || `${capacity} kW`} solar panel system
                </td>
                <td className="w-2/3 p-3 text-gray-900 font-bold">
                  {system.areaRequired || `${capacity * 80} TO ${capacity * 100} sq ft area free of shade`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Structure Images Comparison */}
        <div className="mounting-structures-comparison my-2">
          <div className="grid grid-cols-2 gap-6 items-end">
            {/* Basic Structure Card */}
            <div className="structure-card text-center">
              <div className="border-2 border-slate-700 rounded-sm overflow-hidden shadow-xs bg-white">
                <img 
                  src={ASSETS.basic_structure} 
                  alt="Basic Low-Profile Solar Mounting Structure" 
                  className="w-full h-44 object-cover block"
                />
                <div className="bg-[#0f172a] text-white py-1.5 px-2">
                  <h4 className="font-extrabold text-xs tracking-widest uppercase">
                    BASIC
                  </h4>
                  <p className="text-[8pt] text-slate-300 font-normal">
                    Low-Profile RCC Terrace Mount
                  </p>
                </div>
              </div>
            </div>

            {/* Height Structure Card */}
            <div className="structure-card text-center">
              <div className="border-2 border-slate-700 rounded-sm overflow-hidden shadow-xs bg-white">
                <img 
                  src={ASSETS.height_structure} 
                  alt="Height Elevated Solar Structure" 
                  className="w-full h-44 object-cover block"
                />
                <div className="bg-[#0f172a] text-white py-1.5 px-2">
                  <h4 className="font-extrabold text-xs tracking-widest uppercase">
                    HEIGHT
                  </h4>
                  <p className="text-[8pt] text-slate-300 font-normal">
                    6FT - 8FT Elevated Walkable Patio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Compliance & Standards Bar */}
        <div className="mt-1 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50/80 rounded border border-slate-200">
            <span className="text-[7pt] font-extrabold uppercase text-slate-700 tracking-wider">
              NATIONAL STANDARDS &amp; ACCREDITATIONS:
            </span>
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-1.5">
                <img src="/assets/emblems/mnre-logo.png" alt="MNRE" className="h-5 w-auto object-contain" />
                <span className="text-[7pt] font-bold text-slate-700">MNRE Empanelled</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <img src="/assets/emblems/pm-surya-ghar.png" alt="PM Surya Ghar" className="h-5 w-auto object-contain" />
                <span className="text-[7pt] font-bold text-slate-700">PM Surya Ghar</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <img src="/assets/emblems/bis-certified.png" alt="BIS" className="h-4.5 w-auto object-contain" />
                <span className="text-[7pt] font-bold text-slate-700">BIS Certified</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <img src="/assets/emblems/make-in-india.png" alt="Make in India" className="h-3.5 w-auto object-contain" />
                <span className="text-[7pt] font-bold text-slate-700">Make In India (DCR)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-1"></div>
      </div>

      <PageFooter address={company?.officeAddress} />
    </div>
  );
};
