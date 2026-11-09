import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Crown, ShieldCheck, Sparkles, X, Lock, AlertCircle } from 'lucide-react';
import { SITE_INFO } from '../data/apartmentsData';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, apartmentId?: string) => void;
  onOpenBooking?: (apartmentId?: string) => void;
}

const ADMIN_PASSWORD = 'roqee2026';
const SECRET_WINDOW_MS = 3000;
const MAX_PASSWORD_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 30000;

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate
}) => {
  const [secretModalOpen, setSecretModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  const vipClickCount = useRef(0);
  const firstClickTime = useRef<number | null>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleNavClick = (view: string) => {
    onNavigate(view);
  };

  const resetSecretSequence = useCallback(() => {
    vipClickCount.current = 0;
    firstClickTime.current = null;
  }, []);

  // Countdown timer for lockout
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLocked && lockoutRemaining > 0) {
      timer = setInterval(() => {
        setLockoutRemaining((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            setPasswordError('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockoutRemaining]);

  // Focus input when secret modal opens
  useEffect(() => {
    if (secretModalOpen) {
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
    } else {
      setPassword('');
      setPasswordError('');
    }
  }, [secretModalOpen]);

  // VIP button click handling (secret sequence component - silent with no popup)
  const handleVipClick = () => {
    const now = Date.now();
    if (!firstClickTime.current) {
      firstClickTime.current = now;
      vipClickCount.current = 1;
    } else if (now - firstClickTime.current > SECRET_WINDOW_MS) {
      // Window expired, start new sequence
      firstClickTime.current = now;
      vipClickCount.current = 1;
    } else {
      vipClickCount.current += 1;
    }
  };

  // Logo click handling (secret sequence finisher)
  const handleLogoClick = () => {
    const now = Date.now();

    // Check if the secret combination is fulfilled: 3 or more VIP clicks within window
    if (
      vipClickCount.current >= 3 &&
      firstClickTime.current &&
      now - firstClickTime.current <= SECRET_WINDOW_MS
    ) {
      resetSecretSequence();
      setSecretModalOpen(true);
      return;
    }

    // Normal logo behavior: navigate to home
    resetSecretSequence();
    handleNavClick('home');
  };

  // Password verification
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) return;

    if (password === ADMIN_PASSWORD) {
      // Success!
      setSecretModalOpen(false);
      setPassword('');
      setPasswordError('');
      setAttempts(0);
      onNavigate('admin');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_PASSWORD_ATTEMPTS) {
        setIsLocked(true);
        setLockoutRemaining(Math.ceil(LOCKOUT_DURATION_MS / 1000));
        setPasswordError(`تم تجاوز الحد الأقصى للمحاولات. تم القفل لمدة 30 ثانية.`);
      } else {
        const remaining = MAX_PASSWORD_ATTEMPTS - newAttempts;
        setPasswordError(`كلمة المرور غير صحيحة. المحاولات المتبقية: ${remaining}`);
      }
      setPassword('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-gradient-to-b from-[#570A1B] via-[#4d0817] to-[#3a0511] text-[#FFF9F1] shadow-[0_4px_25px_rgba(30,2,8,0.5)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4">
            
            {/* Right Side (RTL): Authentic Brand Emblem & Elegant Arabic Typography */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group shrink-0 select-none"
              title="رُقِيّ للشقق الفندقية"
            >
              {/* Circular Emblem with Double Gold Ring and Glow */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#C6A16B] via-[#fae4be] to-[#997744] shadow-[0_0_20px_rgba(198,161,107,0.5)] transition-transform duration-300 group-hover:scale-105 shrink-0">
                <div className="w-full h-full rounded-full bg-[#FFF9F1] overflow-hidden border border-[#570A1B]/30 flex items-center justify-center relative">
                  <img 
                    src={SITE_INFO.logoUrl} 
                    alt="شعار رُقِيّ للشقق الفندقية" 
                    className="w-full h-full object-cover scale-[1.42] translate-y-[6%] select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Typography: Wide Elegant "رُقِــيّ" with "للشقق الفندقية" Filling the Space */}
              <div className="flex flex-col text-right justify-center">
                {/* 1. Main Name: Same font family and same gold color as "للشقق الفندقية" */}
                <span className="font-extrabold text-[28px] sm:text-[34px] text-[#C6A16B] tracking-wider leading-none group-hover:brightness-110 transition-colors drop-shadow-sm">
                  رُقِـــيّ
                </span>
                {/* 2. Subtitle: "للشقق الفندقية" perfectly proportioned filling the space */}
                <span className="text-[12px] sm:text-[14px] text-[#C6A16B] font-bold tracking-wide leading-tight mt-1.5 drop-shadow-sm">
                  للشقق الفندقية
                </span>
              </div>
            </div>

            {/* Center Navigation Links for Desktop (Clean & Luxurious) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              <button
                onClick={() => handleNavClick('home')}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  currentView === 'home'
                    ? 'text-[#C6A16B] font-bold after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[#C6A16B] after:rounded-full'
                    : 'text-[#FFF9F1]/85 hover:text-[#FFF9F1]'
                }`}
              >
                الرئيسية
              </button>
              <button
                onClick={() => handleNavClick('apartments')}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  currentView === 'apartments'
                    ? 'text-[#C6A16B] font-bold after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[#C6A16B] after:rounded-full'
                    : 'text-[#FFF9F1]/85 hover:text-[#FFF9F1]'
                }`}
              >
                الشقق
              </button>
              <button
                onClick={() => handleNavClick('location')}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  currentView === 'location'
                    ? 'text-[#C6A16B] font-bold after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[#C6A16B] after:rounded-full'
                    : 'text-[#FFF9F1]/85 hover:text-[#FFF9F1]'
                }`}
              >
                الموقع والوصول
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  currentView === 'contact'
                    ? 'text-[#C6A16B] font-bold after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[#C6A16B] after:rounded-full'
                    : 'text-[#FFF9F1]/85 hover:text-[#FFF9F1]'
                }`}
              >
                تواصل معنا
              </button>
            </nav>

            {/* Left Side (RTL): WhatsApp Concierge Button & VIP Crown Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Authentic WhatsApp Button (Clean, official WhatsApp look, no dots) */}
              <a
                href={`https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار عن حجز شقق رُقِيّ الفندقية')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_3px_12px_rgba(37,211,102,0.35)] border border-emerald-400/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="محادثة واتساب مباشرة مع خدمة الضيوف"
                aria-label="تواصل واتساب"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              {/* VIP Crown Badge / Button (Click 3 times then Logo 1 time within 3s for admin) */}
              <button
                onClick={handleVipClick}
                className="group flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-b from-[#6b0f24] to-[#450715] border border-[#C6A16B] shadow-[0_2px_8px_rgba(198,161,107,0.25)] hover:border-[#ebd2a9] hover:shadow-[0_0_14px_rgba(198,161,107,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="مزايا وخدمات VIP"
                aria-label="مزايا VIP"
              >
                <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C6A16B] group-hover:scale-110 transition-transform mb-0.5 stroke-[2.2]" />
                <span className="text-[9px] sm:text-[10px] font-bold text-[#C6A16B] tracking-wider leading-none">
                  VIP
                </span>
              </button>

            </div>

          </div>
        </div>

        {/* Sculpted Golden Ribbon Bottom Border (Subtle Architectural Wave) */}
        <div className="relative w-full h-[6px] overflow-hidden pointer-events-none">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 1200 6" 
            preserveAspectRatio="none"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C6A16B" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#fae4be" stopOpacity="1" />
                <stop offset="50%" stopColor="#C6A16B" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#fae4be" stopOpacity="1" />
                <stop offset="100%" stopColor="#C6A16B" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path 
              d="M0 1 Q 300 5, 600 2 T 1200 1" 
              stroke="url(#goldRibbonGrad)" 
              strokeWidth="2" 
            />
            <path 
              d="M0 3 Q 300 6, 600 3 T 1200 3" 
              stroke="url(#goldRibbonGrad)" 
              strokeWidth="1" 
              opacity="0.6" 
            />
          </svg>
        </div>
      </header>

      {/* Secret Admin Authentication Modal */}
      {secretModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#FFF9F1] border-2 border-[#C6A16B] rounded-3xl max-w-md w-full p-6 sm:p-8 text-right shadow-2xl relative space-y-5">
            
            <button
              onClick={() => setSecretModalOpen(false)}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-[#F3E2CC]/60 text-[#570A1B] transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#570A1B] to-[#3a0511] text-[#C6A16B] flex items-center justify-center border border-[#C6A16B] shadow-md">
                <Lock className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-[#570A1B]">
                  بوابة الإدارة المركزية
                </h3>
                <span className="text-xs text-[#84394A] font-semibold">
                  تسجيل دخول المسؤول المعتمد
                </span>
              </div>
            </div>

            <p className="text-xs text-[#241411]/80 leading-relaxed">
              أدخل كلمة المرور الخاصة بإدارة شقق رُقِيّ للوصول إلى لوحة التحكم وتعديل الأسعار والعقود.
            </p>

            {/* Error / Alert Message */}
            {passwordError && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{passwordError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#570A1B] mb-1.5">
                  كلمة مرور الإدارة
                </label>
                <input
                  ref={passwordInputRef}
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError && !isLocked) setPasswordError('');
                  }}
                  disabled={isLocked}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-[#C6A16B]/60 bg-white text-[#241411] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#570A1B] text-sm text-center tracking-widest disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  autoComplete="current-password"
                />
              </div>

              {isLocked ? (
                <div className="text-center py-2 text-xs font-bold text-red-700 bg-red-100/60 rounded-xl border border-red-200">
                  المحاولات مقفلة مؤقتاً: يرجى الانتظار {lockoutRemaining} ثانية
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={!password.trim()}
                    className="flex-1 bg-gradient-to-r from-[#570A1B] to-[#84394A] text-[#FFF9F1] py-3 rounded-xl text-xs font-bold hover:brightness-110 active:scale-[0.98] transition-all border border-[#C6A16B] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C6A16B]" />
                    <span>دخول لوحة التحكم</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSecretModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-[#F3E2CC] text-[#570A1B] text-xs font-semibold hover:bg-[#e7d2b8] active:scale-[0.98] transition-colors cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              )}
            </form>

            <div className="text-[11px] text-gray-500 text-center pt-1 border-t border-gray-200/60">
              نظام حماية مشفر · رُقِيّ للشقق الفندقية VIP
            </div>

          </div>
        </div>
      )}
    </>
  );
};
