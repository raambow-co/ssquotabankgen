import React from 'react';
import ASSETS from '../assets/assetsData';
import { PageHeader, PageFooter } from './PageHeader';

export const Page1 = ({ data }) => {
  const { refNo, date, customer, company, system } = data;
  const capacity = system?.capacityKw || 5;

  const formatCustomerName = (cust) => {
    const rawName = cust?.name || '';
    if (!rawName.trim()) return 'Mr./Ms. Valued Customer';
    const trimmed = rawName.trim();
    if (cust?.salutation) {
      if (trimmed.toLowerCase().startsWith(cust.salutation.toLowerCase())) {
        return trimmed;
      }
      return `${cust.salutation} ${trimmed}`;
    }
    if (/^(mr\.?|ms\.?|mrs\.?|dr\.?|shri\.?|smt\.?|prof\.?|m\/s\.?)/i.test(trimmed)) {
      return trimmed;
    }
    return `Mr./Ms. ${trimmed}`;
  };

  return (
    <div className="a4-page page-1 flex flex-col justify-start">
      {/* Official Header Banner */}
      <PageHeader />

      {/* Hero Banner Image - Extended upwards immediately below header banner */}
      <div className="w-full px-6 pt-1 pb-1">
        <img 
          src={ASSETS.solar_hero_banner} 
          alt="Solar Energy For Every Home - Rooftop Solar Installation" 
          className="w-full block rounded-xs shadow-xs object-cover border border-slate-200"
          style={{ height: '235px', width: '100%', objectPosition: 'center 40%' }}
        />
      </div>

      {/* Main Page 1 Content */}
      <div className="page-content px-8 pt-1 pb-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Techno Offer Title */}
          <div className="text-center my-2">
            <h1 className="offer-main-title font-bold italic tracking-wide text-[#196f3d] leading-tight text-[13.5pt]">
              DETAILED TECHNO OFFER FOR THE SUPPLY OF {capacity}KW SOLAR ROOFTOP
              <br />
              ONGRID POWER GENERATING SYSTEM
            </h1>
          </div>

          {/* Ref No (Left) and Date (Right) in a Single Line */}
          <div className="flex items-center justify-between mt-2 mb-2 text-left">
            <h2 className="ref-number-text font-bold text-[#0099b8] tracking-wide text-[11pt]">
              REF: {data.masterRefNo || customer?.consumerNo || refNo}
            </h2>
            <p className="font-bold text-gray-900 text-[11pt] tracking-wide text-right">
              DATE: {date}
            </p>
          </div>

          {/* Customer Details */}
          <div className="customer-details-box mt-2 mb-3 text-left">
            <h3 className="customer-title font-bold text-[#8b0000] underline text-sm tracking-wide mb-1">
              CUSTOMER DETAILS:
            </h3>
            <div className="customer-info-text text-sm font-semibold text-gray-900 leading-relaxed space-y-0.5">
              <p className="font-bold text-[10.5pt] text-black">{formatCustomerName(customer)}</p>
              {customer.company && <p className="font-medium text-gray-800">{customer.company}</p>}
              <p>{customer.addressLine1}</p>
              <p>
                District: {customer.district}, State: {customer.state}, PIN Code: {customer.pinCode}
              </p>
              <p className="tracking-wider font-bold">Ph: {customer.phone}</p>
            </div>
          </div>

          {/* Offer Submitted By */}
          <div className="submitted-by-section mt-3 mb-2">
            <h3 className="submitted-title font-bold text-[#154360] underline text-sm tracking-wide mb-1.5 text-left">
              OFFER SUBMITTED BY:
            </h3>

            <div className="company-quote-box border-2 border-black p-3 text-center rounded-xs max-w-lg mx-auto bg-white shadow-xs">
              <p className="font-extrabold text-[#006699] text-base leading-tight tracking-wide uppercase">
                {company.name}
              </p>
              <p className="font-bold text-[#006699] text-xs leading-snug mt-1 max-w-md mx-auto">
                <span className="font-extrabold text-gray-900">Registered Office: </span>
                {(company?.registeredOffice && company.registeredOffice.includes('SRIRAMNAGAR')) 
                  ? company.registeredOffice 
                  : (company?.addressLine1 && company.addressLine1.includes('SRIRAMNAGAR')) 
                    ? company.addressLine1 
                    : "6-210 SRIRAMNAGAR BEHIND AUTONAGAR WARANGAL X ROAD, Edulapuram Muncipalty, Khammam district, Telangana State 507003"}
              </p>
              <p className="font-bold text-sky-600 text-xs leading-tight mt-1">
                Ph: {company.phone1}{company.phone2 ? `, ${company.phone2}` : ''}
              </p>
              <p className="font-bold text-[#006699] text-xs leading-tight mt-0.5">
                Email: {company.email}
              </p>
              <p className="font-bold text-red-600 text-xs tracking-wider mt-1.5 pt-1 border-t border-gray-200">
                <span>GSTNO: {company.gstNo}</span>
                <span className="ml-6">PANNO: {company.panNo}</span>
              </p>
              <p className="font-extrabold text-[#154360] text-xs tracking-wider mt-1 pt-0.5 border-t border-gray-100">
                <span>VENDOR REG. NO: {company.vendorRegNo || "TSRE250511"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Purple Footer */}
      <PageFooter address={company.officeAddress} />
    </div>
  );
};
