import { useEffect, useState } from 'react';
import { Book } from '../../types/product';
import ProductsCarousel from '../ProductsCarousel'
import { getNewBooksByCategory } from '../../services/BookService';

interface Props {
  categoryName: string,
  productId: number
}
const RelatedProducts = ({categoryName, productId}: Props) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getNewBooksByCategory(categoryName)
    .then((res) => {
      const relatedBooks = res.content.filter( item => item.id !== productId)
      setBooks(relatedBooks);
    });
  }, []);

  return (
    <ProductsCarousel title='Productos relacionados' products={books ?? null} />
  )
}

export default RelatedProducts