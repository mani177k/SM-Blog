import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Mail, MapPin, Send } from 'lucide-react';

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetInTouchModal: React.FC<GetInTouchModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [investorType, setInvestorType] = useState('Individual Retail Investor');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Header */}
        <div className="bg-[#081728] text-white p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B83E18]">
              Sundaram Advisory Desk
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-0.5">
              Get in Touch with an Investment Specialist
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-slate-900">
                Inquiry Received
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. A certified Sundaram Mutual wealth strategist will connect with you at <strong>{email}</strong> within 1 business day.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-5 py-2 bg-[#081728] text-white text-xs font-semibold rounded-lg hover:bg-[#B83E18] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#B83E18]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#B83E18]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Investor Category</label>
                <select
                  value={investorType}
                  onChange={(e) => setInvestorType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#B83E18]"
                >
                  <option>Individual Retail Investor</option>
                  <option>High Net Worth Individual (HNI)</option>
                  <option>Corporate Treasury / Family Office</option>
                  <option>Registered Mutual Fund Distributor (MFD)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Inquiry / Goal Description</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Looking to structure a ₹50,000 monthly SIP portfolio across large and mid cap equity funds..."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#B83E18]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B83E18] hover:bg-[#D0481E] text-white font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Specialist Callback</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Toll-Free: 1800-425-1000</span>
                <span>service@sundarammutual.com</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
