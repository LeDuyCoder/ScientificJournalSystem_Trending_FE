import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';
import styles from '../../styles/Analytics.module.css';

/**
 * Secondary navigation tabs
 */
export const Tabs = () => {
  const { t } = useTranslation();
  const { id, lang } = useParams();
  const currentLang = lang || 'en';
  
  return (
    <div className={styles.tabsContainer}>
      <NavLink 
        to={`/${currentLang}/project/${id || 'default-id'}/analytics`} 
        end
        className={({ isActive }) => `${styles.tabItem} ${isActive ? styles.tabItemActive : ''}`}
      >
        {t('analytics.trackedJournals', 'Tracked Journals')}
      </NavLink>
      <NavLink 
        to={`/${currentLang}/project/${id || 'default-id'}/analytics/curated-articles`} 
        className={({ isActive }) => `${styles.tabItem} ${isActive ? styles.tabItemActive : ''}`}
      >
        {t('analytics.curatedArticles', 'Curated Articles')}
      </NavLink>
    </div>
  );
};
