'use client';
import { VStack, HStack, Box } from '@chakra-ui/react';
import {
  DisplayQrCode,
  DisplayPublicBath,
  DisplayShower,
  DisplayWasherAndDryer,
} from './components/Dashboard';
import { useDashboardData } from './hooks/useDashboardData';

export default function Home() {
  const { dashboardData, isError, isLoading } = useDashboardData();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }
  if (!dashboardData) {
    return <div>no data</div>;
  }
  const { dryerData, showerData, washerData } = dashboardData;
  return (
    <Box>
      <VStack>
        <DisplayQrCode />
        <HStack>
          <DisplayPublicBath numberOfUsingBath={3} />
          <DisplayShower showerData={showerData} />
        </HStack>
        <DisplayWasherAndDryer washerData={washerData} dryerData={dryerData} />
      </VStack>
    </Box>
  );
}
