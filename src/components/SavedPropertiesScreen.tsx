import React, { useState } from 'react';
import { Property, UserProfile } from '../types';
import { 
  Heart, 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  X, 
  Search, 
  Home,
  Eye,
  Share2,
  Check
} from 'lucide-react';

interface SavedPropertiesScreenProps {
  onBack: () => void;
  savedProperties: Property[];
  onSelectProperty: (property: Property) => void;
  onContactOwner: (property: Property) => void;
  onRemoveSaved: (propertyId: string) => void;
  onFindMore: () => void;
  user: UserProfile;
}

export const SavedPropertiesScreen: React.FC<SavedPropertiesScreenProps> = ({
  onBack,
  savedProperties,
  onSelectProperty,
  onContactOwner,
  onRemoveSaved,
  onFindMore,
  user,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'available' | 'furnished'>('all');
  const [previewEmptyView, setPreviewEmptyView] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = savedProperties.filter((p) => {
    if (filterType === 'all') return true;
    if (filterType === 'available') {
      return p.status.toLowerCase().includes('immediate') || p.status.toLowerCase().includes('ready');
    }
    if (filterType === 'furnished') {
      return p.furnishing.toLowerCase().includes('furnished');
    }
    return true;
  });

  const availableCount = savedProperties.filter(
    (p) => p.status.toLowerCase().includes('immediate') || p.status.toLowerCase().includes('ready')
  ).length;

  const furnishedCount = savedProperties.filter(
    (p) => p.furnishing.toLowerCase().includes('furnished')
  ).length;

  const showEmpty = previewEmptyView || savedProperties.length === 0;

  const handleShare = (property: Property) => {
    navigator.clipboard?.writeText(window.location.origin + '#' + property.id);
    setCopiedId(property.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] pb-28">
      
      {/* Fixed Header Bar exactly like User Mockup */}
      <header className="sticky top-0 w-full z-40 bg-[#FBF9F6]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              aria-label="Navigate Back"
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[#0F172A] dark:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex flex-col">
              <span className="text-[11px] tracking-wider uppercase text-[#C28E52] font-semibold">
                Private Portfolio
              </span>
              <h1 className="text-lg sm:text-xl font-bold font-serif text-[#0F172A] dark:text-white tracking-tight">
                Saved Properties
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#EFEEEB] dark:bg-slate-800 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#0F5132]"></span>
              <span className="text-[11px] font-bold text-[#0F5132] dark:text-emerald-400 uppercase tracking-wider">
                Direct
              </span>
            </div>

            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#C28E52] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Main Content Container matching Layout in User Spec */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 space-y-5">
        
        {/* View State Controller Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F172A] dark:text-white tracking-tight">
                Saved Properties
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFEEEB] dark:bg-slate-800 text-[#C28E52] text-xs font-semibold">
                {savedProperties.length} Properties Saved
              </span>
            </div>

            {/* Toggle between Active List and Empty State Preview */}
            <button
              onClick={() => setPreviewEmptyView(!previewEmptyView)}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors py-1.5 px-2.5 rounded-lg bg-[#F5F3F0] dark:bg-slate-800/80 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">
                {previewEmptyView ? 'Show Saved List' : 'Empty View'}
              </span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            All direct owner homes saved by you with zero brokerage.
          </p>

          {/* Filter Chips Strip matching Exact Design */}
          {!showEmpty && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-[#0F172A] text-white dark:bg-[#C28E52]'
                    : 'bg-[#F5F3F0] dark:bg-slate-800 text-[#1B1C1A] dark:text-slate-300 hover:bg-[#EFEEEB]'
                }`}
              >
                All ({savedProperties.length})
              </button>

              <button
                onClick={() => setFilterType('available')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterType === 'available'
                    ? 'bg-[#0F172A] text-white dark:bg-[#C28E52]'
                    : 'bg-[#F5F3F0] dark:bg-slate-800 text-[#1B1C1A] dark:text-slate-300 hover:bg-[#EFEEEB]'
                }`}
              >
                Available Now ({availableCount})
              </button>

              <button
                onClick={() => setFilterType('furnished')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterType === 'furnished'
                    ? 'bg-[#0F172A] text-white dark:bg-[#C28E52]'
                    : 'bg-[#F5F3F0] dark:bg-slate-800 text-[#1B1C1A] dark:text-slate-300 hover:bg-[#EFEEEB]'
                }`}
              >
                Furnished ({furnishedCount})
              </button>
            </div>
          )}
        </div>

        {/* Saved List or Empty View State */}
        {!showEmpty ? (
          <div className="space-y-6">
            
            {/* Property Cards - Designed with exact typography & layout from user mockup */}
            <div className="space-y-5">
              {filtered.map((property) => (
                <article
                  key={property.id}
                  className="bg-white dark:bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-300"
                >
                  {/* Property Image Frame */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] overflow-hidden bg-slate-900">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Top Badges Glass Overlay */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5]/90 dark:bg-[#0F172A]/90 backdrop-blur-md shadow-sm border border-slate-200/50 dark:border-slate-700">
                        <span className="w-2 h-2 rounded-full bg-[#0F5132]"></span>
                        <span className="text-[10px] tracking-wider uppercase text-[#0F5132] dark:text-emerald-400 font-bold">
                          0% Brokerage • Direct Owner
                        </span>
                      </div>

                      <button
                        aria-label="Remove from saved"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveSaved(property.id);
                        }}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-[#FAF8F5]/90 dark:bg-[#0F172A]/90 backdrop-blur-md flex items-center justify-center text-[#C28E52] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Heart className="w-5 h-5 fill-current text-rose-500" />
                      </button>
                    </div>

                    {/* Availability Ribbon on Image Bottom Left */}
                    <div className="absolute bottom-3 left-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide uppercase">
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Information */}
                  <div className="p-4 sm:p-6 space-y-3">
                    
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-[#C28E52] uppercase tracking-wider">
                        {property.bhk}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-serif text-[#0F172A] dark:text-white">
                        {property.priceFormatted}
                      </span>
                    </div>

                    <h3 
                      onClick={() => onSelectProperty(property)}
                      className="text-lg sm:text-xl font-bold font-serif text-[#0F172A] dark:text-white hover:text-[#C28E52] cursor-pointer transition-colors"
                    >
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-[#C28E52] shrink-0" />
                      <span className="truncate">{property.location}</span>
                      {property.distanceFromUser && (
                        <span>• {property.distanceFromUser}</span>
                      )}
                    </div>

                    {/* Quick Tags matching mockup */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-1 rounded bg-[#F1F5F9] dark:bg-slate-800 text-[#0F172A] dark:text-slate-200 text-[11px] font-medium">
                        {property.furnishing}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#F1F5F9] dark:bg-slate-800 text-[#0F172A] dark:text-slate-200 text-[11px] font-medium">
                        {property.carpetArea}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#F1F5F9] dark:bg-slate-800 text-[#0F172A] dark:text-slate-200 text-[11px] font-medium">
                        Owner: {property.owner.name}
                      </span>
                    </div>

                    {/* Action Buttons: View Property (Primary) & Remove (Secondary) */}
                    <div className="flex items-center gap-2 pt-3">
                      <button
                        onClick={() => onSelectProperty(property)}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] dark:bg-[#C28E52] dark:hover:bg-[#AB773D] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                      >
                        <span>View Property</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onContactOwner(property)}
                        className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                      >
                        Contact
                      </button>

                      <button
                        onClick={() => onRemoveSaved(property.id)}
                        className="py-3 px-3 rounded-xl bg-[#F5F3F0] hover:bg-rose-50 dark:bg-slate-800/60 dark:hover:bg-rose-950/40 text-slate-500 hover:text-rose-600 transition-colors flex items-center justify-center gap-1 cursor-pointer text-xs"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                  </div>
                </article>
              ))}
            </div>

            {/* Bottom Discovery Banner from user's screen */}
            <div className="p-6 rounded-2xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-1.5 text-[#C28E52]">
                <Home className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-bold">
                  Direct Homes Network
                </span>
              </div>

              <h4 className="text-xl font-bold font-serif text-[#0F172A] dark:text-white">
                Looking for more properties?
              </h4>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                Browse thousands of verified direct owner homes across your city with zero middleman fees.
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={onFindMore}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
                >
                  <span>Find Property</span>
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Full Empty State View exactly matching the user's HTML design */
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#C28E52] shadow-inner">
              <Heart className="w-9 h-9" />
            </div>

            <div className="space-y-1 max-w-xs">
              <h3 className="text-2xl font-bold font-serif text-[#0F172A] dark:text-white">
                No Saved Properties Yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                You haven&apos;t saved any properties so far. Click the heart icon on any property to save it here.
              </p>
            </div>

            <div className="pt-2 w-full max-w-xs">
              <button
                type="button"
                onClick={onFindMore}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] dark:bg-[#C28E52] dark:hover:bg-[#AB773D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Find Property</span>
              </button>
            </div>

            {savedProperties.length === 0 && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-3 text-xs text-[#C28E52] hover:underline cursor-pointer"
              >
                Restore demo saved properties
              </button>
            )}
          </div>
        )}

      </main>

    </div>
  );
};
