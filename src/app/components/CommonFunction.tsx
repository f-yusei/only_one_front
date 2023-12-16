'use client';
import { Text, Select, Box, Button, Collapse, useDisclosure } from '@chakra-ui/react';

type SelectMonthAndDormitoryProps = {
  setDormitory: (dormitory: string) => void;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
  dormitory: string;
  month: string;
  year: string;
  tableName: string;
};

const SelectMonthAndDormitory = ({
  setDormitory,
  setMonth,
  setYear,
  dormitory,
  year,
  month,
  tableName,
}: SelectMonthAndDormitoryProps) => {
  return (
    <>
      <Select placeholder="寮棟を選択" onChange={(e) => setDormitory(e.target.value)} isRequired>
        <option value="山">山寮</option>
        <option value="海">海寮</option>
        <option value="宙">宙寮</option>
        <option value="中">中寮</option>
      </Select>
      <Text fontSize="l" m={2} color="red.500">
        {dormitory === '' ? '寮棟を選択してください' : ''}
      </Text>
      <Select placeholder="年を選択" onChange={(e) => setYear(e.target.value)} isRequired>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </Select>
      <Text fontSize="xl" m={2} color="red.500">
        {year === '' ? '表を作成したい年を選択してください' : ''}
      </Text>

      <Select placeholder="月を選択" onChange={(e) => setMonth(e.target.value)} isRequired>
        <option value="01">1月</option>
        <option value="02">2月</option>
        <option value="03">3月</option>
        <option value="04">4月</option>
        <option value="05">5月</option>
        <option value="06">6月</option>
        <option value="07">7月</option>
        <option value="08">8月</option>
        <option value="09">9月</option>
        <option value="10">10月</option>
        <option value="11">11月</option>
        <option value="12">12月</option>
      </Select>

      <Text fontSize="xl" m={2} color="red.500">
        {month === '' ? '表を作成したい月を選択してください' : ''}
      </Text>

      <Text fontSize="2xl" m={4}>
        {year + '年' + month + '月 ' + dormitory + '寮' + ' ' + tableName}
      </Text>
    </>
  );
};

type CollapseExProps = {
  children: React.ReactNode;
  day: string;
};

const CollapseEx = ({ children, day }: CollapseExProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>{day}</Button>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
          {children}
        </Box>
      </Collapse>
    </>
  );
};

export { SelectMonthAndDormitory, CollapseEx };
