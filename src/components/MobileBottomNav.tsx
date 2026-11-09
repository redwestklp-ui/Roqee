import React from 'react';
import { Home, Building2, Calendar, MessageSquare, ShieldCheck } from 'lucide-react';
import { SITE_INFO } from '../data/apartmentsData';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenBooking: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenBooking
}) => {
  return (
    <div className="no-print md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#570A1B] text-[#FFF9F1] border-t border-[#C6A16B]/40 shadow-2xl px-2 py-1.5 safe-area-pb">
      <div className="grid grid-cols-5 items-center justify-around text-center">
        
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentView === 'home' ? 'text-[#C6A16B] font-bold' : 'text-[#FFF9F1]/70'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">الرئيسية</span>
        </button>

        {/* Apartments */}
        <button
          onClick={() => onNavigate('apartments')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentView === 'apartments' || currentView === 'apartment-detail' ? 'text-[#C6A16B] font-bold' : 'text-[#FFF9F1]/70'
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">الشقتين</span>
        </button>

        {/* Central Book Action Button */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center -mt-4"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C6A16B] to-[#b38d55] text-[#570A1B] flex items-center justify-center shadow-lg border-2 border-[#570A1B] transition-transform active:scale-95">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[10px] text-[#C6A16B] font-bold mt-0.5">احجز الآن</span>
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن حجز شقق رُقِيّ الفندقية')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-[#25D366]"
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">واتساب</span>
        </a>

        {/* Admin Dashboard */}
        <button
          onClick={() => onNavigate('admin')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentView === 'admin' ? 'text-[#C6A16B] font-bold' : 'text-[#FFF9F1]/70'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">الإدارة</span>
        </button>

      </div>
    </div>
  );
};
