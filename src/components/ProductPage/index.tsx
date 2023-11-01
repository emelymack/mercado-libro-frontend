import { Box, Container, Heading, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import BreadcrumbNav from './Breadcrumb'
import bookImg from '../../assets/img/book-2.png'
import { useAppSelector } from '../../context/hooks'
import QuantityInput from './QuantityInput'
import AddToCart from '../Button/AddToCart'
import Details from './Details'
import RelatedProducts from './RelatedProducts'

const ProductPage = () => {
  // const {id, img, title, author, publisher, publishDate, price, description, pages, lang} = product

  const searchAuthor = (str: string) => {
    const searchStr = str.split(' ').join('+')
    return `https://www.google.com/search?q=${searchStr}`
  }
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling)
  return (
    <Container maxW={'container.xl'} className={`page ${isScrolling ? 'scroll' : ''}`}>
      <Box py={8} mb={20}>
        <BreadcrumbNav category='Categoría' bookTitle='Título' />
        <SimpleGrid columns={{base:1, md: 2}} spacing={10} mt={6} gap={{base: 6, lg: 12}}>
          <Box display={'flex'} justifyContent={{base: 'center', lg: 'flex-end'}} >
            <Image src={bookImg} boxSize={'300px'} h={'auto'}/>
          </Box>
          <Box w={{base: '100%', lg: '70%'}} px={{base: 6, lg: 0}}>
            {/* Titulo */}
            <Heading color={'brand.blueLogo'} noOfLines={3} w={{lg: '90%'}}>El corredor o las almas que lleva el diablo (Mapa de las lenguas) </Heading>
            
            {/* Autor */}
            <Text mt={2} fontSize={'lg'} fontWeight={600} textDecor={'underline'}>
              <Link href={searchAuthor('Alejandro Vázquez Ortiz')} isExternal>Alejandro Vázquez Ortiz</Link>
            </Text>

            {/* Editorial y fecha publicación */}
            <Text>
              RANDOM HOUSE, Septiembre 2023
            </Text>

            {/* Precio */}
            <Text color={'brand.blueLogo'} fontWeight={800} fontSize={'4xl'} mt={8}>
              $10.500
            </Text>

            {/* Botones */}
            <Stack direction={{base: 'column', lg: 'row'}} alignItems={'center'} spacing={{base: 5, lg: 10}} mt={4}>
              <QuantityInput />
              <AddToCart />
            </Stack>
          </Box>
        </SimpleGrid>
        
        {/* Detalles de producto */}
        <Details />

        {/* Productos relacionados */}
        <Box px={{base: 6, lg: 8}} mt={20}>
          <RelatedProducts />
        </Box>
      </Box>
      
    </Container>
  )
}

export default ProductPage