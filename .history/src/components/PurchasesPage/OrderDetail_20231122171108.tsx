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
import TableMobile from "./TableMobile"

const OrderDetail = () => {
  const size = useWindowSize();

    return(
        <Flex w='min-content' m='0 auto' pt={{base: '13vh', lg: '20vh'}} pb={{base: '8vh', '2xl': '2vh'}} flexDir={"column"} alignItems={"center"}>
            <Box alignSelf='flex-start' mb='10px'>
                <BreadcrumbNav order='Orden #3424' size={{ base: 'sm', lg: 'sm'}}/>
            </Box>
            <Heading alignSelf='flex-start' fontSize={{ base: 'xl', lg: '2xl', '2xl': '3xl'}}>Orden #3424</Heading>
            <Grid w={{ base: '85vw', '2xl': '65vw'}} templateRows='repeat(2, 1fr)' templateColumns={{ base: 'repeat(7, 1fr)', lg: 'repeat(7, 1fr)'}} gap={4} mt='10px'>
                <GridItem colSpan={{ base: 2, lg: 2}} colStart={{ base: 2, lg: 1}} rowStart={1} h='min-content' bg='tomato'>
                    <Text fontSize={{ lg: 'lg', '2xl': 'lg'}} pb='5px' borderBottom='1px solid #e6e6e6'>Detalles</Text>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={CalendarIcon} mr='8px' alt="Calendar icon"/>
                      <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Fecha: <b>31/03/2023</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={InfoIcon} mr='8px' alt="Info icon"/>
                      <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Estado: <b>Cerrada</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={CardIcon} mr='8px' alt="Card icon"/>
                      <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Pago: <b>Pagado</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={DollarIcon} mr='8px' alt="Dollar icon"/>
                      <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Medio de pago: <b>Mercado Pago</b></Text>
                    </Box>
                    <Box display='flex' alignItems='center' m='5px 0'>
                      <Image boxSize={4} src={TruckIcon} mr='8px' alt="Truck icon"/>
                      <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Envío: <b>Enviado</b></Text>
                    </Box>
                    </GridItem>
                    <GridItem colSpan={2} colStart={{ base: 4, lg: 1}} rowStart={{ base: 1, lg: 2}} h='min-content' bg='tomato'>
                    <Box display='flex' alignItems='center'>
                        <Image boxSize={4} src={LocationIcon} mr='8px' alt="Location icon"/>
                        <Text fontWeight='semibold' fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Dirección de envío:</Text>
                    </Box>
                      {size.width && size.width < 980 && (
                        <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>
                          Rocio Belen Ghillino
                          José de San Martin 654 14A, Quilmes Quilmes 1878
                          Gran Buenos Aires, Argentina 
                          +541166106727 
                          `
                        </Text>
                      )} 

                      {size.width && size.width > 980 && (
                        <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>
                          Rocio Belen Ghillino
                          José de San Martin 654 14A, Quilmes Quilmes 1878
                          Gran Buenos Aires, Argentina 
                          +541166106727 
                        `
                      </Text>
                      )}
                    </GridItem>
            
                <GridItem colSpan={5} colStart={{ base: 2, lg: 3}} mb='10px' mt='10px'>
                {size.width && size.width < 768 && (
                  <TableMobile />
                )}
                {size.width && size.width > 768 && (
                  <TableDesktop />
                )}
                </GridItem>
                <GridItem colSpan={5} colStart={{ base: 2, lg: 3}} h='min-content' display='flex' flexDir='column'>
                    <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}}><b>Costo de envío (Correo Argentino - Envio a domicilio):</b> Gratis</Text>
                    <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}}><b>Subtotal:</b> $24.900</Text>
                    <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}} fontWeight='semibold' alignSelf='center'>Total: $24.900</Text>
                </GridItem>
            </Grid>
        </Flex>
    )
}

export default OrderDetail;