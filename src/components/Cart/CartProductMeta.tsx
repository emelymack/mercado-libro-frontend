import {
  Box,
  Image,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { Title } from '../Title'

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
          <Title htmlElement={'h5'} size={'md'} noOfLines={2} text={name} />
          <PriceTag price={price} currency={currency} fontSize='xl' />
        </Stack>
      </Box>
    </Stack>
  )
}
