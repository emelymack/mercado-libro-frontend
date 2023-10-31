import { Box, Container, Image, SimpleGrid } from '@chakra-ui/react'
import BreadcrumbNav from './Breadcrumb'
import bookImg from '../../assets/img/book-2.png'
import { useAppSelector } from '../../context/hooks'

const ProductPage = () => {
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling)
  return (
    <Container maxW={'container.xl'} className={`page ${isScrolling ? 'scroll' : ''}`}>
      <Box py={12}>
        <BreadcrumbNav category='Categoría' bookTitle='Título' />
        <SimpleGrid columns={{base:1, lg: 2}} spacing={10} mt={6}>
          <Box>
            <Image src={bookImg} boxSize={'350px'} h={'auto'}/>
          </Box>
        </SimpleGrid>
      </Box>
    </Container>
  )
}

export default ProductPage