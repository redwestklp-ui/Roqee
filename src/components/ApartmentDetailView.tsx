import React, { useState } from 'react';
import { 
  Maximize2, 
  Bed, 
  Bath, 
  Users, 
  Calendar, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  Share2,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';
import { APARTMENTS, Apartment, SITE_INFO } from '../data/apartmentsData';
import { ImageLightboxModal } from './ImageLightboxModal';

interface ApartmentDetailViewProps {
  apartmentId: string;
  onBack: () => void;
  onBook: (apartmentId: string) => void;
  onSwitchApartment: (apartmentId: string) => void;
}

export const ApartmentDetailView: React.FC<ApartmentDetailViewProps> = ({
  apartmentId,
  onBack,
  onBook,
  onSwitchApartment
}) => {
  const apartment = APARTMENTS.find(a => a.id === apartmentId) || APARTMENTS[0];
  const otherApartment = APARTMENTS.find(a => a.id !== apartment.id) || APARTMENTS[1];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % apartment.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);
  };

  return (
    <div className="py-6 sm:py-10 md:py-14 bg-[#F3E2CC] min-h-screen text-[#3A2522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Breadcrumb & Back Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C6A16B]/40 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#3A2522]">
            <button 
              onClick={onBack}
              className="hover:text-[#570A1B] flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-[#570A1B]" />
              <span>الرئيسية</span>
            </button>
            <span className="text-[#C6A16B]">/</span>
            <span className="font-semibold text-[#570A1B]">{apartment.name}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onSwitchApartment(otherApartment.id)}
              className="text-xs font-alexandria font-semibold text-[#570A1B] hover:text-[#84394A] bg-[#FFF9F1] px-3 py-1.5 rounded-lg border border-[#C6A16B] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>معاينة {otherApartment.name}</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-[#FFF9F1] hover:bg-white text-[#570A1B] border border-[#C6A16B]/60 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="مشاركة رابط الشقة"
            >
              <Share2 className="w-4 h-4" />
              {copiedNotification && <span className="text-[11px] text-green-700 font-bold">تم النسخ</span>}
            </button>
          </div>
        </div>

        {/* Title & Quick Pricing Banner */}
        <div className="bg-[#FFF9F1] p-5 sm:p-7 rounded-2xl border border-[#C6A16B] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#570A1B] text-[#FFF9F1] text-xs font-alexandria font-semibold">
              <Sparkles className="w-3 h-3 text-[#C6A16B]" />
              <span>شقة رقم {apartment.number} · {apartment.floor} · {apartment.area} م²</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-alexandria font-extrabold text-[#570A1B]">
              {apartment.name}
            </h1>
            <p className="text-sm sm:text-base text-[#3A2522]/80 font-light">
              {apartment.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <div className="bg-[#570A1B] text-[#FFF9F1] p-4 rounded-xl border border-[#C6A16B] text-center md:text-left shrink-0">
              <div className="text-xs text-[#C6A16B]">سعر الإيجار لليلة الواحدة</div>
              <div className="font-alexandria font-extrabold text-2xl text-[#FFF9F1] mt-0.5">
                {apartment.pricePerNight.toLocaleString('ar-SA')}{' '}
                <span className="text-sm font-normal text-[#C6A16B]">ريال سعودي</span>
              </div>
              <div className="text-[10px] text-[#FFF9F1]/80 mt-1">
                شامل الخدمات والمواقف والإنترنت
              </div>
            </div>

            <button
              onClick={() => onBook(apartment.id)}
              className="bg-gradient-to-r from-[#C6A16B] to-[#b38d55] text-[#570A1B] hover:brightness-105 font-alexandria font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>احجز هذه الشقة الآن</span>
            </button>
          </div>
        </div>

        {/* Gallery Section with Lightbox */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-[#570A1B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C6A16B]" />
              <span>انقر على أي صورة لتكبيرها واستعراضها بالحجم الكامل</span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="text-xs text-[#570A1B] bg-[#FFF9F1] hover:bg-white px-3 py-1 rounded-lg border border-[#C6A16B] font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#C6A16B]" />
              <span>تكبير</span>
            </button>
          </div>

          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8] rounded-2xl overflow-hidden border border-[#C6A16B] shadow-2xl bg-[#3A2522] group cursor-zoom-in"
            title="انقر لتكبير الصورة"
          >
            <img
              src={apartment.images[activeImageIndex].url}
              alt={apartment.images[activeImageIndex].title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"></div>

            {/* Enlarge Hint */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs flex items-center gap-1.5 border border-white/20">
              <ZoomIn className="w-3.5 h-3.5 text-[#C6A16B]" />
              <span>تكبير الصورة</span>
            </div>

            {/* Image Title Overlay */}
            <div className="absolute bottom-4 right-6 text-right">
              <span className="text-xs text-[#C6A16B] bg-[#570A1B]/90 px-2.5 py-1 rounded border border-[#C6A16B]/40">
                صورة {activeImageIndex + 1} من {apartment.images.length}
              </span>
              <h3 className="font-alexandria font-bold text-base sm:text-xl text-[#FFF9F1] mt-1 drop-shadow">
                {apartment.images[activeImageIndex].title}
              </h3>
            </div>

            {/* Carousel navigation controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#570A1B] text-[#FFF9F1] flex items-center justify-center transition-colors border border-white/20 cursor-pointer z-10"
              aria-label="الصورة السابقة"
            >
              <ChevronLeft className="w-5 h-5 text-[#C6A16B]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#570A1B] text-[#FFF9F1] flex items-center justify-center transition-colors border border-white/20 cursor-pointer z-10"
              aria-label="الصورة التالية"
            >
              <ChevronRight className="w-5 h-5 text-[#C6A16B]" />
            </button>
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
            {apartment.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#570A1B] scale-102 shadow-md ring-2 ring-[#C6A16B]'
                    : 'border-[#C6A16B]/50 opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Specs & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info (8 cols) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            {/* Quick Specs Cards (Mobile optimized) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-[#FFF9F1] p-4 sm:p-5 rounded-2xl border border-[#C6A16B]/50 shadow-md text-center">
              <div className="p-3 bg-[#F3E2CC]/50 rounded-xl">
                <Maximize2 className="w-5 h-5 text-[#570A1B] mx-auto mb-1.5" />
                <div className="text-[11px] text-[#3A2522]/70">المساحة الإجمالية</div>
                <div className="font-alexandria font-bold text-sm sm:text-base text-[#570A1B]">{apartment.area} م²</div>
              </div>

              <div className="p-3 bg-[#F3E2CC]/50 rounded-xl">
                <Bed className="w-5 h-5 text-[#570A1B] mx-auto mb-1.5" />
                <div className="text-[11px] text-[#3A2522]/70">غرف النوم</div>
                <div className="font-alexandria font-bold text-xs sm:text-sm text-[#570A1B]">
                  غرفة ماستر + غرفة نوم (سريرين مفردة)
                </div>
              </div>

              <div className="p-3 bg-[#F3E2CC]/50 rounded-xl">
                <Bath className="w-5 h-5 text-[#570A1B] mx-auto mb-1.5" />
                <div className="text-[11px] text-[#3A2522]/70">دورات المياه</div>
                <div className="font-alexandria font-bold text-sm sm:text-base text-[#570A1B]">2 حمامات</div>
              </div>

              <div className="p-3 bg-[#F3E2CC]/50 rounded-xl">
                <Users className="w-5 h-5 text-[#570A1B] mx-auto mb-1.5" />
                <div className="text-[11px] text-[#3A2522]/70">الطاقة الاستيعابية</div>
                <div className="font-alexandria font-bold text-sm sm:text-base text-[#570A1B]">حتى 7 ضيوف</div>
              </div>
            </div>

            {/* Extra Bedding Banner */}
            <div className="bg-[#FFF9F1] p-4 rounded-xl border border-[#C6A16B] text-xs text-[#570A1B] flex items-center gap-2.5 text-right font-medium">
              <Sparkles className="w-4 h-4 text-[#C6A16B] shrink-0" />
              <span>مشمول بالشقة: عدد مراتب اضافيه 3 مع بطانيات ومخدات إضافية لتوفير أعلى مستويات الراحة.</span>
            </div>

            {/* Long Description */}
            <div className="bg-[#FFF9F1] p-5 sm:p-7 rounded-2xl border border-[#C6A16B]/50 shadow-md space-y-3 text-right">
              <h2 className="font-alexandria font-bold text-lg sm:text-xl text-[#570A1B]">
                عن الشقة وتجربة الإقامة
              </h2>
              <div className="w-12 h-0.5 bg-[#C6A16B] rounded"></div>
              <p className="text-xs sm:text-sm md:text-base text-[#3A2522]/90 leading-relaxed font-light">
                {apartment.description}
              </p>
              <div className="pt-2 text-xs text-[#570A1B] font-medium bg-[#F3E2CC]/40 p-3 rounded-lg border border-[#C6A16B]/30">
                توزيع الغرف والأسرّة: {apartment.beds}
              </div>
            </div>

            {/* Categorized Amenities */}
            <div className="bg-[#FFF9F1] p-5 sm:p-7 rounded-2xl border border-[#C6A16B]/50 shadow-md space-y-5 text-right">
              <h2 className="font-alexandria font-bold text-lg sm:text-xl text-[#570A1B]">
                التجهيزات والخدمات الفندقية
              </h2>
              <div className="w-12 h-0.5 bg-[#C6A16B] rounded"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {apartment.amenities.map((category, idx) => (
                  <div key={idx} className="bg-[#F3E2CC]/40 p-4 rounded-xl border border-[#C6A16B]/30 space-y-2.5">
                    <h3 className="font-alexandria font-bold text-xs sm:text-sm text-[#570A1B] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C6A16B]" />
                      <span>{category.category}</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-[#3A2522]">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#570A1B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules and Policies */}
            <div className="bg-[#FFF9F1] p-5 sm:p-7 rounded-2xl border border-[#C6A16B]/50 shadow-md space-y-4 text-right">
              <h2 className="font-alexandria font-bold text-lg sm:text-xl text-[#570A1B] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#C6A16B]" />
                <span>شروط وتعليمات الإقامة</span>
              </h2>
              <div className="w-12 h-0.5 bg-[#C6A16B] rounded"></div>

              <div className="space-y-2 text-xs sm:text-sm text-[#3A2522]">
                {apartment.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F3E2CC]/30">
                    <span className="w-2 h-2 rounded-full bg-[#570A1B] shrink-0 mt-1.5"></span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Booking Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#FFF9F1] p-5 sm:p-6 rounded-2xl border-2 border-[#570A1B] shadow-xl text-right space-y-4 sticky top-28">
              
              <div className="border-b border-[#C6A16B]/40 pb-3">
                <span className="text-xs text-[#570A1B] font-semibold">حجز مباشر ومضمون</span>
                <div className="font-alexandria font-bold text-2xl text-[#570A1B] mt-1">
                  {apartment.pricePerNight.toLocaleString('ar-SA')}{' '}
                  <span className="text-xs font-normal text-[#3A2522]">ريال / الليلة</span>
                </div>
                <p className="text-[11px] text-[#3A2522]/70 mt-1">
                  شامل كافة الخدمات الفندقية، مواقف السيارات، والإنترنت
                </p>
              </div>

              {/* Key Times */}
              <div className="space-y-2.5 bg-[#F3E2CC]/60 p-3 rounded-xl border border-[#C6A16B]/30 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#570A1B] font-medium">
                    <Clock className="w-4 h-4 text-[#C6A16B]" />
                    <span>تسجيل الوصول</span>
                  </div>
                  <span className="font-bold">4:00 عصراً (16:00)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#570A1B] font-medium">
                    <Clock className="w-4 h-4 text-[#C6A16B]" />
                    <span>تسجيل المغادرة</span>
                  </div>
                  <span className="font-bold">1:00 ظهراً (13:00)</span>
                </div>
              </div>

              {/* CTA Booking Button */}
              <button
                onClick={() => onBook(apartment.id)}
                className="w-full bg-[#570A1B] hover:bg-[#84394A] text-[#FFF9F1] py-3.5 px-4 rounded-xl font-alexandria font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 border border-[#C6A16B] cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C6A16B]" />
                <span>بدء إجراءات الحجز</span>
              </button>

              {/* Instant WhatsApp Concierge */}
              <a
                href={`https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن حجز ${apartment.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl font-alexandria font-medium text-xs sm:text-sm transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>استفسار فوري عبر واتساب</span>
              </a>

              {/* Phone direct */}
              <a
                href={`tel:${SITE_INFO.phone}`}
                className="w-full bg-[#F3E2CC] hover:bg-[#e7d2b8] text-[#570A1B] py-2.5 px-4 rounded-xl font-alexandria font-medium text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#570A1B]/30 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#570A1B]" />
                <span>الاتصال بالاستقبال: {SITE_INFO.phone}</span>
              </a>

              <div className="text-center pt-2 border-t border-[#C6A16B]/30">
                <p className="text-[11px] text-[#3A2522]/70 leading-normal">
                  يتم إصدار <strong className="text-[#570A1B]">عقد إيجار إلكتروني رسمي</strong> فور استكمال بيانات الحجز وتأكيده.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        images={apartment.images}
        currentIndex={activeImageIndex}
        apartmentName={apartment.name}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={prevImage}
        onNext={nextImage}
        onSelectIndex={(idx) => setActiveImageIndex(idx)}
      />

    </div>
  );
};
