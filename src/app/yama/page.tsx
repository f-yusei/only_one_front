'use client';
import { Box } from '@chakra-ui/react';
import { DisplayDryer, DisplayShower, DisplayWasher } from '../components/Dashboard';
import { useYamaDashboardData } from '../hooks/useDashboardData';

const YamaDashboardPage = () => {
  const { yamaDashboardData, isError, isLoading } = useYamaDashboardData();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!yamaDashboardData) {
    return <div>そもそもデータ取得できてねーぞ</div>;
  }
  if (isError) {
    return <div>なんかエラー出たぞ</div>;
  }

  if (!yamaDashboardData.showerData) {
    return <div>シャワーのデータがねえぞおおおおおおおおお</div>;
  }

  if (!yamaDashboardData.washerData) {
    return <div>洗濯機のデータがねえぞおおおおおおおおお</div>;
  }

  if (!yamaDashboardData.dryerData) {
    return <div>乾燥機のデータがねえぞおおおおおおおおお</div>;
  }

  const { showerData, washerData, dryerData } = yamaDashboardData;

  return (
    <Box>
      <DisplayShower showerData={showerData} />
      <DisplayWasher washerData={washerData} />
      <DisplayDryer dryerData={dryerData} />
    </Box>
  );
};

export default YamaDashboardPage;
