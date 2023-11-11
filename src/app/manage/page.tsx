'use client';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import WeeklyCleaningTable from '../components/WeeklyCleaningTable';
import MonthlyCleaningTable from '../components/MonthlyCleaningTable';

export default function Home() {
  return (
    <Box p={4}>
      <Box>
        <Text>週例清掃</Text>
        <WeeklyCleaningTable />
      </Box>
      <Box>
        <Text>月例清掃</Text>
        <MonthlyCleaningTable />
      </Box>
      <HStack>
        <Button m={4}>プレビューを表示</Button>
        <Button colorScheme="teal" m={4}>
          保存して閉じる
        </Button>
      </HStack>
    </Box>
  );
}
