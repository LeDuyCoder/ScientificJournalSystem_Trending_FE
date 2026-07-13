import apiClient from '../../../shared/api/axios';

export const favoriteArticlesApi = {
  getFavoriteArticles: (projectId, params) => {
    return apiClient.get(`/projects/${projectId}/bookmarked-articles`, { params });
  },
  bookmarkArticle: (projectId, articleId, notes) => {
    return apiClient.post(`/projects/${projectId}/articles/${articleId}/bookmark`, { notes });
  },
  unbookmarkArticle: (projectId, articleId) => {
    return apiClient.delete(`/projects/${projectId}/articles/${articleId}/bookmark`);
  },
  updateBookmarkNotes: (projectId, articleId, notes) => {
    return apiClient.patch(`/projects/${projectId}/articles/${articleId}/bookmark`, { notes });
  }
};
