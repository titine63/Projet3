//GlobaContextProvider.jsx
/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";

// Création du contexte global de l'application
export const GlobalContext = createContext();

// Création du composant GlobalContextProvider
export function GlobalContextProvider({ children }) {
  // État pour savoir si l'utilisateur est connecté ou non
  const [isLogged, setIsLogged] = useState(false);
  // État pour savoir si la modale est ouverte ou non
  const [showAuthModal, setShowAuthModal] = useState(false);
  // État pour savoir si la modale est sur login ou register (true = login, false = register)
  const [modalContent, setModalContent] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // Nouvel état pour les informations de l'utilisateur

  // Change le contenu de la modale
  function handleModalContent() {
    setModalContent(!modalContent);
  }

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

  // useMemo permet de ne pas recréer la valeur du contexte à chaque fois que le composant est rendu
  const value = useMemo(
    () => ({
      isLogged,
      setIsLogged,
      showAuthModal,
      setShowAuthModal,
      closeModal,
      modalContent,
      handleModalContent,
      openModalOnLogin,
      openModalOnRegister,
      userInfo,
      setUserInfo, // Ajout de setUserInfo dans le contexte
    }),
    // les valeurs du tableau de dépendances à surveiller
    [isLogged, showAuthModal, modalContent],
  );

  return (
    // On passe la valeur du contexte à tous les composants enfants
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
