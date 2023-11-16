import axios from 'axios';

const baseURL = 'http://localhost:5000';

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
