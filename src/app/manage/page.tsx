'use client';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import PreviewModal from '../components/PreviewModal';
import { useEffect, useState } from 'react';
import MonthlyCleaningTable from '../components/MonthlyCleaningTable';
import WeeklyCleaningTable from '../components/WeeklyCleaningTable';
import { WeeklyCleaningTableData, MonthlyCleaningTableData } from '../types';
import api from '@/api/api';
import { SelectMonthAndDormitory } from '../components/CommonFunction';

export default function Home() {
  const weeklyCleaningTable: WeeklyCleaningTableData[] = [
    {
      times: '',
      date: '',
      F1studentNames: [],
      F2studentNames: [],
      F3studentNames: [],
    },
  ];
  const monthlyCleaningTable: MonthlyCleaningTableData[] = [
    {
      date: '',
      names: [],
    },
  ];

  const [dormitory, setDormitory] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [weeklyCleaningTableData, setWeeklyCleaningTable] =
    useState<WeeklyCleaningTableData[]>(weeklyCleaningTable);
  const [monthlyCleaningTableData, setMonthlyCleaningTable] =
    useState<MonthlyCleaningTableData[]>(monthlyCleaningTable);

  useEffect(() => {
    if (month === '' || dormitory === '') {
      setIsEditMode(false);
      return;
    }
    setIsEditMode(true);
  }, [month, dormitory]);

  const handlePost = async () => {
    setWeeklyCleaningTable((prevTableData) => {
      const newData = [...prevTableData];
      for (let i = 0; i < newData.length; i++) {
        newData[i].times = (i + 1).toString();
      }
      return newData;
    });

    const weeklyCleaningTableDataToPost = weeklyCleaningTableData.map(
      (data: WeeklyCleaningTableData) => {
        return {
          times: data.times,
          day: data.date,
          studentAccounts: {
            f1: data.F1studentNames.map((name) => {
              return name.value;
            }),
            f2: data.F2studentNames.map((name) => {
              return name.value;
            }),
            f3: data.F3studentNames.map((name) => {
              return name.value;
            }),
          },
        };
      }
    );
    const monthlyCleaningTableDataToPost = monthlyCleaningTableData.map(
      (data: MonthlyCleaningTableData) => {
        return {
          day: data.date,
          accounts: data.names.map((name) => {
            return name.value;
          }),
        };
      }
    );

    const postData = {
      register: 'test',
      dormitory: dormitory,
      date: year + '-' + month,
      weeklyCleaningTableData: weeklyCleaningTableDataToPost,
      monthlyCleaningTableData: monthlyCleaningTableDataToPost,
    };
    await api.postTableData(postData).then((res) => {
      if (res) {
        alert('保存しました');
        console.log(res);
      } else {
        alert('保存に失敗しました。フォームが正しく入力されているか確認して下さい');
        console.log(res);
      }
    });
  };
  return (
    <Box p={4}>
      <SelectMonthAndDormitory
        dormitory={dormitory}
        month={month}
        year={year}
        setYear={setYear}
        setDormitory={setDormitory}
        setMonth={setMonth}
        tableName="清掃当番表"
      />
      <Box>
        <Text>週例清掃</Text>
        <WeeklyCleaningTable
          isEditMode={isEditMode}
          tableData={weeklyCleaningTableData}
          setTableData={setWeeklyCleaningTable}
        />
      </Box>
      <Box>
        <Text>月例清掃</Text>
        <MonthlyCleaningTable
          isEditMode={isEditMode}
          tableData={monthlyCleaningTableData}
          setTableData={setMonthlyCleaningTable}
        />
      </Box>
      <HStack>
        <PreviewModal />
        <Button colorScheme="teal" onClick={() => handlePost()} m={4}>
          保存して閉じる
        </Button>
      </HStack>
    </Box>
  );
}
