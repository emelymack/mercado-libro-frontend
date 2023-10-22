import './App.css'
import { ChakraProvider} from "@chakra-ui/react";
import Categories from './components/Categories/Categories';

function App() {

  return (
    <ChakraProvider >
      <>

        <Categories />
      </>
    </ChakraProvider>
  )
}

export default App
