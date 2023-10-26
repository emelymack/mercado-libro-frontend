// import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void,
  text: string
}
export const SecondaryButton = ({onClick, text}: Props) => (
  <Button onClick={onClick} className="secondaryBtn">{text}</Button>
)