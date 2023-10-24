import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { SecondaryButton } from '../../Button'

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <SecondaryButton onClick={onOpen} text={'LOGIN'} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'var(--secondary)'} fontWeight={800}>Iniciar sesión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            formulario de Login
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login