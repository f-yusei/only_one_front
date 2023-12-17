'use client';
import RollCallTable from '@/app/components/RollCallTable';
import { SelectMonthAndDormitory } from '@/app/components/CommonFunction';
import { Box, Button, Card } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '@/api/api';
import { RollCallTableData, RollCallTableDataToPost } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useCheckIsLoginNow } from '@/app/hooks/useCheckIsLoginNow';
import { useAccountStore } from '@/app/state/user';

const CallManagePage = () => {
  const router = useRouter();

  const isLogin = useCheckIsLoginNow();
  useEffect(() => {
    if (!isLogin) {
      router.push('/manage/login');
    }
  }, [isLogin, router]);
  const account = useAccountStore((state) => state.account);

  const rollCallTableInit: RollCallTableData[] = Array.from({ length: 30 }, () => ({
    day: '',
    account: '',
  }));

  const [dormitory, setDormitory] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState(''); //yyyy-mm
  const [tableData, setTableData] = useState<RollCallTableData[]>(rollCallTableInit);
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    if (month === '') return;
    if (year === '') return;
    setDate(year + '-' + month);
    if (dormitory === '') return;
    setIsEditMode(true);
  }, [month, dormitory, year]);

  const handlePost = async () => {
    setTableData((prevTableData) => {
      const newData = [...prevTableData];
      for (let i = 0; i < newData.length; i++) {
        if ((i + 1).toString().length === 1) {
          newData[i].day = '0' + (i + 1).toString();
        } else {
          newData[i].day = (i + 1).toString();
        }
      }
      return newData;
    });

    const postData: RollCallTableDataToPost = {
      dormitory: dormitory,
      date: year + '-' + month,
      register: account,
      tableData: tableData,
    };
    try {
      await api.postRollCallData(postData);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box p={4}>
      <SelectMonthAndDormitory
        dormitory={dormitory}
        month={month}
        year={year}
        setDormitory={setDormitory}
        setMonth={setMonth}
        setYear={setYear}
        tableName="点呼当番表"
      />
      <Card overflow="scroll" h="64vh" w="100vw" p={4}>
        <RollCallTable
          isEditMode={isEditMode}
          date={date}
          tableData={tableData}
          setTableData={setTableData}
        />
      </Card>
      <Button
        colorScheme="teal"
        m={4}
        onClick={() => {
          handlePost();
        }}
      >
        保存
      </Button>
    </Box>
  );
};

export default CallManagePage;
