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

  return (
    <Box>
      <DisplayShower showerData={showerData} />
      <DisplayWasher washerData={washerData} />
      <DisplayDryer dryerData={dryerData} />
    </Box>
  );
};

export default UmiDashboardPage;
