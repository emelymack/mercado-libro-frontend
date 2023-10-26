import { As, Heading } from "@chakra-ui/react";

interface Props {
  htmlElement: As,
  size: string,
  noOfLines?: number,
  align?: 'start' | 'center' | 'end',
  text: string
}

export const Title = ({htmlElement, size, noOfLines, align, text}: Props) => (
  <Heading 
    as={htmlElement} 
    size={size} 
    noOfLines={noOfLines} 
    textAlign={align} 
    textTransform={"uppercase"} 
    color={'var(--secondary)'}
    fontWeight={900}
  >
    {text}
  </Heading>
)