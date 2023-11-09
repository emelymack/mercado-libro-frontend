import { Box, Container, Heading, Image, Link, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import BreadcrumbNav from './Breadcrumb'
import { useAppSelector } from '../../context/hooks'
import QuantityInput from '../Input/QuantityInput'
import AddToCart from '../Button/AddToCart'
import Details from './Details'
import RelatedProducts from './RelatedProducts'
import { useEffect, useState } from 'react'
import { Book } from '../../types/product'
import { getBookById } from '../../services/BookService'
import { useParams } from 'react-router-dom'
import { formatDateMonthYYYY, googleSearch } from '../../utils/functions'
import CustomLoading from '../CustomLoading/CustomLoading'
import { Title } from '../Title'

interface Product {
  book: Book | undefined,
  isLoading: boolean
}
const ProductPage = () => {
  const [product, setProduct] = useState<Product>({book: undefined, isLoading: true})
  const {productId} = useParams()
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling)

  // parseo de propiedad Authors
  const authors = product.book && JSON.parse(product.book.authors.replace(/'/g, '"'))


  useEffect(() => { 
    window.scrollTo(0, 0); 
    console.log(product.book);
    
    if(productId) {
      setProduct({...product, isLoading: true})
      getBookById(Number(productId))
      .then((res) => {
        console.log(res);
        setProduct({book: res, isLoading: false})
      })
    }
  }, [productId]);

  if(product.isLoading) return ( 
    <Box h={'calc(100vh - 130px)'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <CustomLoading />
    </Box> 
  )

  return (
    <Container maxW={'container.xl'} className={`page ${isScrolling ? 'scroll' : ''}`}>
      <Box py={8} mb={20}>
        {product.book && (
          <>
            <BreadcrumbNav category={product.book.categories[0].name} bookTitle={product.book.title} />
            <SimpleGrid columns={{base:1, md: 2}} spacing={10} mt={6} gap={{base: 6, lg: 12}}>
              <Box display={'flex'} justifyContent={{base: 'center', lg: 'flex-end'}} >
                <Image src={product.book.image_links[0]} boxSize={'300px'} h={'auto'}/>
              </Box>
              <Box w={{base: '100%', lg: '75%'}} px={{base: 6, lg: 0}}>
                {/* Titulo */}
                <Box w={{lg: '90%'}}>
                  <Title htmlElement={'h3'}  noOfLines={3} text={product.book.title} capitalize fw={700} />
                </Box>
                
                {/* Autor */}
                <Text mt={2} fontSize={'lg'} fontWeight={600} textDecor={'underline'}>
                  <Link href={googleSearch(`${authors[0].name}`)} isExternal>{authors[0].name}</Link>
                </Text>

                {/* Editorial y fecha publicación */}
                <Text>
                  <Link href={googleSearch(`${product.book.publisher}`)} isExternal textTransform={'uppercase'}>{product.book.publisher}</Link>, {product.book.published_date && formatDateMonthYYYY(product.book.published_date)}
                </Text>

                {/* Precio */}
                <Text color={useColorModeValue('brand.blueLogo', '#b9b6ff')} fontWeight={800} fontSize={'4xl'} mt={{base: 2, lg:8}}>
                  ${product.book.price}
                </Text>

                {/* Botones */}
                <Stack direction={{base: 'column', lg: 'row'}} alignItems={'center'} spacing={{base: 5, lg: 10}} mt={4}>
                  <QuantityInput />
                  <AddToCart id={product.book.id} stock={product.book.stock} />
                </Stack>
              </Box>
            </SimpleGrid>
            
            {/* Detalles de producto */}
            <Details 
              description={product.book.description} 
              language={product.book.language}
              page_count={product.book.page_count}
              published_date={product.book.published_date}
              publisher={product.book.publisher}
              author={authors[0].name}
            />

            {/* Productos relacionados */}
            <Box px={{base: 6, lg: 8}} mt={20}>
              <RelatedProducts />
            </Box>
          </>
        )}
        
      </Box>
      
    </Container>
  )
}

export default ProductPage