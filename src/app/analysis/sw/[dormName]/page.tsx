'use client';

import React from 'react';
import { BoxGrid } from '@/app/components/BoxGrid';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import util from '@/app/util';
import Analysis from '@/app/components/Analysis';
import { ApiQueryParams } from '@/app/types';

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
          <Analysis type='SW' paramData={paramData} />
        </Box>
      </Flex>
    </div>
  );
};

export default SrAnalysisPage;
