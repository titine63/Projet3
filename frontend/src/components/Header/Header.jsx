/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import heartIcon from "./../../assets/icons/heart.svg";
import chatIcon from "./../../assets/icons/msg.svg";
import userIcon from "./../../assets/icons/users-group-rounded-line.svg";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const { isLogged } = useContext(GlobalContext);
  // État pour stocker la valeur de la barre de recherche
  const [searchValue, setSearchValue] = useState("");

  // Gestionnaire pour mettre à jour la valeur de la barre de recherche
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // (Optionnel) Si vous souhaitez gérer la soumission de la recherche, ajoutez un gestionnaire d'événements ici.

  return (
    <>
      <header className="header">
        <Link to="/">
          <span className="logo">TRINDED</span>
        </Link>
        <form className="nav-element-desktop search-bar-container">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchValue}
            onChange={handleSearchChange}
            className="nav-element-desktop search-bar"
          />
          <FaSearch className="search-icon absolute right-4 top-2 h-7 w-7 text-[#ec5a13]" />
        </form>
        <nav className="navbar-desktop">
          {isLogged && (
            <>
              <Link to="/favorites" className="nav-element-desktop">
                <img src={heartIcon}></img>
              </Link>
              <Link to="/chat" className="nav-element-desktop">
                <img src={chatIcon}></img>
              </Link>
              <Link to="/profile">
                <img src={userIcon}></img>
              </Link>
            </>
          )}
          {!isLogged && (
            <>
              <Link to="/login" className="nav-element-desktop button">
                Se connecter
              </Link>
              <Link to="/register" className="nav-element-desktop button">
                S'inscrire
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
