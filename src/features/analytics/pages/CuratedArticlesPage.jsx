import React from 'react';
import { Tabs } from '../components/Tabs/Tabs';
import { CuratedArticleCard } from '../components/CuratedArticleCard/CuratedArticleCard';
import { KeywordPanel } from '../components/KeywordPanel/KeywordPanel';
import { ExportPanel } from '../components/ExportPanel/ExportPanel';
import { TrackedJournalTable } from '../components/TrackedJournalTable/TrackedJournalTable';
import { Pagination } from '../components/Pagination/Pagination';
import DashboardFooter from '../../../shared/components/layout/DashboardFooter';
import { useCuratedArticles } from '../hooks/useCuratedArticles';
import { journalData } from '../data/journalData';
import styles from '../styles/curatedArticles.module.css';
import analyticsStyles from '../styles/Analytics.module.css';

/**
 * ---------------------------------------------------------
 * Curated Articles Page
 *
 * Displays the curated articles screen.
 *
 * Issue:
 * #54
 *
 * Author:
 * Team Scientia
 * ---------------------------------------------------------
 */
const CuratedArticlesPage = () => {
  const { articles, keywords, loading, error } = useCuratedArticles();

  return (
    <div className={analyticsStyles.analyticsPage}>
      <Tabs />
      
      <div className={styles.pageContent}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Curated Articles</h2>
        </div>

        <div className={styles.toolbar}>
          <button className={`${styles.toolbarBtn} ${styles.filterBtn}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter
          </button>
          <button className={`${styles.toolbarBtn} ${styles.newCurationBtn}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Curation
          </button>
        </div>

        <div className={styles.layoutGrid}>
          {/* Left Column - Article Cards */}
          <div className={styles.articlesWrapper}>
            <div className={styles.leftColumn}>
              {loading ? (
                <p>Loading articles...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                articles.map(article => (
                  <CuratedArticleCard key={article.id} article={article} />
                ))
              )}
            </div>
            
            {!loading && !error && (
              <div className={styles.paginationWrapper}>
                <Pagination 
                  currentPage={1} 
                  totalPages={5} 
                  totalItems={articles.length} 
                  itemsPerPage={articles.length} 
                />
              </div>
            )}
          </div>

          {/* Right Column - Panels */}
          <div className={styles.rightColumn}>
            <KeywordPanel keywords={keywords} />
            <ExportPanel />
          </div>
        </div>

        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Tracked Journals</h2>
        </div>

        <TrackedJournalTable journals={journalData} />

      </div>
      
      <DashboardFooter />
    </div>
  );
};

export default CuratedArticlesPage;
