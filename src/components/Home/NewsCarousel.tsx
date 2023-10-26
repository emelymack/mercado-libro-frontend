import ProductsCarousel from '../ProductsCarousel'
import img from '../../assets/img/el-corazon-de-piedra-verde 1.png'

const products = [
  {
    img: img,
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500
  },{
    img: img,
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500
  },{
    img: img,
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500
  },{
    img: img,
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500
  },{
    img: img,
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500
  },{
    img: img,
    title: "El corazón de piedra verde",
    author: "Salvador de Madariaga",
    price: 12500
  },
]

const NewsCarousel = () => {
  return (
    <ProductsCarousel title='Novedades de octubre' products={products} />
  )
}

export default NewsCarousel