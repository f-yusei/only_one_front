import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_BACKEND_API_URL is not defined');
}

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
