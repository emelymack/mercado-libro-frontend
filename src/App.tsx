import Layout from './components/Layout'
import { ChakraProvider} from "@chakra-ui/react";
import Categories from './components/Categories/Categories';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {

  return (
  <>
      <Header/>
      <Categories/>
      <Footer/>
   </>
  )
}

export default App
