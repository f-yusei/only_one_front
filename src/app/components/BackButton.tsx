'use client';

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ArrowBackIcon } from '@chakra-ui/icons'

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <Button
      onClick={() => router.back()}
      variant="plain"
      leftIcon={<ArrowBackIcon />}
      colorScheme="teal"
    >
      戻る
    </Button>
  );
};

export default BackButton;
