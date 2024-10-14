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
  const param = useParams<{ dormname: 'MOU' | 'CEN' | 'SEA' | 'SPA'; bathNumber: string }>();

  const paramData: ApiQueryParams = {
    type: 'PB',
    dormitory: param.dormname,
  };

  const { transitions, isLoading, isError } = useTransitions(paramData);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError || !transitions.data?.data) {
    return <div>データが正常に取得できませんでした。</div>;
  }

  const labels = transitions.data.data.labels;
  //ラベルを取り除いたデータだけの配列
  const initialData = util.convertToDataArray(transitions.data.data.datasets);

  return (
    <div>
      <Text>大浴場{param.bathNumber}</Text>
      <Analysis initialLabels={labels} initialData={initialData} />
    </div>
  );
};

export default PbAnalysisPage;
