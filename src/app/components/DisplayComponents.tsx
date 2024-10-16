import { Box, Center, VStack, Button, Flex, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  DisplayWasherProps,
  DisplayDryerProps,
  DisplayShowerProps,
  DisplayPublicBathProps,
} from '../types';
import util from '../util';
import { CustomHStack, CustomVStack, CustomFlex } from './CustomCommonComponents';
import { DisplayDryOrWash } from './DisplayDryOrWash';
import bath from '../../../public/images/bath.png';
import dryer from '../../../public/images/dryer.png';
import washer from '../../../public/images/washer.png';
import shower from '../../../public/images/shower.png';

const boxStyles = {
  height: '100%',
  width: '100%',
  boxShadow: '0 4px 8px rgba(0, 0.2, 0.2, 0.4)',
  rounded: 'xl',
  fontWeight: 'bold',
  fontSize: '125%',
  background: 'gray.50',
};

const DisplayWasher = ({ washerData, dormitory }: DisplayWasherProps) => {
  return (
    <DisplayDryOrWash
      type="WA"
      Data={washerData}
      image={washer}
      dormitory={dormitory}
    ></DisplayDryOrWash>
  );
};

const DisplayDryer = ({ dryerData, dormitory }: DisplayDryerProps) => {
  return (
    <DisplayDryOrWash
      type="DR"
      Data={dryerData}
      image={dryer}
      dormitory={dormitory}
    ></DisplayDryOrWash>
  );
};

const DisplayShower = ({ showerData, dormitory }: DisplayShowerProps) => {
  const router = useRouter();
  const showerTrans = (dormitory: string) => {
    router.push(`/analysis/sw/${dormitory}`);
  };
  return (
    <Box {...boxStyles}>
      <CustomHStack>
        <Box height="100%" width="50%">
          <Center h="100%">
            <VStack>
              <Image boxSize="30%" objectFit="cover" src={shower.src} alt="ローカル" />

              <Text fontWeight="bold" fontSize="85%">
                シャワー室利用可能数
              </Text>
            </VStack>
          </Center>
        </Box>
        <Box height="100%" width="50%">
          <CustomVStack>
            <Button
              onClick={() => showerTrans(dormitory)}
              style={{ width: '100%', height: '100%', background: 'gray.10' }}
              variant="outline"
            >
              <Text justifyContent="center" alignItems="center" fontSize="200%">
                {util.countTrueValues(showerData)}
              </Text>
            </Button>
          </CustomVStack>
        </Box>
      </CustomHStack>
    </Box>
  );
};

const DisplayPublicBath = ({ numberOfUsingBathData }: DisplayPublicBathProps) => {
  const textData = ['1', '2', '3'];
  const _numberOfUsingBathData = [util.countTrueValues(numberOfUsingBathData), null, null];
  const router = useRouter();
  const BathTrans = (bathNumber: string) => {
    router.push(`/analysis/pb/${bathNumber}`);
  };
  return (
    <Box {...boxStyles}>
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
          <CustomVStack>
            {_numberOfUsingBathData.map((numberOfUsingBath, index) => (
              <Button
                onClick={() => BathTrans(textData[index])}
                key={index}
                style={{ width: '100%', height: '33%', background: 'gray.10' }}
                variant="outline"
              >
                <CustomFlex>
                  <Box fontSize="90%">{textData[index]}</Box>
                  <Flex justifyContent="center" alignItems="center" flex="1">
                    <Box>
                      {numberOfUsingBath !== null ? (
                        <Box justifyContent="center" alignItems="center" fontSize="200%">
                          {numberOfUsingBath}
                        </Box>
                      ) : (
                        <Box justifyContent="center" alignItems="center" fontSize="100%">
                          Coming Soon..
                        </Box>
                      )}
                    </Box>
                  </Flex>
                </CustomFlex>
              </Button>
            ))}
          </CustomVStack>
        </Box>
      </CustomHStack>
    </Box>
  );
};

export { DisplayDryer, DisplayWasher, DisplayPublicBath, DisplayShower };
