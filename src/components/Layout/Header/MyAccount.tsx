import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react'

const MyAccount = () => {
  return (
    <Menu>
      <MenuButton as={Button} bg={'none'} color={useColorModeValue('brand.blueLogo', 'white')}  ps={3} pe={2} rightIcon={<ChevronDownIcon />}>
        MI CUENTA
      </MenuButton>
      <MenuList color={useColorModeValue('brand.blueLogo', 'white')}>
        <MenuItem>Mis pedidos</MenuItem>
        <MenuDivider />
        <MenuItem>Cerrar sesión</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MyAccount