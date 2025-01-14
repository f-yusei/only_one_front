'use client';
import { VStack, Box, Center, StackDivider, Button, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import React from 'react';
import NoScrollComponent from './OptUI ';
import { DormData, DormitoryMobileComponentProps } from '../types';
import util from '../util';
import { DisplayPublicBath, DisplayShower, DisplayWasher, DisplayDryer } from './DisplayComponents';
import { useDashboardDataStatuses } from '../hooks/useDashboardData';

const MobileComponent = () => {
  const dormData: DormData = {
    type: 'PB',
  };
  const { dashboardDataStatuses, error, isLoading } = useDashboardDataStatuses(dormData);

  if (dashboardDataStatuses.bathData === undefined || error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box style={{ width: '100vw', height: '100vh' }}>
          <NoScrollComponent />
          <VStack spacing="1vh" mt="3vh" height={'100%'}>
            <Box width={'90%'} height={'50%'}>
              <DisplayPublicBath bathData={dashboardDataStatuses.bathData} />
            </Box>

            <Box
              boxShadow="0 4px 8px rgba(0, 0.2, 0.2, 0.4)"
              borderWidth="1px"
              height="28vh"
              width="90vw"
              rounded={'xl'}
              background={'gray.50'}
            >
              <VStack borderColor={'black'} divider={<StackDivider />} spacing="0">
                <Link href="/yama">
                  <Button style={{ width: '90vw', height: '14vh' }} variant="outline">
                    <Center h="100%" fontWeight="bold" fontSize="300%">
                      山寮
                    </Center>
                  </Button>
                </Link>

                <Link href="/umi">
                  <Button style={{ width: '90vw', height: '14vh' }} variant="outline">
                    <Center h="100%" fontWeight="bold" fontSize="300%">
                      海寮
                    </Center>
                  </Button>
                </Link>
              </VStack>
            </Box>
          </VStack>
        </Box>
      )}
    </div>
  );
};

export const DormitoryMobileComponent: React.FC<DormitoryMobileComponentProps> = ({
  showerData,
  washerData,
  dryerData,
  dormitory,
}) => {
  return (
    <>
      <Box
        p={5}
        bg="gray.100"
        borderRadius="md"
        boxShadow="lg"
        mb={6}
        w={'100%'}
        h={'100vh'}
        mt={3}
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          mb={4}
          borderBottom="2px solid"
          borderColor="gray.300"
          pb={2}
        >
          {util.changeDormToDisplayName(dormitory)}
        </Text>
        <VStack spacing="1vh" height={'100%'}>
          <Box width={'90vw'} height={'20%'}>
            <DisplayShower showerData={showerData} dormitory={dormitory} />
          </Box>
          <Box width={'90vw'} height={'32%'}>
            <DisplayWasher washerData={washerData} dormitory={dormitory} />
          </Box>
          <Box width={'90vw'} height={'32%'}>
            <DisplayDryer dryerData={dryerData} dormitory={dormitory} />
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default MobileComponent;
