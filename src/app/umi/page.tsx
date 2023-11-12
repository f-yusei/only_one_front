'use client';
import { Box } from '@chakra-ui/react';
import { DisplayShower, DisplayWasher, DisplayDryer } from '../components/Dashboard';
import { useUmiDashboardData } from '../hooks/useDashboardData';

const UmiDashboardPage = () => {
  const { dashboardData, isError, isLoading } = useUmiDashboardData();
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

export default UmiDashboardPage;
