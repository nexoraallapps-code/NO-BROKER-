import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  darkMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
  darkMode = false,
}) => {
  const iconHeight = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;

  return (
    <div className={`flex flex-col items-start select-none cursor-pointer group ${className}`}>
      <div className="flex items-center gap-1.5">
        {/* Custom 3D Architectural Emblem */}
        <svg
          height={iconHeight}
          viewBox="0 0 160 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="goldRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D061" />
              <stop offset="50%" stopColor="#C28E52" />
              <stop offset="100%" stopColor="#8C5D2C" />
            </linearGradient>
            <linearGradient id="towerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4A366" />
              <stop offset="100%" stopColor="#8C5D2C" />
            </linearGradient>
            <linearGradient id="towerGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="greenRoof" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#0B421F" />
            </linearGradient>
          </defs>

          {/* Golden Highrise Skyscrapers */}
          <rect x="68" y="24" width="22" height="66" rx="2" fill="url(#towerGrad1)" />
          <rect x="86" y="10" width="24" height="80" rx="2" fill="url(#towerGrad2)" />
          <rect x="88" y="12" width="10" height="76" fill="url(#goldRoofGrad)" opacity="0.8" />
          <rect x="110" y="38" width="18" height="52" rx="2" fill="url(#towerGrad1)" />
          {/* Windows */}
          <line x1="72" y1="34" x2="86" y2="34" stroke="#FFF" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="72" y1="44" x2="86" y2="44" stroke="#FFF" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="72" y1="54" x2="86" y2="54" stroke="#FFF" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="92" y1="22" x2="104" y2="22" stroke="#FFF" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="92" y1="32" x2="104" y2="32" stroke="#FFF" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="92" y1="42" x2="104" y2="42" stroke="#FFF" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Roof Ridge - Green & Gold Arch */}
          <path
            d="M10 68 L60 26 L120 72"
            stroke="url(#goldRoofGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 65 L60 29 L115 70"
            stroke="url(#greenRoof)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Little 4-pane window inside house gable */}
          <rect x="52" y="44" width="7" height="7" rx="1" fill="url(#goldRoofGrad)" />
          <rect x="61" y="44" width="7" height="7" rx="1" fill="url(#goldRoofGrad)" />
          <rect x="52" y="53" width="7" height="7" rx="1" fill="url(#goldRoofGrad)" />
          <rect x="61" y="53" width="7" height="7" rx="1" fill="url(#goldRoofGrad)" />
        </svg>

        {/* Wordmark */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center tracking-tight leading-none">
            <span
              className={`font-black text-slate-950 dark:text-white ${
                size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
              }`}
            >
              N
            </span>

            {/* Red Circle with Slash Broker Silhouette (O) */}
            <div
              className={`relative flex items-center justify-center mx-0.5 rounded-full border-2 border-red-600 bg-white ${
                size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
              }`}
            >
              {/* Agent silhouette */}
              <svg viewBox="0 0 24 24" className="w-full h-full p-0.5" fill="#1E293B">
                <circle cx="12" cy="7" r="4" />
                <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
              </svg>
              {/* Red Diagonal Slash */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[120%] h-0.5 bg-red-600 rotate-45 transform origin-center shadow-xs" />
              </div>
            </div>

            <span
              className={`font-black text-slate-950 dark:text-white tracking-wide ml-0.5 ${
                size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
              }`}
            >
              BROKER
            </span>
          </div>

          {showTagline && (
            <span
              className={`text-[9px] sm:text-[10px] tracking-wider font-semibold whitespace-nowrap mt-0.5 ${
                darkMode ? 'text-slate-400' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Find Property. Connect Directly.{' '}
              <span className="text-[#C28E52] dark:text-[#E0A96D] font-bold">No Broker.</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
