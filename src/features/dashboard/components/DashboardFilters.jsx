import React, { useState, useEffect } from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';
import { useDashboardContext } from '../contexts/DashboardContext';
import apiClient from '../../../shared/api/axios';
import '../styles/DashboardFilters.css';

const TIMEFRAME_OPTIONS = [
  'Last Year',
  'Last 3 Years',
  'Last 5 Years',
  'Last 10 Years'
];

const REGION_OPTIONS = [
  'Global Distribution',
  'North America',
  'Europe',
  'Asia-Pacific'
];

export default function DashboardFilters() {
  const { filters, updateFilter, refreshData, loading, projectId } = useDashboardContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryProjectId = searchParams.get('project_id') || searchParams.get('projectId');
    const rawProjectId = (projectId && projectId !== 'default-id')
      ? projectId
      : (queryProjectId && queryProjectId !== 'default-id' ? queryProjectId : undefined);

    const cleanProjectId = rawProjectId && !isNaN(Number(rawProjectId))
      ? Number(rawProjectId)
      : undefined;

    const loadCategories = async () => {
      try {
        const res = await apiClient.get(`/analytics/subject-categories`, {
          params: { project_id: cleanProjectId }
        });
        if (res && res.data) {
          if (Array.isArray(res.data)) {
            setCategories(res.data);
          } else if (Array.isArray(res.data.data)) {
            setCategories(res.data.data);
          } else {
            setCategories([]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch project subject categories:', err);
        setCategories([]);
      }
    };
    loadCategories();
  }, [projectId, window.location.search]);

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
            <label htmlFor="category-select" className="visually-hidden">Subject Category</label>
            <select
              id="category-select"
              className="dashboard-filter-select"
              value={filters.subject_category}
              onChange={(e) => updateFilter('subject_category', e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              {Array.isArray(categories) && categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
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
          <span className="chip-label">Subject Category:</span>
          <span className="chip-value">{filters.subject_category}</span>
        </div>
        <div className="dashboard-chip">
          <span className="chip-label">Region:</span>
          <span className="chip-value">{filters.region}</span>
        </div>
      </div>
    </div>
  );
}
