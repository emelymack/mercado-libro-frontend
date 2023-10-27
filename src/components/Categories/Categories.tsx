import ProductCard from "../Card/ProductCard";

import {
    Center,
    Heading,
    Grid,
    Container,
    SimpleGrid,
  } from "@chakra-ui/react";

  
  const Productos = [
    {
      titulo: 'Libro1',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro2',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro3',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro4',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro5',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro6',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro7',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro8',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro9',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro10',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro11',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    },
    {
      titulo: 'Libro12',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      autor: "Lorem ipsum dolor.",
      url:'',
      precio: 10000
    }]


  
  export const Categories = () => {
    
    return (
      <Container maxW='container.xl' bg='white.600' centerContent mb={20}>
        <Heading size='lg' fontSize='50px' mb={10} mt={10} color='brand.greenLogo'>
        NOMBRE DE CATEGORÍA
        </Heading>

        <Center>
          <SimpleGrid columns={{'base': 1, 'md': 3, 'lg': 4}} gap={5}>
          {Productos.map((producto)=> (
            <ProductCard img={producto.imagen} title={producto.titulo} author={producto.autor} price={producto.precio} url="" />
            ))}
          </SimpleGrid>
        </Center>

      </Container>
    );
  };
  
  export default Categories;