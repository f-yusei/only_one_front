import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  useDisclosure,
  VStack,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
const PreviewModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="blackAlpha" m={4}>
        プレビュー
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Box width="64.0rem" height="45.2548339959rem" outline="solid" p={4}>
                <Text fontSize="4xl">11月</Text>
                <Text m={4} fontSize="2xl">
                  週例清掃
                </Text>
                <Table m={4}>
                  <Thead>
                    <Tr>
                      <Th>実施日</Th>
                      <Th>1階</Th>
                      <Th>2階</Th>
                      <Th>3階</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>11/7</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                    </Tr>
                    <Tr>
                      <Td>11/15</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                    </Tr>
                    <Tr>
                      <Td>11/30</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Text m={4} fontSize="2xl">
                  月例清掃
                </Text>
                <Table m={4}>
                  <Thead>
                    <Tr>
                      <Th>実施日</Th>
                      <Th>名前</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>11/30</Td>
                      <Td>3I田中, 3C宮本, 2A武田</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewModal;
