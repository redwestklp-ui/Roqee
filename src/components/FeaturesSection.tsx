import React from 'react';
import { 
  Wifi, 
  Tv, 
  Car, 
  ShieldCheck, 
  Sparkles, 
  Key, 
  Wind 
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const vipFeatures = [
    {
      icon: <Wifi className="w-6 h-6 text-[#C6A16B]" />,
      title: 'إنترنت Wi-Fi',
      description: 'لكل شقة لتصفح ومشاهدة بدقة عالية وعقد اجتماعات العمل بدون انقطاع'
    },
    {
      icon: <Wind className="w-6 h-6 text-[#C6A16B]" />,
      title: 'تكييف سبليت هادئ',
      description: 'نظام سبليت يتيح ضبط درجة الحرارة بدقة في كل غرفة على حدة لراحة فائقة'
    },
    {
      icon: <Tv className="w-6 h-6 text-[#C6A16B]" />,
      title: 'شاشات كبيرة ترفيهية',
      description: 'شاشات كبيره مناسبه للافلام والمسلسلاات'
    },
    {
      icon: <Car className="w-6 h-6 text-[#C6A16B]" />,
      title: 'مواقف خاصة',
      description: 'مواقف مخصصة لكل شقة داخل محيط المبنى مع سهولة تامة في الدخول والخروج'
    },
    {
      icon: <Key className="w-6 h-6 text-[#C6A16B]" />,
      title: 'دخول ذاتي ذكي بدون مفتاح',
      description: 'أقفال إلكترونية مشفرة برمز سري يُولّد تلقائياً لكل ضيف لضمان أقصى درجات الخصوصية'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C6A16B]" />,
      title: 'خصوصية وأمان 24/7',
      description: 'مبنى سكني راقٍ وهادئ وكاميرات مراقبة خارجية للمحيط والمواقف.'
    }
  ];

  return (
    <section id="features" className="pt-12 pb-24 md:pt-16 md:pb-32 bg-[#FFF9F1] text-[#3A2522] border-t border-[#C6A16B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#570A1B]/10 text-[#570A1B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A16B]" />
            <span>معايير الفخامة والراحة الفندقية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alexandria font-bold text-[#570A1B]">
            تجهيزات وخدمات VIP متكاملة
          </h2>
          <div className="w-16 h-1 bg-[#C6A16B] mx-auto rounded-full"></div>
          <p className="text-xs sm:text-sm md:text-base text-[#3A2522]/80 leading-relaxed font-light">
            حرصنا في رُقِيّ على تزويد الشقق بأحدث المرافق والتقنيات لتستمتع بإقامة تلبي أدق تفاصيل الراحة والرفاهية.
          </p>
        </div>

        {/* Features Grid: 6 cards in 2 rows of 3 on desktop, 2 cols on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {vipFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-[#F3E2CC]/40 rounded-2xl p-5 sm:p-6 border border-[#C6A16B]/40 hover:border-[#570A1B] transition-all duration-300 hover:shadow-lg flex flex-col justify-start text-right group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#570A1B] flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="font-alexandria font-bold text-sm sm:text-base text-[#570A1B] mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-[#3A2522]/80 leading-relaxed font-light">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
