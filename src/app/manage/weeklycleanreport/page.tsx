'use client';
import { Input,FormControl,FormLabel,FormHelperText,Radio,RadioGroup,Textarea, Select, HStack, Box, Stack } from '@chakra-ui/react';
import { useState } from 'react';




export default function WeeklyCleanReport() {
    const studentName =  {
        one:"あーちゃん",
        two:"いーちゃん",
        three:"うーちゃん"
    };

  return (
    <Box m={5}>
      {AttendChecker(studentName.one)}
      {AttendChecker(studentName.two)}
      {WeeklyCleanValue("要項１")} 
      {WeeklyCleanValue("要項２")} 
      {WeeklyCleanValue("要項３")} 
      {WeeklyCleanValue("要項４")} 
      {WeeklyCleanComment()} 
    </Box>
  );
}

const AttendChecker = (studentAccount : string) => {
    const [attendcheck,setAttendCheck] = useState('出席');
  return (
    <>
    <Box>
    <HStack>
      <Box width="80%">{studentAccount}</Box>
      <Select
      onChange={(e) => {
       setAttendCheck(e.target.value)
      }} 
      placeholder="選択してください">
        <option value={studentAccount + "attend"}>出席</option>
        <option value={studentAccount + "absence"}>欠席</option>
        <option value={studentAccount + "substitute"}>代理</option>
      </Select>
    </HStack>
    </Box>
    { attendcheck === studentAccount + "substitute" ? Substitute() :""}
</>
  );
};

const WeeklyCleanValue = (cleanpoint: string) => {
  return (
    <Box>
      <Box>{cleanpoint}</Box>
     <RadioGroup >
        <Stack direction='row'>
            <Radio value='1'>1</Radio>
            <Radio value='2'>2</Radio>
            <Radio value='3'>3</Radio>
            <Radio value='4'>4</Radio>
            <Radio value='5'>5</Radio>
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
        <Input type = 'text' />
        <FormHelperText>例：1M 高専太郎</FormHelperText>
       </FormControl>
    );
};