import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { PriceTag } from './PriceTag'

export type CartProductMetaProps = {
  name: string
  image: string,
  price: number,
  currency: string
}

export const CartProductMeta = (props: CartProductMetaProps) => {
  const { price, currency, image, name } = props
  return (
    <Stack direction="row" alignItems={'center'} spacing="5" width="full">
      <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4" w={'45%'}>
        <Stack spacing="0.5" >
          <Text fontWeight="700" color={'brand.blueLogo'} fontSize={'md'} noOfLines={2}>{name}</Text>
          <PriceTag price={price} currency={currency} fontSize='xl' />
        </Stack>
      </Box>
    </Stack>
  )
}
