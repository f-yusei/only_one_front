'use client';

import React from 'react';
import { BoxGrid } from '@/app/components/BoxGrid';
import { Text, Box, Link, Button, Flex } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import util from '../../../../util';
import Analysis from '../../../../components/Analysis';
import { useTransitions } from '@/app/hooks/useTransitions';
import { ApiQueryParams } from '@/app/types';

const DmAnalysisPage: React.FC = () => {
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
    groupByFloor: 'TRUE'
  };

  const { transitions, isLoading, error } = useTransitions(paramData);
  console.log('transitions:',transitions)

  if (isLoading) {
    return <div>loading...</div>;
  }

    if (error || transitions === undefined) {
    return <div>{error}</div>;
  }

  const filteredData = transitions
  .filter((item) => item.floor !== null)
  .find((item) => item.floor?.toString() === param.floor); 
  
  if(filteredData === undefined){
    return <div>データが正常に取得できませんでした。</div>;
  }

  //ラベルを取り除いたデータだけの配列
  const initialData = util.convertToDataArray(filteredData.data.datasets);
  const labels = filteredData.data.labels

  return (
    <div>
      <Box>
        <Text
          fontSize="5xl" 
          fontWeight="bold" 
          textAlign="center"
          mt={3} 
        >
          {util.changeDormToDisplayName(param.dormname)} {param.floor}階 乾燥機
        </Text>
      </Box>
      <BoxGrid type="DR" dormitory={param.dormname} floor={param.floor} />
      <Flex
        justifyContent="center" 
        alignItems="center"
      >
        <Box width="100vw" height="30vh">
          <Analysis initialLabels={labels} initialData={initialData} />
        </Box>
      </Flex>

      <Flex
        justifyContent="center"
        alignItems="center"
        gap={100} 
        h="40vh"
      >
        {param.dormname == 'MOU' ? (
          <Link href="/yama">
            <Button
              size={'lg'}
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              borderRadius="2" 
              shadow="md"
              w="100%"
            >
              {util.changeDormToDisplayName(param.dormname)}のページに戻る
            </Button>
          </Link>
        ) : (
          <Link href="/umi">
            <Button
              size={'lg'}
              bg="green.500"
              color="white"
              _hover={{ bg: 'green.600' }}
              borderRadius="2"
              shadow="md"
              w="100%"
            >
              {util.changeDormToDisplayName(param.dormname)}のページに戻る
            </Button>
          </Link>
        )}

        <Link href="/">
          <Button
            size={'lg'}
            bg="gray.500"
            color="white"
            _hover={{ bg: 'gray.600' }}
            borderRadius="2"
            shadow="md"
            w="100%"
          >
            トップページに戻る
          </Button>
        </Link>
      </Flex>
    </div>
  );
};

export default DmAnalysisPage;
