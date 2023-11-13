import ProductsCarousel from '../ProductsCarousel'
import img from '../../assets/img/portada_la-casa-neville-la-formidable-senorita-manon_florencia-bonelli_202309121633.jpg'
import { Box } from '@chakra-ui/react'

const products = [
  {
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: [{name: "Florencia Bonelli", email:  ""}],
    price: 11900,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: [{name: "Florencia Bonelli", email:  ""}],
    price: 11000,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: [{name: "Florencia Bonelli", email:  ""}],
    price: 11000,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: [{name: "Florencia Bonelli", email:  ""}],
    price: 11000,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: [{name: "Florencia Bonelli", email:  ""}],
    price: 11000,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: [{name: "Florencia Bonelli", email:  ""}],
    price: 11000,
    url: ""
  },
]

const TrendingCarousel = () => {
  return (
    <Box id='masVendidos'>
      <ProductsCarousel title='Libros más vendidos' products={products} />
    </Box>
  )
}

export default TrendingCarousel