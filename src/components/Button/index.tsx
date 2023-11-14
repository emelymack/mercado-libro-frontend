// import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { Button, useColorModeValue } from "@chakra-ui/react";

interface Props {
  onClick: () => void,
  text: string
}
export const SecondaryButton = ({onClick, text}: Props) => (
  <Button fontSize={'lg'} onClick={onClick} color={useColorModeValue('brand.blueLogo', 'white')} bg={useColorModeValue('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.08)')} >
    {text}
  </Button>
)