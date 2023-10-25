import { Title } from '../Title'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductCard from '../Card/ProductCard';
import { Box } from '@chakra-ui/react';
import { Product } from '../../types/product';


interface Props {
  title:string,
  products: Product[]
}


const ProductsCarousel = ({title, products}: Props) => {
  return (
    <Box>
      <Title htmlElement={'h2'} size='lg' text={title} />
      <Box mt={8} px={10} position={'relative'}>
        <Swiper 
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={30}
          navigation={true} 
          modules={[Navigation]} 
          className="productsSwiper" 
          loop={true}
        >
          {products.map((item) => (
            <SwiperSlide>
              <ProductCard img={item.img} title={item.title} author={item.author} price={item.price} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}

export default ProductsCarousel