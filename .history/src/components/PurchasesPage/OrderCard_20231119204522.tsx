import { Grid, GridItem,Heading, Box, Text, Divider, SimpleGrid } from "@chakra-ui/react"

const OrderCard = () => {

    return (
        <Box display='flex'>
            <Heading as='h2' size='lg'>
                Orden: #6082
            </Heading>
            <Box>
                <Text>
                    09/09/2023
                </Text>
            </Box>
        </Box>
    )
};

export default OrderCard;