import {
  Table, TableContainer, Tbody, Thead, Tr,
  Th,
  Td,
  Tfoot,
  Text,
  Alert,
  AlertIcon,
  Stack,
  Button,
  Container,
  Avatar,
  background,
  Grid,
  GridItem,
  Box,
  VStack,
  Heading,
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  Textarea,
  Select,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Book, getAllBooks } from '../../services/BookService';
import { Category, getAllCategories } from '../../services/CategoryService';
import { MdDelete, MdEditDocument, MdAdd } from "react-icons/md"
import ml from '../../assets/ml.png';
import { useForm, Controller } from "react-hook-form";
import AuthorModal from './Author/author';

const ProductManagerC = () => {

  const [error, setError] = useState<string>("");
  const [books, setBooks] = useState<Book[]>();
  const [book, setBook] = useState<Book>();
  const [categories, setCategories] = useState<Category[]>();
  const [authors, setAuthors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
        console.log("Lista de categorias:", books);
      })
      .catch((error) => {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 500
        ) {
          setError("No se encontraron categorias.");
        } else {
          console.error("Error al obtener la lista de categorias:", error);
        }
      });
  }, []);

  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    // Aquí puedes manejar la acción cuando se envía el formulario.
    console.log(data);
  };

  const handleAddAuthor = (newAuthor) => {
    // Agregar el nuevo autor a la lista de autores
    setAuthors([...authors, newAuthor]);
  };

  return (
    <div className="title_admin">
      <Container maxW='6xl'>
        <div className='row mt-3'>

          <Grid templateAreas={`"header header""nav main"`}>
            <GridItem pl='4' area={'header'}>
              <h2>Administración de productos</h2>
              <Button leftIcon={<MdAdd />} colorScheme='gray'>Crear producto</Button>
            </GridItem>
          </Grid>
        </div>
        {books && books.length > 0 ? (

          <div className='row mt-3'>
            <VStack spacing={6}>
              <Heading
                as="h2"
                fontWeight="600"
                fontSize={{ base: "2xl", md: "4xl" }}
                letterSpacing="-0.5px"
                color={"brand.blueLogo"}
              >
                Lista de productos
              </Heading>
              <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                <div className='css-vdxpmq'>
                  <TableContainer>
                    <Table size='sm'>
                      <Thead className='table_ml_header'>
                        <Tr>
                          <Th></Th>
                          <Th>Título</Th>
                          <Th>Autor(es)</Th>
                          <Th>Editor</Th>
                          <Th>Categoria</Th>
                          <Th>Acciones</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {books.map((book) => (
                          <Tr key={book.id}>
                            <Td><Avatar src={ml} /></Td>
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
                                </div>
                              ))}
                            </Td>
                            <Td>
                              <Stack direction='row' spacing={2}>
                                <Button leftIcon={<MdDelete />} colorScheme='purple' variant='outline'>Eliminar</Button>
                                <Button rightIcon={<MdEditDocument />} colorScheme='gray' variant='outline'>Editar</Button>
                              </Stack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>

                      </Tfoot>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </VStack>

          </div>
        ) : (
          <Alert status="error">
            <AlertIcon />
            {error || "No se encontraron libros."}
          </Alert>
        )}

      </Container>
      <Container maxW='6xl'>
        <VStack spacing={6}>
          <Heading
            as="h2"
            fontWeight="600"
            fontSize={{ base: "2xl", md: "4xl" }}
            letterSpacing="-0.5px"
            color={"brand.blueLogo"}
          >
            Registrar producto
          </Heading>


          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.bookName}>
              <FormLabel>Nombre del Libro</FormLabel>
              <Controller
                name="bookName"
                control={control}
                defaultValue=""
                rules={{
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9,.;\s]+$/,
                    message: "Solo se permiten caracteres alfanuméricos, comas, puntos y punto y comas",
                  },
                }}
                render={({ field }) => <Input {...field} />}
              />
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.bookName && errors.bookName.message}
              </Text>
            </FormControl>
            <FormControl isRequired isInvalid={errors.description}>
              <FormLabel>Descripción</FormLabel>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{
                  required: "Este campo es obligatorio",
                  maxLength: { value: 500, message: "Máximo 500 caracteres permitidos" },
                  pattern: {
                    value: /^[a-zA-Z0-9,.;\s@:]+$/,
                    message: "Solo se permiten caracteres alfanuméricos, espacios, comas, puntos, punto y comas, arrobas y dos puntos",
                  },
                }}
                render={({ field }) => <Textarea {...field} />
                }
              />
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.description && errors.description.message}
              </Text>
            </FormControl>
            <FormControl isRequired isInvalid={errors.category}>
              <FormLabel>Categoría</FormLabel>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: "Debes seleccionar una categoría" }}
                render={({ field }) => (
                  <Select {...field}>
                    <option value="" disabled>
                      Seleccione una categoría
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                )}
              />
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.category && errors.category.message}
              </Text>
            </FormControl>

            <FormControl isRequired isInvalid={errors.authors}>
              <FormLabel>Autores</FormLabel>
              <div>
                {authors.map((author, index) => (
                  <div key={index}>{author}</div>
                ))}
              </div>
              <Button
                colorScheme="blue"
                mt={2}
                onClick={() => setIsModalOpen(true)}
              >
                Agregar Autor
              </Button>
            </FormControl>

            <Button type="submit" colorScheme="blue" mt={4}>
              Enviar
            </Button>
          </form>


        </VStack>
        <AuthorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddAuthor={handleAddAuthor}
        />



      </Container>

    </div>
  )
}

export default ProductManagerC