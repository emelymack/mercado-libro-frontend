import ProductsCarousel from '../ProductsCarousel'
import img from '../../assets/img/el-corazon-de-piedra-verde 1.png'

const products = [
  {
    id: 6,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 7,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 8,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 9,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 10,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 11,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },
]

const RelatedProducts = () => {
  return (
    <ProductsCarousel title='Productos relacionados' titleColor='green' products={products} />
  )
}

export default RelatedProducts