//Profile.jsx
import { useContext, useState } from "react";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TiStarFullOutline } from "react-icons/ti";
import ModalResetPassword from "./../../components/Auth/Modals/ModalResetPassword";
import ModalDeleteAccount from "./../../components/Auth/Modals/ModalDeleteAccount";

export default function Profile() {
  // Utilisation du contexte global pour obtenir des méthodes et des états
  const { setIsLogged, closeModal, userInfo } = useContext(GlobalContext);
  // État local pour gérer la redirection
  const [shouldRedirect, setShouldRedirect] = useState(false);
  // État local pour gérer la réinitialisation du mot de passe
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  // État pour contrôler la visibilité de la modale de suppression de compte
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Nouvel état

  // Fonction pour ouvrir la modale de suppression de compte
  function handleOpenDeleteAccountModal() {
    setShowDeleteAccountModal(true);
  }

  // Fonction pour fermer la modale de suppression de compte
  function handleCloseDeleteAccountModal() {
    setShowDeleteAccountModal(false);
  }

  // Nouvelle fonction pour gérer la fermeture de la modale de confirmation
  function handleCloseConfirmationModal() {
    setShowConfirmationModal(false);
    handleLogout(); // Déconnecter l'utilisateur et rediriger vers l'accueil
  }
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
      {/* Appel du composant ModalResetPassword avec les props nécessaires */}
      <ModalResetPassword
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
      />
      {/* Appel du composant ModalDeleteAccount avec les props nécessaires */}
      <ModalDeleteAccount
        isOpen={showDeleteAccountModal}
        onClose={() => {
          handleCloseDeleteAccountModal();
          setShowConfirmationModal(true); // Afficher la modale de confirmation lors de la fermeture
        }}
        backendURL={import.meta.env.VITE_BACKEND_URL}
        userId={userInfo ? userInfo.id : null}
        setIsLogged={setIsLogged} // Passez cette fonction comme prop
        setShouldRedirect={setShouldRedirect} // Passez cette fonction comme prop
      />

      {/* Nouvelle modale de confirmation */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-1/3 rounded-lg bg-white p-8 shadow-lg">
            <p className="mb-4 text-center">
              Votre compte a bien été supprimé ! Nous espérons vous revoir
              bientôt !
            </p>
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={handleCloseConfirmationModal}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Partie gauche pour les informations de profil */}
      <div className="flex w-1/4 flex-col justify-between bg-[#FCE3D7]">
        {/* Conteneur pour la photo, le pseudo et l'email */}
        <div className="mt-12 flex flex-col items-center">
          {/* Photo de profil */}
          <img
            src={
              userInfo && userInfo.picture
                ? userInfo.picture
                : "https://placekitten.com/g/200/300"
            }
            alt="Profil"
            className="mb-4 h-[159.11px] w-[155px] rounded-full"
          />

          {/* Pseudo et Email */}
          <h2 className="mb-2 text-xl font-bold">
            {userInfo ? userInfo.pseudo : "Chargement..."}
          </h2>
          <h2 className="mb-2 text-xl font-bold text-gray-600">
            {userInfo ? userInfo.email : "Chargement..."}
          </h2>
        </div>

        {/* Conteneur pour la note, les étoiles et membre depuis */}
        <div className="mt-0 flex flex-col items-center">
          {/* Ma note et étoiles */}
          <div
            className="mb-2 flex"
            style={{ width: "192.5px", height: "33px" }}
          >
            {/* Afficher 5 étoiles */}
            {Array.from({ length: 5 }).map((_, index) => (
              <TiStarFullOutline
                key={index}
                size={33}
                className="text-orange-500"
              />
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
          <div className="m-4 mb-2 flex justify-between text-black">
            {/* Ajout du bouton pour ouvrir la modale */}
            <button
              className="text-black focus:outline-none"
              onClick={() => setShowResetPasswordModal(true)}
            >
              Modifier mon mot de passe
            </button>
            <button
              className="text-black focus:outline-none"
              onClick={handleOpenDeleteAccountModal}
            >
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
        <div className="mb-4 border p-4">
          {/* Votre contenu ici, comme les cartes d'annonces */}
        </div>

        {/* 3ème conteneur : Titre pour l'historique de commandes */}
        <div className="mb-4">
          <h2>Mon historique de commande</h2>
        </div>

        {/* 4ème conteneur : Espace pour les cartes d'historique de commande */}
        <div className="border p-4">
          {/* Votre contenu ici, comme les cartes d'historique de commande */}
        </div>
      </div>
    </main>
  );
}
