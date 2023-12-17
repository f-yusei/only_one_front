'use client';
import { VStack, HStack, Box } from '@chakra-ui/react';
import { DisplayQrCode, DisplayPublicBath } from './components/Dashboard';
import { useDashboardData } from './hooks/useDashboardData';
import Link from 'next/link';

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

  const { numberOfUsingBathData } = dashboardData;
  if (!numberOfUsingBathData) {
    return <div>風呂のデータがねえぞおおおおおおおおお</div>;
  }

  return (
    <Box>
      <VStack>
        <DisplayQrCode />
        <DisplayPublicBath numberOfUsingBathData={numberOfUsingBathData} />
        <HStack>
          <Link href="/yama">山寮</Link>
          <Link href="/umi">海寮</Link>
        </HStack>
      </VStack>
    </Box>
  );
}
