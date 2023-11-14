import { As, Heading, useColorModeValue as mode } from "@chakra-ui/react";

interface Props {
  htmlElement: As,
  size?: string,
  noOfLines?: number,
  align?: 'start' | 'center' | 'end',
  text: string,
  color?: 'green' | 'blue' | 'brand.violetLogo',
  capitalize?: boolean,
  fw?: number,
}

const setColor = (titleColor?: string) => {
  if(titleColor) {
    if (titleColor === 'green') return 'brand.greenLogo'
    if(titleColor === 'blue') return 'brand.blueLogo'
  };
  return mode('brand.blueLogo', '#a4a0ff')
}

export const Title = ({htmlElement, size, noOfLines, align, text, color, capitalize, fw}: Props) => (
  <Heading 
    as={htmlElement} 
    size={size} 
    noOfLines={noOfLines} 
    textAlign={align} 
    textTransform={capitalize ? "capitalize" : "uppercase"} 
    color={setColor(color)}
    fontWeight={fw ?? 900}
  >
    {text}
  </Heading>
)