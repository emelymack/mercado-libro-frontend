import CardProducto from "./CardProducto";

import {
    Center,
    Heading,
    Grid,
    Container,
  } from "@chakra-ui/react";

  
  const Productos = [
    {
      titulo: 'Libro1',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro2',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro3',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro4',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro5',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro6',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro7',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro8',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro9',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro10',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro11',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    },
    {
      titulo: 'Libro12',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU',
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor ...",
      url:''
    }]


  
  const Categories = () => {
    
    return (

<Container maxW='5x1' bg='white.600' centerContent>
<Heading size='lg' fontSize='50px' mb={10} mt={10} color='#006C67'>
 NOMBRE DE CATEGORÍA
</Heading>

<Center>
<Grid templateColumns='repeat(3, 1fr)' gap={10}>
{Productos.map((producto)=> (
   <CardProducto ap1={producto.imagen} ap2={producto.titulo} ap3={producto.descripcion}/>
   ))}
</Grid>
</Center>

</Container>
    );
  };
  
  export default Categories;