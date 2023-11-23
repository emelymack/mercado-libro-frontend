import { Grid, GridItem,Heading, Box } from "@chakra-ui/react"

export const PurchasesPage = () => {

    return (
        <Box pt={60} display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Heading>
                Mi cuenta
            </Heading>
            <Grid >
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