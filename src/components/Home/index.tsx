import { Box, Container } from "@chakra-ui/react";
import Banner from "./Banner";
import NewsCarousel from "./NewsCarousel";
import TrendingCarousel from "./TrendingCarousel";
import Categories from "./Categories";
import Services from "./Services";
import { useAppSelector } from "../../context/hooks";

const Home = () => {
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling);
  return (
    <Box className={`page ${isScrolling ? "scroll" : ""}`}>
      <Banner />
      <Container maxW={"container.xl"} mt={12} mb={20}>
        <Box>
          <NewsCarousel />
        </Box>
        <Box mt={{ base: 12, lg: 20 }} mb={5}>
          <TrendingCarousel />
        </Box>
        <Categories />
        <Services />
      </Container>
    </Box>
  );
};

export default Home;
