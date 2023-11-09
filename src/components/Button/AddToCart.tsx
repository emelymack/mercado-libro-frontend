import { Button, Image } from "@chakra-ui/react"
import iconCart from '../../assets/icons/icon-add-cart.svg'
import { useAppDispatch, useAppSelector } from "../../context/hooks"
import { fetchProduct } from "../../context/slices/cartSlice"

interface Props {
  id:number,
  stock: number
}
const AddToCart = ({id, stock}: Props) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state)=> state.cart)

  const addItemToCart = () => {
    dispatch(fetchProduct(id, 2))
    console.log(items);
    
  }

  return (
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
  )
}

export default AddToCart