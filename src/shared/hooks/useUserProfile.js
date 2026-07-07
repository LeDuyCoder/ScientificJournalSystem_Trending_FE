import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../services/userService';

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ['current-user-profile'],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    select: (response) => {
      // The API response wraps user data inside the 'data' key
      const user = response?.data;
      if (!user) return null;

      // Extract and combine first_name and last_name
      const name = (user.first_name || user.last_name)
        ? [user.first_name, user.last_name].filter(Boolean).join(' ')
        : user.fullName || user.name || user.username || 'Current User';

      // Normalize role
      let role = 'Researcher';
      if (typeof user.role === 'string') {
        role = user.role;
      } else if (user.role && typeof user.role === 'object') {
        role = user.role.name || user.role.role_name || 'Researcher';
      } else if (user.role_name) {
        role = user.role_name;
      }
      
      // Automatically compute initials for the avatar badge
      let initials = 'U';
      if (name) {
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) {
          initials = parts[0].substring(0, 2).toUpperCase();
        } else {
          initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
      }

      return {
        ...user,
        displayName: name,
        displayRole: role,
        initials,
        avatar: user.avatar || null
      };
    }
  });
};
