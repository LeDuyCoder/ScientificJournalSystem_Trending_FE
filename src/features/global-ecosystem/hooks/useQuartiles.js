import { useQuery } from '@tanstack/react-query';
import { fetchQuartiles, transformQuartilesData } from '../services/globalEcosystem.service';

export const useQuartiles = (projectId, filters = {}, refreshTrigger) => {
    return useQuery({
        queryKey: ['quartilesDistribution', projectId, filters, refreshTrigger],
        queryFn: () => fetchQuartiles(projectId, filters),
        enabled: !!projectId,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        select: (response) => {
            return transformQuartilesData(response?.data);
        }
    });
};
