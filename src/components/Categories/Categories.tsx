import { useParams } from "react-router-dom";
import ProductCard from "../Card/ProductCard";
import { Center, Heading, Container, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CategoryDetail } from "../../types/category";
import { Product } from "../../types/product";
/* import {getBooksByCategory, getAllBooks} from "../../services/BookService" */




export const Categories = () => {
   const {nameCategory} = useParams();
  
  const [result, setResult] = useState<Product[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const data = await fetch(`http://localhost:8080/v1/api/book?page=0&category=${nameCategory}`, {
        method: "GET"
      });
      const jsonData = await data.json();
      setResult(jsonData.results);
    };

    getCategory();
  }, []);
 
 

  /* useEffect(() => {
    window.scrollTo(0, 0);
  }, []); */


  return (
    <>
    <Container maxW="container.xl" bg="white.600" centerContent mb={20}>
      <Heading
        size="lg"
        fontSize="50px"
        mb={10}
        mt={10}
        color="brand.greenLogo">
        {nameCategory}
      </Heading>

      <Center>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={5}>
        {result?.map((product) => (
            <ProductCard
              img={product.img}
              title={product.title}
              url={product.url}
              author={product.author}
              price={product.price}
            />
          ))}
        </SimpleGrid>
      </Center>
    </Container>
    </>
  );
         };

export default Categories;
