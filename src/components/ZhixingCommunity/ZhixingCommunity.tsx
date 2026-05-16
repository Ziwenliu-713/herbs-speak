import { useCallback, useEffect, useState } from 'react';
import type { Language } from '../../i18n/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useRegisterPrompt } from '../../contexts/RegisterPromptContext';
import { pickText, ui } from '../../i18n/strings';

const STORAGE_CASES = 'zhixing-cases';
const STORAGE_CHECKINS = 'zhixing-checkins';
const STORAGE_TOPICS = 'zhixing-topics';
const STORAGE_COCREATE = 'zhixing-cocreate';

type Tab = 'cases' | 'checkin' | 'topics' | 'cocreate';

interface CasePost {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: number;
  username?: string;
}

interface TopicPost {
  id: string;
  topicId: string;
  title: string;
  content: string;
  upvotes: number;
  createdAt: number;
  commentCount?: number;
}

interface CocreateItem {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  username?: string;
}

function formatRelativeTime(ms: number, lang: Language): string {
  const diff = Date.now() - ms;
  if (diff < 60000) return '1' + pickText(ui.zhixing.minAgo, lang);
  if (diff < 3600000) return Math.floor(diff / 60000) + pickText(ui.zhixing.minAgo, lang);
  if (diff < 86400000) return Math.floor(diff / 3600000) + pickText(ui.zhixing.hourAgo, lang);
  if (diff < 2592000000) return Math.floor(diff / 86400000) + pickText(ui.zhixing.dayAgo, lang);
  return Math.floor(diff / 2592000000) + pickText(ui.zhixing.monthAgo, lang);
}

function genUsername(id: string): string {
  const n = parseInt(id.replace(/\D/g, '').slice(-6) || '0', 10) % 99999;
  return `user_${n}`;
}

function getFlair(p: CasePost | TopicPost | CocreateItem, lang: Language): string {
  if ('category' in p && p.category) return p.category;
  if ('topicId' in p && p.topicId) {
    const k = TOPIC_LABELS[p.topicId as keyof typeof TOPIC_LABELS];
    return k ? pickText(ui.zhixing[k], lang) : '';
  }
  return lang === 'zh' ? '共创' : 'Co-create';
}

const TOPIC_IDS = ['topic-season', 'topic-diet', 'topic-sleep', 'topic-mood'] as const;
const TOPIC_LABELS: Record<string, keyof typeof ui.zhixing> = {
  'topic-season': 'topicSeason',
  'topic-diet': 'topicDiet',
  'topic-sleep': 'topicSleep',
  'topic-mood': 'topicMood'
};

function loadJson<T>(key: string, def: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return def;
    return JSON.parse(raw) as T;
  } catch {
    return def;
  }
}

function saveJson(key: string, data: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

function getMonthDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const days = last.getDate();
  return { startPad, days };
}

const LEAF_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }} aria-hidden>
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66 1.41-2.5c.5.12 1 .2 1.5.2 3 0 5.5-2 6.38-4.5H17V8zm-5 0C4.5 10 2 14 2 17c0 2.76 2.24 5 5 5s5-2.24 5-5c0-3-2.5-7-5-9z" />
  </svg>
);

interface ZhixingCommunityProps {
  lang: Language;
}

export function ZhixingCommunity({ lang }: ZhixingCommunityProps) {
  const { isLoggedIn } = useAuth();
  const showRegisterPrompt = useRegisterPrompt();
  const [tab, setTab] = useState<Tab>('cases');
  const [cases, setCases] = useState<CasePost[]>([]);
  const [checkins, setCheckins] = useState<Set<string>>(new Set());
  const [topics, setTopics] = useState<TopicPost[]>([]);
  const [cocreate, setCocreate] = useState<CocreateItem[]>([]);

  const [newCaseTitle, setNewCaseTitle] = useState('');
  const [newCaseContent, setNewCaseContent] = useState('');
  const [newCaseCategory, setNewCaseCategory] = useState('');
  const [newTopicId, setNewTopicId] = useState<string>(TOPIC_IDS[0]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newCocreateTitle, setNewCocreateTitle] = useState('');
  const [newCocreateContent, setNewCocreateContent] = useState('');

  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());

  useEffect(() => {
    setCases(loadJson(STORAGE_CASES, []));
    const raw = loadJson<string[]>(STORAGE_CHECKINS, []);
    setCheckins(new Set(raw));
    setTopics(loadJson(STORAGE_TOPICS, []));
    setCocreate(loadJson(STORAGE_COCREATE, []));
  }, []);

  const persistCases = useCallback((next: CasePost[]) => {
    setCases(next);
    saveJson(STORAGE_CASES, next);
  }, []);
  const persistCheckins = useCallback((next: Set<string>) => {
    setCheckins(next);
    saveJson(STORAGE_CHECKINS, [...next]);
  }, []);
  const persistTopics = useCallback((next: TopicPost[]) => {
    setTopics(next);
    saveJson(STORAGE_TOPICS, next);
  }, []);
  const persistCocreate = useCallback((next: CocreateItem[]) => {
    setCocreate(next);
    saveJson(STORAGE_COCREATE, next);
  }, []);

  const addCase = () => {
    if (!isLoggedIn) { showRegisterPrompt(); return; }
    const t = newCaseTitle.trim();
    const c = newCaseContent.trim();
    if (!t || !c) return;
    const id = `case-${Date.now()}`;
    const post: CasePost = {
      id,
      title: t,
      content: c,
      category: newCaseCategory.trim() || (lang === 'zh' ? '其他' : 'Other'),
      createdAt: Date.now(),
      username: genUsername(id)
    };
    persistCases([post, ...cases]);
    setNewCaseTitle('');
    setNewCaseContent('');
    setNewCaseCategory('');
  };

  const todayStr = (() => {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
  })();

  const toggleCheckin = (dateStr: string) => {
    if (!isLoggedIn) { showRegisterPrompt(); return; }
    if (dateStr !== todayStr) return;
    if (checkins.has(dateStr)) return;
    persistCheckins(new Set([...checkins, dateStr]));
  };

  const addTopicPost = () => {
    if (!isLoggedIn) { showRegisterPrompt(); return; }
    const t = newTopicTitle.trim();
    const c = newTopicContent.trim();
    if (!t || !c) return;
    const id = `topic-${Date.now()}`;
    const post: TopicPost = {
      id,
      topicId: newTopicId,
      title: t,
      content: c,
      upvotes: 0,
      createdAt: Date.now(),
      commentCount: 0
    };
    persistTopics([post, ...topics]);
    setNewTopicTitle('');
    setNewTopicContent('');
  };

  const upvoteTopic = (id: string) => {
    if (!isLoggedIn) { showRegisterPrompt(); return; }
    persistTopics(
      topics.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  const addCocreate = () => {
    if (!isLoggedIn) { showRegisterPrompt(); return; }
    const t = newCocreateTitle.trim();
    const c = newCocreateContent.trim();
    if (!t || !c) return;
    const id = `cc-${Date.now()}`;
    const item: CocreateItem = {
      id,
      title: t,
      content: c,
      createdAt: Date.now(),
      username: genUsername(id)
    };
    persistCocreate([item, ...cocreate]);
    setNewCocreateTitle('');
    setNewCocreateContent('');
  };

  const { startPad, days } = getMonthDays(calYear, calMonth);
  const relatedItems = tab === 'cases' ? cases.slice(0, 5) : tab === 'topics' ? topics.slice(0, 5) : cocreate.slice(0, 5);

  const renderPostCard = (type: 'case' | 'topic' | 'cocreate', p: CasePost | TopicPost | CocreateItem) => (
    <article className="zhixingCard zhixingPostCard">
      <header className="zhixingPostHeader">
        <span className="zhixingCommunityBadge">r/{pickText(ui.zhixing.communityShort, lang)}</span>
        <span className="zhixingPostTime">{formatRelativeTime(p.createdAt, lang)}</span>
        <span className="zhixingPostUser">
          <span className="zhixingAvatar" aria-hidden />
          {(p as CasePost & CocreateItem).username || genUsername(p.id)}
        </span>
        <button type="button" className="zhixingPostMore" aria-label="more">⋯</button>
      </header>
      <h4 className="zhixingCardTitle">{p.title}</h4>
      <span className="zhixingFlair">{getFlair(p, lang)}</span>
      <p className="zhixingCardContent">{p.content}</p>
      <footer className="zhixingPostFooter">
        {type === 'topic' ? (
          <button type="button" className="zhixingUpvote" onClick={() => upvoteTopic((p as TopicPost).id)}>
            ▲ {(p as TopicPost).upvotes}
          </button>
        ) : (
          <span className="zhixingUpvote zhixingUpvoteStatic">▲ 0</span>
        )}
        <span className="zhixingActionItem">💬 0{pickText(ui.zhixing.comments, lang)}</span>
        <span className="zhixingActionItem">{pickText(ui.zhixing.share, lang)}</span>
        <span className="zhixingActionItem">{pickText(ui.zhixing.save, lang)}</span>
      </footer>
    </article>
  );

  return (
    <section className="zhixingCommunity" aria-label="知行社群">
      <div className="zhixingTopBar">
        <div className="zhixingTopBarLeft">
          <span className="zhixingCommunityIcon" aria-hidden>🌿</span>
          <span className="zhixingCommunityName">{pickText(ui.zhixing.communityName, lang)}</span>
        </div>
        <div className="zhixingSearchWrap">
          <span className="zhixingSearchIcon" aria-hidden>🔍</span>
          <input type="search" className="zhixingSearch" placeholder={pickText(ui.zhixing.searchInCommunity, lang)} aria-label="Search" />
        </div>
      </div>

      <nav className="zhixingTabs" role="tablist">
        {([
          { id: 'cases' as Tab, label: ui.zhixing.tabCases },
          { id: 'checkin' as Tab, label: ui.zhixing.tabCheckin },
          { id: 'topics' as Tab, label: ui.zhixing.tabTopics },
          { id: 'cocreate' as Tab, label: ui.zhixing.tabCocreate }
        ]).map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`zhixingTab ${tab === id ? 'zhixingTabActive' : ''}`}
            onClick={() => setTab(id)}
          >
            {pickText(label, lang)}
          </button>
        ))}
      </nav>

      <div className="zhixingLayout">
        <div className="zhixingMain">
          {tab === 'cases' && (
            <div className="zhixingPanel">
              <h3 className="zhixingPanelTitle">{pickText(ui.zhixing.casesTitle, lang)}</h3>
              <p className="zhixingPanelDesc">{pickText(ui.zhixing.casesDesc, lang)}</p>
              <div className="zhixingForm">
                <input
                  type="text"
                  className="zhixingInput"
                  placeholder={pickText(ui.zhixing.casesTitlePlaceholder, lang)}
                  value={newCaseTitle}
                  onChange={(e) => setNewCaseTitle(e.target.value)}
                />
                <input
                  type="text"
                  className="zhixingInput"
                  placeholder={pickText(ui.zhixing.casesCategoryPlaceholder, lang)}
                  value={newCaseCategory}
                  onChange={(e) => setNewCaseCategory(e.target.value)}
                />
                <textarea
                  className="zhixingTextarea"
                  placeholder={pickText(ui.zhixing.casesContentPlaceholder, lang)}
                  value={newCaseContent}
                  onChange={(e) => setNewCaseContent(e.target.value)}
                  rows={3}
                />
                <button type="button" className="zhixingSubmit" onClick={addCase}>
                  {pickText(ui.zhixing.publish, lang)}
                </button>
              </div>
              <div className="zhixingCommentPrompt">
                <span className="zhixingJoinLabel">{pickText(ui.zhixing.joinConversation, lang)}</span>
                <textarea className="zhixingCommentInput" placeholder={pickText(ui.zhixing.joinConversation, lang)} rows={2} />
              </div>
              <div className="zhixingSortBar">
                <span>{pickText(ui.zhixing.sortBy, lang)}: {pickText(ui.zhixing.sortBest, lang)} ▾</span>
              </div>
              <ul className="zhixingList">
                {cases.map((p) => (
                  <li key={p.id}>{renderPostCard('case', p)}</li>
                ))}
              </ul>
              {cases.length === 0 && (
                <p className="zhixingEmpty">{pickText(ui.zhixing.noPosts, lang)}</p>
              )}
            </div>
          )}

          {tab === 'checkin' && (
        <div className="zhixingPanel">
          <h3 className="zhixingPanelTitle">{pickText(ui.zhixing.checkinTitle, lang)}</h3>
          <p className="zhixingPanelDesc">{pickText(ui.zhixing.checkinDesc, lang)}</p>
          <div className="zhixingCalNav">
            <button
              type="button"
              onClick={() => {
                if (calMonth === 0) {
                  setCalMonth(11);
                  setCalYear((y) => y - 1);
                } else setCalMonth((m) => m - 1);
              }}
            >
              ‹
            </button>
            <span>{calYear} {lang === 'zh' ? '年' : ''} {calMonth + 1} {lang === 'zh' ? '月' : ''}</span>
            <button
              type="button"
              onClick={() => {
                if (calMonth === 11) {
                  setCalMonth(0);
                  setCalYear((y) => y + 1);
                } else setCalMonth((m) => m + 1);
              }}
            >
              ›
            </button>
          </div>
          <div className="zhixingCalWeekdays">
            {(lang === 'zh' ? '日一二三四五六' : 'SMTWTFS').split('').map((d: string, i: number) => (
              <span key={i} className="zhixingCalWeekday">{d}</span>
            ))}
          </div>
          <div className="zhixingCalGrid">
            {Array.from({ length: startPad }, (_, i) => (
              <div key={`pad-${i}`} className="zhixingCalCell" />
            ))}
            {Array.from({ length: days }, (_, i) => {
              const d = i + 1;
              const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
              const checked = checkins.has(dateStr);
              const isToday = dateStr === todayStr;
              const canCheckin = isToday && !checked;
              return (
                <button
                  key={d}
                  type="button"
                  className={`zhixingCalCell zhixingCalDay ${checked ? 'zhixingCalChecked' : ''} ${!canCheckin ? 'zhixingCalDisabled' : ''}`}
                  onClick={() => toggleCheckin(dateStr)}
                  title={dateStr}
                  disabled={!canCheckin}
                >
                  {checked ? <span className="zhixingLeaf" aria-hidden>{LEAF_SVG}</span> : d}
                </button>
              );
            })}
          </div>
        </div>
      )}

          {tab === 'topics' && (
            <div className="zhixingPanel">
              <h3 className="zhixingPanelTitle">{pickText(ui.zhixing.topicsTitle, lang)}</h3>
              <p className="zhixingPanelDesc">{pickText(ui.zhixing.topicsDesc, lang)}</p>
              <div className="zhixingTopicSelect">
                <select value={newTopicId} onChange={(e) => setNewTopicId(e.target.value)}>
                  <option value="topic-season">{pickText(ui.zhixing.topicSeason, lang)}</option>
                  <option value="topic-diet">{pickText(ui.zhixing.topicDiet, lang)}</option>
                  <option value="topic-sleep">{pickText(ui.zhixing.topicSleep, lang)}</option>
                  <option value="topic-mood">{pickText(ui.zhixing.topicMood, lang)}</option>
                </select>
              </div>
              <div className="zhixingForm">
                <input
                  type="text"
                  className="zhixingInput"
                  placeholder={pickText(ui.zhixing.topicsTitlePlaceholder, lang)}
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                />
                <textarea
                  className="zhixingTextarea"
                  placeholder={pickText(ui.zhixing.topicsContentPlaceholder, lang)}
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                  rows={3}
                />
                <button type="button" className="zhixingSubmit" onClick={addTopicPost}>
                  {pickText(ui.zhixing.publish, lang)}
                </button>
              </div>
              <div className="zhixingCommentPrompt">
                <span className="zhixingJoinLabel">{pickText(ui.zhixing.joinConversation, lang)}</span>
                <textarea className="zhixingCommentInput" placeholder={pickText(ui.zhixing.joinConversation, lang)} rows={2} />
              </div>
              <div className="zhixingSortBar">
                <span>{pickText(ui.zhixing.sortBy, lang)}: {pickText(ui.zhixing.sortBest, lang)} ▾</span>
              </div>
              <ul className="zhixingList">
                {topics.map((p) => (
                  <li key={p.id}>{renderPostCard('topic', p)}</li>
                ))}
              </ul>
              {topics.length === 0 && (
                <p className="zhixingEmpty">{pickText(ui.zhixing.noPosts, lang)}</p>
              )}
            </div>
          )}

          {tab === 'cocreate' && (
            <div className="zhixingPanel">
              <h3 className="zhixingPanelTitle">{pickText(ui.zhixing.cocreateTitle, lang)}</h3>
              <p className="zhixingPanelDesc">{pickText(ui.zhixing.cocreateDesc, lang)}</p>
              <div className="zhixingForm">
                <input
                  type="text"
                  className="zhixingInput"
                  placeholder={pickText(ui.zhixing.cocreateTitlePlaceholder, lang)}
                  value={newCocreateTitle}
                  onChange={(e) => setNewCocreateTitle(e.target.value)}
                />
                <textarea
                  className="zhixingTextarea"
                  placeholder={pickText(ui.zhixing.cocreateContentPlaceholder, lang)}
                  value={newCocreateContent}
                  onChange={(e) => setNewCocreateContent(e.target.value)}
                  rows={4}
                />
                <button type="button" className="zhixingSubmit" onClick={addCocreate}>
                  {pickText(ui.zhixing.publish, lang)}
                </button>
              </div>
              <div className="zhixingCommentPrompt">
                <span className="zhixingJoinLabel">{pickText(ui.zhixing.joinConversation, lang)}</span>
                <textarea className="zhixingCommentInput" placeholder={pickText(ui.zhixing.joinConversation, lang)} rows={2} />
              </div>
              <div className="zhixingSortBar">
                <span>{pickText(ui.zhixing.sortBy, lang)}: {pickText(ui.zhixing.sortBest, lang)} ▾</span>
              </div>
              <ul className="zhixingList">
                {cocreate.map((p) => (
                  <li key={p.id}>{renderPostCard('cocreate', p)}</li>
                ))}
              </ul>
              {cocreate.length === 0 && (
                <p className="zhixingEmpty">{pickText(ui.zhixing.noCocreate, lang)}</p>
              )}
            </div>
          )}
        </div>

        <aside className="zhixingSidebar">
          <div className="zhixingSidebarCard">
            <h4 className="zhixingSidebarTitle">{pickText(ui.zhixing.newUserTitle, lang)}</h4>
            <p className="zhixingSidebarDesc">{pickText(ui.zhixing.newUserSubtitle, lang)}</p>
            <button type="button" className="zhixingSidebarBtn">{pickText(ui.zhixing.postHere, lang)}</button>
          </div>
          <div className="zhixingSidebarCard">
            <h4 className="zhixingSidebarTitle">{pickText(ui.zhixing.relatedPosts, lang)}</h4>
            <ul className="zhixingRelatedList">
              {relatedItems.length === 0 ? (
                <li className="zhixingRelatedEmpty">{pickText(ui.zhixing.noPosts, lang)}</li>
              ) : (
                (relatedItems as Array<CasePost | TopicPost | CocreateItem>).map((item) => (
                  <li key={item.id} className="zhixingRelatedItem">
                    <span className="zhixingRelatedTime">r/{pickText(ui.zhixing.communityShort, lang)} · {formatRelativeTime(item.createdAt, lang)}</span>
                    <span className="zhixingRelatedTitle">{item.title}</span>
                    {'upvotes' in item && (
                      <span className="zhixingRelatedMeta">{(item as TopicPost).upvotes} ↑ · 0{pickText(ui.zhixing.comments, lang)}</span>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
