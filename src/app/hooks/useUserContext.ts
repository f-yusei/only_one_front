'use client';
import { useContext } from 'react';
import { UserStoreContext } from '../context/userContext';

export const useUserContext = () => {
  const { userData, setUserData } = useContext(UserStoreContext);
  return {
    userData,
    setUserData,
  };
};
