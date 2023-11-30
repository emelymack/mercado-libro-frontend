import { Heading, Box, Text } from "@chakra-ui/react"

const OrderCard = () => {

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' bg='papayawhip' p='15px' borderRadius='md'>
            <Text fontSize='2xl' as='b'>
                Orden: #6082
            </Text>
            <Box>
                <Text>
                    09/09/2023
                </Text>
            </Box>
        </Box>
    )
};

export default OrderCard;