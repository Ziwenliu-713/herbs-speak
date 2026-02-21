import type { TranslatedText } from '../i18n/strings';

/** 中医介绍视频（YouTube 可嵌入），供基础知识板块使用 */
export type TcmIntroVideo = {
  videoId: string;
  title: TranslatedText;
  /** 主要语言，用于筛选展示 */
  langHint: 'zh' | 'en';
};

export const tcmIntroVideos: TcmIntroVideo[] = [
  {
    videoId: 'cZBjJqxbpO0',
    title: {
      zh: '倪海廈：身邊常見的中藥',
      en: 'Ni Haixia: Common Chinese Herbs Around Us',
      fr: 'Ni Haixia : Herbes chinoises courantes',
      ru: 'Ни Хайся: Распространённые китайские травы',
      es: 'Ni Haixia: Hierbas chinas comunes',
      ar: 'ني هايشيا: أعشاب صينية شائعة'
    },
    langHint: 'zh'
  },
  {
    videoId: 't2Xt7DnA7pU',
    title: {
      zh: 'What is TCM? 什么是中医',
      en: 'What is TCM?',
      fr: 'Qu\'est-ce que la MTC ?',
      ru: 'Что такое ТКМ?',
      es: '¿Qué es la MTC?',
      ar: 'ما هو الطب الصيني التقليدي؟'
    },
    langHint: 'en'
  },
  {
    videoId: 'JaBGYDfkq4I',
    title: {
      zh: '中医智慧：整体观与自然疗愈',
      en: 'Holistic Healing: The Wisdom of TCM',
      fr: 'Guérison holistique : La sagesse de la MTC',
      ru: 'Холистическое исцеление: мудрость ТКМ',
      es: 'Curación holística: La sabiduría de la MTC',
      ar: 'الشفاء الشمولي: حكمة الطب الصيني'
    },
    langHint: 'en'
  },
  {
    videoId: 'dfUXPE3f5hA',
    title: {
      zh: '中国中医药大会：望闻问切',
      en: 'China TCM Conference: Four Examinations',
      fr: 'Conférence MTC Chine : Les quatre examens',
      ru: 'Конференция ТКМ: Четыре метода диагностики',
      es: 'Conferencia MTC China: Las cuatro exploraciones',
      ar: 'مؤتمر الطب الصيني: الفحوصات الأربعة'
    },
    langHint: 'zh'
  },
  {
    videoId: 'dREeBbDnako',
    title: {
      zh: '中医四季养生保健',
      en: 'TCM Seasonal Health & Wellness',
      fr: 'MTC : Santé et bien-être par saison',
      ru: 'ТКМ: Здоровье по сезонам',
      es: 'MTC: Salud y bienestar estacional',
      ar: 'الطب الصيني: الصحة حسب المواسم'
    },
    langHint: 'zh'
  },
  {
    videoId: 'Xdo5rlDsGnk',
    title: {
      zh: '中医蔬食养生',
      en: 'TCM Plant-Based Wellness',
      fr: 'MTC : Bien-être végétal',
      ru: 'ТКМ: Растительное питание',
      es: 'MTC: Bienestar con alimentos vegetales',
      ar: 'الطب الصيني: العافية بالنباتات'
    },
    langHint: 'zh'
  }
];
