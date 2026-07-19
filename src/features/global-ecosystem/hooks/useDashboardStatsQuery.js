import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, transformToKpiStats } from '../services/globalEcosystem.service';

export const useDashboardStatsQuery = (projectId, refreshTrigger) => {
    return useQuery({
        queryKey: ['dashboard-stats', projectId, refreshTrigger],
        queryFn: () => fetchDashboardStats(projectId),
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,    // cache 5 phút
        refetchOnWindowFocus: false, // không tự động gọi lại API khi chuyển tab
        select: (response) => {
            return transformToKpiStats(response?.data);
        }
    });
};
