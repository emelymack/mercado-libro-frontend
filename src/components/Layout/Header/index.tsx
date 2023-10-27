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
  MenuDivider,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from "../../../assets/Logo.svg";
import searchIcon from "../../../assets/icons/icon-search.svg";
import cartIcon from "../../../assets/icons/icon-cart.svg";
import { useState } from "react";
import Login from "./Login";
import MyAccount from "./MyAccount";
import NavLink from "./NavLink";
import NavMenu from "./Mobile/NavMenu";
import { Link, Link as LinkTo } from "react-router-dom";
import { useEffect } from "react";

const Links = [
  {
    name: "Novedades",
    url: "",
  },
  {
    name: "Más vendidos",
    url: "",
  },
  {
    name: "eBooks",
    url: "",
  },
  {
    name: "Editoriales",
    url: "",
  },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setIsScrolling(true) : setIsScrolling(false);
    });

    return () => {};
  }, [window.scrollY]);

  return (
    <header className={isScrolling ? "scroll" : ""}>
      <Box px={{ base: 6, md: 20 }} color={"var(--secondary)"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack
            spacing={8}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <Box>
              <LinkTo to="/">
                <Image src={logo} alt="Dan Abramov" boxSize={200} />
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
                me={3}
              >
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    bg={"none"}
                    color={"var(--secondary)"}
                  >
                    Categorías
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link to={`/category/Literatura`}>Literatura</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={`/category/Ciencia, historia y sociedad`}>Ciencia, historia y sociedad</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={`/category/Salud y bienestar`}>Salud y bienestar</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={`/category/Infantiles`}>Infantiles</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={`/category/Cómic y novela gráfica`}>Cómic y novela gráfica</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={`/category/Más vendidos`}>Más vendidos</Link>
                    </MenuItem>
                    {/* <MenuDivider /> */}
                  </MenuList>
                </Menu>
                {Links.map((link) => (
                  <NavLink key={link.name} url={link.url}>
                    {link.name}
                  </NavLink>
                ))}

                {!isLogged ? <Login /> : <MyAccount />}
              </HStack>
              <Box ms={3}>
                <Button
                  bg={"none"}
                  px={{ base: 2, md: 3 }}
                  className="headerBtn"
                >
                  <Image src={searchIcon} boxSize={{ base: 20, md: 12 }} />
                </Button>
              </Box>
              <Box>
                <Button
                  bg={"none"}
                  ps={0}
                  pe={{ base: 2, md: 3 }}
                  className="headerBtn"
                >
                  <Image src={cartIcon} boxSize={{ base: 20, md: 12 }} />
                </Button>
              </Box>
              <Button onClick={toggleColorMode} borderRadius={'full'}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
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
                ms={1}
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
