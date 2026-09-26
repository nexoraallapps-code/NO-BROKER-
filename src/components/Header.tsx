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
  Search,
  HelpCircle
} from 'lucide-react';

interface HeaderProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  activePurpose: PropertyPurpose;
  onSelectPurpose: (purpose: PropertyPurpose) => void;
  onOpenPostProperty: () => void;
  onOpenAuth: () => void;
  onOpenShortlisted: () => void;
  onOpenPropertyDetails?: () => void;
  onOpenSearchConsole?: () => void;
  onOpenMyProperties?: () => void;
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
  onOpenShortlisted,
  onOpenPropertyDetails,
  onOpenSearchConsole,
  onOpenMyProperties,
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
                <span className="max-w-[85px] sm:max-w-none truncate font-semibold">{selectedCity}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-52 max-h-80 overflow-y-auto rounded-xl shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 z-50 divide-y divide-slate-100 dark:divide-slate-800/60">
                  <div className="px-3.5 pb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Select Metropolis</span>
                    <span className="text-[10px] text-[#C28E52] font-semibold">{CITIES.length} Cities</span>
                  </div>
                  <div className="py-1">
                    {CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          onSelectCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          selectedCity === city
                            ? 'text-[#C28E52] bg-[#FAF8F5] dark:bg-slate-800/80 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className={`w-3.5 h-3.5 ${selectedCity === city ? 'text-[#C28E52]' : 'text-slate-400'}`} />
                          <span>{city}</span>
                          {city === 'Jaipur' && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                              Heritage Prime
                            </span>
                          )}
                        </span>
                        {selectedCity === city && <span className="w-2 h-2 rounded-full bg-[#C28E52]"></span>}
                      </button>
                    ))}
                  </div>
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
          </nav>

          {/* Right Zone: Actions (Post Free, DarkMode, Shortlist, Auth/Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
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
                        if (onOpenMyProperties) {
                          onOpenMyProperties();
                        } else {
                          onOpenProfile();
                        }
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                    >
                      <span className="font-semibold text-[#0F172A] dark:text-white">My Properties (Landlord Hub)</span>
                      <Building className="w-3.5 h-3.5 text-[#C28E52]" />
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenPostProperty();
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                    >
                      <span>Post Free Property</span>
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-[#C28E52] font-bold px-1.5 py-0.5 rounded">
                        0% Brok.
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
          <div className="md:hidden py-3 px-2 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 space-y-3">
            {/* Mobile City Selector */}
            <div>
              <div className="px-1 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Select City</span>
                <span className="text-[#C28E52] font-semibold">{selectedCity}</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onSelectCity(c);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCity === c
                        ? 'bg-[#C28E52] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

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
                className="col-span-2 flex items-center justify-center gap-1.5 p-2.5 rounded bg-[#C28E52] text-white font-semibold"
              >
                <PlusCircle className="w-4 h-4" />
                Post Property Free
              </button>

              {onOpenMyProperties && (
                <button
                  onClick={() => {
                    onOpenMyProperties();
                    setMobileMenuOpen(false);
                  }}
                  className="col-span-2 flex items-center justify-center gap-1.5 p-2.5 rounded border border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950/40 text-[#0F5132] dark:text-emerald-400 font-semibold"
                >
                  <Building className="w-4 h-4" />
                  My Properties (Owner Dashboard)
                </button>
              )}

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
