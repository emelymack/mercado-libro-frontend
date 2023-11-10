import { Alert, AlertIcon, AlertTitle, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import iconCart from '../../assets/icons/icon-add-cart.svg'
import { useAppDispatch, useAppSelector } from "../../context/hooks"
import { fetchProduct } from "../../context/slices/cartSlice"

interface Props {
  id: number,
  stock: number,
  orderQty: number
}
const AddToCart = ({id, stock, orderQty}: Props) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state)=> state.cart)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addItemToCart = () => {
    try {
      dispatch(fetchProduct({id: id, orderQty: orderQty}))
      onOpen()
      console.log(items);
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay  />
          <ModalContent bg={"brand.greenLogo"} color={'white'}>
            <ModalCloseButton  />
            <ModalBody mt={8} py={10}>
              <Alert
                bg={"brand.greenLogo"}
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="auto"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  ¡Se agregó el producto al carrito!
                </AlertTitle>
              </Alert>
            </ModalBody>
          </ModalContent>
      </Modal>
    </>
  )
}

export default AddToCart