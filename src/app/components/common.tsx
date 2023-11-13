import { Text, Select } from '@chakra-ui/react';

type SelectMonthAndDormitoryProps = {
  setDormitory: (dormitory: string) => void;
  setMonth: (month: string) => void;
  dormitory: string;
  month: string;
  tableName: string;
};

const SelectMonthAndDormitory = ({
  setDormitory,
  setMonth,
  dormitory,
  month,
  tableName,
}: SelectMonthAndDormitoryProps) => {
  return (
    <>
      <Select placeholder="寮棟を選択" onChange={(e) => setDormitory(e.target.value)} isRequired>
        <option value="山寮">山寮</option>
        <option value="海寮">海寮</option>
        <option value="宙寮">宙寮</option>
        <option value="中寮">中寮</option>
      </Select>
      <Text fontSize="l" m={2} color="red.500">
        {dormitory === '' ? '寮棟を選択してください' : ''}
      </Text>
      <Select
        placeholder="表を作成したい月を選択"
        onChange={(e) => setMonth(e.target.value)}
        isRequired
      >
        <option value="1">1月</option>
        <option value="2">2月</option>
        <option value="3">3月</option>
        <option value="4">4月</option>
        <option value="5">5月</option>
        <option value="6">6月</option>
        <option value="7">7月</option>
        <option value="8">8月</option>
        <option value="9">9月</option>
        <option value="10">10月</option>
        <option value="11">11月</option>
        <option value="12">12月</option>
      </Select>
      <Text fontSize="xl" m={2} color="red.500">
        {month === '' ? '表を作成したい月を選択してください' : ''}
      </Text>
      <Text fontSize="2xl" m={4}>
        {month + '月 ' + dormitory + ' ' + tableName}
      </Text>
    </>
  );
};

export default SelectMonthAndDormitory;
