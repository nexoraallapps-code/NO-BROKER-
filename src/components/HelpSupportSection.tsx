import React, { useState } from 'react';
import {
  Search,
  Plus,
  Minus,
  Home,
  UserX,
  Truck,
  Phone,
  MessageSquare,
  Receipt,
  CheckCircle2,
  X,
  UploadCloud,
  FileText,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  keywords: string;
}

export interface ReportCase {
  id: string;
  ref: string;
  date: string;
  type: string;
  reportedItem: string;
  reason: string;
  userNote: string;
  hasPhoto?: boolean;
  status: 'Under Review' | 'Action Taken' | 'Resolved' | 'Contact Unlocked' | 'Refund Approved' | 'Refund Rejected';
  latestUpdate: string;
  amount?: string;
}

interface HelpSupportSectionProps {
  id?: string;
  onOpenReport?: (type: string, reason: string) => void;
  onOpenPaymentHelp?: () => void;
}

export const HelpSupportSection: React.FC<HelpSupportSectionProps> = ({
  id = 'help-support-section'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Reports state initialized with prompt cases
  const [myReports, setMyReports] = useState<ReportCase[]>([
    {
      id: 'REP-9482',
      ref: '#NB-REP-9482',
      date: 'Today, 10:15 AM',
      type: 'Report Property',
      reportedItem: '3 BHK Bandra West (#NB-7492)',
      reason: 'Broker / Brokerage Demand',
      userNote: 'Owner turned out to be an agent asking for 1 month brokerage fee before site visit.',
      hasPhoto: true,
      status: 'Under Review',
      latestUpdate: 'Our verification officer has called the owner and paused this property from search.'
    },
    {
      id: 'TXN-4921',
      ref: '#NB-TXN-4921',
      date: 'Yesterday, 3:30 PM',
      type: 'Payment Problem',
      reportedItem: '₹250 Contact Unlock (#NB-8810)',
      amount: '₹250',
      reason: '₹250 payment completed but contact not unlocked',
      userNote: 'Amount was debited via UPI but contact details were not displayed.',
      hasPhoto: false,
      status: 'Resolved',
      latestUpdate: 'Payment verified with bank. Contact unlocked and sent to your registered WhatsApp.'
    }
  ]);

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalTitle, setReportModalTitle] = useState('Report Property');
  const [selectedReason, setSelectedReason] = useState('Broker / Brokerage Demand');
  const [reportTargetItem, setReportTargetItem] = useState('');
  const [reportUserNote, setReportUserNote] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isReportSuccess, setIsReportSuccess] = useState(false);
  const [createdReportRef, setCreatedReportRef] = useState('');

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentIssueReason, setPaymentIssueReason] = useState('₹250 payment completed but contact not unlocked');
  const [paymentUserNote, setPaymentUserNote] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [createdPaymentRef, setCreatedPaymentRef] = useState('');

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<ReportCase | null>(null);

  // 8 FAQs as specified in prompt
  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'How No Broker Works',
      answer: 'Connect directly with verified property owners with 0% brokerage. All owner phone numbers and property papers are verified by our team before listing.',
      keywords: 'how no broker works zero brokerage direct owner commission free'
    },
    {
      id: 'faq-2',
      question: 'How to Find a Property',
      answer: 'Type your preferred city or locality in the search bar. Filter by rent, buy, BHK, furnishing status, and budget. Browse high-resolution verified photos and amenities.',
      keywords: 'how to find a property search filter locality rent buy commercial'
    },
    {
      id: 'faq-3',
      question: 'How Owner Contact Works',
      answer: 'Unlocks direct landlord phone numbers and WhatsApp access upon verification. The verified mobile number opens immediately on your screen with zero hassle.',
      keywords: 'how owner contact works phone number whatsapp unlock direct'
    },
    {
      id: 'faq-4',
      question: 'How to Refer & Get More Contacts',
      answer: 'Share your personal referral link with friends and colleagues. When they join or post a property, you receive 5 free contact unlocks credited directly to your profile.',
      keywords: 'how to refer get more contacts bonus credits share whatsapp'
    },
    {
      id: 'faq-5',
      question: 'How to Post a Property FREE',
      answer: 'Click "Post Property FREE" in the top bar. Enter your address, pricing, and upload photos. Our team verifies the listing and publishes it across our network within 30 minutes.',
      keywords: 'how to post a property free landlord owner listing zero fees'
    },
    {
      id: 'faq-6',
      question: 'How Packers & Movers Works',
      answer: 'Get transparent upfront pricing for home shifting. Our verified logistics partners provide 5-ply cartons, bubble wrap, dedicated loading crew, and transit insurance.',
      keywords: 'how packers movers works relocation shifting truck quote'
    },
    {
      id: 'faq-7',
      question: 'Payment & Refund Help',
      answer: 'All transactions on NO BROKER are 100% secure. If an unlocked contact is ever found to be inactive or an unauthorized broker, we issue an immediate unlock credit or full refund.',
      keywords: 'payment refund help money back guarantee 250 contact unlock'
    },
    {
      id: 'faq-8',
      question: 'Safety Tips',
      answer: 'Never send advance token money online prior to physical property inspection and checking original house documents with the owner.',
      keywords: 'safety tips fraud warning token advance scam deposit caution'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.keywords.toLowerCase().includes(q)
    );
  });

  const reportReasonsList = [
    'Broker / Brokerage Demand',
    'Fake Photos / Wrong Location',
    'Wrong Rent',
    'Already Rented',
    'Fraud / Asking Advance',
    'Wrong Information',
    'Bad Packers Service',
    'Other Issue'
  ];

  const paymentProblemReasonsList = [
    '₹250 contact unlock delay',
    'Failed UPI payment',
    '₹500 Packers deposit queries',
    'Payment status not updated',
    'Renewal payment issue'
  ];

  const handleOpenReport = (title: string, defaultReason: string) => {
    setReportModalTitle(title);
    setSelectedReason(defaultReason);
    setReportTargetItem('');
    setReportUserNote('');
    setUploadedFileName(null);
    setIsReportSuccess(false);
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `#NB-REP-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedReportRef(newRef);

    const newCase: ReportCase = {
      id: `REP-${Date.now()}`,
      ref: newRef,
      date: 'Just now',
      type: reportModalTitle,
      reportedItem: reportTargetItem || (reportModalTitle === 'Report Property' ? 'Reported Property Listing' : reportModalTitle === 'Report Broker' ? 'Reported Agent Profile' : 'Packers Business'),
      reason: selectedReason,
      userNote: reportUserNote || 'Report submitted for verification.',
      hasPhoto: !!uploadedFileName,
      status: 'Under Review',
      latestUpdate: 'Your report has been sent to our team. Verification will be completed within 4 hours.'
    };

    setMyReports([newCase, ...myReports]);
    setIsReportSuccess(true);
  };

  const handleOpenPaymentProblem = () => {
    setPaymentIssueReason('₹250 payment completed but contact not unlocked');
    setPaymentUserNote('');
    setIsPaymentSuccess(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `#NB-TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedPaymentRef(newRef);

    const isPacker = paymentIssueReason.includes('500') || paymentIssueReason.includes('Packers');
    const newCase: ReportCase = {
      id: `TXN-${Date.now()}`,
      ref: newRef,
      date: 'Just now',
      type: 'Payment Problem',
      reportedItem: isPacker ? '₹500 Packers Registration' : '₹250 Owner Contact Unlock',
      amount: isPacker ? '₹500' : '₹250',
      reason: paymentIssueReason,
      userNote: paymentUserNote || 'Payment inquiry submitted.',
      hasPhoto: false,
      status: 'Under Review',
      latestUpdate: 'Bank reconciliation request registered. Update will reflect within 15 minutes.'
    };

    setMyReports([newCase, ...myReports]);
    setIsPaymentSuccess(true);
  };

  const handleOpenDetailModal = (c: ReportCase) => {
    setSelectedCase(c);
    setIsDetailModalOpen(true);
  };

  const getStatusBadge = (status: ReportCase['status']) => {
    switch (status) {
      case 'Under Review':
        return 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-300/60';
      case 'Action Taken':
        return 'text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-300/60';
      case 'Resolved':
      case 'Contact Unlocked':
        return 'text-[#0F5132] dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/60';
      case 'Refund Approved':
        return 'text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-950/60 border border-green-300/60';
      case 'Refund Rejected':
        return 'text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-300/60';
      default:
        return 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-300/60';
    }
  };

  return (
    <section
      id={id}
      className="w-full py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#0A0F1D] border-t border-slate-200/80 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* ========================================================================= */}
        {/* HEADER SECTION                                                            */}
        {/* ========================================================================= */}
        <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C28E52]/10 text-[#C28E52] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Resolution &amp; Help Desk</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight">
            Help &amp; Support
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Need help? We are here to help.
          </p>

          {/* Search bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-4 text-slate-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help topics (e.g., refund, owner contact, fake broker)"
                className="w-full pl-11 sm:pl-12 pr-10 py-3 sm:py-3.5 bg-white dark:bg-[#0F172A] rounded-xl text-xs sm:text-sm text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C28E52] border border-slate-200/80 dark:border-slate-800 shadow-sm transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 📱 MOBILE VIEW: Single Column Vertical Flow (Matches Exact Wireframe)      */}
        {/* ========================================================================= */}
        <div className="block lg:hidden space-y-4 max-w-lg mx-auto">
          
          {/* 📖 Quick FAQs */}
          <div className="bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-base" role="img" aria-label="Book">📖</span>
                <h3 className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                  Quick FAQs
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">{filteredFaqs.length} Topics</span>
            </div>

            <div className="space-y-2">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full px-3.5 py-3 flex items-center justify-between text-left text-xs font-semibold text-[#0F172A] dark:text-white cursor-pointer hover:text-[#C28E52]"
                    >
                      <span>{faq.question}</span>
                      <span className="text-[#C28E52] text-xs font-bold shrink-0 ml-2">
                        {isOpen ? '▲' : '▼'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-800 pt-2.5">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🚩 Report an Issue */}
          <div className="bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-base" role="img" aria-label="Flag">🚩</span>
              <h3 className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                Report an Issue
              </h3>
            </div>

            <div className="space-y-2">
              {/* [ 🏠 Report Property > ] */}
              <button
                type="button"
                onClick={() => handleOpenReport('Report Property', 'Fake Photos / Wrong Location')}
                className="w-full p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-left active:scale-[0.99] transition cursor-pointer hover:border-[#C28E52]/60"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🏠</span>
                  <span className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">
                    Report Property
                  </span>
                </div>
                <span className="text-slate-400 text-sm font-bold">&gt;</span>
              </button>

              {/* [ 👤 Report Broker / Fake User > ] */}
              <button
                type="button"
                onClick={() => handleOpenReport('Report Broker', 'Broker / Brokerage Demand')}
                className="w-full p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-left active:scale-[0.99] transition cursor-pointer hover:border-[#C28E52]/60"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">👤</span>
                  <span className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">
                    Report Broker / Fake User
                  </span>
                </div>
                <span className="text-slate-400 text-sm font-bold">&gt;</span>
              </button>

              {/* [ 📦 Report Packers & Movers > ] */}
              <button
                type="button"
                onClick={() => handleOpenReport('Report Packers & Movers', 'Bad Packers Service')}
                className="w-full p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-left active:scale-[0.99] transition cursor-pointer hover:border-[#C28E52]/60"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">📦</span>
                  <span className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">
                    Report Packers &amp; Movers
                  </span>
                </div>
                <span className="text-slate-400 text-sm font-bold">&gt;</span>
              </button>
            </div>
          </div>

          {/* 💳 Payment Problem? */}
          <div className="bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-base" role="img" aria-label="Credit Card">💳</span>
              <h3 className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                Payment Problem?
              </h3>
            </div>

            {/* [ Get Payment Help > ] */}
            <button
              type="button"
              onClick={handleOpenPaymentProblem}
              className="w-full p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-left active:scale-[0.99] transition cursor-pointer hover:border-[#C28E52]/60"
            >
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 text-[#C28E52]" />
                <span className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">
                  Get Payment Help
                </span>
              </div>
              <span className="text-slate-400 text-sm font-bold">&gt;</span>
            </button>
          </div>

          {/* 📋 My Reports (2 Active) */}
          <div className="bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-base" role="img" aria-label="Clipboard">📋</span>
                <h3 className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                  My Reports ({myReports.filter((r) => r.status === 'Under Review' || r.status === 'Action Taken').length || myReports.length} Active)
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              {myReports.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleOpenDetailModal(item)}
                  className="w-full p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-left active:scale-[0.99] transition cursor-pointer hover:border-[#C28E52]/60"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-[#0F172A] dark:text-white">{item.ref}</span>
                    <span className="text-slate-400">•</span>
                    <span className={`font-semibold ${
                      item.status === 'Resolved' || item.status === 'Contact Unlocked' || item.status === 'Refund Approved'
                        ? 'text-[#0F5132] dark:text-emerald-400'
                        : 'text-amber-700 dark:text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <span className="text-slate-400 text-sm font-bold">&gt;</span>
                </button>
              ))}
            </div>
          </div>

          {/* 📞 Contact Support */}
          <div className="bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-base" role="img" aria-label="Phone">📞</span>
                <h3 className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                  Contact Support
                </h3>
              </div>
              <span className="text-[11px] text-slate-500">Mon–Sat, 9 AM – 8 PM</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:+919820154320"
                className="py-2.5 px-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200/60 dark:border-slate-700 active:scale-95 transition cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#C28E52]" />
                <span>Call Support</span>
              </a>

              <a
                href="https://wa.me/919820154320?text=Hello+NoBroker+Support+Team"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#0F5132] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 💻 DESKTOP VIEW: 2-Column Balanced Layout                                 */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: 📖 Quick Help + 📞 Contact Support                         */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 📖 Quick Help — Expandable Accordions */}
            <div className="bg-white dark:bg-[#0F172A] p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-label="Book">📖</span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#0F172A] dark:text-white">
                    Quick Help
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {filteredFaqs.length} {filteredFaqs.length === 1 ? 'Topic' : 'Topics'}
                </span>
              </div>

              <div className="space-y-2.5">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 overflow-hidden transition"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white cursor-pointer hover:text-[#C28E52] transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#C28E52] shrink-0 ml-2" />
                        ) : (
                          <Plus className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-800 pt-2.5">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 📞 Contact Support */}
            <div className="bg-white dark:bg-[#0F172A] p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-label="Phone">📞</span>
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#0F172A] dark:text-white">
                      Contact Support
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Mon–Sat, 9 AM – 8 PM</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-[#0F5132] dark:text-emerald-400 text-xs font-bold">
                  Direct Officers Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href="tel:+919820154320"
                  className="py-3 px-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition border border-slate-200/60 dark:border-slate-700 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#C28E52]" />
                  <span>Call Support (+91 98201 54320)</span>
                </a>

                <a
                  href="https://wa.me/919820154320?text=Hello+NoBroker+Support+Team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Support</span>
                </a>
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: 🚩 Report Issue + 💳 Payment Problem + 📋 My Reports      */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 🚩 Report an Issue */}
            <div className="bg-white dark:bg-[#0F172A] p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-base" role="img" aria-label="Flag">🚩</span>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#0F172A] dark:text-white">
                    Report an Issue
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Flag fake property, unauthorized broker, or packers dispute.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* 🏠 Report Property */}
                <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🏠</span>
                    <div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white">
                        Report Property
                      </h4>
                      <p className="text-[11px] text-slate-500">Fake listing, wrong rent, or already rented</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenReport('Report Property', 'Fake Photos / Wrong Location')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold transition cursor-pointer shrink-0"
                  >
                    Report
                  </button>
                </div>

                {/* 👤 Report Broker / Fake User */}
                <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">👤</span>
                    <div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white">
                        Report Broker / Fake User
                      </h4>
                      <p className="text-[11px] text-slate-500">Asking brokerage commission or fake profile</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenReport('Report Broker', 'Broker / Brokerage Demand')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold transition cursor-pointer shrink-0"
                  >
                    Report
                  </button>
                </div>

                {/* 📦 Report Packers & Movers */}
                <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">📦</span>
                    <div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white">
                        Report Packers &amp; Movers
                      </h4>
                      <p className="text-[11px] text-slate-500">Bad service, wrong price quote, or delay</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenReport('Report Packers & Movers', 'Bad Packers Service')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold transition cursor-pointer shrink-0"
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>

            {/* 💳 Payment Problem? */}
            <div className="bg-white dark:bg-[#0F172A] p-5 sm:p-6 rounded-2xl border-l-4 border-[#C28E52] border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="text-xl">💳</span>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#0F172A] dark:text-white">
                    Payment Problem?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    ₹250 contact unlock delay, failed transaction, or Packers payment issue.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenPaymentProblem}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs sm:text-sm font-serif font-bold transition cursor-pointer"
              >
                Get Payment Help
              </button>
            </div>

            {/* 📋 My Reports */}
            <div className="bg-white dark:bg-[#0F172A] p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-label="Clipboard">📋</span>
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#0F172A] dark:text-white">
                      My Reports
                    </h3>
                    <p className="text-xs text-slate-500">Track current status of submitted cases</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0F5132] dark:text-emerald-400">
                  {myReports.length} {myReports.length === 1 ? 'Case' : 'Cases'}
                </span>
              </div>

              <div className="space-y-3">
                {myReports.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#0F172A] dark:text-white">Case {c.ref}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#0F172A] dark:text-white">{c.type}</p>
                    <p className="text-[11px] text-slate-500">{c.reportedItem}</p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/50 dark:border-slate-800">
                      <span>{c.date}</span>
                      <button
                        type="button"
                        onClick={() => handleOpenDetailModal(c)}
                        className="font-bold text-[#C28E52] hover:underline cursor-pointer"
                      >
                        View Details &gt;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🛠️ MODALS (Report Form, Payment Help, Case Details)                       */}
      {/* ========================================================================= */}

      {/* Modal 1: Report Form */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-3 sm:hidden"></div>

            <button
              type="button"
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isReportSuccess ? (
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                    {reportModalTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Submit report. Our team will verify and take action.
                  </p>
                </div>

                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                      Step 1: Select Reason
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {reportReasonsList.map((reason) => {
                        const isSelected = selectedReason === reason;
                        return (
                          <button
                            key={reason}
                            type="button"
                            onClick={() => setSelectedReason(reason)}
                            className={`p-2 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#0F172A] text-white dark:bg-[#C28E52]'
                                : 'bg-[#F5F3F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {reason}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1">
                      Property, User, or Packers Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={reportTargetItem}
                      onChange={(e) => setReportTargetItem(e.target.value)}
                      placeholder="e.g. 3 BHK Bandra (#NB-7492) or Agent Mobile"
                      className="w-full px-3 py-2 bg-[#F5F3F0] dark:bg-slate-800 rounded-xl text-xs text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C28E52] border border-slate-200/60 dark:border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1">
                      Step 2: Tell us more (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={reportUserNote}
                      onChange={(e) => setReportUserNote(e.target.value)}
                      placeholder="Provide additional details or context..."
                      className="w-full px-3 py-2 bg-[#F5F3F0] dark:bg-slate-800 rounded-xl text-xs text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C28E52] border border-slate-200/60 dark:border-slate-700 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1">
                      Step 3: Attach Proof (Optional)
                    </label>
                    <div className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
                      <UploadCloud className="w-5 h-5 text-[#C28E52] mx-auto mb-1" />
                      <span className="text-xs font-semibold text-[#0F172A] dark:text-white block">
                        {uploadedFileName || 'Attach screenshot (Optional)'}
                      </span>
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadedFileName(e.target.files[0].name);
                          }
                        }}
                        className="mt-1 text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0F172A] file:text-white hover:file:bg-[#C28E52] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsReportModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold shadow-md transition-all cursor-pointer"
                    >
                      Submit Report
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0F5132] flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#0F172A] dark:text-white mb-1">
                  Report Received
                </h4>
                <p className="text-xs font-mono text-[#C28E52] font-bold mb-1">{createdReportRef}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mb-5 leading-relaxed">
                  Your report has been sent to our team.
                </p>
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal 2: Payment Problem Help */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-3 sm:hidden"></div>

            <button
              type="button"
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isPaymentSuccess ? (
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                    Payment Problem?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We will reconcile with bank and resolve your payment issue.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-1 text-xs mb-3">
                  <div className="flex justify-between font-mono font-bold">
                    <span className="text-[#C28E52]">Transaction ID: #NB-TXN-4921</span>
                    <span className="text-[#0F5132] font-sans font-bold">
                      {paymentIssueReason.includes('500') || paymentIssueReason.includes('Packers') ? '₹500.00' : '₹250.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>Payment Date: Yesterday, 3:30 PM</span>
                    <span>Payment Status: Pending Unlock</span>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                      Select Payment Problem
                    </label>
                    <div className="space-y-1.5">
                      {paymentProblemReasonsList.map((reason) => (
                        <label
                          key={reason}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer ${
                            paymentIssueReason === reason
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-[#C28E52] text-[#0F172A] dark:text-white font-semibold'
                              : 'bg-[#F5F3F0] dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment-reason-section"
                            checked={paymentIssueReason === reason}
                            onChange={() => setPaymentIssueReason(reason)}
                            className="accent-[#0F172A]"
                          />
                          <span>{reason}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1">
                      Explain the problem (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={paymentUserNote}
                      onChange={(e) => setPaymentUserNote(e.target.value)}
                      placeholder="e.g. ₹250 debited via UPI but contact details were not shown on screen."
                      className="w-full px-3 py-2 bg-[#F5F3F0] dark:bg-slate-800 rounded-xl text-xs text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C28E52] border border-slate-200/60 dark:border-slate-700 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPaymentModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold shadow-md transition-all cursor-pointer"
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0F5132] flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#0F172A] dark:text-white mb-1">
                  Request Received
                </h4>
                <p className="text-xs font-mono text-[#C28E52] font-bold mb-1">{createdPaymentRef}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mb-5 leading-relaxed">
                  Your request has been sent to our team.
                </p>
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal 3: View Details */}
      {isDetailModalOpen && selectedCase && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-3 sm:hidden"></div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#C28E52]">{selectedCase.ref}</span>
                <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                  {selectedCase.type} Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Status</span>
                  <p className="font-semibold text-[#0F172A] dark:text-white">{selectedCase.status}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusBadge(selectedCase.status)}`}>
                  {selectedCase.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Reported Item</span>
                <p className="font-medium text-[#0F172A] dark:text-white mt-0.5">{selectedCase.reportedItem}</p>
              </div>

              {selectedCase.amount && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Payment Amount</span>
                  <p className="font-medium text-[#0F5132] dark:text-emerald-400 mt-0.5 font-bold">{selectedCase.amount}</p>
                </div>
              )}

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Reason</span>
                <p className="font-medium text-[#0F172A] dark:text-white mt-0.5">{selectedCase.reason}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Date</span>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">{selectedCase.date}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">User Note</span>
                <p className="p-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 text-slate-700 dark:text-slate-300 mt-1 leading-relaxed border border-slate-200/50 dark:border-slate-800">
                  {selectedCase.userNote}
                </p>
              </div>

              {selectedCase.hasPhoto && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Attached Proof</span>
                  <div className="mt-1 p-2 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <FileText className="w-4 h-4 text-[#C28E52]" />
                    <span>evidence_screenshot.png (Attached)</span>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-[#0F5132] dark:text-emerald-300 space-y-0.5">
                <span className="text-[10px] uppercase font-bold block">Latest Support Update</span>
                <p className="leading-relaxed">{selectedCase.latestUpdate}</p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white font-serif font-bold text-xs cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
