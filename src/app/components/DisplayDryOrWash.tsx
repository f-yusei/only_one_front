'use client';
import { Card, VStack, Text, Box, Center, Image, Flex, Button } from '@chakra-ui/react';
import { DryOrWashAnaProps, DryOrWashProps } from '../types';

import { useRouter } from 'next/navigation';
import util from '../util';
import { CustomHStack, CustomVStack, CustomFlex } from './CustomCommonComponents';

const boxStyles = {
  height: '100%',
  width: '100%',
  boxShadow: '0 4px 8px rgba(0, 0.2, 0.2, 0.4)',
  rounded: 'xl',
  fontWeight: 'bold',
  fontSize: '125%',
  background: 'gray.50',
};

export const DisplayDryOrWash: React.FC<DryOrWashProps> = ({ type, Data, image, dormitory }) => {
  const router = useRouter();

  const dryOrWashTrans = ({ dormitory, floor }: DryOrWashAnaProps) => {
    if (type === 'DR') {
      router.push(`/analysis/dr/${dormitory}/${floor}`);
    } else if (type === 'WA') {
      router.push(`/analysis/wa/${dormitory}/${floor}`);
    }
  };
  return (
    <Card {...boxStyles}>
      <CustomHStack>
        <Box width={'50%'} height={'100%'}>
          <Center h="100%">
            <VStack>
              <Image
                src={image.src}
                alt="Dryer Image"
                objectFit="fill"
                boxSize="30%"
                height="12vh"
                width="auto"
              />
              <Text fontWeight="bold" fontSize="90%">
                {util.changeTypeToDisplayName(type)}使用可能台数
              </Text>
            </VStack>
          </Center>
        </Box>
        <Box width={'50%'} height={'100%'}>
          <CustomVStack>
            {Data &&
              Data.map((row, i) => (
                <Button
                  onClick={() =>
                    dryOrWashTrans({ dormitory: dormitory, floor: (i + 1) as unknown as string })
                  }
                  key={i}
                  style={{ width: '100%', height: '33%', background: 'gray.50' }}
                  variant="outline"
                >
                  <CustomFlex>
                    <Box fontSize="90%">{(i + 1) as unknown as string}階</Box>
                    <Flex justifyContent="center" alignItems="center" flex="1">
                      <Box fontSize="200%">{util.countTrueValues(row)}</Box>
                    </Flex>
                  </CustomFlex>
                </Button>
              ))}
          </CustomVStack>
        </Box>
      </CustomHStack>
    </Card>
  );
};
