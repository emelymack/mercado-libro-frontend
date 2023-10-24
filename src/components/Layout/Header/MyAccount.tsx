import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'

const MyAccount = () => {
  return (
    <Menu>
      <MenuButton as={Button} bg={'none'} style={{color:'var(--secondary)'}} ps={3} pe={2} rightIcon={<ChevronDownIcon />}>
        MI CUENTA
      </MenuButton>
      <MenuList>
        <MenuItem>Mis pedidos</MenuItem>
        <MenuDivider />
        <MenuItem>Cerrar sesión</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MyAccount