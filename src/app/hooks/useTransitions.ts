import { useEffect, useState } from 'react';
import { ApiQueryParams, TransitionsApiResponse } from '../types';
import api from '@/api/api';

export const useTransitions = (paramData: ApiQueryParams) => {
  const [response, setResponse] = useState<TransitionsApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await api.getTransitions(paramData);
        setResponse(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const transitions = {
    data: response,
  };

  return { transitions, isLoading, isError };
};
