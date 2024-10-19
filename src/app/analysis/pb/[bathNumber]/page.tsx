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

  return (
    <div>
      <Text fontSize="5xl" fontWeight="bold" textAlign="center" mt={3}>
        大浴場{param.bathNumber}
      </Text>
      <Analysis type='PB' paramData={paramData} bathNumber={param.bathNumber}/>
    </div>
  );
};

export default PbAnalysisPage;
