import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {
  children: React.ReactNode,
  url: string
}

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={1}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
      }}
      color={'var(--secondary)'}
      fontWeight={600}
      fontSize={17}
      href={props.url}>
      {children}
    </Box>
  )
}

export default NavLink