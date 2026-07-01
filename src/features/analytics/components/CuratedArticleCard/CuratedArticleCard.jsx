import React from 'react';
import styles from '../../styles/curatedArticles.module.css';

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
        {article.isOpenAccess ? (
          <span className={styles.badge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Open Access
          </span>
        ) : (
          <div></div> // placeholder for alignment
        )}
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
        <button className={styles.viewBtn}>View Details</button>
      </div>
    </div>
  );
};
