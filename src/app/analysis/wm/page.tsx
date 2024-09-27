'use client';

import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

type BoxData = boolean[];

const App: React.FC = () => {
  // true/falseのサンプルデータを使用
  const [data, setData] = useState<BoxData>([true, false, true]);

  // 現在の時間を取得する関数
  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  // 1分ごとに時間を更新
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // 1分ごとに更新
    return () => clearInterval(interval);
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} p={5}>
      {data.map((value, index) => (
        <Box
          key={index}
          w="150px"
          h="150px"
          bg={value ? 'blue.200' : 'white'}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="lg">データ {index + 1}</Text>
          <Text fontSize="sm">{currentTime}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default App;
