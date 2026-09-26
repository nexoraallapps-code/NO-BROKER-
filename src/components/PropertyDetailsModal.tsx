import React, { useState } from 'react';
import { Property, UserProfile } from '../types';
import { generateOwnerWhatsAppUrl } from '../utils/whatsapp';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Share2, 
  Heart, 
  Check, 
  Sparkles, 
  Compass, 
  Maximize2, 
  Building, 
  Layers, 
  Car, 
  Droplet, 
  Shield, 
  Zap, 
  Clock, 
  Users, 
  Lock
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property;
  onClose: () => void;
  onContactOwner: (property: Property) => void;
  user: UserProfile;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onOpenAuth: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onContactOwner,
  user,
  isSaved,
  onToggleSave,
  onOpenAuth,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [revealedPhone, setRevealedPhone] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('Tomorrow, 4:00 PM');
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleSuccess(true);
    setTimeout(() => {
      setShowScheduleModal(false);
      setScheduleSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] dark:bg-[#0A0F1D] text-slate-900 dark:text-slate-100 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-30 px-4 sm:px-6 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              NO BROKER
            </span>
            <span>/</span>
            <span>{property.city}</span>
            <span>/</span>
            <span className="truncate">{property.subLocality}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Share listing"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-full border border-slate-200 dark:border-slate-800 transition-colors ${
                isSaved
                  ? 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
              title="Save property"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-500' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          
          {/* Main Title & Price Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
                  0% Brokerage Guarantee
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Direct Owner Verified
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {property.id}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-950 dark:text-white">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                <MapPin className="w-4 h-4 text-[#C28E52] shrink-0" />
                <span>{property.location}</span>
                {property.distanceFromUser && (
                  <>
                    <span>·</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {property.distanceFromUser}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="md:text-right bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs shrink-0">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-950 dark:text-white">
                {property.priceFormatted}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {property.deposit ? `Deposit: ${property.deposit}` : 'Direct Title Transfer'}
              </div>
              <div className="inline-block mt-2 px-2.5 py-1 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-300/40">
                {property.brokerageSaved}
              </div>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 rounded-2xl overflow-hidden bg-slate-900 max-h-[460px]">
            {/* Primary Large Image */}
            <div className="md:col-span-8 relative h-72 sm:h-96 md:h-full overflow-hidden">
              <img
                src={property.images[activePhotoIndex]}
                alt={property.title}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-white">
                Signature Living Residence
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span>{property.facing}</span>
                <span>Photo {activePhotoIndex + 1} of {property.images.length}</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="md:col-span-4 grid grid-cols-3 md:grid-cols-1 gap-2 p-2 bg-slate-950">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative rounded-lg overflow-hidden h-20 md:h-28 border-2 transition-all cursor-pointer ${
                    activePhotoIndex === idx
                      ? 'border-[#C28E52] ring-2 ring-[#C28E52]/40'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specifications Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Configuration</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">{property.bhk}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{property.propertyType.toUpperCase()}</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Carpet Area</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">{property.carpetArea}</div>
              <div className="text-[10px] text-emerald-600 font-medium mt-0.5">100% Usable</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bathrooms</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">{property.bathrooms} Baths</div>
              <div className="text-[10px] text-slate-500 mt-0.5">+ Powder Room</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parking</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">{property.parking}</div>
              <div className="text-[10px] text-[#C28E52] font-medium mt-0.5">Reserved Covered</div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Floor & View</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1 truncate">{property.floor}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{property.facing}</div>
            </div>
          </div>

          {/* Two-Column Grid: Left (Architectural Specs & Amenities) | Right (Owner Direct Card) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Detailed Specs Table */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                  <span>Architectural Specifications</span>
                  <span className="text-[11px] font-normal font-sans text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    Verified Registry Record
                  </span>
                </h3>

                <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Furnishing Status</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{property.furnishing}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Possession Timeline</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{property.status}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Tenant Preference</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {property.specifications?.tenantPreference || 'All Welcome'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Balconies & Decks</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {property.specifications?.balconies || '2 Balconies'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Floor Ceiling Height</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {property.specifications?.ceilingHeight || '12 ft Clear'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Age of Property</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {property.specifications?.ageOfProperty || 'New'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Curator Note / Narrative */}
              {property.specifications?.curatorNote && (
                <div className="bg-amber-50/50 dark:bg-slate-900/60 p-5 rounded-2xl border border-amber-200/60 dark:border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#C28E52] mb-1">
                    Curator&apos;s Architectural Note
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                    {property.specifications.curatorNote}
                  </p>
                </div>
              )}

              {/* Sanctuary Amenities */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white mb-4">
                  Sanctuary Amenities & Exclusive Features
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 text-xs">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200">
                      <Sparkles className="w-3.5 h-3.5 text-[#C28E52] shrink-0" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neighborhood Walking & Driving Distance */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                  Neighborhood Intelligence • {property.subLocality}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between">
                    <span className="text-slate-500">Carter Road Promenade</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">800 m · 8 min walk</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between">
                    <span className="text-slate-500">Bandra-Worli Sea Link</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">2.5 km · 7 min drive</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between">
                    <span className="text-slate-500">Lilavati Hospital</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">1.8 km · 6 min drive</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between">
                    <span className="text-slate-500">International Airport (T2)</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">10.4 km · 25 min drive</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Direct Landlord Contact Card (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-[#C28E52]/40 dark:border-[#C28E52]/40 shadow-xl space-y-5">
                
                {/* Landlord profile header */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#C28E52] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {property.owner.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                      <span>{property.owner.name}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Title Deed & Aadhaar Verified Landlord
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium">
                      Active Now · Direct Landlord (No Agent Allowed)
                    </div>
                  </div>
                </div>

                {/* Zero Brokerage Badge Banner */}
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs">
                  <div className="font-bold text-emerald-900 dark:text-emerald-300">
                    Save ₹5,70,000 on Brokerage
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-400 text-[11px] mt-0.5">
                    Direct lease with verified owner. Zero brokerage commission guaranteed.
                  </div>
                </div>

                {/* Primary Contact Buttons */}
                <div className="space-y-2.5">
                  {revealedPhone ? (
                    <a
                      href={`tel:${property.owner.phone}`}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {property.owner.phone}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRevealPhone}
                      className="w-full py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Owner Directly (+91 98200 •••••)</span>
                    </button>
                  )}

                  <a
                    href={generateOwnerWhatsAppUrl(property)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer group"
                    title={`Chat on WhatsApp with ${property.owner.name}`}
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(true)}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#C28E52] text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#C28E52]" />
                    <span>Schedule In-Person Viewing</span>
                  </button>
                </div>

                {/* Quota & Safety Notes */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] text-slate-500 space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span>Direct Contact Quota:</span>
                    <span className="text-[#C28E52] font-bold">
                      {user.contactsRemaining} Free Remaining
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    <span>100% spam-free & encrypted direct connection.</span>
                  </div>
                </div>

              </div>

              {/* Escrow & Legal Assurance Box */}
              <div className="bg-[#FAF8F5] dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C28E52]" />
                  NO BROKER Privé Escrow & Legal Assurance
                </div>
                <ul className="space-y-1 text-slate-500 dark:text-slate-400 text-[11px]">
                  <li>• Title Deed authenticated by in-house legal counsel.</li>
                  <li>• Doorstep biometric rental registration available.</li>
                  <li>• Zero agent commissions guaranteed.</li>
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                Schedule Private Visit
              </h4>
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Direct appointment with <span className="font-semibold text-slate-800 dark:text-slate-200">{property.owner.name}</span>. No agent will attend.
            </p>

            {scheduleSuccess ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  Appointment Requested!
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400">
                  {property.owner.name} will confirm via SMS / WhatsApp shortly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleScheduleVisit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                    Select Convenient Date & Time
                  </label>
                  <select
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium"
                  >
                    <option value="Tomorrow, 11:00 AM">Tomorrow, 11:00 AM</option>
                    <option value="Tomorrow, 4:00 PM">Tomorrow, 4:00 PM</option>
                    <option value="Saturday, 2:00 PM">This Saturday, 2:00 PM</option>
                    <option value="Sunday, 11:00 AM">This Sunday, 11:00 AM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name || 'Gaurav Sharma'}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                    Your Mobile Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={user.phone || '+91 98210 44521'}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#C28E52] hover:bg-[#AB773D] text-white font-semibold text-xs rounded-lg shadow-md transition-colors"
                >
                  Confirm Free Direct Visit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
