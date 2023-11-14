import { HStack, StackProps, Text, TextProps, useColorModeValue as mode } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface PriceTagProps {
  currency: string
  price: number
  salePrice?: number
  rootProps?: StackProps
  priceProps?: TextProps
  salePriceProps?: TextProps,
  fontSize?: string
}

export type FormatPriceOptions = { locale?: string; currency?: string }

export function formatPrice(value: number, opts: { locale?: string; currency?: string } = {}) {
  const { locale = 'en-US', currency = 'USD' } = opts
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    maximumFractionDigits: 0,
  })
  return formatter.format(value)
}

export const PriceTag = (props: PriceTagProps) => {
  const { price, currency, salePrice, rootProps, priceProps, salePriceProps, fontSize } = props
  return (
    <HStack spacing="1" {...rootProps}>
      <Price isOnSale={!!salePrice} textProps={priceProps} fontSize={fontSize}  >
        {formatPrice(price, { currency })}
      </Price>
      {salePrice && (
        <SalePrice {...salePriceProps}>{formatPrice(salePrice, { currency })}</SalePrice>
      )}
    </HStack>
  )
}

interface PriceProps {
  children?: ReactNode
  isOnSale?: boolean
  textProps?: TextProps,
  fontSize?: string
}

const Price = (props: PriceProps) => {
  const { isOnSale, children, textProps, fontSize } = props
  const defaultColor = mode('brand.blueLogo', 'gray.200')
  const onSaleColor = mode('gray.400', 'gray.700')
  const color = isOnSale ? onSaleColor : defaultColor
  
  return (
    <Text
      as="span"
      fontWeight="800"
      color={color}
      fontSize={fontSize}
      textDecoration={isOnSale ? 'line-through' : 'none'}
      {...textProps}
    >
      {children}
    </Text>
  )
}

const SalePrice = (props: TextProps) => (
  <Text as="span" fontWeight="semibold" color={mode('gray.800', 'gray.100')} {...props} />
)
