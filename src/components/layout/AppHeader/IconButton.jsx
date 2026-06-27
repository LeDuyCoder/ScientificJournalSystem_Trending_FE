
import './Header.css';

/**
 * Reusable IconButton component
 * Renders a button containing an icon with built-in hover/active styles,
 * ARIA accessibility support, and optional notification badge counts.
 */
const IconButton = ({ 
  icon: IconComponent, 
  onClick, 
  ariaLabel, 
  badge, 
  className = '' 
}) => {
  return (
    <button
      type="button"
      className={`header-icon-button ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      title={ariaLabel} // Provide native tooltip matching the aria-label
    >
      <div className="header-icon-wrapper">
        <IconComponent className="header-icon" aria-hidden="true" />
        {badge !== undefined && badge !== null && badge > 0 && (
          <span className="header-icon-badge" aria-hidden="true">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </div>
    </button>
  );
};

export default IconButton;
