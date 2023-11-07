import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

interface LoginProps {
  setIsLogged: (value: boolean) => void;
}

const MyAccount = ({ setIsLogged }: LoginProps) => {
  const history = useNavigate();

  const handleLogout = () => {
    // Limpiar el estado de autenticación y realizar cualquier otra tarea de limpieza si es necesario
    setIsLogged(false);

    // Redirigir al usuario a la página de inicio
    history("/");
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg={"none"}
        style={{ color: "var(--secondary)" }}
        ps={3}
        pe={2}
        rightIcon={<ChevronDownIcon />}
      >
        MI CUENTA
      </MenuButton>
      <MenuList>
        <MenuItem>Mis pedidos</MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MyAccount;
