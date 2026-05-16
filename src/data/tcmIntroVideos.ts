import type { TranslatedText } from '../i18n/strings';

/**
 * 中医介绍视频：中英双源
 * - 中文用户（lang=zh）：B站 bvid，国内流畅
 * - 海外/外语用户：YouTube videoId，英文或中英双语
 */
export type TcmIntroVideo = {
  /** YouTube 视频 ID，英文/双语，供海外用户 */
  videoId: string;
  /** B站 BV 号，中文内容，供国内用户 */
  bvid?: string;
  title: TranslatedText;
  langHint: 'zh' | 'en';
};

export const tcmIntroVideos: TcmIntroVideo[] = [
  {
    videoId: 'LvaIxtYl3jE',
    bvid: 'BV18W4y147Dw',
    title: {
      zh: '倪海厦：中医奇才讲中医',
      en: 'TCM: China\'s Ancient Healthcare System',
      fr: 'La MTC : système de santé ancestral',
      ru: 'ТКМ: древняя система здравоохранения',
      es: 'La MTC: sistema sanitario ancestral',
      ar: 'الطب الصيني: النظام الصحي القديم'
    },
    langHint: 'zh'
  },
  {
    videoId: 'mVKdAFE1T4Y',
    bvid: 'BV1yJQDYXEjo',
    title: {
      zh: '什么是中医？',
      en: 'What is Traditional Chinese Medicine?',
      fr: 'Qu\'est-ce que la MTC ?',
      ru: 'Что такое ТКМ?',
      es: '¿Qué es la MTC?',
      ar: 'ما هو الطب الصيني؟'
    },
    langHint: 'en'
  },
  {
    videoId: 'MURNoL_LB-8',
    bvid: 'BV1Rb4y1A7Ve',
    title: {
      zh: '非遗文化：中医针灸',
      en: 'Living Heritage: Acupuncture (中英双语)',
      fr: 'Patrimoine vivant : acupuncture',
      ru: 'Живое наследие: иглоукалывание',
      es: 'Patrimonio vivo: acupuntura',
      ar: 'التراث الحي: الوخز بالإبر'
    },
    langHint: 'zh'
  },
  {
    videoId: 'yTMUXUQXYIE',
    bvid: 'BV1CNEQz1EC1',
    title: {
      zh: '望闻问切：舌诊与脉诊',
      en: 'TCM Diagnosis & Acupuncture Demo',
      fr: 'Diagnostic MTC et acupuncture',
      ru: 'Диагностика и иглоукалывание',
      es: 'Diagnóstico MTC y acupuntura',
      ar: 'تشخيص الطب الصيني والوخز'
    },
    langHint: 'zh'
  },
  {
    videoId: 'TIN5oUWwc_M',
    bvid: 'BV1YY4y1e72R',
    title: {
      zh: '针灸：古法今用',
      en: 'Acupuncture: Ancient Healing for Modern Lives',
      fr: 'Acupuncture : guérison ancestrale',
      ru: 'Иглоукалывание: древнее исцеление',
      es: 'Acupuntura: sanación ancestral',
      ar: 'الوخز: الشفاء القديم للحياة الحديثة'
    },
    langHint: 'zh'
  },
  {
    videoId: 'opyTtfW675A',
    bvid: 'BV1CP411n7SW',
    title: {
      zh: '倪海厦人纪：中药与食疗',
      en: 'Chinese Herbs: TCM Doctor\'s Insights',
      fr: 'Herbes chinoises : aperçu MTC',
      ru: 'Китайские травы: взгляд врача',
      es: 'Hierbas chinas: perspectivas MTC',
      ar: 'الأعشاب الصينية: رؤى الطب التقليدي'
    },
    langHint: 'zh'
  }
];
