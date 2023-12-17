'use client';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { useAccountStore } from './state/user';

const Header = () => {
  const account = useAccountStore((state) => state.account);
  return (
    <Flex bg="blue.800" p={4} alignItems="center">
      <Box p="2">
        <Text fontSize="xl" color="whiteAlpha.900" fontWeight="bold">
          石川高専 有朋寮
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Text color="whiteAlpha.900">{account}</Text>
      </Box>
    </Flex>
  );
};

export default Header;
