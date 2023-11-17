import { Title } from "../Title";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../Card/ProductCard";
import { Box, Spinner} from "@chakra-ui/react";
import { Book } from "../../types/product";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  products: Book[]
}

const ProductsCarousel = ({ title, products }: Props) => { 
  const [ isLoading, setIsLoading ] = useState(true) 
  
  useEffect(()=> {
    products.length > 0 ? setIsLoading(false) : setIsLoading(true)  
  },[products])

  return (
    <Box>
      <Title htmlElement={"h2"} size="lg" text={title} />
      { isLoading ? (
        <Box display={'flex'} justifyContent={'center'} mt={20}>
          <Spinner size={'xl'} thickness='4px' color="brand.violetLogo" /> 
        </Box>
        ) : (
        <Box mt={8} px={{base: 6, lg: 10}} position={"relative"}>
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={20}
            navigation={true}
            modules={[Navigation]}
            className="productsSwiper"
            loop={true}
          >
            {products?.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard
                  {...item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) }
      
    </Box>
  );
};

export default ProductsCarousel;
