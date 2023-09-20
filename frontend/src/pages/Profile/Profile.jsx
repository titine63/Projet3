import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { isLogged, setIsLogged } = useContext(GlobalContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  function handleLogout() {
    setIsLogged(isLogged ? false : true);
    setShouldRedirect(true);
  }

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="main flex flex-col justify-center">
      <h1 className="h1">Votre profil</h1>
      <h2 className="h2">
        Retrouvez vos annonces et vos commandes ainsi que vos informations de
        profil ici
      </h2>
      <button
        onClick={handleLogout}
        type="button"
        className="button ml-8 mt-16"
      >
        Se déconnecter
      </button>
    </main>
  );
}
