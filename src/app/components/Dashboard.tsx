import { Button, Card, VStack, HStack, CardHeader, Text, Box } from '@chakra-ui/react';
import { v4 } from 'uuid';
import { DisplayWasherProps, DisplayDryerProps,DisplayShowerProps, DisplayPublicBathProps } from '../types';

const DisplayWasherAndDryer = ({ washerData,dryerData }: DisplayWasherProps&DisplayDryerProps) => {
  const id = v4();
  return (
    <Button height="36vh" width="80vw" p="4">
      <Card bgColor="gray.100" height="36vh" width="80vw" p="4">
        <VStack>
          <h1>洗濯機</h1>
          <HStack>
            {washerData.map((isUsingWasher) => {
              return (
                <Box
                  key={id}
                  height="10vh"
                  width="16vw"
                  bgColor={isUsingWasher ? 'green.100' : 'white'}
                ></Box>
              );
            })}
          </HStack>
          <h1>乾燥機</h1>
          <HStack>
            {dryerData.map((isUsingDryer) => {
              return (
                <Box
                  key={id}
                  height="10vh"
                  width="16vw"
                  bgColor={isUsingDryer ? 'green.100' : 'white'}
                ></Box>
              );
            })}
          </HStack>
        </VStack>
      </Card>
    </Button>
  );
};

const DisplayShower = ({ showerData }: DisplayShowerProps) => {
  const id = v4();
  return (
    <Button bgColor="gray.100" height="26vh" width="40vw">
      <Text>シャワー室</Text>
      <HStack>
        {showerData.map((isUsingShower) => {
          return (
            <Box
              key={id}
              height="10vh"
              width="16vw"
              bgColor={isUsingShower ? 'green.100' : 'white'}
            ></Box>
          );
        })}
      </HStack>
    </Button>
  );
};

const DisplayPublicBath = ({ numberOfUsingBathData }: DisplayPublicBathProps) => {
  return (
    <Button height="26vh" width="40vw">
      <Card bgColor="gray.100" height="26vh" width="40vw">
        <CardHeader>大浴場</CardHeader>
        <Text>{numberOfUsingBathData}</Text>
      </Card>
    </Button>
  );
};

const DisplayQrCode = () => {
  return (
    <Button height="20vh" mt="8" width="80vw" bgColor="gray.100">
      QR
    </Button>
  );
};

export { DisplayWasherAndDryer, DisplayShower, DisplayPublicBath, DisplayQrCode };
