import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  VStack,
  Heading,
  Center,
  Button,
  keyframes,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { getAllBooksSearch } from "../../services/SearchServiceBook";
import { useEffect, useState } from "react";
import CustomLoading from "../CustomLoading/CustomLoading";
import { Book } from "../../types/product";
import NotFoundImg from "../../assets/img/403_2.jpg";

// interface BookListSearchProps {
//   searchTerm?: string;
// }
const BookListSearch = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [showButton, setShowButton] = useState<null | string>(null);
  const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      if (searchTerm !== "") {
        try {
          const response = await getAllBooksSearch({
            keyword: searchTerm,
            page: 0,
            size: 100
          });
          setBooks(response.data);
        } catch (error) {
          console.error("Error al buscar libros:", error);
        }
      }
      setIsLoading(false);
    };

    fetchBooks();
  }, [searchTerm]);
  return (
    <>
      <Center pt={40}>
        <Heading as="h1" size="lg" p={5} color="brand.greenLogo">
          Resultados de búsqueda para: "{searchTerm}"
        </Heading>
      </Center>
      <Container maxW={"container.xl"} mb={10}>
        <Grid
          p={6}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={6}
        >
          {books.map((book) => (
            <GridItem key={book.id}>
              <Box
                textAlign={"left"}
                borderWidth="1px"
                borderRadius={10}
                overflow="hidden"
                boxShadow="md"
                p={6}
                w={"auto"}
                minH="500px"
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                onMouseEnter={() => setShowButton(book.id.toString())}
                onMouseLeave={() => setShowButton(null)}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "brand.violetLogo",
                    "brand.violetLogo50"
                  ),
                }}
              >
                <Image
                  src={book.image_links ? book.image_links[0]?.url : NotFoundImg}
                  alt={book.title}
                  objectFit="cover"
                  h="200px"
                  boxShadow="lg"
                />
                <VStack spacing={2} mt={3}>
                  <Heading fontSize="xl">{book.title}</Heading>
                  <Text>Autor: {book.authors[0].name}</Text>
                  <Text>Editor: {book.publisher}</Text>
                  <Text>ISBN: {book.isbn}</Text>
                  <Text fontSize="lg">Precio: ${book.price}</Text>
                  <Text>Stock: {book.stock}</Text>
                </VStack>
                {showButton === book.id.toString() && (
                  <Box
                    position="absolute"
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="rgba(255, 255, 255, 0.8)"
                    backdropFilter="blur(5px)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign={"left"}
                    borderWidth="2px"
                    borderColor="brand.blueLogo"
                    shadow="xl"
                    p={6}
                    borderRadius={2}
                  >
                    <Link to={`/product/${book.id.toString()}`}>
                      <Button
                        animation={`${slideIn} 0.3s ease-out forwards`}
                        colorScheme="teal"
                        size="lg"
                        borderRadius="md"
                        fontWeight="bold"
                      >
                        Ver detalles
                      </Button>
                    </Link>
                  </Box>
                )}
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
      {isLoading ? <CustomLoading /> : null}
    </>
  );
};

export default BookListSearch;
