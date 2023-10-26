import * as React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import theme from "./theme";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
