import { CleaningAllData, DashboardData, RollCallTableDataToPost } from '@/app/types';
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

const postTableData = async (tableData: RollCallTableDataToPost) => {
  const response = await apiClient.post(`/cleaning`, tableData);
  return response;
};

const postRollCallData = async (tableData: RollCallTableDataToPost) => {
  const response = await apiClient.post<RollCallTableDataToPost>(`/rollcall`, tableData);
  return response.data;
};

const api = {
  getDashboardData,
  getCleaningData,
  postTableData,
  postRollCallData,
};

export default api;
