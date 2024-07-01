// 'use client';
// import { Box } from '@chakra-ui/react';
// import { DisplayDryer, DisplayShower, DisplayWasher } from '../components/Dashboard';
// import { useYamaDashboardData } from '../hooks/useDashboardData';

// const YamaDashboardPage = () => {
//   const { yamaDashboardData, isError, isLoading } = useYamaDashboardData();
//   if (isLoading) {
//     return <div>loading...</div>;
//   }
//   if (!yamaDashboardData) {
//     return <div>そもそもデータ取得できてねーぞ</div>;
//   }
//   if (isError) {
//     return <div>なんかエラー出たぞ</div>;
//   }

//   if (!yamaDashboardData.showerData) {
//     return <div>シャワーのデータがねえぞおおおおおおおおお</div>;
//   }

//   if (!yamaDashboardData.washerData) {
//     return <div>洗濯機のデータがねえぞおおおおおおおおお</div>;
//   }

//   if (!yamaDashboardData.dryerData) {
//     return <div>乾燥機のデータがねえぞおおおおおおおおお</div>;
//   }

//   const { showerData, washerData, dryerData } = yamaDashboardData;

//   return (
//     <Box>
//       <DisplayShower showerData={showerData} />
//       <DisplayWasher washerData={washerData} />
//       <DisplayDryer dryerData={dryerData} />
//     </Box>
//   );
// };

// export default YamaDashboardPage;
'use client';
import {
  Image, VStack, HStack, Box, Center, StackDivider, Text, Flex,
} from '@chakra-ui/react';
import bathIcon from '../../../public/images/bathicon.png';
import { StaticImageData } from 'next/image';

type WashAndDryProps = {
  data: number[];
  image: StaticImageData;
  name: string;

};

type ShawerProps = {
  data: number;
  image: StaticImageData;
  name: string;

};

type BuildingProps = {
  Wash: WashAndDryProps;
  Dry: WashAndDryProps;
  Shawer: ShawerProps;

};

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

export default function Home({ Wash, Dry, Shawer }: BuildingProps) {
  const showerRoomAvailability = 1;
  const washingMachineAvailability = [1, 0, 2];
  const dryerAvailability = [2, 2, 3];

  const _Wash: WashAndDryProps = {
    data: washingMachineAvailability,
    image: bathIcon,
    name: "洗濯機利用可能台数"
  }
  const _Dry: WashAndDryProps = {
    data: dryerAvailability,
    image: bathIcon,
    name: "乾燥機利用可能台数"
  }
  const _Shawer: ShawerProps = {
    data: showerRoomAvailability,
    image: bathIcon,
    name: "シャワー室空室数"
  }
  return (
    <BuildingPage Wash={_Wash} Dry={_Dry} Shawer={_Shawer} />
  );
}


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