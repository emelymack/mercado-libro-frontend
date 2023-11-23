import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import user from "../../assets/user.svg";
import dashboard from "../../assets/dashboard.svg";

const Dashboard = () => {
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
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
