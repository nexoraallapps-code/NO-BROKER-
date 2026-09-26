import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  ArrowLeft, 
  MapPin, 
  Search, 
  Crosshair, 
  Truck, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  ChevronRight, 
  ArrowRight, 
  X, 
  Check, 
  HelpCircle, 
  Handshake, 
  DollarSign, 
  FileCheck, 
  Navigation, 
  Building2, 
  Calendar, 
  Clock, 
  Sparkles,
  CheckCheck,
  ChevronDown
} from 'lucide-react';

interface PackersAndMoversScreenProps {
  onBack: () => void;
  user: UserProfile;
  onNavigateHome?: () => void;
  onOpenPostProperty?: () => void;
  onOpenReferral?: () => void;
  onNavigateSaved?: () => void;
}

interface MoverBusiness {
  id: string;
  name: string;
  locality: string;
  distance: string;
  image: string;
  verified: boolean;
  services: string;
  coverage: string;
  phone: string;
  whatsapp: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  fleetSize: string;
  tagline: string;
}

const MOVERS_DATA: MoverBusiness[] = [
  {
    id: 'mover-1',
    name: 'Royal Express Packers & Relocations',
    locality: 'Bandra West, Mumbai',
    distance: '1.8 km away',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    verified: true,
    services: 'House Shifting • Furniture Moving • Packing & Unpacking',
    coverage: 'All Mumbai, Navi Mumbai & Thane',
    phone: '+919876543210',
    whatsapp: '919876543210',
    rating: 4.9,
    reviewsCount: 342,
    experience: '12+ Years',
    fleetSize: '15 GPS Trucks',
    tagline: 'Specialized in high-value marble & teakwood furniture protection.',
  },
  {
    id: 'mover-2',
    name: 'Apex City Logistics & Movers',
    locality: 'Khar & Santacruz, Mumbai',
    distance: '3.2 km away',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    verified: true,
    services: 'Apartment Shifting • Office Relocation • Vehicle Transport',
    coverage: 'Mumbai Metropolitan Region',
    phone: '+919876543211',
    whatsapp: '919876543211',
    rating: 4.8,
    reviewsCount: 289,
    experience: '9 Years',
    fleetSize: '10 Closed Containers',
    tagline: 'Same-day express local apartment moves with zero damage guarantee.',
  },
  {
    id: 'mover-3',
    name: 'Heritage Safe Move Packers',
    locality: 'Andheri West, Mumbai',
    distance: '4.5 km away',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    verified: true,
    services: 'Residential Shifting • Delicate Item Packing • Inter-City Shifting',
    coverage: 'Mumbai & Pan-India Transport',
    phone: '+919876543212',
    whatsapp: '919876543212',
    rating: 4.9,
    reviewsCount: 512,
    experience: '15 Years',
    fleetSize: '24 Container Trucks',
    tagline: 'Multi-layer bubble wrap & 5-ply corrugated heavy box packaging.',
  },
  {
    id: 'mover-4',
    name: 'Vanguard Home Relocations',
    locality: 'Worli & Lower Parel, Mumbai',
    distance: '5.1 km away',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    verified: true,
    services: 'Full House Relocation • Furniture Dismantling • Safe Transit',
    coverage: 'South Mumbai & Central Suburbs',
    phone: '+919876543213',
    whatsapp: '919876543213',
    rating: 4.7,
    reviewsCount: 198,
    experience: '8 Years',
    fleetSize: '8 Mini-Tempos & Trucks',
    tagline: 'Certified carpenter team for German modular kitchen & wardrobe dismantle.',
  },
  {
    id: 'mover-5',
    name: 'Prime Transit Relocations',
    locality: 'Powai & Hiranandani, Mumbai',
    distance: '6.8 km away',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    verified: true,
    services: 'Corporate Moving • Premium Packing • Storage Facilities',
    coverage: 'Central Mumbai & Western Suburbs',
    phone: '+919876543214',
    whatsapp: '919876543214',
    rating: 4.8,
    reviewsCount: 224,
    experience: '11 Years',
    fleetSize: '12 Heavy Trucks',
    tagline: 'Climate-controlled temporary warehousing and gated luggage vaults.',
  },
  {
    id: 'mover-6',
    name: 'Urban Shifting Solutions',
    locality: 'Juhu & Vile Parle, Mumbai',
    distance: '7.2 km away',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    verified: true,
    services: 'Local Apartment Shifting • Packing Supplies • Quick Loading',
    coverage: 'Western Suburban Corridor',
    phone: '+919876543215',
    whatsapp: '919876543215',
    rating: 4.8,
    reviewsCount: 167,
    experience: '7 Years',
    fleetSize: '9 Fleet Vehicles',
    tagline: 'Rapid 2-hour loading with hydraulic lift assistance for high rises.',
  },
];

export const PackersAndMoversScreen: React.FC<PackersAndMoversScreenProps> = ({
  onBack,
  user,
  onNavigateHome,
  onOpenPostProperty,
  onOpenReferral,
  onNavigateSaved,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocalityFilter, setSelectedLocalityFilter] = useState('all');
  const [selectedBusinessForModal, setSelectedBusinessForModal] = useState<MoverBusiness | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Business registration form state
  const [regForm, setRegForm] = useState({
    businessName: '',
    ownerName: user.name || '',
    phone: user.phone || '',
    city: 'Mumbai',
    locality: 'Bandra West',
    fleetCount: '5 Trucks',
    gstin: '',
  });
  const [isRegSuccess, setIsRegSuccess] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegSuccess(true);
    showToast('🎉 Business Registration Submitted! Verification team will contact within 2 hours.');
    setTimeout(() => {
      setIsRegisterModalOpen(false);
      setIsRegSuccess(false);
    }, 2800);
  };

  const filteredMovers = MOVERS_DATA.filter((mover) => {
    if (selectedLocalityFilter === '5km' && !mover.distance.includes('1.') && !mover.distance.includes('3.') && !mover.distance.includes('4.')) {
      return false;
    }
    if (selectedLocalityFilter === 'bandra' && !mover.locality.toLowerCase().includes('bandra') && !mover.locality.toLowerCase().includes('khar')) {
      return false;
    }
    if (selectedLocalityFilter === 'andheri' && !mover.locality.toLowerCase().includes('andheri')) {
      return false;
    }
    if (selectedLocalityFilter === 'south' && !mover.locality.toLowerCase().includes('worli') && !mover.locality.toLowerCase().includes('south')) {
      return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      mover.name.toLowerCase().includes(q) ||
      mover.locality.toLowerCase().includes(q) ||
      mover.services.toLowerCase().includes(q) ||
      mover.coverage.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] antialiased selection:bg-[#C28E52]/20 selection:text-[#C28E52] flex flex-col justify-between">
      
      {/* 1. Header with Direct Logistics & Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          
          <div className="flex items-center gap-6">
            <button
              onClick={onNavigateHome || onBack}
              className="flex items-center gap-2 cursor-pointer text-left group"
            >
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight uppercase text-[#0F172A] dark:text-white">
                NO<span className="text-[#C28E52]">BROKER</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F5132] hidden sm:inline-block"></span>
              <span className="hidden sm:inline-block px-2 py-0.5 bg-[#EFEEEB] dark:bg-slate-800 text-[#C28E52] font-bold text-[10px] uppercase tracking-wider rounded">
                Direct Logistics
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 text-[#1B1C1A] dark:text-white hover:bg-slate-200 transition-colors cursor-pointer text-xs font-semibold">
              <MapPin className="w-4 h-4 text-[#C28E52]" />
              <span>Mumbai</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-8 relative text-xs font-semibold text-slate-600 dark:text-slate-400">
            <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
              Buy
            </button>
            <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
              Rent
            </button>
            <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
              Commercial
            </button>
            <span className="text-[#0F172A] dark:text-white font-bold border-b-2 border-[#0F172A] dark:border-[#C28E52] pb-0.5">
              Packers &amp; Movers
            </span>
            <button onClick={onOpenReferral || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
              Refer &amp; Earn
            </button>
          </nav>

          <div className="flex items-center gap-4 lg:gap-6">
            <button
              onClick={onOpenPostProperty || onBack}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold tracking-wide transition-colors duration-200 shadow-[0_2px_12px_rgba(15,23,42,0.08)] cursor-pointer"
            >
              Post Property <span className="ml-1.5 font-semibold text-amber-300">FREE</span>
            </button>

            <div className="flex items-center gap-2 pl-2 sm:pl-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(15,23,42,0.12)]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#C28E52] text-white flex items-center justify-center text-xs font-bold">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Content */}
      <main className="w-full pt-20 bg-[#FBF9F6] dark:bg-[#0A0F1D] flex-grow">
        <div className="flex flex-col w-full">
          
          {/* Subtle Ambient Glow Element */}
          <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-b from-amber-200/20 dark:from-amber-900/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

            {/* 1. Breadcrumbs & Header Hero */}
            <section className="flex flex-col gap-4">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                  Packers &amp; Movers
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#0F172A] dark:text-white font-semibold">Top Packers &amp; Movers in Mumbai</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
                <div className="max-w-3xl flex flex-col gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE8E5] dark:bg-slate-800 w-fit">
                    <span className="w-2 h-2 rounded-full bg-[#0F5132] animate-pulse"></span>
                    <span className="text-[11px] uppercase tracking-wider text-[#0F172A] dark:text-white font-bold">
                      Direct Logistics Network
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight">
                    Top Packers &amp; Movers
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    Connect directly with verified local shifting services and movers for your home or office relocation without brokerage fees.
                  </p>
                </div>

                {/* Trust Mini Counter */}
                <div className="hidden lg:flex items-center gap-4 p-4 rounded-2xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-[#C28E52]">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Locality Active</span>
                    <span className="font-serif font-bold text-lg text-[#0F172A] dark:text-white">8 Verified Movers</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Search & Location Bar */}
            <section className="mt-8 flex flex-col gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-slate-200/80 dark:border-slate-800 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
                
                {/* Locality Detector */}
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 min-w-max border border-slate-200/60 dark:border-slate-800">
                  <MapPin className="w-5 h-5 text-[#C28E52]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Current Location</span>
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white">Bandra West, Mumbai</span>
                  </div>
                  <button
                    onClick={() => showToast('📍 GPS Location detected: Bandra West, Mumbai 400050')}
                    className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-xs text-[#0F172A] dark:text-white font-bold cursor-pointer shadow-2xs"
                    type="button"
                  >
                    <Crosshair className="w-3.5 h-3.5 text-[#0F5132]" />
                    <span>Use My Location</span>
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by locality, area or pincode..."
                    className="w-full h-12 pl-12 pr-4 bg-[#F5F3F0] dark:bg-slate-900 focus:bg-white dark:focus:bg-[#0F172A] text-xs sm:text-sm text-[#0F172A] dark:text-white placeholder:text-slate-400 rounded-xl outline-none transition-colors border border-slate-200/60 dark:border-slate-800 focus:border-[#C28E52]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Locality Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1" id="chips-container">
                {[
                  { id: 'all', label: `All Nearby (${MOVERS_DATA.length})` },
                  { id: '5km', label: 'Within 5 km' },
                  { id: 'bandra', label: 'Bandra & Khar' },
                  { id: 'andheri', label: 'Andheri' },
                  { id: 'south', label: 'South Mumbai' },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setSelectedLocalityFilter(chip.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedLocalityFilter === chip.id
                        ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                        : 'bg-[#EFEEEB] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#E4E2DF]'
                    }`}
                    type="button"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </section>

            {/* 3. Business Registration Banner */}
            <section className="mt-10">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#131B2E] to-[#0A0F1D] text-white p-6 lg:p-8 shadow-xl border border-slate-800">
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#C28E52]/10 blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex flex-col gap-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2.5 py-1 rounded bg-amber-200 text-amber-950 font-bold text-[10px] uppercase tracking-wider">
                        Registration ₹500 • One-Time Verification
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Register Your Packers &amp; Movers Business
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      List your packing and moving service directly on NO BROKER. Reach thousands of verified tenants and homeowners moving every month with 0% middleman fees.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => setIsRegisterModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-serif font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(194,142,82,0.3)] cursor-pointer"
                      type="button"
                    >
                      <span>Register Business for ₹500</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Premium Packers Business Cards Grid */}
            <section className="mt-12 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white">
                  Verified Moving Services in Mumbai
                </h3>
                <span className="text-xs text-slate-500">
                  Showing {filteredMovers.length} of {MOVERS_DATA.length} Operators
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredMovers.map((mover) => (
                  <article
                    key={mover.id}
                    className="flex flex-col rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200/80 dark:border-slate-800"
                  >
                    {/* Top Image Banner */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img
                        src={mover.image}
                        alt={mover.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[11px] text-[#0F172A] dark:text-white font-bold shadow-xs">
                          <Navigation className="w-3.5 h-3.5 text-[#C28E52]" />
                          {mover.distance}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F5132] text-white text-[11px] font-bold shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified Partner
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] text-amber-300 uppercase tracking-wider block font-bold">
                          {mover.locality}
                        </span>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-white truncate">
                          {mover.name}
                        </h4>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between gap-5 bg-white dark:bg-[#0F172A]">
                      <div className="flex flex-col gap-3">
                        
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                            Specialized Services
                          </span>
                          <p className="text-xs font-semibold text-[#0F172A] dark:text-white leading-snug">
                            {mover.services}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 flex flex-col gap-1 border border-slate-200/60 dark:border-slate-800">
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                            <MapPin className="w-3.5 h-3.5 text-[#C28E52]" />
                            <span className="font-bold">Operational Coverage</span>
                          </div>
                          <p className="text-xs font-semibold text-[#0F172A] dark:text-white">
                            {mover.coverage}
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-2 text-xs text-[#0F5132] dark:text-emerald-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-[#0F5132] animate-pulse"></span>
                          <span>Available Now for Shifting</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => setSelectedBusinessForModal(mover)}
                          className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-serif font-bold hover:bg-[#C28E52] transition-colors text-center cursor-pointer shadow-xs"
                          type="button"
                        >
                          View Business &amp; Calculator
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={`tel:${mover.phone}`}
                            className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-[#0F172A] dark:text-white transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#0F5132]" />
                            <span>Call Direct</span>
                          </a>

                          <a
                            href={`https://wa.me/${mover.whatsapp}?text=Hi%2C+I+found+your+packers+and+movers+service+on+NO+BROKER+Direct.+I+would+like+a+shifting+quote.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* 5. Trust Guarantees at bottom */}
            <section className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-[#0F5132] dark:text-emerald-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                      100% Direct Contact
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Speak directly to verified fleet owners and team supervisors.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-[#C28E52] shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                      Verified Transport Licenses
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Every partner passes strict commercial transport certification checks.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white shrink-0">
                    <DollarSign className="w-6 h-6 text-[#C28E52]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                      Zero Commission
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      No middleman fees or platform markups on any move.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* 6. Why Book Direct Section (The Direct Moving Advantage) */}
            <section className="mt-16 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEEB] dark:bg-slate-800 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#C28E52]"></span>
                  <span className="text-[10px] uppercase tracking-wider text-[#0F172A] dark:text-white font-bold">
                    The Direct Moving Advantage
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight">
                  Why Book Direct Packers &amp; Movers on NO BROKER?
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                  Experience true relocation independence. By eliminating intermediaries and platform markups, you work directly with professional fleet supervisors for total transparency.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-[#0F5132] dark:text-emerald-400">
                    <Handshake className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                    Zero Middlemen
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Connect straight to vetted transport operators and supervisors without aggregator surcharges or hidden convenience fees.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-[#C28E52]">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                    Transparent Quotes
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Receive upfront, itemized estimates tailored to your household volume, floor accessibility, and elevator permissions.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-[#0F5132] dark:text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                    100% Vetted Licenses
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    All listed service providers undergo mandatory GST, vehicle roadworthiness, and commercial transport permit verification.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white">
                    <Navigation className="w-6 h-6 text-[#C28E52]" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                    GPS Fleet Tracking
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Live GPS dispatch tracking and dedicated mover supervisor contact throughout the entire transit process.
                  </p>
                </div>

              </div>
            </section>

            {/* 7. How Direct Shifting Works (4 Steps) */}
            <section className="mt-16 p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-8">
              <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
                <span className="text-[10px] uppercase tracking-wider text-[#C28E52] font-bold">
                  Simple 4-Step Process
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white">
                  How Direct Shifting Works
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Move your home or office effortlessly with complete direct ownership of every arrangement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="p-5 rounded-xl bg-white dark:bg-[#0F172A] flex flex-col gap-3 shadow-xs border border-slate-200/60 dark:border-slate-800">
                  <span className="w-8 h-8 rounded-full bg-[#0F172A] text-white text-xs font-bold flex items-center justify-center font-serif">
                    01
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#0F172A] dark:text-white">
                    Select Locality
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Filter verified logistics partners located directly within your departure and destination suburban zones.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-[#0F172A] flex flex-col gap-3 shadow-xs border border-slate-200/60 dark:border-slate-800">
                  <span className="w-8 h-8 rounded-full bg-[#0F172A] text-white text-xs font-bold flex items-center justify-center font-serif">
                    02
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#0F172A] dark:text-white">
                    Direct Contact
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    One-click WhatsApp or Phone call straight to the partner supervisor with zero screening agents.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-[#0F172A] flex flex-col gap-3 shadow-xs border border-slate-200/60 dark:border-slate-800">
                  <span className="w-8 h-8 rounded-full bg-[#0F172A] text-white text-xs font-bold flex items-center justify-center font-serif">
                    03
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#0F172A] dark:text-white">
                    Free Inspection
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Share a video walkthrough or schedule a fast on-site survey to confirm carton quantity and furniture disassembly.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-[#0F172A] flex flex-col gap-3 shadow-xs border border-slate-200/60 dark:border-slate-800">
                  <span className="w-8 h-8 rounded-full bg-[#0F5132] text-white text-xs font-bold flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#0F172A] dark:text-white">
                    Smooth Transit
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Professional packing, multi-layer cushioning, prompt vehicle loading, and careful room-by-room unpacking.
                  </p>
                </div>

              </div>
            </section>

            {/* 8. Relocation FAQs */}
            <section className="mt-16 flex flex-col gap-6 pb-6">
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEEB] dark:bg-slate-800 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#0F5132]"></span>
                  <span className="text-[10px] uppercase tracking-wider text-[#0F172A] dark:text-white font-bold">
                    Help &amp; Answers
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight">
                  Frequently Asked Questions
                </h3>

                <p className="text-xs sm:text-sm text-slate-500">
                  Everything you need to know about booking verified packers and movers directly in Mumbai.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-[#0F172A] dark:text-white">
                    <HelpCircle className="w-5 h-5 text-[#C28E52] shrink-0" />
                    <h4 className="font-serif font-bold text-sm sm:text-base">
                      Why is NO BROKER Packers &amp; Movers 100% free?
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    NO BROKER functions as a direct logistics open network. We connect homeowners and business owners straight to certified truck owners and shifting supervisors. Neither party pays commission or platform surcharges.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-[#0F172A] dark:text-white">
                    <HelpCircle className="w-5 h-5 text-[#C28E52] shrink-0" />
                    <h4 className="font-serif font-bold text-sm sm:text-base">
                      How are shifting partner credentials verified?
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Every listed partner undergoes strict verification of their commercial transport trade license, GSTIN, motor vehicle insurance, office location in Mumbai, and background checks for on-field crew leads.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-[#0F172A] dark:text-white">
                    <HelpCircle className="w-5 h-5 text-[#C28E52] shrink-0" />
                    <h4 className="font-serif font-bold text-sm sm:text-base">
                      What packing materials are included?
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Standard shifting includes heavy-duty 5-ply corrugated carton boxes, air bubble wraps, stretch film wrapping for couches and wardrobes, foam corners for fragile glass, and waterproof tarp covers during transit.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-[#0F172A] dark:text-white">
                    <HelpCircle className="w-5 h-5 text-[#C28E52] shrink-0" />
                    <h4 className="font-serif font-bold text-sm sm:text-base">
                      Which areas across Mumbai are serviced?
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Our partner fleet covers South Mumbai, Western Suburbs (Bandra to Dahisar), Central Suburbs (Sion to Mulund), Navi Mumbai (Vashi, Nerul, Kharghar), and the Thane-Kalyan commercial belt with intra-city and inter-city permits.
                  </p>
                </div>

              </div>
            </section>

          </div>
        </div>
      </main>

      {/* 3. Modal: View Business Profile & Fare Calculator */}
      {selectedBusinessForModal && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C28E52] font-bold">
                  Verified Logistics Partner
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                  {selectedBusinessForModal.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedBusinessForModal.locality}</p>
              </div>

              <button
                onClick={() => setSelectedBusinessForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 my-4">
              <div className="p-3 bg-[#F5F3F0] dark:bg-slate-900 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Fleet &amp; Experience</span>
                  <span className="font-bold text-[#0F172A] dark:text-white">{selectedBusinessForModal.experience} • {selectedBusinessForModal.fleetSize}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Customer Rating</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">★ {selectedBusinessForModal.rating} ({selectedBusinessForModal.reviewsCount} Reviews)</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#0F172A] dark:text-white">Partner Specialization</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  {selectedBusinessForModal.tagline}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#0F172A] dark:text-white">Services Included</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">{selectedBusinessForModal.services}</p>
              </div>

              {/* Direct CTAs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${selectedBusinessForModal.phone}`}
                  className="py-3 px-4 rounded-xl bg-[#0F172A] text-white text-xs font-bold text-center flex items-center justify-center gap-2 hover:bg-[#C28E52] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Fleet Manager</span>
                </a>

                <a
                  href={`https://wa.me/${selectedBusinessForModal.whatsapp}?text=Hello+${encodeURIComponent(selectedBusinessForModal.name)}%2C+I+need+a+relocation+quote+via+NO+BROKER+Direct.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. Modal: Business Registration for Packers & Movers */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#0F5132] font-bold">
                  Fleet Partner Onboarding
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                  Register Movers Business (₹500)
                </h3>
              </div>

              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isRegSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0F5132] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#0F172A] dark:text-white">
                  Registration Successful!
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Your business has been submitted for one-time verification. You will receive listing leads on WhatsApp directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 my-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    Business / Enterprise Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Logistics & Shifting Pvt Ltd"
                    value={regForm.businessName}
                    onChange={(e) => setRegForm({ ...regForm, businessName: e.target.value })}
                    className="w-full bg-[#F5F3F0] dark:bg-slate-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] dark:text-white outline-none focus:ring-2 focus:ring-[#C28E52]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.ownerName}
                      onChange={(e) => setRegForm({ ...regForm, ownerName: e.target.value })}
                      className="w-full bg-[#F5F3F0] dark:bg-slate-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] dark:text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Mobile / WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      className="w-full bg-[#F5F3F0] dark:bg-slate-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Operating Locality
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.locality}
                      onChange={(e) => setRegForm({ ...regForm, locality: e.target.value })}
                      className="w-full bg-[#F5F3F0] dark:bg-slate-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] dark:text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      GSTIN / Trade License #
                    </label>
                    <input
                      type="text"
                      placeholder="27AAACR1234F1Z1"
                      value={regForm.gstin}
                      onChange={(e) => setRegForm({ ...regForm, gstin: e.target.value })}
                      className="w-full bg-[#F5F3F0] dark:bg-slate-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] dark:text-white outline-none uppercase"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2 border border-amber-200 dark:border-amber-800">
                  <Sparkles className="w-4 h-4 text-[#C28E52] shrink-0 mt-0.5" />
                  <span>One-time ₹500 fee covers physical GPS tracker verification and priority placement on NO BROKER.</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-500 font-bold hover:text-[#0F172A]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Pay ₹500 &amp; Register
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 5. Footer */}
      <footer className="w-full bg-[#FAF8F5] dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-10">
            
            <div className="lg:col-span-2 flex flex-col items-start gap-3">
              <div className="font-serif font-bold text-lg text-[#0F172A] dark:text-white">
                NO<span className="text-[#C28E52]">BROKER</span> Direct
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Editorial curated moving &amp; relocation logistics. Direct-to-owner integrity, eliminating intermediaries with guaranteed verified pricing.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 text-[11px] font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>0% Brokerage • Direct Owner Assured</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                Relocation Services
              </span>
              <span className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Packers &amp; Movers Mumbai</span>
              <span className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">City Tempo &amp; Mini Trucks</span>
              <span className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Intercity Relocation</span>
              <span className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Vehicle Shifting</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                Property Portals
              </span>
              <span onClick={onNavigateHome || onBack} className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Buy Architectural Homes</span>
              <span onClick={onNavigateHome || onBack} className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Rent Luxury Estates</span>
              <span onClick={onNavigateHome || onBack} className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Commercial Spaces</span>
              <span onClick={onOpenPostProperty || onBack} className="text-xs text-[#C28E52] font-bold hover:underline cursor-pointer">Post Property Free</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                Company &amp; Trust
              </span>
              <span className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Our Philosophy</span>
              <span onClick={onOpenReferral || onBack} className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Refer &amp; Earn Club</span>
              <span className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Privacy &amp; Terms</span>
              <span className="text-xs text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Concierge Support</span>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2025 NoBroker Technologies Solutions Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Crafted with Architectural Precision</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>ISO 9001:2015 Certified Movers</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700/80 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
