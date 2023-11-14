import { Accordion, AccordionIcon, AccordionItem, AccordionPanel, AccordionHeader, Box, Heading, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Tr, AccordionButton, useColorModeValue } from "@chakra-ui/react"
import { formatDateDDMMYYYY } from "../../utils/functions"
import { Author } from "../../services/BookService"

interface Props {
  description: string, 
  publisher: string,
  language: string, 
  page_count: number,
  published_date: string, 
  authors: Author[]
}
const Details = (props: Props) => {

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem py={2} >
        <h2>
          <AccordionButton px={0}>
            <Box as="span" flex='1' textAlign='left'>
              <Text color={useColorModeValue('brand.greenLogo', '#b9b6ff')} fontWeight={700} fontSize={"lg"}>Descripción</Text>
            </Box>
            <AccordionIcon color={'brand.greenLogo'} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          {props.description}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem py={2}>
        <h2>
          <AccordionButton px={0}>
            <Box as="span" flex='1' textAlign='left'>
              <Text color={useColorModeValue('brand.greenLogo', '#b9b6ff')} fontWeight={700} fontSize={"lg"}>Detalles del producto</Text>
            </Box>
            <AccordionIcon color={'brand.greenLogo'} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          <TableContainer >
            <Table size='sm'>
              <Tbody>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7' fontWeight={700}>Editorial</Td>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7' textTransform={"uppercase"}>{props.publisher}</Td>
                </Tr>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7' fontWeight={700}>Páginas</Td>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7' textTransform={"uppercase"}>{props.page_count}</Td>
                </Tr>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7' fontWeight={700}>Idioma</Td>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7' textTransform={"uppercase"}>{props.language}</Td>
                </Tr>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7' fontWeight={700}>Fecha de publicación</Td>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7'>{formatDateDDMMYYYY(props.published_date)}</Td>
                </Tr>
                <Tr>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7' fontWeight={700}>Autor</Td>
                  <Td borderColor={'rgba(0,0,0,.15)'} lineHeight='7'>{props.authors.map((elem) => (
                    props.authors.indexOf(elem) === props.authors.length - 1 ? elem.name : elem.name + ', '
                  ))}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default Details