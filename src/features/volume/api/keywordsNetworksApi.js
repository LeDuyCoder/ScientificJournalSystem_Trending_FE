export const fetchKeywordsNetworksData = (timeframe = 'daily') => {
  // TODO: Replace with actual backend API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          timeframe
        }
      });
    }, 500); // Simulate network delay
  });
};
