import { Grid, GridItem,Heading, Box, Text, Divider, SimpleGrid } from "@chakra-ui/react"
import OrderCard from "./OrderCard";

export const PurchasesPage = () => {

    return (
        <Box pt={60} pb={60} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Heading>
                Mi cuenta
            </Heading>
            <Grid w="75vw" templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} pt='20px'>
                <GridItem rowSpan={4} colSpan={2} p='10px' borderRadius='md'>
                    <Text fontSize='2xl' as='b'>
                        Datos
                    </Text>
                    <hr/>
                    <Grid templateRows='repeat(2, 1fr)' gap={4} pt='15px' >
                        <GridItem bg='papayawhip' p='10px' borderRadius='md'>
                        <Box display='flex' justifyContent="space-between">
                            <Text as='b' fontSize='lg'>
                                Datos Personales
                            </Text>
                            <Box as="button" fontWeight='semibold'>
                                Editar
                            </Box>
                        </Box>
                        <hr/>
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
                        </GridItem>
                        <GridItem bg='papayawhip' p='10px' borderRadius='md'>
                        <Box display='flex' justifyContent="space-between">
                            <Text as='b' fontSize='lg'>
                                Mis direcciones
                            </Text>
                            <Box as="button" fontWeight='semibold'>
                                Editar
                            </Box>
                        </Box>
                        <hr/>
                            <Text fontSize='sm'>
                                Mitre 1255 <br/>
                                Quilmes, 1878 <br/>
                                Tucumán <br/>
                                Argentina
                            </Text>
                            <Box as="button" fontSize='sm' fontWeight='bold'>
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
                    <SimpleGrid columns={2} spacing={5} pt='15px'>
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