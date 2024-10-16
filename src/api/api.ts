import {
  ApiQueryParams,
  DashboardDetailResponse,
  DormData,
  TransitionsApiResponse,
} from '@/app/types';
import apiClient from './axiosClient';
import util from '@/app/util';

const getDashboardDetail = async (dormData: DormData) => {
  const queryString = util.toQueryString(dormData);
  console.log(queryString);
  try {
    const response = await apiClient.get(`/dashboard_details?${queryString}`);
    console.log(response);
    return response.data as DashboardDetailResponse;
  } catch (error) {
    console.error('Failed to fetch dashboard details:', error);
    throw error;
  }
};

const getTransitions = async (paramData: ApiQueryParams) => {
  const queryString = util.toQueryString(paramData);
  console.log(queryString);
  try {
    const response = await apiClient.get(`/transitions?${queryString}`);
    console.log(response);
    return response.data as TransitionsApiResponse;
  } catch (error) {
    console.error('Failed to fetch transitions:', error);
    throw error;
  }
};

const api = {
  getTransitions,
  getDashboardDetail,
};

export default api;
