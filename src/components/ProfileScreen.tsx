import React, { useState } from 'react';
import { UserProfile, Property } from '../types';
import { 
  ArrowLeft, 
  Edit3, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  Building, 
  HelpCircle, 
  LogOut, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Camera, 
  Share2, 
  Sliders, 
  Sparkles,
  ChevronRight,
  Shield,
  Coins
} from 'lucide-react';
import { EditProfileModal } from './EditProfileModal';

interface ProfileScreenProps {
  user: UserProfile;
  savedProperties: Property[];
  postedProperties: Property[];
  onBack: () => void;
  onSaveUser: (updatedUser: Partial<UserProfile>) => void;
  onSelectProperty: (property: Property) => void;
  onOpenPostProperty: () => void;
  onNavigateSaved: () => void;
  onNavigateMyProperties: () => void;
  onOpenHelpSupport: () => void;
  onLogout: () => void;
  onOpenAuth: () => void;
  onCityPreferenceChanged?: (newCity: string, newLocality?: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  savedProperties,
  postedProperties,
  onBack,
  onSaveUser,
  onSelectProperty,
  onOpenPostProperty,
  onNavigateSaved,
  onNavigateMyProperties,
  onOpenHelpSupport,
  onLogout,
  onOpenAuth,
  onCityPreferenceChanged,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalInitialMode, setEditModalInitialMode] = useState<'default' | 'camera'>('default');

  return (
    <div className="w-full min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] pb-24">
      
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Return"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold font-serif text-[#0F172A] dark:text-white">
              Profile &amp; Settings
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setEditModalInitialMode('camera');
                setIsEditModalOpen(true);
              }}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              title="Take a profile photo with camera"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-200" />
              <span className="hidden sm:inline">Camera Photo</span>
              <span className="sm:hidden">Camera</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEditModalInitialMode('default');
                setIsEditModalOpen(true);
              }}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 dark:bg-[#C28E52] dark:hover:bg-[#AB773D] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Profile Identity Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C28E52]/10 dark:bg-[#C28E52]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
            {/* Avatar with quick edit trigger */}
            <div className="relative group shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#C28E52] shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#C28E52] text-white flex items-center justify-center font-bold text-3xl shadow-lg font-serif">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setEditModalInitialMode('camera');
                  setIsEditModalOpen(true);
                }}
                className="absolute bottom-1 right-1 p-2 rounded-full bg-[#0F172A] text-white hover:bg-[#C28E52] transition-colors shadow-md border-2 border-white dark:border-slate-900 cursor-pointer"
                title="Take photo with camera"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-bold font-serif text-[#0F172A] dark:text-white">
                  {user.name || 'Member Profile'}
                </h2>
                {user.isAuthenticated ? (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Direct Member
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium px-2 py-0.5 rounded-full">
                    Guest Account
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                0% Brokerage Direct Charter • Verified Tenant / Buyer Privé
              </p>

              {/* Verified Contact Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs">
                {user.phone ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{user.phone}</span>
                    {user.isPhoneVerified !== false ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <span className="text-[10px] text-amber-500 font-semibold">(Unverified)</span>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-[#C28E52] cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+ Add Phone Number</span>
                  </button>
                )}

                {user.email ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{user.email}</span>
                    {user.isEmailVerified !== false ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <span className="text-[10px] text-amber-500 font-semibold">(Unverified)</span>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-[#C28E52] cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>+ Add Email</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Highlights Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Remaining Free Contacts</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold font-serif text-[#C28E52]">{user.contactsRemaining} / 5</span>
              <Unlock className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-500">Free owner phone &amp; WhatsApp unlocks</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Zero Brokerage Guarantee</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold font-serif text-emerald-600">₹0 Fee</span>
              <Shield className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-500">100% direct owner handshake</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Referral Unlocks</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold font-serif text-slate-800 dark:text-white">+2 Bonus</span>
              <Coins className="w-4 h-4 text-[#C28E52]" />
            </div>
            <p className="text-[11px] text-slate-500">Earn per friend referred</p>
          </div>
        </div>

        {/* Search & Location Preferences Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C28E52]/10 text-[#C28E52] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Search &amp; Location Preference
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Auto-fills your default metropolis and locality across property searches
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-bold text-[#C28E52] hover:underline cursor-pointer"
            >
              Change
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Preferred Metropolis</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {user.preferredCity || 'Mumbai (Default)'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Preferred Locality</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {user.preferredLocality || 'Any Locality / High Connectivity'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Navigations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Saved Properties */}
          <button
            type="button"
            onClick={onNavigateSaved}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-left hover:border-[#C28E52] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#C28E52]">
                  Saved Shortlists
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {savedProperties.length} properties saved
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#C28E52] transition-transform group-hover:translate-x-1" />
          </button>

          {/* Listed Properties */}
          <button
            type="button"
            onClick={onNavigateMyProperties}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-left hover:border-[#C28E52] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#C28E52] flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#C28E52]">
                  My Listed Properties
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {postedProperties.length} live listings
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#C28E52] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Support & Actions Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <button
            type="button"
            onClick={onOpenHelpSupport}
            className="w-full p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-xs text-[#0F172A] dark:text-white font-semibold hover:bg-amber-100/80 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-[#C28E52] flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm">Help, Reports &amp; Payment Problem Desk</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Report a fake broker, track contact unlock refunds, or view FAQs
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#C28E52]">Open Desk &gt;</span>
          </button>

          <div className="pt-2 flex items-center justify-between">
            {user.isAuthenticated ? (
              <button
                type="button"
                onClick={onLogout}
                className="py-2.5 px-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Account</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="py-2.5 px-5 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Sign In with Mobile / Google
              </button>
            )}

            <button
              type="button"
              onClick={onBack}
              className="py-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onSaveUser={onSaveUser}
          onCityPreferenceChanged={onCityPreferenceChanged}
          initialMode={editModalInitialMode}
        />
      )}

    </div>
  );
};
