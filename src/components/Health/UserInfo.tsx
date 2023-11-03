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

const UserInfo = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
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
      }
    };

    fetchUsers();
  }, []);
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default UserInfo;
