import { Card, CardBody, Stack, Heading, Divider, Image, Box, CardHeader } from '@chakra-ui/react'
import { Category } from '../../types/category'

const CategoryCard = ({img, title}: Category) => {
  return (
    <Card variant={'categoryCard'} w={'auto'} py={2}>
      <CardHeader>
        <Box display={'flex'} justifyContent={'center'}>
          <Image
            src={img}
            maxH={250}
            w={'auto'}
            alt={title}
            borderRadius='lg'
          />
        </Box>
      </CardHeader>
      <CardBody px={10}>
        <Stack mt='1' spacing='1'>
          <Heading 
            fontSize={22}
            color={'brand.greenLogo'} 
            textTransform={'uppercase'} 
            fontWeight={900}
            textAlign={'center'}
          >{title}</Heading>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default CategoryCard