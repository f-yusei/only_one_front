import { Button, Card, VStack, HStack, CardHeader, Text, Box } from '@chakra-ui/react';
import { v4 } from 'uuid';

import {
  DisplayShowerProps,
  DisplayPublicBathProps,
  DisplayWasherProps,
  DisplayDryerProps,
} from '../types';

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
  return (
    <Card bgColor="gray.100" height="26vh" width="40vw">
      <CardHeader>大浴場</CardHeader>
      <HStack>
        {numberOfUsingBathData.map((numberOfUsingBath) => {
          return (
            <Box key={id} height="10vh" width="16vw" bgColor="blue.100">
              <Text>{numberOfUsingBath}</Text>
            </Box>
          );
        })}
      </HStack>
    </Card>
  );
};

const DisplayQrCode = () => {
  return (
    <Button height="20vh" mt="8" width="80vw" bgColor="gray.100">
      QR
    </Button>
  );
};


export { DisplayShower, DisplayPublicBath, DisplayQrCode, DisplayWasher, DisplayDryer };

