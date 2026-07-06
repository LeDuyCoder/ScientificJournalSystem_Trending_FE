import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from '../components/Tabs/Tabs';
import { CuratedArticleCard } from '../components/CuratedArticleCard/CuratedArticleCard';
import { KeywordPanel } from '../components/KeywordPanel/KeywordPanel';
import { ExportPanel } from '../components/ExportPanel/ExportPanel';
import { Pagination } from '../components/Pagination/Pagination';
import DashboardFooter from '../../../shared/components/layout/DashboardFooter';
import { ManageKeywordsModal } from '../components/ManageKeywordsModal/ManageKeywordsModal';
import { useCuratedArticles } from '../hooks/useCuratedArticles';
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
  const { id } = useParams();
  const projectId = id === 'default-id' || !id ? '1' : id;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filterForm, setFilterForm] = useState({
    from_year: '',
    to_year: '',
    keywords: '',
    is_open_access: false
  });

  const [showManageKeywords, setShowManageKeywords] = useState(false);

  const {
    articles,
    pagination,
    keywords,
    setKeywords,
    journals,
    loading,
    error,
    refetch,
  } = useCuratedArticles(projectId, currentPage, filters);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const applyFilters = () => {
    const newFilters = {};
    if (filterForm.from_year) newFilters.from_year = parseInt(filterForm.from_year, 10);
    if (filterForm.to_year) newFilters.to_year = parseInt(filterForm.to_year, 10);
    if (filterForm.keywords) newFilters.keywords = filterForm.keywords;
    if (filterForm.is_open_access) newFilters.is_open_access = true;
    setFilters(newFilters);
    setCurrentPage(1);
    setShowFilters(false);
  };

  return (
    <div className={analyticsStyles.analyticsPage}>
      <Tabs />
      
      <div className={styles.pageContent}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Curated Articles</h2>
        </div>

        <div className={styles.toolbar}>
          <div style={{ position: 'relative' }}>
            <button 
              className={`${styles.toolbarBtn} ${styles.filterBtn} ${showFilters ? styles.active : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filter
            </button>
            
            {showFilters && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, width: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Filter Articles</h4>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#64748b' }}>From Year</label>
                    <input type="number" placeholder="YYYY" value={filterForm.from_year} onChange={e => setFilterForm(f => ({ ...f, from_year: e.target.value }))} style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#64748b' }}>To Year</label>
                    <input type="number" placeholder="YYYY" value={filterForm.to_year} onChange={e => setFilterForm(f => ({ ...f, to_year: e.target.value }))} style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#64748b' }}>Tracked Keywords</label>
                  <select 
                    value={filterForm.keywords} 
                    onChange={e => setFilterForm(f => ({ ...f, keywords: e.target.value }))} 
                    style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    <option value="">All Keywords</option>
                    {keywords && keywords.map(kw => (
                      <option key={kw.id} value={kw.label}>{kw.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={filterForm.is_open_access} onChange={e => setFilterForm(f => ({ ...f, is_open_access: e.target.checked }))} />
                    Open Access Only
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button onClick={() => { setFilterForm({ from_year: '', to_year: '', keywords: '', is_open_access: false }); setFilters({}); setCurrentPage(1); setShowFilters(false); }} style={{ flex: 1, padding: '8px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Clear</button>
                  <button onClick={applyFilters} style={{ flex: 1, padding: '8px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Apply</button>
                </div>
              </div>
            )}
          </div>
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
                  currentPage={pagination.currentPage} 
                  totalPages={pagination.totalPages} 
                  totalItems={pagination.total} 
                  itemsPerPage={10} 
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>

          {/* Right Column - Panels */}
          <div className={styles.rightColumn}>
            <KeywordPanel keywords={keywords} onManageClick={() => setShowManageKeywords(true)} />
            <ExportPanel projectId={projectId} filters={filters} />
          </div>
        </div>

      </div>
      
      <DashboardFooter />

      {showManageKeywords && (
        <ManageKeywordsModal 
          projectId={projectId} 
          initialKeywords={keywords} 
          onSave={() => {
            setShowManageKeywords(false);
            refetch();
          }}
          onClose={() => setShowManageKeywords(false)} 
        />
      )}
    </div>
  );
};

export default CuratedArticlesPage;
