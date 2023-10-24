import './App.css'
import AccordionTest from './components/AccordionTest'
import Layout from './components/Layout'
import { ChakraProvider} from "@chakra-ui/react";
import Categories from './components/Categories/Categories';

function App() {

  return (
    <>
    <ChakraProvider >
      <Layout>
    
        <Categories />
        </Layout>
    </ChakraProvider>
    </>
  )
}

export default App
