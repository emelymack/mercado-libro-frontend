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
  useBreakpointValue,
  Center,
  Tag,
  TagLabel,
  TagRightIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormHelperText,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Book, getAllBooks } from '../../services/BookService';
import { Category, getAllCategories } from '../../services/CategoryService';
import { MdDelete, MdEditDocument, MdAdd, MdPerson, MdSave } from "react-icons/md"
import ml from '../../assets/ml.png';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z
      .string()
      .min(5, { message: "Debe tener 5 o más caracteres" })
      .max(50).regex(/^[a-zA-Z0-9,.;\s@:]+$/),
    description: z
      .string()
      .min(5, { message: "Debe tener al menos 5 o más caracteres" })
      .max(500, { message: "Limite máximo de caracteres" }).regex(/^[a-zA-Z0-9,.;\s@:]+$/),
    category: z.number()
  });

type RegisterDataForm = z.infer<typeof schema>;

const ProductManager = () => {

  const [error, setError] = useState<string>("");
  const [books, setBooks] = useState<Book[]>();
  const [book, setBook] = useState<Book>();
  const [categories, setCategories] = useState<Category[]>();
  const [authors, setAuthors] = useState<string[]>([]);
  const [existAuthor, setExistAuthor] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>("");


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

  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "md",
    lg: "lg",
    borderColor: "gray.200"
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterDataForm>({
    resolver: zodResolver(schema),
  });


  const onSubmit = (data: RegisterDataForm) => {
    console.info(data);
  };

  //modal add author
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)

  const addAuthor = () => {
    console.log("saving!!!");

    if (initialRef && initialRef.current) {
      var newAuthor = initialRef.current.value;
      setAuthor(newAuthor);
      if (newAuthor.length == 0) {
        return;
      }
      if (!authors.includes(newAuthor)) {
        authors.push(newAuthor);
        setAuthors(authors);
        setExistAuthor(false);
        onClose();
      } else {
        setExistAuthor(true);
      }
    } else {
      setAuthor("");
    }
  };

  const cancelAddAuthor = () => {
    setAuthor("");
    onClose();
  }



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
                                  <Tag key={author.id} variant='outline'>
                                    <TagLabel>{author.name}</TagLabel>
                                    <TagRightIcon as={MdPerson} />
                                  </Tag>
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

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <FormControl id="name" w="100%" isInvalid={!!errors.name}>
              <FormLabel>Nombre del libro</FormLabel>
              <Input
                variant="outline"
                autoComplete="name"
                padding={3}
                fontSize={{ base: "sm", md: "xl" }}
                h={"auto"}
                type="name"
                {...register("name")}
                size="sm"
                borderColor="#d8dee4"
                borderRadius="6px"
              />
              {errors.name && (
                <FormErrorMessage fontSize="lg" color="red">
                  {errors.name.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              id="description"
              paddingTop="20px"
              w="100%"
              isInvalid={!!errors.description}
            >
              <FormLabel>Reseña del libro</FormLabel>

              <Textarea
                fontSize={{ base: "md", md: "xl" }}
                h={"auto"}
                {...register("description")}
                size="sm"
                borderRadius="6px"
              />
              {errors.description && (
                <FormErrorMessage fontSize="lg" color="red">
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired
              id="description"
              paddingTop="20px"
              w="100%">
              <div>
                {authors.map((author, index) => (
                  <Tag key={index} variant='outline'>
                    <TagLabel>{author}</TagLabel>
                    <TagRightIcon as={MdPerson} />
                  </Tag>
                ))}
              </div>
              <Button
                leftIcon={<MdPerson />}
                mt={2}
                onClick={onOpen}
              >
                Agregar Autor
              </Button>
            </FormControl>

            <Center>
              <Button
                leftIcon={<MdSave />}
                marginTop={8}
                fontSize={{ base: "xl", md: "2xl" }}
                w="40%"
                type="submit"
                bg="brand.violetLogo"
                color="brand.blueLogo"
                borderRadius="6px"
                size="lg"
                fontWeight="400"
                _hover={{ bg: "brand.greenLogo", color: "white" }}
              >
                Guardar
              </Button>
            </Center>
          </form>


        </VStack>


      </Container>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Author</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {existAuthor && (
              <Alert status='warning' >
                <AlertIcon />
                El Autor ya se encuentra registrado!!
              </Alert>
            )}
            <FormControl>
              <FormLabel>Nombre completo</FormLabel>
              <Input
                type="text"
                id="author"
                name="author"
                ref={initialRef}
              />
              {author.length == 0 && (
                <FormHelperText color="red">
                  Campo obligatorio
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={1} onClick={addAuthor}>
              Guardar
            </Button>
            <Button onClick={cancelAddAuthor}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProductManager