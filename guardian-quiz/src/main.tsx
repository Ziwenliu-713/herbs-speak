import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuardianQuizPage } from './components/GuardianQuizPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GuardianQuizPage />
  </StrictMode>
);
