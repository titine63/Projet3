/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import heartIcon from "./../../assets/icons/heart.svg";
import chatIcon from "./../../assets/icons/msg.svg";
import userIcon from "./../../assets/icons/users-group-rounded-line.svg";
import LoginDesktop from "../AuthModal/LoginDesktop";
import RegisterDesktop from "../AuthModal/RegisterDesktop";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const { isLogged } = useContext(GlobalContext);
  const { showAuthModal, setShowAuthModal, closeModal, modalContent } =
    useContext(GlobalContext);

  // État pour stocker la valeur de la barre de recherche
  const [searchValue, setSearchValue] = useState("");

  // Gestionnaire pour mettre à jour la valeur de la barre de recherche
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  console.log("modalContent :>> ", modalContent);

  // (Optionnel) Si vous souhaitez gérer la soumission de la recherche, ajoutez un gestionnaire d'événements ici.

  return (
    <>
      <header className="header">
        <Link to="/">
          <span className="logo">TRINDED</span>
        </Link>
        <form className="element-desktop search-bar-container">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchValue}
            onChange={handleSearchChange}
            className="element-desktop search-bar"
          />
          <FaSearch className="search-icon" />
        </form>
        <nav className="navbar-desktop">
          {isLogged && (
            <>
              <Link to="/favorites" className="element-desktop">
                <img src={heartIcon}></img>
              </Link>
              <Link to="/chat" className="element-desktop">
                <img src={chatIcon}></img>
              </Link>
              <Link to="/profile" className="element-desktop">
                <img src={userIcon}></img>
              </Link>
              <Link to="/profile" className="element-mobile">
                <img src={userIcon}></img>
              </Link>
            </>
          )}
          {!isLogged && (
            <>
              <button
                className="element-desktop button-grey"
                onClick={() => setShowAuthModal(true)}
              >
                Se connecter
              </button>
              <button
                className="element-desktop button"
                onClick={() => setShowAuthModal(true)}
              >
                Créer un compte
              </button>
              {showAuthModal && (
                <div
                  className="modal-overlay"
                  onClick={closeModal}
                ></div> /* Arrière-plan semi-transparent */
              )}
              {showAuthModal && (
                <div className="modal">
                  {modalContent ? <LoginDesktop /> : <RegisterDesktop />}
                </div>
              )}
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
