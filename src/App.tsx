import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "./App.css";
import ColorModeSwitch from "./components/ColorModeSwitch";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <>
        <ColorModeSwitch />
        <Layout>
          <Home />
        </Layout>
      </>
    </ChakraProvider>
  );
}

export default App;
