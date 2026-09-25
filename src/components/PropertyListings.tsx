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
  X
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
  // Advanced Filter state
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<PropertyType[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0); // 0 means no limit
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'priceAsc' | 'priceDesc'>('relevance');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

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
    setSortBy('relevance');
  };

  const hasActiveFilters = 
    selectedPropertyTypes.length > 0 ||
    selectedBedrooms.length > 0 ||
    minPrice > 0 ||
    maxPrice > 0 ||
    selectedFurnishing !== 'all' ||
    sortBy !== 'relevance';

  // Apply filtering
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

      // 6. Furnishing filter
      if (selectedFurnishing !== 'all' && prop.furnishing !== selectedFurnishing) {
        return false;
      }

      return true;
    });
  }, [properties, activePurpose, selectedCity, selectedPropertyTypes, selectedBedrooms, minPrice, maxPrice, selectedFurnishing]);

  // Apply sorting: relevance, price low to high, price high to low
  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sortBy === 'priceAsc') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'priceDesc') {
      return list.sort((a, b) => b.price - a.price);
    }
    // 'relevance' (featured first, then default order)
    return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [filtered, sortBy]);

  return (
    <section id="properties-section" className="py-10 sm:py-16 bg-[#FAF8F5] dark:bg-[#0A0F1D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C28E52]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C28E52]"></span>
              <span>Direct Owner Portfolio</span>
              <span>·</span>
              <span>{selectedCity} Metropolis</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 dark:text-white mt-1">
              Curated Residences & Workspaces: <span className="font-normal italic text-[#C28E52]">{selectedCity} Prime</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Verified title deeds, direct contact with landlords, zero brokerage commission.
            </p>
          </div>

          {/* Interactive Map Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenMap}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-[#C28E52] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Map className="w-4 h-4 text-[#C28E52]" />
              <span>Spatial Map View</span>
            </button>
          </div>
        </div>

        {/* Primary Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 shadow-xs space-y-4">
          
          {/* Row 1: Purpose Switcher + Property Types + Advanced Filter Toggle + Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Purpose toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => onSelectPurpose('rent')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activePurpose === 'rent'
                    ? 'bg-slate-900 text-white dark:bg-[#C28E52] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                Rent
              </button>
              <button
                type="button"
                onClick={() => onSelectPurpose('buy')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activePurpose === 'buy'
                    ? 'bg-slate-900 text-white dark:bg-[#C28E52] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => onSelectPurpose('commercial')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activePurpose === 'commercial'
                    ? 'bg-slate-900 text-white dark:bg-[#C28E52] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                Commercial
              </button>
            </div>

            {/* Quick Property Type Chips */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Type:</span>
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
            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showAdvancedFilters || hasActiveFilters
                    ? 'border-[#C28E52] bg-amber-50/60 dark:bg-amber-950/30 text-[#C28E52]'
                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters ? '• Active' : ''}</span>
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

          {/* Row 2: Bedroom (BHK) filter buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
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

            {/* Mobile property type pills if screen is narrow */}
            <div className="lg:hidden flex flex-wrap gap-1.5 ml-2">
              {PROPERTY_TYPES.slice(0, 3).map((pt) => (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => handleToggleType(pt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedPropertyTypes.includes(pt.id)
                      ? 'bg-slate-900 text-white dark:bg-[#C28E52]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>

            {/* Result count indicator */}
            <div className="ml-auto text-xs text-slate-500 dark:text-slate-400 font-medium">
              Showing <strong className="text-slate-900 dark:text-white">{sorted.length}</strong> verified properties
            </div>
          </div>

          {/* Expanded Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
              
              {/* Filter 1: Property Type Multi-Select (Full) */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Property Types (Multi-Select)
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

              {/* Filter 3: Furnishing Status & Actions */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Furnishing Status
                </label>
                <select
                  value={selectedFurnishing}
                  onChange={(e) => setSelectedFurnishing(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium"
                >
                  <option value="all">All Furnishing Types</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Bespoke Bare">Bespoke Bare</option>
                </select>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear All Filters</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAdvancedFilters(false)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
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
                  <button onClick={() => handleToggleType(t)} className="hover:text-red-500">
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
                  <button onClick={() => handleToggleBedroom(b)} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {(minPrice > 0 || maxPrice > 0) && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] border border-[#C28E52]/30">
                  <span>Price: {minPrice ? `₹${minPrice.toLocaleString()}` : '₹0'} - {maxPrice ? `₹${maxPrice.toLocaleString()}` : 'Any'}</span>
                  <button onClick={() => { setMinPrice(0); setMaxPrice(0); }} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedFurnishing !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] border border-[#C28E52]/30">
                  <span>{selectedFurnishing}</span>
                  <button onClick={() => setSelectedFurnishing('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {sortBy !== 'relevance' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <span>Sort: {sortBy === 'priceAsc' ? 'Price Low-High' : 'Price High-Low'}</span>
                  <button onClick={() => setSortBy('relevance')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
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
              No residences matched your specific price range, bedroom criteria, or property type in {selectedCity}. Try loosening the filters or reset to view all direct owner properties.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="py-2.5 px-6 rounded-xl bg-[#C28E52] text-white text-xs font-bold hover:bg-[#AB773D] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
