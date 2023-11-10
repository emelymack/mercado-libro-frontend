import { Box, Image, SimpleGrid, Text, Link, useColorModeValue } from "@chakra-ui/react"
import { Book } from "../../types/product"
import { ReactNode } from 'react'
import { Title } from "../Title"
import { formatDateMonthYYYY, googleSearch } from "../../utils/functions"

interface Props {
  book: Book,
  children: ReactNode
}
const ProductData = ({book, children}: Props) => {

  // parseo de propiedad Authors
  const authors = book && JSON.parse(book.authors.replace(/'/g, '"'))


  return (
    <SimpleGrid columns={{base:1, md: 2}} spacing={10} mt={6} gap={{base: 6, lg: 12}}>
      <Box display={'flex'} justifyContent={{base: 'center', lg: 'flex-end'}} >
        <Image src={book.image_links[0]} boxSize={'300px'} h={'auto'}/>
      </Box>
      <Box w={{base: '100%', lg: '75%'}} px={{base: 6, lg: 0}}>
        {/* Titulo */}
        <Box w={{lg: '90%'}}>
          <Title htmlElement={'h3'}  noOfLines={3} text={book.title} capitalize fw={700} />
        </Box>
        
        {/* Autor */}
        <Text mt={2} fontSize={'lg'} fontWeight={600} textDecor={'underline'}>
          <Link href={googleSearch(`${authors[0].name}`)} isExternal>{authors[0].name}</Link>
        </Text>

        {/* Editorial y fecha publicación */}
        <Text>
          <Link href={googleSearch(`${book.publisher}`)} isExternal textTransform={'uppercase'}>{book.publisher}</Link>, {book.published_date && formatDateMonthYYYY(book.published_date)}
        </Text>

        {/* Precio */}
        <Text color={useColorModeValue('brand.blueLogo', '#b9b6ff')} fontWeight={800} fontSize={'4xl'} mt={{base: 2, lg:8}}>
          ${book.price}
        </Text>

        {children}
      </Box>
    </SimpleGrid>
  )
}

export default ProductData