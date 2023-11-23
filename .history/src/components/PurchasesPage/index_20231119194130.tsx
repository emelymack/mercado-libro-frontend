import { Grid, GridItem,Heading, Box, Text } from "@chakra-ui/react"

export const PurchasesPage = () => {

    return (
        <Box pt={60} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Heading>
                Mi cuenta
            </Heading>
            <Grid h='200px' w="75vw" templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem rowSpan={4} colSpan={2} bg='tomato'>
                    <Heading>
                    Datos
                    </Heading>
                    <Grid templateRows='repeat(2, 1fr)' gap={4} p='30px'>
                        <GridItem bg='papayawhip'>
                            <Heading as='h4' size='md'>
                                Datos Personales
                            </Heading>
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
                        <GridItem bg='papayawhip'>
                            <Heading as='h4' size='md'>
                                Mis direcciones
                            </Heading>
                            <Text>
                                Mitre 1255
                                Quilmes, 1878
                                Tucumán
                                Argentina
                            </Text>
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem colSpan={3} bg='tomato'>
                    <Heading>
                    Mis compras
                    </Heading>
                </GridItem>
            </Grid>
        </Box>
    )
};

export default PurchasesPage;