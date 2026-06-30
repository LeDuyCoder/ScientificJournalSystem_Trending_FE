import { FiSearch } from 'react-icons/fi';
import './Header.css';

/**
 * SearchInput component
 * Renders a controlled search input with a search icon nested inside.
 */
const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Search research, journals, or authors..." 
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
    </div>
  );
};

export default SearchInput;
