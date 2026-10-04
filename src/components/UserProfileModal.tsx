import React, { useState } from 'react';
import { UserProfile, Property } from '../types';
import { 
  User, 
  X, 
  ShieldCheck, 
  Heart, 
  PlusCircle, 
  LogOut, 
  Phone, 
  Mail, 
  Building, 
  Clock, 
  Award,
  CheckCircle2,
  Trash2,
  Eye,
  HelpCircle,
  Edit3,
  Camera,
  MapPin
} from 'lucide-react';
import { EditProfileModal } from './EditProfileModal';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  savedProperties: Property[];
  postedProperties: Property[];
  onSelectProperty: (property: Property) => void;
  onRemoveSaved: (propertyId: string) => void;
  onOpenPostProperty: () => void;
  onLogout: () => void;
  onOpenAuth: () => void;
  onNavigateMyProperties?: () => void;
  onOpenHelpSupport?: () => void;
  onSaveUser?: (updatedUser: Partial<UserProfile>) => void;
  onCityPreferenceChanged?: (newCity: string, newLocality?: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  savedProperties,
  postedProperties,
  onSelectProperty,
  onRemoveSaved,
  onOpenPostProperty,
  onLogout,
  onOpenAuth,
  onNavigateMyProperties,
  onOpenHelpSupport,
  onSaveUser,
  onCityPreferenceChanged,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'posted'>('saved');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0A0F1D] text-slate-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-auto max-h-[90vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-4">
            <div className="relative group shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#C28E52]"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#C28E52] text-white flex items-center justify-center font-bold text-xl">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
              )}
              {onSaveUser && (
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#0F172A] text-white hover:bg-[#C28E52] border border-white dark:border-slate-800 transition-colors cursor-pointer"
                  title="Upload / Change Avatar"
                >
                  <Camera className="w-3 h-3" />
                </button>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-serif">{user.name || 'User Profile'}</h3>
                {user.isAuthenticated && (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Direct Member
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {user.phone || user.email || 'Browse properties without any broker fees'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSaveUser && (
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-white hover:border-[#C28E52] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C28E52]" />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-slate-900/40 px-6">
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'saved'
                ? 'border-[#C28E52] text-[#C28E52]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4 fill-current text-rose-500" />
            <span>Saved Properties ({savedProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('posted')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'posted'
                ? 'border-[#C28E52] text-[#C28E52]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building className="w-4 h-4 text-[#C28E52]" />
            <span>My Listed Properties ({postedProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-[#C28E52] text-[#C28E52]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>Account Details</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {activeTab === 'saved' && (
            <div className="space-y-4">
              {savedProperties.length > 0 ? (
                <div className="space-y-3">
                  {savedProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4 hover:border-[#C28E52] transition-colors"
                    >
                      <div 
                        className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                      >
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold truncate text-slate-900 dark:text-white hover:text-[#C28E52]">
                            {prop.title}
                          </h4>
                          <div className="text-xs text-slate-500 truncate">{prop.location}</div>
                          <div className="text-xs font-bold font-serif text-[#C28E52] mt-0.5">
                            {prop.priceFormatted} • <span className="font-sans font-normal text-emerald-600 text-[11px]">{prop.brokerageSaved}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectProperty(prop);
                          }}
                          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveSaved(prop.id)}
                          className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <Heart className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                  <p className="text-sm font-medium">No saved properties yet.</p>
                  <p className="text-xs text-slate-400">Click the heart button on any listing to bookmark it here.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'posted' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 flex-wrap gap-2">
                <p className="text-xs text-slate-500">Properties you have listed directly on NO BROKER.</p>
                <div className="flex items-center gap-2">
                  {onNavigateMyProperties && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateMyProperties();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Building className="w-3.5 h-3.5 text-[#C28E52]" />
                      <span>Manage All ({postedProperties.length})</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPostProperty();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#C28E52] hover:bg-[#AB773D] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>List New Property</span>
                  </button>
                </div>
              </div>

              {postedProperties.length > 0 ? (
                <div className="space-y-3">
                  {postedProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4"
                    >
                      <div 
                        className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                      >
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                              LIVE DIRECT LISTING
                            </span>
                            <span className="text-xs font-mono text-slate-400">{prop.id}</span>
                          </div>
                          <h4 className="text-sm font-bold truncate text-slate-900 dark:text-white mt-0.5">
                            {prop.title}
                          </h4>
                          <div className="text-xs font-bold font-serif text-[#C28E52] mt-0.5">
                            {prop.priceFormatted}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-white"
                      >
                        View Live
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-3">
                  <Building className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                  <p className="text-sm font-medium">You haven&apos;t posted any properties yet.</p>
                  <p className="text-xs text-slate-400">Owners list for 100% free with 0% brokerage.</p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPostProperty();
                    }}
                    className="py-2.5 px-6 rounded-xl bg-[#C28E52] text-white text-xs font-bold"
                  >
                    Post Your Property (Free)
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Profile Details & Verification Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                    Member Details &amp; Verification
                  </span>
                  {onSaveUser && (
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(true)}
                      className="text-xs font-bold text-[#C28E52] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Info</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Mobile (Direct Landlord Contacts)</span>
                    <div className="font-semibold flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{user.phone || 'Not provided'}</span>
                      {user.phone && (user.isPhoneVerified !== false ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <span className="text-[10px] text-amber-500 font-semibold">(Unverified)</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block">Email Address</span>
                    <div className="font-semibold flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{user.email || 'Not provided'}</span>
                      {user.email && (user.isEmailVerified !== false ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <span className="text-[10px] text-amber-500 font-semibold">(Unverified)</span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C28E52]" />
                      <span className="text-slate-500">Preferred Search City:</span>
                      <strong className="text-slate-900 dark:text-white">
                        {user.preferredCity || 'Mumbai'}
                        {user.preferredLocality ? ` (${user.preferredLocality})` : ''}
                      </strong>
                    </div>
                    {onSaveUser && (
                      <button
                        type="button"
                        onClick={() => setIsEditModalOpen(true)}
                        className="text-[11px] text-[#C28E52] font-semibold hover:underline"
                      >
                        Change City Preference
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Zero Brokerage</span>
                  <div className="text-lg font-bold text-emerald-600">
                    100% Direct Owner Listings
                  </div>
                  <p className="text-[11px] text-slate-500">Connect with owners directly without any broker fee.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Savings Guarantee</span>
                  <div className="text-lg font-bold text-[#C28E52]">
                    ₹0 Brokerage Paid
                  </div>
                  <p className="text-[11px] text-slate-500">You are protected under NO BROKER Charter.</p>
                </div>
              </div>

              {onOpenHelpSupport && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenHelpSupport();
                  }}
                  className="w-full p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-xs text-[#0F172A] dark:text-white font-semibold hover:bg-amber-100/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-[#C28E52] flex items-center justify-center">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xs">Report, Support &amp; Help Center</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                        Report property, fake broker, payment issue, or read FAQs
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#C28E52]">Open &gt;</span>
                </button>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 justify-between items-center">
                {user.isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLogout();
                    }}
                    className="py-2 px-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAuth();
                    }}
                    className="py-2.5 px-6 rounded-lg bg-[#C28E52] text-white text-xs font-bold"
                  >
                    Sign In with Phone / Google
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && onSaveUser && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onSaveUser={onSaveUser}
          onCityPreferenceChanged={onCityPreferenceChanged}
        />
      )}
    </div>
  );
};
