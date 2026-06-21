import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ArticleGraphEmbedPage from '../../features/articles/pages/ArticleGraphEmbedPage'

import DashboardDemo from '../../pages/DashboardDemo'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardDemo />} />
      <Route path="/embed/article-graph" element={<ArticleGraphEmbedPage />} />
    </Routes>
  )
}
