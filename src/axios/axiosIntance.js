import { clearAuthCookies, getRefreshToken } from '@/lib/token';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8386/api/v1',
  timeout: 10000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    const originalRequest = config;
    
    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const rt = getRefreshToken();
        if (!rt) {
          throw new Error('No refresh token available');
        }
        
        const res = await axiosInstance.post('/auth/check-token', {
          refresh_token: rt
        });

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        clearAuthCookies();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;