import { Box, ChakraProvider, Text } from "@chakra-ui/react";
import "./App.css";
import ColorModeSwitch from "./components/ColorModeSwitch";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <>
        <ColorModeSwitch />

        <RegisterUser />
      </>
    </ChakraProvider>
  );
}

export default App;
