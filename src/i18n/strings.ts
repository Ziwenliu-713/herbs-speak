import { Language } from './LanguageContext';

export type TranslatedText = {
  zh: string;
  en: string;
  fr: string;
  ru: string;
  es: string;
  ar: string;
};

export function pickText(t: TranslatedText, lang: Language) {
  return t[lang] ?? t.en;
}

export const ui = {
  brandTitle: {
    zh: '本草有言',
    en: 'Herbs Speak',
    fr: 'Les Herbes Parlent',
    ru: 'Травы говорят',
    es: 'Las hierbas hablan',
    ar: 'الأعشاب تتكلم'
  },
  brandSubtitle: {
    zh: '中医·语言·智慧生活',
    en: 'TCM · Language · Wise Living',
    fr: 'MTC · Langue · Vie sage',
    ru: 'ТКМ · Язык · Мудрая жизнь',
    es: 'MTC · Lengua · Vida sabia',
    ar: 'الطب الصيني · اللغة · حياة حكيمة'
  },
  nav: {
    page1: { zh: '时养', en: 'Shí Yǎng', fr: 'Shí Yǎng', ru: 'Ши Ян', es: 'Shí Yǎng', ar: 'شي يانغ' },
    page2: { zh: '字境', en: 'Zì Jìng', fr: 'Zì Jìng', ru: 'Цзы Цзин', es: 'Zì Jìng', ar: 'تسي جينغ' },
    page3: { zh: '智伴', en: 'Zhì Bàn', fr: 'Zhì Bàn', ru: 'Чжи Бань', es: 'Zhì Bàn', ar: 'تشي بان' },
    page4: { zh: '知行', en: 'Zhī Xíng', fr: 'Zhī Xíng', ru: 'Чжи Син', es: 'Zhī Xíng', ar: 'تشي شينغ' },
    page5: { zh: '草集', en: 'Cǎo Jí', fr: 'Cǎo Jí', ru: 'Цао Цзи', es: 'Cǎo Jí', ar: 'تساو جي' }
  },
  media: {
    image: { zh: '图片', en: 'Image', fr: 'Image', ru: 'Изображение', es: 'Imagen', ar: 'صورة' },
    video: { zh: '视频', en: 'Video', fr: 'Vidéo', ru: 'Видео', es: 'Vídeo', ar: 'فيديو' },
    openSource: {
      zh: '打开源文件',
      en: 'Open source',
      fr: 'Ouvrir la source',
      ru: 'Открыть источник',
      es: 'Abrir origen',
      ar: 'فتح المصدر'
    },
    empty: {
      zh: '没有媒体内容',
      en: 'No media items',
      fr: 'Aucun média',
      ru: 'Нет медиа',
      es: 'Sin contenido multimedia',
      ar: 'لا توجد وسائط'
    }
  },
  start: {
    titleZh: {
      zh: '本草有言',
      en: 'Herbs Speak',
      fr: 'Les Herbes Parlent',
      ru: 'Травы говорят',
      es: 'Las hierbas hablan',
      ar: 'الأعشاب تتكلم'
    },
    titleEn: {
      zh: 'HERBS SPEAK',
      en: 'HERBS SPEAK',
      fr: 'LES HERBES PARLENT',
      ru: 'ТРАВЫ ГОВОРЯТ',
      es: 'LAS HIERBAS HABLAN',
      ar: 'الأعشاب تتكلم'
    },
    subtitleZh: {
      zh: '本草有言，万物有序。\n以中医药为桥，连接健康之道与中文之美。',
      en: 'Herbs speak, and nature follows its order.\nBridging the wisdom of TCM with the beauty of Chinese.',
      fr: "Les herbes parlent, et la nature suit son ordre.\nRelier la sagesse de la MTC à la beauté du chinois.",
      ru: "Травы говорят, и природа следует своему порядку.\nСоединяя мудрость ТКМ и красоту китайского языка.",
      es: "Las hierbas hablan, y la naturaleza sigue su orden.\nUniendo la sabiduría de la MTC con la belleza del chino.",
      ar: "الأعشاب تتكلم، والطبيعة تسير وفق نظامها.\nجسرٌ يصل حكمة الطب الصيني بجمال اللغة الصينية."
    },
    subtitleEn: {
      zh: 'Herbs speak, and nature follows its order.\nBridging the wisdom of Traditional Chinese Medicine with the beauty of the Chinese language.',
      en: 'Herbs speak, and nature follows its order.\nBridging the wisdom of Traditional Chinese Medicine with the beauty of the Chinese language.',
      fr: "Les herbes parlent, et la nature suit son ordre.\nUn pont entre la sagesse de la médecine traditionnelle chinoise et la beauté de la langue chinoise.",
      ru: "Травы говорят, и природа следует своему порядку.\nМост между мудростью традиционной китайской медицины и красотой китайского языка.",
      es: "Las hierbas hablan, y la naturaleza sigue su orden.\nUn puente entre la sabiduría de la medicina tradicional china y la belleza del idioma chino.",
      ar: "الأعشاب تتكلم، والطبيعة تسير وفق نظامها.\nجسرٌ بين حكمة الطب الصيني التقليدي وجمال اللغة الصينية."
    },
    startZh: { zh: '开始', en: 'Start', fr: 'Commencer', ru: 'Начать', es: 'Comenzar', ar: 'ابدأ' },
    startEn: { zh: 'START', en: 'START', fr: 'START', ru: 'START', es: 'START', ar: 'ابدأ' },
    hintZh: {
      zh: '点击开始进入内容页',
      en: 'Click Start to enter',
      fr: 'Cliquez sur Start pour entrer',
      ru: 'Нажмите Start, чтобы войти',
      es: 'Haz clic en Start para entrar',
      ar: 'اضغط ابدأ للدخول'
    },
    hintEn: {
      zh: 'CLICK START TO ENTER',
      en: 'CLICK START TO ENTER',
      fr: 'CLIQUEZ SUR START',
      ru: 'НАЖМИТЕ START',
      es: 'HAZ CLIC EN START',
      ar: 'اضغط ابدأ'
    }
  },
  lang: {
    label: { zh: '语言', en: 'Language', fr: 'Langue', ru: 'Язык', es: 'Idioma', ar: 'اللغة' },
    zh: { zh: '中文', en: '中文', fr: '中文', ru: '中文', es: '中文', ar: '中文' },
    en: { zh: 'English', en: 'English', fr: 'English', ru: 'English', es: 'English', ar: 'English' },
    fr: { zh: 'Français', en: 'Français', fr: 'Français', ru: 'Français', es: 'Français', ar: 'Français' },
    ru: { zh: 'Русский', en: 'Русский', fr: 'Русский', ru: 'Русский', es: 'Русский', ar: 'Русский' },
    es: { zh: 'Español', en: 'Español', fr: 'Español', ru: 'Español', es: 'Español', ar: 'Español' },
    ar: { zh: 'العربية', en: 'العربية', fr: 'العربية', ru: 'العربية', es: 'العربية', ar: 'العربية' }
  },
  aboutUsSection: {
    title: { zh: '关于我们', en: 'About Us', fr: 'À propos', ru: 'О нас', es: 'Sobre nosotros', ar: 'من نحن' },
    para1: {
      zh: '这是一个融合中医药文化、健康生活与中文学习的智能平台。在这里，你可以了解日常养生知识，学习与健康相关的中文表达，获得AI个性化陪伴，并与他人分享真实体验。',
      en: 'This is an intelligent platform that blends TCM culture, healthy living, and Chinese language learning. Here you can learn everyday wellness knowledge, Chinese expressions related to health, get AI-powered personalized companionship, and share real experiences with others.',
      fr: 'Une plateforme intelligente qui mêle culture MTC, vie saine et apprentissage du chinois. Ici vous découvrez le bien-être au quotidien, les expressions chinoises liées à la santé, un accompagnement personnalisé par IA, et le partage d’expériences réelles.',
      ru: 'Умная платформа, объединяющая культуру ТКМ, здоровый образ жизни и изучение китайского. Здесь вы узнаете о повседневном оздоровлении, китайских выражениях о здоровье, получите персонализированное сопровождение ИИ и поделитесь опытом с другими.',
      es: 'Una plataforma inteligente que combina cultura MTC, vida saludable y aprendizaje del chino. Aquí puedes conocer el bienestar diario, expresiones chinas sobre salud, acompañamiento personalizado por IA y compartir experiencias reales.',
      ar: 'منصة ذكية تجمع بين ثقافة الطب الصيني التقليدي والحياة الصحية وتعلّم الصينية. يمكنك التعرّف على العافية اليومية وتعبيرات الصينية المتعلقة بالصحة، والحصول على مرافقة ذكاء اصطناعي، ومشاركة تجارب حقيقية.'
    },
    para2: {
      zh: '我们把知识、语言、技术和生活连接在一起，让健康更容易理解，让中文更自然可用，让学习真正走进日常。',
      en: 'We connect knowledge, language, technology, and life — making health easier to understand, Chinese more natural to use, and learning part of everyday.',
      fr: 'Nous relions savoir, langue, technologie et vie quotidienne — pour une santé plus compréhensible, un chinois plus naturel, et un apprentissage ancré dans le quotidien.',
      ru: 'Мы связываем знания, язык, технологии и жизнь — делая здоровье понятнее, китайский естественнее, а учёбу частью повседневности.',
      es: 'Conectamos conocimiento, idioma, tecnología y vida — haciendo la salud más comprensible, el chino más natural y el aprendizaje parte del día a día.',
      ar: 'نربط المعرفة واللغة والتقنية والحياة — لجعل الصحة أوضح، والصينية طبيعية الاستخدام، والتعلم جزءاً من الحياة اليومية.'
    },
    para3: {
      zh: '无论你是想调养身心、了解中医药文化，还是通过真实场景学习中文，这里都能为你提供支持与陪伴。',
      en: 'Whether you want to nurture body and mind, explore TCM culture, or learn Chinese through real-life contexts, we’re here to support and accompany you.',
      fr: 'Que vous souhaitiez prendre soin du corps et de l’esprit, découvrir la culture MTC ou apprendre le chinois en contexte réel, nous sommes là pour vous accompagner.',
      ru: 'Хотите ли вы укрепить тело и дух, узнать культуру ТКМ или учить китайский в реальных ситуациях — мы поддержим и陪伴им вас.',
      es: 'Si buscas cuidar cuerpo y mente, conocer la cultura MTC o aprender chino en contextos reales, estamos aquí para apoyarte y acompañarte.',
      ar: 'سواء أردت تهذيب الجسد والعقل، أو التعرف على ثقافة الطب الصيني، أو تعلّم الصينية في سياقات حقيقية — نحن هنا لدعمك ومرافقتك.'
    }
  },
  basicsSection: {
    title: {
      zh: '基础知识',
      en: 'Basics',
      fr: 'Bases',
      ru: 'Основы',
      es: 'Bases',
      ar: 'أساسيات'
    },
    tcmIntroVideos: {
      zh: '中医介绍视频',
      en: 'TCM intro videos',
      fr: 'Vidéos intro MTC',
      ru: 'Видео о ТКМ',
      es: 'Vídeos intro MTC',
      ar: 'فيديوهات الطب الصيني'
    },
    subtitle: {
      zh: '中医药基础内容',
      en: 'Basic content of TCM',
      fr: 'Contenu de base de la MTC',
      ru: 'Основы традиционной китайской медицины',
      es: 'Contenido básico de la MTC',
      ar: 'المحتوى الأساسي للطب الصيني'
    },
    jiebiao: {
      commonTitle: { zh: '常用解表药', en: 'Common exterior-releasing herbs', fr: 'Herbes courantes', ru: 'Распространённые травы', es: 'Hierbas comunes', ar: 'أعشاب شائعة' },
      xinWen: { zh: '辛温解表药', en: 'Acrid-warm', fr: 'Piquantes-chaudes', ru: 'Острые тёплые', es: 'Acridas-calientes', ar: 'حارة لاذعة' },
      xinLiang: { zh: '辛凉解表药', en: 'Acrid-cool', fr: 'Piquantes-fraîches', ru: 'Острые прохладные', es: 'Acridas-frescas', ar: 'باردة لاذعة' },
      colName: { zh: '药名', en: 'Herb', fr: 'Plante', ru: 'Трава', es: 'Hierba', ar: 'العشبة' },
      colProperty: { zh: '性能用法', en: 'Property & use', fr: 'Propriété et usage', ru: 'Свойство и применение', es: 'Propiedad y uso', ar: 'الخاصية والاستخدام' },
      colEffect: { zh: '功能主治', en: 'Effect & indication', fr: 'Effet et indication', ru: 'Эффект и показание', es: 'Efecto e indicación', ar: 'التأثير والمؤشر' },
      source: { zh: '来源：中医百科', en: 'Source: TCM Wiki', fr: 'Source : Wiki MTC', ru: 'Источник: Вики ТКМ', es: 'Fuente: Wiki MTC', ar: 'المصدر: ويكي الطب الصيني' },
      byEffect: { zh: '按功效分类', en: 'By effect', fr: 'Par effet', ru: 'По действию', es: 'Por efecto', ar: 'حسب التأثير' },
      expandCategory: { zh: '点击展开表格', en: 'Click to expand table', fr: 'Cliquer pour déplier', ru: 'Нажмите, чтобы развернуть', es: 'Clic para desplegar', ar: 'انقر لتوسيع الجدول' },
      placeholderIntro: { zh: '本类药材表格待补充，可参考中医百科：', en: 'Table for this category is pending. See TCM Wiki: ', fr: 'Tableau à compléter. Voir Wiki MTC : ', ru: 'Таблица по категории в разработке. См. Вики ТКМ: ', es: 'Tabla pendiente. Ver Wiki MTC: ', ar: 'جدول هذه الفئة قيد الإضافة. انظر ويكي الطب الصيني: ' }
    }
  },
  gradedCorpus: {
    title: { zh: '分级语料表格', en: 'Graded corpus table', fr: 'Tableau du corpus gradué', ru: 'Таблица уровней корпуса', es: 'Tabla de corpus por nivel', ar: 'جدول المدونة المصنفة' },
    intro: {
      zh: '出现最多、较简单的词汇为一级词汇，次之为二级，以此类推。下表按词频分级展示语料词汇。',
      en: 'Level 1 = most frequent and simpler; Level 2 next, and so on. The table shows corpus vocabulary by frequency grade.',
      fr: 'Niveau 1 = le plus fréquent et simple ; niveau 2 ensuite, etc. Le tableau affiche le vocabulaire du corpus par niveau.',
      ru: 'Уровень 1 = наиболее частотные и простые; уровень 2 — следующие и т.д. В таблице показана лексика корпуса по уровням.',
      es: 'Nivel 1 = más frecuente y simple; nivel 2 siguiente, etc. La tabla muestra el vocabulario del corpus por nivel.',
      ar: 'المستوى 1 = الأكثر تردداً والأبسط؛ المستوى 2 يليه، وهكذا. يعرض الجدول مفردات المدونة حسب المستوى.'
    },
    introTeaser: {
      zh: '觉得太难？团队正在更新更加基础的生活化辞书，敬请期待！不止中医方面的词汇！各类词汇即将上线...',
      en: 'Too hard? We’re working on simpler, everyday vocabularies — stay tuned! Not just TCM. More topics coming soon...',
      fr: 'Trop difficile ? Notre équipe prépare des dictionnaires plus simples et quotidiens — à suivre ! Pas seulement la MTC. D’autres thèmes bientôt...',
      ru: 'Слишком сложно? Готовим более простые, повседневные словари — следите за обновлениями! Не только ТКМ. Скоро новые темы...',
      es: '¿Muy difícil? Estamos preparando vocabularios más sencillos y cotidianos. ¡Pronto! No solo MTC. Más temas próximamente...',
      ar: 'صعب جداً؟ نعمل على قواميس أبسط وحياتية — تابعونا! ليس الطب الصيني فقط. المزيد قريباً...'
    },
    introSource: {
      zh: '我们整理了三本中医知识著作、中医科普网站与网络上的视频评论等信息，共计十万字。',
      en: 'We compiled three TCM knowledge books, TCM popular science websites, and video comments from the web, totaling about 100,000 Chinese characters.',
      fr: 'Nous avons compilé trois ouvrages de connaissances en MTC, des sites de vulgarisation en MTC et des commentaires de vidéos en ligne, soit environ 100 000 sinogrammes.',
      ru: 'Мы собрали три книги по знаниям ТКМ, сайты научно-популярной ТКМ и комментарии к видео в сети — всего около 100 000 иероглифов.',
      es: 'Hemos recopilado tres obras de conocimiento sobre MTC, sitios de divulgación de MTC y comentarios de vídeos en la red, en total unas 100 000 caracteres chinos.',
      ar: 'قمنا بجمع ثلاثة مؤلفات في معرفة الطب الصيني التقليدي ومواقع التوعية بالطب الصيني وتعليقات الفيديو على الشبكة، بإجمالي نحو مئة ألف حرف صيني.'
    },
    colWord: { zh: '词', en: 'Word', fr: 'Mot', ru: 'Слово', es: 'Palabra', ar: 'كلمة' },
    colPron: { zh: '读音', en: 'Pronunciation', fr: 'Prononciation', ru: 'Произношение', es: 'Pronunciación', ar: 'نطق' },
    colFreq: { zh: '频次', en: 'Frequency', fr: 'Fréquence', ru: 'Частота', es: 'Frecuencia', ar: 'التكرار' },
    colDef: { zh: '释义', en: 'Definition', fr: 'Définition', ru: 'Определение', es: 'Definición', ar: 'التعريف' },
    defNote: { zh: '', en: ' (Definitions in Chinese)', fr: ' (Définitions en chinois)', ru: ' (Определения на кит.)', es: ' (Definiciones en chino)', ar: ' (التعريفات بالصينية)' },
    expandAll: { zh: '展开看全部', en: 'Expand all', fr: 'Tout afficher', ru: 'Развернуть всё', es: 'Ver todo', ar: 'عرض الكل' },
    collapse: { zh: '收起', en: 'Collapse', fr: 'Réduire', ru: 'Свернуть', es: 'Colapsar', ar: 'طي' },
    defComingSoon: { zh: '释义敬请期待', en: 'Definition coming soon', fr: 'Définition à venir', ru: 'Определение ожидается', es: 'Definición próximamente', ar: 'التعريف قريباً' },
    translating: { zh: '释义翻译中…', en: 'Translating…', fr: 'Traduction…', ru: 'Перевод…', es: 'Traduciendo…', ar: 'جاري الترجمة…' }
  },
  wellnessDiary: {
    title: { zh: '我的养生日记', en: 'My wellness diary', fr: 'Mon journal bien-être', ru: 'Мой дневник здоровья', es: 'Mi diario de bienestar', ar: 'يوميات العافية' },
    intro: {
      zh: '用文字来记录你的养生日常吧！我们也欢迎您使用中文记录！让语言与健康一同慢慢滋养...',
      en: 'Record your daily wellness in words. We welcome you to write in Chinese too. Let language and health nurture you together...',
      fr: 'Notez votre bien-être au quotidien en mots. Nous vous encourageons à écrire en chinois. Que la langue et la santé vous nourrissent ensemble...',
      ru: 'Записывайте свой день здоровья словами. Мы приветствуем записи на китайском. Пусть язык и здоровье питают вас вместе...',
      es: 'Anota tu bienestar diario con palabras. Te animamos a escribir en chino. Que el idioma y la salud te nutran juntos...',
      ar: 'سجّل عافيتك اليومية بالكلمات. نرحب بتسجيلك بالصينية أيضاً. لتدع اللغة والصحة تغذيانك معاً...'
    },
    coverBtn: { zh: '记录养生日常', en: 'Record daily wellness', fr: 'Noter le bien-être au quotidien', ru: 'Записать день здоровья', es: 'Anotar el bienestar diario', ar: 'تسجيل العافية اليومية' },
    viewDiary: { zh: '查看日记', en: 'View diary', fr: 'Voir le journal', ru: 'Читать дневник', es: 'Ver diario', ar: 'عرض اليوميات' },
    save: { zh: '保存', en: 'Save', fr: 'Enregistrer', ru: 'Сохранить', es: 'Guardar', ar: 'حفظ' },
    close: { zh: '收起', en: 'Close', fr: 'Fermer', ru: 'Закрыть', es: 'Cerrar', ar: 'إغلاق' },
    addPhoto: { zh: '添加照片', en: 'Add photo', fr: 'Ajouter une photo', ru: 'Добавить фото', es: 'Añadir foto', ar: 'إضافة صورة' },
    noEntries: { zh: '暂无记录', en: 'No entries yet', fr: 'Aucune entrée', ru: 'Записей пока нет', es: 'Sin entradas aún', ar: 'لا توجد تسجيلات بعد' },
    newEntry: { zh: '写新日记', en: 'Write new entry', fr: 'Nouvelle entrée', ru: 'Новая запись', es: 'Nueva entrada', ar: 'إضافة جديدة' },
    placeholder: { zh: '记录今天的养生点滴…', en: 'Note today’s wellness…', fr: 'Notez le bien-être du jour…', ru: 'Запишите сегодняшний день…', es: 'Anota el bienestar de hoy…', ar: 'سجّل عافيتك اليوم…' },
    entryCount: { zh: '已记录 {{n}} 篇', en: '{{n}} entries', fr: '{{n}} entrées', ru: '{{n}} записей', es: '{{n}} entradas', ar: '{{n}} تسجيلات' },
    backToList: { zh: '返回列表', en: 'Back to list', fr: 'Retour à la liste', ru: 'К списку', es: 'Volver a la lista', ar: 'العودة للقائمة' },
    removePhoto: { zh: '删除照片', en: 'Remove photo', fr: 'Supprimer la photo', ru: 'Удалить фото', es: 'Quitar foto', ar: 'إزالة الصورة' }
  },
  vocabChallenge: {
    title: { zh: '词汇大闯关', en: 'Vocabulary challenge', fr: 'Défi vocabulaire', ru: 'Словарный вызов', es: 'Desafío de vocabulario', ar: 'تحدي المفردات' },
    intro: { zh: '选择词汇等级，完成拼音听写、句子填词、拼音词汇连线等关卡！', en: 'Pick a level and conquer pinyin dictation, fill-in-blank, and matching challenges!', fr: 'Choisissez un niveau et relevez dictée pinyin, textes à trous et exercices d’association !', ru: 'Выберите уровень и пройдите диктант пиньиня,填空 и сопоставление!', es: '¡Elige un nivel y supera dictado de pinyin,填空 y asociación!', ar: 'اختر المستوى وتغلّب على إملاء البينيين والتعبئة والربط!' },
    selectLevel: { zh: '选择词汇等级', en: 'Select level', fr: 'Choisir le niveau', ru: 'Выбрать уровень', es: 'Seleccionar nivel', ar: 'اختر المستوى' },
    selectStage: { zh: '选择关卡', en: 'Select stage', fr: 'Choisir l’étape', ru: 'Выбрать этап', es: 'Seleccionar etapa', ar: 'اختر المرحلة' },
    stage: { zh: '关卡', en: 'Stage', fr: 'Étape', ru: 'Этап', es: 'Etapa', ar: 'مرحلة' },
    wrongBook: { zh: '我的错题本', en: 'Wrong answers', fr: 'Erreurs', ru: 'Ошибки', es: 'Errores', ar: 'الأخطاء' },
    back: { zh: '返回', en: 'Back', fr: 'Retour', ru: 'Назад', es: 'Volver', ar: 'رجوع' },
    backHome: { zh: '返回首页', en: 'Back to home', fr: 'Retour à l’accueil', ru: 'На главную', es: 'Volver al inicio', ar: 'العودة للصفحة الرئيسية' },
    typePinyin: { zh: '根据拼音写出词语', en: 'Write the word from pinyin', fr: 'Écris le mot selon le pinyin', ru: 'Напиши слово по пиньиню', es: 'Escribe la palabra según el pinyin', ar: 'اكتب الكلمة من البينيين' },
    typeFill: { zh: '根据句子填写词语', en: 'Fill in the word', fr: 'Complète le mot', ru: 'Вставь слово', es: 'Completa la palabra', ar: 'أكمل الكلمة' },
    typeMatch: { zh: '拼音与词语连线', en: 'Match pinyin to word', fr: 'Associe pinyin et mot', ru: 'Сопоставь пиньинь и слово', es: 'Asocia pinyin y palabra', ar: 'اربط البينيين بالكلمة' },
    resultTitle: { zh: '闯关结束', en: 'Challenge complete', fr: 'Défi terminé', ru: 'Вызов завершён', es: 'Desafío completo', ar: 'التحدي مكتمل' },
    addToWrongBook: { zh: '加入错题本', en: 'Add to wrong answers', fr: 'Ajouter aux erreurs', ru: 'Добавить в ошибки', es: 'Añadir a errores', ar: 'إضافة للأخطاء' },
    noWrong: { zh: '暂无错题记录', en: 'No wrong answers yet', fr: 'Aucune erreur', ru: 'Ошибок пока нет', es: 'Sin errores aún', ar: 'لا توجد أخطاء بعد' }
  },
  zhixing: {
    tabCases: { zh: '真实案例分享', en: 'Case sharing', fr: 'Partage de cas', ru: 'Кейсы', es: 'Casos', ar: 'مشاركة الحالات' },
    tabCheckin: { zh: '养生打卡', en: 'Wellness check-in', fr: 'Pointage bien-être', ru: 'Чек-ин', es: 'Registro', ar: 'التسجيل' },
    tabTopics: { zh: '话题讨论', en: 'Discussions', fr: 'Discussions', ru: 'Обсуждения', es: 'Debates', ar: 'النقاشات' },
    tabCocreate: { zh: '用户共创', en: 'Co-create', fr: 'Co-création', ru: 'Совместное', es: 'Co-crear', ar: 'الإبداع المشترك' },
    casesTitle: { zh: '真实案例分享', en: 'Real case sharing', fr: 'Partage de cas réels', ru: 'Реальные кейсы', es: 'Casos reales', ar: 'مشاركة الحالات الحقيقية' },
    casesDesc: { zh: '分享你的治疗方案、饮食方式或养生心得', en: 'Share your treatment plans, diet, or wellness tips', fr: 'Partagez protocoles, régime ou conseils bien-être', ru: 'Делитесь планами лечения, питанием, советами', es: 'Comparte planes, dieta o consejos', ar: 'شارك بروتوكولاتك أو نظامك الغذائي' },
    casesTitlePlaceholder: { zh: '标题', en: 'Title', fr: 'Titre', ru: 'Заголовок', es: 'Título', ar: 'العنوان' },
    casesCategoryPlaceholder: { zh: '分类（如：食疗、艾灸）', en: 'Category (e.g. diet, moxa)', fr: 'Catégorie (ex. régime, moxa)', ru: 'Категория', es: 'Categoría', ar: 'التصنيف' },
    casesContentPlaceholder: { zh: '分享你的经验…', en: 'Share your experience…', fr: 'Partagez votre expérience…', ru: 'Опишите опыт…', es: 'Comparte tu experiencia…', ar: 'شارك تجربتك…' },
    checkinTitle: { zh: '养生打卡', en: 'Wellness check-in', fr: 'Pointage bien-être', ru: 'Чек-ин здоровья', es: 'Registro de bienestar', ar: 'تسجيل العافية' },
    checkinDesc: { zh: '每天打卡，点亮小叶子', en: 'Check in daily to light up a leaf', fr: 'Cochez chaque jour pour illuminer une feuille', ru: 'Отмечайтесь каждый день', es: 'Marca cada día para encender una hoja', ar: 'سجّل كل يوم لإضاءة ورقة' },
    topicsTitle: { zh: '话题讨论区', en: 'Topic discussions', fr: 'Discussions par thème', ru: 'Обсуждения по темам', es: 'Debates por tema', ar: 'النقاشات حسب الموضوع' },
    topicsDesc: { zh: '参与话题讨论，交流养生心得', en: 'Join topic discussions, share wellness tips', fr: 'Rejoignez les discussions par thème', ru: 'Участвуйте в обсуждениях', es: 'Únete a los debates', ar: 'انضم للنقاشات' },
    topicSeason: { zh: '节气养生', en: 'Seasonal wellness', fr: 'Bien-être saisonnier', ru: 'Сезонное', es: 'Estacional', ar: 'موسمي' },
    topicDiet: { zh: '食疗心得', en: 'Diet tips', fr: 'Conseils alimentaires', ru: 'Питание', es: 'Dieta', ar: 'التغذية' },
    topicSleep: { zh: '作息调节', en: 'Sleep & routine', fr: 'Sommeil et rythme', ru: 'Сон и режим', es: 'Sueño y rutina', ar: 'النوم والروتين' },
    topicMood: { zh: '情志调养', en: 'Emotional wellness', fr: 'Équilibre émotionnel', ru: 'Эмоции', es: 'Emociones', ar: 'العاطفة' },
    topicsTitlePlaceholder: { zh: '标题', en: 'Title', fr: 'Titre', ru: 'Заголовок', es: 'Título', ar: 'العنوان' },
    topicsContentPlaceholder: { zh: '发表你的看法…', en: 'Share your view…', fr: 'Partagez votre avis…', ru: 'Ваше мнение…', es: 'Tu opinión…', ar: 'رأيك…' },
    cocreateTitle: { zh: '用户共创内容', en: 'User co-created content', fr: 'Contenu co-créé', ru: 'Совместный контент', es: 'Contenido co-creado', ar: 'محتوى مشترك' },
    cocreateDesc: { zh: '一起创作中文学习口诀、养生顺口溜等', en: 'Co-create rhymes, tips, and more', fr: 'Co-créez comptines, astuces…', ru: 'Создавайте вместе рифмы и советы', es: 'Co-crea rimas, consejos…', ar: 'أبدعوا قوافي ونصائح معاً' },
    cocreateTitlePlaceholder: { zh: '标题（如：四季养生口诀）', en: 'Title (e.g. seasonal rhyme)', fr: 'Titre (ex. comptine saison)', ru: 'Заголовок', es: 'Título', ar: 'العنوان' },
    cocreateContentPlaceholder: { zh: '分享你的创作…', en: 'Share your creation…', fr: 'Partagez votre création…', ru: 'Ваше творение…', es: 'Tu creación…', ar: 'إبداعك…' },
    publish: { zh: '发布', en: 'Publish', fr: 'Publier', ru: 'Опубликовать', es: 'Publicar', ar: 'نشر' },
    noPosts: { zh: '暂无内容，快来发布第一条吧～', en: 'No posts yet. Be the first!', fr: 'Aucune publication. Soyez le premier !', ru: 'Пока нет. Будьте первым!', es: 'Sin publicaciones. ¡Sé el primero!', ar: 'لا منشورات بعد. كن الأول!' },
    noCocreate: { zh: '暂无共创内容，一起来创作吧～', en: 'No co-created content yet. Start creating!', fr: 'Aucun contenu. Créez ensemble !', ru: 'Нет контента. Начните!', es: 'Sin contenido. ¡Empieza!', ar: 'لا محتوى بعد. ابدأ!' },
    communityName: { zh: '知行社群', en: 'Zhixing Community', fr: 'Communauté Zhixing', ru: 'Сообщество Чжи Син', es: 'Comunidad Zhixing', ar: 'مجتمع تشي شينغ' },
    communityShort: { zh: '知行', en: 'Zhixing', fr: 'Zhixing', ru: 'Zhixing', es: 'Zhixing', ar: 'Zhixing' },
    joinConversation: { zh: '加入对话', en: 'Join conversation', fr: 'Rejoindre la conversation', ru: 'Присоединиться', es: 'Unirse', ar: 'انضم للنقاش' },
    sortBy: { zh: '排序方式', en: 'Sort by', fr: 'Trier par', ru: 'Сортировать', es: 'Ordenar por', ar: 'ترتيب' },
    sortBest: { zh: '最佳', en: 'Best', fr: 'Meilleurs', ru: 'Лучшие', es: 'Mejor', ar: 'الأفضل' },
    searchInCommunity: { zh: '在知行社群中搜索', en: 'Search in Zhixing', fr: 'Rechercher', ru: 'Поиск', es: 'Buscar', ar: 'بحث' },
    share: { zh: '共享', en: 'Share', fr: 'Partager', ru: 'Поделиться', es: 'Compartir', ar: 'مشاركة' },
    save: { zh: '收藏', en: 'Save', fr: 'Enregistrer', ru: 'Сохранить', es: 'Guardar', ar: 'حفظ' },
    comments: { zh: '条评论', en: ' comments', fr: ' commentaires', ru: ' комментариев', es: ' comentarios', ar: ' تعليق' },
    newUserTitle: { zh: '是知行新用户？', en: 'New to Zhixing?', fr: 'Nouveau sur Zhixing ?', ru: 'Новичок?', es: '¿Nuevo en Zhixing?', ar: 'مستخدم جديد؟' },
    newUserSubtitle: { zh: '参与分享，一起养生', en: 'Join to share and learn', fr: 'Partagez et apprenez', ru: 'Делитесь и учитесь', es: 'Comparte y aprende', ar: 'شارك وتعلّم' },
    postHere: { zh: '发布你的第一条', en: 'Post your first', fr: 'Publiez votre premier', ru: 'Опубликуйте первый', es: 'Publica tu primero', ar: 'انشر أول مشاركة' },
    relatedPosts: { zh: '相关讨论', en: 'Related', fr: 'Connexes', ru: 'Похожие', es: 'Relacionados', ar: 'مرتبط' },
    minAgo: { zh: '分钟前', en: 'm ago', fr: 'min', ru: 'мин', es: 'min', ar: 'د' },
    hourAgo: { zh: '小时前', en: 'h ago', fr: 'h', ru: 'ч', es: 'h', ar: 'س' },
    dayAgo: { zh: '天前', en: 'd ago', fr: 'j', ru: 'д', es: 'd', ar: 'ي' },
    monthAgo: { zh: '个月前', en: 'mo ago', fr: 'mois', ru: 'мес', es: 'mes', ar: 'ش' }
  },
  tcmDigitalHumans: {
    title: {
      zh: '挑选你的专属中医！为你解决生活中的养生问题！',
      en: 'Choose your TCM companion! Get answers for daily wellness.',
      fr: 'Choisissez votre praticien MTC ! Réponses à vos questions bien-être.',
      ru: 'Выберите вашего специалиста ТКМ! Ответы на вопросы о здоровье.',
      es: '¡Elige tu especialista MTC! Respuestas para tu bienestar.',
      ar: 'اختر طبيبك الصيني! أجوبة لعافيتك اليومية.'
    },
    slot1: { zh: '非遗传承人老中医', en: 'Heritage TCM Master', fr: 'Maître MTC', ru: 'Мастер ТКМ', es: 'Maestro MTC', ar: 'أستاذ الطب الصيني' },
    slot2: { zh: '年轻女中医', en: 'Young TCM Doctor', fr: 'Jeune praticienne MTC', ru: 'Молодой врач ТКМ', es: 'Joven doctora MTC', ar: 'طبيبة صينية شابة' },
    slot3: { zh: '中年中医', en: 'Mid-career TCM Doctor', fr: 'Praticien MTC', ru: 'Врач ТКМ', es: 'Médico MTC', ar: 'طبيب الطب الصيني' }
  },
  aiMascot: {
    chatTitle: { zh: '木木 · AI 对话', en: 'Mumu · AI Chat', fr: 'Mumu · Chat IA', ru: 'Муму · ИИ чат', es: 'Mumu · Chat IA', ar: 'مومو · دردشة الذكاء الاصطناعي' },
    chatPlaceholder: { zh: '在这里输入问题，木木会帮你解答～', en: 'Type your question here…', fr: 'Posez votre question ici…', ru: 'Введите вопрос здесь…', es: 'Escribe tu pregunta aquí…', ar: 'اكتب سؤالك هنا…' },
    chatInputPlaceholder: { zh: '输入问题…', en: 'Ask something…', fr: 'Poser une question…', ru: 'Задать вопрос…', es: 'Preguntar algo…', ar: 'اسأل شيئاً…' },
    close: { zh: '关闭', en: 'Close', fr: 'Fermer', ru: 'Закрыть', es: 'Cerrar', ar: 'إغلاق' },
    slogan: {
      zh: '欢迎使用AI小助手木木',
      en: 'Welcome to AI assistant Mumu',
      fr: 'Bienvenue sur l’assistant IA Mumu',
      ru: 'Добро пожаловать в ИИ-ассистента Муму',
      es: 'Bienvenido al asistente IA Mumu',
      ar: 'مرحباً بكم في المساعد الذكي مومو'
    }
  },
  caojiShop: {
    shopTitle: { zh: '文创商城', en: 'Cultural Shop', fr: 'Boutique culturelle', ru: 'Магазин', es: 'Tienda cultural', ar: 'متجر ثقافي' },
    addToCart: { zh: '加入购物车', en: 'Add to cart', fr: 'Ajouter au panier', ru: 'В корзину', es: 'Añadir', ar: 'أضف للسلة' },
    cart: { zh: '购物车', en: 'Cart', fr: 'Panier', ru: 'Корзина', es: 'Carrito', ar: 'السلة' },
    cartEmpty: { zh: '购物车是空的', en: 'Cart is empty', fr: 'Panier vide', ru: 'Корзина пуста', es: 'Carrito vacío', ar: 'السلة فارغة' },
    demoHint: { zh: '（演示：商品展示与购物车，暂不支持真实支付）', en: '(Demo: product display & cart, no real payment)', fr: '(Démo : pas de paiement réel)', ru: '(Демо: без оплаты)', es: '(Demo: sin pago real)', ar: '(عرض: بدون دفع)' },
    tabShop: { zh: '文创商城', en: 'Shop', fr: 'Boutique', ru: 'Магазин', es: 'Tienda', ar: 'متجر' },
    tabCollection: { zh: '精选集', en: 'Collection', fr: 'Collection', ru: 'Коллекция', es: 'Colección', ar: 'المجموعة' },
    tabTcmMap: { zh: '中医地图', en: 'TCM Map', fr: 'Carte MTC', ru: 'Карта ТКМ', es: 'Mapa MTC', ar: 'خريطة الطب الصيني' },
    tcmMapPlaceholder: { zh: '输入城市名称（如：纽约、巴黎、伦敦）', en: 'Enter city (e.g. New York, Paris, London)', fr: 'Ville (ex. New York, Paris)', ru: 'Город (напр. Нью-Йорк)', es: 'Ciudad (ej. Nueva York)', ar: 'المدينة' },
    tcmMapSearch: { zh: '搜索', en: 'Search', fr: 'Rechercher', ru: 'Поиск', es: 'Buscar', ar: 'بحث' },
    tcmMapDemoHint: { zh: '（演示数据：纽约、洛杉矶、巴黎、伦敦、阿姆斯特丹、墨尔本）', en: '(Demo: New York, LA, Paris, London, Amsterdam, Melbourne)', fr: '(Démo : NY, LA, Paris, Londres, Amsterdam, Melbourne)', ru: '(Демо)', es: '(Demo)', ar: '(عرض)' },
    tcmMapRating: { zh: '评分', en: 'Rating', fr: 'Note', ru: 'Рейтинг', es: 'Valoración', ar: 'التقييم' },
    tcmMapReviews: { zh: '条评价', en: ' reviews', fr: ' avis', ru: ' отзывов', es: ' valoraciones', ar: ' تقييم' }
  },
  contact: {
    title: {
      zh: '联系方式',
      en: 'Contact',
      fr: 'Contact',
      ru: 'Контакты',
      es: 'Contacto',
      ar: 'التواصل'
    },
    email: { zh: '邮箱', en: 'Email', fr: 'E-mail', ru: 'Почта', es: 'Correo', ar: 'البريد' },
    phone: { zh: '电话', en: 'Phone', fr: 'Téléphone', ru: 'Телефон', es: 'Teléfono', ar: 'الهاتف' }
  }
} as const;

