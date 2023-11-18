'use client';
import authApi from '@/api/authApi';
import { useUserContext } from './useUserContext';

const useCheckCanAccessManage = async () => {
  const data = await authApi.getAccountData();
  const { setUserData } = useUserContext();

  setUserData(data);
};

export default useCheckCanAccessManage;
