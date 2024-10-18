'use client';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { IconLink } from './components/IconLink';
import { Link } from '@chakra-ui/next-js';

const Header = () => {
  return (
    <Flex bg="blue.800" p={4} alignItems="center" h="8vh">
      <Box p="2">
        <IconLink />
      </Box>
      <Link href="/yama" ml={8} p={6}>
        <Text color="white" fontWeight="semibold" fontSize="1.4rem" isTruncated>
          山寮
        </Text>
      </Link>
      <Link href="/umi" p={6}>
        <Text color="white" fontWeight="semibold" fontSize="1.4rem" isTruncated>
          海寮
        </Text>
      </Link>
      <Spacer />
    </Flex>
  );
};

export default Header;
