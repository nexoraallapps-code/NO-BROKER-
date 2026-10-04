import React, { useState, useEffect } from 'react';
import { Property, PropertyPurpose, PropertyType, FurnishingState } from '../types';
import { CITIES, LOCALITIES_BY_CITY } from '../data/mockProperties';
import heroVilla from '../assets/images/hero_villa_twilight_1790309610252.jpg';
import interiorLiving from '../assets/images/property_interior_living_1790309634351.jpg';
import propertyBandra from '../assets/images/property_penthouse_bandra_1790309622284.jpg';
import seaviewPool from '../assets/images/property_seaview_pool_1790309647925.jpg';
import { 
  X, 
  Check, 
  Building, 
  Home, 
  Sparkles, 
  DollarSign, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Camera,
  Upload,
  Trash2,
  Plus,
  Image as ImageIcon,
  Layers,
  FileText,
  AlertCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export interface PostPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty?: (newProp: Property) => void;
  onUpdateProperty?: (updatedProp: Property) => void;
  propertyToEdit?: Property | null;
  userPhone?: string;
  userName?: string;
}

const SAMPLE_GALLERY = [
  interiorLiving,
  propertyBandra,
  seaviewPool,
  heroVilla
];

const AMENITY_OPTIONS = [
  '24/7 Security & CCTV',
  'Reserved Covered Parking',
  'High Speed Lift',
  '100% Power Backup',
  'Intercom / Video Door Phone',
  'Swimming Pool / Lap Pool',
  'Fitness Center / Gym',
  'Clubhouse & Community Hall',
  'Children Play Area',
  'Private Balcony / Terrace',
  'Modular Kitchen',
  'EV Charging Station',
  'Piped Gas Connection',
  'Vastu Compliant'
];

export const PostPropertyModal: React.FC<PostPropertyModalProps> = ({
  isOpen,
  onClose,
  onAddProperty,
  onUpdateProperty,
  propertyToEdit,
  userPhone = '',
  userName = '',
}) => {
  const isEditMode = !!propertyToEdit;

  // 4-step wizard
  const [step, setStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdProperty, setCreatedProperty] = useState<Property | null>(null);

  // Validation Errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Step 1: Type & Intent
  const [purpose, setPurpose] = useState<PropertyPurpose>('rent');
  const [propertyType, setPropertyType] = useState<PropertyType>('flat');

  // Step 2: Location & Size
  const [city, setCity] = useState<string>('Mumbai');
  const [locality, setLocality] = useState<string>('');
  const [societyName, setSocietyName] = useState<string>('');
  const [bhk, setBhk] = useState<string>('2 BHK');
  const [carpetArea, setCarpetArea] = useState<string>('1250');
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [furnishing, setFurnishing] = useState<FurnishingState>('Fully Furnished');
  const [floor, setFloor] = useState<string>('Middle Floor');

  // Step 3: Pricing & Description & Amenities (Strict Numeric Strings)
  const [rawPrice, setRawPrice] = useState<string>('85000');
  const [depositOption, setDepositOption] = useState<'months' | 'custom'>('months');
  const [depositMonths, setDepositMonths] = useState<number>(2);
  const [rawDeposit, setRawDeposit] = useState<string>('170000');
  const [possession, setPossession] = useState<string>('Immediate Move-in');
  const [description, setDescription] = useState<string>(
    'Spacious, sunlit residence with premium fittings, peaceful locality, and immediate direct owner handover. Zero brokerage.'
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    '24/7 Security & CCTV',
    'Reserved Covered Parking',
    'High Speed Lift',
    '100% Power Backup'
  ]);

  // Step 4: Images & Owner Verification
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    interiorLiving,
    heroVilla
  ]);
  const [ownerName, setOwnerName] = useState<string>(userName || 'Vikram Malhotra');
  const [ownerPhone, setOwnerPhone] = useState<string>(userPhone || '+91 98201 99234');
  const [verifiedTitle, setVerifiedTitle] = useState<boolean>(true);

  // Pre-populate fields when in edit mode
  useEffect(() => {
    if (propertyToEdit) {
      setPurpose(propertyToEdit.purpose || 'rent');
      setPropertyType(propertyToEdit.propertyType || 'flat');
      setCity(propertyToEdit.city || 'Mumbai');
      setLocality(propertyToEdit.subLocality || propertyToEdit.location || '');
      setSocietyName(propertyToEdit.location.split(',')[0] || '');
      setBhk(propertyToEdit.bhk || '2 BHK');
      
      const digitsArea = propertyToEdit.carpetArea.replace(/[^0-9]/g, '');
      setCarpetArea(digitsArea || '1250');
      setBathrooms(propertyToEdit.bathrooms || 2);
      setFurnishing(propertyToEdit.furnishing || 'Fully Furnished');
      setFloor(propertyToEdit.floor || 'Middle Floor');

      // Financials (strictly clean digits)
      const cleanPrice = String(propertyToEdit.price || 85000).replace(/[^0-9]/g, '');
      setRawPrice(cleanPrice);

      const cleanDeposit = (propertyToEdit.deposit || '2 Months').replace(/[^0-9]/g, '');
      if (cleanDeposit && Number(cleanDeposit) > 10) {
        setDepositOption('custom');
        setRawDeposit(cleanDeposit);
      } else {
        setDepositOption('months');
        setDepositMonths(2);
        setRawDeposit(String(Number(cleanPrice) * 2));
      }

      setPossession(propertyToEdit.status || 'Immediate Move-in');
      setDescription(propertyToEdit.specifications?.curatorNote || '');
      
      if (propertyToEdit.amenities && propertyToEdit.amenities.length > 0) {
        setSelectedAmenities([...propertyToEdit.amenities]);
      }

      if (propertyToEdit.images && propertyToEdit.images.length > 0) {
        setUploadedImages([...propertyToEdit.images]);
      }

      if (propertyToEdit.owner) {
        setOwnerName(propertyToEdit.owner.name || userName);
        setOwnerPhone(propertyToEdit.owner.phone || userPhone);
        setVerifiedTitle(propertyToEdit.owner.verifiedTitle ?? true);
      }
    }
  }, [propertyToEdit, userName, userPhone]);

  if (!isOpen) return null;

  // Numeric Calculations (Guaranteed Error-Proof, No string concatenation or NaN)
  const numericPrice = Number(rawPrice) || 0;
  const numericDeposit = depositOption === 'months' 
    ? numericPrice * depositMonths 
    : (Number(rawDeposit) || 0);

  const brokerageSavedAmount = purpose === 'rent'
    ? numericPrice * 2
    : Math.round(numericPrice * 0.02);

  const totalMoveInCost = purpose === 'rent'
    ? numericPrice + numericDeposit
    : numericPrice;

  // Validation function for each step
  const validateStep = (currentStep: number): boolean => {
    const stepErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!purpose) {
        stepErrors.purpose = 'Please select a listing intent (Rent or Buy).';
      }
      if (!propertyType) {
        stepErrors.propertyType = 'Please select a property category.';
      }
    }

    if (currentStep === 2) {
      if (!locality.trim()) {
        stepErrors.locality = 'Locality / Sub-Area is required. Please specify a neighborhood.';
      }
      const numArea = Number(carpetArea.replace(/[^0-9]/g, '')) || 0;
      if (numArea <= 0) {
        stepErrors.carpetArea = 'Please enter a valid carpet area (e.g. 850 sq.ft).';
      }
      if (bathrooms < 1) {
        stepErrors.bathrooms = 'Please specify at least 1 bathroom.';
      }
    }

    if (currentStep === 3) {
      if (numericPrice <= 0) {
        stepErrors.price = purpose === 'rent' 
          ? 'Monthly rent cannot be zero. Please specify a valid rent amount.'
          : 'Total price cannot be zero. Please specify a valid selling price.';
      } else if (purpose === 'rent' && numericPrice < 1000) {
        stepErrors.price = 'Monthly rent must be at least ₹1,000.';
      } else if (purpose === 'buy' && numericPrice < 50000) {
        stepErrors.price = 'Total selling price must be at least ₹50,000.';
      }

      if (depositOption === 'custom' && numericDeposit < 0) {
        stepErrors.deposit = 'Security deposit must be a valid positive amount.';
      }

      if (selectedAmenities.length === 0) {
        stepErrors.amenities = 'Please select at least one amenity or feature.';
      }
    }

    if (currentStep === 4) {
      if (uploadedImages.length === 0) {
        stepErrors.images = 'Please attach at least 1 property photograph.';
      }
      if (!ownerName.trim()) {
        stepErrors.ownerName = 'Owner name is required.';
      }
      const digitsPhone = ownerPhone.replace(/[^0-9]/g, '');
      if (digitsPhone.length < 10) {
        stepErrors.ownerPhone = 'Please provide a valid 10-digit mobile number.';
      }
      if (!verifiedTitle) {
        stepErrors.verifiedTitle = 'Please check the box confirming you are the direct owner.';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Step advancement handler
  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  // Direct Step Header Jump Handler (Guards against skipping unfilled steps)
  const handleStepJump = (targetStep: number) => {
    if (targetStep < step) {
      setStep(targetStep);
      return;
    }
    // Verify all intermediate steps
    for (let s = 1; s < targetStep; s++) {
      if (!validateStep(s)) {
        setStep(s);
        return;
      }
    }
    setStep(targetStep);
  };

  // Handlers for Price / Deposit with string-character rejection
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanDigits = e.target.value.replace(/[^0-9]/g, '');
    setRawPrice(cleanDigits);
    if (errors.price) {
      setErrors((prev) => ({ ...prev, price: '' }));
    }
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanDigits = e.target.value.replace(/[^0-9]/g, '');
    setRawDeposit(cleanDigits);
    if (errors.deposit) {
      setErrors((prev) => ({ ...prev, deposit: '' }));
    }
  };

  const handleCarpetAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanDigits = e.target.value.replace(/[^0-9]/g, '');
    setCarpetArea(cleanDigits);
    if (errors.carpetArea) {
      setErrors((prev) => ({ ...prev, carpetArea: '' }));
    }
  };

  // Amenities Real-time Toggle
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
    if (errors.amenities) {
      setErrors((prev) => ({ ...prev, amenities: '' }));
    }
  };

  // Image Management: Reordering & Deletion
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => [...prev, event.target!.result as string]);
          if (errors.images) {
            setErrors((prev) => ({ ...prev, images: '' }));
          }
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleAddSampleImage = (img: string) => {
    if (!uploadedImages.includes(img)) {
      setUploadedImages((prev) => [...prev, img]);
      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: '' }));
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleMoveImage = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= uploadedImages.length) return;
    setUploadedImages((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return copy;
    });
  };

  const handleSetCoverPhoto = (idx: number) => {
    if (idx === 0) return;
    setUploadedImages((prev) => {
      const copy = [...prev];
      const [cover] = copy.splice(idx, 1);
      return [cover, ...copy];
    });
  };

  // Submission Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(4)) {
      return;
    }

    const formattedPrice = purpose === 'rent'
      ? `₹${numericPrice.toLocaleString('en-IN')} / month`
      : `₹${(numericPrice / 10000000).toFixed(2)} Cr`;

    const savedBrokerage = purpose === 'rent'
      ? `Save ₹${brokerageSavedAmount.toLocaleString('en-IN')} Brokerage`
      : `Save ₹${brokerageSavedAmount.toLocaleString('en-IN')} Brokerage`;

    const finalImages = uploadedImages.length > 0 ? uploadedImages : [interiorLiving, heroVilla];
    const finalDeposit = depositOption === 'months' 
      ? `${depositMonths} Months (₹${numericDeposit.toLocaleString('en-IN')})` 
      : `₹${numericDeposit.toLocaleString('en-IN')}`;

    if (isEditMode && propertyToEdit) {
      const updatedProperty: Property = {
        ...propertyToEdit,
        title: `${bhk} in ${societyName || locality || 'Prime Residence'}`,
        hindiTitle: `${bhk} डायरेक्ट ओनर - ${locality || 'प्राइम लोकेशन'}, ${city}`,
        purpose,
        propertyType,
        price: numericPrice,
        priceFormatted: formattedPrice,
        deposit: finalDeposit,
        brokerageSaved: savedBrokerage,
        location: `${societyName ? societyName + ', ' : ''}${locality || 'Prime Locality'}, ${city}`,
        city,
        subLocality: locality || 'Prime Enclave',
        bhk,
        carpetArea: carpetArea.includes('sq.ft') ? carpetArea : `${carpetArea} sq.ft`,
        bathrooms,
        floor,
        status: possession,
        furnishing,
        images: finalImages,
        amenities: [...selectedAmenities], // Real-time synchronized amenities array
        owner: {
          ...propertyToEdit.owner,
          name: ownerName,
          phone: ownerPhone,
          verifiedTitle,
        },
        specifications: {
          ...propertyToEdit.specifications,
          curatorNote: description,
        }
      };

      if (onUpdateProperty) {
        onUpdateProperty(updatedProperty);
      }
      setCreatedProperty(updatedProperty);
      setIsSuccess(true);
    } else {
      const newProperty: Property = {
        id: `NB-DIR-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `${bhk} in ${societyName || locality || 'Prime Residence'}`,
        hindiTitle: `${bhk} डायरेक्ट ओनर - ${locality || 'प्राइम लोकेशन'}, ${city}`,
        purpose,
        propertyType,
        price: numericPrice,
        priceFormatted: formattedPrice,
        deposit: finalDeposit,
        brokerageSaved: savedBrokerage,
        location: `${societyName ? societyName + ', ' : ''}${locality || 'Prime Locality'}, ${city}`,
        city,
        subLocality: locality || 'Prime Enclave',
        bhk,
        carpetArea: carpetArea.includes('sq.ft') ? carpetArea : `${carpetArea} sq.ft`,
        bathrooms,
        parking: '1 Reserved Covered',
        floor,
        status: possession,
        furnishing,
        facing: 'North-East Vastu Compliant',
        images: finalImages,
        owner: {
          name: ownerName,
          phone: ownerPhone,
          verifiedTitle,
          directOwner: true,
          responseTime: '~5 mins',
          rating: 5.0,
        },
        amenities: [...selectedAmenities],
        specifications: {
          curatorNote: description,
          tenantPreference: 'Open to All Genuine Families & Professionals',
          ageOfProperty: 'New Construction',
          balconies: '1-2 Balconies',
          ceilingHeight: '11 ft Clear',
          maintenanceIncluded: true
        },
        coordinates: {
          lat: city === 'Mumbai' ? 19.0760 : city === 'Bangalore' ? 12.9716 : 28.6139,
          lng: city === 'Mumbai' ? 72.8777 : city === 'Bangalore' ? 77.5946 : 77.2090
        },
        distanceFromUser: 'Just Listed (Direct Owner)',
        featured: true
      };

      if (onAddProperty) {
        onAddProperty(newProperty);
      }
      setCreatedProperty(newProperty);
      setIsSuccess(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0A0F1D] text-slate-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#C28E52] uppercase tracking-wider">
                {isEditMode ? 'Direct Owner Listing Console' : 'NO BROKER Multi-Step Owner Portal'}
              </span>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">
                {isEditMode ? 'EDIT MODE' : '100% FREE LISTING'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif mt-0.5">
              {isEditMode 
                ? `Edit Listing: ${propertyToEdit?.title || 'Property'}`
                : 'Property Rent ya Sell Karein — Zero Commission'}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress Tracker with Navigation Guards */}
        {!isSuccess && (
          <div className="px-6 py-3 bg-[#FAF8F5] dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { num: 1, label: 'Type & Intent' },
                { num: 2, label: 'Location & Size' },
                { num: 3, label: 'Price & Amenities' },
                { num: 4, label: 'Photos & Contact' }
              ].map((s) => (
                <button
                  key={s.num} 
                  type="button"
                  className="flex items-center gap-2 cursor-pointer focus:outline-none"
                  onClick={() => handleStepJump(s.num)}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s.num
                        ? 'bg-[#C28E52] text-white ring-2 ring-[#C28E52]/40 scale-105'
                        : step > s.num
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`hidden sm:inline text-xs font-medium ${step === s.num ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-5 overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-bold font-serif">
              {isEditMode ? 'Listing Updated Successfully!' : 'Mubarak Ho! Aapki Listing Live Ho Gayi Hai'}
            </h4>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Your property <span className="font-semibold text-slate-900 dark:text-white">&ldquo;{createdProperty?.title}&rdquo;</span> is updated with <strong>{createdProperty?.images.length} photos</strong>, <strong>{createdProperty?.amenities.length} amenities</strong>, and <strong>0% brokerage</strong>.
            </p>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-left text-xs space-y-2 max-w-md mx-auto border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">Listing Reference:</span>
                <span className="font-mono font-bold text-[#C28E52]">{createdProperty?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Price / Rent:</span>
                <span className="font-bold">{createdProperty?.priceFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Security Deposit:</span>
                <span className="font-bold">{createdProperty?.deposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active Amenities:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{createdProperty?.amenities.slice(0, 3).join(', ')}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Owner Direct Contact:</span>
                <span className="font-bold">{createdProperty?.owner.name} ({createdProperty?.owner.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Brokerage to Pay:</span>
                <span className="font-bold text-emerald-600">₹0 (Zero Commission)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="py-3 px-8 bg-[#C28E52] hover:bg-[#AB773D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer"
              >
                {isEditMode ? 'Done & Return to Listings' : 'View Live on Platform'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
            
            {/* STEP 1: Type & Intent */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Property Intent: Aap rent out karna chahte hain ya sell? <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPurpose('rent')}
                      className={`p-3.5 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                        purpose === 'rent'
                          ? 'border-[#C28E52] bg-amber-50/60 dark:bg-amber-950/20 text-[#C28E52] ring-1 ring-[#C28E52]'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="font-bold">Rent Out (किराये पर दें)</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">Find verified long-term tenants</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPurpose('buy')}
                      className={`p-3.5 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                        purpose === 'buy'
                          ? 'border-[#C28E52] bg-amber-50/60 dark:bg-amber-950/20 text-[#C28E52] ring-1 ring-[#C28E52]'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="font-bold">Sell Property (बेचें)</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">Direct verified buyers at full value</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Property Category <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'flat', label: 'Apartment / Flat', desc: 'Gated societies & towers' },
                      { id: 'house', label: 'Independent House / Villa', desc: 'Bungalow, row house' },
                      { id: 'penthouse', label: 'Penthouse', desc: 'Top floor luxury sky home' },
                      { id: 'pg', label: 'PG / Co-Living', desc: 'Rooms, shared apartments' },
                      { id: 'office', label: 'Commercial Office', desc: 'Workspaces & retail' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPropertyType(item.id as PropertyType)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          propertyType === item.id
                            ? 'border-[#C28E52] bg-amber-50/40 dark:bg-amber-950/20 text-[#C28E52] ring-1 ring-[#C28E52]'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {errors.purpose && (
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.purpose}</span>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="py-2.5 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-[#C28E52] dark:hover:bg-[#C28E52] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Next: Location & Size</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Location & Size */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Metropolis / City <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Locality / Sub-Area <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={locality}
                      onChange={(e) => {
                        setLocality(e.target.value);
                        if (errors.locality) {
                          setErrors((prev) => ({ ...prev, locality: '' }));
                        }
                      }}
                      placeholder="e.g. Bandra West, Worli, Indiranagar"
                      className={`w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs focus:outline-none ${
                        errors.locality 
                          ? 'border-rose-500 ring-1 ring-rose-500' 
                          : 'border-slate-300 dark:border-slate-700 focus:border-[#C28E52]'
                      }`}
                    />
                    {errors.locality && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.locality}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Popular locality chips for quick auto-fill */}
                {LOCALITIES_BY_CITY[city] && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Popular in {city}:</span>
                    {LOCALITIES_BY_CITY[city].slice(0, 4).map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setLocality(loc);
                          if (errors.locality) setErrors((prev) => ({ ...prev, locality: '' }));
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                          locality === loc 
                            ? 'bg-[#C28E52] text-white border-[#C28E52] font-bold'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#C28E52]'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Building / Project / Society Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={societyName}
                    onChange={(e) => setSocietyName(e.target.value)}
                    placeholder="e.g. Oberoi Sky Heights, Rustomjee Elements"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-[#C28E52]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      BHK Configuration <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                    >
                      <option value="1 RK / Studio">1 RK / Studio</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="5+ BHK Grand">5+ BHK Grand</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Carpet Area (sq.ft) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={carpetArea}
                      onChange={handleCarpetAreaChange}
                      placeholder="e.g. 1250"
                      className={`w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs focus:outline-none ${
                        errors.carpetArea 
                          ? 'border-rose-500 ring-1 ring-rose-500' 
                          : 'border-slate-300 dark:border-slate-700 focus:border-[#C28E52]'
                      }`}
                    />
                    {errors.carpetArea && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.carpetArea}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Bathrooms <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                    >
                      <option value={1}>1 Bathroom</option>
                      <option value={2}>2 Bathrooms</option>
                      <option value={3}>3 Bathrooms</option>
                      <option value={4}>4 Bathrooms</option>
                      <option value={5}>5+ Bathrooms</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Furnishing Status
                    </label>
                    <select
                      value={furnishing}
                      onChange={(e) => setFurnishing(e.target.value as FurnishingState)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-[#C28E52]"
                    >
                      <option value="Fully Furnished">Fully Furnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Bespoke Bare">Bespoke Bare</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Floor Level
                    </label>
                    <select
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-[#C28E52]"
                    >
                      <option value="Ground Floor">Ground Floor</option>
                      <option value="Lower Floor (1-4)">Lower Floor (1-4)</option>
                      <option value="Middle Floor (5-12)">Middle Floor (5-12)</option>
                      <option value="Higher Floor (12+)">Higher Floor (12+)</option>
                      <option value="Top Floor / Penthouse">Top Floor / Penthouse</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="py-2.5 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-[#C28E52] dark:hover:bg-[#C28E52] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Next: Pricing & Amenities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Price, Description & Amenities (Strict Numeric Inputs & Financial Summary) */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Rent / Total Price Input (Digits only) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {purpose === 'rent' ? 'Monthly Rent (₹) *' : 'Total Selling Price (₹) *'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">₹</span>
                      <input
                        type="text"
                        value={numericPrice > 0 ? numericPrice.toLocaleString('en-IN') : ''}
                        onChange={handlePriceChange}
                        placeholder={purpose === 'rent' ? '85,000' : '3,20,00,000'}
                        className={`w-full pl-7 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-bold focus:outline-none ${
                          errors.price 
                            ? 'border-rose-500 ring-1 ring-rose-500' 
                            : 'border-slate-300 dark:border-slate-700 focus:border-[#C28E52]'
                        }`}
                      />
                    </div>
                    {errors.price && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.price}</span>
                      </p>
                    )}
                  </div>

                  {/* Security Deposit Configuration */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Security Deposit
                      </label>
                      <button
                        type="button"
                        onClick={() => setDepositOption(depositOption === 'months' ? 'custom' : 'months')}
                        className="text-[10px] text-[#C28E52] font-semibold hover:underline cursor-pointer"
                      >
                        {depositOption === 'months' ? 'Custom ₹' : 'Use Months'}
                      </button>
                    </div>

                    {depositOption === 'months' ? (
                      <select
                        value={depositMonths}
                        onChange={(e) => setDepositMonths(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                      >
                        <option value={1}>1 Month Rent (₹{numericPrice.toLocaleString('en-IN')})</option>
                        <option value={2}>2 Months Rent (₹{(numericPrice * 2).toLocaleString('en-IN')})</option>
                        <option value={3}>3 Months Rent (₹{(numericPrice * 3).toLocaleString('en-IN')})</option>
                        <option value={5}>5 Months Rent (₹{(numericPrice * 5).toLocaleString('en-IN')})</option>
                      </select>
                    ) : (
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">₹</span>
                        <input
                          type="text"
                          value={numericDeposit > 0 ? numericDeposit.toLocaleString('en-IN') : ''}
                          onChange={handleDepositChange}
                          placeholder="e.g. 2,00,000"
                          className="w-full pl-7 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Possession */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Possession Availability
                    </label>
                    <select
                      value={possession}
                      onChange={(e) => setPossession(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                    >
                      <option value="Immediate Move-in">Immediate Move-in</option>
                      <option value="Within 15 Days">Within 15 Days</option>
                      <option value="Within 30 Days">Within 30 Days</option>
                      <option value="Under Construction">Under Construction</option>
                    </select>
                  </div>
                </div>

                {/* Guaranteed Financial Summary Card (Zero NaN, Zero string calculation bugs) */}
                <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#C28E52] uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      Financial Summary & Zero-Brokerage Advantage
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      100% Direct Owner
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400">Monthly Rent</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        ₹{numericPrice.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400">Security Deposit</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        ₹{numericDeposit.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400">Brokerage Saved</div>
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        ₹{brokerageSavedAmount.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400">Total Move-In Pay</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        ₹{totalMoveInCost.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Property Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe views, natural lighting, recent renovations, neighborhood vibe..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-[#C28E52]"
                  />
                </div>

                {/* Amenities Real-Time Synchronized Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Amenities &amp; Features ({selectedAmenities.length} selected) <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      Synchronizes real-time across cards and monograph
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AMENITY_OPTIONS.map((amenity) => {
                      const isSelected = selectedAmenities.includes(amenity);
                      return (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/40 text-slate-900 dark:text-white font-medium ring-1 ring-[#C28E52]/60'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${isSelected ? 'bg-[#C28E52] border-[#C28E52] text-white' : 'border-slate-300 dark:border-slate-700'}`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="truncate">{amenity}</span>
                        </button>
                      );
                    })}
                  </div>

                  {errors.amenities && (
                    <p className="text-[11px] text-rose-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.amenities}</span>
                    </p>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="py-2.5 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-[#C28E52] dark:hover:bg-[#C28E52] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Next: Photos & Contact</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Direct Image Reordering, Deletion, and Owner Verification */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Property Photos ({uploadedImages.length} attached) <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-500">
                      Reorder photos: Use ◀ / ▶ or click Star to make Cover Photo
                    </span>
                  </div>

                  {/* Direct Image Preview & Reordering Management Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    {uploadedImages.map((img, idx) => {
                      const isCover = idx === 0;
                      return (
                        <div 
                          key={idx} 
                          className={`relative group rounded-xl overflow-hidden border-2 bg-slate-900 shadow-sm transition-all ${
                            isCover ? 'border-[#C28E52] ring-2 ring-[#C28E52]/30' : 'border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="h-32 w-full overflow-hidden">
                            <img
                              src={img}
                              alt={`Uploaded ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Cover Photo Badge */}
                          <div className="absolute top-2 left-2 flex items-center gap-1">
                            {isCover ? (
                              <span className="bg-[#C28E52] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                                <Star className="w-3 h-3 fill-current" />
                                <span>#1 Cover Photo</span>
                              </span>
                            ) : (
                              <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                                #{idx + 1}
                              </span>
                            )}
                          </div>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors cursor-pointer shadow-md"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Reordering Action Toolbar */}
                          <div className="p-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveImage(idx, idx - 1)}
                                className={`p-1 rounded border transition-colors cursor-pointer ${
                                  idx === 0 
                                    ? 'opacity-30 border-transparent cursor-not-allowed' 
                                    : 'border-slate-300 dark:border-slate-700 hover:border-[#C28E52] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                                title="Move Left / Earlier"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                disabled={idx === uploadedImages.length - 1}
                                onClick={() => handleMoveImage(idx, idx + 1)}
                                className={`p-1 rounded border transition-colors cursor-pointer ${
                                  idx === uploadedImages.length - 1 
                                    ? 'opacity-30 border-transparent cursor-not-allowed' 
                                    : 'border-slate-300 dark:border-slate-700 hover:border-[#C28E52] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                                title="Move Right / Later"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {!isCover && (
                              <button
                                type="button"
                                onClick={() => handleSetCoverPhoto(idx)}
                                className="text-[11px] font-bold text-[#C28E52] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Star className="w-3 h-3" />
                                <span>Set as Cover</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Upload File Box */}
                    <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#C28E52] rounded-xl flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors h-40 bg-slate-50 dark:bg-slate-800/40">
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Upload More Photos</span>
                      <span className="text-[10px] text-slate-400">JPG, PNG (Multi-select)</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {errors.images && (
                    <p className="text-[11px] text-rose-500 mb-3 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.images}</span>
                    </p>
                  )}

                  {/* Add sample architectural visuals shortcut */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                      Need high-resolution professional photos? Add verified demo architectural visuals:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {SAMPLE_GALLERY.map((sampleImg, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => handleAddSampleImage(sampleImg)}
                          className="px-2.5 py-1 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:border-[#C28E52] flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-[#C28E52]" />
                          <span>Sample Photo #{sIdx + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Owner Contact details */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-3">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Owner Direct Verification
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => {
                          setOwnerName(e.target.value);
                          if (errors.ownerName) setErrors((prev) => ({ ...prev, ownerName: '' }));
                        }}
                        placeholder="Owner full name"
                        className={`w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-semibold focus:outline-none ${
                          errors.ownerName 
                            ? 'border-rose-500 ring-1 ring-rose-500' 
                            : 'border-slate-300 dark:border-slate-700 focus:border-[#C28E52]'
                        }`}
                      />
                      {errors.ownerName && (
                        <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.ownerName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Direct Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={ownerPhone}
                        onChange={(e) => {
                          setOwnerPhone(e.target.value);
                          if (errors.ownerPhone) setErrors((prev) => ({ ...prev, ownerPhone: '' }));
                        }}
                        placeholder="+91 98201 99234"
                        className={`w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-semibold focus:outline-none ${
                          errors.ownerPhone 
                            ? 'border-rose-500 ring-1 ring-rose-500' 
                            : 'border-slate-300 dark:border-slate-700 focus:border-[#C28E52]'
                        }`}
                      />
                      {errors.ownerPhone && (
                        <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.ownerPhone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs">
                    <input
                      type="checkbox"
                      id="verifiedCheckFinal"
                      checked={verifiedTitle}
                      onChange={(e) => {
                        setVerifiedTitle(e.target.checked);
                        if (errors.verifiedTitle) setErrors((prev) => ({ ...prev, verifiedTitle: '' }));
                      }}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="verifiedCheckFinal" className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed cursor-pointer select-none">
                      I confirm I am the direct owner / authorized landlord of this property. No middlemen, brokers, or agents are permitted on this listing.
                    </label>
                  </div>
                  {errors.verifiedTitle && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.verifiedTitle}</span>
                    </p>
                  )}
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="py-3 px-8 bg-[#C28E52] hover:bg-[#AB773D] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg cursor-pointer transition-all active:scale-98"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isEditMode ? 'Save & Update Listing' : 'Publish Listing (100% Free)'}</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
};
