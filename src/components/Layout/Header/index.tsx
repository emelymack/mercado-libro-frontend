import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import logo from "../../../assets/Logo.svg";
import logoWhite from "../../../assets/logo-white.svg";
// import searchIcon from "../../../assets/icons/icon-search.svg";
import { useEffect, useState } from "react";
import Login from "./Login";
import MyAccount from "./MyAccount";
import NavLink from "./NavLink";
import NavMenu from "./Mobile/NavMenu";
import { Link, Link as LinkTo } from "react-router-dom";
import { useAppSelector } from "../../../context/hooks";
import Cart from "../../Cart";
import { Category, getAllCategory } from "../../../services/BookService";
import SearchBar from "../../SearchBar/SearchBar";

const Links = [
  {
    name: "NOVEDADES",
    url: "/novedades",
  },
  {
    name: "MÁS VENDIDOS",
    url: "/bestsellers",
  },
];

interface Props {
  isOpenLogin: boolean,
  onOpenLogin: () => void,
  onCloseLogin: () => void
}
const Header = ({ isOpenLogin, onOpenLogin, onCloseLogin }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isAdmin, setIsAdmin] = useState(false);
  const [categorias, setCategorias] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategory().then((res) => {
      setCategorias(res);
    });
    return () => {};
  }, []);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isLoggedAdmin") === "true");
  }, [isLogged]);

  return (
    <header className={`header-index ${isScrolling ? "scroll" : ""}`}>
      <Box px={{ base: 4, md: 10, xl: 20 }} color={"var(--secondary)"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack
            spacing={{ base: 3, md: 8 }}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <Box>
              <LinkTo to="/">
                <Image
                  src={useColorModeValue(logo, logoWhite)}
                  alt="Mercado Libro"
                  boxSize={{ base: 160, lg: 200 }}
                  pe={{ base: 2, lg: 0 }}
                  className="logo"
                />
              </LinkTo>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              color={"var(--secondary)"}
            >
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", lg: "flex" }}
                ms={2}
                me={{ base: 3, lg: 0 }}
              >
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    bg={"none"}
                    color={useColorModeValue("brand.blueLogo", "white")}
                    _active={{ bg: "white" }}
                  >
                    Categorías
                  </MenuButton>

                  <MenuList
                    color={useColorModeValue("brand.blueLogo", "white")}
                  >
                    {categorias?.map((item) => (
                      <Link to={`/category/${item?.name}`}>
                        <MenuItem
                          fontWeight={500}
                          _hover={{ bg: "brand.violetLogo25" }}
                        >
                          {item?.name}
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </Menu>

                {Links.map((link) => (
                  <NavLink key={link.name} url={link.url}>
                    {link.name}
                  </NavLink>
                ))}

                {isAdmin && (
                  <Menu>
                    <Link to="/dashboard">
                      <MenuButton
                        as={Button}
                        bg="none"
                        color="var(--secondary)"
                      >
                        Administración
                      </MenuButton>
                    </Link>
                  </Menu>
                )}

                <Box me={5} ms={2}>
                  {!isLogged ? <Login isOpen={isOpenLogin} onOpen={onOpenLogin} onClose={onCloseLogin} /> : <MyAccount />}
                </Box>
              </HStack>
              <Box ml={0}>
                <Button
                  bg={"none"}
                  px={{ base: 2, md: 3 }}
                  className="headerBtn"
                >
                  <SearchBar />
                </Button>
              </Box>
              <Box me={1}>
                <Cart />
              </Box>
              <Button
                onClick={toggleColorMode}
                borderRadius={"full"}
                size={{ base: "sm", md: "md" }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <IconButton
                size={"md"}
                bg={"brand.violetLogo"}
                color={"brand.blueLogo"}
                icon={
                  isOpen ? (
                    <CloseIcon />
                  ) : (
                    <HamburgerIcon fontSize={22} fontWeight={900} />
                  )
                }
                aria-label={"Abrir menú"}
                display={{ lg: "none" }}
                ms={3}
                onClick={isOpen ? onClose : onOpen}
              />
            </Box>
          </HStack>
        </Flex>

        {isOpen && <NavMenu Links={Links} isLogged={isLogged} /* isOpenLogin={isOpen} onOpenLogin={onOpen} onCloseLogin={onClose} */ />}
      </Box>
    </header>
  );
};

export default Header;
