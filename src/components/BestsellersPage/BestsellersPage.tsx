import { Box, Center, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../Card/ProductCard";
import { getBestSellersPage, getNewBooks } from "../../services/BookService";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../context/hooks";
import BreadcrumbNav from "./BreadcrumbNav";
import CustomLoading from "../CustomLoading/CustomLoading";
import { Book } from "../../types/product";
//import Pagination from "../../utils/Pagination";
import PageContainer from "../Layout/PageContainer";

export const BestsellersPage = () => {
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(9);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [librosBest, setLibrosBest] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    getBestSellersPage().then((res) => {
      console.log(res.content);
      setLibrosBest(res.content);
      setTotalElements(res.totalElements)
      setIsLoading(false);
    });
  }, [page, size]);

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
    <PageContainer bg="white.600" mb={20} pt={10}>
    <Container
      maxW="container.xl"
      bg="white.600"
      mb={20}
      className={`page ${isScrolling ? "scroll" : ""}`}
    >
      <BreadcrumbNav bestsellers={"Bestsellers"} />
      <Heading
        size="3xl"
        fontWeight={900}
        mt={30}
        mb={12}
        color="brand.greenLogo"
        textTransform={"uppercase"}
        textAlign={"center"}
      >
        Novedades
      </Heading>

      <Center>
        {librosBest.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={5}>
            {librosBest.map((producto) => (
              <ProductCard
                id={producto.id}
                image_links={producto.image_links}
                title={producto.title}
                authors={producto.authors}
                price={producto.price}
                stock={producto.stock}
                publisher={""}
                description={""}
                isbn={""}
                language={""}
                categories={[]}
                published_date={""}
                page_count={0}
                ratings_count={0}
                currency_code={""}
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
   {/*  <Pagination
      pageNumber={page}
      pageSize={size}
      totalElements={totalElements}
      onPageChange={(newPage) => setPage(newPage)}
    /> */}
    </PageContainer>
  );
};

export default BestsellersPage;