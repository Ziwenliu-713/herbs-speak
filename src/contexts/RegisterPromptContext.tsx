import { createContext, useCallback, useContext, useState } from 'react';
import { RegisterPromptModal } from '../components/Auth/RegisterPromptModal';
import { RegisterModal } from '../components/Auth/RegisterModal';
import { useLanguage } from '../i18n/LanguageContext';

type RegisterPromptContextValue = {
  showRegisterPrompt: () => void;
};

const RegisterPromptContext = createContext<RegisterPromptContextValue | null>(null);

export function RegisterPromptProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const [showPrompt, setShowPrompt] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const showRegisterPrompt = useCallback(() => {
    setShowPrompt(true);
  }, []);

  const handleRegister = useCallback(() => {
    setShowPrompt(false);
    setShowRegister(true);
  }, []);

  return (
    <RegisterPromptContext.Provider value={{ showRegisterPrompt }}>
      {children}
      {showPrompt && (
        <RegisterPromptModal
          lang={lang}
          onClose={() => setShowPrompt(false)}
          onRegister={handleRegister}
        />
      )}
      {showRegister && (
        <RegisterModal
          lang={lang}
          onClose={() => setShowRegister(false)}
          onSuccess={() => setShowRegister(false)}
          onSwitchToLogin={() => setShowRegister(false)}
        />
      )}
    </RegisterPromptContext.Provider>
  );
}

export function useRegisterPrompt() {
  const ctx = useContext(RegisterPromptContext);
  return ctx?.showRegisterPrompt ?? (() => {});
}
