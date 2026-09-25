import React from 'react';
import { PlusCircle, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface PostPropertyBannerProps {
  onOpenPostModal: () => void;
}

export const PostPropertyBanner: React.FC<PostPropertyBannerProps> = ({
  onOpenPostModal,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FBF9F6] dark:bg-[#0A0F1D] border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#131B2E] to-[#0A0F1D] text-white p-8 sm:p-12 lg:p-16 border border-[#C28E52]/30 shadow-2xl">
          
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C28E52]/15 rounded-full blur-3xl pointer-events-none transform translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C28E52]/15 border border-[#C28E52]/30 text-xs font-semibold text-[#D4A366] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C28E52]"></span>
                Owner Direct Advantage • 100% Free
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
                Property Rent ya Sell Karein{' '}
                <span className="text-[#E0A96D] italic font-normal block sm:inline">
                  — Zero Commission
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Connect directly with lakhs of verified tenants and serious buyers. 
                Aapko kisi broker ko 1 mahine ka rent ya 2% commission dene ki zaroorat nahi hai.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Multi-Photo Listing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Genuine Inquiries</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Doorstep Rental Agreement</span>
                </div>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenPostModal}
                className="py-4 px-8 rounded-2xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-bold text-sm sm:text-base shadow-xl transition-all transform hover:scale-[1.02] active:scale-98 flex items-center gap-2.5 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Post Your Property (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
