import { useState, useEffect, useCallback } from 'react';
import { fetchKeywordsNetworksData } from '../api/keywordsNetworksApi';
import { MOCK_TREND_VECTORS, MOCK_COUNTRY_COLLAB, MOCK_TEMPORAL_SHIFT } from '../constants/keywordsNetworksMock';

export const useKeywordsNetworks = (initialTimeframe = 'monthly') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState(initialTimeframe);

  const fetchData = useCallback(async (currentTimeframe) => {
    setIsLoading(true);
    setError(null);
    try {
      await fetchKeywordsNetworksData(currentTimeframe);
      // Constructing mock response based on timeframe
      setData({
        trendVectors: MOCK_TREND_VECTORS[currentTimeframe],
        countryCollab: MOCK_COUNTRY_COLLAB,
        temporalShift: MOCK_TEMPORAL_SHIFT,
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(timeframe);
  }, [timeframe, fetchData]);

  const refetch = (newTimeframe) => {
    if (newTimeframe) {
      setTimeframe(newTimeframe);
    } else {
      fetchData(timeframe);
    }
  };

  return { data, isLoading, error, refetch, timeframe };
};
