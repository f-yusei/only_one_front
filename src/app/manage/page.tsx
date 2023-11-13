'use client';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import WeeklyCleaningTable from '../components/WeeklyCleaningTable';
import MonthlyCleaningTable from '../components/MonthlyCleaningTable';
import PreviewModal from '../components/PreviewModal';
import { useEffect, useState } from 'react';
import SelectMonthAndDormitory from '../components/common';

export default function Home() {
  const [dormitory, setDormitory] = useState('');
  const [month, setMonth] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    if (month === '' || dormitory === '') {
      setIsEditMode(false);
      return;
    }
    setIsEditMode(true);
  }, [month, dormitory]);
  return (
    <Box p={4}>
      <SelectMonthAndDormitory
        dormitory={dormitory}
        month={month}
        setDormitory={setDormitory}
        setMonth={setMonth}
        tableName="清掃当番表"
      />
      <Box>
        <Text>週例清掃</Text>
        <WeeklyCleaningTable isEditMode={isEditMode} />
      </Box>
      <Box>
        <Text>月例清掃</Text>
        <MonthlyCleaningTable isEditMode={isEditMode} />
      </Box>
      <HStack>
        <PreviewModal />
        <Button colorScheme="teal" m={4}>
          保存して閉じる
        </Button>
      </HStack>
    </Box>
  );
}
