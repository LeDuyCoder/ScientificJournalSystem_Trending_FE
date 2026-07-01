import React from 'react';
import { Tabs } from '../components/Tabs/Tabs';
import { JournalTable } from '../components/JournalTable/JournalTable';
import { SummaryCards } from '../components/SummaryCards/SummaryCards';
import DashboardFooter from '../../../shared/components/layout/DashboardFooter';
import { journalData } from '../data/journalData';
import styles from '../styles/Analytics.module.css';

/**
 * ---------------------------------------------------------
 * Analytics Dashboard
 *
 * Displays the Scientia Analytics overview page.
 *
 * Issue:
 * #53
 *
 * Author:
 * Team Scientia
 * ---------------------------------------------------------
 */
export const AnalyticsDashboard = () => {
  return (
    <div className={styles.analyticsPage}>
      <Tabs />
      
      <div className={styles.pageContent}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Tracked Journals</h2>
          <p className={styles.pageDescription}>
            Manage your watchlist for bibliometric monitoring. These journals are currently indexed for<br/>
            real-time impact factor updates and citation frequency alerts.
          </p>
        </div>

        <JournalTable journals={journalData} />
        
        <SummaryCards />
      </div>
      <DashboardFooter />
    </div>
  );
};

export default AnalyticsDashboard;
