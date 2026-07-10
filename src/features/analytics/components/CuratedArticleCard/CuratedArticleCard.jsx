import React from 'react';
import styles from '../../styles/curatedArticles.module.css';
import { AccessBadge } from '../../../../shared/components/common/AccessBadge';

/**
 * CuratedArticleCard Component
 * Displays individual article details in the Curated Articles page.
 * 
 * @param {Object} props
 * @param {Object} props.article - Article data object
 */
export const CuratedArticleCard = ({ article }) => {
  return (
    <div className={styles.articleCard}>
      <div className={styles.cardHeader}>
        <AccessBadge isOpenAccess={article.isOpenAccess} />
        <div className={styles.bookmarkIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={article.isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </div>
      
      <div>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <p className={styles.authors}>{article.authors}</p>
      </div>
      
      <p className={styles.description}>{article.description}</p>
      
      <div className={styles.cardFooter}>
        <span className={styles.publishedYear}>Published {article.publishedYear}</span>
        <button 
          className={styles.viewBtn}
          onClick={() => {
            const coreUrl = import.meta.env.VITE_CORE_FE_URL || 'http://localhost:5173';
            window.location.href = `${coreUrl}/articles/${article.id}/visual`;
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};
