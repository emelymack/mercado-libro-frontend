import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Grid, GridItem, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useBreakpointValue } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import Pagination from "../../utils/Pagination";
import CustomLoading from "../CustomLoading/CustomLoading";
import { Invoice, getAllInvoices } from "../../services/InvoiceService";

const InvoiceManager = () => {

    const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [page, setPage] = useState<number>(0);
    const [size] = useState<number>(10);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [listInvoices, setListInvoices] = useState<Invoice[]>();
    const [reloadKey, setReloadKey] = useState(0);
    const isAdmin = localStorage.getItem("isLoggedAdmin") === "true";

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const fetchInvoices = async () => {
            try {
                const response = await getAllInvoices({
                    page,
                    size,
                });
                console.log(response);

                if (response.statusCode === 200 && response.data) {
                    setTotalElements(response.totalElements ?? 0);

                    setListInvoices(response.data?.content);
                } else {
                    console.error("Failed to fetch users:", response.errorMessage);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInvoices();
    }, [reloadKey, page, size]);


    const handleView = (id: string) => {
        navigate(`/order/detail/${id}`);
        
    }

    if (!isAdmin) {
        return <Navigate to="*" />;
    }

    return (
        <div className="admin_products">
            {isLoading && <CustomLoading />}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={[4, 6, 8]}
                overflowX="auto"
            >
                <Grid templateAreas={`"header header""nav main"`}>
                    <GridItem pl="2" area={"header"}>
                        <Text fontSize='4xl'>Listado de Ventas</Text>
                    </GridItem>
                </Grid>
                <Table variant="simple" size={{ base: "sm", md: "lg" }} mt={6}>
                    <Thead>
                        <Tr>
                            <Th textAlign="center" fontSize={fontSize}>
                                Invoice
                            </Th>
                            <Th textAlign="center" fontSize={fontSize}>
                                Dni
                            </Th>
                            <Th textAlign="center" fontSize={fontSize}>
                                Fecha creación
                            </Th>

                            <Th textAlign="center" fontSize={fontSize}>
                                Total
                            </Th>
                            <Th textAlign="center" fontSize={fontSize}>
                                Items
                            </Th>
                            <Th textAlign="center" fontSize={fontSize}>
                                Ver detalle
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {listInvoices?.map((invoice) => (
                            <Tr key={invoice.id}>
                                <Td textAlign="center" fontSize={fontSize}>
                                    # {invoice.id.substring(0,4).toUpperCase()}
                                </Td>
                                <Td textAlign="center" fontSize={fontSize}>
                                    {invoice.dni}
                                </Td>
                                <Td textAlign="center" fontSize={fontSize}>
                                    {invoice.date_created}
                                </Td>
                                <Td textAlign="center" fontSize={fontSize}>
                                    $ {invoice.total}
                                </Td>
                                <Td textAlign="center" fontSize={fontSize}>
                                     {invoice?.invoice_item?.length}
                                </Td>
                                <Td textAlign="center" fontSize={fontSize}>
                                    <Tooltip label="Editar" aria-label="Editar" fontSize="md">
                                        <ViewIcon
                                            w={6}
                                            h={6}
                                            color="brand.blueLogo"
                                            _hover={{ color: "brand.greenLogo" }}
                                            onClick={() => handleView(invoice.id.toString())}
                                            cursor="pointer"
                                        />
                                    </Tooltip>
                                </Td>

                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Pagination
                    pageNumber={page}
                    pageSize={size}
                    totalElements={totalElements}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </Box>
        </div>
    )
}

export default InvoiceManager;
