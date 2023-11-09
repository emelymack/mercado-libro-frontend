import { useEffect, useState } from "react";
import { getAllUsers, patchUser } from "../../services/UserService";
import {
  Badge,
  Box,
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
} from "@chakra-ui/react";
import { User } from "../../types/user";
import { EditIcon } from "@chakra-ui/icons";
import EditUserModal from "./EditUserModal";
import CustomLoading from "../CustomLoading/CustomLoading";
import moment from "moment";

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

  const handleEdit = (id: number) => {
    setSelectedUserId(id);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        if (response.statusCode === 200 && response.data) {
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
  }, [reloadKey]);

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    setIsLoading(true);
    const updatedStatus = isActive ? "INACTIVE" : "ACTIVE";
    try {
      const response = await patchUser(id, { status: updatedStatus });
      if (response.statusCode === 200) {
        console.log("Estado del usuario actualizado con éxito");
        // Refrescar la lista de usuarios
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

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        overflowX="auto"
      >
        <Table variant="simple" size="md">
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
              <Th textAlign="center" fontSize={fontSize}>
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
