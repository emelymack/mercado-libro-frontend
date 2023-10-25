import { Box, Container } from '@chakra-ui/react'
import Banner from './Banner'
import NewsCarousel from './NewsCarousel'
import TrendingCarousel from './TrendingCarousel'
import Categories from './Categories'

const Home = () => {
  return (
    <Box>
      <Banner />
      <Container maxW={'container.xl'} mt={12} mb={20}>
        <Box>
          <NewsCarousel />
        </Box>
        <Box my={12}>
          <TrendingCarousel />
        </Box>
        <Categories />
      </Container>
    </Box>
  )
}

export default Home