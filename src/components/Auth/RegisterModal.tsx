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

const USE_CLOUDBASE = !!import.meta.env.VITE_CLOUDBASE_ENV;

export function RegisterModal({ onClose, onSuccess, onSwitchToLogin, lang }: RegisterModalProps) {
  const { register, sendVerificationCode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [codeCooldown, setCodeCooldown] = useState(0);

  const handleSendCode = async () => {
    if (!email.trim()) {
      setError(lang === 'zh' ? '请先输入邮箱' : 'Please enter email first');
      return;
    }
    setError(null);
    setSendingCode(true);
    const res = await sendVerificationCode(email);
    setSendingCode(false);
    if (res.ok) {
      setCodeSent(true);
      setCodeCooldown(60);
      const t = setInterval(() => {
        setCodeCooldown((n) => (n <= 1 ? (clearInterval(t), 0) : n - 1));
      }, 1000);
    } else {
      setError(lang === 'zh' ? '发送失败，请稍后再试' : 'Failed to send, try again later');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError(lang === 'zh' ? '两次密码不一致' : 'Passwords do not match');
      return;
    }
    setLoading(true);
    const res = await register(email, password, verificationCode);
    setLoading(false);
    if (res.ok) onSuccess();
    else if (res.error === 'invalid_verification_code') setError(pickText(auth.errorInvalidCode, lang));
    else if (res.error === 'email_already_registered') setError(pickText(auth.errorEmailExists, lang));
    else setError(lang === 'zh' ? '注册失败' : 'Registration failed');
  };

  return (
    <div className="authOverlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="authModal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="authClose" onClick={onClose} aria-label="Close">×</button>
        <h2 className="authTitle">{pickText(auth.register, lang)}</h2>
        {!USE_CLOUDBASE && <p className="authDemoHint">{pickText(auth.demoHint, lang)}</p>}
        <form onSubmit={handleSubmit} className="authForm">
          <label>
            <span>{pickText(auth.email, lang)}</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </label>
          <label>
            <span>{pickText(auth.verificationCode, lang)}</span>
            <div className="authCodeRow">
              <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder={USE_CLOUDBASE ? '' : '123456'} required />
              <button type="button" className="authSendCode" onClick={handleSendCode} disabled={sendingCode || codeCooldown > 0}>
                {sendingCode ? (lang === 'zh' ? '发送中...' : 'Sending...') : codeCooldown > 0 ? `${codeCooldown}s` : pickText(auth.sendCode, lang)}
              </button>
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
          <button type="submit" className="authSubmit" disabled={loading}>
            {loading ? (lang === 'zh' ? '注册中...' : 'Signing up...') : pickText(auth.submitRegister, lang)}
          </button>
        </form>
        <p className="authSwitch">
          {lang === 'zh' ? '已有账号？' : 'Already have an account? '}
          <button type="button" className="authLink" onClick={onSwitchToLogin}>{pickText(auth.login, lang)}</button>
        </p>
      </div>
    </div>
  );
}
