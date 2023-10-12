/* eslint-disable react/prop-types */
export default function ConfirmationModal({ handleCloseConfirmationModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-1/3 rounded-lg bg-white p-8 shadow-lg">
        <p className="mb-4 text-center">
          Votre compte a bien été supprimé ! Nous espérons vous revoir bientôt !
        </p>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleCloseConfirmationModal}
        >
          OK
        </button>
      </div>
    </div>
  );
}
