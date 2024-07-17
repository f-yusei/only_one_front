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
  Button,
} from '@chakra-ui/react';
import { v4 } from 'uuid';
import {
  DisplayShowerProps,
  DisplayPublicBathProps,
  DisplayWasherProps,
  DisplayDryerProps,
  WashAndDryProps,
  BuildingProps,
} from '../types';
import bathIcon from '../../../public/images/bathicon.png';
import { StaticImageData } from 'next/image';
import { Link } from '@chakra-ui/next-js';




const DisplayWasher = ({ washerData }: DisplayWasherProps) => {
  const canUseWasher = washerData.filter((isUsingWasher) => isUsingWasher).length;
  return (
    <Card bgColor="gray.100" height="36vh" width="80vw" p="4">
      <VStack>
        <HStack>
          <Text fontWeight="bold">洗濯機使用可能台数</Text>
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
        <Text fontWeight="bold">乾燥機使用可能台数</Text>
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
        <Text fontWeight="bold">シャワー室</Text>
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
      fontWeight="bold" fontSize="125%"
    >
      <HStack borderColor={'black'} spacing="0vh" divider={<StackDivider />}>
        <Box height="48vh" width="100vw">
          <Center h="100%">
            <Box>
              <VStack>
                <Image boxSize="100px" objectFit="cover" src={bathIcon.src} alt="ローカル" />
                <Box  >大浴場利用人数</Box>
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
                <Box fontSize="90%" >{textData[index]}</Box>
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
      <Center h="100%" fontSize="200%" fontFamily="Impact">
        Coming Soon...
      </Center>
    </Card>
  );
};

// type WashAndDryProps = {
//   data: number[];
//   image: StaticImageData;
//   name: string;

// };
// type ShawerProps = {
//   data: number;
//   image: StaticImageData;
//   name: string;

// };
// type BuildingProps = {
//   Wash: WashAndDryProps;
//   Dry: WashAndDryProps;
//   Shawer: ShawerProps;

// };
const WashAndDry = ({ data, image, name }: WashAndDryProps) => {
  return (
    <Box boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)" borderWidth='1px' height="auto" width="80vw" rounded="xl" padding="0rem">
      <HStack borderColor="black" divider={<StackDivider />} spacing='0'>
        <Box width={"50%"}>
          <Center>
            <Image src={image.src} alt="Logo" />
          </Center>
          <Text textAlign={"center"} fontWeight="bold">{name}</Text>
        </Box>
        <Box width={"50%"}>
          <VStack borderColor="black" divider={<StackDivider />} spacing='0'>

            <Flex
              height="8vh"
              width="38vw"
            >
              <Box>3F:</Box>
              <Center flex="1" textAlign="center" fontSize="200%"> {data[0]}</Center>
            </Flex>
            <Flex
              height="8vh"
              width="38vw"
            >
              <Box>2F:</Box>
              <Center flex="1" textAlign="center" fontSize="200%"> {data[1]}</Center>
            </Flex>
            <Flex
              height="8vh"
              width="38vw"
            >
              <Box>1F:</Box>
              <Center flex="1" textAlign="center" fontSize="200%"> {data[2]}</Center>
            </Flex>
          </VStack>
        </Box>
      </HStack>
    </Box >
  );
};

const BuildingPage = ({ Wash, Dry, Shawer }: BuildingProps) => {
  return (
    <Box
      style={{ width: '100vw', height: '100vh' }}
      padding="2rem"
    >
      <VStack spacing="2vh" mt="6vh">

        {/* シャワー室空室数 */}
        <Box boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)" borderWidth='1px' height="auto" width="80vw" rounded="xl" padding="1rem">
          <HStack borderColor="black" divider={<StackDivider />} spacing='0'>
            <Box width={"50%"}>
              <Center>
                <Image src={bathIcon.src} alt="Logo" />
              </Center>
              <Text textAlign={"center"} fontWeight="bold">シャワー室空室数</Text>
            </Box>
            <Box width={"50%"}>
              <Center fontSize="200%">{Shawer.data}</Center>
            </Box>
          </HStack>
        </Box>

        {/* 洗濯機利用可能台数 */}
        <WashAndDry data={Wash.data} name="洗濯機利用可能台数" image={bathIcon}></WashAndDry>
        {/* 乾燥機 */}
        <WashAndDry data={Dry.data} name="乾燥機利用可能台数" image={bathIcon}></WashAndDry>
      </VStack >
    </Box >
  );
}

export { DisplayShower, DisplayPublicBath, DisplayQrCode, DisplayWasher, DisplayDryer, BuildingPage };
