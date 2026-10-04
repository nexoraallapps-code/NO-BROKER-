import React from 'react';
import { Logo } from './Logo';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Lock, 
  Heart, 
  ArrowUpRight 
} from 'lucide-react';
import { CITIES } from '../data/mockProperties';

interface FooterProps {
  onSelectCity: (city: string) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
  onOpenPostProperty?: () => void;
  onOpenMyProperties?: () => void;
  onOpenSearchConsole?: () => void;
  onOpenHelpSupport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCity,
  onOpenAbout,
  onOpenContact,
  onOpenPrivacy,
  onOpenPostProperty,
  onOpenMyProperties,
  onOpenSearchConsole,
  onOpenHelpSupport,
}) => {
  return (
    <footer className="bg-[#0A0F1D] text-slate-400 border-t border-slate-800/80 pt-16 pb-24 md:pb-16 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Brand & Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-800/80 pb-12">
          <div className="md:col-span-5 space-y-4">
            <Logo size="lg" showTagline darkMode />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm pt-2 font-light">
              India&apos;s premier zero-brokerage residential & commercial property network. 
              Connecting genuine property seekers directly with verified title owners without middleman interference.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Genuine Owner Title Verification Guarantee</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenAbout} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenHelpSupport || onOpenContact} 
                  className="hover:text-white text-[#C28E52] font-semibold transition-colors cursor-pointer"
                >
                  Help &amp; Support Center
                </button>
              </li>
              <li>
                <button onClick={onOpenHelpSupport || onOpenContact} className="hover:text-white transition-colors cursor-pointer">
                  Report an Issue
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Charter
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-white transition-colors cursor-pointer">
                  Zero-Brokerage Charter
                </button>
              </li>
            </ul>
          </div>

          {/* Top Metros */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Metropolitan Markets
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => onSelectCity(c)}
                  className="text-left hover:text-[#C28E52] transition-colors cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* In-House Services */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Privé Services
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenPostProperty}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Post Property Free
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMyProperties}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  My Properties Dashboard
                </button>
              </li>
              {onOpenSearchConsole && (
                <li>
                  <button
                    onClick={onOpenSearchConsole}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Search &amp; Filter Console
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Simple Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2025–2026 NO BROKER Technologies Pvt Ltd. All rights reserved. Zero Commission Certified.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={onOpenAbout} className="hover:text-slate-300 cursor-pointer">About</button>
            <span>•</span>
            <button onClick={onOpenContact} className="hover:text-slate-300 cursor-pointer">Contact</button>
            <span>•</span>
            <button onClick={onOpenPrivacy} className="hover:text-slate-300 cursor-pointer">Privacy Policy</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
