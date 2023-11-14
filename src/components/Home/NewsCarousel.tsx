import ProductsCarousel from '../ProductsCarousel'
import { Box } from '@chakra-ui/react'



const NewsCarousel = () => {


  return (
    <Box id='novedades'>
      <ProductsCarousel title='Novedades de octubre' filtro='newer' />
    </Box>
  )
}

export default NewsCarousel