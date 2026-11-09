import React from 'react';
import { Home, Building2, Calendar, MessageSquare, MapPin } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string, aptId?: string) => void;
  onOpenBooking: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenBooking
}) => {
  return (
    <aside aria-label="شريط التنقل السفلي" className="no-print fixed bottom-3 sm:bottom-6 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
      <nav 
        aria-label="قائمة التنقل السريع"
        className="pointer-events-auto bg-[#570A1B]/95 backdrop-blur-2xl border border-[#C6A16B]/65 rounded-full px-3.5 sm:px-6 py-1.5 sm:py-2 shadow-[0_12px_36px_rgba(35,3,10,0.55)] flex items-center justify-center gap-2.5 sm:gap-6 transition-all duration-300 max-w-full"
      >
        
        {/* 1. أقصى اليمين: الرئيسية */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 px-2 sm:px-2.5 rounded-full transition-all duration-200 relative group cursor-pointer ${
            currentView === 'home'
              ? 'text-[#C6A16B] font-bold scale-105'
              : 'text-[#FFF9F1]/80 hover:text-[#FFF9F1]'
          }`}
        >
          <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5 mb-0.5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">الرئيسية</span>
          {currentView === 'home' && (
            <span className="absolute -bottom-1 w-2 h-1 bg-[#C6A16B] rounded-full"></span>
          )}
        </button>

        {/* 2. قسم اليمين: تواصل معنا */}
        <button
          onClick={() => onNavigate('contact')}
          className={`flex flex-col items-center justify-center py-1 px-2 sm:px-2.5 rounded-full transition-all duration-200 relative group cursor-pointer ${
            currentView === 'contact'
              ? 'text-[#C6A16B] font-bold scale-105'
              : 'text-[#FFF9F1]/80 hover:text-[#FFF9F1]'
          }`}
        >
          <MessageSquare className="w-4.5 h-4.5 sm:w-5 sm:h-5 mb-0.5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">تواصل معنا</span>
          {currentView === 'contact' && (
            <span className="absolute -bottom-1 w-2 h-1 bg-[#C6A16B] rounded-full"></span>
          )}
        </button>

        {/* 3. الوسط: احجز الآن (الزر المركزي المرتفع والمميز بالذهب الشامبين) */}
        <button
          onClick={onOpenBooking}
          className="relative -top-3.5 sm:-top-4.5 flex flex-col items-center group cursor-pointer focus:outline-none shrink-0"
        >
          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#C6A16B] via-[#dfbe8c] to-[#b89156] text-[#570A1B] flex items-center justify-center shadow-[0_8px_20px_rgba(198,161,107,0.45)] border-3 border-[#570A1B] transform group-hover:scale-110 group-active:scale-95 transition-all duration-200">
            <Calendar className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-[#C6A16B] mt-0.5 tracking-wide drop-shadow whitespace-nowrap">
            احجز الآن
          </span>
        </button>

        {/* 4. قسم الشمال: الشقق */}
        <button
          onClick={() => onNavigate('apartments')}
          className={`flex flex-col items-center justify-center py-1 px-2 sm:px-2.5 rounded-full transition-all duration-200 relative group cursor-pointer ${
            currentView === 'apartments' || currentView === 'apartment-detail'
              ? 'text-[#C6A16B] font-bold scale-105'
              : 'text-[#FFF9F1]/80 hover:text-[#FFF9F1]'
          }`}
        >
          <Building2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 mb-0.5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">الشقق</span>
          {(currentView === 'apartments' || currentView === 'apartment-detail') && (
            <span className="absolute -bottom-1 w-2 h-1 bg-[#C6A16B] rounded-full"></span>
          )}
        </button>

        {/* 5. أقصى الشمال: موقعنا */}
        <button
          onClick={() => onNavigate('location')}
          className={`flex flex-col items-center justify-center py-1 px-2 sm:px-2.5 rounded-full transition-all duration-200 relative group cursor-pointer ${
            currentView === 'location'
              ? 'text-[#C6A16B] font-bold scale-105'
              : 'text-[#FFF9F1]/80 hover:text-[#FFF9F1]'
          }`}
        >
          <MapPin className="w-4.5 h-4.5 sm:w-5 sm:h-5 mb-0.5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">موقعنا</span>
          {currentView === 'location' && (
            <span className="absolute -bottom-1 w-2 h-1 bg-[#C6A16B] rounded-full"></span>
          )}
        </button>

      </nav>
    </aside>
  );
};
