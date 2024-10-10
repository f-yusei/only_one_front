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
  background
} from '@chakra-ui/react';
// import { v4 } from 'uuid';
import {
  DisplayPublicBathProps,
  DisplayShowerProps,
  DisplayWasherProps,
  DisplayDryerProps,
} from '../types';
import bath from '../../../public/images/bath.png';
import dryer from '../../../public/images/dryer.png';
import washer from '../../../public/images/washer.png';
import shower from '../../../public/images/shower.png';
import { StaticImageData } from 'next/image'; // インポートが機能しない場合の代替策

const boxStyles = {
  // bgColor: 'gray.100', // 例としてコメントアウトしていますが、必要に応じて追加してください
  height: '100%',
  width: '100%',
  boxShadow: '0 4px 8px rgba(0, 0.2, 0.2, 0.4)',
  // borderWidth: '1px',
  rounded: 'xl',
  fontWeight: 'bold',
  fontSize: '125%',
  background:"gray.50"
};

import { useRouter } from 'next/navigation';
import utill from '../util';





const countTrueValues = (data: boolean[]) => {
  if (!data) {
    return 0;
  }
  return data.filter(value => value).length;
};

interface CustomStackProps {
  children: React.ReactNode;
}

interface CustomFlexProps {
  children: React.ReactNode;
}

const CustomHStack: React.FC<CustomStackProps> = ({ children }) => {
  return (
    <HStack borderColor="black" spacing="0vh" height="100%" divider={<StackDivider />} align="center">
      {children}
    </HStack>
  );
};
const CustomVStack: React.FC<CustomStackProps> = ({ children }) => {
  return (
    <VStack borderColor={'black'} spacing="0vh" height="100%" width={"100%"} divider={<StackDivider />}>
      {children}
    </VStack>
  );
};

const CustomFlex: React.FC<CustomFlexProps> = ({ children }) => {
  return (
    <Flex
      height="100%"
      width="100%"
      align="center"
      justify="space-between"
      p="3"
      position="relative"

    >{children}</Flex>
  );
};
interface DryOrWashProps {
  dormitory: "MOU" |"SEA"|"ALL";
  type: "DR" | "WA" | "SW" | "PB" | "ALL";
  Data: boolean[][][];
  image: StaticImageData;
}


const DisplayDryOrWash: React.FC<DryOrWashProps> = ({ type, Data, image, dormitory }) => {
  const router = useRouter();
  interface DryOrWashAnaProps {
    dormitory: "MOU" |"SEA"|"ALL";
    floor:string;
  }
  const dryOrWashTrans = ({dormitory,floor} : DryOrWashAnaProps) => {
    if(type==="DR"){
    router.push(`/analysis/dm/${dormitory}/${floor}`);
    }else if(type==="WA"){
    router.push(`/analysis/wm/${dormitory}/${floor}`);
}

  };
  return (
    <Card {...boxStyles} >
      <CustomHStack >
        <Box width={"50%"} height={"100%"}>
          <Center h="100%">
            <VStack>
              <Image src={image.src} alt="Dryer Image" objectFit="cover" boxSize="30%" />
              <Text fontWeight="bold" fontSize="90%">{utill.changeTypeToDisplayName(type)}使用可能台数</Text>
            </VStack>

          </Center>
        </Box>
        <Box width={"50%"} height={"100%"}>
          <CustomVStack>
                  {Data && Data[dormitory == "MOU" ? 0 : 1] && 
  Data[dormitory == "MOU" ? 0 : 1].map((row, i) => (
                    <Button onClick={() => dryOrWashTrans({ dormitory:dormitory, floor: i+1 as unknown as string})} key={i} style={{ width: "100%", height: "33%", background:"gray.50"}} variant='outline'>
                    <CustomFlex>
                      <Box fontSize="90%">{i+1 as unknown as string}階</Box>
                      <Flex justifyContent="center" alignItems="center" flex="1">
                      <Box fontSize="200%">{countTrueValues(row)}</Box>
                      </Flex>
                    </CustomFlex>
                    </Button>
                  ))}
               
          </CustomVStack>
        </Box>
      </CustomHStack>
    </Card>
  );
};
const DisplayWasher = ({ washerData,dormitory }: DisplayWasherProps) => {
  return (
    <DisplayDryOrWash type="WA" Data={washerData} image={washer} dormitory={dormitory} ></DisplayDryOrWash>
  );
};

const DisplayDryer = ({ dryerData,dormitory }: DisplayDryerProps) => {

  return (<DisplayDryOrWash type="DR" Data={dryerData} image={dryer} dormitory={dormitory}></DisplayDryOrWash>

  );
};

const DisplayShower = ({ showerData,dormitory }: DisplayShowerProps) => {
  const router = useRouter();
  const shouwerTrans = (dormitory: string) => {
    router.push(`/analysis/pb/${dormitory}`)
  };
  return (
    <Box {...boxStyles} >
      <CustomHStack>
        <Box height="100%" width="50%">
          <Center h="100%">
            <VStack>
              <Image boxSize="30%" objectFit="cover" src={shower.src} alt="ローカル" />

              <Text fontWeight="bold" fontSize="85%">シャワー室利用可能数</Text>
            </VStack>
          </Center>
        </Box>
        <Box height="100%" width="50%">
          <CustomVStack>
              <Button  onClick={() => shouwerTrans(dormitory)}  style={{ width: "100%", height: "100%" ,background:"gray.10" }} variant='outline'>
                    <Text justifyContent="center" alignItems="center" fontSize="200%">{countTrueValues(showerData[dormitory=="MOU" ? 0 : 1])}</Text>
              </Button>
          </CustomVStack>
        </Box>
      </CustomHStack>
    </Box >
  );
};

const DisplayPublicBath = ({ numberOfUsingBathData }: DisplayPublicBathProps) => {
  const textData = ['1', '2', '3'];
  const _numberOfUsingBathData = [countTrueValues(numberOfUsingBathData), null, null];
  const router = useRouter();
  const BathTrans = (bathNumber: string) => {
    router.push(`/analysis/pb/${bathNumber}`)
  };
  return (
    // <Card bgColor="gray.100" height="28vh" width="80vw" boxShadow="xl">
    <Box
      {...boxStyles}
    >
      <CustomHStack>
        <Box height="100%" width="100%">
          <Center h="100%">
            <Box>
              <VStack>
                <Image boxSize="30%" objectFit="cover" src={bath.src} alt="ローカル" />
                <Box fontSize="100%">大浴場利用人数</Box>
              </VStack>
            </Box>
          </Center>
        </Box>
        <Box height="100%" width="100%">
          <CustomVStack >
            {_numberOfUsingBathData.map((numberOfUsingBath, index) => (
                <Button onClick={() => BathTrans(textData[index])} key={index} style={{ width: "100%", height: "33%", background:"gray.10"}} variant='outline'>
                <CustomFlex >
                  <Box fontSize="90%" >{textData[index]}</Box>
                  <Flex justifyContent="center" alignItems="center" flex="1">
                    <Box>
                      {numberOfUsingBath !== null ? (
                        <Box justifyContent="center" alignItems="center" fontSize="200%">
                          {numberOfUsingBath}
                        </Box>
                      ) : (
                        <Box justifyContent="center" alignItems="center" fontSize="100%">Coming Soon..</Box>
                      )}
                    </Box>
                  </Flex>
                </CustomFlex>
                </Button>
           
            ))}
          </CustomVStack>

        </Box>
      </CustomHStack >
    </Box >
  );
};

const DisplayQrCode = () => {
  return (
    <Card height="15vh" mt="0" width="90vw" boxShadow="0 4px 8px rgba(0, 0.2, 0.2, 0.4)">
      <Center h="100%" fontSize="200%" fontFamily="Impact">
        Coming Soon...
      </Center>
    </Card>
  );
};

export { DisplayShower, DisplayPublicBath, DisplayQrCode, DisplayWasher, DisplayDryer };
