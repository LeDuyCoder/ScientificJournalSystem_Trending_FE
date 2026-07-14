import React, { useEffect } from 'react';
import { Outlet, useParams, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGE } from '../../shared/constants/storageKeys';
import { isValidLanguage, DEFAULT_LANGUAGE, buildLocalizedPath } from '../routes/languageRouting';

export default function LangLayout() {
  const { lang } = useParams();
  const { pathname, search } = useLocation();
  const { i18n } = useTranslation();

  // Sync language with i18next and localStorage when valid prefix is matched
  useEffect(() => {
    if (lang && isValidLanguage(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      localStorage.setItem(LANGUAGE, lang);
    }
  }, [lang, i18n]);

  // If language prefix is invalid, redirect to the default language prefix with preserved path
  if (!isValidLanguage(lang)) {
    const fallbackPath = buildLocalizedPath(DEFAULT_LANGUAGE, pathname);
    return <Navigate to={{ pathname: fallbackPath, search }} replace />;
  }

  return <Outlet />;
}
