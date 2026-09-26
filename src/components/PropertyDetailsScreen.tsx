import React, { useState } from 'react';
import { Property, UserProfile } from '../types';
import { generateOwnerWhatsAppUrl } from '../utils/whatsapp';
import { 
  Heart, 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Check, 
  Sparkles, 
  Waves, 
  Coffee, 
  Car, 
  PlusSquare, 
  Plane, 
  GraduationCap, 
  Phone, 
  MessageSquare, 
  Calendar, 
  X, 
  Lock, 
  Unlock,
  ArrowRight, 
  Gavel, 
  Grid, 
  VolumeX, 
  Leaf, 
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Maximize2,
  Layers,
  Coins,
  Compass,
  CheckCircle2,
  Building,
  Info
} from 'lucide-react';

interface PropertyDetailsScreenProps {
  property: Property;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
  onContactOwner: (property: Property) => void;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onOpenAuth: () => void;
  user: UserProfile;
  allProperties?: Property[];
}

export const PropertyDetailsScreen: React.FC<PropertyDetailsScreenProps> = ({
  property,
  onBack,
  onSelectProperty,
  onContactOwner,
  isSaved,
  onToggleSave,
  onOpenAuth,
  user,
  allProperties = [],
}) => {
  const [revealedPhone, setRevealedPhone] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedRoomPlan, setSelectedRoomPlan] = useState<'living' | 'master' | 'terrace' | 'kitchen'>('living');
  const [tourMode, setTourMode] = useState<'photos' | '3d'>('photos');

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleRevealPhone = () => {
    if (!user.isAuthenticated) {
      onOpenAuth();
      return;
    }
    setRevealedPhone(true);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleSuccess(true);
    setTimeout(() => {
      setShowScheduleModal(false);
      setScheduleSuccess(false);
    }, 2200);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setTourMode('photos');
    setIsLightboxOpen(true);
  };

  const open3DTour = () => {
    setLightboxIndex(0);
    setTourMode('3d');
    setIsLightboxOpen(true);
  };

  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.purpose === property.purpose))
    .slice(0, 3);

  // Floor plan interactive specifications
  const roomDetails = {
    living: {
      name: 'Grand Salon Lounge & Formal Dining',
      dimensions: '26 ft × 20 ft (520 sq.ft)',
      features: ['Schüco floor-to-ceiling panoramic glass', 'Double ceiling void with accent cove lighting', 'Direct access to western sunset deck'],
      flooring: 'Italian Statuario Polished Marble'
    },
    master: {
      name: 'Primary Sanctuary & En-Suite Haven',
      dimensions: '20 ft × 18 ft (360 sq.ft)',
      features: ['Walk-in dressing pavilion', 'Acoustic triple-seal acoustic windows', 'Freestanding jacuzzi soaking tub looking out to sea'],
      flooring: 'Engineered Natural Oak Parquet'
    },
    terrace: {
      name: 'Biophilic Sky Terrace & Deck',
      dimensions: '28 ft × 10 ft (280 sq.ft)',
      features: ['Automated drip-irrigation living canopy', 'Anti-skid teak composite decking', 'Private open-air dining bar setup'],
      flooring: 'Weatherproof Teakwood Decking'
    },
    kitchen: {
      name: 'Gourmet Chef Kitchen & Scullery',
      dimensions: '16 ft × 12 ft (192 sq.ft)',
      features: ['Miele built-in steam oven & induction', 'Separate dry pantry and staff entry core', 'Natural quartz waterfall island'],
      flooring: 'Non-slip Honed Terrazzo Slab'
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9]">
      
      {/* 1. Header with Breadcrumbs matching HTML Spec */}
      <header className="sticky top-0 w-full z-40 bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(15,23,42,0.05)]">
        <div className="h-16 sm:h-18 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[#0F172A] dark:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Return to explore"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                NO BROKER
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C28E52] bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded font-bold">
                Privé
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                isSaved ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'text-slate-600 dark:text-slate-300 hover:text-[#C28E52] hover:bg-slate-200/50 dark:hover:bg-slate-800'
              }`}
              title={isSaved ? 'Shortlisted' : 'Save to Shortlist'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-[#C28E52] hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Share listing link"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
            </button>

            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#C28E52] text-white flex items-center justify-center text-xs font-bold">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
            )}
          </div>

        </div>

        {/* Breadcrumbs Ribbon */}
        <div className="w-full bg-[#F5F3F0]/80 dark:bg-slate-900/80 border-t border-slate-200/60 dark:border-slate-800/60 px-4 sm:px-6 lg:px-12 py-2 text-xs text-slate-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <button onClick={onBack} className="hover:text-[#0F172A] dark:hover:text-white cursor-pointer font-medium">Home</button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span>{property.city}</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span>{property.subLocality}</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[#0F172A] dark:text-white font-semibold truncate max-w-xs">{property.title}</span>
        </div>
      </header>

      <main className="w-full">
        {/* Sub-Header Status Ribbon */}
        <section className="w-full bg-[#FAF8F5] dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-12 py-2.5">
          <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-[#0F5132] dark:text-emerald-400 rounded-full font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                0% Brokerage Guarantee • Direct Owner Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200/60 dark:bg-slate-800 text-[#0F172A] dark:text-slate-200 rounded-full font-medium">
                <Gavel className="w-3.5 h-3.5 text-[#C28E52]" />
                RERA Registered: P51800049211
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-[#0F5132] dark:text-emerald-400 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {property.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <button
                onClick={() => onToggleSave(property.id)}
                className="flex items-center gap-1 text-[#0F172A] dark:text-white hover:text-[#C28E52] cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-current' : ''}`} />
                <span>{isSaved ? 'Shortlisted' : 'Shortlist'}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-[#0F172A] dark:text-white hover:text-[#C28E52] cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'Copied Link' : 'Share'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Architectural Mosaic 5-Photo Gallery Section */}
        <section className="w-full px-4 sm:px-6 lg:px-12 pt-6 pb-8 max-w-[1400px] mx-auto">
          {/* Title & Financial At-a-Glance */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                <span>Sky Villa Monograph #{property.id}</span>
                <span>/</span>
                <span className="text-[#C28E52]">{property.location}</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold">{property.distanceFromUser || 'Near You'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#0F172A] dark:text-white tracking-tight">
                {property.title}
              </h1>
            </div>

            <div className="lg:text-right">
              <div className="flex items-baseline lg:justify-end gap-2">
                <span className="text-3xl sm:text-4xl font-bold font-serif text-[#0F172A] dark:text-white">
                  {property.priceFormatted}
                </span>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                {property.deposit ? `Deposit: ${property.deposit} • Zero Brokerage` : '100% Direct Title Transfer'}
              </p>
            </div>
          </div>

          {/* 5-Photo Luxury Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 h-[420px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(15,23,42,0.06)] bg-slate-900">
            {/* Primary Large Image */}
            <div 
              onClick={() => openLightbox(selectedPhotoIndex)}
              className="relative md:col-span-2 lg:col-span-3 h-full overflow-hidden group cursor-pointer"
            >
              <img
                src={property.images[selectedPhotoIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute top-4 left-4 backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-black/80 text-[#0F172A] dark:text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                <Maximize2 className="w-3.5 h-3.5 text-[#C28E52]" />
                Signature Terrace & Living
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#C28E52] font-semibold block mb-0.5">
                  {property.facing}
                </span>
                <p className="text-lg font-serif italic text-slate-100">{property.location}</p>
              </div>
            </div>

            {/* Vertical exterior facade */}
            <div 
              onClick={() => openLightbox(1)}
              className="relative hidden md:block md:col-span-2 lg:col-span-1 h-full overflow-hidden group cursor-pointer"
            >
              <img
                src={property.images[1] || property.images[0]}
                alt="Exterior view"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] text-[#C28E52] font-bold uppercase block">Exterior</span>
                <span className="text-xs font-semibold">Vertical Facade</span>
              </div>
            </div>

            {/* Stack of Interior Shots */}
            <div className="relative hidden lg:flex flex-col gap-3 lg:col-span-2 h-full">
              <div 
                onClick={() => openLightbox(2)}
                className="relative h-1/2 overflow-hidden group rounded-xl cursor-pointer"
              >
                <img
                  src={property.images[2] || property.images[0]}
                  alt="Interior living"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-2 left-3 text-white">
                  <span className="text-[11px] font-semibold bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">Grand Salon Lounge</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 h-1/2">
                <div 
                  onClick={() => openLightbox(3)}
                  className="relative overflow-hidden group rounded-xl cursor-pointer"
                >
                  <img
                    src={property.images[3] || property.images[0]}
                    alt="Master suite"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-2 left-2 text-white">
                    <span className="text-[10px] font-semibold bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">Master Suite</span>
                  </div>
                </div>

                <div 
                  onClick={open3DTour}
                  className="relative overflow-hidden rounded-xl bg-slate-950 flex flex-col items-center justify-center p-3 text-center group cursor-pointer border border-[#C28E52]/40 hover:border-[#C28E52] transition-colors"
                >
                  <Grid className="w-7 h-7 text-[#C28E52] mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">View All {property.images.length} Photos</span>
                  <span className="text-[10px] text-amber-300 font-semibold mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    3D Virtual Tour
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Micro photo selector strip on mobile */}
          <div className="flex md:hidden items-center gap-2 mt-3 overflow-x-auto pb-1">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  selectedPhotoIndex === idx ? 'border-[#C28E52] scale-105' : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Main Content Body: Two-Column Architectural Blueprint */}
        <section className="w-full px-4 sm:px-6 lg:px-12 pb-20 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Content & Details (8 of 12 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. Key Property Highlights Strip */}
              <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-slate-200/80 dark:border-slate-800">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
                  <div className="flex flex-col items-start pr-2 pt-1 sm:pt-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Configuration</span>
                    <span className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white mt-1">{property.bhk}</span>
                    <span className="text-xs text-[#C28E52] mt-0.5 font-medium">{property.propertyType.toUpperCase()}</span>
                  </div>
                  <div className="flex flex-col items-start sm:px-4 pt-2 sm:pt-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Carpet Area</span>
                    <span className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white mt-1">{property.carpetArea}</span>
                    <span className="text-xs text-slate-500 mt-0.5">100% Usable</span>
                  </div>
                  <div className="flex flex-col items-start sm:px-4 pt-2 sm:pt-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">En-Suite Baths</span>
                    <span className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white mt-1">{property.bathrooms} Baths</span>
                    <span className="text-xs text-slate-500 mt-0.5">+ Powder Room</span>
                  </div>
                  <div className="flex flex-col items-start sm:px-4 pt-2 sm:pt-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Parking</span>
                    <span className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white mt-1">{property.parking}</span>
                    <span className="text-xs text-emerald-600 mt-0.5 font-medium">Covered Bays</span>
                  </div>
                  <div className="flex flex-col items-start sm:pl-4 pt-2 sm:pt-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Level / Facing</span>
                    <span className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white mt-1 truncate">{property.floor}</span>
                    <span className="text-xs text-emerald-600 mt-0.5 font-medium">{property.facing}</span>
                  </div>
                </div>
              </div>

              {/* 2. Overview & Architectural Specifications Table */}
              <div className="bg-white dark:bg-[#0F172A] p-6 sm:p-7 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-slate-200/80 dark:border-slate-800 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h2 className="text-xl font-bold font-serif text-[#0F172A] dark:text-white">
                    Architectural Specifications
                  </h2>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                    Verified Registry Record
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl">
                    <span className="text-slate-500">Furnishing Status</span>
                    <span className="font-semibold text-[#0F172A] dark:text-white">{property.furnishing}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl">
                    <span className="text-slate-500">Possession Date</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{property.status}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl">
                    <span className="text-slate-500">Age of Property</span>
                    <span className="font-semibold text-[#0F172A] dark:text-white">{property.specifications?.ageOfProperty || '2 Years (Mint)'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl">
                    <span className="text-slate-500">Tenant Preference</span>
                    <span className="font-semibold text-[#0F172A] dark:text-white">{property.specifications?.tenantPreference || 'Open to All'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl">
                    <span className="text-slate-500">Facing Direction</span>
                    <span className="font-semibold text-[#0F172A] dark:text-white">{property.facing}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl">
                    <span className="text-slate-500">Balconies & Decks</span>
                    <span className="font-semibold text-[#0F172A] dark:text-white">{property.specifications?.balconies || '2 Wrap-Around Decks'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl">
                    <span className="text-slate-500">Ceiling Height</span>
                    <span className="font-semibold text-[#0F172A] dark:text-white">{property.specifications?.ceilingHeight || '13.5 ft Volume'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl">
                    <span className="text-slate-500">Maintenance</span>
                    <span className="font-semibold text-emerald-600">Included in Rent</span>
                  </div>
                </div>
              </div>

              {/* 3. Curator Architectural Note */}
              <div className="bg-white dark:bg-[#0F172A] p-6 sm:p-7 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#C28E52]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28E52]">
                    Curator&apos;s Architectural Note
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0F172A] dark:text-white">
                  An elevated sanctuary of natural light, acoustic silence, and living flora.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {property.specifications?.curatorNote || 
                    "Crowning the top tier of Pali Hill's premier vertical community, this custom sky residence blends rigorous architectural discipline with organic tranquility. Designed around an acoustic sanctuary philosophy with German Schüco multi-glazed facades."}
                </p>

                {/* Highlight Micro Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 bg-[#FAF8F5] dark:bg-slate-900/80 rounded-xl flex items-center gap-3">
                    <VolumeX className="w-5 h-5 text-[#C28E52] shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white">Schüco Acoustic Seals</div>
                      <div className="text-[11px] text-slate-500">&lt; 32dB Indoor Ambiance</div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] dark:bg-slate-900/80 rounded-xl flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white">Biophilic Air System</div>
                      <div className="text-[11px] text-slate-500">Indigenous Flora Canopy</div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] dark:bg-slate-900/80 rounded-xl flex items-center gap-3">
                    <Lock className="w-5 h-5 text-[#0F172A] dark:text-white shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white">Direct Core Elevator</div>
                      <div className="text-[11px] text-slate-500">Foyer Biometric Keypad</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Interactive Floor Plan & Spatial Blueprint Section */}
              <div className="bg-white dark:bg-[#0F172A] p-6 sm:p-7 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-slate-200/80 dark:border-slate-800 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#0F172A] dark:text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#C28E52]" />
                      Interactive Spatial Blueprint
                    </h2>
                    <p className="text-xs text-slate-500">Architectural breakdown of internal carpet zones</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-slate-800/80 p-1 rounded-xl">
                    <button
                      onClick={() => setSelectedRoomPlan('living')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedRoomPlan === 'living' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Living Salon
                    </button>
                    <button
                      onClick={() => setSelectedRoomPlan('master')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedRoomPlan === 'master' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Primary Suite
                    </button>
                    <button
                      onClick={() => setSelectedRoomPlan('terrace')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedRoomPlan === 'terrace' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Sky Deck
                    </button>
                    <button
                      onClick={() => setSelectedRoomPlan('kitchen')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedRoomPlan === 'kitchen' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Kitchen
                    </button>
                  </div>
                </div>

                {/* Blueprint Card */}
                <div className="p-5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28E52] block">
                      Zone Specification
                    </span>
                    <h4 className="text-lg font-bold font-serif text-[#0F172A] dark:text-white">
                      {roomDetails[selectedRoomPlan].name}
                    </h4>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">Dimension: </span>
                      {roomDetails[selectedRoomPlan].dimensions}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">Flooring: </span>
                      {roomDetails[selectedRoomPlan].flooring}
                    </div>
                    <ul className="space-y-1.5 pt-1 text-xs text-slate-500">
                      {roomDetails[selectedRoomPlan].features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-48 sm:h-52 bg-slate-900 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-4 border border-slate-800 text-center">
                    <div className="absolute inset-0 bg-[radial-gradient(#C28E52_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                    <Compass className="w-8 h-8 text-[#C28E52] mb-2 animate-spin-slow" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {roomDetails[selectedRoomPlan].name}
                    </span>
                    <span className="text-[11px] text-amber-300 font-mono mt-1">
                      {roomDetails[selectedRoomPlan].dimensions}
                    </span>
                    <div className="mt-3 px-3 py-1 bg-white/10 rounded-full text-[10px] text-slate-300 backdrop-blur-sm">
                      Full CAD Blueprint Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Sanctuary Amenities Grid */}
              <div className="bg-white dark:bg-[#0F172A] p-6 sm:p-7 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#0F172A] dark:text-white">
                      Sanctuary Amenities
                    </h2>
                    <p className="text-xs text-slate-500">Exclusive privileges reserved for estate residents and their guests</p>
                  </div>
                  <span className="text-xs font-bold bg-[#FAF8F5] dark:bg-slate-800 px-3 py-1 rounded-full text-[#C28E52]">
                    {property.amenities.length} Signature Perks
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="p-4 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl flex flex-col items-center text-center hover:border-[#C28E52]/40 transition-colors border border-transparent">
                      <Sparkles className="w-5 h-5 text-[#C28E52] mb-2" />
                      <span className="text-xs font-bold text-[#0F172A] dark:text-white">{amenity}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Verified In-House</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Transit & Neighborhood Intelligence */}
              <div className="bg-white dark:bg-[#0F172A] p-6 sm:p-7 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#0F172A] dark:text-white">
                      {property.subLocality} Intelligence
                    </h2>
                    <p className="text-xs text-slate-500">Quiet verdant enclave surrounded by iconic promenades</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">
                    <span>94/100</span>
                    <span>Walker&apos;s Paradise</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl flex items-start gap-2.5">
                    <Waves className="w-4 h-4 text-[#C28E52] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[#0F172A] dark:text-white block">Carter Road Promenade</span>
                      <span className="text-slate-500">800 meters • 8 min walk</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl flex items-start gap-2.5">
                    <Coffee className="w-4 h-4 text-[#C28E52] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[#0F172A] dark:text-white block">Pali Beach Café & Olive</span>
                      <span className="text-slate-500">400 meters • 4 min walk</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl flex items-start gap-2.5">
                    <Car className="w-4 h-4 text-[#C28E52] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[#0F172A] dark:text-white block">Bandra-Worli Sea Link</span>
                      <span className="text-slate-500">2.5 KM • 7 min drive</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl flex items-start gap-2.5">
                    <PlusSquare className="w-4 h-4 text-[#C28E52] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[#0F172A] dark:text-white block">Lilavati Hospital</span>
                      <span className="text-slate-500">1.8 KM • 6 min drive</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl flex items-start gap-2.5">
                    <Plane className="w-4 h-4 text-[#C28E52] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[#0F172A] dark:text-white block">Mumbai T2 Airport</span>
                      <span className="text-slate-500">10.4 KM • 25 min drive</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] dark:bg-slate-900/60 rounded-xl flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#C28E52] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[#0F172A] dark:text-white block">BKC Financial Hub</span>
                      <span className="text-slate-500">5.2 KM • 14 min drive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Zero-Brokerage Savings Calculator Breakdown */}
              <div className="bg-gradient-to-br from-emerald-950/20 via-transparent to-amber-950/20 bg-white dark:bg-[#0F172A] p-6 sm:p-7 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-emerald-500" />
                    <h2 className="text-xl font-bold font-serif text-[#0F172A] dark:text-white">
                      Zero-Brokerage Financial Advantage
                    </h2>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-500 text-white rounded-full">
                    100% Commission-Free
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-xs text-rose-500 font-bold uppercase tracking-wider">Traditional Real Estate Agency</div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">₹5,70,000 Fee</div>
                    <p className="text-[11px] text-slate-500">2 months standard broker fee paid with zero value-add.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 space-y-2">
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">NO BROKER Privé Experience</div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹0 (ZERO RUPEES)</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">You keep ₹5,70,000 cash in your bank. Direct handshake with the owner.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Sticky Direct Contact & Escrow Card (4 of 12 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Direct Owner Handshake Card */}
              <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.08)] border border-slate-200/80 dark:border-slate-800 space-y-4 relative overflow-hidden">
                {/* Top Accent Gold Glow Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C28E52] via-[#0F5132] to-[#0F172A]" />

                {/* Direct Owner Profile Identity Header */}
                <div className="flex items-center gap-3.5 pt-1">
                  <div className="w-14 h-14 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-serif text-xl font-bold shadow-md">
                    {property.owner.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold font-serif text-[#0F172A] dark:text-white truncate">
                      {property.owner.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Title Deed & Aadhaar Verified Landlord</span>
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Active Now • Direct Landlord (No Agent)</span>
                    </div>
                  </div>
                </div>

                {/* Zero Brokerage Massive Savings Banner */}
                <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950/30 dark:to-amber-950/20 rounded-xl flex items-center gap-3 border border-emerald-200/40 dark:border-emerald-800/40">
                  <div className="text-xs">
                    <div className="font-bold text-emerald-800 dark:text-emerald-300">
                      Save ₹5,70,000 on Brokerage
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Direct lease with the owner. Zero commission fees.
                    </div>
                  </div>
                </div>

                {/* Owner Direct Action Triggers */}
                <div className="space-y-2.5 pt-1">
                  <a
                    href={`tel:${property.owner.phone}`}
                    className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-[#C28E52] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#C28E52]" />
                    <span>Call Owner ({property.owner.phone})</span>
                  </a>

                  <a
                    href={generateOwnerWhatsAppUrl(property)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 bg-[#0F5132] hover:bg-emerald-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer group"
                    title={`Chat on WhatsApp with ${property.owner.name}`}
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(true)}
                    className="w-full py-3 px-4 bg-[#F5F3F0] hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#C28E52]" />
                    <span>Schedule In-Person Viewing</span>
                  </button>
                </div>

                {/* Rent Breakdown */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1.5 text-slate-500">
                  <div className="flex justify-between">
                    <span>Monthly Rent</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{property.priceFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit (Refundable)</span>
                    <span className="font-semibold text-[#0F172A] dark:text-white">2 Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brokerage Commission</span>
                    <span className="font-bold text-emerald-600">₹0 (ZERO)</span>
                  </div>
                </div>
              </div>

              {/* Safety Guarantee */}
              <div className="bg-white dark:bg-[#0F172A] p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>NoBroker Privé Escrow Assurance</span>
                </div>
                <ul className="space-y-1 text-slate-500 text-[11px]">
                  <li>• Legally vetted Title Deed verified by in-house legal counsel.</li>
                  <li>• At-home biometric tenant registration.</li>
                  <li>• Direct-to-owner digital deposit escrow protection.</li>
                </ul>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                  <span>Owner Title ID: #{property.id}</span>
                  <span className="text-emerald-600 font-semibold">100% Direct Certified</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Similar Curated Residences Carousel / Grid */}
        {similarProperties.length > 0 && (
          <section className="w-full bg-[#FAF8F5] dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-12">
            <div className="max-w-[1400px] mx-auto space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#C28E52] font-bold">Private Portfolio</span>
                  <h3 className="text-2xl font-bold font-serif text-[#0F172A] dark:text-white mt-1">
                    Similar Curated Residences in {property.city}
                  </h3>
                </div>
                <button
                  onClick={onBack}
                  className="text-xs font-bold text-[#C28E52] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore All Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((simProp) => (
                  <div
                    key={simProp.id}
                    onClick={() => {
                      onSelectProperty(simProp);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group bg-white dark:bg-[#0F172A] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-[#C28E52]/60 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={simProp.images[0]}
                        alt={simProp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#0F5132] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        0% Brokerage
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 text-white text-xs bg-black/60 backdrop-blur-sm p-1.5 rounded">
                        <span className="font-semibold block truncate">{simProp.title}</span>
                        <span className="text-[#C28E52] font-serif font-bold">{simProp.priceFormatted}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Mobile Sticky Owner Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-base font-serif font-bold text-[#0F172A] dark:text-white truncate">
            {property.priceFormatted}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>0% Brokerage</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${property.owner.phone}`}
            className="px-3.5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C28E52]" />
            <span>Call</span>
          </a>
          <a
            href={generateOwnerWhatsAppUrl(property)}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Schedule Viewing Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-2xl shadow-2xl p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#C28E52] uppercase tracking-wider">Private Viewing Mandate</span>
                <h3 className="text-lg font-bold font-serif text-[#0F172A] dark:text-white mt-0.5">Schedule Walkthrough</h3>
              </div>
              <button onClick={() => setShowScheduleModal(false)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Direct private tour hosted by {property.owner.name} (Owner). Please choose your preferred day and time.
            </p>

            {scheduleSuccess ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-center text-xs font-semibold space-y-3">
                <p>Viewing Request Sent! {property.owner.name} will confirm via WhatsApp shortly.</p>
                <a
                  href={generateOwnerWhatsAppUrl(property)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Chat on WhatsApp with Owner Now</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Preferred Date</label>
                  <input type="date" defaultValue="2026-09-26" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs" required />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Time Slot</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button type="button" className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-center font-medium hover:bg-[#0F172A] hover:text-white">11:00 AM</button>
                    <button type="button" className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-center font-medium hover:bg-[#0F172A] hover:text-white">03:30 PM</button>
                    <button type="button" className="p-2 rounded bg-[#0F172A] text-white text-center font-bold">05:30 PM</button>
                  </div>
                </div>

                <button type="submit" className="w-full py-3 bg-[#C28E52] hover:bg-[#AB773D] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors mt-2 cursor-pointer">
                  Confirm Private Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Full Photo Lightbox & 3D Matterport Tour Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#C28E52] uppercase tracking-wider">
                {tourMode === '3d' ? '3D Matterport Spatial Walkthrough' : `Photo ${lightboxIndex + 1} of ${property.images.length}`}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• {property.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTourMode(tourMode === 'photos' ? '3d' : 'photos')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  tourMode === '3d' ? 'bg-[#C28E52] text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {tourMode === '3d' ? 'View 2D Photos' : 'Switch to 3D Tour'}
              </button>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Stage */}
          <div className="flex-1 flex items-center justify-center relative my-4 overflow-hidden">
            {tourMode === 'photos' ? (
              <>
                <img
                  src={property.images[lightboxIndex]}
                  alt={`View ${lightboxIndex + 1}`}
                  className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
                />

                {/* Left/Right Arrows */}
                <button
                  onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : property.images.length - 1))}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setLightboxIndex((prev) => (prev < property.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer border border-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            ) : (
              /* Simulated 3D Matterport Tour */
              <div className="w-full max-w-4xl h-[70vh] bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-6 border border-[#C28E52]/40 shadow-2xl">
                <img
                  src={property.images[0]}
                  alt="3D Panorama"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 filter blur-[1px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950" />
                
                <div className="relative z-10 text-center space-y-4 max-w-md p-6 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/10">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#C28E52]/20 border border-[#C28E52] flex items-center justify-center text-[#C28E52]">
                    <Compass className="w-7 h-7 animate-spin-slow" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-serif text-white">Interactive 3D Dollhouse Active</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Navigate 3,450 sq.ft across the living salon, terrace, and primary suite with 360° LiDAR depth.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button 
                      onClick={() => {
                        setTourMode('photos');
                        setLightboxIndex(0);
                      }}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium"
                    >
                      Living Deck
                    </button>
                    <button 
                      onClick={() => {
                        setTourMode('photos');
                        setLightboxIndex(2);
                      }}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium"
                    >
                      Master Suite
                    </button>
                    <button 
                      onClick={() => {
                        setTourMode('photos');
                        setLightboxIndex(1);
                      }}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium"
                    >
                      Facade
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Thumbnails */}
          {tourMode === 'photos' && (
            <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    lightboxIndex === i ? 'border-[#C28E52] scale-110' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
