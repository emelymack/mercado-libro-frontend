import { Box, Text, IconButton, useColorModeValue } from "@chakra-ui/react"
import { ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface OrderData {
    id: string,
    createdAt: string
}

const OrderCard = ({id, createdAt} : OrderData) => {
    const navigate = useNavigate();

    const handleInvoiceSelection  = () => {
        navigate(`/order/detail/${id}`);
      };

      const replaceCharacter = (str : string, target : string, replacement : string) => str.split(target).join(replacement);

    return (
        <Box display='flex' justifyContent={{ base: 'space-between', lg: 'center', xl: 'space-between'}} alignItems='center' bg={useColorModeValue('#D9D9D9CC', 'brand.blueLogo')} p='15px' borderRadius='md' flexWrap='wrap'>        
            <Text as='button' fontWeight='bold' fontSize={{ base: 'lg', lg: 'lg'}} _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }}>
                #Orden: {id.substring(0,4).toUpperCase()}
            </Text>
            <Box display='flex' justifyContent='space-between'>
                <Text pr='3px' fontSize={{ base: 'sm', lg: 'md', 'xl': 'sm', '2xl': 'md'}}>
                    {replaceCharacter(createdAt, '-', '/')}
                </Text>
                <IconButton aria-label='Ver compra' variant="text" boxSize={6} pl='3px' onClick={() => {handleInvoiceSelection()}}

                _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }} icon={<ViewIcon boxSize={6} />} />
            </Box>
        </Box>
    )
};

export default OrderCard;