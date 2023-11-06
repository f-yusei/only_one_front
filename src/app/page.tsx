import { Box, Button, Card, CardHeader, HStack, VStack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box>
      <VStack>
        <Button height="20vh" mt="8" width="80vw" bgColor="gray.100">
          QR
        </Button>
        <HStack>
          <Button height="26vh" w="40vw" sx={{ whiteSpace: 'pre-wrap' }}>
            {'大浴場\n11'}
          </Button>
          <Button height="26vh" width="40vw">
            <Card bgColor="gray.100" height="26vh" width="40vw">
              <CardHeader>シャワー室</CardHeader>
              <HStack>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
              </HStack>
            </Card>
          </Button>
        </HStack>
        <Button height="36vh" width="80vw" p="4">
          <Card bgColor="gray.100" height="36vh" width="80vw" p="4">
            <VStack>
              <h1>洗濯機</h1>
              <HStack>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
              </HStack>
              <h1>乾燥機</h1>
              <HStack>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
                <Box height="10vh" width="16vw" bgColor="white"></Box>
              </HStack>
            </VStack>
          </Card>
        </Button>
      </VStack>
    </Box>
  );
}
