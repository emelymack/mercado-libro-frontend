import ProductsCarousel from '../ProductsCarousel'
import img from '../../assets/img/portada_la-casa-neville-la-formidable-senorita-manon_florencia-bonelli_202309121633.jpg'

const products = [
  {
    img: img,
    title: "La Casa Neville. La formidable señorita Manon",
    author: "Florencia Bonelli",
    price: 11900
  },{
    img: img,
    title: "La Casa Neville. La formidable señorita Manon",
    author: "Florencia Bonelli",
    price: 11000
  },{
    img: img,
    title: "La Casa Neville. La formidable señorita Manon",
    author: "Florencia Bonelli",
    price: 11000
  },{
    img: img,
    title: "La Casa Neville. La formidable señorita Manon",
    author: "Florencia Bonelli",
    price: 11000
  },{
    img: img,
    title: "La Casa Neville. La formidable señorita Manon",
    author: "Florencia Bonelli",
    price: 11000
  },{
    img: img,
    title: "La Casa Neville. La formidable señorita Manon",
    author: "Florencia Bonelli",
    price: 11000
  },
]

const TrendingCarousel = () => {
  return (
    <ProductsCarousel title='Libros más vendidos' products={products} />
  )
}

export default TrendingCarousel