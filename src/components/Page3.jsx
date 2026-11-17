import React from 'react';
import { PageHeader, PageFooter } from './PageHeader';

export const Page3 = ({ data }) => {
  const { company, system } = data;
  const capacity = system?.capacityKw || 5;

  const benefits = [
    { title: "Vacant Roof Space Monetization:", desc: "Optimal utilization of idle, vacant roof area for high-yield clean power generation." },
    { title: "Captive Load & Grid Feeding:", desc: "The power generated from Solar PV System can be utilized for powering captive household/commercial loads, and excess surplus energy can be fed back into the Grid." },
    { title: "Bi-Directional Net Metering Settlement:", desc: "Provision for official financial settlement of registered surplus energy fed to the grid on a quarterly or half-yearly basis by the DISCOM." },
    { title: "Zero Transmission & Distribution Losses:", desc: "Generate power directly at the consumption site; hence technically eliminates long-distance distribution and wheeling losses." },
    { title: "Hedge Against Inflation:", desc: "Future-proof against constantly rising grid electricity tariffs as it fixes your electricity generation cost per kWh for decades." },
    { title: "Substantial Bill Reduction:", desc: "Immediate, drastic reduction in monthly electricity consumption and recurring utility bills from the grid." },
    { title: "Minimal Maintenance Costs:", desc: "Extremely low operating and maintenance costs compared to diesel generator sets (no moving parts, zero fuel costs)." },
    { title: "Long Operational Lifespan:", desc: "Rugged durability with a design life exceeding 25 years with high-efficiency tier-1 components." },
    { title: "Zero Carbon Emissions:", desc: "100% clean green energy without any emissions of greenhouse gases, actively mitigating climate change." }
  ];

  return (
    <div className="a4-page page-3 flex flex-col justify-start">
      <PageHeader />

      <div className="page-content px-10 pt-4 pb-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <div className="text-center my-4">
            <h2 className="text-xl font-bold text-gray-900 underline tracking-wide font-sans">
              Benefits of Implementing Solar PV System Installation
            </h2>
          </div>

          {/* Intro Text */}
          <div className="mb-5">
            <p className="text-gray-900 text-base leading-relaxed text-justify">
              The installation of a <span className="font-bold text-black bg-amber-100/60 px-1 rounded">{capacity} KW</span> Grid Connected Rooftop Solar Power System will fulfill the captive electrical load requirements of the house / facility. Moreover, it offers the following techno-commercial advantages:
            </p>
          </div>

          {/* Bullet List */}
          <div className="benefits-list space-y-3.5 text-gray-900 font-normal text-sm leading-relaxed">
            {benefits.map((b, index) => (
              <div key={index} className="flex items-start">
                <span className="inline-block mr-3 text-base font-bold text-emerald-700 leading-tight">●</span>
                <p className="flex-1 text-gray-900 leading-snug">
                  <span className="font-bold text-slate-900 mr-1">{b.title}</span>
                  <span className="font-medium text-slate-800">{b.desc}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-2"></div>
      </div>

      <PageFooter address={company?.officeAddress} />
    </div>
  );
};
