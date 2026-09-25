import React from 'react';
import { 
  Compass, 
  Heart, 
  Plus, 
  Truck, 
  User as UserIcon,
  Menu
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'explore' | 'shortlisted' | 'movers' | 'profile';
  onSelectTab: (tab: 'explore' | 'shortlisted' | 'movers' | 'profile') => void;
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
          <Compass className="w-6 h-6" />
          <span className="text-[11px]">Explore</span>
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
            <Heart className={`w-6 h-6 ${activeTab === 'shortlisted' ? 'fill-current text-[#C28E52]' : ''}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#C28E52] text-white text-[10px] leading-none flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[11px]">Shortlisted</span>
        </button>

        {/* Post Free Raised Pill Button */}
        <button
          type="button"
          onClick={onOpenPostProperty}
          className="flex flex-col items-center justify-center w-14 h-14 text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
        >
          <div className="w-11 h-11 rounded-lg bg-[#0F172A] dark:bg-[#C28E52] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(15,23,42,0.2)] hover:bg-[#C28E52] transition-colors">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[11px] mt-0.5 font-medium">Post Free</span>
        </button>

        {/* Movers */}
        <button
          type="button"
          onClick={() => onSelectTab('movers')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-colors gap-0.5 cursor-pointer ${
            activeTab === 'movers'
              ? 'text-[#0F172A] dark:text-white font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
          }`}
        >
          <Truck className="w-6 h-6" />
          <span className="text-[11px] truncate max-w-[54px]">Movers</span>
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
          <Menu className="w-6 h-6" />
          <span className="text-[11px]">Menu</span>
        </button>

      </div>
    </nav>
  );
};
