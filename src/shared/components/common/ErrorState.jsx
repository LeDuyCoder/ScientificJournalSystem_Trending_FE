import React from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import './ErrorState.css';

/**
 * A beautiful, modern error state component for failed data loads.
 */
const ErrorState = ({ 
  title = "Something went wrong", 
  message = "We encountered an issue while loading this data. Please try again later.", 
  onRetry 
}) => {
  return (
    <div className="modern-error-state-container">
      <div className="modern-error-state-content">
        <div className="modern-error-icon-wrapper">
          <FiAlertTriangle className="modern-error-icon" />
        </div>
        <h3 className="modern-error-title">{title}</h3>
        <p className="modern-error-message">{message}</p>
        {onRetry && (
          <button type="button" className="modern-error-retry-btn" onClick={onRetry}>
            <FiRefreshCw className="retry-icon" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
