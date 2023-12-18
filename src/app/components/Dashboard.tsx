'use client';
import {
  Card,
  VStack,
  HStack,
  Text,
  Box,
  Center,
  Image,
  StackDivider,
  Flex,
} from '@chakra-ui/react';
import { v4 } from 'uuid';
import {
  DisplayShowerProps,
  DisplayPublicBathProps,
  DisplayWasherProps,
  DisplayDryerProps,
} from '../types';
import bathIcon from '../../../public/images/bathicon.png';

const DisplayWasher = ({ washerData }: DisplayWasherProps) => {
  const canUseWasher = washerData.filter((isUsingWasher) => isUsingWasher).length;
  return (
    <Card bgColor="gray.100" height="36vh" width="80vw" p="4">
      <VStack>
        <HStack>
          <Text>洗濯機使用可能台数</Text>
          <Text>{canUseWasher}</Text>
        </HStack>
      </VStack>
    </Card>
  );
};

const DisplayDryer = ({ dryerData }: DisplayDryerProps) => {
  const canUseDryer = dryerData.filter((isUsingDryer) => isUsingDryer).length;
  return (
    <Card bgColor="gray.100" height="36vh" width="80vw" p="4">
      <VStack>
        <Text>乾燥機使用可能台数</Text>
        <Text>{canUseDryer}</Text>
      </VStack>
    </Card>
  );
};

const DisplayShower = ({ showerData }: DisplayShowerProps) => {
  const canUseShower = showerData.filter((isUsingShower) => isUsingShower).length;
  return (
    <Box bgColor="gray.100" height="26vh" width="40vw">
      <HStack>
        <Text>シャワー室</Text>
        <Text>{canUseShower}</Text>
      </HStack>
    </Box>
  );
};

const DisplayPublicBath = ({ numberOfUsingBathData }: DisplayPublicBathProps) => {
  const id = v4();
  const textData = ['低学年', '中学年', '高学年'];
  return (
    // <Card bgColor="gray.100" height="28vh" width="80vw" boxShadow="xl">
    <Box
      boxShadow="0 4px 8px rgba(0, 0.2, 0.2, 0.4)"
      borderWidth="1px"
      height="48vh"
      width="80vw"
      rounded={'xl'}
    >
      <HStack borderColor={'black'} spacing="0vh" divider={<StackDivider />}>
        <Box height="48vh" width="100vw">
          <Center h="100%">
            <Box>
              <VStack>
                <Image boxSize="100px" objectFit="cover" src={bathIcon.src} alt="ローカル" />
                <Box>大浴場利用人数</Box>
              </VStack>
            </Box>
          </Center>
        </Box>
        <Box height="48vh" width="100vw">
          <VStack borderColor={'black'} spacing="0vh" divider={<StackDivider />}>
            {numberOfUsingBathData.map((numberOfUsingBath, index) => (
              <Flex
                key={id}
                height="16vh"
                width="40vw"
                align="center"
                justify="space-between"
                p="3"
              >
                <Box fontSize="xl">{textData[index]}</Box>
                <Box fontSize="xl">{numberOfUsingBath}人</Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

const DisplayQrCode = () => {
  return (
    <Card height="15vh" mt="0" width="80vw" boxShadow="0 4px 8px rgba(0, 0.2, 0.2, 0.4)">
      <Center h="100%" fontSize="xl">
        QRだああああ
      </Center>
    </Card>
  );
};

export { DisplayShower, DisplayPublicBath, DisplayQrCode, DisplayWasher, DisplayDryer };
