import { useQuery } from '@tanstack/react-query';
import { fetchGeoDistribution, transformGeoData } from '../services/globalEcosystem.service';

export const useGeoDistribution = (projectId) => {
    return useQuery({
        queryKey: ['geoDistribution', projectId],
        queryFn: () => fetchGeoDistribution(projectId),
        enabled: !!projectId,
        staleTime: 5 * 60 * 1000, // 5 phút
        gcTime: 10 * 60 * 1000,   // 10 phút
        refetchOnWindowFocus: false,
        select: (response) => {
            return transformGeoData(response?.data);
        }
    });
};
