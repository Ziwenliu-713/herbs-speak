import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GradedVocabRow } from '../../data/gradedVocab';
import {
  displayWord,
  groupByLevel,
  isWordEnglish,
  parseGradedVocabCSV,
  pinyinNumberToToneMarks
} from '../../data/gradedVocab';
import type { Language } from '../../i18n/LanguageContext';
import { pickText, ui } from '../../i18n/strings';

const WORDS_PER_STAGE = 20;
const WRONG_BOOK_KEY = 'tcm-vocab-wrong-book';

export type WrongRecord = {
  id: string;
  word: string;
  pinyin: string;
  definition: string;
  wrongAnswer: string;
  questionType: string;
  level: string;
  stageIndex: number;
  createdAt: number;
};

function loadWrongBook(): WrongRecord[] {
  try {
    const raw = localStorage.getItem(WRONG_BOOK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveWrongBook(records: WrongRecord[]) {
  try {
    localStorage.setItem(WRONG_BOOK_KEY, JSON.stringify(records));
  } catch {}
}

type View = 'home' | 'stageSelect' | 'quiz' | 'result' | 'wrongBook';
type QType = 'pinyin' | 'fill' | 'match';

interface VocabChallengeProps {
  lang: Language;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 根据释义生成填空题句干（用 ____ 替换词） */
function makeFillSentence(row: GradedVocabRow): string | null {
  const def = (row.释义 || '').replace(/\s+/g, ' ').trim();
  const word = displayWord(row.词);
  if (!word || !def || def.includes('请据《现代汉语词典》')) return null;
  const idx = def.indexOf(word);
  if (idx >= 0) return def.slice(0, idx) + '____' + def.slice(idx + word.length);
  return null;
}

export function VocabChallenge({ lang }: VocabChallengeProps) {
  const [levelMap, setLevelMap] = useState<Map<string, GradedVocabRow[]>>(new Map());
  const [view, setView] = useState<View>('home');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [wrongBook, setWrongBook] = useState<WrongRecord[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [quizItems, setQuizItems] = useState<Array<{ row: GradedVocabRow; type: QType; fillSentence?: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [matchSelected, setMatchSelected] = useState<{ pinyin?: string; word?: string }>({});
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [wrongRecords, setWrongRecords] = useState<WrongRecord[]>([]);

  useEffect(() => {
    const scriptBase = new URL('..', import.meta.url).href;
    const corpusUrl = new URL('corpus/graded_vocab.csv', scriptBase).href;
    fetch(corpusUrl)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error('Failed'))))
      .then((text) => {
        const rows = parseGradedVocabCSV(text);
        setLevelMap(groupByLevel(rows));
        setLoadError(null);
      })
      .catch(() => setLoadError('corpus_unavailable'));
  }, []);

  const filteredLevelMap = useMemo(() => {
    const next = new Map<string, GradedVocabRow[]>();
    levelMap.forEach((rows, level) => {
      const filtered = rows.filter(
        (r) => !isWordEnglish(r.词) && !(level === 'Level 5' && r.词.trim() === '五十二')
      );
      if (filtered.length > 0) next.set(level, filtered);
    });
    return next;
  }, [levelMap]);

  const stagesByLevel = useMemo(() => {
    const map = new Map<string, GradedVocabRow[][]>();
    filteredLevelMap.forEach((rows, level) => {
      const stages: GradedVocabRow[][] = [];
      for (let i = 0; i < rows.length; i += WORDS_PER_STAGE) {
        stages.push(rows.slice(i, i + WORDS_PER_STAGE));
      }
      map.set(level, stages);
    });
    return map;
  }, [filteredLevelMap]);

  const startStage = useCallback(
    (level: string, stageIdx: number) => {
      const stages = stagesByLevel.get(level);
      const stage = stages?.[stageIdx];
      if (!stage || stage.length === 0) return;
      const items: Array<{ row: GradedVocabRow; type: QType; fillSentence?: string }> = [];
      const shuffled = shuffle([...stage]);
      for (let i = 0; i < shuffled.length; i++) {
        const row = shuffled[i];
        const r = Math.random();
        const fillSent = makeFillSentence(row);
        if (r < 0.35 && fillSent) {
          items.push({ row, type: 'fill' as QType, fillSentence: fillSent });
        } else if (r < 0.7) {
          items.push({ row, type: 'pinyin' });
        } else {
          items.push({ row, type: 'match' });
        }
      }
      setQuizItems(shuffle(items));
      setCurrentIndex(0);
      setUserAnswer('');
      setMatchSelected({});
      setScore({ correct: 0, total: items.length });
      setWrongRecords([]);
      setSelectedLevel(level);
      setSelectedStageIndex(stageIdx);
      setView('quiz');
    },
    [stagesByLevel]
  );

  const currentItem = quizItems[currentIndex];
  const isMatchType = currentItem?.type === 'match';

  const [matchLeft, setMatchLeft] = useState<string[]>([]);
  const [matchRight, setMatchRight] = useState<string[]>([]);

  useEffect(() => {
    if (!isMatchType || !currentItem) return;
    const row = currentItem.row;
    const word = displayWord(row.词);
    const pinyin = pinyinNumberToToneMarks(row.读音);
    const seenP = new Set<string>([pinyin]);
    const seenW = new Set<string>([word]);
    const others = quizItems
      .filter((_, i) => i !== currentIndex)
      .flatMap((it) => {
        const py = pinyinNumberToToneMarks(it.row.读音);
        const wd = displayWord(it.row.词);
        if (seenP.has(py) || seenW.has(wd)) return [];
        seenP.add(py);
        seenW.add(wd);
        return [{ pinyin: py, word: wd }];
      })
      .slice(0, 3);
    const pool = shuffle([{ pinyin, word }, ...others]);
    setMatchLeft(shuffle(pool.map((p) => p.pinyin)));
    setMatchRight(shuffle(pool.map((p) => p.word)));
    setMatchSelected({});
  }, [currentIndex, isMatchType, currentItem, quizItems]);

  const checkAnswer = useCallback(() => {
    if (!currentItem) return;
    const row = currentItem.row;
    const correctWord = displayWord(row.词).trim();
    const correctPinyin = pinyinNumberToToneMarks(row.读音).trim();
    let isCorrect = false;

    if (currentItem.type === 'pinyin') {
      isCorrect = userAnswer.trim() === correctWord;
    } else if (currentItem.type === 'fill') {
      isCorrect = userAnswer.trim() === correctWord;
    } else if (currentItem.type === 'match') {
      const selP = matchSelected.pinyin?.trim();
      const selW = matchSelected.word?.trim();
      isCorrect = selP === correctPinyin && selW === correctWord;
    }

    setScore((s) => ({ ...s, correct: s.correct + (isCorrect ? 1 : 0), total: s.total }));
    if (!isCorrect) {
      setWrongRecords((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          word: correctWord,
          pinyin: correctPinyin,
          definition: row.释义?.slice(0, 80) || '',
          wrongAnswer: currentItem.type === 'match' ? `${matchSelected.pinyin || ''} ↔ ${matchSelected.word || ''}` : userAnswer,
          questionType: currentItem.type,
          level: selectedLevel || '',
          stageIndex: selectedStageIndex,
          createdAt: Date.now()
        }
      ]);
    }

    if (currentIndex + 1 >= quizItems.length) {
      setView('result');
    } else {
      setCurrentIndex((i) => i + 1);
      setUserAnswer('');
      setMatchSelected({});
    }
  }, [currentItem, userAnswer, matchSelected, currentIndex, quizItems.length, selectedLevel, selectedStageIndex]);

  const addWrongToBook = useCallback(() => {
    const book = loadWrongBook();
    const next = [...book, ...wrongRecords];
    saveWrongBook(next);
    setWrongBook(next);
    setView('home');
  }, [wrongRecords]);

  const removeWrong = useCallback((id: string) => {
    const next = wrongBook.filter((r) => r.id !== id);
    saveWrongBook(next);
    setWrongBook(next);
  }, [wrongBook]);

  useEffect(() => {
    if (view === 'home' || view === 'wrongBook') setWrongBook(loadWrongBook());
  }, [view]);

  const levels = useMemo(() => Array.from(filteredLevelMap.keys()).sort(), [filteredLevelMap]);

  if (loadError) {
    return (
      <section className="vocabChallengeSection">
        <p className="vocabChallengeError">
          {lang === 'zh' ? '语料加载失败，无法开始闯关。' : 'Corpus could not be loaded.'}
        </p>
      </section>
    );
  }

  return (
    <section className="vocabChallengeSection" aria-labelledby="vocab-challenge-heading">
      <h2 id="vocab-challenge-heading" className="vocabChallengeTitle">
        {pickText(ui.vocabChallenge.title, lang)}
      </h2>

      {view === 'home' && (
        <div className="vocabChallengeHome">
          <p className="vocabChallengeIntro">{pickText(ui.vocabChallenge.intro, lang)}</p>
          <h3 className="vocabChallengeSub">{pickText(ui.vocabChallenge.selectLevel, lang)}</h3>
          <div className="vocabChallengeLevelGrid">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                className="vocabChallengeLevelBtn"
                onClick={() => {
                  setSelectedLevel(level);
                  setView('stageSelect');
                }}
              >
                {level}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="vocabChallengeWrongBookBtn"
            onClick={() => setView('wrongBook')}
          >
            {pickText(ui.vocabChallenge.wrongBook, lang)} ({wrongBook.length})
          </button>
        </div>
      )}

      {view === 'stageSelect' && selectedLevel && (
        <div className="vocabChallengeStageSelect">
          <button type="button" className="vocabChallengeBackBtn" onClick={() => setView('home')}>
            ← {pickText(ui.vocabChallenge.back, lang)}
          </button>
          <h3 className="vocabChallengeSub">{selectedLevel} · {pickText(ui.vocabChallenge.selectStage, lang)}</h3>
          <div className="vocabChallengeStageGrid">
            {(stagesByLevel.get(selectedLevel) || []).map((stage, i) => (
              <button
                key={i}
                type="button"
                className="vocabChallengeStageBtn"
                onClick={() => startStage(selectedLevel, i)}
              >
                {pickText(ui.vocabChallenge.stage, lang)} {i + 1}
                <span className="vocabChallengeStageCount">（{stage.length} {lang === 'zh' ? '词' : 'words'}）</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === 'quiz' && currentItem && (
        <div className="vocabChallengeQuiz">
          <div className="vocabChallengeProgress">
            <div
              className="vocabChallengeProgressBar"
              style={{ width: `${((currentIndex + 1) / quizItems.length) * 100}%` }}
            />
            <span className="vocabChallengeProgressText">
              {currentIndex + 1} / {quizItems.length}
            </span>
          </div>

          <div className="vocabChallengeQuestion">
            {currentItem.type === 'pinyin' && (
              <>
                <p className="vocabChallengePrompt">{pickText(ui.vocabChallenge.typePinyin, lang)}</p>
                <p className="vocabChallengePinyin">{pinyinNumberToToneMarks(currentItem.row.读音)}</p>
                <input
                  type="text"
                  className="vocabChallengeInput"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={lang === 'zh' ? '输入词语' : 'Enter word'}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                />
              </>
            )}
            {currentItem.type === 'fill' && currentItem.fillSentence && (
              <>
                <p className="vocabChallengePrompt">{pickText(ui.vocabChallenge.typeFill, lang)}</p>
                <p className="vocabChallengeFillSentence">{currentItem.fillSentence}</p>
                <input
                  type="text"
                  className="vocabChallengeInput"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={lang === 'zh' ? '填入词语' : 'Fill in word'}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                />
              </>
            )}
            {currentItem.type === 'match' && (
              <>
                <p className="vocabChallengePrompt">{pickText(ui.vocabChallenge.typeMatch, lang)}</p>
                <div className="vocabChallengeMatchArea">
                  <div className="vocabChallengeMatchCol">
                    {matchLeft.map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`vocabChallengeMatchItem ${matchSelected.pinyin === p ? 'selected' : ''}`}
                        onClick={() =>
                          setMatchSelected((s) => (s.pinyin === p ? { ...s, pinyin: undefined } : { ...s, pinyin: p }))
                        }
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <div className="vocabChallengeMatchCol">
                    {matchRight.map((w) => (
                      <button
                        key={w}
                        type="button"
                        className={`vocabChallengeMatchItem ${matchSelected.word === w ? 'selected' : ''}`}
                        onClick={() =>
                          setMatchSelected((s) => (s.word === w ? { ...s, word: undefined } : { ...s, word: w }))
                        }
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <button type="button" className="vocabChallengeSubmitBtn" onClick={checkAnswer}>
            {lang === 'zh' ? '确认' : 'Check'}
          </button>
        </div>
      )}

      {view === 'result' && (
        <div className="vocabChallengeResult">
          <h3 className="vocabChallengeResultTitle">{pickText(ui.vocabChallenge.resultTitle, lang)}</h3>
          <p className="vocabChallengeScore">
            {score.correct} / {score.total} {lang === 'zh' ? '正确' : 'correct'}
          </p>
          {wrongRecords.length > 0 && (
            <>
              <p className="vocabChallengeWrongCount">
                {wrongRecords.length} {lang === 'zh' ? '道错题' : 'wrong'}
              </p>
              <button type="button" className="vocabChallengeAddWrongBtn" onClick={addWrongToBook}>
                {pickText(ui.vocabChallenge.addToWrongBook, lang)}
              </button>
            </>
          )}
          <button type="button" className="vocabChallengeBackBtn" onClick={() => setView('home')}>
            {pickText(ui.vocabChallenge.backHome, lang)}
          </button>
        </div>
      )}

      {view === 'wrongBook' && (
        <div className="vocabChallengeWrongBook">
          <button type="button" className="vocabChallengeBackBtn" onClick={() => setView('home')}>
            ← {pickText(ui.vocabChallenge.back, lang)}
          </button>
          <h3 className="vocabChallengeSub">{pickText(ui.vocabChallenge.wrongBook, lang)}</h3>
          {wrongBook.length === 0 ? (
            <p className="vocabChallengeNoWrong">{pickText(ui.vocabChallenge.noWrong, lang)}</p>
          ) : (
            <ul className="vocabChallengeWrongList">
              {wrongBook.map((r) => (
                <li key={r.id} className="vocabChallengeWrongItem">
                  <div className="vocabChallengeWrongWord">{r.word}</div>
                  <div className="vocabChallengeWrongPinyin">{r.pinyin}</div>
                  <div className="vocabChallengeWrongDef">{r.definition}</div>
                  <button
                    type="button"
                    className="vocabChallengeRemoveWrongBtn"
                    onClick={() => removeWrong(r.id)}
                    aria-label={lang === 'zh' ? '移除' : 'Remove'}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
