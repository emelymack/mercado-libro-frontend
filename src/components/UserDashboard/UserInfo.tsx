import { useEffect, useState } from "react";
import { getAllUsers, patchUser } from "../../services/UserService";
import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Select,
  Switch,
  Table,
  TableCaption,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { User } from "../../types/user";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import EditUserModal from "./EditUserModal";
import CustomLoading from "../CustomLoading/CustomLoading";
import moment from "moment";
import Pagination from "../../utils/Pagination";
import { Navigate } from "react-router-dom";

const UserInfo = () => {
  const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  // const tableLayout = useBreakpointValue({ base: "auto", lg: "fixed" });
  const [users, setUsers] = useState<User[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [tooltipVisibility, setTooltipVisibility] = useState<{
    [key: number]: boolean;
  }>({});
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [orderDirection, setOrderDirection] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");
  const [lastNameSearch, setLastNameSearch] = useState<string>("");
  const [emailSearch, setEmailSearch] = useState<string>("");
  const isAdmin = localStorage.getItem("isLoggedAdmin") === "true";

  const handleEdit = (id: number) => {
    setSelectedUserId(id);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers({
          page,
          size,
        });
        if (response.statusCode === 200 && response.data) {
          setTotalElements(response.totalElements ?? 0);
          setUsers(response.data);
        } else {
          console.error("Failed to fetch users:", response.errorMessage);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [reloadKey, page, size]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers({
        name: nameSearch,
        lastName: lastNameSearch,
        email: emailSearch,
        status,
        orderBy,
        orderDirection,
      });
      if (response.statusCode === 200 && response.data) {
        setTotalElements(response.totalElements ?? 0);
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.errorMessage);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    setNameSearch("");
    setLastNameSearch("");
    setEmailSearch("");
    setStatus("");
    setOrderBy("");
    setOrderDirection("");
    setIsLoading(true);
    try {
      const response = await getAllUsers({
        page,
        size,
      });
      if (response.statusCode === 200 && response.data) {
        setTotalElements(response.totalElements ?? 0);
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.errorMessage);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    setIsLoading(true);
    const updatedStatus = isActive ? "INACTIVE" : "ACTIVE";
    try {
      const response = await patchUser(id, { status: updatedStatus });
      if (response.statusCode === 200) {
        console.log("Estado del usuario actualizado con éxito");
        setReloadKey((prev) => prev + 1);
      } else {
        console.error(
          "Error al actualizar el estado del usuario:",
          response.errorMessage
        );
      }
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return <Navigate to="*" />;
  }
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={[4, 6, 8]}
        overflowX="auto"
      >
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          align="center"
          pt={{ base: 10, md: 40 }}
          px={{ base: 4, md: 20 }}
          mb={4}
          w="full"
        >
          <Input
            fontSize={fontSize}
            placeholder="Buscar por nombre"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            mr={2}
            borderColor="gray.300"
            focusBorderColor="teal.500"
            _placeholder={{
              color: colorMode === "dark" ? "white" : "brand.blueLogo",
            }}
            mb={{ base: 2, md: 0 }}
            w="full"
          />

          <Input
            fontSize={fontSize}
            placeholder="Buscar por apellido"
            value={lastNameSearch}
            onChange={(e) => setLastNameSearch(e.target.value)}
            mr={2}
            focusBorderColor="teal.500"
            _placeholder={{
              color: colorMode === "dark" ? "white" : "brand.blueLogo",
            }}
            mb={{ base: 2, md: 0 }}
            w="full"
          />

          <Input
            fontSize={fontSize}
            placeholder="Buscar por correo electrónico"
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
            mr={2}
            focusBorderColor="teal.500"
            _placeholder={{
              color: colorMode === "dark" ? "white" : "brand.blueLogo",
            }}
            mb={{ base: 2, md: 0 }}
            w="full"
          />

          <Select
            fontSize={fontSize}
            placeholder="Seleccionar estado"
            value={status}
            focusBorderColor="teal.500"
            onChange={(e) => setStatus(e.target.value)}
            mr={2}
            mb={{ base: 2, md: 0 }}
            w="full"
          >
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
          </Select>

          <Select
            fontSize={fontSize}
            placeholder="Ordenar por"
            value={orderBy}
            focusBorderColor="teal.500"
            onChange={(e) => setOrderBy(e.target.value)}
            mr={2}
            mb={{ base: 2, md: 0 }}
            w="full"
          >
            <option value="ID">Id</option>
            <option value="NAME">Nombre</option>
            <option value="LAST_NAME">Apellido</option>
            <option value="EMAIL">Correo electrónico</option>
            <option value="STATUS">Estado</option>
          </Select>

          <Select
            fontSize={fontSize}
            placeholder="Dirección de orden"
            value={orderDirection}
            focusBorderColor="teal.500"
            onChange={(e) => setOrderDirection(e.target.value)}
            mr={2}
            mb={{ base: 2, md: 0 }}
            w="full"
          >
            <option value="ASC">Ascendente</option>
            <option value="DESC">Descendente</option>
          </Select>

          <Button
            fontSize={fontSize}
            ml={2}
            w={"2xl"}
            leftIcon={<SearchIcon />}
            colorScheme="teal"
            _hover={{
              bg: "brand.violetLogo75",
            }}
            onClick={handleSearch}
          >
            Buscar
          </Button>
          <Button
            onClick={handleClear}
            colorScheme="gray"
            fontSize={fontSize}
            ml={2}
            w={"2xl"}
            _hover={{
              bg: "gray.600",
              color: "white",
            }}
          >
            Limpiar
          </Button>
        </Flex>
        <Table variant="simple" size={{ base: "sm", md: "lg" }} mt={6}>
          <TableCaption>Usuarios Registrados en Mercado Libro</TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center" fontSize={fontSize}>
                Nombre
              </Th>
              <Th textAlign="center" fontSize={fontSize}>
                Apellido
              </Th>
              <Th textAlign="center" fontSize={fontSize}>
                Email
              </Th>
              <Th
                display={{ base: "none", md: "table-cell" }}
                textAlign="center"
                fontSize={fontSize}
              >
                Fecha Creación
              </Th>
              <Th textAlign="center" fontSize={fontSize}>
                Rol
              </Th>
              <Th textAlign="center" fontSize={fontSize}>
                Estado
              </Th>
              <Th textAlign="center" fontSize={fontSize}>
                Cambiar Estado
              </Th>
              <Th textAlign="center" fontSize={fontSize}>
                Acciones
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td textAlign="center" fontSize={fontSize}>
                  {user.name}
                </Td>
                <Td textAlign="center" fontSize={fontSize}>
                  {user.lastName}
                </Td>
                <Td textAlign="center" fontSize={fontSize}>
                  {user.email}
                </Td>
                <Td textAlign="center" fontSize={fontSize}>
                  {moment(user.dateCreated).format("DD/MM/YYYY")}
                </Td>
                <Td textAlign="center">
                  {user.roles.map((role) => (
                    <Tag
                      key={role.id}
                      colorScheme={
                        role.description === "USER" ? "green" : "red"
                      }
                      m={1}
                    >
                      {role.description}
                    </Tag>
                  ))}
                </Td>
                <Td textAlign="center" fontSize={fontSize}>
                  {user.status === "ACTIVE" ? (
                    <Badge
                      colorScheme="green"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      Activo
                    </Badge>
                  ) : (
                    <Badge colorScheme="red" px={2} py={1} borderRadius="full">
                      Inactivo
                    </Badge>
                  )}
                </Td>
                <Td textAlign="center" fontSize={fontSize}>
                  <Tooltip
                    label={user.status === "ACTIVE" ? "Desactivar" : "Activar"}
                    isOpen={tooltipVisibility[user.id]}
                    fontSize="md"
                  >
                    <Switch
                      size={"lg"}
                      isChecked={user.status === "ACTIVE"}
                      onChange={() =>
                        handleToggleStatus(user.id, user.status === "ACTIVE")
                      }
                      colorScheme={user.status === "ACTIVE" ? "green" : "red"}
                      onMouseEnter={() =>
                        setTooltipVisibility({
                          ...tooltipVisibility,
                          [user.id]: true,
                        })
                      }
                      onMouseLeave={() =>
                        setTooltipVisibility({
                          ...tooltipVisibility,
                          [user.id]: false,
                        })
                      }
                    />
                  </Tooltip>
                </Td>
                <Td textAlign="center">
                  <Tooltip label="Editar" aria-label="Editar" fontSize="md">
                    <EditIcon
                      w={6}
                      h={6}
                      color="brand.blueLogo"
                      _hover={{ color: "brand.greenLogo" }}
                      onClick={() => handleEdit(user.id)}
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

      {isLoading && <CustomLoading />}
      {isEditModalOpen && selectedUserId && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userId={selectedUserId}
          reloadUsers={() => setReloadKey((prevKey) => prevKey + 1)}
        />
      )}
    </>
  );
};
export default UserInfo;
