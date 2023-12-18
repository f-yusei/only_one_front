'use client';
import useSWR from 'swr';
import { DashboardData } from '../types';
import process from 'process';
import { useEffect, useState } from 'react';
import apiClient from '@/api/axiosClient';

const fetchUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/dashboard' || 'http://localhost:5000';

const fetcher = async () =>
  await fetch(fetchUrl).then(async (res) => {
    return await res.json();
  });

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await apiClient.get<DashboardData>(fetchUrl);
        setDashboardData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { dashboardData, isLoading, isError };
};

export const useYamaDashboardData = () => {
  const { data, error } = useSWR<DashboardData>(fetcher);

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
  const { data, error } = useSWR<DashboardData>(fetcher);

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
