import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, transformToKpiStats } from '../services/globalEcosystem.service';

export const useDashboardStatsQuery = (projectId) => {
    return useQuery({
        queryKey: ['dashboard-stats', projectId],
        queryFn: () => fetchDashboardStats(projectId),
        staleTime: 1 * 60 * 1000, // cache 1 phút
        gcTime: 5 * 60 * 1000,    // cache 5 phút
        refetchOnWindowFocus: false, // không tự động gọi lại API khi chuyển tab
        select: (response) => {
            return transformToKpiStats(response?.data);
        }
    });
};
