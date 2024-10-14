import { HStack, StackDivider, VStack, Flex } from "@chakra-ui/react";
import { CustomStackProps, CustomFlexProps } from "../types";

const CustomHStack: React.FC<CustomStackProps> = ({ children }) => {
  return (
    <HStack
      borderColor="black"
      spacing="0vh"
      height="100%"
      divider={<StackDivider />}
      align="center"
    >
      {children}
    </HStack>
  );
};
const CustomVStack: React.FC<CustomStackProps> = ({ children }) => {
  return (
    <VStack
      borderColor={'black'}
      spacing="0vh"
      height="100%"
      width={'100%'}
      divider={<StackDivider />}
    >
      {children}
    </VStack>
  );
};

const CustomFlex: React.FC<CustomFlexProps> = ({ children }) => {
  return (
    <Flex
      height="100%"
      width="100%"
      align="center"
      justify="space-between"
      p="3"
      position="relative"
    >
      {children}
    </Flex>
  );
};

export {CustomFlex,CustomHStack,CustomVStack}