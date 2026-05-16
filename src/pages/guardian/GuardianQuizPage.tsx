import { useMemo, useState } from 'react';
import {
  BEAST_ORDER,
  BEASTS,
  QUIZ_LENGTH,
  computeGuardianResult,
  createQuizSession,
  type DisplayQuestion,
  type GuardianResult,
  type QuizSession
} from '../../data/guardianQuiz';
import './guardianQuiz.css';

type Step = 'home' | 'quiz' | 'result';

export function GuardianQuizPage() {
  const [step, setStep] = useState<Step>('home');
  const [session, setSession] = useState<QuizSession | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [finalResult, setFinalResult] = useState<GuardianResult | null>(null);

  const questions = session?.questions ?? [];
  const total = questions.length;
  const current: DisplayQuestion | undefined = questions[questionIndex];
  const progress = step === 'quiz' && total > 0 ? ((questionIndex + (selectedOptionId ? 1 : 0)) / total) * 100 : 0;

  const resultProfile = useMemo(() => {
    if (!finalResult) return null;
    return BEASTS[finalResult.primary];
  }, [finalResult]);

  function startQuiz() {
    const nextSession = createQuizSession();
    setSession(nextSession);
    setStep('quiz');
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedOptionId(null);
    setFinalResult(null);
  }

  function pickOption(optionId: string) {
    setSelectedOptionId(optionId);
  }

  function goNext() {
    if (!selectedOptionId || !current || !session) return;
    const nextAnswers = [...answers, selectedOptionId];
    setAnswers(nextAnswers);
    setSelectedOptionId(null);

    if (questionIndex + 1 >= total) {
      setFinalResult(computeGuardianResult(session, nextAnswers));
      setStep('result');
      return;
    }
    setQuestionIndex((i) => i + 1);
  }

  function goBack() {
    if (questionIndex === 0) {
      setStep('home');
      setSession(null);
      setAnswers([]);
      setSelectedOptionId(null);
      return;
    }
    const prevIndex = questionIndex - 1;
    setQuestionIndex(prevIndex);
    setSelectedOptionId(answers[prevIndex] ?? null);
    setAnswers((a) => a.slice(0, -1));
  }

  function retake() {
    startQuiz();
  }

  if (step === 'home') {
    return (
      <div className="guardian-page">
        <div className="guardian-card">
          <p className="guardian-eyebrow">带着神兽游中国</p>
          <h1 className="guardian-title">找到你的中国守护神兽</h1>
          <p className="guardian-subtitle">
            Find Your Chinese Mythical Guardian
            <br />
            <span style={{ fontSize: '0.9em', opacity: 0.85 }}>
              约 2 分钟 · {QUIZ_LENGTH} 道题（随机）· 无需注册 · 结果仅保存在本设备
            </span>
          </p>

          <div className="guardian-beasts-row guardian-beasts-row--muted" aria-hidden>
            {BEAST_ORDER.map((id) => (
              <div key={id} className="guardian-beast-silhouette guardian-beast-silhouette--unknown">
                ?
              </div>
            ))}
          </div>

          <button type="button" className="guardian-btn guardian-btn-primary" onClick={startQuiz}>
            开始测试 / Start Test
          </button>
        </div>

        <p className="guardian-footer-note">
          中国文化展示活动 · 一日文化体验站
          <br />
          Adopt Your Mythical Guardian: A One-Day Journey through Chinese Life
        </p>
      </div>
    );
  }

  if (step === 'quiz' && current) {
    return (
      <div className="guardian-page">
        <div className="guardian-card">
          <div className="guardian-progress" aria-hidden>
            <div className="guardian-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <p className="guardian-question-num">
            第 {questionIndex + 1} / {total} 题 · Question {questionIndex + 1} of {total}
          </p>
          <h2 className="guardian-question-zh">{current.zh}</h2>
          <p className="guardian-question-en">{current.en}</p>

          <div className="guardian-options" role="listbox" aria-label={current.zh}>
            {current.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="option"
                aria-selected={selectedOptionId === opt.id}
                className={`guardian-option${selectedOptionId === opt.id ? ' selected' : ''}`}
                onClick={() => pickOption(opt.id)}
              >
                <span className="guardian-option-key">{opt.displayIndex}</span>
                <span className="guardian-option-text">
                  <span className="guardian-option-zh">{opt.zh}</span>
                  <span className="guardian-option-en">{opt.en}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="guardian-nav">
            <button type="button" className="guardian-btn guardian-btn-secondary" onClick={goBack}>
              {questionIndex === 0 ? '返回首页' : '上一题'}
            </button>
            <button
              type="button"
              className="guardian-btn guardian-btn-primary"
              disabled={!selectedOptionId}
              onClick={goNext}
              style={{
                opacity: selectedOptionId ? 1 : 0.5,
                cursor: selectedOptionId ? 'pointer' : 'not-allowed'
              }}
            >
              {questionIndex + 1 >= total ? '查看结果' : '下一题'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result' && finalResult && resultProfile) {
    const secondaryProfile = finalResult.secondary ? BEASTS[finalResult.secondary] : null;

    return (
      <div className="guardian-page">
        <div className="guardian-card guardian-card--result">
          <p className="guardian-eyebrow">综合测评结果 · Your Guardian Profile</p>

          <div
            className="guardian-result-badge"
            style={{
              background: `linear-gradient(145deg, ${resultProfile.color}, ${resultProfile.color}99)`
            }}
          >
            {resultProfile.glyph}
          </div>

          <h1 className="guardian-result-name">{resultProfile.nameZh}</h1>
          <p className="guardian-result-name-en">{resultProfile.nameEn}</p>

          {secondaryProfile && (
            <p className="guardian-secondary-beast">
              次要共鸣 · Secondary: {secondaryProfile.nameZh} {secondaryProfile.nameEn}
            </p>
          )}

          <span className="guardian-keywords">
            {resultProfile.keywordsZh} · {resultProfile.keywordsEn}
          </span>

          <div className="guardian-blend-box">
            <p>{finalResult.summaryZh}</p>
            <p style={{ color: '#6b7f76', marginTop: 10 }}>{finalResult.summaryEn}</p>
            <p style={{ marginTop: 14, fontWeight: 600 }}>{finalResult.blendZh}</p>
            <p style={{ color: '#6b7f76', marginTop: 6 }}>{finalResult.blendEn}</p>
          </div>

          <div className="guardian-score-chart">
            <p className="guardian-score-chart-title">神兽倾向分布 · Guardian Affinities</p>
            {BEAST_ORDER.map((id) => {
              const b = BEASTS[id];
              const pct = finalResult.percentages[id];
              const isPrimary = id === finalResult.primary;
              const isSecondary = id === finalResult.secondary;
              return (
                <div key={id} className="guardian-score-row">
                  <span className="guardian-score-label">
                    {b.glyph} {b.nameZh}
                    {isPrimary && <em> 主</em>}
                    {isSecondary && <em> 副</em>}
                  </span>
                  <div className="guardian-score-bar-wrap">
                    <div
                      className="guardian-score-bar"
                      style={{
                        width: `${pct}%`,
                        background: isPrimary ? b.color : `${b.color}99`
                      }}
                    />
                  </div>
                  <span className="guardian-score-pct">{pct}%</span>
                </div>
              );
            })}
          </div>

          <div className="guardian-explain">
            <p>{resultProfile.explanationZh}</p>
            <p style={{ color: '#6b7f76' }}>{resultProfile.explanationEn}</p>
          </div>

          <div className="guardian-sentence-box">
            <p className="guardian-sentence-zh">{resultProfile.sentenceZh}</p>
            <p className="guardian-sentence-en">{resultProfile.sentenceEn}</p>
          </div>

          <div className="guardian-offline-tip">
            <strong>线下继续体验 / Continue at the booth</strong>
            <br />
            请向工作人员出示本页结果，前往「神兽领养台」领取对应神兽贴纸、领养证与神兽护照。
            <br />
            <br />
            Show this result at the adoption desk to collect your guardian sticker, certificate, and
            passport.
          </div>

          <button type="button" className="guardian-btn guardian-btn-primary" onClick={retake} style={{ marginTop: 20 }}>
            重新测试（题目将重新打乱）/ Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return null;
}
