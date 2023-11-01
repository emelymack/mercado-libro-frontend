import { Title } from "../Title";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../Card/ProductCard";
import { Box } from "@chakra-ui/react";
import { Product } from "../../types/product";

interface Props {
  title: string;
  titleColor?: 'green' | 'blue';
  products: Product[];
}

const ProductsCarousel = ({ title, products, titleColor }: Props) => {
  return (
    <Box>
      <Title htmlElement={"h2"} size="lg" text={title} color={titleColor ?? 'blue'} />
      <Box mt={8} px={10} position={"relative"}>
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
          {products.map((item) => (
            <SwiperSlide>
              <ProductCard
                id={item.id}
                img={item.img}
                title={item.title}
                author={item.author}
                price={item.price}
                url={""}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ProductsCarousel;
