export type BeastId = 'dragon' | 'phoenix' | 'qilin' | 'pixiu' | 'baize' | 'fox';

export type BeastProfile = {
  id: BeastId;
  nameZh: string;
  nameEn: string;
  keywordsZh: string;
  keywordsEn: string;
  explanationZh: string;
  explanationEn: string;
  sentenceZh: string;
  sentenceEn: string;
  glyph: string;
  color: string;
  traitLabelZh: string;
  traitLabelEn: string;
};

export const BEASTS: Record<BeastId, BeastProfile> = {
  dragon: {
    id: 'dragon',
    nameZh: '龙',
    nameEn: 'Dragon',
    keywordsZh: '力量 / 活力 / 好运',
    keywordsEn: 'Strength / Vitality / Good Fortune',
    explanationZh:
      '龙是中国文化中非常重要的神兽形象，常与力量、生命力、尊贵和吉祥联系在一起。',
    explanationEn:
      'The dragon is one of the most important mythical creatures in Chinese culture, often linked with strength, vitality, nobility, and good fortune.',
    sentenceZh: '我的神兽是龙。',
    sentenceEn: 'My mythical guardian is the Dragon.',
    glyph: '龙',
    color: '#2d6a4f',
    traitLabelZh: '果敢进取',
    traitLabelEn: 'Bold & Driven'
  },
  phoenix: {
    id: 'phoenix',
    nameZh: '凤凰',
    nameEn: 'Phoenix',
    keywordsZh: '美好 / 新生 / 希望',
    keywordsEn: 'Beauty / Renewal / Hope',
    explanationZh:
      '凤凰常象征美好、重生与和谐，在中国传统文化中具有高贵而吉祥的意义。',
    explanationEn:
      'The phoenix symbolizes beauty, rebirth, and harmony, and carries an auspicious, noble meaning in Chinese tradition.',
    sentenceZh: '我的神兽是凤凰。',
    sentenceEn: 'My mythical guardian is the Phoenix.',
    glyph: '凤',
    color: '#c9184a',
    traitLabelZh: '温暖希望',
    traitLabelEn: 'Warm & Hopeful'
  },
  qilin: {
    id: 'qilin',
    nameZh: '麒麟',
    nameEn: 'Qilin',
    keywordsZh: '平和 / 仁善 / 祥瑞',
    keywordsEn: 'Peace / Kindness / Auspiciousness',
    explanationZh: '麒麟常被视为祥瑞之兽，象征和平、仁爱与美好的祝愿。',
    explanationEn:
      'The qilin is seen as an auspicious creature symbolizing peace, benevolence, and heartfelt blessings.',
    sentenceZh: '我的神兽是麒麟。',
    sentenceEn: 'My mythical guardian is the Qilin.',
    glyph: '麟',
    color: '#5c4d7d',
    traitLabelZh: '温润守和',
    traitLabelEn: 'Gentle & Steady'
  },
  pixiu: {
    id: 'pixiu',
    nameZh: '貔貅',
    nameEn: 'Pixiu',
    keywordsZh: '好运 / 守护 / 富足',
    keywordsEn: 'Luck / Protection / Abundance',
    explanationZh:
      '貔貅是民间文化中常见的瑞兽形象，常与好运、守护和富足联系在一起。',
    explanationEn:
      'Pixiu is a popular auspicious figure in folk culture, often associated with luck, protection, and abundance.',
    sentenceZh: '我的神兽是貔貅。',
    sentenceEn: 'My mythical guardian is the Pixiu.',
    glyph: '貔',
    color: '#b08968',
    traitLabelZh: '机敏聚财',
    traitLabelEn: 'Lucky & Resourceful'
  },
  baize: {
    id: 'baize',
    nameZh: '白泽',
    nameEn: 'Bai Ze',
    keywordsZh: '智慧 / 知识 / 洞察',
    keywordsEn: 'Wisdom / Knowledge / Insight',
    explanationZh:
      '白泽是中国神话传说中通晓万物的神兽，象征智慧、知识和洞察力。',
    explanationEn:
      'Bai Ze is said to understand all things in Chinese mythology, symbolizing wisdom, knowledge, and insight.',
    sentenceZh: '我的神兽是白泽。',
    sentenceEn: 'My mythical guardian is Bai Ze.',
    glyph: '泽',
    color: '#4a6fa5',
    traitLabelZh: '睿智洞察',
    traitLabelEn: 'Wise & Perceptive'
  },
  fox: {
    id: 'fox',
    nameZh: '九尾狐',
    nameEn: 'Nine-tailed Fox',
    keywordsZh: '灵动 / 神秘 / 变化',
    keywordsEn: 'Agility / Mystery / Transformation',
    explanationZh:
      '九尾狐是中国神话中富有想象力的形象，常带有灵动、神秘和变化的色彩。',
    explanationEn:
      'The nine-tailed fox is an imaginative figure in Chinese mythology, often associated with agility, mystery, and change.',
    sentenceZh: '我的神兽是九尾狐。',
    sentenceEn: 'My mythical guardian is the Nine-tailed Fox.',
    glyph: '狐',
    color: '#9d4edd',
    traitLabelZh: '灵动奇想',
    traitLabelEn: 'Agile & Imaginative'
  }
};

export const BEAST_ORDER: BeastId[] = ['dragon', 'phoenix', 'qilin', 'pixiu', 'baize', 'fox'];

/** 选项对各神兽的倾向权重（可分散，避免一题对应一兽） */
export type OptionWeights = Partial<Record<BeastId, number>>;

type QuizOptionDef = {
  id: string;
  zh: string;
  en: string;
  weights: OptionWeights;
};

type QuizQuestionDef = {
  id: number;
  zh: string;
  en: string;
  options: QuizOptionDef[];
};

export type DisplayOption = {
  id: string;
  displayIndex: number;
  zh: string;
  en: string;
  weights: OptionWeights;
};

export type DisplayQuestion = {
  questionId: number;
  zh: string;
  en: string;
  options: DisplayOption[];
};

export type QuizSession = {
  questions: DisplayQuestion[];
};

export type GuardianResult = {
  primary: BeastId;
  secondary: BeastId | null;
  scores: Record<BeastId, number>;
  percentages: Record<BeastId, number>;
  summaryZh: string;
  summaryEn: string;
  blendZh: string;
  blendEn: string;
};

/** 题库：选项与神兽的对应故意打散，部分选项含复合倾向 */
const QUESTION_BANK: QuizQuestionDef[] = [
  {
    id: 1,
    zh: '在朋友眼里，你更像哪种人？',
    en: 'How do your friends usually see you?',
    options: [
      { id: 'q1a', zh: '一出现就很有存在感', en: 'You stand out as soon as you arrive', weights: { dragon: 1.2 } },
      { id: 'q1b', zh: '能让大家心情变好', en: 'You lift everyone’s mood', weights: { phoenix: 1.2 } },
      { id: 'q1c', zh: '温柔、让人安心', en: 'Gentle and reassuring', weights: { qilin: 1.2 } },
      { id: 'q1d', zh: '机灵、会抓住机会', en: 'Quick to spot a good chance', weights: { pixiu: 1, fox: 0.3 } },
      { id: 'q1e', zh: '观察细致、想得深', en: 'Observant and thoughtful', weights: { baize: 1.2 } },
      { id: 'q1f', zh: '有点神秘、想法很多', en: 'A bit mysterious, full of ideas', weights: { fox: 1.2 } }
    ]
  },
  {
    id: 2,
    zh: '如果遇到困难，你通常会……',
    en: 'When you face a challenge, you usually…',
    options: [
      { id: 'q2a', zh: '先稳住局面再说', en: 'Steady the situation first', weights: { qilin: 1, baize: 0.4 } },
      { id: 'q2b', zh: '直接正面解决', en: 'Tackle it head-on', weights: { dragon: 1.2 } },
      { id: 'q2c', zh: '换个思路绕过去', en: 'Find an unusual way around it', weights: { fox: 1, pixiu: 0.4 } },
      { id: 'q2d', zh: '相信会迎来转机', en: 'Trust things will turn around', weights: { phoenix: 1.2 } },
      { id: 'q2e', zh: '把坏事变成机会', en: 'Turn setbacks into chances', weights: { pixiu: 1.2 } },
      { id: 'q2f', zh: '先弄清来龙去脉', en: 'Figure out causes and patterns', weights: { baize: 1.2 } }
    ]
  },
  {
    id: 3,
    zh: '你更喜欢哪种生活状态？',
    en: 'Which lifestyle do you prefer?',
    options: [
      { id: 'q3a', zh: '热闹、有挑战、变化多', en: 'Lively, challenging, ever-changing', weights: { dragon: 1, fox: 0.3 } },
      { id: 'q3b', zh: '有仪式感、充满希望', en: 'Ritual-filled and hopeful', weights: { phoenix: 1.2 } },
      { id: 'q3c', zh: '平静、舒服、慢慢来', en: 'Calm, cozy, unhurried', weights: { qilin: 1.2 } },
      { id: 'q3d', zh: '丰盛有趣、常有惊喜', en: 'Rich, fun, full of surprises', weights: { pixiu: 1.2 } },
      { id: 'q3e', zh: '不断学习、探索世界', en: 'Always learning and exploring', weights: { baize: 1, dragon: 0.3 } },
      { id: 'q3f', zh: '自由随性、不被定义', en: 'Free-spirited and hard to label', weights: { fox: 1.2 } }
    ]
  },
  {
    id: 4,
    zh: '如果你是一部电影里的角色，你会是……',
    en: 'In a movie, you would be…',
    options: [
      { id: 'q4a', zh: '带领大家冒险的主角', en: 'The leader on a bold adventure', weights: { dragon: 1.2 } },
      { id: 'q4b', zh: '低谷后重新站起来的人', en: 'Someone who rises again', weights: { phoenix: 1.2 } },
      { id: 'q4c', zh: '默默守护大家的人', en: 'The quiet guardian', weights: { qilin: 1.2 } },
      { id: 'q4d', zh: '关键时刻翻盘的人', en: 'The one who turns the tide', weights: { pixiu: 1, dragon: 0.3 } },
      { id: 'q4e', zh: '知道隐藏秘密的人', en: 'The one who knows hidden secrets', weights: { baize: 1, fox: 0.4 } },
      { id: 'q4f', zh: '行踪神秘、魅力十足', en: 'Mysterious yet captivating', weights: { fox: 1.2 } }
    ]
  },
  {
    id: 5,
    zh: '哪一句话最像你？',
    en: 'Which line sounds most like you?',
    options: [
      { id: 'q5a', zh: '「人生要大胆一点！」', en: '“Life is for being bold!”', weights: { dragon: 1.2 } },
      { id: 'q5b', zh: '「总会有新的开始。」', en: '“There is always a new beginning.”', weights: { phoenix: 1.2 } },
      { id: 'q5c', zh: '「舒服和平静很重要。」', en: '“Comfort and peace matter.”', weights: { qilin: 1.2 } },
      { id: 'q5d', zh: '「好运也是实力。」', en: '“Luck is a kind of skill.”', weights: { pixiu: 1.2 } },
      { id: 'q5e', zh: '「我想懂背后的原因。」', en: '“I want to know why.”', weights: { baize: 1.2 } },
      { id: 'q5f', zh: '「世界该有点奇幻。」', en: '“The world should feel magical.”', weights: { fox: 1.2 } }
    ]
  },
  {
    id: 6,
    zh: '如果你的旅伴今天心情不好，你会……',
    en: 'If your travel companion feels down, you would…',
    options: [
      { id: 'q6a', zh: '带 TA 出去转转、换心情', en: 'Take them out to shift the mood', weights: { dragon: 0.8, phoenix: 0.5 } },
      { id: 'q6b', zh: '陪 TA 看日落、慢慢聊', en: 'Watch the sunset and talk gently', weights: { phoenix: 1, qilin: 0.4 } },
      { id: 'q6c', zh: '泡杯热茶，给安静空间', en: 'Offer tea and quiet space', weights: { qilin: 1.2 } },
      { id: 'q6d', zh: '买点好吃的和小礼物', en: 'Buy treats and little gifts', weights: { pixiu: 1.2 } },
      { id: 'q6e', zh: '认真问清发生了什么', en: 'Ask carefully what happened', weights: { baize: 1.2 } },
      { id: 'q6f', zh: '半夜带 TA 去看月亮', en: 'Sneak out at midnight to see the moon', weights: { fox: 1.2 } }
    ]
  },
  {
    id: 7,
    zh: '来到中国，你最想先体验什么？',
    en: 'In China, what would you try first?',
    options: [
      { id: 'q7a', zh: '登高远眺、感受山河', en: 'Climb high and take in the landscape', weights: { dragon: 1 } },
      { id: 'q7b', zh: '逛古城、听历史故事', en: 'Wander old towns and hear stories', weights: { baize: 1, qilin: 0.3 } },
      { id: 'q7c', zh: '在园林里喝茶发呆', en: 'Tea and quiet time in a garden', weights: { qilin: 1.2 } },
      { id: 'q7d', zh: '夜市小吃和热闹店铺', en: 'Night markets and lively shops', weights: { pixiu: 1.2 } },
      { id: 'q7e', zh: '节庆灯火与漂亮风景', en: 'Festive lights and beautiful views', weights: { phoenix: 1.2 } },
      { id: 'q7f', zh: '随便走走，遇到惊喜', en: 'Wander freely and welcome surprises', weights: { fox: 1, pixiu: 0.3 } }
    ]
  },
  {
    id: 8,
    zh: '你理想中的周末更像……',
    en: 'Your ideal weekend feels like…',
    options: [
      { id: 'q8a', zh: '运动或挑战一件新鲜事', en: 'Sports or a new challenge', weights: { dragon: 1.2 } },
      { id: 'q8b', zh: '整理房间、迎接新开始', en: 'Tidying up for a fresh start', weights: { phoenix: 1 } },
      { id: 'q8c', zh: '在家休息、陪陪家人', en: 'Resting at home with loved ones', weights: { qilin: 1.2 } },
      { id: 'q8d', zh: '逛市集、淘喜欢的小物', en: 'Browsing markets for little finds', weights: { pixiu: 1.2 } },
      { id: 'q8e', zh: '看书、逛博物馆', en: 'Reading or visiting a museum', weights: { baize: 1.2 } },
      { id: 'q8f', zh: '没有计划，想到哪到哪', en: 'No plan — just follow the moment', weights: { fox: 1.2 } }
    ]
  },
  {
    id: 9,
    zh: '在团队合作中，你更常扮演……',
    en: 'In a team, you often act as…',
    options: [
      { id: 'q9a', zh: '拍板推进的人', en: 'The one who pushes decisions forward', weights: { dragon: 1.2 } },
      { id: 'q9b', zh: '鼓舞士气的人', en: 'The morale booster', weights: { phoenix: 1 } },
      { id: 'q9c', zh: '协调气氛的人', en: 'The peacemaker', weights: { qilin: 1.2 } },
      { id: 'q9d', zh: '找资源、想办法的人', en: 'The resource finder', weights: { pixiu: 1.2 } },
      { id: 'q9e', zh: '出主意、做分析的人', en: 'The strategist', weights: { baize: 1.2 } },
      { id: 'q9f', zh: '提出怪点子的人', en: 'The creative wild card', weights: { fox: 1.2 } }
    ]
  },
  {
    id: 10,
    zh: '你觉得自己最突出的优点是……',
    en: 'Your strongest quality is…',
    options: [
      { id: 'q10a', zh: '行动力强', en: 'Strong drive to act', weights: { dragon: 1.2 } },
      { id: 'q10b', zh: '乐观坚韧', en: 'Optimistic and resilient', weights: { phoenix: 1.2 } },
      { id: 'q10c', zh: '体贴稳重', en: 'Considerate and steady', weights: { qilin: 1.2 } },
      { id: 'q10d', zh: '灵活务实', en: 'Flexible and practical', weights: { pixiu: 1, fox: 0.3 } },
      { id: 'q10e', zh: '善于思考', en: 'Good at thinking things through', weights: { baize: 1.2 } },
      { id: 'q10f', zh: '富有想象力', en: 'Rich imagination', weights: { fox: 1.2 } }
    ]
  }
];

const QUESTIONS_PER_SESSION = 8;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createQuizSession(): QuizSession {
  const picked = shuffle(QUESTION_BANK).slice(0, QUESTIONS_PER_SESSION);

  const questions: DisplayQuestion[] = picked.map((q) => {
    const shuffledOpts = shuffle(q.options);
    return {
      questionId: q.id,
      zh: q.zh,
      en: q.en,
      options: shuffledOpts.map((opt, idx) => ({
        id: opt.id,
        displayIndex: idx + 1,
        zh: opt.zh,
        en: opt.en,
        weights: opt.weights
      }))
    };
  });

  return { questions };
}

function emptyScores(): Record<BeastId, number> {
  return { dragon: 0, phoenix: 0, qilin: 0, pixiu: 0, baize: 0, fox: 0 };
}

function pickTopTwo(scores: Record<BeastId, number>): [BeastId, BeastId | null] {
  const sorted = BEAST_ORDER.map((id) => ({ id, score: scores[id] })).sort((a, b) => b.score - a.score);
  const primary = sorted[0]?.id ?? 'dragon';
  const second = sorted[1];
  if (!second || second.score <= 0) return [primary, null];
  const ratio = second.score / (sorted[0].score || 1);
  if (ratio >= 0.55 || second.score >= sorted[0].score - 0.8) {
    return [primary, second.id];
  }
  return [primary, null];
}

const BLEND_TEMPLATES: Partial<Record<`${BeastId}-${BeastId}`, { zh: string; en: string }>> = {
  'dragon-phoenix': {
    zh: '你既有龙一般的魄力，也带着凤凰向上的光彩，适合在挑战中保持希望。',
    en: 'You combine the dragon’s drive with the phoenix’s hope—bold in action, bright in spirit.'
  },
  'dragon-qilin': {
    zh: '你的力量里带着温度，既能挺身而出，也懂得照顾身边人的感受。',
    en: 'Your strength is tempered by gentleness—you act boldly yet care for others.'
  },
  'dragon-baize': {
    zh: '你敢于行动，也善于思考，是「想得清楚、做得干脆」的类型。',
    en: 'You act decisively and think clearly—a doer with a strategist’s mind.'
  },
  'phoenix-qilin': {
    zh: '你温柔而坚韧，像春风一样让人安心，也能在低谷后重新振作。',
    en: 'You are gentle yet resilient—comforting like a breeze, renewing like spring.'
  },
  'pixiu-fox': {
    zh: '你机敏而富有趣味，既会把握机会，也乐于用创意打破常规。',
    en: 'You are quick-witted and playful—seizing chances with creative flair.'
  },
  'baize-fox': {
    zh: '你的内心世界很丰富：既爱探究真相，也保留一份天马行空的想象。',
    en: 'Your inner world is rich—curious about truth, yet open to wonder.'
  }
};

function buildBlend(primary: BeastId, secondary: BeastId | null): { zh: string; en: string } {
  if (!secondary) {
    const p = BEASTS[primary];
    return {
      zh: `你的气质与${p.nameZh}最为契合，核心特质是「${p.traitLabelZh}」。`,
      en: `You align most with the ${p.nameEn}; your core trait is “${p.traitLabelEn}.”`
    };
  }
  const key1 = `${primary}-${secondary}` as `${BeastId}-${BeastId}`;
  const key2 = `${secondary}-${primary}` as `${BeastId}-${BeastId}`;
  const tpl = BLEND_TEMPLATES[key1] ?? BLEND_TEMPLATES[key2];
  if (tpl) return tpl;
  const a = BEASTS[primary];
  const b = BEASTS[secondary];
  return {
    zh: `你的主守护是${a.nameZh}，同时带有${b.nameZh}的${b.traitLabelZh}气质，形成独特的组合。`,
    en: `Your primary guardian is the ${a.nameEn}, with a strong touch of ${b.nameEn} (“${b.traitLabelEn}”).`
  };
}

function buildSummary(
  primary: BeastId,
  secondary: BeastId | null,
  percentages: Record<BeastId, number>
): { zh: string; en: string } {
  const p = BEASTS[primary];
  const topPct = Math.round(percentages[primary]);
  const sideTraits = BEAST_ORDER.filter((id) => percentages[id] >= 12 && id !== primary)
    .sort((a, b) => percentages[b] - percentages[a])
    .slice(0, 2);

  const zhExtra = sideTraits.length
    ? ` 除主倾向外，你还显现出${sideTraits.map((id) => BEASTS[id].traitLabelZh).join('、')}等侧面。`
    : '';

  const enExtra = sideTraits.length
    ? ` You also show hints of ${sideTraits.map((id) => BEASTS[id].traitLabelEn).join(' and ')}.`
    : '';

  const secLine =
    secondary && secondary !== primary
      ? ` 次要共鸣为${BEASTS[secondary].nameZh}（${BEASTS[secondary].traitLabelZh}）。`
      : '';

  const secLineEn =
    secondary && secondary !== primary
      ? ` A secondary resonance with the ${BEASTS[secondary].nameEn} (${BEASTS[secondary].traitLabelEn}).`
      : '';

  return {
    zh: `综合 ${QUESTIONS_PER_SESSION} 道题的回答，你与${p.nameZh}的契合度约为 ${topPct}%。${secLine}${zhExtra}`,
    en: `Across ${QUESTIONS_PER_SESSION} questions, you match the ${p.nameEn} at about ${topPct}%.${secLineEn}${enExtra}`
  };
}

export function computeGuardianResult(
  session: QuizSession,
  selectedOptionIds: string[]
): GuardianResult {
  const scores = emptyScores();

  session.questions.forEach((q, qi) => {
    const optId = selectedOptionIds[qi];
    const opt = q.options.find((o) => o.id === optId);
    if (!opt) return;
    for (const id of BEAST_ORDER) {
      const w = opt.weights[id];
      if (w) scores[id] += w;
    }
  });

  const total = BEAST_ORDER.reduce((s, id) => s + scores[id], 0) || 1;
  const percentages = BEAST_ORDER.reduce(
    (acc, id) => {
      acc[id] = Math.round((scores[id] / total) * 100);
      return acc;
    },
    {} as Record<BeastId, number>
  );

  const [primary, secondary] = pickTopTwo(scores);
  const blend = buildBlend(primary, secondary);
  const summary = buildSummary(primary, secondary, percentages);

  return {
    primary,
    secondary,
    scores,
    percentages,
    summaryZh: summary.zh,
    summaryEn: summary.en,
    blendZh: blend.zh,
    blendEn: blend.en
  };
}

export const QUIZ_LENGTH = QUESTIONS_PER_SESSION;
