import type { TranslatedText } from '../i18n/strings';

export interface ShopProduct {
  id: string;
  image: string;
  title: TranslatedText;
  description?: TranslatedText;
  price: number;
  currency: string;
}

export const shopProducts: ShopProduct[] = [
  {
    id: 'cp-1',
    image: 'https://picsum.photos/seed/caoji-1/400/400',
    title: { zh: '四季养生茶礼盒', en: 'Seasonal Wellness Tea Set', fr: 'Coffret thé saisonnier', ru: 'Чайный набор', es: 'Set de té estacional', ar: 'علبة شاي الموسم' },
    description: { zh: '精选四款应季草本茶', en: 'Four seasonal herbal teas', fr: 'Quatre infusions de saison', ru: 'Четыре травяных чая', es: 'Cuatro tés herbales', ar: 'أربعة أنواع شاي عشبي' },
    price: 128,
    currency: 'CNY'
  },
  {
    id: 'cp-2',
    image: 'https://picsum.photos/seed/caoji-2/400/400',
    title: { zh: '草本香囊挂件', en: 'Herbal Sachet Pendant', fr: 'Pendentif sachet', ru: 'Ароматная подвеска', es: 'Colgante herbal', ar: 'قلادة كيس عشبي' },
    description: { zh: '艾叶、薰衣草等天然香料', en: 'Natural herbs for calming', fr: 'Herbes naturelles', ru: 'Натуральные травы', es: 'Hierbas naturales', ar: 'أعشاب طبيعية' },
    price: 58,
    currency: 'CNY'
  },
  {
    id: 'cp-3',
    image: 'https://picsum.photos/seed/caoji-3/400/400',
    title: { zh: '二十四节气笔记本', en: '24 Solar Terms Notebook', fr: 'Carnet 24 termes solaires', ru: 'Тетрадь 24 сезонов', es: 'Cuaderno 24 términos', ar: 'دفتر 24 مصطلح' },
    price: 39,
    currency: 'CNY'
  },
  {
    id: 'cp-4',
    image: 'https://picsum.photos/seed/caoji-4/400/400',
    title: { zh: '穴位按摩刮痧板', en: 'Acupoint Gua Sha', fr: 'Gua sha points', ru: 'Гуаша для точек', es: 'Gua sha acupuntura', ar: 'جوا شا نقاط' },
    description: { zh: '天然牛角材质', en: 'Natural horn with guide', fr: 'Corne naturelle', ru: 'Роговой гребень', es: 'Cuerno natural', ar: 'قرن طبيعي' },
    price: 88,
    currency: 'CNY'
  },
  {
    id: 'cp-5',
    image: 'https://picsum.photos/seed/caoji-5/400/400',
    title: { zh: '中医养生明信片套装', en: 'TCM Postcard Set', fr: 'Set cartes postales MTC', ru: 'Открытки ТКМ', es: 'Postales MTC', ar: 'بطاقات الطب الصيني' },
    price: 29,
    currency: 'CNY'
  },
  {
    id: 'cp-6',
    image: 'https://picsum.photos/seed/caoji-6/400/400',
    title: { zh: '艾草暖贴', en: 'Mugwort Warming Patches', fr: 'Plaques chauffantes moxa', ru: 'Тёплые пластыри', es: 'Parches calientes', ar: 'لاصقات حرارية' },
    price: 45,
    currency: 'CNY'
  }
];
