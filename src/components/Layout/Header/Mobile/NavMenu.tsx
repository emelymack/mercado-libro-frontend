import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import NavLink from "../NavLink";
import Login from "../Login";
import MyAccount from "../MyAccount";
import { useEffect, useState } from "react";
import { Category, getAllCategory } from "../../../../services/BookService";

interface Props {
  Links: {
    name: string;
    url: string;
  }[];
  isLogged: boolean;
}
const NavMenu = ({ Links, isLogged }: Props) => {
  const [categoria, setCategoria] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategory().then((res) => {
      console.log(res);
      setCategoria(res);
    });
  }, []);

  return (
    <Box pb={4} display={{ lg: "none" }} pt={8}>
      <Stack as={"nav"} spacing={4} alignItems={"center"}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={"none"}
            color={"var(--secondary)"}
            fontSize={17}
          >
            Categorías
          </MenuButton>

          <MenuList>
            {categoria?.map((item) => (
              <MenuItem>{item?.name}</MenuItem>
            ))}
            {/*  <MenuItem>Link 1</MenuItem>
            <MenuItem>Link 2</MenuItem>
            <MenuDivider />
            <MenuItem>Link 3</MenuItem> */}
          </MenuList>
        </Menu>
        {Links.map((link) => (
          <NavLink key={link.name} url={link.url}>
            {link.name}
          </NavLink>
        ))}
        {!isLogged ? <Login /> : <MyAccount />}
      </Stack>
    </Box>
  );
};

export default NavMenu;
