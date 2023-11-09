'use client';
import { Box, Button, HStack, Select } from '@chakra-ui/react';
import WeeklyCleaningTable from '../components/WeeklyCleaningTable';
import MonthlyCleaningTable from '../components/MonthlyCleaningTable';
import { useState } from 'react';

export default function Home() {
  const [cleaningType, setCleaningType] = useState<string>('weekly');
  return (
    <Box p={4}>
      <Select
        placeholder="清掃の種類を選択してください"
        value={cleaningType}
        onChange={(e) => setCleaningType(e.target.value)}
        m={4}
      >
        <option value="weekly">週例清掃</option>
        <option value="monthly">月例清掃</option>
        <option value="sink">シンク掃除</option>
      </Select>
      {cleaningType === 'weekly' && <WeeklyCleaningTable />}
      {cleaningType === 'monthly' && <MonthlyCleaningTable />}
      {cleaningType === 'sink' && <div>シンク掃除</div>}
      <HStack>
        <Button m={4}>プレビューを表示</Button>
        <Button colorScheme="teal" m={4}>
          保存して閉じる
        </Button>
      </HStack>
    </Box>
  );
}
