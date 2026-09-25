import React, { useState } from 'react';
import { Property } from '../types';
import { 
  X, 
  MapPin, 
  Compass, 
  Layers, 
  ShieldCheck, 
  Phone, 
  Eye, 
  ArrowRight 
} from 'lucide-react';

interface InteractiveMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onContactOwner: (property: Property) => void;
}

export const InteractiveMapModal: React.FC<InteractiveMapModalProps> = ({
  isOpen,
  onClose,
  properties,
  onSelectProperty,
  onContactOwner,
}) => {
  const [selectedPinId, setSelectedPinId] = useState<string>(properties[0]?.id || '');
  const activeProperty = properties.find((p) => p.id === selectedPinId) || properties[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-center items-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#FAF8F5] dark:bg-[#0A0F1D] text-slate-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
        
        {/* Top bar */}
        <div className="px-5 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C28E52]/10 border border-[#C28E52]/30 text-[#C28E52] text-xs font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>Spatial Micro-Market Map</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold font-serif hidden sm:inline">
              Mumbai Western Coast &amp; Metro Arc
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              {properties.length} Verified Properties Live
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Map Body: Left/Center Map + Floating Property Card */}
        <div className="relative flex-1 bg-slate-950 overflow-hidden">
          
          {/* Custom Stylized Coastal Geo Canvas */}
          <div className="absolute inset-0 bg-[#0F172A] opacity-90">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

            {/* Stylized Coastal Curve (Arabian Sea to the Left, Land to the Right) */}
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1000 700"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sea Water Area */}
              <rect width="1000" height="700" fill="#0A0F1D" />
              
              {/* Coastline Polygon for Mumbai Peninsula */}
              <path
                d="M400,0 C380,120 320,180 340,280 C360,380 430,420 390,520 C360,600 320,650 310,700 L1000,700 L1000,0 Z"
                fill="#131B2E"
              />
              {/* Sea-Link Bridge Cable Graphic */}
              <line x1="330" y1="360" x2="380" y2="520" stroke="#C28E52" strokeWidth="3" strokeDasharray="4 4" opacity="0.6" />
              <text x="310" y="440" fill="#C28E52" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
                Bandra-Worli Sea Link
              </text>

              {/* Water Labels */}
              <text x="120" y="320" fill="#334155" fontSize="24" fontFamily="serif" fontStyle="italic" opacity="0.5">
                Arabian Sea
              </text>
              <text x="560" y="160" fill="#475569" fontSize="16" fontFamily="sans-serif" fontWeight="600">
                Juhu Coastal Pocket
              </text>
              <text x="580" y="340" fill="#475569" fontSize="16" fontFamily="sans-serif" fontWeight="600">
                Bandra West &amp; Pali Hill
              </text>
              <text x="620" y="540" fill="#475569" fontSize="16" fontFamily="sans-serif" fontWeight="600">
                Worli Sea Face
              </text>
            </svg>
          </div>

          {/* Interactive Property Map Pins */}
          {properties.map((prop, idx) => {
            // Map coordinates roughly onto 0-100%
            const pinPositions: Record<string, { top: string; left: string }> = {
              'NB-PLH-942': { top: '48%', left: '46%' },
              'NB-WRL-928': { top: '72%', left: '54%' },
              'NB-PLH-711': { top: '44%', left: '49%' },
              'NB-JHU-542': { top: '25%', left: '42%' },
              'NB-CTR-810': { top: '53%', left: '43%' },
              'NB-PRY-305': { top: '49%', left: '50%' },
              'NB-BKC-601': { top: '42%', left: '68%' },
              'NB-BLR-102': { top: '30%', left: '58%' },
              'NB-KRM-441': { top: '65%', left: '62%' },
            };

            const pos = pinPositions[prop.id] || {
              top: `${35 + (idx * 9) % 45}%`,
              left: `${45 + (idx * 7) % 30}%`,
            };

            const isSelected = selectedPinId === prop.id;

            return (
              <button
                key={prop.id}
                type="button"
                onClick={() => setSelectedPinId(prop.id)}
                style={{ top: pos.top, left: pos.left }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all cursor-pointer group ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-xl border ${
                    isSelected
                      ? 'bg-[#C28E52] text-white border-white ring-4 ring-[#C28E52]/40'
                      : 'bg-slate-900/95 text-slate-100 border-slate-700 hover:border-[#C28E52]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono">{prop.priceFormatted.split('/')[0]}</span>
                </div>
                {/* Pointer Arrow */}
                <div className="w-2 h-2 bg-slate-900 transform rotate-45 mx-auto -mt-1" />
              </button>
            );
          })}

          {/* Bottom Floating Active Property Card */}
          {activeProperty && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-30 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 animate-in slide-in-from-bottom duration-300">
              <div className="flex gap-3">
                <img
                  src={activeProperty.images[0]}
                  alt={activeProperty.title}
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase">
                    <ShieldCheck className="w-3 h-3" />
                    <span>0% Brokerage Direct</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {activeProperty.title}
                  </h4>
                  <div className="text-xs text-slate-500 truncate mt-0.5">
                    {activeProperty.location}
                  </div>
                  <div className="text-base font-bold font-serif text-[#C28E52] mt-1">
                    {activeProperty.priceFormatted}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectProperty(activeProperty);
                  }}
                  className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-center hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onContactOwner(activeProperty);
                  }}
                  className="py-2 px-3 rounded-lg bg-[#C28E52] hover:bg-[#AB773D] text-white text-xs font-semibold text-center shadow-xs"
                >
                  Contact Owner
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
