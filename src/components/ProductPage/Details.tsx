import { Box, Heading, Table, TableContainer, Tbody, Td, Text, Tr } from "@chakra-ui/react"

const Details = () => {

  return (
    <Box mt={12} px={{base: 6, lg: 0}}>
      {/* Descripción */}
      <Heading color={'brand.greenLogo'} fontWeight={700} size={"md"}>Descripción</Heading>
      <Text mt={3}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra dolor malesuada magna iaculis vehicula. Fusce laoreet nunc risus, at iaculis purus aliquet non. Proin nisi tellus, sodales quis turpis sit amet, vehicula dictum dui. Donec a tellus est. Aliquam mollis, ipsum at fermentum elementum, mi orci porttitor ligula, ac interdum nunc dui a diam.
      <br></br>br
      Curabitur faucibus diam ac dui lacinia, ut facilisis leo vehicula. Proin tincidunt luctus felis ac tincidunt. Sed rhoncus lacus metus, ac lobortis nisl dictum nec. Etiam elementum augue vel odio laoreet, non condimentum leo sodales. Suspendisse cursus, nulla vel ultrices pulvinar, lacus orci rhoncus ex, sit amet condimentum sapien elit eget dui. 
      </Text>

      <Box mt={12}>
        <Heading color={'brand.greenLogo'} fontWeight={700} size={"md"}>Detalles del producto</Heading>
        <TableContainer mt={5} w={{lg: '75%'}}>
          <Table size='sm'>
            <Tbody>
              <Tr>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Editorial</Td>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' textTransform={"uppercase"}>Random House</Td>
              </Tr>
              <Tr>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Páginas</Td>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' textTransform={"uppercase"}>304</Td>
              </Tr>
              <Tr>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Idioma</Td>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' textTransform={"uppercase"}>ES</Td>
              </Tr>
              <Tr>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Fecha de publicación</Td>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7'>01-09-2023</Td>
              </Tr>
              <Tr>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7' fontWeight={700}>Autor</Td>
                <Td borderColor={'rgba(0,0,0,.35)'} lineHeight='7'>Alejandro Vázquez Ortiz</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Details