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
    halfYear: 'TRUE',
    weekly: 'TRUE',
    monthly: 'TRUE',
  };

  const { transitions, isLoading, isError } = useTransitions(paramData);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError || transitions === undefined) {
    console.log("transitions:",transitions)
    return <div>データが正常に取得できませんでした。</div>;
  }
//ラベルを取り除いたデータだけの配列
  const filteredData =transitions.find((item) => item.No.toString() == param.bathNumber);
  if(filteredData === undefined){
    return <div>データが正常に取得できませんでした。</div>;
  }

  const initialData = util.convertToDataArray(filteredData.data.datasets);
  const labels = filteredData.data.labels

  return (
    <div>
      <Text>大浴場{param.bathNumber}</Text>
      <Analysis initialLabels={labels} initialData={initialData} />
    </div>
  );
};

export default PbAnalysisPage;
