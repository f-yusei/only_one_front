'use client';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import Analysis from '../../../components/Analysis';
import api from '@/api/api';
import { ApiQueryParams } from '@/app/types';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PbAnalysisPage: React.FC = () => {
  const param = useParams();
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>();

  const queryParams: ApiQueryParams = {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // データ取得中
      try {
        // APIからデータを取得 (例)
        const response = await api.getTransitions(queryParams);
        // TODO ここにnumber[][]型のdataをsetDataする
        // setData(response.data.datasets);
        setLabels(response.data.labels);
      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [queryParams]);

  if (!labels || !data) {
    return <div>loading</div>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Text>大浴場{param.bathNumber}</Text>
          <Analysis initialLabels={labels} initialData={data} />
        </div>
      )}
    </div>
  );
};

export default PbAnalysisPage;
