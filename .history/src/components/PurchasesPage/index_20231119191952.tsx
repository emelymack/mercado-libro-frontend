import { Grid, GridItem,Heading, Box, SimpleGrid } from "@chakra-ui/react"

export const PurchasesPage = () => {

    return (
        <SimpleGrid pt={60} columns={1} row={2}>
            <Heading>
                Mi cuenta
            </Heading>
            <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem rowSpan={2} colSpan={1} bg='tomato'>
                    <Heading>
                    Datos
                    </Heading>
                </GridItem>
                <GridItem colSpan={4} bg='tomato'>
                    <Heading>
                    Mis compras
                    </Heading>
                </GridItem>
            </Grid>
        </SimpleGrid>
    )
};

export default PurchasesPage;