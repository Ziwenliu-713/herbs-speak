/**
 * 中药按功效分类（参考中医百科中药首页）
 * https://baike.duguji.cn/baike/w/中药首页
 * 各类别表格均已嵌入，六语展示，无需跳转外链。
 */

import type { TranslatedText } from '../i18n/strings';

export type HerbCategoryType = 'full';

export interface HerbCategoryConfig {
  id: string;
  title: TranslatedText;
  type: HerbCategoryType;
}

/** 按功效分类的药材类别（全部为嵌入式表格，六语） */
export const herbCategories: HerbCategoryConfig[] = [
  {
    id: 'jiebiao',
    title: {
      zh: '解表药',
      en: 'Exterior-releasing herbs',
      fr: 'Herbes libérant l’extérieur',
      ru: 'Травы, высвобождающие внешнее',
      es: 'Hierbas que liberan el exterior',
      ar: 'أعشاب تحرر الخارج'
    },
    type: 'full'
  },
  {
    id: 'qingre',
    title: {
      zh: '清热药',
      en: 'Heat-clearing herbs',
      fr: 'Herbes clarifiant la chaleur',
      ru: 'Травы, очищающие жар',
      es: 'Hierbas que aclaran el calor',
      ar: 'أعشاب تصفّي الحرارة'
    },
    type: 'full'
  },
  {
    id: 'xiexia',
    title: {
      zh: '泻下药',
      en: 'Purgative herbs',
      fr: 'Herbes purgatives',
      ru: 'Слабительные травы',
      es: 'Hierbas purgantes',
      ar: 'أعشاب مسهّلة'
    },
    type: 'full'
  },
  {
    id: 'qufengshi',
    title: {
      zh: '祛风湿药',
      en: 'Wind-damp-dispelling herbs',
      fr: 'Herbes chassant vent et humidité',
      ru: 'Травы, рассеивающие ветер и сырость',
      es: 'Hierbas que dispersan viento-humedad',
      ar: 'أعشاب تبدد الريح والرطوبة'
    },
    type: 'full'
  },
  {
    id: 'fangxianghuashi',
    title: {
      zh: '芳香化湿药',
      en: 'Aromatic damp-resolving herbs',
      fr: 'Herbes aromatiques transformant l’humidité',
      ru: 'Ароматические травы, устраняющие сырость',
      es: 'Hierbas aromáticas que transforman humedad',
      ar: 'أعشاب عطرية تحوّل الرطوبة'
    },
    type: 'full'
  },
  {
    id: 'lishuishenshi',
    title: {
      zh: '利水渗湿药',
      en: 'Dampness-draining diuretic herbs',
      fr: 'Herbes diurétiques drainant l’humidité',
      ru: 'Мочегонные травы, дренирующие сырость',
      es: 'Hierbas diuréticas que drenan humedad',
      ar: 'أعشاب مدرة للبول تصرّف الرطوبة'
    },
    type: 'full'
  },
  {
    id: 'wenli',
    title: {
      zh: '温里药',
      en: 'Interior-warming herbs',
      fr: 'Herbes réchauffant l’intérieur',
      ru: 'Травы, согревающие внутреннее',
      es: 'Hierbas que calientan el interior',
      ar: 'أعشاب تسخّن الداخل'
    },
    type: 'full'
  },
  {
    id: 'liqi',
    title: {
      zh: '理气药',
      en: 'Qi-regulating herbs',
      fr: 'Herbes régulant le qi',
      ru: 'Травы, регулирующие ци',
      es: 'Hierbas que regulan el qi',
      ar: 'أعشاب تنظم التشي'
    },
    type: 'full'
  },
  {
    id: 'xiaodao',
    title: {
      zh: '消导药',
      en: 'Digestion-promoting herbs',
      fr: 'Herbes favorisant la digestion',
      ru: 'Травы, способствующие пищеварению',
      es: 'Hierbas que promueven la digestión',
      ar: 'أعشاب تعزّز الهضم'
    },
    type: 'full'
  },
  {
    id: 'quchong',
    title: {
      zh: '驱虫药',
      en: 'Antiparasitic herbs',
      fr: 'Herbes antiparasitaires',
      ru: 'Противопаразитарные травы',
      es: 'Hierbas antiparasitarias',
      ar: 'أعشاب مضادة للطفيليات'
    },
    type: 'full'
  },
  {
    id: 'zhixue',
    title: {
      zh: '止血药',
      en: 'Hemostatic herbs',
      fr: 'Herbes hémostatiques',
      ru: 'Кровоостанавливающие травы',
      es: 'Hierbas hemostáticas',
      ar: 'أعشاب أوقاف النزف'
    },
    type: 'full'
  },
  {
    id: 'huoxue',
    title: {
      zh: '活血药',
      en: 'Blood-activating herbs',
      fr: 'Herbes activant le sang',
      ru: 'Травы, активирующие кровь',
      es: 'Hierbas que activan la sangre',
      ar: 'أعشاب تنشّط الدم'
    },
    type: 'full'
  },
  {
    id: 'anshen',
    title: {
      zh: '安神药',
      en: 'Spirit-quieting herbs',
      fr: 'Herbes calmant l’esprit',
      ru: 'Травы, успокаивающие дух',
      es: 'Hierbas que calman el espíritu',
      ar: 'أعشاب تهدئ الروح'
    },
    type: 'full'
  },
  {
    id: 'buyi',
    title: {
      zh: '补益药',
      en: 'Tonic herbs',
      fr: 'Herbes tonifiantes',
      ru: 'Тонизирующие травы',
      es: 'Hierbas tónicas',
      ar: 'أعشاب مقوية'
    },
    type: 'full'
  },
  {
    id: 'kaiqiao',
    title: {
      zh: '开窍药',
      en: 'Orifice-opening herbs',
      fr: 'Herbes ouvrant les orifices',
      ru: 'Травы, открывающие отверстия',
      es: 'Hierbas que abren los orificios',
      ar: 'أعشاب تفتح الفتحات'
    },
    type: 'full'
  },
  {
    id: 'huatanzhike',
    title: {
      zh: '化痰止咳平喘药',
      en: 'Phlegm-resolving, cough- and asthma-relieving herbs',
      fr: 'Herbes transformant les glaires, antitussives et antiasthmatiques',
      ru: 'Травы, разрешающие мокроту и снимающие кашель и астму',
      es: 'Hierbas que transforman flema, antitusivas y antiasmáticas',
      ar: 'أعشاب تحل البلغم وتوقف السعال والربو'
    },
    type: 'full'
  },
  {
    id: 'pingganxifeng',
    title: {
      zh: '平肝熄风药',
      en: 'Liver-pacifying and wind-extinguishing herbs',
      fr: 'Herbes pacifiant le foie et éteignant le vent',
      ru: 'Травы, успокаивающие печень и гасящие ветер',
      es: 'Hierbas que pacifican hígado y extinguen viento',
      ar: 'أعشاب تهدئ الكبد وتطفئ الريح'
    },
    type: 'full'
  },
  {
    id: 'guse',
    title: {
      zh: '固涩药',
      en: 'Astringent herbs',
      fr: 'Herbes astringentes',
      ru: 'Вяжущие травы',
      es: 'Hierbas astringentes',
      ar: 'أعشاب قابضة'
    },
    type: 'full'
  },
  {
    id: 'waiyong',
    title: {
      zh: '外用药',
      en: 'External-use herbs',
      fr: 'Herbes à usage externe',
      ru: 'Травы для наружного применения',
      es: 'Hierbas de uso externo',
      ar: 'أعشاب للاستخدام الخارجي'
    },
    type: 'full'
  }
];
