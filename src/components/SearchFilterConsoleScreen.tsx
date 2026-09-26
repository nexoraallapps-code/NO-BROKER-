import React, { useState, useMemo } from 'react';
import { Property, PropertyPurpose, PropertyType, UserProfile } from '../types';
import { generateOwnerWhatsAppUrl } from '../utils/whatsapp';
import { CITIES, LOCALITIES_BY_CITY } from '../data/mockProperties';
import { 
  Search, 
  MapPin, 
  Compass, 
  SlidersHorizontal, 
  X, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Heart, 
  Layers, 
  Building, 
  ArrowRight, 
  Sparkles, 
  Waves, 
  Car, 
  Lock, 
  Coins, 
  Gavel, 
  Clock, 
  Map as MapIcon, 
  ChevronDown, 
  CheckCircle2,
  Navigation
} from 'lucide-react';

interface SearchFilterConsoleScreenProps {
  onBack: () => void;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onContactOwner: (property: Property) => void;
  savedPropertyIds: string[];
  onToggleSave: (propertyId: string) => void;
  onOpenMap: () => void;
  initialPurpose?: PropertyPurpose;
  initialCity?: string;
  initialQuery?: string;
  user: UserProfile;
}

export const SearchFilterConsoleScreen: React.FC<SearchFilterConsoleScreenProps> = ({
  onBack,
  properties,
  onSelectProperty,
  onContactOwner,
  savedPropertyIds,
  onToggleSave,
  onOpenMap,
  initialPurpose = 'rent',
  initialCity = 'Mumbai',
  initialQuery = '',
  user,
}) => {
  // Intent
  const [purpose, setPurpose] = useState<PropertyPurpose>(initialPurpose);
  const [city, setCity] = useState<string>(initialCity);
  
  // Locality tags
  const [tags, setTags] = useState<string[]>(() => {
    if (initialQuery && initialQuery.trim()) {
      return [initialQuery.trim()];
    }
    const defaultLocs = LOCALITIES_BY_CITY[initialCity] || [];
    return defaultLocs.length > 0 ? [defaultLocs[0]] : [];
  });
  const [inputLocality, setInputLocality] = useState('');
  
  // Radius proximity
  const [selectedRadius, setSelectedRadius] = useState<'5 KM' | '10 KM' | '15 KM' | '20 KM'>('10 KM');
  const [includeAdjacent, setIncludeAdjacent] = useState(true);

  // BHK Configuration multi-select
  const [selectedBHKs, setSelectedBHKs] = useState<string[]>(['3 BHK', '4 BHK']);

  // Typology multi-select
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Apartment', 'Penthouse']);

  // Budget slider (monthly rent)
  const [maxBudget, setMaxBudget] = useState<number>(450000);

  // Furnishing & Move-in
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>('Fully Furnished');
  const [selectedPossession, setSelectedPossession] = useState<string>('Immediate Move-in');

  // Tenant Preferences
  const [tenantPreferences, setTenantPreferences] = useState<{ [key: string]: boolean }>({
    corporate: true,
    family: true,
    founders: false,
    all: false,
  });

  // Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Arabian Sea / Open View',
    '2+ Reserved Covered Parking'
  ]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputLocality.trim()) {
      e.preventDefault();
      if (!tags.includes(inputLocality.trim())) {
        setTags([...tags, inputLocality.trim()]);
      }
      setInputLocality('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleToggleBHK = (bhk: string) => {
    if (selectedBHKs.includes(bhk)) {
      setSelectedBHKs(selectedBHKs.filter((b) => b !== bhk));
    } else {
      setSelectedBHKs([...selectedBHKs, bhk]);
    }
  };

  const handleToggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleToggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleResetFilters = () => {
    setSelectedBHKs([]);
    setSelectedTypes([]);
    setMaxBudget(1000000);
    setSelectedFurnishing('Fully Furnished');
    setSelectedPossession('Immediate Move-in');
    setSelectedAmenities([]);
    const defaultLocs = LOCALITIES_BY_CITY[city] || [];
    setTags(defaultLocs.length > 0 ? [defaultLocs[0]] : []);
  };

  const brokerageSavings = useMemo(() => {
    // 2 months rent standard brokerage saved
    return maxBudget * 2;
  }, [maxBudget]);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // City check
      if (p.city.toLowerCase() !== city.toLowerCase()) return false;
      // Purpose check
      if (purpose === 'buy' && p.purpose !== 'buy') return false;
      if (purpose === 'rent' && p.purpose !== 'rent') return false;
      if (purpose === 'commercial' && p.purpose !== 'commercial') return false;
      // Budget check
      if (p.price > maxBudget) return false;

      // Locality tags filter (if tags specified, match if any tag matches location/subLocality/title)
      if (tags.length > 0) {
        const matchesTag = tags.some((t) => {
          const cleanTag = t.replace(/\(.*?\)/g, '').trim().toLowerCase();
          if (!cleanTag) return true;
          return (
            p.subLocality.toLowerCase().includes(cleanTag) ||
            p.location.toLowerCase().includes(cleanTag) ||
            p.title.toLowerCase().includes(cleanTag)
          );
        });
        if (!matchesTag) return false;
      }

      return true;
    });
  }, [properties, city, purpose, maxBudget, tags]);

  return (
    <div className="w-full min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] pb-24">
      
      {/* Top Hero & Search Master Console Section */}
      <section className="w-full bg-[#FAF8F5] dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6">
          
          {/* Breadcrumb & Authority Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <button onClick={onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer font-medium">Home</button>
              <span className="text-slate-400">/</span>
              <span className="text-[#0F172A] dark:text-white font-semibold">Property Search Console</span>
              <span className="text-slate-400">/</span>
              <span className="text-[#C28E52] font-semibold">{city} Metropolitan</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-[#0F5132] dark:text-emerald-400 text-xs shadow-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="tracking-wider uppercase text-[10px]">Direct-From-Owner Authenticated Protocol</span>
            </div>
          </div>

          {/* Headline Context */}
          <div className="py-4 text-center max-w-4xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28E52] block">
              Curated Direct-Owner Marketplace
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight">
              Find Your Sanctuary. Directly From Owners.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Bypassing intermediaries. Verified ownership titles, zero commission covenants, and direct appointments across premier architectural enclaves.
            </p>
          </div>

          {/* MASTER SEARCH ARCHITECTURE CONSOLE */}
          <div className="mt-6 bg-white dark:bg-[#0F172A] rounded-2xl shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08)] p-6 sm:p-8 flex flex-col gap-6 border border-slate-200/80 dark:border-slate-800">
            
            {/* Segmented Intent Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
              <div className="inline-flex p-1 rounded-xl bg-[#FAF8F5] dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setPurpose('rent')}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                    purpose === 'rent'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#0F172A]'
                  }`}
                >
                  Residential • Rent
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose('buy')}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                    purpose === 'buy'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#0F172A]'
                  }`}
                >
                  Residential • Buy
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose('commercial')}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                    purpose === 'commercial'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#0F172A]'
                  }`}
                >
                  Commercial Lease
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>1,840+ Direct Residences Active Today</span>
              </div>
            </div>

            {/* Prominent Grand Input & Locality Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
              
              {/* City Selector */}
              <div className="lg:col-span-3 flex flex-col justify-center px-4 py-3 bg-[#FAF8F5] dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Select Metropolis</label>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C28E52]" />
                    <select
                      value={city}
                      onChange={(e) => {
                        const newCity = e.target.value;
                        setCity(newCity);
                        const cityLocs = LOCALITIES_BY_CITY[newCity] || [];
                        setTags(cityLocs.length > 0 ? [cityLocs[0]] : []);
                      }}
                      className="bg-transparent font-serif font-bold text-sm text-[#0F172A] dark:text-white outline-none cursor-pointer"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Locality Search Input with Multi-Select Tags */}
              <div className="lg:col-span-6 flex flex-col justify-center px-4 py-2.5 bg-[#FAF8F5] dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 focus-within:border-[#C28E52] transition-colors">
                <div className="flex items-center justify-between pb-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Neighborhoods / Pockets in {city}</label>
                  <button
                    type="button"
                    onClick={() => {
                      const primeLoc = (LOCALITIES_BY_CITY[city] && LOCALITIES_BY_CITY[city][0]) || 'Central Prime';
                      if (!tags.includes(primeLoc)) {
                        setTags([...tags, primeLoc]);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-[#C28E52] hover:text-[#AB773D] font-semibold cursor-pointer"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Use My Exact GPS</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-white dark:bg-[#0F172A] px-2.5 py-1 rounded-md shadow-xs text-xs font-semibold text-[#0F172A] dark:text-white border border-slate-200 dark:border-slate-800"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  <input
                    type="text"
                    value={inputLocality}
                    onChange={(e) => setInputLocality(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder={
                      tags.length === 0
                        ? city === 'Jaipur'
                          ? 'Add Vaishali Nagar, Malviya Nagar, C-Scheme... (Press Enter)'
                          : 'Add locality... (Press Enter)'
                        : 'Add another locality...'
                    }
                    className="flex-1 min-w-[140px] bg-transparent text-xs text-[#0F172A] dark:text-white placeholder:text-slate-400 outline-none py-1"
                  />
                </div>

                {/* Popular Localities Chips for Selected City */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2 mt-1 border-t border-slate-200/50 dark:border-slate-800/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Popular in {city}:</span>
                  {(LOCALITIES_BY_CITY[city] || []).slice(0, 6).map((loc) => {
                    const isSelected = tags.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setTags(tags.filter((t) => t !== loc));
                          } else {
                            setTags([...tags, loc]);
                          }
                        }}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#C28E52] text-white shadow-xs font-bold'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#C28E52]/20 hover:text-[#C28E52] border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{loc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Master Action CTA */}
              <div className="lg:col-span-3 flex">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('search-matches-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(194,142,82,0.4)] transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Radius & Quick Spatial Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 bg-[#FAF8F5] dark:bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[#0F172A] dark:text-white font-semibold">
                  <Compass className="w-4 h-4 text-[#C28E52]" />
                  <span>Proximity Buffer:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {(['5 KM', '10 KM', '15 KM', '20 KM'] as const).map((dist) => (
                    <button
                      key={dist}
                      type="button"
                      onClick={() => setSelectedRadius(dist)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        selectedRadius === dist
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0F172A]'
                      }`}
                    >
                      Within {dist}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded shadow-xs border border-emerald-500/20">
                  {selectedRadius} Radius Included
                </span>
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeAdjacent}
                    onChange={(e) => setIncludeAdjacent(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#0F172A] cursor-pointer"
                  />
                  <span className="text-slate-600 dark:text-slate-300">Auto-include adjacent verified sectors</span>
                </label>
              </div>
            </div>

          </div>

          {/* Quick Recent Searches Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-4 text-xs">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Recent Searches in Mumbai:</span>
            <button
              onClick={() => {
                setTags(['Bandra West']);
                setSelectedBHKs(['3 BHK']);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#C28E52] transition-colors cursor-pointer text-xs"
            >
              <Clock className="w-3 h-3 text-[#C28E52]" />
              <span>3 BHK in Bandra West (&lt; 10 KM)</span>
            </button>
            <button
              onClick={() => {
                setTags(['Worli Sea Face']);
                setSelectedBHKs(['4 BHK']);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#C28E52] transition-colors cursor-pointer text-xs"
            >
              <Clock className="w-3 h-3 text-[#C28E52]" />
              <span>Sea Facing 4 BHK Worli</span>
            </button>
            <button
              onClick={() => {
                setTags(['Juhu Coastal']);
                setSelectedTypes(['Penthouse']);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#C28E52] transition-colors cursor-pointer text-xs"
            >
              <Clock className="w-3 h-3 text-[#C28E52]" />
              <span>Penthouse in Juhu Coastal</span>
            </button>
          </div>

        </div>
      </section>

      {/* Comprehensive Filter Bento Grid & Interactive Facets */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#C28E52] font-bold">Granular Preferences</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white">
                Architectural Specifications &amp; Lease Terms
              </h2>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-slate-500 hover:text-[#0F172A] dark:hover:text-white underline decoration-[#C28E52] underline-offset-4 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>

          {/* Filter Bento Box: 6 Facets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Facet 1: BHK Configuration */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">BHK Configuration</h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Multi-Select</span>
                </div>
                <p className="text-xs text-slate-500 pb-3">Spatial volume suited for private estates and luxury apartments.</p>
                <div className="grid grid-cols-3 gap-2">
                  {['1 RK / Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK Grand'].map((bhk) => {
                    const isSelected = selectedBHKs.includes(bhk);
                    return (
                      <button
                        key={bhk}
                        type="button"
                        onClick={() => handleToggleBHK(bhk)}
                        className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                            : 'bg-[#FAF8F5] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {bhk}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="pt-2 text-xs text-[#C28E52] flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>{selectedBHKs.length} BHK Options Selected</span>
              </div>
            </div>

            {/* Facet 2: Typology of Property */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">Estate Typology</h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Direct Only</span>
                </div>
                <p className="text-xs text-slate-500 pb-3">Select your preferred architectural living format.</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Apartment', icon: Building },
                    { label: 'Penthouse', icon: Sparkles },
                    { label: 'Villa / Bungalow', icon: Layers },
                    { label: 'Duplex Mansion', icon: Building },
                    { label: 'Builder Floor', icon: Layers },
                    { label: 'Studio Suite', icon: Building }
                  ].map(({ label, icon: Icon }) => {
                    const isSelected = selectedTypes.includes(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleToggleType(label)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs font-semibold'
                            : 'bg-[#FAF8F5] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span>{label}</span>
                        <Icon className="w-3.5 h-3.5 opacity-70" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                All categories backed by direct title deed authentication.
              </div>
            </div>

            {/* Facet 3: Budget Range & Brackets */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">Monthly Lease</h3>
                  <span className="font-serif font-bold text-base text-[#C28E52]">
                    Up to ₹{(maxBudget / 100000).toFixed(1)} Lakh/mo
                  </span>
                </div>
                <p className="text-xs text-slate-500 pb-3">Zero brokerage ensures full transparency on gross monthly payout.</p>
                <div className="py-2">
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="25000"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#C28E52]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold pt-1.5">
                    <span>₹50K</span>
                    <span>₹2.5L</span>
                    <span>₹5.0L</span>
                    <span>₹10L+</span>
                  </div>
                </div>

                {/* Fast Bracket Selectors */}
                <div className="grid grid-cols-2 gap-1.5 pt-2">
                  <button
                    onClick={() => setMaxBudget(150000)}
                    className="px-2 py-1.5 rounded bg-[#FAF8F5] dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    ₹50K - ₹1.5L
                  </button>
                  <button
                    onClick={() => setMaxBudget(300000)}
                    className="px-2 py-1.5 rounded bg-[#FAF8F5] dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    ₹1.5L - ₹3.0L
                  </button>
                  <button
                    onClick={() => setMaxBudget(600000)}
                    className="px-2 py-1.5 rounded bg-[#0F172A] dark:bg-[#C28E52] text-white text-xs font-semibold cursor-pointer"
                  >
                    ₹3.0L - ₹6.0L
                  </button>
                  <button
                    onClick={() => setMaxBudget(1000000)}
                    className="px-2 py-1.5 rounded bg-[#FAF8F5] dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Above ₹6.0L
                  </button>
                </div>
              </div>
              <div className="pt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <Coins className="w-3.5 h-3.5" />
                <span>Estimated Brokerage Savings: ₹{brokerageSavings.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Facet 4: Furnishing & Move-in */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">Furnishing &amp; Move-in</h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Turnkey Level</span>
                </div>
                <div className="space-y-3 pt-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block pb-1">Interior Standard</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['Fully Furnished', 'Semi Furnished', 'Bespoke Bare'].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setSelectedFurnishing(f)}
                          className={`py-1.5 px-1 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                            selectedFurnishing === f
                              ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                              : 'bg-[#FAF8F5] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block pb-1">Possession Timeline</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['Immediate Move-in', 'Within 15 Days', 'Within 30 Days', 'Flexible Possession'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setSelectedPossession(p)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all text-center cursor-pointer ${
                            selectedPossession === p
                              ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                              : 'bg-[#FAF8F5] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                All homes inspected for premium fitments &amp; appliances.
              </div>
            </div>

            {/* Facet 5: Preferred Tenant Profile */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">Tenant Preference</h3>
                  <span className="text-[10px] uppercase font-bold text-emerald-600">Discreet Direct</span>
                </div>
                <p className="text-xs text-slate-500 pb-3">Owner pre-consents avoid awkward screenings or bureaucratic barriers.</p>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-slate-900 cursor-pointer">
                    <span className="text-xs font-semibold text-[#0F172A] dark:text-white">Corporate &amp; MNC Lease</span>
                    <input
                      type="checkbox"
                      checked={tenantPreferences.corporate}
                      onChange={(e) => setTenantPreferences({ ...tenantPreferences, corporate: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#0F172A] cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-slate-900 cursor-pointer">
                    <span className="text-xs font-semibold text-[#0F172A] dark:text-white">Family Residences</span>
                    <input
                      type="checkbox"
                      checked={tenantPreferences.family}
                      onChange={(e) => setTenantPreferences({ ...tenantPreferences, family: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#0F172A] cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-slate-900 cursor-pointer">
                    <span className="text-xs font-semibold text-[#0F172A] dark:text-white">Single Professionals / Founders</span>
                    <input
                      type="checkbox"
                      checked={tenantPreferences.founders}
                      onChange={(e) => setTenantPreferences({ ...tenantPreferences, founders: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#0F172A] cursor-pointer"
                    />
                  </label>
                </div>
              </div>
              <div className="pt-2 text-xs text-[#C28E52] font-semibold">
                Custom digital agreements configured automatically.
              </div>
            </div>

            {/* Facet 6: High-End Amenities & Architectural Badges */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">Sanctuary Amenities</h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Select Perks</span>
                </div>
                <p className="text-xs text-slate-500 pb-3">Curated lifestyle features demanded by discerning occupants.</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Arabian Sea / Open View', icon: Waves },
                    { label: 'Private Sky Terrace', icon: Sparkles },
                    { label: '2+ Reserved Covered Parking', icon: Car },
                    { label: 'Strictly Pet Friendly', icon: CheckCircle2 },
                    { label: 'Lap Pool & Wellness Gym', icon: Waves },
                    { label: 'Concierge & 3-Tier Security', icon: Lock }
                  ].map(({ label, icon: Icon }) => {
                    const isSelected = selectedAmenities.includes(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleToggleAmenity(label)}
                        className={`py-1.5 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                            : 'bg-[#FAF8F5] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                All listed amenities verified in physical owner audit.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Live Direct Owner Search Preview & Instant Match Showcase */}
      <section id="search-matches-section" className="w-full bg-[#FAF8F5] dark:bg-slate-900/60 py-12 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
          
          {/* Active Query Floating Match Ribbon */}
          <div className="bg-[#0F172A] text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#C28E52] shrink-0">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#C28E52]">Active Query Profile</div>
                <div className="text-base sm:text-lg font-serif font-bold text-white">
                  {purpose === 'rent' ? 'Residential Rent' : 'Residential Sale'} in {city} ({selectedRadius} Proximity)
                </div>
                <div className="text-xs text-slate-400">
                  Filters: {selectedBHKs.join(', ') || 'All BHK'} • {selectedFurnishing} • {filteredProperties.length} Verified Listings Available
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('matches-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-serif font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>View {filteredProperties.length} Verified Results</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#C28E52] font-bold">Direct From Host Owners</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white">
                Live Matches Ready for Direct Consultation
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              0% Brokerage Guarantee • Direct Call with Owner
            </div>
          </div>

          {/* Live Matches Grid */}
          <div id="matches-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProperties.slice(0, 4).map((prop) => {
              const isSaved = savedPropertyIds.includes(prop.id);
              return (
                <div
                  key={prop.id}
                  className="bg-white dark:bg-[#0F172A] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-xl transition-all flex flex-col group border border-slate-200/80 dark:border-slate-800"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onSelectProperty(prop)}>
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Direct Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5]/90 dark:bg-black/80 backdrop-blur-md text-[#0F5132] dark:text-emerald-400 text-xs font-bold shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Direct Owner • {prop.owner.name}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A]/85 text-white text-[11px] font-bold">
                        <Coins className="w-3.5 h-3.5 text-[#C28E52]" />
                        <span>Zero Commission (₹0)</span>
                      </span>
                    </div>

                    {/* Bookmark Toggle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(prop.id);
                      }}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md ${
                        isSaved ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-black/60 text-slate-800 dark:text-white hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C28E52]" />
                        <span>{prop.location}</span>
                      </span>
                      <span className="bg-emerald-600 px-2 py-0.5 rounded font-bold">{prop.status}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between pb-1">
                        <div>
                          <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white">
                            {prop.priceFormatted}
                          </span>
                        </div>
                        <span className="text-xs bg-[#FAF8F5] dark:bg-slate-800 px-2.5 py-1 rounded text-slate-700 dark:text-slate-300 font-semibold">
                          {prop.deposit ? `Deposit: ${prop.deposit}` : 'Direct Title'}
                        </span>
                      </div>

                      <h4
                        onClick={() => onSelectProperty(prop)}
                        className="text-lg font-serif font-bold text-[#0F172A] dark:text-white hover:text-[#C28E52] transition-colors cursor-pointer"
                      >
                        {prop.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {prop.specifications?.curatorNote || 'Architect-designed luxury residence with unobstructed vistas, private foyer, and bespoke finishes.'}
                      </p>

                      {/* Spec Pill Highlights */}
                      <div className="grid grid-cols-3 gap-2 py-3 text-center">
                        <div className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-slate-800/60">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Space</span>
                          <span className="text-xs font-bold text-[#0F172A] dark:text-white">{prop.bhk}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-slate-800/60">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Carpet Area</span>
                          <span className="text-xs font-bold text-[#0F172A] dark:text-white">{prop.carpetArea}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-slate-800/60">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Elevation</span>
                          <span className="text-xs font-bold text-[#0F172A] dark:text-white truncate">{prop.floor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Owner Connect Strip */}
                    <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Direct Deed Inspected</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectProperty(prop)}
                          className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white font-semibold text-xs transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => onContactOwner(prop)}
                          className="px-3.5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#C28E52]" />
                          <span>Call</span>
                        </button>
                        <a
                          href={generateOwnerWhatsAppUrl(prop)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-2 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                          title={`Chat on WhatsApp with ${prop.owner.name}`}
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Integrated Map Proximity Anchor */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F172A] shadow-md border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Interactive Geo-Fence Active</span>
              <h4 className="text-xl font-serif font-bold text-[#0F172A] dark:text-white">Explore {filteredProperties.length} Verified Properties on Spatial Map</h4>
              <p className="text-xs text-slate-500">
                View accurate cluster pins, metro commute corridors, coastal buffers, and private neighborhood perimeters without broker distortion.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenMap}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#0F172A] hover:text-white dark:bg-slate-800 dark:hover:bg-[#C28E52] text-[#0F172A] dark:text-white font-serif font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 cursor-pointer shadow-sm"
            >
              <MapIcon className="w-4 h-4 text-[#C28E52]" />
              <span>Launch Interactive Map View</span>
            </button>
          </div>

        </div>
      </section>

      {/* NoBroker Direct Guarantee Commitment */}
      <section className="w-full bg-[#FAF8F5] dark:bg-slate-900 py-12 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#0F172A] flex items-center justify-center text-[#C28E52] shrink-0 shadow-sm border border-slate-200 dark:border-slate-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">Direct Title Authentication</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every home is verified via municipal index registries and government land records before publication.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#0F172A] flex items-center justify-center text-[#C28E52] shrink-0 shadow-sm border border-slate-200 dark:border-slate-800">
                <Coins className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">Strict Zero Commission</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Eliminate extortionate brokerage fees. Deal strictly, transparently, and directly with verified estate proprietors.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#0F172A] flex items-center justify-center text-[#C28E52] shrink-0 shadow-sm border border-slate-200 dark:border-slate-800">
                <Gavel className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">White-Glove Legal Escrow</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Digitally draft high-net-worth rental covenants, biometric notarizations, and registration at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
