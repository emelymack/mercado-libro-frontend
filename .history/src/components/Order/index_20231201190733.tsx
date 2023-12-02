import { Grid, Text, Box, GridItem, Heading, Image, Flex, Spinner } from "@chakra-ui/react"
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
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Invoice, getInvoiceById, InvoiceItem } from "../../services/InvoiceService"
import { getBookById } from "../../services/BookService"
import { Book } from "../../types/product"
import { selectId } from "../../context/slices/invoiceSlice"

export interface Item {
  book: Book,
  invoice: InvoiceItem
}

const Order = () => {
  const [areBooksLoading, setAreBooksLoading] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const size = useWindowSize();
  const [invoice, setInvoice] = useState<Invoice>();
  const [items, setItems] = useState<Item[]>([]);
  const invoiceId = useSelector(selectId);
  const code = invoiceId.substring(0,4).toUpperCase();

  useEffect(() => {
    const fetchBooks = async () => {
      const items : Item[] = [];
      setAreBooksLoading(true)
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
        }};

        fetchBooks();
    }, [invoice]);

  useEffect(() => {
    window.scrollTo(0, 0); 
    const fetchInvoice = async () => {
      setIsInfoLoading(true)
      try {
        const response = await getInvoiceById(invoiceId);

        if (response.statusCode === 200 && response.data) {
          setInvoice(response.data);
        } else {
          console.error("Failed to fetch invoice:", response.errorMessage);
        }
      } catch (error) {
        console.error("Failed to fetch invoice:", error);
      } finally {
        setIsInfoLoading(false)
      }};

      fetchInvoice();
    }, []);

  
    return(
        <Flex w='min-content' m='0 auto' pt={{base: '13vh', lg: '18vh'}} pb={{base: '8vh', '2xl': '8vh'}} flexDir={"column"} alignItems={"center"}>
            <Box alignSelf='flex-start' mb='10px'>
                <BreadcrumbNav order={code} size={{ base: 'sm', lg: 'sm'}}/>
            </Box>
            <Heading alignSelf='flex-start' fontSize={{ base: 'xl', lg: '2xl', '2xl': '3xl'}}>Orden #{code}</Heading>
            <Grid w={{ base: '85vw', '2xl': '65vw'}} templateRows='repeat(1, 1fr)' templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(7, 1fr)'}} gap={4} mt='10px'>
                <GridItem rowSpan={2} colSpan={2} h='min-content'>
                    <Text fontSize={{ lg: 'lg', '2xl': 'lg'}} pb='5px' borderBottom='1px solid #e6e6e6'>Detalles</Text>

                    { isInfoLoading ? (
                      <Box display={'flex'} justifyContent={'center'} mt={10}>
                        <Spinner size={'xl'} thickness='4px' color="brand.violetLogo" /> 
                      </Box>
                    ) : (
                      <>
                      <Box display='flex' alignItems='center' m='5px 0'>
                        <Image boxSize={4} src={CalendarIcon} mr='8px' alt="Calendar icon"/>
                        <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Fecha: <b>{invoice?.date_created}</b></Text>
                      </Box>
                      <Box display='flex' alignItems='center' m='5px 0'>
                        <Image boxSize={4} src={InfoIcon} mr='8px' alt="Info icon"/>
                        <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Estado: <b>Cerrada</b></Text>
                      </Box>
                      <Box display='flex' alignItems='center' m='5px 0'>
                        <Image boxSize={4} src={CardIcon} mr='8px' alt="Card icon"/>
                        <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Pago: <b>Pagado</b></Text>
                      </Box>
                      <Box display='flex' alignItems='center' m='5px 0'>
                        <Image boxSize={4} src={DollarIcon} mr='8px' alt="Dollar icon"/>
                        <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Medio de pago: <b>Mercado Pago</b></Text>
                      </Box>
                      <Box display='flex' alignItems='center' m='5px 0'>
                        <Image boxSize={4} src={TruckIcon} mr='8px' alt="Truck icon"/>
                        <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Envío: <b>Enviado</b></Text>
                      </Box>
                      <Box display='flex' alignItems='center' m='30px 0 5px 0'>
                        <Image boxSize={4} src={LocationIcon} mr='8px' alt="Location icon"/>
                        <Text fontWeight='semibold' fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>Dirección de envío:</Text>
                      </Box>
                      <Text fontSize={{ base: 'sm', lg: 'sm', xl: 'md', '2xl': 'md'}}>
                          Rocio Belen Ghillino <br/>
                          José de San Martin 654 14A <br/>
                          Quilmes Quilmes, 1878 <br/>
                          Gran Buenos Aires <br/>
                          Argentina <br/>
                          +541166106727 
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
                      <TableMobile />
                    ) : (
                      <TableDesktop items={items}/>
                    )
                )}

                </GridItem>
                <GridItem colSpan={5} h='min-content' display='flex' flexDir='column'>
                    <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}}><b>Costo de envío (Correo Argentino - Envio a domicilio):</b> Gratis</Text>
                    <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}}><b>Subtotal:</b> $24.900</Text>
                    <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md', '2xl': 'md'}} fontWeight='semibold' alignSelf='center'>Total: ${invoice?.total}</Text>
                </GridItem>
            </Grid>
        </Flex>
    )
}

export default Order;