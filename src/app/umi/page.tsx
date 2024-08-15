'use client';
import { Box } from '@chakra-ui/react';
import { DisplayShower, DisplayWasher, DisplayDryer } from '../components/Dashboard';
import { useUmiDashboardData } from '../hooks/useDashboardData';

const UmiDashboardPage = () => {
  const { umiDashboardData, isError, isLoading } = useUmiDashboardData();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!umiDashboardData) {
    return <div>そもそもデータ取得できてねーぞ</div>;
  }
  if (isError) {
    return <div>なんかエラー出たぞ</div>;
  }

  if (!umiDashboardData.showerData) {
    return <div>シャワーのデータがねえぞおおおおおおおおお</div>;
  }

  if (!umiDashboardData.washerData) {
    return <div>洗濯機のデータがねえぞおおおおおおおおお</div>;
  }

  if (!umiDashboardData.dryerData) {
    return <div>乾燥機のデータがねえぞおおおおおおおおお</div>;
  }

  const { showerData, washerData, dryerData } = umiDashboardData;
  // 既存の boolean[][] を boolean[][][] に変換
  const _showerData = [showerData]; // これで showerData は boolean[][][] になります
  const _washerData = [[washerData]]; // 同様に変換
  const _dryerData = [[dryerData]];   // 同様に変換
  return (
    <Box>
      <DisplayShower showerData={_showerData} />
      <DisplayWasher washerData={_washerData} />
      <DisplayDryer dryerData={_dryerData} />
    </Box>
  );
};

export default UmiDashboardPage;
