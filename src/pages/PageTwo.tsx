import { useCallback, useEffect, useMemo, useState } from 'react';
import { VocabChallenge } from '../components/VocabChallenge/VocabChallenge';
import { WellnessDiary } from '../components/WellnessDiary';
import { pageMedia } from '../data/pages';
import type { GradedVocabRow } from '../data/gradedVocab';
import { displayWord, groupByLevel, isPlaceholderDefinition, isWordEnglish, parseGradedVocabCSV, pinyinNumberToToneMarks } from '../data/gradedVocab';
import { useLanguage } from '../i18n/LanguageContext';
import { pickText, ui } from '../i18n/strings';
import { translateBatch } from '../utils/translate';
import { PageShell } from './PageShell';

const DEFAULT_ROWS_PER_LEVEL = 40;
const MAX_ROWS_PER_LEVEL = 500;
const MAX_DEFS_TO_TRANSLATE = 80;

export function PageTwo() {
  const data = pageMedia.page2;
  const { lang } = useLanguage();
  const [levelMap, setLevelMap] = useState<Map<string, GradedVocabRow[]>>(new Map());
  const [loadError, setLoadError] = useState<string | null>(null);
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set());
  const [translationMap, setTranslationMap] = useState<Map<string, string>>(new Map());
  const [translationPending, setTranslationPending] = useState(false);

  const toggleLevel = useCallback((level: string) => {
    setExpandedLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level);
      else next.add(level);
      return next;
    });
  }, []);

  useEffect(() => {
    fetch('/corpus/graded_vocab.csv')
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error('Failed to load'))))
      .then((text) => {
        const rows = parseGradedVocabCSV(text);
        setLevelMap(groupByLevel(rows));
        setLoadError(null);
      })
      .catch(() => setLoadError('corpus_unavailable'));
  }, []);

  const visibleDefs = useMemo(() => {
    const defs: string[] = [];
    levelMap.forEach((rows, level) => {
      const expanded = expandedLevels.has(level);
      const n = expanded ? MAX_ROWS_PER_LEVEL : DEFAULT_ROWS_PER_LEVEL;
      rows
        .filter((r) => !isWordEnglish(r.词) && !(level === 'Level 5' && r.词.trim() === '五十二'))
        .slice(0, n)
        .forEach((r) => {
          if (r.释义 && !isPlaceholderDefinition(r.释义)) defs.push(r.释义);
        });
    });
    return [...new Set(defs)].slice(0, MAX_DEFS_TO_TRANSLATE);
  }, [levelMap, expandedLevels]);

  useEffect(() => {
    if (lang === 'zh' || visibleDefs.length === 0) return;
    setTranslationPending(true);
    translateBatch(visibleDefs, lang, () => {})
      .then((result) => {
        setTranslationMap((prev) => {
          const next = new Map(prev);
          result.forEach((trans, text) => next.set(`${lang}:${text.trim()}`, trans));
          return next;
        });
      })
      .finally(() => setTranslationPending(false));
  }, [lang, visibleDefs.join('|')]);

  const defComingSoonText = pickText(ui.gradedCorpus.defComingSoon, lang);
  const getDisplayDef = useCallback(
    (释义: string) => {
      if (!释义 || !释义.trim()) return defComingSoonText;
      const replaced = 释义.replace(/（请据《现代汉语词典》等辞书补充）/g, defComingSoonText).trim();
      if (!replaced || isPlaceholderDefinition(replaced)) return defComingSoonText;
      const defToShow = replaced === 释义 ? 释义 : replaced;
      if (lang === 'zh') return defToShow;
      const key = `${lang}:${释义.trim()}`;
      const translated = translationMap.get(key);
      if (translated) return translated.replace(/（请据《现代汉语词典》等辞书补充）/g, defComingSoonText);
      return defToShow;
    },
    [lang, translationMap, defComingSoonText]
  );

  return (
    <PageShell title={pickText(data.title, lang)} subtitle={pickText(data.subtitle, lang)}>
      <section className="gradedCorpusSection" aria-labelledby="graded-corpus-heading">
        <h2 id="graded-corpus-heading" className="gradedCorpusTitle">
          {pickText(ui.gradedCorpus.title, lang)}
        </h2>
        <p className="gradedCorpusIntro gradedCorpusIntroSource">
          {pickText(ui.gradedCorpus.introSource, lang)}
        </p>
        <p className="gradedCorpusIntro">
          {pickText(ui.gradedCorpus.intro, lang)}
          {lang !== 'zh' && pickText(ui.gradedCorpus.defNote, lang)}
          {translationPending && lang !== 'zh' && (
            <span className="gradedCorpusTranslating"> · {pickText(ui.gradedCorpus.translating, lang)}</span>
          )}
        </p>
        <p className="gradedCorpusIntro gradedCorpusIntroSource">
          {pickText(ui.gradedCorpus.introTeaser, lang)}
        </p>

        {loadError && (
          <p className="gradedCorpusError">
            {lang === 'zh' ? '语料文件加载失败，请确保 public/corpus/graded_vocab.csv 存在。' : 'Corpus file could not be loaded.'}
          </p>
        )}

        {!loadError && levelMap.size > 0 && (
          <div className="gradedCorpusLevels">
            {Array.from(levelMap.entries()).map(([level, rows]) => {
              const filteredRows = rows.filter(
                (row) => !isWordEnglish(row.词) && !(level === 'Level 5' && row.词.trim() === '五十二')
              );
              const expanded = expandedLevels.has(level);
              const visibleRows = expanded ? filteredRows.slice(0, MAX_ROWS_PER_LEVEL) : filteredRows.slice(0, DEFAULT_ROWS_PER_LEVEL);
              const hasMore = filteredRows.length > DEFAULT_ROWS_PER_LEVEL;
              const totalShown = expanded ? Math.min(filteredRows.length, MAX_ROWS_PER_LEVEL) : visibleRows.length;
              return (
                <div key={level} className="gradedCorpusBlock">
                  <h3 className="gradedCorpusLevelTitle">{level}</h3>
                  <div className="gradedCorpusTableWrap">
                    <table className="gradedCorpusTable">
                      <thead>
                        <tr>
                          <th>{pickText(ui.gradedCorpus.colWord, lang)}</th>
                          <th>{pickText(ui.gradedCorpus.colPron, lang)}</th>
                          <th>{pickText(ui.gradedCorpus.colFreq, lang)}</th>
                          <th>{pickText(ui.gradedCorpus.colDef, lang)}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleRows.map((row, i) => (
                          <tr key={`${level}-${i}`}>
                            <td className="gradedCorpusWord">{displayWord(row.词)}</td>
                            <td className="gradedCorpusPron">{pinyinNumberToToneMarks(row.读音)}</td>
                            <td className="gradedCorpusFreq">{row.频次}</td>
                            <td className="gradedCorpusDef">{getDisplayDef(row.释义)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {hasMore && (
                    <div className="gradedCorpusActions">
                      <button
                        type="button"
                        className="gradedCorpusExpandBtn"
                        onClick={() => toggleLevel(level)}
                        aria-expanded={expanded}
                      >
                        {expanded
                          ? pickText(ui.gradedCorpus.collapse, lang)
                          : pickText(ui.gradedCorpus.expandAll, lang)}
                      </button>
                      <span className="gradedCorpusCount">
                        {lang === 'zh' ? `当前显示 ${totalShown} / ${filteredRows.length} 条` : `${totalShown} / ${filteredRows.length}`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <VocabChallenge lang={lang} />

      <WellnessDiary lang={lang} />
    </PageShell>
  );
}

