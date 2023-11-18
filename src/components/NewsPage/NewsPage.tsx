import { Box, Center, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../Card/ProductCard";
import { Book, getNewBooks } from "../../services/BookService";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../context/hooks";
import BreadcrumbNav from "./BreadcrumbNav";
import CustomLoading from "../CustomLoading/CustomLoading";


export const NewsPage = () => {
   
    const [ librosNew, setLibrosNew ] = useState<Book[]>([]);
    const [ isLoading, setIsLoading ] = useState(false)
    const isScrolling = useAppSelector((state) => state.scroll.isScrolling)
  
    useEffect(() => { 
      window.scrollTo(0, 0);
      setIsLoading(true)
    
     
      getNewBooks()
      .then((res) => {
        console.log(res.content)
        setLibrosNew(res.content)
        setIsLoading(false)
      });
    }, []);
      
    if(isLoading) return (
        <Box h={'calc(100vh - 130px)'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <CustomLoading />
        </Box>
      )
  
    
    return (
      <Container maxW="container.xl" bg="white.600" mb={20} className={`page ${isScrolling ? 'scroll' : ''}`}>
       <BreadcrumbNav novedades={"librosNew"} /> 
        <Heading
          size="3xl"
          fontWeight={900}
          mt={10}
          mb={12}
          color="brand.greenLogo"
          textTransform={'uppercase'}
          textAlign={"center"}
        >
          Novedades
        </Heading>
  
        <Center>
          { librosNew.length > 0 ?
            <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={5}>
              {librosNew.map((producto) => (
                <ProductCard
                  id={producto.id}
                  image_links={producto.image_links}
                  title={producto.title}
                  authors={producto.authors}
                  price={producto.price}
                  stock={producto.stock}
                />
              ))}
            </SimpleGrid>
            : 
            <Box my={12} py={4}>
              <Heading color={'red.400'} size={'md'} textAlign={'center'}>¡No se encontraron libros para esta categoría!</Heading>
            </Box>
          }
        </Center>
      </Container>
    );
  };
  
  export default NewsPage;