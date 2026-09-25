import React, { useState } from 'react';
import { Logo } from './Logo';
import { UserProfile } from '../types';
import { 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  CheckCircle2, 
  RotateCcw 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      // Pre-fill demo OTP 4829 for effortless verification!
      setOtp(['4', '8', '2', '9']);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const authenticatedUser: UserProfile = {
        isAuthenticated: true,
        name: 'Gaurav Mehta',
        email: 'gaurav.mehta@example.com',
        phone: `+91 ${phoneNumber || '98200 48291'}`,
        role: 'buyer',
        savedPropertyIds: ['NB-PLH-942'],
        contactsRemaining: 3,
        postedPropertyIds: [],
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      };
      onSuccess(authenticatedUser);
      onClose();
    }, 500);
  };

  const handleGoogleSocialAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleUser: UserProfile = {
        isAuthenticated: true,
        name: 'Aryan Singhal',
        email: 'aryan.singhal@gmail.com',
        phone: '+91 98110 54321',
        role: 'buyer',
        savedPropertyIds: ['NB-WRL-928'],
        contactsRemaining: 5,
        postedPropertyIds: [],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      };
      onSuccess(googleUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card matching Image 10 & Image 12 */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Center Brand & Directive */}
        <div className="flex flex-col items-center text-center space-y-2 pt-2">
          <Logo size="lg" showTagline={false} />

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            0% Brokerage Direct Directive
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif pt-1">
            Welcome to NO BROKER
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs font-light">
            Sign in to access verified direct-owner residences, contact landlords, and post properties free.
          </p>
        </div>

        {/* Phone / OTP Form */}
        {!isOtpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Direct Mobile Number
              </label>

              <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 overflow-hidden focus-within:border-[#C28E52] focus-within:ring-1 focus-within:ring-[#C28E52]">
                <div className="flex items-center gap-1 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full px-3 py-2.5 bg-transparent text-xs sm:text-sm font-medium focus:outline-hidden text-slate-900 dark:text-white"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <div className="text-[11px] text-red-500 mt-1 font-medium">{errorMsg}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoading ? 'Sending SMS OTP...' : 'Continue with OTP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Enter 4-Digit Verification Code
              </div>
              <div className="text-[11px] text-slate-500">
                Sent to +91 {phoneNumber} • <span className="text-emerald-600 font-semibold">Auto-detected (4829)</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 py-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="w-12 h-12 text-center text-lg font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#C28E52]"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#0F5132] hover:bg-[#146c43] text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLoading ? 'Verifying...' : 'Verify & Enter NO BROKER'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOtpSent(false)}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Change Mobile Number
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          <span className="bg-white dark:bg-slate-900 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider relative">
            Or Continue With
          </span>
        </div>

        {/* Social Authentication: Google */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSocialAuth}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center justify-center gap-3 transition-colors shadow-xs cursor-pointer"
          >
            {/* Real Google SVG Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 10.01 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Legal & Security Footer */}
        <div className="text-center space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] text-slate-400">
            By continuing, you agree to NO BROKER&apos;s{' '}
            <span className="underline cursor-pointer hover:text-slate-600">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer hover:text-slate-600">Privacy Policy</span>.
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encryption • Zero Middlemen • Verified Accounts Only</span>
          </div>
        </div>

      </div>
    </div>
  );
};
