import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import "./App.css";
// import ColorModeSwitch from "./components/ColorModeSwitch";
import { Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import Health from "./components/Health/Health";
import Categories from "./components/Categories/Categories";
import ProductManager from "./components/Products/manger";

function App() {
  return (
    <>
      {/* <ColorModeSwitch /> */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<Health />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/category/:categoryName" element={<Categories />} />
          <Route path="/admin/products" element={<ProductManager />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
