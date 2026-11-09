import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Calendar as CalendarIcon, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  FileText,
  AlertCircle,
  CreditCard,
  Copy,
  Check,
  Lock,
  Wallet,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle
} from 'lucide-react';
import { APARTMENTS, BLOCKED_DATES, Booking, isDateBlockedForApartment } from '../data/apartmentsData';

interface BookingWizardProps {
  initialApartmentId?: string;
  onBookingComplete: (booking: Booking) => void;
  onCancel: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialApartmentId = 'apt-01',
  onBookingComplete,
  onCancel
}) => {
  // 4 Streamlined Steps:
  // 1: Apartment & Dates
  // 2: Guest Details & Contract Info
  // 3: Payment System (Al Rajhi Bank)
  // 4: Final Review & Confirmation
  const [step, setStep] = useState<number>(1);
  const [selectedAptId, setSelectedAptId] = useState<string>(initialApartmentId);

  // Dates state
  const [checkIn, setCheckIn] = useState<string>('2026-11-28');
  const [checkOut, setCheckOut] = useState<string>('2026-12-01');

  // Guest details state
  const [guestName, setGuestName] = useState<string>('');
  const [guestIdNumber, setGuestIdNumber] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [notes, setNotes] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>('');

  // Payment State (Al Rajhi Bank)
  const [paymentMethod, setPaymentMethod] = useState<'alrajhi_transfer' | 'card' | 'apple_pay'>('alrajhi_transfer');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [transferSenderName, setTransferSenderName] = useState<string>('');
  const [transferRefNumber, setTransferRefNumber] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');

  const selectedApartment = useMemo(() => {
    return APARTMENTS.find(a => a.id === selectedAptId) || APARTMENTS[0];
  }, [selectedAptId]);

  // Calculate nights
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkIn, checkOut]);

  // Pricing calculations
  const pricePerNight = selectedApartment.pricePerNight;
  const subtotal = nights * pricePerNight;
  const serviceFee = selectedApartment.id === 'apt-01' ? 200 : 150;
  const deposit = selectedApartment.depositAmount;
  const totalAmount = subtotal + serviceFee + deposit;

  // Dynamic 10+ Year Calendar State
  const today = useMemo(() => new Date(), []);
  const [calendarYear, setCalendarYear] = useState<number>(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState<number>(today.getMonth()); // 0-11
  const [calendarNotice, setCalendarNotice] = useState<{ message: string; type: 'blocked' | 'success' | 'info' } | null>(null);

  // 12-Year Window (Guarantees working smoothly for at least 10 years forward: 2024–2036+)
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const baseYear = Math.min(currentYear, 2024);
    const years: number[] = [];
    for (let y = baseYear; y <= baseYear + 12; y++) {
      years.push(y);
    }
    return years;
  }, []);

  const ARABIC_MONTHS = [
    'يناير (1)', 'فبراير (2)', 'مارس (3)', 'أبريل (4)',
    'مايو (5)', 'يونيو (6)', 'يوليو (7)', 'أغسطس (8)',
    'سبتمبر (9)', 'أكتوبر (10)', 'نوفمبر (11)', 'ديسمبر (12)'
  ];

  const goToPrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(prev => prev - 1);
    } else {
      setCalendarMonth(prev => prev - 1);
    }
    setCalendarNotice(null);
  };

  const goToNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(prev => prev + 1);
    } else {
      setCalendarMonth(prev => prev + 1);
    }
    setCalendarNotice(null);
  };

  const goToToday = () => {
    const now = new Date();
    setCalendarYear(now.getFullYear());
    setCalendarMonth(now.getMonth());
    setCalendarNotice(null);
  };

  // Status check for Check-In input (Green if available, Red if booked or past)
  const checkInStatus = useMemo(() => {
    if (!checkIn) return { isSet: false, isBlocked: false, isPast: false, message: '' };
    const todayStr = new Date().toISOString().split('T')[0];
    if (checkIn < todayStr) {
      return {
        isSet: true,
        isBlocked: true,
        isPast: true,
        message: '⚠️ تاريخ الوصول في الماضي، يُرجى تحديد تاريخ قادم.'
      };
    }
    const blocked = isDateBlockedForApartment(checkIn, selectedAptId);
    if (blocked) {
      return {
        isSet: true,
        isBlocked: true,
        isPast: false,
        message: `⛔ غير متاح! تاريخ الوصول (${checkIn}) محجوز مسبقاً في ${selectedApartment.name}. يُرجى اختيار تاريخ متاح باللون الأخضر.`
      };
    }
    return {
      isSet: true,
      isBlocked: false,
      isPast: false,
      message: `✓ تاريخ الوصول (${checkIn}) متاح ومؤكد للحجز الفوري.`
    };
  }, [checkIn, selectedAptId, selectedApartment.name]);

  // Status check for Check-Out input (Green if available, Red if invalid or blocked dates in range)
  const checkOutStatus = useMemo(() => {
    if (!checkOut) return { isSet: false, isBlocked: false, isInvalid: false, message: '' };
    if (!checkIn) return { isSet: true, isBlocked: false, isInvalid: false, message: 'يرجى تحديد تاريخ الوصول أولاً.' };
    
    if (checkOut <= checkIn) {
      return {
        isSet: true,
        isBlocked: true,
        isInvalid: true,
        message: '⚠️ تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول بيوم على الأقل.'
      };
    }

    // Check if any date in the entire range is blocked
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    let blockedDateStr: string | null = null;
    const cur = new Date(startDate);
    
    while (cur < endDate) {
      const pad = (n: number) => n < 10 ? `0${n}` : `${n}`;
      const curStr = `${cur.getFullYear()}-${pad(cur.getMonth() + 1)}-${pad(cur.getDate())}`;
      if (isDateBlockedForApartment(curStr, selectedAptId)) {
        blockedDateStr = curStr;
        break;
      }
      cur.setDate(cur.getDate() + 1);
    }

    if (blockedDateStr) {
      return {
        isSet: true,
        isBlocked: true,
        isInvalid: false,
        message: `⛔ الفترة غير متاحة! يوم (${blockedDateStr}) محجوز بالفعل. يُرجى اختيار فترة خالية باللون الأخضر.`
      };
    }

    return {
      isSet: true,
      isBlocked: false,
      isInvalid: false,
      message: `✓ مدة الإقامة (${nights} ليالٍ) متاحة بالكامل ومؤكدة.`
    };
  }, [checkIn, checkOut, selectedAptId, nights]);

  // Calendar days and weekday offset for accurate day alignment
  const calendarData = useMemo(() => {
    const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay(); // 0 = Sun ... 6 = Sat
    const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const pad = (n: number) => n < 10 ? `0${n}` : `${n}`;
    const monthFormatted = pad(calendarMonth + 1);
    const todayStr = new Date().toISOString().split('T')[0];

    const days: { 
      dateStr: string; 
      dayNum: number; 
      isBlocked: boolean; 
      isPast: boolean;
    }[] = [];

    for (let d = 1; d <= totalDays; d++) {
      const dayFormatted = pad(d);
      const dateStr = `${calendarYear}-${monthFormatted}-${dayFormatted}`;
      const isBlocked = isDateBlockedForApartment(dateStr, selectedAptId);
      const isPast = dateStr < todayStr;

      days.push({
        dateStr,
        dayNum: d,
        isBlocked,
        isPast
      });
    }

    return { firstDayOfWeek, days };
  }, [calendarYear, calendarMonth, selectedAptId]);

  const handleDateClick = (dateStr: string, isBlocked: boolean, isPast: boolean) => {
    if (isPast) {
      setCalendarNotice({
        type: 'blocked',
        message: `⚠️ هذا التاريخ من الماضي (${dateStr}) ولا يمكن اختياره للحجز.`
      });
      return;
    }

    if (isBlocked) {
      setCalendarNotice({
        type: 'blocked',
        message: `⛔ هذا اليوم (${dateStr}) محجوز بالكامل في ${selectedApartment.name}. تم تمييزه باللون الأحمر لتوضيح عدم توفره. يُرجى اختيار موعد متاح باللون الأخضر.`
      });
      return;
    }

    setValidationError('');

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut('');
      setCalendarNotice({
        type: 'success',
        message: `✓ تم تحديد تاريخ الوصول (${dateStr}). الآن انقر على تاريخ المغادرة.`
      });
    } else if (checkIn && !checkOut) {
      if (dateStr > checkIn) {
        // Check if any date in range is blocked
        const start = new Date(checkIn);
        const end = new Date(dateStr);
        let blockedDay: string | null = null;
        const cur = new Date(start);
        
        while (cur < end) {
          const pad = (n: number) => n < 10 ? `0${n}` : `${n}`;
          const cStr = `${cur.getFullYear()}-${pad(cur.getMonth() + 1)}-${pad(cur.getDate())}`;
          if (isDateBlockedForApartment(cStr, selectedAptId)) {
            blockedDay = cStr;
            break;
          }
          cur.setDate(cur.getDate() + 1);
        }

        if (blockedDay) {
          setValidationError(`الفترة المحددة تتضمن يوماً محجوزاً (${blockedDay}). يرجى اختيار فترة متاحة باللون الأخضر.`);
          setCalendarNotice({
            type: 'blocked',
            message: `⚠️ لا يمكن اختيار هذه الفترة لأن يوم (${blockedDay}) محجوز مسبقاً! اختر تواريخ خالية باللون الأخضر.`
          });
          return;
        }

        setCheckOut(dateStr);
        setCalendarNotice({
          type: 'success',
          message: `✓ تم تأكيد فترة الإقامة بنجاح من ${checkIn} إلى ${dateStr} (${nights} ليالٍ).`
        });
      } else {
        setCheckIn(dateStr);
        setCheckOut('');
        setCalendarNotice({
          type: 'success',
          message: `✓ تم تحديث تاريخ الوصول إلى (${dateStr}). الآن انقر على تاريخ المغادرة.`
        });
      }
    }
  };

  const isDateSelected = (dateStr: string) => {
    if (dateStr === checkIn) return 'check-in';
    if (dateStr === checkOut) return 'check-out';
    if (checkIn && checkOut && dateStr > checkIn && dateStr < checkOut) return 'in-range';
    return 'none';
  };

  const handleCopyText = (text: string, fieldKey: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 3000);
    }
  };

  const handleNextStep = () => {
    setValidationError('');

    // Step 1 validation
    if (step === 1) {
      if (!checkIn || !checkOut) {
        setValidationError('يرجى تحديد كلٍ من تاريخ الوصول وتاريخ المغادرة.');
        return;
      }
      if (nights < 1) {
        setValidationError('تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول بيوم على الأقل.');
        return;
      }
      if (checkInStatus.isBlocked) {
        setValidationError('تاريخ الوصول المحدد محجوز مسبقاً. يُرجى اختيار تاريخ متاح باللون الأخضر للمتابعة.');
        return;
      }
      if (checkOutStatus.isBlocked) {
        setValidationError('الفترة المختارة تحتوي على أيام محجوزة مسبقاً. يُرجى اختيار فترة خالية للمتابعة.');
        return;
      }
    }

    // Step 2 validation (Guest Info)
    if (step === 2) {
      if (!guestName.trim()) {
        setValidationError('يرجى كتابة الاسم الكامل للمستأجر.');
        return;
      }
      if (!guestIdNumber.trim() || guestIdNumber.length < 8) {
        setValidationError('يرجى كتابة رقم الهوية الوطنية أو الإقامة أو جواز السفر بشكل صحيح لإصدار العقد الإلكتروني.');
        return;
      }
      if (!guestPhone.trim() || guestPhone.length < 9) {
        setValidationError('يرجى كتابة رقم الجوال الصحيح للتواصل وتأكيد الحجز.');
        return;
      }
      if (!guestEmail.trim() || !guestEmail.includes('@')) {
        setValidationError('يرجى إدخال بريد إلكتروني صالح لاستلام نسخة العقد.');
        return;
      }
    }

    // Step 3 validation (Payment)
    if (step === 3) {
      if (paymentMethod === 'alrajhi_transfer') {
        if (!transferSenderName.trim()) {
          setValidationError('يرجى إدخال اسم صاحب الحساب المحوّل للتأكد من استلام الحوالة عبر مصرف الراجحي.');
          return;
        }
      } else if (paymentMethod === 'card') {
        if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 15) {
          setValidationError('يرجى إدخال رقم بطاقة مدى أو الفيزا بشكل صحيح (16 رقماً).');
          return;
        }
        if (!cardExpiry.trim()) {
          setValidationError('يرجى إدخال تاريخ انتهاء البطاقة (الشهر/السنة).');
          return;
        }
        if (!cardCvv.trim() || cardCvv.length < 3) {
          setValidationError('يرجى إدخال رمز الأمان (CVV).');
          return;
        }
      }
    }

    // Step 4: Final Confirmation
    if (step === 4) {
      if (!agreedToTerms) {
        setValidationError('يجب الموافقة على الشروط والأحكام وعقد الإيجار الإلكتروني لإتمام الحجز.');
        return;
      }

      // Create Confirmed Booking Object
      const newBooking: Booking = {
        id: `b-${Date.now()}`,
        bookingNumber: `RQ-${Math.floor(10000 + Math.random() * 90000)}`,
        apartmentId: selectedApartment.id,
        apartmentName: selectedApartment.name,
        apartmentNumber: selectedApartment.number,
        guestName,
        guestIdNumber,
        guestPhone,
        guestEmail,
        guestCount,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        pricePerNight,
        subtotal,
        serviceFee,
        deposit,
        totalAmount,
        notes: notes ? `${notes} [الدفع: مصرف الراجحي السعودي - ${paymentMethod === 'alrajhi_transfer' ? `حوالة باسم ${transferSenderName}` : 'دفع إلكتروني آمن'}]` : `[الدفع: مصرف الراجحي السعودي - ${paymentMethod === 'alrajhi_transfer' ? `حوالة باسم ${transferSenderName}` : 'دفع إلكتروني بطاقة مدى'}]`,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      onBookingComplete(newBooking);
      return;
    }

    setStep(prev => prev + 1);
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setValidationError('');
    if (step === 1) {
      onCancel();
    } else {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 80, behavior: 'smooth' });
    }
  };

  const stepsList = [
    { num: 1, title: 'الشقة والتواريخ', icon: <Building2 className="w-4 h-4" /> },
    { num: 2, title: 'بيانات المستأجر', icon: <User className="w-4 h-4" /> },
    { num: 3, title: 'دفع مصرف الراجحي', icon: <CreditCard className="w-4 h-4" /> },
    { num: 4, title: 'تأكيد العقد', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="py-6 sm:py-10 md:py-14 bg-[#F3E2CC] min-h-screen text-[#3A2522]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-[#570A1B] text-[#FFF9F1] p-5 sm:p-7 rounded-3xl border border-[#C6A16B] shadow-xl text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C6A16B_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9F1]/10 text-[#C6A16B] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>نظام الحجز المباشر والتوثيق الفوري</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-alexandria font-bold text-[#FFF9F1]">
              حجز شقق رُقِيّ الفندقية
            </h1>
            <p className="text-xs sm:text-sm text-[#FFF9F1] font-semibold leading-relaxed max-w-xl mx-auto drop-shadow-xs">
              إجراءات حجز مبسطة ومرنة مع توثيق إلكتروني لعقد الإيجار ودفع آمن عبر مصرف الراجحي السعودي.
            </p>
          </div>
        </div>

        {/* Stepper Progress Bar (Ultra-Clean & Responsive for Mobile) */}
        <div className="bg-[#FFF9F1] p-3 sm:p-5 rounded-2xl border border-[#C6A16B]/60 shadow-md">
          {/* Mobile Step Indicator: Compact & Readable */}
          <div className="sm:hidden space-y-2">
            <div className="flex items-center justify-between text-xs font-alexandria">
              <span className="font-bold text-[#570A1B]">
                الخطوة {step} من 4: <span className="text-[#C6A16B]">{stepsList[step - 1].title}</span>
              </span>
              <span className="text-[11px] text-[#3A2522]/70 font-mono font-bold">
                %{Math.round((step / 4) * 100)}
              </span>
            </div>
            <div className="w-full bg-[#570A1B]/15 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-l from-[#C6A16B] to-[#570A1B] h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Desktop Stepper: 4 Elegant Horizontal Pills */}
          <div className="hidden sm:grid grid-cols-4 gap-3 text-right">
            {stepsList.map(s => {
              const isActive = step === s.num;
              const isPassed = step > s.num;
              return (
                <div 
                  key={s.num}
                  className={`p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                    isActive 
                      ? 'bg-[#570A1B] text-[#FFF9F1] border-[#C6A16B] shadow-sm' 
                      : isPassed
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-[#F3E2CC]/40 text-[#3A2522]/60 border-[#C6A16B]/30'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    isActive 
                      ? 'bg-[#C6A16B] text-[#570A1B]' 
                      : isPassed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/80 text-[#3A2522]'
                  }`}>
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] opacity-75 font-light">الخطوة {s.num}</div>
                    <div className="font-alexandria font-bold text-xs truncate">{s.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 flex items-center gap-3 text-xs sm:text-sm text-right animate-shake shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span className="font-medium">{validationError}</span>
          </div>
        )}

        {/* ========================================================
            STEP 1: APARTMENT SELECTION & STAY DATES
        ======================================================== */}
        {step === 1 && (
          <div className="space-y-6">
            
            {/* Apartment Selection (2 Luxury Cards, Mobile-First) */}
            <div className="bg-[#FFF9F1] p-5 sm:p-7 rounded-3xl border border-[#C6A16B] shadow-md space-y-4 text-right">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#C6A16B]" />
                <h2 className="font-alexandria font-bold text-base sm:text-lg text-[#570A1B]">
                  1. اختر الشقة المطلوبة
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {APARTMENTS.map(apt => {
                  const isSelected = apt.id === selectedAptId;
                  return (
                    <div
                      key={apt.id}
                      onClick={() => setSelectedAptId(apt.id)}
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        isSelected 
                          ? 'bg-[#570A1B] text-[#FFF9F1] border-[#C6A16B] shadow-md scale-[1.01]' 
                          : 'bg-[#F3E2CC]/40 text-[#3A2522] border-[#C6A16B]/60 hover:border-[#570A1B]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full leading-normal ${
                          isSelected ? 'bg-[#FFF9F1]/20 text-[#C6A16B]' : 'bg-[#570A1B]/10 text-[#570A1B]'
                        }`}>
                          {apt.area} م² · صالة ومطبخ · {apt.id === 'apt-01' ? 'غرفة ماستر' : 'غرفتا نوم [سريران مفردة]'} · 2 حمامات
                        </span>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? 'bg-[#C6A16B] text-[#570A1B]' : 'bg-[#FFF9F1] text-[#570A1B]'
                        }`}>
                          {apt.number}
                        </span>
                      </div>

                      <h3 className={`font-alexandria font-bold text-base ${isSelected ? 'text-[#FFF9F1]' : 'text-[#570A1B]'}`}>
                        {apt.name}
                      </h3>
                      <p className={`text-xs mt-1 ${isSelected ? 'text-[#F3E2CC]/80' : 'text-[#3A2522]/70'}`}>
                        {apt.tagline}
                      </p>

                      <div className="mt-3 pt-3 border-t border-[#C6A16B]/30 flex items-center justify-between text-xs">
                        <span className={isSelected ? 'text-[#F3E2CC]/80' : 'text-[#3A2522]/70'}>سعر الليلة:</span>
                        <span className={`font-alexandria font-bold text-sm ${isSelected ? 'text-[#C6A16B]' : 'text-[#570A1B]'}`}>
                          {apt.pricePerNight.toLocaleString('ar-SA')} ر.س
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dates & Calendar Selection (Mobile Optimized) */}
            <div className="bg-[#FFF9F1] p-5 sm:p-7 rounded-3xl border border-[#C6A16B] shadow-md space-y-5 text-right">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#C6A16B]" />
                  <h2 className="font-alexandria font-bold text-base sm:text-lg text-[#570A1B]">
                    2. حدد تواريخ الإقامة (الوصول والمغادرة)
                  </h2>
                </div>
                <span className="text-xs text-[#3A2522]/70 font-light">
                  الدخول 4:00 م · المغادرة 1:00 م
                </span>
              </div>

              {/* Check-In / Check-Out Inputs (Dynamic Green/Red Availability Feedback) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Check-in input box */}
                <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                  checkInStatus.isBlocked
                    ? 'bg-red-50/80 border-red-500 shadow-xs'
                    : checkInStatus.isSet && !checkInStatus.isBlocked
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
                    : 'bg-[#F3E2CC]/40 border-[#C6A16B]/60'
                }`}>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-alexandria font-bold text-[#570A1B]">
                      تاريخ الوصول (Check-in)
                    </label>
                    {checkInStatus.isSet && !checkInStatus.isBlocked && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>متاح للحجز</span>
                      </span>
                    )}
                    {checkInStatus.isBlocked && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-full border border-red-300 animate-pulse">
                        <AlertCircle className="w-3 h-3 text-red-600" />
                        <span>محجوز بالفعل</span>
                      </span>
                    )}
                  </div>

                  <input
                    type="date"
                    value={checkIn}
                    onChange={e => {
                      setCheckIn(e.target.value);
                      setValidationError('');
                      setCalendarNotice(null);
                    }}
                    className={`w-full rounded-xl py-2.5 px-3.5 text-xs sm:text-sm font-bold focus:outline-none transition-all ${
                      checkInStatus.isBlocked
                        ? 'bg-white text-red-900 border-2 border-red-500 focus:ring-2 focus:ring-red-400'
                        : checkInStatus.isSet && !checkInStatus.isBlocked
                        ? 'bg-white text-emerald-900 border-2 border-emerald-500 focus:ring-2 focus:ring-emerald-400'
                        : 'bg-[#FFF9F1] text-[#241411] border border-[#C6A16B] focus:ring-2 focus:ring-[#570A1B]'
                    }`}
                  />

                  {/* Status explanation alert */}
                  {checkInStatus.isBlocked && (
                    <div className="p-2.5 rounded-xl bg-red-100 border border-red-300 text-red-900 text-[11px] font-medium flex items-start gap-2 text-right">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-red-950">التاريخ محجوز مسبقاً وغير متاح:</div>
                        <div>{checkInStatus.message}</div>
                      </div>
                    </div>
                  )}

                  {checkInStatus.isSet && !checkInStatus.isBlocked && (
                    <div className="p-2 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-[11px] font-medium flex items-center gap-2 text-right">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{checkInStatus.message}</span>
                    </div>
                  )}
                </div>

                {/* Check-out input box */}
                <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                  checkOutStatus.isBlocked
                    ? 'bg-red-50/80 border-red-500 shadow-xs'
                    : checkOutStatus.isSet && !checkOutStatus.isBlocked
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
                    : 'bg-[#F3E2CC]/40 border-[#C6A16B]/60'
                }`}>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-alexandria font-bold text-[#570A1B]">
                      تاريخ المغادرة (Check-out)
                    </label>
                    {checkOutStatus.isSet && !checkOutStatus.isBlocked && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>متاح ومؤكد</span>
                      </span>
                    )}
                    {checkOutStatus.isBlocked && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-full border border-red-300 animate-pulse">
                        <AlertCircle className="w-3 h-3 text-red-600" />
                        <span>غير متاح / محجوز</span>
                      </span>
                    )}
                  </div>

                  <input
                    type="date"
                    value={checkOut}
                    onChange={e => {
                      setCheckOut(e.target.value);
                      setValidationError('');
                      setCalendarNotice(null);
                    }}
                    className={`w-full rounded-xl py-2.5 px-3.5 text-xs sm:text-sm font-bold focus:outline-none transition-all ${
                      checkOutStatus.isBlocked
                        ? 'bg-white text-red-900 border-2 border-red-500 focus:ring-2 focus:ring-red-400'
                        : checkOutStatus.isSet && !checkOutStatus.isBlocked
                        ? 'bg-white text-emerald-900 border-2 border-emerald-500 focus:ring-2 focus:ring-emerald-400'
                        : 'bg-[#FFF9F1] text-[#241411] border border-[#C6A16B] focus:ring-2 focus:ring-[#570A1B]'
                    }`}
                  />

                  {/* Status explanation alert */}
                  {checkOutStatus.isBlocked && (
                    <div className="p-2.5 rounded-xl bg-red-100 border border-red-300 text-red-900 text-[11px] font-medium flex items-start gap-2 text-right">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-red-950">الفترة تحتوي على حجز مسبق:</div>
                        <div>{checkOutStatus.message}</div>
                      </div>
                    </div>
                  )}

                  {checkOutStatus.isSet && !checkOutStatus.isBlocked && (
                    <div className="p-2 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-[11px] font-medium flex items-center gap-2 text-right">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{checkOutStatus.message}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Guest Count Selector */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F3E2CC]/40 border border-[#C6A16B]/60">
                <div>
                  <div className="font-alexandria font-bold text-xs sm:text-sm text-[#570A1B]">عدد النزلاء والضيوف</div>
                  <div className="text-[11px] text-[#3A2522]/70">السعة القصوى {selectedApartment.capacity} أشخاص</div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-full bg-[#FFF9F1] text-[#570A1B] border border-[#C6A16B] flex items-center justify-center font-bold text-base hover:bg-[#570A1B] hover:text-[#FFF9F1] transition-colors"
                  >
                    -
                  </button>
                  <span className="font-alexandria font-bold text-base text-[#570A1B] w-6 text-center">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(selectedApartment.capacity, guestCount + 1))}
                    className="w-8 h-8 rounded-full bg-[#FFF9F1] text-[#570A1B] border border-[#C6A16B] flex items-center justify-center font-bold text-base hover:bg-[#570A1B] hover:text-[#FFF9F1] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dynamic 10+ Year Interactive Calendar */}
              <div className="border-2 border-[#C6A16B]/50 rounded-3xl p-4 sm:p-6 bg-[#FFF9F1] shadow-sm space-y-4">
                
                {/* Calendar Navigation Header (Dynamic Months & 10+ Years) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-[#C6A16B]/30">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#C6A16B]" />
                      <span className="font-alexandria font-bold text-xs sm:text-sm text-[#570A1B]">
                        تقويم التوفر لـ {selectedApartment.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={goToToday}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-[#570A1B]/10 hover:bg-[#570A1B] hover:text-[#FFF9F1] text-[#570A1B] font-bold transition-colors"
                    >
                      اليوم
                    </button>
                  </div>

                  {/* Month & Year Jump Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    {/* Previous Month */}
                    <button
                      type="button"
                      onClick={goToPrevMonth}
                      className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-[#F3E2CC] hover:bg-[#C6A16B] text-[#570A1B] transition-colors flex items-center gap-1 text-xs font-bold"
                      title="الشهر السابق"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span className="hidden sm:inline">السابق</span>
                    </button>

                    {/* Month Dropdown */}
                    <select
                      value={calendarMonth}
                      onChange={e => {
                        setCalendarMonth(parseInt(e.target.value, 10));
                        setCalendarNotice(null);
                      }}
                      className="bg-white border border-[#C6A16B] rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#570A1B] focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                    >
                      {ARABIC_MONTHS.map((m, idx) => (
                        <option key={idx} value={idx}>{m}</option>
                      ))}
                    </select>

                    {/* Year Dropdown (10+ Years dynamic) */}
                    <select
                      value={calendarYear}
                      onChange={e => {
                        setCalendarYear(parseInt(e.target.value, 10));
                        setCalendarNotice(null);
                      }}
                      className="bg-white border border-[#C6A16B] rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#570A1B] focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                    >
                      {availableYears.map(y => (
                        <option key={y} value={y}>{y} م</option>
                      ))}
                    </select>

                    {/* Next Month */}
                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-[#F3E2CC] hover:bg-[#C6A16B] text-[#570A1B] transition-colors flex items-center gap-1 text-xs font-bold"
                      title="الشهر التالي"
                    >
                      <span className="hidden sm:inline">التالي</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Calendar Notice Banner (Explains why a booked day is in red when clicked) */}
                {calendarNotice && (
                  <div className={`p-3 rounded-2xl flex items-center justify-between gap-2 text-xs font-bold text-right transition-all animate-fadeIn ${
                    calendarNotice.type === 'blocked'
                      ? 'bg-red-50 border-2 border-red-400 text-red-900'
                      : 'bg-emerald-50 border-2 border-emerald-400 text-emerald-900'
                  }`}>
                    <div className="flex items-center gap-2">
                      {calendarNotice.type === 'blocked' ? (
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      <span>{calendarNotice.message}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCalendarNotice(null)}
                      className="p-1 rounded-lg hover:bg-black/10 text-gray-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs">
                  {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((d, i) => (
                    <div key={i} className="font-alexandria font-bold text-[#570A1B] py-1 text-[11px] sm:text-xs bg-[#570A1B]/5 rounded-lg">
                      {d}
                    </div>
                  ))}

                  {/* Leading Empty Weekday Padding Slots */}
                  {Array.from({ length: calendarData.firstDayOfWeek }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="h-10 sm:h-12 rounded-xl bg-transparent pointer-events-none opacity-0"></div>
                  ))}

                  {/* Day Cells */}
                  {calendarData.days.map((day, idx) => {
                    const selState = isDateSelected(day.dateStr);
                    const isCheckIn = selState === 'check-in';
                    const isCheckOut = selState === 'check-out';
                    const isInRange = selState === 'in-range';

                    let cellStyle = 'bg-emerald-50/60 border border-emerald-200/80 text-emerald-950 hover:bg-emerald-100 hover:border-emerald-400 font-bold';
                    
                    if (day.isBlocked) {
                      cellStyle = 'bg-red-50/90 border border-red-300 text-red-700 hover:bg-red-100 font-bold';
                    } else if (day.isPast) {
                      cellStyle = 'bg-gray-100/70 border border-gray-200 text-gray-400 cursor-not-allowed opacity-40';
                    } else if (isCheckIn || isCheckOut) {
                      cellStyle = 'bg-[#570A1B] text-[#FFF9F1] font-bold shadow-md ring-2 ring-[#C6A16B] border border-[#C6A16B]';
                    } else if (isInRange) {
                      cellStyle = 'bg-[#C6A16B]/30 border-y border-[#C6A16B]/60 text-[#570A1B] font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDateClick(day.dateStr, day.isBlocked, day.isPast)}
                        className={`h-11 sm:h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative p-0.5 ${cellStyle}`}
                        title={
                          day.isBlocked 
                            ? `محجوز مسبقاً (${day.dateStr})` 
                            : day.isPast 
                            ? `تاريخ سابق (${day.dateStr})` 
                            : `متاح للحجز (${day.dateStr})`
                        }
                      >
                        <span className="text-xs sm:text-sm font-mono font-bold leading-none">
                          {day.dayNum}
                        </span>

                        {/* Visual Indicators */}
                        {day.isBlocked && !isCheckIn && !isCheckOut && (
                          <span className="text-[9px] font-alexandria font-bold text-red-600 leading-none mt-1">
                            محجوز
                          </span>
                        )}

                        {!day.isBlocked && !day.isPast && !isCheckIn && !isCheckOut && !isInRange && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1"></span>
                        )}

                        {isCheckIn && (
                          <span className="text-[8px] font-alexandria font-bold text-[#C6A16B] leading-none mt-0.5">
                            وصول
                          </span>
                        )}

                        {isCheckOut && (
                          <span className="text-[8px] font-alexandria font-bold text-[#C6A16B] leading-none mt-0.5">
                            مغادرة
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-3 border-t border-[#C6A16B]/30 text-[11px] text-[#3A2522]">
                  <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-emerald-900">أخضر = متاح للحجز</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="font-bold text-red-900">أحمر = محجوز مسبقاً (انقر لعرض السبب)</span>
                  </div>
                </div>

              </div>

              {/* Live Cost Summary Bar */}
              <div className="bg-[#570A1B] text-[#FFF9F1] p-4 sm:p-5 rounded-2xl border border-[#C6A16B] flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
                <div className="space-y-0.5">
                  <div className="text-xs text-[#C6A16B] font-semibold">ملخص الإقامة المبدئي ({nights} ليالٍ)</div>
                  <div className="text-xs text-[#FFF9F1]/80">
                    من {checkIn} إلى {checkOut} · {selectedApartment.name}
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-[10px] text-[#C6A16B]">الإجمالي المقدر</span>
                  <div className="font-alexandria font-bold text-xl text-[#FFF9F1]">
                    {totalAmount.toLocaleString('ar-SA')} <span className="text-xs font-normal text-[#C6A16B]">ر.س</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            STEP 2: GUEST DETAILS & CONTRACT FORM
        ======================================================== */}
        {step === 2 && (
          <div className="bg-[#FFF9F1] p-5 sm:p-8 rounded-3xl border border-[#C6A16B] shadow-md space-y-6 text-right">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#570A1B]/10 text-[#570A1B] text-xs font-bold mb-2">
                <FileText className="w-3.5 h-3.5 text-[#C6A16B]" />
                <span>توثيق عقد الإيجار الإلكتروني</span>
              </div>
              <h2 className="font-alexandria font-bold text-lg sm:text-xl text-[#570A1B]">
                بيانات المستأجر الرسمية
              </h2>
              <p className="text-xs text-[#3A2522]/80 font-light mt-1">
                تُستخدم هذه البيانات لإصدار عقد الإيجار الإلكتروني المعتمد وتوليد رمز الدخول الذكي للشقة.
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-alexandria font-bold text-[#570A1B] mb-1.5">
                  الاسم الثلاثي أو الكامل (كما في الهوية) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="مثال: محمد بن عبدالله القحطاني"
                    className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-3 px-4 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                  />
                  <User className="w-4 h-4 text-[#C6A16B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* National ID / Iqama */}
              <div>
                <label className="block text-xs font-alexandria font-bold text-[#570A1B] mb-1.5">
                  رقم الهوية الوطنية / الإقامة / جواز السفر *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={guestIdNumber}
                    onChange={e => setGuestIdNumber(e.target.value)}
                    placeholder="10XXXXXXXX أو 20XXXXXXXX"
                    className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-3 px-4 text-xs sm:text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                    dir="ltr"
                  />
                  <ShieldCheck className="w-4 h-4 text-[#C6A16B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                <span className="text-[10px] text-[#3A2522]/60 mt-1 block">
                  مطلوب إلزامياً بموجب أنظمة وزارة السياحة والهيئة العامة للعقار.
                </span>
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-alexandria font-bold text-[#570A1B] mb-1.5">
                    رقم الجوال (للتأكيد وإرسال الرمز) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={e => setGuestPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-3 px-4 text-xs sm:text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                      dir="ltr"
                    />
                    <Phone className="w-4 h-4 text-[#C6A16B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-alexandria font-bold text-[#570A1B] mb-1.5">
                    البريد الإلكتروني (لاستلام نسخة العقد) *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={e => setGuestEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-3 px-4 text-xs sm:text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                      dir="ltr"
                    />
                    <Mail className="w-4 h-4 text-[#C6A16B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-alexandria font-bold text-[#570A1B] mb-1.5">
                  ملاحظات أو متطلبات خاصة (اختياري)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="مثال: وقت تقريبي للوصول، طلب سرير إضافي للأطفال..."
                  className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: AL RAJHI BANK PAYMENT SYSTEM (مصرف الراجحي السعودي)
        ======================================================== */}
        {step === 3 && (
          <div className="space-y-6 text-right">
            
            {/* Al Rajhi Bank Official Visual Banner */}
            <div className="bg-[#FFF9F1] rounded-3xl border-2 border-[#C6A16B] p-5 sm:p-6 shadow-xl space-y-5">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#C6A16B]/30 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#C6A16B] shadow-sm shrink-0">
                    <img 
                      src="/src/assets/images/alrajhi_logo_badge_1794129821236.jpg" 
                      alt="شعار مصرف الراجحي" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#C6A16B] tracking-wider uppercase">
                      بوابة الدفع الرسمية المعتمدة
                    </div>
                    <h2 className="font-alexandria font-bold text-lg sm:text-xl text-[#570A1B]">
                      مصرف الراجحي السعودي · Al Rajhi Bank
                    </h2>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183059]/10 text-[#183059] border border-[#183059]/30 text-xs font-bold">
                  <Lock className="w-3.5 h-3.5 text-[#183059]" />
                  <span>دفع آمن ومعتمد 100%</span>
                </div>
              </div>

              {/* Official Al Rajhi Bank Card Visual */}
              <div className="rounded-2xl overflow-hidden border border-[#C6A16B]/60 shadow-lg aspect-[16/9] sm:aspect-[21/9] max-h-56 bg-[#002B49] relative">
                <img 
                  src="/src/assets/images/alrajhi_bank_payment_1794129806195.jpg" 
                  alt="بطاقة مصرف الراجحي السعودي" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('alrajhi_transfer')}
                  className={`p-3 sm:p-4 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'alrajhi_transfer'
                      ? 'bg-[#570A1B] text-[#FFF9F1] border-[#C6A16B] shadow-sm'
                      : 'bg-[#F3E2CC]/40 text-[#3A2522] border-[#C6A16B]/50 hover:bg-[#F3E2CC]'
                  }`}
                >
                  <Wallet className="w-5 h-5 text-[#C6A16B]" />
                  <span className="text-xs font-alexandria font-bold">تحويل بنكي بالراجحي</span>
                  <span className="text-[10px] opacity-75">آيبان وحساب رسمي</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 sm:p-4 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'bg-[#570A1B] text-[#FFF9F1] border-[#C6A16B] shadow-sm'
                      : 'bg-[#F3E2CC]/40 text-[#3A2522] border-[#C6A16B]/50 hover:bg-[#F3E2CC]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#C6A16B]" />
                  <span className="text-xs font-alexandria font-bold">بطاقات مدى / فيزا</span>
                  <span className="text-[10px] opacity-75">دفع فوري ومشفر</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 sm:p-4 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-[#570A1B] text-[#FFF9F1] border-[#C6A16B] shadow-sm'
                      : 'bg-[#F3E2CC]/40 text-[#3A2522] border-[#C6A16B]/50 hover:bg-[#F3E2CC]'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-[#C6A16B]" />
                  <span className="text-xs font-alexandria font-bold">Apple Pay</span>
                  <span className="text-[10px] opacity-75">بلمسة واحدة</span>
                </button>
              </div>

              {/* OPTION 1: AL RAJHI DIRECT BANK TRANSFER */}
              {paymentMethod === 'alrajhi_transfer' && (
                <div className="space-y-4 pt-2">
                  <div className="bg-[#183059]/5 p-4 rounded-2xl border border-[#183059]/25 space-y-3">
                    <div className="flex items-center gap-2 text-[#183059] font-bold text-xs sm:text-sm">
                      <Info className="w-4 h-4 text-[#183059]" />
                      <span>بيانات الحساب البنكي الرسمي لمصرف الراجحي:</span>
                    </div>

                    {/* Beneficiary */}
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#C6A16B]/40 text-xs sm:text-sm">
                      <span className="text-[#3A2522]/70">اسم المستفيد:</span>
                      <strong className="text-[#570A1B]">مؤسسة رُقِيّ للشقق الفندقية</strong>
                    </div>

                    {/* IBAN */}
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#C6A16B]/40 text-xs sm:text-sm">
                      <span className="text-[#3A2522]/70">رقم الآيبان (IBAN):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#183059]" dir="ltr">
                          SA03 8000 0456 6080 1000 1234
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText('SA0380000456608010001234', 'iban')}
                          className="p-1.5 rounded-lg bg-[#F3E2CC] hover:bg-[#ebd3b5] text-[#570A1B] text-xs flex items-center gap-1 transition-colors"
                          title="نسخ الآيبان"
                        >
                          {copiedField === 'iban' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">{copiedField === 'iban' ? 'تم النسخ' : 'نسخ'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Account Number */}
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#C6A16B]/40 text-xs sm:text-sm">
                      <span className="text-[#3A2522]/70">رقم الحساب بالراجحي:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#183059]" dir="ltr">
                          456608010001234
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText('456608010001234', 'account')}
                          className="p-1.5 rounded-lg bg-[#F3E2CC] hover:bg-[#ebd3b5] text-[#570A1B] text-xs flex items-center gap-1 transition-colors"
                          title="نسخ الحساب"
                        >
                          {copiedField === 'account' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">{copiedField === 'account' ? 'تم النسخ' : 'نسخ'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Bank & Branch */}
                    <div className="flex items-center justify-between text-xs text-[#3A2522]/80 pt-1">
                      <span>المصرف: مصرف الراجحي - فرع الطائف</span>
                      <span>سويفت: RJHISARI</span>
                    </div>
                  </div>

                  {/* Transfer Confirmation Input */}
                  <div className="space-y-3 bg-[#FFF9F1] p-4 rounded-2xl border border-[#C6A16B]">
                    <h4 className="font-alexandria font-bold text-xs sm:text-sm text-[#570A1B]">
                      تأكيد الحوالة البنكية:
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#3A2522] mb-1">
                          اسم صاحب الحساب المحوّل منه *
                        </label>
                        <input
                          type="text"
                          required
                          value={transferSenderName}
                          onChange={e => setTransferSenderName(e.target.value)}
                          placeholder="الاسم كما يظهر بتطبيق الراجحي"
                          className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#3A2522] mb-1">
                          الرقم المرجعي للحوالة (اختياري)
                        </label>
                        <input
                          type="text"
                          value={transferRefNumber}
                          onChange={e => setTransferRefNumber(e.target.value)}
                          placeholder="رقم مرجع الحوالة البنكية"
                          className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OPTION 2: MADA / CREDIT CARD GATEWAY */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  <div className="bg-[#183059]/5 p-4 rounded-2xl border border-[#183059]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#183059]">بوابة دفع الراجحي لبطاقات مدى وفيزا</span>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#183059]">
                        <span>مدى</span> · <span>VISA</span> · <span>Mastercard</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3A2522] mb-1">
                        رقم بطاقة مدى أو البطاقة الائتمانية *
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        placeholder="4000 1234 5678 9010"
                        className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                        dir="ltr"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#3A2522] mb-1">
                          تاريخ الانتهاء (MM/YY) *
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#3A2522] mb-1">
                          رمز الأمان (CVV) *
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3A2522] mb-1">
                        اسم حامل البطاقة كما هو مدون عليها
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={e => setCardHolder(e.target.value)}
                        placeholder="NAME ON CARD"
                        className="w-full bg-white text-[#241411] border border-[#C6A16B] rounded-xl py-2 px-3 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#570A1B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* OPTION 3: APPLE PAY */}
              {paymentMethod === 'apple_pay' && (
                <div className="space-y-4 pt-2 text-center">
                  <div className="bg-black text-white p-6 rounded-2xl border border-white/20 space-y-3">
                    <div className="font-bold text-lg font-alexandria">الدفع السريع عبر Apple Pay</div>
                    <p className="text-xs text-white/80 max-w-sm mx-auto font-light">
                      سيتم خصم المبلغ عبر بطاقتك المفضلة بمصرف الراجحي بلمسة واحدة باستخدام Face ID أو Touch ID.
                    </p>
                    <button
                      type="button"
                      className="bg-white text-black py-3 px-8 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>الدفع بواسطة Apple Pay</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Financial Summary Box */}
            <div className="bg-[#570A1B] text-[#FFF9F1] p-5 sm:p-6 rounded-3xl border border-[#C6A16B] shadow-lg space-y-3">
              <h3 className="font-alexandria font-bold text-sm text-[#C6A16B] border-b border-[#C6A16B]/30 pb-2">
                فاتورة الحجز المالية المعتمدة:
              </h3>
              
              <div className="space-y-2 text-xs sm:text-sm text-[#FFF9F1]/90">
                <div className="flex justify-between">
                  <span>إيجار {selectedApartment.name} ({nights} ليالٍ × {pricePerNight.toLocaleString('ar-SA')} ر.س):</span>
                  <span className="font-bold font-mono">{subtotal.toLocaleString('ar-SA')} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم الخدمة والنظافة الفندقية المعتمدة:</span>
                  <span className="font-mono">{serviceFee.toLocaleString('ar-SA')} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>تأمين الضمان المسترد بالكامل عند المغادرة:</span>
                  <span className="font-mono">{deposit.toLocaleString('ar-SA')} ر.س</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#C6A16B]/40 flex items-center justify-between text-base sm:text-lg font-bold">
                <span className="text-[#C6A16B]">المبلغ الإجمالي المستحق:</span>
                <span className="font-alexandria font-extrabold text-xl sm:text-2xl text-[#FFF9F1]">
                  {totalAmount.toLocaleString('ar-SA')} <span className="text-xs font-normal text-[#C6A16B]">ريال سعودي</span>
                </span>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            STEP 4: FINAL REVIEW & CONTRACT CONFIRMATION
        ======================================================== */}
        {step === 4 && (
          <div className="bg-[#FFF9F1] p-5 sm:p-8 rounded-3xl border border-[#C6A16B] shadow-xl space-y-6 text-right">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#570A1B]/10 text-[#570A1B] text-xs font-bold mb-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>المراجعة النهائية وتأكيد الحجز</span>
              </div>
              <h2 className="font-alexandria font-bold text-lg sm:text-xl text-[#570A1B]">
                تفاصيل حجزك وعقد الإقامة
              </h2>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-[#F3E2CC]/40 p-4 rounded-2xl border border-[#C6A16B]/50 space-y-2">
                <div className="font-bold text-[#570A1B] text-sm border-b border-[#C6A16B]/30 pb-1">
                  بيانات الإقامة:
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2522]/70">الوحدة:</span>
                  <strong className="text-[#570A1B]">{selectedApartment.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2522]/70">تاريخ الوصول:</span>
                  <span className="font-bold text-[#570A1B]">{checkIn} (4:00 عصراً)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2522]/70">تاريخ المغادرة:</span>
                  <span className="font-bold text-[#570A1B]">{checkOut} (1:00 ظهراً)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2522]/70">المدة:</span>
                  <span className="font-bold text-[#570A1B]">{nights} ليالٍ</span>
                </div>
              </div>

              <div className="bg-[#F3E2CC]/40 p-4 rounded-2xl border border-[#C6A16B]/50 space-y-2">
                <div className="font-bold text-[#570A1B] text-sm border-b border-[#C6A16B]/30 pb-1">
                  بيانات المستأجر:
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2522]/70">الاسم:</span>
                  <strong className="text-[#570A1B]">{guestName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2522]/70">رقم الهوية:</span>
                  <span className="font-mono font-bold text-[#570A1B]">{guestIdNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2522]/70">الجوال:</span>
                  <span className="font-mono text-[#570A1B]">{guestPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2522]/70">طريقة الدفع:</span>
                  <span className="font-bold text-[#183059]">مصرف الراجحي السعودي</span>
                </div>
              </div>
            </div>

            {/* Total Due Confirmation */}
            <div className="p-4 rounded-2xl bg-[#570A1B] text-[#FFF9F1] border border-[#C6A16B] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#C6A16B]">إجمالي المبلغ المدفوع</span>
                <div className="text-xs text-[#FFF9F1]/80 font-light">يشمل الإقامة ورسوم الخدمة والتأمين المسترد</div>
              </div>
              <div className="font-alexandria font-extrabold text-xl sm:text-2xl text-[#C6A16B]">
                {totalAmount.toLocaleString('ar-SA')} <span className="text-xs font-normal text-[#FFF9F1]">ر.س</span>
              </div>
            </div>

            {/* Electronic Contract Notice */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-[#C6A16B] text-xs text-[#3A2522] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#570A1B]">
                <FileText className="w-4 h-4 text-[#C6A16B]" />
                <span>إصدار عقد إيجار إلكتروني فوري معتمد</span>
              </div>
              <p className="font-light leading-relaxed">
                فور النقر على "تأكيد الحجز"، سيقوم النظام تلقائياً بتوثيق الحجز وتوليد عقد الإيجار الإلكتروني A4 الرسمي الحامل للرمز المشفر (QR Code) وختم رُقِيّ، وتجهيزه للعرض والطباعة وحفظه كملف PDF.
              </p>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded text-[#570A1B] focus:ring-[#570A1B] border-[#C6A16B] mt-0.5"
              />
              <label htmlFor="agreeTerms" className="text-xs text-[#3A2522] cursor-pointer font-medium leading-relaxed">
                أقر بصحة البيانات المدخلة، وأوافق على الشروط والأحكام وسياسة الإقامة والإلغاء المعتمدة في شقق رُقِيّ الفندقية، وأوافق على توثيق عقد الإيجار الإلكتروني.
              </label>
            </div>

          </div>
        )}

        {/* Wizard Controls Footer (Responsive, Touch-Friendly, Floating/Sticky Friendly) */}
        <div className="flex items-center justify-between gap-3 pt-4">
          <button
            type="button"
            onClick={handlePrevStep}
            className="px-5 sm:px-6 py-3.5 rounded-xl bg-[#FFF9F1] hover:bg-white text-[#570A1B] border border-[#570A1B]/40 font-alexandria font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 text-[#570A1B]" />
            <span>{step === 1 ? 'إلغاء والعودة' : 'السابق'}</span>
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="flex-1 sm:flex-none px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C6A16B] to-[#b38d55] hover:brightness-105 text-[#570A1B] font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <span>
              {step === 4 
                ? 'تأكيد الحجز وإصدار العقد' 
                : step === 3
                ? 'متابعة الدفع والمراجعة'
                : 'متابعة الخطوة التالية'}
            </span>
            <ArrowLeft className="w-4 h-4 text-[#570A1B]" />
          </button>
        </div>

      </div>
    </div>
  );
};
