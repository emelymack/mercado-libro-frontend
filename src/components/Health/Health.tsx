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
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getAllBooks } from "../../services/BookService";
import { createUser } from "../../services/RegisterService";
import CustomLoading from "../CustomLoading/CustomLoading";
import { TokenData, decodeToken } from "../../utils/authUtils";

const Health = () => {
  const [error, setError] = useState<string>("");
  // const [users, setUsers] = useState<User[]>();
  const [books, setBooks] = useState<Book[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<TokenData | null>(null);

  // Usar token decodificado
  useEffect(() => {
    const tokenData = decodeToken();
    if (tokenData) {
      console.log(tokenData);
      setUserData(tokenData);
    }
  }, []);

  const handleCreateUser = () => {
    setIsLoading(true);
    setTimeout(() => {}, 3000);
    const newUser = {
      email: "test2@example.com",
      name: "John",
      lastName: "Doe",
      password: "testpassword2",
    };

    createUser(newUser)
      .then((createdUser) => {
        console.log("Usuario creado:", createdUser);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al crear usuario:", error);
        setIsLoading(false);
      });
  };

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
      {isLoading ? <CustomLoading /> : null}
      <button onClick={handleCreateUser}>Crear Usuario</button>
      {!isLoading && books && books.length > 0 ? (
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

      {userData && <Box pt={20}>Token: {JSON.stringify(userData.sub)}</Box>}
    </>
  );
};

export default Health;
