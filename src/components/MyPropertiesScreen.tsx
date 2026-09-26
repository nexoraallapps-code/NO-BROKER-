import React, { useState } from 'react';
import { Property, UserProfile } from '../types';
import { 
  ArrowLeft, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  CheckCircle, 
  Key, 
  PauseCircle, 
  Building, 
  Eye, 
  PhoneCall, 
  TrendingUp, 
  Edit3, 
  Share2, 
  SlidersHorizontal, 
  Trash2, 
  Search, 
  ChevronDown, 
  ShieldCheck, 
  Lock, 
  FileText, 
  X, 
  Sparkles, 
  Check, 
  Bookmark, 
  ExternalLink,
  CheckCheck,
  Building2,
  Zap,
  MoreVertical,
  ChevronRight,
  RefreshCw,
  Home,
  CheckSquare,
  Shield,
  Phone
} from 'lucide-react';

interface MyPropertiesScreenProps {
  onBack: () => void;
  user: UserProfile;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenPostProperty: () => void;
  onNavigateHome?: () => void;
  onNavigateSaved?: () => void;
}

interface ManagedListing {
  id: string;
  title: string;
  typology: string;
  bhk: string;
  locality: string;
  city: string;
  sqft: string;
  furnishing: string;
  rent: number;
  deposit: number;
  brokerageSaved: number;
  status: 'available' | 'rented' | 'paused';
  views: number;
  inquiries: number;
  responseRate: number;
  image: string;
  imageAlt: string;
  propertyRef?: Property;
}

export const MyPropertiesScreen: React.FC<MyPropertiesScreenProps> = ({
  onBack,
  user,
  properties,
  onSelectProperty,
  onOpenPostProperty,
  onNavigateHome,
  onNavigateSaved,
}) => {
  // Mock listing management list
  const [listings, setListings] = useState<ManagedListing[]>([
    {
      id: 'NB-84920',
      title: 'Green View Heights',
      typology: '3 BHK Flat',
      bhk: '3 BHK',
      locality: 'Pali Hill, Bandra West',
      city: 'Mumbai',
      sqft: '1,840 sq.ft',
      furnishing: 'Fully Furnished',
      rent: 85000,
      deposit: 250000,
      brokerageSaved: 170000,
      status: 'available',
      views: 482,
      inquiries: 18,
      responseRate: 94,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Editorial photograph of an opulent Indian living room with warm teakwood paneling',
      propertyRef: properties[0],
    },
    {
      id: 'NB-73210',
      title: 'Sea Breeze Residences',
      typology: '2 BHK Designer Flat',
      bhk: '2 BHK',
      locality: 'Carter Road, Bandra West',
      city: 'Mumbai',
      sqft: '1,220 sq.ft',
      furnishing: 'Sea View Balcony',
      rent: 120000,
      deposit: 360000,
      brokerageSaved: 240000,
      status: 'available',
      views: 315,
      inquiries: 11,
      responseRate: 88,
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Contemporary island kitchen with black marquina marble countertop',
      propertyRef: properties[1] || properties[0],
    },
    {
      id: 'NB-59104',
      title: 'The Pavilion Villa',
      typology: '4 BHK Villa',
      bhk: '4 BHK',
      locality: 'Worli Sea Face',
      city: 'Mumbai',
      sqft: '4,200 sq.ft',
      furnishing: 'Private Garden & Pool',
      rent: 375000,
      deposit: 1000000,
      brokerageSaved: 750000,
      status: 'rented',
      views: 1240,
      inquiries: 45,
      responseRate: 99,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'The Pavilion Villa exterior angle',
      propertyRef: properties[2] || properties[0],
    },
  ]);

  // Tab & Search State
  const [activeTab, setActiveTab] = useState<'all' | 'available' | 'rented' | 'paused'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'price' | 'inquiries'>('recent');

  // Empty State Toggle for UX Preview
  const [forceEmptyState, setForceEmptyState] = useState<boolean>(false);

  // Status Dropdown & Modal State
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedListingForStatus, setSelectedListingForStatus] = useState<ManagedListing | null>(null);
  const [newSelectedStatus, setNewSelectedStatus] = useState<'available' | 'rented' | 'paused'>('available');

  // Performance Modal State
  const [selectedListingForPerf, setSelectedListingForPerf] = useState<ManagedListing | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Status update
  const handleUpdateStatus = (listingId: string, status: 'available' | 'rented' | 'paused') => {
    setListings(
      listings.map((item) => (item.id === listingId ? { ...item, status } : item))
    );
    setActiveMenuId(null);
    showToast(`Status updated to "${status.toUpperCase()}" successfully.`);
  };

  const handleDeleteListing = (listing: ManagedListing) => {
    if (window.confirm(`Are you sure you want to delete "${listing.title}"? This cannot be undone.`)) {
      setListings(listings.filter((l) => l.id !== listing.id));
      showToast(`Listing "${listing.title}" removed.`);
    }
  };

  const handleShareListing = (listing: ManagedListing) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#details=${listing.id}`);
      showToast(`Direct link for "${listing.title}" copied!`);
    }
  };

  // Metrics Count
  const totalCount = listings.length;
  const availableCount = listings.filter((l) => l.status === 'available').length;
  const rentedCount = listings.filter((l) => l.status === 'rented').length;
  const pausedCount = listings.filter((l) => l.status === 'paused').length;

  // Filter & Sort Logic
  const filteredListings = listings
    .filter((item) => {
      if (activeTab === 'all') return true;
      return item.status === activeTab;
    })
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.locality.toLowerCase().includes(q) ||
        item.bhk.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'price') return b.rent - a.rent;
      if (sortBy === 'inquiries') return b.inquiries - a.inquiries;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] antialiased selection:bg-[#C28E52]/20 selection:text-[#C28E52] flex flex-col justify-between">
      
      {/* 1. Header with Direct Brand & Verified Badges */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              aria-label="Go back"
              onClick={onBack}
              className="w-10 h-10 -ml-2 flex items-center justify-center text-[#1B1C1A] dark:text-white hover:text-[#C28E52] transition-colors cursor-pointer rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
              type="button"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C28E52]"></span>
                <span className="font-bold text-[10px] tracking-widest uppercase text-[#C28E52]">
                  NO BROKER DIRECT
                </span>
              </div>
              <h1 className="font-serif font-bold text-base sm:text-lg text-[#0F172A] dark:text-white leading-tight tracking-tight">
                My Properties
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] sm:text-xs tracking-wider uppercase font-bold">
                0% BROKERAGE
              </span>
            </div>

            <div className="flex items-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#C28E52]/40 shadow-xs"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#C28E52] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Content Body */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-[#FBF9F6] dark:bg-[#0A0F1D]">
        <div className="w-full max-w-4xl mx-auto flex flex-col">
          
          {/* Owner Direct Trust Banner & Page Intro */}
          <section className="px-4 sm:px-6 pt-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-[11px] tracking-widest uppercase text-[#C28E52] font-bold">
                  Owner Portfolio
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage your posted direct-to-tenant properties in real time
                </p>
              </div>

              <button
                onClick={onOpenPostProperty}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Post Property FREE</span>
              </button>
            </div>

            {/* Quick Empty State Switcher for UX Preview */}
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 mb-3">
              <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <Eye className="w-4 h-4 text-[#C28E52]" />
                <span>Toggle Empty State View (UX Test)</span>
              </span>
              <button
                onClick={() => setForceEmptyState(!forceEmptyState)}
                className="text-xs font-bold px-3 py-1 rounded-lg bg-[#0F172A] text-white hover:bg-[#C28E52] transition-colors cursor-pointer"
                type="button"
              >
                {forceEmptyState ? 'View Listings' : 'Switch View'}
              </button>
            </div>

            {/* Compact Stats Grid (4 Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2">
              
              {/* Card 1: Total */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0F172A] shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[10px] uppercase tracking-wider font-bold">Total</span>
                  <Building className="w-4 h-4 text-[#C28E52]" />
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white">
                    {totalCount}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Properties</span>
                </div>
              </div>

              {/* Card 2: Active */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0F172A] shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[#0F5132] dark:text-emerald-400">
                  <span className="text-[10px] uppercase tracking-wider font-bold">Active</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F5132] animate-pulse"></span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#0F5132] dark:text-emerald-400">
                    {availableCount}
                  </span>
                  <span className="text-xs text-[#0F5132] dark:text-emerald-400 font-bold">Available</span>
                </div>
              </div>

              {/* Card 3: Tenanted */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0F172A] shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[#80551F] dark:text-amber-300">
                  <span className="text-[10px] uppercase tracking-wider font-bold">Tenanted</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C28E52]"></span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white">
                    {rentedCount}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Rented Out</span>
                </div>
              </div>

              {/* Card 4: Inactive */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0F172A] shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] uppercase tracking-wider font-bold">Inactive</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white">
                    {pausedCount}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Paused</span>
                </div>
              </div>

            </div>
          </section>

          {/* Filter Chips Horizontal Scroller */}
          <section className="px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
            {[
              { id: 'all', label: `All (${totalCount})` },
              { id: 'available', label: `Available (${availableCount})` },
              { id: 'rented', label: `Rented Out (${rentedCount})` },
              { id: 'paused', label: `Paused (${pausedCount})` },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setActiveTab(pill.id as any)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === pill.id
                    ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                    : 'bg-[#F5F3F0] dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </section>

          {/* LISTINGS FEED (Rendered unless forceEmptyState or 0 items) */}
          {!forceEmptyState && filteredListings.length > 0 ? (
            <section className="px-4 sm:px-6 flex flex-col gap-4 py-2">
              {filteredListings.map((listing) => (
                <article
                  key={listing.id}
                  className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800"
                >
                  {/* Media Header with Badge Overlay */}
                  <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.imageAlt}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Top Status Tag */}
                    <div
                      className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md shadow-xs ${
                        listing.status === 'available'
                          ? 'bg-white/95 text-[#0F5132] dark:bg-slate-900/95 dark:text-emerald-400'
                          : listing.status === 'rented'
                          ? 'bg-[#0F172A]/90 text-white'
                          : 'bg-slate-800/90 text-slate-300'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          listing.status === 'available'
                            ? 'bg-[#0F5132] animate-ping'
                            : listing.status === 'rented'
                            ? 'bg-[#C28E52]'
                            : 'bg-slate-400'
                        }`}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {listing.status === 'available' ? 'Available' : listing.status === 'rented' ? 'Rented Out' : 'Paused'}
                      </span>
                    </div>

                    {/* 3-Dots Quick Menu Trigger */}
                    <button
                      onClick={() => handleShareListing(listing)}
                      aria-label="Listing options"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0F172A]/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#0F172A] transition-colors cursor-pointer"
                      type="button"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Direct Owner Seal Pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-white text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C28E52]" />
                      <span className="text-[10px] font-bold">
                        {listing.status === 'rented' ? 'Successfully Tenanted Directly' : 'Direct Owner • Zero Brokerage'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2
                          onClick={() => listing.propertyRef && onSelectProperty(listing.propertyRef)}
                          className="text-base sm:text-lg font-serif font-bold text-[#0F172A] dark:text-white leading-tight hover:text-[#C28E52] transition-colors cursor-pointer"
                        >
                          {listing.title}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C28E52] shrink-0" />
                          <span>{listing.locality}, {listing.city}</span>
                        </p>
                      </div>

                      <span className="px-2 py-0.5 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 text-[11px] text-[#0F172A] dark:text-white font-bold whitespace-nowrap">
                        {listing.typology}
                      </span>
                    </div>

                    {/* Financial Summary */}
                    <div className="flex items-baseline justify-between py-1.5 bg-[#F5F3F0] dark:bg-slate-900 px-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                      <div>
                        <span className="text-base sm:text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                          ₹{listing.rent.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal"> / month</span>
                      </div>

                      <p className="text-[11px] text-slate-500">
                        Deposit: <span className="font-bold text-[#0F172A] dark:text-white">₹{listing.deposit.toLocaleString('en-IN')}</span>
                      </p>
                    </div>

                    {/* Performance Summary Strip */}
                    <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs text-[#0F172A] dark:text-white">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="flex items-center gap-1 font-semibold">
                            <Eye className="w-3.5 h-3.5 text-[#C28E52]" />
                            <strong className="font-bold">{listing.views}</strong> Views
                          </span>
                          <span className="flex items-center gap-1 font-semibold">
                            <Phone className="w-3.5 h-3.5 text-[#0F5132] dark:text-emerald-400" />
                            <strong className="font-bold">{listing.inquiries}</strong> Contact Unlocks
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedListingForPerf(listing)}
                          className="text-[11px] font-bold text-[#C28E52] hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>Performance</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Activity spark bar */}
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                        <div className="bg-[#0F5132] h-full w-3/4"></div>
                        <div className="bg-[#C28E52] h-full w-1/4"></div>
                      </div>
                    </div>

                    {/* Status Selector Dropdown */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                        Listing Status:
                      </span>
                      <div className="relative inline-flex items-center">
                        <select
                          value={listing.status}
                          onChange={(e) => handleUpdateStatus(listing.id, e.target.value as any)}
                          className="appearance-none bg-white dark:bg-[#0F172A] text-xs text-[#0F172A] dark:text-white font-bold py-1 pl-2.5 pr-7 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
                        >
                          <option value="available">Available (Active)</option>
                          <option value="rented">Mark as Rented Out</option>
                          <option value="paused">Pause Listing</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Touch Actions */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      <button
                        onClick={() => listing.propertyRef && onSelectProperty(listing.propertyRef)}
                        className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-serif font-bold tracking-wide hover:bg-[#C28E52] transition-colors flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.99] cursor-pointer"
                        type="button"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Public Listing</span>
                      </button>

                      <div className="grid grid-cols-4 gap-1.5 pt-1">
                        <button
                          onClick={onOpenPostProperty}
                          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0F172A] hover:bg-slate-200 transition-colors cursor-pointer"
                          type="button"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span className="text-[10px] mt-0.5 font-semibold">Edit</span>
                        </button>

                        <button
                          onClick={() => handleShareListing(listing)}
                          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0F172A] hover:bg-slate-200 transition-colors cursor-pointer"
                          type="button"
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="text-[10px] mt-0.5 font-semibold">Share</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedListingForStatus(listing);
                            setNewSelectedStatus(listing.status);
                          }}
                          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0F172A] hover:bg-slate-200 transition-colors cursor-pointer"
                          type="button"
                        >
                          <SlidersHorizontal className="w-4 h-4" />
                          <span className="text-[10px] mt-0.5 font-semibold">Status</span>
                        </button>

                        <button
                          onClick={() => handleDeleteListing(listing)}
                          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-[10px] mt-0.5 font-bold">Delete</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </article>
              ))}
            </section>
          ) : (
            /* EMPTY STATE CONTAINER */
            <section className="px-4 sm:px-6 py-10 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#FAF8F5] dark:bg-slate-800 flex items-center justify-center shadow-inner mb-4 border border-slate-200 dark:border-slate-700">
                <Building className="w-10 h-10 text-[#C28E52]" />
              </div>

              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C28E52] mb-1">
                Direct Landlord Access
              </span>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white mb-2">
                No Properties Listed Yet
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 max-w-xs mb-6 leading-relaxed">
                List your property for free and connect directly with genuine verified tenants. Save 100% on brokerage fees.
              </p>

              <div className="w-full max-w-xs p-4 rounded-2xl bg-[#F5F3F0] dark:bg-slate-900 flex flex-col gap-2.5 mb-6 text-left border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-white">
                  <CheckCircle className="w-4 h-4 text-[#0F5132] shrink-0" />
                  <span>Zero Broker Commission (100% Free)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-white">
                  <CheckCircle className="w-4 h-4 text-[#0F5132] shrink-0" />
                  <span>Direct Phone Calls from Tenants</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-white">
                  <CheckCircle className="w-4 h-4 text-[#0F5132] shrink-0" />
                  <span>Instant Listing Verification</span>
                </div>
              </div>

              <button
                onClick={onOpenPostProperty}
                className="w-full max-w-xs py-3 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-serif font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                type="button"
              >
                <Plus className="w-4 h-4" />
                <span>Post Property FREE</span>
              </button>
            </section>
          )}

          {/* Sticky Bottom Post Property CTA (Floats right above fixed tab navigation) */}
          <div className="sticky bottom-20 z-40 w-full px-4 sm:px-6 py-2 pointer-events-none">
            <button
              onClick={onOpenPostProperty}
              className="pointer-events-auto w-full py-3.5 px-4 rounded-2xl bg-[#0F172A] text-white font-serif font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_-5px_rgba(15,23,42,0.35)] flex items-center justify-between hover:bg-[#C28E52] active:scale-[0.99] transition-all cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-[#C28E52]" />
                </div>
                <span>Post Another Property FREE</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-300 text-xs">
                <span>0% Brokerage</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>

        </div>
      </main>

      {/* 3. Modal: Inline Status Changer */}
      {selectedListingForStatus && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C28E52] font-bold">
                  Direct Owner Control
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                  Change Availability Status
                </h3>
              </div>
              <button
                onClick={() => setSelectedListingForStatus(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Select a new status for <span className="font-bold text-[#0F172A] dark:text-white">{selectedListingForStatus.title}</span>. Changes reflect across searches immediately.
            </p>

            <div className="space-y-2.5 mb-6">
              <label
                onClick={() => setNewSelectedStatus('available')}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                  newSelectedStatus === 'available'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500'
                    : 'bg-[#F5F3F0] dark:bg-slate-800 border-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="property-status"
                  checked={newSelectedStatus === 'available'}
                  onChange={() => setNewSelectedStatus('available')}
                  className="mt-1 accent-[#0F5132]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white">Available</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-[#0F5132]">Active</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tenants can view photos, floor plan, and contact you directly via phone or WhatsApp.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setNewSelectedStatus('rented')}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                  newSelectedStatus === 'rented'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500'
                    : 'bg-[#F5F3F0] dark:bg-slate-800 border-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="property-status"
                  checked={newSelectedStatus === 'rented'}
                  onChange={() => setNewSelectedStatus('rented')}
                  className="mt-1 accent-[#C28E52]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white">Rented Out</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-amber-100 text-[#80551F]">Leased</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Congratulations! Marked as rented without broker commission. Inquiries will be paused.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setNewSelectedStatus('paused')}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                  newSelectedStatus === 'paused'
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-500'
                    : 'bg-[#F5F3F0] dark:bg-slate-800 border-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="property-status"
                  checked={newSelectedStatus === 'paused'}
                  onChange={() => setNewSelectedStatus('paused')}
                  className="mt-1 accent-slate-600"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white">Pause Listing</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-200 text-slate-700">Unlisted</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hide temporarily from search results while preserving all your photos and filled details.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedListingForStatus(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-[#0F172A] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpdateStatus(selectedListingForStatus.id, newSelectedStatus);
                  setSelectedListingForStatus(null);
                }}
                className="px-5 py-2.5 bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Update Status Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal: Performance Traffic Analytics */}
      {selectedListingForPerf && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#0F5132] dark:text-emerald-400 font-bold">
                  Live Traffic Analytics
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                  Performance Summary
                </h3>
              </div>
              <button
                onClick={() => setSelectedListingForPerf(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 my-3">
              <div className="p-4 bg-[#FAF8F5] dark:bg-slate-900 rounded-xl space-y-2 border border-slate-200/70 dark:border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">7-Day Tenant Interest</span>
                  <span className="text-[#0F5132] dark:text-emerald-400 font-bold">+28% this week</span>
                </div>
                
                <svg className="w-full h-16 overflow-visible text-[#C28E52]" viewBox="0 0 300 60">
                  <defs>
                    <linearGradient id="chartGradMobile" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#C28E52" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#C28E52" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,45 Q40,38 75,40 T150,22 T225,18 T300,5 L300,60 L0,60 Z" fill="url(#chartGradMobile)"></path>
                  <path d="M0,45 Q40,38 75,40 T150,22 T225,18 T300,5" fill="none" stroke="#C28E52" strokeLinecap="round" strokeWidth="2.5"></path>
                  <circle cx="300" cy="5" fill="#0F172A" r="4"></circle>
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 bg-[#F5F3F0] dark:bg-slate-900 rounded-xl">
                  <div className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                    {selectedListingForPerf.views}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Views</div>
                </div>
                <div className="p-3 bg-[#F5F3F0] dark:bg-slate-900 rounded-xl">
                  <div className="text-lg font-serif font-bold text-[#0F5132] dark:text-emerald-400">
                    {selectedListingForPerf.inquiries}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Inquiries</div>
                </div>
                <div className="p-3 bg-[#F5F3F0] dark:bg-slate-900 rounded-xl">
                  <div className="text-lg font-serif font-bold text-[#C28E52]">
                    {selectedListingForPerf.responseRate}%
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Response</div>
                </div>
              </div>

              <div className="p-3 bg-emerald-100/70 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ranks in top 5% of direct rentals in {selectedListingForPerf.locality}.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedListingForPerf(null)}
                className="px-5 py-2 bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700/80 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
