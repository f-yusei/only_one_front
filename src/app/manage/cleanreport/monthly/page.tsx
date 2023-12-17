'use client';
import { Box, Button, Table, Textarea, Tr, Td ,Th,Tbody,Thead} from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'; // 本当に chakra-react-select を使いたい場合は、正しいインポートをしてください

const cleanData = {
  date:"2022-08",
  cleanTimes: 1,
  place:"山寮2階シンク",
  studentStatus: [
    {
      student: '1I 村上亜士沙',
      status: 'unconfirmed',
      agent: '',
    },
    {
      student: '2I 蔵田修也',
      status: 'attend',
      agent: '',
    },
    {
      student: '3I 福井郵政',
      status: 'absence',
      agent: '村上亜士沙',
    },
    {
      student: '4I ばいがるまほびとぐるドゥル',
      status: 'substitute',
      agent: '1I 田中ゆうき',
    },
  ],
};

export default function MonthlyCleanReport() {
  return (
    <>
    <Box>{cleanData.date.substr(0,4)+"年" + cleanData.date.substr(5,6)+ "月"+"     第" + cleanData.cleanTimes + "回" +"特別清掃報告"}</Box>
    <Box>
          <Table >
            <Thead>
          <Tr>
            <Th>学生</Th>
            <Th>状態</Th>
          </Tr>
          </Thead>
      {cleanData.studentStatus.map((array) => (
      
          <Tbody key={array.student}>
          <Tr>
          <Td w="50%">
              <Box>{array.student}</Box>
            </Td>
            <Td w="50%">
              {array.status === 'unconfirmed' ? (
                <Select placeholder='未確認'>
                  <option value="attend">出席</option>
                  <option value="substitute">欠席</option>
                  <option value="absence">代理</option>
                </Select>
              ) : (
                array.status === 'attend' 
                ?<Box>出席</Box> 
                :array.status === 'substitute' 
                ?<Box>欠席</Box> 
                :array.status === 'absence' 
                ?
                <>
                <Box>代理</Box> 
                <Box>{array.agent}</Box>
                </>
                :""
              )}
            </Td>
          </Tr>
          </Tbody>
))}
        </Table>
      
      <MonthlyCleanComment />
      <Button>送信</Button>
    </Box>
 </>
  );
}

const MonthlyCleanComment = () => {
  return (
    <Box>
      <Box>具体的な清掃内容</Box>
      <Textarea />
      <Box>コメント</Box>
      <Textarea />
    </Box>
  );
};
