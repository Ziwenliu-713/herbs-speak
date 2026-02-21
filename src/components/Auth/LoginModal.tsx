import { useState } from 'react';
import type { Language } from '../../i18n/LanguageContext';
import { pickText } from '../../i18n/strings';
import { auth } from '../../i18n/authStrings';
import { useAuth } from '../../contexts/AuthContext';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onSwitchToRegister: () => void;
  lang: Language;
}

export function LoginModal(props: LoginModalProps) {
  const { onClose, onSuccess, onSwitchToRegister, lang } = props;
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = login(email, password);
    if (res.ok) onSuccess();
    else setError(pickText(auth.errorInvalidCredentials, lang));
  };

  return (
    <div className="authOverlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="authModal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="authClose" onClick={onClose} aria-label="Close">×</button>
        <h2 className="authTitle">{pickText(auth.login, lang)}</h2>
        <form onSubmit={handleSubmit} className="authForm">
          <label>
            <span>{pickText(auth.email, lang)}</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </label>
          <label>
            <span>{pickText(auth.password, lang)}</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </label>
          {error && <p className="authError">{error}</p>}
          <button type="submit" className="authSubmit">{pickText(auth.submitLogin, lang)}</button>
        </form>
        <p className="authSwitch">
          {lang === 'zh' ? '还未注册？' : 'Not registered? '}
          <button type="button" className="authLink" onClick={onSwitchToRegister}>{pickText(auth.registerLink, lang)}</button>
        </p>
      </div>
    </div>
  );
}
