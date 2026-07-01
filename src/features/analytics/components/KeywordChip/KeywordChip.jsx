import React from 'react';
import styles from '../../styles/curatedArticles.module.css';

/**
 * KeywordChip Component
 * Reusable component for displaying a keyword.
 * 
 * @param {Object} props
 * @param {string} props.label - The keyword text
 */
export const KeywordChip = ({ label }) => {
  return (
    <div className={styles.keywordChip}>
      {label}
    </div>
  );
};
