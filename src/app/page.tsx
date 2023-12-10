'use client';
import { VStack, HStack, Box } from '@chakra-ui/react';
import { DisplayQrCode, DisplayPublicBath, DisplayShower } from './components/Dashboard';
import { useDashboardData } from './hooks/useDashboardData';

export default function Home() {
  const { dashboardData, isError, isLoading } = useDashboardData();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!dashboardData) {
    return <div>そもそもデータ取得できてねーぞ</div>;
  }
  if (isError) {
    return <div>なんかエラー出たぞ</div>;
  }

  const { yamaShowerData, numberOfUsingBathData } = dashboardData;
  return (
    <Box>
      <VStack>
        <DisplayQrCode />
        <DisplayPublicBath numberOfUsingBathData={numberOfUsingBathData} />
        <HStack>
          <DisplayPublicBath numberOfUsingBathData={numberOfUsingBathData} />
          <DisplayShower showerData={yamaShowerData} />
        </HStack>
      </VStack>
    </Box>
  );
}
