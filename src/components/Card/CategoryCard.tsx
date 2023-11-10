import { Card, CardBody, Stack, Heading, Image, Box, CardHeader, useColorModeValue } from '@chakra-ui/react'
import { Category } from '../../types/category'
import { useState } from 'react'

const CategoryCard = ({img, title}: Category) => {
  const [ isHovering, setIsHovering ]= useState(false)

  return (
    <Card variant={'categoryCard'} w={'auto'} h={'100%'} py={2} onMouseOver={()=>setIsHovering(true)} onMouseOut={()=>setIsHovering(false)}>
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
            color={!isHovering ? 'brand.greenLogo': useColorModeValue('brand.blueLogo', 'white')} 
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