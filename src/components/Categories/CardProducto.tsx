
import {
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
    Flex
  } from "@chakra-ui/react";
  
  
  const ProductoCategorie = () => {
    
    return (
        
<Card maxW='sm'>
  <CardBody>
  <Flex  align="center" justify="center">
    <Image
      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfhFBFzppgkYJlztgiZ3luEU6q4x3IAyfjPX9cen1HzwseJtfUOiBsM4nXvKfdFkV5e0&usqp=CAU'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    </Flex>
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
        
    );
  };
  
  export default ProductoCategorie;