import React from 'react';
import ErrorState from './ErrorState';
import './ErrorStateSection.css';

/**
 * ErrorStateSection wraps ErrorState with consistent page spacing and sizing.
 * Use this for full-section/page-level failed data states.
 */
const ErrorStateSection = ({
  title,
  message,
  onRetry,
  className = '',
  minHeight = 300,
}) => {
  const sectionStyle = {
    '--error-section-min-height': typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
  };

  return (
    <section
      className={`modern-error-section ${className}`.trim()}
      style={sectionStyle}
      aria-live="polite"
    >
      <ErrorState title={title} message={message} onRetry={onRetry} />
    </section>
  );
};

export default ErrorStateSection;
