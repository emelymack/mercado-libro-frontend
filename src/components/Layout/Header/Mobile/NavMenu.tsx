import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack } from '@chakra-ui/react'
import React from 'react'
import NavLink from '../NavLink'

interface Props {
  Links: {
    name: string,
    url: string
  }[]
}
const NavMenu = ({Links}: Props) => {
  return (
    <Box pb={4} display={{ lg: 'none' }} mt={8}>
      <Stack as={'nav'} spacing={4} alignItems={'center'}>
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
      </Stack>
    </Box>
  )
}

export default NavMenu