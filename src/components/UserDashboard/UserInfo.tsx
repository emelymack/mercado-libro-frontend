import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/UserService";
import {
  Box,
  Table,
  TableCaption,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Role, User } from "../../types/user";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditUserModal from "./EditUserModal";
import CustomLoading from "../CustomLoading/CustomLoading";

const UserInfo = () => {
  const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const tableLayout = useBreakpointValue({ base: "auto", lg: "fixed" });
  const [users, setUsers] = useState<User[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleEdit = (id: number) => {
    setSelectedUserId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log("ID para eliminar:", id);
    // Resto del código para eliminar el usuario
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

  return (
    <>
      <Box overflowX="auto">
        <Table variant="simple" size="md" sx={{ tableLayout: tableLayout }}>
          <TableCaption>Usuarios Registrados en Mercado Libro</TableCaption>
          <Thead>
            <Tr>
              <Th fontSize={fontSize}>Nombre</Th>
              <Th fontSize={fontSize}>Apellido</Th>
              <Th fontSize={fontSize}>Email</Th>
              <Th fontSize={fontSize}>Estado</Th>
              <Th fontSize={fontSize}>Fecha Creación</Th>
              <Th fontSize={fontSize}>Rol</Th>
              <Th fontSize={fontSize}>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td fontSize={fontSize}>{user.name}</Td>
                <Td fontSize={fontSize}>{user.lastName}</Td>
                <Td fontSize={fontSize}>{user.email}</Td>
                <Td fontSize={fontSize}>{user.status}</Td>
                <Td fontSize={fontSize}>{user.dateCreated}</Td>
                <Td>
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
                <Td>
                  <EditIcon
                    w={6}
                    h={6}
                    color="brand.blueLogo"
                    _hover={{ color: "green" }}
                    onClick={() => handleEdit(user.id)}
                  />
                  <DeleteIcon
                    w={6}
                    h={6}
                    color="red"
                    _hover={{ color: "orange" }}
                    ml={4}
                    onClick={() => handleDelete(user.id)}
                  />
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
