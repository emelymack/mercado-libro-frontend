import { Container } from "@chakra-ui/react"
import { useAppSelector } from "../../context/hooks"

interface Props {
  children: React.ReactNode,
  [x:string]: any
}
const PageContainer = (props: Props) => {
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling)

  return (
    <Container maxW={'container.xl'} className={`page ${isScrolling ? 'scroll' : ''}`} {...props}>
      {props.children}
    </Container>
  )
}

export default PageContainer