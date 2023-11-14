import { Button, HStack, Input, useColorModeValue, useNumberInput } from '@chakra-ui/react'

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

  return (
    <HStack maxW='150px'>
      <Button {...dec} onClick={() => onChange(quantity - 1)} >-</Button>
      <Input borderColor={useColorModeValue('brand.greenLogo', 'brand.violetLogo')} color={useColorModeValue('brand.blueLogo', 'white')} {...input}  isDisabled _disabled={{ opacity: 1 }} />
      <Button {...inc} onClick={() => onChange(quantity + 1)} >+</Button>
    </HStack>
  )
}

export default QuantityInput