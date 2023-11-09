import { useParams } from "react-router-dom";
import ProductCard from "../Card/ProductCard";
import { Center, Heading, Container, SimpleGrid} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Book, getBooksByCategory } from "../../services/BookService";



export const Categories = () => {
   const {categoryName} = useParams();
   const [libroCategoria, setLibroCategoria] = useState<Book[]>([]);

  
   /* useEffect(() => {
      window.scrollTo(0,0);

      if(categoryName) {
      getBooksByCategory(categoryName)
      .then((res) => {
      console.log(res);
      setLibroCategoria(res)
      })
    }
      }, []); */



  // parseo de propiedad Authors
  //const authors = libroCategoria && JSON.parse(libroCategoria.authors.replace(/'/g, '"'))


  useEffect(() => { 
    window.scrollTo(0, 0); 
    console.log(libroCategoria);
    
    if(categoryName) {
      getBooksByCategory(categoryName)
      .then((res) => {
        console.log(res);
        setLibroCategoria(res)
      })
    }
  }, []);



  return (
    <>
    <Container maxW="container.xl" bg="white.600" centerContent mb={20}>
      <Heading
        size="lg"
        fontSize="50px"
        mb={10}
        mt={10}
        color="brand.greenLogo">
        {categoryName}
      </Heading>

      <Center>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={5}>
        {libroCategoria.map((product) => (
            <ProductCard
            img={product.image_links[0]}
            title={product.title}
            author={product.authors[0]}
            price={product.price}
            url={""}
             />
          ))}
        </SimpleGrid>
      </Center>
    </Container>
    </>
  );
         };

export default Categories;
