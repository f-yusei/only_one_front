'use client';

import React from 'react';
import { BoxGrid } from '@/app/components/BoxGrid';
import { Text, Box, Flex } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import util from '../../../../util';
import Analysis from '../../../../components/Analysis';
import { ApiQueryParams } from '@/app/types';

const DmAnalysisPage: React.FC = () => {
  const param = useParams<{
    dormname: 'MOU' | 'CEN' | 'SEA' | 'SPA';
    floor: '1' | '2' | '3' | '4' | '5';
  }>();

  const paramData: ApiQueryParams = {
    type: 'DR',
    dormitory: param.dormname,
    floor: param.floor,
    halfYear: 'TRUE',
    weekly: 'TRUE',
    monthly: 'TRUE',
    groupByFloor: 'TRUE',
  };

  return (
    <div>
      <Box>
        <Text fontSize="5xl" fontWeight="bold" textAlign="center" mt={3}>
          {util.changeDormToDisplayName(param.dormname)} {param.floor}階 乾燥機
        </Text>
      </Box>
      <BoxGrid type="DR" dormitory={param.dormname} floor={param.floor} />
      <Flex justifyContent="center" alignItems="center">
        <Box width="100vw" height="30vh">
          <Analysis type='DR' paramData={paramData} />
        </Box>
      </Flex>
    </div>
  );
};

export default DmAnalysisPage;
