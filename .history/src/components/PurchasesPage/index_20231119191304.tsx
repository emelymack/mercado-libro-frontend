import { SimpleGrid, Heading, Box } from "@chakra-ui/react"

export const PurchasesPage = () => {

    return (
        <Box pt={60} display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Heading>
                Mi cuenta
            </Heading>
            <SimpleGrid>
                <Box>
                    <Heading>
                    Datos
                    </Heading>
                </Box>
                <Box>
                    <Heading>
                    Mis compras
                    </Heading>
                </Box>
            </SimpleGrid>
        </Box>
    )
};

export default PurchasesPage;