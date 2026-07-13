import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/Analytics.module.css';

/**
 * Simple Sparkline component using SVG for the trend column
 * @param {Array<number>} data - Array of data points
 */
const Sparkline = ({ data }) => {
  if (!data || data.length === 0) {
    return <span style={{ color: 'var(--color-neutral-400)', fontSize: '12px' }}>No trend data</span>;
  }

  // Safeguard for single data point
  const pointsData = data.length === 1 ? [data[0], data[0]] : data;
  const min = Math.min(...pointsData);
  const max = Math.max(...pointsData);
  const range = max - min === 0 ? 1 : max - min;
  const width = 100;
  const height = 30;

  const points = pointsData.map((val, i) => {
    const x = (i / (pointsData.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className={styles.trendSparkline}>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

/**
 * Table displaying tracked journals
 * @param {Array<Object>} journals - List of journal data
 */
export const JournalTable = ({ journals, page = 1, limit = 4, totalCount = 0, onPrevPage, onNextPage }) => {
  const { t } = useTranslation();
  const startIndex = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const endIndex = Math.min(totalCount, page * limit);
  const hasPrev = page > 1;
  const hasNext = page * limit < totalCount;

  return (
    <div className={styles.tableCardContainer}>
      <table className={styles.journalTable}>
        <thead>
          <tr>
            <th>{t('analytics.journalName', 'Journal Name')}</th>
            <th>{t('analytics.issn', 'ISSN')}</th>
            <th>{t('analytics.impactFactor', 'Impact Factor')}</th>
            <th>{t('analytics.sjrRank', 'SJR Rank')}</th>
            <th>{t('analytics.trend', 'Trend')}</th>
            <th>{t('analytics.actions', 'Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {journals.map((journal) => (
            <tr key={journal.id}>
              <td>
                <div className={styles.journalInfo}>
                  <div className={styles.journalCover}>
                    <span style={{ color: '#999', fontSize: '12px', fontWeight: 'bold' }}>
                      {journal.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className={styles.journalTitle}>{journal.name}</h3>
                    <p className={styles.journalPublisher}>{t('analytics.publishedBy', 'Published by')} {journal.publisher}</p>
                  </div>
                </div>
              </td>
              <td className={styles.issn}>{journal.issn}</td>
              <td className={styles.impactFactor}>{journal.impactFactor?.toFixed(2) || '0.00'}</td>
              <td>
                <span className={styles.sjrBadge}>{journal.sjrRank}</span>
              </td>
              <td>
                <Sparkline data={journal.trend} />
              </td>
              <td>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => console.log('View detail:', journal.id)}>{t('common.view', 'View')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <span className={styles.paginationText}>
          {t('analytics.showingTracked', {
            start: startIndex,
            end: endIndex,
            total: totalCount,
            defaultValue: `Showing ${startIndex}-${endIndex} of ${totalCount} tracked journals`
          })}
        </span>
        <div className={styles.paginationControls}>
          <button
            className={`${styles.btn} ${styles.btnOutline}`}
            onClick={onPrevPage}
            disabled={!hasPrev}
            style={{ opacity: hasPrev ? 1 : 0.5, cursor: hasPrev ? 'pointer' : 'not-allowed' }}
          >
            {t('common.previous', 'Previous')}
          </button>
          <button
            className={`${styles.btn} ${styles.btnOutline}`}
            onClick={onNextPage}
            disabled={!hasNext}
            style={{ opacity: hasNext ? 1 : 0.5, cursor: hasNext ? 'pointer' : 'not-allowed' }}
          >
            {t('common.next', 'Next')}
          </button>
        </div>
      </div>
    </div>
  );
};
