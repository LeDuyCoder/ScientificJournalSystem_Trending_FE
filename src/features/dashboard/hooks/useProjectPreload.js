import { useParams } from 'react-router-dom';
import { useDashboardContext } from '../contexts/DashboardContext';

// Dashboard Queries
import { useDashboardStatsQuery } from '../../global-ecosystem/hooks/useDashboardStatsQuery';
import { useGeoDistribution } from '../../global-ecosystem/hooks/useGeoDistribution';
import { useDistribution } from '../../global-ecosystem/hooks/useDistribution';
import { useTopEntities } from '../../global-ecosystem/hooks/useTopEntities';
import { useQuartiles } from '../../global-ecosystem/hooks/useQuartiles';

import { usePublicationTrendQuery } from '../../development-trends/hooks/usePublicationTrendQuery';
import { useCitationMirroringQuery } from '../../development-trends/hooks/useCitationMirroringQuery';
import { useTopicEvolutionQuery } from '../../development-trends/hooks/useTopicEvolutionQuery';
import { useFrontierDetectionQuery } from '../../development-trends/hooks/useFrontierDetectionQuery';
import { useForecastInsightsQuery } from '../../development-trends/hooks/useForecastInsightsQuery';

// Journals Queries
import { useJournalsData } from '../../journals/hooks/useJournalsData';

// Volumes Queries
import {
  useInfluentialRankingsQuery,
  useAuthorProductivityMatrixQuery,
  useCollaborationInsightsQuery,
  useGlobalCollaborationNetworkQuery,
  useTopicIntensityMatrixQuery
} from '../../volume/hooks/useCollaborationAnalyticsQueries';

import {
  useKeywordVectorsQuery,
  useCountryCollaborationQuery,
  useNetworkTopologyQuery,
  useCrossLinksQuery,
  useTemporalShiftQuery
} from '../../volume/hooks/useKeywordsNetworksQuery';

import { mapFiltersToQueryParams } from '../../global-ecosystem/services/globalEcosystem.service';

export function useProjectPreload() {
  const { id } = useParams();
  const projectId = id === 'default-id' ? '1' : id;

  // We need to fetch filters from Context if possible, but DashboardContext is provided in DashboardLayout.
  // Wait, if this hook is used INSIDE DashboardLayout, it can access DashboardContext!
  const context = useDashboardContext();
  const filters = context?.filters || {};
  const refreshTrigger = context?.refreshTrigger || 0;
  
  const queryParams = mapFiltersToQueryParams(filters);

  // --- DASHBOARD: Global Ecosystem ---
  const statsQuery = useDashboardStatsQuery(projectId, refreshTrigger);
  const geoQuery = useGeoDistribution(projectId, queryParams, refreshTrigger);
  const landscapeQuery = useDistribution(projectId, queryParams, refreshTrigger);
  const topEntitiesQuery = useTopEntities(projectId, { limit: 4, filters: queryParams, refreshTrigger });
  const quartilesQuery = useQuartiles(projectId, queryParams, refreshTrigger);

  // --- DASHBOARD: Development Trends ---
  const pubQuery = usePublicationTrendQuery(projectId, filters, refreshTrigger);
  const mirrorQuery = useCitationMirroringQuery(projectId, filters, refreshTrigger);
  const evolutionQuery = useTopicEvolutionQuery(projectId, filters, refreshTrigger);
  const frontierQuery = useFrontierDetectionQuery(projectId, filters, refreshTrigger);
  const forecastQuery = useForecastInsightsQuery(projectId, filters, refreshTrigger);

  // --- JOURNALS ---
  const journalsData = useJournalsData(); // internally uses useQuery now

  // --- VOLUMES: Collaboration Analytics ---
  const rankingsQuery = useInfluentialRankingsQuery(projectId);
  const impactMatrixQuery = useAuthorProductivityMatrixQuery(projectId);
  const collabInsightsQuery = useCollaborationInsightsQuery(projectId);
  const globalNetworkQuery = useGlobalCollaborationNetworkQuery(projectId);
  const topicIntensityQuery = useTopicIntensityMatrixQuery(projectId, 'author');

  // --- VOLUMES: Keywords & Networks ---
  const keywordVectorsQuery = useKeywordVectorsQuery(projectId, { ...filters, windowMonths: 12 }, refreshTrigger);
  const countryCollabQuery = useCountryCollaborationQuery(projectId, filters, refreshTrigger);
  // insights is shared with CollaborationInsightsQuery but volume hooks has its own alias
  const networkTopologyQuery = useNetworkTopologyQuery(projectId, filters, refreshTrigger);
  const crossLinksQuery = useCrossLinksQuery(projectId, filters, refreshTrigger);
  const temporalShiftQuery = useTemporalShiftQuery(projectId, filters, refreshTrigger);

  const isDashboardLoading = statsQuery.isLoading || geoQuery.isLoading || landscapeQuery.isLoading || topEntitiesQuery.isLoading || quartilesQuery.isLoading ||
                             pubQuery.isLoading || mirrorQuery.isLoading || evolutionQuery.isLoading || frontierQuery.isLoading || forecastQuery.isLoading;

  const isJournalsLoading = journalsData.loading || journalsData.topRanking.loading || journalsData.quartile.loading || journalsData.impactMatrix.loading || journalsData.migration.loading;

  const isVolumesLoading = rankingsQuery.isLoading || impactMatrixQuery.isLoading || collabInsightsQuery.isLoading || globalNetworkQuery.isLoading || topicIntensityQuery.isLoading ||
                           keywordVectorsQuery.isLoading || countryCollabQuery.isLoading || networkTopologyQuery.isLoading || crossLinksQuery.isLoading || temporalShiftQuery.isLoading;

  const isLoading = isDashboardLoading || isJournalsLoading || isVolumesLoading;

  const loadingStates = [
    statsQuery.isLoading, geoQuery.isLoading, landscapeQuery.isLoading, topEntitiesQuery.isLoading, quartilesQuery.isLoading,
    pubQuery.isLoading, mirrorQuery.isLoading, evolutionQuery.isLoading, frontierQuery.isLoading, forecastQuery.isLoading,
    journalsData.loading, journalsData.topRanking.loading, journalsData.quartile.loading, journalsData.impactMatrix.loading, journalsData.migration.loading,
    rankingsQuery.isLoading, impactMatrixQuery.isLoading, collabInsightsQuery.isLoading, globalNetworkQuery.isLoading, topicIntensityQuery.isLoading,
    keywordVectorsQuery.isLoading, countryCollabQuery.isLoading, networkTopologyQuery.isLoading, crossLinksQuery.isLoading, temporalShiftQuery.isLoading
  ];

  const totalQueries = loadingStates.length;
  const completedQueries = loadingStates.filter(state => !state).length;
  const progress = Math.round((completedQueries / totalQueries) * 100);

  if (isLoading) {
    console.log("Still loading:", {
      stats: statsQuery.isLoading, geo: geoQuery.isLoading, landscape: landscapeQuery.isLoading, top: topEntitiesQuery.isLoading, quartileD: quartilesQuery.isLoading,
      pub: pubQuery.isLoading, mirror: mirrorQuery.isLoading, evolution: evolutionQuery.isLoading, frontier: frontierQuery.isLoading, forecast: forecastQuery.isLoading,
      jData: journalsData.loading, jTop: journalsData.topRanking.loading, jQuartile: journalsData.quartile.loading, jImpact: journalsData.impactMatrix.loading, jMigration: journalsData.migration.loading,
      rankings: rankingsQuery.isLoading, impactM: impactMatrixQuery.isLoading, collab: collabInsightsQuery.isLoading, globalN: globalNetworkQuery.isLoading, topicI: topicIntensityQuery.isLoading,
      keyV: keywordVectorsQuery.isLoading, countryC: countryCollabQuery.isLoading, networkT: networkTopologyQuery.isLoading, crossL: crossLinksQuery.isLoading, temporalS: temporalShiftQuery.isLoading
    });
  }

  return { isLoading, progress, completedQueries, totalQueries };
}
