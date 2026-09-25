/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Property, PropertyPurpose, PropertyType, UserProfile } from './types';
import { INITIAL_PROPERTIES } from './data/mockProperties';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConfigurationBrowse } from './components/ConfigurationBrowse';
import { PropertyListings } from './components/PropertyListings';
import { PropertyDetailsScreen } from './components/PropertyDetailsScreen';
import { SearchFilterConsoleScreen } from './components/SearchFilterConsoleScreen';
import { PostPropertyBanner } from './components/PostPropertyBanner';
import { PostPropertyModal } from './components/PostPropertyModal';
import { PackersAndMovers } from './components/PackersAndMovers';
import { ReferAndEarn } from './components/ReferAndEarn';
import { AuthModal } from './components/AuthModal';
import { SavedPropertiesScreen } from './components/SavedPropertiesScreen';
import { UnlockContactsScreen } from './components/UnlockContactsScreen';
import { ReferralContactsScreen } from './components/ReferralContactsScreen';
import { PostPropertyScreen } from './components/PostPropertyScreen';
import { UserProfileModal } from './components/UserProfileModal';
import { InteractiveMapModal } from './components/InteractiveMapModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { InfoModal } from './components/InfoModals';

export default function App() {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('nobroker_properties');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROPERTIES;
      }
    }
    return INITIAL_PROPERTIES;
  });

  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [activePurpose, setActivePurpose] = useState<PropertyPurpose>('rent');
  
  // Default selectedProperty is never null so the monograph screen always displays
  const [selectedProperty, setSelectedProperty] = useState<Property>(() => INITIAL_PROPERTIES[0]);

  // Active view: 'explore' (main website) | 'search-console' (search & filter console screen) | 'saved-properties' (shortlisted screen) | 'property-details' (full architectural monograph screen) | 'unlock-contacts' (unlock contacts screen) | 'refer-contacts' (refer & get contacts screen) | 'post-property' (post property step 1-4 screen)
  const [currentView, setCurrentView] = useState<'explore' | 'search-console' | 'saved-properties' | 'property-details' | 'unlock-contacts' | 'refer-contacts' | 'post-property'>('explore');

  // Dark mode state: Check localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedPref = localStorage.getItem('nobroker_dark_mode');
    if (savedPref !== null) {
      return savedPref === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem('nobroker_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        // default guest
      }
    }
    return {
      isAuthenticated: false,
      name: '',
      email: '',
      phone: '',
      role: 'buyer',
      savedPropertyIds: ['NB-PLH-942', 'NB-CTR-810', 'NB-WRL-928'],
      contactsRemaining: 3,
      postedPropertyIds: [],
    };
  });

  // Modal controls
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'about' | 'contact' | 'privacy' | null>(null);
  const [mobileTab, setMobileTab] = useState<'explore' | 'shortlisted' | 'movers' | 'profile'>('explore');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Immediate dark mode class toggling on document.documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('nobroker_dark_mode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('nobroker_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Listen to hash changes for deep-linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('search') || hash.includes('filter') || hash.includes('console')) {
        setCurrentView('search-console');
      } else if (hash.includes('details') || hash.includes('monograph')) {
        setCurrentView('property-details');
      } else if (hash.includes('saved') || hash.includes('shortlist')) {
        setCurrentView('saved-properties');
      } else if (hash.includes('refer') || hash.includes('invite')) {
        setCurrentView('refer-contacts');
      } else if (hash.includes('unlock') || hash.includes('contacts')) {
        setCurrentView('unlock-contacts');
      } else if (hash.includes('post') || hash.includes('publish') || hash.includes('listing')) {
        setCurrentView('post-property');
      } else if (hash === '#explore') {
        setCurrentView('explore');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Persist properties when changed
  useEffect(() => {
    localStorage.setItem('nobroker_properties', JSON.stringify(properties));
  }, [properties]);

  // Persist user when changed
  useEffect(() => {
    localStorage.setItem('nobroker_user', JSON.stringify(user));
  }, [user]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    showToast(!isDarkMode ? 'Dark Mode Activated 🌙' : 'Light Mode Activated ☀️');
  };

  // Toggle saving/bookmarking a property
  const handleToggleSaveProperty = (propertyId: string) => {
    const isAlreadySaved = user.savedPropertyIds.includes(propertyId);
    let updatedSaved: string[];

    if (isAlreadySaved) {
      updatedSaved = user.savedPropertyIds.filter((id) => id !== propertyId);
      showToast('Removed from Saved Properties');
    } else {
      updatedSaved = [...user.savedPropertyIds, propertyId];
      showToast('Saved to your Shortlist ❤️');
    }

    setUser((prev) => ({
      ...prev,
      savedPropertyIds: updatedSaved,
    }));
  };

  const handleRemoveSaved = (propertyId: string) => {
    setUser((prev) => ({
      ...prev,
      savedPropertyIds: prev.savedPropertyIds.filter((id) => id !== propertyId),
    }));
    showToast('Removed from Saved Properties');
  };

  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    setUser((prev) => ({
      ...prev,
      postedPropertyIds: [newProp.id, ...prev.postedPropertyIds],
    }));
    showToast('Your property is live on NO BROKER! 🎉');
  };

  const handleContactOwner = (property: Property) => {
    if (!user.isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (user.contactsRemaining <= 0) {
      setSelectedProperty(property);
      setCurrentView('unlock-contacts');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Contact limit reached. Unlock more contacts or invite friends.');
      return;
    }

    setSelectedProperty(property);
    setCurrentView('property-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Direct contact connected with ${property.owner.name}`);
  };

  const handleUnlockSuccess = (addedContacts: number) => {
    setUser((prev) => ({
      ...prev,
      contactsRemaining: (prev.contactsRemaining || 0) + addedContacts,
    }));
    showToast(`Successfully unlocked +${addedContacts} Direct Contacts! 🎉`);
  };

  const handleViewPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    showToast(`Welcome back, ${authenticatedUser.name}!`);
  };

  const handleLogout = () => {
    setUser({
      isAuthenticated: false,
      name: '',
      email: '',
      phone: '',
      role: 'buyer',
      savedPropertyIds: [],
      contactsRemaining: 3,
      postedPropertyIds: [],
    });
    showToast('Signed out successfully.');
  };

  const handleSearch = (params: {
    purpose: PropertyPurpose;
    city: string;
    query: string;
    propertyType?: PropertyType | 'all';
    bhk?: string;
    budgetRange?: string;
  }) => {
    setActivePurpose(params.purpose);
    setSelectedCity(params.city);
    setCurrentView('search-console');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Search console launched for ${params.city}`);
  };

  const handleSelectCategory = (type: PropertyType | 'all', bhk?: string) => {
    const el = document.getElementById('properties-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const savedPropertiesList = properties.filter((p) => user.savedPropertyIds.includes(p.id));
  const postedPropertiesList = properties.filter((p) => user.postedPropertyIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] transition-colors duration-200 selection:bg-[#C28E52]/20 selection:text-[#C28E52]">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-22 left-1/2 transform -translate-x-1/2 z-50 bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] px-4 py-2.5 rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700/80 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Switcher Bar for Quick Review & Direct Navigation */}
      <div className="w-full bg-[#0F172A] text-white py-2 px-4 text-xs border-b border-slate-800 z-50">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium hidden sm:inline">Active Screen:</span>
            <span className="text-[#C28E52] font-bold uppercase tracking-wider text-[11px]">
              {currentView === 'explore'
                ? 'Main Explore Website'
                : currentView === 'search-console'
                ? 'Search & Filter Master Console'
                : currentView === 'saved-properties'
                ? 'Saved Properties Screen'
                : currentView === 'unlock-contacts'
                ? 'Unlock Contacts Screen'
                : currentView === 'refer-contacts'
                ? 'Refer & Get Contacts Screen'
                : currentView === 'post-property'
                ? 'Post Property (Step 1-4 Screen)'
                : 'Architectural Monograph (Details Screen)'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => {
                setCurrentView('explore');
                setMobileTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer font-semibold ${
                currentView === 'explore'
                  ? 'bg-[#C28E52] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Explore Website
            </button>
            <button
              onClick={() => {
                setCurrentView('search-console');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer font-semibold flex items-center gap-1.5 ${
                currentView === 'search-console'
                  ? 'bg-[#C28E52] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Search &amp; Filter Console
            </button>
            <button
              onClick={() => {
                setCurrentView('saved-properties');
                setMobileTab('shortlisted');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer font-semibold flex items-center gap-1.5 ${
                currentView === 'saved-properties'
                  ? 'bg-[#C28E52] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Saved Properties ({user.savedPropertyIds.length})
            </button>
            <button
              onClick={() => {
                setCurrentView('property-details');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer font-semibold flex items-center gap-1.5 ${
                currentView === 'property-details'
                  ? 'bg-[#C28E52] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Property Monograph Screen
            </button>
            <button
              onClick={() => {
                setCurrentView('unlock-contacts');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer font-semibold flex items-center gap-1.5 ${
                currentView === 'unlock-contacts'
                  ? 'bg-[#C28E52] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Unlock Contacts ({user.contactsRemaining}/5)
            </button>
            <button
              onClick={() => {
                setCurrentView('refer-contacts');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer font-semibold flex items-center gap-1.5 ${
                currentView === 'refer-contacts'
                  ? 'bg-[#C28E52] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Refer &amp; Get Contacts
            </button>
            <button
              onClick={() => {
                setCurrentView('post-property');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer font-semibold flex items-center gap-1.5 ${
                currentView === 'post-property'
                  ? 'bg-[#C28E52] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Post Property (Step 1-4)
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: Dedicated Post Property Full Wizard Screen */}
      {currentView === 'post-property' ? (
        <PostPropertyScreen
          onBack={() => {
            setCurrentView('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onAddProperty={handleAddProperty}
          user={user}
          onViewPropertyDetails={handleViewPropertyDetails}
          onNavigateHome={() => {
            setCurrentView('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateSaved={() => {
            setCurrentView('saved-properties');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : currentView === 'refer-contacts' ? (
        /* VIEW 2: Dedicated Referral & Get Contacts Screen */
        <ReferralContactsScreen
          onBack={() => {
            setCurrentView('unlock-contacts');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
          onUnlockSuccess={handleUnlockSuccess}
          onNavigateUnlockContacts={() => {
            setCurrentView('unlock-contacts');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigatePropertyDetails={() => {
            setCurrentView('property-details');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateHome={() => {
            setCurrentView('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenPostProperty={() => setIsPostModalOpen(true)}
          onOpenMovers={() => {
            setCurrentView('explore');
            setTimeout(() => {
              const el = document.getElementById('movers-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
        />
      ) : currentView === 'unlock-contacts' ? (
        /* VIEW 2: Dedicated Unlock Contacts Screen */
        <UnlockContactsScreen
          onBack={() => {
            setCurrentView('property-details');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
          onUnlockSuccess={handleUnlockSuccess}
          featuredProperty={selectedProperty}
          onViewPropertyDetails={handleViewPropertyDetails}
          onOpenReferralScreen={() => {
            setCurrentView('refer-contacts');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : currentView === 'search-console' ? (
        /* VIEW 3: Dedicated Search & Filter Console Screen */
        <SearchFilterConsoleScreen
          onBack={() => {
            setCurrentView('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          properties={properties}
          onSelectProperty={handleViewPropertyDetails}
          onContactOwner={handleContactOwner}
          savedPropertyIds={user.savedPropertyIds}
          onToggleSave={handleToggleSaveProperty}
          onOpenMap={() => setIsMapModalOpen(true)}
          initialPurpose={activePurpose}
          initialCity={selectedCity}
          user={user}
        />
      ) : currentView === 'property-details' ? (
        /* VIEW 4: Dedicated Full-Screen Property Details Monograph */
        <PropertyDetailsScreen
          property={selectedProperty}
          onBack={() => {
            setCurrentView('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectProperty={handleViewPropertyDetails}
          onContactOwner={handleContactOwner}
          isSaved={user.savedPropertyIds.includes(selectedProperty.id)}
          onToggleSave={handleToggleSaveProperty}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenUnlockContacts={() => {
            setCurrentView('unlock-contacts');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
          allProperties={properties}
        />
      ) : currentView === 'saved-properties' ? (
        /* VIEW 5: Dedicated Saved Properties Screen */
        <SavedPropertiesScreen
          onBack={() => {
            setCurrentView('explore');
            setMobileTab('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          savedProperties={savedPropertiesList}
          onSelectProperty={handleViewPropertyDetails}
          onContactOwner={handleContactOwner}
          onRemoveSaved={handleRemoveSaved}
          onFindMore={() => {
            setCurrentView('explore');
            setMobileTab('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
        />
      ) : (
        /* VIEW 6: Primary Full Website Exploration */
        <>
          {/* Top Header */}
          <Header
            selectedCity={selectedCity}
            onSelectCity={(city) => {
              setSelectedCity(city);
              showToast(`Metropolis switched to ${city}`);
            }}
            activePurpose={activePurpose}
            onSelectPurpose={(p) => setActivePurpose(p)}
            onOpenPostProperty={() => {
              setCurrentView('post-property');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onOpenMovers={() => {
              const el = document.getElementById('movers-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenReferral={() => {
              setCurrentView('refer-contacts');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenShortlisted={() => {
              setCurrentView('saved-properties');
              setMobileTab('shortlisted');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPropertyDetails={() => {
              setCurrentView('property-details');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSearchConsole={() => {
              setCurrentView('search-console');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenUnlockContacts={() => {
              setCurrentView('unlock-contacts');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            user={user}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />

          {/* Main Content Area */}
          <main className="flex-1 pb-16 md:pb-0">
            {/* 1. Hero Section with Search Bar */}
            <Hero
              activePurpose={activePurpose}
              onSelectPurpose={setActivePurpose}
              selectedCity={selectedCity}
              onSearch={handleSearch}
              onViewMonograph={() => {
                setCurrentView('property-details');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 2. Configuration & Portfolio Quick Browse */}
            <ConfigurationBrowse onSelectCategory={handleSelectCategory} />

            {/* 3. Property Listings Grid with Advanced Filtering & Sorting */}
            <PropertyListings
              properties={properties}
              selectedCity={selectedCity}
              activePurpose={activePurpose}
              onSelectPurpose={setActivePurpose}
              onSelectProperty={handleViewPropertyDetails}
              onContactOwner={handleContactOwner}
              savedPropertyIds={user.savedPropertyIds}
              onToggleSave={handleToggleSaveProperty}
              onOpenMap={() => setIsMapModalOpen(true)}
            />

            {/* 4. Packers & Movers Section */}
            <div id="movers-section">
              <PackersAndMovers currentCity={selectedCity} />
            </div>

            {/* 5. Post Property FREE Urging Banner */}
            <PostPropertyBanner onOpenPostModal={() => {
              setCurrentView('post-property');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />

            {/* 6. Refer & Earn Section */}
            <div id="referral-section">
              <ReferAndEarn />
            </div>
          </main>

          {/* Footer */}
          <Footer
            onSelectCity={(c) => {
              setSelectedCity(c);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAbout={() => setInfoModalType('about')}
            onOpenContact={() => setInfoModalType('contact')}
            onOpenPrivacy={() => setInfoModalType('privacy')}
          />
        </>
      )}

      {/* Mobile Bottom Sticky Navigation - Present Across All Screens */}
      <MobileBottomNav
        activeTab={mobileTab}
        onSelectTab={(tab) => {
          setMobileTab(tab);
          if (tab === 'explore') {
            setCurrentView('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (tab === 'shortlisted') {
            setCurrentView('saved-properties');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (tab === 'movers') {
            setCurrentView('explore');
            setTimeout(() => {
              const el = document.getElementById('movers-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          } else if (tab === 'profile') {
            if (user.isAuthenticated) {
              setIsProfileModalOpen(true);
            } else {
              setIsAuthModalOpen(true);
            }
          }
        }}
        onOpenPostProperty={() => {
          setCurrentView('post-property');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={user.savedPropertyIds.length}
      />

      {/* Multi-step Post Property Modal */}
      {isPostModalOpen && (
        <PostPropertyModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          onAddProperty={handleAddProperty}
          userPhone={user.phone}
          userName={user.name}
        />
      )}

      {/* Social & OTP Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Interactive Map Modal */}
      {isMapModalOpen && (
        <InteractiveMapModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          properties={properties.filter((p) => p.city === selectedCity)}
          onSelectProperty={handleViewPropertyDetails}
          onContactOwner={handleContactOwner}
        />
      )}

      {/* User Profile Modal */}
      {isProfileModalOpen && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          savedProperties={savedPropertiesList}
          postedProperties={postedPropertiesList}
          onRemoveSaved={handleRemoveSaved}
          onSelectProperty={handleViewPropertyDetails}
          onOpenPostProperty={() => {
            setIsProfileModalOpen(false);
            setIsPostModalOpen(true);
          }}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Static Info Modals (About, Contact, Privacy) */}
      {infoModalType && (
        <InfoModal
          type={infoModalType}
          onClose={() => setInfoModalType(null)}
        />
      )}
    </div>
  );
}
