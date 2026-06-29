import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchDashboardData } from '../services/dashboardDataService';

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    timeframe: 'Last 5 Years',
    domain: 'Biological Sciences',
    region: 'Global Distribution'
  });

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardData(filters);
      setDashboardData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Unable to load dashboard data. Try again later.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initial load
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshData();
  }, [refreshData]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const value = {
    filters,
    updateFilter,
    dashboardData,
    loading,
    error,
    lastUpdated,
    refreshData
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
