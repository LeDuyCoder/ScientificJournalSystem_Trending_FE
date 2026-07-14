import { coreApiClient } from '../api/axios';

/**
 * Fetch current user's profile from the Core API
 * GET /api/v1/users/me
 */
export const fetchCurrentUser = async () => {
  return await coreApiClient.get('/api/v1/users/me');
};
