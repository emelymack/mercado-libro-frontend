import { Box, Button, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({
  pageNumber,
  pageSize,
  totalElements,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalElements / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center" mt={4} p={4}>
      <Tooltip label="Página anterior">
        <IconButton
          fontSize="20px"
          colorScheme="teal"
          aria-label="Página anterior"
          icon={<ChevronLeftIcon />}
          isDisabled={pageNumber === 0}
          onClick={() => handlePageChange(pageNumber - 1)}
        />
      </Tooltip>
      <Text fontSize={"xl"} mx={2}>
        Página {pageNumber + 1} de {totalPages}
      </Text>

      <Tooltip label="Página siguiente">
        <IconButton
          fontSize="20px"
          colorScheme="teal"
          aria-label="Página siguiente"
          icon={<ChevronRightIcon />}
          isDisabled={pageNumber === totalPages - 1}
          onClick={() => handlePageChange(pageNumber + 1)}
        />
      </Tooltip>
    </Flex>
  );
};

export default Pagination;
