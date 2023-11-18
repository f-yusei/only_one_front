import { LoginData, UserData } from '@/app/types';
import apiClient from './axiosClient';

const getAccountData = async () => {
  const response = await apiClient.get<UserData>('/@me');
  return response.data;
};

const postLogin = async (data: LoginData) => {
  const response = await apiClient.post<UserData>(`/login`, data);
  return response.data;
};

const authApi = {
  getAccountData,
  postLogin,
};

export default authApi;
