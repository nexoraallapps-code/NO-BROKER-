import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  Upload, 
  Camera, 
  Smartphone,
  Image as ImageIcon,
  Trash2, 
  ShieldCheck, 
  Check, 
  MapPin, 
  Mail, 
  Phone, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  Lock,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Compass,
  CheckCheck
} from 'lucide-react';

const POPULAR_CITIES = [
  'Mumbai',
  'Bangalore',
  'Pune',
  'Delhi NCR',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Jaipur',
  'Ahmedabad',
  'Goa'
];

const LOCALITY_SUGGESTIONS: Record<string, string[]> = {
  'Mumbai': ['Bandra West', 'Worli', 'Juhu', 'Powai', 'Andheri West', 'Lower Parel'],
  'Bangalore': ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Sadashivnagar'],
  'Pune': ['Koregaon Park', 'Kalyani Nagar', 'Baner', 'Viman Nagar', 'Aundh'],
  'Delhi NCR': ['Golf Course Road', 'Vasant Vihar', 'Greater Kailash', 'Cyber City', 'Noida Sec 62'],
  'Hyderabad': ['Jubilee Hills', 'Banjara Hills', 'Gachibowli', 'Hitec City', 'Madhapur'],
  'Chennai': ['Boat Club Road', 'Poes Garden', 'Adyar', 'Besant Nagar', 'OMR'],
  'Kolkata': ['Alipore', 'Ballygunge', 'Salt Lake', 'New Town'],
  'Jaipur': ['C-Scheme', 'Civil Lines', 'Malviya Nagar', 'Vaishali Nagar'],
  'Ahmedabad': ['Bodakdev', 'SG Highway', 'Satellite', 'Thaltej'],
  'Goa': ['Assagao', 'Anjuna', 'Candolim', 'Panaji', 'Dona Paula']
};

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
];

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSaveUser: (updatedUser: Partial<UserProfile>) => void;
  onCityPreferenceChanged?: (newCity: string, newLocality?: string) => void;
  onUpdateSearchContext?: (context: { city: string; locality?: string; query?: string }) => void;
  initialMode?: 'default' | 'camera';
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSaveUser,
  onCityPreferenceChanged,
  onUpdateSearchContext,
  initialMode = 'default',
}) => {
  // Form State
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatar, setAvatar] = useState<string | undefined>(user.avatar);
  const [preferredCity, setPreferredCity] = useState(user.preferredCity || 'Mumbai');
  const [preferredLocality, setPreferredLocality] = useState(user.preferredLocality || '');
  const [syncSearchPreferences, setSyncSearchPreferences] = useState(true);
  const [locationPersistNotice, setLocationPersistNotice] = useState<string | null>(null);

  // Verification States
  const [phoneVerified, setPhoneVerified] = useState(user.isPhoneVerified ?? (!!user.phone && user.isAuthenticated));
  const [emailVerified, setEmailVerified] = useState(user.isEmailVerified ?? (!!user.email && user.isAuthenticated));
  
  // OTP Flow for Phone
  const [showPhoneOtpModal, setShowPhoneOtpModal] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [generatedPhoneOtp, setGeneratedPhoneOtp] = useState('4921');
  const [phoneOtpTimer, setPhoneOtpTimer] = useState(30);

  // OTP Flow for Email
  const [showEmailOtpModal, setShowEmailOtpModal] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState('7210');
  const [emailOtpTimer, setEmailOtpTimer] = useState(30);

  // Unsaved Changes Guard
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Avatar Upload & Camera Controls
  const deviceFileInputRef = useRef<HTMLInputElement>(null);
  const cameraFileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [avatarPersistNotice, setAvatarPersistNotice] = useState<string | null>(null);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Reset initial values when opened or user changes
  useEffect(() => {
    if (isOpen) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
      setAvatar(user.avatar);
      setPreferredCity(user.preferredCity || 'Mumbai');
      setPreferredLocality(user.preferredLocality || '');
      setPhoneVerified(user.isPhoneVerified ?? (!!user.phone && user.isAuthenticated));
      setEmailVerified(user.isEmailVerified ?? (!!user.email && user.isAuthenticated));
      setShowDiscardConfirmation(false);
      setErrorMessage(null);
      setSaveSuccess(false);
      setAvatarPersistNotice(null);

      if (initialMode === 'camera') {
        setTimeout(() => {
          startLiveCamera();
        }, 100);
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsLiveCameraOpen(false);
    }
  }, [isOpen, user, initialMode]);

  // Timers for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showPhoneOtpModal && phoneOtpTimer > 0) {
      interval = setInterval(() => setPhoneOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showPhoneOtpModal, phoneOtpTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showEmailOtpModal && emailOtpTimer > 0) {
      interval = setInterval(() => setEmailOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showEmailOtpModal, emailOtpTimer]);

  // Check if form is dirty
  const isDirty = 
    name !== (user.name || '') ||
    phone !== (user.phone || '') ||
    email !== (user.email || '') ||
    avatar !== user.avatar ||
    preferredCity !== (user.preferredCity || 'Mumbai') ||
    preferredLocality !== (user.preferredLocality || '');

  // Intercept close
  const handleRequestClose = () => {
    if (isLiveCameraOpen) {
      stopLiveCamera();
      return;
    }
    if (isDirty && !saveSuccess) {
      setShowDiscardConfirmation(true);
    } else {
      onClose();
    }
  };

  // Keyboard escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isLiveCameraOpen) {
          stopLiveCamera();
        } else if (showPhoneOtpModal) {
          setShowPhoneOtpModal(false);
        } else if (showEmailOtpModal) {
          setShowEmailOtpModal(false);
        } else if (showDiscardConfirmation) {
          setShowDiscardConfirmation(false);
        } else {
          handleRequestClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDirty, showPhoneOtpModal, showEmailOtpModal, showDiscardConfirmation, saveSuccess, isLiveCameraOpen]);

  // Compress image to 400x400 square JPEG to optimize performance & storage
  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 400;
          const width = img.width;
          const height = img.height;
          const minSide = Math.min(width, height);
          const startX = (width - minSide) / 2;
          const startY = (height - minSide) / 2;

          canvas.width = maxDim;
          canvas.height = maxDim;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, startX, startY, minSide, minSide, 0, 0, maxDim, maxDim);
            resolve(canvas.toDataURL('image/jpeg', 0.88));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Avatar Photo Upload Handler (Device & Camera capture)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('Image size must be under 15MB.');
      return;
    }

    try {
      const dataUrl = await compressImageFile(file);
      setAvatar(dataUrl);
      setErrorMessage(null);
      // Immediately update user object state
      onSaveUser({
        ...user,
        avatar: dataUrl,
      });
      setAvatarPersistNotice('✓ Profile photo updated & saved to user profile!');
      setTimeout(() => setAvatarPersistNotice(null), 4000);
    } catch {
      setErrorMessage('Failed to process image. Please try another file.');
    } finally {
      e.target.value = '';
    }
  };

  // Live Camera Handlers
  const startLiveCamera = async () => {
    setCameraError(null);
    setCameraLoading(true);
    setIsLiveCameraOpen(true);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera stream not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraLoading(false);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err: any) {
      console.warn('Live camera access:', err);
      setCameraLoading(false);
      setCameraError('Direct webcam stream unavailable. Opening mobile camera capture...');
      setTimeout(() => {
        stopLiveCamera();
        cameraFileInputRef.current?.click();
      }, 800);
    }
  };

  const stopLiveCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsLiveCameraOpen(false);
    setCameraLoading(false);
    setCameraError(null);
  };

  const captureLivePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const width = video.videoWidth || 480;
    const height = video.videoHeight || 480;
    const minSide = Math.min(width, height);
    const startX = (width - minSide) / 2;
    const startY = (height - minSide) / 2;

    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, startX, startY, minSide, minSide, 0, 0, 400, 400);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      setAvatar(dataUrl);
      // Immediately update user object state
      onSaveUser({
        ...user,
        avatar: dataUrl,
      });
      setAvatarPersistNotice('✓ Live camera photo taken & saved to user profile!');
      setTimeout(() => setAvatarPersistNotice(null), 4000);
    }
    stopLiveCamera();
  };

  // Immediate Avatar State Persistence to user object
  const handlePersistAvatarImmediately = () => {
    onSaveUser({
      ...user,
      avatar: avatar || undefined,
    });
    setAvatarPersistNotice('✓ Avatar successfully persisted to user profile!');
    setTimeout(() => setAvatarPersistNotice(null), 3000);
  };

  // Trigger Phone OTP
  const handleStartPhoneVerification = () => {
    if (!phone || phone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedPhoneOtp(newCode);
    setPhoneOtp('');
    setPhoneOtpTimer(30);
    setShowPhoneOtpModal(true);
    setErrorMessage(null);
  };

  const handleConfirmPhoneOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneOtp.trim() === generatedPhoneOtp || phoneOtp.trim() === '1234') {
      setPhoneVerified(true);
      setShowPhoneOtpModal(false);
      setErrorMessage(null);
    } else {
      setErrorMessage(`Incorrect OTP. Please enter ${generatedPhoneOtp} for demo verification.`);
    }
  };

  // Trigger Email OTP
  const handleStartEmailVerification = () => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedEmailOtp(newCode);
    setEmailOtp('');
    setEmailOtpTimer(30);
    setShowEmailOtpModal(true);
    setErrorMessage(null);
  };

  const handleConfirmEmailOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOtp.trim() === generatedEmailOtp || emailOtp.trim() === '1234') {
      setEmailVerified(true);
      setShowEmailOtpModal(false);
      setErrorMessage(null);
    } else {
      setErrorMessage(`Incorrect email OTP. Please enter ${generatedEmailOtp} for demo verification.`);
    }
  };

  // Immediate Preferred City & Locality Persistence & Search Context update
  const handleApplyLocationSearchContext = () => {
    const trimmedLocality = preferredLocality.trim();
    onSaveUser({
      ...user,
      preferredCity,
      preferredLocality: trimmedLocality,
    });
    if (onCityPreferenceChanged) {
      onCityPreferenceChanged(preferredCity, trimmedLocality);
    }
    if (onUpdateSearchContext) {
      onUpdateSearchContext({
        city: preferredCity,
        locality: trimmedLocality,
        query: trimmedLocality,
      });
    }
    setLocationPersistNotice(`✓ Configuration saved! Search context updated to ${preferredCity}${trimmedLocality ? ' • ' + trimmedLocality : ''}.`);
    setTimeout(() => setLocationPersistNotice(null), 3500);
  };

  // Save changes
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Check if phone was altered and not verified
    if (phone && phone !== user.phone && !phoneVerified) {
      setErrorMessage('Please verify your updated mobile number with OTP before saving.');
      return;
    }

    // Check if email was altered and not verified
    if (email && email !== user.email && !emailVerified) {
      setErrorMessage('Please verify your updated email address with OTP before saving.');
      return;
    }

    const trimmedLocality = preferredLocality.trim();

    onSaveUser({
      name: name.trim() || user.name || 'Member',
      phone: phone.trim(),
      email: email.trim(),
      avatar: avatar || undefined,
      preferredCity,
      preferredLocality: trimmedLocality,
      isPhoneVerified: phone ? phoneVerified : false,
      isEmailVerified: email ? emailVerified : false,
    });

    if (syncSearchPreferences) {
      if (onCityPreferenceChanged) {
        onCityPreferenceChanged(preferredCity, trimmedLocality);
      }
      if (onUpdateSearchContext) {
        onUpdateSearchContext({
          city: preferredCity,
          locality: trimmedLocality,
          query: trimmedLocality,
        });
      }
    }

    setSaveSuccess(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={handleRequestClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-[#0A0F1D] text-slate-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Swipe / Drag down pill bar for mobile */}
        <div className="w-full flex justify-center pt-2 sm:hidden">
          <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-[#FAF8F5] dark:bg-slate-900/60">
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-[#0F172A] dark:text-white">
              Edit Profile &amp; Preferences
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage your personal details, verified contact info, and preferred search city.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRequestClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 text-xs">
          
          {/* Error Message Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Success Banner */}
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <div className="font-semibold">Profile updated successfully! Closing...</div>
            </div>
          )}

          {/* 1. Avatar Photo Upload / Update Section */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Profile Photo
              </label>
              {avatar && (
                <button
                  type="button"
                  onClick={() => setAvatar(undefined)}
                  className="text-[11px] text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              )}
            </div>

            {avatarPersistNotice && (
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[11px] font-semibold flex items-center justify-between animate-in fade-in">
                <span>{avatarPersistNotice}</span>
                <button
                  type="button"
                  onClick={handlePersistAvatarImmediately}
                  className="px-2 py-1 rounded bg-[#0F172A] text-white hover:bg-[#C28E52] text-[10px] font-bold transition-colors cursor-pointer"
                >
                  Save to Profile Now
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Photo Preview Container */}
              <div className="relative group shrink-0">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#C28E52] shadow-md ring-4 ring-[#C28E52]/20"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#C28E52] text-white flex items-center justify-center font-bold text-2xl shadow-md font-serif">
                    {name ? name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => deviceFileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#0F172A] text-white hover:bg-[#C28E52] transition-colors shadow-md border-2 border-white dark:border-slate-900 cursor-pointer"
                  title="Upload from device"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Upload Controls */}
              <div className="space-y-2.5 flex-1 w-full">
                {/* Hidden input 1: Device / Gallery file picker */}
                <input
                  type="file"
                  ref={deviceFileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/png, image/jpeg, image/webp, image/gif, image/*"
                  className="hidden"
                />

                {/* Hidden input 2: Native mobile camera capture trigger */}
                <input
                  type="file"
                  ref={cameraFileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  capture="user"
                  className="hidden"
                />

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
                      if (isMobile) {
                        cameraFileInputRef.current?.click();
                      } else {
                        startLiveCamera();
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0F172A] to-slate-800 hover:from-[#C28E52] hover:to-[#AB773D] text-white font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm text-xs active:scale-98"
                    title="Take a profile photo using your device camera"
                  >
                    <Camera className="w-4 h-4 text-[#C28E52] group-hover:text-white" />
                    <span>Take Photo with Camera</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => deviceFileInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white hover:border-[#C28E52] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs text-xs"
                    title="Choose an existing image file from device storage"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>Upload File</span>
                  </button>

                  <button
                    type="button"
                    onClick={startLiveCamera}
                    className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer"
                    title="Open live webcam stream overlay"
                  >
                    <Smartphone className="w-3 h-3 text-emerald-500" />
                    <span>Live Viewfinder</span>
                  </button>

                  {avatar !== user.avatar && avatar && (
                    <button
                      type="button"
                      onClick={handlePersistAvatarImmediately}
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs text-xs ml-auto"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Avatar to Profile</span>
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-slate-400">
                  Upload an image from your device or use your camera. Images are automatically cropped and persisted to your profile.
                </p>

                {/* Preset Avatars */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                  <span className="text-[10px] text-slate-400 font-medium">Or choose quick avatar:</span>
                  <div className="flex items-center gap-1.5">
                    {PRESET_AVATARS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAvatar(preset);
                          setAvatarPersistNotice('Preset avatar selected. Save changes to keep.');
                        }}
                        className={`w-7 h-7 rounded-full overflow-hidden border transition-all cursor-pointer ${
                          avatar === preset ? 'border-[#C28E52] scale-110 ring-2 ring-[#C28E52]/40' : 'border-slate-300 dark:border-slate-700 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={preset} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Personal Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#C28E52]" />
              Personal &amp; Contact Details
            </h4>

            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Gaurav Sharma"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-[#C28E52]"
                required
              />
            </div>

            {/* Mobile Phone with OTP Verification */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  Mobile Number (for Direct Landlord Contacts)
                </label>
                {phone && phone === user.phone && phoneVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                    OTP Verification Required
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (e.target.value !== user.phone) {
                        setPhoneVerified(false);
                      } else {
                        setPhoneVerified(user.isPhoneVerified ?? true);
                      }
                    }}
                    placeholder="+91 98210 44521"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-[#C28E52]"
                  />
                </div>

                {(!phoneVerified || phone !== user.phone) && phone.trim().length >= 10 && (
                  <button
                    type="button"
                    onClick={handleStartPhoneVerification}
                    className="px-3.5 py-2.5 bg-[#0F172A] hover:bg-[#C28E52] text-white rounded-xl font-bold text-xs shrink-0 transition-colors cursor-pointer"
                  >
                    Verify via OTP
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Direct landlords only communicate with OTP-verified tenant and buyer numbers.
              </p>
            </div>

            {/* Email Address with OTP Verification */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  Email Address
                </label>
                {email && email === user.email && emailVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                    OTP Verification Required
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (e.target.value !== user.email) {
                        setEmailVerified(false);
                      } else {
                        setEmailVerified(user.isEmailVerified ?? true);
                      }
                    }}
                    placeholder="user@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-[#C28E52]"
                  />
                </div>

                {(!emailVerified || email !== user.email) && email.includes('@') && (
                  <button
                    type="button"
                    onClick={handleStartEmailVerification}
                    className="px-3.5 py-2.5 bg-[#0F172A] hover:bg-[#C28E52] text-white rounded-xl font-bold text-xs shrink-0 transition-colors cursor-pointer"
                  >
                    Verify via OTP
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3. Preferred City / Locality Configuration Setting */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C28E52]/10 text-[#C28E52] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Preferred City / Locality Configuration
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Saves to your user profile and synchronizes the application's search context &amp; filters.
                  </p>
                </div>
              </div>

              {/* Current Context Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-xs shrink-0">
                <Compass className="w-3.5 h-3.5 text-[#C28E52]" />
                <span>Search Context:</span>
                <span className="font-bold text-[#C28E52]">{preferredCity}</span>
                {preferredLocality.trim() && (
                  <span className="text-slate-400 dark:text-slate-500">• {preferredLocality.trim()}</span>
                )}
              </div>
            </div>

            {/* Notification Banner when saved immediately */}
            {locationPersistNotice && (
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{locationPersistNotice}</span>
                </div>
              </div>
            )}

            {/* Quick Metropolis Selection Chips */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  Primary Metropolis City <span className="text-[#C28E52]">*</span>
                </label>
                <span className="text-[10px] text-slate-400">10 Metropolises Available</span>
              </div>

              {/* City Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mb-2">
                {POPULAR_CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setPreferredCity(c);
                      setPreferredLocality('');
                    }}
                    className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                      preferredCity === c
                        ? 'bg-[#0F172A] dark:bg-[#C28E52] text-white border-[#0F172A] dark:border-[#C28E52] shadow-xs scale-100'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#C28E52]'
                    }`}
                  >
                    <MapPin className={`w-3 h-3 ${preferredCity === c ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="truncate">{c}</span>
                  </button>
                ))}
              </div>

              {/* Select Dropdown */}
              <select
                value={preferredCity}
                onChange={(e) => {
                  setPreferredCity(e.target.value);
                  setPreferredLocality('');
                }}
                className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C28E52]"
              >
                {POPULAR_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c} {c === 'Mumbai' ? '(Headquarters)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Locality / Neighborhood */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  Preferred Locality / Neighborhood (Auto-fills Search)
                </label>
                {preferredLocality && (
                  <button
                    type="button"
                    onClick={() => setPreferredLocality('')}
                    className="text-[10px] text-rose-500 hover:underline cursor-pointer"
                  >
                    Clear Locality
                  </button>
                )}
              </div>

              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-[#C28E52]" />
                <input
                  type="text"
                  value={preferredLocality}
                  onChange={(e) => setPreferredLocality(e.target.value)}
                  placeholder={`e.g. ${LOCALITY_SUGGESTIONS[preferredCity]?.[0] || 'Neighborhood name'}, ${LOCALITY_SUGGESTIONS[preferredCity]?.[1] || 'Sub-locality'}`}
                  className="w-full pl-9 pr-8 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-[#C28E52]"
                />
                {preferredLocality && (
                  <button
                    type="button"
                    onClick={() => setPreferredLocality('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Suggestions */}
              {LOCALITY_SUGGESTIONS[preferredCity] && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  <span className="text-[10px] text-slate-400 font-medium">Top localities in {preferredCity}:</span>
                  {LOCALITY_SUGGESTIONS[preferredCity].map((loc) => {
                    const isSelected = preferredLocality.toLowerCase() === loc.toLowerCase();
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setPreferredLocality(isSelected ? '' : loc)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#C28E52] text-white border-[#C28E52] font-bold shadow-xs' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#C28E52]'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                        <span>{loc}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sync Controls & Immediate Application Button */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={syncSearchPreferences}
                  onChange={(e) => setSyncSearchPreferences(e.target.checked)}
                  className="w-4 h-4 text-[#C28E52] rounded focus:ring-0 cursor-pointer"
                />
                <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                  Auto-sync with Explore, Maps, and Search Filter Console
                </span>
              </label>

              <button
                type="button"
                onClick={handleApplyLocationSearchContext}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#C28E52] text-slate-800 dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                <Compass className="w-3.5 h-3.5 text-[#C28E52]" />
                <span>Apply to Search Context Now</span>
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleRequestClose}
              className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-colors"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2">
              {isDirty && (
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium hidden sm:inline">
                  • Unsaved Changes
                </span>
              )}
              <button
                type="submit"
                disabled={saveSuccess}
                className="py-2.5 px-6 rounded-xl bg-[#0F172A] hover:bg-slate-800 dark:bg-[#C28E52] dark:hover:bg-[#AB773D] text-white text-xs font-bold cursor-pointer transition-all shadow-md active:scale-98"
              >
                Save Changes
              </button>
            </div>
          </div>

        </form>

        {/* ---------------- OTP Verification Modal for Phone ---------------- */}
        {showPhoneOtpModal && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white dark:bg-[#0F172A] rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Verify Phone Number</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPhoneOtpModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500">
                We sent a 4-digit verification code via SMS to <span className="font-bold text-slate-800 dark:text-white">{phone}</span>.
              </p>

              {/* Demo Hint */}
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] font-mono flex items-center justify-between border border-amber-200 dark:border-amber-800">
                <span>Demo Code: <strong>{generatedPhoneOtp}</strong> (or 1234)</span>
                <button
                  type="button"
                  onClick={() => setPhoneOtp(generatedPhoneOtp)}
                  className="text-[10px] text-[#C28E52] underline font-bold cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>

              <form onSubmit={handleConfirmPhoneOtp} className="space-y-4">
                <div>
                  <input
                    type="text"
                    maxLength={4}
                    value={phoneOtp}
                    onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 4-digit OTP"
                    className="w-full text-center tracking-widest text-lg font-mono py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-[#C28E52] outline-none"
                    autoFocus
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Resend in {phoneOtpTimer}s</span>
                  {phoneOtpTimer === 0 && (
                    <button
                      type="button"
                      onClick={handleStartPhoneVerification}
                      className="text-[#C28E52] font-semibold hover:underline"
                    >
                      Resend SMS
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  Confirm &amp; Verify Phone
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ---------------- OTP Verification Modal for Email ---------------- */}
        {showEmailOtpModal && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white dark:bg-[#0F172A] rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Verify Email Address</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmailOtpModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500">
                We sent a 4-digit verification code to <span className="font-bold text-slate-800 dark:text-white">{email}</span>.
              </p>

              {/* Demo Hint */}
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] font-mono flex items-center justify-between border border-amber-200 dark:border-amber-800">
                <span>Demo Code: <strong>{generatedEmailOtp}</strong> (or 1234)</span>
                <button
                  type="button"
                  onClick={() => setEmailOtp(generatedEmailOtp)}
                  className="text-[10px] text-[#C28E52] underline font-bold cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>

              <form onSubmit={handleConfirmEmailOtp} className="space-y-4">
                <div>
                  <input
                    type="text"
                    maxLength={4}
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 4-digit OTP"
                    className="w-full text-center tracking-widest text-lg font-mono py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-[#C28E52] outline-none"
                    autoFocus
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Resend in {emailOtpTimer}s</span>
                  {emailOtpTimer === 0 && (
                    <button
                      type="button"
                      onClick={handleStartEmailVerification}
                      className="text-[#C28E52] font-semibold hover:underline"
                    >
                      Resend Email
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  Confirm &amp; Verify Email
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ---------------- Unsaved Changes Confirmation Dialog (Bug Fix) ---------------- */}
        {showDiscardConfirmation && (
          <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white dark:bg-[#0F172A] rounded-2xl p-6 shadow-2xl border border-amber-300 dark:border-amber-800 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  Discard Unsaved Changes?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  You have made changes to your profile. If you leave or close now, your edits will not be saved.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDiscardConfirmation(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  Keep Editing
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowDiscardConfirmation(false);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Live Camera Viewfinder Modal ---------------- */}
        {isLiveCameraOpen && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-[#0F172A] text-white rounded-2xl p-5 shadow-2xl border border-slate-700 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Live Camera Capture</h4>
                    <p className="text-[10px] text-slate-400">Position your face inside the frame</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={stopLiveCamera}
                  className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
                  title="Close camera"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cameraError && (
                <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-medium">
                  {cameraError}
                </div>
              )}

              {/* Viewfinder Video Frame */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black border-2 border-[#C28E52]/60 flex items-center justify-center shadow-inner">
                {cameraLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs text-slate-400 z-10">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#C28E52]" />
                    <span>Connecting camera...</span>
                  </div>
                )}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />

                {/* Circular Target Overlay */}
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-white/40 pointer-events-none" />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={stopLiveCamera}
                  className="py-2.5 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={captureLivePhoto}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#C28E52] hover:bg-[#AB773D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Snap Photo</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
