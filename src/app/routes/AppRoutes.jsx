import { Route, Routes, Navigate } from 'react-router-dom';
import ArticleGraphEmbedPage from '../../features/articles/pages/ArticleGraphEmbedPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import JournalsPage from '../../features/journals/pages/JournalsPage';
import DashboardLayout from '../../shared/components/layout/DashboardLayout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes with main layout (includes sidebar and header) */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/journals" element={<JournalsPage />} />
      </Route>

      {/* Route without any layout for embedding */}
      <Route path="/embed/article-graph" element={<ArticleGraphEmbedPage />} />
    </Routes>
  );
}
