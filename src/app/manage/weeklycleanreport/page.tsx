'use client';
import { useCheckIsLoginNow } from '@/app/hooks/useCheckIsLoginNow';
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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WeeklyCleanReport() {
  const studentName = {
    one: 'あーちゃん',
    two: 'いーちゃん',
    three: 'うーちゃん',
  };
  const router = useRouter();

  const isLogin = useCheckIsLoginNow();
  useEffect(() => {
    if (!isLogin) {
      router.push('/manage/login');
    }
  }, [isLogin, router]);

  return (
    <Box m={5}>
      <AttendChecker studentAccount={studentName.one} />
      <AttendChecker studentAccount={studentName.two} />
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
  const [attendcheck, setAttendCheck] = useState('出席');
  return (
    <>
      <Box>
        <HStack>
          <Box width="80%">{studentAccount}</Box>
          <Select
            onChange={(e) => {
              setAttendCheck(e.target.value);
            }}
            placeholder="選択してください"
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
      <Textarea />
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
