import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import ArticleGraphEmbedPage from '../../features/articles/pages/ArticleGraphEmbedPage'

import Dashboard from '../../pages/Dashboard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/embed/article-graph" element={<ArticleGraphEmbedPage />} />
    </Routes>
  )
}
