import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import LoginDeskop from "./LoginDesktop";

export default function AuthModal() {
  const { showModal, setShowModal } = useContext(GlobalContext);
  const [login, setLogin] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <>
      {showModal && (
        <div className="modal h-full w-[80vw] bg-pink-300">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            {login ? <LoginDeskop /> : <h2 onClick={handleLogin}>Register</h2>}
          </div>
        </div>
      )}
    </>
  );
}
