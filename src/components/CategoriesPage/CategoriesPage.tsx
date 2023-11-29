import { useParams } from "react-router-dom";
import ProductCard from "../Card/ProductCard";
import { Center, Heading, SimpleGrid, Box, Container, Flex, Input, Select, Button, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, filter, useColorMode, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../context/hooks";
import { getBooksByCategory } from "../../services/BookService";
import { Book } from "../../types/product";
import CustomLoading from "../CustomLoading/CustomLoading";
import BreadcrumbNav from "./BreadcrumbNav";
import PageContainer from "../Layout/PageContainer";
import Pagination from "../../utils/Pagination";
import { SearchIcon } from "@chakra-ui/icons";

export const Categories = () => {
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(8);
  const [totalElements, setTotalElements] = useState<number>(0);
  const { categoryName } = useParams();
  const [ librosCategoria, setLibrosCategoria ] = useState<Book[]>([]);
  const [ isLoading, setIsLoading ] = useState(false)
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling);


  const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const [orderBy, setOrderBy] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");
  const [emailSearch, setEmailSearch] = useState<string>("");
  const [orderDirection, setOrderDirection] = useState<string>("");


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



  /* const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await getBooksByCategory(
        categoryName,
        page,
      );
      if (response.statusCode === 200 && response.data) {
        setTotalElements(response.totalElements ?? 0);
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.errorMessage);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };
 */
  /* const handleClear = async () => {
    setNameSearch("");
    setLastNameSearch("");
    setEmailSearch("");
    setStatus("");
    setOrderBy("");
    setOrderDirection("");
    setIsLoading(true);
    try {
      const response = await getAllUsers({
        page,
        size,
      });
      if (response.statusCode === 200 && response.data) {
        setTotalElements(response.totalElements ?? 0);
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.errorMessage);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  }; */


  
  
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

    const { colorMode } = useColorMode();


    

  return (
    <PageContainer bg="white.600" mb={20} pt={10}>
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
          {/* <Input
            fontSize={fontSize}
            placeholder="Buscar por nombre"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            mr={2}
            borderColor="gray.300"
            focusBorderColor="teal.500"
            _placeholder={{
              color: colorMode === "dark" ? "white" : "brand.blueLogo",
            }}
            mb={{ base: 2, md: 0 }}
            w="full"
          /> */}

          {/* <Select
            fontSize={fontSize}
            placeholder="Seleccionar estado"
            value={status}
            focusBorderColor="teal.500"
            onChange={(e) => setStatus(e.target.value)}
            mr={2}
            mb={{ base: 2, md: 0 }}
            w="full"
          >
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
          </Select> */}

          <Select
            fontSize={fontSize}
            placeholder="Ordenar por"
            value={orderBy}
            focusBorderColor="teal.500"
            onChange={(e) => setOrderBy(e.target.value)}
            mr={2}
            mb={{ base: 2, md: 0 }}
            w="full"
          >
  
            <option value="NAME">Nombre</option>
            <option value="LAST_NAME">Author</option>
            <option value="EMAIL">Price</option>
            <option value="STATUS">Recien</option>
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
            //onClick={handleSearch}
          >
            Buscar
          </Button>
          <Button
            //onClick={handleClear}
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
      </Box> 
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