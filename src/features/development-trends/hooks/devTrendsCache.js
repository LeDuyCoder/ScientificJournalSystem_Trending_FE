// Shared constants & helpers for Development Trends TanStack cache lookup.
// Preloader (AnalysisPreloader) prefetches the trends payload once with these
// exact filter values. We expose them here so hooks in this feature can
// look up the cached response synchronously via placeholderData.

export const DEV_TRENDS_PRELOADER_FILTERS = {
  timeframe: 'Last 5 Years',
  domain: 'All Domains',
  subject_category: 'All Categories',
  region: 'Global Distribution',
};

export const getPreloadedDevTrends = (queryClient, projectId) => {
  if (!queryClient || !projectId) return undefined;
  // Try exact key first
  const exact = queryClient.getQueryData([
    'developmentTrends',
    projectId,
    DEV_TRENDS_PRELOADER_FILTERS,
    0,
  ]);
  if (exact) return exact;

  // Fallback: any cached entry that starts with ['developmentTrends', projectId]
  const match = queryClient
    .getQueryCache()
    .findAll({ queryKey: ['developmentTrends', projectId] })
    .map((q) => q.state.data)
    .find((d) => d !== undefined);
  return match;
};
