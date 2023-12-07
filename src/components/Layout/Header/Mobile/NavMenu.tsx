import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,

} from "@chakra-ui/react";
import NavLink from "../NavLink";
import Login from "../Login";
import MyAccount from "../MyAccount";
import { Link, Link as LinkTo } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category, getAllCategory } from "../../../../services/BookService";


interface Props {
  Links: {
    name: string;
    url: string;
  }[];
  isLogged: boolean;
  isOpenLogin: boolean,
  onOpenLogin: () => void,
  onCloseLogin: () => void
}
const NavMenu = ({ Links, isLogged, isOpenLogin, onOpenLogin, onCloseLogin }: Props) => {
  const [categoria, setCategoria] = useState<Category[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
 
  
  useEffect(() => {
    getAllCategory().then((res) => {
      console.log(res);
      setCategoria(res);
    });
  }, []);

useEffect(() => {
    setIsAdmin(localStorage.getItem("isLoggedAdmin") === "true");
  }, [isLogged]);

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
               <Link to={`/category/${item?.name}`}>
              <MenuItem>{item?.name}</MenuItem>
              </Link>
            ))}
          
          </MenuList>
        </Menu>
        {Links.map((link) => (
          <NavLink key={link.name} url={link.url}>
            {link.name}
          </NavLink>
        ))}
        {!isLogged ? <Login isOpen={isOpenLogin} onOpen={onOpenLogin} onClose={onCloseLogin} /> : <MyAccount />}
      </Stack>
    </Box>
  );
};

export default NavMenu;
