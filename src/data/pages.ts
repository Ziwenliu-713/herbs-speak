import { MediaItem } from '../components/Media/types';
import { TranslatedText } from '../i18n/strings';

const sampleVideo =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

export const pageMedia: Record<
  'page1' | 'page2' | 'page3' | 'page4' | 'page5',
  { title: TranslatedText; subtitle: TranslatedText; items: MediaItem[]; basicsItems?: MediaItem[] }
> = {
  page1: {
    title: {
      zh: '时养',
      en: 'Shí Yǎng',
      fr: 'Shí Yǎng',
      ru: 'Ши Ян',
      es: 'Shí Yǎng',
      ar: 'شي يانغ'
    },
    subtitle: {
      zh: '提供节气养生、生活化健康场景和中医药科普内容，\n轻松获取实用养生知识。',
      en: 'Seasonal wellness, everyday health and TCM science.\nPractical health knowledge at your fingertips.',
      fr: 'Conseils selon les saisons, vie saine et MTC.\nUne santé au quotidien, simple et pratique.',
      ru: 'Оздоровление по сезонам, здоровый быт и ТКМ.\nПолезные знания простым языком.',
      es: 'Cuidado por estaciones, vida sana y MTC.\nConocimientos prácticos a tu alcance.',
      ar: 'العناية بالموسم والحياة الصحية والطب الصيني.\nمعرفة عملية بين يديك.'
    },
    items: [
      {
        id: 'p1-img-1',
        kind: 'image',
        title: { zh: '随机图片 1', en: 'Sample image 1', fr: 'Image exemple 1', ru: 'Пример изображения 1', es: 'Imagen de ejemplo 1', ar: 'صورة عشوائية ١' },
        description: { zh: '来自 picsum 的随机图片。', en: 'Random image from Picsum.', fr: 'Image aléatoire de Picsum.', ru: 'Случайное изображение с Picsum.', es: 'Imagen aleatoria de Picsum.', ar: 'صورة عشوائية من Picsum.' },
        src: 'https://picsum.photos/seed/page1-1/1200/800'
      },
      {
        id: 'p1-vid-1',
        kind: 'video',
        title: { zh: '示例视频 1', en: 'Sample video 1', fr: 'Vidéo exemple 1', ru: 'Пример видео 1', es: 'Vídeo de ejemplo 1', ar: 'فيديو مثال ١' },
        description: { zh: '来自 MDN 的示例视频（mp4）。', en: 'Sample video from MDN (mp4).', fr: 'Vidéo exemple MDN (mp4).', ru: 'Пример видео с MDN (mp4).', es: 'Vídeo de ejemplo de MDN (mp4).', ar: 'فيديو مثال من MDN (mp4).' },
        src: sampleVideo,
        poster: 'https://picsum.photos/seed/page1-v1/1200/800'
      }
    ],
    basicsItems: [
      {
        id: 'p1-basics-2',
        kind: 'image',
        title: { zh: '经络与穴位', en: 'Meridians & points', fr: 'Méridiens et points', ru: 'Меридианы и точки', es: 'Meridianos y puntos', ar: 'خطوط الطاقة والنقاط' },
        description: {
          zh: '经穴指十四经上的腧穴。十四经指中医经络学说中的十二正经加上督脉、任脉，共十四条经络的统称。十二正经分别为：手太阴肺经、手厥阴心包经、手少阴心经、手阳明大肠经、手少阳三焦经、手太阳小肠经、足阳明胃经、足少阳胆经、足太阳膀胱经、足太阴脾经、足厥阴肝经和足少阴肾经。经穴一共有361个。经络是人体内运行气血、联络脏腑、沟通内外的通路，穴位是经络上气血输注出入的特殊部位。针灸、推拿等疗法通过刺激穴位来调节气血、治疗疾病。',
          en: 'Acupoints refer to the points on the fourteen meridians. The fourteen meridians comprise the twelve primary meridians (Lung, Pericardium, Heart, Large Intestine, Sanjiao, Small Intestine, Stomach, Gallbladder, Bladder, Spleen, Liver, Kidney) plus the Governor and Conception vessels. There are 361 such acupoints in total. Meridians are pathways that carry qi and blood, connect the organs, and link the interior with the exterior. Acupoints are specific sites where qi and blood converge. Acupuncture and massage work by stimulating these points to regulate qi and blood and treat illness.',
          fr: 'Les points des quatorze méridiens. Les quatorze méridiens regroupent les douze méridiens principaux (Poumon, Péricarde, Cœur, Gros intestin, Triple réchauffeur, Intestin grêle, Estomac, Vésicule biliaire, Vessie, Rate, Foie, Rein) plus les vaisseaux Gouverneur et Conception. Au total 361 points. Les méridiens transportent le qi et le sang, relient les organes et font le lien entre intérieur et extérieur. Les points sont les lieux où le qi et le sang convergent. L’acupuncture et le massage agissent en stimulant ces points pour réguler le qi et traiter les maladies.',
          ru: 'Точки на четырнадцати меридианах. Четырнадцать меридианов включают двенадцать основных (Лёгкие, Перикард, Сердце, Толстая кишка, Сань-цзяо, Тонкая кишка, Желудок, Жёлчный пузырь, Мочевой пузырь, Селезёнка, Печень, Почки) плюс сосуды Управления и Зачатия. Всего 361 точка. Меридианы проводят ци и кровь, связывают органы и соединяют внутреннее с внешним. Точки — это места слияния ци и крови. Иглоукалывание и массаж действуют через стимуляцию этих точек.',
          es: 'Puntos de los catorce meridianos. Los catorce meridianos comprenden los doce principales (Pulmón, Pericardio, Corazón, Intestino grueso, Sanjiao, Intestino delgado, Estómago, Vesícula, Vejiga, Bazo, Hígado, Riñón) más los vasos Gobernador y Concepción. En total 361 puntos. Los meridianos transportan qi y sangre, conectan órganos y comunican interior con exterior. Los puntos son sitios donde confluyen qi y sangre. Acupuntura y masaje actúan estimulando estos puntos.',
          ar: 'نقاط الـ 14 خط طاقة. تضم الخطوط الـ 14 الاثني عشر الأساسية (الرئة، التامور، القلب، الأمعاء الغليظة، المسخن الثلاثي، الأمعاء الدقيقة، المعدة، المرارة، المثانة، الطحال، الكبد، الكلى) plus وعاء الحاكم والحمل. 361 نقطة. تحمل الخطوط الطاقة والدم وتربط الأعضاء. النقاط هي مواقع التقاء الطاقة والدم. يعمل الوخز والتدليك بتحفيز هذه النقاط.'
        },
        src: '/meridians/1.png'
      },
      {
        id: 'p1-basics-3',
        kind: 'image',
        title: { zh: '草本与食疗', en: 'Herbs & diet therapy', fr: 'Herbes et diététique', ru: 'Травы и диетотерапия', es: 'Hierbas y dietoterapia', ar: 'الأعشاب والعلاج الغذائي' },
        src: 'https://picsum.photos/seed/tcm-basics-3/800/600'
      }
    ]
  },
  page2: {
    title: {
      zh: '字境',
      en: 'Zì Jìng',
      fr: 'Zì Jìng',
      ru: 'Цзы Цзин',
      es: 'Zì Jìng',
      ar: 'تسي جينغ'
    },
    subtitle: {
      zh: '中文输入与输出，让语言与生活同在',
      en: 'Chinese input and output — language lives with life',
      fr: 'Entrée et sortie en chinois — la langue vit avec la vie',
      ru: 'Китайский ввод и вывод — язык живёт с жизнью',
      es: 'Entrada y salida en chino — el idioma vive con la vida',
      ar: 'إدخال وإخراج الصينية — اللغة تعيش مع الحياة'
    },
    items: [
      {
        id: 'p2-img-1',
        kind: 'image',
        title: { zh: '随机图片 2A', en: 'Sample image 2A', fr: 'Image exemple 2A', ru: 'Пример изображения 2A', es: 'Imagen de ejemplo 2A', ar: 'صورة عشوائية ٢أ' },
        src: 'https://picsum.photos/seed/page2-1/1200/800'
      },
      {
        id: 'p2-img-2',
        kind: 'image',
        title: { zh: '随机图片 2B', en: 'Sample image 2B', fr: 'Image exemple 2B', ru: 'Пример изображения 2B', es: 'Imagen de ejemplo 2B', ar: 'صورة عشوائية ٢ب' },
        src: 'https://picsum.photos/seed/page2-2/1200/800'
      },
      {
        id: 'p2-vid-1',
        kind: 'video',
        title: { zh: '示例视频 2', en: 'Sample video 2', fr: 'Vidéo exemple 2', ru: 'Пример видео 2', es: 'Vídeo de ejemplo 2', ar: 'فيديو مثال ٢' },
        src: sampleVideo,
        poster: 'https://picsum.photos/seed/page2-v1/1200/800'
      }
    ]
  },
  page3: {
    title: {
      zh: '智伴',
      en: 'Zhì Bàn',
      fr: 'Zhì Bàn',
      ru: 'Чжи Бань',
      es: 'Zhì Bàn',
      ar: 'تشي بان'
    },
    subtitle: {
      zh: '支持更多卡片，响应式网格布局。',
      en: 'More cards with a responsive grid layout.',
      fr: 'Plus de cartes avec une grille responsive.',
      ru: 'Больше карточек с адаптивной сеткой.',
      es: 'Más tarjetas con una cuadrícula adaptable.',
      ar: 'مزيد من البطاقات مع شبكة متجاوبة.'
    },
    items: [
      {
        id: 'p3-img-1',
        kind: 'image',
        title: { zh: '海报 3A', en: 'Poster 3A', fr: 'Affiche 3A', ru: 'Плакат 3A', es: 'Póster 3A', ar: 'ملصق ٣أ' },
        src: 'https://picsum.photos/seed/page3-1/1200/800'
      },
      {
        id: 'p3-vid-1',
        kind: 'video',
        title: { zh: '短片 3A', en: 'Short video 3A', fr: 'Court métrage 3A', ru: 'Короткое видео 3A', es: 'Vídeo corto 3A', ar: 'فيديو قصير ٣أ' },
        src: sampleVideo,
        poster: 'https://picsum.photos/seed/page3-v1/1200/800'
      },
      {
        id: 'p3-img-2',
        kind: 'image',
        title: { zh: '海报 3B', en: 'Poster 3B', fr: 'Affiche 3B', ru: 'Плакат 3B', es: 'Póster 3B', ar: 'ملصق ٣ب' },
        src: 'https://picsum.photos/seed/page3-2/1200/800'
      },
      {
        id: 'p3-img-3',
        kind: 'image',
        title: { zh: '海报 3C', en: 'Poster 3C', fr: 'Affiche 3C', ru: 'Плакат 3C', es: 'Póster 3C', ar: 'ملصق ٣ج' },
        src: 'https://picsum.photos/seed/page3-3/1200/800'
      }
    ]
  },
  page4: {
    title: {
      zh: '知行',
      en: 'Zhī Xíng',
      fr: 'Zhī Xíng',
      ru: 'Чжи Син',
      es: 'Zhī Xíng',
      ar: 'تشي شينغ'
    },
    subtitle: {
      zh: '同一画廊组件，不同文案与数据。',
      en: 'Same gallery component, different copy and data.',
      fr: 'Même composant de galerie, textes et données différents.',
      ru: 'Тот же компонент галереи — разные тексты и данные.',
      es: 'Mismo componente de galería, texto y datos diferentes.',
      ar: 'نفس مكوّن المعرض، مع نصوص وبيانات مختلفة.'
    },
    items: [
      {
        id: 'p4-img-1',
        kind: 'image',
        title: { zh: '团队照片（示例）', en: 'Team photo (sample)', fr: 'Photo d\'équipe (exemple)', ru: 'Фото команды (пример)', es: 'Foto de equipo (ejemplo)', ar: 'صورة الفريق (مثال)' },
        description: { zh: '你可以替换成自己的图片链接或本地资源。', en: 'You can replace with your own image link or local asset.', fr: 'Vous pouvez remplacer par votre lien ou ressource locale.', ru: 'Можно заменить своей ссылкой или локальным файлом.', es: 'Puedes sustituir por tu enlace o recurso local.', ar: 'يمكنك الاستبدال برابط صورتك أو مورد محلي.' },
        src: 'https://picsum.photos/seed/page4-1/1200/800'
      },
      {
        id: 'p4-vid-1',
        kind: 'video',
        title: { zh: '介绍视频（示例）', en: 'Intro video (sample)', fr: 'Vidéo de présentation (exemple)', ru: 'Вступительное видео (пример)', es: 'Vídeo de presentación (ejemplo)', ar: 'فيديو تعريفي (مثال)' },
        src: sampleVideo,
        poster: 'https://picsum.photos/seed/page4-v1/1200/800'
      }
    ]
  },
  page5: {
    title: {
      zh: '草集',
      en: 'Cǎo Jí',
      fr: 'Cǎo Jí',
      ru: 'Цао Цзи',
      es: 'Cǎo Jí',
      ar: 'تساو جي'
    },
    subtitle: {
      zh: '中医就在你身边！',
      en: 'TCM is right by your side!',
      fr: 'La MTC est à vos côtés !',
      ru: 'ТКМ рядом с вами!',
      es: '¡La MTC está a tu lado!',
      ar: 'الطب الصيني بجانبك!'
    },
    items: [
      {
        id: 'p5-img-1',
        kind: 'image',
        title: { zh: '地图/场景图（示例）', en: 'Map / scene (sample)', fr: 'Carte / scène (exemple)', ru: 'Карта / сцена (пример)', es: 'Mapa / escena (ejemplo)', ar: 'خريطة / مشهد (مثال)' },
        src: 'https://picsum.photos/seed/page5-1/1200/800'
      },
      {
        id: 'p5-vid-1',
        kind: 'video',
        title: { zh: '宣传视频（示例）', en: 'Promo video (sample)', fr: 'Vidéo promo (exemple)', ru: 'Рекламное видео (пример)', es: 'Vídeo promocional (ejemplo)', ar: 'فيديو ترويجي (مثال)' },
        src: sampleVideo,
        poster: 'https://picsum.photos/seed/page5-v1/1200/800'
      }
    ]
  }
};

