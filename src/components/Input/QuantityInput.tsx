import { Button, HStack, Input, useColorModeValue, useNumberInput } from '@chakra-ui/react'
import { useEffect } from 'react'

interface Props {
  quantity: number,
  stock: number,
  onChange: (value:number) => void
}
const QuantityInput = ({onChange, quantity, stock}: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
  useNumberInput({
    step: 1,
    defaultValue: quantity,
    min: 1,
    max: stock < 10 ? stock : 10,
    precision: 0,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  const handleChange = (operation: 'SUMA' | 'RESTA') => {
    if(operation === 'SUMA' && quantity < 10) {
      onChange(quantity + 1)
    } 
    if(operation === 'RESTA' && quantity > 1) {
      onChange(quantity - 1)
    } 
  }

  useEffect(() => {}, [quantity])

  return (
    <HStack maxW='150px'>
      <Button {...dec} onClick={() => handleChange('RESTA')} >-</Button>
      <Input borderColor={useColorModeValue('brand.greenLogo', 'brand.violetLogo')} color={useColorModeValue('brand.blueLogo', 'white')} {...input}  isDisabled _disabled={{ opacity: 1 }} />
      <Button {...inc} onClick={() => handleChange('SUMA')} >+</Button>
    </HStack>
  )
}

export default QuantityInput