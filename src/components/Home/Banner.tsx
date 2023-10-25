// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../../assets/img/banner-book-1.jpg'
import img2 from '../../assets/img/banner-book-2.webp'
import img3 from '../../assets/img/banner-book-3.webp'
import img4 from '../../assets/img/banner-book-4.webp'
import { Image } from '@chakra-ui/react';


const Banner = () => {
  return (
    <div>
      <Swiper 
        pagination={true} 
        navigation={true} 
        modules={[Pagination, Navigation]} 
        className="bannerSwiper" 
        loop={true}
      >
        <SwiperSlide>
          <Image src={img1} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img2} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img4} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Banner