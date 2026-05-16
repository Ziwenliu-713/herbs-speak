import { auth } from '../../i18n/authStrings';
import { pickText } from '../../i18n/strings';
import type { Language } from '../../i18n/LanguageContext';

interface RegisterPromptModalProps {
  lang: Language;
  onClose: () => void;
  onRegister: () => void;
}

export function RegisterPromptModal({ lang, onClose, onRegister }: RegisterPromptModalProps) {
  return (
    <div className="authOverlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="authModal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="authClose" onClick={onClose} aria-label="Close">×</button>
        <h2 className="authTitle">{pickText(auth.registerToUnlock, lang)}</h2>
        <p style={{ margin: '20px 0', color: 'var(--muted)', lineHeight: 1.6 }}>
          {lang === 'zh'
            ? '注册后可观看视频、发表评论、使用 AI 对话等完整功能。'
            : 'Register to watch videos, post comments, use AI chat and more.'}
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button type="button" className="authSubmit" onClick={onRegister}>
            {pickText(auth.registerNow, lang)}
          </button>
          <button type="button" className="authLogout" onClick={onClose}>
            {lang === 'zh' ? '稍后' : 'Later'}
          </button>
        </div>
      </div>
    </div>
  );
}
