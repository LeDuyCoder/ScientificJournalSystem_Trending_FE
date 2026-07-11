import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchInput from './SearchInput';
import IconButton from './IconButton';
import { headerConfig } from './header.config';
import { useDashboardSearchQuery } from '../../../hooks/useDashboardSearch';
import LanguageSelector from '../../common/LanguageSelector';
import './Header.css';

/**
 * AppHeader component
 * Orchestrates search input on the left and actions + user profile on the right.
 * Supports sticky header configuration.
 */
const AppHeader = ({
  sticky = true,
  onSearch,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [searchSort, setSearchSort] = useState('relevance');
  const [searchPage, setSearchPage] = useState(1);
  const pathProjectId = location.pathname.match(/\/project\/([^/]+)/)?.[1];
  const rawProjectId = id || pathProjectId;
  const projectId = rawProjectId && rawProjectId !== 'default-id' ? rawProjectId : undefined;
  const canSearchInProject = Boolean(projectId);
  const {
    data: searchResults,
    searchData,
    counts: searchCounts,
    total: searchTotal,
    totalPages: searchTotalPages,
    isLoading: isSearchLoading,
    isStreaming: isSearchStreaming,
    error: searchError,
  } = useDashboardSearchQuery(searchValue, searchType, {
    projectId,
    page: searchPage,
    limit: 8,
    sort: searchSort,
    enabled: canSearchInProject,
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearchPage(1);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleTypeChange = (type) => {
    setSearchType(type);
    setSearchPage(1);
  };

  const handleSortChange = (sort) => {
    setSearchSort(sort);
    setSearchPage(1);
  };

  const handleResultSelect = (item) => {
    if (item?.detailPath) {
      navigate(item.detailPath);
    }
  };

  return (
    <header className={`dashboard-header ${sticky ? 'sticky' : ''}`}>
      <div className="header-left">
        <SearchInput 
          value={canSearchInProject ? searchValue : ''} 
          onChange={handleSearchChange} 
          placeholder={canSearchInProject ? t('header.searchPlaceholder') : t('header.selectProject')}
          disabled={!canSearchInProject}
          results={searchResults}
          counts={searchCounts}
          total={searchTotal}
          page={searchData.page}
          totalPages={searchTotalPages}
          activeType={searchType}
          sort={searchSort}
          isLoading={isSearchLoading}
          isStreaming={isSearchStreaming}
          error={searchError}
          onTypeChange={handleTypeChange}
          onSortChange={handleSortChange}
          onPageChange={setSearchPage}
          onResultSelect={handleResultSelect}
        />
      </div>
      <div className="header-right">
        <div className="header-actions">
          {headerConfig.icons.map((iconConfig) => (
            <IconButton 
              key={iconConfig.id}
              icon={iconConfig.icon} 
              onClick={() => console.log(`${iconConfig.id} clicked`)} 
              ariaLabel={t(`header.${iconConfig.id}`)} 
              badge={iconConfig.badge}
            />
          ))}
        </div>
        <div className="header-divider"></div>
        <LanguageSelector />
      </div>
    </header>
  );
};

export default AppHeader;
