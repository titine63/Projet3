//GlobaContextProvider.jsx
/* eslint-disable react/prop-types */
import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { Toast } from "../utils/Toast"; // Import du composant Toast

// Création du contexte global de l'application
export const GlobalContext = createContext();

// Création du composant GlobalContextProvider
export function GlobalContextProvider({ children }) {
  // État pour savoir si l'utilisateur est connecté ou non
  const initialIsLogged = !!Cookies.get("token");
  const [isLogged, setIsLogged] = useState(initialIsLogged);

  // Etat pour les informations de l'utilisateur
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (Cookies.get("userData")) {
      const serializedUserData = Cookies.get("userData");
      // Désérialisez la chaîne pour obtenir l'objet original
      const userData = JSON.parse(serializedUserData);
      setUserInfo(userData);
      console.log("Cookies.get(userData) :>> ", Cookies.get("userData"));
    }
  }, []); // Le tableau de dépendances vide signifie que cet effet ne sera exécuté qu'une fois, au montage du composant
  console.log("userInfo :>> ", userInfo);

  // État pour savoir si la modale est ouverte ou non
  const [showAuthModal, setShowAuthModal] = useState(false);
  // État pour savoir si la modale est sur login ou register (true = login, false = register)
  const [modalContent, setModalContent] = useState(true);

  const [isToastVisible, setToastVisibility] = useState(false); // État du toast
  const [toastMessage, setToastMessage] = useState(""); // Message du toast

  // Change le contenu de la modale
  const handleModalContent = useCallback(() => {
    setModalContent(!modalContent);
  }, [modalContent]); // modalContent est une dépendance

  // Ferme la modale
  function closeModal() {
    setShowAuthModal(false);
  }

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

  // Fonction pour afficher un toast
  function showToast(message) {
    // Votre logique pour afficher le toast ici
    setToastMessage(message);
    setToastVisibility(true);

    // Cacher le toast après quelques secondes
    setTimeout(() => {
      setToastVisibility(false);
    }, 10000); // 3 secondes
  }

  // useMemo permet de ne pas recréer la valeur du contexte à chaque fois que le composant est rendu
  const value = useMemo(
    () => ({
      isLogged,
      setIsLogged,
      showAuthModal,
      setShowAuthModal,
      closeModal,
      modalContent,
      setModalContent,
      handleModalContent,
      openModalOnLogin,
      openModalOnRegister,
      userInfo,
      setUserInfo,
      isToastVisible, // Ajout de l'état du toast
      showToast, // Ajout de la fonction pour afficher le toast
    }),
    // les valeurs du tableau de dépendances à surveiller
    [
      isLogged,
      showAuthModal,
      modalContent,
      handleModalContent,
      userInfo,
      isToastVisible,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>
      <Toast show={isToastVisible} message={toastMessage} />
      {children}
    </GlobalContext.Provider>
  );
}
