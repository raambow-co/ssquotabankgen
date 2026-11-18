import React from 'react';
import CustomerPage1Cover from './customerPages/CustomerPage1Cover';
import CustomerPage2SystemSpec from './customerPages/CustomerPage2SystemSpec';
import CustomerPage3Financials from './customerPages/CustomerPage3Financials';
import CustomerPage4Portfolio from './customerPages/CustomerPage4Portfolio';
import CustomerPage5CompanyProfile from './customerPages/CustomerPage5CompanyProfile';
import { convertToCustomerFormat } from '../utils/quotationAdapter';

export const CustomerQuotationViewer = ({ data, quotation: directQuotation, settings: directSettings, activePage = 'all' }) => {
  let quotation = directQuotation;
  let settings = directSettings;

  if (!quotation || !settings) {
    const converted = convertToCustomerFormat(data);
    quotation = quotation || converted.quotation;
    settings = settings || converted.settings;
  }

  const renderPage = (pageNum) => {
    switch (pageNum) {
      case 1:
        return <CustomerPage1Cover quotation={quotation} settings={settings} />;
      case 2:
        return <CustomerPage2SystemSpec quotation={quotation} settings={settings} />;
      case 3:
        return <CustomerPage3Financials quotation={quotation} settings={settings} />;
      case 4:
        return <CustomerPage4Portfolio quotation={quotation} settings={settings} />;
      case 5:
        return <CustomerPage5CompanyProfile quotation={quotation} settings={settings} />;
      default:
        return null;
    }
  };

  if (activePage !== 'all') {
    const pageNum = parseInt(activePage, 10);
    return (
      <div className="flex justify-center py-4 print:p-0">
        <div className="shadow-2xl print:shadow-none">
          {renderPage(pageNum)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6 print:gap-0 print:p-0">
      {[1, 2, 3, 4, 5].map((pageNum) => (
        <div key={pageNum} className="document-page-wrapper shadow-2xl print:shadow-none">
          {renderPage(pageNum)}
        </div>
      ))}
    </div>
  );
};

export default CustomerQuotationViewer;
