import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import { useState } from 'react'
import Shipping from './Shipping'
import { useAppSelector } from '../../context/hooks'
import { useNavigate } from 'react-router-dom'
import ModalError from '../Modal/ModalError'
import OrderSummaryItem from './OrderSummaryItem'
import { calcSubtotal } from '../../utils/functions'

interface Props {
  onCloseCart: () => void
}
export const CartOrderSummary = ({onCloseCart}: Props) => {
  const [ showShippingMenu, setShowShippingMenu ] = useState(false)
  const cartState = useAppSelector((state) => state.cart)
  const isUserLogged = useAppSelector((state) => state.auth.isLogged)
  const navigate = useNavigate()
  const { onOpen: onOpenError, isOpen: isOpenError, onClose: onCloseError } = useDisclosure()
  const [ errorModalTxt, setErrorModalTxt ] = useState('')

  const calcTotal = () => {
    let total = calcSubtotal(cartState.items)

    total += cartState.shipping.price
    return total
  }

  const goToCheckout = () => {
    if(!isUserLogged) {
      setErrorModalTxt('Debes iniciar sesión para realizar una compra.')
      onOpenError()
      return
    } else if(!cartState.shipping.postalCode) {
      setErrorModalTxt('Debes seleccionar un método de envío.')
      onOpenError()
      setShowShippingMenu(true)
      return 
    } else {
      navigate('/checkout')
      onCloseCart()
    }
  }

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" py={8} px={5} width="full">
      <Heading size="md">Resumen de compra</Heading>

      <Stack spacing="6">
        {/* Subtotal */}
        <OrderSummaryItem label="Subtotal (sin envío)" value={formatPrice(calcSubtotal(cartState.items))} />

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
      <Button onClick={() => goToCheckout()} variant="brandPrimary" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        Iniciar compra
      </Button>

      <ModalError title={errorModalTxt} isOpen={isOpenError} onClose={onCloseError}  />
    </Stack>
  )
}
