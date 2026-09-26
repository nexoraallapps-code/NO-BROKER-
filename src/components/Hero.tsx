import React, { useState } from 'react';
import heroVilla from '../assets/images/hero_villa_twilight_1790309610252.jpg';
import { PropertyPurpose, PropertyType } from '../types';
import { LOCALITIES_BY_CITY } from '../data/mockProperties';
import { 
  Search, 
  MapPin, 
  Compass, 
  Home, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
  ShieldCheck,
  Building
} from 'lucide-react';

interface HeroProps {
  activePurpose: PropertyPurpose;
  onSelectPurpose: (purpose: PropertyPurpose) => void;
  selectedCity: string;
  onSearch: (params: {
    purpose: PropertyPurpose;
    city: string;
    query: string;
    propertyType?: PropertyType | 'all';
    bhk?: string;
    budgetRange?: string;
  }) => void;
  onViewMonograph?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  activePurpose,
  onSelectPurpose,
  selectedCity,
  onSearch,
  onViewMonograph,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | 'all'>('all');
  const [selectedBHK, setSelectedBHK] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [showLocalitySuggestions, setShowLocalitySuggestions] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const cityLocalities = LOCALITIES_BY_CITY[selectedCity] || LOCALITIES_BY_CITY['Mumbai'];

  const filteredLocalities = searchQuery.trim()
    ? cityLocalities.filter((loc) => loc.toLowerCase().includes(searchQuery.toLowerCase()))
    : cityLocalities;

  const handleExecuteSearch = (customQuery?: string) => {
    onSearch({
      purpose: activePurpose,
      city: selectedCity,
      query: customQuery !== undefined ? customQuery : searchQuery,
      propertyType: selectedPropertyType,
      bhk: selectedBHK,
      budgetRange: selectedBudget,
    });
    setShowLocalitySuggestions(false);
  };

  const handleDetectGPS = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setIsDetectingLocation(false);
      const topLocality = cityLocalities[0] || 'Vaishali Nagar';
      setSearchQuery(`${topLocality} (Near Me)`);
      handleExecuteSearch(topLocality);
    }, 600);
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#0A0F1D] text-white min-h-[600px] lg:min-h-[680px] flex items-center">
      {/* Background Architectural Photography with Editorial Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroVilla}
          alt="Luxury architectural residence at twilight"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/80 to-[#0A0F1D]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.3)_0%,rgba(10,15,29,0.92)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          
          {/* Eyebrow badge matching Editorial Luxury Real Estate style */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F172A]/90 border border-[#C28E52]/40 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-[#D4A366] tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C28E52] animate-pulse"></span>
              <span>Direct Architectural Residences • 0% Brokerage Guarantee</span>
            </div>

            {onViewMonograph && (
              <button
                type="button"
                onClick={onViewMonograph}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C28E52]/20 hover:bg-[#C28E52] border border-[#C28E52]/60 text-amber-200 hover:text-white transition-all text-xs font-semibold cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Open Property Monograph Screen →</span>
              </button>
            )}
          </div>

          {/* Main Hinglish / English Dual Editorial Heading with Playfair Display */}
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white tracking-[-0.02em] leading-[1.12] font-serif">
            Apna Sapno Ka Ghar Dhundhe{' '}
            <span className="italic font-normal text-[#E0A96D] block sm:inline">
              — Bina Kisi Brokerage Ke
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            India&apos;s premier zero-brokerage residential & commercial property network. 
            Connect directly with verified title owners, without middleman commissions.
          </p>
        </div>

        {/* Floating Search Hub Box - Cream Silk / Dark Onyx Container */}
        <div className="mt-8 sm:mt-12 max-w-4xl mx-auto bg-[#FBF9F6]/95 dark:bg-[#0F172A]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 text-[#1B1C1A] dark:text-[#F1F5F9] p-4 sm:p-6 transition-colors">
          
          {/* Purpose Tabs & Zero Commission Trust Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-4">
            <div className="flex items-center p-1 bg-slate-200/70 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => onSelectPurpose('buy')}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activePurpose === 'buy'
                    ? 'bg-[#0F172A] text-white dark:bg-[#C28E52] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => onSelectPurpose('rent')}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activePurpose === 'rent'
                    ? 'bg-[#0F172A] text-white dark:bg-[#C28E52] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Rent
              </button>
              <button
                type="button"
                onClick={() => onSelectPurpose('commercial')}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activePurpose === 'commercial'
                    ? 'bg-[#0F172A] text-white dark:bg-[#C28E52] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Commercial
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#0F5132] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F5132] dark:text-emerald-400" />
              100% Genuine Owner Direct • 0% Brokerage
            </div>
          </div>

          {/* Search Inputs Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Locality & Landmark Input */}
            <div className="md:col-span-4 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Locality / Sub-Area in {selectedCity}
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowLocalitySuggestions(true);
                  }}
                  onFocus={() => setShowLocalitySuggestions(true)}
                  placeholder={
                    selectedCity === 'Jaipur'
                      ? 'e.g. Vaishali Nagar, Malviya Nagar, C-Scheme...'
                      : selectedCity === 'Delhi NCR'
                      ? 'e.g. Golf Course Road, Cyber City, Greater Kailash...'
                      : selectedCity === 'Bangalore'
                      ? 'e.g. Indiranagar, Koramangala, Whitefield...'
                      : 'e.g. Bandra, Worli, BKC...'
                  }
                  className="w-full pl-9 pr-14 py-2.5 bg-white dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#C28E52] focus:ring-1 focus:ring-[#C28E52]"
                />
                
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-9 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : null}

                {/* GPS Detect */}
                <button
                  type="button"
                  onClick={handleDetectGPS}
                  title="Detect my current location"
                  className="absolute right-2 px-1.5 py-1 text-[11px] font-semibold text-[#C28E52] hover:text-[#AB773D] flex items-center gap-1 rounded hover:bg-slate-200/50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Compass className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Locality suggestions popover */}
              {showLocalitySuggestions && (
                <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 z-30 max-h-56 overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Popular Localities in {selectedCity}
                  </div>
                  {filteredLocalities.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSearchQuery(loc);
                        handleExecuteSearch(loc);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-[#C28E52]" />
                        {loc}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-medium">Direct Owners</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Type Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Property Type
              </label>
              <select
                value={selectedPropertyType}
                onChange={(e) => setSelectedPropertyType(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#C28E52] cursor-pointer"
              >
                <option value="all">All Types (Flat, House, PG)</option>
                <option value="flat">Flat / Apartment</option>
                <option value="house">House / Villa</option>
                <option value="pg">PG / Co-Living</option>
                <option value="office">Commercial Office</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>

            {/* Budget Range Option */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Budget Range
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-2.5 py-2.5 bg-white dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#C28E52] cursor-pointer"
              >
                <option value="all">Any Budget</option>
                {activePurpose === 'rent' ? (
                  <>
                    <option value="under50k">&lt; ₹50,000</option>
                    <option value="50k-150k">₹50K - ₹1.5L</option>
                    <option value="150k-300k">₹1.5L - ₹3.0L</option>
                    <option value="above300k">&gt; ₹3.0 Lakh</option>
                  </>
                ) : (
                  <>
                    <option value="under1cr">&lt; ₹1.00 Cr</option>
                    <option value="1cr-3cr">₹1 Cr - ₹3 Cr</option>
                    <option value="3cr-6cr">₹3 Cr - ₹6 Cr</option>
                    <option value="above6cr">&gt; ₹6.00 Cr</option>
                  </>
                )}
              </select>
            </div>

            {/* Prominent Search Button with Warm Bronze Gold (#C28E52) */}
            <div className="md:col-span-3 flex items-end">
              <button
                type="button"
                onClick={() => handleExecuteSearch()}
                className="w-full py-2.5 px-4 bg-[#C28E52] hover:bg-[#AB773D] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Search Properties</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Sub-bar: Trending and Live Status */}
          <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#C28E52]" />
                Trending in {selectedCity}:
              </span>
              {selectedCity === 'Jaipur' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('Vaishali Nagar');
                      handleExecuteSearch('Vaishali Nagar');
                    }}
                    className="hover:text-[#C28E52] underline underline-offset-2 cursor-pointer"
                  >
                    Vaishali Nagar Villas
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('C-Scheme');
                      handleExecuteSearch('C-Scheme');
                    }}
                    className="hover:text-[#C28E52] underline underline-offset-2 cursor-pointer"
                  >
                    C-Scheme Penthouses
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('Malviya Nagar');
                      handleExecuteSearch('Malviya Nagar');
                    }}
                    className="hover:text-[#C28E52] underline underline-offset-2 cursor-pointer"
                  >
                    Malviya Nagar (WTP)
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('Jagatpura');
                      handleExecuteSearch('Jagatpura');
                    }}
                    className="hover:text-[#C28E52] underline underline-offset-2 cursor-pointer"
                  >
                    Jagatpura Gated Kothi
                  </button>
                </>
              ) : selectedCity === 'Delhi NCR' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('Golf Course Road');
                      handleExecuteSearch('Golf Course Road');
                    }}
                    className="hover:text-[#C28E52] underline underline-offset-2 cursor-pointer"
                  >
                    Golf Course Road
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('Cyber City');
                      handleExecuteSearch('Cyber City');
                    }}
                    className="hover:text-[#C28E52] underline underline-offset-2 cursor-pointer"
                  >
                    Cyber City Corporate Hub
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('Sea Face Penthouses');
                      handleExecuteSearch('Worli');
                    }}
                    className="hover:text-[#C28E52] underline underline-offset-2 cursor-pointer"
                  >
                    Sea Face Penthouses
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('Bandra West');
                      handleExecuteSearch('Bandra West');
                    }}
                    className="hover:text-[#C28E52] underline underline-offset-2 cursor-pointer"
                  >
                    Bandra Luxury 3 BHK
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('BKC');
                      handleExecuteSearch('BKC');
                    }}
                    className="hover:text-[#C28E52] underline underline-offset-2 cursor-pointer"
                  >
                    BKC Grade-A Offices
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>42,890 Direct Owners Live Today</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
