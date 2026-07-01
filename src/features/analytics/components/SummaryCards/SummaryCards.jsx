import React from 'react';
import Card from '../../../../shared/components/common/Card';
import { MdTrendingUp, MdAutorenew, MdFlashOn } from 'react-icons/md';
import styles from '../../styles/Analytics.module.css';

/**
 * Container for summary metrics cards
 */
export const SummaryCards = () => {
  return (
    <div className={styles.summaryCardsContainer}>
      
      {/* Average IF Score Card */}
      <Card className={styles.summaryCard}>
        <div className={styles.summaryCardHeader}>
          <span>Average IF Score</span>
          <MdTrendingUp size={20} color="var(--color-primary-orange, #ff6b00)" />
        </div>
        <div className={styles.summaryCardValue}>10.15</div>
        <div className={styles.summaryCardSubtext}>+1.2% from last month</div>
      </Card>

      {/* Tracking Usage Card */}
      <Card className={styles.summaryCard}>
        <div className={styles.summaryCardHeader}>
          <span>Tracking Usage</span>
          <MdAutorenew size={20} color="var(--color-neutral-500, #666666)" />
        </div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: '48%' }}></div>
        </div>
        <div className={styles.summaryCardSubtext}>48 / 100 limit reached</div>
      </Card>

      {/* Auto-Refresh Status Card */}
      <Card className={styles.summaryCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', height: '100%' }}>
          <div className={styles.autoRefreshIcon}>
            <MdFlashOn />
          </div>
          <div className={styles.autoRefreshContent}>
            <h3>Auto-Refresh Active</h3>
            <p className={styles.summaryCardSubtext} style={{ margin: 0 }}>Next update in 12h 43m</p>
          </div>
        </div>
      </Card>

    </div>
  );
};
