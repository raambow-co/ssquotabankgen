import React from 'react';
import ASSETS from '../assets/assetsData';

export const PageHeader = () => {
  return (
    <div className="pdf-page-header w-full relative overflow-hidden bg-gradient-to-r from-[#cce7ff] via-[#e3f2fd] to-[#ffffff]" style={{ height: '90px' }}>
      {/* Orange main brand banner with angled right cut */}
      <div 
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d84315] via-[#ef6c00] to-[#f57c00] flex flex-col justify-center pl-8 pr-12 z-10 shadow-sm"
        style={{ width: '70%', clipPath: 'polygon(0 0, 100% 0, 91% 100%, 0 100%)' }}
      >
        <h1 className="font-extrabold text-white text-[19.5pt] tracking-wider font-serif leading-none drop-shadow-sm">
          SRIMAAN SOLAR SOLUTIONS
        </h1>
        <p className="text-white text-[8pt] tracking-[0.2em] font-semibold uppercase mt-1 opacity-95">
          GET YOUR OWN POWER STATION ON YOUR ROOFTOP
        </p>
        <p className="text-white text-[8pt] font-mono font-bold mt-1 tracking-wider">
          GSTIN/UIN: 36ADPPT2441N1ZW
        </p>
      </div>

      {/* Diagonal Teal Accent Line */}
      <div 
        className="absolute inset-y-0 bg-[#00b4d8] z-5 shadow-sm"
        style={{ left: '68.5%', width: '3.2%', clipPath: 'polygon(0 0, 100% 0, 91% 100%, 0 100%)' }}
      />

      {/* Right Logo Container */}
      <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-6 pl-2 z-10" style={{ width: '30%' }}>
        <div className="bg-white rounded-md p-1 shadow-xs border border-sky-100 flex items-center justify-center" style={{ height: '78px', width: '150px' }}>
          <img 
            src={ASSETS.srimaan_logo} 
            alt="Srimaan Solar Solutions Logo" 
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export const PageFooter = ({ address }) => {
  const footerText = address || "#6-210,Sriramnagar,BehindAutonagar,Warangalxroad,khammamrural,KHAMMAMDIST-507003";
  return (
    <div className="pdf-page-footer">
      <p className="footer-text">{footerText}</p>
    </div>
  );
};
