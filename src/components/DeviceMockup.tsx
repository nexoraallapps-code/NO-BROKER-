import React from 'react';
import { motion } from 'framer-motion';
import heroVilla from '../assets/images/hero_villa_twilight_1790309610252.jpg';
import { 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Star, 
  Sparkles, 
  Search,
  CheckCircle2,
  Heart,
  SlidersHorizontal
} from 'lucide-react';

interface DeviceMockupProps {
  selectedCity?: string;
  onViewMonograph?: () => void;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  selectedCity = 'Mumbai',
  onViewMonograph,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 35 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{
        duration: 0.9,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative w-full max-w-[340px] xl:max-w-[380px] mx-auto select-none cursor-pointer"
    >
      {/* Ambient Glow behind the Device Frame */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#C28E52]/30 via-emerald-500/20 to-[#C28E52]/10 rounded-[48px] blur-2xl opacity-75 pointer-events-none" />

      {/* Floating Badge 1: 0% Brokerage Guarantee */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5 },
          x: { duration: 0.8, delay: 0.5 },
          y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
        }}
        className="absolute -top-4 -left-6 z-20 px-3.5 py-2 rounded-2xl bg-[#0F172A]/90 backdrop-blur-xl border border-emerald-500/40 text-white shadow-2xl flex items-center gap-2 text-xs"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">0% Commission</div>
          <div className="text-xs font-semibold text-slate-200">Direct Landlord Charter</div>
        </div>
      </motion.div>

      {/* Floating Badge 2: Real-time Owner Verified Handshake */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.65 },
          x: { duration: 0.8, delay: 0.65 },
          y: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
        }}
        className="absolute -bottom-5 -right-6 z-20 px-3.5 py-2 rounded-2xl bg-[#0F172A]/90 backdrop-blur-xl border border-[#C28E52]/50 text-white shadow-2xl flex items-center gap-2 text-xs"
      >
        <div className="w-6 h-6 rounded-full bg-[#C28E52]/20 text-[#C28E52] flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#C28E52]">Live Verified</div>
          <div className="text-xs font-semibold text-slate-200">100% Title Deed Checked</div>
        </div>
      </motion.div>

      {/* Smartphone Chassis Frame */}
      <div className="relative rounded-[44px] p-3 bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-2 border-slate-700/80">
        
        {/* Outer Titanium Rim */}
        <div className="rounded-[36px] overflow-hidden bg-[#0A0F1D] border border-slate-800 relative flex flex-col h-[560px] text-white">
          
          {/* Top Speaker / Dynamic Island */}
          <div className="pt-2 px-6 pb-2 flex items-center justify-between text-[11px] text-slate-400 select-none border-b border-slate-800/60 bg-[#0F172A]/80">
            <span className="font-semibold text-white">9:41</span>
            
            {/* Dynamic Island Pill */}
            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center gap-1.5 px-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-mono text-slate-400">Direct</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[10px] font-semibold">5G</span>
              <div className="w-4 h-2 border border-slate-400 rounded-xs p-0.5">
                <div className="w-full h-full bg-emerald-400" />
              </div>
            </div>
          </div>

          {/* Screen Content Container */}
          <div className="p-3.5 flex-1 flex flex-col justify-between overflow-hidden space-y-3">
            
            {/* App Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#C28E52] text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
                  NB
                </div>
                <div>
                  <div className="text-[11px] font-bold font-serif leading-tight">NoBroker Direct</div>
                  <div className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>0% Brokerage</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-medium">
                <MapPin className="w-2.5 h-2.5 text-[#C28E52]" />
                <span>{selectedCity}</span>
              </div>
            </div>

            {/* Mini Search Pill */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 shadow-inner">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#C28E52]" />
                <span>Search direct owner flats...</span>
              </div>
              <SlidersHorizontal className="w-3 h-3 text-slate-500" />
            </div>

            {/* Featured Property Card Inside Phone */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-lg flex-1 flex flex-col justify-between p-2.5 space-y-2">
              
              {/* Card Photo Frame */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black">
                <img
                  src={heroVilla}
                  alt="Luxury Villa"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0F172A]/90 backdrop-blur-md text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Direct Owner</span>
                </div>

                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0F172A]/80 text-rose-400 backdrop-blur-md">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                </div>

                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#0F172A]/85 text-white text-[9px] font-semibold">
                    Ready to Move
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#C28E52] uppercase tracking-wider">
                    3 BHK Sky Villa
                  </span>
                  <span className="text-sm font-bold font-serif text-white">
                    ₹1.85 L <span className="text-[10px] font-normal text-slate-400">/ mo</span>
                  </span>
                </div>

                <div className="text-xs font-bold font-serif text-slate-100 truncate">
                  The Imperial Seafront Residence
                </div>

                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <MapPin className="w-2.5 h-2.5 text-[#C28E52]" />
                  <span>Worli Sea Face, Mumbai</span>
                </div>
              </div>

              {/* Verified Owner Strip */}
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#C28E52] text-white flex items-center justify-center font-bold text-[10px]">
                    AB
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white leading-tight flex items-center gap-1">
                      <span>Ananya Birla</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="text-[9px] text-emerald-400 font-semibold">
                      Save ₹1,85,000 Brokerage
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <div className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-xs">
                    <MessageSquare className="w-3 h-3" />
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-700 text-white">
                    <Phone className="w-3 h-3" />
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Action Button */}
            {onViewMonograph && (
              <button
                type="button"
                onClick={onViewMonograph}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#C28E52] to-[#AB773D] text-white font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-opacity cursor-pointer"
              >
                <span>View Full Property Monograph</span>
                <Sparkles className="w-3 h-3 text-amber-200" />
              </button>
            )}

          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="py-2 flex justify-center bg-[#0F172A]/90">
            <div className="w-28 h-1 bg-slate-600 rounded-full" />
          </div>

        </div>

      </div>

    </motion.div>
  );
};
