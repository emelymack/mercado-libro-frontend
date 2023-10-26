import { ChakraProvider, theme } from "@chakra-ui/react";
import "./App.css";
import AccordionTest from "./components/AccordionTest";
import Layout from "./components/Layout";
import ColorModeSwitch from "./components/ColorModeSwitch";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <>
        <ColorModeSwitch />
        <Layout>
          <AccordionTest />
        </Layout>
      </>
    </ChakraProvider>
  );
}

export default App;
