import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Home, 
  Sparkles, 
  Briefcase, 
  Store, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { PropertyType } from '../types';

interface ConfigurationBrowseProps {
  onSelectCategory: (type: PropertyType | 'all', bhk?: string) => void;
}

export const ConfigurationBrowse: React.FC<ConfigurationBrowseProps> = ({
  onSelectCategory,
}) => {
  const categories = [
    {
      label: '1 BHK',
      subtext: '4,120+ Verified',
      icon: Home,
      action: () => onSelectCategory('flat', '1 BHK'),
    },
    {
      label: '2 BHK',
      subtext: '8,950+ Verified',
      icon: Building2,
      action: () => onSelectCategory('flat', '2 BHK'),
    },
    {
      label: '3 BHK',
      subtext: '6,310+ Verified',
      icon: Building2,
      action: () => onSelectCategory('flat', '3 BHK'),
    },
    {
      label: '4+ BHK',
      subtext: '2,180+ Verified',
      icon: Layers,
      action: () => onSelectCategory('flat', '4 BHK'),
    },
    {
      label: 'Villas',
      subtext: '1,450+ Verified',
      icon: Home,
      action: () => onSelectCategory('house'),
    },
    {
      label: 'Penthouses',
      subtext: '740+ Verified',
      icon: Sparkles,
      action: () => onSelectCategory('penthouse'),
    },
    {
      label: 'Shops & PG',
      subtext: '3,200+ Verified',
      icon: Store,
      action: () => onSelectCategory('pg'),
    },
    {
      label: 'Offices',
      subtext: '2,890+ Verified',
      icon: Briefcase,
      action: () => onSelectCategory('office'),
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F5] dark:bg-[#0A0F1D] border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8"
        >
          <div>
            <div className="text-[11px] font-bold text-[#C28E52] uppercase tracking-widest mb-1">
              Curated Portfolios
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-serif text-[#1B1C1A] dark:text-white">
              Browse by Configuration &amp; Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              100% direct from verified property owners across top micro-markets
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C28E52] hover:text-[#AB773D] group cursor-pointer"
          >
            <span>View All Portfolios</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.label}
                type="button"
                onClick={cat.action}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 hover:border-[#C28E52] dark:hover:border-[#C28E52] hover:shadow-xl transition-all group cursor-pointer text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] dark:bg-slate-800/80 flex items-center justify-center mb-3 text-[#C28E52] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#1B1C1A] dark:text-white">
                  {cat.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 whitespace-nowrap">
                  {cat.subtext}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
