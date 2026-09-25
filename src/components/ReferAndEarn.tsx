import React, { useState } from 'react';
import { Gift, Copy, Check, Share2, MessageSquare } from 'lucide-react';

interface ReferAndEarnProps {
  onClose?: () => void;
}

export const ReferAndEarn: React.FC<ReferAndEarnProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'LUX-NOBROKER25';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! Find your next home or rent out your property on NO BROKER without paying any brokerage. Use my code ${referralCode} to get direct owner access: https://nobroker.com`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section className="py-8 bg-[#FAF8F5] dark:bg-[#0A0F1D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded">
                  Referral Rewards
                </span>
                <span className="text-xs text-slate-400">Instant Cash to Bank / UPI</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white mt-0.5">
                Refer &amp; Earn Privileges
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">
                Invite property owners or seekers. Earn <span className="font-bold text-[#C28E52]">₹1,000 instant cash reward</span> when their listing goes live or lease is finalized without intermediaries.
              </p>
            </div>
          </div>

          {/* Right: Code & WhatsApp Share */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono">
              <span className="text-[10px] text-slate-400 uppercase font-sans">Code:</span>
              <span className="font-bold text-slate-900 dark:text-white">{referralCode}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-1 p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="py-2 px-4 rounded-lg bg-[#0F5132] hover:bg-[#146c43] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share via WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
