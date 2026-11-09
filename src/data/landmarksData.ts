export interface LandmarkItem {
  id: string;
  name: string;
  category: 'malls' | 'parks' | 'cafes' | 'restaurants' | 'sweets' | 'services';
  subCategory?: string;
  description?: string;
  mapUrl: string;
  tag?: string;
}

export interface DayItineraryStep {
  stepNumber: number;
  time?: string;
  title: string;
  description: string;
  mapUrl: string;
  tag?: string;
}

export const NEARBY_LANDMARKS: LandmarkItem[] = [
  // --- الأسواق والمولات ---
  {
    id: 'mall-1',
    name: 'التيرا مول',
    category: 'malls',
    description: 'من أرقى وجهات التسوق والترفيه في الطائف',
    mapUrl: 'https://maps.app.goo.gl/D1buMqMveGzdUigx5?g_st=iw',
    tag: 'تسوق فاخر'
  },
  {
    id: 'mall-2',
    name: 'الجوري مول',
    category: 'malls',
    description: 'مجمع تجاري متكامل وماركات عالمية ومطاعم',
    mapUrl: 'https://maps.app.goo.gl/uKrYeSfHkjUzRRHk7?g_st=iw',
    tag: 'تسوق عائلي'
  },
  {
    id: 'mall-3',
    name: 'ذا بارك',
    category: 'malls',
    description: 'مجمع جديد أسواق، ملاهي، مقاهي ومطاعم طريق الحوية الرياض',
    mapUrl: 'https://maps.app.goo.gl/BH7Hie4gzxab1UVR6?g_st=iw',
    tag: 'مجمع جديد وترفيه'
  },
  {
    id: 'mall-4',
    name: 'سوق البلد',
    category: 'malls',
    description: 'المنطقة التاريخية والأسواق التراثية العريقة وسط الطائف',
    mapUrl: 'https://maps.app.goo.gl/pErh2uiydE6ivWo2A?g_st=iw',
    tag: 'تراث وتسوق شعبي'
  },
  {
    id: 'mall-5',
    name: 'سوق العنقري',
    category: 'malls',
    description: 'أشهر الأسواق المركزية للمستلزمات والملابس والهدايا',
    mapUrl: 'https://maps.app.goo.gl/fJ3NFxkwmYTeLn4D8?g_st=ipc',
    tag: 'تسوق متنوع'
  },

  // --- المنتزهات والطبيعة ---
  {
    id: 'park-1',
    name: 'منتزه الردف المشهور',
    category: 'parks',
    description: 'أكبر منتزهات الطائف مع النافورة التفاعلية ومعرض الورد والمسطحات الخضراء',
    mapUrl: 'https://maps.app.goo.gl/GNMixvS84yxTF9ko7?g_st=iw',
    tag: 'منتزه عائلي شهير'
  },
  {
    id: 'park-2',
    name: 'مزرعة الفراولة بالهدا',
    category: 'parks',
    description: 'تجربة سياحية وقطف الفراولة في أجواء طبيعية خلابة',
    mapUrl: 'https://maps.app.goo.gl/5AjqUTcZHBTxUqmP6?g_st=iw',
    tag: 'طبيعة وقطف الفراولة'
  },
  {
    id: 'park-3',
    name: 'بيرد بارك (حديقة الطيور بالهدا)',
    category: 'parks',
    description: 'حديقة متخصصة بالطيور النادرة والملونة بالهدا',
    mapUrl: 'https://maps.app.goo.gl/dBFBNHp1ESjhsHtR7?g_st=iw',
    tag: 'طيور وترفيه'
  },
  {
    id: 'park-4',
    name: 'منتزه سفاري الطايف 👌',
    category: 'parks',
    description: 'وجهة سياحية وسفاري وترفيه في الهواء الطلق',
    mapUrl: 'https://maps.app.goo.gl/1XxZLsgKpQevNoMx5?g_st=iw',
    tag: 'سفاري ومغامرة'
  },
  {
    id: 'park-5',
    name: 'مزرعة وكافية تين النموذجية بالشفا',
    category: 'parks',
    description: 'جلسات راقية بين أشجار التين والطبيعة الغناء في مرتفعات الشفا',
    mapUrl: 'https://maps.app.goo.gl/Dueja92Q4XNnb9zT6?g_st=iw',
    tag: 'مزرعة ومقهى'
  },
  {
    id: 'park-6',
    name: 'منتجع وكوفي غزال 🦌 بالشفا',
    category: 'parks',
    description: 'إطلالات جبلية ساحرة وأجواء ريفية فريدة',
    mapUrl: 'https://maps.app.goo.gl/F9umtE3yY9izupQbA?g_st=iw',
    tag: 'إطلالة ريفية'
  },
  {
    id: 'park-7',
    name: 'كوفي باز طريق وادي خماس طريق الشفا',
    category: 'parks',
    description: 'مقهى بأجواء جبلية وجلسات استثنائية بوادي خماس',
    mapUrl: 'https://maps.app.goo.gl/i1SGzbL3qug7NpPYA?g_st=iw',
    tag: 'وادي خماس'
  },
  {
    id: 'park-8',
    name: 'منتجع جسر اللوزية (jjsr.alluwzia)',
    category: 'parks',
    description: 'وادي خماس طريق الشفا، منتجع طبيعي راقٍ',
    mapUrl: 'https://maps.app.goo.gl/nuSgcDAqeFypDK5h8?g_st=ipc',
    tag: 'منتجع طبيعي'
  },
  {
    id: 'park-9',
    name: 'مزرعة بن صالح الطلحي (BENSALEH515)',
    category: 'parks',
    description: 'وادي خماس طريق الشفا، مزارع وجلسات خلابة',
    mapUrl: 'https://maps.app.goo.gl/SCWXogNmsJxAFbyW7?g_st=ipc',
    tag: 'مزارع الشفا'
  },
  {
    id: 'park-10',
    name: 'مطل الهدا (أحمد الحارثي 📍)',
    category: 'parks',
    description: 'إطلالة بانورامية ساحرة على سفوح الهدا والغيوم',
    mapUrl: 'https://maps.app.goo.gl/DH1dyLY1JFcam5vdA?g_st=iw',
    tag: 'إطلالة بانورامية'
  },
  {
    id: 'park-11',
    name: 'الشجرة المعمرة بالسعودية',
    category: 'parks',
    description: 'أحد المعالم الطبيعية والتاريخية الشهيرة في الطائف',
    mapUrl: 'https://maps.app.goo.gl/xauKpG5o7vKCjzpK7?g_st=iw',
    tag: 'معلم طبيعي نادر'
  },
  {
    id: 'park-12',
    name: 'مزرعة الريف بالشفا',
    category: 'parks',
    description: 'طبيعة ريفية هادئة وفواكه الطائف الموسمية',
    mapUrl: 'https://maps.app.goo.gl/NUgCJtSrjp2fDayc6?g_st=iw',
    tag: 'ريف الشفا'
  },
  {
    id: 'park-13',
    name: 'غابة وادي غزال 🦌 طريق الشفا',
    category: 'parks',
    description: 'أشجار طبيعية كثيفة وأجواء باردة وجريان المياه في المواسم',
    mapUrl: 'https://maps.app.goo.gl/ft8eSyt5t5v2JqfV6?g_st=iw',
    tag: 'غابة طبيعية'
  },
  {
    id: 'park-14',
    name: 'مزرعة مشعل للورد بالشفا',
    category: 'parks',
    description: 'مزارع وتقطير الورد الطائفي الفاخر في الشفا',
    mapUrl: 'https://maps.app.goo.gl/Rykw5pt1NRKhf7QC8?g_st=iw',
    tag: 'مزارع الورد'
  },
  {
    id: 'park-15',
    name: 'مكان رايق بالشفا',
    category: 'parks',
    description: 'جلسات هادئة وطبيعة جبلية مميزة للاسترخاء',
    mapUrl: 'https://maps.app.goo.gl/wxzvv9QkPQNotdF48?g_st=iw',
    tag: 'هدوء واسترخاء'
  },
  {
    id: 'park-16',
    name: 'جبل دكا بالشفا',
    category: 'parks',
    description: 'أعلى قمة في منطقة الطائف وإطلالة خيالية لمعانقة السحاب',
    mapUrl: 'https://maps.app.goo.gl/1nP5dsez3aHsjqSG6?g_st=iw',
    tag: 'أعلى قمة بالطائف'
  },
  {
    id: 'park-17',
    name: 'مطل عقبة المحمدية بطريق الشفا',
    category: 'parks',
    description: 'إطلالة حافة الجبال باتجاه تهامة وسلاسل السروات',
    mapUrl: 'https://maps.app.goo.gl/tqrENFEWwoVZqK1RA?g_st=iw',
    tag: 'مطل جبلي'
  },
  {
    id: 'park-18',
    name: 'مزرعة البواردي للجواد العربي والفواكة والورد',
    category: 'parks',
    description: 'وجهة متكاملة تجمع الخيول العربية الأصيلة مع فواكه وورد الطائف',
    mapUrl: 'https://maps.app.goo.gl/mC3HAJyAM5QTEjW37?g_st=iw',
    tag: 'خيل عربي ومزرعة'
  },
  {
    id: 'park-19',
    name: 'مزرعة ومقهى سويد طريق الجنوب',
    category: 'parks',
    description: 'مقهى ومزرعة ريفية هادئة بجلسات خارجية مريحة',
    mapUrl: 'https://maps.app.goo.gl/tNU9enCUNe8Do3PFA?g_st=iw',
    tag: 'مزرعة ومقهى'
  },

  // --- المقاهي ---
  {
    id: 'cafe-1',
    name: 'نورث كافيه (North)',
    category: 'cafes',
    description: 'قهوة مختصة وأجواء أنيقة وديكورات عصرية',
    mapUrl: 'https://maps.app.goo.gl/fXHXe1zzScRhQv3W8?g_st=ipc',
    tag: 'قهوة مختصة'
  },
  {
    id: 'cafe-2',
    name: 'دانكن (Dunkin)',
    category: 'cafes',
    description: 'القهوة اليومية والدونات السريعة',
    mapUrl: 'https://maps.app.goo.gl/URhuCCafqWdUVWj89?g_st=ipc',
    tag: 'قهوة سريعة'
  },
  {
    id: 'cafe-3',
    name: 'فايبز كافيه (Vibes)',
    category: 'cafes',
    description: 'جلسات عصرية وموسيقى هادئة وقهوة متقنة',
    mapUrl: 'https://maps.app.goo.gl/VoaMNiEYE181wjxi6?g_st=ipc',
    tag: 'قهوة مختصة'
  },
  {
    id: 'cafe-4',
    name: 'كرز 🍒 البن شهار',
    category: 'cafes',
    description: 'أشهر محامص وقهوة مختصة بطريق شهار',
    mapUrl: 'https://maps.app.goo.gl/zcpnzApWZqdP961P8?g_st=ipc',
    tag: 'محمصة وقهوة'
  },
  {
    id: 'cafe-5',
    name: 'كيميستري كوفي (Chemistry)',
    category: 'cafes',
    description: 'تحضير مبتكر ومختص للقهوة الباردة والساخنة',
    mapUrl: 'https://maps.app.goo.gl/sXbKFaDWGJdvtC1R9?g_st=ipc',
    tag: 'قهوة تجريبية'
  },
  {
    id: 'cafe-6',
    name: 'فندير كافيه (Vendeur)',
    category: 'cafes',
    description: 'كافيه راقٍ يتميز بالمشروبات المبتكرة والحلا الفاخر',
    mapUrl: 'https://maps.app.goo.gl/AknHtor1pgA4BFaGA?g_st=ipc',
    tag: 'كافيه فاخر'
  },
  {
    id: 'cafe-7',
    name: 'مقهى أوراق (شلال وبحيرات)',
    category: 'cafes',
    description: 'مقهى جميل بمسطحات خضراء وشلال مع مناظر للبحيرات بجوار جامع الملك فهد وسط الطائف',
    mapUrl: 'https://maps.app.goo.gl/VAeiASujuJKM68sz5?g_st=iw',
    tag: 'شلال وبحيرات'
  },
  {
    id: 'cafe-8',
    name: 'كوفي ومعمل الشيوخ للورد الطائفي (الشفا)',
    category: 'cafes',
    description: 'مقهى داخل مزرعة وسط الطبيعة مع معمل تقطير الورد الطائفي',
    mapUrl: 'https://maps.app.goo.gl/Rz6UjGGRdt5z8bNHA?g_st=ipc',
    tag: 'مزرعة ومعمل ورد'
  },
  {
    id: 'cafe-9',
    name: 'مقهى ستكش حي الوسام',
    category: 'cafes',
    description: 'جلسات عصرية وأجواء شبابية راقية بحي الوسام',
    mapUrl: 'https://maps.app.goo.gl/GyX2Gv9itZtbMF1GA?g_st=iw',
    tag: 'حي الوسام'
  },

  // --- المطاعم ---
  {
    id: 'rest-1',
    name: 'مطعم زهرة',
    category: 'restaurants',
    description: 'أطباق شرقية ومأكولات شهية وتجهيزات عائلية',
    mapUrl: 'https://maps.app.goo.gl/CS5i6EGjV6yeqqZo9?g_st=iw',
    tag: 'مأكولات شرقية'
  },
  {
    id: 'rest-2',
    name: 'مطعم دار بيروت (التيرا مول)',
    category: 'restaurants',
    description: 'مأكولات لبنانية راقية ومقبلات وشواء بأجواء التيرا مول',
    mapUrl: 'https://maps.app.goo.gl/12v49ygStXCDVDHn6?g_st=ipc',
    tag: 'لبناني فاخر'
  },
  {
    id: 'rest-3',
    name: 'مطعم الرمانة طريق شهار',
    category: 'restaurants',
    description: 'أطباق متنوعة وشاورما ومقبلات بطريق شهار الحيوي',
    mapUrl: 'https://maps.app.goo.gl/MeySt1WsqjKUyot19?g_st=iw',
    tag: 'طريق شهار'
  },
  {
    id: 'rest-4',
    name: 'مطاعم ومطابخ شيزان (فرع المنتزه)',
    category: 'restaurants',
    description: 'أشهر مطاعم السليق الطائفي الأصيل والمضغوط والذبائح',
    mapUrl: 'https://maps.app.goo.gl/yW58QpvJjxndLCBS7?g_st=ipc',
    tag: 'سليق طائفي أصيل'
  },
  {
    id: 'rest-5',
    name: 'مطعم ومقهى بيل أزور طريق شهار',
    category: 'restaurants',
    description: 'جلسات راقية وأطباق عالمية وإيطالية ومشاوي',
    mapUrl: 'https://maps.app.goo.gl/YywmtipvRJqWLMvL7?g_st=iw',
    tag: 'جلسات راقية'
  },
  {
    id: 'rest-6',
    name: 'مطعم كيناري الهندي',
    category: 'restaurants',
    description: 'برياني وأطباق كاري هندية بتوابل ونكهات أصلية',
    mapUrl: 'https://maps.app.goo.gl/ZkhWfSyCKzAZc2c38?g_st=iw',
    tag: 'أكلات هندية'
  },
  {
    id: 'rest-7',
    name: 'البيك (AlBaik)',
    category: 'restaurants',
    description: 'أشهر دجاج وبروست وسندوتشات بالمملكة',
    mapUrl: 'https://maps.app.goo.gl/7LAdMhzdYPwvuFdU7?g_st=iw',
    tag: 'سريع ومحبوب'
  },
  {
    id: 'rest-8',
    name: 'مطعم أيلول لبنان طريق الملك خالد',
    category: 'restaurants',
    description: 'مشاوي ومتبلات وأكلات شامية شهية',
    mapUrl: 'https://maps.app.goo.gl/np3ZVt7PNaXRxEWMA?g_st=iw',
    tag: 'مشاوي وأكلات شامية'
  },
  {
    id: 'rest-9',
    name: 'مطعم ولاونج ياز أمام حديقة الملك عبدالله',
    category: 'restaurants',
    description: 'لاونج ومطعم راقٍ بإطلالات جميلة وأطباق مميزة',
    mapUrl: 'https://maps.app.goo.gl/fbkfKxYZSNKqPEiH8?g_st=iw',
    tag: 'لاونج ومطعم فاخر'
  },
  {
    id: 'rest-10',
    name: 'مطعم خيال طريق الملك خالد',
    category: 'restaurants',
    description: 'مشاوي تركية وشامية فخمة وأطول سيخ شواء ومقبلات غنية',
    mapUrl: 'https://maps.app.goo.gl/hnE2HhYrikCeEzsi9?g_st=iw',
    tag: 'مشاوي تركية فاخرة'
  },
  {
    id: 'rest-11',
    name: 'مطعم ومقهى ملة',
    category: 'restaurants',
    description: 'مأكولات شعبية وتراثية طائفية بطابع أصيل وجلسات دافئة',
    mapUrl: 'https://maps.app.goo.gl/fpNUoKm8DozwqMCb8?g_st=iw',
    tag: 'أكلات تراثية'
  },
  {
    id: 'rest-12',
    name: 'مطعم ليالي أم كلثوم',
    category: 'restaurants',
    description: 'أجواء طربية مصرية وشرقية كلاسيكية وأطباق غنية',
    mapUrl: 'https://maps.app.goo.gl/KuFGCSPwFG8TxYvM7?g_st=iw',
    tag: 'أجواء طربية وشرقية'
  },
  {
    id: 'rest-13',
    name: 'مطعم الروشة اللبناني',
    category: 'restaurants',
    description: 'مذاقات بيروتية ومأكولات لبنانية عريقة',
    mapUrl: 'https://maps.app.goo.gl/jX9xLDBkkaFfAr1t6?g_st=iw',
    tag: 'لبناني أصيل'
  },
  {
    id: 'rest-14',
    name: 'مطعم أوزون للمأكولات البحرية',
    category: 'restaurants',
    description: 'أسماك طازجة وروبيان وسيمفونية مأكولات بحرية',
    mapUrl: 'https://maps.app.goo.gl/bP431Eda1U9p4orP9?g_st=iw',
    tag: 'مأكولات بحرية'
  },
  {
    id: 'rest-15',
    name: 'مطعم ميراج للأكلات الهندية',
    category: 'restaurants',
    description: 'أجواء راقية ونكهات تندوري وبرياني هندي مميز',
    mapUrl: 'https://maps.app.goo.gl/M48TyBq2Udr4L8MX8?g_st=iw',
    tag: 'هندي فاخر'
  },
  {
    id: 'rest-16',
    name: 'وجبة عزيز',
    category: 'restaurants',
    description: 'برجر ووجبات سريعة محبوبة',
    mapUrl: 'https://maps.app.goo.gl/wyQB9qcHQXJWes9Z7?g_st=ipc',
    tag: 'وجبات سريعة'
  },
  {
    id: 'rest-17',
    name: 'مندي خالد',
    category: 'restaurants',
    description: 'مندي لحم ودجاج بلدي على الحطب',
    mapUrl: 'https://maps.app.goo.gl/qEfwJSTtwuhmGNJR7?g_st=ipc',
    tag: 'مندي بلدي'
  },
  {
    id: 'rest-18',
    name: 'مندي الدعجاني',
    category: 'restaurants',
    description: 'أحد أعرق مطاعم المندي والمظبي بالطائف',
    mapUrl: 'https://maps.app.goo.gl/uzQhLskiwWCa999q9?g_st=ipc',
    tag: 'مندي أصيل'
  },

  // --- الحلويات ---
  {
    id: 'sweet-1',
    name: 'مذاق الملكة (Queen’s Taste) - فرع الفيصلية',
    category: 'sweets',
    description: 'أرقى تشكيلات الكيك والحلويات والشوكولاتة الفاخرة',
    mapUrl: 'https://maps.app.goo.gl/FVG7igN4EDwZfKnu7?g_st=ipc',
    tag: 'حلويات فاخرة'
  },
  {
    id: 'sweet-2',
    name: 'حلويات مذاق الملكة - فرع شهار',
    category: 'sweets',
    description: 'حلويات شرقية وغربية ومعجنات وتورتات راقية',
    mapUrl: 'https://maps.app.goo.gl/GkPc4cycqBvrX38g9?g_st=iw',
    tag: 'فرع شهار'
  },

  // --- خدمات الحي القريبة من رُقيّ ومجموعة تيرا للشقق الفندقية ---
  // التموينات
  {
    id: 'srv-1',
    name: 'تموينات الشهيب',
    category: 'services',
    subCategory: 'تموينات وسوبرماركت',
    description: 'احتياجات يومية ومواد غذائية قريبة من الشقق',
    mapUrl: 'https://maps.app.goo.gl/qs6RsJVVknCY3Pd89?g_st=com.google.maps.preview.copy',
    tag: 'تموينات'
  },
  {
    id: 'srv-2',
    name: 'تموينات المتجر',
    category: 'services',
    subCategory: 'تموينات وسوبرماركت',
    description: 'بقالة وتموينات متكاملة لخدمة الضيوف بالحي',
    mapUrl: 'https://maps.app.goo.gl/Y7WUZHw3bQwJRK7o6?g_st=com.google.maps.preview.copy',
    tag: 'تموينات'
  },
  {
    id: 'srv-3',
    name: 'أسواق عبدالله الحميدان',
    category: 'services',
    subCategory: 'تموينات وسوبرماركت',
    description: 'سوبرماركت وأغذية طازجة متكاملة',
    mapUrl: 'https://maps.app.goo.gl/CRse7tbxyDuKT9aF7?g_st=com.google.maps.preview.copy',
    tag: 'أسواق مركزية'
  },
  {
    id: 'srv-4',
    name: 'مركز ومخبز حراء',
    category: 'services',
    subCategory: 'تموينات وسوبرماركت',
    description: 'مخبوزات طازجة وحلويات ومواد تموينية',
    mapUrl: 'https://maps.app.goo.gl/KoHv1KgXtAqNmt2Z8?g_st=com.google.maps.preview.copy',
    tag: 'مخبز وتموينات'
  },

  // مغاسل الملابس
  {
    id: 'srv-5',
    name: 'مغاسل ديم مكس',
    category: 'services',
    subCategory: 'مغاسل ملابس',
    description: 'غسيل وكوي سريع وبخار واعتناء بالملابس والأقمشة',
    mapUrl: 'https://maps.app.goo.gl/LgRJyDvT5G8nNT3B9?g_st=com.google.maps.preview.copy',
    tag: 'مغسلة ملابس'
  },
  {
    id: 'srv-6',
    name: 'مغاسل مستر واش',
    category: 'services',
    subCategory: 'مغاسل ملابس',
    description: 'خدمة غسيل وكوي فاخرة وسريعة',
    mapUrl: 'https://maps.app.goo.gl/2Wdajcjp1z89Y42E6?g_st=com.google.maps.preview.copy',
    tag: 'مغسلة ملابس'
  },

  // المطاعم في الحي
  {
    id: 'srv-7',
    name: 'مطعم الشاكرين',
    category: 'services',
    subCategory: 'مطاعم الحي السريعة والشعبية',
    description: 'أكلات سريعة وشعبية قريبة بالحي',
    mapUrl: 'https://maps.app.goo.gl/xAxtcUXwhuq1XuYNA?g_st=com.google.maps.preview.copy',
    tag: 'مطعم حي'
  },
  {
    id: 'srv-8',
    name: 'بروستي',
    category: 'services',
    subCategory: 'مطاعم الحي السريعة والشعبية',
    description: 'وجبات بروست مقرمشة وسريعة',
    mapUrl: 'https://maps.app.goo.gl/aNYysmgCoV14FjSz6?g_st=com.google.maps.preview.copy',
    tag: 'بروست'
  },
  {
    id: 'srv-9',
    name: 'شاورما وعصيرات بيروت',
    category: 'services',
    subCategory: 'مطاعم الحي السريعة والشعبية',
    description: 'شاورما دجاج ولحم وعصائر طازجة متنوعة',
    mapUrl: 'https://maps.app.goo.gl/TLjyrxRADDaxnTtQ6?g_st=com.google.maps.preview.copy',
    tag: 'شاورما وعصائر'
  },
  {
    id: 'srv-10',
    name: 'مطعم كبسة ون',
    category: 'services',
    subCategory: 'مطاعم الحي السريعة والشعبية',
    description: 'كبسات وأرز ودجاج بطرق تحضير شهية',
    mapUrl: 'https://maps.app.goo.gl/qeei6gr8P7kx9Zky7?g_st=com.google.maps.preview.copy',
    tag: 'كبسة وأرز'
  },
  {
    id: 'srv-11',
    name: 'فوال وعدس وتميس النخيل',
    category: 'services',
    subCategory: 'مطاعم الحي السريعة والشعبية',
    description: 'فطور شعبي وتميس حار وفول وعدس طازج',
    mapUrl: 'https://maps.app.goo.gl/TbP7LW9simXxt3fS6?g_st=com.google.maps.preview.copy',
    tag: 'فطور وتميس'
  },
  {
    id: 'srv-12',
    name: 'ارياف الحجاز للفطور الشعبي',
    category: 'services',
    subCategory: 'مطاعم الحي السريعة والشعبية',
    description: 'أطباق فطور حجازي أصيل ومعصوب ومطبق',
    mapUrl: 'https://maps.app.goo.gl/G7ipbQURGqJfqzzw6?g_st=com.google.maps.preview.copy',
    tag: 'فطور حجازي'
  },

  // الصيدليات
  {
    id: 'srv-13',
    name: 'صيدلية المتحدة',
    category: 'services',
    subCategory: 'صيدليات ورعاية صحية',
    description: 'أدوية ومستلزمات طبية وعناية شخصية قريبة',
    mapUrl: 'https://maps.app.goo.gl/Uf5MxrkSCHyTMBev9?g_st=com.google.maps.preview.copy',
    tag: 'صيدلية'
  },
  {
    id: 'srv-14',
    name: 'صيدلية النهدي',
    category: 'services',
    subCategory: 'صيدليات ورعاية صحية',
    description: 'أكبر شبكة صيدليات بالمملكة مع خدمات دوائية متكاملة',
    mapUrl: 'https://maps.app.goo.gl/4ns5ep64TA3FX7dV9?g_st=com.google.maps.preview.copy',
    tag: 'صيدلية النهدي'
  },

  // متفرقات الحي
  {
    id: 'srv-15',
    name: 'جوالات النسيم',
    category: 'services',
    subCategory: 'متفرقات وخدمات الحي',
    description: 'صيانة وشواحن وإكسسوارات هواتف ذكية',
    mapUrl: 'https://maps.app.goo.gl/V68ChsuR1KxQUhWQ9?g_st=com.google.maps.preview.copy',
    tag: 'خدمات جوالات'
  },
  {
    id: 'srv-16',
    name: 'عصاير وايسكريم حراء',
    category: 'services',
    subCategory: 'متفرقات وخدمات الحي',
    description: 'آيسكريم منعش وعصائر باردة',
    mapUrl: 'https://maps.app.goo.gl/V68ChsuR1KxQUhWQ9?g_st=com.google.maps.preview.copy',
    tag: 'عصائر وآيسكريم'
  },
  {
    id: 'srv-17',
    name: 'دار الضيافة للعطارة',
    category: 'services',
    subCategory: 'متفرقات وخدمات الحي',
    description: 'عطارة وزيوت وأعشاب وتوابل طبيعية',
    mapUrl: 'https://maps.app.goo.gl/KQYAozs7HHWy6eob6?g_st=com.google.maps.preview.copy',
    tag: 'عطارة'
  },
  {
    id: 'srv-18',
    name: 'جوسي آند فرايز',
    category: 'services',
    subCategory: 'متفرقات وخدمات الحي',
    description: 'سناكات وبطاطس وعصائر سريعة',
    mapUrl: 'https://maps.app.goo.gl/CU5ERXsatU8dHY5L6?g_st=com.google.maps.preview.copy',
    tag: 'وجبات وسناكات'
  },
  {
    id: 'srv-19',
    name: 'مشغل نسائي ماجيك ليدي سنتر',
    category: 'services',
    subCategory: 'متفرقات وخدمات الحي',
    description: 'صالون وعناية نسائية متكاملة في الحي',
    mapUrl: 'https://maps.app.goo.gl/sgP9ffcAXXoMeMep9?g_st=com.google.maps.preview.copy',
    tag: 'مشغل نسائي'
  }
];

export const GENERAL_SERVICES_MAP_URL = 'https://maps.app.goo.gl/dLBivvMR9mMjMKcm9?g_st=com.google.maps.preview.copy';
export const MAIN_APARTMENT_LOCATION_URL = 'https://maps.app.goo.gl/1Jkt5rDCjv95y2JA8?g_st=iw';

// برنامج اليوم الواحد السياحي في الطائف والشفا
export const ONE_DAY_TOUR_PROGRAM: DayItineraryStep[] = [
  {
    stepNumber: 1,
    time: '4:30 عصراً',
    title: 'الانطلاق إلى وادي غزال 🦌 طريق الشفا',
    description: 'الاستمتاع بالمناظر الطبيعية الخلابة والهواء العليل وأشجار العرعر في وادي غزال الساحر.',
    mapUrl: 'https://maps.app.goo.gl/eyG464dDhedRpXsz8?g_st=iw',
    tag: 'طبيعة ومناظر'
  },
  {
    stepNumber: 2,
    time: '5:30 مساءً',
    title: 'جولة بالسيارة على دائري الشفا',
    description: 'الانطلاق إلى مرتفعات الشفا وأخذ لفة بالسيارة على الطريق الدائري والاستمتاع بالأجواء الغائمة والنسيم البارد.',
    mapUrl: 'https://maps.app.goo.gl/FW7ntjhRt8oP9q797?g_st=iw',
    tag: 'جولة بانورامية'
  },
  {
    stepNumber: 3,
    time: '6:15 مساءً',
    title: 'الصعود لقمة جبل دكا',
    description: 'الوصول إلى أعلى قمة جبلية بالطائف لمشاهدة مشهد الغروب المهيب ومعانقة السحاب.',
    mapUrl: 'https://maps.app.goo.gl/GarVyR6sAdLYq8x97?g_st=iw',
    tag: 'غروب السحاب'
  },
  {
    stepNumber: 4,
    time: '7:15 مساءً',
    title: 'استراحة القهوة في مقاهي الشفا ووادي خماس',
    description: 'زيارة أشهر مقاهي الشفا (مثل الأكواخ السبعة، كوفي غصن، كافيه غزال 🦌)، ثم التوجه إلى مقهى باز في وادي خماس.',
    mapUrl: 'https://maps.app.goo.gl/Ykei5fHNj1yEZv1B7?g_st=iw',
    tag: 'قهوة جبلية'
  },
  {
    stepNumber: 5,
    time: '8:45 مساءً',
    title: 'منتزه الردف وحديقة ومعرض الورد الطائفي',
    description: 'التوجه إلى منتزه الردف الشهير وزيارة حديقة الردف ومشاهدة معرض الورد التفاعلي والنافورة الموسيقية.',
    mapUrl: 'https://maps.app.goo.gl/LzxtTRdfxPs18xnm7?g_st=iw',
    tag: 'معرض الورد والردف'
  },
  {
    stepNumber: 6,
    time: '10:00 مساءً',
    title: 'حديقة الحيوان ومصنع ومقهى الشيوخ للورد الطائفي',
    description: 'زيارة حديقة الحيوان بالطائف، ثم التوجه لمصنع الشيوخ للورد لمشاهدة تقطير الورد وشراء العطور الفاخرة واحتساء القهوة.',
    mapUrl: 'https://maps.app.goo.gl/UJfmUm4RcEM3hJD4A?g_st=iw',
    tag: 'تقطير الورد الطائفي'
  }
];
