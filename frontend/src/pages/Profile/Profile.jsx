//Profile.jsx
import { useContext, useState } from "react";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TiStarFullOutline } from "react-icons/ti";

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

  // Fonction pour formater la date au format "mois en lettres et année"
  function formatMemberSince(createdAt) {
    if (createdAt) {
      const date = new Date(createdAt);
      const options = { year: "numeric", month: "long" };
      return new Intl.DateTimeFormat("fr-FR", options).format(date);
    } else {
      return "Chargement...";
    }
  }

  return (
    <main className="main flex h-screen">
      {/* Partie gauche pour les informations de profil */}
      <div className="flex w-1/4 flex-col justify-between bg-[#FCE3D7]">
        {/* Conteneur pour la photo, le pseudo et l'email */}
        <div className="flex flex-col items-center mt-12">
          {/* Photo de profil */}
          <img
            src={userInfo && userInfo.picture ? userInfo.picture : "https://placekitten.com/g/200/300"}
            alt="Profil"
            className="mb-4 h-[159.11px] w-[155px] rounded-full"
          />

          {/* Pseudo et Email */}
          <h2 className="mb-2 text-xl font-bold">
            {userInfo ? userInfo.pseudo : "Chargement..."}
          </h2>
          <h2 className="mb-2 text-xl text-gray-600 font-bold">
            {userInfo ? userInfo.email : "Chargement..."}
          </h2>
        </div>

        {/* Conteneur pour la note, les étoiles et membre depuis */}
        <div className="flex flex-col items-center mt-0">
          {/* Ma note et étoiles */}
          <div className="mb-2 flex" style={{ width: "192.5px", height: "33px" }}>
            {/* Afficher 5 étoiles */}
            {Array.from({ length: 5 }).map((_, index) => (
              <TiStarFullOutline key={index} size={33} className="text-orange-500" />
            ))}
          </div>
          <p className="mb-2">Ma note : 5</p>

          {/* Membre depuis */}
          <p>
            Membre depuis :{" "}
            {userInfo ? formatMemberSince(userInfo.createdAt) : "Chargement..."}
          </p>
        </div>

        {/* Boutons en bas */}
        <div>
          {/* Modifier mot de passe et Supprimer compte */}
          <div className="mb-2 flex justify-between text-black m-4">
            <button className="text-black focus:outline-none">
              Modifier mon mot de passe
            </button>
            <button className="text-black focus:outline-none">
              Supprimer mon compte
            </button>
          </div>

          {/* Bouton Déconnexion */}
          <button
            className="m-0 w-full bg-orange-500 py-2 text-white"
            onClick={handleLogout}
          >
            Me déconnecter
          </button>
        </div>
      </div>

      {/* Partie droite pour les annonces et l'historique */}
<div className="w-2/3 p-4">
  {/* 1er conteneur : Titre pour les annonces */}
  <div className="mb-4">
    <h2>Mes annonces en ligne</h2>
  </div>

  {/* 2ème conteneur : Espace pour les cartes d'annonces */}
  <div className="p-4 border mb-4">
    {/* Votre contenu ici, comme les cartes d'annonces */}
  </div>

  {/* 3ème conteneur : Titre pour l'historique de commandes */}
  <div className="mb-4">
    <h2>Mon historique de commande</h2>
  </div>

  {/* 4ème conteneur : Espace pour les cartes d'historique de commande */}
  <div className="p-4 border">
    {/* Votre contenu ici, comme les cartes d'historique de commande */}
  </div>
</div>


    </main>
  );
}


