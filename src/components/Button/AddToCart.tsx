import { Button, Image } from "@chakra-ui/react"
import iconCart from '../../assets/icons/icon-add-cart.svg'

const AddToCart = () => {
  return (
    <Button 
      variant="brandPrimary" 
      w={"100%"} 
      py={2} 
      h={"auto"} 
      px={10} 
      aria-label="Agregar al carrito"
      onClick={()=>alert('Agregado!')}
    >
      Agregar <Image src={iconCart} ps={1} w={8} mb={1} />
    </Button>
  )
}

export default AddToCart