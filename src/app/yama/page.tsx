'use client';
import { Box, VStack, Link, Button, Text } from '@chakra-ui/react';
import { DisplayDryer, DisplayShower, DisplayWasher } from '../components/Dashboard';
import { useYamaDashboardData } from '../hooks/useDashboardData';
import NoScrollComponent from '../components/OptUI ';
import { DormitoryMobailComponent } from '../components/MobileComponent';

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
    <DormitoryMobailComponent showerData={_showerData} washerData={_washerData} dryerData={_dryerData} dormitory='MOU'/>
  );
};

export default YamaDashboardPage;
