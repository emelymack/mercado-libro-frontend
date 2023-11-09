import { Box, Button, Image, Text } from '@chakra-ui/react'
import cartIcon from "../../assets/icons/icon-cart.svg";
import { useAppSelector } from '../../context/hooks';

interface Props {
  onClick: () => void,
  ref: any
}
const CartButton = ({onClick, ref}: Props) => {
  const cartItems = useAppSelector((state) => state.cart.items.length)
  
  return (
    <Box pos={'relative'}>
      {/* cantidad de items */}
      {cartItems > 0 && (
        <Text 
          bg={'brand.blueLogo'} 
          color={'white'} 
          fontWeight={600} 
          pos={'absolute'} 
          bottom={8}
          right={2} 
          w={'25px'} 
          h={'25px'} 
          textAlign={'center'} 
          borderRadius={'full'}
          zIndex={1}
        >
          {cartItems}
        </Text>)
      }

      {/* Botón carrito */}
      <Button
        bg={"none"}
        ps={0}
        pe={{ base: 2, md: 3 }}
        className="headerBtn"
        ref={ref}
        onClick={onClick}
      >
        <Image src={cartIcon} boxSize={{ base: '50px' }} />
      </Button>
    </Box>
  )
}

export default CartButton