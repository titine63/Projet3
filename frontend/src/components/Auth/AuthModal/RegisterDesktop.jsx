/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import RegisterForm from "../AuthForms/RegisterForm";

export default function RegisterDeskop() {
  // Importer les états et fonctions depuis le contexte global
  const { closeModal, handleModalContent } = useContext(GlobalContext);

  return (
    <>
      {/* Contenu de la modale de connexion (prend toute la hauteur et largeur du parent */}
      <div className="modal-content-register flex h-full w-full">
        {/* Partie gauche en position relative pour placer ses enfants directs en absolute, flex-2 permet de donner un proportion à l'élément en largeur, ici 2/6 */}
        <div className="register-left-part relative h-full flex-[2] bg-[#ec5a13]">
          {/* Bouton pour fermer la modale */}
          <span
            className="close-button absolute left-4 top-1 cursor-pointer text-4xl"
            onClick={closeModal}
          >
            &times;
          </span>
          <div className="absolute top-[35%] flex flex-col items-center gap-12">
            {/* Slogan partie droite */}
            <p className="w-[85%] text-center text-2xl text-white xl:w-[80%]">
              Inscrivez-vous et rejoignez l'éco-mode
            </p>
            {/* Bouton permettant d'afficher le login en changeant l'état de modalContent */}
            <button
              onClick={handleModalContent}
              type="button"
              className="button-switch"
            >
              Se connecter
            </button>
          </div>
          <img
            src="/images/register-triangle.png"
            alt="white triangle used for five a shape to the background"
            className="absolute -right-[1px] bottom-0 w-[50%]"
          />
        </div>
        {/* Partie droite en position relative pour placer ses enfants directs en absolute, flex-4 permet de donner un proportion à l'élément en largeur, ici 4/6 */}
        <div className="register-right-part flex flex-[3] flex-col items-start justify-evenly bg-[#F5F5F5]">
          {/* La div contenant la phrase au dessus du formulaire */}
          <div className="flex w-[80%] gap-8 pl-[10%] xl:w-[90%] xl:gap-16">
            <p className="h2">
              Inscrivez<span className="text-[#ec5a13]">.</span>
            </p>
            <p className="h2">
              Explorez<span className="text-[#ec5a13]">.</span>
            </p>
            <p className="h2">
              Economisez<span className="text-[#ec5a13]">.</span>
            </p>
          </div>
          {/* Formulaire d'inscription */}
          <RegisterForm className="form flex w-[90%] flex-col items-center gap-6 self-start" />
        </div>
      </div>
    </>
  );
}
