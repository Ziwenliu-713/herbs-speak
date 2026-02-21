import type { TranslatedText } from '../i18n/strings';

export type MeridianSlide = {
  title: TranslatedText;
  src: string;
};

export const meridianCarouselSlides: MeridianSlide[] = [
  { title: { zh: '督脉', en: 'Du Meridian', fr: 'Vaisseau Gouverneur', ru: 'Меридиан Ду', es: 'Vaso Gobernador', ar: 'وعاء الحاكم' }, src: '/meridians/1.png' },
  { title: { zh: '任脉', en: 'Ren Meridian', fr: 'Vaisseau Conception', ru: 'Меридиан Жэнь', es: 'Vaso Concepción', ar: 'وعاء الحمل' }, src: '/meridians/2.png' },
  { title: { zh: '手厥阴心包经', en: 'Pericardium Meridian', fr: 'Méridien Péricarde', ru: 'Меридиан Перикарда', es: 'Meridiano Pericardio', ar: 'خط التامور' }, src: '/meridians/3.png' },
  { title: { zh: '手少阳三焦经', en: 'Sanjiao Meridian', fr: 'Méridien Triple Réchauffeur', ru: 'Меридиан Сань-цзяо', es: 'Meridiano Sanjiao', ar: 'خط السانجياو' }, src: '/meridians/4.png' },
  { title: { zh: '手少阴心经', en: 'Heart Meridian (Hand)', fr: 'Méridien Cœur (main)', ru: 'Меридиан Сердца (ручной)', es: 'Meridiano Corazón (mano)', ar: 'خط القلب (يد)' }, src: '/meridians/5.png' },
  { title: { zh: '手太阳小肠经', en: 'Small Intestine Meridian (Hand)', fr: 'Méridien Intestin Grêle (main)', ru: 'Меридиан Тонкой кишки (ручной)', es: 'Meridiano Intestino Delgado (mano)', ar: 'خط الأمعاء الدقيقة (يد)' }, src: '/meridians/6.png' },
  { title: { zh: '手太阴肺经', en: 'Lung Meridian (Hand)', fr: 'Méridien Poumon (main)', ru: 'Меридиан Лёгких (ручной)', es: 'Meridiano Pulmón (mano)', ar: 'خط الرئة (يد)' }, src: '/meridians/7.png' },
  { title: { zh: '手阳明大肠经', en: 'Large Intestine Meridian (Hand)', fr: 'Méridien Gros Intestin (main)', ru: 'Меридиан Толстой кишки (ручной)', es: 'Meridiano Intestino Grueso (mano)', ar: 'خط الأمعاء الغليظة (يد)' }, src: '/meridians/8.png' },
  { title: { zh: '足厥阴肝经', en: 'Liver Meridian (Foot)', fr: 'Méridien Foie (pied)', ru: 'Меридиан Печени (ножной)', es: 'Meridiano Hígado (pie)', ar: 'خط الكبد (قدم)' }, src: '/meridians/9.png' },
  { title: { zh: '足少阴肾经', en: 'Kidney Meridian (Foot)', fr: 'Méridien Rein (pied)', ru: 'Меридиан Почек (ножной)', es: 'Meridiano Riñón (pie)', ar: 'خط الكلى (قدم)' }, src: '/meridians/10.png' },
  { title: { zh: '足少阳胆经', en: 'Gallbladder Meridian (Foot)', fr: 'Méridien Vésicule Biliaire (pied)', ru: 'Меридиан Жёлчного пузыря (ножной)', es: 'Meridiano Vesícula (pie)', ar: 'خط المرارة (قدم)' }, src: '/meridians/11.png' },
  { title: { zh: '足太阴脾经', en: 'Spleen Meridian (Foot)', fr: 'Méridien Rate (pied)', ru: 'Меридиан Селезёнки (ножной)', es: 'Meridiano Bazo (pie)', ar: 'خط الطحال (قدم)' }, src: '/meridians/12.png' },
  { title: { zh: '足阳明胃经', en: 'Stomach Meridian (Foot)', fr: 'Méridien Estomac (pied)', ru: 'Меридиан Желудка (ножной)', es: 'Meridiano Estómago (pie)', ar: 'خط المعدة (قدم)' }, src: '/meridians/13.png' },
  { title: { zh: '足太阳膀胱经', en: 'Bladder Meridian (Foot)', fr: 'Méridien Vessie (pied)', ru: 'Меридиан Мочевого пузыря (ножной)', es: 'Meridiano Vejiga (pie)', ar: 'خط المثانة (قدم)' }, src: '/meridians/14.png' }
];
