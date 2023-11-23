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
import { login } from "./context/slices/authSlice";
import { setUser } from "./context/slices/userSlice";
import ProductManager from "./components/Products/manger";
import SuccesfulPurchase from "./components/SuccesfulPurchase";
import CheckoutPage from "./components/CheckoutPage";
import BookListSearch from "./components/SearchBar/BookListSearch";
import QuestionsPage from "./components/QuestionsPage/QuestionsPage";
import NewsPage from "./components/NewsPage/NewsPage";


function App() {
  const dispatch = useAppDispatch();

  const handleScroll = () => {
    dispatch(scrollPosition(window.scrollY > 90));
  };

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const storedUser = localStorage.getItem("user");
    if (isLogged === "true") {
      dispatch(login());
    }
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="content">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<Health />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/admin/products" element={<ProductManager />} />
          <Route path="/category/:categoryName" element={<CategoriesPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/userDashboard" element={<UserInfo />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/books/search/:searchTerm"
            element={<BookListSearch />}
          />
          <Route path="/successful" element={<SuccesfulPurchase />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/novedades" element={<NewsPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
