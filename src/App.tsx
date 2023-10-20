import { Box, Text } from "@chakra-ui/react";
import "./App.css";
import ColorModeSwitch from "./components/ColorModeSwitch";

function App() {
  return (
    <>
      <ColorModeSwitch />
      <Box bg="brand.blueLogo" fontFamily="heading">
        Esto es un texto de prueba de le fuente
      </Box>
      <Text color="brand.violetLogo" fontFamily="heading">
        Texto de Encabezado
      </Text>
    </>
  );
}

export default App;
