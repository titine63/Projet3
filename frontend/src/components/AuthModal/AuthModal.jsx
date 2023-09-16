import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import LoginDeskop from "./LoginDesktop";

export default function AuthModal() {
  const { showModal, setShowModal } = useContext(GlobalContext);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <>
      {showModal && (
        
      )}
    </>
  );
}
