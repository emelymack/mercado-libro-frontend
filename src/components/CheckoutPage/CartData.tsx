import { Box, Divider, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react"
import { useAppSelector } from "../../context/hooks"
import { formatPrice } from "../Cart/PriceTag"

const CartData = () => {
  const cartData = useAppSelector((state) => state.cart)

  return (
    <Box py={5} px={6} border={'2px solid'} borderColor={useColorModeValue('brand.greenLogo', 'brand.violetLogo')} borderRadius={10} mt={{base: 5, lg: 0}}>
      {cartData.items.map((item) => (
        <Flex color={useColorModeValue('brand.greenLogo', 'white')} alignItems={"center"} justifyContent={"space-between"} mb={4}>
          <Flex alignItems={"center"} me={10}>
            <Image src={item.product.image_links[0]?.url} h={'150px'} />
            <Box ms={4}>
              <Text fontWeight={600} noOfLines={2}>{item.product.title}</Text>
              <Text fontWeight={600} fontSize={'sm'} mt={2}>Cantidad: {item.quantity}</Text>
            </Box>
          </Flex>
          <Text fontWeight={600} fontSize={'lg'} mt={2}>{formatPrice(item.product.price)}</Text>
        </Flex>
      ))}
      <Divider mt={6} />
      <Box>
        <Flex alignItems={"center"} justifyContent={"space-between"} my={4}>
          <Text color={useColorModeValue('brand.blueLogo', 'white')} fontWeight={500}>Subtotal:</Text>
          <Text color={useColorModeValue('brand.blueLogo', 'white')} fontWeight={500}>{formatPrice(cartData.total - cartData.shipping.price)}</Text>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"} my={4}>
          <Text color={useColorModeValue('brand.blueLogo', 'white')} fontWeight={500}>Costo de envío:</Text>
          <Text color={useColorModeValue('brand.blueLogo', 'white')} fontWeight={500}>{cartData.shipping.type === 'CORREO_ARGENTINO' ? formatPrice(cartData.shipping.price) : 'Gratis'}</Text>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"} my={4}>
          <Text color={useColorModeValue('brand.blueLogo', 'white')} fontWeight={700} fontSize={'lg'}>Total:</Text>
          <Text color={useColorModeValue('brand.blueLogo', 'white')} fontWeight={700} fontSize={'lg'}>{formatPrice(cartData.total)}</Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default CartData