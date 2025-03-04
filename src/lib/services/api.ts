import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

/**
 * Axios instance configured with base URL and credentials
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: Error | unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

/**
 * Process queued requests after token refresh
 * @param error - Error object if refresh failed, null if successful
 */
const processQueue = (error: Error | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

/**
 * Handles auth failure by redirecting to sign-in page
 */
const handleAuthFailure = () => {
  // Using redirect from next/navigation
  redirect('/?auth=sign-in');
};

/**
 * Response interceptor that handles token refresh flow
 *
 * Functionality:
 * 1. Catches 401 unauthorized errors
 * 2. If not a sign-in request, attempts to refresh the token
 * 3. Queues subsequent requests while refresh is in progress
 * 4. Retries failed requests after successful refresh
 * 5. Redirects to login on refresh failure
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosError['config'] & { _retry?: boolean };

    if (originalRequest.url === '/auth/sign-in' && error.response?.status === 401) {
      console.error('[Auth] Sign-in failed:', error.response?.data);
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('[Auth] Token expired, attempting refresh...');

      if (isRefreshing) {
        console.log('[Auth] Refresh already in progress, queueing request');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.get('/auth/refresh');
        console.log('[Auth] Token refresh successful');
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        console.error('[Auth] Token refresh failed:', refreshError);
        processQueue(refreshError as Error);
        handleAuthFailure();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
