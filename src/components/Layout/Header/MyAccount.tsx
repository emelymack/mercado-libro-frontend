import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Button,
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

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(logout());
      clearLocalStorage();
      history("/");
      setIsLoading(false);
      setIsLogoutModalOpen(false);
    }, 1000);
  };

  const initials = `${name} ${lastName}`;

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          bg={"none"}
          style={{ color: "var(--secondary)" }}
          ps={3}
          pe={2}
          rightIcon={<ChevronDownIcon />}
        >
          <Avatar size="sm" name={initials} mr={2} />
          MI CUENTA
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
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cerrar Sesión</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Alert
                bg={"brand.greenLogo"}
                status="warning"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  ¿Estás seguro que deseas cerrar sesión?
                </AlertTitle>
                {/* <AlertDescription maxWidth="sm">
                  {modalMessage}
                </AlertDescription> */}
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleLogout}>
                Confirmar
              </Button>
              <Button onClick={() => setIsLogoutModalOpen(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {isLoading ? <CustomLoading /> : null}
    </>
  );
};

export default MyAccount;
