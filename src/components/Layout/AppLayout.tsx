import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LanguageFab } from '../Language/LanguageFab';
import { ProfileModal } from '../Auth/ProfileModal';
import { auth } from '../../i18n/authStrings';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { pickText, ui } from '../../i18n/strings';

const navItems: Array<{ to: string; labelKey: keyof typeof ui.nav }> = [
  { to: '/app', labelKey: 'page1' },
  { to: '/app/page-2', labelKey: 'page2' },
  { to: '/app/page-3', labelKey: 'page3' },
  { to: '/app/page-4', labelKey: 'page4' },
  { to: '/app/page-5', labelKey: 'page5' }
];

export function AppLayout() {
  const { lang } = useLanguage();
  const { user, isLoggedIn } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <button
            type="button"
            className="brandLogoBtn"
            onClick={() => (isLoggedIn ? setShowProfile(true) : navigate('/'))}
            aria-label={pickText(auth.profile, lang)}
          >
            {isLoggedIn && user?.avatar ? (
              <img src={user.avatar} alt="" className="brandAvatar" />
            ) : (
              <div className="logo" aria-hidden="true" />
            )}
          </button>
          <div>
            <div className="brandTitle">{pickText(ui.brandTitle, lang)}</div>
            <div className="brandSubtitle">{pickText(ui.brandSubtitle, lang)}</div>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/app'}
              className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}
            >
              {pickText(ui.nav[item.labelKey], lang)}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Ziwen Liu · herbs speak</span>
      </footer>

      <LanguageFab />

      {showProfile && isLoggedIn && <ProfileModal lang={lang} onClose={() => setShowProfile(false)} />}
    </div>
  );
}

