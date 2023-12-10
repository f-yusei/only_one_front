'use client';
import { Box, Button, Table, Textarea, Tr, Td } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'; // 本当に chakra-react-select を使いたい場合は、正しいインポートをしてください

const state = {
  studentData: [
    { number: '1', name: '村上', attendcheck: '出席' },
    { number: '2', name: '村上にごう', attendcheck: '出席' },
    { number: '3', name: '村上さんごう', attendcheck: '未確認' },
    { number: '4', name: '村上よんごう', attendcheck: '未確認' },
    { number: '5', name: '村上ごごう', attendcheck: '代理' },
  ],
};

//const cleantimes = localStorage.getItem("cleanTimes");
//const cleantype = localStorage.getItem("cleanmonth");


export default function MonthlyCleanReport() {
  return (
    <Box>
      {state.studentData.map((array) => (
        <Table key={array.number}>
          <Tr>
            <Td w="50%">
              <Box>{array.name}</Box>
            </Td>
            <Td w="50%">
              {array.attendcheck === '未確認' ? (
                <Select placeholder="未確認">
                  <option value="出席">出席</option>
                  <option value="欠席">欠席</option>
                  <option value="代理">代理</option>
                </Select>
              ) : (
                <Box>{array.attendcheck}</Box>
              )}
            </Td>
          </Tr>
        </Table>
      ))}
      <MonthlyCleanComment />
      <Button>送信</Button>
    </Box>
  );
}

const MonthlyCleanComment = () => {
  return (
    <Box>
      <Box>なんかあったら書いてもらう</Box>
      <Textarea />
    </Box>
  );
};
