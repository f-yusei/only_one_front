'use client';
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Textarea,
  Select,
  HStack,
  Box,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

const cleanData = {
  cleanTimes: 1,
  dormname: 'MON',
  floor: 1,
  studentStatus: [
    {
      student: '1I 村上亜士沙',
      cleaningStatus: 'attend',
      agent: '',
    },
    {
      student: '2I 蔵田修也',
      cleaningStatus: 'attend',
      agent: '',
    },
    {
      student: '3I 福井郵政',
      cleaningStatus: 'absence',
      agent: '',
    },
    {
      student: '4I ばいがるまほびとぐるドゥル',
      cleaningStatus: 'substitute',
      agent: '1I 田中ゆうき',
    },
  ],
};

export default function WeeklyCleanReport() {
  return (
    <Box m={1}>
      <Box>週例清掃</Box>
      {cleanData.studentStatus.map((array) => (
        <AttendChecker key={array.student} studentAccount={array.student} />
      ))}
      <WeeklyCleanValue cleanpoint="要項１" />
      <WeeklyCleanValue cleanpoint="要項２" />
      <WeeklyCleanValue cleanpoint="要項３" />
      <WeeklyCleanValue cleanpoint="要項４" />
      <WeeklyCleanComment />
    </Box>
  );
}

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
            placeholder="選択"
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

type WeeklyCleanValueProps = {
  cleanpoint: string;
};

const WeeklyCleanValue = ({ cleanpoint }: WeeklyCleanValueProps) => {
  return (
    <Box>
      <Box>{cleanpoint}</Box>
      <RadioGroup>
        <Stack direction="row">
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
          <Radio value="3">3</Radio>
          <Radio value="4">4</Radio>
          <Radio value="5">5</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};
const WeeklyCleanComment = () => {
  return (
    <Box>
      <Box>なんかあったら書いてもらう</Box>
      <Textarea m={1} width="98%" height={30} />
    </Box>
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
