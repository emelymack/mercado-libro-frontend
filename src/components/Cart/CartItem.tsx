import { CloseButton, Flex, Link, Select, SelectProps, useColorModeValue } from '@chakra-ui/react'
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

const QuantitySelect = (props: SelectProps) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  )
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
        {/* <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value)
          }}
        /> */}
        <QuantityInput />
        <Link fontSize="sm" textDecor="underline" mt={2} color={'red.500'}>
          Eliminar
        </Link>
      </Flex>
    </Flex>
  )
}
