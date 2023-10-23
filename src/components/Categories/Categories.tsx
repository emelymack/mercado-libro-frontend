import CardProducto from "./CardProducto";

import {
    Center,
    Heading,
    Grid,
    Container,
  } from "@chakra-ui/react";

  
  const Categories = () => {
    
    return (

<Container maxW='5x1' bg='white.600' centerContent>
<Heading size='lg' fontSize='50px' mb={10} mt={10}>
 Nombre de Categoría
</Heading>

<Center>

<Grid templateColumns='repeat(3, 1fr)' gap={10}>
       
   <CardProducto/>
   <CardProducto/>
   <CardProducto/>

   <CardProducto/>
   <CardProducto/>
   <CardProducto/>

   <CardProducto/>
   <CardProducto/>
   <CardProducto/>

   <CardProducto/>
   <CardProducto/>
   <CardProducto/>

</Grid>
      </Center>

</Container>
    );
  };
  
  export default Categories;