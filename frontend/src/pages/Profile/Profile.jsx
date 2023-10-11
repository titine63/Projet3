//Profile.jsx
import { useContext, useState } from "react";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TiStarFullOutline } from "react-icons/ti";
import ModalResetPassword from "./../../components/Auth/Modals/ModalResetPassword";
import ModalDeleteAccount from "./../../components/Auth/Modals/ModalDeleteAccount";
import AdsByUser from "../../components/AdsByUser/AdsByUser";
import axios from "axios";

export default function Profile() {
  // Utilisation du contexte global pour obtenir des méthodes et des états
  const { setIsLogged, closeModal, isLogged } = useContext(GlobalContext);

  // Récupération de l'URL du backend depuis les variables d'environnement
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log("isLogged :>> ", isLogged);
  // État local pour gérer si un fichier est sélectionné
  const [selectedFile, setSelectedFile] = useState(null);
  // État local pour gérer l'URL de prévisualisation
  const [previewURL, setPreviewURL] = useState(null);
  // État local pour gérer la redirection
  const [shouldRedirect, setShouldRedirect] = useState(false);
  console.log("Cookies.get(user) :>> ", Cookies.get());
  const userId = Cookies.get("user.id");
  console.log("userId :>> ", userId);
  const [userPicture, setUserPicture] = useState(Cookies.get("user.picture"));
  console.log("userPicture  :>> ", userPicture);
  const userPseudo = Cookies.get("user.pseudo");
  console.log("userPseudo :>> ", userPseudo);
  const userEmail = Cookies.get("user.email");
  console.log("userEmail :>> ", userEmail);
  const userCreatedAt = Cookies.get("user.createdAt");
  console.log("userCreatedAt :>> ", userCreatedAt);
  const token = Cookies.get("token");
  console.log("token :>> ", token);
  // État local pour gérer la réinitialisation du mot de passe
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  // État local pour gérer la suppression du compte
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  // Nouvel état local pour gérer la confirmation de la suppression
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Nouvelle fonction pour gérer la fermeture de la modale de confirmation
  function handleCloseConfirmationModal() {
    setShowConfirmationModal(false);
    handleLogout(); // Déconnecter l'utilisateur et rediriger vers l'accueil
  }
  // Fonction pour gérer la déconnexion de l'utilisateur
  function handleLogout() {
    // Suppression du token JWT du cookie
    Cookies.remove("token");
    setIsLogged(false);
    closeModal();
    setShouldRedirect(true);
  }
  if (!token) {
    return <Navigate to="/login" />;
  }
  // Rediriger si l'utilisateur doit être déconnecté
  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  // Fonction pour gérer le changement de fichier
  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    setPreviewURL(url);
  }
  console.log("previewURL :>> ", previewURL);
  // Fonction pour gérer l'envoi du fichier
  function uploadFile() {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .put(`${backendUrl}/users/upload/${userId}`, formData)
      .then((response) => {
        console.log("reponse upload", response.data);
        alert("Photo mise à jour avec succès!");
        if (response.data.picture) {
          setUserPicture(response.data.picture);
        }
        setSelectedFile(null);
        setPreviewURL(null);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Erreur lors de la mise à jour de la photo.");
      });
  }

  // Nouvelle fonction pour gérer le succès de la suppression
  function handleSuccessfulDeletion() {
    setShowDeleteAccountModal(false);
    setShowConfirmationModal(true);
  }

  // Fonction pour formater la date au format "mois en lettres et année"
  function formatMemberSince(createdAt) {
    if (createdAt) {
      const date = new Date(createdAt);
      const options = { year: "numeric", month: "long" };
      return new Intl.DateTimeFormat("fr-FR", options).format(date);
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
        onClose={() => setShowDeleteAccountModal(false)} // Uniquement fermer la modale si "Annuler" est cliqué
        onSuccessfulDeletion={handleSuccessfulDeletion} // Nouveau prop pour gérer le succès
        backendURL={import.meta.env.VITE_BACKEND_URL}
        userId={userId}
        setIsLogged={setIsLogged} // Passer cette fonction comme prop
        setShouldRedirect={setShouldRedirect} // Passer cette fonction comme prop
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
          {previewURL ? (
            <img
              src={previewURL}
              alt="Profil"
              onClick={() => document.getElementById("fileInput").click()}
              className="mb-4 h-[159.11px] w-[155px] rounded-full"
            />
          ) : (
            <img
              src={
                userPicture
                  ? `${backendUrl}/${userPicture}`
                  : "../../../public/images/Ellipse 1.png"
              }
              alt="Profil"
              className="mb-4 h-[159.11px] w-[155px] rounded-full"
              onClick={() => document.getElementById("fileInput").click()}
            />
          )}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Bouton pour changer la photo de profil */}
          {selectedFile ? (
            <button
              className="mb-4 rounded bg-orange-500 px-4 py-2 text-white"
              onClick={uploadFile}
            >
              Enregistrer
            </button>
          ) : (
            <label
              htmlFor="file"
              onClick={() => document.getElementById("fileInput").click()}
              className="mb-4 cursor-pointer rounded bg-orange-500 px-4 py-2 text-white"
            >
              Changer ma photo
            </label>
          )}

          {/* Champ pour sélectionner un fichier */}

          {/* Pseudo et Email */}
          <h2 className="mb-2 text-xl font-bold">{userPseudo}</h2>
          <h2 className="mb-2 text-xl font-bold text-gray-600">{userEmail}</h2>
        </div>

        {/* Conteneur pour la note, les étoiles et membre depuis */}
        <div className="mt-0 flex flex-col items-center">
          {/* Ma note et étoiles */}
          <p className="mb-2">Ma note : </p>
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

          {/* Membre depuis */}
          <p>
            Membre depuis :{" "}
            {userCreatedAt ? formatMemberSince(userCreatedAt) : "Date inconnue"}
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
              onClick={() => setShowDeleteAccountModal(true)}
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
        <div className="mb-4 flex flex-wrap gap-4 border p-4">
          {/* Votre contenu ici, comme les cartes d'annonces */}
          <AdsByUser userId={userId} route={"product/user"} />
        </div>

        {/* 3ème conteneur : Titre pour l'historique de commandes */}
        <div className="mb-4">
          <h2>Mon historique de commande</h2>
        </div>

        {/* 4ème conteneur : Espace pour les cartes d'historique de commande */}
        <div className="flex flex-wrap gap-4 border p-4">
          <AdsByUser userId={userId} route={"product/order/user"} />
          {/* Votre contenu ici, comme les cartes d'historique de commande */}
        </div>
      </div>
    </main>
  );
}
