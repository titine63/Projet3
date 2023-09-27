//Profile.jsx
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Profile() {
  const { setIsLogged, closeModal } = useContext(GlobalContext); // Ajout de closeModal
  const [shouldRedirect, setShouldRedirect] = useState(false);

  function handleLogout() {
    // Suppression du token JWT du cookie
    Cookies.remove("token");

    // Mettre à jour l'état pour déconnecter l'utilisateur
    setIsLogged(false);

    // Fermer le modal si ouvert
    closeModal(); // Ajout de cette ligne pour fermer le modal

    // Rediriger l'utilisateur vers la page d'accueil
    setShouldRedirect(true);
  }

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
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
