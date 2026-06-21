import React, { useState } from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';
import './DashboardFilters.css';

const TIMEFRAME_OPTIONS = [
  'Last Year',
  'Last 3 Years',
  'Last 5 Years',
  'Last 10 Years'
];

const DOMAIN_OPTIONS = [
  'Biological Sciences',
  'Medical Research',
  'Computer Science',
  'Environmental Science'
];

const REGION_OPTIONS = [
  'Global Distribution',
  'North America',
  'Europe',
  'Asia-Pacific'
];

/**
 * DashboardFilters implements the filter control system.
 * Allows timeframe, domain, and region selection with an update action.
 */
export default function DashboardFilters() {
  const [timeframe, setTimeframe] = useState(TIMEFRAME_OPTIONS[2]); // Last 5 Years
  const [domain, setDomain] = useState(DOMAIN_OPTIONS[0]); // Biological Sciences
  const [region, setRegion] = useState(REGION_OPTIONS[0]); // Global Distribution
  
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    // Mock timeout for loading state
    setTimeout(() => {
      setIsUpdating(false);
    }, 1500);
  };

  return (
    <div className="dashboard-filters">
      <div className="dashboard-filters-top">
        <div className="dashboard-filters-controls">
          <div className="dashboard-filter-label">
            <FiFilter aria-hidden="true" />
            <span>Filters</span>
          </div>
          
          <div className="dashboard-filter-group">
            <label htmlFor="timeframe-select" className="visually-hidden">Timeframe</label>
            <select 
              id="timeframe-select"
              className="dashboard-filter-select"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              {TIMEFRAME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="dashboard-filter-group">
            <label htmlFor="domain-select" className="visually-hidden">Domain</label>
            <select 
              id="domain-select"
              className="dashboard-filter-select"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              {DOMAIN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="dashboard-filter-group">
            <label htmlFor="region-select" className="visually-hidden">Region</label>
            <select 
              id="region-select"
              className="dashboard-filter-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              {REGION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <button 
          className={`dashboard-update-btn ${isUpdating ? 'loading' : ''}`}
          onClick={handleUpdate}
          disabled={isUpdating}
          aria-live="polite"
        >
          <FiRefreshCw className={`update-icon ${isUpdating ? 'spin' : ''}`} aria-hidden="true" />
          {isUpdating ? 'Updating...' : 'Update Analysis'}
        </button>
      </div>

      <div className="dashboard-filter-chips">
        <div className="dashboard-chip">
          <span className="chip-label">Timeframe:</span>
          <span className="chip-value">{timeframe}</span>
        </div>
        <div className="dashboard-chip">
          <span className="chip-label">Domain:</span>
          <span className="chip-value">{domain}</span>
        </div>
        <div className="dashboard-chip">
          <span className="chip-label">Region:</span>
          <span className="chip-value">{region}</span>
        </div>
      </div>
    </div>
  );
}
