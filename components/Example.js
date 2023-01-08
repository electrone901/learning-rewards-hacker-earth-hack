import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

function Example(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Please Open </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <p>
                Example ExampleExampleExampleExample Example
                ExampleExampleExampleExample Example
                ExampleExampleExampleExample Example
                ExampleExampleExampleExample Example
                ExampleExampleExampleExample Example
                ExampleExampleExampleExample
              </p>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}

export default Example







<Modal isOpen={isOpen} onClose={closeModal} isCentered>
<ModalOverlay />
<ModalContent w="300px">
  <ModalHeader>Select Wallet</ModalHeader>
  <ModalCloseButton
    _focus={{
      boxShadow: 'none',
    }}
  />
  <ModalBody paddingBottom="1.5rem">
    <VStack>
      <Button
        variant="outline"
        onClick={() => {
          activate(connectors.coinbaseWallet)
          setProvider('coinbaseWallet')
          closeModal()
        }}
        w="100%"
      >
        <HStack w="100%" justifyContent="center">
          <Image
            src="/cbw.png"
            alt="Coinbase Wallet Logo"
            width={25}
            height={25}
            borderRadius="3px"
          />
          <Text>Coinbase Wallet</Text>
        </HStack>
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          activate(connectors.walletConnect)
          setProvider('walletConnect')
          closeModal()
        }}
        w="100%"
      >
        <HStack w="100%" justifyContent="center">
          <Image
            src="/wc.png"
            alt="Wallet Connect Logo"
            width={26}
            height={26}
            borderRadius="3px"
          />
          <Text>Wallet Connect</Text>
        </HStack>
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          activate(connectors.injected)
          setProvider('injected')
          closeModal()
        }}
        w="100%"
      >
        <HStack w="100%" justifyContent="center">
          <Image
            src="/mm.png"
            alt="Metamask Logo"
            width={25}
            height={25}
            borderRadius="3px"
          />
          <Text>Metamask</Text>
        </HStack>
      </Button>
    </VStack>
  </ModalBody>
</ModalContent>
</Modal>
