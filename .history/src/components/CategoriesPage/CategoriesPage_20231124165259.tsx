import { useParams } from "react-router-dom";
import ProductCard from "../Card/ProductCard";

import { Center, Heading, SimpleGrid, Box, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../context/hooks";
import { getBooksByCategory } from "../../services/BookService";
import { Book } from "../../types/product";
import CustomLoading from "../CustomLoading/CustomLoading";
import BreadcrumbNav from "./BreadcrumbNav";
import PageContainer from "../Layout/PageContainer";
import Pagination from "../../utils/Pagination";

export const Categories = () => {
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(8);
  const [totalElements, setTotalElements] = useState<number>(0);
  const { categoryName } = useParams();
  const [ librosCategoria, setLibrosCategoria ] = useState<Book[]>([]);
  const [ isLoading, setIsLoading ] = useState(false)
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    if (categoryName) {
      getBooksByCategory(categoryName, page).then((res) => {
        setLibrosCategoria(res.content);
        setTotalElements(res.totalElements)
        setIsLoading(false);
      });
    }
  }, [categoryName, page, size]);

  if (isLoading)
    return (
      <Box
        h={"calc(100vh - 130px)"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CustomLoading />
      </Box>
    );

  return (
    <PageContainer bg="white.600" mb={20} pt={{ base: 60, lg: 10}}>
      <Container
      maxW="container.xl"
      bg="white.600"
      mb={20}
      className={`page ${isScrolling ? "scroll" : ""}`}
    >
      {categoryName && <BreadcrumbNav category={categoryName}/>}
      <Heading
        size="3xl"
        fontWeight={900}
        mt={10}
        mb={12}
        color="brand.greenLogo"
        textTransform={"uppercase"}
        textAlign={"center"}
      >
        {categoryName}
      </Heading>

      <Center mb='5vh'>
        {librosCategoria.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={5}>
            {librosCategoria.map((producto) => (
              <ProductCard
                {...producto}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Box my={12} py={4}>
            <Heading color={"red.400"} size={"md"} textAlign={"center"}>
              ¡No se encontraron libros para esta categoría!
            </Heading>
          </Box>
        )}
      </Center>
      </Container>
      <Pagination
          pageNumber={page}
          pageSize={size}
          totalElements={totalElements}
          onPageChange={(newPage) => setPage(newPage)}
        />
    </PageContainer>
  );
};

export default Categories;