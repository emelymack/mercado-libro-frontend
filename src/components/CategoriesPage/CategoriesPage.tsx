import { useParams } from "react-router-dom";
import ProductCard from "../Card/ProductCard";

import { Center, Heading, Container, SimpleGrid, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../context/hooks";
import { getBooksByCategory } from "../../services/BookService";
import { Book } from "../../types/product";
import CustomLoading from "../CustomLoading/CustomLoading";
import { ChevronRightIcon } from "@chakra-ui/icons";
import BreadcrumbNav from "./BreadcrumbNav";

const Productos = [
  {
    id: 1,
    titulo: "Libro1",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 2,
    titulo: "Libro2",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 3,
    titulo: "Libro3",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 4,
    titulo: "Libro4",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 5,
    titulo: "Libro5",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 6,
    titulo: "Libro6",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 7,
    titulo: "Libro7",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 8,
    titulo: "Libro8",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 9,
    titulo: "Libro9",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 10,
    titulo: "Libro10",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 11,
    titulo: "Libro11",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
  {
    id: 12,
    titulo: "Libro12",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU",
    autor: "Lorem ipsum dolor.",
    url: "",
    precio: 10000,
  },
];

export const Categories = () => {
  // const params = useParams();
  const {categoryName} = useParams();
  const [ librosCategoria, setLibrosCategoria ] = useState<Book[]>([]);
  const [ isLoading, setIsLoading ] = useState(false)
  const isScrolling = useAppSelector((state) => state.scroll.isScrolling)

  useEffect(() => { 
    window.scrollTo(0, 0);
    setIsLoading(true)
    if(categoryName) {
      getBooksByCategory(categoryName)
      .then((res) => {
        // console.log(res);
        setLibrosCategoria(res.content)
        setIsLoading(false)
      })
    }
  
  }, [categoryName]);

  if(isLoading) return (
    <Box h={'calc(100vh - 130px)'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <CustomLoading />
    </Box>
  )

  return (
    <Container maxW="container.xl" bg="white.600" mb={20} className={`page ${isScrolling ? 'scroll' : ''}`}>
      <BreadcrumbNav category={categoryName} />
      <Heading
        size="3xl"
        fontWeight={900}
        mt={10}
        mb={12}
        color="brand.greenLogo"
        textTransform={'uppercase'}
        textAlign={"center"}
      >
        {categoryName}
      </Heading>

      <Center>
        { librosCategoria.length > 0 ?
          <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={5}>
            {librosCategoria.map((producto) => (
              <ProductCard
                id={producto.id}
                image_links={producto.image_links}
                title={producto.title}
                authors={producto.authors}
                price={producto.price}
                stock={1}
              />
            ))}
          </SimpleGrid>
          : 
          <Box my={12} py={4}>
            <Heading color={'red.400'} size={'md'} textAlign={'center'}>¡No se encontraron libros para esta categoría!</Heading>
          </Box>
        }
      </Center>
    </Container>
  );
};

export default Categories;
