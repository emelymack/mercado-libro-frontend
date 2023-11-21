import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { useAppSelector } from "../../context/hooks"
import { calcSubtotal } from "../../utils/functions"
import { formatPrice } from "../Cart/PriceTag"

const CartData = () => {
  const cartData = useAppSelector((state) => state.cart)

  return (
    <Box py={5} px={6} border={'2px solid'} borderColor={'brand.greenLogo'} borderRadius={10} mt={{base: 5, lg: 0}}>
      {cartData.items.map((item) => (
        <Flex alignItems={"center"} justifyContent={"space-between"} mb={4}>
          <Flex alignItems={"center"} me={10}>
            <Image src={item.product.image_links[0].url} h={'150px'} />
            <Box ms={4}>
              <Text color={'brand.blueLogo'} fontWeight={600} noOfLines={2}>{item.product.title}</Text>
              <Text color={'brand.blueLogo'} fontWeight={600} fontSize={'sm'} mt={2}>Cantidad: {item.quantity}</Text>
            </Box>
          </Flex>
          <Text color={'brand.blueLogo'} fontWeight={600} fontSize={'lg'} mt={2}>${item.product.price}</Text>
        </Flex>
      ))}
      <Divider mt={6} />
      <Box>
        <Flex alignItems={"center"} justifyContent={"space-between"} my={4}>
          <Text color={'brand.blueLogo'} fontWeight={500}>Subtotal:</Text>
          <Text color={'brand.blueLogo'} fontWeight={500}>{formatPrice(calcSubtotal(cartData.items))}</Text>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"} my={4}>
          <Text color={'brand.blueLogo'} fontWeight={500}>Costo de envío:</Text>
          <Text color={'brand.blueLogo'} fontWeight={500}>{formatPrice(cartData.shipping.price)}</Text>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"} my={4}>
          <Text color={'brand.blueLogo'} fontWeight={700} fontSize={'lg'}>Total:</Text>
          <Text color={'brand.blueLogo'} fontWeight={700} fontSize={'lg'}>{formatPrice(cartData.total)}</Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default CartData