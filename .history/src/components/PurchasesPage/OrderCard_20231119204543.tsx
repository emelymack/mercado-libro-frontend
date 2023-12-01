import { Heading, Box, Text } from "@chakra-ui/react"

const OrderCard = () => {

    return (
        <Box display='flex' justifyContent='space-between'>
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