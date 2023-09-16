/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  // État pour savoir si la modale est sur login ou register
  // true = login, false = register
  const [modalContent, setModalContent] = useState(true);

  const handleModalContent = () => {
    setModalContent(!modalContent);
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };

  const value = useMemo(
    () => ({
      isLogged,
      setIsLogged,
      showAuthModal,
      setShowAuthModal,
      closeModal,
      modalContent,
      handleModalContent,
    }),
    [isLogged, showAuthModal, modalContent],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
