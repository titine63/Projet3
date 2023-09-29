//Profile.jsx
import { useContext, useState } from "react";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Profile() {
  // Utilisation du contexte global pour obtenir des méthodes et des états
  const { setIsLogged, closeModal, userInfo } = useContext(GlobalContext);
  // État local pour gérer la redirection
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Fonction pour gérer la déconnexion de l'utilisateur
  function handleLogout() {
    // Suppression du token JWT du cookie
    Cookies.remove("token");

    // Mettre à jour l'état pour déconnecter l'utilisateur
    setIsLogged(false);

    // Fermer le modal si ouvert
    closeModal();

    // Rediriger l'utilisateur vers la page d'accueil
    setShouldRedirect(true);
  }

  // Rediriger si l'utilisateur doit être déconnecté
  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="main flex h-screen">
      {/* Partie gauche pour les informations de profil */}
      <div className="flex w-1/3 flex-col justify-between bg-[#FCE3D7] p-4">
        <div className="flex-grow">
          {/* Photo de profil */}
          <img
            src="lien_vers_la_photo"
            alt="Profil"
            className="mb-4 h-24 w-24 rounded-full"
          />

          {/* Pseudo et Email */}
          <h2 className="mb-2 text-xl font-bold">
            {userInfo ? userInfo.pseudo : "Chargement..."}
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            {userInfo ? userInfo.email : "Chargement..."}
          </p>

          {/* Note et étoiles */}
          <p className="mb-2">Ma note :</p>
          <div className="mb-4 flex">
            {/* Ici, icônes d'étoiles selon la note de l'utilisateur */}
            <div className="star-icon"></div>
          </div>

          {/* Membre depuis */}
          <p className="mb-4">Membre depuis : 2022-01-01</p>
        </div>

        <div>
          {/* Modifier mot de passe et Supprimer compte */}
          <div className="mb-2 flex justify-between text-black">
            <button className="text-black focus:outline-none">
              Modifier mon mot de passe
            </button>
            <button className="text-black focus:outline-none">
              Supprimer mon compte
            </button>
          </div>

          {/* Bouton Déconnexion */}
          <button
            className="w-full bg-orange-500 py-2 text-white"
            onClick={handleLogout}
          >
            Me déconnecter
          </button>
        </div>
      </div>

      {/* Partie droite pour les annonces et l'historique */}
      <div className="w-2/3 p-4">
        {/* Section des annonces */}
        <div className="mb-4">
          <h2>Mes annonces en ligne</h2>
          {/* ici, ajouter un composant pour les cartes d'annonces */}
        </div>

        {/* Section de l'historique de commande */}
        <div className="mb-4">
          <h2>Mon historique de commande</h2>
          {/* Ici, ajouter un composant pour les cartes d'historique de commande */}
        </div>
      </div>
    </main>
  );
}
