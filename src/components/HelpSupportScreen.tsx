import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  ArrowLeft,
  ChevronRight,
  Search,
  Home,
  UserX,
  Truck,
  Phone,
  MessageSquare,
  Plus,
  Minus,
  CheckCircle2,
  X,
  UploadCloud,
  FileText,
  Clock,
  ExternalLink,
  Check,
  HelpCircle,
  AlertTriangle,
  Compass,
  Bookmark,
  Building,
  ChevronDown,
  Receipt,
  CreditCard,
  History,
  AlertCircle
} from 'lucide-react';

interface HelpSupportScreenProps {
  onBack: () => void;
  user: UserProfile;
  onNavigateHome?: () => void;
  onOpenPostProperty?: () => void;
  onOpenReferral?: () => void;
  onNavigateSaved?: () => void;
  onOpenPublicMovers?: () => void;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  keywords: string;
}

interface ReportCase {
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
}

export const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({
  onBack,
  user,
  onNavigateHome,
  onOpenPostProperty,
  onOpenReferral,
  onNavigateSaved,
  onOpenPublicMovers,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Interactive Reports State
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
      reason: '₹250 payment completed but owner contact not unlocked',
      userNote: 'Amount was deducted via UPI but contact details were not showing.',
      hasPhoto: false,
      status: 'Contact Unlocked',
      latestUpdate: 'Payment verified with bank. Owner contact unlocked and sent to your WhatsApp.'
    },
    {
      id: 'LOG-1029',
      ref: '#NB-LOG-1029',
      date: '24 Oct 2025',
      type: 'Report Packers & Movers',
      reportedItem: 'Royal Express Logistics (#NB-PK-4921)',
      reason: 'Bad Packers Service',
      userNote: 'Crew arrived 2 hours late and asked for extra packing charges.',
      hasPhoto: true,
      status: 'Action Taken',
      latestUpdate: 'Warning issued to packers vendor. ₹300 refund processed to your account.'
    }
  ]);

  // Report Modal / Bottom Sheet State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalTitle, setReportModalTitle] = useState('Report Property');
  const [selectedReason, setSelectedReason] = useState('Broker / Brokerage Demand');
  const [reportTargetItem, setReportTargetItem] = useState('');
  const [reportUserNote, setReportUserNote] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isReportSuccess, setIsReportSuccess] = useState(false);
  const [createdReportRef, setCreatedReportRef] = useState('');

  // Payment Problem Modal / Bottom Sheet State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentIssueReason, setPaymentIssueReason] = useState('₹250 payment completed but owner contact not unlocked');
  const [paymentUserNote, setPaymentUserNote] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [createdPaymentRef, setCreatedPaymentRef] = useState('');

  // View Details Modal / Bottom Sheet State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<ReportCase | null>(null);

  // 8 Exact FAQs in Simple Indian English
  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'How No Broker Works',
      answer: 'NO BROKER helps you directly connect with genuine house owners without paying any broker commission. All owner phone numbers and property papers are verified by our team before listing.',
      keywords: 'how no broker works commission zero direct owner search'
    },
    {
      id: 'faq-2',
      question: 'How to Find a Property',
      answer: 'Type your preferred area or city in the search bar. Use filters like BHK, Rent Budget, and Furnished status. You can view clear photos and verified locations of all properties.',
      keywords: 'how to find a property search filter rent buy commercial bhk'
    },
    {
      id: 'faq-3',
      question: 'How Owner Contact Works',
      answer: 'When you find a house you like, click on "Contact Owner". The verified mobile number and direct WhatsApp link of the owner will unlock immediately on your screen.',
      keywords: 'how owner contact works unlock contact phone number whatsapp'
    },
    {
      id: 'faq-4',
      question: 'How to Refer & Get More Contacts',
      answer: 'Share your personal refer link with your friends on WhatsApp. When your friends join or post a property, you get 5 free owner contact unlocks added to your account.',
      keywords: 'how to refer get more contacts refer and earn free contacts credits'
    },
    {
      id: 'faq-5',
      question: 'How to Post a Property FREE',
      answer: 'Click on "Post Property FREE". Enter your house details, rent amount, and upload 3 or more clear photos. We will verify and publish your property for free within 30 minutes.',
      keywords: 'how to post a property free owner listing landlord rent sale'
    },
    {
      id: 'faq-6',
      question: 'How Packers & Movers Works',
      answer: 'You can directly book verified packers and moving trucks with transparent fixed pricing. You get safe packing boxes, dedicated moving staff, and zero hidden charges on moving day.',
      keywords: 'how packers movers works shifting moving home relocation'
    },
    {
      id: 'faq-7',
      question: 'Payment & Refund Help',
      answer: 'All payments made on NO BROKER are 100% safe. If you ever unlock an owner contact that turns out to be an agent or inactive, we will refund your contact unlock immediately.',
      keywords: 'payment refund help 250 contact unlock money back guarantee'
    },
    {
      id: 'faq-8',
      question: 'Safety Tips',
      answer: 'Important safety rule: Never send token money or booking deposits online before visiting the property in person and checking the original house documents with the owner.',
      keywords: 'safety tips advance fraud warning token money gate pass qr code scam'
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
    'Already Rented / Not Available',
    'Fraud / Asking Advance Money',
    'Wrong Information',
    'Bad Packers Service',
    'Other Issue'
  ];

  const paymentProblemReasonsList = [
    '₹250 payment completed but owner contact not unlocked',
    'Payment failed',
    'Payment status not updated',
    '₹500 Packers registration payment issue',
    'Packers membership renewal payment issue'
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
      reportedItem: reportTargetItem || (reportModalTitle === 'Report Property' ? 'Listing #NB-4910' : reportModalTitle === 'Report Broker' ? 'Agent Contact' : 'Moving Vendor'),
      reason: selectedReason,
      userNote: reportUserNote || 'Report submitted by user for verification.',
      hasPhoto: !!uploadedFileName,
      status: 'Under Review',
      latestUpdate: 'Your report has been received. Our team will verify and take action within 4 hours.'
    };

    setMyReports([newCase, ...myReports]);
    setIsReportSuccess(true);
  };

  const handleOpenPaymentProblem = () => {
    setPaymentIssueReason('₹250 payment completed but owner contact not unlocked');
    setPaymentUserNote('');
    setIsPaymentSuccess(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `#NB-TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedPaymentRef(newRef);

    const newCase: ReportCase = {
      id: `TXN-${Date.now()}`,
      ref: newRef,
      date: 'Just now',
      type: 'Payment Problem',
      reportedItem: '₹250 Contact Unlock',
      reason: paymentIssueReason,
      userNote: paymentUserNote || 'Payment query submitted by user.',
      hasPhoto: false,
      status: 'Under Review',
      latestUpdate: 'Bank reconciliation request sent. Contact unlock or refund will update within 15 minutes.'
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
        return 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/50';
      case 'Action Taken':
        return 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border border-blue-300/50';
      case 'Resolved':
      case 'Contact Unlocked':
      case 'Refund Approved':
        return 'bg-emerald-100 text-[#0F5132] dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/50';
      case 'Refund Rejected':
        return 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-300 border border-red-300/50';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-300/50';
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] antialiased selection:bg-[#C28E52]/20 selection:text-[#C28E52] flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 📱 1. MOBILE APP VERSION (Polished Touch-First Vertical Stack)            */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full min-h-screen flex flex-col pb-20">
        
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 w-full z-40 bg-[#FAF8F5]/95 dark:bg-[#0A0F1D]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="h-16 px-4 flex items-center justify-between gap-3">
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center -ml-2 text-[#0F172A] dark:text-white active:scale-95 transition-transform cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-[#0F172A] dark:text-white" />
            </button>

            <div className="flex flex-col items-center">
              <h1 className="font-serif text-base font-bold text-[#0F172A] dark:text-white tracking-tight">
                Help &amp; Support
              </h1>
              <p className="text-[11px] text-[#0F5132] dark:text-emerald-400 font-semibold -mt-0.5">
                Need help? We are here to help.
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold ring-1 ring-[#C28E52]/50">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
          </div>
        </header>

        {/* Mobile Main Body */}
        <main className="flex-1 flex flex-col pt-16 w-full px-4 pt-3 space-y-4">
          
          {/* 1. Search Help Topics */}
          <section className="mt-1">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help topics"
                className="w-full bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-[#C28E52]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </section>

          {/* 2. Quick Help & FAQs Accordions */}
          <section className="bg-white dark:bg-[#0F172A] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                Quick Help &amp; FAQs
              </h2>
              <span className="text-[11px] font-semibold text-slate-500">8 Topics</span>
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
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs font-semibold text-[#0F172A] dark:text-white cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#C28E52] shrink-0 ml-2" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-800 pt-2">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. Report an Issue (3 Cards) */}
          <section className="bg-white dark:bg-[#0F172A] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
            <div>
              <h2 className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                Report an Issue
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Tell us if you found any broker, fake details, or bad service.
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Card 1: Report Property */}
              <div className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white">
                    <Home className="w-4 h-4 text-[#C28E52]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">Report Property</h3>
                    <p className="text-[10px] text-slate-500">Fake listing, wrong rent, or already rented</p>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenReport('Report Property', 'Fake Photos / Wrong Location')}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer shrink-0"
                >
                  Report
                </button>
              </div>

              {/* Card 2: Report Broker */}
              <div className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-red-600">
                    <UserX className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">Report Broker / Fake User</h3>
                    <p className="text-[10px] text-slate-500">Asking brokerage or fake user profile</p>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenReport('Report Broker', 'Broker / Brokerage Demand')}
                  className="px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-bold shadow-2xs cursor-pointer shrink-0"
                >
                  Report
                </button>
              </div>

              {/* Card 3: Report Packers & Movers */}
              <div className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-[#0F5132]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">Report Packers &amp; Movers</h3>
                    <p className="text-[10px] text-slate-500">Bad service, wrong price quote, or delay</p>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenReport('Report Packers & Movers', 'Bad Packers Service')}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer shrink-0"
                >
                  Report
                </button>
              </div>
            </div>
          </section>

          {/* 4. My Reports Section */}
          <section className="bg-white dark:bg-[#0F172A] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                  My Reports
                </h2>
                <p className="text-[11px] text-slate-500">Status of your submitted reports and requests</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold">
                {myReports.length} Active
              </span>
            </div>

            <div className="space-y-2.5">
              {myReports.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0F172A] dark:text-white">{item.ref}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-xs text-[#0F172A] dark:text-white">{item.type}</h4>
                    <p className="text-[11px] text-slate-500">{item.reportedItem}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-500">
                    <span>{item.date}</span>
                    <button
                      onClick={() => handleOpenDetailModal(item)}
                      className="font-bold text-[#C28E52] hover:underline cursor-pointer"
                    >
                      View Details &gt;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Payment Problem? Section */}
          <section className="bg-white dark:bg-[#0F172A] rounded-2xl p-4 border-l-4 border-[#C28E52] border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-[#C28E52] flex items-center justify-center shrink-0">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">Payment Problem?</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  ₹250 contact unlock pending, failed payment, or Packers deposit help.
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenPaymentProblem}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Get Payment Help</span>
            </button>
          </section>

          {/* 6. Contact Support Section */}
          <section className="bg-white dark:bg-[#0F172A] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3 mb-4">
            <div>
              <h2 className="font-serif font-bold text-sm text-[#0F172A] dark:text-white">
                Contact Support
              </h2>
              <p className="text-[11px] text-slate-500">Mon-Sat, 9 AM - 8 PM</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:+919820154320"
                className="py-2.5 px-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200/60 dark:border-slate-700"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Support</span>
              </a>

              <a
                href="https://wa.me/919820154320?text=Hello+NoBroker+Support+Team"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#0F5132] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </section>

        </main>

        {/* Mobile Sticky Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#0A0F1D]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-2px_10px_rgba(15,23,42,0.06)]">
          <div className="h-16 px-4 flex items-center justify-around">
            <button
              onClick={onNavigateHome || onBack}
              className="flex flex-col items-center justify-center text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Compass className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">Explore</span>
            </button>

            <button
              onClick={onNavigateSaved || onBack}
              className="flex flex-col items-center justify-center text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Bookmark className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">Saved</span>
            </button>

            <button
              onClick={() => handleOpenReport('Report Property', 'Broker / Brokerage Demand')}
              className="flex flex-col items-center justify-center text-[#0F172A] dark:text-white -mt-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center shadow-md">
                <AlertCircle className="w-4 h-4 text-[#C28E52]" />
              </div>
              <span className="text-[10px] font-bold text-[#0F172A] dark:text-white mt-0.5">Report</span>
            </button>

            <button
              onClick={onOpenPublicMovers || onBack}
              className="flex flex-col items-center justify-center text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Truck className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">Movers</span>
            </button>

            <button
              className="flex flex-col items-center justify-center text-[#C28E52] cursor-pointer"
            >
              <HelpCircle className="w-5 h-5 text-[#C28E52]" />
              <span className="text-[10px] font-bold text-[#C28E52] mt-0.5">Help</span>
            </button>
          </div>
        </nav>

      </div>

      {/* ========================================================================= */}
      {/* 💻 2. RESPONSIVE WEBSITE VERSION (Balanced Two-Column Premium Layout)     */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex flex-col flex-1 w-full">
        
        {/* Desktop Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
          <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
            
            <div className="flex items-center gap-8">
              <button
                onClick={onNavigateHome || onBack}
                className="flex items-center gap-2 cursor-pointer text-left group"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight uppercase text-[#0F172A] dark:text-white">
                      NO BROKER
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-[#C28E52] font-bold ml-1">
                      LUXE
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    0% Brokerage Escrow
                  </span>
                </div>
              </button>

              <nav className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <button onClick={onNavigateHome || onBack} className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  Buy
                </button>
                <button onClick={onNavigateHome || onBack} className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  Rent
                </button>
                <button onClick={onNavigateHome || onBack} className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  Commercial
                </button>
                <button 
                  onClick={onOpenPublicMovers || onBack}
                  className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Packers &amp; Movers
                </button>
                <button onClick={onOpenReferral || onBack} className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  Refer &amp; Earn
                </button>
                <button 
                  className="px-3 py-2 rounded-lg bg-[#EFEEEB] dark:bg-slate-800 text-[#0F172A] dark:text-white font-bold transition-colors cursor-pointer"
                >
                  Help &amp; Support
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenPostProperty || onBack}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white text-xs font-serif font-bold shadow-[0_4px_16px_rgba(194,142,82,0.25)] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span>Post Property FREE</span>
              </button>

              <div className="flex items-center gap-3 pl-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover shadow-xs ring-1 ring-[#C28E52]/40"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#C28E52] text-white flex items-center justify-center text-xs font-bold">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                )}
              </div>
            </div>

          </div>
        </header>

        {/* Desktop Main Content */}
        <main className="w-full pt-20 bg-[#FBF9F6] dark:bg-[#0A0F1D] min-h-[calc(100vh-20rem)] flex-grow">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
            
            {/* Top Monograph Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-[#0F172A] dark:text-white">Help &amp; Support</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight">
                Help &amp; Support
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Need help? We are here to help.
              </p>
            </div>

            {/* TWO-COLUMN BALANCED DESKTOP GRID */}
            <div className="grid grid-cols-12 gap-8 items-start">
              
              {/* ========================================= */}
              {/* LEFT COLUMN: Search, FAQs, Contact Support */}
              {/* ========================================= */}
              <div className="col-span-7 space-y-6">
                
                {/* 1. Help Search */}
                <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="relative flex items-center">
                    <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search help topics"
                      className="w-full pl-12 pr-10 py-3 bg-[#F5F3F0] dark:bg-slate-900 rounded-xl text-xs sm:text-sm text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C28E52] border border-slate-200/60 dark:border-slate-700"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 text-slate-400 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Quick Help & FAQs */}
                <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="font-serif font-bold text-lg text-[#0F172A] dark:text-white">
                      Quick Help &amp; FAQs
                    </h2>
                    <span className="text-xs text-slate-500 font-semibold">{faqs.length} Topics</span>
                  </div>

                  <div className="space-y-3">
                    {filteredFaqs.map((faq) => {
                      const isOpen = openFaqId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 overflow-hidden"
                        >
                          <button
                            onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white cursor-pointer hover:text-[#C28E52]"
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

                {/* 3. Contact Support */}
                <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                        Contact Support
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">Mon-Sat, 9 AM - 8 PM</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-[#0F5132] dark:text-emerald-400 text-xs font-bold">
                      Direct Officers Available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:+919820154320"
                      className="py-3 px-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 hover:bg-slate-200 text-[#0F172A] dark:text-white text-xs font-bold flex items-center justify-center gap-2 transition border border-slate-200/60 dark:border-slate-700"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Support</span>
                    </a>

                    <a
                      href="https://wa.me/919820154320?text=Hello+NoBroker+Support+Team"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-[#0F5132] hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Support</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* ========================================= */}
              {/* RIGHT COLUMN: Report Issue, Payment, Cases*/}
              {/* ========================================= */}
              <div className="col-span-5 space-y-6">
                
                {/* 1. Report an Issue (3 Cards) */}
                <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                  <div>
                    <h2 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                      Report an Issue
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Flag unverified brokers, fake listings, or moving issues.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Card 1 */}
                    <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-[#C28E52]">
                          <Home className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">Report Property</h3>
                          <p className="text-[11px] text-slate-500">Fake listing, wrong rent, already rented</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenReport('Report Property', 'Fake Photos / Wrong Location')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold transition cursor-pointer"
                      >
                        Report
                      </button>
                    </div>

                    {/* Card 2 */}
                    <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-red-600">
                          <UserX className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">Report Broker / Fake User</h3>
                          <p className="text-[11px] text-slate-500">Demanding brokerage or fake profile</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenReport('Report Broker', 'Broker / Brokerage Demand')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold transition cursor-pointer"
                      >
                        Report
                      </button>
                    </div>

                    {/* Card 3 */}
                    <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-[#0F5132]">
                          <Truck className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-xs text-[#0F172A] dark:text-white">Report Packers &amp; Movers</h3>
                          <p className="text-[11px] text-slate-500">Bad service, wrong price quote, or delay</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenReport('Report Packers & Movers', 'Bad Packers Service')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-bold transition cursor-pointer"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Problem? */}
                <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl border-l-4 border-[#C28E52] border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Receipt className="w-5 h-5 text-[#C28E52] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">Payment Problem?</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ₹250 contact unlock delay, failed transaction, or Packers advance deposit issue.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleOpenPaymentProblem}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0F172A] hover:bg-[#C28E52] text-white text-xs font-serif font-bold transition cursor-pointer"
                  >
                    Get Payment Help
                  </button>
                </div>

                {/* 3. My Reports */}
                <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h2 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                        My Reports
                      </h2>
                      <p className="text-xs text-slate-500">Recent grievance cases</p>
                    </div>
                    <span className="text-xs font-bold text-[#0F5132] dark:text-emerald-400">
                      {myReports.length} Cases
                    </span>
                  </div>

                  <div className="space-y-3">
                    {myReports.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-[#0F172A] dark:text-white">{c.ref}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(c.status)}`}>
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#0F172A] dark:text-white">{c.type}</p>
                        <p className="text-[11px] text-slate-500">{c.reportedItem}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/50 dark:border-slate-800">
                          <span>{c.date}</span>
                          <button
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
        </main>

      </div>

      {/* ========================================================================= */}
      {/* 🛠️ MODALS & BOTTOM SHEETS (Common Across Mobile & Desktop)                */}
      {/* ========================================================================= */}

      {/* Modal 1: Report an Issue Form */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
            
            {/* Mobile Drag Handle */}
            <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-3 sm:hidden"></div>

            <button
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
                    Submit details. Our team will verify and take action.
                  </p>
                </div>

                <form onSubmit={handleReportSubmit} className="space-y-4">
                  
                  {/* STEP 1: Select Reason */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                      Select Reason
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

                  {/* Optional Target / Listing */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1">
                      Property / Phone / Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={reportTargetItem}
                      onChange={(e) => setReportTargetItem(e.target.value)}
                      placeholder="e.g. #NB-8491 or Owner Mobile"
                      className="w-full px-3 py-2 bg-[#F5F3F0] dark:bg-slate-800 rounded-xl text-xs text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C28E52] border border-slate-200/60 dark:border-slate-700"
                    />
                  </div>

                  {/* STEP 2: Details - Tell us more */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1">
                      Tell us more
                    </label>
                    <textarea
                      rows={3}
                      value={reportUserNote}
                      onChange={(e) => setReportUserNote(e.target.value)}
                      placeholder="Describe what happened..."
                      className="w-full px-3 py-2 bg-[#F5F3F0] dark:bg-slate-800 rounded-xl text-xs text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C28E52] border border-slate-200/60 dark:border-slate-700 resize-none"
                    />
                  </div>

                  {/* STEP 3: Proof - Upload Photo / Screenshot */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1">
                      Upload Photo / Screenshot
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

                  {/* STEP 4: Submit Button */}
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
              /* Success State */
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
        <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
            
            {/* Mobile Drag Handle */}
            <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-3 sm:hidden"></div>

            <button
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
                    We will reconcile with the bank and resolve your payment issue.
                  </p>
                </div>

                {/* Existing Transaction Details Card */}
                <div className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-1 text-xs mb-3">
                  <div className="flex justify-between font-mono font-bold text-[#C28E52]">
                    <span>TXN ID: #NB-TXN-4921</span>
                    <span className="text-[#0F5132]">₹250.00</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>Payment Date: Yesterday, 3:30 PM</span>
                    <span>Status: Pending Unlock</span>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1.5">
                      Select Payment Issue
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
                            name="payment-reason"
                            checked={paymentIssueReason === reason}
                            onChange={() => setPaymentIssueReason(reason)}
                            className="accent-[#0F172A]"
                          />
                          <span>{reason}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tell us about the problem */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1">
                      Tell us about the problem (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={paymentUserNote}
                      onChange={(e) => setPaymentUserNote(e.target.value)}
                      placeholder="e.g. Money was deducted from UPI but owner phone number is not showing."
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
              /* Success State */
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

      {/* Modal 3: View Report Details */}
      {isDetailModalOpen && selectedCase && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
            
            {/* Mobile Drag Handle */}
            <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-3 sm:hidden"></div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#C28E52]">{selectedCase.ref}</span>
                <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                  {selectedCase.type} Details
                </h3>
              </div>
              <button
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
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusBadge(selectedCase.status)}`}>
                  {selectedCase.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Reported Item</span>
                <p className="font-medium text-[#0F172A] dark:text-white mt-0.5">{selectedCase.reportedItem}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Selected Reason</span>
                <p className="font-medium text-[#0F172A] dark:text-white mt-0.5">{selectedCase.reason}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Date</span>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">{selectedCase.date}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Your Note</span>
                <p className="p-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 text-slate-700 dark:text-slate-300 mt-1 leading-relaxed border border-slate-200/50 dark:border-slate-800">
                  {selectedCase.userNote}
                </p>
              </div>

              {selectedCase.hasPhoto && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Uploaded Photo</span>
                  <div className="mt-1 p-2 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <FileText className="w-4 h-4 text-[#C28E52]" />
                    <span>evidence-screenshot.png (Attached)</span>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-[#0F5132] dark:text-emerald-300 space-y-0.5">
                <span className="text-[10px] uppercase font-bold block">Latest Support Update</span>
                <p className="leading-relaxed">{selectedCase.latestUpdate}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white font-serif font-bold text-xs"
                >
                  Close Details
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
