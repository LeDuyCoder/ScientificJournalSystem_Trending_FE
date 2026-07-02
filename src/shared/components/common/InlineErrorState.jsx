import React from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import './InlineErrorState.css';

/**
 * InlineErrorState is a compact reusable error state for cards/widgets.
 */
const InlineErrorState = ({
  title = 'Network Error',
  message = 'Unable to load this section. Please try again.',
  onRetry,
  minHeight = 180,
}) => {
  const style = {
    '--inline-error-min-height': typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
  };

  return (
    <div className="inline-error-state" style={style} role="status" aria-live="polite">
      <div className="inline-error-icon-wrap">
        <FiAlertTriangle className="inline-error-icon" aria-hidden="true" />
      </div>
      <div className="inline-error-copy">
        <h4>{title}</h4>
        {message && <p>{message}</p>}
      </div>
      {onRetry && (
        <button type="button" className="inline-error-retry" onClick={onRetry}>
          <FiRefreshCw aria-hidden="true" />
          Retry
        </button>
      )}
    </div>
  );
};

export default InlineErrorState;
