'use client';
import { VStack, HStack, Box } from '@chakra-ui/react';
import {
  DisplayQrCode,
  DisplayPublicBath,
  DisplayShower,
  DisplayWasherAndDryer
} from './components/Dashboard';
import { useDashboardData } from './hooks/useDashboardData';

export default function Home() {
  const { dashboardData, isError, isLoading } = useDashboardData();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!dashboardData) {
    return <div>no data</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  
  const { yamaDryerData, yamaShowerData, yamaWasherData, numberOfUsingBathData } = dashboardData;
  return (
    <Box>
      <VStack>
        <DisplayQrCode />
        <HStack>
          <DisplayPublicBath numberOfUsingBathData ={numberOfUsingBathData} />
          <DisplayShower showerData={yamaShowerData} />
        </HStack>
        <DisplayWasherAndDryer washerData={yamaWasherData} dryerData={yamaDryerData} />
      </VStack>
    </Box>
  );
  
}
