import React, { useState } from 'react';
import { Logo } from './Logo';
import { CITIES } from '../data/mockProperties';
import { UserProfile, PropertyPurpose } from '../types';
import { 
  MapPin, 
  ChevronDown, 
  Heart, 
  Sun, 
  Moon, 
  User as UserIcon, 
  PlusCircle, 
  Truck, 
  Gift, 
  ShieldCheck,
  Menu,
  X,
  Building,
  Search
} from 'lucide-react';

interface HeaderProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  activePurpose: PropertyPurpose;
  onSelectPurpose: (purpose: PropertyPurpose) => void;
  onOpenPostProperty: () => void;
  onOpenAuth: () => void;
  onOpenMovers: () => void;
  onOpenReferral: () => void;
  onOpenShortlisted: () => void;
  onOpenPropertyDetails?: () => void;
  onOpenSearchConsole?: () => void;
  onOpenUnlockContacts?: () => void;
  onOpenProfile: () => void;
  user: UserProfile;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCity,
  onSelectCity,
  activePurpose,
  onSelectPurpose,
  onOpenPostProperty,
  onOpenAuth,
  onOpenMovers,
  onOpenReferral,
  onOpenShortlisted,
  onOpenPropertyDetails,
  onOpenSearchConsole,
  onOpenUnlockContacts,
  onOpenProfile,
  user,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Left Zone: Brand + City Selector */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Logo size="md" showTagline={false} />

            {/* Zero Brokerage Trust Chip */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950 text-emerald-300 dark:bg-emerald-950/80 border border-emerald-800/60 rounded-sm text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              0% BROKERAGE
            </div>

            {/* City Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium hover:border-[#C28E52] transition-colors cursor-pointer"
                aria-expanded={cityDropdownOpen}
              >
                <MapPin className="w-3.5 h-3.5 text-[#C28E52]" />
                <span className="max-w-[85px] sm:max-w-none truncate">{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-44 rounded-md shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Metropolis
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onSelectCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCity === city
                          ? 'text-[#C28E52] bg-[#FAF8F5] dark:bg-slate-800/60 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {city}
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#C28E52]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Middle Zone: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectPurpose('buy')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activePurpose === 'buy'
                  ? 'text-slate-950 dark:text-white font-semibold underline underline-offset-8 decoration-[#C28E52] decoration-2'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => onSelectPurpose('rent')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activePurpose === 'rent'
                  ? 'text-slate-950 dark:text-white font-semibold underline underline-offset-8 decoration-[#C28E52] decoration-2'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => onSelectPurpose('commercial')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activePurpose === 'commercial'
                  ? 'text-slate-950 dark:text-white font-semibold underline underline-offset-8 decoration-[#C28E52] decoration-2'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Commercial
            </button>

            {onOpenSearchConsole && (
              <button
                onClick={onOpenSearchConsole}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-[#0F172A] dark:text-white hover:text-[#C28E52] transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#C28E52]" />
                Search Console
              </button>
            )}

            <button
              onClick={onOpenMovers}
              className="px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#C28E52]" />
              Packers & Movers
            </button>

            {onOpenPropertyDetails && (
              <button
                onClick={onOpenPropertyDetails}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-[#C28E52] hover:text-[#AB773D] transition-colors cursor-pointer"
              >
                <Building className="w-3.5 h-3.5" />
                Property Monograph
              </button>
            )}

            <button
              onClick={onOpenReferral}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#C28E52]" />
              Refer & Earn
            </button>
          </nav>

          {/* Right Zone: Actions (Post Free, DarkMode, Shortlist, Auth/Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Contact Quota Quick Pill */}
            {onOpenUnlockContacts && (
              <button
                type="button"
                onClick={onOpenUnlockContacts}
                title="Unlock Verified Owner Contacts"
                className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-[#80551F] dark:text-amber-300 border border-[#C28E52]/30 hover:border-[#C28E52] transition-colors cursor-pointer"
              >
                <span>Quota: {user.contactsRemaining}/5</span>
              </button>
            )}

            {/* Dark Mode Switch */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Shortlist Badge - Opens Saved Properties View */}
            <button
              type="button"
              onClick={onOpenShortlisted}
              className="relative p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Saved properties"
              title="Saved Properties"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              {user.savedPropertyIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {user.savedPropertyIds.length}
                </span>
              )}
            </button>

            {/* Post Property (FREE) Button */}
            <button
              type="button"
              onClick={onOpenPostProperty}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#0F172A] hover:bg-[#1E293B] text-white dark:bg-[#C28E52] dark:hover:bg-[#AB773D] dark:text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Property</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-400 text-slate-950 rounded-sm">
                FREE
              </span>
            </button>

            {/* Login / Profile Button */}
            {user.isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#C28E52] text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="hidden md:inline max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 z-50">
                    <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user.phone || user.email}</div>
                      <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Zero Broker Account
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenProfile();
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                    >
                      <span>My Profile & Dashboard</span>
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenShortlisted();
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                    >
                      <span>Saved Properties</span>
                      <span className="text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-600 font-bold px-1.5 py-0.5 rounded">
                        {user.savedPropertyIds.length}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenPostProperty();
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                    >
                      <span>My Posted Properties</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">
                        {user.postedPropertyIds.length}
                      </span>
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 hover:border-[#C28E52] text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#C28E52]" />
                <span>Login / Sign Up</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 space-y-2">
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-md">
              <button
                onClick={() => {
                  onSelectPurpose('buy');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded ${
                  activePurpose === 'buy' ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => {
                  onSelectPurpose('rent');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded ${
                  activePurpose === 'rent' ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Rent
              </button>
              <button
                onClick={() => {
                  onSelectPurpose('commercial');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded ${
                  activePurpose === 'commercial' ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Commercial
              </button>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onOpenPostProperty();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded bg-[#C28E52] text-white font-semibold"
              >
                <PlusCircle className="w-4 h-4" />
                Post Property Free
              </button>
              <button
                onClick={() => {
                  onOpenMovers();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium"
              >
                <Truck className="w-4 h-4 text-[#C28E52]" />
                Packers & Movers
              </button>

              {onOpenSearchConsole && (
                <button
                  onClick={() => {
                    onOpenSearchConsole();
                    setMobileMenuOpen(false);
                  }}
                  className="col-span-2 flex items-center justify-center gap-1.5 p-2.5 rounded border border-[#0F172A]/40 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white font-semibold"
                >
                  <Search className="w-4 h-4 text-[#C28E52]" />
                  Launch Search &amp; Filter Master Console
                </button>
              )}

              {onOpenPropertyDetails && (
                <button
                  onClick={() => {
                    onOpenPropertyDetails();
                    setMobileMenuOpen(false);
                  }}
                  className="col-span-2 flex items-center justify-center gap-1.5 p-2.5 rounded border border-[#C28E52]/40 bg-[#C28E52]/10 text-[#C28E52] font-semibold"
                >
                  <Building className="w-4 h-4" />
                  View Architectural Monograph (Details Screen)
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
