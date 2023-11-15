import { CleaningAllData, CleaningTableDataToPost, DashboardData } from '@/app/types';
import apiClient from './axiosClient';

const getDashboardData = async () => {
  const response = await apiClient.get<DashboardData[]>('/dashboard');
  console.log(response);
  return response.data;
};

const getCleaningData = async () => {
  const response = await apiClient.get<CleaningAllData>('/cleaning');
  return response.data;
};

const postTableData = async (tableData: CleaningTableDataToPost) => {
  const response = await apiClient.post<CleaningTableDataToPost>(`/cleaning`, tableData);
  return response.data;
};

const api = {
  getDashboardData,
  getCleaningData,
  postTableData,
};

export default api;
