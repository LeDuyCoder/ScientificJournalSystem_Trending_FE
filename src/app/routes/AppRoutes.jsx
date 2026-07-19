import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ArticleGraphEmbedPage from '../../features/articles/pages/ArticleGraphEmbedPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import JournalsPage from '../../features/journals/pages/JournalsPage';
import DashboardLayout from '../../shared/components/layout/DashboardLayout';
import CollaborationAnalyticsPage from '../../features/volume/pages/CollaborationAnalyticsPage';
import KeywordsNetworksPage from '../../features/volume/pages/KeywordsNetworksPage';
import { AnalyticsDashboard } from '../../features/analytics/pages/AnalyticsDashboard';
import CuratedArticlesPage from '../../features/analytics/pages/CuratedArticlesPage';
import NotFoundPage from '../../pages/NotFoundPage';
import ProjectsPage from '../../features/projects/pages/ProjectsPage';

// i18n routing components
import LanguageRedirect from './LanguageRedirect';
import LangLayout from '../layouts/LangLayout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect to default language prefix */}
      <Route path="/" element={<LanguageRedirect />} />

      {/* Language prefix shell */}
      <Route path="/:lang" element={<LangLayout />}>
        {/* Redirect lang root index directly to projects */}
        <Route index element={<Navigate to="projects" replace />} />

        {/* Existing dashboard & project routes */}
        <Route path="projects" element={<DashboardLayout />}>
          <Route index element={<ProjectsPage />} />
        </Route>

        <Route path="project/:id" element={<DashboardLayout />}>
          <Route index element={null} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="journals" element={<JournalsPage />} />

          <Route path="volumes">
            <Route index element={<Navigate to="journal-metrics" replace />} />
            <Route path="journal-metrics" element={<CollaborationAnalyticsPage />} />
            <Route path="keywords-networks" element={<KeywordsNetworksPage />} />
          </Route>

          <Route path="analytics">
            <Route index element={<AnalyticsDashboard />} />
            <Route path="curated-articles" element={<CuratedArticlesPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="embed/article-graph" element={<ArticleGraphEmbedPage />} />
        
        {/* Localized fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Global fallback: redirect back to root to trigger language detection */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}