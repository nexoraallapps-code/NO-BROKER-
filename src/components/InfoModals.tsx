import React from 'react';
import { X, ShieldCheck, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

interface InfoModalProps {
  type: 'about' | 'contact' | 'privacy' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'about' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              About NO BROKER Direct
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Founded on the belief that real estate transactions should be transparent, honest, and direct. NO BROKER removes middlemen agents and connects property seekers directly with verified title holders.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Over ₹8,400 Crore saved in extortionate broker fees.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Title verification &amp; Aadhaar e-KYC on every listed property.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Doorstep legal agreements and white-glove relocation services.</span>
              </div>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              Contact Concierge &amp; Support
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Our direct-owner concierge desk is available 7 days a week from 8:00 AM to 10:00 PM IST.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Phone className="w-4 h-4 text-[#C28E52]" />
                <div>
                  <div className="font-bold">Toll-Free Owner Helpline</div>
                  <div className="text-slate-500">1800-NO-BROKER (1800-662-7653)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <Mail className="w-4 h-4 text-[#C28E52]" />
                <div>
                  <div className="font-bold">Email Concierge</div>
                  <div className="text-slate-500">concierge@nobroker.luxury</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <MapPin className="w-4 h-4 text-[#C28E52]" />
                <div>
                  <div className="font-bold">Corporate Headquarters</div>
                  <div className="text-slate-500">Bandra Kurla Complex (BKC), G-Block, Mumbai 400051</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              Zero Brokerage Charter &amp; Privacy Policy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We uphold strict privacy protocols for both owners and seekers:
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-disc pl-5">
              <li>Brokers and real estate agents are strictly barred from scraping or contacting listings.</li>
              <li>Your contact number is only shared with verified parties upon mutual request.</li>
              <li>256-bit encryption safeguards all title deed audits and identification documents.</li>
              <li>Zero spam policy: We never sell customer lead data to third-party telemarketers.</li>
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl mt-4"
        >
          Close
        </button>

      </div>
    </div>
  );
};
