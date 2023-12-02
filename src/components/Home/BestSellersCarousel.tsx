import { useEffect, useState } from 'react';
import ProductsCarousel from '../ProductsCarousel'
import { Box } from '@chakra-ui/react'
import { Book } from '../../types/product';
import { getBestSellers } from '../../services/BookService';


const BestSellersCarousel = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getBestSellers()
    .then((res) => {
      setBooks(res);
    });
  }, []);

  return (
    <Box id='masVendidos'>
      <ProductsCarousel title='Libros más vendidos' products={books} />
    </Box>
  )
}

export default BestSellersCarousel