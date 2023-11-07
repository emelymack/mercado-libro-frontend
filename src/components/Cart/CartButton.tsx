import { Button, Image } from '@chakra-ui/react'
import cartIcon from "../../assets/icons/icon-cart.svg";

interface Props {
  onClick: () => void,
  ref: any
}
const CartButton = ({onClick, ref}: Props) => {
  
  return (
    <Button
      bg={"none"}
      ps={0}
      pe={{ base: 2, md: 3 }}
      className="headerBtn"
      ref={ref}
      onClick={onClick}
    >
      <Image src={cartIcon} boxSize={{ base: '50px' }} />
    </Button>
  )
}

export default CartButton