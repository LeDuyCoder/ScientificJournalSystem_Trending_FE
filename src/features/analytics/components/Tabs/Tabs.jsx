import React from 'react';
import styles from '../../styles/Analytics.module.css';

/**
 * Secondary navigation tabs
 */
export const Tabs = () => {
  return (
    <div className={styles.tabsContainer}>
      <div className={`${styles.tabItem} ${styles.tabItemActive}`}>Tracked Journals</div>
      <div className={styles.tabItem}>Curated Articles</div>
    </div>
  );
};
