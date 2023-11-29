import { Box, Text, IconButton } from "@chakra-ui/react"
import { ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const verOrden = () => {
    navigate(`orders/`)
  }

const OrderCard = () => {
    

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' bg='#D9D9D9CC' p='15px' borderRadius='md'>
            <Text as='button' fontWeight='bold' fontSize='xl' _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }}>
                Orden: #6082
            </Text>
            <Box display='flex' justifyContent='space-between'>
                <Text pr='3px'>
                    09/09/2023
                </Text>
                <IconButton aria-label='Ver compra' variant="text" boxSize={6} pl='3px' onClick={() => {n}}
                _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }} icon={<ViewIcon boxSize={6} />} />
            </Box>
        </Box>
    )
};

export default OrderCard;