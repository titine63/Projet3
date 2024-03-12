//App.jsx
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContextProvider";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Chat from "./pages/Chat/Chat";
import Favorites from "./pages/Favorites/Favorites";
import Profile from "./pages/Profile/Profile";
import Sell from "./pages/Sell/Sell";
import Buy from "./pages/Buy/Buy";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Category from "./pages/Category/Category";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import Order from "./pages/Order/Order";
import ConfirmationOrder from "./pages/Order/ConfirmationOrder";
import Payment from "./pages/Payment/Payment";
import Summary from "./pages/Payment/Summary";

function App() {
  return (
    <>
      <Router>
        {/* Contexte global enveloppe toute l'application*/}
        <GlobalContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/buy/product/:id" element={<ProductDetail />} />
              <Route path="/product/update/:id" element={<UpdateProduct />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/product/category/:category" element={<Category />} />
              <Route path="/confirmation" element={<ConfirmationOrder />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/summary" element={<Summary/>} />
            </Routes>
          </Layout>
        </GlobalContextProvider>
      </Router>
    </>
  );
}

export default App;
