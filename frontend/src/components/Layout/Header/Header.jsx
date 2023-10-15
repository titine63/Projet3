//Header.jsx
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import heartIcon from "./../../../assets/icons/heart.svg";
import chatIcon from "./../../../assets/icons/msg.svg";
import userIcon from "./../../../assets/icons/users-group-rounded-line.svg";
import AuthModal from "../../Auth/AuthModal/AuthModal";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  // Importer les états et fonctions depuis le contexte global
  const { isLogged, showAuthModal, setShowAuthModal, setModalContent } =
    useContext(GlobalContext);

  // État pour stocker la valeur de la barre de recherche
  const [searchValue, setSearchValue] = useState("");

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

  // Gestionnaire pour mettre à jour la valeur de la barre de recherche
  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  // (Optionnel) Si vous souhaitez gérer la soumission de la recherche, ajoutez un gestionnaire d'événements ici.

  return (
    <>
      <header className="header fixed top-0 z-10 flex h-[10vh] w-full items-center justify-between gap-4 bg-stone-100 px-4 py-4 sm:gap-6 sm:px-6 lg:px-8">
        {/* Logo Trinded */}
        <Link to="/">
          <span className="logo">TRINDED</span>
        </Link>
        {/* Barre de recherche */}
        <form className="relative mr-auto hidden flex-grow rounded-lg border-y-2 border-[#ec5a13] sm:block sm:max-w-[50%] lg:ml-4">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchValue}
            onChange={handleSearchChange}
            className="hidden w-full rounded-lg border-[#ec5a13] sm:block"
          />
          <FaSearch className="absolute right-2 top-3 h-5 w-5 cursor-pointer text-[#ec5a13] md:right-4 md:top-2 md:h-7 md:w-7" />
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
