import React from 'react';
import { Navigate } from 'react-router-dom';
import { getDefaultLanguage } from './languageRouting';

export default function LanguageRedirect() {
  const lang = getDefaultLanguage();
  return <Navigate to={`/${lang}`} replace />;
}
