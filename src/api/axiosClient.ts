import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  withCredentials: true,
  baseURL: baseURL + '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export default apiClient;
