import { useQuery } from '@tanstack/react-query';
import { fetchTopEntities } from '../services/dashboard.service';
import { transformTopEntitiesData } from '../../global-ecosystem/services/globalEcosystem.service';

export const useTopEntities = (projectId, queryOptions = {}) => {
    const { limit = 4, ...tanstackOptions } = queryOptions;

    return useQuery({
        queryKey: ['topEntities', projectId, { limit }],
        queryFn: () => fetchTopEntities(projectId, { limit }),

        enabled: !!projectId,
        staleTime: tanstackOptions.staleTime ?? 5 * 60 * 1000,
        gcTime: tanstackOptions.gcTime ?? 10 * 60 * 1000,
        refetchOnWindowFocus: false,

        select: (response) => {
            return transformTopEntitiesData(response?.data);
        },
        ...tanstackOptions
    });
};