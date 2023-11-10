import ProductsCarousel from '../ProductsCarousel'
import img from '../../assets/img/el-corazon-de-piedra-verde 1.png'
import { Box } from '@chakra-ui/react'

const products = [
  {
    id: 6,
    image_links: [img],
    title: "El corazón de piedra verde",
    authors: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 7,
    image_links: [img],
    title: "El corazón de piedra verde",
    authors: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 8,
    image_links: [img],
    title: "El corazón de piedra verde",
    authors: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 9,
    image_links: [img],
    title: "El corazón de piedra verde",
    authors: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 10,
    image_links: [img],
    title: "El corazón de piedra verde",
    authors: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 6,
    image_links: [img],
    title: "El corazón de piedra verde",
    authors: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },
]

const NewsCarousel = () => {
  return (
    <Box id='novedades'>
      <ProductsCarousel title='Novedades de octubre' products={products} />
    </Box>
  )
}

export default NewsCarousel