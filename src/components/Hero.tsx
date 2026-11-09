import React from 'react';
import { Calendar, ArrowLeft, Crown, Hotel, FileCheck } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (apartmentId?: string) => void;
  onExploreApartments: () => void;
  onSelectApartment?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onExploreApartments
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#570A1B] via-[#4d0918] to-[#3f0714] text-[#FFF9F1] pt-8 pb-10 md:pt-12 md:pb-14 border-b border-[#C6A16B]/30">
      
      {/* Subtle Luxury Pattern / Ambient Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C6A16B_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#C6A16B]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-right">
        
        {/* Top Brand Badge */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF9F1]/15 border border-[#C6A16B] text-[#C6A16B] text-xs font-semibold tracking-wide">
            <Crown className="w-3.5 h-3.5 text-[#C6A16B]" />
            <span className="text-[#FFF9F1]">تجربة ضيافة فندقية خاصة وحصرية</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-balance">
          <span className="text-[#FFF9F1]">شقق فندقية استثنائية وهدوء تام في </span>
          <span className="text-[#C6A16B]">رُقِيّ للشقق الفندقية</span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#FFF9F1] leading-relaxed max-w-2xl font-normal">
          وجهتك المثالية للإقامة الفاخرة في أرقى أحياء الطائف. نضع بين يديك شقق فندقيه تم تأثيثها بأعلى مقاييس الجودة، لتنعم بالسكينة والخصوصية التامة مع حجز مباشر وعقد إيجار موثق.
        </p>

        {/* Key Trust Highlights: Compact & Elegant Dual Badges */}
        <div>
          <div className="inline-flex flex-wrap items-center gap-3 sm:gap-4 py-2.5 px-4 sm:px-5 rounded-2xl bg-white/10 border border-[#C6A16B]/50 shadow-sm text-xs sm:text-sm text-[#FFF9F1] backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Hotel className="w-4 h-4 text-[#C6A16B] shrink-0" />
              <span className="font-semibold">شقق فاخره</span>
            </div>

            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A16B]"></span>

            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#C6A16B] shrink-0" />
              <span className="font-semibold">خصوصية وعقد موثق</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Hero ends directly right here */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          <button
            onClick={() => onOpenBooking()}
            className="bg-gradient-to-r from-[#C6A16B] to-[#b38d55] text-[#570A1B] hover:from-[#d5b37f] hover:to-[#C6A16B] px-8 py-3.5 rounded-xl font-alexandria font-bold text-sm sm:text-base shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-center"
          >
            <Calendar className="w-5 h-5" />
            <span>احجز إقامتك الآن</span>
          </button>

          <button
            onClick={onExploreApartments}
            className="bg-transparent hover:bg-[#FFF9F1]/10 text-[#FFF9F1] border border-[#C6A16B]/60 hover:border-[#C6A16B] px-6 py-3.5 rounded-xl font-alexandria font-medium text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
          >
            <span>استعراض تفاصيل الشقتين</span>
            <ArrowLeft className="w-4 h-4 text-[#C6A16B]" />
          </button>
        </div>

      </div>

    </section>
  );
};
