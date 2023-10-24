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
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons'
import logo from '../../../assets/Logo.svg'
import searchIcon from '../../../assets/icons/icon-search.svg'
import cartIcon from '../../../assets/icons/icon-cart.svg'
import {useState} from 'react'
import Login from './Login'
import MyAccount from './MyAccount'
import NavLink from './NavLink'
import NavMenu from './Mobile/NavMenu'

interface Props {
  children: React.ReactNode,
  url: string
}

const Links = [
  {
    name: 'Novedades',
    url: ''
  },
  {
    name: 'Más vendidos',
    url: ''
  },
  {
    name: 'eBooks',
    url: ''
  },
  {
    name: 'Editoriales',
    url: ''
  },
]

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ isLogged, setIsLogged ] = useState<boolean>(false)

  return (
    <header>
      <Box px={{base: 6, md: 20}} py={8} color={'var(--secondary)'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'} justifyContent={'space-between'} w={'100%'} >
            <Box>
              <Image src={logo} alt='Dan Abramov' boxSize={200} />
            </Box>
            <Box display={'flex'} alignItems={'center'} color={'var(--secondary)'}>
              <HStack as={'nav'} spacing={4} display={{ base: 'none', lg: 'flex' }} ms={2} me={3}>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg={'none'} color={'var(--secondary)'}>
                    Categorías
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem>Link 3</MenuItem>
                  </MenuList>
                </Menu>
                {Links.map((link) => (
                  <NavLink key={link.name} url={link.url}>{link.name}</NavLink>
                ))}

                {!isLogged ? <Login /> : <MyAccount /> }
              </HStack>
              <Box ms={3}>
                <Button bg={'none'} px={{base: 2, md: 3}} className='headerBtn'>
                  <Image src={searchIcon} boxSize={{base: 20, md:12}} />
                </Button>
              </Box>
              <Box>
                <Button bg={'none'} px={{base: 2, md: 3}} className='headerBtn'>
                  <Image src={cartIcon} boxSize={{base: 20, md:12}} />
                </Button>
              </Box>
              <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ lg: 'none' }}
                ms={2}
                onClick={isOpen ? onClose : onOpen}
              />
            </Box>
          </HStack>
          
        </Flex>

        {isOpen && ( <NavMenu Links={Links} /> )}
      </Box>
    </header>
  )
}

export default Header