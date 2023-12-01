import { useParams } from "react-router-dom";
import ProductCard from "../Card/ProductCard";
import {
  Center,
  Heading,
  SimpleGrid,
  Box,
  Flex,
  Select,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../context/hooks";
import { getByCategoryPage } from "../../services/BookService";
import { Book } from "../../types/product";
import CustomLoading from "../CustomLoading/CustomLoading";
import BreadcrumbNav from "./BreadcrumbNav";
import PageContainer from "../Layout/PageContainer";
import Pagination from "../../utils/Pagination";
import { SearchIcon } from "@chakra-ui/icons";

export const Categories = () => {
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(10); // Cambia esto a la cantidad de elementos que deseas por página
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { categoryName } = useParams();
  const [librosCategoria, setLibrosCategoria] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling);

  const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const [orderBy, setOrderBy] = useState<string>("");
  const [titleSearch, setTitleSearch] = useState<string>("");
  const [authorSearch, setAuthorSearch] = useState<string>("");
  const [priceSearch, setPriceSearch] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [orderDirection, setOrderDirection] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shouldFilter, setShouldFilter] = useState(false);

  const fetchCategory = async () => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    try {
      const response = await getByCategoryPage({
        page,
        size,
        nameCategory: categoryName,
      });
      if (response.statusCode === 200 && response.data) {
        setTotalPages(response.totalPages ?? 0);
        setTotalElements(response.totalElements ?? 0);
        setLibrosCategoria(response.data);
        setFilteredBooks(response.data);
      } else {
        console.error("Failed to fetch users:", response.errorMessage);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, [page, size, categoryName]);

  const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value as string;
    setSelectedOption(newValue);
    setOrderBy(newValue);
  };

  useEffect(() => {
    if (!shouldFilter) return;

    const sortedBooks = [...librosCategoria].sort((a: Book, b: Book) => {
      let comparison = 0;
      switch (selectedOption) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "authors":
          comparison = a.authors[0].name.localeCompare(b.authors[0].name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "published_date":
          comparison =
            new Date(b.published_date).getTime() -
            new Date(a.published_date).getTime();
          break;
        default:
          break;
      }
      if (orderDirection === "DESC") {
        comparison *= -1;
      }

      return comparison;
    });

    setFilteredBooks(sortedBooks);
    setShouldFilter(false);
  }, [shouldFilter, selectedOption, orderDirection, librosCategoria]);

  const handleFilter = () => {
    setShouldFilter(true);
  };

  const clearFilters = () => {
    setOrderBy("");
    setTitleSearch("");
    setAuthorSearch("");
    setPriceSearch("");
    setOrderDirection("");
    setSelectedOption(null);
    setFilteredBooks(librosCategoria);
  };

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
    <PageContainer bg="white.600" mb={20}>
      {categoryName && <BreadcrumbNav category={categoryName} />}
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

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={[4, 6, 8]}
        overflowX="auto"
      >
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          align="center"
          pt={{ base: 10, md: 40 }}
          px={{ base: 4, md: 20 }}
          mb={4}
          w="full"
        >
          <Select
            onChange={handleOptionChange}
            fontSize={fontSize}
            placeholder="Ordenar por"
            value={orderBy}
            focusBorderColor="teal.500"
            mr={2}
            mb={{ base: 2, md: 0 }}
            w="full"
          >
            <option value="title">Nombre</option>
            <option value="authors">Author</option>
            <option value="price">Price</option>
            <option value="published_date">Recientes</option>
          </Select>

          <Select
            fontSize={fontSize}
            placeholder="Dirección de orden"
            value={orderDirection}
            focusBorderColor="teal.500"
            onChange={(e) => setOrderDirection(e.target.value)}
            mr={2}
            mb={{ base: 2, md: 0 }}
            w="full"
          >
            <option value="ASC">Ascendente</option>
            <option value="DESC">Descendente</option>
          </Select>

          <Button
            fontSize={fontSize}
            ml={2}
            w={"2xl"}
            leftIcon={<SearchIcon />}
            colorScheme="teal"
            _hover={{
              bg: "brand.violetLogo75",
            }}
            onClick={handleFilter}
          >
            Filtrar
          </Button>
          <Button
            onClick={clearFilters}
            colorScheme="gray"
            fontSize={fontSize}
            ml={2}
            w={"2xl"}
            _hover={{
              bg: "gray.600",
              color: "white",
            }}
          >
            Limpiar
          </Button>
        </Flex>

        <Center mb="5vh">
          {filteredBooks.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={5}>
              {filteredBooks.map((producto) => (
                <ProductCard {...producto} />
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
      </Box>
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
