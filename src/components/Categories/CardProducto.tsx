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
        
<Card maxW='290px'>
  <CardBody>
  <Flex  align="center" justify="center">
    <Image
      maxW='150px'
      src={props.ap1}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    </Flex>
    <Stack mt='2' spacing='2'>
    <Divider/>
      <Heading size='md'>{props.ap2}</Heading>
      <Text>
      {props.ap3}
      </Text>
      
    </Stack>
  </CardBody>
  
  <CardFooter pt='0'>
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