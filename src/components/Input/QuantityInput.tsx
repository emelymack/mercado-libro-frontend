import { Button, HStack, Input, useColorModeValue, useNumberInput } from '@chakra-ui/react'

interface Props {
  quantity: number,
  onChange: (value:number) => void
}
const QuantityInput = ({onChange, quantity}: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
  useNumberInput({
    step: 1,
    defaultValue: quantity,
    min: 1,
    max: 10,
    precision: 0,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <HStack maxW='150px'>
      <Button {...dec} onClick={() => onChange(quantity - 1)} >-</Button>
      <Input borderColor={useColorModeValue('brand.greenLogo', 'brand.violetLogo')} color={useColorModeValue('brand.blueLogo', 'white')} {...input} 
      />
      <Button {...inc} onClick={() => onChange(quantity + 1)} >+</Button>
    </HStack>
  )
}

export default QuantityInput