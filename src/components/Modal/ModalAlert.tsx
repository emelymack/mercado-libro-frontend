import { Alert, AlertIcon, AlertTitle, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

interface Props {
  isOpen: boolean,
  onClose: () => void,
  onOpen: () => void,
  onConfirm: () => void,
  headerTitle: string,
  text: string
}
const ModalAlert = ({isOpen, onClose, headerTitle, text, onConfirm}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent
        mx={4}
        maxW={{ base: "90%", sm: "80%", md: "70%", lg: "40%" }}
        w="auto"
      >
        <ModalHeader
          w={"100%"}
          bg={"brand.greenLogo"}
          textAlign="center"
          fontSize="2xl"
          color={"white"}
        >
          {headerTitle}
        </ModalHeader>
        <ModalCloseButton color={'white'} />
        <ModalBody>
          <Alert
            bg={"white"}
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="60px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="xl">
              {text}
            </AlertTitle>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button bg="red.600" color={'white'} mr={3} onClick={onConfirm}>
            Confirmar
          </Button>
          <Button colorScheme='' onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalAlert