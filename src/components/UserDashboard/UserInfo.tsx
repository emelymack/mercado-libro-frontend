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
} from "@chakra-ui/react";
import { Role, User } from "../../types/user";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditUserModal from "./EditUserModal";
import CustomLoading from "../CustomLoading/CustomLoading";

const UserInfo = () => {
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
      <Box position={"relative"} zIndex={1}>
        <Table color={"brand.blueLogo"} variant="unstyled">
          <TableCaption fontSize={30} color={"#FFFFFF"}>
            Usuario registrados Mercado Libro
          </TableCaption>
          <Thead>
            <Tr fontSize={20}>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Email</Th>
              <Th>Estado</Th>
              <Th>Fecha Creacion</Th>
              <Th>Rol</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr fontSize={20} key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Th>{user.status}</Th>
                <Th>{user.dateCreated}</Th>
                {user.roles.map((role: Role) => (
                  <Tag key={role.id} colorScheme="green">
                    {role.description}
                  </Tag>
                ))}
                <Td>
                  <EditIcon
                    w={6}
                    h={6}
                    color="teal.500"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(user.id)}
                  />
                  <DeleteIcon
                    w={6}
                    h={6}
                    color="red.500"
                    style={{ cursor: "pointer", marginLeft: "1rem" }}
                    onClick={() => handleDelete(user.id)}
                  />
                </Td>
              </Tr>
            ))}
            {selectedUserId !== null && isEditModalOpen && (
              <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userId={selectedUserId}
                reloadUsers={() => setReloadKey((prevKey) => prevKey + 1)}
              />
            )}
          </Tbody>
        </Table>
        {isLoading ? <CustomLoading /> : null}
      </Box>
    </>
  );
};

export default UserInfo;
