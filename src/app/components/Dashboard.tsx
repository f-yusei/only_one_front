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
  Button
} from '@chakra-ui/react';
// import { v4 } from 'uuid';
import {
  DisplayPublicBathProps,
  DisplayShowerProps,
  DisplayWasherProps,
  DisplayDryerProps,
} from '../types';
import bathIcon from '../../../public/images/bathicon.png';
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
};

import { useRouter } from 'next/navigation';





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
  type: string;
  Data: boolean[][][];
  image: StaticImageData;
}


const DisplayDryOrWash: React.FC<DryOrWashProps> = ({ type, Data, image }) => {
  const textData = ['MOU', 'SEA'];
  const floorData = ['1F', '2F', '3F'];
  const router = useRouter();
  interface DryOrWashAnaProps {
    dormitory:string;
    floor:string;
  }
  const dryOrWashTrans = ({dormitory,floor} : DryOrWashAnaProps) => {
    if(type==="DR"){
    router.push(`/analysis/wm/${dormitory}/${floor}`);
    }else if(type==="WA"){
    router.push(`/analysis/dm/${dormitory}/${floor}`);
}

  };
  return (
    <Card {...boxStyles}>
      <CustomHStack >
        <Box width={"50%"} height={"100%"}>
          <Center h="100%">
            <VStack>
              <Image src={image.src} alt="Dryer Image" objectFit="cover" boxSize="30%" />
              <Text fontWeight="bold">{type="DR" ? '乾燥機' : '洗濯機' }使用可能台数</Text>
            </VStack>

          </Center>
        </Box>
        <Box width={"50%"} height={"100%"}>
          <CustomVStack>
            {Data.map((twoDArray, index) => (
              <div  key={index} style={{ height: '100%', width: "100%", position: "relative" }} >
                <Box fontSize="100%" position="absolute" top="0" left="0" m={2}>{textData[index]}</Box>
                <CustomFlex>
                  {twoDArray.map((row, i) => (
                    <Button onClick={() => dryOrWashTrans({ dormitory:textData[index], floor: floorData[i] })} key={i} style={{background:"white"}}>
                      <Box fontSize="10%">{floorData[i]}</Box>
                      <Box>{countTrueValues(row)}</Box>
                    </Button>
                  ))}
                </CustomFlex>
              </div>
            ))}
          </CustomVStack>
        </Box>
      </CustomHStack>
    </Card>
  );
};
const DisplayWasher = ({ washerData }: DisplayWasherProps) => {
  return (
    <DisplayDryOrWash type="WM" Data={washerData} image={bathIcon}></DisplayDryOrWash>
  );
};

const DisplayDryer = ({ dryerData }: DisplayDryerProps) => {

  return (<DisplayDryOrWash type="DM" Data={dryerData} image={bathIcon}></DisplayDryOrWash>

  );
};

const DisplayShower = ({ showerData }: DisplayShowerProps) => {
  const textData = ['MOU', 'SEA'];
  const router = useRouter();
  const shouwerTrans = (dormitory: string) => {
    router.push(`/analysis/pb/${dormitory}`)
  };
  return (
    <Box {...boxStyles}>
      <CustomHStack>
        <Box height="100%" width="50%">
          <Center h="100%">
            <VStack>
              <Image boxSize="30%" objectFit="cover" src={bathIcon.src} alt="ローカル" />

              <Text fontWeight="bold">シャワー室</Text>
            </VStack>
          </Center>
        </Box>
        <Box height="100%" width="50%">
          <CustomVStack>
            {showerData.map((row, index) => (
              <Button  onClick={() => shouwerTrans(textData[index])} key={index} style={{ width: "100%", height: "50%" ,background:"white"}}>
                <CustomFlex >
                  <Box fontSize="90%" position="absolute" top="0" left="0" m={2}>{textData[index]}</Box>
                  <Flex justifyContent="center" alignItems="center" flex="1">
                    <Box >{countTrueValues(row)}</Box>
                  </Flex>
                </CustomFlex>
              </Button>
            ))}
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
                <Image boxSize="30%" objectFit="cover" src={bathIcon.src} alt="ローカル" />
                <Box>大浴場利用人数</Box>
              </VStack>
            </Box>
          </Center>
        </Box>
        <Box height="100%" width="100%">
          <CustomVStack >
            {_numberOfUsingBathData.map((numberOfUsingBath, index) => (
              
       
                <Button onClick={() => BathTrans(textData[index])} key={index} style={{ width: "100%", height: "33%", background:"white"}}>
                <CustomFlex >
                  <Box fontSize="90%" >{textData[index]}</Box>
                  <Flex justifyContent="center" alignItems="center" flex="1">
                    <Box>
                      {numberOfUsingBath !== null ? (
                        <Box fontSize="100%">
                          {numberOfUsingBath}
                        </Box>
                      ) : (
                        <Box fontSize="100%">Coming Soon..</Box>
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
