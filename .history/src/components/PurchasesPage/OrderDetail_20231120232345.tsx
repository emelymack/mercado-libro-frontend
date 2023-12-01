import { Grid, Text, Box, GridItem, Heading, Table, Thead, Tr, Th, Tbody, Td, Image, Divider } from "@chakra-ui/react"

const OrderDetail = () => {

    return(
        <Box w='min-content' m='0 auto' pt={60} pb={40} display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Heading alignSelf='flex-start'>Orden #3424</Heading>
            <Grid w='65vw' templateRows='repeat(2, 1fr)' templateColumns='repeat(7, 1fr)' gap={4} mt='15px'>
                <GridItem rowSpan={2} colSpan={2} h='min-content'>
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
                <GridItem colSpan={5}>
                    <Text fontSize='xl'>Productos</Text>
                    <Table variant='unstyled' mt='30px'>
                    <Thead borderBottom='1px solid #e6e6e6'>
                        <Tr>
                            <Th p='0 0 20px 0' w='450px' fontWeight='semibold' fontSize='lg' textTransform='capitalize'>Producto</Th>
                            <Th p='0 0 20px 0' w='min-content' fontSize='lg' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Precio</Th>
                            <Th p='0 0 20px 0' w='min-content' fontSize='lg' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Cantidad</Th>
                            <Th p='0 0 20px 0' fontSize='lg' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td p='20px 0 0 0' display='flex'>
                                <Image boxSize='120px' src='https://acdn.mitiendanube.com/stores/944/405/products/photo_2023-04-22_06-58-22-21-11e33180d060b8f66d16821838879699-320-0.webp'/>
                                <Text ml='20px' fontWeight='semibold'>COLOR WOW - PRE ORDER | DREAM COAT SPRAY ANTI FRIZZ 200ml</Text>
                            </Td>
                            <Td p='20px 0 0 0' verticalAlign='top' textAlign='center'>$24.900</Td>
                            <Td p='20px 0 0 0' verticalAlign='top' textAlign='center'>1</Td>
                            <Td p='20px 0 0 0'verticalAlign='top' textAlign='center'>$24.900</Td>
                        </Tr>
                        <Tr>
                            <Td p='20px 0 0 0' display='flex'>
                                <Image boxSize='120px' src='https://acdn.mitiendanube.com/stores/944/405/products/photo_2023-04-22_06-58-22-21-11e33180d060b8f66d16821838879699-320-0.webp'/>
                                <Text ml='20px' fontWeight='semibold'>COLOR WOW - PRE ORDER | DREAM COAT SPRAY ANTI FRIZZ 200ml</Text>
                            </Td>
                            <Td p='20px 0 0 0' verticalAlign='top' textAlign='center'>$24.900</Td>
                            <Td p='20px 0 0 0' verticalAlign='top' textAlign='center'>1</Td>
                            <Td p='20px 0 0 0' verticalAlign='top' textAlign='center'>$24.900</Td>
                        </Tr>

                        <Tr>
                            <Td p='20px 0 0 0'>Costo de envío (Correo Argentino - Envio a domicilio):</Td>
                            <Td></Td>
                            <Td></Td>
                            <Td verticalAlign='top' textAlign='center'>Gratis</Td>
                        </Tr>

                        <Tr>
                            <Td p='20px 0 0 0'>Total:</Td>
                            <Td></Td>
                            <Td></Td>
                            <Td verticalAlign='top' textAlign='center'>$24.900</Td>
                        </Tr>
                        
                    </Tbody>
                    </Table>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default OrderDetail;