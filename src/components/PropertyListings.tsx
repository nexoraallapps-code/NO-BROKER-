import React, { useState, useMemo } from 'react';
import { Property, PropertyPurpose, PropertyType } from '../types';
import { PropertyCard } from './PropertyCard';
import { 
  SlidersHorizontal, 
  Map, 
  ArrowUpDown, 
  Check, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Building, 
  Key, 
  Filter, 
  DollarSign, 
  ChevronDown, 
  Layers, 
  X,
  Car,
  Bath,
  Armchair,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface PropertyListingsProps {
  properties: Property[];
  selectedCity: string;
  activePurpose: PropertyPurpose;
  onSelectPurpose: (purpose: PropertyPurpose) => void;
  onSelectProperty: (property: Property) => void;
  onContactOwner: (property: Property) => void;
  savedPropertyIds: string[];
  onToggleSave: (propertyId: string) => void;
  onOpenMap: () => void;
}

export const PropertyListings: React.FC<PropertyListingsProps> = ({
  properties,
  selectedCity,
  activePurpose,
  onSelectPurpose,
  onSelectProperty,
  onContactOwner,
  savedPropertyIds,
  onToggleSave,
  onOpenMap,
}) => {
  // Core Filter state
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<PropertyType[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0); // 0 means no limit
  const [sortBy, setSortBy] = useState<'relevance' | 'priceAsc' | 'priceDesc'>('relevance');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Advanced Search Filter state
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>('all'); // 'all' | 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished'
  const [selectedBathrooms, setSelectedBathrooms] = useState<string>('all'); // 'all' | '1' | '2' | '3' | '4'
  const [selectedParking, setSelectedParking] = useState<string>('all'); // 'all' | 'covered' | '2plus' | 'ev'
  const [petFriendlyOnly, setPetFriendlyOnly] = useState<boolean>(false);

  // Property types list for buttons
  const PROPERTY_TYPES: { id: PropertyType; label: string }[] = [
    { id: 'flat', label: 'Flat / Apt' },
    { id: 'house', label: 'House / Villa' },
    { id: 'pg', label: 'PG / Co-Living' },
    { id: 'office', label: 'Office' },
    { id: 'penthouse', label: 'Penthouse' }
  ];

  const BEDROOM_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK'];

  // Toggle Property Type in multi-select
  const handleToggleType = (type: PropertyType) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  // Toggle Bedroom count in multi-select
  const handleToggleBedroom = (bhk: string) => {
    if (selectedBedrooms.includes(bhk)) {
      setSelectedBedrooms(selectedBedrooms.filter((b) => b !== bhk));
    } else {
      setSelectedBedrooms([...selectedBedrooms, bhk]);
    }
  };

  // Price presets
  const handlePricePreset = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedPropertyTypes([]);
    setSelectedBedrooms([]);
    setMinPrice(0);
    setMaxPrice(0);
    setSelectedFurnishing('all');
    setSelectedBathrooms('all');
    setSelectedParking('all');
    setPetFriendlyOnly(false);
    setSortBy('relevance');
  };

  const hasActiveFilters = 
    selectedPropertyTypes.length > 0 ||
    selectedBedrooms.length > 0 ||
    minPrice > 0 ||
    maxPrice > 0 ||
    selectedFurnishing !== 'all' ||
    selectedBathrooms !== 'all' ||
    selectedParking !== 'all' ||
    petFriendlyOnly ||
    sortBy !== 'relevance';

  const activeFiltersCount = [
    selectedPropertyTypes.length > 0,
    selectedBedrooms.length > 0,
    minPrice > 0 || maxPrice > 0,
    selectedFurnishing !== 'all',
    selectedBathrooms !== 'all',
    selectedParking !== 'all',
    petFriendlyOnly,
    sortBy !== 'relevance'
  ].filter(Boolean).length;

  // Apply filtering with all options working in conjunction
  const filtered = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Purpose filter
      if (activePurpose !== 'commercial' && prop.purpose !== activePurpose) {
        return false;
      }
      if (activePurpose === 'commercial' && prop.purpose !== 'commercial') {
        return false;
      }

      // 2. City filter (Match current selected city, or show all if none)
      if (selectedCity && prop.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // 3. Property Type filter (Flat, House, PG, Office, Penthouse)
      if (selectedPropertyTypes.length > 0) {
        if (!selectedPropertyTypes.includes(prop.propertyType)) {
          return false;
        }
      }

      // 4. Number of Bedrooms / BHK filter
      if (selectedBedrooms.length > 0) {
        const matchesBhk = selectedBedrooms.some((b) => 
          prop.bhk.toLowerCase().includes(b.toLowerCase())
        );
        if (!matchesBhk) return false;
      }

      // 5. Price Range filter
      if (minPrice > 0 && prop.price < minPrice) {
        return false;
      }
      if (maxPrice > 0 && prop.price > maxPrice) {
        return false;
      }

      // 6. Furnished / Unfurnished filter
      if (selectedFurnishing !== 'all') {
        if (selectedFurnishing === 'Unfurnished') {
          if (prop.furnishing !== 'Unfurnished' && prop.furnishing !== 'Bespoke Bare') {
            return false;
          }
        } else if (prop.furnishing !== selectedFurnishing) {
          return false;
        }
      }

      // 7. Number of Bathrooms filter
      if (selectedBathrooms !== 'all') {
        const minBaths = parseInt(selectedBathrooms, 10);
        if (prop.bathrooms < minBaths) {
          return false;
        }
      }

      // 8. Parking Availability filter
      if (selectedParking !== 'all') {
        const parkLower = (prop.parking || '').toLowerCase();
        const amenitiesLower = (prop.amenities || []).map((a) => a.toLowerCase()).join(' ');

        if (selectedParking === 'covered') {
          const isCovered = 
            parkLower.includes('covered') || 
            parkLower.includes('stilt') || 
            parkLower.includes('basement') ||
            amenitiesLower.includes('covered parking');
          if (!isCovered) return false;
        } else if (selectedParking === '2plus') {
          const has2Plus = 
            parkLower.includes('2') || 
            parkLower.includes('3') || 
            parkLower.includes('4') ||
            amenitiesLower.includes('2+') ||
            amenitiesLower.includes('3 covered');
          if (!has2Plus) return false;
        } else if (selectedParking === 'ev') {
          const hasEV = parkLower.includes('ev') || amenitiesLower.includes('ev');
          if (!hasEV) return false;
        }
      }

      // 9. Pet-Friendliness filter
      if (petFriendlyOnly) {
        const isPetFriendly = Boolean(
          prop.petFriendly ||
          prop.amenities?.some((a) => a.toLowerCase().includes('pet')) ||
          prop.specifications?.tenantPreference?.toLowerCase().includes('pet')
        );
        if (!isPetFriendly) return false;
      }

      return true;
    });
  }, [
    properties,
    activePurpose,
    selectedCity,
    selectedPropertyTypes,
    selectedBedrooms,
    minPrice,
    maxPrice,
    selectedFurnishing,
    selectedBathrooms,
    selectedParking,
    petFriendlyOnly,
  ]);

  // Apply sorting
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'priceAsc') {
        return a.price - b.price;
      }
      if (sortBy === 'priceDesc') {
        return b.price - a.price;
      }
      return 0; // relevance
    });
  }, [filtered, sortBy]);

  return (
    <section className="py-10 sm:py-16 bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#0F5132] dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/60 dark:border-emerald-800/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Title Deeds • 0% Middleman Commission</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold font-serif tracking-tight text-[#1B1C1A] dark:text-white">
              Residences in {selectedCity}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Verified owner listings in {selectedCity} with comprehensive architectural blueprints, direct WhatsApp chat, and 100% zero brokerage.
            </p>
          </div>

          {/* Quick Actions (Map view & Active Purpose switcher) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={onOpenMap}
              className="py-2.5 px-4 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 hover:border-[#C28E52] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Map className="w-4 h-4 text-[#C28E52]" />
              <span>Interactive Map View</span>
            </button>
          </div>
        </div>

        {/* Filter Console Bar Container */}
        <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-4 sm:p-5 space-y-4">
          
          {/* Row 1: Property Types and Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Desktop Property Type Pills */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Type:</span>
              <button
                type="button"
                onClick={() => setSelectedPropertyTypes([])}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedPropertyTypes.length === 0
                    ? 'bg-slate-900 text-white dark:bg-[#C28E52] font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Types
              </button>
              {PROPERTY_TYPES.map((pt) => {
                const isSelected = selectedPropertyTypes.includes(pt.id);
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => handleToggleType(pt.id)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-[#C28E52] font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {pt.label}
                  </button>
                );
              })}
            </div>

            {/* Right Tools: Advanced Filters Toggle & Sorting Dropdown */}
            <div className="flex items-center gap-2.5 ml-auto flex-wrap">
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showAdvancedFilters || hasActiveFilters
                    ? 'border-[#C28E52] bg-amber-50/70 dark:bg-amber-950/40 text-[#C28E52]'
                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-slate-800 rounded-xl px-2.5 py-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none text-xs rounded-md py-1 font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden cursor-pointer"
                >
                  <option value="relevance" className="dark:bg-slate-900">Sort: Relevance</option>
                  <option value="priceAsc" className="dark:bg-slate-900">Price: Low to High</option>
                  <option value="priceDesc" className="dark:bg-slate-900">Price: High to Low</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="p-1.5 text-xs text-rose-600 hover:text-rose-700 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Row 2: Bedroom (BHK) filter buttons + Quick Advanced Filters Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            
            {/* Bedrooms */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Bedrooms:</span>
              {BEDROOM_OPTIONS.map((bhk) => {
                const isSelected = selectedBedrooms.includes(bhk);
                return (
                  <button
                    key={bhk}
                    type="button"
                    onClick={() => handleToggleBedroom(bhk)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-[#C28E52] font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {bhk}
                  </button>
                );
              })}
            </div>

            {/* Quick Furnishing Dropdown */}
            <div className="flex items-center gap-1">
              <Armchair className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedFurnishing}
                onChange={(e) => setSelectedFurnishing(e.target.value)}
                className={`text-xs py-1 px-2.5 rounded-lg border font-medium cursor-pointer transition-colors ${
                  selectedFurnishing !== 'all'
                    ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/30 text-[#C28E52] font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <option value="all">Any Furnishing</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            {/* Quick Bathrooms Dropdown */}
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedBathrooms}
                onChange={(e) => setSelectedBathrooms(e.target.value)}
                className={`text-xs py-1 px-2.5 rounded-lg border font-medium cursor-pointer transition-colors ${
                  selectedBathrooms !== 'all'
                    ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/30 text-[#C28E52] font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <option value="all">Any Baths</option>
                <option value="1">1+ Bath</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
                <option value="4">4+ Baths</option>
              </select>
            </div>

            {/* Quick Parking Dropdown */}
            <div className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedParking}
                onChange={(e) => setSelectedParking(e.target.value)}
                className={`text-xs py-1 px-2.5 rounded-lg border font-medium cursor-pointer transition-colors ${
                  selectedParking !== 'all'
                    ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/30 text-[#C28E52] font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <option value="all">Any Parking</option>
                <option value="covered">Covered Parking</option>
                <option value="2plus">2+ Parking Slots</option>
                <option value="ev">EV Charger Ready ⚡</option>
              </select>
            </div>

            {/* Pet-Friendly Toggle Button */}
            <button
              type="button"
              onClick={() => setPetFriendlyOnly(!petFriendlyOnly)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                petFriendlyOnly
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <span>🐾 Pet-Friendly Only</span>
              {petFriendlyOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </button>

            {/* Result count indicator */}
            <div className="ml-auto text-xs text-slate-500 dark:text-slate-400 font-medium">
              Showing <strong className="text-slate-900 dark:text-white">{sorted.length}</strong> verified properties
            </div>
          </div>

          {/* Expanded Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
              
              {/* Filter 1: Property Type Multi-Select (Full) */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Property Types
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {PROPERTY_TYPES.map((pt) => {
                    const isSelected = selectedPropertyTypes.includes(pt.id);
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => handleToggleType(pt.id)}
                        className={`p-2 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/20 text-[#C28E52] font-bold'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span>{pt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter 2: Price Range Filter & Presets */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Price Range ({activePurpose === 'rent' ? '₹ Monthly Rent' : '₹ Purchase Price'})
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Min (₹)</span>
                    <input
                      type="number"
                      value={minPrice || ''}
                      onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                      placeholder="Min"
                      className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Max (₹)</span>
                    <input
                      type="number"
                      value={maxPrice || ''}
                      onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
                      placeholder="Max"
                      className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activePurpose === 'rent' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handlePricePreset(0, 50000)}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      >
                        Under ₹50K
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePricePreset(50000, 200000)}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      >
                        ₹50K - ₹2L
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePricePreset(200000, 0)}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      >
                        ₹2L+ Luxury
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handlePricePreset(0, 20000000)}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      >
                        Under ₹2 Cr
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePricePreset(20000000, 50000000)}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      >
                        ₹2 Cr - ₹5 Cr
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePricePreset(50000000, 0)}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      >
                        ₹5 Cr+
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Filter 3: Furnishing & Bathrooms */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Furnishing Status
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'all', label: 'All Furnishing' },
                      { id: 'Fully Furnished', label: 'Furnished' },
                      { id: 'Semi-Furnished', label: 'Semi-Furnished' },
                      { id: 'Unfurnished', label: 'Unfurnished' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFurnishing(f.id)}
                        className={`p-1.5 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                          selectedFurnishing === f.id
                            ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/20 text-[#C28E52] font-bold'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span>{f.label}</span>
                        {selectedFurnishing === f.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Bathrooms
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {['all', '1', '2', '3+'].map((b) => {
                      const val = b === '3+' ? '3' : b;
                      const isSelected = selectedBathrooms === val;
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBathrooms(val)}
                          className={`py-1 px-1.5 rounded-lg border text-center text-xs transition-colors ${
                            isSelected
                              ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/20 text-[#C28E52] font-bold'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {b === 'all' ? 'Any' : `${b} Bath`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Filter 4: Parking & Pet-Friendliness */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Parking Availability
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'all', label: 'Any Parking' },
                      { id: 'covered', label: 'Covered / Stilt' },
                      { id: '2plus', label: '2+ Slots' },
                      { id: 'ev', label: 'EV Ready ⚡' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedParking(p.id)}
                        className={`p-1.5 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                          selectedParking === p.id
                            ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/20 text-[#C28E52] font-bold'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className="truncate">{p.label}</span>
                        {selectedParking === p.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <div 
                    onClick={() => setPetFriendlyOnly(!petFriendlyOnly)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      petFriendlyOnly
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🐾</span>
                      <div>
                        <div className="text-xs font-bold">Pet-Friendly Residences</div>
                        <div className="text-[10px] text-slate-400">Allows cats, dogs & pets</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      petFriendlyOnly ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {petFriendlyOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear All Filters</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAdvancedFilters(false)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold cursor-pointer"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Active Filter Chips Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Active:</span>

              {selectedPropertyTypes.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] border border-[#C28E52]/30"
                >
                  <span>Type: {t}</span>
                  <button onClick={() => handleToggleType(t)} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedBedrooms.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] border border-[#C28E52]/30"
                >
                  <span>{b}</span>
                  <button onClick={() => handleToggleBedroom(b)} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {(minPrice > 0 || maxPrice > 0) && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] border border-[#C28E52]/30">
                  <span>Price: {minPrice ? `₹${minPrice.toLocaleString()}` : '₹0'} - {maxPrice ? `₹${maxPrice.toLocaleString()}` : 'Any'}</span>
                  <button onClick={() => { setMinPrice(0); setMaxPrice(0); }} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedFurnishing !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] border border-[#C28E52]/30">
                  <Armchair className="w-3 h-3 text-[#C28E52]" />
                  <span>Furnishing: {selectedFurnishing}</span>
                  <button onClick={() => setSelectedFurnishing('all')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedBathrooms !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] border border-[#C28E52]/30">
                  <Bath className="w-3 h-3 text-[#C28E52]" />
                  <span>Bathrooms: {selectedBathrooms}+</span>
                  <button onClick={() => setSelectedBathrooms('all')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedParking !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] border border-[#C28E52]/30">
                  <Car className="w-3 h-3 text-[#C28E52]" />
                  <span>Parking: {selectedParking === 'covered' ? 'Covered' : selectedParking === '2plus' ? '2+ Slots' : 'EV Ready'}</span>
                  <button onClick={() => setSelectedParking('all')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {petFriendlyOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <span>🐾 Pet-Friendly Only</span>
                  <button onClick={() => setPetFriendlyOnly(false)} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {sortBy !== 'relevance' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <span>Sort: {sortBy === 'priceAsc' ? 'Price Low-High' : 'Price High-Low'}</span>
                  <button onClick={() => setSortBy('relevance')} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:underline font-semibold ml-auto cursor-pointer"
              >
                Reset All
              </button>
            </div>
          )}

        </div>

        {/* Property Cards Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sorted.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onContactOwner={onContactOwner}
                isSaved={savedPropertyIds.includes(property.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg mx-auto p-8 space-y-4">
            <Building className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              No matching properties found
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No residences matched your criteria (Furnishing, Bathrooms, Parking, Pet-Friendly, or Budget) in {selectedCity}. Try loosening some filters or reset to view all direct owner properties.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="py-2.5 px-6 rounded-xl bg-[#C28E52] text-white text-xs font-bold hover:bg-[#AB773D] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
