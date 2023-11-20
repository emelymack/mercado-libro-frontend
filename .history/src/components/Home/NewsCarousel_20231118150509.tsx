import { useEffect, useState } from 'react';
import ProductsCarousel from '../ProductsCarousel'
import { Box } from '@chakra-ui/react'
import { Book } from '../../types/product';
import { getNewBooks } from '../../services/BookService';



const NewsCarousel = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getNewBooks()
    .then((res) => {
      setBooks(res.content);
    });
  }, []);

  return (
    <Box id='novedades'>
      <ProductsCarousel title='Novedades de octubre' products={books} />
    </Box>
  )
}

export default NewsCarousel