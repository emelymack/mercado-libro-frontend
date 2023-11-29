import { Flex, Text, useColorModeValue as mode } from "@chakra-ui/react"

type OrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode,
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}

export default OrderSummaryItem