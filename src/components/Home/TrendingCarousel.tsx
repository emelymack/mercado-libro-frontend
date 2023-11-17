import { useEffect, useState } from 'react';
import ProductsCarousel from '../ProductsCarousel'
import { Box } from '@chakra-ui/react'
import { Book } from '../../types/product';
import { getNewBooks } from '../../services/BookService';


const TrendingCarousel = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getNewBooks()
    .then((res) => {
      setBooks(res.content);
    });
  }, []);

  return (
    <Box id='masVendidos'>
      <ProductsCarousel title='Libros más vendidos' products={books} />
    </Box>
  )
}

export default TrendingCarousel