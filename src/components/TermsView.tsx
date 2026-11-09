import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import { SITE_INFO } from '../data/apartmentsData';

interface TermsViewProps {
  onBack: () => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onBack }) => {
  return (
    <div className="py-10 md:py-16 bg-[#F3E2CC] min-h-screen text-[#3A2522]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-right">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#C6A16B]/40 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#570A1B] hover:text-[#84394A] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </button>
          <span className="text-xs text-[#C6A16B] font-alexandria">وثيقة السياسات الرسمية</span>
        </div>

        {/* Title Card */}
        <div className="bg-[#570A1B] text-[#FFF9F1] p-6 sm:p-8 rounded-3xl border border-[#C6A16B] shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9F1]/10 text-[#C6A16B] text-xs">
            <FileText className="w-3.5 h-3.5" />
            <span>اتفاقية وشروط الإقامة المعتمدة</span>
          </div>
          <h1 className="font-alexandria font-extrabold text-2xl sm:text-3xl text-[#FFF9F1]">
            الشروط والأحكام وسياسة الإيجار
          </h1>
          <p className="text-xs sm:text-sm text-[#F3E2CC]/90 font-light leading-relaxed">
            تهدف هذه السياسات إلى حماية خصوصية وسكينة ضيوفنا الكرام وضمان تجربة إقامة فندقية راقية ومتميزة تليق بمستوى شقق رُقِيّ.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          
          {/* 1. Check-in & Check-out */}
          <div className="bg-[#FFF9F1] p-6 sm:p-8 rounded-2xl border border-[#C6A16B]/50 shadow-md space-y-4">
            <div className="flex items-center gap-2.5 text-[#570A1B]">
              <Clock className="w-5 h-5 text-[#C6A16B]" />
              <h2 className="font-alexandria font-bold text-lg">
                1. مواعيد تسجيل الوصول والمغادرة
              </h2>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#3A2522] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#570A1B] shrink-0 mt-0.5" />
                <span><strong>موعد تسجيل الوصول:</strong> يبدأ من الساعة 4:00 عصراً (16:00). الدخول ذاتي سلس عبر الرمز الإلكتروني بالدور الأرضي.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#570A1B] shrink-0 mt-0.5" />
                <span><strong>موعد تسجيل المغادرة:</strong> بحد أقصى الساعة 1:00 ظهراً (13:00) لتمكين فريق النظافة والتعقيم الفندقي من تجهيز الشقة للنزيل التالي.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#570A1B] shrink-0 mt-0.5" />
                <span>طلب تمديد المغادرة يخضع للتوفر وموافقة الإدارة المسبقة.</span>
              </li>
            </ul>
          </div>

          {/* 2. House Rules */}
          <div className="bg-[#FFF9F1] p-6 sm:p-8 rounded-2xl border border-[#C6A16B]/50 shadow-md space-y-4">
            <div className="flex items-center gap-2.5 text-[#570A1B]">
              <AlertTriangle className="w-5 h-5 text-[#C6A16B]" />
              <h2 className="font-alexandria font-bold text-lg">
                2. قواعد المحافظة على السكينة والشقة
              </h2>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#3A2522] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#570A1B] mt-2 shrink-0"></span>
                <span><strong>التدخين: ممنوع نهائياً داخل الشقة</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#570A1B] mt-2 shrink-0"></span>
                <span><strong>الهدوء والسكينة:</strong> يُرجى الحفاظ على هدوء المبنى وسكينة النزلاء بعد الساعة 11:00 مساءً.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#570A1B] mt-2 shrink-0"></span>
                <span><strong>الحيوانات الأليفة:</strong> غير مسموحة للحفاظ على المعايير الصحية وتجنب الحساسية.</span>
              </li>
            </ul>
          </div>

          {/* 3. Cancellation Policy */}
          <div className="bg-[#FFF9F1] p-6 sm:p-8 rounded-2xl border border-[#C6A16B]/50 shadow-md space-y-4">
            <h2 className="font-alexandria font-bold text-lg text-[#570A1B]">
              3. سياسة الإلغاء والتعديل الميسرة
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-[#3A2522] leading-relaxed">
              <p>
                - الإلغاء قبل موعد الوصول بأكثر من 48 ساعة: استرداد كامل المبلغ المدفوع.
              </p>
              <p>
                - الإلغاء خلال أقل من 48 ساعة من موعد الوصول: يتم خصم قيمة الليلة الأولى واسترداد باقي المبلغ.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
