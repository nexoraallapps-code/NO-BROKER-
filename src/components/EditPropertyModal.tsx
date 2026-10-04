import React, { useState, useEffect, useRef } from 'react';
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
  GripVertical,
  Move,
  Save,
  RotateCcw,
  CheckCheck
} from 'lucide-react';

export interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onUpdateProperty: (updatedProp: Property) => void;
  userPhone?: string;
  userName?: string;
}

const PRESET_GALLERY_IMAGES = [
  { url: interiorLiving, title: 'Opulent Living Salon' },
  { url: propertyBandra, title: 'Designer Penthouse Balcony' },
  { url: seaviewPool, title: 'Infinity Coastal Pool' },
  { url: heroVilla, title: 'Private Twilight Sky Deck' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Contemporary Master Suite' },
  { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', title: 'Chef Modular Island Kitchen' }
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

export const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  isOpen,
  onClose,
  property,
  onUpdateProperty,
  userPhone = '',
  userName = '',
}) => {
  if (!isOpen || !property) return null;

  // Active Tab in Edit Modal
  const [activeTab, setActiveTab] = useState<'photos' | 'pricing' | 'specs' | 'details'>('photos');

  // Images state
  const [images, setImages] = useState<string[]>(() => property.images || [interiorLiving]);
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  
  // Drag and Drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Property specs & values
  const [title, setTitle] = useState<string>(property.title || '');
  const [purpose, setPurpose] = useState<PropertyPurpose>(property.purpose || 'rent');
  const [propertyType, setPropertyType] = useState<PropertyType>(property.propertyType || 'flat');
  const [city, setCity] = useState<string>(property.city || 'Mumbai');
  const [locality, setLocality] = useState<string>(property.subLocality || property.location || '');
  const [bhk, setBhk] = useState<string>(property.bhk || '2 BHK');
  const [carpetArea, setCarpetArea] = useState<string>(
    property.carpetArea ? property.carpetArea.replace(/[^0-9]/g, '') : '1250'
  );
  const [bathrooms, setBathrooms] = useState<number>(property.bathrooms || 2);
  const [furnishing, setFurnishing] = useState<FurnishingState>(property.furnishing || 'Fully Furnished');
  const [floor, setFloor] = useState<string>(property.floor || 'Middle Floor');
  const [rawPrice, setRawPrice] = useState<string>(String(property.price || 85000));
  const [deposit, setDeposit] = useState<string>(property.deposit || '2 Months');
  const [description, setDescription] = useState<string>(
    property.description || 'Spacious, sunlit residence with premium fittings and direct owner handshake.'
  );
  const [amenities, setAmenities] = useState<string[]>(property.amenities || [
    '24/7 Security & CCTV',
    'Reserved Covered Parking',
    'High Speed Lift',
    '100% Power Backup'
  ]);
  const [status, setStatus] = useState<string>(property.status || 'Immediate Move-in');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever property changes
  useEffect(() => {
    if (property) {
      setImages(property.images && property.images.length > 0 ? property.images : [interiorLiving]);
      setTitle(property.title || '');
      setPurpose(property.purpose || 'rent');
      setPropertyType(property.propertyType || 'flat');
      setCity(property.city || 'Mumbai');
      setLocality(property.subLocality || property.location || '');
      setBhk(property.bhk || '2 BHK');
      setCarpetArea(property.carpetArea ? property.carpetArea.replace(/[^0-9]/g, '') : '1250');
      setBathrooms(property.bathrooms || 2);
      setFurnishing(property.furnishing || 'Fully Furnished');
      setFloor(property.floor || 'Middle Floor');
      setRawPrice(String(property.price || 85000));
      setDeposit(property.deposit || '2 Months');
      setDescription(property.description || 'Spacious residence with direct owner handshake.');
      setAmenities(property.amenities || []);
      setStatus(property.status || 'Immediate Move-in');
    }
  }, [property]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // -------------------------------------------------------------
  // Image Array Reordering & Deletion Logic
  // -------------------------------------------------------------

  const handleRemoveImage = (indexToRemove: number) => {
    if (images.length <= 1) {
      showToast('Listing must have at least 1 photo.');
      return;
    }
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    setImages(updated);
    showToast('Photo removed from listing.');
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length || fromIndex === toIndex) return;
    const updated = [...images];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    setImages(updated);
    showToast(toIndex === 0 ? 'Set as #1 Cover Photo! ⭐' : `Reordered to position #${toIndex + 1}`);
  };

  const handleMakeCoverPhoto = (index: number) => {
    if (index === 0) return;
    handleMoveImage(index, 0);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Set a transparent or ghost preview if desired
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...images];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, draggedItem);
    setImages(updated);
    
    showToast(targetIndex === 0 ? 'Set as #1 Cover Photo! ⭐' : `Moved to position #${targetIndex + 1}`);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Image Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
          showToast('New photo uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    setImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
    showToast('Photo URL added to gallery!');
  };

  const handleAddPresetImage = (url: string) => {
    if (images.includes(url)) {
      showToast('Photo already in gallery.');
      return;
    }
    setImages((prev) => [...prev, url]);
    showToast('High-res photo added to gallery!');
  };

  // Amenities toggle
  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Save handler
  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!rawPrice || Number(rawPrice) <= 0) newErrors.price = 'Valid price is required';
    if (!carpetArea || Number(carpetArea) <= 0) newErrors.carpetArea = 'Carpet area is required';
    if (images.length === 0) newErrors.images = 'At least 1 photo is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fix highlighted errors before saving.');
      return;
    }

    const numericPrice = Number(rawPrice.replace(/[^0-9]/g, '')) || property.price;
    const brokerageSavedVal = Math.round(numericPrice * 2);

    const updatedProperty: Property = {
      ...property,
      title: title.trim(),
      purpose,
      propertyType,
      city,
      subLocality: locality || property.subLocality || city,
      location: `${locality || property.subLocality || city}, ${city}`,
      bhk,
      carpetArea: `${carpetArea} sq.ft`,
      bathrooms,
      furnishing,
      floor,
      price: numericPrice,
      priceFormatted: `₹${numericPrice.toLocaleString('en-IN')}${purpose === 'rent' ? ' / month' : ''}`,
      deposit,
      brokerageSaved: `Save ₹${brokerageSavedVal.toLocaleString('en-IN')} Brokerage`,
      description,
      amenities,
      images: images.length > 0 ? images : [interiorLiving],
      photos: images,
      status
    };

    onUpdateProperty(updatedProperty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] dark:bg-[#0A0F1D] text-slate-900 dark:text-slate-100 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-auto max-h-[92vh] flex flex-col">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 px-5 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C28E52]/15 text-[#C28E52] flex items-center justify-center font-bold">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white">
                  Edit Property Listing
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  Direct Owner Mode
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">ID: #{property.id}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Ribbon */}
        <div className="px-5 pt-3 pb-2 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'photos'
                ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/60 dark:border-slate-700'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos &amp; Cover Grid ({images.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/60 dark:border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pricing &amp; Terms</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'specs'
                ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/60 dark:border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Specs &amp; Amenities</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'details'
                ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/60 dark:border-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Location &amp; Description</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-1 space-y-6">

          {/* TAB 1: THUMBNAIL PREVIEW GRID & DRAG-AND-DROP REORDERING */}
          {activeTab === 'photos' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Instructions Bar */}
              <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <Move className="w-4 h-4 text-[#C28E52]" />
                    <span>Interactive Photo Reordering &amp; Cover Selector</span>
                  </div>
                  <p className="text-amber-800/80 dark:text-amber-300/80 text-[11px] leading-relaxed">
                    • <strong>Drag and drop</strong> any photo card to reposition it instantly.<br/>
                    • Use <strong>◀ / ▶</strong> buttons for index shifts, or click <strong>⭐ Make Cover</strong> to set as the #1 primary photo.<br/>
                    • Click the <strong>Delete (X)</strong> button to remove unwanted photos.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photos</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* 1. THUMBNAIL PREVIEW GRID */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Uploaded Gallery ({images.length} Photos)
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    First image is your public cover
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((imgUrl, index) => {
                    const isCover = index === 0;
                    const isDragging = draggedIndex === index;
                    const isOver = dragOverIndex === index;

                    return (
                      <div
                        key={`${imgUrl}-${index}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`group relative rounded-2xl overflow-hidden border-2 bg-white dark:bg-slate-900 shadow-md transition-all select-none cursor-grab active:cursor-grabbing ${
                          isCover 
                            ? 'border-[#C28E52] ring-2 ring-[#C28E52]/40 shadow-lg' 
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                        } ${isDragging ? 'opacity-40 scale-95 border-dashed border-amber-500' : ''} ${
                          isOver ? 'ring-4 ring-emerald-500/50 scale-102 border-emerald-500' : ''
                        }`}
                      >
                        {/* Thumbnail Image */}
                        <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative">
                          <img
                            src={imgUrl}
                            alt={`Property Photo ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                          />

                          {/* Drag Handle Indicator */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span className="bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                              <GripVertical className="w-3 h-3 text-[#C28E52]" />
                              <span>Drag to Reorder</span>
                            </span>
                          </div>

                          {/* Top Badges: Cover Photo / Index */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            {isCover ? (
                              <span className="bg-[#C28E52] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                                <Star className="w-3 h-3 fill-current" />
                                <span>#1 Cover Photo</span>
                              </span>
                            ) : (
                              <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded-md">
                                #{index + 1}
                              </span>
                            )}
                          </div>

                          {/* DELETE (X) BUTTON */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer group-hover:scale-110"
                            title="Delete this photo (X)"
                            aria-label="Delete photo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Reordering & Positioning Control Bar */}
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-1.5">
                          {/* Index Shift Left / Earlier */}
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveImage(index, index - 1)}
                            className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                              index === 0
                                ? 'opacity-30 border-transparent cursor-not-allowed text-slate-400'
                                : 'border-slate-200 dark:border-slate-700 hover:border-[#C28E52] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                            }`}
                            title="Shift earlier / left"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Move Left</span>
                          </button>

                          {/* Quick Make Cover Action */}
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => handleMakeCoverPhoto(index)}
                              className="px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-[#C28E52] border border-amber-300/40 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              title="Make this photo the public cover"
                            >
                              <Star className="w-3 h-3 fill-current" />
                              <span>Set Cover</span>
                            </button>
                          )}

                          {/* Index Shift Right / Later */}
                          <button
                            type="button"
                            disabled={index === images.length - 1}
                            onClick={() => handleMoveImage(index, index + 1)}
                            className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                              index === images.length - 1
                                ? 'opacity-30 border-transparent cursor-not-allowed text-slate-400'
                                : 'border-slate-200 dark:border-slate-700 hover:border-[#C28E52] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                            }`}
                            title="Shift later / right"
                          >
                            <span className="text-[10px]">Move Right</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. ADD MORE PHOTOS (URL / SAMPLE PRESETS) */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Add Photos from Web or Curated HD Library
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold">100% Free Hosting</span>
                </div>

                {/* Direct Image URL Form */}
                <form onSubmit={handleAddImageUrl} className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Paste image URL (https://images.unsplash.com/...)"
                    className="flex-1 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-[#C28E52]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add URL</span>
                  </button>
                </form>

                {/* Preset Real Estate Gallery */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] text-slate-500 block font-medium">
                    Quick-Add Architectural &amp; Interior Photos:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {PRESET_GALLERY_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAddPresetImage(preset.url)}
                        className="group relative rounded-xl overflow-hidden h-16 border border-slate-200 dark:border-slate-700 hover:border-[#C28E52] transition-all cursor-pointer"
                        title={preset.title}
                      >
                        <img
                          src={preset.url}
                          alt={preset.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <Plus className="w-4 h-4 text-white opacity-80 group-hover:opacity-100" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRICING & TERMS */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {purpose === 'rent' ? 'Monthly Rent (₹) *' : 'Total Price (₹) *'}
                  </label>
                  <input
                    type="number"
                    value={rawPrice}
                    onChange={(e) => setRawPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold focus:outline-none focus:border-[#C28E52]"
                  />
                  {errors.price && <p className="text-[11px] text-rose-500 mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Security Deposit
                  </label>
                  <input
                    type="text"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    placeholder="e.g. 2 Months or ₹1,70,000"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-[#C28E52]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Possession Timeline / Availability Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                >
                  <option value="Immediate Move-in">Immediate Move-in</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Within 15 Days">Within 15 Days</option>
                  <option value="Within 30 Days">Within 30 Days</option>
                </select>
              </div>

              {/* Commission-Free Advantage Box */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Direct Agreement • 0% Broker Commission Guarantee</span>
                </div>
                <p className="text-emerald-700 dark:text-emerald-400 text-[11px]">
                  Estimated tenant savings: ₹{((Number(rawPrice) || 0) * 2).toLocaleString('en-IN')}.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SPECIFICATIONS & AMENITIES */}
          {activeTab === 'specs' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    BHK Config
                  </label>
                  <select
                    value={bhk}
                    onChange={(e) => setBhk(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="5+ BHK Sky Villa">5+ BHK Sky Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Carpet Area (sq.ft)
                  </label>
                  <input
                    type="number"
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-[#C28E52]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Bathrooms
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                  >
                    <option value={1}>1 Bath</option>
                    <option value={2}>2 Baths</option>
                    <option value={3}>3 Baths</option>
                    <option value={4}>4 Baths</option>
                    <option value={5}>5+ Baths</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Furnishing
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as FurnishingState)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-[#C28E52]"
                  >
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Bespoke Bare">Bespoke Bare</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Select Sanctuary Amenities ({amenities.length} selected)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AMENITY_OPTIONS.map((amenity) => {
                    const isSelected = amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'border-[#C28E52] bg-amber-50 dark:bg-amber-950/40 text-slate-900 dark:text-white font-medium ring-1 ring-[#C28E52]/60'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                          isSelected ? 'bg-[#C28E52] border-[#C28E52] text-white' : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="truncate">{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LOCATION & DESCRIPTION */}
          {activeTab === 'details' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Property Title / Headline *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sea View Sky Villa with Private Lap Pool"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                />
                {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    City Metropolis
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Sub-Locality / Enclave
                  </label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g. Bandra West, Pali Hill"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-[#C28E52]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Curator &amp; Architectural Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe floor-to-ceiling heights, sea views, sunlight, transit connectivity..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-[#C28E52]"
                />
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Footer */}
        <div className="sticky bottom-0 z-30 px-5 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            <span>{images.length} photos ready</span> • <span className="font-semibold text-emerald-600">0% Brokerage</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save &amp; Update Listing</span>
            </button>
          </div>
        </div>

      </div>

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-60 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-[#C28E52]/40">
          <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default EditPropertyModal;
