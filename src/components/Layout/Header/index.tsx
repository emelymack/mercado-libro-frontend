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
import searchIcon from "../../../assets/icons/icon-search.svg";
import { useEffect, useState } from "react";
import Login from "./Login";
import MyAccount from "./MyAccount";
import NavLink from "./NavLink";
import NavMenu from "./Mobile/NavMenu";
import { Link, Link as LinkTo } from "react-router-dom";
import { useAppSelector } from "../../../context/hooks";
import Cart from "../../Cart";
import { Category, getAllCategory } from "../../../services/BookService";

const Links = [
  {
    name: "Novedades",
    url: "#novedades",
  },
  {
    name: "Más vendidos",
    url: "#masVendidos",
  },
  // {
  //   name: "eBooks",
  //   url: "",
  // },
  // {
  //   name: "Editoriales",
  //   url: "",
  // },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling);
  const { colorMode, toggleColorMode } = useColorMode();
  const [categoria, setCategoria] = useState<Category[]>([]);

  useEffect(() => {

    getAllCategory ()
    .then((res) => {
    console.log(res);
    setCategoria(res)
    })

    return () => {};
  }, []);


  return (
    <header className={`header-index ${isScrolling ? "scroll" : ""}`}>
      <Box px={{ base: 6, md: 10, xl: 20 }} color={"var(--secondary)"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack
            spacing={{ base: 3, md: 8 }}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <Box>
              <LinkTo to="/">
                <Image src={useColorModeValue(logo, logoWhite)} alt="Mercado Libro" boxSize={{base: 160, md: 200}} className="logo" />
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
                    color={useColorModeValue('brand.blueLogo', 'white')}
                  >
                    Categorías
                  </MenuButton>
                  
                  <MenuList color={useColorModeValue('brand.blueLogo', 'white')}>
                  {categoria?.map((item) => (
                    <MenuItem>
                  
                      <Link to={`/category/${item?.name}`}>{item?.name}</Link>
                      
                    </MenuItem>
                    ))}
                  </MenuList>
                
                  
                </Menu>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    bg={"none"}
                    color={"var(--secondary)"}
                  >
                    Administración
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link to={`/admin/products`}>Productos</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
                
                {Links.map((link) => (
                  <NavLink key={link.name} url={link.url}>
                    {link.name}
                  </NavLink>
                ))}
                

                {!isLogged ? <Login /> : <MyAccount />}
              </HStack>
              <Box ms={0}>
                <Button
                  bg={"none"}
                  px={{ base: 2, md: 3 }}
                  className="headerBtn"
                >
                  <Image src={searchIcon} boxSize={{ base: "50px" }} />
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

        {isOpen && <NavMenu Links={Links} isLogged={isLogged} />}
      </Box>
    </header>
  );
};

export default Header;
