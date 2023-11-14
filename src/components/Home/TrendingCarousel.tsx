import ProductsCarousel from '../ProductsCarousel'
import { Box } from '@chakra-ui/react'

//TODO hacer filtro de más vendidos

const TrendingCarousel = () => {
  return (
    <Box id='masVendidos'>
      <ProductsCarousel title='Libros más vendidos' filtro='newer' />
    </Box>
  )
}

export default TrendingCarousel