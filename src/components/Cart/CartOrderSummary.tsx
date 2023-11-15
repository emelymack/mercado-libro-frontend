import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import { useState } from 'react'
import Shipping from './Shipping'
import { useAppSelector } from '../../context/hooks'

type OrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}

export const CartOrderSummary = () => {
  const [ showShippingMenu, setShowShippingMenu ] = useState(false)
  const cartState = useAppSelector((state) => state.cart)

  const calcSubtotal = () => {
    let subtotal = 0
    cartState.items.map((item) => {
      subtotal += item.product.price
    })
    return subtotal
  }

  const calcTotal = () => {
    let total = 0
    cartState.items.map((item) => {
      total += item.product.price
    })

    if(showShippingMenu) {
      total += cartState.shipping.price
    }
    return total
  }


  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" py={8} px={5} width="full">
      <Heading size="md">Resumen de compra</Heading>

      <Stack spacing="6">
        {/* Subtotal */}
        <OrderSummaryItem label="Subtotal (sin envío)" value={formatPrice(calcSubtotal())} />

        {/* Envío */}
        <OrderSummaryItem label="Envío a domicilio">
          <Link href="#" onClick={() => setShowShippingMenu(!showShippingMenu)} textDecor="underline">
            {showShippingMenu ? 'Cerrar' : 'Calcular envío'}
          </Link>
        </OrderSummaryItem>
        {showShippingMenu && (
          <Shipping />
        )}
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(calcTotal())}
          </Text>
        </Flex>
      </Stack>
      <Button variant="brandPrimary" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        Iniciar compra
      </Button>
    </Stack>
  )
}
