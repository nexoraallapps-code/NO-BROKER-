import React, { useState } from 'react';
import { Property, UserProfile } from '../types';
import { 
  Heart, 
  X, 
  MapPin, 
  Eye, 
  Phone, 
  Trash2, 
  ArrowRight, 
  Building2, 
  Share2, 
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface SavedPropertiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onSelectProperty: (property: Property) => void;
  onContactOwner: (property: Property) => void;
  onRemoveSaved: (propertyId: string) => void;
  user: UserProfile;
  onOpenAuth: () => void;
}

export const SavedPropertiesModal: React.FC<SavedPropertiesModalProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onSelectProperty,
  onContactOwner,
  onRemoveSaved,
  user,
  onOpenAuth,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'rent' | 'buy'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = savedProperties.filter((p) => {
    if (filterType === 'all') return true;
    return p.purpose === filterType;
  });

  const handleCopyLink = (property: Property) => {
    navigator.clipboard?.writeText(window.location.origin + '#' + property.id);
    setCopiedId(property.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0A0F1D] text-slate-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-rose-500">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif">Saved Properties & Shortlist</h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#C28E52]/15 text-[#C28E52] border border-[#C28E52]/30">
                  {savedProperties.length} Saved
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct owner residences you have shortlisted. Direct contact without broker interference.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Status / Quota Banner */}
        <div className="px-6 py-3 bg-[#FAF8F5] dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 dark:text-slate-400">
              {user.isAuthenticated ? (
                <>Signed in as <strong className="text-slate-900 dark:text-white">{user.name || user.phone}</strong></>
              ) : (
                <>Browsing as Guest — <button onClick={onOpenAuth} className="text-[#C28E52] font-bold underline">Login / Sign In</button> to sync across devices</>
              )}
            </span>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 text-xs font-medium rounded ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white dark:bg-[#C28E52]'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All ({savedProperties.length})
            </button>
            <button
              onClick={() => setFilterType('rent')}
              className={`px-3 py-1 text-xs font-medium rounded ${
                filterType === 'rent'
                  ? 'bg-slate-900 text-white dark:bg-[#C28E52]'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Rent ({savedProperties.filter((p) => p.purpose === 'rent').length})
            </button>
            <button
              onClick={() => setFilterType('buy')}
              className={`px-3 py-1 text-xs font-medium rounded ${
                filterType === 'buy'
                  ? 'bg-slate-900 text-white dark:bg-[#C28E52]'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Buy ({savedProperties.filter((p) => p.purpose === 'buy').length})
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((property) => (
                <div
                  key={property.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#C28E52]/60 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex gap-4 p-4">
                    {/* Property Image */}
                    <div 
                      className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden shrink-0 cursor-pointer bg-slate-900"
                      onClick={() => {
                        onClose();
                        onSelectProperty(property);
                      }}
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider bg-black/70 text-white px-1.5 py-0.5 rounded">
                        {property.bhk}
                      </span>
                    </div>

                    {/* Property Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-[#C28E52] uppercase tracking-wider">
                            {property.purpose.toUpperCase()} • 0% BROKERAGE
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {property.id}
                          </span>
                        </div>

                        <h3 
                          onClick={() => {
                            onClose();
                            onSelectProperty(property);
                          }}
                          className="text-sm font-bold text-slate-900 dark:text-white hover:text-[#C28E52] cursor-pointer line-clamp-1 mt-0.5"
                        >
                          {property.title}
                        </h3>

                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 text-[#C28E52] shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>

                        <div className="mt-2 text-base font-bold font-serif text-slate-900 dark:text-white">
                          {property.priceFormatted}
                        </div>

                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          {property.brokerageSaved}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between">
                        <span>Owner: <strong className="text-slate-800 dark:text-slate-200">{property.owner.name}</strong></span>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">
                          {property.furnishing}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => onRemoveSaved(property.id)}
                      className="text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyLink(property)}
                        className="p-1.5 rounded text-slate-500 hover:text-slate-800 dark:hover:text-white"
                        title="Copy link"
                      >
                        {copiedId === property.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProperty(property);
                        }}
                        className="px-2.5 py-1.5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white font-medium"
                      >
                        Details
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onContactOwner(property);
                        }}
                        className="px-3 py-1.5 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white dark:bg-[#C28E52] dark:hover:bg-[#AB773D] font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Contact</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold font-serif">Aapki Shortlist Abhi Khali Hai</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Browse our verified residences in your city and click the heart icon on any card to save, compare, and connect with direct owners anytime.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-[#C28E52] text-white text-xs font-bold hover:bg-[#AB773D] transition-colors"
              >
                Explore Properties Now
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Brokerage Guaranteed on all listed properties</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
