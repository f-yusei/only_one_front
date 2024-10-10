'use client';
import { VStack, Box, Center, StackDivider, Button } from '@chakra-ui/react';
import { DisplayQrCode, DisplayPublicBath } from '../components/Dashboard';
//import { useDashboardData } from './hooks/useDashboardData';
import { Link } from '@chakra-ui/next-js';
import { useEffect, useState } from 'react';
import NoScrollComponent from './OptUI ';




const MobileComponent = () => {
  const [bathArray, setBathArray] = useState<boolean[]>([]);
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/dashboard?type=PB`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data && Array.isArray(data.PB)) {
          const boolArray = data.PB.map((value: number) => Boolean(value));
          setBathArray(boolArray);

        } else {
          console.error('Data is not in the expected format:', data);
        }

      } catch (error) {
        console.log(error); // ここでエラーをコンソールに表示
      }
    };

    fetchData();
  }, [NEXT_PUBLIC_API_URL]); // 空の配列を渡して、コンポーネントのマウント時に一度だけ実行されるようにする

  return (

    <Box
      style={{ width: '100vw', height: '100vh' }} >
        <NoScrollComponent/>
      <VStack spacing="1vh" mt="3vh" height={"100%"}>
        <Box width={"90%"} height={"50%"}>
          <DisplayPublicBath numberOfUsingBathData={bathArray} />
        </Box>


        <Box boxShadow="0 4px 8px rgba(0, 0.2, 0.2, 0.4)" borderWidth='1px' height="28vh" width="90vw" rounded={"xl"} background={'gray.50'}>
          <VStack borderColor={"black"}
            divider={<StackDivider />} spacing='0' >
            <Link href="/yama">
              <Button style={{ width: '90vw', height: '14vh' }} variant='outline'
              >
                <Center h="100%" fontWeight="bold" fontSize="300%">
                  山寮
                </Center>
              </Button>
            </Link>

            <Link href="/umi">

              <Button style={{ width: '90vw', height: '14vh' }} variant='outline'>
                <Center h="100%" fontWeight="bold" fontSize="300%">
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

export default MobileComponent;




