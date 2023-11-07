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
    <Flex flexDir={{base: 'column', md: 'row'}} justify="space-between" align="center" border={{base: '1px solid', md: 'none'}} borderColor={'gray.300'} borderRadius={10} p={{base:4, md: 0}}>
      <CartProductMeta
        name={name}
        image={imageUrl}
        price={price}
        currency='usd'
      />

      <Flex
        mt="4"
        align="center"
        width={{base: "80%", md: "50%"}}
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
