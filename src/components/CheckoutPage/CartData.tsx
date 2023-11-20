import { useAppSelector } from "../../context/hooks"

const CartData = () => {
  const cartData = useAppSelector((state) => state.cart.items)

  return (
    <div>CartData</div>
  )
}

export default CartData