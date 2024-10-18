'use client';

import React from 'react';
import { Text, Box, Flex } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import util from '../../../../util';
import Analysis from '../../../../components/Analysis';
import { useTransitions } from '@/app/hooks/useTransitions';
import { ApiQueryParams } from '@/app/types';
import { BoxGrid } from '@/app/components/BoxGrid';
const WmAnalysisPage: React.FC = () => {
  const param = useParams<{
    dormname: 'MOU' | 'CEN' | 'SEA' | 'SPA';
    floor: '1' | '2' | '3' | '4' | '5';
  }>();

  const paramData: ApiQueryParams = {
    type: 'WA',
    dormitory: param.dormname,
    floor: param.floor,
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
    .filter((item) => item.floor !== null)
    .find((item) => item.floor?.toString() === param.floor);

  if (filteredData === undefined) {
    return <div>データが正常に取得できませんでした。</div>;
  }
  //ラベルを取り除いたデータだけの配列
  const initialData = util.convertToDataArray(filteredData.data.datasets);
  const labels = filteredData.data.labels;

  return (
    <div>
      <Box>
        <Text
          fontSize="5xl" // テキストを大きく
          fontWeight="bold" // 太字にする
          textAlign="center"
          mt={3} // テキストを中央揃え
        >
          {util.changeDormToDisplayName(param.dormname)} {param.floor}階 洗濯機
        </Text>
      </Box>
      <BoxGrid type="WA" dormitory={param.dormname} floor={param.floor} />
      <Flex
        justifyContent="center" // 水平方向の中央揃え
        alignItems="center"
      >
        <Box width="100vw" height="30vh">
          <Analysis initialLabels={labels} initialData={initialData} />
        </Box>
      </Flex>
    </div>
  );
};

export default WmAnalysisPage;
