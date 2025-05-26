import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL || 'http://localhost:8386/api/v1',
  timeout: 10000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        return config

    },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;