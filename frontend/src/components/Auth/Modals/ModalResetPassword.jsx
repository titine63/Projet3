import { useState } from "react"; // Import useState
import PropTypes from "prop-types";

function ModalResetPassword({ isOpen, onClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour envoyer l'email pour la réinitialisation du mot de passe
    console.log("Email pour réinitialisation :", email);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-1/3 rounded-lg bg-white p-8 shadow-lg flex flex-col">
        <p className="mb-4 text-center">Réinitialisation du mot de passe.</p>
        {/* Ajout du formulaire de réinitialisation du mot de passe ici */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
          <label htmlFor="email" className="mb-2">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full mb-2 px-3 py-2"
          />
          <div className="flex justify-between items-end mt-auto">
            <button type="submit" className="rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700">
              Envoyer le lien de réinitialisation
            </button>
            <button
              onClick={onClose}
              className="rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ModalResetPassword.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalResetPassword;
