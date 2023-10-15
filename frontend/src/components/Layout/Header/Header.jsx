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
      <header className="header">
        {/* Logo Trinded */}
        <Link to="/">
          <span className="logo">TRINDED</span>
        </Link>
        {/* Barre de recherche */}
        <form className="search-bar-container hidden sm:block">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchValue}
            onChange={handleSearchChange}
            className="search-bar hidden sm:block"
          />
          <FaSearch className="search-icon cursor-pointer" />
        </form>
        {/* Boutons de navigation */}
        <nav className="navbar-desktop">
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
                className="button-grey hidden underline-offset-2 hover:underline lg:block"
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
                  className="modal-overlay hidden lg:block"
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
