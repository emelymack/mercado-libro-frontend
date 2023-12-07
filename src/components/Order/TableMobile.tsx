import { Text, Table, Thead, Tr, Th, Tbody, Td, Image, TableContainer, useColorModeValue} from "@chakra-ui/react";
import { Item } from './index';
import { formatPrice } from "../Cart/PriceTag";

const TableMobile = ({ items }: { items: Item[] }) => {

    return(
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th fontWeight='semibold' fontSize={{base: 'md'}} color={useColorModeValue('black', 'white')} textTransform='capitalize'>Producto</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                {items.map((item) => (
                    <Tr>
                         <Td>
                             <Image objectFit='contain' boxSize={{ base: '50px', md: '50px', lg: '80px', xl: '100px', '2xl': '120px'}} src={item.book.image_links[0].url}/>
                         </Td>
                         <Td pl={0}>
                            <Text fontSize={{base: 'sm', '2xl': 'md'}} whiteSpace="normal" wordBreak="break-word"><b>{item.book.title}, {item.book.authors[0].name}</b> x{item.invoice.quantity}</Text>
                         </Td>
                        <Td fontSize={{base: 'sm', '2xl': 'lg'}} textAlign='center'>{formatPrice(item.book.price)}</Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
};

export default TableMobile;