import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  let displayMessage = message;
  const lowercaseMsg = String(message || '').toLowerCase();

  if (
    lowercaseMsg.includes('chưa đăng nhập') || 
    lowercaseMsg.includes('phiên làm việc') || 
    lowercaseMsg.includes('hết hạn') || 
    lowercaseMsg.includes('unauthorized') || 
    lowercaseMsg.includes('login') || 
    lowercaseMsg.includes('session')
  ) {
    displayMessage = t('common.sessionExpired', 'You are not logged in or your session has expired.');
  }

  return (
    <div className="modern-error-state-container">
      <div className="modern-error-state-content">
        <div className="modern-error-icon-wrapper">
          <FiAlertTriangle className="modern-error-icon" />
        </div>
        <h3 className="modern-error-title">{title}</h3>
        <p className="modern-error-message">{displayMessage}</p>
        {onRetry && (
          <button type="button" className="modern-error-retry-btn" onClick={onRetry}>
            <FiRefreshCw className="retry-icon" />
            <span>{t('common.retry', 'Try Again')}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
