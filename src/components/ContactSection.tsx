import React from 'react';
import { Phone, Mail, Sparkles } from 'lucide-react';
import { SITE_INFO } from '../data/apartmentsData';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F3E2CC] text-[#3A2522]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#570A1B]/10 text-[#570A1B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A16B]" />
            <span>خدمة الضيافة والاستقبال المباشر</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alexandria font-bold text-[#570A1B]">
            تواصل معنا مباشرة
          </h2>
          <div className="w-16 h-1 bg-[#C6A16B] mx-auto rounded-full"></div>
          <p className="text-sm sm:text-base text-[#3A2522]/80 leading-relaxed font-light">
            يسعدنا الإجابة عن كافة استفساراتك حول الشقتين وتفاصيل الإقامة وتقديم تجربة حجز سلسة وفورية.
          </p>
        </div>

        {/* Contact Cards Container (Centered & Luxurious) */}
        <div className="max-w-2xl mx-auto space-y-5 text-right">
          
          {/* WhatsApp Direct Card */}
          <div className="bg-[#FFF9F1] p-6 sm:p-7 rounded-2xl border-2 border-[#25D366] shadow-lg space-y-4 transition-all hover:shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.587 1.954.918 3.19.918l.002.001c3.182 0 5.768-2.587 5.769-5.767.001-3.181-2.584-5.768-5.769-5.768zm3.385 8.163c-.145.411-.745.753-1.026.799-.27.045-.615.064-1.748-.407-1.451-.602-2.39-2.072-2.463-2.17-.071-.098-.587-.781-.587-1.49 0-.709.371-1.058.503-1.204.133-.146.29-.182.387-.182.097 0 .194.002.278.006.089.004.208-.034.325.247.121.291.412 1.002.449 1.075.036.073.06.158.012.255-.049.097-.073.158-.145.243-.073.085-.153.19-.219.255-.073.073-.149.153-.064.298.085.145.378.624.811 1.009.559.497 1.03.651 1.176.724.145.073.23.061.315-.037.085-.097.363-.424.46-.57.097-.146.194-.121.327-.073.133.049.847.4 1.004.473.157.073.262.109.302.17.04.06.04.352-.105.763z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-alexandria font-bold text-base sm:text-lg text-[#570A1B]">
                  المحادثة الفورية عبر WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-[#3A2522]/70 font-light">
                  أسرع وسيلة للحصول على رد فوري وتأكيد التوفر والاستفسار المباشر
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار عن حجز شقق رُقِيّ الفندقية')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 rounded-xl font-alexandria font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>فتح محادثة واتساب الآن</span>
            </a>
          </div>

          {/* Direct Phone Call */}
          <div className="bg-[#FFF9F1] p-5 sm:p-6 rounded-2xl border border-[#C6A16B] shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#570A1B] text-[#FFF9F1] flex items-center justify-center shrink-0 shadow">
                <Phone className="w-5 h-5 text-[#C6A16B]" />
              </div>
              <div>
                <div className="text-xs text-[#3A2522]/70">هاتف الاستقبال والحجوزات</div>
                <div className="font-mono font-bold text-base sm:text-lg text-[#570A1B]" dir="ltr">
                  {SITE_INFO.phone}
                </div>
              </div>
            </div>
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="px-4 py-2 rounded-xl bg-[#570A1B] text-[#FFF9F1] text-xs font-alexandria font-semibold hover:bg-[#84394A] transition-colors border border-[#C6A16B]/50"
            >
              اتصال هاتفي
            </a>
          </div>

          {/* Email Address */}
          <div className="bg-[#FFF9F1] p-5 sm:p-6 rounded-2xl border border-[#C6A16B] shadow-md flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#570A1B] text-[#FFF9F1] flex items-center justify-center shrink-0 shadow">
              <Mail className="w-5 h-5 text-[#C6A16B]" />
            </div>
            <div>
              <div className="text-xs text-[#3A2522]/70">البريد الإلكتروني الرسمي</div>
              <div className="font-mono font-medium text-xs sm:text-base text-[#570A1B]">
                {SITE_INFO.email}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
