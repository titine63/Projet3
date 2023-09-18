import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import LoginDesktop from "./LoginDesktop";
import RegisterDesktop from "./RegisterDesktop";

// Cette modale affiche soit LoginDesktop, soit RegisterDesktop en fonction de l'état de modalContent.
export default function AuthModal() {
  // Importer l'état depuis le contexte global
  const { modalContent } = useContext(GlobalContext);
  // modalContent : true = login, false = register
  return (
    <div className="modal modal-desktop">
      {modalContent ? <LoginDesktop /> : <RegisterDesktop />}
    </div>
  );
}
