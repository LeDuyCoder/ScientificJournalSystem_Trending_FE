import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from '../../styles/Analytics.module.css';

/**
 * Secondary navigation tabs
 */
export const Tabs = () => {
  const { id } = useParams();
  
  return (
    <div className={styles.tabsContainer}>
      <NavLink 
        to={`/project/${id || 'default-id'}/analytics`} 
        end
        className={({ isActive }) => `${styles.tabItem} ${isActive ? styles.tabItemActive : ''}`}
      >
        Tracked Journals
      </NavLink>
      <NavLink 
        to={`/project/${id || 'default-id'}/analytics/curated-articles`} 
        className={({ isActive }) => `${styles.tabItem} ${isActive ? styles.tabItemActive : ''}`}
      >
        Curated Articles
      </NavLink>
    </div>
  );
};
