import useSWR from 'swr';
import { DashboardData } from '../types';

const fetchUrl = process.env.NEXT_BACKEND_API_URL + 'api/dashboard' || 'http://localhost:5000';

const fetcher = () => fetch(fetchUrl).then((res) => res.json());

export const useDashboardData = () => {
  const { data, error } = useSWR<DashboardData>(fetcher);

  return {
    dashboardData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useYamaDashboardData = () => {
  const { data, error } = useSWR<DashboardData>('/api/dashboard', fetcher);

  const yamaData = {
    showerData: data?.yamaShowerData,
    washerData: data?.yamaWasherData,
    dryerData: data?.yamaDryerData,
  };

  return {
    dashboardData: yamaData,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUmiDashboardData = () => {
  const { data, error } = useSWR<DashboardData>('/api/dashboard', fetcher);

  const umiData = {
    showerData: data?.umiShowerData,
    washerData: data?.umiWasherData,
    dryerData: data?.umiDryerData,
  };

  return {
    dashboardData: umiData,
    isLoading: !error && !data,
    isError: error,
  };
};
