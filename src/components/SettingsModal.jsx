import React, { useState } from 'react';
import { X, Save, RotateCcw, Building, CreditCard, DollarSign } from 'lucide-react';
import { DEFAULT_COMPANY, DEFAULT_BANK } from '../data/defaultData';

export const SettingsModal = ({ isOpen, onClose, onSaveSettings, currentCompany, currentBank }) => {
  const [company, setCompany] = useState(currentCompany || DEFAULT_COMPANY);
  const [bank, setBank] = useState(currentBank || DEFAULT_BANK);
  const [defaultTariff, setDefaultTariff] = useState(8);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings({ company, bank, defaultTariff });
    onClose();
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset company and bank details to Srimaan Solar Solutions defaults?")) {
      setCompany(DEFAULT_COMPANY);
      setBank(DEFAULT_BANK);
      setDefaultTariff(8);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">Manage Pricing &amp; Defaults</h2>
            <p className="text-xs text-slate-500 mt-0.5">Configure default EPC vendor info, bank details, and tariffs</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* Company Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold border-b border-slate-100 pb-2">
              <Building size={16} className="text-amber-500" />
              <span>Company &amp; Registration Defaults</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Company Legal Name</label>
                <input
                  type="text"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={company.gstNo}
                  onChange={(e) => setCompany({ ...company, gstNo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">PAN Number</label>
                <input
                  type="text"
                  value={company.panNo}
                  onChange={(e) => setCompany({ ...company, panNo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Primary Phone</label>
                <input
                  type="text"
                  value={company.phone1}
                  onChange={(e) => setCompany({ ...company, phone1: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Secondary Phone</label>
                <input
                  type="text"
                  value={company.phone2}
                  onChange={(e) => setCompany({ ...company, phone2: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Company Email</label>
                <input
                  type="email"
                  value={company.email}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Vendor Registration No.</label>
                <input
                  type="text"
                  value={company.vendorRegNo}
                  onChange={(e) => setCompany({ ...company, vendorRegNo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Office Address (Footer text)</label>
                <input
                  type="text"
                  value={company.officeAddress}
                  onChange={(e) => setCompany({ ...company, officeAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold border-b border-slate-100 pb-2">
              <CreditCard size={16} className="text-emerald-500" />
              <span>Default Bank Details for NEFT / RTGS (Page 6)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bank.bankName}
                  onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Account Name</label>
                <input
                  type="text"
                  value={bank.accountName}
                  onChange={(e) => setBank({ ...bank, accountName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Account Number</label>
                <input
                  type="text"
                  value={bank.accountNo}
                  onChange={(e) => setBank({ ...bank, accountNo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={bank.ifscCode}
                  onChange={(e) => setBank({ ...bank, ifscCode: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-3 py-2 text-xs text-slate-500 hover:text-slate-800 transition"
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4 py-2 bg-[#0b132b] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
