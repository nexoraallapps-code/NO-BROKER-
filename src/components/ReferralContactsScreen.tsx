import React, { useState } from 'react';
import { UserProfile, Property } from '../types';
import { 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  Shield,
  CheckCircle2, 
  Check, 
  Copy, 
  Share2, 
  MessageSquare, 
  PhoneCall, 
  Sparkles, 
  Users, 
  Coins, 
  Lock, 
  Unlock,
  Award,
  Circle,
  Smartphone,
  CheckCheck,
  ExternalLink,
  MapPin,
  ChevronDown,
  Gift,
  Building,
  Key,
  UserCheck,
  Send,
  HelpCircle,
  Headphones
} from 'lucide-react';

interface ReferralContactsScreenProps {
  onBack: () => void;
  user: UserProfile;
  onUnlockSuccess: (addedContacts: number) => void;
  onNavigateUnlockContacts?: () => void;
  onNavigatePropertyDetails?: () => void;
  onNavigateHome?: () => void;
  onOpenPostProperty?: () => void;
  onOpenMovers?: () => void;
}

export const ReferralContactsScreen: React.FC<ReferralContactsScreenProps> = ({
  onBack,
  user,
  onUnlockSuccess,
  onNavigateUnlockContacts,
  onNavigatePropertyDetails,
  onNavigateHome,
  onOpenPostProperty,
  onOpenMovers,
}) => {
  const [referralCount, setReferralCount] = useState<number>(3);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const referralCode = user.phone ? `NB${user.phone.slice(-4)}` : 'NBROKER55';
  const referralLink = `${window.location.origin}/#invite=${referralCode.toLowerCase()}`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralCode);
    }
    setCopiedCode(true);
    showToast('Referral code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralLink);
    }
    setCopiedLink(true);
    showToast('Link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Hey! Check out luxury broker-free properties on NoBroker Direct. Use my invite link: ${referralLink} (Code: ${referralCode}) to connect directly with verified property owners.`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    // Simulate user progress increment
    if (referralCount < 5) {
      const next = referralCount + 1;
      setReferralCount(next);
      if (next === 5) {
        onUnlockSuccess(5);
        showToast('🎉 Goal achieved! 5 Free Verified Contacts Unlocked!');
      } else {
        showToast(`Invite sent! Just ${5 - next} more friend needed.`);
      }
    }
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: 'NoBroker Direct Mumbai',
      text: `Explore broker-free direct architectural properties in Mumbai. Connect with verified landlords directly with code: ${referralCode}`,
      url: referralLink
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        if (referralCount < 5) {
          const next = referralCount + 1;
          setReferralCount(next);
          if (next === 5) {
            onUnlockSuccess(5);
            showToast('🎉 Goal achieved! 5 Free Verified Contacts Unlocked!');
          }
        }
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] antialiased selection:bg-[#C28E52]/20 selection:text-[#C28E52] flex flex-col justify-between">
      
      {/* 1. Header with Direct Brand & Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-6">
            {/* Brand Logo */}
            <button
              onClick={onNavigateHome || onBack}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#0F172A] dark:text-white">
                NO<span className="text-[#C28E52]">BROKER</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-[#EFEEEB] dark:bg-slate-800 text-[#45464D] dark:text-slate-300 text-[11px] uppercase tracking-wider font-semibold">
                Direct
              </span>
            </button>

            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>

            {/* City Chip */}
            <button
              type="button"
              className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 hover:bg-[#EFEEEB] text-[#1B1C1A] dark:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C28E52]" />
              <span>Mumbai</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <button
              onClick={onNavigateHome || onBack}
              className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              Buy
            </button>
            <button
              onClick={onNavigateHome || onBack}
              className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              Rent
            </button>
            <button
              onClick={onNavigateHome || onBack}
              className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              Commercial
            </button>
            <button
              onClick={onOpenMovers || onBack}
              className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              Packers &amp; Movers
            </button>
            <span className="text-[#0F172A] dark:text-white font-bold border-b-2 border-[#C28E52] pb-0.5">
              Refer &amp; Earn
            </span>
          </nav>

          {/* Action CTAs: Post Property & Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenPostProperty || onBack}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0F5132] text-white text-xs font-semibold hover:bg-emerald-800 transition-all shadow-[0_4px_12px_rgba(15,81,50,0.12)] whitespace-nowrap cursor-pointer"
            >
              Post Property FREE
            </button>

            <div className="flex items-center gap-2 pl-1">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#C28E52]/20 shadow-sm border border-slate-200 dark:border-slate-700"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#C28E52] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Body */}
      <main className="w-full pt-24 pb-16 bg-[#FBF9F6] dark:bg-[#0A0F1D] flex-grow">
        <div className="flex flex-col w-full">
          
          {/* Visual Ambient Gradient Aura */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-amber-200/40 dark:from-amber-900/20 via-[#EFEEEB]/20 to-transparent blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 pb-16">
              
              {/* 1. Breadcrumbs Navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
                <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
                <span className="text-slate-300 dark:text-slate-700 font-mono">/</span>
                <button onClick={onNavigatePropertyDetails || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                  Property Details
                </button>
                <span className="text-slate-300 dark:text-slate-700 font-mono">/</span>
                <button onClick={onNavigateUnlockContacts || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                  Contact Unlock
                </button>
                <span className="text-slate-300 dark:text-slate-700 font-mono">/</span>
                <span className="text-[#0F172A] dark:text-white font-semibold">Refer &amp; Earn</span>
              </nav>

              {/* 2. Header & Hero Narrative */}
              <div className="max-w-4xl space-y-4 mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EFEEEB] dark:bg-slate-800 text-[#C28E52] text-xs uppercase tracking-wider font-bold">
                  <Gift className="w-4 h-4 text-[#C28E52]" />
                  <span>Free Contact Unlock Program</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight leading-tight">
                  Refer &amp; Get More <span className="italic font-normal text-[#C28E52]">Contacts</span>
                </h1>

                <div className="space-y-2">
                  <p className="text-lg sm:text-xl font-serif font-bold text-[#0F172A] dark:text-white">
                    Refer 5 People and Get 5 More Contacts Free
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                    Invite friends, family, or colleagues searching for homes in Mumbai. Connect them directly to verified owners with zero brokerage, and earn 5 free owner contacts.
                  </p>
                </div>
              </div>

              {/* 3. Current Balance Status Banner */}
              <div className="mb-12 rounded-2xl bg-[#F5F3F0] dark:bg-slate-900 shadow-sm p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative overflow-hidden border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200 dark:border-red-900">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                        Account Quota Status
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-[10px] font-bold uppercase tracking-wider">
                        {user.contactsRemaining <= 0 ? 'Limit Reached' : `${user.contactsRemaining} Active`}
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-serif font-bold text-[#0F172A] dark:text-white mt-1">
                      Current Available Owner Contact Balance: <span className="text-red-600 dark:text-red-400">{user.contactsRemaining} Contacts Left</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:shrink-0 bg-white dark:bg-[#0F172A] p-4 rounded-xl shadow-xs border border-slate-200/70 dark:border-slate-800">
                  <div className="text-left">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold block">
                      Immediate Requirement
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white">
                      Pay ₹250 to unlock contacts immediately
                    </span>
                  </div>
                  <button
                    onClick={onNavigateUnlockContacts || onBack}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
                    type="button"
                  >
                    <span>Pay ₹250 Now</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>
                </div>
              </div>

              {/* 4. Two-Column Architectural Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                
                {/* LEFT COLUMN: Progress & Status (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-6">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#C28E52] font-bold">
                          Live Campaign Meter
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white mt-0.5">
                          Your Referral Progress
                        </h2>
                      </div>
                      
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 text-xs font-bold self-start sm:self-center">
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Active Campaign</span>
                      </div>
                    </div>

                    {/* Metric & Bar */}
                    <div className="space-y-4 bg-[#F5F3F0] dark:bg-slate-900 p-5 sm:p-6 rounded-xl border border-slate-200/70 dark:border-slate-800">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-white">
                            {referralCount}
                          </span>
                          <span className="text-lg sm:text-xl font-serif font-semibold text-slate-500">
                            {' '}/ 5 People Joined
                          </span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-[#EAE8E5] dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold">
                          {5 - referralCount > 0 ? `${5 - referralCount} More People Needed` : 'Goal Completed!'}
                        </div>
                      </div>

                      {/* 5-Segmented Bar Display */}
                      <div className="grid grid-cols-5 gap-2 pt-1">
                        {[1, 2, 3, 4, 5].map((step) => (
                          <div
                            key={step}
                            className={`h-3 rounded-md relative overflow-hidden transition-all duration-500 ${
                              step <= referralCount
                                ? 'bg-[#0F5132] dark:bg-emerald-500'
                                : 'bg-[#E4E2DF] dark:bg-slate-800'
                            }`}
                          >
                            {step <= referralCount && (
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-slate-600 dark:text-slate-400 text-xs font-semibold">
                        <span>{Math.round((referralCount / 5) * 100)}% Completed</span>
                        <span className="text-[#0F5132] dark:text-emerald-400 font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Reward: 5 More Contacts Unlocked</span>
                        </span>
                      </div>
                    </div>

                    {/* List of Referrals */}
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                        Referral Activity Feed
                      </div>

                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {/* Joined 1 */}
                        <div className="py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 flex items-center justify-center text-xs font-bold font-serif">
                              AS
                            </div>
                            <div>
                              <div className="text-sm font-bold font-serif text-[#0F172A] dark:text-white leading-tight">
                                Amit S.
                              </div>
                              <div className="text-xs text-slate-500">Verified Mumbai Tenant Account</div>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[#0F5132] dark:text-emerald-400 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Joined yesterday</span>
                          </span>
                        </div>

                        {/* Joined 2 */}
                        <div className="py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 flex items-center justify-center text-xs font-bold font-serif">
                              PM
                            </div>
                            <div>
                              <div className="text-sm font-bold font-serif text-[#0F172A] dark:text-white leading-tight">
                                Pooja M.
                              </div>
                              <div className="text-xs text-slate-500">Verified Mumbai Buyer Account</div>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[#0F5132] dark:text-emerald-400 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Joined 2 days ago</span>
                          </span>
                        </div>

                        {/* Joined 3 */}
                        <div className="py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 flex items-center justify-center text-xs font-bold font-serif">
                              KV
                            </div>
                            <div>
                              <div className="text-sm font-bold font-serif text-[#0F172A] dark:text-white leading-tight">
                                Karan V.
                              </div>
                              <div className="text-xs text-slate-500">Verified Mumbai Tenant Account</div>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[#0F5132] dark:text-emerald-400 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Joined 3 days ago</span>
                          </span>
                        </div>

                        {/* Slot 4 Pending */}
                        <div className="py-3 flex items-center justify-between opacity-60">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold">
                              4
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Pending friend 4
                              </div>
                              <div className="text-xs text-slate-400">Awaiting sign-up completion</div>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 italic">Waiting</span>
                        </div>

                        {/* Slot 5 Pending */}
                        <div className="py-3 flex items-center justify-between opacity-60">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold">
                              5
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Pending friend 5
                              </div>
                              <div className="text-xs text-slate-400">Awaiting sign-up completion</div>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 italic">Waiting</span>
                        </div>
                      </div>
                    </div>

                    {/* Note Box */}
                    <div className="p-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 flex items-start gap-3 border border-slate-200/60 dark:border-slate-800">
                      <HelpCircle className="w-5 h-5 text-[#C28E52] shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        After 5 successful referrals complete mobile OTP verification, 5 direct owner contacts are added to your profile immediately.
                      </p>
                    </div>

                  </div>
                </div>

                {/* RIGHT COLUMN: Sharing Actions & Link (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-6">
                    
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#C28E52] font-bold">
                        Direct Transmission
                      </span>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white mt-0.5">
                        Share Your Referral Link
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                        Share this personalized link with house hunters. They bypass brokers entirely, and you unlock full owner direct access.
                      </p>
                    </div>

                    {/* Referral Code Box */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                        Your Referral Code
                      </label>
                      <div className="flex items-center justify-between p-3.5 bg-[#F5F3F0] dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <span className="font-mono text-base font-bold tracking-widest text-[#0F172A] dark:text-white select-all">
                          {referralCode}
                        </span>
                        <button
                          onClick={handleCopyCode}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-slate-800 hover:bg-[#EAE8E5] text-[#0F172A] dark:text-white text-xs font-bold transition-colors cursor-pointer"
                          type="button"
                        >
                          {copiedCode ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#C28E52]" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Referral Link Box */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                        Your Referral Link
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          className="w-full bg-[#F5F3F0] dark:bg-slate-900 text-[#0F172A] dark:text-white text-xs px-3.5 py-2.5 rounded-xl outline-none select-all truncate border border-slate-200 dark:border-slate-800"
                          readOnly
                          type="text"
                          value={referralLink}
                        />
                        <button
                          onClick={handleCopyLink}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white text-xs font-bold shrink-0 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                          type="button"
                        >
                          {copiedLink ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Share Buttons CTA Group */}
                    <div className="space-y-3 pt-2">
                      <button
                        onClick={handleWhatsAppShare}
                        className="w-full py-3.5 px-5 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white font-serif font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer"
                        type="button"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Share on WhatsApp</span>
                      </button>

                      <button
                        onClick={handleNativeShare}
                        className="w-full py-3.5 px-5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                        type="button"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share (All Apps)</span>
                      </button>
                    </div>

                    {/* Visual Architectural Accent Quote Card */}
                    <div className="relative overflow-hidden rounded-xl bg-[#FAF8F5] dark:bg-slate-900 p-5 border border-slate-200/80 dark:border-slate-800">
                      <div className="font-serif font-bold text-sm text-[#0F172A] dark:text-white italic">
                        “Zero Brokerage, Pure Direct Architecture.”
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-normal">
                        Join Mumbai's refined residential collective without middleman margins or unauthorized call center disturbances.
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* 5. Simple 3-Step Guide */}
              <div className="space-y-6 mb-16">
                <div className="max-w-xl">
                  <span className="text-[11px] uppercase tracking-wider text-[#C28E52] font-bold">
                    Direct Program Protocol
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white mt-0.5">
                    How Refer &amp; Earn Works
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Three direct steps to continuously expand your direct owner connection portfolio.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Step 1 */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] dark:bg-slate-800 flex items-center justify-center text-[#C28E52] border border-slate-200/60 dark:border-slate-700">
                        <Send className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                        1. Share Your Link
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Send your referral code or link via WhatsApp or SMS to peers seeking residential or commercial spaces.
                      </p>
                    </div>
                    <div className="pt-2 text-[11px] text-[#C28E52] uppercase tracking-wider font-bold">
                      Step 01 / Initiate
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] dark:bg-slate-800 flex items-center justify-center text-[#0F5132] dark:text-emerald-400 border border-slate-200/60 dark:border-slate-700">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                        2. Friends Sign Up
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Your friends create their account with mobile OTP and begin browsing verified architectural listings directly.
                      </p>
                    </div>
                    <div className="pt-2 text-[11px] text-[#0F5132] dark:text-emerald-400 uppercase tracking-wider font-bold">
                      Step 02 / Authenticate
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white border border-slate-200/60 dark:border-slate-700">
                        <Key className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                        3. Get 5 Free Contacts
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Once 5 friends join, 5 free owner contacts are automatically added to your profile without charges.
                      </p>
                    </div>
                    <div className="pt-2 text-[11px] text-[#0F172A] dark:text-white uppercase tracking-wider font-bold">
                      Step 03 / Unlock
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Bottom Navigation Links & Trust Banner */}
              <div className="space-y-8">
                {/* Navigation Backlinks */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-2">
                  <button
                    onClick={onNavigateUnlockContacts || onBack}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#C28E52]" />
                    <span>Return to Contact Unlock</span>
                  </button>

                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>

                  <button
                    onClick={onNavigatePropertyDetails || onBack}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <Building className="w-4 h-4 text-[#C28E52]" />
                    <span>Back to Property Details</span>
                  </button>
                </div>

                {/* Trust Strip */}
                <div className="w-full bg-[#FAF8F5] dark:bg-slate-900 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-around gap-6 text-center shadow-xs border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-[#0F5132] dark:text-emerald-400 shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                      100% Direct Landlords
                    </span>
                  </div>

                  <div className="hidden md:block h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-[#C28E52] shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                      Zero Brokerage Guaranteed
                    </span>
                  </div>

                  <div className="hidden md:block h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white shrink-0">
                      <Headphones className="w-5 h-5 text-[#C28E52]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                      24x7 Customer Support
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 3. Luxury Architectural Footer */}
      <footer className="w-full bg-[#FAF8F5] dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
            
            <div className="space-y-3 md:col-span-1">
              <div className="font-serif font-bold text-lg text-[#0F172A] dark:text-white">
                NO<span className="text-[#C28E52]">BROKER</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                The peer-to-peer architectural luxury real estate network. Eliminating brokerage with verified ownership and direct client discretion.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Direct Owner Guarantee</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                Portfolios
              </div>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Curated Residences</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Luxury Leases</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Prime Commercial</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer font-bold text-[#C28E52]">Private Referral Circle</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                Concierge
              </div>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">White-Glove Movers</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Digital Rental Agreements</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Estate Management</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Title &amp; Escrow Advisory</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                Governance
              </div>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Privacy Covenant</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Terms of Engagement</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Zero Brokerage Charter</li>
                <li className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">Regulatory Disclosures</li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-400">
            <p>© 2024 NoBroker Direct Technologies. Architectural luxury without intermediation. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C28E52]" />
                <span>Verified Direct Listings</span>
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Commission Assured</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700/80 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
