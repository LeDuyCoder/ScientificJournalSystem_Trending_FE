import React from 'react';
import { KeywordChip } from '../KeywordChip/KeywordChip';
import styles from '../../styles/curatedArticles.module.css';

/**
 * KeywordPanel Component
 * Displays a panel with a list of keyword chips and a manage button.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.keywords - List of keyword objects
 */
export const KeywordPanel = ({ keywords = [], onManageClick }) => {
  return (
    <div className={styles.panelCard}>
      <h3 className={styles.panelTitle}>Keywords</h3>
      <div className={styles.keywordChips}>
        {keywords.map(kw => (
          <KeywordChip key={kw.id} label={kw.label} />
        ))}
      </div>
      <button className={styles.manageKeywordsBtn} onClick={onManageClick}>Manage Keywords</button>
    </div>
  );
};
