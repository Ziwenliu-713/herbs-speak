import { useState } from 'react';
import type { Language } from '../../i18n/LanguageContext';
import { pickText } from '../../i18n/strings';
import { auth } from '../../i18n/authStrings';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onSwitchToLogin: () => void;
  lang: Language;
}

export function RegisterModal({ onClose, onSuccess, onSwitchToLogin, lang }: RegisterModalProps) {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError(lang === 'zh' ? '两次密码不一致' : 'Passwords do not match');
      return;
    }
    const res = register(email, password, verificationCode);
    if (res.ok) onSuccess();
    else if (res.error === 'invalid_verification_code') setError(pickText(auth.errorInvalidCode, lang));
    else if (res.error === 'email_already_registered') setError(pickText(auth.errorEmailExists, lang));
    else setError('Error');
  };

  return (
    <div className="authOverlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="authModal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="authClose" onClick={onClose} aria-label="Close">×</button>
        <h2 className="authTitle">{pickText(auth.register, lang)}</h2>
        <p className="authDemoHint">{pickText(auth.demoHint, lang)}</p>
        <form onSubmit={handleSubmit} className="authForm">
          <label>
            <span>{pickText(auth.email, lang)}</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </label>
          <label>
            <span>{pickText(auth.verificationCode, lang)}</span>
            <div className="authCodeRow">
              <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="123456" required />
              <button type="button" className="authSendCode">{pickText(auth.sendCode, lang)}</button>
            </div>
          </label>
          <label>
            <span>{pickText(auth.password, lang)}</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete="new-password" />
          </label>
          <label>
            <span>{pickText(auth.confirmPassword, lang)}</span>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} autoComplete="new-password" />
          </label>
          {error && <p className="authError">{error}</p>}
          <button type="submit" className="authSubmit">{pickText(auth.submitRegister, lang)}</button>
        </form>
        <p className="authSwitch">
          {lang === 'zh' ? '已有账号？' : 'Already have an account? '}
          <button type="button" className="authLink" onClick={onSwitchToLogin}>{pickText(auth.login, lang)}</button>
        </p>
      </div>
    </div>
  );
}
