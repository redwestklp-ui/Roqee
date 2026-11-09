import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Navigation, 
  Sparkles, 
  ShoppingBag, 
  Trees, 
  Coffee, 
  UtensilsCrossed, 
  Cake, 
  Store, 
  Compass, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { SITE_INFO } from '../data/apartmentsData';
import { 
  NEARBY_LANDMARKS, 
  LandmarkItem, 
  GENERAL_SERVICES_MAP_URL, 
  MAIN_APARTMENT_LOCATION_URL,
  ONE_DAY_TOUR_PROGRAM 
} from '../data/landmarksData';

export const LocationSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'الكل', count: NEARBY_LANDMARKS.length, icon: Sparkles },
    { id: 'program', name: 'برنامج اليوم الواحد 🛑', count: ONE_DAY_TOUR_PROGRAM.length, icon: Compass },
    { id: 'malls', name: 'الأسواق والمولات', count: NEARBY_LANDMARKS.filter(l => l.category === 'malls').length, icon: ShoppingBag },
    { id: 'parks', name: 'المنتزهات والطبيعة', count: NEARBY_LANDMARKS.filter(l => l.category === 'parks').length, icon: Trees },
    { id: 'cafes', name: 'المقاهي', count: NEARBY_LANDMARKS.filter(l => l.category === 'cafes').length, icon: Coffee },
    { id: 'restaurants', name: 'المطاعم', count: NEARBY_LANDMARKS.filter(l => l.category === 'restaurants').length, icon: UtensilsCrossed },
    { id: 'sweets', name: 'الحلويات', count: NEARBY_LANDMARKS.filter(l => l.category === 'sweets').length, icon: Cake },
    { id: 'services', name: 'خدمات الحي وقريبة من رُقيّ', count: NEARBY_LANDMARKS.filter(l => l.category === 'services').length, icon: Store },
  ];

  const filteredLandmarks = useMemo(() => {
    return NEARBY_LANDMARKS.filter((item: LandmarkItem) => {
      return activeCategory === 'all' || item.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <section id="location" className="py-12 md:py-20 bg-[#FFF9F1] text-[#3A2522] border-b border-[#C6A16B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#570A1B]/10 text-[#570A1B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A16B]" />
            <span>موقع استراتيجي وهادئ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alexandria font-bold text-[#570A1B]">
            في قلب أرقى أحياء الطائف (حي النسيم)
          </h2>
          <div className="w-16 h-1 bg-[#C6A16B] mx-auto rounded-full"></div>
          <p className="text-xs sm:text-sm md:text-base text-[#3A2522]/80 leading-relaxed font-light">
            موقع مثالي يجمع بين هدوء الحي السكني الفاخر وسهولة الوصول المباشر لأهم معالم ومولات ومنتزهات وخدمات الطائف.
          </p>
        </div>

        {/* Map Visual Card & Directions */}
        <div className="bg-[#F3E2CC] rounded-3xl border-2 border-[#C6A16B] p-5 sm:p-7 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-right">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#570A1B]">
                <MapPin className="w-5 h-5 text-[#C6A16B]" />
                <h3 className="font-alexandria font-bold text-lg">
                  العنوان الدقيق والوصول المباشر
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#3A2522]/90 leading-relaxed">
                {SITE_INFO.address}
              </p>
            </div>

            <div className="text-xs text-[#570A1B] bg-[#FFF9F1] p-3 rounded-xl border border-[#C6A16B]/40 max-w-md">
              ⭐ يتم تزويد الضيف برابط الموقع الجغرافي الدقيق ومسار المواقف الخاصة فور تأكيد الحجز.
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative aspect-[16/9] md:aspect-[21/8] rounded-2xl overflow-hidden border border-[#570A1B]/30 shadow-inner bg-[#e4d3bc] flex items-center justify-center group">
            {/* Grid Vector Effect */}
            <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#570A1B_1px,transparent_1px),linear-gradient(to_bottom,#570A1B_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            {/* Center Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#570A1B] text-[#FFF9F1] flex items-center justify-center border-4 border-[#C6A16B] shadow-2xl animate-pulse">
                <MapPin className="w-7 h-7 text-[#C6A16B]" />
              </div>
              <div className="mt-2 bg-[#570A1B] text-[#FFF9F1] px-4 py-1.5 rounded-full text-xs font-alexandria font-bold border border-[#C6A16B] shadow-md">
                رُقِيّ للشقق الفندقية VIP · حي النسيم
              </div>
            </div>

            {/* Quick Map Button Overlay */}
            <a
              href={MAIN_APARTMENT_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 bg-white hover:bg-white/90 text-[#570A1B] px-4 py-2 rounded-xl text-xs font-alexandria font-bold shadow-lg transition-all flex items-center gap-1.5 border border-[#C6A16B]"
            >
              <Navigation className="w-4 h-4 text-[#C6A16B]" />
              <span>فتح خرائط Google</span>
            </a>
          </div>

          {/* Direct CTA Directions Button */}
          <a
            href={MAIN_APARTMENT_LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#570A1B] hover:bg-[#84394A] text-[#FFF9F1] py-4 px-6 rounded-2xl font-alexandria font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-3 border border-[#C6A16B]"
          >
            <Navigation className="w-5 h-5 text-[#C6A16B]" />
            <span>الحصول على اتجاهات القيادة المباشرة</span>
          </a>
        </div>

        {/* ========================================================
            أبرز المعالم والوجهات القريبة المحدثة بالكامل
        ======================================================== */}
        <div className="space-y-6 pt-4 text-right">
          <div className="border-b border-[#C6A16B]/40 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C6A16B] bg-[#570A1B] px-3 py-1 rounded-full">
                <span>دليل الطائف السياحي والشامل</span>
              </div>
              <h3 className="font-alexandria font-bold text-xl sm:text-2xl text-[#570A1B]">
                أبرز المعالم والوجهات والخدمات القريبة
              </h3>
              <p className="text-xs sm:text-sm text-[#3A2522]/80 font-light">
                استكشف قائمة مختارة ومحدثة لأشهر الأماكن في الطائف والشفا مع زر خرائط Google لكل وجهة.
              </p>
            </div>
          </div>

          {/* Category Tabs Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-alexandria font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive 
                      ? 'bg-[#570A1B] text-[#FFF9F1] border-[#C6A16B] shadow-md scale-102' 
                      : 'bg-[#F3E2CC]/60 text-[#3A2522] border-[#C6A16B]/40 hover:bg-[#F3E2CC] hover:border-[#570A1B]'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#C6A16B]' : 'text-[#570A1B]'}`} />
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#FFF9F1]/20 text-[#FFF9F1]' : 'bg-[#570A1B]/10 text-[#570A1B]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Neighborhood Services Banner */}
          {(activeCategory === 'services' || activeCategory === 'all') && (
            <div className="bg-gradient-to-r from-[#570A1B] to-[#731326] text-[#FFF9F1] p-4 sm:p-5 rounded-2xl border border-[#C6A16B] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-right">
                <span className="text-[11px] font-bold text-[#C6A16B] block">
                  🛑 الخدمات المتوفرة في الحي والقريبة من رُقيّ ومجموعة تيرا للشقق الفندقية
                </span>
                <p className="text-xs text-[#FFF9F1]/90 font-light">
                  تموينات، مخابز، مغاسل ملابس، مطاعم فطور وسريعة، صيدليات، ومشاغل نسائية متوفرة على بعد خطوات.
                </p>
              </div>

              <a
                href={GENERAL_SERVICES_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#C6A16B] hover:bg-[#b89158] text-[#570A1B] font-alexandria font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-all flex items-center gap-1.5"
              >
                <span>خريطة خدمات الحي الشاملة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* CASE 1: ONE-DAY TOUR PROGRAM TIMELINE */}
          {activeCategory === 'program' && (
            <div className="space-y-4">
              <div className="bg-[#570A1B] text-[#FFF9F1] p-4 sm:p-5 rounded-2xl border border-[#C6A16B]">
                <h4 className="font-alexandria font-bold text-base sm:text-lg text-[#C6A16B] flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#C6A16B]" />
                  <span>🛑 برنامج اليوم الواحد السياحي في الطائف والشفا</span>
                </h4>
                <p className="text-xs text-[#FFF9F1]/85 mt-1 font-light leading-relaxed">
                  برنامج متكامل ومجرب يبدأ من الساعة 4:30 عصراً في أحضان الطبيعة بوادي غزال، وصولاً إلى قمة جبل دكا ومقاهي الشفا، ومنتزه الردف ومعرض الورد الطائفي.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ONE_DAY_TOUR_PROGRAM.map((step) => (
                  <div 
                    key={step.stepNumber}
                    className="bg-[#FFF9F1] rounded-2xl p-4 sm:p-5 border-2 border-[#C6A16B]/60 hover:border-[#570A1B] shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded-full bg-[#570A1B] text-[#C6A16B] flex items-center justify-center font-alexandria font-bold text-xs border border-[#C6A16B]">
                          {step.stepNumber}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#570A1B] bg-[#F3E2CC] px-2.5 py-1 rounded-full border border-[#C6A16B]/40">
                          <Clock className="w-3.5 h-3.5 text-[#C6A16B]" />
                          <span>{step.time}</span>
                        </div>
                      </div>

                      <h5 className="font-alexandria font-bold text-sm sm:text-base text-[#570A1B] group-hover:text-[#84394A] transition-colors">
                        {step.title}
                      </h5>

                      <p className="text-xs text-[#3A2522]/80 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>

                    <a
                      href={step.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#570A1B] hover:bg-[#84394A] text-[#FFF9F1] py-2.5 px-3 rounded-xl font-alexandria font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 border border-[#C6A16B]"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#C6A16B]" />
                      <span>فتح الموقع في خرائط Google</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CASE 2: REGULAR LANDMARKS & SERVICES LIST */}
          {activeCategory !== 'program' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLandmarks.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFF9F1] rounded-2xl p-4 sm:p-5 border border-[#C6A16B]/50 hover:border-[#570A1B] shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-[#570A1B] bg-[#F3E2CC] px-2.5 py-0.5 rounded-full border border-[#C6A16B]/40">
                        {item.tag || item.subCategory || 'وجهة مميزة'}
                      </span>
                      {item.subCategory && (
                        <span className="text-[10px] text-[#3A2522]/70 font-medium">
                          {item.subCategory}
                        </span>
                      )}
                    </div>

                    <h4 className="font-alexandria font-bold text-sm sm:text-base text-[#570A1B] group-hover:text-[#84394A] transition-colors leading-snug">
                      {item.name}
                    </h4>

                    {item.description && (
                      <p className="text-xs text-[#3A2522]/80 leading-relaxed font-light line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#570A1B] hover:bg-[#84394A] text-[#FFF9F1] py-2.5 px-3 rounded-xl font-alexandria font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 border border-[#C6A16B] group-hover:bg-[#570A1B]"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#C6A16B]" />
                    <span>فتح في خرائط Google 🗺️</span>
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
