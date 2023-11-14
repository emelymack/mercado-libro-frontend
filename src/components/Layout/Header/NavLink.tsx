import { Box, Link, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

interface Props {
  children: React.ReactNode,
  url: string
}

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Link
      as="a"
      px={1}
      py={1}
      rounded={'md'}
      _after={{
        display:'block',
        content: '""',
        borderBottom: 'solid 2px #003844',  
        transform: 'scaleX(0)',  
        transition: 'transform 250ms ease-in-out',
      }}
      _hover={{
        textDecoration: 'none',
        _after: {
          transform: 'scaleX(1)' 
        }
      }}
      color={useColorModeValue('brand.blueLogo', 'white')}
      fontWeight={600}
      fontSize={17}
      href={props.url}
      
    >
      {children}
    </Link>
  )
}

export default NavLink