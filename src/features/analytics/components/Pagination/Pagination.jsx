import React from 'react';
import styles from './Pagination.module.css';

/**
 * Pagination Component
 * 
 * @param {Object} props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total pages
 * @param {number} props.totalItems - Total items
 * @param {number} props.pageSize - Items per page
 * @param {Function} props.onPageChange - Callback for page changes
 */
export const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  totalItems = 0, 
  pageSize, 
  itemsPerPage, 
  onPageChange 
}) => {
  // Support both pageSize and legacy itemsPerPage
  const size = pageSize || itemsPerPage || 10;
  
  // Calculate display range
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * size + 1;
  const endItem = Math.min(currentPage * size, totalItems);

  // Generate pagination buttons array
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Showing {startItem} to {endItem} of {totalItems} results
      </div>
      
      <div className={styles.controls}>
        <button 
          className={`${styles.btn} ${currentPage <= 1 ? styles.btnDisabled : ''}`}
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>;
          }
          return (
            <button
              key={page}
              className={`${styles.btn} ${currentPage === page ? styles.btnActive : ''}`}
              onClick={() => onPageChange && onPageChange(page)}
            >
              {page}
            </button>
          );
        })}

        <button 
          className={`${styles.btn} ${currentPage >= totalPages ? styles.btnDisabled : ''}`}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};
