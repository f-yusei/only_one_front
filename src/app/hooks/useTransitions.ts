// useTransitions.ts
import { useEffect, useState } from 'react';
import { ApiQueryParams, TransitionsApiResponse } from '../types';
import api from '@/api/api';

export const useTransitions = (paramData: ApiQueryParams) => {
  const [response, setResponse] = useState<TransitionsApiResponse | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await api.getTransitions(paramData);
        setResponse(result);
        setError(undefined); // エラーをリセット
      } catch (error) {
        setError('分析データの取得に失敗しました。');
        setResponse(undefined); // レスポンスをリセット
      }

      setIsLoading(false);
    };

    fetchData();
  }, [paramData]); // 依存配列に paramData を追加

  const transitions = response;

  return { transitions, isLoading, error };
};
