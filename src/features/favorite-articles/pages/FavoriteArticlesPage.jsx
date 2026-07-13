import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import { BiSortAlt2 } from 'react-icons/bi';
import { useFavoriteArticles } from '../hooks/useFavoriteArticles';
import { favoriteArticlesApi } from '../api/favoriteArticlesApi';
import { CuratedArticleCard } from '../../analytics/components/CuratedArticleCard/CuratedArticleCard';
import { Pagination } from '../../analytics/components/Pagination/Pagination';
import curatedStyles from '../../analytics/styles/curatedArticles.module.css';
import styles from '../styles/favoriteArticles.module.css';

const ITEMS_PER_PAGE = 10;

export default function FavoriteArticlesPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const projectId = id === 'default-id' || !id ? '1' : id;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortOption, setSortOption] = useState('recent');
  const [appliedFilters, setAppliedFilters] = useState({});
  const [filterForm, setFilterForm] = useState({
    from_year: '',
    to_year: '',
    keywords: '',
    is_open_access: false
  });
  
  const { articles, keywords, loading, error, refetch } = useFavoriteArticles(projectId);

  const handleBookmarkToggle = async (articleId, isBookmarking) => {
    try {
      if (isBookmarking) {
        await favoriteArticlesApi.bookmarkArticle(projectId, articleId, '');
      } else {
        await favoriteArticlesApi.unbookmarkArticle(projectId, articleId);
      }
      refetch();
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
      alert(t('favoriteArticles.toggleError', 'Failed to update bookmark. Please try again.'));
    }
  };

  // Ensure all articles from this page have isBookmarked = true
  const bookmarkedArticles = useMemo(() => {
    return articles.map(a => ({ ...a, isBookmarked: true }));
  }, [articles]);

  // Normalize special dashes (en-dash –, em-dash —) to regular hyphen for search
  const normalize = (str) => str?.toLowerCase().replace(/[\u2013\u2014]/g, '-') || '';



  const applyFilters = () => {
    const newFilters = {};
    if (filterForm.from_year) newFilters.from_year = parseInt(filterForm.from_year, 10);
    if (filterForm.to_year) newFilters.to_year = parseInt(filterForm.to_year, 10);
    if (filterForm.keywords) newFilters.keywords = filterForm.keywords;
    if (filterForm.is_open_access) newFilters.is_open_access = true;
    setAppliedFilters(newFilters);
    setCurrentPage(1);
    setShowFilters(false);
  };

  // Client-side filtering (Search + Filters)
  const filteredArticles = useMemo(() => {
    let result = bookmarkedArticles;

    // 1. Search term
    if (searchTerm) {
      const normalizedSearch = normalize(searchTerm);
      result = result.filter(article => 
        normalize(article.title).includes(normalizedSearch) || 
        normalize(article.description).includes(normalizedSearch) ||
        normalize(article.authors).includes(normalizedSearch) ||
        normalize(article.keywords).includes(normalizedSearch)
      );
    }

    // 2. Filters
    if (appliedFilters.from_year) {
      result = result.filter(article => article.publishedYear >= appliedFilters.from_year);
    }
    if (appliedFilters.to_year) {
      result = result.filter(article => article.publishedYear <= appliedFilters.to_year);
    }
    if (appliedFilters.keywords) {
      const searchKw = normalize(appliedFilters.keywords);
      result = result.filter(article => normalize(article.keywords).includes(searchKw));
    }
    if (appliedFilters.is_open_access) {
      result = result.filter(article => article.isOpenAccess);
    }

    // 3. Sort
    result = [...result];
    switch (sortOption) {
      case 'year_desc':
        result.sort((a, b) => (b.publishedYear || 0) - (a.publishedYear || 0));
        break;
      case 'year_asc':
        result.sort((a, b) => (a.publishedYear || 0) - (b.publishedYear || 0));
        break;
      case 'title_asc':
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'title_desc':
        result.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
        break;
      case 'recent':
      default:
        result.sort((a, b) => {
          // If addedAt exists, sort by it. Otherwise fallback to ID or preserve order.
          if (a.addedAt && b.addedAt) {
            return new Date(b.addedAt) - new Date(a.addedAt);
          }
          return 0; // The default order from API is already 'recent'
        });
        break;
    }

    return result;
  }, [bookmarkedArticles, searchTerm, appliedFilters, sortOption]);

  // Client-side pagination
  const totalItems = filteredArticles.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when search changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('dashboard.tabs.favoriteArticles', 'Favorite Articles')}</h2>
        <p className={styles.subtitle}>
          {t('favoriteArticles.subtitle', 'Review and manage your curated list of highly relevant bibliometric records and analytical sources.')}
        </p>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder={t('favoriteArticles.searchPlaceholder', 'Search articles by title, author, or keyword...')}
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.actions} style={{ position: 'relative', display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <button 
              className={`${styles.actionBtn} ${showFilters ? curatedStyles.active : ''}`}
              onClick={() => { setShowFilters(!showFilters); setShowSort(false); }}
            >
              <FiFilter size={16} /> {t('common.filter', 'Filter')}
            </button>
            
            {showFilters && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, width: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{t('analytics.filterArticles', 'Filter Articles')}</h4>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#64748b' }}>{t('analytics.fromYear', 'From Year')}</label>
                  <input type="number" placeholder="YYYY" value={filterForm.from_year} onChange={e => setFilterForm(f => ({ ...f, from_year: e.target.value }))} style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#64748b' }}>{t('analytics.toYear', 'To Year')}</label>
                  <input type="number" placeholder="YYYY" value={filterForm.to_year} onChange={e => setFilterForm(f => ({ ...f, to_year: e.target.value }))} style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#64748b' }}>{t('analytics.trackedKeywords', 'Tracked Keywords')}</label>
                <select 
                  value={filterForm.keywords} 
                  onChange={e => setFilterForm(f => ({ ...f, keywords: e.target.value }))} 
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  <option value="">{t('analytics.allKeywords', 'All Keywords')}</option>
                  {keywords && keywords.map(kw => (
                    <option key={kw.id} value={kw.label}>{kw.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={filterForm.is_open_access} onChange={e => setFilterForm(f => ({ ...f, is_open_access: e.target.checked }))} />
                  {t('analytics.openAccessOnly', 'Open Access Only')}
                </label>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button onClick={() => { setFilterForm({ from_year: '', to_year: '', keywords: '', is_open_access: false }); setAppliedFilters({}); setCurrentPage(1); setShowFilters(false); }} style={{ flex: 1, padding: '8px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>{t('common.cancel', 'Clear')}</button>
                <button onClick={applyFilters} style={{ flex: 1, padding: '8px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>{t('analytics.apply', 'Apply')}</button>
              </div>
            </div>
          )}
          </div>
          <div style={{ position: 'relative' }}>
            <button 
              className={`${styles.actionBtn} ${showSort ? curatedStyles.active : ''}`}
              onClick={() => { setShowSort(!showSort); setShowFilters(false); }}
            >
              <BiSortAlt2 size={16} /> {t('common.sort', 'Sort')}
            </button>

            {showSort && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: '#fff', padding: '12px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, width: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h4 style={{ margin: '0 0 8px 4px', fontSize: '14px', fontWeight: 600 }}>{t('common.sortBy', 'Sort by')}</h4>
                
                {[
                  { value: 'recent', label: t('sort.recentBookmarks', 'Recently Bookmarked') },
                  { value: 'year_desc', label: t('sort.newestYear', 'Year (Newest)') },
                  { value: 'year_asc', label: t('sort.oldestYear', 'Year (Oldest)') },
                  { value: 'title_asc', label: t('sort.titleAZ', 'Title (A-Z)') },
                  { value: 'title_desc', label: t('sort.titleZA', 'Title (Z-A)') }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortOption(option.value);
                      setCurrentPage(1);
                      setShowSort(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      background: sortOption === option.value ? '#FFF7F2' : 'transparent',
                      color: sortOption === option.value ? '#f97316' : '#334155',
                      border: 'none',
                      borderRadius: '4px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: sortOption === option.value ? 600 : 400
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className={styles.emptyState}>{t('common.loading', 'Loading...')}</div>
      ) : error ? (
        <div className={styles.emptyState}>{t('common.error', 'Error')}: {error}</div>
      ) : filteredArticles.length === 0 ? (
        <div className={styles.emptyState}>
          {searchTerm ? t('favoriteArticles.noResults', 'No articles match your search.') : t('favoriteArticles.empty', 'No favorite articles found. Bookmark some articles from the Curated Articles page.')}
        </div>
      ) : (
        <>
          <div className={curatedStyles.leftColumn}>
            {paginatedArticles.map(article => (
              <CuratedArticleCard 
                key={article.id} 
                article={article} 
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>

          {totalPages > 0 && (
            <div className={curatedStyles.paginationWrapper}>
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                totalItems={totalItems} 
                itemsPerPage={ITEMS_PER_PAGE} 
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
