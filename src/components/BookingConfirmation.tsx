import React from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Printer, 
  Calendar, 
  User, 
  ArrowLeft, 
  Home, 
  Share2,
  Building2
} from 'lucide-react';
import { Booking, SITE_INFO } from '../data/apartmentsData';

interface BookingConfirmationProps {
  booking: Booking;
  onViewAgreement: () => void;
  onReturnHome: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onViewAgreement,
  onReturnHome
}) => {
  return (
    <div className="py-10 md:py-16 bg-[#F3E2CC] min-h-screen text-[#3A2522]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Success Announcement Card */}
        <div className="bg-[#FFF9F1] rounded-3xl border-2 border-[#570A1B] shadow-2xl p-6 sm:p-10 text-center space-y-6">
          
          {/* Animated Success Ring */}
          <div className="w-20 h-20 bg-[#570A1B] text-[#C6A16B] rounded-full mx-auto flex items-center justify-center border-4 border-[#C6A16B] shadow-lg animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#25D366]/20 text-emerald-800 font-semibold text-xs border border-emerald-300">
              ✓ تم تأكيد الحجز بنجاح وموثق بالنظام
            </span>
            <h1 className="font-alexandria font-extrabold text-2xl sm:text-3xl text-[#570A1B]">
              شكراً لاختيارك رُقِيّ للشقق الفندقية
            </h1>
            <p className="text-xs sm:text-sm text-[#3A2522]/80 font-light">
              يسعدنا استضافتك، تم إرسال تفاصيل الحجز ورمز الدخول الإلكتروني إلى جوالك وبريدك الإلكتروني.
            </p>
          </div>

          {/* Booking Code Banner */}
          <div className="bg-[#570A1B] text-[#FFF9F1] p-4 rounded-2xl border border-[#C6A16B] flex items-center justify-between">
            <div className="text-right">
              <span className="text-[11px] text-[#C6A16B] block">رقم الحجز المرجعي</span>
              <span className="font-mono font-bold text-lg sm:text-xl text-[#FFF9F1] tracking-wider">
                {booking.bookingNumber}
              </span>
            </div>
            <div className="bg-[#FFF9F1]/10 px-3 py-1.5 rounded-lg border border-[#C6A16B]/40 text-xs text-[#C6A16B]">
              حالة الحجز: مؤكد
            </div>
          </div>

          {/* Summary Details Grid */}
          <div className="bg-[#F3E2CC]/50 p-5 rounded-2xl border border-[#C6A16B]/40 space-y-3 text-right text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-[#C6A16B]/30 pb-2">
              <span className="text-[#3A2522]/70 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#570A1B]" />
                الوحدة المحجوزة:
              </span>
              <span className="font-alexandria font-bold text-[#570A1B]">
                {booking.apartmentName}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#C6A16B]/30 pb-2">
              <span className="text-[#3A2522]/70 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#570A1B]" />
                اسم المستأجر:
              </span>
              <span className="font-semibold text-[#570A1B]">
                {booking.guestName}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#C6A16B]/30 pb-2">
              <span className="text-[#3A2522]/70 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#570A1B]" />
                فترة الإقامة:
              </span>
              <span className="font-mono font-medium text-[#570A1B]">
                من {booking.checkInDate} إلى {booking.checkOutDate} ({booking.nights} ليالٍ)
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[#3A2522]/80 font-bold">المبلغ الإجمالي المدفوع:</span>
              <span className="font-alexandria font-extrabold text-base text-[#570A1B]">
                {booking.totalAmount.toLocaleString('ar-SA')} ر.س
              </span>
            </div>
          </div>

          {/* Prominent Rental Agreement CTA */}
          <div className="pt-2 space-y-3">
            <button
              onClick={onViewAgreement}
              className="w-full bg-[#570A1B] hover:bg-[#84394A] text-[#FFF9F1] py-4 px-6 rounded-2xl font-alexandria font-bold text-sm sm:text-base transition-all shadow-xl flex items-center justify-center gap-3 border-2 border-[#C6A16B] transform hover:-translate-y-0.5"
            >
              <FileText className="w-5 h-5 text-[#C6A16B]" />
              <span>عرض وتحميل عقد الإيجار الإلكتروني</span>
            </button>

            <p className="text-[11px] text-[#3A2522]/70">
              * تم إنشاء العقد الإلكتروني بصيغة رسمية معتمدة قابلة للطباعة على مقاس A4.
            </p>
          </div>

          {/* WhatsApp & Return Home buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#C6A16B]/30">
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent(`السلام عليكم، تم إتمام الحجز برقم: ${booking.bookingNumber} باسم: ${booking.guestName}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl font-alexandria font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow"
            >
              <span>إرسال تأكيد لواتساب الاستقبال</span>
            </a>

            <button
              onClick={onReturnHome}
              className="flex-1 bg-[#F3E2CC] hover:bg-[#e7d2b8] text-[#570A1B] py-3 px-4 rounded-xl font-alexandria font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-[#570A1B]/30"
            >
              <Home className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
