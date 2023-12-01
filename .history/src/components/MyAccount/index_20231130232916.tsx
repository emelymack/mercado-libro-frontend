import { Grid, GridItem,Heading, Box, Text, SimpleGrid } from "@chakra-ui/react"
import OrderCard from "./OrderCard";
import BreadcrumbNav from "./BreadCrumbNav";
import { useEffect, useState } from "react";
import { getUserAddress, getUserInvoices } from "../../services/UserService";
import { Invoice } from "../../services/InvoiceService";
import { Address } from "../../types/user";
import { useSelector } from 'react-redux';
import { selectUser } from '../../context/slices/userSlice';
import { decodeToken } from "../../utils/authUtils";


export const MyAccount = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [address, setAddress] = useState<Address>();
    const user = useSelector(selectUser);
    const email = decodeToken()?.sub;

    useEffect(() => {
        window.scrollTo(0, 0); 

        const fetchAddress = async () => {
            try {
                const response = await getUserAddress();

                if (response.statusCode === 200 && response.data) {
                  setAddress(response.data);
                } else {
                  console.error("Failed to fetch address:", response.errorMessage);
                }
            } catch (error) {
                console.error("Failed to fetch address:", error);
            }
        }

        const fetchInvoices = async () => {
            try {
                const response = await getUserInvoices(2);

                if (response.statusCode === 200 && response.data) {
                  setInvoices(response.data);
                } else {
                  console.error("Failed to fetch invoices:", response.errorMessage);
                }
            } catch (error) {
                console.error("Failed to fetch invoices:", error);
            }};

            fetchInvoices();
            fetchAddress();
        }, []);

    return (
        <Box m='0 auto' w='min-content' pt={{base: '13vh', lg: '20vh'}} pb={{base: '8vh', '2xl': '8vh'}} display={"flex"} flexDir={"column"} alignItems={"center"} >
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
                            <Box as="button" fontSize={{base: 'md', xl: 'lg'}} fontWeight='semibold' _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }}>
                                Editar
                            </Box>
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
                                Mis direcciones
                            </Text>
                            {address != null ? (
                                <Box as="button" fontWeight='semibold' fontSize={{base: 'md', xl: 'lg'}}  _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }}>
                                Editar
                                </Box>
                            ) : (
                                ""
                            )}
                        </Box>
                        <hr/>
                        {address != null ? (
                            <Text fontSize={{base: '14px', xl: 'sm'}} mt='8px'>
                                {address?.street} {address?.number}<br/>
                                {address?.district} {address?.zipCode}<br/>
                                {address?.state} <br/>
                            Argentina
                            </Text>
                            ) : (
                                <Box bg='#D9D9D9CC' p='15px' borderRadius='md'>        
                                <Text as='button' fontWeight='bold' fontSize={{ base: 'lg', lg: 'lg'}} _hover={{ opacity: '0.6', transition: 'opacity 0.4s ease-in-out' }}>
                                    #Orden: 
                                </Text>
                                </Box>
                            )}
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem colSpan={3} p='10px' borderRadius='md'>
                    <Text fontSize={{base: 'lg', xl: 'xl'}} as='b'>
                    Mis compras
                    </Text>
                    <hr/>
                    <SimpleGrid columns={{ md: 1, lg: 2, xl: 2}} spacing={5} pt='15px'>
                    {invoices.map((invoice) => (
                         <OrderCard id={invoice.id} createdAt={invoice.date_created}/>
                    ))}
                    </SimpleGrid>
                </GridItem>
            </Grid>
        </Box>
    )
};

export default MyAccount;