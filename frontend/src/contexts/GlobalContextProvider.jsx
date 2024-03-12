//GlobaContextProvider.jsx
/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";
import Cookies from "js-cookie";
import Toast from "./../components/Toast/Toast";

// Création du contexte global de l'application
export const GlobalContext = createContext();

// Création du composant GlobalContextProvider
export function GlobalContextProvider({ children }) {
  // État pour savoir si l'utilisateur est connecté ou non
  const initialIsLogged = !!Cookies.get("token");
  const [isLogged, setIsLogged] = useState(initialIsLogged);

  // Etat pour les informations de l'utilisateur
  const initialUserInfo = Cookies.get("userData")
    ? JSON.parse(Cookies.get("userData"))
    : null;

  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const [wishlist, setWishlist] = useState([]);

  // État pour savoir si la modale est ouverte ou non
  const [showAuthModal, setShowAuthModal] = useState(false);
  // État pour savoir si la modale est sur login ou register (true = login, false = register)
  const [modalContent, setModalContent] = useState(true);

  const [isToastVisible, setToastVisibility] = useState(false); // État du toast (visible ou non)
  const [toastMessage, setToastMessage] = useState(""); // Message du toast à afficher

  // Fonction pour afficher un toast
  function showToast(message) {
    // Logique pour afficher le toast ici
    setToastMessage(message);
    setToastVisibility(true);

    // Cacher le toast après quelques secondes
    setTimeout(() => {
      setToastVisibility(false);
    }, 5000); // 5 secondes
  }

  // useMemo permet de ne pas recréer la valeur du contexte à chaque fois que le composant est rendu
  const value = useMemo(
    () => ({
      isLogged,
      setIsLogged,
      showAuthModal,
      setShowAuthModal,
      modalContent,
      setModalContent,
      userInfo,
      setUserInfo,
      isToastVisible, // Etat du toast
      showToast, // Fonction pour afficher le toast
      wishlist,
      setWishlist,
    }),
    // les valeurs du tableau de dépendances à surveiller
    [isLogged, showAuthModal, modalContent, userInfo, isToastVisible, wishlist],
  );

  return (
    <GlobalContext.Provider value={value}>
      <Toast show={isToastVisible} message={toastMessage} />
      {children}
    </GlobalContext.Provider>
  );
}
