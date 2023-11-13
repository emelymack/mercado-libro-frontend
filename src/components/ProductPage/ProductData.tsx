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

  return (
    <SimpleGrid columns={{base:1, md: 2}} spacing={10} mt={6} gap={{base: 6, lg: 12}}>
      <Box display={'flex'} justifyContent={{base: 'center', lg: 'flex-end'}} pe={5}>
        <Image src={book.image_links[0]} boxSize={'400px'} h={'500px'}/>
      </Box>
      <Box w={{base: '100%', lg: '75%'}} px={{base: 6, lg: 0}}>
        {/* Titulo */}
        <Box w={{lg: '90%'}} mb={2}>
          <Title htmlElement={'h3'}  noOfLines={3} text={book.title} capitalize fw={700} />
        </Box>
        
        {/* Autores */}
        {book.authors.map((elem)=> (
          <Text fontSize={'lg'} fontWeight={600} textDecor={'underline'} display={"inline"}>
            <Link href={googleSearch(`${elem.name}`)} isExternal>{book.authors.indexOf(elem) === book.authors.length - 1 ? elem.name : elem.name + ', '}</Link>
          </Text>
        ))}
        

        {/* Editorial y fecha publicación */}
        <Text>
          <Link href={googleSearch(`${book.publisher}`)} isExternal textTransform={'uppercase'}>{book.publisher}</Link>, {book.published_date && formatDateMonthYYYY(book.published_date)}
        </Text>

        {/* Precio */}
        <Text color={useColorModeValue('brand.blueLogo', '#b9b6ff')} fontWeight={800} fontSize={'4xl'} mt={{base: 2, lg:8}} mb={6}>
          ${book.price}
        </Text>

        {children}
      </Box>
    </SimpleGrid>
  )
}

export default ProductData