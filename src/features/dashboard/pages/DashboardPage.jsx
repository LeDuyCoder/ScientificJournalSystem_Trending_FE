import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardContainer from '../components/DashboardContainer';
import DashboardStack from '../../../shared/components/layout/DashboardStack';
import DashboardFilters from '../components/DashboardFilters';
import DashboardFooter from '../../../shared/components/layout/DashboardFooter';
import DashboardTabs from '../components/DashboardTabs';
import GlobalEcosystemPage from '../../global-ecosystem/pages/GlobalEcosystemPage';
import DevelopmentTrendsPage from '../../development-trends/pages/DevelopmentTrendsPage';
import FavoriteArticlesPage from '../../favorite-articles/pages/FavoriteArticlesPage';
import { DashboardProvider, useDashboardContext } from '../contexts/DashboardContext';
import ErrorStateSection from '../../../shared/components/common/ErrorStateSection';
import { useParams } from 'react-router-dom';

const placeholderStyle = {
  background: 'var(--color-surface)',
  border: 'var(--border-light)',
  borderStyle: 'dashed',
  borderRadius: 'var(--radius-md)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--color-neutral-500)',
  fontSize: 'var(--font-size-body)',
};

const DashboardContent = () => {
  const { t } = useTranslation();
  const { error, refreshData } = useDashboardContext();
  const [activeTab, setActiveTab] = useState('global-ecosystem');

  const tabs = [
    {
      id: 'global-ecosystem',
      label: t('dashboard.tabs.globalEcosystem', 'Global Ecosystem'),
      content: <GlobalEcosystemPage />
    },
    {
      id: 'development-trends',
      label: t('dashboard.tabs.developmentTrends', 'Development & Trends'),
      content: <DevelopmentTrendsPage />
    },
    {
      id: 'favorite-articles',
      label: t('dashboard.tabs.favoriteArticles', 'Favorite Articles'),
      content: <FavoriteArticlesPage />
    }
  ];

  const renderContent = () => {
    if (error) {
      return (
        <ErrorStateSection 
          title={t('common.error', 'Dashboard Loading Failed')}
          message={t('dashboard.loadingFailedDesc', 'Unable to load dashboard data. Please check your connection or try again.')}
          onRetry={refreshData}
          minHeight={400}
        />
      );
    }

    return (
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    );
  };

  return (
    <>
      <DashboardContainer>
        <DashboardStack>
          <DashboardFilters />
          {renderContent()}
        </DashboardStack>
      </DashboardContainer>

      <DashboardFooter />
    </>
  );
};

export default function DashboardPage() {
  return <DashboardContent />;
}
