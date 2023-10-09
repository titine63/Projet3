//Profile.jsx
import { useContext, useState } from "react";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TiStarFullOutline } from "react-icons/ti";
import ModalResetPassword from "./../../components/Auth/Modals/ModalResetPassword";
import AdsByUser from "../../components/AdsByUser/AdsByUser";
import axios from "axios";

export default function Profile() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Utilisation du contexte global pour obtenir des méthodes et des états
  const { setIsLogged, isLogged, closeModal } = useContext(GlobalContext);
  console.log("isLogged :>> ", isLogged);

  console.log("Cookies.get('user.id') :>> ", Cookies.get("user.id"));
  // État local pour gérer la photo de profil
  const [selectedFile, setSelectedFile] = useState(null);

  // État local pour gérer l'aperçu de la photo de profil
  const [previewURL, setPreviewURL] = useState(null);

  // État local pour gérer la redirection
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const userId = Cookies.get("user.id");
  const userPicture = Cookies.get("user.picture");
  const userPseudo = Cookies.get("user.pseudo");
  const userEmail = Cookies.get("user.email");
  const userCreatedAt = Cookies.get("user.createdAt");
  // useEffect(() => {
  //   // Vérifiez si le cookie "token" est présent
  //   const token = Cookies.get("token");
  //   console.log("token :>> ", token);
  //   console.log("object :>> HELLO");

  //   if (token) {
  //     // Si le cookie est présent, récupérez les informations de l'utilisateur
  //     axios
  //       .get(`${backendUrl}/auth/profile`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         // Mettez à jour l'état userInfo avec les données récupérées
  //         setUserInfo(response.data);
  //         console.log("response.data :>> ", response.data);
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Erreur lors de la récupération du profil de l'utilisateur:",
  //           error,
  //         );
  //       });
  //   }
  // }, []);

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
  if (!isLogged) {
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
        console.log("response.data :>> ", response.data);
        setSelectedFile(null);
        setPreviewURL(null);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Erreur lors de la mise à jour de la photo.");
      });
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
      <ModalResetPassword
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
      />

      {/* Partie gauche pour les informations de profil */}
      <div className="flex w-1/4 flex-col justify-between bg-[#FCE3D7]">
        {/* Conteneur pour la photo, le pseudo et l'email */}
        <div className="mt-12 flex flex-col items-center">
          {/* Photo de profil */}

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {previewURL ? (
            <img
              src={previewURL}
              alt="Profile Preview"
              className="mb-4 h-[159.11px] w-[155px] cursor-pointer rounded-full"
            />
          ) : (
            <img
              src={
                userPicture && userPicture !== "null"
                  ? `${backendUrl}/${userPicture}`
                  : '"../../../public/images/Ellipse 1.png"'
              }
              alt="Profil picture"
              onClick={() => document.getElementById("fileInput").click()}
              className="mb-4 h-[159.11px] w-[155px] cursor-pointer rounded-full"
            />
          )}

          {selectedFile && (
            <div className="flex flex-col">
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
                onClick={uploadFile}
              >
                Mettre à jour la photo
              </button>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewURL(null);
                }}
              >
                Annuler
              </button>
            </div>
          )}

          {/* Pseudo et Email */}
          <h2 className="mb-2 text-xl font-bold">
            {userPseudo ? userPseudo : "Chargement..."}
          </h2>
          <h2 className="mb-2 text-xl font-bold text-gray-600">
            {userEmail ? userEmail : "Chargement..."}
          </h2>
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
            {userCreatedAt ? formatMemberSince(userCreatedAt) : "Chargement..."}
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
        <div className="mb-4 flex flex-wrap gap-4 border p-4">
          {/* Votre contenu ici, comme les cartes d'annonces */}
          <AdsByUser userId={userId ? userId : null} route={"product/user"} />
        </div>

        {/* 3ème conteneur : Titre pour l'historique de commandes */}
        <div className="mb-4">
          <h2>Mon historique de commande</h2>
        </div>

        {/* 4ème conteneur : Espace pour les cartes d'historique de commande */}
        <div className="flex flex-wrap gap-4 border p-4">
          <AdsByUser
            userId={userId ? userId : null}
            route={"product/order/user"}
          />
          {/* Votre contenu ici, comme les cartes d'historique de commande */}
        </div>
      </div>
    </main>
  );
}
