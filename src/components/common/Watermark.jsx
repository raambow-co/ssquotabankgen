import React from 'react';

export default function Watermark() {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20 overflow-hidden" 
      aria-hidden="true"
    >
      <img 
        src="/assets/srimaan_logo.jpeg" 
        alt="" 
        className="w-[320px] h-auto object-contain opacity-[0.06] pointer-events-none select-none grayscale"
      />
    </div>
  );
}
