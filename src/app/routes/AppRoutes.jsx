
import { Route, Routes, Navigate } from 'react-router-dom';
import ArticleGraphEmbedPage from '../../features/articles/pages/ArticleGraphEmbedPage';
import KeywordsNetworksPage from '../../features/volume/pages/KeywordsNetworksPage';
import Dashboard from '../../pages/Dashboard';
import Journals from '../../pages/Journals';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes with main layout (includes sidebar and header) */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/volumes" element={<Navigate to="/volumes/keywords-networks" replace />} />
        <Route path="/volumes/keywords-networks" element={<KeywordsNetworksPage />} />
      </Route>

      {/* Route without any layout for embedding */}
      <Route path="/embed/article-graph" element={<ArticleGraphEmbedPage />} />
    </Routes>
  );
}
