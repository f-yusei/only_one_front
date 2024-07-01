'use client';
import { VStack, Box, Center, StackDivider, Button } from '@chakra-ui/react';
import { DisplayQrCode, DisplayPublicBath, DisplayWasher, DisplayDryer, DisplayShower } from '../components/Dashboard';
//import { useDashboardData } from './hooks/useDashboardData';
import { Link } from '@chakra-ui/next-js';
import "../style/Desktop.css";
import { Flex, Text } from '@chakra-ui/react';

const DesctopComponent = () => {

  const numberOfUsingBathData = [4, 3, 5];
  // 3次元のboolean配列を定義します
  const threeArray: boolean[][][] = [
    [
      [true, false, true],
      [false, true, false],
      [false, true, false]
    ],
    [
      [true, false, true],
      [false, false, true],
      [true, true, true]
    ]
  ];

  const twoArray: boolean[][] = [
    [true, true],
    [true, true]
  ];
  const Menu = () => {
    return (
      <Box width="20%" bg="gray.200" p={4}>
        <Text fontSize="xl" fontWeight="bold">メニュー</Text>
        <Box mt={4}>
          <Text>メニュー項目1</Text>
          <Text>メニュー項目2</Text>
          <Text>メニュー項目3</Text>
          {/* 他のメニュー項目を追加 */}
        </Box>
      </Box>
    );
  };

  // const data = [true, false];
  return (
    <Flex height="90vh" width={"100%"}>
      <Menu />


      <Box className="grid-container"> {/* グリッドコンテナのクラスを追加 */}
        <div className="grid-item">
          <DisplayPublicBath numberOfUsingBathData={numberOfUsingBathData} />
        </div>
        <div className="grid-item">
          <DisplayShower showerData={twoArray} />
        </div>
        <div className="grid-item">
          <DisplayWasher washerData={threeArray} />
        </div>
        <div className="grid-item">
          <DisplayDryer dryerData={threeArray} />
        </div>
      </Box>
    </Flex>
  );
}

export default DesctopComponent;
