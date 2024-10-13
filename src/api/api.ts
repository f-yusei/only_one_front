import {
  ApiQueryParams,
  CleaningAllData,
  CleaningReport,
  CleaningTableDataToPost,
  DashboardData,
  DashboardDetailResponse,
  DormData,
  MonthCleaningData,
  RollCallTableDataToPost,
  SpecialCleaningData,
  StudentDataAttendedMonthlyCleaning,
  StudentDataByFloor,
  StudentNameType,
  TeacherCleaningReport,
  TransitionsApiResponse,
  WeekCleaningData,
} from '@/app/types';
import apiClient from './axiosClient';
import util from '@/app/util';

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

const postCleaningReport = async (reportData: CleaningReport) => {
  const response = await apiClient.post(`/manage/cleaningreport/`, reportData);
  return response.data;
};

const postTeacherCleaningReport = async (reportData: TeacherCleaningReport) => {
  const response = await apiClient.post(`/manage/teachercleaningreport/`, reportData);
  return response.data;
};

const getStudentDataByDormitoryName = async (dormitory: string) => {
  const response = await apiClient.get<StudentDataByFloor>(`/student/${dormitory}`);
  return response.data;
};

const getCleaningDataByDate = async (date: string) => {
  const response = await apiClient.get<WeekCleaningData | MonthCleaningData | SpecialCleaningData>(
    `/cleaning/${date}`
  );
  return response.data;
};

const postTeacherReadReport = async (cleaningId: number) => {
  const response = await apiClient.post(`/manage/reportread/${cleaningId}`);
  return response.data;
};

//analysis
const getDashboardDetail = async (dormData: DormData) => {
  const queryString = util.toQueryString(dormData);
  console.log(queryString);
  const response = await apiClient.get(`/dashboard_details?${queryString}`);
  console.log(response);
  return response.data as DashboardDetailResponse;
};

const getTransitions = async (paramData: ApiQueryParams) => {
  const queryString = util.toQueryString(paramData);
  console.log(queryString);

  const response = await apiClient.get(`/transitions?${queryString}`);
  console.log(response);
  return response.data as TransitionsApiResponse;
};

const api = {
  getDashboardData,
  getCleaningData,
  postTableData,
  postTeacherReadReport,
  getTransitions,
  getCleaningStatus,
  getStudentData,
  getCleaningDataByDate,
  postTeacherCleaningReport,
  postCleaningReport,
  getStudentDataByDormitoryName,
  postRollCallData,
  getCleaningDataById,
  postMonthlyCleaningAttender,
  getDashboardDetail,
};

export default api;
