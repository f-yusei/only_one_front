'use client';
import { Box } from '@chakra-ui/react';
import { DisplayDryer, DisplayShower, DisplayWasher } from '../components/Dashboard';
import { useYamaDashboardData } from '../hooks/useDashboardData';

const YamaDashboardPage = () => {
  const { dashboardData, isError, isLoading } = useYamaDashboardData();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!dashboardData) {
    return <div>そもそもデータ取得できてねーぞ</div>;
  }
  if (isError) {
    return <div>なんかエラー出たぞ</div>;
  }

  if (!dashboardData.showerData) {
    return <div>シャワーのデータがねえぞおおおおおおおおお</div>;
  }

  if (!dashboardData.washerData) {
    return <div>洗濯機のデータがねえぞおおおおおおおおお</div>;
  }

  if (!dashboardData.dryerData) {
    return <div>乾燥機のデータがねえぞおおおおおおおおお</div>;
  }

  const { showerData, washerData, dryerData } = dashboardData;

  return (
    <Box>
      <DisplayShower showerData={showerData} />
      <DisplayWasher washerData={washerData} />
      <DisplayDryer dryerData={dryerData} />
    </Box>
  );
};

export default YamaDashboardPage;
