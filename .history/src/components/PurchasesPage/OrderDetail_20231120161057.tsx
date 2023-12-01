import { Grid, Text, Box, GridItem, Heading, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"

const OrderDetail = () => {

    return(
        <Box w='min-content' m='0 auto' pt={60} pb={40} display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Heading alignSelf='flex-start'>Orden #3424</Heading>
            <Grid w='80vw' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem rowSpan={2} colSpan={1} bg='tomato'>
                    <Text fontSize='2xl'>Detalles</Text>
                    <Text>
                        Fecha: <b>31/03/2023</b> <br/>
                        Estado: <b>Cerrada</b> <br/>
                        Pago: <b>Pagado</b> <br/>
                        Medio <b>de pago: Mercado Pago</b> <br/>
                        Envío: <b>Enviado</b>
                    </Text>
                    <Text>
                        <br/>
                        Dirección de envío: <br/>
                        Rocio Belen Ghillino <br/>
                        José de San Martin 654 14A <br/>
                        Quilmes Quilmes, 1878 <br/>
                        Gran Buenos Aires <br/>
                        Argentina <br/>
                        +541166106727 
                    </Text>
                </GridItem>
                <GridItem colSpan={4} bg='tomato'>
                    <Text fontSize='2xl'>Productos</Text>
                    <Table variant='unstyled'>
                    <Thead>
                        <Tr> <Text>hola</Text>
                        <Text>hola</Text>
                            <Th>Producto</Th>
                            <Th>Precio</Th>
                            <Th>Cantidad</Th>
                            <Th>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>COLOR WOW - PRE ORDER | DREAM COAT SPRAY ANTI FRIZZ 200ml</Td>
                            <Td>$24.900</Td>
                            <Td>1</Td>
                            <Td>$24.900</Td>
                        </Tr>
                    </Tbody>
                    </Table>
                </GridItem>
                <GridItem colSpan={4} bg='tomato'>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default OrderDetail;