import React from 'react';
import { 
  Compass, 
  Heart, 
  Plus, 
  Truck, 
  User as UserIcon,
  Menu,
  Building2
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'explore' | 'shortlisted' | 'properties' | 'profile';
  onSelectTab: (tab: 'explore' | 'shortlisted' | 'properties' | 'profile') => void;
  onOpenPostProperty: () => void;
  savedCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenPostProperty,
  savedCount,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#FAF8F5]/95 dark:bg-[#0A0F1D]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 shadow-[0_-4px_20px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-around h-20 px-2 max-w-lg mx-auto">
        
        {/* Explore */}
        <button
          type="button"
          onClick={() => onSelectTab('explore')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-colors gap-0.5 cursor-pointer ${
            activeTab === 'explore'
              ? 'text-[#0F172A] dark:text-white font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Explore</span>
        </button>

        {/* Shortlisted with Badge */}
        <button
          type="button"
          onClick={() => onSelectTab('shortlisted')}
          className={`flex flex-col items-center justify-center w-14 h-14 relative transition-colors gap-0.5 cursor-pointer ${
            activeTab === 'shortlisted'
              ? 'text-[#0F172A] dark:text-white font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Heart className={`w-5 h-5 ${activeTab === 'shortlisted' ? 'fill-current text-[#C28E52]' : ''}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[15px] h-3.5 px-1 rounded-full bg-[#C28E52] text-white text-[9px] leading-none flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Saved</span>
        </button>

        {/* Post Free Raised Pill Button */}
        <button
          type="button"
          onClick={onOpenPostProperty}
          className="flex flex-col items-center justify-center -mt-3 w-12 h-12 rounded-xl bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-[0_8px_20px_-4px_rgba(15,23,42,0.25)] hover:bg-[#C28E52] transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
          <span className="sr-only">Post Free Property</span>
        </button>

        {/* My Properties (Active Tab) */}
        <button
          type="button"
          onClick={() => onSelectTab('properties')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-colors gap-0.5 cursor-pointer ${
            activeTab === 'properties'
              ? 'text-[#0F172A] dark:text-white font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span className="text-[10px]">Properties</span>
        </button>

        {/* Menu / Profile */}
        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-colors gap-0.5 cursor-pointer ${
            activeTab === 'profile'
              ? 'text-[#0F172A] dark:text-white font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px]">Menu</span>
        </button>

      </div>
    </nav>
  );
};

