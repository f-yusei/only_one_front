'use client';
import { VStack, Box, Center, StackDivider, Button, ButtonGroup } from '@chakra-ui/react';
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
            <Link href="/yama">
              <Button style={{ width: '80vw', height: '14vh' }} variant='outline'
              >


                <Center h="100%" fontWeight="bold" fontSize="130%">
                  山寮
                </Center>


              </Button>
            </Link>

            <Link href="/umi">

              <Button style={{ width: '80vw', height: '14vh' }} variant='outline'>
                <Center h="100%" fontWeight="bold" fontSize="130%">
                  海寮
                </Center>
              </Button>
            </Link>

          </VStack>
        </Box>
      </VStack >
    </Box >
  );
}
