// import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { Button } from "@chakra-ui/react";

// const brandPrimary = defineStyle({
//   background: 'orange.500',
//   color: 'white',
//   fontFamily: 'serif',
//   fontWeight: 'normal',

//   // let's also provide dark mode alternatives
//   _dark: {
//     background: 'orange.300',
//     color: 'orange.800',
//   }
// })
 
// export const buttonTheme = defineStyleConfig({
//   variants: { brandPrimary },
// })

interface Props {
  onClick: () => void,
  text: string
}
export const SecondaryButton = ({onClick, text}: Props) => (
  <Button onClick={onClick} className="secondaryBtn">{text}</Button>
)