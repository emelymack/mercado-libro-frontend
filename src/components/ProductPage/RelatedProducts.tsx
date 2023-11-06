import ProductsCarousel from '../ProductsCarousel'
import img from '../../assets/img/el-corazon-de-piedra-verde 1.png'

const products = [
  {
    id: 1,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 2,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 3,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 4,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 5,
    image_links: [img],
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500,
    url: ""
  },{
    id: 6,
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