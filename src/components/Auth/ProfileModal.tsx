import { useRef, useState } from 'react';
import type { Language } from '../../i18n/LanguageContext';
import { pickText } from '../../i18n/strings';
import { auth } from '../../i18n/authStrings';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileModalProps {
  onClose: () => void;
  lang: Language;
}

export function ProfileModal({ onClose, lang }: ProfileModalProps) {
  const { user, updateProfile, logout } = useAuth();
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const fileInput = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        updateProfile({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ nickname: nickname.trim() || user?.nickname });
    onClose();
  };

  return (
    <div className="authOverlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="profile-title">
      <div className="authModal authProfileModal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="authClose" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id="profile-title" className="authTitle">{pickText(auth.profile, lang)}</h2>
        <div className="authAvatarSection">
          <button
            type="button"
            className="authAvatarBtn"
            onClick={() => fileInput.current?.click()}
            title={pickText(auth.changeAvatar, lang)}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="authAvatarImg" />
            ) : (
              <div className="authAvatarPlaceholder" />
            )}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="authAvatarInput"
            aria-hidden
          />
          <span className="authAvatarHint">{pickText(auth.changeAvatar, lang)}</span>
        </div>
        <form onSubmit={handleSubmit} className="authForm">
          <label>
            <span>{pickText(auth.nickname, lang)}</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={user?.email?.split('@')[0] ?? ''}
            />
          </label>
          <div className="authProfileActions">
            <button type="submit" className="authSubmit">{pickText(auth.saveProfile, lang)}</button>
            <button type="button" className="authLogout" onClick={() => { logout(); onClose(); }}>
              {pickText(auth.logout, lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
