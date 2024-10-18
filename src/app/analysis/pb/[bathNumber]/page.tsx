'use client';
import React from 'react';
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
import { ApiQueryParams } from '@/app/types';
import { useTransitions } from '@/app/hooks/useTransitions';
import util from '@/app/util';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PbAnalysisPage: React.FC = () => {
  const param = useParams<{ bathNumber: string }>();

  const paramData: ApiQueryParams = {
    type: 'PB',
    halfYear: 'TRUE',
    weekly: 'TRUE',
    monthly: 'TRUE',
    groupByID: 'TRUE',
  };

  const { transitions, isLoading, error } = useTransitions(paramData);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error || transitions === undefined) {
    return <div>{error}</div>;
  }
  //ラベルを取り除いたデータだけの配列
  const filteredData = transitions
    .filter((item) => item.No !== null)
    .find((item) => item.No?.toString() === param.bathNumber);

  if (filteredData === undefined) {
    return <div>データが正常に取得できませんでした。</div>;
  }

  const initialData = util.convertToDataArray(filteredData.data.datasets);
  const labels = filteredData.data.labels;

  return (
    <div>
      <Text fontSize="5xl" fontWeight="bold" textAlign="center" mt={3}>
        大浴場{param.bathNumber}
      </Text>
      <Analysis initialLabels={labels} initialData={initialData} />
    </div>
  );
};

export default PbAnalysisPage;
