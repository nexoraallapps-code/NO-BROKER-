import React from 'react';
import { Property } from '../types';
import { 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Eye, 
  Compass
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onContactOwner: (property: Property) => void;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onContactOwner,
  isSaved,
  onToggleSave,
}) => {
  return (
    <div className="group bg-white dark:bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 hover:border-[#C28E52]/60 hover:shadow-xl transition-all duration-300 flex flex-col">
      
      {/* Top Image Frame with Overlays */}
      <div 
        className="relative h-64 sm:h-72 w-full overflow-hidden cursor-pointer bg-slate-900"
        onClick={() => onSelect(property)}
      >
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Scrim Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/20 to-black/30" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F5132]/95 backdrop-blur-md text-emerald-200 text-[10px] font-bold tracking-wider uppercase border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              0% Brokerage
            </span>

            {property.owner.verifiedTitle && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F172A]/90 backdrop-blur-md text-slate-100 text-[10px] font-semibold tracking-wide border border-slate-700/60">
                <ShieldCheck className="w-3 h-3 text-[#C28E52]" />
                Verified Owner
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property.id);
            }}
            className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
              isSaved
                ? 'bg-rose-500 text-white scale-105'
                : 'bg-black/50 text-white hover:bg-slate-900/90 hover:text-rose-400'
            }`}
            aria-label="Save property"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
          <span className="text-[11px] font-mono tracking-wide text-slate-300">
            ID: {property.id}
          </span>
          {property.distanceFromUser && (
            <span className="flex items-center gap-1 text-[11px] font-medium bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
              <Compass className="w-3 h-3 text-[#C28E52]" />
              {property.distanceFromUser}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Area with Editorial Spacing */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Price & Brokerage Saved */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div className="text-2xl sm:text-[26px] font-semibold font-serif text-[#1B1C1A] dark:text-white tracking-tight">
              {property.priceFormatted}
            </div>

            <div className="text-[11px] font-bold text-[#80551F] dark:text-[#E0A96D] bg-[#FAF8F5] dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-[#C28E52]/25">
              {property.brokerageSaved}
            </div>
          </div>

          {/* Property Title & Locality */}
          <h3 
            onClick={() => onSelect(property)}
            className="text-base sm:text-lg font-bold text-[#1B1C1A] dark:text-white hover:text-[#C28E52] transition-colors cursor-pointer line-clamp-1"
          >
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C28E52] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Architectural Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-[#FAF8F5] dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-center mb-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Configuration</div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{property.bhk}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Carpet Area</div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{property.carpetArea}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Possession</div>
              <div className="text-xs font-semibold text-[#0F5132] dark:text-emerald-400 mt-0.5 truncate">{property.status}</div>
            </div>
          </div>

          {/* Owner direct indicator */}
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {property.owner.name}
              </span>
              <span className="text-[11px] text-slate-400">(Owner)</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Active {property.owner.responseTime}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => onSelect(property)}
            className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View Details</span>
          </button>

          <button
            type="button"
            onClick={() => onContactOwner(property)}
            className="py-2.5 px-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white dark:bg-[#C28E52] dark:hover:bg-[#AB773D] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact Owner</span>
          </button>
        </div>

      </div>

    </div>
  );
};
