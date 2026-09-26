import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Plus, 
  Edit3, 
  Eye, 
  Inbox, 
  RefreshCw, 
  Building2, 
  Truck, 
  Home, 
  Building, 
  Navigation, 
  PackageCheck, 
  Layers, 
  Sparkles, 
  Check, 
  X, 
  Headphones, 
  ExternalLink, 
  CreditCard, 
  ChevronRight, 
  CheckCheck,
  User as UserIcon,
  Warehouse,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  Store,
  Compass,
  Bookmark,
  PlusCircle,
  Menu
} from 'lucide-react';

interface MyPackersBusinessScreenProps {
  onBack: () => void;
  user: UserProfile;
  onNavigateHome?: () => void;
  onOpenPostProperty?: () => void;
  onOpenReferral?: () => void;
  onNavigateSaved?: () => void;
  onOpenPublicMovers?: () => void;
}

interface LeadRequest {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  route: string;
  customerName: string;
  phone: string;
  inventory: string;
  date: string;
  status: 'new' | 'contacted' | 'quoted';
}

export const MyPackersBusinessScreen: React.FC<MyPackersBusinessScreenProps> = ({
  onBack,
  user,
  onNavigateHome,
  onOpenPostProperty,
  onOpenReferral,
  onNavigateSaved,
  onOpenPublicMovers,
}) => {
  // Business State
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Royal Express Packers & Relocations',
    managingPartner: user.name || 'Rajesh Kumar',
    phone: '+91 98201 54320',
    whatsapp: '+91 98201 54320',
    locality: 'Bandra West, Mumbai, Maharashtra',
    depotAddress: 'Plot 14, Turner Road Industrial Estate, Bandra West, Mumbai 400050',
    membershipValidTill: '28 October 2025',
    membershipStatus: 'Active',
    description: 'Professional packing and direct door-to-door relocation service in Mumbai. Experienced staff, high-grade 5-ply corrugated boxes, bubble wrapping, and safe transport with our dedicated fleet of GPS-fitted moving trucks. Direct customer communication without any middleman.',
    coverageClusters: ['Bandra', 'Khar', 'Santacruz', 'Andheri', 'Juhu', 'South Mumbai', 'Powai', 'Navi Mumbai', 'Thane'],
    services: ['Home Shifting', 'Office Shifting', 'Local Shifting', 'Intercity Shifting', 'Packing Services'],
  });

  // Photos State
  const [photos, setPhotos] = useState<Array<{ id: string; url: string; title: string }>>([
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      title: 'Fleet Loading & Transit',
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      title: 'Trained Handling Team',
    },
    {
      id: 'p3',
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      title: 'Safe Packing Materials',
    },
    {
      id: 'p4',
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      title: 'GPS Container Logistics',
    }
  ]);

  // Direct Leads State
  const [leads, setLeads] = useState<LeadRequest[]>([
    {
      id: 'LD-9201',
      title: '3 BHK House Shifting',
      badge: 'Immediate',
      badgeColor: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
      route: 'From Bandra West to Powai',
      customerName: 'Vikram Malhotra',
      phone: '+91 98200 44112',
      inventory: '2 Double beds, 1 Teakwood dining, 65-inch TV, 24 Cartons',
      date: '14 mins ago',
      status: 'new',
    },
    {
      id: 'LD-8904',
      title: '1 BHK Flat Shifting',
      badge: 'In 2 Days',
      badgeColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
      route: 'Khar to Andheri West',
      customerName: 'Ananya Deshmukh',
      phone: '+91 98199 33221',
      inventory: 'Sofa set, Queen bed, Refrigerator, 12 Boxes',
      date: '1 hour ago',
      status: 'new',
    },
    {
      id: 'LD-7411',
      title: 'Office Shifting (12 Desks)',
      badge: 'This Weekend',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      route: 'BKC to Lower Parel',
      customerName: 'Rohan Mehta (Fintech Labs)',
      phone: '+91 99201 88776',
      inventory: '12 Ergonomic chairs, Server rack, 12 Monitors, Filing cabinets',
      date: '3 hours ago',
      status: 'new',
    },
    {
      id: 'LD-6512',
      title: '4 BHK Luxury Penthouse Relocation',
      badge: 'Sunday',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      route: 'Worli Sea Face to Juhu',
      customerName: 'Kavita Singhania',
      phone: '+91 98211 99002',
      inventory: 'Italian marble tables, Piano, 40 5-ply cartons, Artwork with crate pack',
      date: '5 hours ago',
      status: 'new',
    },
  ]);

  // Modals State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit form state
  const [editFormData, setEditFormData] = useState({ ...businessInfo });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusinessInfo({ ...editFormData });
    setIsEditModalOpen(false);
    showToast('✅ Business Profile details updated successfully!');
  };

  const handleRenewSuccess = () => {
    setBusinessInfo((prev) => ({
      ...prev,
      membershipValidTill: '28 October 2026 (Renewed)',
      membershipStatus: 'Active',
    }));
    setIsRenewModalOpen(false);
    showToast('🎉 Membership renewed successfully for 1 Year (₹500 paid)!');
  };

  const handleMarkLeadContacted = (id: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: 'contacted' } : l));
    showToast('Lead marked as Contacted!');
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl) return;
    const item = {
      id: `p-${Date.now()}`,
      url: newPhotoUrl,
      title: newPhotoTitle || 'Verified Fleet Vehicle',
    };
    setPhotos([...photos, item]);
    setNewPhotoUrl('');
    setNewPhotoTitle('');
    setIsPhotosModalOpen(false);
    showToast('📸 New moving photo added to gallery!');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0A0F1D] text-[#1B1C1A] dark:text-[#F1F5F9] antialiased selection:bg-[#C28E52]/20 selection:text-[#C28E52] flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 📱 MOBILE VIEW: Native Touch Optimized Layout (Visible on sm & mobile screens) */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full min-h-screen flex flex-col pb-20">
        
        {/* Mobile Fixed Top Bar */}
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#FBF9F6]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                aria-label="Go back"
                className="w-10 h-10 flex items-center justify-center text-[#1B1C1A] dark:text-white active:scale-95 transition-transform cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-[#0F172A] dark:text-white" />
              </button>

              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-sm tracking-wider uppercase text-[#0F172A] dark:text-white">
                  NB
                </span>
                <span className="h-3.5 w-px bg-slate-300 dark:bg-slate-700"></span>
                <h1 className="font-serif text-sm font-bold text-[#0F172A] dark:text-white tracking-tight truncate max-w-[140px]">
                  Packers Business
                </h1>
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0F5132] dark:text-emerald-400 font-bold text-[10px] uppercase">
                  <CheckCircle2 className="w-3 h-3 text-[#0F5132]" />
                  Verified
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#C28E52]/40"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#C28E52] text-white flex items-center justify-center text-xs font-bold">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Main Body */}
        <div className="flex-1 flex flex-col pt-16 w-full">
          
          {/* Top Partner Banner & Status */}
          <div className="px-4 py-2.5 flex items-center justify-between bg-[#F5F3F0] dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0F5132] animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider text-[#0F5132] dark:text-emerald-400 font-bold">
                Active Partner Portal
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Partner ID: NB-PK-4092</span>
          </div>

          {/* Business Profile Header Section */}
          <div className="px-4 pt-4 pb-4 flex flex-col gap-3.5 bg-white dark:bg-[#0F172A]">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  src={photos[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                  alt="Royal Express Logistics Vehicle & Crew"
                  className="w-20 h-20 rounded-xl object-cover shadow-sm border border-slate-200 dark:border-slate-800"
                />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0F5132] text-white flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0F5132] dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#0F5132]" />
                    Active • Verified Partner
                  </span>
                </div>
                <h2 className="text-base font-serif font-bold text-[#0F172A] dark:text-white leading-tight truncate">
                  {businessInfo.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 truncate">
                  <UserIcon className="w-3.5 h-3.5 text-[#C28E52]" />
                  <span>{businessInfo.managingPartner} (Managing Partner)</span>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#C28E52]" />
                  <span>{businessInfo.locality}</span>
                </p>
              </div>
            </div>

            {/* Quick Buttons Side-by-Side */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => {
                  setEditFormData({ ...businessInfo });
                  setIsEditModalOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 active:bg-slate-200 transition-colors shadow-2xs cursor-pointer"
                type="button"
              >
                <Edit3 className="w-4 h-4 text-[#C28E52]" />
                <span>Edit Business</span>
              </button>

              <button
                onClick={onOpenPublicMovers || onBack}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 active:bg-slate-200 transition-colors shadow-2xs cursor-pointer"
                type="button"
              >
                <Eye className="w-4 h-4" />
                <span>View Profile</span>
              </button>
            </div>
          </div>

          <div className="h-2 w-full bg-[#F5F3F0] dark:bg-slate-900"></div>

          {/* Membership Card */}
          <div className="px-4 py-4 bg-white dark:bg-[#0F172A]">
            <div className="p-4 rounded-2xl bg-[#0F172A] text-[#FAF8F5] shadow-md relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#C28E52]/20 blur-xl pointer-events-none"></div>

              <div className="flex items-center justify-between relative z-10 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#C28E52]">
                    <Sparkles className="w-5 h-5 text-[#C28E52]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-white leading-tight">Packers Membership</h3>
                    <p className="text-[10px] text-white/70">Annual Verified Direct Badge</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#0F5132] text-white text-[10px] font-bold tracking-wide uppercase">
                  {businessInfo.membershipStatus}
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 my-2 flex items-center justify-between relative z-10 border border-white/10">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/60 uppercase">Validity</span>
                  <span className="text-xs font-bold text-white">Valid Till: {businessInfo.membershipValidTill}</span>
                </div>
                <Calendar className="w-4 h-4 text-white/50" />
              </div>

              <div className="pt-2 relative z-10">
                <button
                  onClick={() => setIsRenewModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white text-xs font-serif font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
                  type="button"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Renew Membership – ₹500</span>
                </button>
                <p className="text-center text-[10px] text-white/70 mt-2">
                  0% commission on moves. Unlimited direct customer calls.
                </p>
              </div>
            </div>
          </div>

          <div className="h-2 w-full bg-[#F5F3F0] dark:bg-slate-900"></div>

          {/* New Shift Requests (Leads Section) */}
          <div className="px-4 py-4 bg-white dark:bg-[#0F172A]">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-serif font-bold text-[#0F172A] dark:text-white">New Shift Requests</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-bold">
                  {leads.length} New Requests
                </span>
              </div>
              <button
                onClick={() => setIsLeadsModalOpen(true)}
                className="text-[11px] text-[#C28E52] font-bold uppercase tracking-wider flex items-center gap-0.5 cursor-pointer"
              >
                See All
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mini Inquiry Preview Cards */}
            <div className="space-y-2.5">
              {leads.slice(0, 2).map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setIsLeadsModalOpen(true)}
                  className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 shadow-2xs flex flex-col gap-1.5 border border-slate-200/60 dark:border-slate-800 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white flex items-center justify-center shrink-0">
                        <Truck className="w-4 h-4 text-[#C28E52]" />
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">{lead.title}</h4>
                        <p className="text-[10px] text-slate-500">Direct Enquiry #{lead.id}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${lead.badgeColor}`}>
                      {lead.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs pt-1">
                    <span className="font-semibold text-[#0F172A] dark:text-white truncate">{lead.route}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lead.date}
                    </span>
                    <span className="text-[#0F5132] dark:text-emerald-400 font-bold flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Verified Contact Ready
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Prominent Action Button */}
            <button
              onClick={() => setIsLeadsModalOpen(true)}
              className="w-full mt-3 py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#0F5132] text-white text-xs font-serif font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              type="button"
            >
              <Inbox className="w-4 h-4" />
              <span>View Leads ({leads.length} Available)</span>
            </button>
          </div>

          <div className="h-2 w-full bg-[#F5F3F0] dark:bg-slate-900"></div>

          {/* Business Information Section */}
          <div className="px-4 py-4 flex flex-col gap-3 bg-white dark:bg-[#0F172A]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-[#0F172A] dark:text-white">Business Information</h3>
              <span className="text-[10px] text-[#0F5132] dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Visible to Customers
              </span>
            </div>

            {/* Contact Tiles */}
            <div className="grid grid-cols-1 gap-2">
              <a
                href={`tel:${businessInfo.phone}`}
                className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 shadow-2xs flex items-center justify-between active:bg-slate-200 transition-colors border border-slate-200/60 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0F172A] text-white flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Direct Mobile Number</p>
                    <p className="text-xs font-serif font-bold text-[#0F172A] dark:text-white">{businessInfo.phone}</p>
                  </div>
                </div>
                <span className="text-xs text-[#C28E52] font-bold uppercase tracking-wider">Dial</span>
              </a>

              <a
                href={`https://wa.me/${businessInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 shadow-2xs flex items-center justify-between active:bg-slate-200 transition-colors border border-slate-200/60 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0F5132] text-white flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">WhatsApp Support Line</p>
                    <p className="text-xs font-serif font-bold text-[#0F172A] dark:text-white">{businessInfo.whatsapp}</p>
                  </div>
                </div>
                <span className="text-xs text-[#0F5132] dark:text-emerald-400 font-bold uppercase tracking-wider">Chat</span>
              </a>
            </div>

            {/* Operational City & Service Areas */}
            <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-2 border border-slate-200/60 dark:border-slate-800">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Base City</p>
                <p className="text-xs font-bold text-[#0F172A] dark:text-white flex items-center gap-1 mt-0.5">
                  <Warehouse className="w-3.5 h-3.5 text-[#C28E52]" />
                  <span>Mumbai, Maharashtra</span>
                </p>
              </div>
              <div className="pt-1">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Service Areas in City</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {businessInfo.coverageClusters.join(', ')}
                </p>
              </div>
            </div>

            {/* Services Offered */}
            <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-1.5 border border-slate-200/60 dark:border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Verified Services Provided</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {businessInfo.services.map((srv) => (
                  <span
                    key={srv}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white text-[11px] font-bold border border-slate-200 dark:border-slate-700"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Moving Fleet Gallery Preview */}
            <div className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-2 border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Moving Fleet &amp; Team Gallery</p>
                <button onClick={() => setIsPhotosModalOpen(true)} className="text-[10px] text-[#C28E52] font-bold">
                  Manage Photos
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {photos.slice(0, 3).map((ph) => (
                  <div key={ph.id} className="relative rounded-lg overflow-hidden h-20 shadow-2xs">
                    <img src={ph.url} alt={ph.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-2 w-full bg-[#F5F3F0] dark:bg-slate-900"></div>

          {/* Business Management Actions List */}
          <div className="px-4 py-4 flex flex-col gap-2.5 bg-white dark:bg-[#0F172A]">
            <h3 className="text-sm font-serif font-bold text-[#0F172A] dark:text-white mb-0.5">Business Management</h3>
            
            <div className="rounded-2xl bg-[#F5F3F0] dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 overflow-hidden flex flex-col divide-y divide-slate-200/60 dark:divide-slate-800">
              
              <button
                onClick={() => setIsLeadsModalOpen(true)}
                className="w-full p-3.5 flex items-center justify-between text-left active:bg-slate-200 dark:active:bg-slate-800 transition-colors cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white flex items-center justify-center">
                    <Inbox className="w-4 h-4 text-[#C28E52]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A] dark:text-white">View Leads</p>
                    <p className="text-[10px] text-slate-500">Access client calls and shift requests</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setEditFormData({ ...businessInfo });
                  setIsEditModalOpen(true);
                }}
                className="w-full p-3.5 flex items-center justify-between text-left active:bg-slate-200 dark:active:bg-slate-800 transition-colors cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white flex items-center justify-center">
                    <Edit3 className="w-4 h-4 text-[#0F172A] dark:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A] dark:text-white">Edit Business</p>
                    <p className="text-[10px] text-slate-500">Update service areas, contacts, and photos</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => setIsRenewModalOpen(true)}
                className="w-full p-3.5 flex items-center justify-between text-left active:bg-slate-200 dark:active:bg-slate-800 transition-colors cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#C28E52]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A] dark:text-white">Renew Membership</p>
                    <p className="text-[10px] text-slate-500">Keep partner listing active at ₹500/year</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={onOpenPublicMovers || onBack}
                className="w-full p-3.5 flex items-center justify-between text-left active:bg-slate-200 dark:active:bg-slate-800 transition-colors cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white flex items-center justify-center">
                    <Store className="w-4 h-4 text-[#0F5132]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A] dark:text-white">View Business Profile</p>
                    <p className="text-[10px] text-slate-500">Preview how customers see your company</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

            </div>
          </div>

          {/* Trust Footer Note */}
          <div className="px-4 py-5 text-center bg-white dark:bg-[#0F172A]">
            <div className="inline-flex items-center gap-1.5 text-[#0F5132] dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>NO BROKER 100% Direct Movers Guarantee • Zero Middlemen</span>
            </div>
          </div>

        </div>

        {/* Mobile Fixed Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 w-full z-50 bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-[0_-2px_12px_rgba(0,0,0,0.03)]">
          <div className="h-16 px-2 grid grid-cols-5 items-center justify-items-center">
            
            <button
              onClick={onNavigateHome || onBack}
              className="w-full h-full flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Compass className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-none">Explore</span>
            </button>

            <button
              onClick={onNavigateSaved || onBack}
              className="w-full h-full flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Bookmark className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-none">Saved</span>
            </button>

            <button
              onClick={onOpenPostProperty || onBack}
              className="w-full h-full flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shadow-2xs">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium leading-none">Post Free</span>
            </button>

            <button
              className="relative w-full h-full flex flex-col items-center justify-center gap-0.5 transition-colors text-[#C28E52] font-bold cursor-pointer"
            >
              <span className="relative">
                <Truck className="w-5 h-5 text-[#C28E52]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C28E52]"></span>
              </span>
              <span className="text-[10px] font-bold leading-none">Movers</span>
            </button>

            <button
              onClick={onOpenReferral || onBack}
              className="w-full h-full flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-none">Menu</span>
            </button>

          </div>
        </nav>

      </div>

      {/* ========================================================================= */}
      {/* 💻 DESKTOP VIEW: Multi-Column Vendor Management Portal (Hidden on mobile) */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col flex-1 w-full">
        
        {/* Desktop Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
          <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
            
            <div className="flex items-center gap-8">
              <button
                onClick={onNavigateHome || onBack}
                className="flex items-center gap-2 cursor-pointer text-left group"
              >
                <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight uppercase text-[#0F172A] dark:text-white">
                  NO<span className="text-[#C28E52]">BROKER</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#EFEEEB] dark:bg-slate-800 text-[#0F5132] dark:text-emerald-400 font-bold text-[10px] tracking-widest uppercase">
                  Verified
                </span>
              </button>

              <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
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
                  className="px-3 py-2 rounded-lg bg-[#EFEEEB] dark:bg-slate-800 text-[#0F172A] dark:text-white font-bold transition-colors cursor-pointer"
                >
                  Packers &amp; Movers
                </button>
                <button onClick={onOpenReferral || onBack} className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  Refer &amp; Earn
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenPostProperty || onBack}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#0F5132] text-white text-xs font-bold shadow-[0_4px_16px_rgba(15,81,50,0.15)] hover:bg-[#0F172A] transition-all cursor-pointer"
              >
                Post Property FREE
              </button>

              <div className="flex items-center gap-3 pl-2 group">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white leading-tight">
                    My Account
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight">
                    Verified Owner
                  </span>
                </div>
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
          <div className="flex flex-col w-full">
            
            <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-16">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C28E52]/5 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute top-32 left-10 w-80 h-80 bg-[#0F5132]/5 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                <button onClick={onNavigateHome || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <button onClick={onOpenPublicMovers || onBack} className="hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer">
                  Packers &amp; Movers
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-[#0F172A] dark:text-white">My Packers Business</span>
              </nav>

              {/* Title Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#EFEEEB] dark:bg-slate-800 text-[11px] tracking-wider uppercase text-[#0F5132] dark:text-emerald-400 font-bold">
                      Direct Vendor Portal
                    </span>
                    <span className="inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                      Listing ID: #NB-PK-4921
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight">
                    Packers Business
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                    Manage your registered moving company profile, direct customer inquiries, and annual verified membership.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={onOpenPublicMovers || onBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold shadow-xs hover:bg-slate-200 transition-all cursor-pointer"
                    type="button"
                  >
                    <Eye className="w-4 h-4 text-[#C28E52]" />
                    <span>View Public Listing</span>
                  </button>

                  <button
                    onClick={() => setIsLeadsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#0F5132] text-white text-xs font-serif font-bold shadow-[0_8px_20px_rgba(15,23,42,0.18)] transition-all cursor-pointer"
                    type="button"
                  >
                    <Inbox className="w-4 h-4" />
                    <span>View Leads</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#C28E52] text-white text-[10px] leading-none font-bold">
                      {leads.length} New
                    </span>
                  </button>
                </div>
              </div>

              {/* Top Business Header Card */}
              <div className="mt-4 rounded-2xl bg-white dark:bg-[#0F172A] p-6 lg:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#F5F3F0] dark:bg-slate-900 rounded-full pointer-events-none -z-0"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="relative shrink-0">
                      <img
                        src={photos[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                        alt="Royal Express Movers Fleet"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-md border border-slate-100 dark:border-slate-800"
                      />
                      <div className="absolute -bottom-1 -right-1 p-1.5 bg-[#0F5132] text-white rounded-full shadow-sm flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-white tracking-tight">
                          {businessInfo.name}
                        </h2>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-[#0F5132] dark:text-emerald-400 text-xs font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F5132] animate-pulse"></span>
                          Active • Open for Inquiries
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <UserIcon className="w-4 h-4 text-[#C28E52]" />
                          <span className="font-semibold text-[#0F172A] dark:text-white">{businessInfo.managingPartner}</span> (Managing Partner)
                        </div>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#C28E52]" />
                          <span>{businessInfo.locality}</span>
                        </div>
                      </div>

                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold border border-slate-200/60 dark:border-slate-700">
                          <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                          Verified Direct Partner • 0% Commission
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex flex-wrap lg:flex-col sm:flex-row gap-2.5 shrink-0 self-start lg:self-center">
                    <button
                      onClick={() => {
                        setEditFormData({ ...businessInfo });
                        setIsEditModalOpen(true);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 hover:bg-slate-200 text-[#0F172A] dark:text-white text-xs font-bold transition-colors cursor-pointer"
                      type="button"
                    >
                      <Edit3 className="w-4 h-4 text-[#C28E52]" />
                      <span>Edit Business</span>
                    </button>

                    <button
                      onClick={onOpenPublicMovers || onBack}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 hover:bg-slate-200 text-[#0F172A] dark:text-white text-xs font-bold transition-colors cursor-pointer"
                      type="button"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Public Profile</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Two-Column Grid */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT: Information & Photos (8 cols) */}
                <div className="lg:col-span-8 space-y-8">
                  
                  {/* Section 01: Profile Details */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                      <div>
                        <span className="text-[10px] text-[#C28E52] font-bold uppercase tracking-wider">
                          01. Profile Details
                        </span>
                        <h3 className="text-xl font-serif font-bold text-[#0F172A] dark:text-white mt-0.5">
                          Business Information
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Details shown to customers looking for shifting in your area
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setEditFormData({ ...businessInfo });
                          setIsEditModalOpen(true);
                        }}
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-800 text-xs text-[#0F172A] dark:text-white font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C28E52]" />
                        <span>Modify Details</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="p-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-1.5 border border-slate-200/60 dark:border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Direct Mobile Number
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                            {businessInfo.phone}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#0F5132] text-[10px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Primary line for direct customer telephone calls
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-1.5 border border-slate-200/60 dark:border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          WhatsApp Number
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                            {businessInfo.whatsapp}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#0F5132] text-white text-[10px] font-bold flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            WhatsApp Ready
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Customers send room photos and inventory lists directly
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-1.5 md:col-span-2 border border-slate-200/60 dark:border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Registered City &amp; Central Hub
                        </div>
                        <div className="flex items-center gap-2 text-[#0F172A] dark:text-white text-sm font-bold">
                          <Warehouse className="w-4 h-4 text-[#C28E52]" />
                          <span>Mumbai (Main Depot: Bandra West)</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {businessInfo.depotAddress}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-2 md:col-span-2 border border-slate-200/60 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                            Service Coverage Areas
                          </div>
                          <span className="text-[11px] text-[#0F5132] dark:text-emerald-400 font-bold">
                            {businessInfo.coverageClusters.length} Active Mumbai Clusters
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {businessInfo.coverageClusters.map((cluster) => (
                            <span
                              key={cluster}
                              className="px-3 py-1 rounded-lg bg-white dark:bg-[#0F172A] text-xs font-semibold text-[#0F172A] dark:text-white border border-slate-200 dark:border-slate-800 shadow-2xs"
                            >
                              {cluster}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-2 md:col-span-2 border border-slate-200/60 dark:border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Services Offered
                        </div>
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {businessInfo.services.map((srv, idx) => (
                            <div
                              key={srv}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-800 shadow-2xs"
                            >
                              {idx === 0 && <Home className="w-3.5 h-3.5 text-[#C28E52]" />}
                              {idx === 1 && <Building className="w-3.5 h-3.5 text-[#C28E52]" />}
                              {idx === 2 && <Truck className="w-3.5 h-3.5 text-[#C28E52]" />}
                              {idx === 3 && <Navigation className="w-3.5 h-3.5 text-[#C28E52]" />}
                              {idx >= 4 && <PackageCheck className="w-3.5 h-3.5 text-[#C28E52]" />}
                              <span>{srv}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-2 md:col-span-2 border border-slate-200/60 dark:border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Company Narrative / Description
                        </div>
                        <p className="text-xs text-[#0F172A] dark:text-slate-300 leading-relaxed">
                          {businessInfo.description}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Section 02: Business Photos */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                      <div>
                        <span className="text-[10px] text-[#C28E52] font-bold uppercase tracking-wider">
                          02. Verified Fleet &amp; Team Gallery
                        </span>
                        <h3 className="text-xl font-serif font-bold text-[#0F172A] dark:text-white mt-0.5">
                          Business Photos
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          High-resolution moving equipment and verified shifting crew photos
                        </p>
                      </div>

                      <button
                        onClick={() => setIsPhotosModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-serif font-bold hover:bg-[#0F5132] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Manage Photos</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {photos.slice(0, 3).map((photo) => (
                        <div
                          key={photo.id}
                          className="group relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-[4/3] shadow-xs border border-slate-200/70 dark:border-slate-800"
                        >
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-transparent to-transparent flex items-end p-3">
                            <span className="text-xs text-white font-bold">
                              {photo.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0F5132]" />
                        <span>All photos reviewed and approved by NO BROKER Verification Desk.</span>
                      </div>
                      <span className="font-bold text-[#0F172A] dark:text-white">{photos.length} uploaded</span>
                    </div>
                  </div>

                </div>

                {/* RIGHT: Membership & Leads (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Membership Card */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[#0F5132]" />
                        <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                          Packers Membership
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0F5132] dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        {businessInfo.membershipStatus}
                      </span>
                    </div>

                    <div className="mt-5 p-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 space-y-2 border border-slate-200/60 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Subscription Period</span>
                        <span className="text-[#0F172A] dark:text-white font-bold">Annual Listing</span>
                      </div>
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#0F5132]" />
                        <span>Valid Till: {businessInfo.membershipValidTill}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                      Your business is verified and visible to thousands of people shifting homes every week in Mumbai.
                    </p>

                    <div className="mt-6 pt-2 space-y-3">
                      <button
                        onClick={() => setIsRenewModalOpen(true)}
                        className="w-full py-3 px-4 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-serif font-bold text-xs shadow-[0_4px_16px_rgba(194,142,82,0.25)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        type="button"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Renew Membership – ₹500</span>
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-400">
                        <Shield className="w-3.5 h-3.5 text-[#0F5132]" />
                        <span>₹500 annual direct listing fee. No commission on moves.</span>
                      </div>
                    </div>
                  </div>

                  {/* Leads Section */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                          New Shift Requests
                        </h3>
                        <p className="text-xs text-slate-500">
                          Direct customer leads in your radius
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#0F172A] text-white text-[10px] font-bold">
                        {leads.length} New Today
                      </span>
                    </div>

                    <div className="space-y-3 mt-4">
                      {leads.slice(0, 3).map((lead) => (
                        <div
                          key={lead.id}
                          onClick={() => setIsLeadsModalOpen(true)}
                          className="p-3.5 rounded-xl bg-[#F5F3F0] dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-800"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#0F172A] dark:text-white">
                              {lead.title}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${lead.badgeColor}`}>
                              {lead.badge}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                            <Truck className="w-3.5 h-3.5 text-[#C28E52]" />
                            <span>{lead.route}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 space-y-2">
                      <button
                        onClick={() => setIsLeadsModalOpen(true)}
                        className="w-full py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#0F5132] text-white font-serif font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        type="button"
                      >
                        <Inbox className="w-4 h-4" />
                        <span>View All Leads ({leads.length})</span>
                      </button>
                      <p className="text-[11px] text-slate-400 text-center pt-1">
                        Direct inquiries from genuine verified customers. No broker cuts.
                      </p>
                    </div>
                  </div>

                  {/* Quick Business Actions Menu */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-[#C28E52]" />
                      <h3 className="font-serif font-bold text-base text-[#0F172A] dark:text-white">
                        Quick Business Actions
                      </h3>
                    </div>

                    <div className="space-y-1.5">
                      
                      <button
                        onClick={() => {
                          setEditFormData({ ...businessInfo });
                          setIsEditModalOpen(true);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white group-hover:bg-[#0F5132] group-hover:text-white transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#0F172A] dark:text-white">Edit Business</div>
                            <div className="text-[10px] text-slate-500">Update contact numbers, services, coverage</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F172A] transition-colors" />
                      </button>

                      <button
                        onClick={onOpenPublicMovers || onBack}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white group-hover:bg-[#0F5132] group-hover:text-white transition-colors">
                            <Eye className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#0F172A] dark:text-white">View Business Profile</div>
                            <div className="text-[10px] text-slate-500">See how your company looks to customers</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F172A] transition-colors" />
                      </button>

                      <button
                        onClick={() => setIsLeadsModalOpen(true)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white group-hover:bg-[#0F5132] group-hover:text-white transition-colors">
                            <Inbox className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#0F172A] dark:text-white">View Leads ({leads.length})</div>
                            <div className="text-[10px] text-slate-500">Open direct shift inquiries inbox</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F172A] transition-colors" />
                      </button>

                      <button
                        onClick={() => setIsRenewModalOpen(true)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white group-hover:bg-[#0F5132] group-hover:text-white transition-colors">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#0F172A] dark:text-white">Renew Membership</div>
                            <div className="text-[10px] text-slate-500">Extend validity for ₹500/year</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F172A] transition-colors" />
                      </button>

                      <button
                        onClick={() => setIsSupportModalOpen(true)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F3F0] dark:hover:bg-slate-800 transition-colors text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#F5F3F0] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white group-hover:bg-[#0F5132] group-hover:text-white transition-colors">
                            <Headphones className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#0F172A] dark:text-white">Call Support Helpline</div>
                            <div className="text-[10px] text-slate-500">Need help? Speak to NO BROKER team</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F172A] transition-colors" />
                      </button>

                    </div>
                  </div>

                  {/* Direct Guarantee Note */}
                  <div className="rounded-2xl p-5 bg-[#F5F3F0] dark:bg-slate-900/80 flex items-start gap-3.5 border border-slate-200/60 dark:border-slate-800">
                    <ShieldCheck className="w-6 h-6 text-[#0F5132] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white">
                        100% Zero-Commission Pledge
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Every relocation order belongs completely to you. NO BROKER never cuts a percentage or intervenes in pricing between you and the customer.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </main>

      </div>

      {/* ========================================================================= */}
      {/* 🛠️ MODALS: Interactive Dialogs for Both Desktop & Mobile */}
      {/* ========================================================================= */}

      {/* Modal 1: Edit Business Details */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C28E52] font-bold">Vendor Profile</span>
                <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">Edit Business Details</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0F172A] dark:text-white block mb-1">Company Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F3F0] dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#0F172A] dark:text-white block mb-1">Direct Mobile</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F5F3F0] dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0F172A] dark:text-white block mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={editFormData.whatsapp}
                    onChange={(e) => setEditFormData({ ...editFormData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F5F3F0] dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] dark:text-white block mb-1">Depot / Hub Address</label>
                <input
                  type="text"
                  value={editFormData.depotAddress}
                  onChange={(e) => setEditFormData({ ...editFormData, depotAddress: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F3F0] dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] dark:text-white block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F5F3F0] dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0F172A] hover:bg-[#0F5132] text-white text-xs font-serif font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: View Leads Inbox */}
      {isLeadsModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#0F5132] font-bold">Direct Customer Inquiries</span>
                <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">Customer Leads Inbox ({leads.length})</h3>
              </div>
              <button
                onClick={() => setIsLeadsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {leads.map((lead) => (
                <div key={lead.id} className="p-4 rounded-xl bg-[#F5F3F0] dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-serif font-bold text-[#0F172A] dark:text-white">{lead.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${lead.badgeColor}`}>{lead.badge}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C28E52]" />
                        <span>{lead.route}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-slate-400">{lead.date}</span>
                  </div>

                  <div className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-[#0F172A] p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-800">
                    <span className="font-bold text-slate-500 block text-[10px] uppercase">Inventory Summary</span>
                    {lead.inventory}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs">
                      <span className="text-slate-500">Customer: </span>
                      <strong className="text-[#0F172A] dark:text-white">{lead.customerName}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${lead.phone}`}
                        onClick={() => handleMarkLeadContacted(lead.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#C28E52]"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Customer</span>
                      </a>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello+${encodeURIComponent(lead.customerName)}%2C+this+is+${encodeURIComponent(businessInfo.name)}+regarding+your+shifting+request+for+${encodeURIComponent(lead.route)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#0F5132] text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-800"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setIsLeadsModalOpen(false)}
                className="px-5 py-2.5 bg-[#0F172A] text-white text-xs font-serif font-bold rounded-xl"
              >
                Close Inbox
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Renew Membership (₹500) */}
      {isRenewModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C28E52] font-bold">Annual Verification</span>
                <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">Renew Annual Membership</h3>
              </div>
              <button
                onClick={() => setIsRenewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 my-2">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0F5132] dark:text-emerald-400">1-Year Direct Verified Partner</span>
                  <span className="font-serif font-bold text-base text-[#0F172A] dark:text-white">₹500 / year</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Unlimited customer leads, direct phone/WhatsApp contacts, verified badge, and 0% commission on all moves.
                </p>
              </div>

              <div className="p-3 bg-[#F5F3F0] dark:bg-slate-900 rounded-xl text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-[#0F5132]" />
                  <span>GSTIN &amp; Transport License Auto-Renewal</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-[#0F5132]" />
                  <span>Rank priority for Mumbai Western &amp; Central clusters</span>
                </div>
              </div>

              <button
                onClick={handleRenewSuccess}
                className="w-full py-3 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-serif font-bold text-xs tracking-wide shadow-md transition-colors cursor-pointer"
              >
                Pay ₹500 &amp; Extend 1 Year
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Manage Photos Gallery */}
      {isPhotosModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C28E52] font-bold">Fleet Showcase</span>
                <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">Manage Fleet &amp; Team Photos</h3>
              </div>
              <button
                onClick={() => setIsPhotosModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {photos.map((p) => (
                  <div key={p.id} className="relative rounded-lg overflow-hidden h-20 border border-slate-200 dark:border-slate-800">
                    <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setPhotos(photos.filter(x => x.id !== p.id))}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs hover:bg-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-[#0F172A] dark:text-white">Add New Fleet Image URL</p>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F3F0] dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Photo Title (e.g. Loading Gate, Container Truck)"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F3F0] dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsPhotosModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-500 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0F172A] hover:bg-[#0F5132] text-white text-xs font-serif font-bold rounded-xl"
                  >
                    Upload Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: Support Helpline */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#0F5132] font-bold">24x7 Dedicated Desk</span>
                <h3 className="text-lg font-serif font-bold text-[#0F172A] dark:text-white">Vendor Support Helpline</h3>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0F172A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 my-2 text-xs">
              <p className="text-slate-500">
                For fleet verification questions, badge updates, or customer dispute assistance, reach our priority logistics relationship manager.
              </p>

              <div className="p-3 bg-[#F5F3F0] dark:bg-slate-900 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Helpline:</span>
                  <a href="tel:+912288001122" className="font-bold text-[#0F172A] dark:text-white hover:underline">+91 22 8800 1122</a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <a href="mailto:vendors@nobroker.in" className="font-bold text-[#C28E52] hover:underline">vendors@nobroker.in</a>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsSupportModalOpen(false)}
                  className="px-5 py-2.5 bg-[#0F172A] text-white text-xs font-serif font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700/80 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
