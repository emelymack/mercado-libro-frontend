import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import Health from "./components/Health/Health";
import CategoriesPage from "./components/CategoriesPage/CategoriesPage";
import ProductPage from "./components/ProductPage";
import { useAppDispatch, useAppSelector } from "./context/hooks";
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
import ChartDashboard from "./components/UserDashboard/ChartDashboard";
import Dashboard from "./components/UserDashboard/Dashboard";
import Oauth from "./components/Oauth/Oauth";
import Order from "./components/Order";
import MyAccountInfo from "./components/MyAccount";
import InvoiceManager from "./components/Invoice/manager";
import BestsellersPage from "./components/BestsellersPage/BestsellersPage";

function App() {
  const dispatch = useAppDispatch();
  const loggedState = useAppSelector(state => state.auth.isLogged)

  const handleScroll = () => {
    dispatch(scrollPosition(window.scrollY > 90));
  };

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    //@ts-ignore
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (isLogged === "true") {
      dispatch(login());
    }
    if (storedUser) {
      dispatch(setUser({ name: storedUser.name, lastName: storedUser.lastName, id: storedUser.id, email: storedUser.email }));
    }
  }, [loggedState]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<Health />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/admin/products" element={<ProductManager />} />
          <Route path="/admin/invoices" element={<InvoiceManager />} />
          <Route path="/category/:categoryName" element={<CategoriesPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userDashboard" element={<UserInfo />} />
          <Route path="/userDashboardChart" element={<ChartDashboard />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/me" element={<MyAccountInfo />} />
          <Route path="/order/detail/:invoiceId" element={<Order />} />
          <Route
            path="/books/search/:searchTerm"
            element={<BookListSearch />}
          />
          <Route path="/oauth" element={<Oauth/>} />
          <Route path="/successful" element={<SuccesfulPurchase />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/bestsellers" element={<BestsellersPage />} />
          <Route path="/novedades" element={<NewsPage />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
