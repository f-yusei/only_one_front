import { LoginData } from '@/app/types';
import apiClient from './axiosClient';
import { AxiosResponse } from 'axios';

const getCleaningData = async () => {
  const response = await apiClient.get<AxiosResponse>('/@me');
  return response.data;
};

const postLogin = async (data: LoginData) => {
  const response = await apiClient.post(`/login`, data);
  return response.data;
};

const authApi = {
  getCleaningData,
  postLogin,
};

export default authApi;
