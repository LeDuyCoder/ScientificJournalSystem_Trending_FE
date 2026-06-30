import { useQuery } from '@tanstack/react-query';
import { fetchQuartiles, transformQuartilesData } from '../services/globalEcosystem.service';

export const useQuartiles = (projectId) => {
    return useQuery({
        queryKey: ['quartilesDistribution', projectId],
        queryFn: () => fetchQuartiles(projectId),
        enabled: !!projectId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        select: (response) => {
            return transformQuartilesData(response?.data);
        }
    });
};
