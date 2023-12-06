import { Grid, Text, Box, GridItem, Heading, Image, Flex, Spinner, Button, useColorModeValue, Icon } from "@chakra-ui/react"
import CalendarIcon from '../../assets/icons/icon-calendar.svg'
import InfoIcon from '../../assets/icons/icon-info.svg'
import CardIcon from '../../assets/icons/icon-card.svg'
import DollarIcon from '../../assets/icons/icon-dollar.svg'
import TruckIcon from '../../assets/icons/icon-truckk.svg'
import LocationIcon from '../../assets/icons/icon-loc.svg'
import BreadcrumbNav from "../MyAccount/BreadCrumbNav"
import TableDesktop from "./TableDesktop"
import { useWindowSize } from "@uidotdev/usehooks";
import TableMobile from "./TableMobile";
import { useEffect, useState } from "react";
import { Invoice, getInvoiceById, InvoiceItem } from "../../services/InvoiceService";
import { getBookById } from "../../services/BookService";
import { Book } from "../../types/product";
import { selectId } from "../../context/slices/invoiceSlice";
import { useSelector } from 'react-redux';
import { selectUser } from '../../context/slices/userSlice';
import { useAppSelector } from "../../context/hooks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../CustomLoading/CustomLoading";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export interface Item {
  book: Book,
  invoice: InvoiceItem
}

const Order = () => {
  const [areBooksLoading, setAreBooksLoading] = useState(true);
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const size = useWindowSize();
  const [invoice, setInvoice] = useState<Invoice>();
  const [items, setItems] = useState<Item[]>([]);
  const param = useParams();
  const code = param.invoiceId?.substring(0,4).toUpperCase();
  const paymentMethod = invoice?.payment_method === 'MERCADO_PAGO' ? 'Mercado Pago' : 'Transferencia';
  const paymentState = invoice?.payment_method === 'MERCADO_PAGO' ? 'Pagado' : 'Pendiente';
  const orderState = invoice?.payment_method === 'MERCADO_PAGO' ? 'Confirmada' : 'Abierta';
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  }

  const replaceCharacter = (str : string, target : string, replacement : string) => str.split(target).join(replacement);

  const formatNumberWithDots = (n : number) => {
    const numberString = String(n).replace(/\./g, '');

    const parts = [];
    for (let i = numberString.length; i > 0; i -= 3) {
        parts.unshift(numberString.slice(Math.max(i - 3, 0), i));
    }

    return parts.join('.');
  }

  const checkLoadingState = () => {
    console.log(areBooksLoading, isInfoLoading)
    if (!areBooksLoading && !isInfoLoading) {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    setAreBooksLoading(true);

    const fetchBooks = async () => {
      const items : Item[] = [];
        try {
          await Promise.all(       
            (invoice?.invoice_item || []).map(async (book) => {
            const bookData = await getBookById(book.book_id);

            const item : Item = {
              book: bookData,
              invoice: book
            }

            items.push(item);
          }))

          setItems(items);
        } catch (error) {
          console.error("Failed to fetch invoice:", error);
        } finally {
          setAreBooksLoading(false)
          checkLoadingState();
        }};

        fetchBooks();
    }, [invoice]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsInfoLoading(true);

    const fetchInvoice = async () => {
      try {
        const response = await getInvoiceById(param.invoiceId);
        
        if (response.statusCode === 200 && response.data) {
          setInvoice(response.data);
        } else {
          console.error("Failed to fetch invoice:", response.errorMessage);
        }
      } catch (error) {
        console.error("Failed to fetch invoice:", error);
      } finally {
        setIsInfoLoading(false)
        checkLoadingState();
      }};

      fetchInvoice();
    }, []);

    if (isLoading)
    return (
      <Box
        h={"calc(100vh - 130px)"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CustomLoading />
      </Box>
    )

    return(
        <Flex w='min-content' m='0 auto' pt={{base: '13vh', md: '15vh', lg: '22vh', xl: '18vh'}} pb={{base: '7vh', md: '10vh', 'xl': '9vh'}} flexDir={"column"} alignItems={"center"}>
            <Box alignSelf='flex-start' mb='10px'>
                <BreadcrumbNav order={code} size={{ base: 'sm', lg: 'sm'}}/>
            </Box>
            <Heading color={useColorModeValue('brand.blueLogo', 'brand.greenLogo')} alignSelf='flex-start' fontSize={{ base: 'xl', lg: '2xl', '2xl': '3xl'}}>Orden #{code}</Heading>
            <Grid w={{ base: '85vw', '2xl': '65vw'}} templateRows='repeat(1, 1fr)' templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(7, 1fr)'}} gap={4} mt='10px'>
                <GridItem rowSpan={2} colSpan={2} h='min-content'>
                    <Text fontSize={{ lg: 'lg', '2xl': 'lg'}} pb='8px'>Detalles</Text>
                    <hr/>

                    { isInfoLoading ? (
                      <Box display={'flex'} justifyContent={'center'} mt={10}>
                        <Spinner size={'xl'} thickness='4px' color="brand.violetLogo" /> 
                      </Box>
                    ) : (
                      <>
                        <Box display='flex' alignItems='center' m='10px 0'>
                          <Box mr='8px'>
                            <FaCalendarCheck/>
                          </Box>
                          <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Fecha: <b>{replaceCharacter(invoice?.date_created, '-', '/')}</b></Text>
                        </Box>
                        <Box display='flex' alignItems='center' m='5px 0'>
                          <Box mr='8px'>
                            <FaCircleInfo/>
                          </Box>
                          <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Estado: <b>{orderState}</b></Text>
                        </Box>
                        <Box display='flex' alignItems='center' m='5px 0'>
                          <Box mr='8px'>
                            <FaCreditCard/>
                          </Box>
                          <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Pago: <b>{paymentState}</b></Text>
                        </Box>
                        <Box display='flex' alignItems='center' m='5px 0'>
                          <Box mr='8px'>
                            <FaMoneyBillWave/>
                          </Box>
                          <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Medio de pago: <b>{paymentMethod}</b></Text>
                        </Box>
                        <Box display='flex' alignItems='center' m='5px 0'>
                          <Box mr='8px'>
                            <FaTruck/>
                          </Box>
                          <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Envío: <b>Pendiente</b></Text>
                        </Box>
                        <Box display='flex' alignItems='center' m='30px 0 5px 0'>
                          <Box mr='8px'>
                            <FaLocationDot/>
                          </Box>
                          <Text fontWeight='semibold' fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Dirección de envío:</Text>
                        </Box>
                        <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>
                            <b>{user.name} {user.lastName}</b> <br/>
                            { invoice?.address && (
                              <> 
                                {invoice.address.street} {invoice.address.number} {invoice.address.department} <br/>
                                {invoice.address.district} {invoice.address.city}, {invoice.address.zipCode} <br/>
                                {invoice.address.state}, Argentina <br/>
                              </>
                            ) }
                        </Text>
                      </>
                    )}
                    
                </GridItem>
                <GridItem colSpan={5} mb='10px' mt='10px'>
                { areBooksLoading ? (
                  <Box display={'flex'} justifyContent={'center'} mt={10}>
                    <Spinner size={'xl'} thickness='4px' color="brand.violetLogo" /> 
                  </Box>
                  ) : (
                    size.width && size.width <= 980 ? (
                      <TableMobile items={items}/>
                    ) : (
                      <TableDesktop items={items}/>
                    )
                )}

                </GridItem>
                <GridItem colSpan={5} h='min-content' display='flex' flexDir='column'>
                    <Flex justify='space-between' wrap='wrap'>
                      <Box>
                    {invoice?.shipping_method === 'CORREO_ARGENTINO' ? (
                   <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}}>
                      <b>Costo de envío (Correo Argentino - Envio a domicilio):</b> ${formatNumberWithDots(invoice?.shipping)}
                    </Text> 
                ) : (
                  <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}}>
                      <b>Costo de envío (retiro en sucursal Av. Fantasia 111, Buenos Aires)</b>: $0
                  </Text> 
                )}
                    <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}}><b>Subtotal:</b> ${formatNumberWithDots(invoice?.subTotal)}</Text>
                    </Box>

                    { size.width && size.width < 550 ? '' : (
                      <Button bg='brand.greenLogo' _hover={{ backgroundColor: 'brand.blueLogo' }} textColor='white' size={{ base: 'sm', lg: 'md'}} onClick={() => handleReturn()}>Volver</Button>
                    )}
                    </Flex>
                    <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}} fontWeight='semibold' alignSelf='center'>Total: ${formatNumberWithDots(invoice?.total)}</Text>
                    { size.width && size.width < 550 ?  (
                      <Button bg='brand.greenLogo' _hover={{ backgroundColor: 'brand.blueLogo' }} mt={5} textColor='white' size={{ base: 'sm', lg: 'md'}} onClick={() => handleReturn()}>Volver</Button>
                    ) : ''}
                </GridItem>
            </Grid>
        </Flex>
    )
}

export default Order;