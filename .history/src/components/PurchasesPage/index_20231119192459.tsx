import { Grid, GridItem,Heading, Box } from "@chakra-ui/react"

export const PurchasesPage = () => {

    return (
        <Box pt={60} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Heading>
                Mi cuenta
            </Heading>
            <Grid h='200px' w="65vw" templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem rowSpan={2} colSpan={1} bg='tomato'>
                    <Heading>
                    Datos
                    </Heading>
                    <Grid templateRows='repeat(2, 1fr)' gap={4}>
                        <GridItem bg='papayawhip'>

                        </GridItem>
                        <GridItem bg='papayawhip'>
                            
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