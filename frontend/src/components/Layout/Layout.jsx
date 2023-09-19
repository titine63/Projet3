/* eslint-disable react/prop-types */
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

// Permet de mettre en place la structure de base à l'intérieur de laquelle on peut insérer les composants
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
