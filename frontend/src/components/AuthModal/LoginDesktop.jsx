/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

export default function LoginDeskop() {
  const { isLogged, setIsLogged, closeModal, handleModalContent } =
    useContext(GlobalContext);

  function handleLogin() {
    setIsLogged(isLogged ? false : true);
  }

  return (
    <>
      <div className="modal-login">
        <div className="login-left-part">
          <div className="abolute ml-[5%] mr-0 mt-[10%] flex w-[80%] justify-start gap-10 pl-6 xl:w-[95%] xl:gap-24">
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
        <div className="login-right-part">
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          <div className="absolute top-[30%] flex flex-col items-center gap-12">
            <p className="w-[85%] text-center text-2xl text-white xl:w-[80%]">
              Inscrivez-vous et faites partie de l'éco-mode
            </p>
            <button
              onClick={handleModalContent}
              type="button"
              className="button-switch w-[55%] xl:w-[45%]"
            >
              Créer un compte
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
