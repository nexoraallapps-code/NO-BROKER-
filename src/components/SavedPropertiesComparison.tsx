import React, { useState } from 'react';
import { Property } from '../types';
import { generateOwnerWhatsAppUrl } from '../utils/whatsapp';
import {
  Check,
  X,
  Plus,
  ArrowRight,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  Maximize2,
  Trash2,
  Copy,
  CheckCheck,
  AlertCircle,
  HelpCircle,
  Building,
  Compass,
  Layers,
  Zap,
  Waves,
  Dumbbell,
  Shield,
  Car,
  Flame,
  Dog,
  Trees,
  CheckCircle2
} from 'lucide-react';

interface SavedPropertiesComparisonProps {
  allSavedProperties: Property[];
  selectedPropertyIds: string[];
  onToggleSelectProperty: (id: string) => void;
  onSelectPropertyDetails: (property: Property) => void;
  onContactOwner: (property: Property) => void;
  onRemoveSaved: (id: string) => void;
  onFindMore: () => void;
  onBackToList: () => void;
}

const STANDARD_AMENITIES = [
  { name: '24/7 Security', icon: Shield, aliases: ['security', 'cctv', 'gated'] },
  { name: 'Power Backup', icon: Zap, aliases: ['power', 'backup', 'generator'] },
  { name: 'Covered Parking', icon: Car, aliases: ['parking', 'covered parking', 'reserved parking'] },
  { name: 'High-Speed Lift', icon: Building, aliases: ['lift', 'elevator'] },
  { name: 'Swimming Pool', icon: Waves, aliases: ['pool', 'swimming'] },
  { name: 'Gymnasium / Fitness', icon: Dumbbell, aliases: ['gym', 'fitness', 'club'] },
  { name: 'Clubhouse', icon: Building, aliases: ['clubhouse', 'community hall'] },
  { name: 'Piped Gas Line', icon: Flame, aliases: ['piped gas', 'gas', 'gas line'] },
  { name: 'Pet Friendly', icon: Dog, aliases: ['pet', 'pets allowed', 'dog friendly'] },
  { name: 'Garden / Play Area', icon: Trees, aliases: ['park', 'garden', 'play area', 'children play'] },
];

export const SavedPropertiesComparison: React.FC<SavedPropertiesComparisonProps> = ({
  allSavedProperties,
  selectedPropertyIds,
  onToggleSelectProperty,
  onSelectPropertyDetails,
  onContactOwner,
  onRemoveSaved,
  onFindMore,
  onBackToList,
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Filter the currently compared properties in order
  const comparedProperties = allSavedProperties.filter((p) =>
    selectedPropertyIds.includes(p.id)
  );

  // Unselected saved properties for quick-add
  const availableToAdd = allSavedProperties.filter(
    (p) => !selectedPropertyIds.includes(p.id)
  );

  // Check if a specific amenity exists in property
  const hasAmenity = (prop: Property, amenityRule: typeof STANDARD_AMENITIES[0]) => {
    if (!prop.amenities || prop.amenities.length === 0) return false;
    const lowerList = prop.amenities.map((a) => a.toLowerCase());
    return (
      lowerList.includes(amenityRule.name.toLowerCase()) ||
      amenityRule.aliases.some((alias) =>
        lowerList.some((item) => item.includes(alias))
      )
    );
  };

  // Helper to check if a row differs across compared properties
  const isRowDifferent = (getValue: (p: Property) => any) => {
    if (comparedProperties.length <= 1) return false;
    const firstVal = JSON.stringify(getValue(comparedProperties[0]));
    return comparedProperties.some(
      (p) => JSON.stringify(getValue(p)) !== firstVal
    );
  };

  // Copy structured comparison summary to clipboard
  const handleCopyComparisonSummary = () => {
    if (comparedProperties.length === 0) return;
    let text = `🏡 Direct Owner Property Comparison (NoBroker Direct):\n\n`;
    comparedProperties.forEach((p, idx) => {
      text += `Option ${idx + 1}: ${p.title}\n`;
      text += `• Price: ${p.priceFormatted} (${p.brokerageSaved})\n`;
      text += `• Configuration: ${p.bhk} • ${p.carpetArea}\n`;
      text += `• Location: ${p.location}\n`;
      text += `• Furnishing: ${p.furnishing}\n`;
      text += `• Direct Owner: ${p.owner.name} (${p.owner.phone})\n\n`;
    });
    navigator.clipboard?.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  if (allSavedProperties.length < 2) {
    return (
      <div className="p-8 sm:p-12 text-center rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 space-y-4 max-w-xl mx-auto shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-[#C28E52] flex items-center justify-center">
          <SlidersHorizontal className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
            Save At Least 2 Properties to Compare
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Side-by-side comparison lets you evaluate BHK configurations, monthly rents, deposits, and amenities across your shortlisted homes.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onFindMore}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] dark:bg-[#C28E52] dark:hover:bg-[#AB773D] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Explore &amp; Save Properties
          </button>
          <button
            type="button"
            onClick={onBackToList}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer"
          >
            Back to Saved List
          </button>
        </div>
      </div>
    );
  }

  if (comparedProperties.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
            No Properties Selected for Comparison
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Choose properties from your saved list to place them side by side.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            // Pick first 2 or 3 by default
            allSavedProperties.slice(0, 3).forEach((p) => {
              if (!selectedPropertyIds.includes(p.id)) {
                onToggleSelectProperty(p.id);
              }
            });
          }}
          className="px-6 py-2.5 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Compare Top {Math.min(3, allSavedProperties.length)} Saved Homes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Comparison Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Comparing {comparedProperties.length} of {allSavedProperties.length} Saved Homes
            </h3>
          </div>
          <span className="text-xs font-medium text-[#C28E52] bg-[#FAF8F5] dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-[#C28E52]/20">
            0% Brokerage Handshake
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Highlight Differences Toggle */}
          <button
            type="button"
            onClick={() => setHighlightDifferences(!highlightDifferences)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              highlightDifferences
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#C28E52]'
            }`}
            title="Highlight fields that differ across selected properties"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C28E52]" />
            <span>{highlightDifferences ? 'Highlighting Differences' : 'Highlight Differences'}</span>
          </button>

          {/* Add / Swap Slot Trigger */}
          {availableToAdd.length > 0 && comparedProperties.length < 4 && (
            <button
              type="button"
              onClick={() => setIsAddPropertyModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#C28E52] text-slate-800 dark:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#C28E52]" />
              <span>Add Property ({availableToAdd.length})</span>
            </button>
          )}

          {/* Copy Summary */}
          <button
            type="button"
            onClick={handleCopyComparisonSummary}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy comparison summary to share with family or roommates"
          >
            {copiedSummary ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Share Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Comparison Table / Matrix */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[720px] text-xs">
            
            {/* Header: Sticky Property Visual Cards */}
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-slate-900/70">
                <th className="w-48 sm:w-56 p-4 text-left font-serif font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] align-top sticky left-0 z-20 bg-[#FAF8F5] dark:bg-slate-900 backdrop-blur-md">
                  <div className="space-y-1">
                    <div>Property Overview</div>
                    <p className="text-[10px] font-normal text-slate-400 normal-case">
                      Comparing {comparedProperties.length} direct options
                    </p>
                  </div>
                </th>

                {comparedProperties.map((property, idx) => (
                  <th
                    key={property.id}
                    className="p-4 text-left font-normal align-top border-l border-slate-200 dark:border-slate-800 min-w-[260px] max-w-[320px] relative"
                  >
                    <div className="space-y-3">
                      {/* Image Thumbnail Frame */}
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 shadow-xs group">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                          Option {idx + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggleSelectProperty(property.id)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0F172A]/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                          title="Remove from comparison view"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Header Typography */}
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C28E52]">
                          <span>{property.bhk}</span>
                          <span>•</span>
                          <span className="text-emerald-600 dark:text-emerald-400">0% Brokerage</span>
                        </div>
                        <h4
                          onClick={() => onSelectPropertyDetails(property)}
                          className="text-sm font-bold font-serif text-slate-900 dark:text-white hover:text-[#C28E52] cursor-pointer truncate mt-0.5"
                          title={property.title}
                        >
                          {property.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate mt-0.5">
                          <MapPin className="w-3 h-3 text-[#C28E52] shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>
                      </div>

                      {/* Price Tag & Brokerage Saved */}
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70">
                        <div className="text-base font-bold font-serif text-slate-900 dark:text-white">
                          {property.priceFormatted}
                        </div>
                        <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>{property.brokerageSaved}</span>
                        </div>
                      </div>

                      {/* Quick Contact & View Details Action CTAs */}
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <a
                          href={generateOwnerWhatsAppUrl(property)}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2 px-2.5 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => onSelectPropertyDetails(property)}
                          className="py-2 px-2.5 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] dark:bg-[#C28E52] dark:hover:bg-[#AB773D] text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              
              {/* SECTION 1: Financials & Costs */}
              <tr className="bg-slate-100/60 dark:bg-slate-800/40">
                <td colSpan={comparedProperties.length + 1} className="py-2 px-4 font-bold text-[11px] tracking-wider uppercase text-slate-700 dark:text-slate-300">
                  💰 Pricing &amp; Direct Savings
                </td>
              </tr>

              {/* Monthly Rent / Total Price */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.price) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Listed Price / Rent
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                    {p.priceFormatted}
                  </td>
                ))}
              </tr>

              {/* Security Deposit */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.deposit) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Security Deposit
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                    {p.deposit || 'Negotiable with Owner'}
                  </td>
                ))}
              </tr>

              {/* Brokerage Saved */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.brokerageSaved) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Direct Brokerage Saved
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{p.brokerageSaved}</span>
                  </td>
                ))}
              </tr>

              {/* Price per sq.ft */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.pricePerSqFt) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Rate per Sq.Ft.
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    {p.pricePerSqFt || 'Calculated on area'}
                  </td>
                ))}
              </tr>

              {/* SECTION 2: Dimensions & Configuration */}
              <tr className="bg-slate-100/60 dark:bg-slate-800/40">
                <td colSpan={comparedProperties.length + 1} className="py-2 px-4 font-bold text-[11px] tracking-wider uppercase text-slate-700 dark:text-slate-300">
                  📐 Configuration &amp; Space
                </td>
              </tr>

              {/* BHK Typology */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.bhk) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  BHK Typology
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 font-bold text-[#C28E52]">
                    {p.bhk}
                  </td>
                ))}
              </tr>

              {/* Carpet Area */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.carpetArea) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Carpet / Super Area
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                    {p.carpetArea}
                  </td>
                ))}
              </tr>

              {/* Bathrooms & Balconies */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.bathrooms) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Baths &amp; Balconies
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                    {p.bathrooms} Bathrooms • {p.specifications?.balconies || '1 Balcony'}
                  </td>
                ))}
              </tr>

              {/* Furnishing Status */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.furnishing) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Furnishing Status
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 font-medium text-slate-900 dark:text-white">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold inline-block">
                      {p.furnishing}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Floor Level & Facing */}
              <tr className={highlightDifferences && isRowDifferent((p) => `${p.floor}-${p.facing}`) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Floor &amp; Vastu Facing
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    {p.floor} • {p.facing}
                  </td>
                ))}
              </tr>

              {/* SECTION 3: Amenities Side-by-Side Checklist */}
              <tr className="bg-slate-100/60 dark:bg-slate-800/40">
                <td colSpan={comparedProperties.length + 1} className="py-2 px-4 font-bold text-[11px] tracking-wider uppercase text-slate-700 dark:text-slate-300">
                  ✨ Lifestyle &amp; Society Amenities
                </td>
              </tr>

              {STANDARD_AMENITIES.map((amenityRule) => {
                const IconComponent = amenityRule.icon;
                const rowDiffers = isRowDifferent((p) => hasAmenity(p, amenityRule));
                return (
                  <tr
                    key={amenityRule.name}
                    className={highlightDifferences && rowDiffers ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}
                  >
                    <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A] flex items-center gap-2">
                      <IconComponent className="w-3.5 h-3.5 text-[#C28E52] shrink-0" />
                      <span>{amenityRule.name}</span>
                    </td>
                    {comparedProperties.map((p) => {
                      const present = hasAmenity(p, amenityRule);
                      return (
                        <td
                          key={p.id}
                          className="p-3.5 border-l border-slate-100 dark:border-slate-800"
                        >
                          {present ? (
                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                              <CheckCircle2 className="w-4 h-4 fill-emerald-100 dark:fill-emerald-950" />
                              <span>Available</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-600 font-medium">
                              <X className="w-4 h-4" />
                              <span>Not listed</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Parking Specifics */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.parking) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Parking Details
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                    {p.parking}
                  </td>
                ))}
              </tr>

              {/* SECTION 4: Direct Owner & Possession */}
              <tr className="bg-slate-100/60 dark:bg-slate-800/40">
                <td colSpan={comparedProperties.length + 1} className="py-2 px-4 font-bold text-[11px] tracking-wider uppercase text-slate-700 dark:text-slate-300">
                  🤝 Direct Owner &amp; Move-in Timeline
                </td>
              </tr>

              {/* Move-in Status */}
              <tr className={highlightDifferences && isRowDifferent((p) => p.status) ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''}>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Possession Status
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 text-[11px] inline-block">
                      {p.status}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Owner Identity & Response Time */}
              <tr>
                <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-[#0F172A]">
                  Direct Owner Profile
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 border-l border-slate-100 dark:border-slate-800">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{p.owner.name}</span>
                        {p.owner.verifiedTitle && (
                          <span title="Title Verified Direct Owner">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Avg. Response: {p.owner.responseTime || 'Under 30 mins'}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Final Actions Row */}
              <tr className="bg-slate-50/80 dark:bg-slate-900/80">
                <td className="p-4 font-bold text-slate-900 dark:text-white sticky left-0 z-10 bg-slate-50 dark:bg-slate-900">
                  Ready to connect?
                </td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 dark:border-slate-800 space-y-2">
                    <a
                      href={generateOwnerWhatsAppUrl(p)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat Direct with Owner</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onSelectPropertyDetails(p)}
                      className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#C28E52] text-slate-800 dark:text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      View Monograph
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Add / Swap Modal */}
      {isAddPropertyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#0F172A] rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-base font-serif text-slate-900 dark:text-white">
                  Add Saved Home to Comparison
                </h4>
                <p className="text-xs text-slate-500">
                  Select a property to place side by side (max 4 columns)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPropertyModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 py-1">
              {availableToAdd.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => {
                    onToggleSelectProperty(prop.id);
                    setIsAddPropertyModalOpen(false);
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#C28E52] dark:hover:border-[#C28E52] bg-slate-50 dark:bg-slate-900/60 flex items-center gap-3 cursor-pointer transition-all hover:bg-white dark:hover:bg-slate-800 group"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-slate-900 dark:text-white truncate font-serif">
                      {prop.title}
                    </div>
                    <div className="text-[11px] text-[#C28E52] font-semibold">
                      {prop.priceFormatted} • {prop.bhk}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {prop.location}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#C28E52] flex items-center justify-center group-hover:bg-[#C28E52] group-hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsAddPropertyModalOpen(false)}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
