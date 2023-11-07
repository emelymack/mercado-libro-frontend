import ProductsCarousel from '../ProductsCarousel'
import img from '../../assets/img/portada_la-casa-neville-la-formidable-senorita-manon_florencia-bonelli_202309121633.jpg'

const products = [
  {
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: "Florencia Bonelli",
    price: 11900,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: "Florencia Bonelli",
    price: 11000,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: "Florencia Bonelli",
    price: 11000,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: "Florencia Bonelli",
    price: 11000,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: "Florencia Bonelli",
    price: 11000,
    url: ""
  },{
    image_links: [img],
    title: "La Casa Neville. La formidable señorita Manon",
    authors: "Florencia Bonelli",
    price: 11000,
    url: ""
  },
]

const TrendingCarousel = () => {
  return (
    <ProductsCarousel title='Libros más vendidos' products={products} />
  )
}

export default TrendingCarousel