'use client';

import React from 'react';
import { BoxGrid } from '@/app/components/BoxGrid';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import util from '@/app/util';
import Analysis from '@/app/components/Analysis';
import { ApiQueryParams } from '@/app/types';
import { useTransitions } from '@/app/hooks/useTransitions';
const SrAnalysisPage: React.FC = () => {
  // データ定義
  const param = useParams<{ dormName: 'ALL' | 'MOU' | 'SEA' | 'CEN' | 'SPA' }>();

  const paramData: ApiQueryParams = {
    type: 'SW',
    dormitory: param.dormName,
    halfYear: 'TRUE',
    weekly: 'TRUE',
    monthly: 'TRUE',
    groupByFloor: 'TRUE',
  };

  const { transitions, isLoading, error } = useTransitions(paramData);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error || transitions === undefined) {
    return <div>{error}</div>;
  }

  const filteredData = transitions
    .filter((item) => item.dormitory !== null)
    .find((item) => item.dormitory?.toString() === param.dormName);

  if (filteredData === undefined) {
    return <div>データが正常に取得できませんでした。</div>;
  }
  //ラベルを取り除いたデータだけの配列
  const initialData = util.convertToDataArray(filteredData.data.datasets);
  const labels = filteredData.data.labels;

  return (
    <div>
      <Text fontSize="5xl" fontWeight="bold" textAlign="center" mt={3}>
        {util.changeDormToDisplayName(param.dormName)} シャワー室
      </Text>
      <BoxGrid type="SW" dormitory={param.dormName} />
      <Flex
        justifyContent="center" 
        alignItems="center"
        p={4}
      >
        <Box width="100vw" height="30vh">
          <Analysis initialLabels={labels} initialData={initialData} />
        </Box>
      </Flex>
    </div>
  );
};

export default SrAnalysisPage;
