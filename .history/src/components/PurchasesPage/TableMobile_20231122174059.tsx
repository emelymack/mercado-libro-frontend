import { Text, Table, Thead, Tr, Th, Tbody, Td, Image, TableContainer} from "@chakra-ui/react"

const TableMobile = () => {

    return(
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th fontWeight='semibold' fontSize={{base: 'lg'}} color='black' textTransform='capitalize'>Producto</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td display='flex'>
                        <Image objectFit='contain' boxSize={{ base: '50px', md: '50px', lg: '80px', xl: '100px', '2xl': '120px'}} src='https://www.tematika.com/media/catalog/Ilhsa/Imagenes/678297.jpg'/>
                            <Text ml='20px' fontSize={{base: 'sm', '2xl': 'md'}} whiteSpace="normal" wordBreak="break-word" fontWeight='semibold'>Harry Potter y La Orden Del Fenix: Edicion Salamandra, J.K Rowling</Text>
                        </Td>
                        <Td fontSize={{base: 'sm', '2xl': 'lg'}} verticalAlign='top' textAlign='center'>$24.900</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
};

export default TableMobile;