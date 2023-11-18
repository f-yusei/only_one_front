'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import UserContextProvider from './context/userContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
