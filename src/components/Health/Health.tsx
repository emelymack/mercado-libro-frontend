import {
  Alert,
  AlertIcon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Book, getAllBooks } from "../../services/BookService";

const Health = () => {
  const [error, setError] = useState<string>("");
  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    getAllBooks()
      .then((books) => {
        books.forEach((book) => {
          try {
            book.authors = JSON.parse(book.authors.replace(/'/g, '"'));
          } catch (error) {
            console.error("Error al parsear autores:", error);
          }
        });

        setBooks(books);
        console.log("Lista de libros:", books);
      })
      .catch((error) => {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 500
        ) {
          setError("No se encontraron libros.");
        } else {
          console.error("Error al obtener la lista de libros:", error);
        }
      });
  }, []);

  return (
    <>
      {books && books.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Autor(es)</Th>
              <Th>Editor</Th>
              <Th>Categoria</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book) => (
              <Tr key={book.id}>
                <Td>{book.title}</Td>
                <Td>
                  {Array.isArray(book.authors) &&
                    book.authors.map((author) => (
                      <Text key={author.id}>{author.name}</Text>
                    ))}
                </Td>
                <Td>{book.publisher}</Td>
                <Td>
                  {book.categories.map((category) => (
                    <div key={category.id}>
                      <Text> {category.name}</Text>
                      <br />
                      <Text key={category.id}>
                        Descripción: {category.description}
                      </Text>
                    </div>
                  ))}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Alert status="error">
          <AlertIcon />
          {error || "No se encontraron libros."}
        </Alert>
      )}
      {/* 
      {testList &&
        testList.map((item) => (
          <Text key={item.id}>
            ID: {item.id}, Nombre: {item.name}
          </Text>
        ))}
      {pingResult !== null && <Text>Ping: {pingResult}</Text>} */}
    </>
  );
};

export default Health;
