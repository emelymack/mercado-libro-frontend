import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { cartData } from './_data'
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'
import { Link } from 'react-router-dom'
import CartButton from './CartButton'

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef();

  return (
    <>
      <CartButton onClick={onOpen} ref={btnRef} />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton zIndex={5} mt={2} />
          <DrawerHeader bg={'brand.violetLogo'} color={'white'}>Carrito de compras</DrawerHeader>

          <DrawerBody>
            <Stack
              direction={{ base: 'column' }}
              spacing={{ base: '8' }}
              py={5}
            >
              <Stack spacing={{ base: '8', md: '10' }} flex="2">
                <Stack spacing="6">
                  {cartData.map((item) => (
                    <CartItem key={item.id} {...item} />
                  ))}
                </Stack>
              </Stack>

              <Flex direction="column" align="center" flex="1">
                <CartOrderSummary />
                <HStack mt="6" fontWeight="semibold">
                  <p>o</p>
                  <Link to={'#'} onClick={onClose}>Seguir comprando</Link>
                </HStack>
              </Flex>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
    </>
  )
}

export default Cart