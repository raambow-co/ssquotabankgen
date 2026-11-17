import React from 'react';
import ASSETS from '../assets/assetsData';
import { PageHeader, PageFooter } from './PageHeader';

export const Page2 = ({ data }) => {
  const { company } = data;

  return (
    <div className="a4-page page-2 flex flex-col justify-start">
      <PageHeader />

      <div className="page-content px-10 pt-4 pb-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Title */}
          <div className="text-center my-4">
            <h2 className="text-2xl font-bold text-[#1e1b4b] tracking-wide font-serif">
              About Solar Grid Connected System:
            </h2>
          </div>

          {/* Descriptive Content */}
          <div className="system-description text-gray-900 text-sm leading-relaxed space-y-3.5 font-normal text-justify">
            <p>
              The Solar Grid Connected / Grid Tied / On Grid / Grid Interactive System is designed to convert DC power to AC power for use with regular loads.
            </p>
            <p>
              When the load is less, excess power is fed back to the Grid. The inverter, serving as the interface between the PV array and the Grid.
            </p>
            <p>
              To maximize yield, the MPPT Charge controller must track the I-V curve as the PV array output fluctuates with solar radiation. The microprocessor-based MPPT minimizes power losses. The inverter includes protection features for over-voltage, under-voltage, and surge. Its output is connected to the AC distribution Board.
            </p>
          </div>
        </div>

        {/* Schematic Diagram */}
        <div className="grid-diagram-container my-auto py-2 text-center">
          <div className="inline-block p-2 bg-white rounded-lg border border-slate-200 shadow-xs max-w-full">
            <img 
              src={ASSETS.grid_diagram} 
              alt="Solar Grid Connected System Architectural Diagram" 
              className="mx-auto max-w-full h-auto block rounded-sm"
              style={{ maxHeight: '380px' }}
            />
          </div>
          <p className="text-[9pt] text-slate-500 font-medium italic mt-1.5">
            * Schematic Architecture of On-Grid Rooftop Solar Photovoltaic Power System with Bi-Directional Net-Metering
          </p>
        </div>

        <div className="h-2"></div>
      </div>

      <PageFooter address={company?.officeAddress} />
    </div>
  );
};
