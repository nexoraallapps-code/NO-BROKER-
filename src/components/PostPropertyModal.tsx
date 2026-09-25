import React, { useState, useEffect } from 'react';
import { Property, PropertyPurpose, PropertyType, FurnishingState } from '../types';
import { CITIES } from '../data/mockProperties';
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
  FileText
} from 'lucide-react';

interface PostPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (newProp: Property) => void;
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
  userPhone = '',
  userName = '',
}) => {
  // 4-step wizard
  const [step, setStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdProperty, setCreatedProperty] = useState<Property | null>(null);

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

  // Step 3: Pricing & Description & Amenities
  const [price, setPrice] = useState<string>('85,000');
  const [deposit, setDeposit] = useState<string>('2 Months');
  const [possession, setPossession] = useState<string>('Immediate Move-in');
  const [description, setDescription] = useState<string>('Spacious, sunlit residence with premium fittings, peaceful locality, and immediate direct owner handover. Zero brokerage.');
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

  if (!isOpen) return null;

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Read selected files into Data URLs
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddSampleImage = (img: string) => {
    if (!uploadedImages.includes(img)) {
      setUploadedImages((prev) => [...prev, img]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericPrice = parseInt(price.replace(/[^0-9]/g, '')) || 85000;
    const formattedPrice =
      purpose === 'rent'
        ? `₹${numericPrice.toLocaleString('en-IN')} / month`
        : `₹${(numericPrice / 10000000).toFixed(2)} Cr`;

    const savedBrokerage =
      purpose === 'rent'
        ? `Save ₹${(numericPrice * 2).toLocaleString('en-IN')} Brokerage`
        : `Save ₹${Math.round(numericPrice * 0.02).toLocaleString('en-IN')} Brokerage`;

    const finalImages = uploadedImages.length > 0 ? uploadedImages : [interiorLiving, heroVilla];

    const newProperty: Property = {
      id: `NB-DIR-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `${bhk} in ${societyName || locality || 'Prime Residence'}`,
      hindiTitle: `${bhk} डायरेक्ट ओनर - ${locality || 'प्राइम लोकेशन'}, ${city}`,
      purpose,
      propertyType,
      price: numericPrice,
      priceFormatted: formattedPrice,
      deposit: deposit || '2 Months',
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
      amenities: selectedAmenities.length > 0 ? selectedAmenities : ['24/7 Security & CCTV', 'Covered Parking'],
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

    onAddProperty(newProperty);
    setCreatedProperty(newProperty);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0A0F1D] text-slate-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#C28E52] uppercase tracking-wider">
                NO BROKER Multi-Step Owner Portal
              </span>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">
                100% FREE LISTING
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif mt-0.5">
              Property Rent ya Sell Karein — Zero Commission
            </h3>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress Tracker */}
        {!isSuccess && (
          <div className="px-6 py-3 bg-[#FAF8F5] dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { num: 1, label: 'Type & Intent' },
                { num: 2, label: 'Location & Size' },
                { num: 3, label: 'Price & Amenities' },
                { num: 4, label: 'Photos & Contact' }
              ].map((s) => (
                <div 
                  key={s.num} 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => s.num < step && setStep(s.num)}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step === s.num
                        ? 'bg-[#C28E52] text-white ring-2 ring-[#C28E52]/40'
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
                </div>
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
              Mubarak Ho! Aapki Listing Live Ho Gayi Hai
            </h4>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Your property <span className="font-semibold text-slate-900 dark:text-white">&ldquo;{createdProperty?.title}&rdquo;</span> is now active with <strong>{createdProperty?.images.length} photos</strong> and <strong>0% brokerage</strong>.
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
                className="py-3 px-8 bg-[#C28E52] hover:bg-[#AB773D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
              >
                View Live on Platform
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
                    Property Intent: Aap rent out karna chahte hain ya sell?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPurpose('rent')}
                      className={`p-3.5 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all ${
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
                      className={`p-3.5 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all ${
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
                    Property Category
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
                        className={`p-3 rounded-xl border text-left transition-all ${
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

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2.5 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
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
                      Metropolis / City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Locality / Sub-Area *
                    </label>
                    <input
                      type="text"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="e.g. Bandra West, Worli, Indiranagar"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Building / Project / Society Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={societyName}
                    onChange={(e) => setSocietyName(e.target.value)}
                    placeholder="e.g. Oberoi Sky Heights, Rustomjee Elements"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Bedrooms / BHK *
                    </label>
                    <select
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold"
                    >
                      <option value="1 RK">1 RK Studio</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK Sky Villa</option>
                      <option value="5+ BHK">5+ BHK Grand Villa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Carpet Area (sq.ft) *
                    </label>
                    <input
                      type="text"
                      value={carpetArea}
                      onChange={(e) => setCarpetArea(e.target.value)}
                      placeholder="e.g. 1450"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Bathrooms
                    </label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(parseInt(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                    >
                      <option value={1}>1 Bathroom</option>
                      <option value={2}>2 Bathrooms</option>
                      <option value={3}>3 Bathrooms</option>
                      <option value={4}>4+ Bathrooms</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Furnishing Status
                    </label>
                    <select
                      value={furnishing}
                      onChange={(e) => setFurnishing(e.target.value as FurnishingState)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
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
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
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
                    className="py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-2.5 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <span>Next: Pricing & Amenities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Price, Description & Amenities */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {purpose === 'rent' ? 'Monthly Rent (₹) *' : 'Total Selling Price (₹) *'}
                    </label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={purpose === 'rent' ? '85,000' : '3,20,00,000'}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Security Deposit
                    </label>
                    <input
                      type="text"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      placeholder="e.g. 2 Months"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Possession Availability
                    </label>
                    <select
                      value={possession}
                      onChange={(e) => setPossession(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold"
                    >
                      <option value="Immediate Move-in">Immediate Move-in</option>
                      <option value="Within 15 Days">Within 15 Days</option>
                      <option value="Within 30 Days">Within 30 Days</option>
                      <option value="Under Construction">Under Construction</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Property Description (Tell buyers / tenants what makes it special)
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe views, natural lighting, recent renovations, neighborhood vibe..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs leading-relaxed"
                  />
                </div>

                {/* Amenities multi-select checkboxes */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Amenities & Key Features (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AMENITY_OPTIONS.map((amenity) => {
                      const isSelected = selectedAmenities.includes(amenity);
                      return (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`p-2 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                            isSelected
                              ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/30 text-slate-900 dark:text-white font-medium'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
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
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="py-2.5 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <span>Next: Photos & Contact</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Multiple Image Uploads & Owner Verification */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Property Photos ({uploadedImages.length} attached) *
                    </label>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      High quality photos get 5x more direct responses
                    </span>
                  </div>

                  {/* Image Grid Preview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden h-28 border border-slate-200 dark:border-slate-800 bg-slate-900">
                        <img
                          src={img}
                          alt={`Uploaded ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 text-white hover:bg-rose-600 transition-colors"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-1 left-1.5 text-[9px] bg-black/60 text-white px-1.5 rounded font-mono">
                          #{idx + 1} {idx === 0 ? '(Cover)' : ''}
                        </span>
                      </div>
                    ))}

                    {/* Upload File Box */}
                    <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#C28E52] rounded-xl flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors h-28 bg-slate-50 dark:bg-slate-800/40">
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Upload Photos</span>
                      <span className="text-[10px] text-slate-400">JPG, PNG (Multi)</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Add sample architectural photos shortcut */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                      Need instant professional photos? Add verified demo architectural visuals:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {SAMPLE_GALLERY.map((sampleImg, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => handleAddSampleImage(sampleImg)}
                          className="px-2.5 py-1 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:border-[#C28E52] flex items-center gap-1"
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
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Owner full name"
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Direct Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="+91 98..."
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs">
                    <input
                      type="checkbox"
                      id="verifiedCheckFinal"
                      checked={verifiedTitle}
                      onChange={(e) => setVerifiedTitle(e.target.checked)}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="verifiedCheckFinal" className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      I confirm I am the direct owner / authorized landlord of this property. No middlemen, brokers, or agents are permitted on this listing.
                    </label>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="py-3 px-8 bg-[#C28E52] hover:bg-[#AB773D] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish Listing (100% Free)</span>
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
