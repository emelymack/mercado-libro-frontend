// import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { Button, useColorModeValue } from "@chakra-ui/react";

interface Props {
  onClick: () => void,
  text: string
}
export const SecondaryButton = ({onClick, text}: Props) => (
  <Button onClick={onClick} className={useColorModeValue('secondaryBtn', 'white')} color={useColorModeValue('brand.blueLogo', 'white')}>{text}</Button>
)