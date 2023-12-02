import { Grid, GridItem,Heading, Box, Text, SimpleGrid, Button, Spinner, Link, Flex, Icon } from "@chakra-ui/react"
import { FaShoppingCart } from "react-icons/fa";
import OrderCard from "./OrderCard";
import BreadcrumbNav from "./BreadCrumbNav";
import { useEffect, useState } from "react";
import { getUserAddress, getUserInvoices } from "../../services/UserService";
import { Invoice } from "../../services/InvoiceService";
import { Address } from "../../types/user";
import { useSelector } from 'react-redux';
import { selectUser } from '../../context/slices/userSlice';
import { decodeToken } from "../../utils/authUtils";
import AddAdressModal from "./AddAddress";
import EditAddressModal from "./EditAddressModal";

export const MyAccount = () => {
    const [ isAddressLoading, setIsAddressLoading ] = useState(true);
    const [ isOrdersLoading, setIsOrdersLoading ] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [address, setAddress] = useState<Address>();
    const [addressEdited, setAddressEdited] = useState<boolean>(false)
    const user = useSelector(selectUser);
    const email = decodeToken()?.sub;

    const handleAdd = () => {
        setIsAddModalOpen(true);
      };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0); 

        const fetchInvoices = async () => {
            setIsOrdersLoading(true)
            try {
                const response = await getUserInvoices(user.id);
                console.log(response)

                if (response.statusCode === 200 && response.data) {
                  setInvoices(response.data);
                } else {
                  console.error("Failed to fetch invoices:", response.errorMessage);
                }
            } catch (error) {
                console.error("Failed to fetch invoices:", error);
            } finally {
                setIsOrdersLoading(false)
            }}

            fetchInvoices();
        }, []);

        useEffect(() => {
            const fetchAddress = async () => {
                setIsAddressLoading(true)
                try {
                    const response = await getUserAddress();
    
                    if (response.statusCode === 200 && response.data) {
                      setAddress(response.data);
                    } else {
                      console.error("Failed to fetch address:", response.errorMessage);
                    }
                } catch (error) {
                    console.error("Failed to fetch address:", error);
                } finally {
                    setIsAddressLoading(false)
                }
            }

            fetchAddress();
            setAddressEdited(false);
        }, [addressEdited]);

    return (
        <Box m='0 auto' w='min-content' pt={{base: '20vh', lg: '25vh'}} pb={{base: '12vh', '2xl': '12vh'}} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Box alignSelf='flex-start' mb='10px'>
                <BreadcrumbNav size={{ base: 'sm', lg: 'sm'}}/>
            </Box>
            <Heading alignSelf='flex-start' fontSize={{ base: 'xl', lg: '2xl', 'xl': '3xl'}}>
                Mi cuenta
            </Heading>
            <Grid w="75vw" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)'}} gap={4} pt='20px'>
                <GridItem rowSpan={4} colSpan={2} p='10px' borderRadius='md'>
                    <Text fontSize={{base: 'lg', xl: 'xl'}} as='b'>
                        Datos
                    </Text>
                    <hr/>
                    <Grid templateRows='repeat(2, 1fr)' pt='15px'>
                        <GridItem p='10px' borderRadius='md'>
                        <Box display='flex' justifyContent="space-between">
                            <Text as='b' fontSize={{base: 'md', xl: 'lg'}}>
                                Datos Personales
                            </Text>
                        </Box>
                        <hr/>
                        <Box mt='8px'>
                            <Text fontSize={{base: '14px', xl: 'sm'}} as='b'>
                                {user.name} {user.lastName}
                            </Text>
                            <Text fontSize={{base: '14px', xl: 'sm'}}>
                                {email}
                            </Text>
                            </Box>
                        </GridItem>
                        <GridItem p='10px' borderRadius='md'>



                        <Box display='flex' justifyContent="space-between">
                            <Text as='b' fontSize={{base: 'md', xl: 'lg'}}>
                                Mi direccion
                            </Text>
                            {address != null ? (
                                <Box as="button" fontWeight='semibold' fontSize={{base: 'md', xl: 'lg'}} onClick={() => handleEdit()} _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }}>
                                Editar
                                </Box>
                            ) : (
                                ""
                            )}
                        </Box>
                        <hr/>

                        { isAddressLoading ? (
                            <Box display={'flex'} justifyContent={'center'} mt={10}>
                                <Spinner size={'xl'} thickness='4px' color="brand.violetLogo" /> 
                            </Box>
                        ) : (

                        address != null ? (
                            <Text fontSize={{base: '14px', xl: 'sm'}} mt='8px'>
                                {address?.street} {address?.number} {address?.department}<br/>
                                {address?.district} - {address.city} CP: {address?.zipCode}<br/>
                                {address?.state}, Argentina <br/>
                            </Text>
                            ) : (
                                <Button mt='20px' bg='#D9D9D9CC' borderRadius='md' alignContent='center' onClick={() => handleAdd()}>        
                                    Agregar direccion
                                </Button>
                            )

                        )}
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem colSpan={3} p='10px' borderRadius='md'>
                    <Text fontSize={{base: 'lg', xl: 'xl'}} as='b'>
                    Mis compras
                    </Text>
                    <hr/>
                    { isOrdersLoading ? (
                            <Box display={'flex'} justifyContent={'center'} mt={10}>
                                <Spinner size={'xl'} thickness='4px' color="brand.violetLogo" /> 
                            </Box>
                    ) : (

                    invoices.length > 0 ? (
                        <SimpleGrid columns={{ md: 1, lg: 2, xl: 2}} spacing={5} pt='15px'>
                            {invoices.map((invoice) => (
                                <OrderCard id={invoice.id} createdAt={invoice.date_created}/>
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Flex align="center" justify="center" mt={5} bg='#D9D9D9CC' p={5} borderRadius={'md'}>
                        <Icon as={FaShoppingCart} boxSize={8} mr={4} />
                  
                        <Box>
                          <Text>¡Hacé tu primera compra!</Text>
                          <Link href="/">IR A LA TIENDA</Link>
                        </Box>
                  
                      </Flex>
                    )
                    )}  
                </GridItem>
            </Grid>
            {isEditModalOpen && (
                <EditAddressModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onEdit={() => setAddressEdited(true)}>
                </EditAddressModal>
            )}
            {isAddModalOpen && (
                <AddAdressModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={() => setAddressEdited(true)}>
                </AddAdressModal>
      )}
        </Box>
    )
};

export default MyAccount;