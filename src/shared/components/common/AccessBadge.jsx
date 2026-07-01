import React from 'react';
import styles from './AccessBadge.module.css';

/**
 * AccessBadge Component
 * Displays an Open Access or Restricted Access badge
 * 
 * @param {Object} props
 * @param {boolean} props.isOpenAccess - true if open access, false otherwise
 */
export const AccessBadge = ({ isOpenAccess }) => {
  return (
    <span className={`${styles.badge} ${isOpenAccess ? styles.openAccess : styles.restrictedAccess}`}>
      {isOpenAccess ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Open Access
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0"></path>
          </svg>
          Restricted Access
        </>
      )}
    </span>
  );
};
