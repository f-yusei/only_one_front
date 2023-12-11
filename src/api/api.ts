import {
  CleaningAllData,
  CleaningTableDataToPost,
  DashboardData,
  MonthCleaningData,
  RollCallTableDataToPost,
  SpecialCleaningData,
  StudentDataAttendedMonthlyCleaning,
  StudentDataByFloor,
  StudentNameType,
  WeekCleaningData,
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

const getCleaningDataById = async (id: number) => {
  const response = await apiClient.get<WeekCleaningData | MonthCleaningData | SpecialCleaningData>(
    `/manage/cleaningstudent/${id}`
  );
  return response.data;
};

const getCleaningStatus = async (id: number) => {
  const response = await apiClient.get<number>(`/manage/cleaningstatus/${id}`);
  return response.data;
};

const postMonthlyCleaningAttender = async (StudentData: StudentDataAttendedMonthlyCleaning) => {
  const response = await apiClient.post(`/manage/monthlyattend/`, StudentData);
  return response.data;
};

const getStudentDataByDormitoryName = async (dormitory: string) => {
  const response = await apiClient.get<StudentDataByFloor>(`/student/${dormitory}`);
  return response.data;
};

const getCleaningDataByDate = async (date: string) => {
  const response = await apiClient.get<CleaningAllData>(`/cleaning/${date}`);
  return response.data;
};

const api = {
  getDashboardData,
  getCleaningData,
  postTableData,
  getCleaningStatus,
  getStudentData,
  getCleaningDataByDate,
  getStudentDataByDormitoryName,
  postRollCallData,
  getCleaningDataById,
  postMonthlyCleaningAttender,
};

export default api;
