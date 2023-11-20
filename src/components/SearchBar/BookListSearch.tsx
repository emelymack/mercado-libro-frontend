import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  VStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import { Book } from "../../services/BookService";
import { useParams } from "react-router-dom";
import { getAllBooksSearch } from "../../services/SearchServiceBook";
import { useEffect, useState } from "react";
import CustomLoading from "../CustomLoading/CustomLoading";

// interface BookListSearchProps {
//   searchTerm?: string;
// }
const BookListSearch = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchTerm } = useParams<{ searchTerm: string }>();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      if (searchTerm !== "") {
        try {
          const response = await getAllBooksSearch({
            keyword: searchTerm,
            page: 0,
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
        <Heading as="h1" size="lg" p={5}>
          Resultados de búsqueda para: {searchTerm}
        </Heading>
      </Center>
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
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              p={4}
              minH="500px"
            >
              <Image
                src={book.images[0].url}
                alt={book.title}
                objectFit="cover"
                h="200px"
              />
              <VStack spacing={2} mt={3}>
                <Heading fontSize="xl">{book.title}</Heading>
                <Text>Author: {book.authors[0].name}</Text>
                <Text>Publisher: {book.publisher}</Text>
                <Text>ISBN: {book.isbn}</Text>
                <Text>Price: ${book.price}</Text>
                <Text>Stock: {book.stock}</Text>
              </VStack>
            </Box>
          </GridItem>
        ))}
      </Grid>
      {isLoading ? <CustomLoading /> : null}
    </>
  );
};

export default BookListSearch;
