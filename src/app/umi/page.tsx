'use client';
import { Box ,VStack} from '@chakra-ui/react';
import { DisplayShower, DisplayWasher, DisplayDryer } from '../components/Dashboard';
import { useUmiDashboardData } from '../hooks/useDashboardData';
import NoScrollComponent from '../components/OptUI ';

const UmiDashboardPage = () => {
  //const { umiDashboardData, isError, isLoading } = useUmiDashboardData();
  // if (isLoading) {
  //   return <div>loading...</div>;
  // }
  // if (!umiDashboardData) {
  //   return <div>そもそもデータ取得できてねーぞ</div>;
  // }
  // if (isError) {
  //   return <div>なんかエラー出たぞ</div>;
  // }

  // if (!umiDashboardData.showerData) {
  //   return <div>シャワーのデータがねえぞおおおおおおおおお</div>;
  // }

  // if (!umiDashboardData.washerData) {
  //   return <div>洗濯機のデータがねえぞおおおおおおおおお</div>;
  // }

  // if (!umiDashboardData.dryerData) {
  //   return <div>乾燥機のデータがねえぞおおおおおおおおお</div>;
  // }



  //const { showerData, washerData, dryerData } = umiDashboardData;
  // 既存の boolean[][] を boolean[][][] に変換
 // const _showerData = [showerData]; // これで showerData は boolean[][][] になります
  //const _washerData = [[washerData]]; // 同様に変換
  //const _dryerData = [[dryerData]];   // 同様に変換
  const _showerData: boolean[][] = [
    [true, false],
    [false, true]
  ];

  const _washerData: boolean[][][] = [
    [
      [false, true, false, false], // 1行目
      [false, false, false, false], // 2行目
      [false, false, false, false]  // 3行目
    ],
    [
      [false, true, false, false], // 1行目
      [false, true, true, false], // 2行目
      [true, true, true, false]  // 3行目
    ]
  ];

  const _dryerData: boolean[][][] = [
    [
      [false, false, false, false], // 1行目
      [false, false, false, false], // 2行目
      [false, false, false, false]  // 3行目
    ],
    [
      [true, true, true, false], // 1行目
      [true, true, false, false], // 2行目
      [false, true, false, false]  // 3行目
    ]
  ];
  

  return (
    <Box style={{ width: '100%', height: '100vh' }}>
      <NoScrollComponent/>
      <VStack spacing="1vh" height={"100%"} >
        <Box width={"90vw"} height={"3vh"}/>
        <Box width={"90vw"} height={"20vh"}>  {/* 2の比率 */}
          <DisplayShower showerData={_showerData} dormitory='SEA' />
        </Box>
        <Box width={"90vw"} height={"30vh"}>  {/* 3の比率 */}
          <DisplayWasher washerData={_washerData} dormitory='SEA' />
        </Box>
        <Box width={"90vw"} height={"30vh"}>  {/* 3の比率 */}
          <DisplayDryer dryerData={_dryerData} dormitory='SEA'/>
        </Box>
        <Box width={"90vw"} height={"3vh"}/>
      </VStack>
    </Box>
  );
};

export default UmiDashboardPage;
