import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getDefaultLanguage } from './languageRouting';

export default function LanguageRedirect() {
  const lang = getDefaultLanguage();
  const { search } = useLocation();
  return <Navigate to={{ pathname: `/${lang}`, search }} replace />;
}
