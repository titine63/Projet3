/* eslint-disable react/prop-types */
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AuthModal from "../AuthModal/AuthModal";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

export default function Layout({ children }) {
  const { showModall } = useContext(GlobalContext);
  return (
    <>
      <Header />
      <main className="main">
        {children}
        {showModall && <AuthModal />}
      </main>
      <Footer />
    </>
  );
}
