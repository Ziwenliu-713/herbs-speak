import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageFab } from '../components/Language/LanguageFab';
import { LoginModal } from '../components/Auth/LoginModal';
import { RegisterModal } from '../components/Auth/RegisterModal';
import { useLanguage } from '../i18n/LanguageContext';
import { pickText, ui } from '../i18n/strings';
import { auth } from '../i18n/authStrings';

export function StartPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate('/app');
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    navigate('/app');
  };

  return (
    <div className="startPage">
      <div className="startCard">
        <div className="startMark" aria-hidden="true">
          <div className="logo" />
        </div>

        <div className="startTitle">{pickText(ui.start.titleZh, lang)}</div>
        <div className="startTitleTagline">中医·语言·智慧生活</div>

        <div className="startSubtitle">
          <p className="startSubtitleText">
            {pickText(ui.start.subtitleZh, lang)
              .split('\n')
              .map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
          </p>
        </div>

        <div className="startActions">
          <button className="startButton" onClick={() => setShowLogin(true)}>
            {pickText(auth.login, lang)}
          </button>
          <button type="button" className="startHint startHintLink" onClick={() => setShowRegister(true)}>
            {pickText(auth.notRegistered, lang)}
          </button>
        </div>
      </div>
      <LanguageFab />

      {showLogin && (
        <LoginModal
          lang={lang}
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
        />
      )}
      {showRegister && (
        <RegisterModal
          lang={lang}
          onClose={() => setShowRegister(false)}
          onSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
        />
      )}
    </div>
  );
}

