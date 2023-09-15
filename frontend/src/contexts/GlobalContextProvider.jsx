/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const value = useMemo(
    () => ({
      isLogged,
      setIsLogged,
      showAuthModal,
      setShowAuthModal,
    }),
    [isLogged, showAuthModal],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
