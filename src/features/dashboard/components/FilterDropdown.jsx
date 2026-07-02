import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import './FilterDropdown.css';

/**
 * FilterDropdown - Custom dropdown component with search and checkbox list
 */
export default function FilterDropdown({ 
  title, 
  value, 
  options, 
  onChange, 
  defaultValue,
  searchable = true
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search query
  const filteredOptions = options.filter(opt => {
    const label = typeof opt === 'string' ? opt : opt.name;
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelect = (optValue) => {
    onChange(optValue);
    setIsOpen(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    onChange(defaultValue);
    setIsOpen(false);
  };

  const displayLabel = typeof value === 'string' ? value : value;

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <button
        type="button"
        className={`filter-dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="filter-dropdown-trigger-text">{displayLabel}</span>
        <FiChevronDown className={`filter-dropdown-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          <div className="filter-dropdown-header">
            <span className="filter-dropdown-title">{title}</span>
            {value !== defaultValue && (
              <button type="button" className="filter-dropdown-reset" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>

          {searchable && options.length > 5 && (
            <div className="filter-dropdown-search-wrapper">
              <FiSearch className="filter-dropdown-search-icon" />
              <input
                type="text"
                className="filter-dropdown-search-input"
                placeholder="Search values"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          )}

          <div className="filter-dropdown-options-list">
            {filteredOptions.map((opt, index) => {
              const optVal = typeof opt === 'string' ? opt : opt.name;
              const optId = typeof opt === 'string' ? opt : opt.id;
              const isChecked = value === optVal;

              return (
                <div
                  key={optId || index}
                  className={`filter-dropdown-option-item ${isChecked ? 'selected' : ''}`}
                  onClick={() => handleSelect(optVal)}
                >
                  <div className={`filter-dropdown-custom-checkbox ${isChecked ? 'checked' : ''}`}>
                    {isChecked && <span className="checkmark">✓</span>}
                  </div>
                  <span className="filter-dropdown-option-label">{optVal}</span>
                </div>
              );
            })}
            {filteredOptions.length === 0 && (
              <div className="filter-dropdown-no-results">No values found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
