import { Grid, GridItem,Heading, Box } from "@chakra-ui/react"

export const PurchasesPage = () => {

    return (
        <Box pt={60}>
            <Heading>
                Mi cuenta
            </Heading>
            <Grid gap={6}>
                <GridItem>
                    <Heading>
                    Datos
                    </Heading>
                </GridItem>
                <GridItem>
                    <Heading>
                    Mis compras
                    </Heading>
                </GridItem>
            </Grid>
        </Box>
    )
};

export default PurchasesPage;