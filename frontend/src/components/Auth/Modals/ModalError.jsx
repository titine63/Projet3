import PropTypes from "prop-types";

function ModalError({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-1/3 rounded-lg bg-white p-8 shadow-lg">
        <p className="mb-4 text-center">
          On dirait que vos identifiants sont incorrects.
          <br /> Merci de réessayer.
        </p>
        <div className="flex justify-center">
          <button
            className="rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

ModalError.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalError;
