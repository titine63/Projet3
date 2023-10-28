import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import LoginDesktop from "./LoginDesktop";
import RegisterDesktop from "./RegisterDesktop";

// Cette modale affiche soit LoginDesktop, soit RegisterDesktop en fonction de l'état de modalContent.
export default function AuthModal() {
  // Importer l'état depuis le contexte global
  const { modalContent } = useContext(GlobalContext);
  // modalContent : true = login, false = register
  return (
    <div className="fixed left-[50%] top-[50%] z-[1000] h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white drop-shadow-2xl">
      {modalContent ? <LoginDesktop /> : <RegisterDesktop />}
    </div>
  );
}
