import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, Stack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'
import { Link } from 'react-router-dom'
import CartButton from './CartButton'
import { useAppSelector } from '../../context/hooks'

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef();
  const cartData = useAppSelector((state) => state.cart.items)

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
          <DrawerCloseButton zIndex={5} mt={2} color={'white'} />
          <DrawerHeader bg={'brand.violetLogo'} color={'white'}>Carrito de compras</DrawerHeader>

          <DrawerBody>
            {cartData.length === 0 ? 
              <Box h={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} fontWeight={700} fontSize={18}>¡Aún no hay productos en el carrito!</Box> : (
              <Stack direction={{ base: 'column' }} spacing={{ base: 8 }} py={5} >
                <Stack spacing={{ base: 8, md: 10 }} flex="2">
                  <Stack spacing={{ base: 3, md: 6 }}>
                    {cartData.map((item) => (
                      <CartItem 
                        key={item.product.id}
                        name={item.product.title}
                        quantity={item.quantity}
                        price={item.product.price}
                        imageUrl={item.product.image_links[0]}  
                      />
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
            )}
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
    </>
  )
}

export default Cart