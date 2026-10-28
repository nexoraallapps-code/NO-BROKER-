import React from 'react';
import { Property } from '../types';
import { History, ArrowRight, MapPin, Sparkles, X } from 'lucide-react';

interface RecentlyViewedCarouselProps {
  recentlyViewed: Property[];
  onSelectProperty: (property: Property) => void;
  onClearHistory: () => void;
}

export const RecentlyViewedCarousel: React.FC<RecentlyViewedCarouselProps> = ({
  recentlyViewed,
  onSelectProperty,
  onClearHistory,
}) => {
  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#C28E52]/10 text-[#C28E52]">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Recently Viewed Salons &amp; Residences
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quick return navigation to the last 3 properties you explored
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClearHistory}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
            title="Clear recently viewed history"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>

        {/* Horizontal Carousel Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyViewed.map((property) => (
            <div
              key={property.id}
              onClick={() => onSelectProperty(property)}
              className="group bg-[#FBF9F6] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-3.5 relative overflow-hidden"
            >
              {/* Thumbnail Image */}
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700">
                <img
                  src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop'}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                  {property.bhk}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#C28E52] mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{property.purpose === 'rent' ? 'For Rent' : property.purpose === 'buy' ? 'For Sale' : 'Commercial'}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-[#C28E52] transition-colors">
                  {property.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{property.subLocality}, {property.city}</span>
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    {property.priceFormatted}
                  </span>
                  <span className="text-[11px] font-semibold text-[#C28E52] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>Return</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
