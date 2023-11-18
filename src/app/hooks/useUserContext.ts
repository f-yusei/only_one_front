'use client';
import { useContext } from 'react';
import { UserStoreContext } from '../context/userContext';

export const useUserContext = () => {
  const { userData } = useContext(UserStoreContext);
  return {
    userData,
  };
};
