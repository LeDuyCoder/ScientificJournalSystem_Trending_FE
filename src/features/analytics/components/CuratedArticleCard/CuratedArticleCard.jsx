import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/curatedArticles.module.css';
import { AccessBadge } from '../../../../shared/components/common/AccessBadge';

/**
 * CuratedArticleCard Component
 * Displays individual article details in the Curated Articles page.
 * 
 * @param {Object} props
 * @param {Object} props.article - Article data object
 * @param {Function} props.onBookmarkToggle - Callback for bookmark toggle
 */
export const CuratedArticleCard = ({ article, onBookmarkToggle }) => {
  const { t } = useTranslation();

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (onBookmarkToggle) {
      onBookmarkToggle(article.id, !article.isBookmarked);
    }
  };

  return (
    <div className={styles.articleCard}>
      <div className={styles.cardHeader}>
        <AccessBadge isOpenAccess={article.isOpenAccess} />
        <div 
          className={styles.bookmarkIcon} 
          onClick={handleBookmarkClick}
          style={{ cursor: 'pointer', transition: 'color 0.2s', color: article.isBookmarked ? '#f97316' : '#94a3b8' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={article.isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </div>

      <div>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <p className={styles.authors}>{article.authors}</p>
      </div>

      <p className={styles.description}>
        {(article.description || article.abstract) || <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>{t('analytics.noDescription', 'No abstract available for this article.')}</span>}
      </p>

      <div className={styles.cardFooter}>
        <span className={styles.publishedYear}>
          {t('analytics.publishedAt', { year: article.publishedYear, defaultValue: `Published ${article.publishedYear}` })}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={styles.viewBtn} 
            onClick={handleBookmarkClick}
            style={{ 
              backgroundColor: article.isBookmarked ? '#fff7ed' : 'transparent',
              color: article.isBookmarked ? '#f97316' : '#64748b',
              border: `1px solid ${article.isBookmarked ? '#f97316' : '#e2e8f0'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={article.isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            {article.isBookmarked ? t('favoriteArticles.bookmarked', 'Bookmarked') : t('favoriteArticles.bookmark', 'Bookmark')}
          </button>
          <button 
            className={styles.viewBtn}
            onClick={() => {
              const coreUrl = import.meta.env.VITE_CORE_FE_URL || 'http://localhost:5173';
              window.location.href = `${coreUrl}/articles/${article.id}/visual`;
            }}
          >
            {t('analytics.viewDetails', 'View Details')}
          </button>
        </div>
      </div>
    </div>
  );
};
