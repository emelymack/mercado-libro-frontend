import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../../utils/setStorage";
import { useAppDispatch, useAppSelector } from "../../../context/hooks";
import { logout } from "../../../context/slices/authSlice";
import { useState } from "react";
import CustomLoading from "../../CustomLoading/CustomLoading";

const MyAccount = () => {
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { name, lastName } = useAppSelector((state) => state.user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const onLogoutClick = () => {
    setIsLogoutModalOpen(true); // Abre el modal de confirmación
  };

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(logout());
      clearLocalStorage();
      history("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
      setIsLogoutModalOpen(false);
    }
  };

  const initials = `${name} ${lastName}`;

  return (
    <>
      <Menu>
        <MenuButton as={Button} bg="none" _focus={{ boxShadow: "none" }}>
          <Flex align="center">
            <Avatar size="sm" name={initials} mr={2} bg={'brand.greenLogo'} />
            <Text>Mi Cuenta</Text>
            <ChevronDownIcon ms={1} />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem>Mis pedidos</MenuItem>
          <MenuDivider />
          <MenuItem onClick={onLogoutClick}>Cerrar sesión</MenuItem>
        </MenuList>
      </Menu>
      {isLogoutModalOpen && (
        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
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
              Cerrar Sesión
            </ModalHeader>
            <ModalCloseButton />
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
                <AlertTitle mt={4} mb={1} fontSize="2xl">
                  ¿Estás seguro que deseas cerrar sesión?
                </AlertTitle>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleLogout}>
                Confirmar
              </Button>
              <Button onClick={() => setIsLogoutModalOpen(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
          {isLoading ? <CustomLoading /> : null}
        </Modal>
      )}
    </>
  );
};

export default MyAccount;
