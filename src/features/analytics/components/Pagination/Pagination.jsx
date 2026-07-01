import React from 'react';
import layoutStyles from '../../styles/Analytics.module.css'; // Using the styles from analytics for pagination buttons

/**
 * Pagination Component
 * 
 * @param {Object} props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total pages
 * @param {number} props.totalItems - Total items
 * @param {number} props.itemsPerPage - Items per page
 */
export const Pagination = ({ currentPage = 1, totalPages = 1, totalItems = 0, itemsPerPage = 0 }) => {
  return (
    <div className={layoutStyles.pagination}>
      <span className={layoutStyles.paginationText}>
        Showing {totalItems} of {totalItems} items
      </span>
      <div className={layoutStyles.paginationControls}>
        <button className={`${layoutStyles.btn} ${layoutStyles.btnOutline}`} disabled={currentPage <= 1}>Previous</button>
        <button className={`${layoutStyles.btn} ${layoutStyles.btnOutline}`} disabled={currentPage >= totalPages}>Next</button>
      </div>
    </div>
  );
};
