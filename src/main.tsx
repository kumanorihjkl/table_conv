import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';
import './i18n';
import App from './App';
import {
  getBrowserLanguage,
  languageToPath,
  pathToLanguage,
  type LanguageCode
} from './i18n';

// Component to handle language detection and redirect for root path
const LanguageRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const browserLang = getBrowserLanguage();
    const path = languageToPath[browserLang];
    navigate(`/${path}/`, { replace: true });
  }, [navigate]);

  return null;
};

// Component to set language based on URL
const LanguageWrapper = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && pathToLanguage[lang]) {
      const languageCode = pathToLanguage[lang];
      if (i18n.language !== languageCode) {
        i18n.changeLanguage(languageCode);
      }
    }
  }, [lang, i18n]);

  // If invalid language path, redirect to default
  if (!lang || !pathToLanguage[lang]) {
    const browserLang = getBrowserLanguage();
    const path = languageToPath[browserLang];
    return <Navigate to={`/${path}/`} replace />;
  }

  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LanguageRedirect />} />
        <Route path="/:lang/*" element={<LanguageWrapper />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
