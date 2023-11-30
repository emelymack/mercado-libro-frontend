import { Grid, Text, Box, GridItem, Heading, Table, Thead, Tr, Th, Tbody, Td, Image } from "@chakra-ui/react"

const OrderDetail = () => {

    return(
        <Box w='min-content' m='0 auto' pt={60} pb={40} display={"flex"} flexDir={"column"} alignItems={"center"} boxSizing='border-box'>
            <Heading alignSelf='flex-start'>Orden #3424</Heading>
            <Grid w='80vw' templateRows='repeat(1, 1fr)' templateColumns='repeat(7, 1fr)' gap={4} mt='15px'>
                <GridItem rowSpan={1} colSpan={2} bg='tomato'>
                    <Text fontSize='xl'>Detalles</Text>
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
                <GridItem colSpan={5} bg='tomato'>
                    <Text fontSize='xl'>Productos</Text>
                    <Table variant='unstyled' mt='30px'>
                    <Thead>
                        <Tr>
                            <Th p='0' fontWeight='semibold' fontSize='lg' textTransform='capitalize'>Producto</Th>
                            <Th p='0' fontSize='lg' fontWeight='semibold' textTransform='capitalize' textAlign='center' isNumeric>Precio</Th>
                            <Th p='0' fontSize='lg' fontWeight='semibold' textTransform='capitalize' textAlign='center' isNumeric>Cantidad</Th>
                            <Th p='0' fontSize='lg' fontWeight='semibold' textTransform='capitalize' textAlign='center' isNumeric>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td p='20px 0 0 0' display='flex' w='65%'>
                                <Image boxSize='120px' src='https://acdn.mitiendanube.com/stores/944/405/products/photo_2023-04-22_06-58-22-21-11e33180d060b8f66d16821838879699-320-0.webp'/>
                                <Text ml='20px' fontWeight='semibold'> COLOR WOW - PRE ORDER | DREAM COAT SPRAY ANTI FRIZZ 200ml</Text>
                            </Td>
                            <Td p='20px 0 0 0' w='15%' verticalAlign='top' >$24.900</Td>
                            <Td p='20px 0 0 0' verticalAlign='top' textAlign='center'>1</Td>
                            <Td p='20px 0 0 0' verticalAlign='top' textAlign='center'>$24.900</Td>
                        </Tr>
                        <Tr>
                            <Td p='20px 0 0 0' display='flex'>
                                <Image boxSize='120px' src='https://acdn.mitiendanube.com/stores/944/405/products/photo_2023-04-22_06-58-22-21-11e33180d060b8f66d16821838879699-320-0.webp'/>
                                <Text ml='20px' fontWeight='semibold'> COLOR WOW - PRE ORDER | DREAM COAT SPRAY ANTI FRIZZ 200ml</Text>
                            </Td>
                            <Td p='20px 100px 0 0' verticalAlign='top' textAlign='center'>$24.900</Td>
                            <Td p='20px 100px 0 0' verticalAlign='top' textAlign='center'>1</Td>
                            <Td p='20px 0 0 0' verticalAlign='top' textAlign='center'>$24.900</Td>
                        </Tr>
                    </Tbody>
                    </Table>
                </GridItem>
                <GridItem colSpan={3} colStart={3} colEnd={8} bg='tomato'>
                    <Box display='flex' justifyContent='space-between'>
                        <Text fontWeight='semibold'>Costo de envío (Correo Argentino - Envio a domicilio):</Text>
                        <Text>Gratis</Text>
                    </Box>
                    <Box display='flex' justifyContent='space-between' mt='20px'>
                        <Text fontSize='2xl' fontWeight='semibold'>Total:</Text>
                        <Text fontSize='2xl' fontWeight='semibold'>$24.900</Text>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default OrderDetail;