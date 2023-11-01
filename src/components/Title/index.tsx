import { As, Heading } from "@chakra-ui/react";

interface Props {
  htmlElement: As,
  size: string,
  noOfLines?: number,
  align?: 'start' | 'center' | 'end',
  text: string,
  color?: 'green' | 'blue'
}

export const Title = ({htmlElement, size, noOfLines, align, text, color}: Props) => (
  <Heading 
    as={htmlElement} 
    size={size} 
    noOfLines={noOfLines} 
    textAlign={align} 
    textTransform={"uppercase"} 
    color={color === 'green' ? 'brand.greenLogo' : 'brand.blueLogo'}
    fontWeight={900}
  >
    {text}
  </Heading>
)