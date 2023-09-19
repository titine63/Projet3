/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

// Contenu de la modale de connexion
export default function LoginDeskop() {
  // Importer les états et fonctions depuis le contexte global
  const { isLogged, setIsLogged, closeModal, handleModalContent } =
    useContext(GlobalContext);

  // Gestionnaire pour mettre à jour l'état isLogged
  function handleLogin() {
    setIsLogged(isLogged ? false : true);
  }

  return (
    <>
      {/* Contenu de la modale de connexion (prend toute la hauteur et largeur du parent */}
      <div className="modal-content-login flex h-full w-full">
        {/* Partie gauche en position relative pour placer ses enfants directs en absolute, flex-4 permet de donner un proportion à l'élément en largeur, ici 4/6 */}
        <div className="login-left-part relative h-full flex-[4] bg-[#F5F5F5]">
          {/* La div contenant la phrase au dessus du formulaire */}
          <div className="abolute ml-[5%] mr-0 mt-[10%] flex w-[80%] justify-start gap-10 pl-6 xl:w-[95%] xl:gap-20 ">
            <p className="h2">
              Connectez<span className="text-[#ec5a13]">.</span>
            </p>
            <p className="h2">
              Explorez<span className="text-[#ec5a13]">.</span>
            </p>
            <p className="h2">
              Economisez<span className="text-[#ec5a13]">.</span>
            </p>
          </div>
          {/* Formulaire de connexion */}
          <form className="form absolute left-[5%] top-[25%] flex flex-col lg:w-[70%] xl:w-[60%]">
            <div className="relative mt-6">
              <HiOutlineMail className=" absolute left-4 top-[0.9rem] text-xl text-[#5e5e5e]" />
              <input
                type="email"
                id="email"
                name="email"
                className="input-auth"
                placeholder="Email"
              />
            </div>
            <div className="relative mt-6">
              <RiLockPasswordFill className=" absolute left-4 top-[0.9rem] text-xl text-[#5e5e5e]" />
              <input
                type="password"
                id="password"
                name="password"
                className="input-auth"
                placeholder="Mot de passe"
              />
            </div>
            <Link to="#" className="mt-4 text-center text-xs underline">
              Oups ! Mot de passe oublié ?
            </Link>
            <button
              onClick={handleLogin}
              type="button"
              className="button-auth mt-4 self-center lg:w-[50%] xl:w-[35%]"
            >
              Se connecter
            </button>
          </form>
        </div>
        {/* Partie droite en position relative pour placer ses enfants directs en absolute, flex-4 permet de donner un proportion à l'élément en largeur, ici 2/6 */}
        <div className="login-right-part relative h-full flex-[2] bg-[#ec5a13]">
          {/* Bouton pour fermer la modale en haut à droite (une croix -> X ) */}
          <span
            className="close-button absolute right-4 top-1 cursor-pointer text-4xl"
            onClick={closeModal}
          >
            &times;
          </span>
          {/* Contenu de la partie droite */}
          <div className="absolute top-[30%] flex flex-col items-center gap-12">
            {/* Slogan partie droite */}
            <p className="w-[85%] text-center text-2xl text-white xl:w-[80%]">
              Inscrivez-vous et faites partie de l'éco-mode
            </p>
            {/* Bouton permettant d'afficher le register en changeant l'état de modalContent */}
            <button
              onClick={handleModalContent}
              type="button"
              className="button-switch w-[55%] rounded-lg bg-[#F5F5F5] py-2 text-center text-black shadow-sm shadow-black xl:w-[45%]"
            >
              Créer un compte
            </button>
          </div>
          <img
            src="/images/login-triangle.png"
            alt="white triangle used for five a shape to the background"
            className="absolute -left-[1px] bottom-0 w-[50%]"
          />
        </div>
      </div>
    </>
  );
}
