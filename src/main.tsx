import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { RegisterPromptProvider } from './contexts/RegisterPromptContext';
import { LanguageProvider } from './i18n/LanguageContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <RegisterPromptProvider>
          <RouterProvider router={router} />
        </RegisterPromptProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);

