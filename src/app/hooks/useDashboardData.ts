'use client';
import { DashboardData } from '../types';
import process from 'process';
import { useEffect, useState } from 'react';
import apiClient from '@/api/axiosClient';

const fetchUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/dashboard' || 'http://localhost:5000';

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

  const yamaDashboardData = {
    showerData: dashboardData?.yamaShowerData,
    washerData: dashboardData?.yamaWasherData,
    dryerData: dashboardData?.yamaDryerData,
  };

  return { yamaDashboardData, isLoading, isError };
};

export const useUmiDashboardData = () => {
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

  const umiDashboardData = {
    showerData: dashboardData?.umiShowerData,
    washerData: dashboardData?.umiWasherData,
    dryerData: dashboardData?.umiDryerData,
  };

  return { umiDashboardData, isLoading, isError };
};
