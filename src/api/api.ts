import {
  ApiQueryParams,
  DashboardDetailResponse,
  DormData,
  TransitionsApiResponse,
} from '@/app/types';
import apiClient from './axiosClient';
import util from '@/app/util';

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
  getTransitions,
  getDashboardDetail,
};

export default api;
