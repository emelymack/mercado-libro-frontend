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
                        <Image objectFit='contain' boxSize={{ base: '50px', md: '50px', lg: '80px', xl: '100px', '2xl': '120px'}} src='https://www.antena3.com/newa3flash/modulos_blancos/uploader/uploads/Destroza%20este%20diario.jpg'/>
                            <Text ml='20px' fontSize={{base: 'sm', '2xl': 'md'}} whiteSpace="normal" wordBreak="break-word"><b>DESTROZA ESTE DIARIO, KERI SMITH</b> X1</Text>
                        </Td>
                        <Td fontSize={{base: 'sm', '2xl': 'lg'}} verticalAlign='top' textAlign='center'>$24.900</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
};

export default TableMobile;