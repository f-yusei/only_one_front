'use client';
import { Box, Button,  Textarea,HStack,FormControl,FormLabel,Input,FormHelperText} from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'; // 本当に chakra-react-select を使いたい場合は、正しいインポートをしてください
import {useState} from 'react'

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
         
      {cleanData.studentStatus.map((array) => (
        <AttendChecker key = {array.student} studentAccount={array.student}/>
 
))}
        
      
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

type AttendCheckerProps = {
    studentAccount: string;
  };
  
  const AttendChecker = ({ studentAccount }: AttendCheckerProps) => {
    const [attendcheck, setAttendCheck] = useState('');
    return (
      <>
        <Box>
          <HStack>
            <Box width="60%">{studentAccount}</Box>
            <Select
            width="40%"
              onChange={(e) => {
                setAttendCheck(e.target.value);
              }}
              placeholder="未確認"
            >
              <option value={studentAccount + 'attend'}>出席</option>
              <option value={studentAccount + 'absence'}>欠席</option>
              <option value={studentAccount + 'substitute'}>代理</option>
            </Select>
          </HStack>
        </Box>
        {attendcheck === studentAccount + 'substitute' ? Substitute() : ''}
      </>
    );
  };

  const Substitute = () => {
    return (
      <FormControl>
        <FormLabel>代理者を入力してください</FormLabel>
        <Input type="text" />
        <FormHelperText>例：1M 高専太郎</FormHelperText>
      </FormControl>
    );
  };