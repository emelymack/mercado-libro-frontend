import { useEffect, useState } from 'react';
import ProductsCarousel from '../ProductsCarousel'
import { Box } from '@chakra-ui/react'
import { Book } from '../../types/product';
import { getNewBooksHome } from '../../services/BookService';

const NewsCarousel = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getNewBooksHome()
    .then((res) => {
      setBooks(res.content);
    });
  }, []);

  return (
    <Box id='novedades'>
      <ProductsCarousel title='Novedades de diciembre' products={books} />
    </Box>
  )
}

export default NewsCarousel