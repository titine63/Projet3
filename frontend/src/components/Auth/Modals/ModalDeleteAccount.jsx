//ModalDeleteAccount.jsx
import PropTypes from "prop-types";
import { AiFillWarning } from "react-icons/ai"; // Import du composant
import axios from "axios";
import Cookies from "js-cookie";

function ModalDeleteAccount({
  isOpen,
  onClose,
  backendURL,
  userId,
  setIsLogged,
  setShouldRedirect,
  onSuccessfulDeletion,
}) {
  if (!isOpen) {
    return null;
  }

  async function handleDeleteAccount() {
    try {
      await axios.delete(`${backendURL}/users/${userId}`);
      onSuccessfulDeletion();  // Appelez cette fonction en cas de succès
      onClose();

      // Supprimer les cookies et mettre à jour l'état global
      Cookies.remove("token");
      setIsLogged(false);

      // Rediriger vers la page d'accueil après quelques secondes
      setTimeout(() => {
        setShouldRedirect(true);
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-1/3 rounded-lg bg-white p-8 shadow-lg">
        <p className="mb-4 text-center">
          <AiFillWarning
            size={33}
            className="inline-block align-middle text-orange-500"
          />
          Êtes-vous sûr de vouloir supprimer votre compte ? <b />
          Cette action sera irréversible.
        </p>
        <div className="flex justify-between">
          <button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={handleDeleteAccount}
          >
            Supprimer
          </button>
          <button
            className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

ModalDeleteAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  backendURL: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  setIsLogged: PropTypes.func.isRequired,
  setShouldRedirect: PropTypes.func.isRequired,
};

export default ModalDeleteAccount;
