import React from 'react';
import { motion } from 'framer-motion';
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
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#131B2E] to-[#0A0F1D] text-white p-8 sm:p-12 lg:p-16 border border-[#C28E52]/30 shadow-2xl"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C28E52]/15 rounded-full blur-3xl pointer-events-none transform translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C28E52]/15 border border-[#C28E52]/30 text-xs font-semibold text-[#D4A366] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C28E52]" />
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
              <motion.button
                type="button"
                onClick={onOpenPostModal}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#C28E52] to-[#AB773D] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
              >
                <PlusCircle className="w-5 h-5 text-amber-200" />
                <span>Post Free Property Ad</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
