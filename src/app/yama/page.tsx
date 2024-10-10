'use client';
import { Box ,VStack,Link,Button,Text} from '@chakra-ui/react';
import { DisplayDryer, DisplayShower, DisplayWasher } from '../components/Dashboard';
import { useYamaDashboardData } from '../hooks/useDashboardData';
import NoScrollComponent from '../components/OptUI ';

const YamaDashboardPage = () => {
  // const { yamaDashboardData, isError, isLoading } = useYamaDashboardData();
  // if (isLoading) {
  //   return <div>loading...</div>;
  // }
  // if (!yamaDashboardData) {
  //   return <div>そもそもデータ取得できてねーぞ</div>;
  // }
  // if (isError) {
  //   return <div>なんかエラー出たぞ</div>;
  // }

  // if (!yamaDashboardData.showerData) {
  //   return <div>シャワーのデータがねえぞおおおおおおおおお</div>;
  // }

  // if (!yamaDashboardData.washerData) {
  //   return <div>洗濯機のデータがねえぞおおおおおおおおお</div>;
  // }

  // if (!yamaDashboardData.dryerData) {
  //   return <div>乾燥機のデータがねえぞおおおおおおおおお</div>;
  // }

  const _showerData: boolean[][] = [
    [true, false],
    [false, true]
  ];

  const _washerData: boolean[][][] = [
    [
      [false, false, false, false], // 1行目
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
      [false, true, false, false], // 1行目
      [false, false, false, false], // 2行目
      [false, false, false, false]  // 3行目
    ],
    [
      [true, true, true, false], // 1行目
      [true, true, false, false], // 2行目
      [false, true, false, false]  // 3行目
    ]
  ];

  // const { showerData, washerData, dryerData } = yamaDashboardData;
  // const _showerData = [showerData]; // これで showerData は boolean[][][] になります
  // const _washerData = [[washerData]]; // 同様に変換
  // const _dryerData = [[dryerData]];   // 同様に変換
  return (

    <Box style={{ width: '100%', height: '100vh' }}>

      
      <VStack spacing="1vh" height={"100%"} >
        <Box
          fontSize="5xl" // テキストを大きく
          fontWeight="bold" // 太字にする
        >
          山寮
        </Box>
        <Box width={"90vw"} height={"20vh"}>  {/* 2の比率 */}
          <DisplayShower showerData={_showerData} dormitory='MOU' />
        </Box>
        <Box width={"90vw"} height={"30vh"}>  {/* 3の比率 */}
          <DisplayWasher washerData={_washerData} dormitory='MOU' />
        </Box>
        <Box width={"90vw"} height={"30vh"}>  {/* 3の比率 */}
          <DisplayDryer dryerData={_dryerData} dormitory='MOU'/>
        </Box>
        <Link href='/'>
      <Button
          size={"lg"}
            bg="gray.500"
            color="white"
            _hover={{ bg: "gray.600" }}
            borderRadius="2"
            shadow="md"
            w="100%"
            justifyContent={"flex-end"}
            
          >
            トップページに戻る
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default YamaDashboardPage;
