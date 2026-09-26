import React, { useState, useRef } from 'react';
import { Property, PropertyType, PropertyPurpose, FurnishingState, UserProfile } from '../types';
import { CITIES } from '../data/mockProperties';
import { 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  CheckCircle2, 
  Check, 
  Upload, 
  Plus, 
  Trash2, 
  MapPin, 
  Building, 
  Send, 
  Share2, 
  X, 
  Sparkles, 
  Layers, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Camera, 
  Phone, 
  MessageSquare,
  Crosshair,
  Home,
  CheckCheck,
  ChevronRight,
  ChevronDown,
  Star,
  Bookmark,
  Shield,
  PartyPopper,
  ExternalLink,
  SlidersHorizontal,
  Train,
  ShoppingBag,
  Sparkle,
  Link as LinkIcon,
  Image as ImageIcon,
  Globe
} from 'lucide-react';

interface PostPropertyScreenProps {
  onBack: () => void;
  onAddProperty: (newProp: Property) => void;
  user: UserProfile;
  onViewPropertyDetails?: (property: Property) => void;
  onNavigateHome?: () => void;
  onNavigateSaved?: () => void;
}

export const PostPropertyScreen: React.FC<PostPropertyScreenProps> = ({
  onBack,
  onAddProperty,
  user,
  onViewPropertyDetails,
  onNavigateHome,
  onNavigateSaved,
}) => {
  // Stepper State
  const [activeStep, setActiveStep] = useState<number>(1);

  // Form State: Typology & Details
  const [propertyType, setPropertyType] = useState<string>('Flat / Apartment');
  const [bhk, setBhk] = useState<string>('3 BHK');
  const [rent, setRent] = useState<string>('85,000');
  const [rentNegotiable, setRentNegotiable] = useState<boolean>(true);
  const [deposit, setDeposit] = useState<string>('2,50,000');
  const [furnishing, setFurnishing] = useState<string>('Fully Furnished');
  const [availability, setAvailability] = useState<'now' | 'custom'>('now');
  const [builtUpArea, setBuiltUpArea] = useState<string>('1,450');
  const [description, setDescription] = useState<string>(
    'Spacious 3 BHK apartment with balcony and open green view. Located in a quiet and safe residential area in Pali Hill, Bandra West. Modern modular kitchen and marble flooring.'
  );

  // Facilities Checkboxes
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([
    'Lift',
    '24x7 Security & CCTV',
    'Power Backup',
    'Car Parking',
    'Swimming Pool',
    'Gym',
    '24 Hours Water',
    'Gated Society'
  ]);

  // Photos State
  const [photos, setPhotos] = useState<Array<{ id: number; url: string; label: string; isCover: boolean }>>([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      label: 'Living Room',
      isCover: true,
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      label: 'Master Bedroom',
      isCover: false,
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      label: 'Modular Kitchen',
      isCover: false,
    }
  ]);

  // Location State
  const [city, setCity] = useState<string>('Mumbai');
  const [locality, setLocality] = useState<string>('Bandra West');
  const [fullAddress, setFullAddress] = useState<string>(
    'Flat 702, Green View Heights, Pali Hill, Bandra West, Mumbai 400050'
  );

  // Mock Image URL System State
  const [photoInputMode, setPhotoInputMode] = useState<'url' | 'presets' | 'upload'>('url');
  const [inputImageUrl, setInputImageUrl] = useState<string>('');
  const [inputImageLabel, setInputImageLabel] = useState<string>('Living Room');
  const [urlError, setUrlError] = useState<string>('');

  // Curated High-Resolution Architectural Presets
  const CURATED_IMAGE_PRESETS = [
    {
      label: 'Living Room',
      name: 'Grand Salon Lounge',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Master Bedroom',
      name: 'Primary Sanctuary',
      url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Modular Kitchen',
      name: 'Italian Chef Kitchen',
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Balcony Deck',
      name: 'Panoramic Sky Deck',
      url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Spa Bathroom',
      name: 'Marble Jacuzzi Suite',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Building Facade',
      name: 'Architectural Elevation',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Swimming Pool',
      name: 'Infinity Lap Pool',
      url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Dining Foyer',
      name: 'Formal Dining Foyer',
      url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  // Owner State
  const [ownerName, setOwnerName] = useState<string>(user.name || 'Rajesh Sharma');
  const [ownerPhone, setOwnerPhone] = useState<string>(user.phone || '+91 98200 45120');
  const [whatsappSame, setWhatsappSame] = useState<boolean>(true);

  // Publish Modal State
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [publishedProperty, setPublishedProperty] = useState<Property | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleFacility = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  const setAsCoverPhoto = (id: number) => {
    setPhotos(
      photos.map((p) => ({
        ...p,
        isCover: p.id === id,
      }))
    );
    showToast('Cover photo updated');
  };

  const removePhoto = (id: number) => {
    const remaining = photos.filter((p) => p.id !== id);
    if (!remaining.some((p) => p.isCover) && remaining.length > 0) {
      remaining[0].isCover = true;
    }
    setPhotos(remaining);
    showToast('Photo removed');
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const processFiles = (fileList: FileList | File[]) => {
    const rawFiles = Array.from(fileList);
    const validImageFiles = rawFiles.filter((f) => f.type.startsWith('image/'));

    if (validImageFiles.length === 0) {
      showToast('Please select valid image files (PNG, JPG, JPEG, WEBP)');
      return;
    }

    if (photos.length >= 10) {
      showToast('Maximum 10 photos allowed for this listing');
      return;
    }

    const availableSlots = 10 - photos.length;
    const filesToRead = validImageFiles.slice(0, availableSlots);

    if (validImageFiles.length > availableSlots) {
      showToast(`Only ${availableSlots} more photo(s) can be added (Max 10 total)`);
    }

    let loadedCount = 0;
    const defaultLabels = ['Living Room', 'Master Bedroom', 'Modular Kitchen', 'Balcony Deck', 'Spa Bathroom', 'Building Facade'];

    filesToRead.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          const labelIndex = (photos.length + loadedCount) % defaultLabels.length;
          const assignedLabel = defaultLabels[labelIndex];

          setPhotos((prev) => {
            const hasCover = prev.some((p) => p.isCover);
            return [
              ...prev,
              {
                id: Date.now() + Math.floor(Math.random() * 10000) + index,
                url: dataUrl,
                label: assignedLabel,
                isCover: !hasCover && prev.length === 0,
              },
            ];
          });

          loadedCount += 1;
          if (loadedCount === filesToRead.length) {
            showToast(`${loadedCount} photo(s) uploaded successfully! 📸`);
          }
        }
      };
      reader.onerror = () => {
        showToast(`Failed to upload ${file.name}`);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = (urlToAdd?: string, labelToAdd?: string) => {
    const targetUrl = (urlToAdd || inputImageUrl).trim();
    const targetLabel = labelToAdd || inputImageLabel || 'Living Room';

    if (!targetUrl) {
      setUrlError('Please enter or paste a valid web image URL');
      return;
    }

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://') && !targetUrl.startsWith('data:')) {
      setUrlError('Image URL must start with http:// or https://');
      return;
    }

    if (photos.length >= 10) {
      showToast('Maximum 10 photos allowed for this listing');
      return;
    }

    setUrlError('');
    const newId = Date.now() + Math.floor(Math.random() * 10000);
    const hasCover = photos.some((p) => p.isCover);

    setPhotos((prev) => [
      ...prev,
      {
        id: newId,
        url: targetUrl,
        label: targetLabel,
        isCover: !hasCover && prev.length === 0,
      },
    ]);

    if (!urlToAdd) {
      setInputImageUrl('');
    }
    showToast(`Added ${targetLabel} photo URL! 🖼️`);
  };

  const addSamplePhoto = () => {
    if (photos.length >= 10) {
      showToast('Maximum 10 photos allowed');
      return;
    }
    const samplePool = [
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', label: 'Balcony Deck' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', label: 'Spa Bathroom' },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', label: 'Building Facade' }
    ];
    const newP = samplePool[photos.length % samplePool.length];
    setPhotos([...photos, { id: Date.now(), url: newP.url, label: newP.label, isCover: false }]);
    showToast('Photo added to listing gallery!');
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-[#C28E52]');
      setTimeout(() => el.classList.remove('ring-2', 'ring-[#C28E52]'), 1400);
    }
  };

  const handleSaveDraft = () => {
    showToast('Draft saved securely. You can resume editing anytime.');
  };

  const handlePublish = () => {
    const cleanRent = rent.replace(/[^0-9]/g, '') || '85000';
    const rentNum = parseInt(cleanRent, 10);
    const id = `NB-${Date.now().toString().slice(-5)}`;

    // Order photos so cover photo is always the primary display image
    const cover = photos.find((p) => p.isCover);
    const otherPhotos = photos.filter((p) => !p.isCover).map((p) => p.url);
    const orderedPhotos = cover ? [cover.url, ...otherPhotos] : photos.map((p) => p.url);
    const finalImages = orderedPhotos.length > 0 ? orderedPhotos : [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ];

    const newProp: Property = {
      id,
      title: `${bhk} Apartment - ${fullAddress.split(',')[1]?.trim() || locality}`,
      purpose: 'rent',
      propertyType: propertyType.includes('House') ? 'house' : propertyType.includes('Commercial') ? 'office' : 'flat',
      price: rentNum,
      priceFormatted: `₹${rentNum.toLocaleString('en-IN')}/mo`,
      deposit: `₹${deposit}`,
      brokerageSaved: '₹85,000 Saved',
      location: locality,
      city: city,
      subLocality: locality,
      bhk: bhk,
      carpetArea: `${builtUpArea} sq ft`,
      bathrooms: 3,
      parking: '1 Covered',
      floor: '7th of 14 Floors',
      status: availability === 'now' ? 'Ready to Move' : 'Within 15 Days',
      furnishing: (furnishing === 'Fully Furnished' ? 'Fully Furnished' : furnishing === 'Semi Furnished' ? 'Semi-Furnished' : 'Unfurnished') as FurnishingState,
      facing: 'North-East',
      images: finalImages,
      photos: finalImages,
      description: description,
      amenities: selectedFacilities,
      owner: {
        name: ownerName,
        phone: ownerPhone,
        verifiedTitle: true,
        directOwner: true,
        responseTime: '10 mins',
        rating: 5.0,
      },
      coordinates: {
        lat: 19.0600,
        lng: 72.8300,
      },
      featured: true,
    };

    setPublishedProperty(newProp);
    onAddProperty(newProp);
    setShowSuccessModal(true);
  };

  const coverPhoto = photos.find((p) => p.isCover)?.url || photos[0]?.url;

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] antialiased selection:bg-[#C28E52]/20 selection:text-[#C28E52] flex flex-col justify-between">
      
      {/* 1. Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          
          <div className="flex items-center gap-6">
            <button
              onClick={onNavigateHome || onBack}
              className="flex items-center gap-2 text-left cursor-pointer group"
            >
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight uppercase text-[#0F172A] dark:text-white">
                NO <span className="text-[#C28E52]">BROKER</span>
              </span>
              <span className="font-bold text-[11px] uppercase tracking-widest text-[#C28E52] bg-[#EFEEEB] dark:bg-slate-800 px-2 py-0.5 rounded">
                Direct
              </span>
            </button>

            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 text-[#1B1C1A] dark:text-white cursor-pointer text-xs font-semibold">
              <MapPin className="w-4 h-4 text-[#C28E52]" />
              <span>{city}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
              Buy
            </button>
            <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
              Rent
            </button>
            <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
              Commercial
            </button>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F5132] text-white shadow-[0_8px_20px_-4px_rgba(15,81,50,0.25)] text-xs font-bold whitespace-nowrap">
              <span className="uppercase tracking-wider">Post Property FREE</span>
              <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded font-bold">
                0% BROKERAGE
              </span>
            </div>

            <button
              onClick={onNavigateSaved}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
              title="Saved Residences"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <div className="flex items-center pl-1">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#C28E52]/20 shadow-xs"
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

      {/* 2. Main Body Container */}
      <main className="w-full pt-24 pb-16 bg-[#FBF9F6] dark:bg-[#0A0F1D] flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          <div className="flex flex-col w-full">
            
            {/* Breadcrumb & Top Indicator */}
            <div className="flex items-center justify-between pb-4">
              <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#0F172A] dark:text-white font-semibold">Post Property FREE</span>
              </nav>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="uppercase tracking-wider">No Brokerage Guarantee</span>
              </div>
            </div>

            {/* Header Banner Section */}
            <div className="pt-2 pb-6">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-[#80551F] dark:text-amber-300 text-xs uppercase tracking-widest font-bold mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C28E52]"></span>
                    <span>100% Free Forever</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0F172A] dark:text-white leading-tight">
                    Post Your Property <span className="text-[#C28E52] font-normal italic">100% Free</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                    List directly with zero brokerage. Connect with genuine tenants and buyers across India without middlemen.
                  </p>
                </div>

                {/* Trust Highlights Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 max-w-md shadow-xs">
                  <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-[#0F172A] dark:text-white">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0" />
                      <span>Free Listing Forever</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0" />
                      <span>100% Direct Owners</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0" />
                      <span>Zero Brokerage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0" />
                      <span>Verified Inquiries Only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm sm:text-base text-[#0F172A] dark:text-white">
                    Listing Form Progress
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3F0] dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    Step {activeStep} of 5: {activeStep === 1 ? 'Details' : activeStep === 2 ? 'Photos' : activeStep === 3 ? 'Location' : activeStep === 4 ? 'Owner Info' : 'Ready to Publish'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-slate-500">Completion Status:</span>
                  <span className="text-[#0F5132] dark:text-emerald-400 font-bold">
                    {activeStep === 5 ? '100% Completed' : '92% Completed'}
                  </span>
                </div>
              </div>

              {/* Stepper horizontal indicators */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {[
                  { step: 1, label: '1. Details', done: true, current: activeStep === 1 },
                  { step: 2, label: '2. Photos', done: true, current: activeStep === 2 },
                  { step: 3, label: '3. Location', done: true, current: activeStep === 3 },
                  { step: 4, label: '4. Owner Info', done: true, current: activeStep === 4 },
                  { step: 5, label: '5. Publish', done: false, current: activeStep === 5 },
                ].map((s) => (
                  <div
                    key={s.step}
                    onClick={() => {
                      setActiveStep(s.step);
                      if (s.step === 1) scrollToSection('section-details');
                      if (s.step === 2) scrollToSection('section-photos');
                      if (s.step === 3) scrollToSection('section-location');
                      if (s.step === 4) scrollToSection('section-owner');
                    }}
                    className="flex flex-col gap-1 cursor-pointer group"
                  >
                    <div
                      className={`h-2 w-full rounded-full transition-all ${
                        s.step < 4
                          ? 'bg-[#0F5132] dark:bg-emerald-500'
                          : s.step === 4
                          ? 'bg-[#C28E52]'
                          : 'bg-[#E4E2DF] dark:bg-slate-800'
                      }`}
                    />
                    <div className="flex items-center gap-1 text-[11px] pt-0.5 font-bold">
                      {s.step < 4 ? (
                        <span className="text-[#0F5132] dark:text-emerald-400 flex items-center gap-0.5">
                          <Check className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{s.label}</span>
                        </span>
                      ) : s.step === 4 ? (
                        <span className="text-[#0F172A] dark:text-white flex items-center gap-0.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[9px]">4</span>
                          <span className="hidden sm:inline">{s.label}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-0.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-800 text-slate-600 flex items-center justify-center text-[9px]">5</span>
                          <span className="hidden sm:inline">{s.label}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
              
              {/* LEFT: Multi-Step Interactive Form Structure (7 Columns) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* SECTION A: Property Details Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 transition-all space-y-6" id="section-details">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white font-serif font-bold text-sm">
                        01
                      </span>
                      <div>
                        <h2 className="font-serif font-bold text-lg text-[#0F172A] dark:text-white">
                          Property Details
                        </h2>
                        <p className="text-xs text-slate-500">
                          Specify typology, rent expectation, and furnishing state.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved</span>
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Property Type Selector */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-2">
                        Property Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Flat / Apartment',
                          'Independent House / Villa',
                          'Independent Room',
                          'Shop',
                          'Office / Commercial'
                        ].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setPropertyType(t)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                              propertyType === t
                                ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                                : 'bg-[#F5F3F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* BHK Typology */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-2">
                        BHK Typology
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['1 RK', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBhk(b)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              bhk === b
                                ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                                : 'bg-[#F5F3F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                          Expected Monthly Rent
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-xs text-slate-500 font-bold">₹</span>
                          <input
                            type="text"
                            value={rent}
                            onChange={(e) => setRent(e.target.value)}
                            className="w-full pl-8 pr-16 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C28E52]"
                            placeholder="85,000"
                          />
                          <span className="absolute right-3.5 text-[11px] text-slate-400">/ month</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <input
                            id="rentNeg"
                            type="checkbox"
                            checked={rentNegotiable}
                            onChange={(e) => setRentNegotiable(e.target.checked)}
                            className="w-4 h-4 rounded text-[#0F172A] focus:ring-[#C28E52]"
                          />
                          <label htmlFor="rentNeg" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                            Rent is negotiable
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                          Security Deposit
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-xs text-slate-500 font-bold">₹</span>
                          <input
                            type="text"
                            value={deposit}
                            onChange={(e) => setDeposit(e.target.value)}
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C28E52]"
                            placeholder="2,50,000"
                          />
                        </div>
                        <span className="block text-[11px] text-slate-400 mt-1.5">
                          Standard is 2 to 3 months of monthly rent
                        </span>
                      </div>
                    </div>

                    {/* Furnished Status */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-2">
                        Furnishing Status
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Fully Furnished', 'Semi Furnished', 'Unfurnished'].map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setFurnishing(f)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                              furnishing === f
                                ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                                : 'bg-[#F5F3F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Availability & Built-up Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                          Available From
                        </label>
                        <div className="flex items-center gap-2">
                          <label
                            onClick={() => setAvailability('now')}
                            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium cursor-pointer flex-1 border transition-colors ${
                              availability === 'now'
                                ? 'bg-[#FAF8F5] dark:bg-slate-800 border-[#0F172A] dark:border-[#C28E52] text-[#0F172A] dark:text-white font-bold'
                                : 'bg-[#F5F3F0] dark:bg-slate-800 border-transparent text-slate-500'
                            }`}
                          >
                            <input
                              type="radio"
                              name="availTime"
                              checked={availability === 'now'}
                              onChange={() => setAvailability('now')}
                              className="accent-[#0F172A]"
                            />
                            <span>Available Now</span>
                          </label>

                          <label
                            onClick={() => setAvailability('custom')}
                            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium cursor-pointer flex-1 border transition-colors ${
                              availability === 'custom'
                                ? 'bg-[#FAF8F5] dark:bg-slate-800 border-[#0F172A] dark:border-[#C28E52] text-[#0F172A] dark:text-white font-bold'
                                : 'bg-[#F5F3F0] dark:bg-slate-800 border-transparent text-slate-500'
                            }`}
                          >
                            <input
                              type="radio"
                              name="availTime"
                              checked={availability === 'custom'}
                              onChange={() => setAvailability('custom')}
                              className="accent-[#0F172A]"
                            />
                            <span>Choose Date</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                          Super Built-up Area
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            value={builtUpArea}
                            onChange={(e) => setBuiltUpArea(e.target.value)}
                            className="w-full px-3.5 pr-14 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C28E52]"
                            placeholder="1,450"
                          />
                          <span className="absolute right-3.5 text-xs text-slate-400">sq ft</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                        About the Property
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C28E52] resize-none leading-relaxed"
                        placeholder="Describe the flat view, floor level, sunlight, and neighborhood highlights..."
                      />
                      <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
                        <span>Min 50 characters recommended</span>
                        <span>{description.length} / 1000</span>
                      </div>
                    </div>

                    {/* Facilities Checkboxes */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-2">
                        Building &amp; Residence Facilities
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          'Lift',
                          '24x7 Security & CCTV',
                          'Power Backup',
                          'Car Parking',
                          'Swimming Pool',
                          'Gym',
                          '24 Hours Water',
                          'Gated Society',
                          'Pet Friendly'
                        ].map((fac) => {
                          const checked = selectedFacilities.includes(fac);
                          return (
                            <label
                              key={fac}
                              onClick={() => toggleFacility(fac)}
                              className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {}}
                                className="w-4 h-4 rounded text-[#0F172A] focus:ring-[#C28E52]"
                              />
                              <span className="text-xs text-[#0F172A] dark:text-slate-200 font-medium">
                                {fac}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION B: Property Photos Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 transition-all space-y-5" id="section-photos">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white font-serif font-bold text-sm">
                        02
                      </span>
                      <div>
                        <h2 className="font-serif font-bold text-lg text-[#0F172A] dark:text-white">
                          Property Photos
                        </h2>
                        <p className="text-xs text-slate-500">
                          Real photographs receive 5x more genuine tenant visits.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0F5132] dark:text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60">
                      {photos.length} Added (Max 10)
                    </span>
                  </div>

                  {/* Photo Input Method Selector */}
                  <div className="flex items-center gap-1.5 p-1.5 bg-[#F5F3F0] dark:bg-slate-800 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPhotoInputMode('url')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        photoInputMode === 'url'
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5 text-[#C28E52]" />
                      <span>Paste Web Image URL</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoInputMode('presets')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        photoInputMode === 'presets'
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C28E52]" />
                      <span>Curated Presets</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoInputMode('upload')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        photoInputMode === 'upload'
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5 text-[#C28E52]" />
                      <span>Device Upload</span>
                    </button>
                  </div>

                  {/* Mode 1: Paste Web Image URL */}
                  {photoInputMode === 'url' && (
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                          Paste Image URL from the Web
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2.5">
                          <div className="relative flex-1">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                              <Globe className="w-4 h-4 text-[#C28E52]" />
                            </span>
                            <input
                              type="url"
                              value={inputImageUrl}
                              onChange={(e) => {
                                setInputImageUrl(e.target.value);
                                setUrlError('');
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddImageUrl();
                                }
                              }}
                              placeholder="e.g. https://images.unsplash.com/... or any image link"
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-medium text-[#0F172A] dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#C28E52]"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={inputImageLabel}
                              onChange={(e) => setInputImageLabel(e.target.value)}
                              className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-[#0F172A] dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#C28E52] cursor-pointer"
                            >
                              <option value="Living Room">Living Room</option>
                              <option value="Master Bedroom">Master Bedroom</option>
                              <option value="Guest Bedroom">Guest Bedroom</option>
                              <option value="Modular Kitchen">Modular Kitchen</option>
                              <option value="Balcony Deck">Balcony Deck</option>
                              <option value="Spa Bathroom">Spa Bathroom</option>
                              <option value="Building Facade">Building Facade</option>
                              <option value="Society Amenities">Society Amenities</option>
                              <option value="Swimming Pool">Swimming Pool</option>
                              <option value="Dining Foyer">Dining Foyer</option>
                              <option value="Property View">Property View</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => handleAddImageUrl()}
                              disabled={photos.length >= 10}
                              className="px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Image</span>
                            </button>
                          </div>
                        </div>

                        {urlError && (
                          <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                            <span>⚠️</span>
                            <span>{urlError}</span>
                          </p>
                        )}
                      </div>

                      {/* Live Image URL Preview if entered */}
                      {inputImageUrl && (inputImageUrl.startsWith('http://') || inputImageUrl.startsWith('https://')) && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs">
                          <img
                            src={inputImageUrl}
                            alt="Live Preview"
                            className="w-16 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-[#0F172A] dark:text-white block">
                              Live Preview: Tagged as &ldquo;{inputImageLabel}&rdquo;
                            </span>
                            <span className="text-[11px] text-slate-400 truncate block">
                              {inputImageUrl}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddImageUrl()}
                            className="px-3 py-1.5 rounded-lg bg-[#C28E52] text-white text-xs font-bold hover:bg-[#B27E42] transition-colors cursor-pointer"
                          >
                            Confirm &amp; Add
                          </button>
                        </div>
                      )}

                      {/* Quick 1-Click Demo Photo URLs */}
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-2">
                          1-Click Demo Photo URLs (Click to add immediately):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {CURATED_IMAGE_PRESETS.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => handleAddImageUrl(preset.url, preset.label)}
                              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:border-[#C28E52] hover:text-[#C28E52] transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <Plus className="w-3 h-3 text-[#C28E52]" />
                              <span>{preset.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode 2: Curated Architectural Presets */}
                  {photoInputMode === 'presets' && (
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-[#0F172A] dark:text-white">
                            Curated High-Resolution Architectural Photos
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            Click any photo to add it to your listing gallery.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            CURATED_IMAGE_PRESETS.slice(0, 4).forEach((p) => {
                              handleAddImageUrl(p.url, p.label);
                            });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-[11px] font-bold hover:bg-[#C28E52] transition-colors cursor-pointer"
                        >
                          + Add Full Home Set (4 Photos)
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {CURATED_IMAGE_PRESETS.map((preset) => {
                          const isAlreadyAdded = photos.some((p) => p.url === preset.url);
                          return (
                            <div
                              key={preset.name}
                              className="group relative rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 shadow-xs flex flex-col"
                            >
                              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                <img
                                  src={preset.url}
                                  alt={preset.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#0F172A]/80 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                                  {preset.label}
                                </span>
                              </div>
                              <div className="p-2.5 flex items-center justify-between gap-1">
                                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate">
                                  {preset.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleAddImageUrl(preset.url, preset.label)}
                                  disabled={isAlreadyAdded || photos.length >= 10}
                                  className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer shrink-0 ${
                                    isAlreadyAdded
                                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 cursor-default'
                                      : 'bg-[#0F172A] hover:bg-[#C28E52] text-white'
                                  }`}
                                >
                                  {isAlreadyAdded ? 'Added ✓' : '+ Add'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Mode 3 / Real Photo Upload Drop Zone */}
                  {photoInputMode === 'upload' && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                          processFiles(e.dataTransfer.files);
                        }
                      }}
                      className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${
                        isDragging
                          ? 'bg-[#C28E52]/15 border-[#C28E52] scale-[1.01]'
                          : 'bg-[#F5F3F0]/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 hover:bg-[#FAF8F5] dark:hover:bg-slate-800 hover:border-[#C28E52]'
                      }`}
                    >
                      {/* Hidden Native File Input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            processFiles(e.target.files);
                          }
                          e.target.value = '';
                        }}
                      />

                      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#0F172A] flex items-center justify-center text-[#0F172A] dark:text-white group-hover:scale-110 transition-transform shadow-sm mb-2.5">
                        <Camera className="w-6 h-6 text-[#C28E52]" />
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                        Click to upload photos or drag &amp; drop
                      </div>

                      <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                        Select photos from your device (Living Room, Bedroom, Kitchen, Balcony). PNG, JPG, JPEG, WEBP up to 15MB each.
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Choose Photos from Device</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addSamplePhoto();
                          }}
                          className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#C28E52]" />
                          <span>+ Add Demo Photo</span>
                        </button>
                      </div>

                      <span className="text-[10px] text-slate-400 mt-2 font-medium">
                        {photos.length}/10 Photos Selected • 100% Direct Owner Verification
                      </span>
                    </div>
                  )}

                  {/* Previews Gallery Grid */}
                  {photos.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-dashed border-amber-300 dark:border-amber-800 text-center space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto">
                        <ImageIcon className="w-6 h-6 text-[#C28E52]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">
                          No photos added yet
                        </h4>
                        <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-0.5">
                          Listings with photos receive 5x more verified direct tenant responses.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            CURATED_IMAGE_PRESETS.slice(0, 3).forEach((p) => {
                              handleAddImageUrl(p.url, p.label);
                            });
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Load Sample Demo Photos</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhotoInputMode('url')}
                          className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <LinkIcon className="w-3.5 h-3.5 text-[#C28E52]" />
                          <span>Paste Image URL</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative group rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[4/3] shadow-xs border border-slate-200 dark:border-slate-800"
                      >
                        <img
                          src={photo.url}
                          alt={photo.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {!photo.isCover && (
                            <button
                              type="button"
                              onClick={() => setAsCoverPhoto(photo.id)}
                              className="w-8 h-8 rounded-full bg-white text-[#0F172A] flex items-center justify-center shadow-md hover:bg-amber-100 transition-colors cursor-pointer"
                              title="Set as cover"
                            >
                              <Star className="w-4 h-4 text-[#C28E52]" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removePhoto(photo.id)}
                            className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center shadow-md hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {photo.isCover && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0F172A]/90 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider">
                            Cover Photo
                          </div>
                        )}

                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                          <select
                            value={photo.label}
                            onChange={(e) => {
                              const newLabel = e.target.value;
                              setPhotos(photos.map((p) => (p.id === photo.id ? { ...p, label: newLabel } : p)));
                            }}
                            className="text-[10px] font-bold bg-white/95 dark:bg-slate-900/95 text-[#0F172A] dark:text-white rounded-md px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer focus:outline-none"
                          >
                            <option value="Living Room">Living Room</option>
                            <option value="Master Bedroom">Master Bedroom</option>
                            <option value="Guest Bedroom">Guest Bedroom</option>
                            <option value="Modular Kitchen">Modular Kitchen</option>
                            <option value="Balcony Deck">Balcony Deck</option>
                            <option value="Spa Bathroom">Spa Bathroom</option>
                            <option value="Building Facade">Building Facade</option>
                            <option value="Society Amenities">Society Amenities</option>
                            <option value="Property View">Property View</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </div>

                {/* SECTION C: Location & Address Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 transition-all space-y-5" id="section-location">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white font-serif font-bold text-sm">
                        03
                      </span>
                      <div>
                        <h2 className="font-serif font-bold text-lg text-[#0F172A] dark:text-white">
                          Location &amp; Address
                        </h2>
                        <p className="text-xs text-slate-500">
                          Accurate address helps genuine neighborhood tenants locate you instantly.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast('📍 Current GPS coordinates locked to Pali Hill, Bandra West')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                      type="button"
                    >
                      <Crosshair className="w-3.5 h-3.5 text-[#C28E52]" />
                      <span>Use My Location</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                          City
                        </label>
                        <div className="relative">
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#C28E52] cursor-pointer"
                          >
                            {CITIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-3.5 top-3 pointer-events-none text-slate-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                          Locality / Area
                        </label>
                        <input
                          type="text"
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C28E52]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                        Full Address
                      </label>
                      <input
                        type="text"
                        value={fullAddress}
                        onChange={(e) => setFullAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C28E52]"
                      />
                    </div>

                    {/* Location Preview Map Card */}
                    <div className="rounded-2xl overflow-hidden bg-[#F5F3F0] dark:bg-slate-900 relative shadow-xs border border-slate-200/80 dark:border-slate-800">
                      <div
                        className="w-full h-44 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80')`,
                        }}
                      />
                      <div className="p-3 bg-white dark:bg-[#0F172A] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#C28E52]" />
                          <span className="font-bold text-[#0F172A] dark:text-white">{locality}, {city}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1"><Train className="w-3.5 h-3.5 text-slate-400" /> Bandra Station 1.5 km</span>
                          <span className="flex items-center gap-1"><ShoppingBag className="w-3.5 h-3.5 text-slate-400" /> Pali Market 400 m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION D: Owner Details Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 transition-all space-y-5" id="section-owner">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white font-serif font-bold text-sm">
                        04
                      </span>
                      <div>
                        <h2 className="font-serif font-bold text-lg text-[#0F172A] dark:text-white">
                          Owner Details
                        </h2>
                        <p className="text-xs text-slate-500">
                          Tenant calls connect directly to you. No brokers involved.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Phone Verified</span>
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                          Owner Full Name
                        </label>
                        <input
                          type="text"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C28E52]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                          Mobile Number
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            value={ownerPhone}
                            readOnly
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white focus:outline-none cursor-not-allowed"
                          />
                          <span className="absolute right-3 text-[#0F5132] dark:text-emerald-400 flex items-center gap-1 text-[11px] font-bold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        id="whatsappSame"
                        type="checkbox"
                        checked={whatsappSame}
                        onChange={(e) => setWhatsappSame(e.target.checked)}
                        className="w-4 h-4 rounded text-[#0F172A] focus:ring-[#C28E52]"
                      />
                      <label htmlFor="whatsappSame" className="text-xs text-[#0F172A] dark:text-slate-300 font-medium cursor-pointer">
                        WhatsApp Number is same as registered mobile ({ownerPhone})
                      </label>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 flex items-start gap-2.5 border border-slate-200/60 dark:border-slate-700">
                      <Shield className="w-4 h-4 text-[#C28E52] mt-0.5 shrink-0" />
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="font-bold text-[#0F172A] dark:text-white">Privacy Promise:</span> Your contact number is protected and visible ONLY to genuine Indian tenants who verify their identities with mobile OTP.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT: Live Real Estate Tenant Preview Card (5 Columns Sticky) */}
              <div className="lg:col-span-5 sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Live Listing Preview
                  </span>
                  <span className="text-[11px] text-[#0F172A] dark:text-white bg-[#EAE8E5] dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-bold">
                    Tenant View
                  </span>
                </div>

                {/* Preview Card Container */}
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#0F172A] shadow-lg border border-slate-200/80 dark:border-slate-800 transition-all">
                  
                  {/* Photo Showcase in Preview */}
                  <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img
                      src={coverPhoto}
                      alt="Cover Flat Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <div className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center gap-1 text-[#0F5132] dark:text-emerald-400 text-[11px] font-bold shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>100% Direct Owner</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-[#0F172A]/80 backdrop-blur-md text-white text-[11px] font-bold">
                        0% Brokerage
                      </div>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[11px] font-medium flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{photos.length} Photos</span>
                    </div>
                  </div>

                  {/* Preview Details Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white">
                            ₹{rent}
                          </span>
                          <span className="text-xs text-slate-500"> / month</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Deposit</span>
                          <div className="text-sm font-serif font-bold text-[#0F172A] dark:text-white">
                            ₹{deposit}
                          </div>
                        </div>
                      </div>

                      <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white mt-1.5">
                        {bhk} Apartment - {fullAddress.split(',')[1]?.trim() || locality}
                      </h3>
                      
                      <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C28E52]" />
                        <span>{locality}, {city}</span>
                      </div>
                    </div>

                    {/* Attributes Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 bg-[#F5F3F0] dark:bg-slate-900 rounded-xl text-center text-xs">
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Typology</div>
                        <div className="text-[#0F172A] dark:text-white font-bold">{bhk}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Furnishing</div>
                        <div className="text-[#0F172A] dark:text-white font-bold">{furnishing}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Super Area</div>
                        <div className="text-[#0F172A] dark:text-white font-bold">{builtUpArea} sq ft</div>
                      </div>
                    </div>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {selectedFacilities.slice(0, 4).map((f) => (
                        <span key={f} className="px-2.5 py-0.5 rounded-md bg-[#F5F3F0] dark:bg-slate-800 text-[11px] font-medium">
                          {f}
                        </span>
                      ))}
                      {selectedFacilities.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md bg-[#F5F3F0] dark:bg-slate-800 text-[11px] font-medium text-slate-400">
                          +{selectedFacilities.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Direct Owner Badge */}
                    <div className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs">
                          {ownerName.split(' ').map((n) => n[0]).join('') || 'RS'}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#0F172A] dark:text-white">
                            {ownerName}
                          </div>
                          <div className="text-[10px] text-[#0F5132] dark:text-emerald-400 font-bold">
                            Direct Owner (Verified)
                          </div>
                        </div>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>

                    {/* Quick Edit Jump Links */}
                    <div className="flex items-center justify-between pt-1 text-slate-400 text-xs">
                      <span>Quick jump:</span>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-slate-300">
                        <button onClick={() => scrollToSection('section-details')} className="hover:text-[#C28E52] transition-colors cursor-pointer">
                          Edit Details
                        </button>
                        <span>•</span>
                        <button onClick={() => scrollToSection('section-photos')} className="hover:text-[#C28E52] transition-colors cursor-pointer">
                          Edit Photos
                        </button>
                        <span>•</span>
                        <button onClick={() => scrollToSection('section-location')} className="hover:text-[#C28E52] transition-colors cursor-pointer">
                          Edit Location
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Footer Card with CTAs */}
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0F172A] shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-1.5 text-[#0F5132] dark:text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Zero Commission Guaranteed - 100% Free Listing</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePublish}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                      type="button"
                    >
                      <span>Publish Property FREE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleSaveDraft}
                      className="py-3 px-4 rounded-xl bg-[#F5F3F0] hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white text-xs font-bold transition-colors cursor-pointer"
                      type="button"
                    >
                      Save Draft
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </main>

      {/* 3. SUCCESS STATE MODAL OVERLAY */}
      {showSuccessModal && publishedProperty && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0F172A] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 relative border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 mx-auto flex items-center justify-center shadow-xs">
                <PartyPopper className="w-8 h-8 text-emerald-600" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white">
                Property Listed Successfully! 🎉
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Your property is now live and visible to thousands of verified tenants across Mumbai with zero brokerage.
              </p>
            </div>

            {/* Listing Summary Chip */}
            <div className="p-4 rounded-2xl bg-[#F5F3F0] dark:bg-slate-900 space-y-2 border border-slate-200/60 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Listing Reference:</span>
                <span className="font-mono font-bold text-[#0F172A] dark:text-white">
                  #{publishedProperty.id}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Property:</span>
                <span className="font-semibold text-[#0F172A] dark:text-white truncate max-w-[220px]">
                  {publishedProperty.title}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Status:</span>
                <span className="text-[#0F5132] dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Active &amp; Direct Live</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  if (onViewPropertyDetails) {
                    onViewPropertyDetails(publishedProperty);
                  }
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs sm:text-sm font-serif font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>View Live Property Listing</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(`${window.location.origin}/#details=${publishedProperty.id}`);
                      showToast('Listing link copied to clipboard!');
                    }
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#F5F3F0] hover:bg-slate-200 dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Property</span>
                </button>

                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    onBack();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#F5F3F0] hover:bg-slate-200 dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Manage Listing</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. Footer */}
      <footer className="w-full bg-[#F5F3F0] dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          
          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-[#0F5132] dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                  100% Direct Owner Listings
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Strict identity and ownership title validation
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-[#C28E52] shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <div className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                  Zero Brokerage Guaranteed
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Save substantial broker commissions directly
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white shrink-0">
                <Phone className="w-6 h-6 text-[#C28E52]" />
              </div>
              <div>
                <div className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                  24x7 Customer Support
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Dedicated luxury property concierge assistance
                </div>
              </div>
            </div>
          </div>

          {/* Directory Links Grid */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-serif font-bold text-lg uppercase text-[#0F172A] dark:text-white">
                  NO <span className="text-[#C28E52]">BROKER</span>
                </span>
                <span className="font-bold text-[10px] uppercase tracking-widest text-[#C28E52] bg-[#EAE8E5] dark:bg-slate-800 px-2 py-0.5 rounded">
                  Direct
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mb-4">
                India's direct-from-owner luxury architectural real estate platform. Curated residential and commercial assets with complete pricing clarity and zero intermediary friction.
              </p>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                © 2024 NO BROKER DIRECT LTD. ALL RIGHTS RESERVED.
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider mb-3">
                Explore
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">South Mumbai Estates</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Bandra Penthouses</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Worli Sea-Facing Mansions</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Juhu Coastal Villas</li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider mb-3">
                Services
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Direct Title Deed Verification</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Rental Agreements &amp; Legal</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Interior Architecture</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Escrow Payment Assurance</li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider mb-3">
                Company
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">About NO BROKER</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Private Client Concierge</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Editorial &amp; Insights</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Privacy &amp; Terms</li>
              </ul>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700/80 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
