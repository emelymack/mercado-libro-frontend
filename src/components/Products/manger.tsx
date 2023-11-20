import {
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
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
  NumberInput,
  NumberInputField,
  AlertTitle,
  AlertDescription,
  Card,
  CardHeader,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Author, Book, getAllBooks, saveBook, updateBook } from "../../services/BookService";
import {
  MdDelete,
  MdEditDocument,
  MdAdd,
  MdPerson,
  MdSave,
} from "react-icons/md";
import ml from "../../assets/ml.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllCategories, Category } from "../../services/CategoryService";
import CustomLoading from "../CustomLoading/CustomLoading";

const schema = z.object({
  title: z
    .string({ required_error: "Campo obligatorio" })
    .min(5, { message: "Debe tener 5 o más caracteres" })
    .max(50)
    .regex(/^[a-zA-Z0-9,.;áéíóúÁÉÍÓÚ\s@:]+$/),
  description: z
    .string({ required_error: "Campo obligatorio" })
    .min(5, { message: "Debe tener al menos 5 o más caracteres" })
    .max(500, { message: "Limite máximo de caracteres" })
    .regex(/^[a-zñÑA-Z0-9áéíóúÁÉÍÓÚ,.;\s@:()"“'”]+$/),
  category: z.string(),
  isbn: z
    .string({ required_error: "Campo obligatorio" })
    .min(5, { message: "Debe tener 5 o más caracteres" })
    .max(50),
  //.regex(/^(?:\d[\ -]?){13}$/),
  language: z
    .string({ required_error: "Campo obligatorio" })
    .min(1, { message: "Campo obligatorio" }),
  pagecount: z.string().refine((value) => /^\d+?$/.test(value), {
    message: "Campo obligatorio",
  }),
  price: z.string().refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
    message: "Campo obligatorio, ingresa un número con hasta dos decimales",
  }),
  published: z
    .string({ required_error: "Campo obligatorio" })
    .min(1, { message: "Debe tener 5 o más caracteres" })
    .max(10)
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "El formato de fecha debe ser yyyy-MM-dd",
    }),
  publisher: z
    .string({ required_error: "Campo obligatorio" })
    .min(5, { message: "Debe tener 5 o más caracteres" })
    .max(50)
    .regex(/^[a-zA-Z0-9,.;\s@:]+$/),
  stock: z.string().refine((value) => /^\d+?$/.test(value), {
    message: "Campo obligatorio",
  }),
  currency: z
    .string({ required_error: "Campo obligatorio" })
    .min(1, { message: "Campo obligatorio" }),
});

type RegisterDataForm = z.infer<typeof schema>;

const initialAuthor: Author = {
  name: '',
  email: '',
};

const ProductManager = () => {
  const [error, setError] = useState<string>("");
  const [books, setBooks] = useState<Book[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [existAuthor, setExistAuthor] = useState<boolean>(false);
  const [author, setAuthor] = useState<Author>(initialAuthor);
  const [errorSave, setErrorSave] = useState<string>("");
  const [successSave, setSuccessSave] = useState<string>("");
  const [book, setBook] = useState<Book>();
  const [edit, setEdit] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("Registrar producto");
  const [showList, setShowList] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getListBooks();
   
  }, []);

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
        console.log("Lista de categorias:", categories);
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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RegisterDataForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterDataForm) => {
    try {
      const book = mapDatoToBook(data);
      console.log(book);
      if (edit) {
        console.log("updating!!!");
        update(book);
      } else {
        console.log("saving!!!");
        save(book);
      }

    } catch (error) {
      console.log(error);

    }

  };

  function save(book: Book) {
    saveBook(book).then((response) => {
      console.log(response);
      setSuccessSave("ok!!");
      startTimer();
      setShowList(true);
      handleReset();
      setErrorSave("");
      getListBooks();
    })
      .catch((error) => {
        console.log(error);

        if (error.statusCode === 400) {
          if (error.data["validation-error"]) {
            const errorListItems = error.data["validation-error"].map((err: any) => {
              return `<li>El campo <strong> ${err.field}</strong> ${err.message} </li>`;
            }).join('');
            setErrorSave(errorListItems.toString());
          }
        } else {
          setErrorSave("No se pudo guardar la información de Libro");
        }
      });
  }

  function update(book: Book) {
    updateBook(book?.id, book).then((response) => {
      console.log(response);
      setSuccessSave("ok!!");
      startTimer();
      setShowList(true);
      handleReset();
      getListBooks();
    })
      .catch((error) => {
        console.log(error);
        if (error.statusCode === 400) {
          if (error.data["validation-error"]) {
            const errorListItems = error.data["validation-error"].map((err: any) => {
              return `<li>El campo <strong> ${err.field}</strong> ${err.message} </li>`;
            }).join('');
            setErrorSave(errorListItems.toString());
          }
        } else {
          setErrorSave("No se pudo guardar la información de Libro");
        }
      });
  }

  function getListBooks() {
    
    try {
      setIsLoading(true);
      getAllBooks()
      .then((books) => {
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
    } catch (error) {
      console.error("Error al obtener la lista de libros:", error);
    } finally{
      setIsLoading(false);
    }
  }

  function mapDatoToBook(data: any) {
    const listCategories = [];
    const category = categories?.find((category) => category.id === Number(data.category));
    if (category) {
      listCategories.push(category);
    }
    var bookID = null;
    if (edit) {
      bookID = book?.id;
    }

    var bookToEdit: Book = {
      id: bookID,
      title: data.title,
      authors: authors,
      publisher: data.publisher,
      description: data.description,
      isbn: data.isbn,
      language: data.language,
      price: Number(data.price),
      stock: Number(data.stock),
      published_date: data.published,
      page_count: Number(data.pagecount),
      ratings_count: 5,
      currency_code: data.currency,
      image_links: ["http://mercadolibro-site-g5.s3-website-us-east-1.amazonaws.com/assets/ml.png"],
      categories: listCategories
    };

    return bookToEdit;
  }

  //modal add author
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef<HTMLInputElement>(null);
  const initialEmail = React.useRef<HTMLInputElement>(null);

  const addAuthor = () => {
    console.log("saving!!!");

    if (initialRef && initialRef.current && initialEmail && initialEmail.current) {
      const name = initialRef.current.value;
      const email = initialEmail.current.value;

      const autor: Author = {
        name: name,
        email: email,
      };


      setAuthor(autor);
      if (autor.name.length === 0 || autor.email.length === 0) {
        return;
      }
      if (!authors.includes(autor)) {
        authors.push(autor);
        setAuthors(authors);
        setExistAuthor(false);
        onClose();
      } else {
        setExistAuthor(true);
      }
    } else {
      setAuthor(initialAuthor);
    }
  };

  const cancelAddAuthor = () => {
    setAuthor(initialAuthor);
    onClose();
  };

  function startTimer(): void {
    console.log("Temporizador iniciado.");

    setTimeout(() => {
      setSuccessSave("");
    }, 10000);
  }

  const handleReset = () => {
    reset({ title: '', description: '', category: '', pagecount: '', isbn: '', language: '', published: '', publisher: '', currency: '', price: '', stock: '' });
    setAuthors([]);
    setShowList(true);
    setEdit(false);
  };

  const editBook = (book: Book) => {
    setErrorSave("");
    setIsLoading(true);
    var categoryID = "";
    if (book.categories) {
      categoryID = book.categories[0]?.id.toString();
    }
    setTitle("Editar producto");
    setEdit(true);
    setBook(book);
    setAuthors(book.authors);
    setValue('title', book.title);
    setValue('description', book.description);
    setValue('category', categoryID);
    setValue('pagecount', book.page_count?.toString());
    setValue('isbn', book.isbn);
    setValue('language', book.language);
    setValue('published', book.published_date);
    setValue('publisher', book.publisher);
    setValue('currency', book.currency_code);
    setValue('price', book.price.toString());
    setValue('stock', book.stock.toString());
    setShowList(false);
    setIsLoading(false);
  }

  const handlerAddNewBook = () => {
    console.log("new book!!");

    setShowList(false);
  }

  return (
    
    <div className="admin_products">
      {isLoading && <CustomLoading />}
      {showList ? (
        <Container maxW="6xl">
          <div className="row mt-3">
            <Grid templateAreas={`"header header""nav main"`}>
              <GridItem pl="4" area={"header"}>
                <h2>Administración de productos</h2>
                <Button leftIcon={<MdAdd />} colorScheme="gray" onClick={() => handlerAddNewBook()}>
                  Crear producto
                </Button>
              </GridItem>
            </Grid>
          </div>


          {books && books.length > 0 ? (
            <div className="row mt-3">
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
                {successSave && <Alert
                  borderRadius="10px"
                  status='success'
                  variant='subtle'
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='center'
                  textAlign='center'
                  height='200px'
                >
                  <AlertIcon boxSize='40px' mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Información del producto almacenada exitosamente!
                  </AlertTitle>
                  <AlertDescription maxWidth='sm'>
                    El producto registrado esta disponible para la venta
                  </AlertDescription>
                </Alert>}


                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                  <div className="css-vdxpmq">
                    <TableContainer>
                      <Table size="sm">
                        <Thead className="table_ml_header">
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
                              <Td>
                                <Avatar src={ml} />
                              </Td>
                              <Td>{book.title}</Td>
                              <Td>
                                {Array.isArray(book.authors) &&
                                  book.authors.map((author, index) => (
                                    <Tag key={index} variant="outline">
                                      <TagLabel>{author.name}</TagLabel>
                                      <TagRightIcon as={MdPerson} />
                                    </Tag>
                                  ))}
                              </Td>
                              <Td>{book.publisher}</Td>
                              <Td>
                                {book.categories.map((category) => (
                                  <Tag size="sm" borderRadius='full' key={category.id} variant="outline">
                                  <TagLabel>{category.name}</TagLabel>
                                </Tag>
                                ))}
                              </Td>
                              <Td>
                                <Stack direction="row" spacing={2}>
                                  <Button
                                    leftIcon={<MdDelete />}
                                    colorScheme="purple"
                                    variant="outline"
                                  >
                                    Eliminar
                                  </Button>
                                  <Button
                                    rightIcon={<MdEditDocument />}
                                    colorScheme="gray"
                                    variant="outline"
                                    onClick={() => editBook(book)}
                                  >
                                    Editar
                                  </Button>
                                </Stack>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                        <Tfoot></Tfoot>
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
      ) : (
        <Container maxW="6xl">
          <VStack spacing={6}>
            <Heading
              as="h2"
              fontWeight="600"
              fontSize={{ base: "2xl", md: "4xl" }}
              letterSpacing="-0.5px"
              color={"brand.blueLogo"}
            >
              {title}
            </Heading>

            {errorSave && <Alert status='error'>
              <AlertIcon />
              <AlertTitle>Información!</AlertTitle>
              <AlertDescription><div dangerouslySetInnerHTML={{ __html: errorSave }} /> </AlertDescription>
            </Alert>
            }



            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <FormControl id="title" w="100%" isInvalid={!!errors.title}>
                <FormLabel>Titulo del libro</FormLabel>
                <Input
                  variant="outline"
                  autoComplete="title"
                  padding={3}
                  fontSize={{ base: "sm", md: "sm" }}
                  h={"auto"}
                  type="title"
                  {...register("title")}
                  size="sm"
                  borderColor="#d8dee4"
                  borderRadius="6px"
                />
                {errors.title && (
                  <FormErrorMessage fontSize="xs" color="red">
                    {errors.title.message}
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
                  fontSize={{ base: "md", md: "sm" }}
                  h={"auto"}
                  {...register("description")}
                  size="sm"
                  borderRadius="6px"
                />
                {errors.description && (
                  <FormErrorMessage fontSize="xs" color="red">
                    {errors.description.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="isbn" w="50%" isInvalid={!!errors.isbn}>
                <FormLabel>ISBN</FormLabel>
                <Input
                  variant="outline"
                  autoComplete="isbn"
                  padding={3}
                  fontSize={{ base: "sm", md: "sm" }}
                  h={"auto"}
                  type="isbn"
                  {...register("isbn")}
                  size="sm"
                  borderColor="#d8dee4"
                  borderRadius="6px"
                  max={13}
                  maxLength={15}
                  placeholder="0-123-45678-9"
                  _placeholder={{ color: "gray.120" }}
                />
                {errors.isbn && (
                  <FormErrorMessage fontSize="xs" color="red">
                    {errors.isbn.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="language" w="50%" isInvalid={!!errors.language}>
                <FormLabel>Lenguaje</FormLabel>
                <Select
                  placeholder="Seleccionar..."
                  {...register("language")}
                  fontSize={{ base: "sm", md: "sm" }}>
                  <option value="ES">Español</option>
                  <option value="ENG">Ingles</option>
                  <option value="FR">Frances</option>
                </Select>
                {errors.language && (
                  <FormErrorMessage fontSize="xs" color="red">
                    {errors.language.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="pagecount" w="50%" isInvalid={!!errors.pagecount}>
                <FormLabel>Número de páginas</FormLabel>
                <Input type="number" {...register('pagecount')} borderColor="#d8dee4"
                  borderRadius="6px" />
                <FormErrorMessage>
                  {errors.pagecount && errors.pagecount.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="price" w="50%" isInvalid={!!errors.price}>
                <FormLabel>Precio de venta</FormLabel>
                <Input type="number" {...register('price')} borderColor="#d8dee4"
                  borderRadius="6px" />
                <FormErrorMessage>
                  {errors.price && errors.price.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="currency" w="50%" isInvalid={!!errors.currency}>
                <FormLabel>Moneda país venta</FormLabel>
                <Select
                  placeholder="Seleccionar..."
                  {...register("currency")}
                  fontSize={{ base: "sm", md: "sm" }}
                >
                  <option value="COP">COP</option>
                  <option value="ARS">ARS</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </Select>

                {errors.currency && (
                  <FormErrorMessage fontSize="xs" color="red">
                    {errors.currency.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="published" w="50%" isInvalid={!!errors.published}>
                <FormLabel>Fecha de publicación</FormLabel>
                <Input
                  variant="outline"
                  autoComplete="published"
                  padding={3}
                  placeholder="yyyy-MM-dd"
                  _placeholder={{ color: "gray.120" }}
                  fontSize={{ base: "sm", md: "sm" }}
                  h={"auto"}
                  type="published"
                  {...register("published")}
                  size="sm"
                  borderColor="#d8dee4"
                  borderRadius="6px"
                />
                {errors.published && (
                  <FormErrorMessage fontSize="xs" color="red">
                    {errors.published.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="publisher" w="50%" isInvalid={!!errors.publisher}>
                <FormLabel>Editorial</FormLabel>
                <Input
                  variant="outline"
                  autoComplete="publisher"
                  padding={3}
                  fontSize={{ base: "sm", md: "sm" }}
                  h={"auto"}
                  type="publisher"
                  {...register("publisher")}
                  size="sm"
                  borderColor="#d8dee4"
                  borderRadius="6px"
                />
                {errors.publisher && (
                  <FormErrorMessage fontSize="xs" color="red">
                    {errors.publisher.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="stock" w="50%" isInvalid={!!errors.stock}>
                <FormLabel>Cantidad Stock</FormLabel>
                <Input type="number" {...register('stock')} borderColor="#d8dee4"
                  borderRadius="6px" />
                <FormErrorMessage>
                  {errors.stock && errors.stock.message}
                </FormErrorMessage>
              </FormControl>


              <FormControl id="category" w="50%" isInvalid={!!errors.category}>
                <FormLabel>Categorias</FormLabel>
                <Select
                  placeholder="Seleccionar..."
                  {...register("category")}
                  fontSize={{ base: "sm", md: "sm" }}
                >
                  <optgroup>
                    {categories && categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </optgroup>
                </Select>

                {errors.category && (
                  <FormErrorMessage fontSize="xs" color="red">
                    {errors.category.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired id="autor" paddingTop="20px" w="100%">
                <div>
                  {authors.map((author, index) => (
                    <Card maxW='250px' key={index}>
                      <CardHeader>
                        <Flex>
                          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name='Escritor' src='https://mercadolibro-site-g5.s3.amazonaws.com/assets/writer.jpg' />
                            <Box>
                              <Heading size='sm'>{author.name}</Heading>
                              <Text>{author.email}</Text>
                            </Box>
                          </Flex>
                        </Flex>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                <Button leftIcon={<MdPerson />} mt={2} onClick={onOpen}>
                  Agregar Autor
                </Button>
              </FormControl>

              <Center>
                <ButtonGroup variant='outline' spacing='6'>
                  <Button
                    leftIcon={<MdSave />}


                    type="submit"
                    bg="#8884FF"
                    color="#ffff"
                    borderRadius="6px"
                    _hover={{ bg: '#ebedf0', color: '#8884FF', borderColor: '#8884FF', border: '5px' }}
                    fontWeight="400"

                  >
                    Guardar
                  </Button>
                  <Button bg='#BFBFBF' borderRadius="6px" fontWeight="400" onClick={handleReset}>Cancelar</Button>
                </ButtonGroup>

              </Center>
            </form>
          </VStack>
        </Container>
      )}



      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Author</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {existAuthor && (
              <Alert status="warning">
                <AlertIcon />
                El Autor ya se encuentra registrado!!
              </Alert>
            )}
            <FormControl>
              <FormLabel>Nombre completo</FormLabel>
              <Input type="text" id="author" name="author" ref={initialRef} />
              {author.name.length == 0 && (
                <FormHelperText color="red">Campo obligatorio</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="text" id="author" name="author" ref={initialEmail} />
              {author.email.length == 0 && (
                <FormHelperText color="red">Campo obligatorio</FormHelperText>
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
  );
};

export default ProductManager;
