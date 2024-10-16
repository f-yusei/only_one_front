'use client';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex bg="blue.800" p={4} alignItems="center" h="8vh">
      <Box p="2">
        <Text fontSize="xl" color="whiteAlpha.900" fontWeight="bold">
          どみとる
        </Text>
      </Box>
      <Spacer />
    </Flex>
  );
};

export default Header;
