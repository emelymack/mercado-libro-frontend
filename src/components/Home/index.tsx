import { Box, Container } from '@chakra-ui/react'
import Banner from './Banner'
import NewsCarousel from './NewsCarousel'
import TrendingCarousel from './TrendingCarousel'

const Home = () => {
  return (
    <Box>
      <Banner />
      <Container maxW={'container.xl'} mt={12} mb={20}>
        <Box>
          <NewsCarousel />
        </Box>
        <Box mt={20}>
          <TrendingCarousel />
        </Box>
      </Container>
    </Box>
  )
}

export default Home