import { Grid, Text, Box, GridItem, Heading, Image, Flex } from "@chakra-ui/react"
import CalendarIcon from '../../assets/icons/icon-calendar.svg'
import InfoIcon from '../../assets/icons/icon-info.svg'
import CardIcon from '../../assets/icons/icon-card.svg'
import DollarIcon from '../../assets/icons/icon-dollar.svg'
import TruckIcon from '../../assets/icons/icon-truckk.svg'
import LocationIcon from '../../assets/icons/icon-loc.svg'
import BreadcrumbNav from "./BreadCrumbNav"
import TableDesktop from "./TableDesktop"
import { useWindowSize } from "@uidotdev/usehooks";

const OrderDetail = () => {
  const size = useWindowSize();

    return(
        <Flex w='min-content' m='0 auto' pt={60} pb={40} flexDir={"column"} alignItems={"center"}>
            <Box alignSelf='flex-start' mb='10px'>
                <BreadcrumbNav order='Orden #3424'/>
            </Box>
            <Heading alignSelf='flex-start' fontSize={{ lg: '2xl', '2xl': '4xl'}}>Orden #3424</Heading>
            <Grid w={{ base: '85vw', '2xl': '65vw'}} templateRows='repeat(2, 1fr)' templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(7, 1fr)'}} gap={4} mt='15px'>
                <GridItem rowSpan={2} colSpan={2} h='min-content' >
                    <Text fontSize={{ lg: 'lg', '2xl': 'xl'}} pb='5px' borderBottom='1px solid #e6e6e6'>Detalles</Text>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={CalendarIcon} mr='8px' alt="Calendar icon"/>
                      <Text fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}}>Fecha: <b>31/03/2023</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={InfoIcon} mr='8px' alt="Info icon"/>
                      <Text fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}}>Estado: <b>Cerrada</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={CardIcon} mr='8px' alt="Card icon"/>
                      <Text fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}}>Pago: <b>Pagado</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={DollarIcon} mr='8px' alt="Dollar icon"/>
                      <Text fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}}>Medio de pago: <b>Mercado Pago</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={TruckIcon} mr='8px' alt="Truck icon"/>
                      <Text fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}}>Envío: <b>Enviado</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='30px 0 5px 0'>
                        <Image boxSize={4} src={LocationIcon} mr='8px' alt="Location icon"/>
                        <Text fontWeight='semibold' fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}}>Dirección de envío:</Text>
                    </Box>
                    <Text fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}}>
                        Rocio Belen Ghillino <br/>
                        José de San Martin 654 14A <br/>
                        Quilmes Quilmes, 1878 <br/>
                        Gran Buenos Aires <br/>
                        Argentina <br/>
                        +541166106727 
                    </Text>
                </GridItem>
                <GridItem colSpan={5} pb='20px' borderBottom='1px solid #e6e6e6'>
                  {size.width < 768 ? (
                    <TableDesktop/>
                  ) : ''}
                    <TableDesktop/>
                </GridItem>
                <GridItem colSpan={5} h='min-content' display='flex' flexDir='column'>
                    <Text fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}}><b>Costo de envío (Correo Argentino - Envio a domicilio):</b> Gratis</Text>
                    <Text fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}}><b>Subtotal:</b> $24.900</Text>
                    <Text fontSize={{ md: 'xs', lg: 'sm', xl: 'md', '2xl': 'lg'}} fontWeight='semibold' alignSelf='center'>Total: $24.900</Text>
                </GridItem>
            </Grid>
        </Flex>
    )
}

export default OrderDetail;