import { Grid, GridItem,Heading, Box, Text, Divider, SimpleGrid } from "@chakra-ui/react"
import OrderCard from "./OrderCard";

export const PurchasesPage = () => {

    return (
        <Box pt={60} pb={60} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Heading>
                Mi cuenta
            </Heading>
            <Grid w="75vw" templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} pt='20px'>
                <GridItem rowSpan={4} colSpan={2} bg='tomato' p='10px'>
                    <Heading as='h3' size='lg'>
                        Datos
                    </Heading>
                    <Grid templateRows='repeat(2, 1fr)' gap={4} p='30px'>
                        <GridItem bg='papayawhip' p='10px'>
                        <Box display='flex' justifyContent="space-between">
                            <Heading as='h4' size='md'>
                                Datos Personales
                            </Heading>
                            <Box as="button">
                                Editar
                            </Box>
                        </Box>
                            <Divider/>
                            <Heading as='h5' size='sm'>
                                Pedrito Gonzalez
                            </Heading>
                            <Text>
                                pedrito777@gmail.com
                            </Text>
                            <Text>
                                DNI: 44206443
                            </Text>
                            <Text>
                                Telefono: 1166106727
                            </Text>
                        </GridItem>
                        <GridItem bg='papayawhip' p='10px'>
                        <Box display='flex' justifyContent="space-between">
                            <Heading as='h4' size='md'>
                                Mis direcciones
                            </Heading>
                            <Box as="button">
                                Editar
                            </Box>
                        </Box>
                            <Text>
                                Mitre 1255 <br/>
                                Quilmes, 1878 <br/>
                                Tucumán <br/>
                                Argentina
                            </Text>
                            <Box as="button">
                                Otras direcciones
                            </Box>
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem colSpan={3} bg='tomato' p='10px'>
                    <Heading as='h2' size='lg'>
                    Mis compras
                    </Heading>
                    <SimpleGrid columns={2} spacing={5} pt='30px'>
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