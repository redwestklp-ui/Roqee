import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  FileText, 
  Printer, 
  Settings, 
  Edit3, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  Plus,
  Trash2,
  Lock,
  Unlock,
  AlertCircle
} from 'lucide-react';
import { Booking, Apartment, APARTMENTS, BLOCKED_DATES, SITE_INFO } from '../data/apartmentsData';

interface AdminDashboardProps {
  bookings: Booking[];
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onViewContract: (booking: Booking) => void;
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  onUpdateBookingStatus,
  onViewContract,
  onBackToSite
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'apartments' | 'availability' | 'settings'>('overview');
  
  // Apartment editable prices and status state
  const [apartmentsList, setApartmentsList] = useState<Apartment[]>(APARTMENTS);
  const [editingAptId, setEditingAptId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(1450);

  // Blocked dates state
  const [blockedDates, setBlockedDates] = useState<Record<string, string[]>>(BLOCKED_DATES);
  const [selectedCalendarApt, setSelectedCalendarApt] = useState<string>('apt-01');
  const [newBlockDate, setNewBlockDate] = useState<string>('2026-11-28');

  // Contact info state
  const [sitePhone, setSitePhone] = useState(SITE_INFO.phone);
  const [siteAddress, setSiteAddress] = useState(SITE_INFO.address);
  const [siteSavedNotice, setSiteSavedNotice] = useState(false);

  // Statistics calculation
  const totalBookingsCount = bookings.length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const handleStartEditApt = (apt: Apartment) => {
    setEditingAptId(apt.id);
    setTempPrice(apt.pricePerNight);
  };

  const handleSaveApt = (id: string) => {
    setApartmentsList(prev =>
      prev.map(a => (a.id === id ? { ...a, pricePerNight: tempPrice } : a))
    );
    setEditingAptId(null);
  };

  const handleToggleBlockDate = (aptId: string, dateStr: string) => {
    setBlockedDates(prev => {
      const currentList = prev[aptId] || [];
      if (currentList.includes(dateStr)) {
        return { ...prev, [aptId]: currentList.filter(d => d !== dateStr) };
      } else {
        return { ...prev, [aptId]: [...currentList, dateStr].sort() };
      }
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSiteSavedNotice(true);
    setTimeout(() => setSiteSavedNotice(false), 3000);
  };

  return (
    <div className="py-8 md:py-12 bg-[#F3E2CC] min-h-screen text-[#3A2522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header Bar */}
        <div className="bg-[#570A1B] text-[#FFF9F1] p-6 rounded-2xl border border-[#C6A16B] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#C6A16B] text-[#570A1B] flex items-center justify-center font-bold shadow">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-[#C6A16B] font-semibold">بوابة الإدارة المعتمدة</span>
              <h1 className="font-alexandria font-bold text-xl sm:text-2xl text-[#FFF9F1]">
                لوحة التحكم الإدارية · رُقِيّ VIP
              </h1>
            </div>
          </div>

          <button
            onClick={onBackToSite}
            className="bg-[#FFF9F1] hover:bg-white text-[#570A1B] font-alexandria font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-[#C6A16B] transition-colors flex items-center gap-2 shadow"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى واجهة الموقع للنزلاء</span>
          </button>
        </div>

        {/* Tab Controls Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#C6A16B]/40 pb-4">
          {[
            { id: 'overview', label: 'نظرة عامة والتقارير' },
            { id: 'bookings', label: `إدارة الحجوزات والعقود (${bookings.length})` },
            { id: 'apartments', label: 'إدارة وتعديل الشقتين' },
            { id: 'availability', label: 'تقويم التوفر والحظر' },
            { id: 'settings', label: 'إعدادات الموقع ومعلومات التواصل' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-alexandria text-xs sm:text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-[#570A1B] text-[#FFF9F1] font-bold shadow-md border border-[#C6A16B]'
                  : 'bg-[#FFF9F1] text-[#3A2522] hover:bg-white border border-[#C6A16B]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-[#FFF9F1] p-5 rounded-2xl border border-[#C6A16B] shadow-md text-right space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#3A2522]/70">إجمالي الحجوزات</span>
                  <div className="w-9 h-9 rounded-lg bg-[#570A1B]/10 text-[#570A1B] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#570A1B]" />
                  </div>
                </div>
                <div className="font-alexandria font-extrabold text-2xl text-[#570A1B]">
                  {totalBookingsCount}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  {confirmedCount} حجز مؤكد وموثق
                </div>
              </div>

              <div className="bg-[#FFF9F1] p-5 rounded-2xl border border-[#C6A16B] shadow-md text-right space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#3A2522]/70">طلبات جديدة معلقة</span>
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-alexandria font-extrabold text-2xl text-amber-800">
                  {pendingCount}
                </div>
                <div className="text-[11px] text-[#3A2522]/70">
                  تحتاج إلى مراجعة وتأكيد
                </div>
              </div>

              <div className="bg-[#FFF9F1] p-5 rounded-2xl border border-[#C6A16B] shadow-md text-right space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#3A2522]/70">إجمالي الإيرادات المسجلة</span>
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-alexandria font-extrabold text-2xl text-emerald-800">
                  {totalRevenue.toLocaleString('ar-SA')}{' '}
                  <span className="text-xs font-normal">ر.س</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  تشمل مبالغ الإيجار والتأمين
                </div>
              </div>

              <div className="bg-[#FFF9F1] p-5 rounded-2xl border border-[#C6A16B] shadow-md text-right space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#3A2522]/70">حالة الوحدات السكنية</span>
                  <div className="w-9 h-9 rounded-lg bg-[#570A1B] text-[#FFF9F1] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#C6A16B]" />
                  </div>
                </div>
                <div className="font-alexandria font-extrabold text-2xl text-[#570A1B]">
                  2 من 2 جاهزة
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  شقة 01 وشقة 02 متاحتان للإشغال
                </div>
              </div>

            </div>

            {/* Quick Recent Bookings View */}
            <div className="bg-[#FFF9F1] p-6 rounded-2xl border border-[#C6A16B] shadow-lg text-right space-y-4">
              <div className="flex items-center justify-between border-b border-[#C6A16B]/30 pb-3">
                <h3 className="font-alexandria font-bold text-base text-[#570A1B]">
                  أحدث طلبات الحجز المستلمة
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-[#570A1B] underline hover:text-[#84394A]"
                >
                  عرض جميع الحجوزات
                </button>
              </div>

              <div className="divide-y divide-[#C6A16B]/20">
                {bookings.slice(0, 3).map(b => (
                  <div key={b.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-alexandria font-bold text-sm text-[#570A1B]">
                        {b.guestName} · {b.apartmentName}
                      </div>
                      <div className="text-[#3A2522]/70 mt-0.5">
                        رقم الحجز: <span className="font-mono">{b.bookingNumber}</span> · المدة: {b.nights} ليالٍ ({b.checkInDate} إلى {b.checkOutDate})
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                        b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status === 'confirmed' ? 'مؤكد' : 'بانتظار التأكيد'}
                      </span>
                      <button
                        onClick={() => onViewContract(b)}
                        className="p-1.5 rounded-lg bg-[#570A1B] text-[#FFF9F1] hover:bg-[#84394A] flex items-center gap-1 text-[11px] font-semibold"
                        title="عرض العقد"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#C6A16B]" />
                        <span>العقد</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: BOOKINGS & CONTRACTS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="text-right">
              <h2 className="font-alexandria font-bold text-xl text-[#570A1B]">
                إدارة الحجوزات وعقود الإيجار الإلكترونية
              </h2>
              <p className="text-xs text-[#3A2522]/80 mt-1">
                استعراض كافة الحجوزات، تغيير الحالة، وطباعة عقد الإيجار الرسمي الخاص بكل مستأجر.
              </p>
            </div>

            <div className="bg-[#FFF9F1] rounded-2xl border border-[#C6A16B] shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-[#570A1B] text-[#FFF9F1] font-alexandria">
                      <th className="p-3.5">رقم الحجز</th>
                      <th className="p-3.5">اسم المستأجر</th>
                      <th className="p-3.5">الشقة</th>
                      <th className="p-3.5">فترة الإقامة</th>
                      <th className="p-3.5">المبلغ</th>
                      <th className="p-3.5">الحالة</th>
                      <th className="p-3.5 text-center">الإجراءات والعقد</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C6A16B]/30">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-[#F3E2CC]/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-[#570A1B]">
                          {b.bookingNumber}
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-[#3A2522]">{b.guestName}</div>
                          <div className="text-[10px] text-[#3A2522]/60 font-mono">{b.guestPhone}</div>
                        </td>
                        <td className="p-3.5 font-medium">
                          {b.apartmentNumber === '01' ? 'شقة 01 (الملكي)' : 'شقة 02 (التنفيذي)'}
                        </td>
                        <td className="p-3.5">
                          <span className="font-mono">{b.checkInDate}</span> إلى <span className="font-mono">{b.checkOutDate}</span>
                          <span className="block text-[10px] text-gray-500">({b.nights} ليالٍ)</span>
                        </td>
                        <td className="p-3.5 font-bold text-[#570A1B]">
                          {b.totalAmount.toLocaleString('ar-SA')} ر.س
                        </td>
                        <td className="p-3.5">
                          <select
                            value={b.status}
                            onChange={e => onUpdateBookingStatus(b.id, e.target.value as any)}
                            className={`text-xs rounded-lg p-1.5 border font-semibold ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : b.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-gray-100 text-gray-800 border-gray-300'
                            }`}
                          >
                            <option value="confirmed">مؤكد</option>
                            <option value="pending">بانتظار التأكيد</option>
                            <option value="completed">مكتمل</option>
                            <option value="cancelled">ملغي</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => onViewContract(b)}
                            className="bg-[#570A1B] hover:bg-[#84394A] text-[#FFF9F1] px-3 py-1.5 rounded-lg font-alexandria text-[11px] font-semibold transition-colors inline-flex items-center gap-1.5 shadow"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#C6A16B]" />
                            <span>عرض وطباعة العقد</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: APARTMENTS MANAGEMENT */}
        {activeTab === 'apartments' && (
          <div className="space-y-6">
            <div className="text-right">
              <h2 className="font-alexandria font-bold text-xl text-[#570A1B]">
                إدارة بيانات وأسعار شقتي رُقِيّ
              </h2>
              <p className="text-xs text-[#3A2522]/80 mt-1">
                تعديل سعر الإيجار اليومي ومواصفات كل شقة على حدة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {apartmentsList.map(apt => (
                <div
                  key={apt.id}
                  className="bg-[#FFF9F1] p-6 rounded-2xl border border-[#C6A16B] shadow-lg text-right space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#C6A16B]/30 pb-3">
                    <div>
                      <span className="text-xs text-[#C6A16B] font-bold">شقة رقم {apt.number}</span>
                      <h3 className="font-alexandria font-bold text-lg text-[#570A1B]">
                        {apt.name}
                      </h3>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-md font-semibold">
                      نشطة بالموقع
                    </span>
                  </div>

                  <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#C6A16B]/40">
                    <img
                      src={apt.mainImage}
                      alt={apt.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {editingAptId === apt.id ? (
                    <div className="p-4 bg-[#F3E2CC]/60 rounded-xl space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-[#570A1B] mb-1">
                          سعر الليلة الواحدة (ريال سعودي)
                        </label>
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={e => setTempPrice(Number(e.target.value))}
                          className="w-full bg-white border border-[#C6A16B] rounded-lg p-2 text-sm font-bold"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveApt(apt.id)}
                          className="flex-1 bg-[#570A1B] text-white py-2 rounded-lg font-alexandria text-xs font-bold"
                        >
                          حفظ التعديل
                        </button>
                        <button
                          onClick={() => setEditingAptId(null)}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-xs"
                        >
                          إلغاء
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-[#F3E2CC]/40 p-3.5 rounded-xl border border-[#C6A16B]/30">
                      <div>
                        <span className="text-xs text-[#3A2522]/70 block">سعر الإيجار لليلة:</span>
                        <span className="font-alexandria font-bold text-lg text-[#570A1B]">
                          {apt.pricePerNight.toLocaleString('ar-SA')} ر.س
                        </span>
                      </div>
                      <button
                        onClick={() => handleStartEditApt(apt)}
                        className="px-3 py-1.5 rounded-lg bg-[#570A1B] text-[#FFF9F1] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#84394A]"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C6A16B]" />
                        <span>تعديل السعر</span>
                      </button>
                    </div>
                  )}

                  <div className="text-xs text-[#3A2522]/80 space-y-1">
                    <div>المساحة: <strong>{apt.area} م²</strong> · الغرف: <strong>{apt.rooms} غرف</strong></div>
                    <div>الدور: <strong>{apt.floor}</strong> · السعة: <strong>{apt.capacity} أشخاص</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AVAILABILITY & CALENDAR */}
        {activeTab === 'availability' && (
          <div className="space-y-6">
            <div className="text-right">
              <h2 className="font-alexandria font-bold text-xl text-[#570A1B]">
                إدارة تقويم التوفر وفترات الحظر
              </h2>
              <p className="text-xs text-[#3A2522]/80 mt-1">
                تحديد الأيام المحجوزة أو إغلاق تواريخ معينة لأعمال الصيانة أو الحجوزات الخاصة.
              </p>
            </div>

            {/* Apartment Switcher */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedCalendarApt('apt-01')}
                className={`px-5 py-2.5 rounded-xl font-alexandria text-xs sm:text-sm font-bold transition-all ${
                  selectedCalendarApt === 'apt-01'
                    ? 'bg-[#570A1B] text-[#FFF9F1] shadow-md border border-[#C6A16B]'
                    : 'bg-[#FFF9F1] text-[#3A2522] border border-[#C6A16B]/40'
                }`}
              >
                تقويم الشقة رقم 1
              </button>
              <button
                onClick={() => setSelectedCalendarApt('apt-02')}
                className={`px-5 py-2.5 rounded-xl font-alexandria text-xs sm:text-sm font-bold transition-all ${
                  selectedCalendarApt === 'apt-02'
                    ? 'bg-[#570A1B] text-[#FFF9F1] shadow-md border border-[#C6A16B]'
                    : 'bg-[#FFF9F1] text-[#3A2522] border border-[#C6A16B]/40'
                }`}
              >
                تقويم الشقة رقم 2
              </button>
            </div>

            {/* Blocked Dates List & Manager */}
            <div className="bg-[#FFF9F1] p-6 rounded-2xl border border-[#C6A16B] shadow-md text-right space-y-4">
              <h3 className="font-alexandria font-bold text-base text-[#570A1B]">
                التواريخ المحجوزة والمغلقة لشقة {selectedCalendarApt === 'apt-01' ? '01' : '02'}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {(blockedDates[selectedCalendarApt] || []).map(dateStr => (
                  <div
                    key={dateStr}
                    className="flex items-center gap-2 bg-red-50 text-red-800 border border-red-300 px-3 py-1.5 rounded-lg text-xs"
                  >
                    <span className="font-mono font-bold">{dateStr}</span>
                    <button
                      onClick={() => handleToggleBlockDate(selectedCalendarApt, dateStr)}
                      className="text-red-500 hover:text-red-700"
                      title="إلغاء الحظر وإتاحة اليوم"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Add Block Date */}
              <div className="pt-4 border-t border-[#C6A16B]/30 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <label className="text-xs font-semibold text-[#570A1B] whitespace-nowrap">
                  إغلاق/حظر تاريخ محدد:
                </label>
                <input
                  type="date"
                  value={newBlockDate}
                  onChange={e => setNewBlockDate(e.target.value)}
                  className="bg-[#F3E2CC]/40 border border-[#C6A16B] rounded-lg p-2 text-xs font-mono"
                />
                <button
                  onClick={() => handleToggleBlockDate(selectedCalendarApt, newBlockDate)}
                  className="bg-[#570A1B] text-[#FFF9F1] px-4 py-2 rounded-lg text-xs font-alexandria font-semibold hover:bg-[#84394A]"
                >
                  تأكيد الإغلاق / الفتح
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="text-right">
              <h2 className="font-alexandria font-bold text-xl text-[#570A1B]">
                إعدادات الموقع ومعلومات الضيافة
              </h2>
              <p className="text-xs text-[#3A2522]/80 mt-1">
                تحديث أرقام الاتصال والعناوين الرسمية التي تظهر في العقد والموقع.
              </p>
            </div>

            {siteSavedNotice && (
              <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold text-right">
                ✓ تم حفظ وتحديث إعدادات الموقع بنجاح!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="bg-[#FFF9F1] p-6 sm:p-8 rounded-2xl border border-[#C6A16B] shadow-md space-y-4 text-right">
              <div>
                <label className="block text-xs font-alexandria font-bold text-[#570A1B] mb-1">
                  رقم هاتف واستقبال الموقع
                </label>
                <input
                  type="text"
                  value={sitePhone}
                  onChange={e => setSitePhone(e.target.value)}
                  className="w-full bg-[#F3E2CC]/40 border border-[#C6A16B]/60 rounded-xl p-3 text-xs"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-alexandria font-bold text-[#570A1B] mb-1">
                  العنوان التفصيلي للمبنى
                </label>
                <input
                  type="text"
                  value={siteAddress}
                  onChange={e => setSiteAddress(e.target.value)}
                  className="w-full bg-[#F3E2CC]/40 border border-[#C6A16B]/60 rounded-xl p-3 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#570A1B] text-[#FFF9F1] px-6 py-3 rounded-xl font-alexandria font-bold text-xs sm:text-sm hover:bg-[#84394A] transition-colors border border-[#C6A16B]"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
