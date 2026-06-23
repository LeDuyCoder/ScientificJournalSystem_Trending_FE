import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ArticleGraphEmbedPage from '../../features/articles/pages/ArticleGraphEmbedPage';
import Dashboard from '../../pages/Dashboard';
import MainLayout from '../../components/layout/MainLayout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes with main layout (includes sidebar) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Route without any layout for embedding */}
      <Route path="/embed/article-graph" element={<ArticleGraphEmbedPage />} />
    </Routes>
  );
}
