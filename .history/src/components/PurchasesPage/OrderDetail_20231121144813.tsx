import { Grid, Text, Box, GridItem, Heading, Table, Thead, Tr, Th, Tbody, Td, Image, Divider, TableContainer } from "@chakra-ui/react"
import CalendarIcon from '../../assets/icons/icon-calendar.svg'
import InfoIcon from '../../assets/icons/icon-info.svg'
import CardIcon from '../../assets/icons/icon-card.svg'
import DollarIcon from '../../assets/icons/icon-dollar.svg'
import TruckIcon from '../../assets/icons/icon-truck.svg'
import LocationIcon from '../../assets/icons/icon-loc.svg'
import BreadcrumbNav from "./BreadCrumbNav"

const OrderDetail = () => {

    return(
        <Box w='min-content' m='0 auto' pt={60} pb={40} display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Box alignSelf='flex-start' mb='10px'>
                <BreadcrumbNav order='Orden #3424'/>
            </Box>
            <Heading alignSelf='flex-start'>Orden #3424</Heading>
            <Grid w='65vw' templateRows='repeat(2, 1fr)' templateColumns='repeat(7, 1fr)' gap={4} mt='15px'>
                <GridItem rowSpan={2} colSpan={2} h='min-content' bg='tomato'>
                    <Text fontSize='xl' pb='5px' borderBottom='1px solid #e6e6e6'>Detalles</Text>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={CalendarIcon} mr='8px' alt="Calendar icon"/>
                      <Text>Fecha: <b>31/03/2023</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={InfoIcon} mr='8px' alt="Info icon"/>
                      <Text>Estado: <b>Cerrada</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={CardIcon} mr='8px' alt="Card icon"/>
                      <Text>Pago: <b>Pagado</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={DollarIcon} mr='8px' alt="Dollar icon"/>
                      <Text>Medio de pago: <b>Mercado Pago</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={TruckIcon} mr='8px' alt="Truck icon"/>
                      <Text>Envío: <b>Enviado</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='30px 0 5px 0'>
                        <Image boxSize={4} src={LocationIcon} mr='8px' alt="Location icon"/>
                        <Text fontWeight='semibold'>Dirección de envío:</Text>
                    </Box>
                    <Text>
                        Rocio Belen Ghillino <br/>
                        José de San Martin 654 14A <br/>
                        Quilmes Quilmes, 1878 <br/>
                        Gran Buenos Aires <br/>
                        Argentina <br/>
                        +541166106727 
                    </Text>
                </GridItem>
                <GridItem colSpan={5} bg='tomato'>
                    <Box pb='20px' borderBottom='1px solid #e6e6e6'>
                    <Table variant='unstyled' fontSize='sm'>
                    <Thead borderBottom='1px solid #e6e6e6'>
                        <Box fontSize='sm'>
                            <Th p='0 0 20px 0' w='450px' fontWeight='semibold' fontSize='lg' textTransform='capitalize'>Producto</Th>
                            <Th p='0 0 20px 0' w='min-content' fontSize='lg' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Precio</Th>
                            <Th p='0 0 20px 0' w='min-content' fontSize='lg' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Cantidad</Th>
                            <Th p='0 0 20px 0' fontSize='lg' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Total</Th>
                        </Box>
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
                    </Tbody>
                    </Table>
                    </Box>
                </GridItem>
                <GridItem colSpan={5} h='min-content' display='flex' flexDir='column'>
                    <Text><b>Costo de envío (Correo Argentino - Envio a domicilio):</b> Gratis</Text>
                    <Text><b>Subtotal:</b> $24.900</Text>
                        <Text fontSize='2xl' fontWeight='semibold' alignSelf='center'>Total: $24.900</Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default OrderDetail;