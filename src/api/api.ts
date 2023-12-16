import {
  CleaningAllData,
  CleaningTableDataToPost,
  DashboardData,
  RollCallTableDataToPost,
  StudentNameType,
} from '@/app/types';
import apiClient from './axiosClient';

const getDashboardData = async () => {
  const response = await apiClient.get<DashboardData[]>('/dashboard');
  console.log(response);
  return response.data;
};

const getStudentData = async () => {
  const response = await apiClient.get<StudentNameType[]>('/student');
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

const postRollCallData = async (tableData: RollCallTableDataToPost) => {
  const response = await apiClient.post<RollCallTableDataToPost>(`/rollcall`, tableData);
  return response.data;
};

const api = {
  getDashboardData,
  getCleaningData,
  postTableData,
  getStudentData,
  postRollCallData,
};

export default api;
