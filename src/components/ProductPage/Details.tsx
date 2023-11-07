import { Box, Heading, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import { formatDateDDMMYYYY } from "../../utils/functions"

interface Props {
  description: string, 
  publisher: string,
  language: string, 
  page_count: number,
  published_date: string, 
  author: string
}
const Details = (props: Props) => {

  return (
    <Box mt={12} px={{base: 6, lg: 0}}>
      <SimpleGrid columns={{base: 1, lg: 2}} gap={{lg: 10}}>
        {/* Descripción */}
        <Box>
          <Heading color={'brand.greenLogo'} fontWeight={700} size={"md"}>Descripción</Heading>
          <Text mt={3}>
            {props.description}
          </Text>
        </Box>
        <Box mt={{base:10, lg: 0}}>
          <Heading color={'brand.greenLogo'} fontWeight={700} size={"md"}>Detalles del producto</Heading>
          <TableContainer mt={5} >
            <Table size='sm'>
              <Tbody>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Editorial</Td>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' textTransform={"uppercase"}>{props.publisher}</Td>
                </Tr>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Páginas</Td>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' textTransform={"uppercase"}>{props.page_count}</Td>
                </Tr>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Idioma</Td>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' textTransform={"uppercase"}>{props.language}</Td>
                </Tr>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Fecha de publicación</Td>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7'>{formatDateDDMMYYYY(props.published_date)}</Td>
                </Tr>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Autor</Td>
                  <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7'>{props.author}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Details