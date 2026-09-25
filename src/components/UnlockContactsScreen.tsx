import React, { useState } from 'react';
import { Property, UserProfile } from '../types';
import { 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  Check, 
  CheckCircle2,
  Bolt, 
  Users, 
  UserPlus,
  Info, 
  Phone, 
  MessageSquare, 
  Coins, 
  Share2,
  Send,
  Lock,
  Unlock,
  MapPin,
  Sparkles,
  HelpCircle,
  Clock,
  ExternalLink,
  CreditCard,
  Building,
  CheckCircle
} from 'lucide-react';

interface UnlockContactsScreenProps {
  onBack: () => void;
  user: UserProfile;
  onUnlockSuccess: (addedContacts: number) => void;
  featuredProperty?: Property;
  onViewPropertyDetails?: (property: Property) => void;
  onOpenReferralScreen?: () => void;
}

export const UnlockContactsScreen: React.FC<UnlockContactsScreenProps> = ({
  onBack,
  user,
  onUnlockSuccess,
  featuredProperty,
  onViewPropertyDetails,
  onOpenReferralScreen,
}) => {
  const [activeTab, setActiveTab] = useState<'unlock' | 'faq'>('unlock');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [referralCount, setReferralCount] = useState(3);
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handlePay = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      onUnlockSuccess(25); // Unlocks 25 verified contacts
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 3500);
    }, 1200);
  };

  const handleRefer = () => {
    const inviteLink = `${window.location.origin}/#invite=${user.phone || 'nobroker948'}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteLink);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2500);
    }
    if (referralCount < 5) {
      const next = referralCount + 1;
      setReferralCount(next);
      if (next === 5) {
        onUnlockSuccess(5);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] antialiased flex flex-col justify-between selection:bg-[#C28E52]/20 selection:text-[#C28E52]">
      
      {/* Fixed Sticky Editorial Header */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
        <div className="h-18 sm:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Left: Back & City */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={onBack}
              aria-label="Back to Property"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 text-[#C28E52]" />
              <span>Back to Property</span>
            </button>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EFEEEB] dark:bg-slate-800 text-xs font-semibold text-[#1B1C1A] dark:text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#C28E52]" />
              <span>{featuredProperty?.city || 'Mumbai'}</span>
            </div>
          </div>

          {/* Center Trust Tag */}
          <div className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Direct Owner • 0% Brokerage</span>
          </div>

          {/* Right Navigation & Profile */}
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1.5 bg-[#EFEEEB] dark:bg-slate-800/80 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('unlock')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'unlock'
                    ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Unlock Contact
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'faq'
                    ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Assurance &amp; FAQ
              </button>
            </nav>

            <div className="flex items-center pl-1">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_rgba(15,23,42,0.08)] border border-slate-300 dark:border-slate-700"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#C28E52] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full relative flex-grow pt-4 pb-16">
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          
          {/* Ambient Architectural Glow */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C28E52]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Breadcrumb & Quota Limit Status Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <button onClick={onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                Home
              </button>
              <span className="text-slate-400">/</span>
              <button onClick={onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                Property Details
              </button>
              <span className="text-slate-400">/</span>
              <span className="text-[#0F172A] dark:text-white font-semibold">Unlock Contacts</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEEEB] dark:bg-slate-800 text-xs font-semibold text-[#0F172A] dark:text-slate-200 shadow-xs border border-slate-200/80 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-[#C28E52] animate-pulse"></span>
              <span>Account Quota Limit Reached</span>
            </div>
          </div>

          {activeTab === 'unlock' ? (
            <>
              {/* Top Section: Editorial Heading */}
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight mb-2">
                  Your 5 Free Contacts Are Used
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                  You have used all 5 free property owner contacts. Connect directly with more owners by choosing an option below.
                </p>
              </div>

              {/* Usage Status Box (Architectural Monograph Panel) */}
              <div className="bg-[#F5F3F0] dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm mb-8 border border-slate-200/80 dark:border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#EAE8E5] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white shadow-inner">
                      <Phone className="w-6 h-6 text-[#C28E52]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Quota Usage
                      </div>
                      <div className="text-lg sm:text-xl font-bold font-serif text-[#0F172A] dark:text-white">
                        5 / 5 Contacts Used
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#0F5132] dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/50 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>5 Direct Landlords Reached</span>
                  </div>
                </div>

                {/* Meter Progress Bar */}
                <div className="w-full h-2.5 bg-[#E4E2DF] dark:bg-slate-800 rounded-full overflow-hidden mb-4 shadow-inner">
                  <div className="h-full bg-[#0F172A] dark:bg-[#C28E52] rounded-full transition-all duration-700 ease-out w-full"></div>
                </div>

                {/* Context Note */}
                <div className="flex items-start gap-3 bg-[#FAF8F5]/80 dark:bg-slate-800/60 rounded-xl p-3 sm:p-4 border border-slate-200/60 dark:border-slate-700/60">
                  <Info className="w-5 h-5 text-[#C28E52] mt-0.5 shrink-0" />
                  <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-[#0F172A] dark:text-white block sm:inline sm:mr-1">
                      Why is the owner contact locked?
                    </span>
                    Each user receives 5 direct owner connections free. To protect owners and maintain quality listings, additional contacts require a small unlock fee or friends referral.
                  </div>
                </div>
              </div>

              {/* Payment Success Toast Feedback */}
              {paymentSuccess && (
                <div className="p-4 mb-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center space-y-1 animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-emerald-700 dark:text-emerald-300 font-bold text-sm flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Payment Successful! 25 Verified Contacts Unlocked</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    You can now view phone numbers and WhatsApp landlords directly with zero brokerage.
                  </p>
                </div>
              )}

              {/* Two Option Cards Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-8">
                
                {/* CARD 1: OPTION 1 — PAY (Instant Access) */}
                <div className="relative bg-white dark:bg-[#0F172A] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1">
                  <div>
                    {/* Floating Highlight Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C28E52]/15 text-[#80551F] dark:text-[#E0A96D] text-xs font-bold tracking-wider uppercase">
                        <Bolt className="w-3.5 h-3.5" />
                        <span>Instant Access</span>
                      </span>
                      <span className="text-xs text-slate-400 font-semibold uppercase">Option 1</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white mb-1">
                      Unlock More Contacts
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">
                      Pay ₹250 to see more owner contacts
                    </p>

                    {/* Price Typography */}
                    <div className="bg-[#F5F3F0] dark:bg-slate-900 rounded-xl p-4 mb-5 border border-slate-200/70 dark:border-slate-800">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-white">
                          ₹250
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">/ one-time payment</span>
                      </div>
                      <div className="text-xs text-[#0F5132] dark:text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Instant Activation • 25 Verified Owner Contacts</span>
                      </div>
                    </div>

                    {/* Feature Checklist */}
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A] dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Instant access to owner phone &amp; WhatsApp</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A] dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Valid for all Mumbai &amp; metro verified listings</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A] dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Direct verified landlords with 0% brokerage</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A] dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Safe &amp; encrypted payment via UPI, Cards, or NetBanking</span>
                      </li>
                    </ul>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    onClick={handlePay}
                    disabled={isProcessingPayment}
                    className="w-full bg-[#0F172A] text-white hover:bg-[#C28E52] transition-all duration-200 py-3.5 px-4 rounded-xl font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-75"
                    type="button"
                  >
                    {isProcessingPayment ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Authorizing Secure Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹250</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* CARD 2: OPTION 2 — REFER (Free Option) */}
                <div className="relative bg-white dark:bg-[#0F172A] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1">
                  <div>
                    {/* Floating Highlight Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 text-xs font-bold tracking-wider uppercase">
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Free Option</span>
                      </span>
                      <span className="text-xs text-slate-400 font-semibold uppercase">Option 2</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white mb-1">
                      Refer &amp; Get Free Contacts
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">
                      Refer 5 People and Get 5 More Contacts Free
                    </p>

                    {/* Referral Progress Box */}
                    <div className="bg-[#F5F3F0] dark:bg-slate-900 rounded-xl p-4 mb-5 border border-slate-200/70 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                          Your Referral Status
                        </span>
                        <span className="text-xs font-bold text-[#0F172A] dark:text-white">
                          {Math.round((referralCount / 5) * 100)}% Completed
                        </span>
                      </div>
                      
                      <div className="text-lg font-serif font-bold text-[#0F172A] dark:text-white mb-2">
                        {referralCount} / 5 People Joined
                      </div>

                      {/* Segmented 5-step Visual Indicator */}
                      <div className="grid grid-cols-5 gap-1.5 mb-2.5">
                        {[1, 2, 3, 4, 5].map((step) => (
                          <div
                            key={step}
                            className={`h-2 rounded-full shadow-xs transition-all duration-300 ${
                              step <= referralCount
                                ? 'bg-[#0F5132] dark:bg-emerald-500'
                                : 'bg-[#E4E2DF] dark:bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {5 - referralCount > 0 ? (
                          <>
                            Only <span className="font-bold text-[#0F172A] dark:text-white">{5 - referralCount} more friends</span> need to join NO BROKER to unlock 5 owner contacts for free.
                          </>
                        ) : (
                          <span className="text-[#0F5132] font-bold">
                            Goal reached! You have unlocked 5 free contacts!
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Feature / How It Works Checklist */}
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A] dark:text-slate-200">
                        <Share2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Share your private invite link with friends</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A] dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Friends sign up with their mobile number (OTP)</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A] dark:text-slate-200">
                        <Coins className="w-4 h-4 text-[#0F5132] dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>Get 5 contacts instantly credited to your profile</span>
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleRefer}
                      className="w-full bg-[#EAE8E5] hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white transition-colors duration-200 py-3.5 px-4 rounded-xl font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      type="button"
                    >
                      {copiedInvite ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Invite Copied! Progress Recorded (+1)</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#C28E52]" />
                          <span>Refer 5 People (Share Link)</span>
                        </>
                      )}
                    </button>

                    {onOpenReferralScreen && (
                      <button
                        onClick={onOpenReferralScreen}
                        className="w-full py-2 px-3 text-xs font-semibold text-[#80551F] dark:text-amber-300 hover:text-[#0F172A] dark:hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
                        type="button"
                      >
                        <span>Open Full Referral Console &amp; WhatsApp Share</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </>
          ) : (
            /* ASSURANCE & FAQ TAB */
            <div className="space-y-6 max-w-3xl mx-auto py-4 animate-in fade-in duration-200">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#0F172A] dark:text-white">
                  Privé Assurance &amp; Owner Contact FAQs
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Everything you need to know about our direct owner verification and contact limits.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#0F172A] dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    How does NO BROKER verify property owners?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Every property owner is vetted against Title Deeds, Index II certificates, and biometric Aadhaar authentication. You never speak to middlemen or unregistered brokers.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#0F172A] dark:text-white flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#C28E52]" />
                    Why is there a 5 free contact limit?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    To safeguard property landlords from spam and telemarketers, each genuine home-seeker starts with 5 free high-value direct contacts. Once exhausted, you can invite peers or make a small nominal unlock of ₹250.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#0F172A] dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    What if the property is already rented or sold?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    If an owner confirms that their unit is no longer vacant, our concierge immediately refunds that contact credit back to your account within 60 seconds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Trust & Safety Bar */}
          <div className="bg-[#F5F3F0] dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-[#0F5132] dark:text-emerald-400" />
                  <span className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white">
                    100% Direct Owner Listings
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-[#0F5132] dark:text-emerald-400" />
                  <span className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white">
                    Zero Brokerage Guaranteed
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-5 h-5 text-[#C28E52]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white">
                    Bank-Grade Secure Checkout
                  </span>
                </div>
              </div>

              <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#C28E52]" />
                <span>Return to Property Details</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#F5F3F0] dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-1px_8px_rgba(15,23,42,0.02)] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
              <span>Zero Brokerage Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
              <Lock className="w-4 h-4 text-[#0F5132]" />
              <span>100% Privacy Protected</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
              <Phone className="w-4 h-4 text-[#C28E52]" />
              <span>24/7 Verified Support</span>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            © 2024 NO BROKER Direct Exchange. Curated &amp; Verified.
          </div>
        </div>
      </footer>

    </div>
  );
};
