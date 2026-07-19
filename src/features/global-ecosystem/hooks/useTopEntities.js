import { useQuery } from '@tanstack/react-query';
import { fetchTopEntities, transformTopEntitiesData } from '../services/globalEcosystem.service';

export const useTopEntities = (projectId, queryOptions = {}) => {
    const { limit = 4, filters = {}, refreshTrigger, ...tanstackOptions } = queryOptions;

    return useQuery({
        queryKey: ['topEntities', projectId, { limit, ...filters }, refreshTrigger],
        queryFn: () => fetchTopEntities(projectId, { limit, ...filters }),
        enabled: !!projectId,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        select: (response) => {
            return transformTopEntitiesData(response?.data);
        },
        ...tanstackOptions
    });
};
