import { Button, Image, useDisclosure } from "@chakra-ui/react"
import iconCart from '../../assets/icons/icon-add-cart.svg'
import { useAppDispatch, useAppSelector } from "../../context/hooks"
import { fetchProduct } from "../../context/slices/cartSlice"
import ModalSuccess from "../Modal/ModalSuccess"
import ModalError from "../Modal/ModalError"
import { getBookById } from "../../services/BookService"

interface Props {
  id: number,
  stock: number,
  orderQty: number
}
const AddToCart = ({id, stock, orderQty}: Props) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state)=> state.cart)
  const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure()
  const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()

  const addItemToCart = async () => {
    try {
      const isItemInCart = items.items.some((item) => item.product.id === id)

      if(!isItemInCart) {
        dispatch(fetchProduct({id: id, orderQty: orderQty}))
        onOpenSuccess()
      } else {
        onOpenError()
      }   
    } catch {
      console.error('No se pudo agregar el producto.') 
    }
  }

  return (
    <>
      <Button 
        variant="brandPrimary" 
        w={"100%"} 
        py={2} 
        h={"auto"} 
        px={10} 
        aria-label="Agregar al carrito"
        onClick={()=> addItemToCart()}
        isDisabled={stock <= 1}
      >
        Agregar <Image src={iconCart} ps={1} w={8} mb={1} />
      </Button>
      <ModalSuccess isOpen={isOpenSuccess} onClose={onCloseSuccess} title="¡Se agregó el producto al carrito!" />
      <ModalError isOpen={isOpenError} onClose={onCloseError} title="Ya existe este producto en el carrito." />
    </>
  )
}

export default AddToCart