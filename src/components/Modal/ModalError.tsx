import { Alert, AlertIcon, AlertTitle, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react"

interface Props {
  isOpen: boolean,
  onClose: ()=>void,
  title: string
}
const ModalError = ({isOpen, onClose, title}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay  />
      <ModalContent bg={"red.200"} borderRadius={25} >
        <ModalCloseButton  />
        <ModalBody mt={5} py={10}>
          <Alert
            bg={"red.200"}
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="auto"
          >
            <AlertIcon boxSize="50px" mt={0} mb={2} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {title}
            </AlertTitle>
          </Alert>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalError