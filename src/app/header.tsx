import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex bg="blue.800" p={4} alignItems="center">
      <Box p="2">
        <Text fontSize="xl" color="whiteAlpha.900" fontWeight="bold">
          石川高専
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Text color="whiteAlpha.900">山寮</Text>
      </Box>
      <Box ml="4">
        <Text color="whiteAlpha.900">海寮</Text>
      </Box>
    </Flex>
  );
};

export default Header;
