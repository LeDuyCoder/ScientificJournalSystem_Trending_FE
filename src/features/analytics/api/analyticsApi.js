import { curatedArticlesMock } from '../data/curatedArticlesMock';
import { keywordsMock } from '../data/keywordsMock';

/**
 * Mock API for Analytics feature
 */
export const analyticsApi = {
  /**
   * Fetch curated articles
   * @returns {Promise<Array>}
   */
  getCuratedArticles: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(curatedArticlesMock);
      }, 500);
    });
  },

  /**
   * Fetch keywords
   * @returns {Promise<Array>}
   */
  getKeywords: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(keywordsMock);
      }, 300);
    });
  }
};
