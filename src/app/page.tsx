'use client';
import { VStack, HStack, Box } from '@chakra-ui/react';
import {
  DisplayQrCode,
  DisplayPublicBath,
  DisplayShower,
  DisplayWasherAndDryer,
} from './components/Dashboard';
import { useDashboardData } from './hooks/useDashboardData';
import { Link } from '@chakra-ui/next-js';

export default function Home() {
  // const { dashboardData, isError, isLoading } = useDashboardData();
  // if (isLoading) {
  //   return <div>loading...</div>;
  // }
  // if (!dashboardData) {
  //   return <div>no data</div>;
  // }
  // if (isError) {
  //   return <div>error</div>;
  // }

  // const { numberOfUsingBathData } = dashboardData;
  return (
    <Box>
      <VStack>
        <DisplayQrCode />
        <DisplayPublicBath numberOfUsingBathData={[2, 3, 4]} />
        <HStack>
          <Link href="/yama">山寮</Link>
          <Link href="/umi">海寮</Link>
        </HStack>
      </VStack>
    </Box>
  );
}
