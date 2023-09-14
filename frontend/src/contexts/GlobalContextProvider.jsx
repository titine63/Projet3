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
    [isLogged],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
