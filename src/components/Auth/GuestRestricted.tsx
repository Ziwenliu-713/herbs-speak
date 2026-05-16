import { useAuth } from '../../contexts/AuthContext';
import { useRegisterPrompt } from '../../contexts/RegisterPromptContext';
import { pickText } from '../../i18n/strings';
import { auth } from '../../i18n/authStrings';
import { useLanguage } from '../../i18n/LanguageContext';

interface GuestRestrictedProps {
  children: React.ReactNode;
  /** 占位内容，游客时显示（可点击触发注册提示） */
  placeholder?: React.ReactNode;
}

export function GuestRestricted({ children, placeholder }: GuestRestrictedProps) {
  const { isLoggedIn } = useAuth();
  const showPrompt = useRegisterPrompt();
  const { lang } = useLanguage();

  if (isLoggedIn) return <>{children}</>;

  const overlayContent = placeholder ?? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        height: '100%',
        minHeight: 200,
        background: 'rgba(182,208,167,0.15)',
        borderRadius: 14,
        color: 'var(--muted)',
        cursor: 'pointer',
        padding: 24
      }}
      onClick={showPrompt}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && showPrompt()}
    >
      <span style={{ fontSize: 18, fontWeight: 700 }}>{pickText(auth.registerToUnlock, lang)}</span>
      <span style={{ fontSize: 14 }}>{lang === 'zh' ? '点击注册' : 'Click to register'}</span>
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ filter: 'blur(3px)', pointerEvents: 'none', userSelect: 'none' }}>
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {overlayContent}
      </div>
    </div>
  );
}
