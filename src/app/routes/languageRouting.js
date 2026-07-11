import { LANGUAGE } from '../../shared/constants/storageKeys';

export const SUPPORTED_LANGUAGES = ['vi', 'en', 'ja', 'ko'];
export const DEFAULT_LANGUAGE = 'en';

export function isValidLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

export function getDefaultLanguage() {
  // 1. LocalStorage
  const savedLang = localStorage.getItem(LANGUAGE);
  if (savedLang && isValidLanguage(savedLang)) {
    return savedLang;
  }

  // 2. Browser Language
  if (typeof navigator !== 'undefined' && navigator.language) {
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    if (isValidLanguage(browserLang)) {
      return browserLang;
    }
  }

  // 3. Default to English
  return DEFAULT_LANGUAGE;
}

export function buildLocalizedPath(lang, pathname) {
  if (!pathname) return `/${lang}`;
  
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) {
    return `/${lang}`;
  }

  if (isValidLanguage(parts[0])) {
    parts[0] = lang;
  } else {
    parts.unshift(lang);
  }

  return '/' + parts.join('/');
}
