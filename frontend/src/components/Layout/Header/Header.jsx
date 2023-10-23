//Header.jsx
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import heartIcon from "./../../../assets/icons/heart.svg";
import chatIcon from "./../../../assets/icons/msg.svg";
import userIcon from "./../../../assets/icons/users-group-rounded-line.svg";
import AuthModal from "../../Auth/AuthModal/AuthModal";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Header() {
  // Importer les états et fonctions depuis le contexte global
  const { isLogged, showAuthModal, setShowAuthModal, setModalContent } =
    useContext(GlobalContext);

  // Ouvre la modale sur login
  function openModalOnLogin() {
    setModalContent(true);
    setShowAuthModal(true);
  }

  // Ouvre la modale sur register
  function openModalOnRegister() {
    setShowAuthModal(true);
    setModalContent(false);
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `${backendURL}/product/search/${searchTerm}`,
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  useEffect(() => {
    // Cette fonction sera appelée à chaque changement de searchTerm
    if (searchTerm === "") {
      // Effacer les résultats de recherche lorsque searchTerm est vide
      setSearchResult(null);
    } else {
      // Effectuer la recherche lorsque searchTerm n'est pas vide
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  return (
    <>
      <header className="header fixed top-0 z-10 flex h-20 w-full items-center justify-between gap-4 bg-stone-100 px-4 py-4 sm:gap-6 sm:px-6 lg:px-8">
        {/* Logo Trinded */}
        <Link to="/">
          <span className="logo">TRINDED</span>
        </Link>
        {/* Barre de recherche */}
        <form
          className="relative mr-auto hidden flex-grow rounded-lg border-y-2 border-[#ec5a13] sm:block sm:max-w-[50%] lg:ml-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchTerm);
          }}
        >
          <input
            type="text"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="w-full rounded-lg border-[#ec5a13]"
          />
          <FaSearch className="absolute right-2 top-3 h-5 w-5 cursor-pointer text-[#ec5a13] md:right-4 md:top-2 md:h-7 md:w-7" />
          <div className="absolute left-0 right-0 top-[60px] rounded-b-lg border-[#ec5a13] bg-white">
            {searchResult && searchResult.length > 0 && (
              <ul className="flex flex-col justify-center text-center">
                {searchResult.map((res) => (
                  <li key={res.id} className=" hover:text-[#ec5a13]">
                    <a href={`http://localhost:5173/buy/product/${res.id}`}>
                      <span className="mx-1 text-lg">{res.title}</span>
                      <span className="mx-1 text-lg">{res.category}</span>
                      <span className="mx-1 text-lg">{res.size}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {searchResult && searchResult.length === 0 && searchTerm !== "" && (
              <p className="flex flex-col justify-center text-center text-lg">
                Aucun résultat
              </p>
            )}
          </div>
        </form>
        {/* Boutons de navigation */}
        <nav className="flex items-center gap-4 lg:gap-6">
          {/* --- Si l'utilisateur est connecté, on affiche ça --- */}
          {isLogged && (
            <>
              {/* Lien vers favoris desktop */}
              <Link
                to="/favorites"
                className="hidden transition duration-300 ease-in-out hover:scale-110 hover:transform sm:block"
              >
                <img src={heartIcon}></img>
              </Link>
              {/* Lien vers chat desktop */}
              <Link
                to="/chat"
                className="hidden transition duration-300 ease-in-out hover:scale-110 hover:transform sm:block"
              >
                <img src={chatIcon}></img>
              </Link>
              {/* Lien vers profil desktop */}
              <Link
                to="/profile"
                className="hidden transition duration-300 ease-in-out hover:scale-110 hover:transform lg:block"
              >
                <img src={userIcon}></img>
              </Link>
              {/* Lien vers profil mobile (si connecté, l'icône user renvoie vers le profil) */}
              <Link to="/profile" className="lg:hidden">
                <img src={userIcon}></img>
              </Link>
            </>
          )}
          {/* --- Si l'utilisateur n'est pas connecté, on affiche ça --- */}
          {!isLogged && (
            <>
              {/* Bouton login en desktop (ouvre la modale) */}
              <button
                className="hidden min-w-[100px] bg-[#d9d9d9] px-2 py-1 underline-offset-2 shadow-sm shadow-black hover:underline md:px-4 md:py-2 lg:block"
                onClick={openModalOnLogin}
              >
                Se connecter
              </button>
              {/* Bouton register en desktop (ouvre la modale) */}
              <button
                className="button hidden underline-offset-2 hover:underline lg:block"
                onClick={openModalOnRegister}
              >
                Créer un compte
              </button>
              {/* Arrière-plan semi-transparent, si on clique en dehors de la modale, elle se ferme */}
              {showAuthModal && (
                <div
                  className="fixed left-0 top-0 z-[999] hidden h-full w-full bg-black opacity-50 lg:block"
                  onClick={() => setShowAuthModal(false)}
                ></div>
              )}
              {/* Modale d'authentification, ne s'affiche qu'à partir de 1024px de large (80vw x 80wh) */}
              {showAuthModal && <AuthModal />}
              {/* Lien vers login en mobile (si déconnecté, l'icône user renvoie vers le login) */}
              <Link to="/login" className="lg:hidden">
                <img src={userIcon}></img>
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
