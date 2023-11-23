import { Grid, GridItem,Heading, Box, Text } from "@chakra-ui/react"

export const PurchasesPage = () => {

    return (
        <Box pt={60} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Heading>
                Mi cuenta
            </Heading>
            <Grid h='200px' w="75vw" templateRows='repeat(2, 2fr)' templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem rowSpan={2} colSpan={1} bg='tomato'>
                    <Heading>
                    Datos
                    </Heading>
                    <Grid templateRows='repeat(2, 1fr)' gap={4} p='10px'>
                        <GridItem bg='papayawhip'>
                            <Heading as='h4' size='md'>
                                Datos Personales
                            </Heading>
                        </GridItem>
                        <GridItem bg='papayawhip'>
                            <Heading as='h4' size='md'>
                                Mis direcciones
                            </Heading>
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem colSpan={4} bg='tomato'>
                    <Heading>
                    Mis compras
                    </Heading>
                </GridItem>
            </Grid>
        </Box>
    )
};

export default PurchasesPage;