import { useState, useEffect } from 'react';
import { keywordsNetworksMock } from '../constants/keywordsNetworksMock';
import { fetchKeywordsNetworksData } from '../api/keywordsNetworksApi';

export const useKeywordsNetworks = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call and latency
      await fetchKeywordsNetworksData();
      setTimeout(() => {
        setData(keywordsNetworksMock);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
};
