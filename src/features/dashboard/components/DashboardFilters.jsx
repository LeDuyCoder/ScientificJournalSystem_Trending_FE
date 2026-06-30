import React from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';
import { useDashboardContext } from '../contexts/DashboardContext';
import '../styles/DashboardFilters.css';

const TIMEFRAME_OPTIONS = [
  'Last Year',
  'Last 3 Years',
  'Last 5 Years',
  'Last 10 Years'
];

const DOMAIN_OPTIONS = [
  'All Domains',
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
  const { filters, updateFilter, refreshData, loading } = useDashboardContext();

  const handleUpdate = () => {
    refreshData();
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
              value={filters.timeframe}
              onChange={(e) => updateFilter('timeframe', e.target.value)}
            >
              {TIMEFRAME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="dashboard-filter-group">
            <label htmlFor="domain-select" className="visually-hidden">Domain</label>
            <select 
              id="domain-select"
              className="dashboard-filter-select"
              value={filters.domain}
              onChange={(e) => updateFilter('domain', e.target.value)}
            >
              {DOMAIN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="dashboard-filter-group">
            <label htmlFor="region-select" className="visually-hidden">Region</label>
            <select 
              id="region-select"
              className="dashboard-filter-select"
              value={filters.region}
              onChange={(e) => updateFilter('region', e.target.value)}
            >
              {REGION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <button 
          className={`dashboard-update-btn ${loading ? 'loading' : ''}`}
          onClick={handleUpdate}
          disabled={loading}
          aria-live="polite"
        >
          <FiRefreshCw className={`update-icon ${loading ? 'spin' : ''}`} aria-hidden="true" />
          {loading ? 'Updating...' : 'Update Analysis'}
        </button>
      </div>

      <div className="dashboard-filter-chips">
        <div className="dashboard-chip">
          <span className="chip-label">Timeframe:</span>
          <span className="chip-value">{filters.timeframe}</span>
        </div>
        <div className="dashboard-chip">
          <span className="chip-label">Domain:</span>
          <span className="chip-value">{filters.domain}</span>
        </div>
        <div className="dashboard-chip">
          <span className="chip-label">Region:</span>
          <span className="chip-value">{filters.region}</span>
        </div>
      </div>
    </div>
  );
}
