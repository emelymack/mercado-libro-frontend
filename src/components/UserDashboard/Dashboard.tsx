import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import user from "../../assets/user.svg";
import dashboard from "../../assets/dashboard.svg";
import books from "../../assets/books.svg";

const Dashboard = () => {
  const isAdmin = localStorage.getItem("isLoggedAdmin") === "true";

  if (!isAdmin) {
    return <Navigate to="*" />;
  }
  return (
    <Box p={5} pt={60}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <Box boxShadow="xl" borderRadius="lg" p={5}>
          <Heading mb={4}>Información de Usuario</Heading>
          <Text mb={4}>Administra la información del usuario aquí.</Text>
          <Image h={"400px"} src={user} alt="Imagen de UserInfo" mb={4} />
          <Button as={Link} to="/userDashboard" colorScheme="teal" width="full">
            Ir a Información de Usuario
          </Button>
        </Box>
        <Box boxShadow="xl" borderRadius="lg" p={5}>
          <Heading mb={4}>Dashboard</Heading>
          <Text mb={4}>Visualiza las estadísticas aquí.</Text>
          <Image
            h={"400px"}
            src={dashboard}
            alt="Imagen de ChartDashboard"
            mb={4}
          />
          <Button
            as={Link}
            to="/userDashboardChart"
            colorScheme="teal"
            width="full"
          >
            Ir a Dashboard
          </Button>
        </Box>
        <Box boxShadow="xl" borderRadius="lg" p={5}>
          <Heading mb={4}>Administración de Productos</Heading>
          <Text mb={4}>Administra los productos aquí.</Text>
          <Image
            h={"400px"}
            src={books}
            alt="Imagen de administración de productos"
            mb={4}
          />
          <Button
            as={Link}
            to="/admin/products"
            colorScheme="teal"
            width="full"
          >
            Ir a Administración de Productos
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
