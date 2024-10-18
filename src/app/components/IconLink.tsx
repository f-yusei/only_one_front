import { Link } from '@chakra-ui/next-js';
import { Box, Image } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import logo from '../../../public/images/logo.png';

export const IconLink = () => {
  const [isSmallerThan850] = useMediaQuery('(max-width: 850px)');

  return (
    <Box _hover={{ cursor: 'pointer' }}>
      <Link href="/">
        <Image 
          src={logo.src} 
          alt="Product Logo" 
          width={isSmallerThan850 ? '32vw' : '20vw'}  // 850px以下で36vw、それ以上で28vw
        />
      </Link>
    </Box>
  );
};