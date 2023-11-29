import { Box, Text } from "@chakra-ui/react"
import { ViewIcon } from "@chakra-ui/icons";

const OrderCard = () => {

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' bg='#D9D9D9CC' p='15px' borderRadius='md'>
            <Text as='b' fontSize='xl'>
                Orden: #6082
            </Text>
            <Box display='flex' justifyContent='space-between'>
                <Text pr='15px'>
                    09/09/2023
                </Text>
                <ViewIcon boxSize={6}/>
            </Box>
        </Box>
    )
};

export default OrderCard;