import useSWR from 'swr';
import { DashboardData } from '../types';

const fetchUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';

const fetcher = () => fetch(fetchUrl).then((res) => res.json());

export const useDashboardData = () => {
  const { data, error } = useSWR<DashboardData>('/api/dashboard', fetcher);

  return {
    dashboardData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
