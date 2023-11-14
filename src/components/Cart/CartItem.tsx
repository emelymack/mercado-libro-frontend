import { Flex, Link, useDisclosure } from '@chakra-ui/react'
import { CartProductMeta } from './CartProductMeta'
import QuantityInput from '../Input/QuantityInput'
import { useAppDispatch } from '../../context/hooks'
import { updateItem, deleteItem } from '../../context/slices/cartSlice'
import { useEffect, useState } from 'react'
import ModalAlert from '../Modal/ModalAlert'

type CartItemProps = {
  id:number,
  name: string
  author?: string
  quantity: number,
  price: number,
  imageUrl: string,
  stock: number
}

export const CartItem = ({ id, name, quantity, price, imageUrl, stock }: CartItemProps) => {
  const dispatch = useAppDispatch()
  const [ itemQty, setItemQty ] = useState(quantity)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {    
    dispatch(updateItem({id:id, orderQty: itemQty}))
  }, [itemQty])

  const onDeleteItem = () => {
    dispatch(deleteItem({id: id}))
  }

  return (
    <>
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
          <QuantityInput stock={stock} quantity={itemQty} onChange={setItemQty} />
          <Link fontSize="sm" textDecor="underline" mt={2} color={'red.500'} onClick={onOpen}>
            Eliminar
          </Link>
        </Flex>
      </Flex>

      <ModalAlert isOpen={isOpen} onOpen={onOpen} onClose={onClose} headerTitle='Eliminar producto' text='¿Estás seguro que deseas eliminar este producto?' onConfirm={() => onDeleteItem()}/>
      
    </>
  )
}
