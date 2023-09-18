/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import heartIcon from "./../../assets/icons/heart.svg";
import chatIcon from "./../../assets/icons/msg.svg";
import userIcon from "./../../assets/icons/users-group-rounded-line.svg";
import AuthModal from "../AuthModal/AuthModal";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  // Importer les états et fonctions depuis le contexte global
  const {
    isLogged,
    showAuthModal,
    closeModal,
    openModalOnLogin,
    openModalOnRegister,
  } = useContext(GlobalContext);

  // État pour stocker la valeur de la barre de recherche
  const [searchValue, setSearchValue] = useState("");

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
        <form className="element-desktop search-bar-container">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchValue}
            onChange={handleSearchChange}
            className="element-desktop search-bar"
          />
          <FaSearch className="search-icon cursor-pointer" />
        </form>
        {/* Boutons de navigation */}
        <nav className="navbar-desktop">
          {/* --- Si l'utilisateur est connecté, on affiche ça --- */}
          {isLogged && (
            <>
              {/* Lien vers favoris desktop */}
              <Link to="/favorites" className="element-desktop">
                <img src={heartIcon}></img>
              </Link>
              {/* Lien vers chat desktop */}
              <Link to="/chat" className="element-desktop">
                <img src={chatIcon}></img>
              </Link>
              {/* Lien vers profil desktop */}
              <Link to="/profile" className="element-desktop">
                <img src={userIcon}></img>
              </Link>
              {/* Lien vers profil mobile (si connecté, l'icône user renvoie vers le profil) */}
              <Link to="/profile" className="element-mobile">
                <img src={userIcon}></img>
              </Link>
            </>
          )}
          {/* --- Si l'utilisateur n'est pas connecté, on affiche ça --- */}
          {!isLogged && (
            <>
              {/* Bouton login en desktop (ouvre la modale) */}
              <button
                className="element-desktop button-grey"
                onClick={openModalOnLogin}
              >
                Se connecter
              </button>
              {/* Bouton register en desktop (ouvre la modale) */}
              <button
                className="element-desktop button"
                onClick={openModalOnRegister}
              >
                Créer un compte
              </button>
              {/* Arrière-plan semi-transparent, si on clique en dehors de la modale, elle se ferme */}
              {showAuthModal && (
                <div
                  className="modal-overlay modal-desktop"
                  onClick={closeModal}
                ></div>
              )}
              {/* Modale d'authentification, ne s'affiche qu'à partir de 1024px de large (80vw x 80wh) */}
              {showAuthModal && <AuthModal />}
              {/* Lien vers login en mobile (si déconnecté, l'icône user renvoie vers le login) */}
              <Link to="/login" className="element-mobile">
                <img src={userIcon}></img>
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
