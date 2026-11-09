export interface Apartment {
  id: string;
  number: string;
  name: string;
  tagline: string;
  area: number; // in m²
  rooms: number;
  bathrooms: number;
  beds: string;
  capacity: number; // persons
  pricePerNight: number;
  depositAmount: number;
  floor: string;
  mainImage: string;
  images: { url: string; title: string; category: string }[];
  description: string;
  features: string[];
  amenities: {
    category: string;
    items: string[];
  }[];
  rules: string[];
}

export interface Booking {
  id: string;
  bookingNumber: string;
  apartmentId: string;
  apartmentName: string;
  apartmentNumber: string;
  guestName: string;
  guestIdNumber: string; // National ID / Iqama / Passport
  guestPhone: string;
  guestEmail: string;
  guestCount: number;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  nights: number;
  pricePerNight: number;
  subtotal: number;
  serviceFee: number;
  deposit: number;
  totalAmount: number;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export const APARTMENTS: Apartment[] = [
  {
    id: 'apt-01',
    number: '01',
    name: 'الشقة رقم 1',
    tagline: 'فخامة استثنائية متناهية',
    area: 110,
    rooms: 2,
    bathrooms: 2,
    beds: 'غرفة ماستر مع دورة مياه + غرفة نوم إضافية (سريرين مفردة) + 3 مراتب إضافية مع بطانيات ومخدات',
    capacity: 7,
    pricePerNight: 1450,
    depositAmount: 1000,
    floor: 'الدور الأرضي',
    mainImage: '/src/assets/images/apt1_living_room_1794114419607.jpg',
    images: [
      { url: '/src/assets/images/apt1_living_room_1794114419607.jpg', title: 'صالة الاستقبال والضيافة ومطبخ مجهز مع شاشة كبيرة', category: 'living' },
      { url: '/src/assets/images/apt1_master_bedroom_1794114418953.jpg', title: 'غرفة النوم ماستر مع دورة مياه خاصة', category: 'bedroom' },
      { url: '/src/assets/images/apt2_executive_suite_1794114421368.jpg', title: 'غرفة النوم الثانية (سريرين مفردة)', category: 'bedroom' },
      { url: '/src/assets/images/apt_luxury_bathroom_1794114420824.jpg', title: 'دورة مياه مجهزة بالكامل', category: 'bathroom' },
    ],
    description: 'شقة فندقية فاخرة بمساحة 110 م² في الدور الأرضي مصممة بأعلى معايير الرقي والراحة. تتكون من غرفة ماستر مع دورة مياه خاصة، وغرفة نوم ثانية إضافية بسريرين مفردة، صالة جلوس واسعة ومجهزة بشاشة كبيرة وطاولة طعام، ومطبخ مجهز بالكامل (ثلاجة، فرن، غلاية، أواني بسيطة)، بالإضافة إلى 2 حمامات بتشطيبات راقية، مع توفير عدد 3 مراتب إضافية مع بطانيات ومخدات.',
    features: [
      'مساحة 110 م²',
      'الدور الأرضي',
      'غرفة ماستر مع دورة مياه خاصة',
      'غرفة نوم إضافية (سريرين مفردة)',
      'صالة واسعة ومطبخ مجهز',
      '2 حمامات',
      'عدد مراتب اضافيه 3 مع بطانيات ومخدات',
      'السعة الاستيعابية حتى 7 ضيوف',
      'مواقف خاصة',
      'إنترنت Wi-Fi',
      'دخول ذكي ببصمة أو رمز رقمي'
    ],
    amenities: [
      {
        category: 'الراحة وتوزيع الأسرّة',
        items: [
          'غرفة ماستر مع دورة مياه خاصة',
          'غرفة نوم إضافية (سريرين مفردة)',
          'عدد مراتب اضافيه 3 مع بطانيات ومخدات',
          'طاولة طعام مريحة',
          'عزل صوتي كامل وستائر بلاك أوت'
        ]
      },
      {
        category: 'التقنية والترفيه',
        items: [
          'صالة واسعة مع شاشات كبيره مناسبه للافلام والمسلسلاات',
          'إنترنت Wi-Fi',
          'نظام سبليت يتيح ضبط درجة الحرارة بدقة في كل غرفة على حدة لراحة فائقة'
        ]
      },
      {
        category: 'المطبخ والخدمات',
        items: [
          'مطبخ مجهز بالكامل (ثلاجة، فرن، غلاية، أواني بسيطه)',
          'غسالة ملابس',
          'طاولة طعام متكاملة'
        ]
      },
      {
        category: 'الأمان ودورات المياه',
        items: [
          '2 حمامات',
          'دخول إلكتروني ذكي برمز خاص لكل حجز',
          'مواقف خاصة'
        ]
      }
    ],
    rules: [
      'تسجيل الوصول: ابتداءً من الساعة 4:00 عصراً',
      'تسجيل المغادرة: حتى الساعة 1:00 ظهراً',
      'التدخين: ممنوع نهائياً داخل الشقة',
      'الهدوء: يُرجى الحفاظ على السكينة بعد الساعة 11:00 مساءً',
      'الحيوانات الأليفة: غير مسموحة'
    ]
  },
  {
    id: 'apt-02',
    number: '02',
    name: 'الشقة رقم 2',
    tagline: 'فخامة استثنائية متناهية',
    area: 110,
    rooms: 2,
    bathrooms: 2,
    beds: 'غرفة ماستر مع دورة مياه + غرفة نوم إضافية (سريرين مفردة) + 3 مراتب إضافية مع بطانيات ومخدات',
    capacity: 7,
    pricePerNight: 1150,
    depositAmount: 1000,
    floor: 'الدور الأرضي',
    mainImage: '/src/assets/images/apt2_executive_suite_1794114421368.jpg',
    images: [
      { url: '/src/assets/images/apt1_master_bedroom_1794114418953.jpg', title: 'غرفة النوم ماستر مع دورة مياه خاصة', category: 'bedroom' },
      { url: '/src/assets/images/apt2_executive_suite_1794114421368.jpg', title: 'غرفة النوم الثانية (سريرين مفردة)', category: 'bedroom' },
      { url: '/src/assets/images/apt_hero_luxury_suite_1794114419422.jpg', title: 'صالة الجلوس الراقية مع شاشة كبيرة وطاولة طعام', category: 'living' },
      { url: '/src/assets/images/apt_luxury_bathroom_1794114420824.jpg', title: 'دورة مياه مجهزة بالكامل بإكسسوارات راقية', category: 'bathroom' },
    ],
    description: 'شقة فندقية فاخرة بمساحة 110 م² في الدور الأرضي مصممة بتناغم يوفر أعلى درجات الخصوصية والراحة. تتكون من غرفة ماستر مع دورة مياه خاصة، وغرفة نوم ثانية إضافية بسريرين مفردة، صالة جلوس واسعة ومجهزة بشاشة كبيرة وطاولة طعام، ومطبخ مجهز بالكامل (ثلاجة، فرن، غلاية، أواني بسيطة)، بالإضافة إلى 2 حمامات، مع توفير عدد 3 مراتب إضافية مع بطانيات ومخدات.',
    features: [
      'مساحة 110 م²',
      'الدور الأرضي',
      'غرفة ماستر مع دورة مياه خاصة',
      'غرفة نوم إضافية (سريرين مفردة)',
      'صالة واسعة ومطبخ مجهز',
      '2 حمامات',
      'عدد مراتب اضافيه 3 مع بطانيات ومخدات',
      'السعة الاستيعابية حتى 7 ضيوف',
      'مواقف خاصة',
      'إنترنت Wi-Fi',
      'دخول ذكي ببصمة أو رمز رقمي'
    ],
    amenities: [
      {
        category: 'الراحة وتوزيع الأسرّة',
        items: [
          'غرفة ماستر مع دورة مياه خاصة',
          'غرفة نوم إضافية (سريرين مفردة)',
          'عدد مراتب اضافيه 3 مع بطانيات ومخدات',
          'طاولة طعام مريحة',
          'عزل صوتي كامل وستائر بلاك أوت'
        ]
      },
      {
        category: 'التقنية والترفيه',
        items: [
          'صالة واسعة مع شاشات كبيره مناسبه للافلام والمسلسلاات',
          'إنترنت Wi-Fi',
          'نظام سبليت يتيح ضبط درجة الحرارة بدقة في كل غرفة على حدة لراحة فائقة'
        ]
      },
      {
        category: 'المطبخ والخدمات',
        items: [
          'مطبخ مجهز بالكامل (ثلاجة، فرن، غلاية، أواني بسيطه)',
          'غسالة ملابس',
          'طاولة طعام متكاملة'
        ]
      },
      {
        category: 'الأمان ودورات المياه',
        items: [
          '2 حمامات',
          'دخول إلكتروني ذكي برمز خاص لكل حجز',
          'مواقف خاصة'
        ]
      }
    ],
    rules: [
      'تسجيل الوصول: ابتداءً من الساعة 4:00 عصراً',
      'تسجيل المغادرة: حتى الساعة 1:00 ظهراً',
      'التدخين: ممنوع نهائياً داخل الشقة',
      'الهدوء: يُرجى الحفاظ على السكينة بعد الساعة 11:00 مساءً',
      'الحيوانات الأليفة: غير مسموحة'
    ]
  }
];

// Initial bookings for the prototype demonstration & rental contract view
export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-001',
    bookingNumber: 'RQ-98421',
    apartmentId: 'apt-01',
    apartmentName: 'الشقة رقم 1',
    apartmentNumber: '01',
    guestName: 'سلطان عبدالعزيز المقرن',
    guestIdNumber: '1088492011',
    guestPhone: '+966 55 541 2980',
    guestEmail: 'sultan.almuqrin@gmail.com',
    guestCount: 5,
    checkInDate: '2026-11-12',
    checkOutDate: '2026-11-15',
    nights: 3,
    pricePerNight: 1450,
    subtotal: 4350,
    serviceFee: 200,
    deposit: 1000,
    totalAmount: 5550,
    notes: 'يرجى تجهيز المراتب الإضافية الثلاث مع البطانيات والمخدات.',
    status: 'confirmed',
    createdAt: '2026-11-06T14:30:00'
  },
  {
    id: 'b-002',
    bookingNumber: 'RQ-98422',
    apartmentId: 'apt-02',
    apartmentName: 'الشقة رقم 2',
    apartmentNumber: '02',
    guestName: 'د. فيصل بن خالد النعيمي',
    guestIdNumber: '1049281744',
    guestPhone: '+966 50 882 1439',
    guestEmail: 'faisal.naimi@consulting.sa',
    guestCount: 4,
    checkInDate: '2026-11-18',
    checkOutDate: '2026-11-21',
    nights: 3,
    pricePerNight: 1150,
    subtotal: 3450,
    serviceFee: 150,
    deposit: 1000,
    totalAmount: 4600,
    notes: 'زيارة عائلية، يرجى التأكد من تجهيز الشاشات والإنترنت.',
    status: 'confirmed',
    createdAt: '2026-11-07T09:15:00'
  },
  {
    id: 'b-003',
    bookingNumber: 'RQ-98423',
    apartmentId: 'apt-01',
    apartmentName: 'الشقة رقم 1',
    apartmentNumber: '01',
    guestName: 'م. ريان محمد الشهري',
    guestIdNumber: '1072938102',
    guestPhone: '+966 56 719 3302',
    guestEmail: 'rayan.shehri@outlook.com',
    guestCount: 6,
    checkInDate: '2026-11-24',
    checkOutDate: '2026-11-27',
    nights: 3,
    pricePerNight: 1450,
    subtotal: 4350,
    serviceFee: 200,
    deposit: 1000,
    totalAmount: 5550,
    notes: 'طلب تسجيل وصول مبكر في تمام الساعة 2:00 ظهراً إن أمكن.',
    status: 'pending',
    createdAt: '2026-11-07T18:40:00'
  }
];

// Booked ranges per apartment (YYYY-MM-DD)
export const BLOCKED_DATES: Record<string, string[]> = {
  'apt-01': [
    '2026-11-12', '2026-11-13', '2026-11-14',
    '2026-11-24', '2026-11-25', '2026-11-26'
  ],
  'apt-02': [
    '2026-11-18', '2026-11-19', '2026-11-20'
  ]
};

// Robust helper checking date availability across 10+ years with realistic simulation
export const isDateBlockedForApartment = (dateStr: string, aptId: string): boolean => {
  if (!dateStr) return false;

  // 1. Check explicit list in BLOCKED_DATES
  const list = BLOCKED_DATES[aptId] || [];
  if (list.includes(dateStr)) return true;

  // 2. Check initial bookings
  const isBookedInSystem = INITIAL_BOOKINGS.some((b: Booking) => 
    b.apartmentId === aptId && 
    b.status !== 'cancelled' && 
    dateStr >= b.checkInDate && 
    dateStr < b.checkOutDate
  );
  if (isBookedInSystem) return true;

  // 3. Realistic recurring calendar simulation across any month/year for 10+ years:
  // apt-01: Days 12, 13, 14 and 24, 25, 26 of every month are pre-booked (VIP reserved)
  // apt-02: Days 7, 8, 9 and 19, 20, 21 of every month are pre-booked (VIP reserved)
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[2], 10);
    if (aptId === 'apt-01' && ((day >= 12 && day <= 14) || (day >= 24 && day <= 26))) {
      return true;
    }
    if (aptId === 'apt-02' && ((day >= 7 && day <= 9) || (day >= 19 && day <= 21))) {
      return true;
    }
  }

  return false;
};

export const SITE_INFO = {
  name: 'رُقِيّ للشقق الفندقية',
  nameEn: 'Roqay VIP Hotel Apartments',
  logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-08_at_8.03.27_AM_eaaf6f24.jpeg',
  tagline: 'فخامة هادئة وخصوصية استثنائية في أرقى أحياء الطائف',
  address: 'المملكة العربية السعودية، الطائف، حي النسيم / شارع ابن سيناء',
  googleMapsUrl: 'https://maps.app.goo.gl/1Jkt5rDCjv95y2JA8?g_st=iw',
  phone: '+966 59 581 2059',
  whatsapp: '966595812059',
  email: 'ahmed13943@gmail.com',
  commercialRegister: '1010892014',
  tourismLicense: 'HOT-VIP-2026-99',
  checkIn: '4:00 عصراً (16:00)',
  checkOut: '1:00 ظهراً (13:00)',
  totalUnits: 2
};
