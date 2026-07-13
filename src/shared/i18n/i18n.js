import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LANGUAGE } from '../constants/storageKeys';

import translationVI from './locales/vi.json';
import translationEN from './locales/en.json';
import translationJA from './locales/ja.json';
import translationKO from './locales/ko.json';

const resources = {
  vi: { translation: translationVI },
  en: { translation: translationEN },
  ja: { translation: translationJA },
  ko: { translation: translationKO }
};

const SUPPORTED_LANGUAGES = ['vi', 'en', 'ja', 'ko'];

const getInitialLanguage = () => {
  // 1. LocalStorage
  const savedLang = localStorage.getItem(LANGUAGE);
  if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
    return savedLang;
  }

  // 2. Browser Language
  if (typeof navigator !== 'undefined' && navigator.language) {
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    if (SUPPORTED_LANGUAGES.includes(browserLang)) {
      return browserLang;
    }
  }

  // 3. Default to English
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
