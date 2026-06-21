import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ArticleGraphEmbedPage from '../../features/articles/pages/ArticleGraphEmbedPage'

import Dashboard from '../../pages/Dashboard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/embed/article-graph" element={<ArticleGraphEmbedPage />} />
    </Routes>
  )
}
