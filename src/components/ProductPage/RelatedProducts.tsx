import { useEffect, useState } from 'react';
import { Book } from '../../types/product';
import ProductsCarousel from '../ProductsCarousel'
import { getNewBooksByCategory } from '../../services/BookService';

// const products = [
//   {
//     id: 6,
//     image_links: [img],
//     title: "El corazón de piedra verde",
//     author: [{name: "Salvador de Madariaga", email:  ""}],
//     price: 12500,
//     url: ""
//   },{
//     id: 7,
//     image_links: [img],
//     title: "El corazón de piedra verde",
//     author: [{name: "Salvador de Madariaga", email:  ""}],
//     price: 12500,
//     url: ""
//   },{
//     id: 8,
//     image_links: [img],
//     title: "El corazón de piedra verde",
//     author: [{name: "Salvador de Madariaga", email:  ""}],
//     price: 12500,
//     url: ""
//   },{
//     id: 9,
//     image_links: [img],
//     title: "El corazón de piedra verde",
//     author: [{name: "Salvador de Madariaga", email:  ""}],
//     price: 12500,
//     url: ""
//   },{
//     id: 10,
//     image_links: [img],
//     title: "El corazón de piedra verde",
//     author: [{name: "Salvador de Madariaga", email:  ""}],
//     price: 12500,
//     url: ""
//   },{
//     id: 11,
//     image_links: [img],
//     title: "El corazón de piedra verde",
//     author: [{name: "Salvador de Madariaga", email:  ""}],
//     price: 12500,
//     url: ""
//   },
// ]

interface Props {
  categoryName: string
}
const RelatedProducts = ({categoryName}: Props) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getNewBooksByCategory(categoryName)
    .then((res) => {
      setBooks(res.content);
    });
  }, []);

  return (
    <ProductsCarousel title='Productos relacionados' products={books} />
  )
}

export default RelatedProducts