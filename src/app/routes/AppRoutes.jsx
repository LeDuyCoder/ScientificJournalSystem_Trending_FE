import { Route, Routes, Navigate } from 'react-router-dom';
import ArticleGraphEmbedPage from '../../features/articles/pages/ArticleGraphEmbedPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import JournalsPage from '../../features/journals/pages/JournalsPage';
import DashboardLayout from '../../shared/components/layout/DashboardLayout';
import CollaborationAnalyticsPage from '../../features/volume/pages/CollaborationAnalyticsPage';
import KeywordsNetworksPage from '../../features/volume/pages/KeywordsNetworksPage';
import { AnalyticsDashboard } from '../../features/analytics/pages/AnalyticsDashboard';
import CuratedArticlesPage from '../../features/analytics/pages/CuratedArticlesPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/project/default-id/dashboard" replace />} />

      <Route path="/project/:id" element={<DashboardLayout />}>

        <Route index element={<Navigate to="dashboard" replace />} />

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
      </Route>

      <Route path="/embed/article-graph" element={<ArticleGraphEmbedPage />} />
    </Routes>
  );
}