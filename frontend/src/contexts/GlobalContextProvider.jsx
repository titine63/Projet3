/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  const value = useMemo(
    () => ({
      isLogged,
      setIsLogged,
    }),
    [isLogged], //le variable qui doit être surveillé pour les changements, si la valeur de isLogged change, la fonction useMemo va être réexecutée 
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
