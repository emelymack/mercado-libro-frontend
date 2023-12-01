import { SimpleGrid, Heading, Box } from "@chakra-ui/react"

export const PurchasesPage = () => {

    return (
        <Box pt={60} display={"flex"} flexDir={"column"} alignContent={"center"}>
            <Heading>
                Mi cuenta
            </Heading>
            <SimpleGrid>
            <Heading>
                Mis compras
            </Heading>
            </SimpleGrid>
        </Box>
    )
};

export default PurchasesPage;