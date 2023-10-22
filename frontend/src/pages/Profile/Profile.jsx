//Profile.jsx
import { useContext, useState } from "react";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TiStarFullOutline } from "react-icons/ti";
import { LuPenSquare } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import ModalResetPassword from "./../../components/Auth/Modals/ModalResetPassword";
import ModalDeleteAccount from "./../../components/Auth/Modals/ModalDeleteAccount";
import AdsByUser from "../../components/AdsByUser/AdsByUser";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
  const { setIsLogged, showToast } = useContext(GlobalContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const userInfo = Cookies.get("userData")
    ? JSON.parse(Cookies.get("userData"))
    : null;

  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Modal pour réinitialiser le mot de passe
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  // Modal pour gérer la suppression du compte
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  // Confirmation de la suppression du compte
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [userPicture, setUserPicture] = useState(userInfo?.picture || null);

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
    setShouldRedirect(true);
  }

  // Rediriger si l'utilisateur se déconnecte
  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  // Fonction pour gérer le changement de photo
  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    setPreviewURL(url);
  }

  // Fonction pour gérer l'envoi du fichier
  function uploadFile() {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .put(`${backendUrl}/users/upload/${userInfo.id}`, formData)
      .then((response) => {
        showToast("Photo mise à jour avec succès!");
        if (response.data.picture) {
          setUserPicture(response.data.picture);
          // // Mettre à jour le cookie ici
          const updatedUserInfo = {
            ...userInfo,
            picture: response.data.picture,
          };
          Cookies.set("userData", JSON.stringify(updatedUserInfo));
        }
        setSelectedFile(null);
        setPreviewURL(null);
      })
      .catch((error) => {
        console.error("Error uploading file:  ", error);
        showToast("Erreur lors de la mise à jour de la photo.");
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
    <main className="main relative flex flex-col lg:flex-row">
      {/* Partie gauche pour les informations de profil */}
      <div className="flex flex-col justify-between bg-[#FCE3D7] pb-20 sm:mt-4 lg:fixed lg:h-screen lg:w-1/3 xl:w-1/4">
        <div className=" mt-12 flex flex-col items-center">
          <span className="relative">
            {selectedFile ? (
              <ImCross
                className="absolute -right-2 top-0 -translate-y-1 translate-x-1 cursor-pointer text-2xl text-[#7b828a] transition duration-200 ease-in-out hover:scale-110 hover:transform"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewURL(null);
                }}
              />
            ) : (
              <LuPenSquare
                className="absolute -right-2 top-0 -translate-y-1 translate-x-1 cursor-pointer text-2xl text-orange-500 transition duration-200 ease-in-out hover:rotate-2 hover:scale-110 hover:transform"
                onClick={() => document.getElementById("fileInput").click()}
              />
            )}
            {/* Photo de profil */}
            {previewURL ? (
              <img
                src={previewURL}
                alt="Profil"
                onClick={() => document.getElementById("fileInput").click()}
                className="mb-4 h-40 w-40 cursor-pointer rounded-full"
              />
            ) : (
              <img
                src={
                  userPicture
                    ? `${backendUrl}${userPicture}`
                    : "/images/Ellipse 1.png"
                }
                alt="Photo de profil"
                className="mb-4 h-40 w-40 cursor-pointer rounded-full"
                onClick={() => document.getElementById("fileInput").click()}
              />
            )}
            {/* Champ pour sélectionner un fichier */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
          </span>
          {/* Bouton pour changer la photo de profil */}
          {selectedFile ? (
            <button
              className="mb-4 cursor-pointer rounded bg-orange-500 px-4 py-2 text-white underline-offset-2 hover:border hover:border-black hover:underline"
              onClick={uploadFile}
            >
              Enregistrer
            </button>
          ) : (
            <label
              htmlFor="file"
              onClick={() => document.getElementById("fileInput").click()}
              className=" mb-4 cursor-pointer rounded bg-orange-500 px-4 py-2 text-white underline-offset-2 hover:border hover:border-black hover:underline"
            >
              Changer ma photo
            </label>
          )}
          {/* Pseudo et Email */}
          <h2 className="mb-2 text-xl font-bold">{userInfo.pseudo}</h2>
          <h2 className="mb-2 text-xl font-bold text-gray-600">
            {userInfo.email}
          </h2>
        </div>
        {/* Conteneur pour la note, les étoiles et membre depuis */}
        <div className="mt-0 flex flex-col items-center">
          <p className="mb-2 font-semibold">Ma note: </p>
          <div
            className="mb-2 flex h-9 w-full justify-center"
            // style={{ width: "192.5px", height: "33px" }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <TiStarFullOutline
                key={index}
                size={33}
                className="text-orange-500"
              />
            ))}
          </div>

          <p className="font-semibold">
            Membre depuis: <span>{formatMemberSince(userInfo.createdAt)}</span>
          </p>
        </div>

        {/* Boutons en bas : Modifier mot de passe et Supprimer compte */}
        <div>
          <div className="flex justify-between gap-1 text-black">
            <button
              className="w-1/2 border p-2 text-black underline-offset-2 hover:border-orange-300 hover:font-semibold hover:underline"
              onClick={() => setShowResetPasswordModal(true)}
            >
              Modifier mon mot de passe
            </button>
            <button
              className="w-1/2 border p-2 text-black underline-offset-2 hover:border-orange-300 hover:font-semibold hover:underline"
              onClick={() => setShowDeleteAccountModal(true)}
            >
              Supprimer mon compte
            </button>
          </div>

          {/* Bouton Déconnexion */}
          <button
            className="m-0 w-full bg-orange-500 py-2 text-lg font-medium text-white underline-offset-2 hover:bg-red-400 hover:text-xl hover:font-semibold hover:text-black hover:underline"
            onClick={handleLogout}
          >
            Me déconnecter
          </button>
        </div>
      </div>

      {/* Partie droite pour les annonces et l'historique */}
      <section className="right-0 my-8 w-screen p-4 lg:absolute lg:w-2/3 xl:w-3/4">
        <h1 className="h1 text-center">Mon profil</h1>
        <h2 className="h3 mb-4 mt-6 pl-8 lg:mt-8">Mes annonces en ligne :</h2>
        <div className="mb-4 grid grid-cols-1 gap-4 border p-4  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AdsByUser userId={userInfo.id} route={"product/user"} />
        </div>

        <h2 className="h3 mb-4 mt-6 pl-8 lg:mt-8">
          Mon historique de commande :
        </h2>
        <div className="grid grid-cols-1 gap-4 border p-4  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AdsByUser userId={userInfo.id} route={"product/order/user"} />
        </div>
      </section>
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
        backendURL={backendUrl}
        userId={userInfo.id}
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
    </main>
  );
}
