import React, { useState } from 'react';
import { 
  Maximize2, 
  Bed, 
  Bath, 
  Users, 
  Calendar, 
  Check, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  Key,
  Layers,
  Share2,
  Tv,
  Coffee,
  Car,
  ArrowRight,
  ZoomIn,
  Crown,
  Home
} from 'lucide-react';
import { APARTMENTS, Apartment, SITE_INFO } from '../data/apartmentsData';
import { ImageLightboxModal } from './ImageLightboxModal';

interface ApartmentsShowcaseProps {
  selectedApartmentId?: string;
  onSelectApartment: (id: string) => void;
  onBookApartment: (id: string) => void;
}

export const ApartmentsShowcase: React.FC<ApartmentsShowcaseProps> = ({
  selectedApartmentId = 'apt-01',
  onSelectApartment,
  onBookApartment
}) => {
  // When null: show the 2 options without images.
  // When an id is chosen: hide the 2 options and show only that apartment's details.
  const [selectedViewAptId, setSelectedViewAptId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const currentApartment = APARTMENTS.find(a => a.id === (selectedViewAptId || selectedApartmentId || 'apt-01')) || APARTMENTS[0];

  const handleOpenApartmentDetails = (aptId: string) => {
    setSelectedViewAptId(aptId);
    setActiveImageIndex(0);
    onSelectApartment(aptId);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBackToOptions = () => {
    setSelectedViewAptId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % currentApartment.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + currentApartment.images.length) % currentApartment.images.length);
  };

  return (
    <section id="apartments" className="py-6 sm:py-10 md:py-14 bg-[#F3E2CC] text-[#3A2522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* ========================================================
            CASE 1: THE TWO CHOICES (NO IMAGES)
            Shown initially when selectedViewAptId === null
        ======================================================== */}
        {selectedViewAptId === null && (
          <div className="space-y-8 sm:space-y-10">
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#570A1B] text-[#C6A16B] text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A16B]" />
                <span>شقق رُقِيّ الفندقية الفاخرة · الطائف</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-alexandria font-bold text-[#570A1B]">
                اختر الشقة لاستعراض تفاصيلها
              </h1>
              <div className="w-16 h-1 bg-[#C6A16B] mx-auto rounded-full"></div>
              <p className="text-sm sm:text-base md:text-lg text-[#261513] font-medium leading-relaxed max-w-2xl mx-auto">
                شقق فندقيه فاخره بتأثيث راقٍ متكامل وخصوصية تامة، اختر الشقة المناسبة للاطلاع على كافة صورها وتجهيزاتها ومرافقها.
              </p>
            </div>

            {/* The 2 Apartment Cards (Natural, Compact, Proportional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-2xl sm:max-w-3xl mx-auto">
              {APARTMENTS.map((apt: Apartment) => (
                <div
                  key={apt.id}
                  onClick={() => handleOpenApartmentDetails(apt.id)}
                  className="bg-[#FFFDF9] p-4.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-[#D8BC93] hover:border-[#610B1C] shadow-[0_8px_24px_rgba(97,11,28,0.06)] hover:shadow-[0_16px_32px_rgba(97,11,28,0.12)] transition-all duration-300 cursor-pointer text-right flex flex-col justify-between group select-none relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Top Row: Burgundy Pill Badge (Right) + Circle Number (Left) */}
                    <div className="flex items-center justify-between gap-2">
                      {/* Top-Right: Burgundy Pill Badge with Gold Crown */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#610B1C] text-[#FFF4E4] shadow-xs border border-[#C6A16B]/30">
                        <Crown className="w-3 h-3 text-[#E5BE7B] stroke-[2.2] fill-[#E5BE7B]/30 shrink-0" />
                        <span className="text-[11px] font-alexandria font-bold tracking-wider">
                          VIP
                        </span>
                        <span className="text-[#C6A16B] text-[10px] font-bold">•</span>
                        <span className="text-[11px] font-alexandria font-bold tracking-wide">
                          {apt.area} متر مربع
                        </span>
                      </div>

                      {/* Top-Left: Solid Burgundy Circle with Number */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#610B1C] text-[#FFF4E4] flex items-center justify-center font-alexandria font-bold text-sm sm:text-base shadow-xs border border-[#C6A16B]/30 group-hover:scale-105 transition-transform shrink-0">
                        {apt.number}
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="text-right pt-0.5 space-y-0.5">
                      <h2 className="font-alexandria font-bold text-xl sm:text-2xl text-[#610B1C] group-hover:text-[#841A2E] transition-colors leading-snug">
                        {apt.name}
                      </h2>
                      <p className="text-xs text-[#6C524C] font-normal leading-relaxed">
                        فاخره استثنائية مناسبة
                      </p>
                    </div>

                    {/* Specifications Box: 3 Columns with beige card and icons */}
                    <div className="bg-[#FCEFE0] rounded-xl border border-[#E5CEB1] py-2.5 px-2 sm:px-3 my-1.5 shadow-xs">
                      <div className="grid grid-cols-3 divide-x divide-x-reverse divide-[#DFC6A7] text-center items-center">
                        {/* 1. المساحة (Right) */}
                        <div className="px-1">
                          <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-[#6C524C] font-medium mb-0.5">
                            <Home className="w-3.5 h-3.5 text-[#610B1C] shrink-0" />
                            <span>المساحة</span>
                          </div>
                          <div className="font-alexandria font-bold text-sm sm:text-base text-[#610B1C]">
                            {apt.area} م²
                          </div>
                        </div>

                        {/* 2. غرف النوم (Center) */}
                        <div className="px-1">
                          <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-[#6C524C] font-medium mb-0.5">
                            <Bed className="w-3.5 h-3.5 text-[#610B1C] shrink-0" />
                            <span>غرف النوم</span>
                          </div>
                          <div className="font-alexandria font-bold text-xs sm:text-sm text-[#610B1C]">
                            غرفة ماستر
                          </div>
                        </div>

                        {/* 3. دورات المياه (Left) */}
                        <div className="px-1">
                          <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-[#6C524C] font-medium mb-0.5">
                            <Bath className="w-3.5 h-3.5 text-[#610B1C] shrink-0" />
                            <span>دورات المياه</span>
                          </div>
                          <div className="font-alexandria font-bold text-sm sm:text-base text-[#610B1C]">
                            2 حمامات
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features Checklist with Burgundy Circle Icons on the Right */}
                    <div className="space-y-2 text-xs sm:text-[13px] text-[#3A2320] text-right py-0.5">
                      {/* Line 1 */}
                      <div className="flex items-center gap-2 justify-start">
                        <span className="w-4 h-4 rounded-full bg-[#610B1C] text-[#FFF4E4] flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-2.5 h-2.5 text-[#FFF4E4] stroke-[3]" />
                        </span>
                        <span className="font-medium text-[#3A2320]">
                          صالة ومطبخ ودخول ذكي
                        </span>
                      </div>

                      {/* Line 2 */}
                      <div className="flex items-center gap-2 justify-start">
                        <span className="w-4 h-4 rounded-full bg-[#610B1C] text-[#FFF4E4] flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-2.5 h-2.5 text-[#FFF4E4] stroke-[3]" />
                        </span>
                        <span className="font-medium text-[#3A2320]">
                          غرفة ماستر مع دورة مياه + <strong className="text-[#610B1C] font-bold">غرفة اضافية (سريرين مفردة)</strong>
                        </span>
                      </div>

                      {/* Line 3 */}
                      <div className="flex items-center gap-2 justify-start">
                        <span className="w-4 h-4 rounded-full bg-[#610B1C] text-[#FFF4E4] flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-2.5 h-2.5 text-[#FFF4E4] stroke-[3]" />
                        </span>
                        <span className="font-medium text-[#3A2320]">
                          عدد مراتب اضافية 3 مع بطانيات ومخدات (سعة حتى 7 ضيوف)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="w-full h-px bg-[#E8D5BF]/80 my-3"></div>

                  {/* Bottom Row: Price & Action CTA Button */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Burgundy Pill Button on the Left */}
                    <button
                      type="button"
                      className="px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-[#610B1C] hover:bg-[#7D1126] text-[#FFFDF9] font-alexandria font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-[#C6A16B]/40 group-hover:scale-[1.02]"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#FFFDF9] stroke-[2.5]" />
                      <span>استعراض التفاصيل</span>
                    </button>

                    {/* Price on the Right */}
                    <div className="text-right">
                      <div className="text-[10px] sm:text-[11px] text-[#6C524C] font-normal leading-none mb-1">
                        سعر الليلة الواحدة
                      </div>
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="font-alexandria font-black text-xl sm:text-2xl text-[#610B1C] tracking-tight">
                          {apt.id === 'apt-01' ? '1.450' : '1.150'}
                        </span>
                        <span className="font-alexandria font-bold text-xs text-[#C6A16B]">
                          ر.س
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            CASE 2: CHOSEN APARTMENT COMPLETE DETAILS
            Shown when selectedViewAptId !== null
        ======================================================== */}
        {selectedViewAptId !== null && (
          <div className="bg-[#FFF9F1] rounded-3xl border border-[#C6A16B] shadow-2xl p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 text-right">
            
            {/* Top Bar: Return Button + Apartment Title */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C6A16B]/40">
              <button
                onClick={handleBackToOptions}
                className="inline-flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-xl bg-[#570A1B] hover:bg-[#84394A] text-[#FFF9F1] border border-[#C6A16B] text-xs sm:text-sm font-alexandria font-bold transition-all shadow-md cursor-pointer group"
              >
                <ArrowRight className="w-4 h-4 text-[#C6A16B] transition-transform group-hover:translate-x-1" />
                <span>العودة لاختيار الشقق</span>
              </button>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-alexandria font-bold text-[#570A1B]">
                <span className="w-2 h-2 rounded-full bg-[#C6A16B]"></span>
                <span>تفاصيل {currentApartment.name}</span>
              </div>
            </div>

            {/* Header of Chosen Apartment */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#C6A16B]/30">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#570A1B] text-[#FFF9F1] font-bold">
                    {currentApartment.name}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#F3E2CC] text-[#570A1B] font-medium border border-[#C6A16B]/50">
                    المساحة {currentApartment.area} م²
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-300">
                    متاحة للحجز الفوري
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-alexandria font-bold text-[#570A1B]">
                  {currentApartment.name} · {currentApartment.tagline}
                </h2>
                <p className="text-xs sm:text-sm text-[#3A2522]/80 font-light max-w-2xl leading-relaxed">
                  {currentApartment.description}
                </p>
              </div>

              {/* Price Card & CTAs */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
                <div className="bg-[#570A1B] text-[#FFF9F1] p-4 rounded-2xl border border-[#C6A16B] text-center lg:text-left min-w-[200px]">
                  <div className="text-[11px] text-[#C6A16B]">سعر الإقامة لليلة</div>
                  <div className="font-alexandria font-extrabold text-2xl text-[#FFF9F1] mt-0.5">
                    {currentApartment.pricePerNight.toLocaleString('ar-SA')}{' '}
                    <span className="text-xs font-normal text-[#C6A16B]">ر.س</span>
                  </div>
                  <div className="text-[10px] text-[#FFF9F1]/70 mt-1">
                    شامل الخدمات والمواقف والإنترنت
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <button
                    onClick={() => onBookApartment(currentApartment.id)}
                    className="flex-1 bg-gradient-to-r from-[#C6A16B] to-[#b38d55] text-[#570A1B] hover:brightness-105 py-3 px-5 rounded-xl font-alexandria font-bold text-xs sm:text-sm shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>احجز هذه الشقة الآن</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 bg-[#F3E2CC] hover:bg-[#ebd3b5] text-[#570A1B] rounded-xl border border-[#C6A16B]/60 transition-colors cursor-pointer"
                    title="مشاركة رابط الشقة"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                {copiedLink && (
                  <span className="text-xs text-emerald-700 font-bold self-center">تم نسخ الرابط بنجاح</span>
                )}
              </div>
            </div>

            {/* Photo Gallery with LIGHTBOX ENLARGEMENT */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#570A1B]">
                  <Sparkles className="w-4 h-4 text-[#C6A16B]" />
                  <span>معرض الصور (انقر على أي صورة لتكبيرها)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="text-xs text-[#570A1B] bg-[#F3E2CC] hover:bg-[#ebd3b5] px-3 py-1.5 rounded-lg border border-[#C6A16B]/60 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#C6A16B]" />
                  <span>تكبير الشاشة</span>
                </button>
              </div>

              {/* Main Active Image Display */}
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] bg-[#241411] border border-[#C6A16B] shadow-xl group cursor-zoom-in"
                title="انقر لتكبير الصورة"
              >
                <img
                  src={currentApartment.images[activeImageIndex].url}
                  alt={currentApartment.images[activeImageIndex].title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Enlarge Hint Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs flex items-center gap-1.5 border border-white/20">
                  <ZoomIn className="w-3.5 h-3.5 text-[#C6A16B]" />
                  <span>تكبير الصورة</span>
                </div>

                {/* Caption Overlay */}
                <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between text-[#FFF9F1]">
                  <div>
                    <span className="text-[10px] text-[#C6A16B] font-bold uppercase tracking-wider block">
                      {currentApartment.name}
                    </span>
                    <h3 className="font-alexandria font-bold text-sm sm:text-lg text-[#FFF9F1] drop-shadow-md">
                      {currentApartment.images[activeImageIndex].title}
                    </h3>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs border border-white/20">
                    {activeImageIndex + 1} / {currentApartment.images.length}
                  </div>
                </div>

                {/* Prev / Next Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#570A1B]/80 hover:bg-[#570A1B] text-[#FFF9F1] border border-[#C6A16B] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-md cursor-pointer z-10"
                  title="الصورة السابقة"
                >
                  <ChevronLeft className="w-5 h-5 text-[#C6A16B]" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#570A1B]/80 hover:bg-[#570A1B] text-[#FFF9F1] border border-[#C6A16B] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-md cursor-pointer z-10"
                  title="الصورة التالية"
                >
                  <ChevronRight className="w-5 h-5 text-[#C6A16B]" />
                </button>
              </div>

              {/* Thumbnails Ribbon */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
                {currentApartment.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      // If clicked twice or user wants zoom, open lightbox
                    }}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#C6A16B] shadow-md scale-102 ring-2 ring-[#570A1B]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Bar (Updated per request) */}
            <div className="space-y-3">
              <h3 className="font-alexandria font-bold text-base text-[#570A1B] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C6A16B]" />
                <span>مواصفات وتفاصيل {currentApartment.name}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-[#F3E2CC] p-3 rounded-xl border border-[#C6A16B] text-center">
                  <Maximize2 className="w-5 h-5 text-[#570A1B] mx-auto mb-1" />
                  <div className="text-[11px] text-[#3A2522]/80">المساحة الإجمالية</div>
                  <div className="font-alexandria font-bold text-sm text-[#570A1B]">{currentApartment.area} م²</div>
                </div>

                <div className="bg-[#F3E2CC] p-3 rounded-xl border border-[#C6A16B] text-center">
                  <Bed className="w-5 h-5 text-[#570A1B] mx-auto mb-1" />
                  <div className="text-[11px] text-[#3A2522]/80">غرف النوم</div>
                  <div className="font-alexandria font-bold text-xs sm:text-sm text-[#570A1B]">
                    غرفة ماستر + غرفة نوم (سريرين مفردة)
                  </div>
                </div>

                <div className="bg-[#F3E2CC] p-3 rounded-xl border border-[#C6A16B] text-center">
                  <Bath className="w-5 h-5 text-[#570A1B] mx-auto mb-1" />
                  <div className="text-[11px] text-[#3A2522]/80">دورات المياه</div>
                  <div className="font-alexandria font-bold text-sm text-[#570A1B]">2 حمامات</div>
                </div>

                <div className="bg-[#F3E2CC] p-3 rounded-xl border border-[#C6A16B] text-center">
                  <Users className="w-5 h-5 text-[#570A1B] mx-auto mb-1" />
                  <div className="text-[11px] text-[#3A2522]/80">السعة الاستيعابية</div>
                  <div className="font-alexandria font-bold text-sm text-[#570A1B]">حتى 7 ضيوف</div>
                </div>

                <div className="bg-[#F3E2CC] p-3 rounded-xl border border-[#C6A16B] text-center">
                  <Key className="w-5 h-5 text-[#570A1B] mx-auto mb-1" />
                  <div className="text-[11px] text-[#3A2522]/80">الدخول الذكي</div>
                  <div className="font-alexandria font-bold text-sm text-[#570A1B]">رمز مشفر إلكتروني</div>
                </div>

                <div className="bg-[#F3E2CC] p-3 rounded-xl border border-[#C6A16B] text-center">
                  <Car className="w-5 h-5 text-[#570A1B] mx-auto mb-1" />
                  <div className="text-[11px] text-[#3A2522]/80">مواقف السيارات</div>
                  <div className="font-alexandria font-bold text-sm text-[#570A1B]">مواقف خاصة</div>
                </div>
              </div>

              {/* Extra Bedding Highlight */}
              <div className="bg-[#F3E2CC]/80 p-3.5 rounded-xl border border-[#C6A16B] flex items-center gap-2.5 text-xs text-[#570A1B]">
                <Sparkles className="w-4 h-4 text-[#C6A16B] shrink-0" />
                <span className="font-bold">
                  تجهيز إضافي مشمول في الشقق: عدد مراتب اضافيه 3 مع بطانيات ومخدات لاستيعاب حتى 7 ضيوف بكل راحة.
                </span>
              </div>
            </div>

            {/* Categorized Amenities */}
            <div className="space-y-4">
              <h3 className="font-alexandria font-bold text-base text-[#570A1B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6A16B]" />
                <span>التجهيزات والمرافق المشمولة</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentApartment.amenities.map((category, idx) => (
                  <div key={idx} className="bg-[#F3E2CC]/60 p-4 sm:p-5 rounded-2xl border border-[#C6A16B]/60 space-y-3">
                    <h4 className="font-alexandria font-bold text-xs sm:text-sm text-[#570A1B] pb-2 border-b border-[#C6A16B]/40 flex items-center gap-2">
                      {idx === 0 && <Bed className="w-4 h-4 text-[#C6A16B]" />}
                      {idx === 1 && <Tv className="w-4 h-4 text-[#C6A16B]" />}
                      {idx === 2 && <Coffee className="w-4 h-4 text-[#C6A16B]" />}
                      {idx === 3 && <ShieldCheck className="w-4 h-4 text-[#C6A16B]" />}
                      <span>{category.category}</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-[#3A2522]">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#570A1B] shrink-0 mt-0.5" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules & Policies */}
            <div className="bg-[#570A1B]/5 p-4 sm:p-6 rounded-2xl border border-[#C6A16B]/40 space-y-3">
              <h3 className="font-alexandria font-bold text-sm sm:text-base text-[#570A1B] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C6A16B]" />
                <span>أوقات الدخول وشروط الإقامة الميسرة</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-[#3A2522]">
                {currentApartment.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-[#FFF9F1] p-3 rounded-xl border border-[#C6A16B]/30">
                    <Check className="w-3.5 h-3.5 text-[#C6A16B] shrink-0 mt-0.5" />
                    <span className="font-normal">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#570A1B] via-[#4d0918] to-[#3a0511] text-[#FFF9F1] border border-[#C6A16B] flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
              <div className="space-y-1 text-right">
                <h3 className="font-alexandria font-bold text-base sm:text-lg text-[#FFF9F1]">
                  جاهز لتأكيد حجز {currentApartment.name}؟
                </h3>
                <p className="text-xs text-[#F3E2CC]/80 font-light">
                  الحجز مباشر مع توثيق إلكتروني فوري ودخول ذاتي ذكي.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <a
                  href={`https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار والتأكيد بشأن حجز ${currentApartment.name} في شقق رُقِيّ الفندقية`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-alexandria font-bold text-xs sm:text-sm transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>محادثة واتساب مباشرة</span>
                </a>

                <button
                  onClick={() => onBookApartment(currentApartment.id)}
                  className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-gradient-to-r from-[#C6A16B] to-[#b38d55] text-[#570A1B] font-alexandria font-bold text-xs sm:text-sm hover:brightness-105 transition-all shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>احجز إقامتك الآن</span>
                </button>

                <button
                  onClick={handleBackToOptions}
                  className="flex-1 md:flex-none px-3.5 py-3 rounded-xl bg-[#FFF9F1]/10 hover:bg-[#FFF9F1]/20 text-[#FFF9F1] border border-[#C6A16B]/60 font-alexandria text-xs transition-colors cursor-pointer"
                >
                  العودة لاختيار الشقق
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Full-Screen Image Lightbox Modal with Smooth Exit */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        images={currentApartment.images}
        currentIndex={activeImageIndex}
        apartmentName={currentApartment.name}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={prevImage}
        onNext={nextImage}
        onSelectIndex={(idx) => setActiveImageIndex(idx)}
      />

    </section>
  );
};
