import { useQuery } from '@tanstack/react-query';
import { fetchQuartiles, transformQuartilesData } from '../services/globalEcosystem.service';

export const useQuartiles = (projectId, filters = {}, refreshTrigger) => {
    return useQuery({
        queryKey: ['quartilesDistribution', projectId, filters, refreshTrigger],
        queryFn: () => fetchQuartiles(projectId, filters),
        enabled: !!projectId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        select: (response) => {
            return transformQuartilesData(response?.data);
        }
    });
};
