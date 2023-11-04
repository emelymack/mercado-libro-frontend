import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react'

const QuantityInput = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
  useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 10,
    precision: 0,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <HStack maxW='150px'>
      <Button {...dec}>-</Button>
      <Input borderColor={'brand.greenLogo'} {...input} />
      <Button {...inc}>+</Button>
    </HStack>
  )
}

export default QuantityInput