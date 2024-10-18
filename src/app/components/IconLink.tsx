import { Link } from '@chakra-ui/next-js';
import { Box, Image } from '@chakra-ui/react';
import logo from '../../../public/images/logo.png';

export const IconLink = () => {
  return (
    <Box _hover={{ cursor: 'pointer' }}>
      <Link href="/">
        <Image src={logo.src} alt="Product Logo" width="40vw" />
      </Link>
    </Box>
  );
};
