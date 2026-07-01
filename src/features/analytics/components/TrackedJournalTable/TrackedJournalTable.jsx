import React from 'react';
import styles from '../../styles/Analytics.module.css';

/**
 * Simple Sparkline component using SVG for the trend column
 */
const Sparkline = ({ data }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const width = 100;
  const height = 30;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
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
export const TrackedJournalTable = ({ journals = [] }) => {
  return (
    <div className={styles.tableCardContainer}>
      <table className={styles.journalTable}>
        <thead>
          <tr>
            <th>Journal Name</th>
            <th>ISSN</th>
            <th>Impact Score</th>
            <th>Trend</th>
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
                    <p className={styles.journalPublisher}>Published by {journal.publisher}</p>
                  </div>
                </div>
              </td>
              <td className={styles.issn}>{journal.issn}</td>
              <td className={styles.impactFactor}>{journal.impactFactor}</td>
              <td>
                <Sparkline data={journal.trend || [0, 0]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
