import * as React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function AuthorModal({ isOpen, onClose, onAddAuthor }) {
  const [newAuthor, setNewAuthor] = React.useState('');

  const handleAddAuthor = () => {
    onAddAuthor(newAuthor);
    setNewAuthor('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Autor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nombre del Autor</FormLabel>
            <Input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddAuthor}>
            Agregar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AuthorModal;