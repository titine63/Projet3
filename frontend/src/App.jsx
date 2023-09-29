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
import Products from "./components/Products/Products";
import Category from "./components/Products/category";

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
              <Route path="/buy/product/:id" element={<Products />} />
              <Route
                path="/product/category/:category"
                element={<Category />}
              />
            </Routes>
          </Layout>
        </GlobalContextProvider>
      </Router>
    </>
  );
}

export default App;
