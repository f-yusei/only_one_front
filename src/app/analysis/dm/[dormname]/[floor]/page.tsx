'use client';

import React from 'react';
import { BoxGrid } from '../../../../components/Analysis'; // BoxGridコンポーネントをインポート
import { Center, Text, Box, Link, Button, Flex, VStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import utill from '../../../../util';
import Analysis from '../../../../components/Analysis';

const DmAnalysisPage: React.FC = () => {
  const generateLabels = () => {
    const labels = [];
    for (let i = 0; i < 24 * 12; i++) {
      const hour = Math.floor(i / 12);
      const minute = (i % 12) * 5;
      labels.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
    return labels;
  };

  // データ生成関数
  const generateData = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 5));
  };


  const labels = generateLabels();
  const data = [
    generateData(24 * 12),  // 1日
    generateData(24 * 12),  // 1週間
    generateData(24 * 12),  // 1ヶ月
    generateData(24 * 12),  // 半年
  ];
  // データ定義
  const param = useParams();

  return (
    <div>
      <Box>
        <Text
          fontSize="5xl" // テキストを大きく
          fontWeight="bold" // 太字にする
          textAlign="center"
          mt={3} // テキストを中央揃え
        >
          {utill.changeDormToDisplayName(param.dormname as "ALL" | "MOU" | "SEA")} {param.floor}階 乾燥機
        </Text>
      </Box>
      <BoxGrid type="DM" dormitory={param.dormname as string} floor={param.floor as string} />
      <Flex
        justifyContent="center" // 水平方向の中央揃え
        alignItems="center" >
        <Box width="100vw" height="30vh">
        <Analysis initialLabels={labels} initialData={data} />
        </Box>
      </Flex>

      <Flex
        justifyContent="center"
        alignItems="center"
        gap={100} // ボタン間のスペースを設定
         // 横幅をフルに使う
        h="40vh"
      >
        {param.dormname == "MOU" ? (
          <Link href='/yama'>
            <Button
            size={"lg"}
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }} // ホバー時のスタイル
              borderRadius="2" // 丸みをつける
              shadow="md" // 影を追加
              w="100%"
            >
              {utill.changeDormToDisplayName(param.dormname as "ALL" | "MOU" | "SEA")}のページに戻る
            </Button>
          </Link>
        ) : (
          <Link href='/umi'>
            <Button
            size={"lg"}
              bg="green.500"
              color="white"
              _hover={{ bg: "green.600" }}
              borderRadius="2"
              shadow="md"
              w="100%"
            >
              {utill.changeDormToDisplayName(param.dormname as "ALL" | "MOU" | "SEA")}のページに戻る
            </Button>
          </Link>
        )}

        <Link href='/'>
          <Button
          size={"lg"}
            bg="gray.500"
            color="white"
            _hover={{ bg: "gray.600" }}
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
