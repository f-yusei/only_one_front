'use client';

import React from 'react';
import { Text, Box, Link, Button, Flex } from '@chakra-ui/react';
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
      <Box>
        <Text
          fontSize="5xl" // テキストを大きく
          fontWeight="bold" // 太字にする
          textAlign="center"
          mt={3} // テキストを中央揃え
        >
          {util.changeDormToDisplayName(param.dormname)} {param.floor}階 乾燥機
        </Text>
      </Box>
      <BoxGrid type="DR" dormitory={param.dormname} floor={param.floor} />
      <Flex
        justifyContent="center" // 水平方向の中央揃え
        alignItems="center"
      >
        <Box width="100vw" height="30vh">
          <Analysis initialLabels={labels} initialData={initialData} />
        </Box>
      </Flex>

      <Flex
        justifyContent="center"
        alignItems="center"
        gap={100} // ボタン間のスペースを設定
        // 横幅をフルに使う
        h="40vh"
      >
        {param.dormname == 'MOU' ? (
          <Link href="/yama">
            <Button
              size={'lg'}
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }} // ホバー時のスタイル
              borderRadius="2" // 丸みをつける
              shadow="md" // 影を追加
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

export default WmAnalysisPage;
