import { useState } from 'react';
import { AIChatPanel } from '../AIChat/AIChatPanel';
import type { Language } from '../../i18n/LanguageContext';
import { pickText, ui } from '../../i18n/strings';

/** 吉祥物图片地址：生成完成后将路径写在这里，或通过 props 传入 */
const DEFAULT_MASCOT_SRC = '';

interface AIMascotProps {
  lang: Language;
  /** 吉祥物图片 URL，留空则显示占位区 */
  mascotSrc?: string;
}

export function AIMascot({ lang, mascotSrc = DEFAULT_MASCOT_SRC }: AIMascotProps) {
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !mascotSrc || imgError;

  const handleClick = () => {
    setShowChat(true);
    if (!isOrbiting) {
      setIsOrbiting(true);
      setTimeout(() => setIsOrbiting(false), 2500);
    }
  };

  return (
    <section className="aiMascotSection" aria-label={pickText(ui.aiMascot.slogan, lang)}>
      {showChat && <AIChatPanel lang={lang} onClose={() => setShowChat(false)} />}
      <p className="aiMascotSlogan">{pickText(ui.aiMascot.slogan, lang)}</p>
      <div className="aiMascotStage">
        <button
          type="button"
          className={`aiMascotBtn ${isOrbiting ? 'aiMascotOrbit' : 'aiMascotFloat'}`}
          onClick={handleClick}
          aria-label={lang === 'zh' ? '点击吉祥物，打开 AI 对话' : 'Click mascot to open AI chat'}
        >
          {showPlaceholder ? (
            <div className="aiMascotPlaceholder">
              <span className="aiMascotPlaceholderText">
                {lang === 'zh' ? '吉祥物' : 'Mascot'}
              </span>
              <span className="aiMascotPlaceholderHint">
                {lang === 'zh' ? '（待替换）' : '(replace)'}
              </span>
            </div>
          ) : (
            <img
              src={mascotSrc}
              alt=""
              className="aiMascotImg"
              onError={() => setImgError(true)}
            />
          )}
        </button>
      </div>
    </section>
  );
}
