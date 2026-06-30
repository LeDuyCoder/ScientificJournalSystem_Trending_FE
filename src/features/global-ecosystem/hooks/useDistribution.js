import { useQuery } from '@tanstack/react-query';
import { fetchDistribution, transformDistributionData } from '../services/globalEcosystem.service';

export const useDistribution = (projectId) => {
    return useQuery({
        queryKey: ['distribution', projectId],
        queryFn: () => fetchDistribution(projectId),
        enabled: !!projectId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        select: (response) => {
            return transformDistributionData(response?.data);
        }
    });
};
