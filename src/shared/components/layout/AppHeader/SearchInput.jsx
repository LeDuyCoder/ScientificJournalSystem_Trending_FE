import { FiSearch } from 'react-icons/fi';
import './Header.css';

/**
 * SearchInput component
 * Renders a controlled search input with a search icon nested inside.
 */
const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Search research, journals, or authors...",
  results = [],
  isLoading = false
}) => {
  return (
    <div className="header-search-container">
      <FiSearch className="header-search-icon" aria-hidden="true" />
      <input
        type="text"
        className="header-search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Search inputs"
      />
      
      {value.length >= 2 && (
        <div className="header-search-dropdown" style={{
          position: 'absolute',
          top: '45px',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          zIndex: 100,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {isLoading ? (
            <div style={{ padding: '12px', color: '#6b7280', fontSize: '13px' }}>Searching...</div>
          ) : results && results.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {results.map((item, index) => (
                <li key={index} style={{
                  padding: '10px 14px',
                  borderBottom: '1px solid #f3f4f6',
                  fontSize: '13px',
                  color: '#1f2937',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <div style={{ fontWeight: '500' }}>{item.name || item.title}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{item.type.toUpperCase()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ padding: '12px', color: '#6b7280', fontSize: '13px' }}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
