'use client';
import { VStack, Box, Center,  StackDivider } from '@chakra-ui/react';
import { DisplayQrCode, DisplayPublicBath } from './components/Dashboard';
//import { useDashboardData } from './hooks/useDashboardData';
import { Link } from '@chakra-ui/next-js';

export default function Home() {
  // const { dashboardData, isError, isLoading } = useDashboardData();
  // if (isLoading) {
  //   return <div>loading...</div>;
  // }
  // if (!dashboardData) {
  //   return <div>そもそもデータ取得できてねーぞ</div>;
  // }
  // if (isError) {
  //   return <div>なんかエラー出たぞ</div>;
  // }

  // const { numberOfUsingBathData } = dashboardData;
  // if (!numberOfUsingBathData) {
  //   return <div>風呂のデータがねえぞおおおおおおおおお</div>;
  // }

  const numberOfUsingBathData = [4, 3, 5];

  return (

    <Box
      style={{ width: '100vw', height: '100vh' }} >
      <VStack spacing="1vh" mt="6vh">
        <DisplayQrCode />
        <DisplayPublicBath numberOfUsingBathData={numberOfUsingBathData} />



        <Box boxShadow="0 4px 8px rgba(0, 0.2, 0.2, 0.4)" borderWidth='1px' height="28vh" width="80vw" rounded={"xl"}>
          <VStack borderColor={"black"}
            divider={<StackDivider />} spacing='0' >
            <Box style={{ width: '80vw', height: '14vh' }}
            >


              <Center h="100%">
                <Link href="/yama" fontSize="xl">
                  山寮
                </Link>
              </Center>


            </Box>

            <Box style={{ width: '80vw', height: '14vh' }}  >
              <Center h="100%">
                <Link href="/umi" fontSize="xl">海寮</Link>
              </Center>
            </Box>
          </VStack>
        </Box>
      </VStack >
    </Box >
  );
}
