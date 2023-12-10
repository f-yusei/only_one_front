'use client';
import RollCallTable, { RollCallTableData } from '@/app/components/RollCallTable';
import { SelectMonthAndDormitory } from '@/app/components/CommonFunction';
import { Box, Button, Card } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCheckIsLoginNow } from '@/app/hooks/useCheckIsLoginNow';
import { useRouter } from 'next/navigation';

const CallManagePage = () => {
  const rollCallTableInit: RollCallTableData[] = Array.from({ length: 30 }, () => ({
    date: '',
    name: '',
  }));

  const [dormitory, setDormitory] = useState('');
  const [month, setMonth] = useState('');
  const [tableData, setTableData] = useState<RollCallTableData[]>(rollCallTableInit);
  const [isEditMode, setIsEditMode] = useState(false);

  const router = useRouter();

  const isLogined = useCheckIsLoginNow();
  if (!isLogined) {
    router.push('/login');
  }

  useEffect(() => {
    if (month === '') return;
    if (dormitory === '') return;
    setIsEditMode(true);
  }, [month, dormitory]);

  const handlePost = async () => {
    const url = process.env.BACKEND_API_URL + '/api/rollcall';
    setTableData((prevTableData) => {
      const newData = [...prevTableData];
      for (let i = 0; i < newData.length; i++) {
        newData[i].date = (i + 1).toString() + '日';
      }
      return newData;
    });

    const postData = {
      dormitory: dormitory,
      month: month,
      tableData: tableData,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };
    await fetch(url, options).then((res) => {
      if (res.ok) {
        alert('保存しました');
        console.log(res);
      } else {
        alert('保存に失敗しました');
        console.log(res);
      }
    });
  };
  return (
    <Box p={4}>
      <SelectMonthAndDormitory
        dormitory={dormitory}
        month={month}
        setDormitory={setDormitory}
        setMonth={setMonth}
        tableName="点呼当番表"
      />
      <Card overflow="scroll" h="64vh" w="100vw" p={4}>
        <RollCallTable
          isEditMode={isEditMode}
          month={month}
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
