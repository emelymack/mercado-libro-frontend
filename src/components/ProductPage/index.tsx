import { Box, Container, Stack } from '@chakra-ui/react'
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
import CustomLoading from '../CustomLoading/CustomLoading'
import ProductData from './ProductData'

interface Product {
  book: Book | undefined,
  isLoading: boolean
}
const ProductPage = () => {
  const [product, setProduct] = useState<Product>({book: undefined, isLoading: true})
  const {productId} = useParams()
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling)

  const [orderQty, setOrderQty] = useState(1);  

  // parseo de propiedad Authors
  const authors = product.book && JSON.parse(product.book.authors.replace(/'/g, '"'))


  useEffect(() => { 
    window.scrollTo(0, 0); 
    
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
            <ProductData book={product.book}>
              {/* Botones */}
              <Stack direction={{base: 'column', lg: 'row'}} alignItems={'center'} spacing={{base: 5, lg: 10}} mt={4}>
                <QuantityInput quantity={orderQty} onChange={setOrderQty} />
                <AddToCart id={product.book.id} stock={product.book.stock} orderQty={orderQty} />
              </Stack>
            </ProductData>
            
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