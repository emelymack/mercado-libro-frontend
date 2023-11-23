import { Grid, GridItem,Heading, Box, Text, SimpleGrid } from "@chakra-ui/react"
import OrderCard from "./OrderCard";
import BreadcrumbNav from "./BreadCrumbNav";

export const PurchasesPage = () => {

    return (
        <Box m='0 auto' pt={60} pb={40} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Box alignSelf='flex-start' mb='10px'>
                <BreadcrumbNav size={{ base: 'sm', lg: 'sm'}}/>
            </Box>
            <Heading alignSelf='flex-start' ml='13vw' fontSize={{ base: 'xl', lg: '2xl', '2xl': '3xl'}}>
                Mi cuenta
            </Heading>
            <Grid w="75vw" templateRows='repeat(2, 1fr)' templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)'}} gap={4} pt='20px'>
                <GridItem rowSpan={4} colSpan={2} p='10px' borderRadius='md'>
                    <Text fontSize='2xl' as='b'>
                        Datos
                    </Text>
                    <hr/>
                    <Grid templateRows='repeat(2, 1fr)' gap={4} pt='15px'>
                        <GridItem p='10px' borderRadius='md'>
                        <Box display='flex' justifyContent="space-between">
                            <Text as='b' fontSize='lg'>
                                Datos Personales
                            </Text>
                            <Box as="button" fontWeight='semibold' _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }}>
                                Editar
                            </Box>
                        </Box>
                        <hr/>
                        <Box mt='8px'>
                            <Text fontSize='sm' as='b'>
                                Pedrito Gonzalez
                            </Text>
                            <Text fontSize='sm'>
                                pedrito777@gmail.com
                            </Text>
                            <Text fontSize='sm'>
                                DNI: 44206443
                            </Text>
                            <Text fontSize='sm'>
                                Telefono: 1166106727
                            </Text>
                            </Box>
                        </GridItem>
                        <GridItem p='10px' borderRadius='md'>
                        <Box display='flex' justifyContent="space-between">
                            <Text as='b' fontSize='lg'>
                                Mis direcciones
                            </Text>
                            <Box as="button" fontWeight='semibold' _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }}>
                                Editar
                            </Box>
                        </Box>
                        <hr/>
                            <Text fontSize='sm' mt='8px'>
                                Mitre 1255 <br/>
                                Quilmes, 1878 <br/>
                                Tucumán <br/>
                                Argentina
                            </Text>
                            <Box as="button" fontSize='sm' fontWeight='bold' mt='10px' _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }}>
                                Otras direcciones
                            </Box>
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem colSpan={3} p='10px' borderRadius='md'>
                    <Text fontSize='2xl' as='b'>
                    Mis compras
                    </Text>
                    <hr/>
                    <SimpleGrid columns={{ md: 1, lg: 3, xl: 2}} spacing={5} pt='15px'>
                        <OrderCard></OrderCard>
                        <OrderCard></OrderCard>
                        <OrderCard></OrderCard>
                        <OrderCard></OrderCard>
                    </SimpleGrid>
                </GridItem>
            </Grid>
        </Box>
    )
};

export default PurchasesPage;