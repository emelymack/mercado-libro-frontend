import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure
} from '@chakra-ui/react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  status: 'info' | 'success' | 'warning' | 'error';
  iconMapping: {
    info: React.ReactElement;
    success: React.ReactElement;
    warning: React.ReactElement;
    error: React.ReactElement;
  };
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  status,
  iconMapping
}) => {
  const bgColor = status === 'success' ? 'brand.greenLogo' : status === 'error' ? 'brand.redLogo' : 'brand.blueLogo';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert
            bg={bgColor}
            status={status}
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} as={() => iconMapping[status]} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {description}
            </AlertTitle>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="brand.violetLogo"
            color="brand.blueLogo"
            _hover={{ bg: "brand.blueLogo", color: "white" }}
            onClick={onClose}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AlertModal;
