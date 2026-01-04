import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ja from './locales/ja';
import en from './locales/en';
import zh from './locales/zh';

// Supported languages with URL paths
export const languages = {
  ja: { name: '日本語', path: 'jp' },
  en: { name: 'English', path: 'en' },
  zh: { name: '中文', path: 'cn' },
} as const;

export type LanguageCode = keyof typeof languages;

// Map URL path to language code
export const pathToLanguage: Record<string, LanguageCode> = {
  jp: 'ja',
  en: 'en',
  cn: 'zh',
};

// Map language code to URL path
export const languageToPath: Record<LanguageCode, string> = {
  ja: 'jp',
  en: 'en',
  zh: 'cn',
};

// Get language from URL path
export const getLanguageFromPath = (pathname: string): LanguageCode | null => {
  const match = pathname.match(/^\/(jp|en|cn)(\/|$)/);
  if (match) {
    return pathToLanguage[match[1]];
  }
  return null;
};

// Get browser language preference
export const getBrowserLanguage = (): LanguageCode => {
  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('zh')) return 'zh';
  return 'en'; // Default to English
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ja: { translation: ja },
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'navigator'],
      lookupFromPathIndex: 0,
    },
  });

export default i18n;
