import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../../utils/setStorage";
import { useAppDispatch, useAppSelector } from "../../../context/hooks";
import { logout } from "../../../context/slices/authSlice";

const MyAccount = () => {
  debugger;
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const { name, lastName } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    clearLocalStorage();
    history("/");
  };
  const initials = `${name} ${lastName}`;

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
        <Avatar size="sm" name={initials} mr={2} />
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
