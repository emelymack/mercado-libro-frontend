import {Title} from "./styled";

import {
    Center,
    Card,
    Image,
    Button,
    ButtonGroup,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Stack,
    Text,
    SimpleGrid,
    Grid,
    Container
  } from "@chakra-ui/react";

  
  const Categories = () => {
    
    return (

<Container maxW='5x1' bg='white.600' centerContent>
<Heading size='lg' fontSize='50px'>
 Nombre de Categoría
  </Heading>

<Center>

<Grid templateColumns='repeat(3, 1fr)' gap={5}>
        <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='4' spacing='3'>
    <Divider />
      <Heading size='md'>Título</Heading>
      <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore ...
      </Text>
      
    </Stack>
  </CardBody>
  
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Agregar al carrito
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>

<Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='4' spacing='3'>
    <Divider />
      <Heading size='md'>Título</Heading>
      <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore ...
      </Text>
      
    </Stack>
  </CardBody>
  
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Agregar al carrito
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>

<Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='4' spacing='3'>
    <Divider />
      <Heading size='md'>Título</Heading>
      <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore ...
      </Text>
      
    </Stack>
  </CardBody>
  
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Agregar al carrito
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</Grid>
      </Center>

</Container>
    );
  };
  
  export default Categories;