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
  interface Props {
    ap1: string,
    ap2: string,
    ap3: string,
  }


  const ProductoCategorie = (props: Props) => {

    
    return (
        
<Card maxW='288px' 
border='2px' borderColor='var(--highlight)'
boxShadow='lg' rounded='md' 
px='0'>
  <CardBody p='3'>
  <Flex  align="center" justify="center">
    <Image
      maxW='124px'
      src={props.ap1}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      boxShadow='lg'
    />
    </Flex>
    
    </CardBody>
    

    <Divider border='1px' borderColor='var(--highlight)'
    my='1' />

    
    <CardBody py='3' px='6'>

    <Stack  spacing='2'>
      <Heading size='md'>{props.ap2}</Heading>
      <Text fontSize='sm'>
      {props.ap3}
      </Text>
      
    </Stack>
  </CardBody>
  
  <CardFooter pb='6' pt='0' px='6'>
    <ButtonGroup spacing='2'>
      <Button variant='solid' bg='var(--primary)' color='var(--font-color)'  maxW='165px'
      boxShadow='lg' rounded='md'
      border='2px' borderColor='var(--primary)' >
        Agregar al carrito
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
        
    );
  };
  
  export default ProductoCategorie;