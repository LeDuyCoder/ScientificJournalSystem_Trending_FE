import { useQuery } from '@tanstack/react-query';
import { fetchDistribution, transformDistributionData } from '../services/globalEcosystem.service';

export const useDistribution = (projectId, filters = {}, refreshTrigger) => {
    return useQuery({
        queryKey: ['distribution', projectId, filters, refreshTrigger],
        queryFn: () => fetchDistribution(projectId, filters),
        enabled: !!projectId,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        select: (response) => {
            return transformDistributionData(response?.data);
        }
    });
};
