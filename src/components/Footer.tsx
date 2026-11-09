import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { SITE_INFO } from '../data/apartmentsData';

interface FooterProps {
  onNavigate: (view: string, aptId?: string) => void;
  onOpenBooking: (aptId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="no-print bg-[#570A1B] text-[#FFF9F1] border-t-2 border-[#C6A16B]/40 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid: Clean 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 text-right pb-12 border-b border-[#C6A16B]/25 items-start">
          
          {/* Brand & Intro (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C6A16B] bg-white p-0.5 shadow-md">
                <img
                  src={SITE_INFO.logoUrl}
                  alt="شعار رُقِيّ"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-alexandria font-extrabold text-2xl text-[#FFF9F1]">
                  رُقِيّ للشقق الفندقية
                </h3>
                <span className="text-xs text-[#C6A16B] tracking-wider block font-light">
                  VIP Serviced Apartments · Taif
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F3E2CC]/85 font-light leading-relaxed max-w-xl">
              الواجهة الرقمية الرسمية للشقق الفندقيه الفاخره. نقدم نموذج ضيافة استثنائي يجمع بين الخصوصية التامة والخدمات الفندقية الراقية في ارقى احياء الطائف الحيويه، مع توثيق إلكتروني فوري لكافة عقود الإقامة.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-[#C6A16B]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>مرخص ومعتمد من وزارة السياحة</span>
            </div>
          </div>

          {/* Contact & Location (5 cols) */}
          <div className="lg:col-span-5 space-y-4 bg-[#FFF9F1]/5 p-6 rounded-2xl border border-[#C6A16B]/30">
            <h4 className="font-alexandria font-bold text-sm text-[#C6A16B] border-b border-[#C6A16B]/30 pb-2">
              بيانات التواصل الرسمية
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#FFF9F1]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A16B] shrink-0 mt-0.5" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A16B] shrink-0" />
                <span dir="ltr">{SITE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A16B] shrink-0" />
                <span>{SITE_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="w-full bg-[#C6A16B] hover:bg-[#b58f59] text-[#570A1B] py-3 px-4 rounded-xl font-alexandria font-bold text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer"
              >
                بدء الحجز الفوري
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF9F1]/60">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} رُقِيّ للشقق الفندقية VIP · Roqay Hotel Apartments
          </p>
          <div className="text-[11px] text-[#FFF9F1]/60">
            <span>المملكة العربية السعودية - الطائف</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
