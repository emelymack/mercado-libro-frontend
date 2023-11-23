import { SimpleGrid, Heading, Box } from "@chakra-ui/react"

export const PurchasesPage = () => {

    return (
        <Box pt={50}>
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