import { Card, CardBody, CardFooter, Stack, Heading, Divider, Button, Text, Image, Box, CardHeader } from '@chakra-ui/react'
import { Product } from '../../types/product'

const ProductCard = ({img, title, author, price, url}: Product) => {
  return (
    <Card variant={'productCard'} w={'auto'}>
      <CardHeader py={2}>
        <Box display={'flex'} justifyContent={'center'}>
          <Image
            src={img}
            maxH={200}
            w={'auto'}
            alt={title}
            borderRadius='lg'
          />
        </Box>
      </CardHeader>
      <Divider bg={'brand.greenLogo'} style={{height: 2, opacity: .75}}  />
      <CardBody px={6} pb={3}>
        <Stack mt='6' spacing='0'>
          {/* Titulo del libro */}
          <Heading size='md'>{title}</Heading>
          {/* Nombre del autor */}
          <Text noOfLines={2}>
            {author}
          </Text>
          {/* Precio */}
          <Text color='brand.blueLogo' fontSize='2xl' fontWeight={600}>
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter px={6}>
        <Button variant='brandPrimary' w={'100%'} py={3}>
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard