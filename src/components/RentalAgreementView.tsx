import React from 'react';
import { 
  Printer, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle, 
  Building2, 
  FileText,
  QrCode
} from 'lucide-react';
import { Booking, APARTMENTS, SITE_INFO } from '../data/apartmentsData';

interface RentalAgreementViewProps {
  booking: Booking;
  onBack: () => void;
}

export const RentalAgreementView: React.FC<RentalAgreementViewProps> = ({
  booking,
  onBack
}) => {
  const apartment = APARTMENTS.find(a => a.id === booking.apartmentId) || APARTMENTS[0];

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(booking.createdAt).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="py-8 md:py-12 bg-[#e9dcc8] min-h-screen text-[#3A2522]">
      
      {/* Top Action Bar (Hidden on Print) */}
      <div className="no-print max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <div className="bg-[#570A1B] text-[#FFF9F1] p-4 rounded-2xl border border-[#C6A16B] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 bg-[#FFF9F1]/10 hover:bg-[#FFF9F1]/20 rounded-lg text-[#FFF9F1] transition-colors"
              title="العودة"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-alexandria font-bold text-sm sm:text-base text-[#FFF9F1]">
                عقد إيجار وحدة فندقية مفروشة
              </h2>
              <span className="text-xs text-[#C6A16B]">رقم العقد: {booking.bookingNumber}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none bg-[#C6A16B] hover:bg-[#b58f59] text-[#570A1B] font-alexandria font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة العقد (A4)</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none bg-[#FFF9F1] hover:bg-white text-[#570A1B] font-alexandria font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-[#C6A16B] transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>حفظ كملف PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Printable A4 Document Canvas */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="print-page bg-white p-8 sm:p-12 rounded-2xl shadow-2xl border border-[#C6A16B] space-y-6 text-right text-gray-900 font-sans">
          
          {/* Header Strip: Logo & Official Title */}
          <div className="border-b-2 border-[#570A1B] pb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C6A16B] p-0.5">
                <img
                  src={SITE_INFO.logoUrl}
                  alt="شعار رُقِيّ"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-right">
                <h1 className="font-alexandria font-extrabold text-2xl text-[#570A1B] tracking-wide">
                  رُقِيّ للشقق الفندقية
                </h1>
                <p className="text-xs text-[#C6A16B] font-bold">
                  VIP Hotel Serviced Apartments
                </p>
                <p className="text-[10px] text-gray-500">
                  ترخيص سياحي رقم: {SITE_INFO.tourismLicense} · س.ت: {SITE_INFO.commercialRegister}
                </p>
              </div>
            </div>

            <div className="text-left space-y-1">
              <div className="inline-block bg-[#570A1B] text-[#FFF9F1] px-3 py-1 rounded text-xs font-alexandria font-bold">
                عقد إيجار موحد
              </div>
              <div className="text-xs text-gray-700">
                رقم العقد: <span className="font-mono font-bold text-[#570A1B]">{booking.bookingNumber}</span>
              </div>
              <div className="text-xs text-gray-500">
                تاريخ الإصدار: <span className="font-mono">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Parties Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* First Party (Lessor) */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
              <div className="font-alexandria font-bold text-[#570A1B] text-sm border-b border-gray-200 pb-1">
                الطرف الأول (المؤجر)
              </div>
              <div><strong>الاسم:</strong> إدارة شقق رُقِيّ الفندقية VIP</div>
              <div><strong>السجل التجاري:</strong> {SITE_INFO.commercialRegister}</div>
              <div><strong>العنوان:</strong> {SITE_INFO.address}</div>
              <div><strong>الهاتف للتواصل:</strong> {SITE_INFO.phone}</div>
            </div>

            {/* Second Party (Lessee) */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
              <div className="font-alexandria font-bold text-[#570A1B] text-sm border-b border-gray-200 pb-1">
                الطرف الثاني (المستأجر)
              </div>
              <div><strong>الاسم الكامل:</strong> {booking.guestName}</div>
              <div><strong>رقم الهوية / الإقامة:</strong> <span className="font-mono">{booking.guestIdNumber}</span></div>
              <div><strong>رقم الجوال:</strong> <span className="font-mono">{booking.guestPhone}</span></div>
              <div><strong>البريد الإلكتروني:</strong> <span className="font-mono">{booking.guestEmail}</span></div>
            </div>

          </div>

          {/* Unit & Duration Specifications Table */}
          <div className="space-y-2">
            <h3 className="font-alexandria font-bold text-sm text-[#570A1B]">
              بيانات الوحدة المؤجرة ومدة الإقامة
            </h3>
            <table className="w-full text-xs border border-gray-300 border-collapse text-right">
              <tbody>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <td className="p-2.5 font-bold text-gray-700 w-1/4">رقم واسم الوحدة:</td>
                  <td className="p-2.5 font-semibold text-[#570A1B]">{booking.apartmentName}</td>
                  <td className="p-2.5 font-bold text-gray-700 w-1/4">الدور والمساحة:</td>
                  <td className="p-2.5">{apartment.floor} · {apartment.area} م²</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2.5 font-bold text-gray-700">تاريخ بدء الإيجار:</td>
                  <td className="p-2.5 font-mono">{booking.checkInDate} (الساعة 4:00 عصراً)</td>
                  <td className="p-2.5 font-bold text-gray-700">تاريخ انتهاء الإيجار:</td>
                  <td className="p-2.5 font-mono">{booking.checkOutDate} (الساعة 1:00 ظهراً)</td>
                </tr>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <td className="p-2.5 font-bold text-gray-700">إجمالي مدة الإقامة:</td>
                  <td className="p-2.5 font-bold">{booking.nights} ليالٍ</td>
                  <td className="p-2.5 font-bold text-gray-700">عدد الضيوف المصرح لهم:</td>
                  <td className="p-2.5 font-bold">{booking.guestCount} أشخاص</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown Table */}
          <div className="space-y-2">
            <h3 className="font-alexandria font-bold text-sm text-[#570A1B]">
              البيانات المالية وقيمة العقد
            </h3>
            <table className="w-full text-xs border border-gray-300 border-collapse text-right">
              <thead>
                <tr className="bg-[#570A1B] text-white">
                  <th className="p-2">البيان</th>
                  <th className="p-2">العدد / المدة</th>
                  <th className="p-2">السعر الإفرادي</th>
                  <th className="p-2">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-medium">أجرة إقامة الوحدة الفندقية المفروشة</td>
                  <td className="p-2">{booking.nights} ليالٍ</td>
                  <td className="p-2">{booking.pricePerNight.toLocaleString('ar-SA')} ر.س</td>
                  <td className="p-2 font-bold">{booking.subtotal.toLocaleString('ar-SA')} ر.س</td>
                </tr>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <td className="p-2 font-medium">رسوم خدمات الضيافة والنظافة الفندقية الشاملة</td>
                  <td className="p-2">خدمة كاملة</td>
                  <td className="p-2">-</td>
                  <td className="p-2 font-bold">{booking.serviceFee.toLocaleString('ar-SA')} ر.س</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-medium">مبلغ التأمين الأمني المسترد (تأمين ضد الأضرار)</td>
                  <td className="p-2">مسترد بالكامل</td>
                  <td className="p-2">-</td>
                  <td className="p-2 font-bold">{booking.deposit.toLocaleString('ar-SA')} ر.س</td>
                </tr>
                <tr className="bg-gray-100 font-alexandria font-bold text-sm">
                  <td colSpan={3} className="p-2.5 text-[#570A1B]">
                    المجموع الكلي المدفوع:
                  </td>
                  <td className="p-2.5 text-[#570A1B]">
                    {booking.totalAmount.toLocaleString('ar-SA')} ريال سعودي
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms & Regulations */}
          <div className="space-y-2 text-[11px] text-gray-700 leading-relaxed border-t border-gray-200 pt-3">
            <h4 className="font-alexandria font-bold text-xs text-[#570A1B]">
              الشروط والأحكام والالتزامات النظامية:
            </h4>
            <ol className="list-decimal list-inside space-y-1 pr-1">
              <li>يقر المستأجر بأنه عاين الشقة المؤجرة وما تحتويه من أثاث ومقتنيات وأجهزة وأنها بحالة ممتازة وخالية من أي عيوب.</li>
              <li>يلتزم المستأجر بالمحافظة على هدوء وسكينة المبنى طوال فترة الإقامة.</li>
              <li>التدخين: ممنوع نهائياً داخل الشقة.</li>
              <li>يلتزم المستأجر بتسليم الشقة عند الساعة 1:00 ظهراً في تاريخ انتهاء الإيجار، وأي تأخير دون إذن مسبق يخضع لاحتساب ليلة إضافية.</li>
              <li>يخضع هذا العقد للأنظمة واللوائح المعمول بها في المملكة العربية السعودية وأحكام وزارة السياحة والهيئة العامة للعقار.</li>
            </ol>
          </div>

          {/* Signatures & Verification Stamp */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t-2 border-gray-300 text-center text-xs">
            
            {/* Lessor Signature & Stamp */}
            <div className="space-y-3">
              <span className="font-bold text-[#570A1B] block">توقيع وختم المؤجر</span>
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-[#570A1B] flex flex-col items-center justify-center p-1 bg-red-50/50">
                <span className="text-[10px] text-[#570A1B] font-bold">رُقِيّ VIP</span>
                <span className="text-[8px] text-gray-600">ختم رسمي معتمد</span>
                <span className="text-[8px] text-green-700 font-mono mt-0.5">VERIFIED</span>
              </div>
              <span className="text-[10px] text-gray-500 block">إدارة الشقق الفندقية</span>
            </div>

            {/* QR Code Verification */}
            <div className="space-y-2 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-gray-100 border border-gray-300 rounded-lg p-2 flex items-center justify-center shadow-inner">
                <QrCode className="w-16 h-16 text-[#570A1B]" />
              </div>
              <span className="text-[9px] text-gray-500">
                رمز التحقق الرقمي الموحد
              </span>
            </div>

            {/* Lessee Signature */}
            <div className="space-y-3">
              <span className="font-bold text-[#570A1B] block">توقيع المستأجر الإلكتروني</span>
              <div className="h-24 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-2 bg-gray-50">
                <span className="font-serif italic text-base text-gray-800 tracking-wide">
                  {booking.guestName}
                </span>
                <span className="text-[9px] text-green-700 mt-1">
                  ✓ تم التوقيع والموافقة إلكترونياً
                </span>
                <span className="text-[8px] text-gray-400 font-mono">
                  {new Date(booking.createdAt).toLocaleString('ar-SA')}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 block">
                الهوية: {booking.guestIdNumber}
              </span>
            </div>

          </div>

          {/* Footer watermark */}
          <div className="pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400 flex items-center justify-between">
            <span>نسخة العقد الرسمية المعتمدة رقم {booking.bookingNumber}</span>
            <span>رُقِيّ للشقق الفندقية VIP · الطائف</span>
            <span>صفحة 1 من 1</span>
          </div>

        </div>
      </div>

    </div>
  );
};
