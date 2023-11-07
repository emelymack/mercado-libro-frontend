import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import Health from "./components/Health/Health";
import CategoriesPage from "./components/CategoriesPage/CategoriesPage";
import ProductPage from "./components/ProductPage";
import { useAppDispatch } from "./context/hooks";
import { scrollPosition } from "./context/slices/scrollSlice";
import { useEffect } from "react";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import UserInfo from "./components/UserDashboard/UserInfo";

function App() {
  const dispatch = useAppDispatch()

  const handleScroll = () => {
    dispatch(scrollPosition(window.scrollY > 90))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    
    return () => { window.removeEventListener('scroll', handleScroll) }
  },[])

  return (
    <div className="content">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<Health />} />
          <Route path="/category/:categoryName" element={<CategoriesPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/userDashboard" element={<UserInfo />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
