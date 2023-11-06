import { Flex, Link } from '@chakra-ui/react'
import { CartProductMeta } from './CartProductMeta'
import QuantityInput from '../Input/QuantityInput'

type CartItemProps = {
  name: string
  description: string
  quantity: number,
  price: number,
  currency: string
  imageUrl: string
  onChangeQuantity?: (quantity: number) => void
  onClickDelete?: () => void
}

export const CartItem = (props: CartItemProps) => {
  const {
    name,
    quantity,
    price,
    imageUrl,
    onChangeQuantity,
    onClickDelete,
  } = props

  return (
    <Flex  justify="space-between" align="center">
      <CartProductMeta
        name={name}
        image={imageUrl}
        price={price}
        currency='usd'
      />

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="50%"
        justify="space-between"
        display={{ base: 'flex' }}
        flexDir={'column'}
      >
        <QuantityInput />
        <Link fontSize="sm" textDecor="underline" mt={2} color={'red.500'}>
          Eliminar
        </Link>
      </Flex>
    </Flex>
  )
}
