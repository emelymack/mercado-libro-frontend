import { Box, Container, Heading, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import BreadcrumbNav from './Breadcrumb'
import bookImg from '../../assets/img/book-2.png'
import { useAppSelector } from '../../context/hooks'
import QuantityInput from '../Input/QuantityInput'
import AddToCart from '../Button/AddToCart'
import Details from './Details'
import RelatedProducts from './RelatedProducts'
import { useEffect, useState } from 'react'
import { Book } from '../../types/product'
import { getBookById } from '../../services/BookService'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
  const [product, setProduct] = useState<Book | null>(null)
  const {productId} = useParams()
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling)

  // parseo de propiedad Authors
  const authors = product && JSON.parse(product?.authors.replace(/'/g, '"'))

  // buscar en Google
  const search = (str: string) => {
    const searchStr = str.split(' ').join('+')
    return `https://www.google.com/search?q=${searchStr}`
  }

  // obtener fecha en formato mes/YYYY
  function formatDate(date: string) {
    // Crear un objeto Date a partir de la cadena de fecha
    const dateObject = new Date(date);
  
    // Crear un array con los nombres de los meses
    const monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
  
    // Obtener el mes y el año de la fecha
    const month = monthNames[dateObject.getMonth()];
    const year = dateObject.getFullYear();
  
    // Crear la cadena de fecha en el formato deseado
    const formattedDate = `${month} ${year}`;
  
    return formattedDate;
  }


  useEffect(() => { 
    window.scrollTo(0, 0); 
    
    if(productId) {
      getBookById(Number(productId))
      .then((res) => {
        console.log(res);
        setProduct(res)
      })
    }
  }, []);

  return (
    <Container maxW={'container.xl'} className={`page ${isScrolling ? 'scroll' : ''}`}>
      <Box py={8} mb={20}>
        <BreadcrumbNav category='Categoría' bookTitle='Título' />
        <SimpleGrid columns={{base:1, md: 2}} spacing={10} mt={6} gap={{base: 6, lg: 12}}>
          <Box display={'flex'} justifyContent={{base: 'center', lg: 'flex-end'}} >
            <Image src={bookImg} boxSize={'300px'} h={'auto'}/>
          </Box>
          <Box w={{base: '100%', lg: '75%'}} px={{base: 6, lg: 0}}>
            {/* Titulo */}
            <Heading color={'brand.blueLogo'} noOfLines={3} w={{lg: '90%'}}>{product?.title}</Heading>
            
            {/* Autor */}
            <Text mt={2} fontSize={'lg'} fontWeight={600} textDecor={'underline'}>
              <Link href={search(`${authors[0].name}`)} isExternal>{authors[0].name}</Link>
            </Text>

            {/* Editorial y fecha publicación */}
            <Text>
              <Link href={search(`${product?.publisher}`)} isExternal textTransform={'uppercase'}>{product?.publisher}</Link>, {product?.published_date && formatDate(product?.published_date)}
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