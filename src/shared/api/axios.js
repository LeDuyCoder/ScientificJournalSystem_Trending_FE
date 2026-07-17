import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// --- START CONCURRENCY LIMITER ---
const MAX_CONCURRENT_REQUESTS = 4; // Giới hạn 4 request gửi xuống BE cùng lúc
let activeRequests = 0;
const requestQueue = [];

apiClient.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    const executeRequest = () => {
      activeRequests++;
      resolve(config);
    };

    if (activeRequests < MAX_CONCURRENT_REQUESTS) {
      executeRequest();
    } else {
      requestQueue.push(executeRequest);
    }
  });
});

const onResponseComplete = () => {
  activeRequests--;
  if (requestQueue.length > 0) {
    const nextRequest = requestQueue.shift();
    nextRequest();
  }
};
// --- END CONCURRENCY LIMITER ---

apiClient.interceptors.response.use(
  (response) => {
    onResponseComplete();
    return response.data;
  },
  async (error) => {
    onResponseComplete();
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          // Call refresh API
          await axios.get(`${API_BASE_URL}/api/v1/auth/refresh`, {
            withCredentials: true,
          });

          useAuthStore.getState().loginSuccess(null); 
          processQueue(null);
          resolve(apiClient(originalRequest));
        } catch (refreshError) {
          processQueue(refreshError);
          useAuthStore.getState().logout();
          reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      });
    }

    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    return Promise.reject(new Error(message));
  }
);

export const coreApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_CORE_URL || 'http://localhost:3000',
  withCredentials: true,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

coreApiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return coreApiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          await axios.get(`${import.meta.env.VITE_API_CORE_URL || 'http://localhost:3000'}/api/v1/auth/refresh`, {
            withCredentials: true,
          });

          useAuthStore.getState().loginSuccess(null);

          processQueue(null);
          resolve(coreApiClient(originalRequest));
        } catch (refreshError) {
          processQueue(refreshError);
          useAuthStore.getState().logout();
          reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      });
    }

    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
