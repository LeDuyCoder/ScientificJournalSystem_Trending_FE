import React from 'react';
import './Card.css';

/**
 * Reusable Card component for dashboard widgets, charts, and content.
 */
const Card = ({ title, subtitle, actions, children, className = '' }) => {
  return (
    <div className={`ds-card ${className}`}>
      {(title || subtitle || actions) && (
        <div className="ds-card-header">
          <div className="ds-card-header-content">
            {title && <h3 className="ds-card-title">{title}</h3>}
            {subtitle && <p className="ds-card-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="ds-card-actions">{actions}</div>}
        </div>
      )}
      <div className="ds-card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
